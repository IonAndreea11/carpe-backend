import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pkg from "pg";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";

dotenv.config();

const { Pool } = pkg;
const pool = new Pool({
  user: String(process.env.DB_USER),
  host: String(process.env.DB_HOST),
  database: String(process.env.DB_NAME),
  password: String(process.env.DB_PASSWORD),
  port: Number(process.env.DB_PORT),
});

const app = express();
const PORT = 4000;

// ==================== MIDDLEWARE ====================
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

// ==================== UPLOADS SETUP ====================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}
app.use("/uploads", express.static(uploadsDir));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// ==================== ENSURE ADMIN ====================
async function ensureAdmin() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "superSecret123";
  const role = "admin";

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      adminEmail,
    ]);

    if (result.rows.length === 0) {
      const hash = await bcrypt.hash(adminPassword, 10);
      await pool.query(
        "INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3)",
        [adminEmail, hash, role]
      );
      console.log(`Cont admin creat: ${adminEmail}`);
    } else {
      console.log("Contul admin există deja.");
    }
  } catch (err) {
    console.error("Eroare la verificarea/crearea contului admin:", err);
  }
}
ensureAdmin();

// ==================== LOGIN ====================
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Email invalid" });
    }

    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ error: "Parolă greșită" });
    }

    const token = jwt.sign(
      { email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Eroare server" });
  }
});

// ==================== ADMIN MIDDLEWARE ====================
function verifyAdmin(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ error: "Lipsește token-ul" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).json({ error: "Doar admin are acces" });
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token invalid sau expirat" });
  }
}

// ==================== CHECK ADMIN ====================
app.get("/api/check-admin", (req, res) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.json({ isAdmin: false });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ isAdmin: decoded.role === "admin" });
  } catch {
    res.json({ isAdmin: false });
  }
});

// ==================== LOGOUT ====================
app.post("/api/logout", (req, res) => {
  res.json({ success: true });
});

// =======================================================
// ======================= ARTICLES =======================
// =======================================================

// GET all articles
app.get("/api/message", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM articles ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Eroare la preluarea articolelor" });
  }
});

// GET article by id
app.get("/api/message/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("SELECT * FROM articles WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Articolul nu a fost găsit" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Eroare la preluarea articolului" });
  }
});

// POST new article (bilingual)
app.post(
  "/api/message",
  verifyAdmin,
  upload.single("image"),
  async (req, res) => {
    const { title_ro, content_ro, title_en, content_en } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    try {
      const result = await pool.query(
        `INSERT INTO articles 
          (title_ro, content_ro, title_en, content_en, image)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [title_ro, content_ro, title_en, content_en, imageUrl]
      );

      res.json(result.rows[0]);
    } catch (err) {
      console.error("Eroare SQL la adăugarea articolului:", err);
      res.status(500).json({ error: "Eroare la adăugarea articolului" });
    }
  }
);

// PUT update article (bilingual)
app.put(
  "/api/message/:id",
  verifyAdmin,
  upload.single("image"),
  async (req, res) => {
    const { id } = req.params;
    const { title_ro, content_ro, title_en, content_en } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    try {
      const result = await pool.query(
        `UPDATE articles SET 
            title_ro=$1,
            content_ro=$2,
            title_en=$3,
            content_en=$4,
            image=COALESCE($5, image)
         WHERE id=$6
         RETURNING *`,
        [title_ro, content_ro, title_en, content_en, imageUrl, id]
      );

      res.json(result.rows[0]);
    } catch (err) {
      console.error("Eroare SQL la actualizarea articolului:", err);
      res.status(500).json({ error: "Eroare la actualizarea articolului" });
    }
  }
);

// DELETE article
app.delete("/api/message/:id", verifyAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM articles WHERE id = $1", [id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Eroare la ștergere articol" });
  }
});

// =======================================================
// ======================= PROJECTS =======================
// =======================================================

// GET all projects (returns RO+EN always)
app.get("/api/projects", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, title_ro, title_en, full_description_ro, full_description_en, image, created_at FROM projects ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Eroare la preluarea proiectelor" });
  }
});

// GET project by id
app.get("/api/projects/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "SELECT id, title_ro, title_en, full_description_ro, full_description_en, image, created_at FROM projects WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Proiectul nu a fost găsit" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Eroare la preluarea proiectului" });
  }
});

// POST new project (bilingual + image)
app.post(
  "/api/projects",
  verifyAdmin,
  upload.single("image"),
  async (req, res) => {
    const { title_ro, title_en, full_description_ro, full_description_en } =
      req.body;

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    try {
      const result = await pool.query(
        `INSERT INTO projects
          (title_ro, title_en, full_description_ro, full_description_en, image)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [title_ro, title_en, full_description_ro, full_description_en, imageUrl]
      );

      res.json(result.rows[0]);
    } catch (err) {
      console.error("Eroare SQL la adăugarea proiectului:", err);
      res.status(500).json({ error: "Eroare la adăugarea proiectului" });
    }
  }
);

// PUT update project (bilingual + image)
app.put(
  "/api/projects/:id",
  verifyAdmin,
  upload.single("image"),
  async (req, res) => {
    const { id } = req.params;
    const { title_ro, title_en, full_description_ro, full_description_en } =
      req.body;

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    try {
      const result = await pool.query(
        `UPDATE projects SET
            title_ro=$1,
            title_en=$2,
            full_description_ro=$3,
            full_description_en=$4,
            image=COALESCE($5, image)
         WHERE id=$6
         RETURNING *`,
        [
          title_ro,
          title_en,
          full_description_ro,
          full_description_en,
          imageUrl,
          id,
        ]
      );

      res.json(result.rows[0]);
    } catch (err) {
      console.error("Eroare SQL la actualizarea proiectului:", err);
      res.status(500).json({ error: "Eroare la actualizarea proiectului" });
    }
  }
);

// DELETE project
app.delete("/api/projects/:id", verifyAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const project = await pool.query("SELECT * FROM projects WHERE id = $1", [
      id,
    ]);

    if (project.rows.length === 0) {
      return res.status(404).json({ error: "Proiectul nu a fost găsit" });
    }

    const imagePath = project.rows[0].image
      ? path.join(__dirname, project.rows[0].image)
      : null;

    await pool.query("DELETE FROM projects WHERE id = $1", [id]);

    if (imagePath && fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Eroare la ștergerea proiectului" });
  }
});

// =======================================================
// ======================== ANIMALS =======================
// =======================================================

// GET all animals
app.get("/api/animals", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, description_ro, description_en, type, image, created_at FROM animals ORDER BY created_at DESC"
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Eroare la preluarea animalelor" });
  }
});

// GET animal by id
app.get("/api/animals/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "SELECT id, name, description_ro, description_en, type, image FROM animals WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Animalul nu a fost găsit" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Eroare la preluarea animalului" });
  }
});

// POST animal
app.post(
  "/api/animals",
  verifyAdmin,
  upload.single("image"),
  async (req, res) => {
    try {
      const { name, description_ro, description_en, type } = req.body;

      const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

      const result = await pool.query(
        `INSERT INTO animals 
        (name, description_ro, description_en, type, image)
         VALUES ($1,$2,$3,$4,$5)
         RETURNING *`,
        [name, description_ro, description_en, type, imageUrl]
      );

      res.json(result.rows[0]);
    } catch (err) {
      console.error("Eroare SQL la adăugarea animalului:", err);
      res.status(500).json({ error: "Eroare la adăugarea animalului" });
    }
  }
);

// PUT animal
app.put(
  "/api/animals/:id",
  verifyAdmin,
  upload.single("image"),
  async (req, res) => {
    const { id } = req.params;
    const { name, description_ro, description_en, type } = req.body;

    try {
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

      const result = await pool.query(
        `UPDATE animals
         SET name=$1,
             description_ro=$2,
             description_en=$3,
             type=$4,
             image=COALESCE($5, image)
         WHERE id=$6
         RETURNING *`,
        [name, description_ro, description_en, type, imageUrl, id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Animalul nu a fost găsit" });
      }

      res.json(result.rows[0]);
    } catch (err) {
      console.error("Eroare SQL la actualizarea animalului:", err);
      res.status(500).json({ error: "Eroare la actualizarea animalului" });
    }
  }
);

// DELETE animal
app.delete("/api/animals/:id", verifyAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM animals WHERE id = $1", [id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Eroare la ștergerea animalului" });
  }
});

// =======================================================
// ======================== CONTACT FORM =================
// =======================================================

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Toate câmpurile sunt obligatorii." });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // EMAIL către tine
    await transporter.sendMail({
      from: `"CARPE Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_RECEIVER,
      subject: `Mesaj nou de la ${name}`,
      html: `
        <h2>Mesaj nou de pe CARPE Website</h2>
        <p><b>Nume:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Mesaj:</b><br>${message}</p>
      `,
    });

    // EMAIL de confirmare către user
    await transporter.sendMail({
      from: `"CARPE Rescue" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Confirmare trimitere mesaj către CARPE",
      html: `
        <h2>Mulțumim pentru mesaj!</h2>
        <p>Bună, <b>${name}</b>,</p>
        <p>Am primit mesajul tău și echipa CARPE iți va răspunde cât mai curând.</p>
        <p><i>Mesaj trimis:</i><br>${message}</p>
        <p>O zi frumoasă!</p>
        <p><b>CARPE Rescue Team</b></p>
      `,
    });

    res.json({ success: true, message: "Mesaj trimis cu succes!" });
  } catch (err) {
    console.error("Eroare la trimiterea emailului:", err);
    res.status(500).json({ error: "Eroare la trimiterea emailului." });
  }
});

// =======================================================
// ======================== ADOPT MAIL ====================
// =======================================================

// app.post("/api/adopt", async (req, res) => {
//   const { firstName, lastName, birthDate, email, phone, animalName } = req.body;

//   if (!firstName || !lastName || !email || !phone) {
//     return res.status(400).json({ error: "Toate câmpurile sunt obligatorii" });
//   }

//   try {
//     const transporter = nodemailer.createTransport({
//       host: process.env.SMTP_HOST,
//       port: process.env.SMTP_PORT,
//       secure: process.env.SMTP_SECURE === "true",
//       auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS,
//       },
//     });

//     const message = {
//       from: `"Adoption Request" <${process.env.SMTP_USER}>`,
//       to: process.env.ADMIN_EMAIL,
//       subject: `Cerere adopție pentru ${animalName}`,
//       html: `
//         <h3>Detalii cerere adopție:</h3>
//         <p><b>Animal:</b> ${animalName}</p>
//         <p><b>Nume:</b> ${lastName}</p>
//         <p><b>Prenume:</b> ${firstName}</p>
//         <p><b>Data nașterii:</b> ${birthDate}</p>
//         <p><b>Email:</b> ${email}</p>
//         <p><b>Telefon:</b> ${phone}</p>
//       `,
//     };

//     await transporter.sendMail(message);

//     res.json({ success: true, message: "Cererea a fost trimisă cu succes!" });
//   } catch (err) {
//     console.error("Eroare trimitere email:", err);
//     res.status(500).json({ error: "Eroare la trimiterea emailului" });
//   }
// });

// =======================================================

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

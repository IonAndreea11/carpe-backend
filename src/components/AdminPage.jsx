import React, { useEffect, useState } from "react";
// import AddArticle from "./AddArticle";
import "../styles/admin.css";
import { useTranslation } from "react-i18next";

function AdminPage() {
  const { i18n } = useTranslation();

  const [articles, setArticles] = useState([]);
  const [projects, setProjects] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [view, setView] = useState("articles");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showAnimalModal, setShowAnimalModal] = useState(false);

  const [editArticle, setEditArticle] = useState(null);
  const [editProject, setEditProject] = useState(null);
  const [editAnimal, setEditAnimal] = useState(null);

  const token = localStorage.getItem("token");

  // ==================== FETCH ====================
  useEffect(() => {
    const init = async () => {
      if (!token) {
        window.location.href = "/admin";
        return;
      }

      const res = await fetch("http://localhost:4000/api/check-admin", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!data.isAdmin) {
        window.location.href = "/admin";
        return;
      }

      try {
        const [resArticles, resProjects, resAnimals] = await Promise.all([
          fetch("http://localhost:4000/api/message"),
          fetch("http://localhost:4000/api/projects"),
          fetch("http://localhost:4000/api/animals"),
        ]);

        setArticles(await resArticles.json());
        setProjects(await resProjects.json());
        setAnimals(await resAnimals.json());
      } catch (err) {
        setError("Eroare la preluarea datelor");
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [token]);

  // ==================== ȘTERGERE ====================
  const handleDeleteArticle = async (id) => {
    if (!window.confirm("Sigur vrei să ștergi articolul?")) return;

    try {
      const res = await fetch(`http://localhost:4000/api/message/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Eroare la ștergere articol");

      setArticles((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Sigur vrei să ștergi proiectul?")) return;

    try {
      const res = await fetch(`http://localhost:4000/api/projects/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Eroare la ștergere proiect");

      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteAnimal = async (id) => {
    if (!window.confirm("Sigur vrei să ștergi acest animal?")) return;

    try {
      const res = await fetch(`http://localhost:4000/api/animals/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Eroare la ștergere animal");

      setAnimals((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  // ==================== RENDER ====================
  return (
    <div className="admin-container">
      <h1 className="admin-header">Panou de administrare</h1>

      {/* === TOP BAR === */}
      <div className="admin-dashboard">
        <div className="dashboard-left">
          <button
            className="dashboard-btn add-btn"
            onClick={() => setShowArticleModal(true)}
          >
            ➕ Adaugă articol
          </button>
          <button
            className="dashboard-btn add-btn"
            onClick={() => setShowProjectModal(true)}
          >
            ➕ Adaugă proiect
          </button>
          <button
            className="dashboard-btn add-btn"
            onClick={() => setShowAnimalModal(true)}
          >
            ➕ Adaugă animal
          </button>
        </div>

        <div className="dashboard-right">
          <button
            className={`dashboard-btn ${view === "articles" ? "active" : ""}`}
            onClick={() => setView("articles")}
          >
            📰 Articole
          </button>
          <button
            className={`dashboard-btn ${view === "projects" ? "active" : ""}`}
            onClick={() => setView("projects")}
          >
            🏗️ Proiecte
          </button>
          <button
            className={`dashboard-btn ${view === "animals" ? "active" : ""}`}
            onClick={() => setView("animals")}
          >
            🐶 Animale
          </button>
        </div>
      </div>

      {/* === CONȚINUT PRINCIPAL === */}
      {loading ? (
        <p className="admin-loading">Se încarcă...</p>
      ) : error ? (
        <p className="admin-error">{error}</p>
      ) : view === "articles" ? (
        /* === LISTĂ ARTICOLE CU TRADUCERE === */
        <div className="article-list">
          {articles.map((a) => (
            <div className="article-card" key={a.id}>
              <h3>{i18n.language === "ro" ? a.title_ro : a.title_en}</h3>

              {a.image && (
                <img src={`http://localhost:4000${a.image}`} alt={a.title} />
              )}

              <p>
                {i18n.language === "ro"
                  ? a.content_ro?.slice(0, 150) + "..."
                  : a.content_en?.slice(0, 150) + "..."}
              </p>

              <div className="article-actions">
                <button onClick={() => setEditArticle(a)}>Editează</button>
                <button
                  className="delete"
                  onClick={() => handleDeleteArticle(a.id)}
                >
                  Șterge
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : view === "projects" ? (
        /* === LISTĂ PROIECTE === */
        <div className="project-list">
          {projects.map((p) => (
            <div className="project-card" key={p.id}>
              <h3>{p.title}</h3>

              {p.image && (
                <img src={`http://localhost:4000${p.image}`} alt={p.title} />
              )}

              <p>
                {p.full_description?.length > 150
                  ? p.full_description.slice(0, 150) + "..."
                  : p.full_description}
              </p>

              <div className="article-actions">
                <button onClick={() => setEditProject(p)}>Editează</button>
                <button
                  className="delete"
                  onClick={() => handleDeleteProject(p.id)}
                >
                  Șterge
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* === LISTĂ ANIMALE === */
        <div className="animal-list">
          {animals.map((a) => (
            <div className="animal-card" key={a.id}>
              <h3>{a.name}</h3>

              {a.image && (
                <img src={`http://localhost:4000${a.image}`} alt={a.name} />
              )}

              <p>{a.description?.slice(0, 150)}...</p>

              <div className="article-actions">
                <button onClick={() => setEditAnimal(a)}>Editează</button>
                <button
                  className="delete"
                  onClick={() => handleDeleteAnimal(a.id)}
                >
                  Șterge
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* === MODALE === */}

      {/* === ADD ARTICLE MODAL === */}
      {showArticleModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span
              className="modal-close"
              onClick={() => setShowArticleModal(false)}
            >
              &times;
            </span>

            <h2>Adaugă articol</h2>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);

                const res = await fetch("http://localhost:4000/api/message", {
                  method: "POST",
                  headers: { Authorization: `Bearer ${token}` },
                  body: formData,
                });

                const data = await res.json();

                if (!res.ok) {
                  alert(data.error || "Eroare la adăugarea articolului");
                  return;
                }

                setArticles((prev) => [data, ...prev]);
                setShowArticleModal(false);
              }}
            >
              <h3>Română</h3>

              <input
                type="text"
                name="title_ro"
                placeholder="Titlu în română"
              />

              <textarea
                name="content_ro"
                placeholder="Conținut în română"
                rows={6}
              ></textarea>

              <h3>English</h3>

              <input type="text" name="title_en" placeholder="English title" />

              <textarea
                name="content_en"
                placeholder="English content"
                rows={6}
              ></textarea>

              <input type="file" name="image" accept="image/*" />

              <button type="submit" className="save-btn">
                Adaugă articol
              </button>
            </form>
          </div>
        </div>
      )}

      {/* === EDIT ARTICLE MODAL (BILINGV) === */}
      {editArticle && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="modal-close" onClick={() => setEditArticle(null)}>
              &times;
            </span>

            <h2>Editează articol</h2>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);

                const res = await fetch(
                  `http://localhost:4000/api/message/${editArticle.id}`,
                  {
                    method: "PUT",
                    headers: { Authorization: `Bearer ${token}` },
                    body: formData,
                  }
                );

                const data = await res.json();

                if (!res.ok) {
                  alert(data.error || "Eroare la actualizare articol");
                  return;
                }

                setArticles((prev) =>
                  prev.map((a) => (a.id === data.id ? data : a))
                );

                setEditArticle(null);
              }}
            >
              <h3>Română</h3>

              <input
                type="text"
                name="title_ro"
                defaultValue={editArticle.title_ro}
                required
              />

              <textarea
                name="content_ro"
                defaultValue={editArticle.content_ro}
                rows={6}
                required
              ></textarea>

              <h3>English</h3>

              <input
                type="text"
                name="title_en"
                defaultValue={editArticle.title_en || ""}
              />

              <textarea
                name="content_en"
                defaultValue={editArticle.content_en || ""}
                rows={6}
              ></textarea>

              <input type="file" name="image" accept="image/*" />

              <button type="submit" className="save-btn">
                Salvează modificările
              </button>
            </form>
          </div>
        </div>
      )}

      {/* === ADD PROJECT MODAL === */}
      {showProjectModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span
              className="modal-close"
              onClick={() => setShowProjectModal(false)}
            >
              &times;
            </span>

            <h2>Adaugă proiect</h2>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);

                const res = await fetch("http://localhost:4000/api/projects", {
                  method: "POST",
                  headers: { Authorization: `Bearer ${token}` },
                  body: formData,
                });

                const data = await res.json();

                if (!res.ok) {
                  alert(data.error || "Eroare la adăugarea proiectului");
                  return;
                }

                setProjects((prev) => [data, ...prev]);
                setShowProjectModal(false);
              }}
            >
              {/* === ROMÂNĂ === */}
              <h3>Română</h3>

              <input
                type="text"
                name="title_ro"
                placeholder="Titlu proiect (RO)"
                required
              />

              <textarea
                name="full_description_ro"
                placeholder="Descriere completă în română"
                rows={7}
              ></textarea>

              {/* === ENGLEZĂ === */}
              <h3>English</h3>

              <input
                type="text"
                name="title_en"
                placeholder="Project title (EN)"
                required
              />

              <textarea
                name="full_description_en"
                placeholder="Full description in English"
                rows={7}
              ></textarea>

              <input type="file" name="image" accept="image/*" />

              <button type="submit" className="save-btn">
                Adaugă proiect
              </button>
            </form>
          </div>
        </div>
      )}

      {/* === EDIT PROJECT MODAL === */}
      {editProject && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="modal-close" onClick={() => setEditProject(null)}>
              &times;
            </span>

            <h2>Editează proiect</h2>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);

                const res = await fetch(
                  `http://localhost:4000/api/projects/${editProject.id}`,
                  {
                    method: "PUT",
                    headers: { Authorization: `Bearer ${token}` },
                    body: formData,
                  }
                );

                const data = await res.json();
                if (!res.ok) {
                  alert(data.error || "Eroare la actualizare proiect");
                  return;
                }

                setProjects((prev) =>
                  prev.map((p) => (p.id === data.id ? data : p))
                );

                setEditProject(null);
              }}
            >
              <h3>Română</h3>

              <input
                type="text"
                name="title_ro"
                defaultValue={editProject.title_ro}
                required
              />

              <textarea
                name="full_description_ro"
                rows={7}
                defaultValue={editProject.full_description_ro}
              ></textarea>

              <h3>English</h3>

              <input
                type="text"
                name="title_en"
                defaultValue={editProject.title_en}
                required
              />

              <textarea
                name="full_description_en"
                rows={7}
                defaultValue={editProject.full_description_en}
              ></textarea>

              <input type="file" name="image" accept="image/*" />

              <button type="submit" className="save-btn">
                Salvează modificările
              </button>
            </form>
          </div>
        </div>
      )}

      {/* === ADD / EDIT ANIMAL MODALS — NEMODIFICATE === */}
      {showAnimalModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span
              className="modal-close"
              onClick={() => setShowAnimalModal(false)}
            >
              &times;
            </span>

            <h2>Adaugă animal</h2>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);

                const res = await fetch("http://localhost:4000/api/animals", {
                  method: "POST",
                  headers: { Authorization: `Bearer ${token}` },
                  body: formData,
                });

                const data = await res.json();
                if (!res.ok) {
                  alert(data.error || "Eroare la adăugarea animalului");
                  return;
                }

                setAnimals((prev) => [data, ...prev]);
                setShowAnimalModal(false);
              }}
            >
              <input
                type="text"
                name="name"
                placeholder="Nume animal"
                required
              />

              <h3>Descriere (Română)</h3>
              <textarea
                name="description_ro"
                rows="4"
                placeholder="Descriere în limba română"
                required
              />

              <h3>Descriere (Engleză)</h3>
              <textarea
                name="description_en"
                rows="4"
                placeholder="Description in English"
                required
              />

              <select name="type" required>
                <option value="">Selectează tipul</option>
                <option value="caine">Câine</option>
                <option value="pisica">Pisică</option>
                <option value="altul">Altul</option>
              </select>

              <input type="file" name="image" accept="image/*" />

              <button type="submit" className="save-btn">
                Adaugă animal
              </button>
            </form>
          </div>
        </div>
      )}

      {editAnimal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="modal-close" onClick={() => setEditAnimal(null)}>
              &times;
            </span>

            <h2>Editează animal</h2>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);

                const res = await fetch(
                  `http://localhost:4000/api/animals/${editAnimal.id}`,
                  {
                    method: "PUT",
                    headers: { Authorization: `Bearer ${token}` },
                    body: formData,
                  }
                );

                const data = await res.json();

                if (!res.ok) {
                  alert(data.error || "Eroare la actualizarea animalului");
                  return;
                }

                setAnimals((prev) =>
                  prev.map((a) => (a.id === data.id ? data : a))
                );

                setEditAnimal(null);
              }}
            >
              {/* NUME */}
              <input
                type="text"
                name="name"
                defaultValue={editAnimal.name}
                placeholder="Nume animal"
                required
              />

              {/* RO */}
              <h3>Descriere (Română)</h3>
              <textarea
                name="description_ro"
                rows="4"
                defaultValue={editAnimal.description_ro}
                placeholder="Descriere în limba română"
              />

              {/* EN */}
              <h3>Descriere (Engleză)</h3>
              <textarea
                name="description_en"
                rows="4"
                defaultValue={editAnimal.description_en}
                placeholder="Description in English"
              />

              {/* TIP */}
              <select name="type" defaultValue={editAnimal.type} required>
                <option value="caine">Câine</option>
                <option value="pisica">Pisică</option>
                <option value="altul">Altul</option>
              </select>

              {/* IMAGINE */}
              <input type="file" name="image" accept="image/*" />

              <button type="submit" className="save-btn">
                Salvează modificările
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPage;

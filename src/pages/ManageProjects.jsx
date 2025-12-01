import { useState, useEffect } from "react";
import axios from "axios";

function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    short_description: "",
    full_description: "",
    image: null,
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await axios.get("http://localhost:4000/api/projects");
    setProjects(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("title", formData.title);
    form.append("short_description", formData.short_description);
    form.append("full_description", formData.full_description);
    if (formData.image) form.append("image", formData.image);

    await axios.post("http://localhost:4000/api/projects", form, {
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchProjects();
    setFormData({ title: "", short_description: "", full_description: "", image: null });
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:4000/api/projects/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchProjects();
  };

  return (
    <div className="manage-projects">
      <h2>Gestionează Proiecte</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          placeholder="Titlu"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Descriere scurtă"
          value={formData.short_description}
          onChange={(e) =>
            setFormData({ ...formData, short_description: e.target.value })
          }
        />
        <textarea
          placeholder="Descriere completă"
          value={formData.full_description}
          onChange={(e) =>
            setFormData({ ...formData, full_description: e.target.value })
          }
        ></textarea>
        <input
          type="file"
          onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
        />
        <button type="submit">Adaugă proiect</button>
      </form>

      <div className="project-list">
        {projects.map((p) => (
          <div key={p.id} className="project-item">
  {p.image && (
    <img
      src={`http://localhost:4000${p.image}`}
      alt={p.title}
      className="project-thumb"
      style={{ width: "150px", height: "auto", borderRadius: "8px" }}
    />
  )}
  <h3>{p.title}</h3>
  <p>{p.short_description}</p>
  <button onClick={() => handleDelete(p.id)}>Șterge</button>
</div>
        ))}
      </div>
    </div>
  );
}

export default ManageProjects;

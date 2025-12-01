import React, { useState } from "react";
import "../styles/AddArticle.css";

function AddArticle({ onArticleAdded }) {
  const [titleRO, setTitleRO] = useState("");
  const [contentRO, setContentRO] = useState("");
  const [titleEN, setTitleEN] = useState("");
  const [contentEN, setContentEN] = useState("");
  const [image, setImage] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Trebuie să fii logat ca admin.");
      return;
    }

    const formData = new FormData();
    formData.append("title_ro", titleRO);
    formData.append("content_ro", contentRO);
    formData.append("title_en", titleEN);
    formData.append("content_en", contentEN);
    if (image) formData.append("image", image);

    try {
      const res = await fetch("http://localhost:4000/api/message", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Eroare la adăugare articol");

      setSuccess("Articol adăugat cu succes!");
      setTitleRO("");
      setContentRO("");
      setTitleEN("");
      setContentEN("");
      setImage(null);

      document.getElementById("imageInput").value = "";

      if (onArticleAdded) onArticleAdded(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className="add-article-form" onSubmit={handleSubmit}>
      <h3>Română</h3>
      <input
        type="text"
        placeholder="Titlu (RO)"
        value={titleRO}
        onChange={(e) => setTitleRO(e.target.value)}
        required
      />

      <textarea
        placeholder="Conținut (RO)"
        value={contentRO}
        onChange={(e) => setContentRO(e.target.value)}
        rows={10}
        required
      />

      <h3>English</h3>
      <input
        type="text"
        placeholder="Title (EN)"
        value={titleEN}
        onChange={(e) => setTitleEN(e.target.value)}
      />

      <textarea
        placeholder="Content (EN)"
        value={contentEN}
        onChange={(e) => setContentEN(e.target.value)}
        rows={10}
      />

      <input
        id="imageInput"
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button type="submit">Adaugă articol</button>

      {error && <p className="add-article-error">{error}</p>}
      {success && <p className="add-article-success">{success}</p>}
    </form>
  );
}

export default AddArticle;

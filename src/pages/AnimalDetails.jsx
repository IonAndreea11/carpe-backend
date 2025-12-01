import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/AnimalDetails.css";

export default function AnimalDetails() {
  const { id } = useParams();
  const [animal, setAnimal] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:4000/api/animals/${id}`)
      .then((res) => res.json())
      .then(setAnimal)
      .catch(console.error);
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/api/adopt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          animalName: animal.name,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Eroare la trimiterea cererii");
      alert("Cererea a fost trimisă cu succes! Vei fi contactat de admin.");
      setShowForm(false);
      setFormData({
        firstName: "",
        lastName: "",
        birthDate: "",
        email: "",
        phone: "",
      });
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!animal) return <p>Se încarcă...</p>;

  return (
    <div className="page-animal-details">
      <div className="page-animal-card">
        <div className="page--animal-left">
          <img
            src={`http://localhost:4000${animal.image}`}
            alt={animal.name}
            className="page-animal-photo"
          />
          <h2>{animal.name}</h2>
          <p className="page-gender-tag">
            {animal.gender === "mascul" ? "Mascul" : "Femelă"}
          </p>
          <div>
            <button
            className="page-adopt-button"
            onClick={() => setShowForm(true)}
          >
            Adoptă-mă 🐾
          </button>
          </div>
          
        </div>

        <div className="page-animal-right">
          <div className="page-info-box">
            <h3>Informații de bază</h3>
            <p><strong>Vârstă:</strong> {animal.age_category}</p>
            <p><strong>Mărime:</strong> {animal.size_category}</p>
          </div>

          <div className="page-info-box">
            <h3>Status</h3>
            <p><strong>Vaccinat/ă:</strong> {animal.vaccinated ? "✅" : "❌"}</p>
            <p><strong>Deparazitat/ă:</strong> {animal.dewormed ? "✅" : "❌"}</p>
            <p><strong>Sterilizat/ă:</strong> {animal.sterilized ? "✅" : "❌ "}</p>
          </div>

          <div className="page-info-box">
            <h3>Descriere</h3>
            <p> {animal.description}</p>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="page-adopt-modal-overlay">
          <div className="page-adopt-modal">
            <h2>Adopt {animal.name}</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Prenume"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Nume"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                required
              />
              <input
                type="date"
                value={formData.birthDate}
                onChange={(e) =>
                  setFormData({ ...formData, birthDate: e.target.value })
                }
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
              <input
                type="tel"
                placeholder="Număr de telefon"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
              />
              <div className="page-adopt-form-buttons">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="page-adopt-cancel-btn"
                >
                  Cancel
                </button>
                <button type="submit" disabled={loading} className="page-adopt-submit-btn">
                  {loading ? "Se trimite..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
import { useState } from "react";
import { useTranslation } from "react-i18next";
import "../styles/Contact.css";
import { FaEnvelope, FaUser } from "react-icons/fa6";

function Contact() {
  const { t } = useTranslation("contact");

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(t("sending"));

    try {
      const res = await fetch("http://localhost:4000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) {
        setStatus(t("success"));
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus(t("error"));
      }
    } catch {
      setStatus(t("error"));
    }
  };

  return (
    <div className="contact-wrapper">
      <div className="contact-card">
        <h2>{t("title")}</h2>
        <p className="subtitle">{t("subtitle")}</p>

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="input-group">
            <FaUser className="icon" />
            <input
              type="text"
              name="name"
              placeholder={t("name")}
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <FaEnvelope className="icon" />
            <input
              type="email"
              name="email"
              placeholder={t("email")}
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group textarea-group">
            <textarea
              name="message"
              placeholder={t("message")}
              value={form.message}
              onChange={handleChange}
              rows="5"
              required
            ></textarea>
          </div>

          <button type="submit">{t("send")}</button>

          {status && <p className="form-status">{status}</p>}
        </form>
      </div>
    </div>
  );
}

export default Contact;

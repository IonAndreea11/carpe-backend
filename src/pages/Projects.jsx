import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Projects.css";
import BlurText from "../components/BlurText";
import { useTranslation } from "react-i18next";

function Projects() {
  const [projects, setProjects] = useState([]);
  const { t, i18n } = useTranslation("projects");

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/projects")
      .then((res) => setProjects(res.data));
  }, []);

  return (
    <section className="home-projects-container">
      {/* HEADER */}
      <header className="home-projects-header">
        <BlurText
          text={t("title")}
          className="home-projects-title"
          animateBy="words"
          delay={90}
        />
      </header>

      {/* GRID */}
      <div className="home-projects-grid">
        {projects.map((p) => (
          <div className="home-project-card" key={p.id}>
            {/* IMAGE */}
            {p.image && (
              <img
                src={`http://localhost:4000${p.image}`}
                alt={p.title}
                className="home-project-image"
              />
            )}

            {/* CONTENT */}
            <div className="home-project-content">
              <h3>{i18n.language === "ro" ? p.title_ro : p.title_en}</h3>

              <p className="home-project-full">
                {i18n.language === "ro"
                  ? p.full_description_ro
                  : p.full_description_en}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;

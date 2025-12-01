import "../styles/AboutSection.css";
import despreNoi from "../assets/images/despreNoi.jpeg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function AboutSection() {
  const { t } = useTranslation("aboutHome");

  return (
    <section className="landing-page-about">
      <div className="landing-page-about-container">
        <div className="landing-page-about-text">
          <h2>{t("aboutTitle")}</h2>

          <p>{t("aboutText")}</p>

          <Link to="/about">
            <button>{t("aboutButton")}</button>
          </Link>
        </div>

        <div className="landing-page-about-image">
          <img src={despreNoi} alt={t("aboutAlt")} />
        </div>
      </div>
    </section>
  );
}

export default AboutSection;

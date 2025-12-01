import React from "react";
import "../styles/About.css";
import BlurText from "../components/BlurText";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function About() {
  const { t } = useTranslation("about");

  return (
    <section className="about-page">
      {/* ================= HERO (fără imagine) ================= */}
      <header className="about-hero no-image">
        <div className="about-hero-content">
          <BlurText
            text={t("title")}
            className="about-hero-title"
            animateBy="words"
            delay={90}
          />
          <p className="about-hero-subtitle">{t("subtitle")}</p>
        </div>
      </header>

      {/* ================= STATS ================= */}
      <section className="about-stats">
        <div className="stat-card">
          <div className="stat-number">1000+</div>
          <div className="stat-label">{t("stats.dogs")}</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">50+</div>
          <div className="stat-label">{t("stats.cats")}</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">650+</div>
          <div className="stat-label">{t("stats.adoptions")}</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">200+</div>
          <div className="stat-label">{t("stats.sterilizations")}</div>
        </div>
      </section>

      {/* ================= STORY CHAPTERS ================= */}
      <section className="about-chapters">
        <div className="chapter">
          <img
            src={require("../assets/about/c1.jpg")}
            className="chapter-image"
            alt=""
          />
          <div className="chapter-content">
            <h3 className="chapter-title">{t("chapters.c1Title")}</h3>
            <p className="chapter-text">{t("p1")}</p>
          </div>
        </div>

        <div className="chapter">
          <img
            src={require("../assets/about/c2.jpg")}
            className="chapter-image"
            alt=""
          />
          <div className="chapter-content">
            <h3 className="chapter-title">{t("chapters.c2Title")}</h3>
            <p className="chapter-text">{t("p2")}</p>
          </div>
        </div>

        <div className="chapter">
          <img
            src={require("../assets/about/c3.jpg")}
            className="chapter-image"
            alt=""
          />
          <div className="chapter-content">
            <h3 className="chapter-title">{t("chapters.c3Title")}</h3>
            <p className="chapter-text">{t("p3")}</p>
          </div>
        </div>

        <div className="chapter">
          <img
            src={require("../assets/about/c4.jpg")}
            className="chapter-image"
            alt=""
          />
          <div className="chapter-content">
            <h3 className="chapter-title">{t("chapters.c4Title")}</h3>
            <p className="chapter-text">{t("p4")}</p>
          </div>
        </div>

        <div className="chapter">
          <img
            src={require("../assets/about/c5.jpeg")}
            className="chapter-image"
            alt=""
          />
          <div className="chapter-content">
            <h3 className="chapter-title">{t("chapters.c5Title")}</h3>
            <p className="chapter-text">{t("p5")}</p>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="about-cta">
        <div className="cta-card">
          <h2>{t("ctaTitle")}</h2>
          <p>{t("p6")}</p>
          <Link to="/help" className="cta-button">
            {t("ctaButton")}
          </Link>
          <Link to="/contact" className="cta-button">
            {t("contactButton")}
          </Link>
        </div>
      </section>
    </section>
  );
}

export default About;

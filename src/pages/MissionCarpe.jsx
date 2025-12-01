import "../styles/MissionCarpe.css";
import BlurText from "../components/BlurText";
import { useTranslation } from "react-i18next";

import careImg from "../assets/images/care.jpeg";
import adoptImg from "../assets/images/adopt.jpeg";
import rescueImg from "../assets/images/rescue.jpeg";
import protectImg from "../assets/images/protect.jpeg";
import educateImg from "../assets/images/educate.jpeg";

function MissionCarpe() {
  const { t } = useTranslation("mission");

  return (
    <section className="mission-container">
      {/*  HERO */}
      <header className="mission-hero">
        <BlurText
          text={t("title")}
          className="hero-title"
          animateBy="words"
          delay={90}
        />
        <BlurText text={t("subtitle")} className="hero-subtitle" delay={40} />
      </header>

      {/* CHAPTERS */}
      <section className="mission-chapters">
        <div className="mission-chapter">
          <img src={careImg} alt="Care" className="mission-image" />
          <div className="mission-content">
            <h3>{t("mission.careTitle")}</h3>
            <p>{t("mission.careText")}</p>
          </div>
        </div>

        <div className="mission-chapter">
          <img src={adoptImg} alt="Adopt" className="mission-image" />
          <div className="mission-content">
            <h3>{t("mission.adoptTitle")}</h3>
            <p>{t("mission.adoptText")}</p>
          </div>
        </div>

        <div className="mission-chapter">
          <img src={rescueImg} alt="Rescue" className="mission-image" />
          <div className="mission-content">
            <h3>{t("mission.rescueTitle")}</h3>
            <p>{t("mission.rescueText")}</p>
          </div>
        </div>

        <div className="mission-chapter">
          <img src={protectImg} alt="Protect" className="mission-image" />
          <div className="mission-content">
            <h3>{t("mission.protectTitle")}</h3>
            <p>{t("mission.protectText")}</p>
          </div>
        </div>

        <div className="mission-chapter">
          <img src={educateImg} alt="Educate" className="mission-image" />
          <div className="mission-content">
            <h3>{t("mission.educateTitle")}</h3>
            <p>{t("mission.educateText")}</p>
          </div>
        </div>
      </section>
    </section>
  );
}

export default MissionCarpe;

import React from "react";
import "../styles/VolunteerPage.css";
import { useTranslation } from "react-i18next";
import BlurText from "../components/BlurText";

function VolunteerPage() {
  const { t } = useTranslation("volunteerPage");

  return (
    <section className="volunteer-page">
      <div className="volunteer-container">
        <BlurText
          text={t("title")}
          className="volunteer-title"
          animateBy="words"
          delay={90}
        />

        <p className="volunteer-intro">{t("intro1")}</p>
        <p>{t("intro2")}</p>

        <p className="volunteer-highlight">{t("highlight")}</p>

        <p>{t("intro3")}</p>

        <ul className="volunteer-tasks">
          <li>{t("tasks.t1")}</li>
          <li>{t("tasks.t2")}</li>
          <li>{t("tasks.t3")}</li>
          <li>{t("tasks.t4")}</li>
          <li>{t("tasks.t5")}</li>
        </ul>

        <h2 className="volunteer-subtitle">{t("tipsTitle")}</h2>

        <ul className="volunteer-tips">
          <li>{t("tips.tip1")}</li>
          <li>{t("tips.tip2")}</li>
          <li>{t("tips.tip3")}</li>
          <li>{t("tips.tip4")}</li>
          <li>{t("tips.tip5")}</li>
        </ul>

        <h3 className="volunteer-subtitle">{t("recommendationsTitle")}</h3>

        <ul className="volunteer-recommendations">
          <li>{t("recommendations.r1")}</li>
          <li>{t("recommendations.r2")}</li>
          <li>{t("recommendations.r3")}</li>
        </ul>

        <p className="volunteer-thanks">{t("thanks")}</p>
      </div>
    </section>
  );
}

export default VolunteerPage;

import React from "react";
import "../styles/HelpPage.css";
import BlurText from "../components/BlurText";
import { useTranslation } from "react-i18next";

function HelpPage() {
  const { t } = useTranslation("helpPage");

  return (
    <section className="help-page">
      <div className="help-container">
        <BlurText
          text={t("title")}
          className="help-title"
          animateBy="words"
          delay={90}
        />

        <p className="help-intro">{t("intro")}</p>
        <p className="help-highlight">{t("highlight")}</p>

        <div className="help-list">
          {/* Donații ING/PayPal/Revolut */}
          <div className="help-item">
            <h2>{t("items.donationsTitle")}</h2>

            <ul>
              <li>
                <b>{t("items.legalName")}</b>
              </li>
              <li>CUI: 36353674</li>
              <li>IBAN RON: RO24INGB0000999906335258</li>
              <li>IBAN EUR: RO23INGB0000999906360496</li>
              <li>SWIFT: INGBROBU / BIC: 606410008</li>
              <li>
                PayPal:{" "}
                <a href="mailto:ribana4you2000@yahoo.com">
                  ribana4you2000@yahoo.com
                </a>
              </li>
              <li>Revolut: 0728303952 (@cristiji5o)</li>
            </ul>
          </div>

          {/* Donații lunare */}
          <div className="help-item">
            <h2>{t("items.monthlyDonationsTitle")}</h2>
            <p>{t("items.monthlyDonationsText")}</p>
          </div>

          {/* Galantom */}
          <div className="help-item">
            <h2>{t("items.birthdayTitle")}</h2>
            <a
              href="https://carpeshelter.galantom.ro/"
              target="_blank"
              rel="noopener noreferrer"
            >
              carpeshelter.galantom.ro
            </a>
          </div>

          {/* Benevity */}
          <div className="help-item">
            <h2>{t("items.benevityTitle")}</h2>
            <p>{t("items.benevityText")}</p>
          </div>

          {/* Teaming */}
          <div className="help-item">
            <h2>{t("items.teamingTitle")}</h2>
            <p>{t("items.teamingText")}</p>
            <a
              href="https://www.teaming.net/carperescueshelter"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.teaming.net/carperescueshelter
            </a>
          </div>

          {/* Adopție virtuală */}
          <div className="help-item">
            <h2>{t("items.virtualAdoptionTitle")}</h2>
            <p>{t("items.virtualAdoptionText")}</p>
            <a
              href="https://www.facebook.com/media/set/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("items.virtualAdoptionLink")}
            </a>
          </div>

          {/* Buy & Donate */}
          <div className="help-item">
            <h2>{t("items.buyDonateTitle")}</h2>
            <p>{t("items.buyDonateText")}</p>
            <a
              href="https://www.facebook.com/HandmadeBoutiqueBuyDonate"
              target="_blank"
              rel="noopener noreferrer"
            >
              Handmade Boutique Buy & Donate
            </a>
          </div>

          {/* Pentruanimale.ro */}
          <div className="help-item">
            <h2>{t("items.pentruAnimaleTitle")}</h2>
            <a
              href="https://www.pentruanimale.ro/doneaza-5-lei/p?skuId=6800"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("items.pentruAnimaleLink")}
            </a>
          </div>

          {/* 3.5% */}
          <div className="help-item">
            <h2>{t("items.tax35Title")}</h2>
            <a
              href="https://redirectioneaza.ro/asociatia-pentru-protectia-animalelor-carpe/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("items.tax35Link")}
            </a>
          </div>

          {/* 20% profit */}
          <div className="help-item">
            <h2>{t("items.company20Title")}</h2>
            <p>{t("items.company20Text")}</p>
          </div>

          {/* Voluntariat */}
          <div className="help-item">
            <h2>{t("items.volunteerTitle")}</h2>
            <p>{t("items.volunteerText")}</p>
          </div>

          {/* Ambasador */}
          <div className="help-item">
            <h2>{t("items.ambassadorTitle")}</h2>
            <p>{t("items.ambassadorText")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HelpPage;

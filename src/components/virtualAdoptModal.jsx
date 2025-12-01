import React from "react";
import "../styles/VirtualAdoptModal.css";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function VirtualAdoptModal({ animal, onClose }) {
  const { t } = useTranslation("modal");
  const { i18n } = useTranslation();

  if (!animal) return null;

  return (
    <div className="vam-overlay" onClick={onClose}>
      <motion.div
        className="vam-modal"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.85, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.85, y: 40 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {/* Header cu imagine */}
        <div className="vam-img-wrapper">
          {animal.image && (
            <img
              src={`http://localhost:4000${animal.image}`}
              alt={animal.name}
              className="vam-img"
            />
          )}
        </div>

        <div className="vam-content">
          {/* Nume animal */}
          <h2 className="vam-title">{animal.name}</h2>

          {/* Descriere */}
          <p className="vam-desc">
            {i18n.language === "ro"
              ? animal.description_ro
              : animal.description_en}
          </p>

          {/* Titlul Adoptie Virtuala */}
          <h3 className="vam-section-title">{t("virtualAdoption")}</h3>

          {/* Detalii donatii */}
          <div className="vam-donation-box">
            <p>
              <strong>{t("legalName")}</strong>
            </p>
            <p>
              <strong>CUI:</strong> 36353674
            </p>

            <p>
              <strong>IBAN RON:</strong>
              <br /> RO24INGB0000999906335258
            </p>
            <p>
              <strong>IBAN EUR:</strong>
              <br /> RO23INGB0000999906360496
            </p>

            <p>
              <strong>PayPal:</strong>
              <br /> Ribana4you2000@yahoo.com
            </p>
            <p>
              <strong>Revolut:</strong>
              <br /> 0728 303 952
            </p>
          </div>

          {/* Buton Închide cu traducere */}
          <button className="vam-close" onClick={onClose}>
            {t("close")}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import "../styles/AdoptPage.css";
import VirtualAdoptModal from "../components/virtualAdoptModal";
import BlurText from "../components/BlurText";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import before1 from "../assets/succes/before1.jpeg";
import after1 from "../assets/succes/after1.jpeg";
import before2 from "../assets/succes/before2.png";
import after2 from "../assets/succes/after2.png";
import before3 from "../assets/succes/before3.jpeg";
import after3 from "../assets/succes/after3.jpeg";
import miruna from "../assets/succes/miruna.jpeg";

export default function AdoptPage() {
  const { t } = useTranslation("adopt");

  const [animals, setAnimals] = useState([]);
  const [filter, setFilter] = useState("toate");
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  useEffect(() => {
    function updateItemsPerPage() {
      const width = window.innerWidth;

      if (width <= 679) {
        setItemsPerPage(1);
      } else if (width <= 919) {
        setItemsPerPage(2);
      } else if (width <= 1024) {
        setItemsPerPage(3);
      } else if (width <= 1037) {
        setItemsPerPage(4);
      } else if (width <= 1395) {
        setItemsPerPage(6);
      } else {
        setItemsPerPage(8);
      }
    }

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);

    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  useEffect(() => {
    fetch("http://localhost:4000/api/animals")
      .then((res) => res.json())
      .then((data) => {
        const unique = [];
        const ids = new Set();

        data.forEach((a) => {
          if (!ids.has(a.id)) {
            ids.add(a.id);
            unique.push(a);
          }
        });

        setAnimals(unique);
      })
      .catch((err) => console.error("Eroare la preluare:", err));
  }, []);

  const filtered =
    filter === "toate" ? animals : animals.filter((a) => a.type === filter);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedAnimals = filtered.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  const nextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="home-adopt-page">
      {/* TITLE */}
      <BlurText
        text={t("title")}
        className="adopt-title"
        animateBy="words"
        delay={90}
      />

      {/* FILTER BAR */}
      <div className="home-filter-bar">
        <button
          onClick={() => {
            setFilter("toate");
            setCurrentPage(0);
          }}
        >
          {t("filters.all")}
        </button>

        <button
          onClick={() => {
            setFilter("caine");
            setCurrentPage(0);
          }}
        >
          {t("filters.dogs")}
        </button>

        <button
          onClick={() => {
            setFilter("pisica");
            setCurrentPage(0);
          }}
        >
          {t("filters.cats")}
        </button>

        <button
          onClick={() => {
            setFilter("altul");
            setCurrentPage(0);
          }}
        >
          {t("filters.other")}
        </button>
      </div>

      {/* PAGINATION ARROWS */}
      <div className="animal-grid-wrapper">
        {currentPage > 0 && (
          <button className="arrow-btn left" onClick={prevPage}>
            ❮
          </button>
        )}

        <div className="home-animal-grid">
          {paginatedAnimals.map((a) => (
            <div
              key={a.id}
              className="home-animal-card"
              onClick={() => setSelectedAnimal(a)}
            >
              {a.image && (
                <img src={`http://localhost:4000${a.image}`} alt={a.name} />
              )}
              <h3>{a.name}</h3>
              <button className="home-adopt-button">{t("title")}</button>
            </div>
          ))}
        </div>

        {currentPage < totalPages - 1 && (
          <button className="arrow-btn right" onClick={nextPage}>
            ❯
          </button>
        )}
      </div>

      {/* MODAL */}
      {selectedAnimal && (
        <VirtualAdoptModal
          animal={selectedAnimal}
          onClose={() => setSelectedAnimal(null)}
        />
      )}

      {/* SUCCESS STORIES */}
      <section className="success-stories">
        <BlurText
          text={t("successTitle")}
          className="success-title"
          animateBy="words"
          delay={80}
        />

        <div className="success-wide-card one-image-story">
          <div className="success-single-layout">
            {/* IMAGE LEFT with fade animation */}
            <motion.div
              className="success-single-image"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <img src={miruna} alt="Story" />
            </motion.div>

            <motion.div
              className="success-single-text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <h3 className="success-name">{t("stories.miruna.name")}</h3>

              <p>{t("stories.miruna.text1")}</p>
              <p>{t("stories.miruna.text2")}</p>
              <p>{t("stories.miruna.text3")}</p>
            </motion.div>
          </div>
        </div>

        <div className="success-grid">
          {/* ---------- STORY 1 ---------- */}
          <motion.div
            className="success-wide-card"
            whileHover={{ y: -6, boxShadow: "0 12px 30px rgba(0,0,0,0.18)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="success-layout">
              {/* BEFORE */}
              <motion.div
                className="success-before"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <img src={before1} alt="Before" />
              </motion.div>

              {/* TEXT */}
              <motion.div
                className="success-text-column"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="success-name">{t("stories.flori.name")}</h3>
                <p>{t("stories.flori.text")}</p>
              </motion.div>
            </div>

            {/* AFTER */}
            <motion.div
              className="success-after"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img src={after1} alt="After" />
            </motion.div>
          </motion.div>

          {/* ---------- STORY 2 ---------- */}
          <motion.div
            className="success-wide-card"
            whileHover={{ y: -6, boxShadow: "0 12px 30px rgba(0,0,0,0.18)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="success-layout">
              {/* BEFORE */}
              <motion.div
                className="success-before"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <img src={before2} alt="Before" />
              </motion.div>

              {/* TEXT */}
              <motion.div
                className="success-text-column"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="success-name">{t("stories.kasi.name")}</h3>
                <p>{t("stories.kasi.text")}</p>
              </motion.div>
            </div>

            {/* AFTER */}
            <motion.div
              className="success-after"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img src={after2} alt="After" />
            </motion.div>
          </motion.div>

          {/* ---------- STORY 3 ---------- */}
          <motion.div
            className="success-wide-card"
            whileHover={{ y: -6, boxShadow: "0 12px 30px rgba(0,0,0,0.18)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="success-layout">
              {/* BEFORE */}
              <motion.div
                className="success-before"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <img src={before3} alt="Before" />
              </motion.div>

              {/* TEXT */}
              <motion.div
                className="success-text-column"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="success-name">{t("stories.dasha.name")}</h3>
                <p>{t("stories.dasha.text1")}</p>
                <p>{t("stories.dasha.text2")}</p>
              </motion.div>
            </div>

            {/* AFTER */}
            <motion.div
              className="success-after"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img src={after3} alt="After" />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

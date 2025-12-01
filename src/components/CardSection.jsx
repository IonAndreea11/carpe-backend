import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "../styles/CardSection.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from "react-i18next";

function CardSection() {
  const [articles, setArticles] = useState([]);
  const [slidesToShow, setSlidesToShow] = useState(4);
  const { t } = useTranslation("articles");

  useEffect(() => {
    fetch("http://localhost:4000/api/message")
      .then((res) => res.json())
      .then((data) => {
        const sorted = [...data].sort((a, b) => b.id - a.id);
        const latestEight = sorted.slice(0, 8);
        setArticles(latestEight);
      })
      .catch((err) => console.error("Eroare la preluarea articolelor:", err));
  }, []);

  useEffect(() => {
    function updateSlides() {
      const width = window.innerWidth;

      if (width <= 679) {
        setSlidesToShow(1);
      } else if (width <= 919) {
        setSlidesToShow(2);
      } else if (width <= 1400) {
        setSlidesToShow(3);
      } else {
        setSlidesToShow(4);
      }
    }

    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    pauseOnHover: true,
    arrows: true,
  };

  return (
    <section className="articles-carousel-section">
      <h2 className="section-title">
        <Link to="/articles" className="articles-title-link">
          {t("latestArticles")}
        </Link>
      </h2>

      <div className="articles-carousel-container">
        <Slider {...settings}>
          {articles.map((article) => (
            <div key={article.id} className="article-slide">
              <ArticleCard article={article} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

function ArticleCard({ article }) {
  const [orientation, setOrientation] = useState("");
  const { i18n, t } = useTranslation("articles");

  const handleImageLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.target;
    setOrientation(naturalWidth > naturalHeight ? "landscape" : "portrait");
  };

  const title = i18n.language === "ro" ? article.title_ro : article.title_en;
  const content =
    i18n.language === "ro" ? article.content_ro : article.content_en || "";

  return (
    <div className={`carousel-article-card ${orientation}`}>
      {article.image ? (
        <div className="carousel-image-container">
          <img
            src={`http://localhost:4000${article.image}`}
            alt={title}
            onLoad={handleImageLoad}
          />
        </div>
      ) : (
        <div className="carousel-image-placeholder">{t("noImage")}</div>
      )}

      <div className="carousel-card-body">
        <h3>{title}</h3>
        <p>
          {content.length > 80 ? content.substring(0, 80) + "..." : content}
        </p>
        <Link to={`/article/${article.id}`} className="carousel-read-more-btn">
          {t("readMore")}
        </Link>
      </div>
    </div>
  );
}

export default CardSection;

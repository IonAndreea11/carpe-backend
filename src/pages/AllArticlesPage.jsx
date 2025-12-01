import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/AllArticlesPage.css";
import BlurText from "../components/BlurText";
import { useTranslation } from "react-i18next";

function AllArticlesPage() {
  const [articles, setArticles] = useState([]);
  const { i18n, t } = useTranslation("articles");

  useEffect(() => {
    fetch("http://localhost:4000/api/message")
      .then((res) => res.json())
      .then((data) => {
        const sorted = [...data].sort((a, b) => b.id - a.id);
        setArticles(sorted);
      })
      .catch((err) => console.error("Eroare la preluarea articolelor:", err));
  }, []);

  return (
    <section className="all-articles-section">
      <header className="all-articles-hero">
        <BlurText
          text={t("pageTitle")}
          className="all-articles-title"
          animateBy="words"
          delay={90}
        />
      </header>

      <div className="all-articles-grid">
        {articles.map((article) => {
          const title =
            i18n.language === "ro" ? article.title_ro : article.title_en;

          const content =
            i18n.language === "ro"
              ? article.content_ro
              : article.content_en || "";

          return (
            <div key={article.id} className="all-article-card">
              {article.image && (
                <img
                  src={`http://localhost:4000${article.image}`}
                  alt={title}
                />
              )}

              <div className="article-card-content">
                <h3>{title}</h3>

                <p>
                  {content.length > 400
                    ? content.substring(0, 400) + "..."
                    : content}
                </p>

                <Link to={`/article/${article.id}`} className="read-more-btn">
                  {t("readMore")}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default AllArticlesPage;

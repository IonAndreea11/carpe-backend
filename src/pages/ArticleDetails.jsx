import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/ArticlePage.css";
import { useTranslation } from "react-i18next";

function ArticleDetails() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { i18n } = useTranslation();

  useEffect(() => {
    fetch(`http://localhost:4000/api/message/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setArticle(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Eroare la preluarea articolului");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="center">Se încarcă...</p>;
  if (error)
    return (
      <p className="center" style={{ color: "red" }}>
        {error}
      </p>
    );

  if (!article) return <p>Articolul nu a fost găsit.</p>;

  // 🔥 Selectarea limbii
  const title = i18n.language === "ro" ? article.title_ro : article.title_en;

  const content =
    i18n.language === "ro" ? article.content_ro : article.content_en;

  return (
    <div className="article-page">
      <div className="page-article-card">
        <h1>{title}</h1>

        {article.image && (
          <figure className="article-figure wide">
            <img src={`http://localhost:4000${article.image}`} alt={title} />
            {article.caption && <figcaption>{article.caption}</figcaption>}
          </figure>
        )}

        <article className="article-content">
          <p>{content}</p>
        </article>

        <div className="article-footer">
          {article.tags && article.tags.length > 0 && (
            <div className="tags">
              {article.tags.map((tag, index) => (
                <span className="tag" key={index}>
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="share-buttons">
            <button
              className="btn btn-ghost"
              onClick={() => window.history.back()}
            >
              ← Înapoi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleDetails;

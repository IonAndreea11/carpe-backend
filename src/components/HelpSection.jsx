import "../styles/HelpSection.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FaHandHoldingHeart, FaPaw, FaHandshake } from "react-icons/fa6";

function HelpSection() {
  const { t } = useTranslation("helpSection");

  const helpOptions = t("options", { returnObjects: true });

  const icons = [<FaHandHoldingHeart />, <FaPaw />, <FaHandshake />];

  return (
    <section className="help-section">
      <h2 className="section-title-help">
        <Link to="/help" className="help-title-link">
          {t("title")}
        </Link>
      </h2>

      <div className="help-grid">
        {helpOptions.map((option, index) => (
          <div key={index} className="help-card">
            <div className="help-icon">{icons[index]}</div>
            <h3>{option.title}</h3>
            <p>{option.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HelpSection;

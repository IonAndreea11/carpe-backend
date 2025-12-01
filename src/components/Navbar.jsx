import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import logo from "../assets/images/logo.png";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

function MyNavbar() {
  const { t } = useTranslation("navbar");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="nav-container">
      <nav className="nav-content">
        {/* LOGO */}
        <div className="nav-left">
          <Link to="/" className="nav-logo">
            <img src={logo} alt="Carpe Logo" />
            <span>Carpe Shelter</span>
          </Link>
        </div>

        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li>
            <Link to="/" onClick={() => setMenuOpen(false)}>
              {t("home")}
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setMenuOpen(false)}>
              {t("about")}
            </Link>
          </li>
          <li>
            <Link to="/articles" onClick={() => setMenuOpen(false)}>
              {t("articles")}
            </Link>
          </li>
          <li>
            <Link to="/mission" onClick={() => setMenuOpen(false)}>
              {t("mission")}
            </Link>
          </li>
          <li>
            <Link to="/projects" onClick={() => setMenuOpen(false)}>
              {t("projects")}
            </Link>
          </li>
          <li>
            <Link to="/adopt" onClick={() => setMenuOpen(false)}>
              {t("adopt")}
            </Link>
          </li>
          <li>
            <Link to="/help" onClick={() => setMenuOpen(false)}>
              {t("help")}
            </Link>
          </li>
          <li>
            <Link to="/volunteer" onClick={() => setMenuOpen(false)}>
              {t("volunteer")}
            </Link>
          </li>

          <div className="mobile-lang">
            <LanguageSwitcher />
          </div>
        </ul>

        <div className="nav-right">
          <div className="desktop-lang">
            <LanguageSwitcher />
          </div>

          <div
            className={`hamburger ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default MyNavbar;

import { Image } from "react-bootstrap";
import "../styles/Footer.css";
import { useTranslation } from "react-i18next";
import { FaFacebook, FaInstagram } from "react-icons/fa6";
import logo from "../assets/images/logo.png";

function Footer() {
  const { t } = useTranslation("footer");

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Column 1 - Branding */}
        <div className="footer-section">
          <div className="footer-logo">
            <Image className="footer-logo" src={logo} alt="Carpe Logo" />
            <h3>CARPE Rescue</h3>
          </div>
          <p className="footer-description">{t("description")}</p>
        </div>

        {/* Column 2 - Useful links */}
        <div className="footer-section">
          <h4>{t("links")}</h4>
          <ul>
            <li>
              <a href="/about">{t("about")}</a>
            </li>
            <li>
              <a href="/help">{t("help")}</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>

        {/* Column 3 - Partners + Social */}
        <div className="footer-section">
          <h4>{t("partners")}</h4>
          <ul>
            <li>
              <a
                href="https://emblarescue.fi/"
                target="_blank"
                rel="noreferrer"
              >
                Embla Rescue
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/donate/292036976473150/368005378691716/"
                target="_blank"
                rel="noreferrer"
              >
                CARPE Fundraiser
              </a>
            </li>
          </ul>

          <h4>{t("social")}</h4>
          <div className="footer-social">
            <a
              href="https://www.facebook.com/carperescueshelter/?locale=ro_RO"
              target="_blank"
              rel="noreferrer"
            >
              <FaFacebook />
            </a>

            <a
              href="https://www.instagram.com/carperescue/"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()} CARPE Rescue – All rights reserved
      </div>
    </footer>
  );
}

export default Footer;

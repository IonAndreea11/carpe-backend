import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import roAbout from "./locales/ro/aboutPage.json";
import enAbout from "./locales/en/aboutPage.json";
import roMission from "./locales/ro/mission.json";
import enMission from "./locales/en/mission.json";
import roArticles from "./locales/ro/articles.json";
import enArticles from "./locales/en/articles.json";
import roAboutHome from "./locales/ro/homeAbout.json";
import enAboutHome from "./locales/en/homeAbout.json";
import roHelpPage from "./locales/ro/helpPage.json";
import enHelpPage from "./locales/en/helpPage.json";
import roVolunteerPage from "./locales/ro/volunteerPage.json";
import enVolunteerPage from "./locales/en/volunteerPage.json";
import roNavbar from "./locales/ro/navbar.json";
import enNavbar from "./locales/en/navbar.json";
import roAdopt from "./locales/ro/adopt.json";
import enAdopt from "./locales/en/adopt.json";
import roModal from "./locales/ro/modal.json";
import enModal from "./locales/en/modal.json";
import roProjects from "./locales/ro/projects.json";
import enProjects from "./locales/en/projects.json";
import roAdoptSection from "./locales/ro/adoptSection.json";
import enAdoptSection from "./locales/en/adoptSection.json";
import roHelpSection from "./locales/ro/helpSection.json";
import enHelpSection from "./locales/en/helpSection.json";
import roFooter from "./locales/ro/footer.json";
import enFooter from "./locales/en/footer.json";
import roContact from "./locales/ro/contact.json";
import enContact from "./locales/en/contact.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ro: {
        about: roAbout,
        mission: roMission,
        articles: roArticles,
        aboutHome: roAboutHome,
        helpPage: roHelpPage,
        volunteerPage: roVolunteerPage,
        navbar: roNavbar,
        adopt: roAdopt,
        modal: roModal,
        projects: roProjects,
        adoptSection: roAdoptSection,
        helpSection: roHelpSection,
        footer: roFooter,
        contact: roContact,
      },
      en: {
        about: enAbout,
        mission: enMission,
        articles: enArticles,
        aboutHome: enAboutHome,
        helpPage: enHelpPage,
        volunteerPage: enVolunteerPage,
        navbar: enNavbar,
        adopt: enAdopt,
        modal: enModal,
        projects: enProjects,
        adoptSection: enAdoptSection,
        helpSection: enHelpSection,
        footer: enFooter,
        contact: enContact,
      },
    },
    fallbackLng: "ro",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

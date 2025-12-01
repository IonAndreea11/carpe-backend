import { Routes, Route, useLocation } from "react-router-dom";
import MyNavbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import About from "./pages/About";
import MissionCarpe from "./pages/MissionCarpe";
import Adopt from "./pages/Adopt";
import ProtectedRoute from "./components/ProtectedRoute";
import ArticleDetails from "./pages/ArticleDetails";
import Login from "./components/Login";
import AdminPage from "./components/AdminPage";
import ArticlePage from "./pages/ArticleDetails";
import Projects from "./pages/Projects";
import "../src/App.css";
import AllArticlesPage from "./pages/AllArticlesPage";
import HelpPage from "./pages/HelpPage";
import VolunteerPage from "./pages/VolunteerPage";
import Contact from "./pages/Contact";
import AnimalDetails from "./pages/AnimalDetails";

function App() {
  const location = useLocation();

  const isAdminRoute =
    location.pathname === "/admin" || location.pathname === "/dashboard";

  return (
    <>
      {!isAdminRoute && <MyNavbar />}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />
        <Route path="/mission" element={<MissionCarpe />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/article/:id" element={<ArticleDetails />} />
        <Route path="/admin" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route path="/article/:id" element={<ArticlePage />} />
        <Route path="/adopt" element={<Adopt />} />
        <Route path="/adopt/:id" element={<AnimalDetails />} />
        <Route path="/articles" element={<AllArticlesPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/volunteer" element={<VolunteerPage />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;

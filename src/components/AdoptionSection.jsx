import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/AdoptSection.css";
import VirtualAdoptModal from "../components/virtualAdoptModal";

function AdoptCarousel() {
  const { t } = useTranslation("adoptSection");
  const [animals, setAnimals] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/api/animals")
      .then((res) => res.json())
      .then(setAnimals)
      .catch((err) => console.error("Eroare la preluare animale:", err));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="adopt-carousel-section">
      <h2 className="section-title">
        <Link to="/adopt" className="adopt-title-link">
          {t("title")}
        </Link>
      </h2>

      <div className="adopt-carousel-container">
        <Slider {...settings}>
          {animals.map((animal) => (
            <div key={animal.id} className="adopt-slide">
              <div className="adopt-card">
                {animal.image ? (
                  <div className="adopt-image-container">
                    <img
                      src={`http://localhost:4000${animal.image}`}
                      alt={animal.name}
                    />
                  </div>
                ) : (
                  <div className="adopt-image-placeholder">Fără imagine</div>
                )}

                <div className="adopt-card-body">
                  <h3>{animal.name}</h3>
                  <button
                    className="adopt-button"
                    onClick={() => setSelectedAnimal(animal)}
                  >
                    {t("button")}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {selectedAnimal && (
        <VirtualAdoptModal
          animal={selectedAnimal}
          onClose={() => setSelectedAnimal(null)}
        />
      )}
    </section>
  );
}

export default AdoptCarousel;

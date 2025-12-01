import React from "react";
import Carousel from "react-bootstrap/Carousel";
import c1 from "../assets/carousel/c1.png";
import c2 from "../assets/carousel/c2.jpeg";
import c3 from "../assets/carousel/c3.png";

const images = [c1, c2, c3];

function MyCarousel() {
  return (
    <Carousel
      className="carousel-container"
      indicators={false}
      style={{ "--bs-gutter-x": 0 }}
    >
      {images.map((image, index) => (
        <Carousel.Item key={index} interval={5000}>
          <img
            className="carousel-img"
            src={image}
            alt={`Slide ${index + 1}`}
            style={{ height: "800px", width: "100%", objectFit: "cover" }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default MyCarousel;

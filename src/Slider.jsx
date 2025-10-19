// src/components/organisms/Slider.jsx
import React, { useState } from "react";

const images = [
  "/img/plantacion1.jpg",
  "/img/plantacion2.jpg",
  "/img/plantacion3.jpg",
  "/img/plantacion4.jpg",
  "/img/plantacion5.jpg",
];

export default function Slider() {
  const [activeIndex, setActiveIndex] = useState(0);

  const goPrev = () => setActiveIndex(i => (i - 1 + images.length) % images.length);
  const goNext = () => setActiveIndex(i => (i + 1) % images.length);

  return (
    <div id="welcome">
      <h1>Bienvenido a Huerto Hogar</h1>

      <div className="carousel" role="region" aria-label="Carrusel">
        <button className="prev" onClick={goPrev}>⟨</button>

        <div className="slides">
          {images.map((src, idx) => (
            <img
              key={src}
              src={src}
              alt={`Slide ${idx + 1}`}
              className={idx === activeIndex ? "active" : ""}
              loading="lazy"
            />
          ))}
        </div>

        <button className="next" onClick={goNext}>⟩</button>
      </div>
    </div>
  );
}

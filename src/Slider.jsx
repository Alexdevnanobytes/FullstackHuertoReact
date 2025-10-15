import React, { useState, useEffect } from 'react';
import "../../../src/App.css";

const images = [
    '/img1.jpg',
    '/img2.jpg',
    '/img3.jpg'
  // Agrega tus rutas de imágenes
];

export default function Slider() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setIndex(i => (i + 1) % images.length), 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="slider">
        <button className="prev" onClick={() => setIndex(i => (i - 1 + images.length) % images.length)}>Prev</button>
        <div className="slides">
            {images.map((img, i) => (
            <img key={img} src={img} alt="" className={i === index ? 'active' : ''} />
            ))}
        </div>
        <button className="next" onClick={() => setIndex(i => (i + 1) % images.length)}>Next</button>
        </div>
    );
}
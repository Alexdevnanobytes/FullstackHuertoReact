// src/components/organisms/Product.jsx
import React from "react";

export default function Product(props) {
  const { code, image, name, description, price } = props;

  function addToCart() {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    products.push(props);
    localStorage.setItem("products", JSON.stringify(products));
    console.log(products);
  }

  return (
    <article className="product" data-code={code}>
      {/* Contenedor de imagen con background */}
      <div
        className="product-image"
        style={{ backgroundImage: `url(${image})` }}
      ></div>

      {/* Información del producto */}
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <p className="product-description">{description}</p>
        <div className="product-price">{price && `$ ${price}`}</div>
      </div>

      {/* Botón */}
      <button className="product-btn" onClick={addToCart}>
        Añadir al carro
      </button>
    </article>
  );
}

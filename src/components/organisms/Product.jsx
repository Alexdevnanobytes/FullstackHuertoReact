// src/components/organisms/Product.jsx
import React, { useState } from "react";

export default function Product(props) {
  const { code, image, name, description, price } = props;

  // cantidad seleccionada
  const [qty, setQty] = useState(1);
  const [inputValue, setInputValue] = useState("1");

  // manejar cambio en input
  const handleInputChange = (e) => {
    const val = e.target.value;
    if (val === "") {
      setInputValue("");
      return;
    }
    const num = parseInt(val);
    if (!isNaN(num) && num >= 1) {
      setQty(num);
      setInputValue(num.toString());
    }
  };

  // al perder foco, si está vacío, poner 1
  const handleInputBlur = () => {
    if (inputValue === "") {
      setQty(1);
      setInputValue("1");
    }
  };

  // agregar al carrito
  function addToCart() {
    const raw = localStorage.getItem("products");
    const cart = raw ? JSON.parse(raw) : [];

    const idx = cart.findIndex((p) => p.code === code);
    if (idx >= 0) {
      // ya existe, sumar cantidad
      cart[idx].qty = (cart[idx].qty || 1) + qty;
    } else {
      cart.push({
        code,
        image,
        name,
        description,
        price,
        qty,
      });
    }

    localStorage.setItem("products", JSON.stringify(cart));

    // mostrar toast
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerText = `Agregaste ${qty} ${name} al carrito`;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 2500);
  }

  // botones de incrementar/decrementar
  const increment = () => {
    const newQty = qty + 1;
    setQty(newQty);
    setInputValue(newQty.toString());
  };

  const decrement = () => {
    const newQty = qty > 1 ? qty - 1 : 1;
    setQty(newQty);
    setInputValue(newQty.toString());
  };

  return (
    <article className="product" data-code={code}>
      <div
        className="product-image"
        style={{ backgroundImage: `url(${image})` }}
      />

      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <p className="product-description">{description}</p>
        <div className="product-price">{price && `$ ${price}`}</div>

        <div className="product-qty">
          <button type="button" onClick={decrement}>
            -
          </button>
          <input
            type="number"
            min="1"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
          <button type="button" onClick={increment}>
            +
          </button>
        </div>
      </div>

      <button className="product-btn" onClick={addToCart}>
        Añadir al carro
      </button>
    </article>
  );
}

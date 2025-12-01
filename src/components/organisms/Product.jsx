// src/components/organisms/Product.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addCarritoItem, getCurrentUser } from "../../api";

export default function Product(props) {
  const { code, image, name, description, price, productId } = props;

  const [qty, setQty] = useState(1);
  const [inputValue, setInputValue] = useState("1");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  const handleInputBlur = () => {
    if (inputValue === "") {
      setQty(1);
      setInputValue("1");
    }
  };

  async function addToCart() {
    const token = localStorage.getItem("token");

    if (!token) {
      const ir = window.confirm(
        "Debes iniciar sesión para agregar productos al carrito. ¿Quieres ir a la página de acceso?"
      );
      if (ir) {
        navigate("/registro");
      }
      return;
    }

    try {
      setLoading(true);

      // obtener usuario actual (id)
      const user = await getCurrentUser();
      if (!user || !user.id) {
        throw new Error("No se pudo identificar el usuario actual.");
      }

      if (!productId) {
        throw new Error("El producto no tiene ID (productId) válido.");
      }

      // llamada a backend para agregar al carrito
      await addCarritoItem(user.id, productId, qty);

      // toast visual
      const toast = document.createElement("div");
      toast.className = "toast";
      toast.innerText = `Agregaste ${qty} ${name} al carrito`;
      document.body.appendChild(toast);
      setTimeout(() => {
        toast.remove();
      }, 2500);
    } catch (err) {
      console.error(err);
      alert(err.message || "Error al agregar al carrito.");
    } finally {
      setLoading(false);
    }
  }

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

      <button
        className="product-btn"
        onClick={addToCart}
        disabled={loading}
      >
        {loading ? "Agregando..." : "Añadir al carro"}
      </button>
    </article>
  );
}

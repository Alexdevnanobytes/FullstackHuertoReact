// src/pages/Cart.jsx
import React, { useEffect, useMemo, useState } from "react";
import First from "../organisms/First";
import Footer from "../organisms/Footer";

export default function Cart() {
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem("products");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // sincronizar localStorage cuando cambie `cart`
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(cart));
  }, [cart]);

  // opcional: sincronizar si cambian en otra pestaña
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "products") {
        setCart(JSON.parse(e.newValue || "[]"));
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const total = useMemo(
    () =>
      cart.reduce((acc, p) => {
        const priceNum = Number(p.price) || 0;
        return acc + priceNum * (p.qty || 1);
      }, 0),
    [cart]
  );

  function handleRemove(code) {
    setCart((prev) => prev.filter((p) => p.code !== code));
  }

  function handleClear() {
    setCart([]);
    localStorage.removeItem("products");
  }

  function handleQtyChange(code, newQty) {
    if (newQty < 1) return;
    setCart((prev) =>
      prev.map((p) => (p.code === code ? { ...p, qty: newQty } : p))
    );
  }

  return (
    <>
      <First />

      <div className="cartdiv">
    <main>
        <h2>Carrito de compras</h2>

        {cart.length === 0 ? (
          <div style={{ padding: "2rem 0" , textAlign: "center" , fontSize: "1.2rem" , alignItems: "center" , width: "40vw" , margin: "0 auto" }}>
            <p>Tu carrito está vacío. <a href="/catalogo">Ir al catálogo</a></p>
          </div>
        ) : (
          <>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ textAlign: "left", borderBottom: "1px solid #ddd" }}>
                  <th style={{ padding: "8px" }}>Código</th>
                  <th style={{ padding: "8px" }}>Imagen</th>
                  <th style={{ padding: "8px" }}>Nombre</th>
                  <th style={{ padding: "8px" }}>Descripción</th>
                  <th style={{ padding: "8px" }}>Precio</th>
                  <th style={{ padding: "8px" }}>Cantidad</th>
                  <th style={{ padding: "8px" }}>Subtotal</th>
                  <th style={{ padding: "8px" }}>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {cart.map((p) => (
                  <tr key={p.code} style={{ borderBottom: "1px solid #f0f0f0" }}>
                    <td style={{ padding: "12px 8px" }}>{p.code}</td>
                    <td style={{ padding: "8px" }}>
                      <img
                        src={p.image}
                        alt={p.name}
                        style={{ width: 80, height: 60, objectFit: "cover" }}
                      />
                    </td>
                    <td style={{ padding: "8px" }}>{p.name}</td>
                    <td style={{ padding: "8px" }}>{p.description}</td>
                    <td style={{ padding: "8px" }}>{`$ ${p.price}`}</td>
                    <td style={{ padding: "8px" }}>
                      <input
                        type="number"
                        min="1"
                        value={p.qty}
                        onChange={(e) =>
                          handleQtyChange(p.code, Math.max(1, Number(e.target.value)))
                        }
                        style={{ width: 70, padding: "6px" }}
                      />
                    </td>
                    <td style={{ padding: "8px" }}>
                      {`$ ${Number(p.price || 0) * (p.qty || 1)}`}
                    </td>
                    <td style={{ padding: "8px" }}>
                      <button
                        onClick={() => handleRemove(p.code)}
                        style={{
                          background: "#ff6b6b",
                          color: "#fff",
                          border: "none",
                          padding: "8px 10px",
                          borderRadius: 6,
                          cursor: "pointer",
                        }}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ marginTop: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button
                onClick={handleClear}
                style={{
                  background: "#ccc",
                  color: "#222",
                  border: "none",
                  padding: "10px 14px",
                  borderRadius: 6,
                  cursor: "pointer",
                }}
              >
                Limpiar carrito
              </button>

              <div style={{ fontWeight: 700, fontSize: "1.15rem" }}>
                Total: <span style={{ color: "#2E8B57" }}>{` $ ${total}`}</span>
              </div>
            </div>
          </>
        )}
      </main>
      </div>
      
      <Footer />
    </>
  );
}

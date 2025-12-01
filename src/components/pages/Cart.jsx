// src/components/pages/Cart.jsx
import React, { useEffect, useMemo, useState } from "react";
import First from "../organisms/First";
import Footer from "../organisms/Footer";
import {
  getCurrentUser,
  fetchCarritoActivo,
  updateCarritoItem,
  removeCarritoItem,
  clearCarrito,
} from "../../api";

export default function Cart() {
  const [user, setUser] = useState(null);
  const [carrito, setCarrito] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 1) Cargar usuario actual y luego su carrito
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");

      try {
        const u = await getCurrentUser(); // lee token, llama a /me
        setUser(u);

        const c = await fetchCarritoActivo(u.id); // GET /api/v1/carritos/{usuarioId}
        setCarrito(c);
      } catch (err) {
        console.error(err);
        setError(err.message || "Error al cargar carrito.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const items = carrito?.items || [];

  const total = useMemo(
    () =>
      items.reduce((acc, item) => {
        const precio = item.precioUnitario || item.producto?.precio || 0;
        return acc + precio * (item.cantidad || 1);
      }, 0),
    [items]
  );

  async function handleRemove(itemId) {
    if (!user || !carrito) return;
    try {
      const updated = await removeCarritoItem(user.id, itemId);
      setCarrito(updated);
    } catch (err) {
      console.error(err);
      alert(err.message || "Error al eliminar ítem del carrito.");
    }
  }

  async function handleClear() {
    if (!user) return;
    try {
      await clearCarrito(user.id);
      setCarrito({ ...carrito, items: [], total: 0 });
    } catch (err) {
      console.error(err);
      alert(err.message || "Error al limpiar el carrito.");
    }
  }

  async function handleQtyChange(itemId, newQty) {
    if (!user || !carrito) return;
    if (newQty < 1) return;

    try {
      const updated = await updateCarritoItem(user.id, itemId, newQty);
      setCarrito(updated);
    } catch (err) {
      console.error(err);
      alert(err.message || "Error al actualizar la cantidad.");
    }
  }

  return (
    <>
      <First />

      <div className="cartdiv">
        <main>
          <h2>Carrito de compras</h2>

          {loading && <p>Cargando carrito...</p>}

          {error && !loading && (
            <p style={{ color: "red" }}>{error}</p>
          )}

          {!loading && !user && (
            <div
              style={{
                padding: "2rem 0",
                textAlign: "center",
                fontSize: "1.2rem",
                width: "40vw",
                margin: "0 auto",
              }}
            >
              <p>Debes iniciar sesión para ver tu carrito.</p>
            </div>
          )}

          {!loading && user && items.length === 0 && !error && (
            <div
              style={{
                padding: "2rem 0",
                textAlign: "center",
                fontSize: "1.2rem",
                width: "40vw",
                margin: "0 auto",
              }}
            >
              <p>
                Tu carrito está vacío. <a href="/catalogo">Ir al catálogo</a>
              </p>
            </div>
          )}

          {!loading && user && items.length > 0 && (
            <>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr
                    style={{ textAlign: "left", borderBottom: "1px solid #ddd" }}
                  >
                    <th style={{ padding: "8px" }}>Producto</th>
                    <th style={{ padding: "8px" }}>Imagen</th>
                    <th style={{ padding: "8px" }}>Precio</th>
                    <th style={{ padding: "8px" }}>Cantidad</th>
                    <th style={{ padding: "8px" }}>Subtotal</th>
                    <th style={{ padding: "8px" }}>Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {items.map((item) => {
                    const precio =
                      item.precioUnitario || item.producto?.precio || 0;

                    return (
                      <tr
                        key={item.id}
                        style={{ borderBottom: "1px solid #f0f0f0" }}
                      >
                        <td style={{ padding: "12px 8px" }}>
                          {item.producto?.nombre || "Producto"}
                        </td>
                        <td style={{ padding: "8px" }}>
                          {item.producto?.imagenUrl && (
                            <img
                              src={item.producto.imagenUrl}
                              alt={item.producto.nombre}
                              style={{
                                width: 80,
                                height: 60,
                                objectFit: "cover",
                              }}
                            />
                          )}
                        </td>
                        <td style={{ padding: "8px" }}>{`$ ${precio}`}</td>
                        <td style={{ padding: "8px" }}>
                          <input
                            type="number"
                            min="1"
                            value={item.cantidad}
                            onChange={(e) =>
                              handleQtyChange(
                                item.id,
                                Math.max(1, Number(e.target.value))
                              )
                            }
                            style={{ width: 70, padding: "6px" }}
                          />
                        </td>
                        <td style={{ padding: "8px" }}>
                          {`$ ${precio * (item.cantidad || 1)}`}
                        </td>
                        <td style={{ padding: "8px" }}>
                          <button
                            onClick={() => handleRemove(item.id)}
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
                    );
                  })}
                </tbody>
              </table>

              <div
                style={{
                  marginTop: "1rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
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
                  Total:{" "}
                  <span style={{ color: "#2E8B57" }}>{`$ ${total}`}</span>
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

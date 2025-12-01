// src/components/pages/AdminPanel.jsx
import React, { useEffect, useState } from "react";
import First from "../organisms/First";
import Footer from "../organisms/Footer";
import {
  fetchProductos,
  getCurrentUser,
  apiFetch,
} from "../../api";

export default function AdminPanel() {
  const [loading, setLoading] = useState(true);
  const [productos, setProductos] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    setError("");

    try {
      const user = await getCurrentUser();

      // Validación extra (no necesaria si el backend ya protege)
      if (!user || !user.roles?.includes("ADMIN")) {
        setError("No tienes permisos para acceder al panel de administración.");
        setLoading(false);
        return;
      }

      const data = await fetchProductos();
      setProductos(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function openEditor(prod) {
    setEditProduct({ ...prod });
  }

  function closeEditor() {
    setEditProduct(null);
  }

  async function saveProduct() {
    try {
      const res = await apiFetch(
        `/api/v1/productos/${editProduct.id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            nombre: editProduct.nombre,
            descripcion: editProduct.descripcion,
            precio: editProduct.precio,
            stock: editProduct.stock,
            codigo: editProduct.codigo,
            imagenUrl: editProduct.imagenUrl,
            categoria: editProduct.categoria,
          }),
        }
      );

      if (!res.ok) {
        throw new Error(`Error al guardar cambios. HTTP ${res.status}`);
      }

      closeEditor();
      load(); // recargar lista
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  return (
    <>
      <First />

      <div className="admin-wrapper" style={{ marginTop: "6rem", padding: "2rem" }}>
        <h1>Panel de Administración</h1>

        {loading && <p>Cargando...</p>}
        {error && (
          <div style={{ color: "red", padding: "1rem" }}>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Tabla de productos */}
            <h2>Productos</h2>

            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #ccc" }}>
                  <th>ID</th>
                  <th>Imagen</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Editar</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((p) => (
                  <tr key={p.id} style={{ borderBottom: "1px solid #eee" }}>
                    <td>{p.id}</td>
                    <td>
                      <img
                        src={p.imagenUrl}
                        alt={p.nombre}
                        style={{ width: "70px", height: "50px", objectFit: "cover" }}
                      />
                    </td>
                    <td>{p.nombre}</td>
                    <td>$ {p.precio}</td>
                    <td>{p.stock}</td>
                    <td>
                      <button
                        onClick={() => openEditor(p)}
                        style={{
                          background: "#2E8B57",
                          color: "white",
                          padding: "6px 10px",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Modal de edición */}
            {editProduct && (
              <div
                className="modal-overlay"
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100vw",
                  height: "100vh",
                  background: "rgba(0,0,0,0.6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  className="modal"
                  style={{
                    background: "white",
                    padding: "2rem",
                    borderRadius: "10px",
                    width: "500px",
                    maxHeight: "80vh",
                    overflowY: "auto",
                  }}
                >
                  <h2>Editar producto</h2>

                  <label>Nombre:</label>
                  <input
                    type="text"
                    value={editProduct.nombre}
                    onChange={(e) =>
                      setEditProduct({ ...editProduct, nombre: e.target.value })
                    }
                    style={{ width: "100%", marginBottom: "1rem" }}
                  />

                  <label>Descripción:</label>
                  <textarea
                    value={editProduct.descripcion}
                    onChange={(e) =>
                      setEditProduct({ ...editProduct, descripcion: e.target.value })
                    }
                    style={{ width: "100%", marginBottom: "1rem" }}
                  />

                  <label>Precio:</label>
                  <input
                    type="number"
                    value={editProduct.precio}
                    onChange={(e) =>
                      setEditProduct({
                        ...editProduct,
                        precio: Number(e.target.value),
                      })
                    }
                    style={{ width: "100%", marginBottom: "1rem" }}
                  />

                  <label>Stock:</label>
                  <input
                    type="number"
                    value={editProduct.stock}
                    onChange={(e) =>
                      setEditProduct({
                        ...editProduct,
                        stock: Number(e.target.value),
                      })
                    }
                    style={{ width: "100%", marginBottom: "1rem" }}
                  />

                  <label>Imagen URL:</label>
                  <input
                    type="text"
                    value={editProduct.imagenUrl}
                    onChange={(e) =>
                      setEditProduct({ ...editProduct, imagenUrl: e.target.value })
                    }
                    style={{ width: "100%", marginBottom: "1rem" }}
                  />

                  <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                    <button
                      onClick={saveProduct}
                      style={{
                        background: "#2E8B57",
                        color: "white",
                        padding: "10px 15px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Guardar
                    </button>

                    <button
                      onClick={closeEditor}
                      style={{
                        background: "#888",
                        color: "white",
                        padding: "10px 15px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </>
  );
}

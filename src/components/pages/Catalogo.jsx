import React, { useEffect, useMemo, useState } from "react";
import Product from "../organisms/Product";
import First from "../organisms/First";
import Footer from "../organisms/Footer";
import FilterBar from "../organisms/FilterBar";
import { fetchProductos } from "../../api";

export default function Catalogo() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("all"); // all | vr | po | fr
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError("");
      try {
        const data = await fetchProductos();
        if (!cancelled) {
          setProducts(data || []);
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) {
          // si es 401/403, probablemente falta login
          if (err.status === 401 || err.status === 403) {
            setError("Debes iniciar sesión para ver el catálogo.");
          } else {
            setError("No se pudieron cargar los productos. Intenta nuevamente.");
          }
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // filtrado según prefijo del código (VR / PO / FR)
  const filtered = useMemo(() => {
    if (!filter || filter === "all") return products;
    const prefix = filter.toUpperCase(); // VR, PO, FR
    return products.filter((p) => p.codigo && p.codigo.startsWith(prefix));
  }, [filter, products]);

  return (
    <>
      <First />
      <div id="products" style={{ paddingTop: "5rem" }}>
        <div>
          <h1>Catálogo de productos</h1>
          <h2>Explora nuestra selección de productos frescos y de calidad.</h2>
        </div>

        {/* Barra de filtros */}
        <FilterBar active={filter} onChange={(cat) => setFilter(cat)} />

        {/* Estado de carga / error / lista */}
        {loading ? (
          <p style={{ padding: "2rem 0" }}>Cargando productos...</p>
        ) : error ? (
          <p style={{ padding: "2rem 0", color: "red" }}>{error}</p>
        ) : (
          <div className="product-list">
            {filtered.map((p) => (
              <Product
                key={p.id || p.codigo}
                productId={p.id}            // 👈 nuevo
                code={p.codigo}
                image={p.imagenUrl}
                name={p.nombre}
                description={p.descripcion}
                price={p.precio}
              />
            ))}

            {filtered.length === 0 && (
              <p style={{ padding: "2rem 0" }}>
                No hay productos para esta categoría.
              </p>
            )}
          </div>

        )}
      </div>
      <Footer />
    </>
  );
}

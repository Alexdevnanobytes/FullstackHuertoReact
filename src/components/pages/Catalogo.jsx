import React, { useMemo, useState } from "react";
import Product from "../organisms/Product";
import First from "../organisms/First";
import Footer from "../organisms/Footer";
import FilterBar from "../organisms/FilterBar";

export default function Catalogo() {
  // datos (tomados de tu listado)
  const PRODUCTS = [
    { code: "VR01", image: "/img/pimenton-rojo.png", name: "Pimentón rojo", description: "Pimentón fresco y crujiente, ideal para ensaladas", price: "1200" },
    { code: "VR02", image: "/img/pimenton-amarillo.png", name: "Pimentón amarillo", description: "Pimentón fresco y crujiente, ideal para ensaladas", price: "1000" },
    { code: "VR03", image: "/img/pimenton-verde.png", name: "Pimentón verde", description: "Pimentón fresco y crujiente, ideal para ensaladas", price: "500" },
    { code: "VR04", image: "/img/lechuga-hidroponica.png", name: "Lechuga hidropónica", description: "Lechuga fresca y crujiente para ensaladas saludables", price: "300" },
    { code: "VR05", image: "/img/betarraga.png", name: "Betarraga 3un", description: "Betarraga fresca y dulce, perfecta para ensaladas", price: "700" },
    { code: "PO01", image: "/img/miel.png", name: "Miel 1KG", description: "Miel fresca y dulce, perfecta para endulzar tus platos", price: "5000" },
    { code: "FR01", image: "/img/platano.png", name: "Plátano KG", description: "Plátanos frescos y dulces, perfectos para batidos", price: "1250" },
    { code: "PO02", image: "/img/quinoa.png", name: "Quinoa KG", description: "Quinoa fresca y nutritiva, perfecta para ensaladas", price: "6500" },
    { code: "FR02", image: "/img/naranja.png", name: "Naranja KG", description: "Naranjas frescas y jugosas, perfectas para el desayuno", price: "850" },
    { code: "PO03", image: "/img/leche.png", name: "Leche 1L", description: "Leche fresca y cremosa, perfecta para el desayuno", price: "1050" },
    { code: "FR03", image: "/img/manzana.png", name: "Manzana KG", description: "Manzanas frescas y crujientes, perfectas para el desayuno", price: "850" },
  ];

  const [filter, setFilter] = useState("all"); // all | vr | po | fr

  // memoizamos el filtrado
  const filtered = useMemo(() => {
    if (!filter || filter === "all") return PRODUCTS;
    const codePrefix = filter.toUpperCase(); // "VR","PO","FR"
    return PRODUCTS.filter((p) => p.code.startsWith(codePrefix));
  }, [filter]);

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

        {/* Lista filtrada */}
        <div className="product-list">
          {filtered.map((p) => (
            <Product
              key={p.code}
              code={p.code}
              image={p.image}
              name={p.name}
              description={p.description}
              price={p.price}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

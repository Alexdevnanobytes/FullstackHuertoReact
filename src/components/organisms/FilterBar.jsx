import React from "react";

/**
 * FilterBar component (organism)
 * props:
 *  - active (string) : código de categoría activa ("all" | "vr" | "po" | "fr")
 *  - onChange(category) : callback al cambiar filtro
 */
export default function FilterBar({ active = "all", onChange = () => {} }) {
  const buttons = [
    { code: "all", label: "Todos" },
    { code: "vr", label: "Verduras" },
    { code: "po", label: "Orgánico" },
    { code: "fr", label: "Frutas" },
  ];

  return (
    <div className="filter-bar" role="region" aria-label="Filtros del catálogo">
      <div className="filter-bar-inner" role="tablist" aria-label="Categorías">
        {buttons.map((b) => (
          <button
            key={b.code}
            type="button"
            className={`filter-btn ${active === b.code ? "active" : ""}`}
            data-cat={b.code}
            aria-pressed={active === b.code}
            role="tab"
            onClick={() => onChange(b.code)}
          >
            {b.label}
          </button>
        ))}
      </div>
    </div>
  );
}

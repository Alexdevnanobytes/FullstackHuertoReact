// src/__tests__/Carrito.test.jsx
/* eslint-env jest */
import React from "react";
import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import { render, screen, fireEvent, within } from "@testing-library/react";
import Cart from "../components/pages/Cart";

// Mock de los componentes que no se testean
jest.mock("../components/organisms/First", () => () => <div>First Component</div>);
jest.mock("../components/organisms/Footer", () => () => <div>Footer Component</div>);

const mockProducts = [
  {
    code: "VR01",
    image: "/img/pimenton-rojo.png",
    name: "Pimentón rojo",
    description: "Pimentón fresco y crujiente",
    price: "1200",
    qty: 2
  },
  {
    code: "VR02",
    image: "/img/pimenton-amarillo.png",
    name: "Pimentón amarillo",
    description: "Pimentón fresco y crujiente",
    price: "1000",
    qty: 1
  },
];

describe("Cart Component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("Renderiza carrito vacío si no hay productos", () => {
    render(<Cart />);
    expect(screen.getByText(/Tu carrito está vacío/i)).toBeInTheDocument();
    expect(screen.getByText(/Ir al catálogo/i)).toBeInTheDocument();
  });

  it("Renderiza productos desde localStorage y calcula total correctamente", () => {
    localStorage.setItem("products", JSON.stringify(mockProducts));
    render(<Cart />);

    const rows = screen.getAllByRole("row");
    const productRows = rows.slice(1); // saltamos la cabecera

    // --- Producto 1 (fila 0)
    expect(within(productRows[0]).getByText("Pimentón rojo")).toBeInTheDocument();

    // precio unitario columna 5 (td:nth-child(5))
    const unitPriceRow0 = productRows[0].querySelector("td:nth-child(5)");
    expect(unitPriceRow0).toHaveTextContent("$ 1200");

    // subtotal columna 7
    const subtotalRow0 = productRows[0].querySelector("td:nth-child(7)");
    expect(subtotalRow0).toHaveTextContent("$ 2400");

    // --- Producto 2 (fila 1)
    expect(within(productRows[1]).getByText("Pimentón amarillo")).toBeInTheDocument();

    // precio unitario columna 5 (distinto elemento al subtotal aunque el texto sea igual)
    const unitPriceRow1 = productRows[1].querySelector("td:nth-child(5)");
    expect(unitPriceRow1).toHaveTextContent("$ 1000");

    // subtotal columna 7
    const subtotalRow1 = productRows[1].querySelector("td:nth-child(7)");
    expect(subtotalRow1).toHaveTextContent("$ 1000");

    // Total final: buscar el span que contiene el total
    const totalWrapper = screen.getByText(/Total:/).parentElement;
    const totalSpan = totalWrapper ? totalWrapper.querySelector("span") : null;
    expect(totalSpan).not.toBeNull();
    expect(totalSpan).toHaveTextContent("$ 3400");
  });

  it("Eliminar un producto actualiza carrito y total", () => {
    localStorage.setItem("products", JSON.stringify(mockProducts));
    render(<Cart />);

    let rows = screen.getAllByRole("row");
    let productRows = rows.slice(1);

    // Eliminar primer producto (fila 0)
    const deleteButton = productRows[0].querySelector("button");
    expect(deleteButton).toBeInTheDocument();
    fireEvent.click(deleteButton);

    // Reconsultar DOM
    expect(screen.queryByText("Pimentón rojo")).not.toBeInTheDocument();
    expect(screen.getByText("Pimentón amarillo")).toBeInTheDocument();

    // Total actualizado (debe ser 1000)
    const totalWrapper = screen.getByText(/Total:/).parentElement;
    const totalSpan = totalWrapper ? totalWrapper.querySelector("span") : null;
    expect(totalSpan).toHaveTextContent("$ 1000");
  });

  it("Cambiar cantidad de un producto actualiza subtotal y total", () => {
    localStorage.setItem("products", JSON.stringify(mockProducts));
    render(<Cart />);

    // Obtener fila del segundo producto (Pimentón amarillo)
    let rows = screen.getAllByRole("row");
    let productRows = rows.slice(1);
    const qtyInput = productRows[1].querySelector('input[type="number"]');
    expect(qtyInput).toBeInTheDocument();

    // Cambiar cantidad a 3
    fireEvent.change(qtyInput, { target: { value: "3" } });

    // Reconsultar filas (react debería haber re-renderizado)
    rows = screen.getAllByRole("row");
    productRows = rows.slice(1);

    // Subtotal columna 7 de la fila 1 = 1000 * 3 = 3000
    const subtotalRow1 = productRows[1].querySelector("td:nth-child(7)");
    expect(subtotalRow1).toHaveTextContent("$ 3000");

    // Total actualizado: 1200*2 + 1000*3 = 2400 + 3000 = 5400
    const totalWrapper = screen.getByText(/Total:/).parentElement;
    const totalSpan = totalWrapper ? totalWrapper.querySelector("span") : null;
    expect(totalSpan).toHaveTextContent("$ 5400");
  });

  it("Limpiar carrito elimina todos los productos y limpia localStorage", () => {
    localStorage.setItem("products", JSON.stringify(mockProducts));
    render(<Cart />);

    const clearButton = screen.getByText("Limpiar carrito");
    fireEvent.click(clearButton);

    // El DOM muestra carrito vacío
    expect(screen.getByText(/Tu carrito está vacío/i)).toBeInTheDocument();

    // localStorage puede contener "[]" o no; parseamos y validamos longitud 0
    const stored = JSON.parse(localStorage.getItem("products") || "[]");
    expect(Array.isArray(stored)).toBeTruthy();
    expect(stored).toHaveLength(0);
  });
});

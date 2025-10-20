// src/__tests__/Catalogo.test.jsx
import React from 'react';
import { describe, it, expect, beforeEach } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Catalogo from '../components/pages/Catalogo';

const mockProducts = [
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
  { code: "FR03", image: "/img/manzana.png", name: "Manzana KG", description: "Manzanas frescas y crujientes, perfectas para el desayuno", price: "850" }
];

describe('Catalogo', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Catalogo products={mockProducts} />
      </MemoryRouter>
    );
  });

  it('muestra todos los productos inicialmente', () => {
    mockProducts.forEach(product => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
    });
  });

  it('filtra productos correctamente al seleccionar categoría', () => {
    // Suponiendo que tus botones de filtro tienen data-cat con las categorías
    const verdurasBtn = screen.getByRole('tab', { name: /Verduras/i });
    fireEvent.click(verdurasBtn);

    // Solo deberían aparecer los productos de la categoría "vr"
    const verduras = mockProducts.filter(p => p.code.startsWith('VR'));
    verduras.forEach(product => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
    });

    // Productos que no son de "vr" no deberían estar
    const otros = mockProducts.filter(p => !p.code.startsWith('VR'));
    otros.forEach(product => {
      expect(screen.queryByText(product.name)).not.toBeInTheDocument();
    });
  });
});

// src/__tests__/Product.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Product from '../components/organisms/Product';


test('se renderiza el producto con nombre, precio y botón', () => {
  render(
    <Product
      code="VR01"
      image="/img/pimenton-rojo.png"
      name="Pimentón rojo"
      description="Fresco y crujiente"
      price="1200"
    />
  );

  expect(screen.getByText('Pimentón rojo')).toBeInTheDocument();
  expect(screen.getByText('$ 1200')).toBeInTheDocument();
  expect(screen.getByText('Añadir al carro')).toBeInTheDocument();
});

test('al hacer click en el botón, se agrega al carrito en localStorage', () => {
  render(
    <Product
      code="VR01"
      image="/img/pimenton-rojo.png"
      name="Pimentón rojo"
      description="Fresco y crujiente"
      price="1200"
    />
  );

  const button = screen.getByText('Añadir al carro');
  fireEvent.click(button);

  const cart = JSON.parse(localStorage.getItem('products'));
  expect(cart.length).toBe(1);
  expect(cart[0].code).toBe('VR01');
  expect(cart[0].qty).toBe(1);
});

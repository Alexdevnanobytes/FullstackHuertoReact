// src/__tests__/FilterBar.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { it, jest, expect } from '@jest/globals';
import FilterBar from '../components/organisms/FilterBar';

it('se renderizan los botones de filtro correctamente', () => {
  const onChangeMock = jest.fn();

  render(<FilterBar active="all" onChange={onChangeMock} />);

  // Verificar que existan los tabs
  expect(screen.getByRole('tab', { name: /Verduras/i })).toBeInTheDocument();
  expect(screen.getByRole('tab', { name: /Frutas/i })).toBeInTheDocument();
  expect(screen.getByRole('tab', { name: /Orgánico/i })).toBeInTheDocument();
});

it('al hacer click en un tab se llama onChange con la categoría correcta', () => {
  const onChangeMock = jest.fn();

  render(<FilterBar active="all" onChange={onChangeMock} />);

  fireEvent.click(screen.getByRole('tab', { name: /Verduras/i }));
  expect(onChangeMock).toHaveBeenCalledWith('vr');

  fireEvent.click(screen.getByRole('tab', { name: /Frutas/i }));
  expect(onChangeMock).toHaveBeenCalledWith('fr');

  fireEvent.click(screen.getByRole('tab', { name: /Orgánico/i }));
  expect(onChangeMock).toHaveBeenCalledWith('po');
});


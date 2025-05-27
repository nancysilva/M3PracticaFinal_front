import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';

describe('Login Page', () => {
  it('debería renderizar el botón "Entrar"', () => {
    render(
      <MemoryRouter>
        <Login setIsAuthenticated={() => {}} />
      </MemoryRouter>
    );
    const button = screen.getByRole('button', { name: /entrar/i });
    expect(button).toBeInTheDocument();
  });
});

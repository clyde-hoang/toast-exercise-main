import React from 'react';
import { screen, render } from '@testing-library/react';
import App from './App';
import { SnackbarProvider } from "notistack"

test('renders header text', () => {
  render(
    <SnackbarProvider>
      <App />
    </SnackbarProvider>
  );

  const heading  = screen.getByRole('heading', { name: /toast exercise/i});
  expect(heading).toBeInTheDocument();
});

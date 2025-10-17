import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders customer insights', () => {
  render(<App />);
  const linkElement = screen.getByText(/Customer Insights/i);
  expect(linkElement).toBeInTheDocument();
});

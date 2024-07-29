import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../App';

test('renders App component', () => {
  render(
    <Router>
      <App />
    </Router>
  );
  const homeElement = screen.getByText(/Home/i);
  expect(homeElement).toBeInTheDocument();
});
import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders owners link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/owners/i);
  expect(linkElement).toBeInTheDocument();
});

import { render, screen } from '@testing-library/react';
import App from './App';

test('renders label', () => {
  render(<App />);

  const linkElement = screen.getByText(/Please choose timezone:/i);
  expect(linkElement).toBeInTheDocument();
});

// TODO add more tests
// sorry, don't have enough time for this
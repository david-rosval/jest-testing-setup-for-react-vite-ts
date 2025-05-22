// src/components/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

test('Trigger the click event', () => {
  const handleClick = jest.fn(() => console.log('Function handleClick executed')); // For toHaveBeenCalledTimes to work handleClick must be a mock or spy created by Jest
  render(<Button onClick={handleClick} />);
  fireEvent.click(screen.getByText(/click me/i));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
// src/components/Button.tsx
export const Button = ({ onClick }: { onClick: () => void }) => (
  <button onClick={onClick}>Click me</button>
);
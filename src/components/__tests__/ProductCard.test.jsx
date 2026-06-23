import { render, screen } from '@testing-library/react';
import ProductCard from '../ProductCard';
import { CartProvider } from '../../context/CartContext';

test('renders product title correctly', () => {
  const product = { id: 1, title: 'Test Product', price: 10, image: '' };
  render(
    <CartProvider>
      <ProductCard product={product} />
    </CartProvider>
  );
  expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
});
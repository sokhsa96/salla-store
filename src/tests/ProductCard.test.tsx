import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProductCard from '@/components/products/ProductCard';

const mockProduct = {
  id: 1,
  title: 'Luxury Watch',
  price: 599.99,
  category: 'Accessories',
  description: 'A nice watch',
  image: '/watch.jpg',
  rating: { rate: 4.5, count: 10 }
};

describe('ProductCard Component', () => {
  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />);

    // Check if title is visible
    expect(screen.getByText('Luxury Watch')).toBeInTheDocument();
    
    // Check if category is visible
    expect(screen.getByText('Accessories')).toBeInTheDocument();

    // Check if price is visible (formatted)
    expect(screen.getByText('$599.99')).toBeInTheDocument();
  });

  it('renders the add to cart button', () => {
    render(<ProductCard product={mockProduct} />);
    
    // Look for the text "Add to Cart"
    expect(screen.getByText('Add to Cart')).toBeInTheDocument();
  });
});
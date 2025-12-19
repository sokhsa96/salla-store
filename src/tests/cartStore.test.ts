import { describe, it, expect, beforeEach } from 'vitest';
import { useCartStore } from '@/store/useCartStore';

// Mock product data
const productA = { id: 1, title: 'Test Product A', price: 100, image: '', category: 'test', description: '', rating: { rate: 5, count: 1 } };
const productB = { id: 2, title: 'Test Product B', price: 50, image: '', category: 'test', description: '', rating: { rate: 5, count: 1 } };

describe('Cart Store Logic', () => {
  // Reset store before each test
  beforeEach(() => {
    useCartStore.getState().clearCart();
  });

  it('should start with an empty cart', () => {
    const state = useCartStore.getState();
    expect(state.items).toHaveLength(0);
    expect(state.getTotalItems()).toBe(0);
  });

  it('should add an item to the cart', () => {
    useCartStore.getState().addItem(productA);
    
    const state = useCartStore.getState();
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(1);
    expect(state.getTotalPrice()).toBe(100);
  });

  it('should increase quantity if item already exists', () => {
    useCartStore.getState().addItem(productA);
    useCartStore.getState().addItem(productA); // Add again

    const state = useCartStore.getState();
    expect(state.items).toHaveLength(1); // Still 1 unique item
    expect(state.items[0].quantity).toBe(2); // Qty is 2
    expect(state.getTotalPrice()).toBe(200);
  });

  it('should calculate total price correctly with mixed items', () => {
    useCartStore.getState().addItem(productA); // 100
    useCartStore.getState().addItem(productB); // 50
    useCartStore.getState().addItem(productB); // 50

    const state = useCartStore.getState();
    expect(state.getTotalPrice()).toBe(200);
    expect(state.getTotalItems()).toBe(3);
  });
});
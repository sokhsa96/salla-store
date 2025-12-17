import { useState, useEffect } from 'react';
import { useCartStore } from '@/store/useCartStore';

export const useCart = () => {
  const store = useCartStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    useCartStore.persist.rehydrate(); // Force load from LocalStorage
    setIsMounted(true);
  }, []);

  return {
    ...store,
    // If not mounted yet, return 0 to match server state and avoid errors
    itemsCount: isMounted ? store.getTotalItems() : 0,
    cartTotal: isMounted ? store.getTotalPrice() : 0,
    isMounted
  };
};
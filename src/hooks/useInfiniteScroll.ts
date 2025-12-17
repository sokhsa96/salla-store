// src/hooks/useProducts.ts
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import { Product } from '@/types';

// Fetcher function
const fetchProducts = async (): Promise<Product[]> => {
  const { data } = await api.get('/products');
  return data;
};

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });
};
import { useInfiniteQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import { Product } from '@/types';

// Filters Interface
export interface ProductFilters {
  search: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
}

const ITEMS_PER_PAGE = 8;

export const useProductList = (filters: ProductFilters) => {
  return useInfiniteQuery({
    queryKey: ['products', filters],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      // 1. Fetch ALL data (Simulating DB access)
      const { data } = await api.get<Product[]>('/products');

      // 2. CLIENT-SIDE FILTERING (Simulating Backend Logic)
      let filtered = data.filter((item) => {
        const matchesSearch = item.title.toLowerCase().includes(filters.search.toLowerCase());
        const matchesCategory = filters.category === 'all' || item.category === filters.category;
        const matchesPrice = item.price >= filters.minPrice && item.price <= filters.maxPrice;
        const matchesRating = item.rating.rate >= filters.minRating;

        return matchesSearch && matchesCategory && matchesPrice && matchesRating;
      });

      // 3. PAGINATION (Slicing the array to simulate pages)
      const start = (pageParam - 1) * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE;
      const pageData = filtered.slice(start, end);

      // Simulate Network Delay for "Smooth Animation" feel
      await new Promise(r => setTimeout(r, 800));

      return {
        items: pageData,
        nextPage: end < filtered.length ? pageParam + 1 : undefined,
        total: filtered.length
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
};
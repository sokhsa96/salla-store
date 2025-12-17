'use client';

import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDebounce } from 'use-debounce';
import { SlidersHorizontal, Search, Loader2 } from 'lucide-react';

import { useProductList, ProductFilters } from '@/hooks/useProductList';
import ProductCard from './ProductCard';
import ProductSkeleton from './ProductSkeleton';
import FilterSidebar from './FilterSidebar';
import { Input } from '@/components/ui/Input';

// Mock Categories (Since API is static)
const CATEGORIES = ["electronics", "jewelery", "men's clothing", "women's clothing"];

export default function ProductList() {
  // 1. Local State for Filters
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 500); // Wait 500ms before filtering
  
  const [filters, setFilters] = useState<ProductFilters>({
    search: "",
    category: "all",
    minPrice: 0,
    maxPrice: 1000,
    minRating: 0
  });

  // Sync Search Input with Filters
  useEffect(() => {
    setFilters(prev => ({ ...prev, search: debouncedSearch }));
  }, [debouncedSearch]);

  // 2. Fetch Data (Infinite Query)
  const { 
    data, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage, 
    isLoading 
  } = useProductList(filters);

  // 3. Infinite Scroll Trigger
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  // Flatten pages into one array
  const allProducts = data?.pages.flatMap((page) => page.items) || [];

  return (
    <div className="flex flex-col lg:flex-row gap-8 relative min-h-screen">
      
      {/* --- DESKTOP SIDEBAR --- */}
      <div className="hidden lg:block w-64 shrink-0 sticky top-24 h-[calc(100vh-100px)]">
        <FilterSidebar 
          filters={filters} 
          setFilters={setFilters} 
          categories={CATEGORIES}
          className="border rounded-2xl shadow-sm h-full"
        />
      </div>

      {/* --- MOBILE SIDEBAR DRAWER (Simple Overlay) --- */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowMobileFilters(false)} />
          <div className="absolute inset-y-0 start-0 w-[80%] max-w-sm bg-white shadow-2xl animate-in slide-in-from-start duration-300">
            <FilterSidebar 
              filters={filters} 
              setFilters={setFilters} 
              categories={CATEGORIES} 
              closeMobile={() => setShowMobileFilters(false)} 
            />
          </div>
        </div>
      )}

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 flex flex-col w-full">
        
        {/* Top Bar: Search & Mobile Filter Toggle */}
        <div className="flex items-center gap-4 mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100 sticky top-[72px] z-30 lg:static">
          <button 
            onClick={() => setShowMobileFilters(true)}
            className="lg:hidden p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <SlidersHorizontal size={20} className="text-gray-700" />
          </button>

          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
          
          <div className="hidden sm:block text-sm text-gray-500">
             Showing <span className="font-bold text-foreground">{allProducts.length}</span> results
          </div>
        </div>

        {/* Product Grid */}
        {isLoading ? (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
             {[...Array(6)].map((_, i) => <ProductSkeleton key={i} />)}
           </div>
        ) : allProducts.length === 0 ? (
           <div className="flex flex-col items-center justify-center py-20 text-center">
             <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Search size={32} className="text-gray-400" />
             </div>
             <h3 className="text-lg font-bold">No products found</h3>
             <p className="text-gray-500">Try adjusting your filters or search term.</p>
           </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {allProducts.map((product, index) => (
              <div 
                key={`${product.id}-${index}`} 
                className="animate-in fade-in zoom-in duration-500 fill-mode-backwards"
                style={{ animationDelay: `${index % 8 * 50}ms` }} // Staggered Animation
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        {/* Infinite Scroll Loader */}
        <div ref={ref} className="w-full py-8 flex justify-center mt-4">
          {isFetchingNextPage && (
            <div className="flex items-center gap-2 text-primary">
              <Loader2 className="animate-spin" />
              <span className="text-sm font-medium">Loading more products...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
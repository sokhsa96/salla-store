'use client';

import { Star, X } from 'lucide-react';
import { ProductFilters } from '@/hooks/useProductList';
import { cn } from '@/lib/utils';

interface Props {
  filters: ProductFilters;
  setFilters: (f: ProductFilters) => void;
  categories: string[];
  className?: string;
  closeMobile?: () => void;
}

export default function FilterSidebar({ filters, setFilters, categories, className, closeMobile }: Props) {
  
  const updateFilter = (key: keyof ProductFilters, value: any) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <aside className={cn("w-full h-full bg-white p-6 overflow-y-auto", className)}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-foreground">Filters</h3>
        {closeMobile && (
          <button onClick={closeMobile} className="lg:hidden text-gray-500">
            <X size={24} />
          </button>
        )}
      </div>

      {/* --- Category Filter --- */}
      <div className="mb-8">
        <h4 className="text-sm font-semibold mb-3 text-primary">Category</h4>
        <div className="space-y-2">
          {['all', ...categories].map((cat) => (
            <label key={cat} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="category"
                checked={filters.category === cat}
                onChange={() => updateFilter('category', cat)}
                className="accent-primary w-4 h-4 cursor-pointer"
              />
              <span className="text-sm text-gray-600 group-hover:text-primary capitalize">
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* --- Price Range --- */}
      <div className="mb-8">
        <h4 className="text-sm font-semibold mb-3 text-primary">Price Range ($)</h4>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={filters.minPrice}
            onChange={(e) => updateFilter('minPrice', Number(e.target.value))}
            className="w-full p-2 border rounded-md text-sm"
            placeholder="Min"
          />
          <span className="text-gray-400">-</span>
          <input
            type="number"
            value={filters.maxPrice}
            onChange={(e) => updateFilter('maxPrice', Number(e.target.value))}
            className="w-full p-2 border rounded-md text-sm"
            placeholder="Max"
          />
        </div>
      </div>

      {/* --- Rating Filter --- */}
      <div className="mb-8">
        <h4 className="text-sm font-semibold mb-3 text-primary">Minimum Rating</h4>
        <div className="flex flex-col gap-2">
          {[4, 3, 2, 1].map((star) => (
            <button
              key={star}
              onClick={() => updateFilter('minRating', star)}
              className={cn(
                "flex items-center gap-2 text-sm px-2 py-1.5 rounded-md transition-colors w-full text-start",
                filters.minRating === star ? "bg-secondary/10 text-secondary-foreground" : "text-gray-500 hover:bg-gray-50"
              )}
            >
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={cn(
                      i < star ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    )}
                  />
                ))}
              </div>
              <span className="text-xs">& Up</span>
            </button>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={() => setFilters({ search: '', category: 'all', minPrice: 0, maxPrice: 1000, minRating: 0 })}
        className="w-full py-2 border border-gray-200 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
      >
        Reset Filters
      </button>
    </aside>
  );
}
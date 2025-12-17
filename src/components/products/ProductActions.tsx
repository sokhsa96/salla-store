'use client';

import { useState } from 'react';
import { ShoppingBag, Heart, Minus, Plus, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { Product } from '@/types';
import { cn } from '@/lib/utils';

export default function ProductActions({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    // Add item multiple times based on qty
    for (let i = 0; i < qty; i++) {
      addItem(product);
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6 animate-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-backwards">
      
      {/* Quantity & Actions Row */}
      <div className="flex items-center gap-4">
        {/* Quantity Selector */}
        <div className="flex items-center border border-gray-200 rounded-lg p-1 bg-gray-50">
          <button 
            onClick={() => setQty(q => Math.max(1, q - 1))}
            className="p-2 hover:bg-white rounded-md transition-colors text-gray-500"
          >
            <Minus size={18} />
          </button>
          <span className="w-10 text-center font-bold text-foreground">{qty}</span>
          <button 
             onClick={() => setQty(q => q + 1)}
             className="p-2 hover:bg-white rounded-md transition-colors text-gray-500"
          >
            <Plus size={18} />
          </button>
        </div>

        {/* Wishlist */}
        <button className="p-3 rounded-lg border border-gray-200 hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-all">
          <Heart size={20} />
        </button>
      </div>

      {/* Main Buttons */}
      <div className="flex flex-col gap-3">
        <button
          onClick={handleAddToCart}
          className={cn(
            "w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20",
            isAdded 
              ? "bg-green-600 text-white" 
              : "bg-primary text-white hover:bg-teal-700"
          )}
        >
          {isAdded ? (
            <>
              <CheckCircle2 size={22} /> Added to Cart
            </>
          ) : (
            <>
              <ShoppingBag size={22} /> Add to Cart
            </>
          )}
        </button>
        
        <button className="w-full py-4 rounded-xl font-bold text-lg border-2 border-primary text-primary hover:bg-primary/5 transition-all">
          Buy Now
        </button>
      </div>

      {/* Trust Micro-copy */}
      <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground mt-2">
        <div className="flex items-center gap-2">
          <ShieldCheck size={16} className="text-secondary" />
          <span>Secure Checkout</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 size={16} className="text-secondary" />
          <span>Authentic Product</span>
        </div>
      </div>
    </div>
  );
}
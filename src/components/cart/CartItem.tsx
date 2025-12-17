'use client';

import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType, useCartStore } from '@/store/useCartStore';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface Props {
  item: CartItemType;
}

export default function CartItem({ item }: Props) {
  const { updateQuantity, removeItem } = useCartStore();
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = () => {
    setIsRemoving(true);
    // Wait for animation to finish before actually removing
    setTimeout(() => removeItem(item.id), 300);
  };

  return (
    <div 
      className={cn(
        "group flex flex-col sm:flex-row items-center gap-6 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20",
        isRemoving ? "opacity-0 -translate-x-full" : "opacity-100"
      )}
    >
      {/* Product Image */}
      <Link href={`/product/${item.id}`} className="relative w-24 h-24 shrink-0 bg-gray-50 rounded-xl overflow-hidden p-2">
        <Image 
          src={item.image} 
          alt={item.title} 
          fill 
          className="object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" 
        />
      </Link>

      {/* Info */}
      <div className="flex-1 text-center sm:text-start">
        <h3 className="font-bold text-foreground line-clamp-1 mb-1">
          <Link href={`/product/${item.id}`} className="hover:text-primary transition-colors">
            {item.title}
          </Link>
        </h3>
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
          {item.category}
        </p>
        <div className="text-primary font-bold text-lg">
          ${(item.price * item.quantity).toFixed(2)}
          {item.quantity > 1 && (
             <span className="text-xs text-gray-400 font-normal ml-2">(${item.price} each)</span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Quantity Controls */}
        <div className="flex items-center border border-gray-200 rounded-lg p-1 bg-gray-50">
          <button 
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
            className="p-1.5 hover:bg-white rounded-md transition-colors text-gray-500 disabled:opacity-30"
          >
            <Minus size={16} />
          </button>
          
          <span className="w-8 text-center font-semibold text-sm">{item.quantity}</span>
          
          <button 
             onClick={() => updateQuantity(item.id, item.quantity + 1)}
             className="p-1.5 hover:bg-white rounded-md transition-colors text-gray-500 hover:text-primary"
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Remove Button */}
        <button 
          onClick={handleRemove}
          className="p-2 text-gray-400 hover:text-destructive hover:bg-red-50 rounded-full transition-all"
          title="Remove Item"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
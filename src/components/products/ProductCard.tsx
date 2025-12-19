'use client';

import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { ShoppingCart, Heart, Star, Eye } from 'lucide-react';
import { Product } from '@/types';
import { useCartStore } from '@/store/useCartStore';
import { cn } from '@/lib/utils'; // Assuming you have a class merger, if not use standard template literals
import { MouseEvent, useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Handle Add to Cart without navigating to product page
  const handleAddToCart = (e: MouseEvent) => {
    e.preventDefault(); // Stop Link navigation
    e.stopPropagation();
    
    setIsAdding(true);
    addItem(product);
    
    // Reset animation state
    setTimeout(() => setIsAdding(false), 500);
  };

  const handleWishlist = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <Link 
      href={`/product/${product.id}`}
      className="group relative block h-full w-full bg-card rounded-2xl border border-border/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden"
    >
      {/* --- IMAGE SECTION --- */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100">
        
        {/* The Image with Zoom Effect */}
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain p-6 transition-transform duration-700 ease-in-out group-hover:scale-110 mix-blend-multiply"
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 start-3 z-10 flex flex-col gap-2">
           {/* Discount Badge (Mocked logic) */}
           <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-destructive text-white shadow-md">
             -20%
           </span>
        </div>

        {/* Wishlist Button (Floating) */}
        <button
          onClick={handleWishlist}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={cn(
            "absolute top-3 end-3 z-10 p-2 rounded-full backdrop-blur-md transition-all duration-300 shadow-sm",
            isWishlisted 
              ? "bg-red-50 text-red-500" 
              : "bg-white/80 text-gray-600 hover:bg-white hover:text-red-500"
          )}
        >
          <Heart size={18} className={cn("transition-all", isWishlisted && "fill-current")} />
        </button>

        {/* --- SLIDE UP ACTION BAR (The "Luxury" Touch) --- */}
        <div className="absolute bottom-0 inset-x-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-20">
          <button
            onClick={handleAddToCart}
            aria-label={`Add ${product.title} to cart`}
            disabled={isAdding}
            className="w-full h-12 bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:bg-teal-700 transition-colors"
          >
            {isAdding ? (
               <span className="animate-pulse">Added!</span>
            ) : (
               <>
                 <ShoppingCart size={18} />
                 <span>Add to Cart</span>
               </>
            )}
          </button>
        </div>
      </div>

      {/* --- CONTENT SECTION --- */}
      <div className="p-5 flex flex-col gap-2">
        
        {/* Category */}
        <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
          {product.category}
        </div>

        {/* Title */}
        <h3 className="font-bold text-foreground line-clamp-2 min-h-[3rem] group-hover:text-primary transition-colors duration-300">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <Star size={14} className="fill-secondary text-secondary" />
          <span className="text-sm font-medium text-foreground">{product.rating.rate}</span>
          <span className="text-xs text-muted-foreground">({product.rating.count})</span>
        </div>

        {/* Price Section */}
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-bold text-primary">
            ${product.price.toFixed(2)}
          </span>
          {/* Mock Original Price */}
          <span className="text-sm text-muted-foreground line-through">
            ${(product.price * 1.2).toFixed(2)}
          </span>
        </div>
      </div>
    </Link>
  );
}
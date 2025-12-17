'use client';

import { useCart } from '@/hooks/useCart';
import { Link } from '@/i18n/navigation';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';

export default function CartPage() {
  // Use the safe hook to avoid hydration errors
  const { items, itemsCount, isMounted } = useCart();

  // 1. Loading State (Hydration)
  if (!isMounted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // 2. Empty State
  if (itemsCount === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag size={48} className="text-gray-300" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8 max-w-sm">
          Looks like you haven't added anything to your cart yet. Explore our luxury collection today.
        </p>
        <Link 
          href="/" 
          className="px-8 py-3 bg-primary text-white rounded-full font-semibold hover:bg-teal-700 transition-all shadow-lg"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  // 3. Main Cart View
  return (
    <div className="pb-20">
      <div className="flex items-center gap-2 mb-8 text-muted-foreground hover:text-primary transition-colors w-fit">
        <ArrowLeft size={16} />
        <Link href="/">Continue Shopping</Link>
      </div>

      <h1 className="text-3xl font-bold text-foreground mb-8">
        Shopping Cart <span className="text-lg font-normal text-gray-500">({itemsCount} items)</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column: Items List */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="animate-in slide-in-from-bottom-4 duration-500 fill-mode-backwards">
              <CartItem item={item} />
            </div>
          ))}
        </div>

        {/* Right Column: Summary */}
        <div className="lg:col-span-1 animate-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-backwards">
          <CartSummary />
        </div>
      </div>
    </div>
  );
}
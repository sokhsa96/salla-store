'use client';

import { ArrowRight, CreditCard, ShieldCheck } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

export default function CartSummary() {
  const { getTotalPrice } = useCartStore();
  const subtotal = getTotalPrice();
  const tax = subtotal * 0.15; // 15% VAT (Standard in KSA)
  const shipping = subtotal > 200 ? 0 : 25; // Logic: Free shipping over $200
  const total = subtotal + tax + shipping;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
      <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>

      <div className="space-y-4 mb-6 text-sm">
        <div className="flex justify-between text-muted-foreground">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-muted-foreground">
          <span>Tax (15% VAT)</span>
          <span>${tax.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-muted-foreground">
          <span>Shipping</span>
          <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
            {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
          </span>
        </div>

        <div className="h-px bg-gray-100 my-4" />

        <div className="flex justify-between text-lg font-bold text-foreground">
          <span>Total</span>
          <span className="text-primary">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <button className="w-full py-3.5 bg-primary text-white rounded-xl font-bold text-lg hover:bg-teal-700 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group mb-4">
        Checkout
        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
      </button>

      {/* Trust Badges */}
      <div className="flex flex-col gap-2 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg border border-gray-100">
        <div className="flex items-center gap-2">
           <ShieldCheck size={14} className="text-secondary" />
           <span>Secure SSL Encryption</span>
        </div>
        <div className="flex items-center gap-2">
           <CreditCard size={14} className="text-secondary" />
           <span>We accept Apple Pay & Mada</span>
        </div>
      </div>
    </div>
  );
}
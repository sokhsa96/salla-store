'use client';

import { Link } from '@/i18n/navigation';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative w-full h-[500px] md:h-[600px] bg-foreground overflow-hidden rounded-3xl shadow-2xl mb-12">
      
      {/* --- BACKGROUND EFFECTS --- */}
      {/* Gradient Blob 1 (Teal) */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-primary/30 rounded-full blur-[100px] animate-pulse" />
      
      {/* Gradient Blob 2 (Gold) */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] animate-bounce" style={{ animationDuration: '8s' }} />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

      {/* --- CONTENT --- */}
      <div className="relative z-10 h-full container mx-auto flex flex-col items-center justify-center text-center px-4">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-medium backdrop-blur-sm mb-6 animate-in slide-in-from-bottom-4 duration-700">
          <Sparkles size={12} className="text-secondary" />
          <span>New Collection 2024</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight animate-in slide-in-from-bottom-8 duration-1000 fill-mode-backwards">
          Experience the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Future</span> <br />
          of Shopping.
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10 animate-in slide-in-from-bottom-8 duration-1000 delay-200 fill-mode-backwards">
          Curated luxury items, delivered with speed. Explore our exclusive range of premium products designed for the modern lifestyle.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 animate-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-backwards">
          <Link 
            href="#catalog" 
            className="px-8 py-4 rounded-full bg-primary text-white font-bold text-lg hover:bg-teal-600 transition-all shadow-lg shadow-primary/25 flex items-center gap-2 group"
          >
            Start Shopping
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link 
            href="/login" 
            className="px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white font-semibold text-lg hover:bg-white/20 backdrop-blur-md transition-all"
          >
            Join Salla Club
          </Link>
        </div>

      </div>
    </section>
  );
}
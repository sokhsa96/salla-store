'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function ProductGallery({ image, title }: { image: string, title: string }) {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4 sticky top-24">
      {/* Mock Thumbnails (Luxury feel) */}
      <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-hide">
        {[image, image, image].map((src, i) => (
          <button
            key={i}
            className={cn(
              "relative w-20 h-20 rounded-lg border-2 overflow-hidden transition-all",
              i === 0 ? "border-primary ring-2 ring-primary/20" : "border-gray-100 hover:border-gray-300 opacity-70 hover:opacity-100"
            )}
          >
            <Image src={src} alt="thumbnail" fill className="object-contain p-2" />
          </button>
        ))}
      </div>

      {/* Main Image Stage */}
      <div 
        className="relative flex-1 aspect-square bg-white rounded-2xl border border-gray-100 overflow-hidden cursor-zoom-in group"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={(e) => {
          if (!isZoomed) return;
          const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
          const x = ((e.pageX - left) / width) * 100;
          const y = ((e.pageY - top) / height) * 100;
          e.currentTarget.style.setProperty('--x', `${x}%`);
          e.currentTarget.style.setProperty('--y', `${y}%`);
        }}
      >
        <Image
          src={image}
          alt={title}
          fill
          priority
          className={cn(
            "object-contain p-8 transition-transform duration-500 ease-out",
            isZoomed ? "scale-[2] origin-[var(--x)_var(--y)]" : "scale-100"
          )}
        />
        
        {/* Luxury Badge */}
        <div className="absolute top-4 left-4 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-in fade-in zoom-in duration-700">
          Best Seller
        </div>
      </div>
    </div>
  );
}
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Star, Truck, RefreshCcw } from 'lucide-react';
import api from '@/lib/axios';
import { Product } from '@/types';

import ProductGallery from '@/components/products/ProductGallery';
import ProductActions from '@/components/products/ProductActions';
import ProductList from '@/components/products/ProductList'; // Reused for "Related"

// 1. Dynamic SEO
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const { data } = await api.get<Product>(`/products/${id}`);
    return {
      title: `${data.title} | Salla Store`,
      description: data.description.slice(0, 150),
      openGraph: { images: [data.image] }
    };
  } catch (e) {
    return { title: 'Product Not Found' };
  }
}

// 2. Data Fetching
async function getProduct(id: string) {
  try {
    const { data } = await api.get<Product>(`/products/${id}`);
    return data;
  } catch (e) {
    return null;
  }
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) notFound();

  return (
    <div className="flex flex-col gap-16 pb-20">
      
      {/* --- TOP SECTION: GALLERY + DETAILS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        
        {/* Left: Gallery */}
        <ProductGallery image={product.image} title={product.title} />

        {/* Right: Info & Actions */}
        <div className="flex flex-col gap-8">
          
          {/* Header */}
          <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                {product.category}
              </span>
              
              {/* Rating Pill */}
              <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-full border border-gray-100">
                <Star size={14} className="fill-secondary text-secondary" />
                <span className="text-sm font-bold">{product.rating.rate}</span>
                <span className="text-xs text-muted-foreground">({product.rating.count} reviews)</span>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
              {product.title}
            </h1>

            {/* Price & Installments Mock */}
            <div className="border-b border-gray-100 pb-6">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-4xl font-bold text-primary">${product.price}</span>
                <span className="text-xl text-gray-400 line-through">${(product.price * 1.3).toFixed(2)}</span>
                <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-bold rounded">-30%</span>
              </div>
              <p className="text-sm text-gray-500">
                or 4 interest-free payments of <span className="font-bold text-foreground">${(product.price / 4).toFixed(2)}</span> with <span className="font-bold text-secondary">Tabby</span>
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="prose prose-sm text-gray-600 animate-in slide-in-from-bottom-4 duration-700 delay-100 fill-mode-backwards">
            <p className="leading-relaxed">{product.description}</p>
          </div>

          {/* Feature Toggles (Mock) */}
          <div className="grid grid-cols-2 gap-4 animate-in slide-in-from-bottom-4 duration-700 delay-200 fill-mode-backwards">
             <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-center gap-3">
               <div className="p-2 bg-white rounded-full shadow-sm text-primary"><Truck size={20}/></div>
               <div>
                 <p className="text-xs text-gray-500">Delivery</p>
                 <p className="text-sm font-bold">2-3 Days</p>
               </div>
             </div>
             <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-center gap-3">
               <div className="p-2 bg-white rounded-full shadow-sm text-primary"><RefreshCcw size={20}/></div>
               <div>
                 <p className="text-xs text-gray-500">Returns</p>
                 <p className="text-sm font-bold">Free 30 Days</p>
               </div>
             </div>
          </div>

          {/* Actions Component (Client Side) */}
          <ProductActions product={product} />

        </div>
      </div>

      {/* --- BOTTOM SECTION: RELATED PRODUCTS --- */}
      <div className="border-t border-gray-100 pt-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-foreground">You Might Also Like</h2>
          <a href="#" className="text-primary font-semibold hover:underline">View all</a>
        </div>
        {/* We reuse the ProductList but in a real app we'd pass a specific category */}
        <div className="relative overflow-hidden h-[500px]">
           <ProductList /> 
           {/* Note: In a real app, I would pass props to ProductList to filter by category: 'electronics' */}
        </div>
      </div>

    </div>
  );
}
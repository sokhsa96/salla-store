import { notFound } from 'next/navigation';
import { Star, Truck, RefreshCcw, AlertCircle, ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Product } from '@/types';

import ProductGallery from '@/components/products/ProductGallery';
import ProductActions from '@/components/products/ProductActions';
import ProductList from '@/components/products/ProductList';

/**
 * BEST PRACTICE: Unified Fetcher
 * We use native fetch here because Next.js 15 memoizes it.
 * This prevents double-calling the API for Metadata and the Page.
 */
async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      // Use no-cache during debugging to ensure we aren't seeing old 404s
      cache: 'no-store', 
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Fetch Error:", error);
    return null;
  }
}

// 1. DYNAMIC SEO (Fixed to use unified fetcher)
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) return { title: 'Product Not Found | Salla Store' };

  return {
    title: `${product.title} | Salla Store`,
    description: product.description.slice(0, 150),
    openGraph: { images: [product.image] }
  };
}

// 2. MAIN COMPONENT
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <div className="pb-20">
      {/* TERNARY LOGIC: If API fails, show Sorry UI, else show Product Page */}
      {!product ? (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8 bg-white rounded-3xl border-2 border-dashed border-gray-100 animate-in fade-in duration-500">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
            <AlertCircle size={32} />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">We couldn't find this product</h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            The external product catalog (FakeStoreAPI) might be experiencing issues or the product ID is invalid.
          </p>
          <Link href="/" className="flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-full font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20">
            <ArrowLeft size={18} />
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <ProductGallery image={product.image} title={product.title} />

            <div className="flex flex-col gap-8">
              <div className="space-y-4">
                <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{product.category}</span>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">{product.title}</h1>
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-bold text-primary">${product.price}</span>
                  <div className="flex items-center gap-1 bg-secondary/10 px-3 py-1 rounded-full text-secondary">
                    <Star size={16} className="fill-current" />
                    <span className="font-bold">{product.rating.rate}</span>
                  </div>
                </div>
              </div>

              <div className="prose prose-sm text-gray-600">
                <p className="leading-relaxed">{product.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 rounded-2xl bg-gray-50 flex items-center gap-3">
                   <div className="p-2 bg-white rounded-full text-primary"><Truck size={20}/></div>
                   <span className="text-sm font-bold">Free Delivery</span>
                 </div>
                 <div className="p-4 rounded-2xl bg-gray-50 flex items-center gap-3">
                   <div className="p-2 bg-white rounded-full text-primary"><RefreshCcw size={20}/></div>
                   <span className="text-sm font-bold">Free Returns</span>
                 </div>
              </div>

              <ProductActions product={product} />
            </div>
          </div>

          <div className="border-t border-gray-100 pt-16">
            <h2 className="text-2xl font-bold text-foreground mb-8">Related Products</h2>
            <ProductList />
          </div>
        </div>
      )}
    </div>
  );
}
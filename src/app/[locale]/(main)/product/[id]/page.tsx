import { Star, Truck, RefreshCcw, AlertCircle, ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Product } from '@/types';
import ProductGallery from '@/components/products/ProductGallery';
import ProductActions from '@/components/products/ProductActions';
import ProductList from '@/components/products/ProductList';

// 1. DATA FETCHING (Using native fetch for Next.js 15 optimization)
async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      cache: 'no-store', // Ensures we aren't seeing a cached 404
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

// 2. ERROR COMPONENT (Your requested "Sorry" UI)
const ErrorState = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 bg-white rounded-3xl border border-dashed border-gray-200">
    <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
      <AlertCircle size={32} />
    </div>
    <h2 className="text-2xl font-bold text-foreground mb-2">We couldn't load this product</h2>
    <p className="text-muted-foreground mb-6 max-w-md">
      The product might have been removed or the connection to our catalog was interrupted.
    </p>
    <Link 
      href="/" 
      className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-full font-semibold hover:opacity-90 transition-all"
    >
      <ArrowLeft size={18} />
      Back to Catalog
    </Link>
  </div>
);

// 3. MAIN COMPONENT
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  // Await the params (Next.js 15 mandatory)
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.id);

  // Ternary: If product exists, show Page, else show Sorry Component
  return (
    <div className="pb-20">
      {!product ? (
        <ErrorState />
      ) : (
        <div className="flex flex-col gap-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <ProductGallery image={product.image} title={product.title} />

            <div className="flex flex-col gap-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-muted-foreground uppercase">{product.category}</span>
                  <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-full border border-gray-100">
                    <Star size={14} className="fill-secondary text-secondary" />
                    <span className="text-sm font-bold">{product.rating.rate}</span>
                  </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-foreground">{product.title}</h1>
                <div className="border-b border-gray-100 pb-6">
                  <span className="text-4xl font-bold text-primary">${product.price}</span>
                </div>
              </div>

              <div className="prose prose-sm text-gray-600">
                <p>{product.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-gray-50 flex items-center gap-3">
                  <Truck size={20} className="text-primary" />
                  <span className="text-sm font-bold">Fast Delivery</span>
                </div>
                <div className="p-4 rounded-xl bg-gray-50 flex items-center gap-3">
                  <RefreshCcw size={20} className="text-primary" />
                  <span className="text-sm font-bold">30-Day Returns</span>
                </div>
              </div>

              <ProductActions product={product} />
            </div>
          </div>

          <div className="border-t pt-16">
            <h2 className="text-2xl font-bold mb-8">Related Products</h2>
            <ProductList />
          </div>
        </div>
      )}
    </div>
  );
}
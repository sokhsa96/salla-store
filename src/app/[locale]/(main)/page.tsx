import { getTranslations } from 'next-intl/server';
import HeroSection from '@/components/layout/HeroSection';
import ProductList from '@/components/products/ProductList';
import { Truck, ShieldCheck, Headphones, CreditCard } from 'lucide-react';

// SEO Metadata
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
 
  return {
    title: t('title'),
    description: t('description')
  };
}

// Trust Features Component (Inline for simplicity)
const FeatureItem = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="p-3 rounded-full bg-primary/10 text-primary shrink-0">
      <Icon size={24} />
    </div>
    <div>
      <h3 className="font-bold text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default async function Home() {
  const t = await getTranslations('Common');

  return (
    <div className="flex flex-col gap-12 pb-20">
      
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Trust Signals (Why Choose Us) */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FeatureItem 
          icon={Truck} 
          title="Free Shipping" 
          desc="On all orders over $200 throughout the region." 
        />
        <FeatureItem 
          icon={ShieldCheck} 
          title="Secure Payment" 
          desc="100% secure payments with 256-bit encryption." 
        />
        <FeatureItem 
          icon={CreditCard} 
          title="Easy Returns" 
          desc="30-day money back guarantee, no questions asked." 
        />
        <FeatureItem 
          icon={Headphones} 
          title="24/7 Support" 
          desc="Our dedicated support team is here to help you." 
        />
      </section>

      {/* 3. Main Catalog */}
      <section id="catalog" className="scroll-mt-24">
        <div className="flex flex-col gap-2 mb-8">
          <h2 className="text-3xl font-bold text-foreground">
            Latest <span className="text-primary">Arrivals</span>
          </h2>
          <p className="text-muted-foreground">
            Browse our complete catalog with advanced filtering and search.
          </p>
        </div>
        
        {/* Client Component for Interactive Feed */}
        <ProductList />
      </section>

    </div>
  );
}
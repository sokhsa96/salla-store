import { Link } from '@/i18n/navigation';

interface Props {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footerLink: { text: string; href: string; label: string };
}

export default function AuthPageWrapper({ title, subtitle, children, footerLink }: Props) {
  return (
    <div className="flex w-full h-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden">
      
      {/* Left Column: Visuals & Animation */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-primary to-teal-900 relative items-center justify-center p-12 overflow-hidden">
        {/* Abstract Animated Circles */}
        <div className="absolute top-[-20%] left-[-20%] w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[400px] h-[400px] bg-secondary/20 rounded-full blur-3xl animate-bounce" style={{ animationDuration: '3s' }} />
        
        <div className="relative z-10 text-primary-foreground text-center">
          <h2 className="text-4xl font-bold mb-4">Salla Challenge</h2>
          <p className="text-lg opacity-90">Experience the future of e-commerce with performance and style.</p>
        </div>
      </div>

      {/* Right Column: Form */}
      <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
        <div className="flex flex-col mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">{title}</h1>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>

        {children}

        <div className="mt-6 text-center text-sm text-muted-foreground">
          {footerLink.text}{' '}
          <Link href={footerLink.href} className="text-primary font-semibold hover:underline">
            {footerLink.label}
          </Link>
        </div>
      </div>
    </div>
  );
}
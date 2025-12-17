import { Link } from '@/i18n/navigation';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      {/* Optional: Simple Logo above login box */}
      <Link href="/" className="mb-8 text-2xl font-bold text-gray-800">
        Store Logo
      </Link>
      
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        {children}
      </div>
    </div>
  );
}
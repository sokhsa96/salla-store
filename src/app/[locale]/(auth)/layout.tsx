import { Link } from "@/i18n/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <Link
        aria-label="Home"
        href="/"
        className="text-2xl font-bold text-primary tracking-tight"
      >
        Salla<span className="text-secondary">.</span>Challenge
      </Link>

      <div className="w-full lg:w-1/2 bg-white rounded-lg shadow-md p-6">
        {children}
      </div>
    </div>
  );
}

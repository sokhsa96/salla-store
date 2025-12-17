'use client'; // <--- Essential because we use Hooks

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { useIsLoggedIn } from '@/hooks/useIsLoggedIn';
import { useAuthStore } from '@/store/useAuthStore'; // For the logout action

export default function Header() {
  const t = useTranslations('Common');
  const { isLoggedIn, user, isLoading } = useIsLoggedIn();
  const logout = useAuthStore((state) => state.logout);

  // Fake Avatar Generator (using initials)
  const getInitials = (name: { firstname: string; lastname: string }) => {
    return `${name.firstname[0]}${name.lastname[0]}`.toUpperCase();
  };

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto py-4 px-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-primary">
          Store Logo
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
           <Link href="/cart" className="text-gray-600 hover:text-primary transition-colors">
             {t('cart')}
           </Link>

           {/* Auth Section */}
           {isLoading ? (
             // 1. Loading State (Skeleton) to prevent hydration mismatch
             <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
           ) : isLoggedIn && user ? (
             // 2. Logged In State (User Avatar)
             <div className="flex items-center gap-3">
               <div className="flex flex-col items-end hidden sm:flex">
                 <span className="text-sm font-semibold">
                    {user.name.firstname} {user.name.lastname}
                 </span>
                 <button 
                   onClick={logout} 
                   className="text-xs text-red-500 hover:underline"
                 >
                   {t('logout', { defaultMessage: 'Logout' })}
                 </button>
               </div>
               
               <div className="w-10 h-10 rounded-full bg-secondary text-primary flex items-center justify-center font-bold border border-gray-200">
                 {getInitials(user.name)}
               </div>
             </div>
           ) : (
             // 3. Logged Out State (Login Button)
             <Link 
               href="/login" 
               className="px-4 py-2 rounded-md bg-primary text-white hover:bg-opacity-90 transition-all"
             >
               {t('login')}
             </Link>
           )}
        </nav>
      </div>
    </header>
  );
}
'use client'; 

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { useIsLoggedIn } from '@/hooks/useIsLoggedIn';
import { useAuthStore } from '@/store/useAuthStore';
import { useCart } from '@/hooks/useCart'; // <--- Import the new hook
import { CalendarDays, ShoppingBag } from 'lucide-react'; // <--- Import ShoppingBag

export default function Header() {
  const t = useTranslations('Common');
  const { isLoggedIn, user, isLoading } = useIsLoggedIn();
  const logout = useAuthStore((state) => state.logout);
  const { itemsCount } = useCart(); // <--- Get the count

  const getInitials = (name: { firstname: string; lastname: string }) => {
    return `${name.firstname[0]}${name.lastname[0]}`.toUpperCase();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto py-3 px-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-primary tracking-tight">
          Salla<span className="text-secondary">.</span>Challenge
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
           
           {/* --- CART ICON WITH BADGE --- */}
           <Link 
             href="/cart" 
             className="relative group p-2 rounded-full hover:bg-gray-50 transition-colors"
             aria-label={t('cart')}
           >
             {/* The Icon */}
             <ShoppingBag 
               className="text-gray-600 group-hover:text-primary transition-colors" 
               size={24} 
             />
             
             {/* The Badge (Only show if items > 0) */}
             {itemsCount > 0 && (
               <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[20px] h-5 px-1 bg-secondary text-secondary-foreground text-[10px] font-bold rounded-full border-2 border-white shadow-sm animate-in zoom-in duration-300">
                 {itemsCount > 99 ? '99+' : itemsCount}
               </span>
             )}
           </Link>
           {/* --------------------------- */}

           {isLoading ? (
             <div className="flex items-center gap-2">
                <div className="w-20 h-4 bg-gray-100 rounded animate-pulse" />
                <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
             </div>
           ) : isLoggedIn && user ? (
             <div className="flex items-center gap-4">
               
               {/* Avatar & Logout Group */}
               <div className="group relative cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-teal-700 text-white flex items-center justify-center font-bold shadow-md ring-2 ring-white">
                    {getInitials(user.name)}
                  </div>
                  
                  <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <button 
                      onClick={logout}
                      className="bg-white text-destructive cursor-pointer text-sm px-4 py-2 rounded-md shadow-lg border border-gray-100 whitespace-nowrap hover:bg-red-50"
                    >
                      {t('logout', { defaultMessage: 'Logout' })}
                    </button>
                  </div>
               </div>

               {/* User Info Column */}
               <div className="flex flex-col items-start">
                 <span className="text-sm font-bold text-foreground">
                    {user.name.firstname} {user.name.lastname}
                 </span>
                 
                 <div className="flex items-center gap-1 text-[10px] text-muted-foreground bg-gray-50 px-1.5 py-0.5 rounded-full border border-gray-100 mt-0.5">
                   <CalendarDays size={10} />
                   <span>Member since {formatDate(user.joinedAt)}</span>
                 </div>
               </div>
             </div>
           ) : (
             <Link 
               href="/login" 
               className="px-5 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all shadow-md text-sm"
             >
               {t('login')}
             </Link>
           )}
        </nav>
      </div>
    </header>
  );
}
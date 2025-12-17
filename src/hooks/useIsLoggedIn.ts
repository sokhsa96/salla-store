import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';

export const useIsLoggedIn = () => {
  const user = useAuthStore((state) => state.user);
  const [isMounted, setIsMounted] = useState(false);

  // We need to wait for the client to mount to access localStorage safely
  useEffect(() => {
    // Manually trigger rehydration of the store on mount
    useAuthStore.persist.rehydrate();
    setIsMounted(true);
  }, []);

  return {
    isLoggedIn: !!user,
    user,
    isLoading: !isMounted // Useful to show a loading spinner or skeleton
  };
};
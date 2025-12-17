import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      
      login: (user) => set({ user }),
      
      logout: () => set({ user: null }),
    }),
    {
      name: 'auth-storage', // unique name
      storage: createJSONStorage(() => localStorage),
      skipHydration: true, // We handle hydration manually in the hook to avoid SSR mismatches
    }
  )
);
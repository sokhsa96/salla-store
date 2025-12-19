// src/tests/setup.tsx
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import React from 'react'; // <--- Required for JSX

// Mock Next.js Navigation
vi.mock('@/i18n/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), back: vi.fn() }),
  usePathname: () => '/',
  Link: ({ children, ...props }: any) => <a {...props}>{children}</a>,
}));

// Mock Next.js Image
vi.mock('next/image', () => ({
  default: (props: any) => <img {...props} alt={props.alt} />,
}));

// Mock Zustand Persist
vi.mock('zustand/middleware', () => ({
  persist: (config: any) => (set: any, get: any, api: any) => config(set, get, api),
  createJSONStorage: () => ({
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  }),
}));
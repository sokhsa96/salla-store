// src/providers/QueryProvider.tsx
'use client'; // <--- Critical for App Router

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function QueryProvider({ children }: Props) {
  // Use useState to ensure the queryClient is created only once per user session
  // and not recreated on every re-render.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Data is considered fresh for 1 minute (Performance Optimization)
            staleTime: 60 * 1000, 
            // Retry failed requests 1 time before throwing error
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* DevTools will only show in development environment */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
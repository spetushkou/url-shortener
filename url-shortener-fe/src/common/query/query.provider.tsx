import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import { QueryClient } from './query.client';

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={QueryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

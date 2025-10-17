'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from '@/components/ui/sonner';
import { ErrorBoundary } from '@/components/error-boundary';
import { PageErrorFallback } from '@/components/error-fallbacks';
import { errorReporter } from '@/lib/report';
import { getQueryClient } from '@/lib/react-query/query-client';

// Import Web3Provider với dynamic để tránh SSR
// const Web3Provider = dynamic(() => import('./web3-provider'), {
//   ssr: false,
// });

export function Providers({ children }: { children: React.ReactNode }) {
  // Tạo QueryClient instance - sử dụng singleton pattern
  const [queryClient] = React.useState(() => getQueryClient());

  return (
    <ErrorBoundary
      fallback={PageErrorFallback}
      errorContext='Application Root'
      onError={(error, errorInfo) => {
        // Report to error tracking service
        errorReporter.reportBoundaryError(error, errorInfo, 'Application Root');
      }}
    >
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster />
        {/* React Query Devtools - chỉ hiển thị trong development */}
        {process.env.NODE_ENV === 'development' && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

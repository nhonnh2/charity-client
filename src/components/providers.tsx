'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { Toaster } from '@/components/ui/sonner';

// Import Web3Provider với dynamic để tránh SSR
// const Web3Provider = dynamic(() => import('./web3-provider'), {
//   ssr: false,
// });

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}

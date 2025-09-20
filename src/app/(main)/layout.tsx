import type React from 'react';
import Sidebar from '@/components/sidebar';
import TokenKeeper from '@/components/token-keeper';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex min-h-screen'>
      <TokenKeeper />
      <Sidebar />
      <main className='flex-1 max-w-[1600px] mx-auto w-full'>{children}</main>
    </div>
  );
}

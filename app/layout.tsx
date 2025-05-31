import type React from 'react';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import Sidebar from '@/components/sidebar';
import RouteProgress from '@/components/route-progress';

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: 'TrustCharity - Nền tảng từ thiện minh bạch trên blockchain',
  description:
    'Nền tảng từ thiện minh bạch sử dụng công nghệ blockchain, giúp người dùng tạo và ủng hộ các chiến dịch với độ tin cậy cao.',
  generator: 'v0.dev',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning className={inter.variable}>
      <body className={inter.className}>
        <RouteProgress />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 max-w-[1600px] mx-auto w-full">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

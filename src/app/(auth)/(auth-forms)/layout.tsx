'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import IntroductionSide from '@/components/introduction-auth';
import { Logo } from '@/components/ui/logo';

export default function AuthFormsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const getPageInfo = () => {
    if (pathname === '/login') {
      return {
        title: 'Đăng nhập',
        subtitle: 'Tiếp tục hành trình từ thiện của bạn',
      };
    }
    if (pathname === '/register') {
      return {
        title: 'Tạo tài khoản',
        subtitle: 'Tham gia cộng đồng từ thiện minh bạch',
      };
    }
    return {
      title: 'Xác thực',
      subtitle: 'Nền tảng từ thiện minh bạch',
    };
  };

  const pageInfo = getPageInfo();

  return (
    <div className='min-h-screen bg-background'>
      {/* Mobile Header - chỉ hiển thị trên mobile */}
      <div className='lg:hidden bg-gradient-to-r from-primary/10 to-primary/5 border-b'>
        <div className='container mx-auto px-4 py-6'>
          <div className='text-center'>
            <Link href='/' className='inline-block mb-4'>
              <Logo size='md' />
            </Link>
            <h1 className='text-2xl font-bold text-slate-800 mb-2'>
              {pageInfo.title}
            </h1>
            <p className='text-slate-600'>{pageInfo.subtitle}</p>
          </div>
        </div>
      </div>

      <div className='min-h-screen lg:flex'>
        {/* Left side - Hero/Info - ẩn trên mobile - CHỈ RENDER MỘT LẦN */}
        <IntroductionSide />

        {/* Right side - Dynamic content */}
        <>{children}</>
      </div>

      {/* Mobile Footer */}
      <div className='lg:hidden border-t bg-background'>
        <div className='container mx-auto px-4 py-6 text-center'>
          <p className='text-sm text-slate-500'>
            © 2024 TrustCharity. Nền tảng từ thiện minh bạch trên blockchain.
          </p>
        </div>
      </div>
    </div>
  );
}

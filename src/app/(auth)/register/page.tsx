'use client';

import Link from 'next/link';
import RegisterForm from './register-form';

import IntroductionSide from '@/components/introduction-auth';
import { Logo } from '@/components/ui/logo';

export default function RegisterPage() {
  return (
    <div className='min-h-screen bg-background'>
      {/* Mobile Header - chỉ hiển thị trên mobile */}
      <div className='lg:hidden bg-gradient-to-r from-primary/10 to-primary/5 border-b'>
        <div className='container mx-auto px-4 py-4'>
          <div className='text-center'>
            <Link href='/' className='inline-block mb-3'>
              <Logo size='md' />
            </Link>
            <h1 className='text-xl font-bold text-slate-800 mb-1'>
              Tạo tài khoản
            </h1>
            <p className='text-sm text-slate-600'>
              Tham gia cộng đồng từ thiện minh bạch
            </p>
          </div>
        </div>
      </div>

      <div className='min-h-screen lg:flex'>
        {/* Left side - Hero/Info - ẩn trên mobile */}
        <IntroductionSide />

        {/* Right side - Register Form */}
        <RegisterForm />
      </div>

      {/* Mobile Footer */}
      <div className='lg:hidden border-t bg-background'>
        <div className='container mx-auto px-4 py-4 text-center'>
          <p className='text-xs text-slate-500'>
            © 2024 TrustCharity. Nền tảng từ thiện minh bạch trên blockchain.
          </p>
        </div>
      </div>
    </div>
  );
}

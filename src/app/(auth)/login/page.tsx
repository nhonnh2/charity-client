import Link from 'next/link';

import LoginForm from './login-form';
import IntroductionSide from './introduction-side';

import { Logo } from '@/components/ui/logo';

export default function LoginPage() {
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
              Đăng nhập
            </h1>
            <p className='text-slate-600'>
              Tiếp tục hành trình từ thiện của bạn
            </p>
          </div>
        </div>
      </div>

      <div className='min-h-screen lg:flex'>
        {/* Left side - Hero/Info - ẩn trên mobile */}
        <IntroductionSide />
        {/* Right side - Login Form */}
        <LoginForm />
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

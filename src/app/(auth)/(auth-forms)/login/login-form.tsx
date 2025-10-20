'use client';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { nextLogin } from '@/apiRequests/auth';
import { useAuthStore } from '@/stores/auth-store';

import { LoginBodyType, LoginBody } from '@/schemaValidations/auth.schema';

function LoginForm() {
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: { email: '', password: '' },
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingOAuths, setIsLoadingOAuths] = useState({
    google: false,
    facebook: false,
  });

  const { setUser } = useAuthStore();

  // Xử lý OAuth errors
  useEffect(() => {
    const error = searchParams.get('error');
    if (error) {
      console.error('OAuth error:', error);
      // Có thể hiển thị toast error ở đây
    }
  }, [searchParams]);

  const handleLogin = async (data: LoginBodyType) => {
    try {
      setIsLoading(true);
      const response: any = await nextLogin(data);
      if (response) {
        // Lưu user info vào store
        const responseData = response as any;
        const userData = {
          id: parseInt(responseData.data.user.id),
          name: responseData.data.user.name,
          email: responseData.data.user.email,
          role: responseData.data.user.role,
          avatar: responseData.data.user.avatar,
        };
        setUser(userData);

        router.push('/');
      }
    } catch (error) {
      console.error('handleLogin___', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = (type: 'google' | 'facebook') => {
    setIsLoadingOAuths(prev => ({ ...prev, [type]: true }));

    switch (type) {
      case 'google':
        window.location.href = '/api/auth/oauth/google/start';
        return;
      case 'facebook':
        window.location.href = '/api/auth/oauth/facebook/start';
        return;
    }
  };

  return (
    <div className='flex-1 lg:max-w-[45%] flex items-center justify-center p-4 sm:p-6 lg:p-8'>
      <div className='w-full max-w-[400px] space-y-6'>
        {/* Desktop Header - chỉ hiển thị trên desktop */}
        <div className='hidden lg:block space-y-2 text-center'>
          <h2 className='text-3xl font-bold text-slate-800'>Đăng nhập</h2>
          <p className='text-slate-600'>Tiếp tục hành trình từ thiện của bạn</p>
        </div>

        {/* Login Form */}
        <div className='space-y-6'>
          {/* Email Login Form */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleLogin, err => {
                console.error(err);
              })}
              className='space-y-4'
            >
              <FormField
                name='email'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Label
                      htmlFor='email'
                      className='text-slate-700 font-medium'
                    >
                      Email
                    </Label>
                    <div className='relative'>
                      <Mail className='absolute left-3 top-3.5 h-5 w-5 text-slate-500' />
                      <Input
                        id='email'
                        type='email'
                        placeholder='your@email.com'
                        className='pl-10 h-12'
                        required
                        {...field}
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name='password'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <div className='flex items-center justify-between'>
                      <Label
                        htmlFor='password'
                        className='text-slate-700 font-medium'
                      >
                        Mật khẩu
                      </Label>
                      <Link
                        href='/forgot-password'
                        className='text-sm text-amber-600 hover:text-amber-700 hover:underline font-medium'
                      >
                        Quên mật khẩu?
                      </Link>
                    </div>
                    <div className='relative'>
                      <Lock className='absolute left-3 top-3.5 h-5 w-5 text-slate-500' />
                      <Input
                        id='password'
                        type={showPassword ? 'text' : 'password'}
                        placeholder='••••••••'
                        className='pl-10 pr-10 h-12'
                        required
                        {...field}
                      />
                      <button
                        type='button'
                        onClick={() => setShowPassword(!showPassword)}
                        className='absolute right-3 top-3.5 text-slate-500 hover:text-slate-700 transition-colors'
                      >
                        {showPassword ? (
                          <EyeOff className='h-5 w-5' />
                        ) : (
                          <Eye className='h-5 w-5' />
                        )}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type='submit'
                className='w-full h-12'
                size='lg'
                loading={isLoading}
                loadingText='Đang đăng nhập...'
              >
                Đăng nhập
              </Button>
            </form>
          </Form>

          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <span className='w-full border-t border-slate-300' />
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='bg-background px-2 text-slate-500 font-medium'>
                Hoặc tiếp tục với
              </span>
            </div>
          </div>

          {/* Social Login Section */}
          <div className='space-y-3'>
            <Button
              onClick={() => handleOAuthLogin('google')}
              type='button'
              variant='outline'
              className='w-full h-11'
              size='lg'
              loading={isLoadingOAuths.google}
              loadingText='Đang chuyển hướng...'
            >
              <svg className='mr-2 h-4 w-4' viewBox='0 0 24 24'>
                <path
                  fill='#4285F4'
                  d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                />
                <path
                  fill='#34A853'
                  d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                />
                <path
                  fill='#FBBC05'
                  d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                />
                <path
                  fill='#EA4335'
                  d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                />
              </svg>
              Google
            </Button>

            <Button
              onClick={() => handleOAuthLogin('facebook')}
              type='button'
              variant='outline'
              className='w-full h-11'
              size='lg'
              loading={isLoadingOAuths.facebook}
              loadingText='Đang chuyển hướng...'
            >
              <svg className='mr-2 h-4 w-4' viewBox='0 0 24 24'>
                <path
                  fill='#1877F2'
                  d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'
                />
              </svg>
              Facebook
            </Button>
          </div>

          {/* Register link */}
          <div className='text-center space-y-4'>
            <p className='text-sm text-slate-600'>
              Chưa có tài khoản?{' '}
              <Link
                href='/register'
                className='text-amber-600 hover:text-amber-700 hover:underline font-medium'
              >
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;

'use client';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Mail, Lock, Eye, EyeOff, Users, User } from 'lucide-react';

import { FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import authApiRequest from '@/apiRequests/auth';

import { LoginBodyType } from '@/schemaValidations/auth.schema';

function LoginForm() {
  const form = useForm<LoginBodyType>({
    defaultValues: { email: '', password: '' },
  });

  const handleLogin = async (data: LoginBodyType) => {
    try {
      const response = await authApiRequest.login(data);

      console.log('handleLogin______', response);
      // if (response) {
      //   authApiRequest.setCookie(response.payload.data.token);
      // }
    } catch (error) {
      console.error('handleLogin___', error);
    }
  };

  const isLoading = false;
  const showPassword = false;
  return (
    <div className='flex-1 lg:max-w-[45%] flex items-center justify-center p-4 sm:p-6 lg:p-8'>
      <div className='w-full max-w-[400px] py-4 lg:py-0'>
        {/* Desktop Header - chỉ hiển thị trên desktop */}
        <div className='hidden lg:block space-y-2 text-center mb-6'>
          <h2 className='text-2xl font-bold text-slate-800'>Tạo tài khoản</h2>
          <p className='text-sm text-slate-600'>
            Tham gia cộng đồng từ thiện minh bạch
          </p>
        </div>

        {/* Register Form */}
        <div className='space-y-4'>
          {/* Email Register Form */}
          <form
            onSubmit={form.handleSubmit(handleLogin, err => {
              console.error(err);
            })}
            className='space-y-4'
          >
            <div className='space-y-2'>
              <Label
                htmlFor='fullName'
                className='text-sm text-slate-700 font-medium'
              >
                Họ tên *
              </Label>
              <div className='relative'>
                <User className='absolute left-3 top-3 h-4 w-4 text-slate-500' />
                <Input
                  id='fullName'
                  type='text'
                  placeholder='Nguyễn Văn A'
                  //   value={formData.fullName}
                  //   onChange={e => handleInputChange('fullName', e.target.value)}
                  className='pl-10 h-11'
                  required
                />
              </div>
            </div>

            <div className='space-y-2'>
              <Label
                htmlFor='email'
                className='text-sm text-slate-700 font-medium'
              >
                Email *
              </Label>
              <div className='relative'>
                <Mail className='absolute left-3 top-3 h-4 w-4 text-slate-500' />
                <Input
                  id='email'
                  type='email'
                  placeholder='your@email.com'
                  //   value={formData.email}
                  //   onChange={e => handleInputChange('email', e.target.value)}
                  className='pl-10 h-11'
                  required
                />
              </div>
            </div>

            <div className='space-y-2'>
              <Label
                htmlFor='password'
                className='text-sm text-slate-700 font-medium'
              >
                Mật khẩu *
              </Label>
              <div className='relative'>
                <Lock className='absolute left-3 top-3 h-4 w-4 text-slate-500' />
                <Input
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='••••••••'
                  //   value={formData.password}
                  //   onChange={e => handleInputChange('password', e.target.value)}
                  className='pl-10 pr-10 h-11'
                  required
                />
                <button
                  type='button'
                  //   onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-3 text-slate-500 hover:text-slate-700 transition-colors'
                >
                  {showPassword ? (
                    <EyeOff className='h-4 w-4' />
                  ) : (
                    <Eye className='h-4 w-4' />
                  )}
                </button>
              </div>
            </div>

            <div className='space-y-2'>
              <Label
                htmlFor='confirmPassword'
                className='text-sm text-slate-700 font-medium'
              >
                Xác nhận mật khẩu *
              </Label>
              <div className='relative'>
                <Lock className='absolute left-3 top-3 h-4 w-4 text-slate-500' />
                <Input
                  id='confirmPassword'
                  //   type={showConfirmPassword ? 'text' : 'password'}
                  placeholder='••••••••'
                  //   value={formData.confirmPassword}
                  //   onChange={e =>
                  //     handleInputChange('confirmPassword', e.target.value)
                  //   }
                  className='pl-10 pr-10 h-11'
                  required
                />
                <button
                  type='button'
                  //   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className='absolute right-3 top-3 text-slate-500 hover:text-slate-700 transition-colors'
                >
                  {/* {showConfirmPassword ? (
                    <EyeOff className='h-4 w-4' />
                  ) : (
                    <Eye className='h-4 w-4' />
                  )} */}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className='flex items-start space-x-2 py-2'>
              <Checkbox
                id='terms'
                // checked={agreeToTerms}
                // onCheckedChange={checked => setAgreeToTerms(checked as boolean)}
                className='mt-0.5'
              />
              <Label
                htmlFor='terms'
                className='text-xs font-normal leading-relaxed cursor-pointer text-slate-600'
              >
                Tôi đồng ý với{' '}
                <Link
                  href='/terms'
                  className='text-amber-600 hover:text-amber-700 hover:underline font-medium'
                >
                  điều khoản sử dụng
                </Link>{' '}
                và{' '}
                <Link
                  href='/privacy'
                  className='text-amber-600 hover:text-amber-700 hover:underline font-medium'
                >
                  chính sách bảo mật
                </Link>
              </Label>
            </div>

            <Button
              type='submit'
              className='w-full h-11'
              size='lg'
              //   disabled={authLoading}
            >
              {/* {authLoading ? 'Đang đăng ký...' : 'Tạo tài khoản'} */}
            </Button>
          </form>

          <div className='relative py-2'>
            <div className='absolute inset-0 flex items-center'>
              <span className='w-full border-t border-slate-300' />
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='bg-background px-2 text-slate-500 font-medium'>
                Hoặc tiếp tục với
              </span>
            </div>
          </div>

          {/* Social Register Section */}
          <div className='space-y-3'>
            <Button
              //   onClick={handleGoogleRegister}
              type='button'
              variant='outline'
              className='w-full h-10'
              size='lg'
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
              //   onClick={handleFacebookRegister}
              type='button'
              variant='outline'
              className='w-full h-10'
              size='lg'
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

          {/* Login link */}
          <div className='text-center pt-2'>
            <p className='text-sm text-slate-600'>
              Đã có tài khoản?{' '}
              <Link
                href='/login'
                className='text-amber-600 hover:text-amber-700 hover:underline font-medium'
              >
                Đăng nhập ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;

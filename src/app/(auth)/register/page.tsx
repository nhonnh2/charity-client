'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  ArrowLeft,
  Shield,
  Heart,
  Users,
  CheckCircle,
  TrendingUp,
  Globe,
  Sparkles,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAuthState } from '@/hooks/auth/use-auth';
import { Logo } from '@/components/ui/logo';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const { register, isLoading: authLoading } = useAuthState();
  const router = useRouter();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast.error('Vui lòng nhập họ tên');
      return false;
    }
    if (!formData.email.trim()) {
      toast.error('Vui lòng nhập email');
      return false;
    }
    if (!formData.password) {
      toast.error('Vui lòng nhập mật khẩu');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Mật khẩu xác nhận không khớp');
      return false;
    }
    if (formData.password.length < 6) {
      toast.error('Mật khẩu phải có ít nhất 6 ký tự');
      return false;
    }
    if (!agreeToTerms) {
      toast.error('Vui lòng đồng ý với điều khoản sử dụng');
      return false;
    }
    return true;
  };

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await register({
        fullName: formData.fullName,
        email: formData.email,
        authType: 'email',
      });

      toast.success(
        'Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.'
      );
      router.push('/login');
    } catch (error: any) {
      toast.error(error.message || 'Đăng ký thất bại');
    }
  };

  const handleGoogleRegister = async () => {
    try {
      // TODO: Implement Google OAuth
      toast.info('Tính năng đăng ký Google đang được phát triển');
    } catch (error: any) {
      toast.error(error.message || 'Đăng ký Google thất bại');
    }
  };

  const handleFacebookRegister = async () => {
    try {
      // TODO: Implement Facebook OAuth
      toast.info('Tính năng đăng ký Facebook đang được phát triển');
    } catch (error: any) {
      toast.error(error.message || 'Đăng ký Facebook thất bại');
    }
  };

  const features = [
    {
      icon: Shield,
      title: 'Bảo mật & Minh bạch',
      description: 'Blockchain đảm bảo an toàn và minh bạch mọi giao dịch',
    },
    {
      icon: Users,
      title: 'Cộng đồng kết nối',
      description:
        'Mọi hành động và cập nhật chiến dịch được chia sẻ với cộng đồng',
    },
    {
      icon: TrendingUp,
      title: 'Minh chứng hiệu quả',
      description:
        'Minh chứng rõ ràng đảm bảo 100% số tiền đến đúng người cần giúp đỡ',
    },
  ];

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
        <div className='hidden lg:flex lg:flex-1 lg:max-w-[55%] bg-gradient-to-br from-primary/20 via-primary/10 to-background relative overflow-hidden'>
          {/* Background Image shifted right */}
          <div
            className='absolute inset-0 bg-cover bg-no-repeat opacity-60'
            style={{
              backgroundImage: "url('/treemlaocai_flipped.jpeg')",
              backgroundPosition: '30% 30%',
            }}
          />
          {/* Gradient overlay for text readability */}
          <div className='absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-800/50 to-transparent' />
          {/* Additional vertical gradient */}
          <div className='absolute inset-0 bg-gradient-to-b from-slate-900/40 via-transparent to-slate-800/30' />
          <div className='absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]' />

          <div className='relative flex flex-col justify-between p-8 lg:p-12 z-10 h-full'>
            {/* Logo with Link */}
            <div>
              <Link href='/' className='inline-block'>
                <Logo size='lg' />
              </Link>
            </div>

            {/* Main content */}
            <div className='space-y-8'>
              <div>
                <h1 className='text-3xl lg:text-4xl font-bold mb-4 text-white'>
                  <span>Chia sẻ niềm vui</span>
                  <br />
                  <span>Thắp sáng những ước mơ</span>
                </h1>
                <p className='text-xl text-slate-300'>
                  Nền tảng từ thiện minh bạch hàng đầu Việt Nam.
                </p>
              </div>

              <div className='space-y-6'>
                {features.map((feature, index) => (
                  <div key={index} className='flex gap-4'>
                    <div className='flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center'>
                      <feature.icon className='h-6 w-6 text-primary' />
                    </div>
                    <div>
                      <h3 className='font-semibold mb-1 text-slate-100'>
                        {feature.title}
                      </h3>
                      <p className='text-sm text-slate-400'>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className='grid grid-cols-3 gap-6 pt-8'>
                <div>
                  <div className='text-3xl font-bold text-amber-400'>500+</div>
                  <div className='text-sm text-slate-400'>
                    Chiến dịch thành công
                  </div>
                </div>
                <div>
                  <div className='text-3xl font-bold text-amber-400'>10M+</div>
                  <div className='text-sm text-slate-400'>VNĐ đã quyên góp</div>
                </div>
                <div>
                  <div className='text-3xl font-bold text-amber-400'>50K+</div>
                  <div className='text-sm text-slate-400'>
                    Người đã tham gia
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className='text-sm text-slate-400'>
              © 2024 TrustCharity. Nền tảng từ thiện minh bạch trên blockchain.
            </div>
          </div>
        </div>

        {/* Right side - Register Form */}
        <div className='flex-1 lg:max-w-[45%] flex items-center justify-center p-4 sm:p-6 lg:p-8'>
          <div className='w-full max-w-[400px] py-4 lg:py-0'>
            {/* Desktop Header - chỉ hiển thị trên desktop */}
            <div className='hidden lg:block space-y-2 text-center mb-6'>
              <h2 className='text-2xl font-bold text-slate-800'>
                Tạo tài khoản
              </h2>
              <p className='text-sm text-slate-600'>
                Tham gia cộng đồng từ thiện minh bạch
              </p>
            </div>

            {/* Register Form */}
            <div className='space-y-4'>
              {/* Email Register Form */}
              <form onSubmit={handleEmailRegister} className='space-y-4'>
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
                      value={formData.fullName}
                      onChange={e =>
                        handleInputChange('fullName', e.target.value)
                      }
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
                      value={formData.email}
                      onChange={e => handleInputChange('email', e.target.value)}
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
                      value={formData.password}
                      onChange={e =>
                        handleInputChange('password', e.target.value)
                      }
                      className='pl-10 pr-10 h-11'
                      required
                    />
                    <button
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
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
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder='••••••••'
                      value={formData.confirmPassword}
                      onChange={e =>
                        handleInputChange('confirmPassword', e.target.value)
                      }
                      className='pl-10 pr-10 h-11'
                      required
                    />
                    <button
                      type='button'
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className='absolute right-3 top-3 text-slate-500 hover:text-slate-700 transition-colors'
                    >
                      {showConfirmPassword ? (
                        <EyeOff className='h-4 w-4' />
                      ) : (
                        <Eye className='h-4 w-4' />
                      )}
                    </button>
                  </div>
                </div>

                {/* Terms */}
                <div className='flex items-start space-x-2 py-2'>
                  <Checkbox
                    id='terms'
                    checked={agreeToTerms}
                    onCheckedChange={checked =>
                      setAgreeToTerms(checked as boolean)
                    }
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
                  disabled={authLoading}
                >
                  {authLoading ? 'Đang đăng ký...' : 'Tạo tài khoản'}
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
                  onClick={handleGoogleRegister}
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
                  onClick={handleFacebookRegister}
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

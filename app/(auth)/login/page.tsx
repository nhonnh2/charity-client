'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  Shield,
  Heart,
  Users,
  CheckCircle,
  TrendingUp,
  Globe,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAuthState } from '@/hooks/use-auth';
import { Logo } from '@/components/ui/logo';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, isLoading } = useAuthState();
  const router = useRouter();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(email, password);
      toast.success('Đăng nhập thành công!');
      router.push('/');
    } catch (error: any) {
      toast.error(error.message || 'Đăng nhập thất bại');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // TODO: Implement Google OAuth
      toast.info('Tính năng đăng nhập Google đang được phát triển');
    } catch (error: any) {
      toast.error(error.message || 'Đăng nhập Google thất bại');
    }
  };

  const handleFacebookLogin = async () => {
    try {
      // TODO: Implement Facebook OAuth  
      toast.info('Tính năng đăng nhập Facebook đang được phát triển');
    } catch (error: any) {
      toast.error(error.message || 'Đăng nhập Facebook thất bại');
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
      description: 'Mọi hành động và cập nhật chiến dịch được chia sẻ với cộng đồng',
    },
    {
      icon: TrendingUp,
      title: 'Minh chứng hiệu quả',
      description: 'Minh chứng rõ ràng đảm bảo 100% số tiền đến đúng người cần giúp đỡ',
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="min-h-screen flex">
        {/* Left side - Hero/Info */}
        <div className="flex-1 lg:max-w-[55%] bg-gradient-to-br from-primary/20 via-primary/10 to-background relative overflow-hidden">
          {/* Background Image shifted right */}
          <div 
            className="absolute inset-0 bg-cover bg-no-repeat opacity-60"
            style={{
              backgroundImage: "url('/treemlaocai_flipped.jpeg')",
              backgroundPosition: "30% 30%"
            }}
          />
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-800/50 to-transparent" />
          {/* Additional vertical gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-transparent to-slate-800/30" />
          <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

          <div className="relative flex flex-col justify-between p-8 lg:p-12 z-10 h-full">
            {/* Logo with Link */}
            <div>
              <Link href="/" className="inline-block">
                <Logo size="lg" />
              </Link>
            </div>

            {/* Main content */}
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-white">
                  <span>Chia sẻ niềm vui</span><br />
                  <span>Thắp sáng những ước mơ</span>
                </h1>
                <p className="text-xl text-slate-300">
                  Nền tảng từ thiện minh bạch hàng đầu Việt Nam
                </p>
              </div>

              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 text-slate-100">{feature.title}</h3>
                      <p className="text-sm text-slate-400">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div>
                  <div className="text-3xl font-bold text-amber-400">500+</div>
                  <div className="text-sm text-slate-400">
                    Chiến dịch thành công
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-400">10M+</div>
                  <div className="text-sm text-slate-400">
                    VNĐ đã quyên góp
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-400">50K+</div>
                  <div className="text-sm text-slate-400">
                    Người đã tham gia
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-sm text-slate-400">
              © 2024 TrustCharity. Nền tảng từ thiện minh bạch trên blockchain.
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="flex-1 lg:max-w-[45%] flex items-center justify-center p-6 lg:p-8">
          <div className="w-full max-w-[380px] space-y-6">
            {/* Login Card */}
            <div className="space-y-6">
              <div className="space-y-2 text-center">
                <h2 className="text-3xl font-bold text-slate-800">Đăng nhập</h2>
                <p className="text-slate-600">
                  Tiếp tục hành trình từ thiện của bạn
                </p>
              </div>

              {/* Email Login Form */}
              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-700 font-medium">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 h-5 w-5 text-slate-500" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-slate-700 font-medium">Mật khẩu</Label>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-amber-600 hover:text-amber-700 hover:underline font-medium"
                    >
                      Quên mật khẩu?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 h-5 w-5 text-slate-500" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 h-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3.5 text-slate-500 hover:text-slate-700 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-300" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-slate-500 font-medium">
                    Hoặc tiếp tục với
                  </span>
                </div>
              </div>

              {/* Social Login Section */}
              <div className="space-y-3">
                <Button
                  onClick={handleGoogleLogin}
                  type="button"
                  variant="outline"
                  className="w-full h-11"
                  size="lg"
                >
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </Button>

                <Button
                  onClick={handleFacebookLogin}
                  type="button"
                  variant="outline"
                  className="w-full h-11"
                  size="lg"
                >
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </Button>
              </div>

              {/* Register link */}
              <div className="text-center space-y-4">
                <p className="text-sm text-slate-600">
                  Chưa có tài khoản?{' '}
                  <Link
                    href="/register"
                    className="text-amber-600 hover:text-amber-700 hover:underline font-medium"
                  >
                    Đăng ký ngay
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

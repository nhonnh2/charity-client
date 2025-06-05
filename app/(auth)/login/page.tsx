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
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useSignMessage } from 'wagmi';
import {
  Wallet,
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

  const { address, isConnected } = useAccount();
  const { signMessage, isPending } = useSignMessage();
  const { login, loginWithWeb3, isLoading } = useAuthState();
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

  const handleWeb3Login = async () => {
    if (!isConnected || !address) {
      toast.error('Vui lòng kết nối ví trước');
      return;
    }

    try {
      const message = `Đăng nhập vào TrustCharity\nĐịa chỉ: ${address}\nThời gian: ${new Date().toISOString()}`;

      await signMessage({ message });
      await loginWithWeb3(address, 'signature_verified');

      toast.success('Đăng nhập Web3 thành công!');
      router.push('/');
    } catch (error: any) {
      toast.error(error.message || 'Đăng nhập Web3 thất bại');
    }
  };

  const features = [
    {
      icon: Shield,
      title: 'Bảo mật tuyệt đối',
      description: 'Công nghệ blockchain đảm bảo an toàn cho mọi giao dịch',
    },
    {
      icon: Globe,
      title: 'Minh bạch toàn cầu',
      description: 'Theo dõi từng đồng quyên góp trong thời gian thực',
    },
    {
      icon: TrendingUp,
      title: 'Hiệu quả tối đa',
      description: '100% số tiền đến tay người cần giúp đỡ',
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="min-h-screen flex">
        {/* Left side - Hero/Info */}
        <div className="flex-1 lg:max-w-[55%] bg-gradient-to-br from-primary/20 via-primary/10 to-background relative overflow-hidden">
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
                <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                  Chào mừng trở lại TrustCharity
                </h1>
                <p className="text-xl text-muted-foreground">
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
                      <h3 className="font-semibold mb-1">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t">
                <div>
                  <div className="text-3xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">
                    Chiến dịch thành công
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">10M+</div>
                  <div className="text-sm text-muted-foreground">
                    VNĐ đã quyên góp
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">50K+</div>
                  <div className="text-sm text-muted-foreground">
                    Người đã tham gia
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-sm text-muted-foreground">
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
                <h2 className="text-3xl font-bold">Đăng nhập</h2>
                <p className="text-muted-foreground">
                  Tiếp tục hành trình từ thiện của bạn
                </p>
              </div>

              {/* Web3 Login Section */}
              <div className="space-y-4">
                <ConnectButton.Custom>
                  {({
                    account,
                    chain,
                    openAccountModal,
                    openChainModal,
                    openConnectModal,
                    mounted,
                  }) => {
                    const ready = mounted;
                    const connected = ready && account && chain;

                    return (
                      <div className="space-y-3">
                        {(() => {
                          if (!connected) {
                            return (
                              <Button
                                onClick={openConnectModal}
                                type="button"
                                variant="default"
                                className="w-full h-12"
                                size="lg"
                              >
                                <Wallet className="mr-2 h-5 w-5" />
                                Kết nối ví Web3
                              </Button>
                            );
                          }

                          return (
                            <div className="space-y-3">
                              <Button
                                onClick={openAccountModal}
                                type="button"
                                variant="outline"
                                className="w-full h-12 justify-between"
                              >
                                <div className="flex items-center">
                                  <Wallet className="mr-2 h-5 w-5" />
                                  <span>{account.displayName}</span>
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  {account.displayBalance}
                                </span>
                              </Button>

                              <Button
                                onClick={handleWeb3Login}
                                disabled={isPending || isLoading}
                                className="w-full h-12"
                                variant="default"
                                size="lg"
                              >
                                <Shield className="mr-2 h-5 w-5" />
                                {isPending || isLoading
                                  ? 'Đang xác thực...'
                                  : 'Xác thực bằng chữ ký'}
                              </Button>
                            </div>
                          );
                        })()}
                      </div>
                    );
                  }}
                </ConnectButton.Custom>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Hoặc
                  </span>
                </div>
              </div>

              {/* Email Login Form */}
              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
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
                    <Label htmlFor="password">Mật khẩu</Label>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-primary hover:underline"
                    >
                      Quên mật khẩu?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
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
                      className="absolute right-3 top-3.5 text-muted-foreground hover:text-foreground transition-colors"
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

              {/* Register link */}
              <div className="text-center space-y-4">
                <p className="text-sm text-muted-foreground">
                  Chưa có tài khoản?{' '}
                  <Link
                    href="/register"
                    className="text-primary hover:underline font-medium"
                  >
                    Đăng ký ngay
                  </Link>
                </p>
              </div>

              {/* Trust badges */}
              <div className="flex items-center justify-center gap-6 pt-4 border-t">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  <span>Bảo mật</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Lock className="h-4 w-4" />
                  <span>Mã hóa SSL</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <CheckCircle className="h-4 w-4" />
                  <span>Đã xác thực</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

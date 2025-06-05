'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useSignMessage } from 'wagmi';
import {
  Wallet,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
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
import { useAuthState } from '@/hooks/use-auth';
import { Logo } from '@/components/ui/logo';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const { address, isConnected } = useAccount();
  const { signMessage, isPending } = useSignMessage();
  const { register, isLoading: authLoading } = useAuthState();
  const router = useRouter();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
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
        phone: formData.phone,
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

  const handleWeb3Register = async () => {
    if (!isConnected || !address) {
      toast.error('Vui lòng kết nối ví trước');
      return;
    }

    if (!formData.fullName.trim()) {
      toast.error('Vui lòng nhập họ tên để đăng ký');
      return;
    }

    if (!agreeToTerms) {
      toast.error('Vui lòng đồng ý với điều khoản sử dụng');
      return;
    }

    try {
      const message = `Đăng ký tài khoản TrustCharity\nHọ tên: ${
        formData.fullName
      }\nĐịa chỉ ví: ${address}\nThời gian: ${new Date().toISOString()}`;

      await signMessage({ message });

      await register({
        fullName: formData.fullName,
        walletAddress: address,
        authType: 'web3',
      });

      toast.success('Đăng ký Web3 thành công!');
      router.push('/');
    } catch (error: any) {
      toast.error(error.message || 'Đăng ký Web3 thất bại');
    }
  };

  const benefits = [
    {
      icon: Sparkles,
      title: 'Tham gia ngay hôm nay',
      description: 'Trở thành một phần của cộng đồng từ thiện minh bạch',
    },
    {
      icon: Heart,
      title: 'Tạo chiến dịch dễ dàng',
      description: 'Khởi tạo và quản lý chiến dịch chỉ trong vài phút',
    },
    {
      icon: Shield,
      title: 'An toàn tuyệt đối',
      description: 'Mọi giao dịch được bảo vệ bởi blockchain',
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
                  Bắt đầu hành trình từ thiện
                </h1>
                <p className="text-xl text-muted-foreground">
                  Tham gia cộng đồng hàng nghìn người đang thay đổi thế giới
                </p>
              </div>

              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <benefit.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Testimonial */}
              <div className="bg-card/50 backdrop-blur rounded-lg p-6 border">
                <p className="text-sm italic mb-4">
                  "TrustCharity đã giúp tôi quyên góp được hơn 100 triệu đồng
                  cho trẻ em vùng cao. Mọi thứ đều minh bạch và dễ dàng theo
                  dõi."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Nguyễn Văn A</p>
                    <p className="text-xs text-muted-foreground">
                      Nhà từ thiện
                    </p>
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

        {/* Right side - Register Form */}
        <div className="flex-1 lg:max-w-[45%] flex items-center justify-center p-6 lg:p-8">
          <div className="w-full max-w-[420px] space-y-6">
            {/* Register Form */}
            <div className="space-y-6">
              <div className="space-y-2 text-center">
                <h2 className="text-3xl font-bold">Tạo tài khoản</h2>
                <p className="text-muted-foreground">
                  Tham gia cộng đồng từ thiện minh bạch
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleEmailRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Họ và tên *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Nguyễn Văn A"
                      value={formData.fullName}
                      onChange={(e) =>
                        handleInputChange('fullName', e.target.value)
                      }
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange('email', e.target.value)
                      }
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="0987654321"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange('phone', e.target.value)
                      }
                      className="pl-10 h-12"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="password">Mật khẩu *</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) =>
                          handleInputChange('password', e.target.value)
                        }
                        className="pl-10 pr-10 h-12"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3.5 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Xác nhận *</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          handleInputChange('confirmPassword', e.target.value)
                        }
                        className="pl-10 pr-10 h-12"
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-3.5 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={agreeToTerms}
                    onCheckedChange={(checked) =>
                      setAgreeToTerms(checked as boolean)
                    }
                    className="mt-1"
                  />
                  <Label
                    htmlFor="terms"
                    className="text-sm font-normal leading-relaxed cursor-pointer"
                  >
                    Tôi đồng ý với{' '}
                    <Link
                      href="/terms"
                      className="text-primary hover:underline"
                    >
                      điều khoản sử dụng
                    </Link>{' '}
                    và{' '}
                    <Link
                      href="/privacy"
                      className="text-primary hover:underline"
                    >
                      chính sách bảo mật
                    </Link>
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12"
                  size="lg"
                  disabled={authLoading}
                >
                  {authLoading ? 'Đang đăng ký...' : 'Đăng ký'}
                </Button>
              </form>

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

              {/* Web3 Register */}
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
                              variant="outline"
                              className="w-full h-12"
                              size="lg"
                            >
                              <Wallet className="mr-2 h-5 w-5" />
                              Đăng ký bằng ví Web3
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
                              onClick={handleWeb3Register}
                              disabled={
                                isPending ||
                                authLoading ||
                                !formData.fullName.trim() ||
                                !agreeToTerms
                              }
                              className="w-full h-12"
                              variant="default"
                              size="lg"
                            >
                              <Shield className="mr-2 h-5 w-5" />
                              {isPending || authLoading
                                ? 'Đang xác thực...'
                                : 'Hoàn tất đăng ký Web3'}
                            </Button>
                          </div>
                        );
                      })()}
                    </div>
                  );
                }}
              </ConnectButton.Custom>

              {/* Login link */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Đã có tài khoản?{' '}
                  <Link
                    href="/login"
                    className="text-primary hover:underline font-medium"
                  >
                    Đăng nhập ngay
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

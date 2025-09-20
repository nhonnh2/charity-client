import Link from 'next/link';
import Image from 'next/image';

import { Shield, Users, TrendingUp } from 'lucide-react';

import { Logo } from '@/components/ui/logo';

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

function IntroductionSide() {
  return (
    <div className='hidden lg:flex lg:flex-1 lg:max-w-[55%] bg-gradient-to-br from-primary/20 via-primary/10 to-background relative overflow-hidden'>
      {/* Optimized Background Image */}
      <div className='absolute inset-0'>
        <Image
          src='/treemlaocai_flipped.jpeg'
          alt='Background'
          fill
          className='object-cover opacity-60'
          style={{
            objectPosition: '30% 30%',
          }}
          priority // Preload this image
          quality={85} // Optimize quality
        />
      </div>
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
              Nền tảng từ thiện minh bạch hàng đầu Việt Nam
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
              <div className='text-sm text-slate-400'>Người đã tham gia</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className='text-sm text-slate-400'>
          © 2024 TrustCharity. Nền tảng từ thiện minh bạch trên blockchain.
        </div>
      </div>
    </div>
  );
}

export default IntroductionSide;

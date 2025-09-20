import { Heart } from 'lucide-react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className = '', size = 'md' }: LogoProps) {
  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  const containerSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-10 h-10',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div
        className={`flex items-center justify-center ${containerSizes[size]} rounded-lg bg-primary text-primary-foreground`}
      >
        <Heart className={iconSizes[size]} />
      </div>
      <span
        className={`${textSizes[size]} font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent`}
      >
        TrustCharity
      </span>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Home,
  TrendingUp,
  Bell,
  MessageSquare,
  User,
  Wallet,
  ExternalLink,
  BarChart,
  Award,
  Shield,
  Settings,
  HelpCircle,
  LogOut,
  MoreHorizontal,
  Loader2,
} from 'lucide-react';
import { useMobile } from '@/hooks/common/use-mobile';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Logo } from '@/components/ui/logo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import authApiRequest from '@/apiRequests/auth';
import { toast } from 'sonner';

interface SidebarNavProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarNavProps) {
  const pathname = usePathname();
  const isMobile = useMobile();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      const resLogout = await authApiRequest.nextLogout();
      if (resLogout) {
        toast.success('Đăng xuất thành công');
        router.push('/login');
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Có lỗi xảy ra khi đăng xuất');
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Don't render sidebar on mobile
  if (isMobile) {
    return null;
  }

  // Nhóm các mục menu theo chức năng
  const mainNavItems = [
    {
      title: 'Trang chủ',
      href: '/',
      icon: Home,
    },
    {
      title: 'Chiến dịch',
      href: '/campaigns',
      icon: TrendingUp,
    },
    {
      title: 'Xét duyệt',
      href: '/reviewer',
      icon: Shield,
    },
    {
      title: 'Bảng xếp hạng',
      href: '/rankings',
      icon: Award,
    },
  ];

  const userNavItems = [
    {
      title: 'Hồ sơ',
      href: '/profile',
      icon: User,
    },
    {
      title: 'Thông báo',
      href: '/notifications',
      icon: Bell,
    },
    {
      title: 'Tin nhắn',
      href: '/messages',
      icon: MessageSquare,
    },
  ];

  const blockchainNavItems = [
    {
      title: 'Ví điện tử',
      href: '/wallet',
      icon: Wallet,
    },
    {
      title: 'Giao dịch Onchain',
      href: '/transactions',
      icon: ExternalLink,
    },
    {
      title: 'Thống kê',
      href: '/stats',
      icon: BarChart,
    },
  ];

  // Removed otherNavItems - Settings and How-it-works moved to header dropdown

  return (
    <div className='flex flex-col border-r w-64 h-screen sticky top-0 bg-sidebar shadow-sm'>
      <div className='p-4 border-b flex items-center justify-center'>
        <Logo />
      </div>
      <ScrollArea className='flex-1 py-6'>
        <nav className='grid gap-1 px-4'>
          {/* Nhóm chính */}
          {mainNavItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={`main-${index}`}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-primary'
                )}
              >
                <Icon
                  className={cn(
                    'h-5 w-5',
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  )}
                />
                {item.title}
              </Link>
            );
          })}

          <Separator className='my-4' />

          {/* Nhóm người dùng */}
          <div className='px-3 py-2'>
            <h3 className='text-xs font-semibold text-muted-foreground uppercase tracking-wider'>
              Cá nhân
            </h3>
          </div>
          {userNavItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={`user-${index}`}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-primary'
                )}
              >
                <Icon
                  className={cn(
                    'h-5 w-5',
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  )}
                />
                {item.title}
              </Link>
            );
          })}

          <Separator className='my-4' />

          {/* Nhóm blockchain */}
          <div className='px-3 py-2'>
            <h3 className='text-xs font-semibold text-muted-foreground uppercase tracking-wider'>
              Blockchain
            </h3>
          </div>
          {blockchainNavItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={`blockchain-${index}`}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-primary'
                )}
              >
                <Icon
                  className={cn(
                    'h-5 w-5',
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  )}
                />
                {item.title}
              </Link>
            );
          })}

          {/* Removed "Nhóm khác" section - moved to header dropdown */}
        </nav>
      </ScrollArea>
      <div className='border-t p-4'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div
              className={`flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-sidebar-accent cursor-pointer transition-all ${isLoggingOut ? 'opacity-50' : ''}`}
            >
              <Avatar className='h-10 w-10 border-2 border-primary/20'>
                <AvatarImage src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face&auto=format&q=80' />
                <AvatarFallback className='bg-primary/10 text-primary'>
                  TC
                </AvatarFallback>
              </Avatar>
              <div className='flex flex-col flex-1'>
                <span className='text-sm font-medium'>Nguyễn Văn A</span>
                <span className='text-xs text-muted-foreground'>
                  @nguyenvana
                </span>
              </div>
              {isLoggingOut ? (
                <Loader2 className='h-4 w-4 text-muted-foreground animate-spin' />
              ) : (
                <MoreHorizontal className='h-4 w-4 text-muted-foreground' />
              )}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='w-56'>
            <DropdownMenuItem asChild>
              <Link href='/settings'>
                <Settings className='mr-2 h-4 w-4' />
                Cài đặt
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href='/how-it-works'>
                <HelpCircle className='mr-2 h-4 w-4' />
                Cách thức hoạt động
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              disabled={isLoggingOut}
              className='text-destructive'
            >
              {isLoggingOut ? (
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              ) : (
                <LogOut className='mr-2 h-4 w-4' />
              )}
              Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

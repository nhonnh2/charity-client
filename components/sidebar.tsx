'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Home,
  TrendingUp,
  Bell,
  MessageSquare,
  User,
  HelpCircle,
  Settings,
  Wallet,
  LogOut,
  ExternalLink,
  BarChart,
  Award,
  Heart,
  Shield,
} from 'lucide-react';
import { useMobile } from '@/hooks/use-mobile';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

interface SidebarNavProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarNavProps) {
  const pathname = usePathname();
  const isMobile = useMobile();

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

  const otherNavItems = [
    {
      title: 'Cách thức hoạt động',
      href: '/how-it-works',
      icon: HelpCircle,
    },
    {
      title: 'Cài đặt',
      href: '/settings',
      icon: Settings,
    },
  ];

  return (
    <div className="flex flex-col border-r w-64 h-screen sticky top-0 bg-sidebar shadow-sm">
      <div className="p-4 border-b flex items-center justify-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary text-primary-foreground">
            <Heart className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent/80 bg-clip-text text-transparent">
            TrustCharity
          </span>
        </Link>
      </div>
      <ScrollArea className="flex-1 py-6">
        <nav className="grid gap-1 px-4">
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

          <Separator className="my-4" />

          {/* Nhóm người dùng */}
          <div className="px-3 py-2">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
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

          <Separator className="my-4" />

          {/* Nhóm blockchain */}
          <div className="px-3 py-2">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
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

          <Separator className="my-4" />

          {/* Nhóm khác */}
          {otherNavItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={`other-${index}`}
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
        </nav>
      </ScrollArea>
      <div className="border-t p-4">
        <div className="flex items-center gap-4 py-2">
          <Avatar className="h-10 w-10 border-2 border-primary/20">
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback className="bg-primary/10 text-primary">
              TC
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Người dùng</span>
            <span className="text-xs text-muted-foreground">Đã xác minh</span>
          </div>
        </div>
      </div>
    </div>
  );
}

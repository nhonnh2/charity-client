'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Bell,
  Menu,
  MessageSquare,
  Search,
  Wallet,
  LogOut,
  HelpCircle,
  Settings,
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useMobile } from '@/hooks/use-mobile';
import { useAuthState } from '@/hooks/use-auth';
import { Logo } from '@/components/ui/logo';

export default function Header() {
  const isMobile = useMobile();
  const { user, isAuthenticated, logout } = useAuthState();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                  <Logo size="lg" className="mb-4" />
                  <Link
                    href="/"
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
                    <span>Trang chủ</span>
                  </Link>
                  <Link
                    href="/campaigns"
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
                    <span>Chiến dịch</span>
                  </Link>
                  <Link
                    href="/wallet"
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
                    <span>Ví điện tử</span>
                  </Link>
                  <Link
                    href="/transactions"
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
                    <span>Giao dịch Onchain</span>
                  </Link>
                  <Link
                    href="/how-it-works"
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
                    <span>Cách thức hoạt động</span>
                  </Link>
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
                    <span>Hồ sơ</span>
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          )}

          <Logo size={isMobile ? 'sm' : 'lg'} />
        </div>

        <div className="flex md:w-1/3 lg:w-1/4">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Tìm kiếm chiến dịch..."
              className="w-full pl-8"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              {isMobile ? (
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -right-1 -top-1 h-5 w-5 p-0 flex items-center justify-center">
                    3
                  </Badge>
                </Button>
              ) : (
                <>
                  <Button variant="ghost" size="icon" asChild>
                    <Link href="/wallet">
                      <Wallet className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative"
                    asChild
                  >
                    <Link href="/notifications">
                      <Bell className="h-5 w-5" />
                      <Badge className="absolute -right-1 -top-1 h-5 w-5 p-0 flex items-center justify-center">
                        3
                      </Badge>
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" asChild>
                    <Link href="/messages">
                      <MessageSquare className="h-5 w-5" />
                    </Link>
                  </Button>
                </>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={
                        user?.avatar || '/placeholder.svg?height=32&width=32'
                      }
                      alt={user?.fullName}
                    />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {user?.fullName?.charAt(0)?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user?.fullName}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {user?.email || user?.walletAddress}
                      </p>
                      <div className="flex items-center gap-1">
                        <Badge variant="outline" className="text-xs">
                          Uy tín: {user?.reputation || 0}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {user?.authType === 'web3' ? 'Web3' : 'Email'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Hồ sơ</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      Cài đặt
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/how-it-works">
                      <HelpCircle className="mr-2 h-4 w-4" />
                      Cách thức hoạt động
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Đăng xuất</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" asChild>
                <Link href="/login">Đăng nhập</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/register">Đăng ký</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

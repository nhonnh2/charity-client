'use client';

import { useAuthState } from '@/hooks/auth/use-auth';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

export default function TestAuthPage() {
  const { user, isAuthenticated, isLoading, logout } = useAuthState();
  const { address, isConnected } = useAccount();

  if (isLoading) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='flex items-center justify-center min-h-96'>
          <div className='text-center'>
            <div className='animate-spin h-8 w-8 border-2 border-primary rounded-full border-t-transparent mx-auto mb-4'></div>
            <p>Đang tải thông tin xác thực...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8 max-w-4xl'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold mb-2'>Test Authentication</h1>
        <p className='text-muted-foreground'>
          Trang demo để test tính năng đăng nhập/đăng ký Web3 và Email
        </p>
      </div>

      <div className='grid gap-6 md:grid-cols-2'>
        {/* Authentication Status */}
        <Card>
          <CardHeader>
            <CardTitle>Trạng thái đăng nhập</CardTitle>
            <CardDescription>
              Thông tin về trạng thái xác thực hiện tại
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-center justify-between'>
              <span>Đã đăng nhập:</span>
              <Badge variant={isAuthenticated ? 'default' : 'secondary'}>
                {isAuthenticated ? 'Có' : 'Không'}
              </Badge>
            </div>

            {user && (
              <>
                <Separator />
                <div className='space-y-2'>
                  <div className='flex items-center justify-between'>
                    <span>Họ tên:</span>
                    <span className='font-medium'>{user.fullName}</span>
                  </div>

                  <div className='flex items-center justify-between'>
                    <span>Loại xác thực:</span>
                    <Badge variant='outline'>
                      {user.authType === 'web3' ? 'Web3' : 'Email'}
                    </Badge>
                  </div>

                  <div className='flex items-center justify-between'>
                    <span>Uy tín:</span>
                    <Badge variant='outline'>{user.reputation}</Badge>
                  </div>

                  <div className='flex items-center justify-between'>
                    <span>Đã xác thực:</span>
                    <Badge
                      variant={user.isVerified ? 'default' : 'destructive'}
                    >
                      {user.isVerified ? 'Có' : 'Chưa'}
                    </Badge>
                  </div>

                  {user.email && (
                    <div className='flex items-center justify-between'>
                      <span>Email:</span>
                      <span className='text-sm text-muted-foreground'>
                        {user.email}
                      </span>
                    </div>
                  )}

                  {user.walletAddress && (
                    <div className='flex items-center justify-between'>
                      <span>Địa chỉ ví:</span>
                      <span className='text-sm text-muted-foreground font-mono'>
                        {user.walletAddress.slice(0, 6)}...
                        {user.walletAddress.slice(-4)}
                      </span>
                    </div>
                  )}
                </div>
              </>
            )}

            {isAuthenticated && (
              <>
                <Separator />
                <Button
                  onClick={logout}
                  variant='destructive'
                  className='w-full'
                >
                  Đăng xuất
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {/* Web3 Connection Status */}
        <Card>
          <CardHeader>
            <CardTitle>Trạng thái Web3</CardTitle>
            <CardDescription>Thông tin về kết nối ví Web3</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-center justify-between'>
              <span>Ví đã kết nối:</span>
              <Badge variant={isConnected ? 'default' : 'secondary'}>
                {isConnected ? 'Có' : 'Không'}
              </Badge>
            </div>

            {address && (
              <>
                <div className='flex items-center justify-between'>
                  <span>Địa chỉ:</span>
                  <span className='text-sm font-mono text-muted-foreground'>
                    {address.slice(0, 6)}...{address.slice(-4)}
                  </span>
                </div>
              </>
            )}

            <Separator />

            <div className='space-y-2'>
              <p className='text-sm text-muted-foreground'>
                Kết nối ví để sử dụng các tính năng Web3:
              </p>
              <ConnectButton
                showBalance={true}
                chainStatus='full'
                accountStatus={{
                  smallScreen: 'avatar',
                  largeScreen: 'full',
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className='md:col-span-2'>
          <CardHeader>
            <CardTitle>Thao tác nhanh</CardTitle>
            <CardDescription>
              Các link để test tính năng authentication
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid gap-4 md:grid-cols-4'>
              <Button asChild variant='outline'>
                <Link href='/login'>Đăng nhập</Link>
              </Button>
              <Button asChild variant='outline'>
                <Link href='/register'>Đăng ký</Link>
              </Button>
              <Button asChild variant='outline'>
                <Link href='/profile'>Hồ sơ</Link>
              </Button>
              <Button asChild variant='outline'>
                <Link href='/'>Trang chủ</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

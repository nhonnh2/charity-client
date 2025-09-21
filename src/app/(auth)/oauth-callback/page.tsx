'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/stores/auth-store';

export default function OAuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser } = useAuthStore();

  useEffect(() => {
    // Lấy user data từ URL params (được truyền từ server)
    const userData = searchParams.get('userData');

    if (userData) {
      try {
        const parsedUserData = JSON.parse(decodeURIComponent(userData));
        setUser(parsedUserData);
        router.push('/');
      } catch (error) {
        console.error('Error parsing user data:', error);
        router.push('/login?error=oauth_callback_failed');
      }
    } else {
      // Nếu không có user data, redirect về login
      router.push('/login?error=missing_user_data');
    }
  }, [searchParams, setUser, router]);

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='text-center'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4'></div>
        <p>Đang xử lý đăng nhập...</p>
      </div>
    </div>
  );
}

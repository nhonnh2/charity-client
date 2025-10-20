'use client';

import { Suspense, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { refreshOnce } from '@/lib/auth/single-flight';
// No direct auth API usage in this file

function RefreshToken() {
  const handleRefreshRef = useRef<any>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const csrfTokenFromUrl = searchParams.get('csrfToken');
  const pathNameRedirect: any = searchParams.get('returnTo');
  useEffect(() => {
    if (!handleRefreshRef.current) {
      handleRefreshRef.current = handleRefresh();
    }
    return () => {
      handleRefreshRef.current = null;
    };
  }, [router, csrfTokenFromUrl]);

  const handleRefresh = async () => {
    const res = await refreshOnce();
    if (res) {
      router.replace(pathNameRedirect);
    } else {
      router.replace('/logout');
    }
  };

  return <div>Refresh token....</div>;
}

export default function RefreshTokenPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RefreshToken />
    </Suspense>
  );
}

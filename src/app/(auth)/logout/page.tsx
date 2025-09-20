'use client';

import { Suspense, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

import { logoutOnce } from '@/lib/singe-flight';

function Logout() {
  const router = useRouter();
  const handleLogouthRef = useRef<any>(null);

  useEffect(() => {
    if (!handleLogouthRef.current) {
      handleLogouthRef.current = handleLogout();
    }
    return () => {
      handleLogouthRef.current = null;
    };
  }, []);

  const handleLogout = async () => {
    const res = await logoutOnce();
    if (res) {
      router.replace('/login');
    }
  };

  return <div>Log out....</div>;
}
export default function LogoutPage() {
  return (
    <Suspense>
      <Logout />
    </Suspense>
  );
}

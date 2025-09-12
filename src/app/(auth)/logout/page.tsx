'use client';

import { Suspense, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import authApiRequest from '@/apiRequests/auth';

function Logout() {
  const router = useRouter();

  useEffect(() => {
    authApiRequest
      .logout()
      .then(() => {
        router.push('/login');
      })
      .catch(error => console.error(error));
  }, []);
  return <div>Log out....</div>;
}
export default function LogoutPage() {
  return (
    <Suspense>
      <Logout />
    </Suspense>
  );
}

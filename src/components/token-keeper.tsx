// app/token-keeper.tsx
'use client';
import { useEffect } from 'react';
import { refreshOnce } from '@/lib/auth/single-flight';

const TIMEOUT = 590000;

export default function TokenKeeper() {
  useEffect(() => {
    const t = setInterval(async () => {
      await refreshOnce();
    }, TIMEOUT);
    return () => clearInterval(t);
  }, []);
  return null;
}

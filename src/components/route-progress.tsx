'use client';
// @ts-ignore
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function RouteProgress() {
  const pathname = usePathname();
  const timeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    NProgress.configure({ showSpinner: false, trickleSpeed: 100 });

    // Bắt đầu progress khi click vào link nội bộ
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A') {
        const href = (target as HTMLAnchorElement).getAttribute('href');
        if (href && href.startsWith('/') && !href.startsWith('//')) {
          NProgress.start();
        }
      }
    };
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    // Khi pathname đổi (trang render xong), dừng progress
    timeout.current = setTimeout(() => {
      NProgress.done();
    }, 200);

    return () => {
      if (timeout.current) clearTimeout(timeout.current);
      NProgress.done();
    };
  }, [pathname]);

  return null;
}

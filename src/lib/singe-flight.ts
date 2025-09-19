import crypto from 'crypto';
import { NextResponse } from 'next/server';

// single-flight refresh to back end

type P = Promise<NextResponse>;
const locks = new Map<string, P>();

export function keyFromRefresh(rt: string) {
  return crypto.createHash('sha256').update(rt).digest('base64url');
}

export function withRefreshLock(
  key: string,
  task: () => Promise<NextResponse>
): P {
  const ex = locks.get(key);
  if (ex) return ex;
  const p = task().finally(() => locks.delete(key));
  locks.set(key, p);
  return p;
}

// singe-flight refresh request front end

let refreshRequest: null | Promise<boolean> = null;
const isClient = typeof window !== 'undefined';

// Gọi refresh 1 lần duy nhất tại một thời điểm
export async function refreshOnce(): Promise<boolean | string> {
  if (!refreshRequest) {
    const headers: HeadersInit = {};
    // (tuỳ chọn) CSRF header nếu bạn có set csrf_token
    const csrf = document.cookie
      ?.split('; ')
      .find(s => s.startsWith('csrfToken='))
      ?.split('=')[1];
    if (csrf) (headers as any)['x-csrf-token'] = csrf;

    refreshRequest = fetch('/api/auth/refresh', {
      method: 'POST',
      headers,
      cache: 'no-store',
      ...(isClient ? { credentials: 'include' } : {}),
    })
      .then(r => r.ok)
      .catch(() => false)
      .finally(() => {
        // đặt lại sau tick để request đang await vẫn dùng được
        refreshRequest = null;
      });
  }
  return refreshRequest;
}

// single-flight logout

let logoutRequest: null | Promise<any> = null;
export async function logoutOnce() {
  if (!isClient) return;
  if (!logoutRequest) {
    logoutRequest = fetch('/api/auth/logout', {
      method: 'POST',
      cache: 'no-store',
    }).finally(() => {
      logoutRequest = null;
    });
  }
  try {
    await logoutRequest;
  } catch {}
}

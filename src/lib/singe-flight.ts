import envConfig from '@/config';

const isClient = typeof window !== 'undefined';

// single-flight logout

let logoutRequest: null | Promise<boolean> = null;
export async function logoutOnce() {
  if (!logoutRequest) {
    const url = isClient
      ? '/api/auth/logout' // Client-side: relative path
      : `${envConfig.NEXT_PUBLIC_URL}/api/auth/logout`; // Server-side: full URL

    logoutRequest = fetch(url, {
      method: 'POST',
      cache: 'no-store',
      credentials: 'include',
      ...(isClient ? { credentials: 'include' } : {}),
    })
      .then(async r => {
        return r.ok;
      })
      .catch(error => {
        console.error('❌ Logout request failed:', error);
        return false;
      })
      .finally(() => {
        logoutRequest = null;
      });
  }
  return logoutRequest;
}

// singe-flight refresh request front end

let refreshRequest: null | Promise<boolean> = null;

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

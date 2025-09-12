import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { EntityError, HttpError } from '@/lib/http';
import { withRefreshLock, keyFromRefresh } from '@/lib/refresh-lock';

import authApiRequest from '@/apiRequests/auth';

export async function POST(request: Request) {
  const cookieStore = await cookies();

  const refreshToken = cookieStore.get('refreshToken')?.value;

  const csrfCookie = cookieStore.get('csrfToken')?.value;
  const csrfHeader = request.headers.get('x-csrf-token');

  if (!refreshToken || (csrfCookie && csrfHeader !== csrfCookie)) {
    return NextResponse.json(
      {
        message: 'Refresh không được chấp nhận',
      },
      {
        status: 403,
      }
    );
  }

  const key = keyFromRefresh(refreshToken);
  const resRefresh = await withRefreshLock(key, async () => {
    try {
      const response = await authApiRequest.refreshToken({ refreshToken });

      if (response?.data) {
        const resNext = NextResponse.json({}, { status: 200 });
        resNext.cookies.set('accessToken', response.data.accessToken ?? '', {
          httpOnly: true,
          sameSite: 'lax',
          path: '/',
          secure: process.env.NODE_ENV === 'production',
        });

        resNext.cookies.set('refreshToken', response.data.refreshToken ?? '', {
          httpOnly: true,
          sameSite: 'lax',
          path: '/',
          secure: process.env.NODE_ENV === 'production',
        });

        resNext.cookies.set('csrfToken', response.data.csrfToken ?? '', {
          sameSite: 'lax',
          path: '/',
          secure: process.env.NODE_ENV === 'production',
        });
        return resNext;
      }

      return NextResponse.json(response, { status: 200 });
    } catch (error: unknown) {
      console.error('Login route error:', error);
      if (error instanceof EntityError || error instanceof HttpError) {
        return NextResponse.json(error.payload, { status: error.status });
      }
      return NextResponse.json(
        { message: 'Internal Server Error' },
        { status: 500 }
      );
    }
  });
  return resRefresh;
}

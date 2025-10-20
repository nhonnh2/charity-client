import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { EntityError, HttpError } from '@/lib/api/http';

import { refreshToken as refreshTokenRequest } from '@/apiRequests/auth';

export async function POST(request: Request) {
  const cookieStore = await cookies();

  const refreshToken = cookieStore.get('refreshToken')?.value;

  const csrfCookie = cookieStore.get('csrfToken')?.value;
  const csrfHeader = request.headers.get('x-csrf-token');
  console.log('refresh_api', refreshToken, csrfCookie, csrfHeader);
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

  try {
    const response = await refreshTokenRequest({ refreshToken });
    if (response) {
      const resNext = NextResponse.json({}, { status: 200 });
      resNext.cookies.set('accessToken', response.accessToken ?? '', {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      });

      resNext.cookies.set('refreshToken', response.refreshToken ?? '', {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      });

      resNext.cookies.set('csrfToken', response.csrfToken ?? '', {
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
      const nextResError = NextResponse.json(error.payload, {
        status: error.status,
      });

      return nextResError;
    }
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

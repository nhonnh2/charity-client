import { NextResponse } from 'next/server';

import { login } from '@/apiRequests/auth';
import { EntityError, HttpError } from '@/lib/api/http';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = await login(body);
    if (response) {
      const resNext = NextResponse.json(response, { status: 200 });
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
      return NextResponse.json(error.payload, { status: error.status });
    }
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

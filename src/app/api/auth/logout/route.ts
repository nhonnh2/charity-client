import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { EntityError, HttpError } from '@/lib/http';

import authApiRequest from '@/apiRequests/auth';

export async function POST(request: Request) {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!accessToken || !refreshToken) {
    return NextResponse.json(
      {
        message: 'Không nhận được access token hoặc refresh token',
      },
      {
        status: 200,
      }
    );
  }
  try {
    await authApiRequest.logout({ refreshToken });

    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');
    cookieStore.delete('csrfToken');

    return Response.json(
      {
        message: 'Logout thành công',
      },
      {
        status: 200,
      }
    );
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

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import authApiRequest from '@/apiRequests/auth';

export async function POST(request: Request) {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get('accessToken')?.value;
  console.log('accessToken__deleted', accessToken);

  if (!accessToken) {
    return NextResponse.json(
      {
        message: 'Không nhận được access token hoặc refresh token',
      },
      {
        status: 200,
      }
    );
  }

  cookieStore.delete('accessToken');

  return Response.json(
    {
      message: 'Logout thành công',
    },
    {
      status: 200,
    }
  );
}

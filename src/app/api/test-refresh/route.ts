import { NextResponse } from 'next/server';
import { refreshServerOnce } from '@/lib/singe-flight';
import { readCookie } from '@/lib/read-on-server';

export async function GET() {
  try {
    console.log('Testing refreshServerOnce...');

    // Test đọc refresh token hiện tại
    const currentRefreshToken = await readCookie('refreshToken');
    console.log(
      'Current refresh token:',
      currentRefreshToken ? 'exists' : 'not found'
    );

    // Gọi refreshServerOnce
    const result = await refreshServerOnce();
    console.log('refreshServerOnce result:', result);

    // Đọc lại cookies sau khi refresh
    const newAccessToken = await readCookie('accessToken');
    const newRefreshToken = await readCookie('refreshToken');
    const newCsrfToken = await readCookie('csrfToken');

    return NextResponse.json({
      success: true,
      message: 'Refresh test completed',
      data: {
        refreshResult: result,
        cookies: {
          accessToken: newAccessToken ? 'set' : 'not set',
          refreshToken: newRefreshToken ? 'set' : 'not set',
          csrfToken: newCsrfToken ? 'set' : 'not set',
        },
      },
    });
  } catch (error) {
    console.error('Test refresh error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

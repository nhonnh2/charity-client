import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

function abs(req: Request, path: string) {
  return new URL(path, req.url);
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const error = url.searchParams.get('error');

  if (error) {
    return NextResponse.redirect(`/login?error=${encodeURIComponent(error)}`);
  }
  if (!code || !state) {
    return NextResponse.redirect(`/login?error=missing_code_or_state`);
  }

  const cookieStore = await cookies();
  const savedState = cookieStore.get('fb_state')?.value;
  const savedNonce = cookieStore.get('fb_nonce')?.value;

  // Xoá cookies tạm, tránh reuse
  cookieStore.delete('fb_state');
  cookieStore.delete('fb_nonce');

  if (!savedState || state !== savedState) {
    return NextResponse.redirect(`/login?error=state_invalid`);
  }

  // Đổi code lấy token từ Facebook
  const tokenRes = await fetch(
    'https://graph.facebook.com/v18.0/oauth/access_token',
    {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: process.env.FACEBOOK_CLIENT_ID!,
        client_secret: process.env.FACEBOOK_CLIENT_SECRET!,
        redirect_uri: process.env.FACEBOOK_REDIRECT_URI!,
        code,
      }),
    }
  );

  if (!tokenRes.ok) {
    const t = await tokenRes.text().catch(() => '');
    return NextResponse.redirect(
      `/login?error=facebook_token_exchange_failed&detail=${encodeURIComponent(t)}`
    );
  }

  const tokens = (await tokenRes.json()) as {
    access_token: string;
    token_type: 'bearer';
    expires_in: number;
  };

  if (!tokens.access_token) {
    return NextResponse.redirect(abs(req, `/login?error=missing_access_token`));
  }

  // Gửi thông tin user cho Nest để tạo account và token nội bộ
  const nestRes = await fetch(
    process.env.INTERNAL_NEST_OAUTH_FACEBOOK_ENDPOINT!,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        accessToken: tokens.access_token,
      }),
    }
  );

  if (!nestRes.ok) {
    const t = await nestRes.text().catch(() => '');
    return NextResponse.redirect(
      abs(req, `/login?error=nest_oauth_failed&detail=${encodeURIComponent(t)}`)
    );
  }

  const response = await nestRes.json();

  // Kiểm tra response từ NestJS
  if (!response.data || !response.data.accessToken) {
    return NextResponse.redirect(
      abs(req, `/login?error=invalid_nest_response`)
    );
  }

  // Lưu user info vào localStorage thông qua client-side script
  const userData = {
    id: parseInt(response.data.user.id),
    name: response.data.user.name,
    email: response.data.user.email,
    role: response.data.user.role,
    avatar: response.data.user.avatar,
  };

  // Set cookie nội bộ như flow hiện tại
  const redirectUrl = abs(
    req,
    `/oauth-callback?userData=${encodeURIComponent(JSON.stringify(userData))}`
  );
  const resNext = NextResponse.redirect(redirectUrl, { status: 302 });

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

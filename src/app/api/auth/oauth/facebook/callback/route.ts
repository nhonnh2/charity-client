// src/app/api/oauth/facebook/callback/route.ts
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

  if (error)
    return NextResponse.redirect(`/login?error=${encodeURIComponent(error)}`);
  if (!code || !state)
    return NextResponse.redirect(`/login?error=missing_code_or_state`);

  const cookieStore = await cookies();
  const savedState = cookieStore.get('fb_state')?.value;
  const verifier = cookieStore.get('fb_verifier')?.value;
  cookieStore.delete('fb_state');
  cookieStore.delete('fb_verifier');
  cookieStore.delete('fb_nonce');

  if (!savedState || state !== savedState || !verifier) {
    return NextResponse.redirect(`/login?error=state_or_verifier_invalid`);
  }

  const v = process.env.FACEBOOK_OAUTH_VERSION || 'v23.0';
  const tokenRes = await fetch(
    `https://graph.facebook.com/${v}/oauth/access_token`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.FACEBOOK_REDIRECT_URI!,
        client_id: process.env.FACEBOOK_CLIENT_ID!,
        client_secret: process.env.FACEBOOK_CLIENT_SECRET!,
        code_verifier: verifier,
      }),
    }
  );

  if (!tokenRes.ok) {
    const t = await tokenRes.text().catch(() => '');
    return NextResponse.redirect(
      abs(
        req,
        `/login?error=facebook_token_exchange_failed&detail=${encodeURIComponent(t)}`
      )
    );
  }

  const tokens = (await tokenRes.json()) as {
    access_token: string;
    token_type: 'bearer' | 'Bearer';
    expires_in?: number;
    id_token?: string;
  };

  if (!tokens.id_token) {
    // Fallback: nếu không bật OIDC/id_token, bạn có thể gọi /me để lấy email,
    // nhưng khuyến nghị dùng OIDC id_token để verify chữ ký.
    return NextResponse.redirect(abs(req, `/login?error=missing_id_token`));
  }
  console.log('tokenRes_____2', tokens);

  // Gửi id_token sang Nest để verify & mint JWT nội bộ
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
  console.log('nestRes______', nestRes);
  if (!nestRes.ok) {
    const t = await nestRes.text().catch(() => '');
    return NextResponse.redirect(
      abs(req, `/login?error=nest_oauth_failed&detail=${encodeURIComponent(t)}`)
    );
  }

  const response = await nestRes.json();
  console.log('tokenRes_____3', nestRes, response);

  // Kiểm tra response từ NestJS
  if (!response.data || !response.data.accessToken) {
    return NextResponse.redirect(
      abs(req, `/login?error=invalid_nest_response`)
    );
  }

  // Set cookie nội bộ như flow hiện tại
  const redirectUrl = abs(req, '/');
  console.log('Redirecting to:', redirectUrl.toString());
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

  console.log('Cookies set, redirecting to:', redirectUrl.toString());
  return resNext;
}

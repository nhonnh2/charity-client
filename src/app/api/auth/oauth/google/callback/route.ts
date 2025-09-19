import { NextResponse } from 'next/server';
import { cookies, headers } from 'next/headers';

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
  const savedState = cookieStore.get('g_state')?.value;
  const verifier = cookieStore.get('g_verifier')?.value;
  const savedNonce = cookieStore.get('g_nonce')?.value;

  // Xoá cookies tạm, tránh reuse
  cookieStore.delete('g_state');
  cookieStore.delete('g_verifier');
  cookieStore.delete('g_nonce');

  if (!savedState || state !== savedState || !verifier) {
    return NextResponse.redirect(`/login?error=state_or_verifier_invalid`);
  }

  // Đổi code lấy token từ Google
  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      code_verifier: verifier,
    }),
  });
  console.log('tokenRes_____1', tokenRes);
  if (!tokenRes.ok) {
    const t = await tokenRes.text().catch(() => '');
    return NextResponse.redirect(
      `/login?error=google_token_exchange_failed&detail=${encodeURIComponent(t)}`
    );
  }

  const tokens = (await tokenRes.json()) as {
    id_token: string;
    access_token: string;
    refresh_token?: string;
    expires_in: number;
    token_type: 'Bearer';
  };
  console.log('tokenRes_____2', tokens);

  if (!tokens.id_token) {
    return NextResponse.redirect(abs(req, `/login?error=missing_id_token`));
  }

  // Gửi id_token cho Nest để verify & mint token nội bộ
  const nestRes = await fetch(process.env.INTERNAL_NEST_OAUTH_ENDPOINT!, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      idToken: tokens.id_token,
      nonce: savedNonce, // để Nest so khớp nonce trong id_token
    }),
  });
  console.log('tokenRes_____3', nestRes, nestRes.ok);

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

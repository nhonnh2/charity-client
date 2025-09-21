import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';

export async function GET() {
  const state = crypto.randomBytes(32).toString('hex');
  const nonce = crypto.randomBytes(32).toString('hex');

  // Lưu state và nonce vào cookie để verify sau
  const cookieStore = await cookies();
  cookieStore.set('fb_state', state, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 600, // 10 phút
  });

  cookieStore.set('fb_nonce', nonce, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 600, // 10 phút
  });

  const params = new URLSearchParams({
    client_id: process.env.FACEBOOK_CLIENT_ID!,
    redirect_uri: process.env.FACEBOOK_REDIRECT_URI!,
    state,
    response_type: 'code',
    scope: 'email,public_profile',
  });

  const facebookAuthUrl = `https://www.facebook.com/v18.0/dialog/oauth?${params.toString()}`;

  return NextResponse.redirect(facebookAuthUrl);
}

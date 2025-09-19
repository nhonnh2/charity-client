import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  genCodeVerifier,
  codeChallengeFrom,
  genState,
  genNonce,
} from '@/lib/pkce';

const GOOGLE_AUTHZ = 'https://accounts.google.com/o/oauth2/v2/auth';
const SCOPES = ['openid', 'email', 'profile'].join(' ');

export async function GET() {
  const cookieStore = await cookies();

  const state = genState();
  const nonce = genNonce();
  const codeVerifier = genCodeVerifier();
  const codeChallenge = codeChallengeFrom(codeVerifier);

  const redirectUri = process.env.GOOGLE_REDIRECT_URI!;
  const clientId = process.env.GOOGLE_CLIENT_ID!;

  // Lưu cookie tạm để verify ở callback
  const secure = process.env.NODE_ENV === 'production';
  const opts = {
    httpOnly: true,
    secure,
    sameSite: 'lax' as const,
    path: '/api/auth/oauth/google',
    maxAge: 300,
  };

  cookieStore.set('g_state', state, opts);
  cookieStore.set('g_nonce', nonce, opts);
  cookieStore.set('g_verifier', codeVerifier, opts);

  const url = new URL(GOOGLE_AUTHZ);
  url.searchParams.set('client_id', clientId);
  url.searchParams.set('redirect_uri', redirectUri);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('scope', SCOPES);
  url.searchParams.set('state', state);
  url.searchParams.set('nonce', nonce);
  url.searchParams.set('code_challenge', codeChallenge);
  url.searchParams.set('code_challenge_method', 'S256');
  // (tuỳ chọn) prompt=consent & access_type=offline để có refresh_token Google
  // url.searchParams.set("prompt", "consent");
  // url.searchParams.set("access_type", "offline");

  return NextResponse.redirect(url.toString(), { status: 302 });
}

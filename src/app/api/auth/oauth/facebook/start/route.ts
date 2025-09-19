import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  genCodeVerifier,
  codeChallengeFrom,
  genState,
  genNonce,
} from '@/lib/pkce';

export async function GET() {
  const cookieStore = await cookies();
  const state = genState();
  const nonce = genNonce();
  const verifier = genCodeVerifier();
  const challenge = codeChallengeFrom(verifier);

  const secure = process.env.NODE_ENV === 'production';
  const opts = {
    httpOnly: true,
    secure,
    sameSite: 'lax' as const,
    path: '/api/auth/oauth/facebook',
    maxAge: 300,
  };
  cookieStore.set('fb_state', state, opts);
  cookieStore.set('fb_nonce', nonce, opts);
  cookieStore.set('fb_verifier', verifier, opts);

  const v = process.env.FACEBOOK_OAUTH_VERSION || 'v23.0';
  const authz = new URL(`https://www.facebook.com/${v}/dialog/oauth`);
  authz.searchParams.set('client_id', process.env.FACEBOOK_CLIENT_ID!);
  authz.searchParams.set('redirect_uri', process.env.FACEBOOK_REDIRECT_URI!);
  authz.searchParams.set('response_type', 'code');
  authz.searchParams.set('state', state);
  authz.searchParams.set('scope', 'openid email public_profile');
  // PKCE
  authz.searchParams.set('code_challenge', challenge);
  authz.searchParams.set('code_challenge_method', 'S256');
  // optional: display=popup, auth_type=rerequest, etc.

  return NextResponse.redirect(authz.toString(), { status: 302 });
}

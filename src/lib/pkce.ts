import crypto from 'crypto';

const b64url = (buf: Buffer) =>
  buf
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');

export function genCodeVerifier(): string {
  // 43–128 chars
  return b64url(crypto.randomBytes(64));
}
export function codeChallengeFrom(verifier: string): string {
  const hash = crypto.createHash('sha256').update(verifier).digest();
  return b64url(hash);
}
export function genState(): string {
  return b64url(crypto.randomBytes(16));
}
export function genNonce(): string {
  return b64url(crypto.randomBytes(16));
}

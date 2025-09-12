import crypto from 'crypto';
import { NextResponse } from 'next/server';

type P = Promise<NextResponse>;
const locks = new Map<string, P>();

export function keyFromRefresh(rt: string) {
  return crypto.createHash('sha256').update(rt).digest('base64url');
}

export function withRefreshLock(
  key: string,
  task: () => Promise<NextResponse>
): P {
  const ex = locks.get(key);
  if (ex) return ex;
  const p = task().finally(() => locks.delete(key));
  locks.set(key, p);
  return p;
}

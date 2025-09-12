'use server';
import { cookies as nextCookies } from 'next/headers';

export const readCookie = async (name: string) => {
  const cookies = await nextCookies();
  return cookies.get(name)?.value;
};

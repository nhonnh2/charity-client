'use server';
import { cookies as nextCookies } from 'next/headers';
import { headers } from 'next/headers';

export const readCookiesAll = async () => {
  const cookies = await nextCookies();
  return cookies;
};

export const readCookie = async (name: string) => {
  const cookies = await nextCookies();
  return cookies.get(name)?.value;
};

export const readHeader = async (name: string) => {
  const h = await headers();
  return h.get(name);
};

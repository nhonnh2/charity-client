import http from '@/lib/http';

import {
  LoginBodyType,
  LoginResType,
  RegisterBodyType,
  RegisterResType,
} from '@/schemaValidations/auth.schema';

const authApiRequest = {
  login: (body: LoginBodyType) => http.post<LoginResType>('/auth/login', body),
  register: (body: RegisterBodyType) =>
    http.post<RegisterResType>('/auth/register', body),
  refreshToken: (refreshBody: any) =>
    http.post<LoginResType>('/auth/refresh', refreshBody),
  auth: (body: { sessionToken: string; expiresAt: string }) =>
    http.post('/api/auth', body, {
      baseUrl: '',
    }),
  logout: (refreshBody: any) => http.post('/auth/logout', refreshBody),
  nextLogin: (body: LoginBodyType) =>
    http.post('/api/auth/login', body, {
      baseUrl: '',
    }),
  nextRefreshToken: (csrfToken: string) =>
    http.post(
      '/api/auth/refresh',
      {},
      {
        baseUrl: '',
        headers: { ['x-csrf-token']: csrfToken },
      }
    ),
};

export default authApiRequest;

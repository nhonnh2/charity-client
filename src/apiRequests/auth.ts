import http from '@/lib/api/http';
import {
  RegisterResponseSchema,
  LoginResponseSchema,
  type LoginBody,
  type RegisterBody,
  type RegisterResponse,
  type LoginResponse,
} from '@/schemaValidations/auth.schema';

// ============================================
// QUERY TYPES
// ============================================
export type LoginQuery = {
  email: string;
  password: string;
};

export type RegisterQuery = {
  name: string;
  email: string;
  password: string;
};

// ============================================
// API METHODS - Sử dụng interceptor tự động
// ============================================

// Login user
export const login = async (data: LoginBody): Promise<LoginResponse> => {
  return http.post<LoginResponse>('auth/login', data);
};

// Register user
export const register = async (
  data: RegisterBody
): Promise<RegisterResponse> => {
  return http.post<RegisterResponse>('auth/register', data);
};

// Refresh token
export const refreshToken = async (
  refreshBody: any
): Promise<LoginResponse> => {
  return http.post<LoginResponse>('auth/refresh', refreshBody, {
    dataSchema: LoginResponseSchema,
  });
};

// Logout user
export const logout = async (
  refreshBody: any
): Promise<{ success: boolean; message: string }> => {
  return http.post<{ success: boolean; message: string }>(
    'auth/logout',
    refreshBody
  );
};

// ============================================
// NEXT.JS API ROUTES - Cho server-side auth
// ============================================

// Next.js login
export const nextLogin = async (data: LoginBody): Promise<LoginResponse> => {
  return http.post<LoginResponse>('api/auth/login', data, {
    baseUrl: '',
    dataSchema: LoginResponseSchema,
  });
};

// Next.js logout
export const nextLogout = async (): Promise<{
  success: boolean;
  message: string;
}> => {
  return http.post<{ success: boolean; message: string }>(
    'api/auth/logout',
    null,
    {
      baseUrl: '',
    }
  );
};

// Next.js refresh token
export const nextRefreshToken = async (
  csrfToken: string
): Promise<LoginResponse> => {
  return http.post<LoginResponse>(
    'api/auth/refresh',
    {},
    {
      baseUrl: '',
      headers: { ['x-csrf-token']: csrfToken },
      dataSchema: LoginResponseSchema,
    }
  );
};

// Next.js auth session
export const auth = async (body: {
  sessionToken: string;
  expiresAt: string;
}): Promise<any> => {
  return http.post('api/auth', body, {
    baseUrl: '',
  });
};

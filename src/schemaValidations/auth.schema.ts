import { z } from 'zod';
import { AuthResponseSchema, type AuthResponse } from './common.schema';

// ============================================
// FORM VALIDATION SCHEMAS - Cho UI forms
// ============================================

// Schema cho form validation (bao gồm confirmPassword)
export const RegisterFormBodySchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, 'Tên là bắt buộc')
      .min(2, 'Tên phải có ít nhất 2 ký tự')
      .max(256, 'Tên không được quá 256 ký tự'),
    email: z.string().min(1, 'Email là bắt buộc').email('Email không hợp lệ'),
    password: z
      .string()
      .min(1, 'Mật khẩu là bắt buộc')
      .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
      .max(100, 'Mật khẩu không được quá 100 ký tự'),
    confirmPassword: z.string().min(1, 'Xác nhận mật khẩu là bắt buộc'),
  })
  .strict()
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Mật khẩu không khớp',
        path: ['confirmPassword'],
      });
    }
  });

export type RegisterFormBody = z.infer<typeof RegisterFormBodySchema>;

// ============================================
// API REQUEST SCHEMAS - Cho API calls
// ============================================

// Schema cho API request (chỉ có name, email, password)
export const RegisterBodySchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, 'Tên phải có ít nhất 2 ký tự')
      .max(256, 'Tên không được quá 256 ký tự'),
    email: z.string().email('Email không hợp lệ'),
    password: z
      .string()
      .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
      .max(100, 'Mật khẩu không được quá 100 ký tự'),
  })
  .strict();

export type RegisterBody = z.infer<typeof RegisterBodySchema>;

export const LoginBodySchema = z
  .object({
    email: z.string().min(1, 'Email là bắt buộc').email('Email không hợp lệ'),
    password: z
      .string()
      .min(1, 'Mật khẩu là bắt buộc')
      .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
      .max(100, 'Mật khẩu không được quá 100 ký tự'),
  })
  .strict();

export type LoginBody = z.infer<typeof LoginBodySchema>;

// ============================================
// API RESPONSE SCHEMAS - Sử dụng common schemas
// ============================================

// Sử dụng AuthResponseSchema từ common.schema
export const RegisterResponseSchema = AuthResponseSchema;
export const LoginResponseSchema = AuthResponseSchema;

export type RegisterResponse = AuthResponse;
export type LoginResponse = AuthResponse;

// ============================================
// LEGACY SCHEMAS - Để backward compatibility
// ============================================

// Alias cho backward compatibility
export const RegisterFormBody = RegisterFormBodySchema;
export const RegisterBody = RegisterBodySchema;
export const LoginBody = LoginBodySchema;
export const RegisterRes = RegisterResponseSchema;
export const LoginRes = LoginResponseSchema;

export type RegisterFormBodyType = RegisterFormBody;
export type RegisterBodyType = RegisterBody;
export type LoginBodyType = LoginBody;
export type RegisterResType = RegisterResponse;
export type LoginResType = LoginResponse;

// ============================================
// SESSION SCHEMAS - Cho slide session
// ============================================

export const SlideSessionBodySchema = z.object({}).strict();
export const SlideSessionResponseSchema = AuthResponseSchema;

export type SlideSessionBody = z.infer<typeof SlideSessionBodySchema>;
export type SlideSessionResponse = AuthResponse;

// Legacy aliases
export const SlideSessionBody = SlideSessionBodySchema;
export const SlideSessionRes = SlideSessionResponseSchema;
export type SlideSessionBodyType = SlideSessionBody;
export type SlideSessionResType = SlideSessionResponse;

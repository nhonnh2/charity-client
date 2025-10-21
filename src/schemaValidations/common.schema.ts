import { z } from 'zod';

// Base response schema - chuẩn format từ backend
export const BaseResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    data: dataSchema,
    statusCode: z.number(),
    message: z.string(),
    timestamp: z.string().transform(str => new Date(str)),
  });

export type BaseResponse<T extends z.ZodTypeAny> = z.infer<
  ReturnType<typeof BaseResponseSchema<T>>
>;
/**
 * Pagination schema - có thể tái sử dụng cho tất cả các API có phân trang
 */
export const PaginationSchema = z.object({
  current: z.number().int().positive(),
  pageSize: z.number().int().positive(),
  total: z.number().int().nonnegative(),
  totalPages: z.number().int().nonnegative(),
  hasNext: z.boolean(),
  hasPrev: z.boolean(),
});

// Generic List Response Schema - tái sử dụng cho tất cả list responses
export const ListResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    items: z.array(itemSchema),
    pagination: PaginationSchema,
  });

export type Pagination = z.infer<typeof PaginationSchema>;

// ============================================
// COMMON USER SCHEMAS - Dùng chung cho auth và profile
// ============================================

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: z.string(),
  avatar: z.string().optional(),
  reputation: z.number().optional(),
  createdAt: z
    .string()
    .transform(str => new Date(str))
    .optional(),
  updatedAt: z
    .string()
    .transform(str => new Date(str))
    .optional(),
});

export type User = z.infer<typeof UserSchema>;

// ============================================
// COMMON AUTH RESPONSE SCHEMAS
// ============================================

export const AuthTokensSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  csrfToken: z.string(),
});

export const AuthResponseSchema = z.object({
  ...AuthTokensSchema.shape,
  user: UserSchema,
});

export type AuthTokens = z.infer<typeof AuthTokensSchema>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;

// ============================================
// COMMON FILE SCHEMAS - Dùng chung cho media và campaign
// ============================================

export const FileSchema = z.any().refine(
  file => {
    if (typeof window !== 'undefined' && file instanceof File) {
      return true;
    }
    return (
      file &&
      typeof file === 'object' &&
      'name' in file &&
      'size' in file &&
      'type' in file
    );
  },
  { message: 'File là bắt buộc' }
);

export const ImageFileSchema = FileSchema.refine(
  file => file && file.size <= 5 * 1024 * 1024,
  'Kích thước file không được vượt quá 5MB'
).refine(
  file =>
    file &&
    [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/svg+xml',
    ].includes(file.type),
  'Chỉ chấp nhận file ảnh (JPEG, PNG, GIF, SVG)'
);

export const DocumentFileSchema = FileSchema.refine(
  file => file && file.size <= 10 * 1024 * 1024,
  'Kích thước file không được vượt quá 10MB'
).refine(
  file =>
    file &&
    [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/svg+xml',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/plain',
    ].includes(file.type),
  'Chỉ chấp nhận file ảnh, PDF, Word, Excel hoặc text'
);

// ============================================
// COMMON MEDIA SCHEMAS - Dùng chung cho media và campaign
// ============================================

export const MediaTypeSchema = z.enum(['image', 'video', 'document', 'audio']);
export const CloudProviderSchema = z.enum([
  'google_cloud',
  'azure_blob',
  'local',
]);
export const MediaStatusSchema = z.enum([
  'uploading',
  'processing',
  'ready',
  'failed',
  'deleted',
]);

export const MediaObjectSchema = z.object({
  id: z.string(),
  url: z.string(),
  name: z.string().optional(),
  alt: z.string().optional(),
});

export type MediaType = z.infer<typeof MediaTypeSchema>;
export type CloudProvider = z.infer<typeof CloudProviderSchema>;
export type MediaStatus = z.infer<typeof MediaStatusSchema>;
export type MediaObject = z.infer<typeof MediaObjectSchema>;

// ============================================
// COMMON QUERY SCHEMAS - Dùng chung cho tất cả list APIs
// ============================================

export const BaseQuerySchema = z.object({
  page: z.number().min(1).optional().default(1),
  limit: z.number().min(1).max(100).optional().default(20),
  search: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});

export const BaseListResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    data: z.array(itemSchema),
    meta: z.object({
      page: z.number(),
      limit: z.number(),
      total: z.number(),
      totalPages: z.number(),
    }),
    message: z.string().optional(),
  });

export type BaseQuery = z.infer<typeof BaseQuerySchema>;

// ============================================
// COMMON SUCCESS/ERROR RESPONSE SCHEMAS
// ============================================

export const SuccessResponseSchema = z.object({
  message: z.string(),
  success: z.boolean().optional().default(true),
});

export const ErrorResponseSchema = z.object({
  message: z.string(),
  success: z.boolean().optional().default(false),
  error: z.string().optional(),
});

export type SuccessResponse = z.infer<typeof SuccessResponseSchema>;
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;

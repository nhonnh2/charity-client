import { z } from 'zod';
import {
  MediaTypeSchema,
  CloudProviderSchema,
  MediaStatusSchema,
  BaseQuerySchema,
} from './common.schema';

// ============================================
// MEDIA SPECIFIC ENUMS
// ============================================

export const SortFieldSchema = z.enum([
  'createdAt',
  'updatedAt',
  'size',
  'downloadCount',
  'viewCount',
]);

export type SortField = z.infer<typeof SortFieldSchema>;

// ============================================
// UPLOAD MEDIA SCHEMA
// ============================================

export const UploadMediaBodySchema = z.object({
  file: z.any().refine(
    val => {
      // Check if running in browser environment and val is File instance
      if (typeof window !== 'undefined' && val instanceof File) {
        return true;
      }
      // For server-side, accept any object that looks like a file
      return val && typeof val === 'object' && 'name' in val && 'size' in val;
    },
    { message: 'File là bắt buộc' }
  ),
  type: MediaTypeSchema,
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
  isPublic: z.boolean().optional().default(false),
});

export type UploadMediaBody = z.infer<typeof UploadMediaBodySchema>;

// ============================================
// QUERY SCHEMAS
// ============================================

export const GetMediaListQuerySchema = BaseQuerySchema.extend({
  type: MediaTypeSchema.optional(),
  provider: CloudProviderSchema.optional(),
  status: MediaStatusSchema.optional(),
  tags: z.array(z.string()).optional(),
  isPublic: z.boolean().optional(),
  sortBy: SortFieldSchema.optional().default('createdAt'),
});

export type GetMediaListQuery = z.infer<typeof GetMediaListQuerySchema>;

// ============================================
// UPDATE MEDIA SCHEMA
// ============================================

export const UpdateMediaBodySchema = z.object({
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
  isPublic: z.boolean().optional(),
});

export type UpdateMediaBody = z.infer<typeof UpdateMediaBodySchema>;

// ============================================
// MEDIA RESPONSE SCHEMAS
// ============================================

export const MediaResponseSchema = z.object({
  id: z.string(),
  filename: z.string(),
  originalName: z.string(),
  mimetype: z.string(),
  size: z.number(),
  type: MediaTypeSchema,
  url: z.string(),
  thumbnailUrl: z.string().optional(),
  provider: CloudProviderSchema,
  status: MediaStatusSchema,
  isPublic: z.boolean(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
  metadata: z.record(z.any()).optional(),
  downloadCount: z.number().optional(),
  viewCount: z.number().optional(),
  createdAt: z.string().transform(str => new Date(str)),
  updatedAt: z.string().transform(str => new Date(str)),
});

export type MediaResponse = z.infer<typeof MediaResponseSchema>;

// ============================================
// LIST RESPONSE SCHEMAS - Sử dụng common schemas
// ============================================

// Media list response schema - chỉ validate array của media
export const MediaListResponseSchema = z.array(MediaResponseSchema);

export type MediaListResponse = z.infer<typeof MediaListResponseSchema>;

// ============================================
// DOWNLOAD RESPONSE SCHEMA
// ============================================

export const DownloadUrlResponseSchema = z.object({
  data: z.object({
    url: z.string(),
    expiresAt: z.string().transform(str => new Date(str)),
  }),
  message: z.string().optional(),
});

export type DownloadUrlResponse = z.infer<typeof DownloadUrlResponseSchema>;

// ============================================
// DELETE RESPONSE SCHEMA - Sử dụng common schema
// ============================================

// Delete response schema - chỉ validate success message
export const DeleteMediaResponseSchema = z.object({
  message: z.string(),
});

export type DeleteMediaResponse = z.infer<typeof DeleteMediaResponseSchema>;

// ============================================
// LEGACY ALIASES - Để backward compatibility
// ============================================

export const UploadMediaBody = UploadMediaBodySchema;
export const GetMediaListQuery = GetMediaListQuerySchema;
export const UpdateMediaBody = UpdateMediaBodySchema;
export const MediaResponse = MediaResponseSchema;
export const MediaListResponse = MediaListResponseSchema;
export const DownloadUrlResponse = DownloadUrlResponseSchema;
export const DeleteMediaResponse = DeleteMediaResponseSchema;

export type UploadMediaBodyType = UploadMediaBody;
export type GetMediaListQueryType = GetMediaListQuery;
export type UpdateMediaBodyType = UpdateMediaBody;
export type MediaResponseType = MediaResponse;
export type MediaListResponseType = MediaListResponse;
export type DownloadUrlResponseType = DownloadUrlResponse;
export type DeleteMediaResponseType = DeleteMediaResponse;

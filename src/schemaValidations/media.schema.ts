import { z } from 'zod';

// Enums
export const MediaType = z.enum(['image', 'video', 'document', 'audio']);
export const CloudProvider = z.enum(['google_cloud', 'azure_blob', 'local']);
export const MediaStatus = z.enum([
  'uploading',
  'processing',
  'ready',
  'failed',
  'deleted',
]);
export const SortField = z.enum([
  'createdAt',
  'updatedAt',
  'size',
  'downloadCount',
  'viewCount',
]);
export const SortOrder = z.enum(['asc', 'desc']);

export type MediaTypeType = z.infer<typeof MediaType>;
export type CloudProviderType = z.infer<typeof CloudProvider>;
export type MediaStatusType = z.infer<typeof MediaStatus>;
export type SortFieldType = z.infer<typeof SortField>;
export type SortOrderType = z.infer<typeof SortOrder>;

// Upload Media Schema
export const UploadMediaBody = z.object({
  file: z.instanceof(File, { message: 'File là bắt buộc' }),
  type: MediaType,
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
  isPublic: z.boolean().optional().default(false),
});

export type UploadMediaBodyType = z.infer<typeof UploadMediaBody>;

// Get Media List Query Schema
export const GetMediaListQuery = z.object({
  page: z.number().min(1).optional().default(1),
  limit: z.number().min(1).max(100).optional().default(20),
  type: MediaType.optional(),
  provider: CloudProvider.optional(),
  status: MediaStatus.optional(),
  search: z.string().optional(),
  tags: z.array(z.string()).optional(),
  isPublic: z.boolean().optional(),
  sortBy: SortField.optional().default('createdAt'),
  sortOrder: SortOrder.optional().default('desc'),
});

export type GetMediaListQueryType = z.infer<typeof GetMediaListQuery>;

// Update Media Schema
export const UpdateMediaBody = z.object({
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
  isPublic: z.boolean().optional(),
});

export type UpdateMediaBodyType = z.infer<typeof UpdateMediaBody>;

// Media Response Schema
export const MediaResponse = z.object({
  id: z.string(),
  filename: z.string(),
  originalName: z.string(),
  mimeType: z.string(),
  size: z.number(),
  type: MediaType,
  url: z.string(),
  thumbnailUrl: z.string().optional(),
  provider: CloudProvider,
  status: MediaStatus,
  isPublic: z.boolean(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
  metadata: z.record(z.any()).optional(),
  downloadCount: z.number().optional(),
  viewCount: z.number().optional(),
  userId: z.string(),
  createdAt: z.string().transform(str => new Date(str)),
  updatedAt: z.string().transform(str => new Date(str)),
});

export type MediaResponseType = z.infer<typeof MediaResponse>;

// Media List Response Schema
export const MediaListResponse = z.object({
  data: z.array(MediaResponse),
  meta: z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    totalPages: z.number(),
  }),
  message: z.string().optional(),
});

export type MediaListResponseType = z.infer<typeof MediaListResponse>;

// Single Media Response Schema
export const SingleMediaResponse = z.object({
  data: MediaResponse,
  message: z.string().optional(),
});

export type SingleMediaResponseType = z.infer<typeof SingleMediaResponse>;

// Download URL Response Schema
export const DownloadUrlResponse = z.object({
  data: z.object({
    url: z.string(),
    expiresAt: z.string().transform(str => new Date(str)),
  }),
  message: z.string().optional(),
});

export type DownloadUrlResponseType = z.infer<typeof DownloadUrlResponse>;

// Delete Response Schema
export const DeleteMediaResponse = z.object({
  message: z.string(),
  success: z.boolean().optional(),
});

export type DeleteMediaResponseType = z.infer<typeof DeleteMediaResponse>;

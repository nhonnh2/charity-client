import http from '@/lib/api/http';
import {
  MediaListResponseSchema,
  DownloadUrlResponseSchema,
  DeleteMediaResponseSchema,
  MediaResponseSchema,
  type UploadMediaBody,
  type UpdateMediaBody,
  type MediaListResponse,
  type DownloadUrlResponse,
  type DeleteMediaResponse,
  type MediaResponse,
} from '@/schemaValidations/media.schema';

// ============================================
// QUERY TYPES
// ============================================
export type GetMediaQuery = {
  page?: number;
  limit?: number;
  type?: 'image' | 'video' | 'document' | 'audio';
  provider?: 'google_cloud' | 'azure_blob' | 'local';
  status?: 'uploading' | 'processing' | 'ready' | 'failed' | 'deleted';
  search?: string;
  tags?: string[];
  isPublic?: boolean;
  sortBy?: 'createdAt' | 'updatedAt' | 'size' | 'downloadCount' | 'viewCount';
  sortOrder?: 'asc' | 'desc';
};

// ============================================
// API METHODS - Sử dụng interceptor tự động
// ============================================

// Upload media file
export const uploadMedia = async (
  data: UploadMediaBody
): Promise<MediaResponse> => {
  const formData = new FormData();
  formData.append('file', data.file);
  formData.append('type', data.type);
  if (data.description) {
    formData.append('description', data.description);
  }
  if (data.tags && data.tags.length > 0) {
    formData.append('tags', JSON.stringify(data.tags));
  }
  if (data.isPublic !== undefined) {
    formData.append('isPublic', String(data.isPublic));
  }

  return http.post<MediaResponse>('media/upload', formData, {
    dataSchema: MediaResponseSchema,
  });
};

// Get media list
export const getMediaList = async (
  query: GetMediaQuery = {}
): Promise<MediaListResponse> => {
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined) {
      if (Array.isArray(value)) {
        value.forEach(item => params.append(key, item.toString()));
      } else {
        params.append(key, value.toString());
      }
    }
  });

  const queryString = params.toString();
  const url = queryString ? `media?${queryString}` : 'media';

  return http.get<MediaListResponse>(url, {
    dataSchema: MediaListResponseSchema,
  });
};

// Get single media
export const getMedia = async (
  id: string,
  options?: Omit<Parameters<typeof http.get>[1], 'body'>
): Promise<MediaResponse> => {
  return http.get<MediaResponse>(`media/${id}`, {
    ...options,
    dataSchema: MediaResponseSchema,
  });
};

// Update media
export const updateMedia = async (
  id: string,
  data: UpdateMediaBody
): Promise<MediaResponse> => {
  return http.put<MediaResponse>(`media/${id}`, data, {
    dataSchema: MediaResponseSchema,
  });
};

// Delete media
export const deleteMedia = async (id: string): Promise<DeleteMediaResponse> => {
  return http.delete<DeleteMediaResponse>(`media/${id}`, {
    dataSchema: DeleteMediaResponseSchema,
  });
};

// Get download URL
export const getMediaDownloadUrl = async (
  id: string,
  expires: number = 3600
): Promise<DownloadUrlResponse> => {
  return http.get<DownloadUrlResponse>(
    `media/${id}/download?expires=${expires}`,
    {
      dataSchema: DownloadUrlResponseSchema,
    }
  );
};

// View media file
export const viewMedia = async (id: string): Promise<void> => {
  return http.get<void>(`media/${id}/view`);
};

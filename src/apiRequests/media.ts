import http from '@/lib/api/http';
import {
  UploadMediaBodyType,
  GetMediaListQueryType,
  UpdateMediaBodyType,
  MediaListResponseType,
  SingleMediaResponseType,
  DownloadUrlResponseType,
  DeleteMediaResponseType,
} from '@/schemaValidations/media.schema';

const mediaApiRequest = {
  /**
   * Upload a media file
   * POST /api/media/upload
   */
  upload: (body: UploadMediaBodyType) => {
    const formData = new FormData();
    formData.append('file', body.file);
    formData.append('type', body.type);
    if (body.description) {
      formData.append('description', body.description);
    }
    if (body.tags && body.tags.length > 0) {
      formData.append('tags', JSON.stringify(body.tags));
    }
    if (body.isPublic !== undefined) {
      formData.append('isPublic', String(body.isPublic));
    }

    return http.post<SingleMediaResponseType>('/media/upload', formData);
  },

  /**
   * Get media list with filters and pagination
   * GET /api/media
   */
  getList: (query?: GetMediaListQueryType) => {
    const params = new URLSearchParams();

    if (query) {
      if (query.page) params.append('page', String(query.page));
      if (query.limit) params.append('limit', String(query.limit));
      if (query.type) params.append('type', query.type);
      if (query.provider) params.append('provider', query.provider);
      if (query.status) params.append('status', query.status);
      if (query.search) params.append('search', query.search);
      if (query.tags && query.tags.length > 0) {
        query.tags.forEach(tag => params.append('tags', tag));
      }
      if (query.isPublic !== undefined) {
        params.append('isPublic', String(query.isPublic));
      }
      if (query.sortBy) params.append('sortBy', query.sortBy);
      if (query.sortOrder) params.append('sortOrder', query.sortOrder);
    }

    const queryString = params.toString();
    const url = queryString ? `/media?${queryString}` : '/media';

    return http.get<MediaListResponseType>(url);
  },

  /**
   * Get media by ID
   * GET /api/media/:id
   */
  getById: (id: string) => {
    return http.get<SingleMediaResponseType>(`/media/${id}`);
  },

  /**
   * Update media metadata
   * PUT /api/media/:id
   */
  update: (id: string, body: UpdateMediaBodyType) => {
    return http.put<SingleMediaResponseType>(`/media/${id}`, body);
  },

  /**
   * Delete media file
   * DELETE /api/media/:id
   */
  delete: (id: string) => {
    return http.delete<DeleteMediaResponseType>(`/media/${id}`);
  },

  /**
   * Get download URL for media
   * GET /api/media/:id/download
   */
  getDownloadUrl: (id: string, expires: number = 3600) => {
    return http.get<DownloadUrlResponseType>(
      `/media/${id}/download?expires=${expires}`
    );
  },

  /**
   * View media file (redirects to file URL)
   * GET /api/media/:id/view
   */
  view: (id: string) => {
    return http.get<void>(`/media/${id}/view`);
  },
};

export default mediaApiRequest;

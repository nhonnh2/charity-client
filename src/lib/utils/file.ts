/**
 * File utilities for detecting and handling file types
 */

export type MediaType = 'image' | 'video' | 'document' | 'audio';

/**
 * Detect media type from file MIME type
 */
export const detectMediaType = (file: File): MediaType => {
  const mimeType = file.type.toLowerCase();

  // Images
  if (
    mimeType.startsWith('image/') ||
    [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/svg+xml',
      'image/webp',
    ].includes(mimeType)
  ) {
    return 'image';
  }

  // Videos
  if (
    mimeType.startsWith('video/') ||
    ['video/mp4', 'video/mpeg', 'video/quicktime', 'video/x-msvideo'].includes(
      mimeType
    )
  ) {
    return 'video';
  }

  // Audio
  if (
    mimeType.startsWith('audio/') ||
    ['audio/mpeg', 'audio/wav', 'audio/ogg'].includes(mimeType)
  ) {
    return 'audio';
  }

  // Documents (PDF, Word, Excel, etc.)
  if (
    mimeType.startsWith('application/') ||
    [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/plain',
    ].includes(mimeType)
  ) {
    return 'document';
  }

  // Default to document for unknown types
  return 'document';
};

/**
 * Check if file is an image
 */
export const isImageFile = (file: File): boolean => {
  return detectMediaType(file) === 'image';
};

/**
 * Check if file is a document
 */
export const isDocumentFile = (file: File): boolean => {
  return detectMediaType(file) === 'document';
};

/**
 * Get file extension from filename
 */
export const getFileExtension = (filename: string): string => {
  return filename.split('.').pop()?.toLowerCase() || '';
};

/**
 * Format file size to human readable format
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};


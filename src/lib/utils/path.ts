/**
 * Path utilities for URL/path manipulation
 */

/**
 * Normalize path by removing leading slash
 * @example normalizePath('/api/users') => 'api/users'
 */
export const normalizePath = (path: string): string => {
  return path.startsWith('/') ? path.slice(1) : path;
};

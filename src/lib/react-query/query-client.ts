/**
 * React Query Configuration
 *
 * Centralized configuration for React Query với các best practices:
 * - Retry logic hợp lý
 * - Cache time và stale time tối ưu
 * - Error handling mặc định
 */

import { QueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getApiErrorMessage } from '@/lib/api/errors';

/**
 * Tạo QueryClient instance với cấu hình tối ưu
 */
export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Caching & Refetching
        staleTime: 60 * 1000, // 1 phút - data được coi là fresh trong 1 phút
        gcTime: 5 * 60 * 1000, // 5 phút - garbage collection time (trước đây là cacheTime)

        // Refetch behavior
        refetchOnWindowFocus: false, // Không tự động refetch khi focus window
        refetchOnReconnect: true, // Refetch khi reconnect internet
        refetchOnMount: true, // Refetch khi component mount

        // Retry logic
        retry: (failureCount, error: any) => {
          // Không retry với lỗi 4xx (client errors)
          if (error?.status >= 400 && error?.status < 500) {
            return false;
          }
          // Retry tối đa 2 lần cho lỗi 5xx hoặc network errors
          return failureCount < 2;
        },
        retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      },
      mutations: {
        // Mutation retry - thường không nên retry mutations tự động
        retry: false,

        // Global error handler cho mutations (optional, có thể handle ở từng mutation)
        onError: (error: any) => {
          // Toast error đã được xử lý trong http client
          // Chỉ log ở đây để debug
          if (process.env.NODE_ENV === 'development') {
            console.error('Mutation error:', error);
          }
        },
      },
    },
  });
}

/**
 * Singleton QueryClient instance cho app
 * Tạo một lần và reuse trong toàn bộ app
 */
let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: luôn tạo mới QueryClient cho mỗi request
    return createQueryClient();
  } else {
    // Browser: reuse QueryClient instance
    if (!browserQueryClient) {
      browserQueryClient = createQueryClient();
    }
    return browserQueryClient;
  }
}


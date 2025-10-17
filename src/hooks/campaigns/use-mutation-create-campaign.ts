/**
 * useMutationCreateCampaign Hook
 *
 * React Query mutation hook để tạo campaign mới
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/react-query/query-keys';
import campaignsApiRequest, {
  CreateCampaignDto,
} from '@/apiRequests/campaigns';
import { toast } from 'sonner';

type UseMutationCreateCampaignOptions = {
  /**
   * Callback khi create thành công
   */
  onSuccess?: (data: any) => void;

  /**
   * Callback khi create thất bại
   */
  onError?: (error: any) => void;

  /**
   * Có tự động invalidate campaigns list sau khi create không
   * @default true
   */
  invalidateOnSuccess?: boolean;
};

/**
 * Hook để tạo campaign mới
 *
 * @example
 * ```tsx
 * const createCampaign = useMutationCreateCampaign({
 *   onSuccess: (data) => {
 *     router.push(`/campaigns/${data.data._id}`);
 *   }
 * });
 *
 * // Sử dụng
 * createCampaign.mutate(campaignData);
 * ```
 */
export function useMutationCreateCampaign(
  options?: UseMutationCreateCampaignOptions
) {
  const queryClient = useQueryClient();
  const { onSuccess, onError, invalidateOnSuccess = true } = options || {};

  return useMutation({
    // Mutation function
    mutationFn: (data: CreateCampaignDto) => campaignsApiRequest.create(data),

    // On success callback
    onSuccess: data => {
      // Invalidate campaigns list để refetch data mới
      if (invalidateOnSuccess) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.campaigns.lists(),
        });
      }

      // Call custom success callback
      onSuccess?.(data);
    },

    // On error callback
    onError: error => {
      // Error đã được xử lý trong http client (toast)
      // Chỉ gọi custom error callback nếu có
      onError?.(error);
    },
  });
}


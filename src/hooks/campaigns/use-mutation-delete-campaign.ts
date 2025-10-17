/**
 * useMutationDeleteCampaign Hook
 *
 * React Query mutation hook để xóa campaign
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/react-query/query-keys';
import campaignsApiRequest from '@/apiRequests/campaigns';
import { toast } from 'sonner';

type UseMutationDeleteCampaignOptions = {
  /**
   * Callback khi delete thành công
   */
  onSuccess?: (data: any, id: string) => void;

  /**
   * Callback khi delete thất bại
   */
  onError?: (error: any, id: string) => void;

  /**
   * Có tự động invalidate cache sau khi delete không
   * @default true
   */
  invalidateOnSuccess?: boolean;
};

/**
 * Hook để xóa campaign
 *
 * @example
 * ```tsx
 * const deleteCampaign = useMutationDeleteCampaign({
 *   onSuccess: () => {
 *     toast.success('Xóa thành công!');
 *     router.push('/campaigns');
 *   }
 * });
 *
 * // Sử dụng
 * deleteCampaign.mutate('campaign-id');
 * ```
 */
export function useMutationDeleteCampaign(
  options?: UseMutationDeleteCampaignOptions
) {
  const queryClient = useQueryClient();
  const { onSuccess, onError, invalidateOnSuccess = true } = options || {};

  return useMutation({
    // Mutation function
    mutationFn: (id: string) => campaignsApiRequest.delete(id),

    // On success callback
    onSuccess: (data, id) => {
      if (invalidateOnSuccess) {
        // Remove campaign detail từ cache
        queryClient.removeQueries({
          queryKey: queryKeys.campaigns.detail(id),
        });

        // Invalidate campaigns list
        queryClient.invalidateQueries({
          queryKey: queryKeys.campaigns.lists(),
        });
      }

      // Call custom success callback
      onSuccess?.(data, id);
    },

    // On error callback
    onError: (error, id) => {
      // Error đã được xử lý trong http client
      onError?.(error, id);
    },
  });
}


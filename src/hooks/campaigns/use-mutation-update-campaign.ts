/**
 * useMutationUpdateCampaign Hook
 *
 * React Query mutation hook để update campaign
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/react-query/query-keys';
import campaignsApiRequest, {
  CreateCampaignDto,
} from '@/apiRequests/campaigns';
import { toast } from 'sonner';

type UpdateCampaignParams = {
  id: string;
  data: Partial<CreateCampaignDto>;
};

type UseMutationUpdateCampaignOptions = {
  /**
   * Callback khi update thành công
   */
  onSuccess?: (data: any, variables: UpdateCampaignParams) => void;

  /**
   * Callback khi update thất bại
   */
  onError?: (error: any, variables: UpdateCampaignParams) => void;

  /**
   * Có tự động invalidate cache sau khi update không
   * @default true
   */
  invalidateOnSuccess?: boolean;
};

/**
 * Hook để update campaign
 *
 * @example
 * ```tsx
 * const updateCampaign = useMutationUpdateCampaign({
 *   onSuccess: () => {
 *     toast.success('Cập nhật thành công!');
 *   }
 * });
 *
 * // Sử dụng
 * updateCampaign.mutate({
 *   id: 'campaign-id',
 *   data: { title: 'New title' }
 * });
 * ```
 */
export function useMutationUpdateCampaign(
  options?: UseMutationUpdateCampaignOptions
) {
  const queryClient = useQueryClient();
  const { onSuccess, onError, invalidateOnSuccess = true } = options || {};

  return useMutation({
    // Mutation function
    mutationFn: ({ id, data }: UpdateCampaignParams) =>
      campaignsApiRequest.update(id, data),

    // On success callback
    onSuccess: (data, variables) => {
      if (invalidateOnSuccess) {
        // Invalidate campaign detail
        queryClient.invalidateQueries({
          queryKey: queryKeys.campaigns.detail(variables.id),
        });

        // Invalidate campaigns list
        queryClient.invalidateQueries({
          queryKey: queryKeys.campaigns.lists(),
        });
      }

      // Call custom success callback
      onSuccess?.(data, variables);
    },

    // On error callback
    onError: (error, variables) => {
      // Error đã được xử lý trong http client
      onError?.(error, variables);
    },
  });
}


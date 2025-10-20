/**
 * Campaign Mutations Hooks
 *
 * Tất cả các mutation hooks liên quan đến campaign (create, update, delete)
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/react-query/query-keys';
import {
  createCampaign,
  updateCampaign,
  deleteCampaign,
} from '@/apiRequests/campaigns';
import { CreateCampaign } from '@/schemaValidations/campaign.schema';

// ===== CREATE CAMPAIGN =====

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
 *     router.push(`/campaigns/${data.data.id}`);
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
    mutationFn: (data: CreateCampaign) => createCampaign(data),

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

// ===== UPDATE CAMPAIGN =====

type UpdateCampaignParams = {
  id: string;
  data: Partial<CreateCampaign>;
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
      updateCampaign(id, data),

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

// ===== DELETE CAMPAIGN =====

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
    mutationFn: (id: string) => deleteCampaign(id),

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

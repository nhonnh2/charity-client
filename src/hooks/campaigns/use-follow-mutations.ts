/**
 * Follow Mutations Hooks
 *
 * Tất cả các mutation hooks liên quan đến follow/unfollow campaign
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/react-query/query-keys';
import { followCampaign, unfollowCampaign } from '@/apiRequests/campaigns';
import { toast } from 'sonner';

/**
 * Hook để follow campaign
 *
 * @example
 * ```tsx
 * const followCampaign = useMutationFollowCampaign();
 *
 * // Sử dụng
 * followCampaign.mutate('campaign-id');
 * ```
 */
export function useMutationFollowCampaign() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (campaignId: string) => followCampaign(campaignId),
    onSuccess: (data, campaignId) => {
      // Update follow status cache
      queryClient.setQueryData(
        queryKeys.campaigns.detail(`${campaignId}:follow-status`),
        (prev: any) => ({ ...(prev || {}), isFollowing: true })
      );

      // Note: followersCount is now managed by local state in components
      // No need to update campaign detail cache here

      // Save follow-id (using campaignId as the follow-id)
      queryClient.setQueryData(
        queryKeys.campaigns.detail(`${campaignId}:follow-id`),
        campaignId
      );

      toast.success('Đã quan tâm chiến dịch');
    },
    onError: error => {
      // handled by http toast already; keep minimal
      // no-op
    },
  });
}

/**
 * Hook để unfollow campaign
 *
 * @example
 * ```tsx
 * const unfollowCampaign = useMutationUnfollowCampaign();
 *
 * // Sử dụng
 * unfollowCampaign.mutate('campaign-id');
 * ```
 */
export function useMutationUnfollowCampaign() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (campaignId: string) => unfollowCampaign(campaignId),
    onSuccess: (data, campaignId) => {
      // Update follow status cache
      queryClient.setQueryData(
        queryKeys.campaigns.detail(`${campaignId}:follow-status`),
        (prev: any) => ({ ...(prev || {}), isFollowing: false })
      );

      // Note: followersCount is now managed by local state in components
      // No need to update campaign detail cache here

      // Clear follow-id
      queryClient.setQueryData(
        queryKeys.campaigns.detail(`${campaignId}:follow-id`),
        null
      );

      toast.success('Đã bỏ quan tâm chiến dịch');
    },
    onError: error => {
      // handled globally
    },
  });
}

/**
 * Follow Queries Hooks
 *
 * Tất cả các query hooks liên quan đến follow status
 */

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/react-query/query-keys';
import { getFollowStatus } from '@/apiRequests/campaigns';

/**
 * Hook để fetch follow status của campaign
 *
 * @example
 * ```tsx
 * const { data: followStatus, isLoading } = useQueryFollowStatus({
 *   campaignId: 'campaign-id-123'
 * });
 *
 * // Access follow status
 * if (followStatus) {
 *   console.log(followStatus.isFollowing);
 * }
 * ```
 */
export function useQueryFollowStatus({ campaignId }: { campaignId: string }) {
  return useQuery({
    queryKey: queryKeys.campaigns.detail(`${campaignId}:follow-status`),
    queryFn: () => getFollowStatus(campaignId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

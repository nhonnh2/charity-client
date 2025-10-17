/**
 * useQueryCampaign Hook
 *
 * React Query hook để fetch chi tiết một campaign theo ID
 */

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/react-query/query-keys';
import campaignsApiRequest from '@/apiRequests/campaigns';

type UseQueryCampaignOptions = {
  /**
   * Campaign ID
   */
  id: string;

  /**
   * Enable/disable query
   * Mặc định chỉ fetch khi có ID
   */
  enabled?: boolean;

  /**
   * Custom stale time (override default)
   */
  staleTime?: number;

  /**
   * Custom options để pass vào API request
   */
  requestOptions?: Omit<
    Parameters<typeof campaignsApiRequest.getById>[1],
    'body'
  >;
};

/**
 * Hook để fetch chi tiết một campaign
 *
 * @example
 * ```tsx
 * const { data, isLoading, error } = useQueryCampaign({
 *   id: 'campaign-id-123'
 * });
 *
 * // Access campaign data
 * if (data) {
 *   console.log(data.data.title);
 * }
 * ```
 */
export function useQueryCampaign(options: UseQueryCampaignOptions) {
  const { id, enabled, staleTime, requestOptions } = options;

  return useQuery({
    // Query key với ID cụ thể
    queryKey: queryKeys.campaigns.detail(id),

    // Query function
    queryFn: () => campaignsApiRequest.getById(id, requestOptions),

    // Chỉ fetch khi có ID và enabled = true
    enabled: enabled !== false && !!id,

    staleTime,
  });
}


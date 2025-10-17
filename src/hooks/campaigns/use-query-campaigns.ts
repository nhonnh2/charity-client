/**
 * useQueryCampaigns Hook
 *
 * React Query hook để fetch danh sách campaigns với filters và pagination
 */

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/react-query/query-keys';
import campaignsApiRequest from '@/apiRequests/campaigns';
import { GetCampaignsQueryType } from '@/schemaValidations/campaign.schema';

type UseQueryCampaignsOptions = {
  /**
   * Filters và pagination params
   */
  filters?: GetCampaignsQueryType;

  /**
   * Enable/disable query
   * Hữu ích khi cần chờ điều kiện nào đó trước khi fetch
   */
  enabled?: boolean;

  /**
   * Custom stale time (override default)
   */
  staleTime?: number;
};

/**
 * Hook để fetch danh sách campaigns
 *
 * @example
 * ```tsx
 * const { data, isLoading, error } = useQueryCampaigns({
 *   filters: { page: 1, limit: 10, category: 'health' }
 * });
 * ```
 */
export function useQueryCampaigns(options?: UseQueryCampaignsOptions) {
  const { filters, enabled = true, staleTime } = options || {};

  return useQuery({
    // Query key bao gồm filters để cache riêng biệt cho mỗi bộ filters
    queryKey: queryKeys.campaigns.list(filters),

    // Query function
    queryFn: () => campaignsApiRequest.getList(filters),

    // Options
    enabled,
    staleTime,

    // Select function để transform data nếu cần
    // (Giữ nguyên structure từ API)
  });
}


/**
 * Campaign Queries Hooks
 *
 * Tất cả các query hooks liên quan đến campaign (list, detail)
 */

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/react-query/query-keys';
import { getCampaigns, getCampaign } from '@/apiRequests/campaigns';
import { GetCampaignsQueryType } from '@/schemaValidations/campaign.schema';

// ===== CAMPAIGNS LIST =====

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
    queryFn: () => getCampaigns(filters),

    // Options
    enabled,
    staleTime,

    // Select function để transform data nếu cần
    // (Giữ nguyên structure từ API)
  });
}

// ===== CAMPAIGN DETAIL =====

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
   * Note: getCampaign only accepts id parameter
   */
  requestOptions?: never;
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
  const { id, enabled, staleTime } = options;

  return useQuery({
    // Query key với ID cụ thể
    queryKey: queryKeys.campaigns.detail(id),

    // Query function
    queryFn: () => getCampaign(id),

    // Chỉ fetch khi có ID và enabled = true
    enabled: enabled !== false && !!id,

    staleTime,
  });
}

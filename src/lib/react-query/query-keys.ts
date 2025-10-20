/**
 * Query Keys Factory
 *
 * Centralized query keys management theo best practice của TanStack Query
 * Giúp dễ dàng quản lý cache invalidation và refetching
 *
 * Pattern: ['resource', 'action', ...params]
 */

import { GetCampaignsQueryType } from '@/schemaValidations/campaign.schema';

/**
 * Campaign Query Keys
 *
 * Cấu trúc:
 * - campaigns.all: ['campaigns'] - root key
 * - campaigns.lists(): ['campaigns', 'list'] - all lists
 * - campaigns.list(filters): ['campaigns', 'list', filters] - specific list with filters
 * - campaigns.details(): ['campaigns', 'detail'] - all details
 * - campaigns.detail(id): ['campaigns', 'detail', id] - specific detail
 */
export const campaignKeys = {
  // Root key - invalidate tất cả campaigns queries
  all: ['campaigns'] as const,

  // Lists
  lists: () => [...campaignKeys.all, 'list'] as const,
  list: (filters?: GetCampaignsQueryType) =>
    [...campaignKeys.lists(), filters] as const,

  // Details
  details: () => [...campaignKeys.all, 'detail'] as const,
  detail: (id: string) => [...campaignKeys.details(), id] as const,

  // Stats (nếu cần sau này)
  stats: () => [...campaignKeys.all, 'stats'] as const,
};

/**
 * Auth Query Keys (cho tương lai)
 */
export const authKeys = {
  all: ['auth'] as const,
  user: () => [...authKeys.all, 'user'] as const,
  profile: () => [...authKeys.all, 'profile'] as const,
};

/**
 * Media Query Keys (cho tương lai)
 */
export const mediaKeys = {
  all: ['media'] as const,
  uploads: () => [...mediaKeys.all, 'upload'] as const,
};

/**
 * Export all query keys
 */
export const queryKeys = {
  campaigns: campaignKeys,
  auth: authKeys,
  media: mediaKeys,
};

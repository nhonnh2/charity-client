import http from '@/lib/api/http';
import {
  CampaignSchema,
  CampaignListSchema,
  CampaignDetailSchema,
  FollowStatusSchema,
  type Campaign,
  type CampaignList,
  type CampaignDetail,
  type FollowStatus,
  type CreateCampaign,
  type UpdateCampaign,
} from '@/schemaValidations/campaign.schema';

// ============================================
// QUERY TYPES
// ============================================
export type GetCampaignsQuery = {
  page?: number;
  limit?: number;
  category?: string;
  status?: string;
  search?: string;
  sortBy?: 'createdAt' | 'targetAmount' | 'currentAmount' | 'deadline';
  sortOrder?: 'asc' | 'desc';
};

export type GetCampaignFollowersQuery = {
  page?: number;
  limit?: number;
};

// ============================================
// API METHODS - Sử dụng interceptor tự động
// ============================================

// Get campaigns list
export const getCampaigns = async (
  query: GetCampaignsQuery = {}
): Promise<CampaignList> => {
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined) {
      params.append(key, value.toString());
    }
  });

  const queryString = params.toString();
  const url = queryString ? `campaigns?${queryString}` : 'campaigns';

  return http.get<CampaignList>(url, { dataSchema: CampaignListSchema });
};

// Get single campaign
export const getCampaign = async (
  id: string,
  options?: Omit<Parameters<typeof http.get>[1], 'body'>
): Promise<CampaignDetail> => {
  return http.get<CampaignDetail>(`campaigns/${id}`, {
    ...options,
    dataSchema: CampaignDetailSchema,
  });
};

// Create campaign
export const createCampaign = async (
  data: CreateCampaign
): Promise<Campaign> => {
  return http.post<Campaign>('campaigns', data, { dataSchema: CampaignSchema });
};

// Update campaign
export const updateCampaign = async (
  id: string,
  data: UpdateCampaign
): Promise<Campaign> => {
  return http.put<Campaign>(`campaigns/${id}`, data, {
    dataSchema: CampaignSchema,
  });
};

// Delete campaign
export const deleteCampaign = async (id: string): Promise<void> => {
  return http.delete<void>(`campaigns/${id}`);
};

// Follow campaign
export const followCampaign = async (
  campaignId: string
): Promise<{ success: boolean; message: string }> => {
  return http.post<{ success: boolean; message: string }>(`campaign-follows`, {
    campaignId,
  });
};

// Unfollow campaign
export const unfollowCampaign = async (
  id: string
): Promise<{ success: boolean; message: string }> => {
  return http.delete<{ success: boolean; message: string }>(
    `campaign-follows/${id}`
  );
};

// Get follow status
export const getFollowStatus = async (
  campaignId: string
): Promise<FollowStatus> => {
  return http.get<FollowStatus>(`campaign-follows/${campaignId}/status`, {
    dataSchema: FollowStatusSchema,
  });
};

// Approve campaign (admin only)
export const approveCampaign = async (id: string): Promise<Campaign> => {
  return http.post<Campaign>(
    `campaigns/${id}/approve`,
    {},
    { dataSchema: CampaignSchema }
  );
};

// Reject campaign (admin only)
export const rejectCampaign = async (
  id: string,
  reason: string
): Promise<Campaign> => {
  return http.post<Campaign>(
    `campaigns/${id}/reject`,
    { reason },
    { dataSchema: CampaignSchema }
  );
};

// Complete campaign
export const completeCampaign = async (id: string): Promise<Campaign> => {
  return http.post<Campaign>(
    `campaigns/${id}/complete`,
    {},
    { dataSchema: CampaignSchema }
  );
};

// Cancel campaign
export const cancelCampaign = async (
  id: string,
  reason: string
): Promise<Campaign> => {
  return http.post<Campaign>(
    `campaigns/${id}/cancel`,
    { reason },
    { dataSchema: CampaignSchema }
  );
};

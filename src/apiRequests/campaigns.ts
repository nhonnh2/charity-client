import http from '@/lib/api/http';
import {
  GetCampaignsQueryType,
  SingleCampaignResponse,
  SingleCampaignResponseType,
  CampaignListResponse,
  CampaignListResponseType,
} from '@/schemaValidations/campaign.schema';

// Media object type
export type MediaObject = {
  id: string;
  url: string;
  name: string;
};

// DTO for creating campaign (after file uploads)
export type CreateCampaignDto = {
  // Basic Info
  type: 'normal' | 'emergency'; // Note: API uses 'normal' not 'regular'
  fundingType: 'fixed' | 'flexible';
  title: string;
  category: string;
  description: string;
  targetAmount: number;
  startDate: string;
  endDate: string;

  // Media objects (after upload)
  coverImage: MediaObject;
  gallery?: MediaObject[];

  // Milestones
  milestones: {
    title: string;
    description: string;
    budget: number;
    durationDays: number;
    documents?: MediaObject[];
  }[];

  // Verification
  reviewFee: number;
  // identityFront: MediaObject;
  // identityBack: MediaObject;
  // walletAddress?: string;

  // Optional
  tags?: string[];
};

const campaignsApiRequest = {
  /**
   * Create a new campaign
   * POST /api/campaigns
   * Returns: Campaign data or null on error
   */
  create: async (
    body: CreateCampaignDto
  ): Promise<SingleCampaignResponseType> => {
    // Let the error bubble up to be handled by the caller
    // This allows proper error message extraction
    return await http.post<SingleCampaignResponseType>('/campaigns', body);
  },

  /**
   * Get campaigns list with filters and pagination
   * GET /api/campaigns
   */
  getList: async (query?: GetCampaignsQueryType) => {
    const params = new URLSearchParams();

    if (query) {
      // Pagination
      if (query.page) params.append('page', String(query.page));
      if (query.limit) params.append('limit', String(query.limit));

      // Search & Filters
      if (query.search) params.append('search', query.search);
      if (query.type) params.append('type', query.type);
      if (query.fundingType) params.append('fundingType', query.fundingType);
      if (query.status) params.append('status', query.status);
      if (query.category) params.append('category', query.category);
      if (query.creatorId) params.append('creatorId', query.creatorId);

      // Amount range
      if (query.minTargetAmount !== undefined) {
        params.append('minTargetAmount', String(query.minTargetAmount));
      }
      if (query.maxTargetAmount !== undefined) {
        params.append('maxTargetAmount', String(query.maxTargetAmount));
      }

      // Date range
      if (query.startDateFrom)
        params.append('startDateFrom', query.startDateFrom);
      if (query.startDateTo) params.append('startDateTo', query.startDateTo);

      // Flags
      if (query.isFeatured !== undefined) {
        params.append('isFeatured', String(query.isFeatured));
      }

      // Sorting
      if (query.sortBy) params.append('sortBy', query.sortBy);
      if (query.sortOrder) params.append('sortOrder', query.sortOrder);

      // Tags
      if (query.tag) params.append('tag', query.tag);
    }

    const queryString = params.toString();
    const url = queryString ? `/campaigns?${queryString}` : '/campaigns';

    const response = await http.get(url);
    // Parse and transform response through schema
    return CampaignListResponse.parse(response);
  },

  /**
   * Get campaign by ID
   * GET /api/campaigns/:id
   */
  getById: async (id: string) => {
    const response = await http.get(`/campaigns/${id}`);
    console.log('campaignsApiRequest.getById_____response', response);
    // Parse and transform response through schema
    return SingleCampaignResponse.parse(response);
  },

  /**
   * Update campaign
   * PUT /api/campaigns/:id
   */
  update: (id: string, body: Partial<CreateCampaignDto>) => {
    return http.put<SingleCampaignResponseType>(`/campaigns/${id}`, body);
  },

  /**
   * Delete campaign
   * DELETE /api/campaigns/:id
   */
  delete: (id: string) => {
    return http.delete<{ message: string }>(`/campaigns/${id}`);
  },
};

export default campaignsApiRequest;

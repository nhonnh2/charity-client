import { cache } from 'react';
import campaignsApiRequest from '@/apiRequests/campaigns';
import { CampaignResponseType } from '@/schemaValidations/campaign.schema';

// Cached data fetching - tránh duplicate API calls
export const getCampaignData = cache(
  async (id: string): Promise<CampaignResponseType | null> => {
    try {
      const response = await campaignsApiRequest.getById(id, {
        next: { revalidate: 300 }, // Cache 5 minutes
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching campaign:', error);
      return null;
    }
  }
);

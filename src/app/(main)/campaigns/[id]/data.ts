import { cache } from 'react';
import { getCampaign } from '@/apiRequests/campaigns';
import { CampaignDetailSchema } from '@/schemaValidations/campaign.schema';
import { z } from 'zod';

// Cached data fetching - tránh duplicate API calls
export const getCampaignData = cache(
  async (id: string): Promise<z.infer<typeof CampaignDetailSchema> | null> => {
    try {
      const response = await getCampaign(id, { next: { revalidate: 500 } });
      return response;
    } catch (error) {
      // Allow Next.js App Router redirects/notFound to propagate
      const digest = (error as any)?.digest as string | undefined;

      console.error('Error fetching campaign:', error);
      return null;
    }
  }
);

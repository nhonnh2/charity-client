import { z } from 'zod';
import { ListResponseSchema } from './common.schema';

// Donation schema
export const DonationSchema = z.object({
  id: z.string(),
  amount: z.number().positive(),
  message: z.string().optional(),
  isAnonymous: z.boolean().default(false),
  donorName: z.string().optional(),
  donorEmail: z.string().email().optional(),
  campaignId: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// Donation list response schema - sử dụng ListResponseSchema chung
export const DonationListSchema = ListResponseSchema(DonationSchema);

// Types
export type Donation = z.infer<typeof DonationSchema>;
export type DonationList = z.infer<typeof DonationListSchema>;

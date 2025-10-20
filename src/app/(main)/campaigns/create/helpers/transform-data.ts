import {
  type CreateCampaign,
  CreateCampaignFormType,
} from '@/schemaValidations/campaign.schema';
import { type MediaObject } from '@/schemaValidations/common.schema';

/**
 * Transform form data to API DTO
 * Converts form data types to API-compatible format with media objects
 */
export const transformFormToApiData = (
  formData: CreateCampaignFormType,
  uploadedMedia: {
    coverImage: MediaObject;
    gallery: MediaObject[];
    identityFront: MediaObject;
    identityBack: MediaObject;
    milestones: Array<{
      title: string;
      description: string;
      budget: number;
      durationDays: number;
      documents: MediaObject[];
    }>;
  }
): CreateCampaign => {
  return {
    // Basic Info
    title: formData.title,
    description: formData.description,
    type: formData.type === 'regular' ? 'normal' : formData.type, // Convert 'regular' → 'normal'
    fundingType: formData.fundingType,
    targetAmount: formData.targetAmount,
    reviewFee: formData.reviewFee,
    category: formData.category,
    tags: formData.tags,
    startDate: formData.startDate,
    endDate: formData.endDate,
    fundraisingDays: formData.fundraisingDays || 90, // Default 90 days if not provided

    // Milestones
    milestones: uploadedMedia.milestones,

    // Media Objects
    coverImage: uploadedMedia.coverImage,
    gallery: uploadedMedia.gallery,
  };
};

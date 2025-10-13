import { CreateCampaignDto, MediaObject } from '@/apiRequests/campaigns';
import { CreateCampaignFormType } from '@/schemaValidations/campaign.schema';

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
): CreateCampaignDto => {
  return {
    // Basic Info
    type: formData.type === 'regular' ? 'normal' : formData.type, // Convert 'regular' → 'normal'
    fundingType: formData.fundingType,
    title: formData.title,
    category: formData.category,
    description: formData.description,
    targetAmount: formData.targetAmount,
    fundraisingDays: formData.fundraisingDays,
    startDate: new Date(formData.startDate).toISOString(),
    endDate: new Date(formData.endDate).toISOString(),

    // Media Objects
    coverImage: uploadedMedia.coverImage,
    gallery:
      uploadedMedia.gallery.length > 0 ? uploadedMedia.gallery : undefined,

    // Milestones with document objects
    milestones: uploadedMedia.milestones,

    // Verification
    reviewFee: formData.reviewFee,
    // identityFront: uploadedMedia.identityFront,
    // identityBack: uploadedMedia.identityBack,
    // walletAddress: formData.walletAddress,
  };
};

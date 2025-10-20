import { uploadMedia } from '@/apiRequests/media';
import { type CreateCampaignFormType } from '@/schemaValidations/campaign.schema';
import { type MediaObject } from '@/schemaValidations/common.schema';
import { detectMediaType } from '@/lib/utils/file';

/**
 * Upload cover image
 * Returns: MediaObject or null on error
 */
export const uploadCoverImage = async (
  file: File,
  campaignTitle: string
): Promise<MediaObject | null> => {
  try {
    const response = await uploadMedia({
      file,
      type: detectMediaType(file),
      description: `Cover image for campaign: ${campaignTitle}`,
      tags: ['campaign', 'cover'],
      isPublic: true,
    });

    return {
      id: response.id,
      url: response.url,
      name: response.originalName || file.name,
    };
  } catch (error) {
    console.error('Error uploading cover image:', error);
    return null;
  }
};

/**
 * Upload multiple gallery images
 * Returns: Array of MediaObject or null on error
 */
export const uploadGalleryImages = async (
  images: File[],
  campaignTitle: string
): Promise<MediaObject[] | null> => {
  if (!images || images.length === 0) {
    return [];
  }

  try {
    const imageUploads = await Promise.all(
      images.map((image, index) =>
        uploadMedia({
          file: image,
          type: detectMediaType(image),
          description: `Gallery image ${index + 1} for campaign: ${campaignTitle}`,
          tags: ['campaign', 'gallery'],
          isPublic: true,
        })
      )
    );

    return imageUploads.map((u, index) => ({
      id: u.id,
      url: u.url,
      name: u.originalName || images[index].name,
    }));
  } catch (error) {
    console.error('Error uploading gallery images:', error);
    return null;
  }
};

/**
 * Upload identity images (front & back)
 * Returns: {front, back} or null on error
 */
export const uploadIdentityImages = async (
  frontFile: File,
  backFile: File
): Promise<{ front: MediaObject; back: MediaObject } | null> => {
  try {
    const [frontResponse, backResponse] = await Promise.all([
      uploadMedia({
        file: frontFile,
        type: detectMediaType(frontFile),
        description: 'Identity image (front)',
        tags: ['identity', 'verification'],
        isPublic: false,
      }),
      uploadMedia({
        file: backFile,
        type: detectMediaType(backFile),
        description: 'Identity image (back)',
        tags: ['identity', 'verification'],
        isPublic: false,
      }),
    ]);

    return {
      front: {
        id: frontResponse.id,
        url: frontResponse.url,
        name: frontResponse.originalName || frontFile.name,
      },
      back: {
        id: backResponse.id,
        url: backResponse.url,
        name: backResponse.originalName || backFile.name,
      },
    };
  } catch (error) {
    console.error('Error uploading identity images:', error);
    return null;
  }
};

/**
 * Upload documents for a single milestone
 * Returns: Array of MediaObject or null on error
 */
const uploadMilestoneDocuments = async (
  documents: File[],
  milestoneIndex: number
): Promise<MediaObject[] | null> => {
  if (!documents || documents.length === 0) {
    return [];
  }

  try {
    const docUploads = await Promise.all(
      documents.map((doc, docIndex) =>
        uploadMedia({
          file: doc,
          type: detectMediaType(doc),
          description: `Milestone ${milestoneIndex + 1} - Document ${docIndex + 1}`,
          tags: ['milestone', 'document'],
          isPublic: false,
        })
      )
    );

    return docUploads.map((u, index) => ({
      id: u.id,
      url: u.url,
      name: u.originalName || documents[index].name,
    }));
  } catch (error) {
    console.error(
      `Error uploading milestone ${milestoneIndex + 1} documents:`,
      error
    );
    return null;
  }
};

/**
 * Upload all milestone documents
 * Returns: Array of milestones with documents or null on error
 */
export const uploadAllMilestoneDocuments = async (
  milestones: CreateCampaignFormType['milestones']
): Promise<Array<{
  title: string;
  description: string;
  budget: number;
  durationDays: number;
  documents: MediaObject[];
}> | null> => {
  try {
    const milestonesWithDocs = await Promise.all(
      milestones.map(async (milestone: any, index: number) => {
        const documents = await uploadMilestoneDocuments(
          milestone.documents || [],
          index
        );

        // If any milestone upload fails, return null
        if (documents === null) {
          throw new Error(
            `Failed to upload documents for milestone ${index + 1}`
          );
        }

        return {
          title: milestone.title,
          description: milestone.description,
          budget: milestone.budget,
          durationDays: milestone.durationDays,
          documents,
        };
      })
    );

    return milestonesWithDocs;
  } catch (error) {
    console.error('Error uploading milestone documents:', error);
    return null;
  }
};

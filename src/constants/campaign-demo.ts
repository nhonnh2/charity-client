// Demo file to show how to use the new campaign categories
import {
  CampaignCategory,
  campaignCategoryLabels,
  campaignCategoryOptions,
} from './campaign';

// Example usage in components:
export const exampleUsage = {
  // 1. Using enum values
  category: CampaignCategory.EDUCATION, // 'education'

  // 2. Getting label for display
  getLabel: (category: CampaignCategory) => {
    return campaignCategoryLabels[category]; // 'Giáo dục'
  },

  // 3. Using in forms
  formOptions: campaignCategoryOptions,
  // Returns: [
  //   { value: 'education', label: 'Giáo dục' },
  //   { value: 'healthcare', label: 'Y tế' },
  //   { value: 'disaster_relief', label: 'Cứu trợ thiên tai' },
  //   // ... etc
  // ]

  // 4. Type safety
  validCategories: Object.values(CampaignCategory),
  // ['education', 'healthcare', 'disaster_relief', ...]
};

// Example validation function
export const isValidCategory = (
  category: string
): category is CampaignCategory => {
  return Object.values(CampaignCategory).includes(category as CampaignCategory);
};

// Example mapping function for API responses
export const mapCategoryFromAPI = (apiCategory: string): CampaignCategory => {
  // Handle any potential API response format differences
  const normalizedCategory = apiCategory.toLowerCase();

  if (isValidCategory(normalizedCategory)) {
    return normalizedCategory;
  }

  // Fallback to OTHER if category is not recognized
  return CampaignCategory.OTHER;
};

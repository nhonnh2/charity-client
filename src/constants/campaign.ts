// Campaign Categories - Sync with backend enum
export enum CampaignCategory {
  EDUCATION = 'education',
  HEALTHCARE = 'healthcare',
  DISASTER_RELIEF = 'disaster_relief',
  POVERTY = 'poverty',
  ENVIRONMENT = 'environment',
  CHILDREN = 'children',
  ELDERLY = 'elderly',
  DISABILITY = 'disability',
  SICK_PEOPLE = 'sick_people',
  CONSTRUCTION = 'construction',
  OTHER = 'other',
}

// Campaign Category Labels (Vietnamese)
export const campaignCategoryLabels = {
  [CampaignCategory.EDUCATION]: 'Giáo dục',
  [CampaignCategory.HEALTHCARE]: 'Y tế',
  [CampaignCategory.DISASTER_RELIEF]: 'Thiên tai',
  [CampaignCategory.ENVIRONMENT]: 'Môi trường',
  [CampaignCategory.CONSTRUCTION]: 'Xây dựng',
  [CampaignCategory.CHILDREN]: 'Trẻ em',
  [CampaignCategory.POVERTY]: 'Người nghèo',
  [CampaignCategory.ELDERLY]: 'Người cao tuổi',
  [CampaignCategory.DISABILITY]: 'Người khuyết tật',
  [CampaignCategory.SICK_PEOPLE]: 'Người bệnh',
  [CampaignCategory.OTHER]: 'Khác',
} as const;

// Campaign Category Options for forms
export const campaignCategoryOptions = Object.entries(
  campaignCategoryLabels
).map(([value, label]) => ({
  value: value as CampaignCategory,
  label,
}));

// Campaign Status
export const campaignStatus = {
  pending_review: 'Chờ duyệt',
  approved: 'Đã duyệt',
  rejected: 'Bị từ chối',
  fundraising: 'Đang gây quỹ',
  implementation: 'Đang triển khai',
  completed: 'Hoàn thành',
  cancelled: 'Đã hủy',
} as const;

// Campaign Status CSS Classes
export const campaignStatusClassName = {
  pending_review: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  approved: 'bg-blue-50 text-blue-700 border-blue-200',
  rejected: 'bg-red-50 text-red-700 border-red-200',
  fundraising: 'bg-green-50 text-green-700 border-green-200',
  implementation: 'bg-purple-50 text-purple-700 border-purple-200',
  completed: 'bg-gray-50 text-gray-700 border-gray-200',
  cancelled: 'bg-gray-50 text-gray-700 border-gray-200',
} as const;

// Type exports
export type CampaignCategoryType = keyof typeof campaignCategoryLabels;
export type CampaignStatusType = keyof typeof campaignStatus;

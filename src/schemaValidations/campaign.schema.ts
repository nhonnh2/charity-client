import { z } from 'zod';

// Constants
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_DOCUMENT_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'image/svg+xml',
];
const ACCEPTED_DOCUMENT_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/jpg',
  'image/png',
];

// File validation schema - Handle both server and client side
const fileSchema = z.any().refine(
  file => {
    // Check if we're in browser environment and file is a File instance
    if (typeof window !== 'undefined' && file instanceof File) {
      return true;
    }
    // For server-side or other file-like objects
    return (
      file &&
      typeof file === 'object' &&
      'name' in file &&
      'size' in file &&
      'type' in file
    );
  },
  { message: 'File là bắt buộc' }
);

const imageFileSchema = fileSchema
  .refine(
    file => file && file.size <= MAX_IMAGE_SIZE,
    'Kích thước file không được vượt quá 5MB'
  )
  .refine(
    file => file && ACCEPTED_IMAGE_TYPES.includes(file.type),
    'Chỉ chấp nhận file ảnh (JPEG, PNG, GIF, SVG)'
  );

// Mixed file schema - Accepts both images and documents
const ACCEPTED_MIXED_TYPES = [
  ...ACCEPTED_IMAGE_TYPES,
  ...ACCEPTED_DOCUMENT_TYPES,
  'application/msword', // .doc
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
  'application/vnd.ms-excel', // .xls
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
  'text/plain', // .txt
];

const documentFileSchema = fileSchema
  .refine(
    file => file && file.size <= MAX_DOCUMENT_SIZE,
    'Kích thước file không được vượt quá 10MB'
  )
  .refine(
    file => file && ACCEPTED_MIXED_TYPES.includes(file.type),
    'Chỉ chấp nhận file ảnh, PDF, Word, Excel hoặc text'
  );

// Milestone schema
const milestoneSchema = z.object({
  title: z
    .string()
    .min(1, 'Tiêu đề giai đoạn là bắt buộc')
    .min(5, 'Tiêu đề giai đoạn phải có ít nhất 5 ký tự')
    .max(200, 'Tiêu đề giai đoạn không được quá 200 ký tự'),
  description: z
    .string()
    .min(1, 'Mô tả giai đoạn là bắt buộc')
    .refine(value => {
      // Remove HTML tags to count actual text content
      const textContent = value.replace(/<[^>]*>/g, '').trim();
      return textContent.length >= 10;
    }, 'Mô tả giai đoạn phải có ít nhất 10 ký tự (không tính HTML tags)')
    .refine(value => {
      // Remove HTML tags to count actual text content
      const textContent = value.replace(/<[^>]*>/g, '').trim();
      return textContent.length <= 2000;
    }, 'Mô tả giai đoạn không được quá 2000 ký tự (không tính HTML tags)'),
  budget: z
    .number({ invalid_type_error: 'Ngân sách phải là số' })
    .min(1, 'Ngân sách phải lớn hơn 0')
    .max(1000000000, 'Ngân sách không được vượt quá 1 tỷ VNĐ'),
  durationDays: z
    .number({ invalid_type_error: 'Thời gian phải là số' })
    .int('Thời gian phải là số nguyên')
    .min(1, 'Thời gian phải lớn hơn 0')
    .max(365, 'Thời gian không được vượt quá 365 ngày'),
  documents: z.array(documentFileSchema).optional().default([]),
});

// Main campaign creation schema
export const CreateCampaignFormSchema = z
  .object({
    // Step 1: Basic Information
    type: z.enum(['regular', 'emergency'], {
      required_error: 'Loại chiến dịch là bắt buộc',
    }),
    fundingType: z.enum(['fixed', 'flexible'], {
      required_error: 'Mục tiêu quyên góp là bắt buộc',
    }),
    title: z
      .string()
      .min(1, 'Tiêu đề chiến dịch là bắt buộc')
      .min(20, 'Tiêu đề chiến dịch phải có ít nhất 20 ký tự')
      .max(200, 'Tiêu đề chiến dịch không được quá 200 ký tự'),
    category: z.string().min(1, 'Danh mục là bắt buộc'),
    description: z
      .string()
      .min(1, 'Mô tả chiến dịch là bắt buộc')
      .min(100, 'Mô tả chiến dịch phải có ít nhất 100 ký tự')
      .max(5000, 'Mô tả chiến dịch không được quá 5000 ký tự'),
    targetAmount: z
      .number({ invalid_type_error: 'Mục tiêu quyên góp phải là số' })
      .positive('Mục tiêu quyên góp phải lớn hơn 0')
      .max(10000000000, 'Mục tiêu quyên góp không được vượt quá 10 tỷ VNĐ'),
    startDate: z
      .string()
      .min(1, 'Ngày bắt đầu là bắt buộc')
      .refine(date => {
        const inputDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return inputDate >= today;
      }, 'Ngày bắt đầu phải từ hôm nay trở đi'),
    endDate: z.string().min(1, 'Ngày kết thúc là bắt buộc'),
    fundraisingDays: z
      .number({ invalid_type_error: 'Số ngày kêu gọi phải là số' })
      .int('Số ngày kêu gọi phải là số nguyên')
      .positive('Số ngày kêu gọi phải lớn hơn 0')
      .max(365, 'Số ngày kêu gọi không được vượt quá 365 ngày'),
    coverImage: imageFileSchema,
    images: z
      .array(imageFileSchema)
      .max(10, 'Không được tải lên quá 10 hình ảnh')
      .optional()
      .default([]),

    // Step 2: Milestones
    milestones: z
      .array(milestoneSchema)
      .min(1, 'Phải có ít nhất 1 giai đoạn')
      .max(10, 'Không được vượt quá 10 giai đoạn'),

    // Step 3: Verification
    reviewFee: z
      .number({ invalid_type_error: 'Phí duyệt phải là số' })
      .min(50000, 'Phí duyệt tối thiểu là 50,000 VNĐ')
      .max(10000000, 'Phí duyệt không được vượt quá 10,000,000 VNĐ'),
    identityFront: imageFileSchema,
    identityBack: imageFileSchema,
    walletAddress: z.string().optional(),
    agreedToTerms: z
      .boolean()
      .refine(val => val === true, 'Bạn phải đồng ý với điều khoản sử dụng'),
  })
  .strict()
  .superRefine((data, ctx) => {
    // Validate: endDate must be after startDate
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);

    if (endDate <= startDate) {
      ctx.addIssue({
        code: 'custom',
        message: 'Ngày kết thúc phải sau ngày bắt đầu',
        path: ['endDate'],
      });
    }

    // Validate: Emergency campaign restrictions
    if (data.type === 'emergency') {
      // Emergency campaign can only have 1 milestone
      if (data.milestones.length > 1) {
        ctx.addIssue({
          code: 'custom',
          message: 'Chiến dịch khẩn cấp chỉ được có 1 giai đoạn',
          path: ['milestones'],
        });
      }

      // Emergency campaign target amount limits based on reputation
      const userReputation = 60; // TODO: Get from user context/store
      const maxEmergencyAmount = getMaxEmergencyAmount(userReputation);

      if (data.targetAmount > maxEmergencyAmount) {
        ctx.addIssue({
          code: 'custom',
          message: `Chiến dịch khẩn cấp giới hạn tối đa ${new Intl.NumberFormat('vi-VN').format(maxEmergencyAmount)} VNĐ với uy tín hiện tại`,
          path: ['targetAmount'],
        });
      }
    }

    // Validate: Total milestone budget should equal target amount
    const totalBudget = data.milestones.reduce(
      (sum, m) => sum + (m.budget || 0),
      0
    );
    const targetAmount = data.targetAmount;

    if (totalBudget !== targetAmount) {
      ctx.addIssue({
        code: 'custom',
        message: `Tổng ngân sách các giai đoạn (${new Intl.NumberFormat('vi-VN').format(totalBudget)} VNĐ) phải bằng mục tiêu quyên góp (${new Intl.NumberFormat('vi-VN').format(targetAmount)} VNĐ)`,
        path: ['milestones'],
      });
    }
  });

// Helper function for emergency amount limit
function getMaxEmergencyAmount(reputation: number): number {
  if (reputation >= 90) return 100000000; // 100M VND
  if (reputation >= 80) return 50000000; // 50M VND
  if (reputation >= 70) return 20000000; // 20M VND
  if (reputation >= 60) return 10000000; // 10M VND
  return 0; // Not eligible for emergency campaigns
}

export type CreateCampaignFormType = z.TypeOf<typeof CreateCampaignFormSchema>;

// ============================================
// ADDITIONAL SCHEMAS FOR API
// ============================================

// Campaign Status Enum
export const CampaignStatus = z.enum([
  'pending_review',
  'approved',
  'rejected',
  'fundraising',
  'implementation',
  'completed',
  'cancelled',
  'active',
]);

export type CampaignStatusType = z.infer<typeof CampaignStatus>;

// Campaign Type Enum (from API - 'normal' instead of 'regular')
export const CampaignType = z.enum(['normal', 'emergency']);
export type CampaignTypeType = z.infer<typeof CampaignType>;

// Funding Type Enum
export const FundingType = z.enum(['fixed', 'flexible']);
export type FundingTypeType = z.infer<typeof FundingType>;

// Get Campaigns Query Schema
export const GetCampaignsQuery = z.object({
  page: z.number().min(1).optional().default(1),
  limit: z.number().min(1).max(100).optional().default(10),
  search: z.string().optional(),
  type: CampaignType.optional(),
  fundingType: FundingType.optional(),
  status: CampaignStatus.optional(),
  category: z.string().optional(),
  creatorId: z.string().optional(),
  minTargetAmount: z.number().min(0).optional(),
  maxTargetAmount: z.number().min(0).optional(),
  startDateFrom: z.string().optional(),
  startDateTo: z.string().optional(),
  isFeatured: z.boolean().optional(),
  sortBy: z.string().optional().default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  tag: z.string().optional(),
});

export type GetCampaignsQueryType = z.infer<typeof GetCampaignsQuery>;

// Media Object Schema (for coverImage, gallery, documents)
export const MediaObjectSchema = z.object({
  id: z.string(),
  url: z.string(),
  name: z.string(),
});

// Creator Object Schema (nested in response)
export const CreatorObjectSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string().optional(),
  avatar: z.string().optional(),
  reputation: z.number().optional(),
});

// Campaign Response Schema (detailed) - Matches actual API response
export const CampaignResponse = z.object({
  _id: z.string(),
  title: z.string(),
  description: z.string(),
  type: CampaignType,
  fundingType: FundingType,
  category: z.string(),
  status: CampaignStatus,
  targetAmount: z.number(),
  fundraisingDays: z.number().optional(),
  currentAmount: z.number().optional().default(0),
  startDate: z.string().transform(str => new Date(str)),
  endDate: z.string().transform(str => new Date(str)),

  // Media Objects
  coverImage: MediaObjectSchema.optional(),
  gallery: z.array(MediaObjectSchema).optional(),

  // Creator info (nested object from API)
  creatorId: CreatorObjectSchema,
  creatorName: z.string().optional(),

  // Milestones with document objects
  milestones: z
    .array(
      z.object({
        title: z.string(),
        description: z.string(),
        budget: z.number(),
        durationDays: z.number(),
        status: z.string().optional(),
        documents: z.array(MediaObjectSchema).optional().default([]),
      })
    )
    .optional(),

  // Verification
  reviewFee: z.number().optional(),
  walletAddress: z.string().optional(),

  // Stats
  donorCount: z.number().optional().default(0),
  viewCount: z.number().optional().default(0),
  shareCount: z.number().optional().default(0),

  // Flags
  isFeatured: z.boolean().optional().default(false),
  isActive: z.boolean().optional().default(true),

  // Tags & Attachments
  tags: z.array(z.string()).optional().default([]),
  attachments: z.array(z.any()).optional().default([]),

  // Timestamps
  createdAt: z.string().transform(str => new Date(str)),
  updatedAt: z.string().transform(str => new Date(str)),
  __v: z.number().optional(),
});

export type CampaignResponseType = z.infer<typeof CampaignResponse>;

// Single Campaign Response - Matches actual API response structure
// API returns: { data: Campaign, statusCode, message, timestamp }
export const SingleCampaignResponse = z
  .object({
    data: CampaignResponse,
    statusCode: z.number(),
    message: z.string(),
    timestamp: z.string().optional(),
  })
  .transform(response => ({
    // Return data and message for consistency
    data: response.data,
    message: response.message,
  }));

export type SingleCampaignResponseType = z.infer<typeof SingleCampaignResponse>;

// Campaign List Response with Pagination - Matches actual API response structure
// API returns: { data: { data: Campaign[], pagination: {...} }, statusCode, message, timestamp }
export const CampaignListResponse = z
  .object({
    data: z.object({
      data: z.array(CampaignResponse),
      pagination: z
        .object({
          current: z.number(),
          pageSize: z.number(),
          total: z.number(),
          totalPages: z.number(),
        })
        .optional(),
    }),
    statusCode: z.number(),
    message: z.string(),
    timestamp: z.string().optional(),
  })
  .transform(response => ({
    // Flatten for easier use
    data: response.data.data,
    pagination: response.data.pagination,
    message: response.message,
  }));

export type CampaignListResponseType = z.infer<typeof CampaignListResponse>;

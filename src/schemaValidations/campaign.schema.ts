import { z } from 'zod';
import {
  CampaignCategory,
  CampaignStatusType,
  campaignStatus,
} from '@/constants/campaign';
import {
  ListResponseSchema,
  ImageFileSchema,
  DocumentFileSchema,
  MediaObjectSchema,
} from './common.schema';

// ============================================
// CAMPAIGN SPECIFIC SCHEMAS
// ============================================

// Milestone schema
export const MilestoneSchema = z.object({
  title: z
    .string()
    .min(5, 'Tiêu đề giai đoạn phải có ít nhất 5 ký tự')
    .max(200, 'Tiêu đề giai đoạn không được quá 200 ký tự'),
  description: z
    .string()
    .min(10, 'Mô tả giai đoạn phải có ít nhất 10 ký tự')
    .max(5000, 'Mô tả giai đoạn không được quá 5000 ký tự'),
  budget: z.number().min(0, 'Ngân sách phải lớn hơn 0'),
  durationDays: z.number().min(1, 'Thời gian phải ít nhất 1 ngày'),
  documents: z.array(MediaObjectSchema).optional(),
});

// Campaign schemas
export const CreateCampaignSchema = z.object({
  title: z
    .string()
    .min(5, 'Tiêu đề phải có ít nhất 5 ký tự')
    .max(200, 'Tiêu đề không được quá 200 ký tự'),
  description: z
    .string()
    .min(50, 'Mô tả phải có ít nhất 50 ký tự')
    .max(5000, 'Mô tả không được quá 5000 ký tự'),
  type: z.enum(['normal', 'emergency']).default('normal'),
  fundingType: z.enum(['fixed', 'flexible']).default('fixed'),
  targetAmount: z
    .number()
    .min(100000, 'Số tiền mục tiêu tối thiểu là 100,000 VNĐ'),
  reviewFee: z.number().min(0, 'Phí xét duyệt phải lớn hơn 0'),
  category: z.nativeEnum(CampaignCategory, {
    errorMap: () => ({ message: 'Danh mục không hợp lệ' }),
  }),
  tags: z.array(z.string()).optional(),
  startDate: z.string().min(1, 'Ngày bắt đầu là bắt buộc'),
  endDate: z.string().min(1, 'Ngày kết thúc là bắt buộc'),
  fundraisingDays: z.number().min(1, 'Số ngày gây quỹ phải ít nhất 1 ngày'),
  milestones: z
    .array(MilestoneSchema)
    .min(1, 'Phải có ít nhất 1 giai đoạn')
    .max(10, 'Không được quá 10 giai đoạn'),
  coverImage: MediaObjectSchema,
  gallery: z.array(MediaObjectSchema).optional(),
});

export const UpdateCampaignSchema = CreateCampaignSchema.partial();

// Campaign data schemas (cho API responses)
export const CampaignSchema = z.object({
  id: z.string(), // For backward compatibility
  title: z.string(),
  description: z.string(),
  category: z.nativeEnum(CampaignCategory),
  targetAmount: z.number().optional(),
  currentAmount: z.number(),
  startDate: z
    .string()
    .optional()
    .transform(str => (str ? new Date(str) : new Date())),
  endDate: z
    .string()
    .optional()
    .transform(str => (str ? new Date(str) : new Date())),
  milestones: z.array(MilestoneSchema).optional(),
  coverImage: MediaObjectSchema.optional(),
  gallery: z.array(MediaObjectSchema).optional(),
  tags: z.array(z.string()).optional(),
  isPublic: z.boolean().optional().default(true),
  status: z.enum(
    Object.keys(campaignStatus) as [CampaignStatusType, ...CampaignStatusType[]]
  ),
  type: z.enum(['normal', 'emergency']).optional(),
  fundingType: z.enum(['fixed', 'flexible']).optional(),
  createdAt: z.string().transform(str => new Date(str)),
  updatedAt: z
    .string()
    .transform(str => new Date(str))
    .optional(),
  creator: z
    .object({
      id: z.string().optional(),
      name: z.string().optional(),
      email: z.string().optional(),
      avatar: z.string().optional(),
      reputation: z.number().optional(),
    })
    .optional(),
  followersCount: z.number().optional(),
  donorCount: z.number().optional(),
  shareCount: z.number().optional(),
  fundraisingDays: z.number().optional(),
  isFollowing: z.boolean().optional(),
  donatedAmount: z.number().optional(),
  spentAmount: z.number().optional(),
  completedMilestones: z.number().optional(),
  totalMilestones: z.number().optional(),
});

// Campaign list response schema với format chuẩn
export const CampaignListSchema = ListResponseSchema(CampaignSchema);

export const CampaignDetailSchema = CampaignSchema.extend({
  donations: z
    .array(
      z.object({
        id: z.string(),
        amount: z.number(),
        message: z.string().optional(),
        isAnonymous: z.boolean(),
        createdAt: z.string().transform(str => new Date(str)),
        donor: z
          .object({
            id: z.string(),
            name: z.string(),
            avatar: z.string().optional(),
          })
          .optional(),
      })
    )
    .optional(),
  comments: z
    .array(
      z.object({
        id: z.string(),
        content: z.string(),
        createdAt: z.string().transform(str => new Date(str)),
        author: z.object({
          id: z.string(),
          name: z.string(),
          avatar: z.string().optional(),
        }),
      })
    )
    .optional(),
});

export const FollowStatusSchema = z.object({
  isFollowing: z.boolean(),
});

// Types
export type Milestone = z.infer<typeof MilestoneSchema>;
export type CreateCampaign = z.infer<typeof CreateCampaignSchema>;
export type UpdateCampaign = z.infer<typeof UpdateCampaignSchema>;
export type Campaign = z.infer<typeof CampaignSchema>;
export type CampaignList = z.infer<typeof CampaignListSchema>;
export type CampaignDetail = z.infer<typeof CampaignDetailSchema>;
export type FollowStatus = z.infer<typeof FollowStatusSchema>;

// Query types
export type GetCampaignsQueryType = {
  page?: number;
  limit?: number;
  category?: string;
  status?: string;
  search?: string;
  sortBy?: 'createdAt' | 'targetAmount' | 'currentAmount';
  sortOrder?: 'asc' | 'desc';
};

// Alias for backward compatibility
export const CampaignDataSchema = CampaignSchema;
export type CampaignData = Campaign;

// Extended milestone schema for form
export const MilestoneFormSchema = z.object({
  title: z
    .string()
    .min(5, 'Tiêu đề giai đoạn phải có ít nhất 5 ký tự')
    .max(200, 'Tiêu đề giai đoạn không được quá 200 ký tự'),
  description: z
    .string()
    .min(10, 'Mô tả giai đoạn phải có ít nhất 10 ký tự')
    .max(5000, 'Mô tả giai đoạn không được quá 5000 ký tự'),
  budget: z.number().min(0, 'Ngân sách phải lớn hơn 0'),
  durationDays: z.number().min(1, 'Thời gian phải ít nhất 1 ngày'),
  targetAmount: z.number().min(0, 'Số tiền mục tiêu phải lớn hơn 0').optional(),
  documents: z.array(DocumentFileSchema).optional(),
});

// Extended campaign form schema
export const CreateCampaignFormSchema = z.object({
  // Basic info
  type: z.enum(['regular', 'emergency']).default('regular'),
  fundingType: z.enum(['fixed', 'flexible']).default('fixed'),
  title: z
    .string()
    .min(5, 'Tiêu đề phải có ít nhất 5 ký tự')
    .max(200, 'Tiêu đề không được quá 200 ký tự'),
  category: z.nativeEnum(CampaignCategory, {
    errorMap: () => ({ message: 'Danh mục không hợp lệ' }),
  }),
  description: z
    .string()
    .min(50, 'Mô tả phải có ít nhất 50 ký tự')
    .max(5000, 'Mô tả không được quá 5000 ký tự'),
  targetAmount: z
    .number()
    .min(100000, 'Số tiền mục tiêu tối thiểu là 100,000 VNĐ'),

  // Dates
  startDate: z.string().min(1, 'Ngày bắt đầu là bắt buộc'),
  endDate: z.string().min(1, 'Ngày kết thúc là bắt buộc'),
  fundraisingDays: z
    .number()
    .min(1, 'Số ngày gây quỹ phải ít nhất 1 ngày')
    .optional(),

  // Media
  coverImage: z.any().optional(),
  gallery: z.array(ImageFileSchema).min(1, 'Phải có ít nhất 1 ảnh'),
  // Milestones
  milestones: z
    .array(MilestoneFormSchema)
    .min(1, 'Phải có ít nhất 1 giai đoạn')
    .max(10, 'Không được quá 10 giai đoạn'),

  // Additional fields
  tags: z.array(z.string()).optional(),

  // Verification fields
  reviewFee: z.number().min(0, 'Phí xét duyệt phải lớn hơn 0'),
  identityFront: z.any().optional(),
  identityBack: z.any().optional(),
  agreedToTerms: z
    .boolean()
    .refine(val => val === true, 'Bạn phải đồng ý với điều khoản'),
});

export type CreateCampaignFormType = z.infer<typeof CreateCampaignFormSchema>;
export type MilestoneFormType = z.infer<typeof MilestoneFormSchema>;

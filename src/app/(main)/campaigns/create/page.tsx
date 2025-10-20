'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Form } from '@/components/ui/form';
import { ChevronRight } from 'lucide-react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CreateCampaignFormSchema,
  type CreateCampaignFormType,
} from '@/schemaValidations/campaign.schema';
import { type CreateCampaign } from '@/schemaValidations/campaign.schema';
import { toast } from 'sonner';
import {
  uploadCoverImage,
  uploadGalleryImages,
  uploadIdentityImages,
  uploadAllMilestoneDocuments,
} from './helpers/upload-helpers';
import { transformFormToApiData } from './helpers/transform-data';
import { logErrorForDev } from '@/lib/api/errors';
import { useMutationCreateCampaign } from '@/hooks/campaigns';
import InstructSide from './components/intruct-side';
import InfomationBasicForm from './components/infomation-basic-form';
import MileStonesForm from './components/milestones-form';
import VerifyForm from './components/verify-form';

export default function CreateCampaignPage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  // React Query mutation để tạo campaign
  const createCampaignMutation = useMutationCreateCampaign({
    onSuccess: data => {
      toast.success('Tạo chiến dịch thành công! Đang chuyển hướng...', {
        id: 'create-campaign',
      });
      console.log('Campaign created:', data);

      // Reset submitting state
      setIsSubmitting(false);

      // Redirect to campaign detail page
      setTimeout(() => {
        router.push(`/campaigns/${data.id}`);
      }, 1000);
    },
    onError: error => {
      // Error đã được xử lý trong http client
      logErrorForDev(error, 'Campaign Creation');

      // Reset submitting state on error
      setIsSubmitting(false);
    },
  });

  const form = useForm<CreateCampaignFormType>({
    resolver: zodResolver(CreateCampaignFormSchema),
    defaultValues: {
      type: 'regular',
      fundingType: 'fixed',
      title: '',
      category: undefined,
      description: '',
      targetAmount: 0,
      startDate: '',
      endDate: '',
      coverImage: undefined,
      gallery: [],
      milestones: [
        {
          title: '',
          description: '',
          budget: 0,
          durationDays: 0,
          documents: [],
        },
      ],
      reviewFee: 50000,
      identityFront: undefined,
      identityBack: undefined,
      agreedToTerms: false,
    },
    mode: 'onTouched', // Only validate after user touches field
  });
  const reviewFee = useWatch({
    control: form.control,
    name: 'reviewFee',
  });

  const handleSubmitCampaign = async (data: CreateCampaignFormType) => {
    console.log('========== SUBMIT TRIGGERED ==========');
    console.log('handleSubmitCampaign_____', {
      activeStep,
      isSubmitting,
      data,
    });

    // Only allow submit at step 3
    if (activeStep !== 3) {
      console.warn('Submit blocked - not at step 3');
      return;
    }

    // Prevent double submission
    if (isSubmitting || createCampaignMutation.isPending) return;

    // Set submitting state immediately
    setIsSubmitting(true);

    const loadingToast = toast.loading('Đang tạo chiến dịch...', {
      id: 'create-campaign',
    });

    try {
      // ============================================
      // PHASE 1: Upload all media files
      // ============================================

      // 1.1 Upload cover image
      toast.loading('Đang tải lên ảnh cover...', { id: loadingToast });
      const coverImage = await uploadCoverImage(data.coverImage, data.title);
      if (!coverImage) {
        toast.error('Không thể tải lên ảnh cover', { id: loadingToast });
        return;
      }

      // 1.2 Upload gallery images
      const imageCount = data.gallery?.length || 0;
      if (imageCount > 0) {
        toast.loading(`Đang tải lên ${imageCount} hình ảnh...`, {
          id: loadingToast,
        });
      }
      const gallery = await uploadGalleryImages(data.gallery || [], data.title);
      if (gallery === null) {
        toast.error('Không thể tải lên gallery images', { id: loadingToast });
        return;
      }

      // 1.3 Upload identity images
      toast.loading('Đang tải lên giấy tờ xác minh...', { id: loadingToast });
      const identityDocs = await uploadIdentityImages(
        data.identityFront,
        data.identityBack
      );
      if (!identityDocs) {
        toast.error('Không thể tải lên giấy tờ xác minh', { id: loadingToast });
        return;
      }

      // 1.4 Upload milestone documents
      toast.loading('Đang tải lên tài liệu giai đoạn...', { id: loadingToast });
      const milestonesWithDocs = await uploadAllMilestoneDocuments(
        data.milestones
      );
      if (!milestonesWithDocs) {
        toast.error('Không thể tải lên tài liệu giai đoạn', {
          id: loadingToast,
        });
        return;
      }
      // ============================================
      // PHASE 2: Transform & Create Campaign
      // ============================================

      // 2.1 Transform form data to API format
      const campaignData = transformFormToApiData(data, {
        coverImage,
        gallery,
        identityFront: identityDocs.front,
        identityBack: identityDocs.back,
        milestones: milestonesWithDocs,
      });

      // 2.2 Create campaign với React Query mutation
      toast.loading('Đang tạo chiến dịch...', { id: loadingToast });
      createCampaignMutation.mutate(campaignData);
    } catch (error: any) {
      // ============================================
      // ERROR HANDLING
      // ============================================

      // Log error for debugging in development
      logErrorForDev(error, 'Campaign Creation');
      toast.error('Có lỗi xảy ra khi tạo chiến dịch', { id: loadingToast });

      // Reset submitting state on error
      setIsSubmitting(false);
    }
  };

  // Validate current step before proceeding
  const handleNextStep = async (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();

    console.log('========== NEXT STEP TRIGGERED ==========');
    console.log('handleNextStep_____', {
      activeStep,
      currentValues: form.getValues(),
    });

    // Get current form values
    const formValues = form.getValues();

    // Validate based on current step
    if (activeStep === 1) {
      // Validate Step 1: Basic Information
      const step1Fields = [
        'type',
        'fundingType',
        'title',
        'category',
        'description',
        'targetAmount',
        'startDate',
        'endDate',
        'coverImage',
        'gallery',
      ] as const;

      const isValid = await form.trigger(step1Fields);

      if (!isValid) {
        toast.error('Vui lòng điền đầy đủ thông tin cơ bản và sửa các lỗi');
        return;
      }

      // Move to step 2
      setActiveStep(2);
      toast.success('Bước 1 hoàn thành');
    } else if (activeStep === 2) {
      // Validate Step 2: Milestones
      const type = formValues.type;
      const targetAmount = formValues.targetAmount;
      const milestones = formValues.milestones;

      console.log('========== MILESTONE VALIDATION ==========');
      console.log('Milestone validation data:', {
        type,
        targetAmount,
        milestonesCount: milestones.length,
        milestones: milestones.map((m: any, index: number) => ({
          index,
          title: m.title,
          description: m.description,
          budget: m.budget,
          durationDays: m.durationDays,
          documentsCount: m.documents?.length || 0,
        })),
      });

      // Validate milestones array
      const isValid = await form.trigger('milestones');

      // Get detailed validation errors
      const formErrors = form.formState.errors;
      const milestoneErrors = formErrors.milestones;

      console.log('Milestone validation result:', {
        isValid,
        formErrors: formErrors,
        milestoneErrors: milestoneErrors,
      });

      if (!isValid) {
        // Log detailed errors for each milestone
        if (milestoneErrors && Array.isArray(milestoneErrors)) {
          milestoneErrors.forEach((error, index) => {
            if (error) {
              console.log(`Milestone ${index + 1} errors:`, error);

              // Check specific field errors
              if (error.title) {
                console.log(`  - Title error: ${error.title.message}`);
              }
              if (error.description) {
                console.log(
                  `  - Description error: ${error.description.message}`
                );
              }
              if (error.budget) {
                console.log(`  - Budget error: ${error.budget.message}`);
              }
              if (error.durationDays) {
                console.log(
                  `  - Duration error: ${error.durationDays.message}`
                );
              }
              if (error.documents) {
                console.log(`  - Documents error: ${error.documents.message}`);
              }
            }
          });
        }

        // Show specific error message based on the first error found
        let errorMessage = 'Vui lòng điền đầy đủ thông tin các giai đoạn';

        if (milestoneErrors && Array.isArray(milestoneErrors)) {
          for (let i = 0; i < milestoneErrors.length; i++) {
            const milestoneError = milestoneErrors[i];
            if (milestoneError) {
              if (milestoneError.title) {
                errorMessage = `Giai đoạn ${i + 1}: ${milestoneError.title.message}`;
                break;
              }
              if (milestoneError.description) {
                errorMessage = `Giai đoạn ${i + 1}: ${milestoneError.description.message}`;
                break;
              }
              if (milestoneError.budget) {
                errorMessage = `Giai đoạn ${i + 1}: ${milestoneError.budget.message}`;
                break;
              }
              if (milestoneError.durationDays) {
                errorMessage = `Giai đoạn ${i + 1}: ${milestoneError.durationDays.message}`;
                break;
              }
              if (milestoneError.documents) {
                errorMessage = `Giai đoạn ${i + 1}: ${milestoneError.documents.message}`;
                break;
              }
            }
          }
        }

        toast.error(errorMessage);
        return;
      }

      // Additional validation: Check if emergency has only 1 milestone
      if (type === 'emergency' && milestones.length > 1) {
        console.log(
          'Emergency campaign validation failed: too many milestones'
        );
        toast.error('Chiến dịch khẩn cấp chỉ được có 1 giai đoạn');
        return;
      }

      // Additional validation: Check if total budget equals target amount
      const totalBudget = milestones.reduce(
        (sum: number, m: any) => sum + (m.budget || 0),
        0
      );

      console.log('Budget validation:', {
        totalBudget,
        targetAmount,
        isEqual: totalBudget === targetAmount,
      });

      if (totalBudget !== targetAmount) {
        console.log(
          'Budget validation failed: total budget does not match target amount'
        );
        toast.error(
          `Tổng ngân sách các giai đoạn (${new Intl.NumberFormat('vi-VN').format(totalBudget)} VNĐ) phải bằng mục tiêu quyên góp (${new Intl.NumberFormat('vi-VN').format(targetAmount)} VNĐ)`
        );
        return;
      }

      console.log('Milestone validation passed successfully');
      // Move to step 3
      setActiveStep(3);
      toast.success('Bước 2 hoàn thành');
    }
  };

  // Scroll to top when step changes
  useEffect(() => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [activeStep]);

  console.log('re_render_form_create____', createCampaignMutation);

  return (
    <div className='container mx-auto px-4 py-6 max-w-7xl'>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold tracking-tight'>
          Tạo chiến dịch mới
        </h1>
        <p className='text-muted-foreground'>
          Tạo chiến dịch quyên góp minh bạch với blockchain
        </p>
      </div>

      <div className='grid grid-cols-1 gap-4 lg:grid-cols-4'>
        {/* Main content - 3/4 width on desktop */}
        <div className='lg:col-span-3 space-y-6' ref={formRef}>
          <Card>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmitCampaign as any)}>
                <CardHeader className='border-b'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <CardTitle>Các bước tạo chiến dịch</CardTitle>
                      <CardDescription>
                        Hoàn thành các bước sau để tạo chiến dịch
                      </CardDescription>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <Badge variant={activeStep >= 1 ? 'default' : 'outline'}>
                        1
                      </Badge>
                      <ChevronRight className='h-4 w-4 text-muted-foreground' />
                      <Badge variant={activeStep >= 2 ? 'default' : 'outline'}>
                        2
                      </Badge>
                      <ChevronRight className='h-4 w-4 text-muted-foreground' />
                      <Badge variant={activeStep >= 3 ? 'default' : 'outline'}>
                        3
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className='p-0'>
                  <Tabs value={`step-${activeStep}`} className='w-full'>
                    <TabsContent value='step-1' className='m-0 p-6 space-y-6'>
                      <InfomationBasicForm form={form} />
                    </TabsContent>

                    <TabsContent value='step-2' className='m-0 p-6 space-y-6'>
                      <MileStonesForm form={form} />
                    </TabsContent>

                    <TabsContent value='step-3' className='m-0 p-6 space-y-6'>
                      <VerifyForm form={form} />
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter className='border-t px-6 py-4 flex justify-between'>
                  <Button
                    type='button'
                    variant='outline'
                    onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
                    disabled={activeStep === 1}
                  >
                    Quay lại
                  </Button>
                  {activeStep < 3 ? (
                    <Button type='button' onClick={handleNextStep}>
                      Tiếp theo
                    </Button>
                  ) : (
                    <Button
                      className='bg-green-600 hover:bg-green-700'
                      type='submit'
                      disabled={isSubmitting}
                    >
                      {isSubmitting
                        ? 'Đang tạo chiến dịch...'
                        : 'Tạo chiến dịch & Đóng phí duyệt'}
                      {!isSubmitting &&
                        ` (${new Intl.NumberFormat('vi-VN').format(reviewFee || 0)} VNĐ)`}
                    </Button>
                  )}
                </CardFooter>
              </form>
            </Form>
          </Card>
        </div>

        {/* Sidebar - 1/3 width on desktop */}
        <InstructSide />
      </div>
    </div>
  );
}

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Calendar,
  Check,
  Copy,
  ExternalLink,
  FileText,
  MessageCircle,
  TrendingUp,
  AlertCircle,
  Download,
  Target,
  Banknote,
  Users,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { CampaignResponseType } from '@/schemaValidations/campaign.schema';
import {
  campaignStatus,
  campaignStatusClassName,
  campaignCategory,
} from '@/constants/type';
import { formatCurrency, formatDate } from '@/lib/utils';
import RichTextDisplay from '@/components/ui/rich-text-display';
import { notFound } from 'next/navigation';
import { getCampaignData } from './data';
import { generateMetadata } from './metadata';
import DonationCard from '@/app/(main)/campaigns/[id]/components/donation-card';
import CampaignActions from '@/app/(main)/campaigns/[id]/components/campaign-actions';
import GalleryImage from '@/app/(main)/campaigns/[id]/components/gallery-image';
import DocumentButton from '@/app/(main)/campaigns/[id]/components/document-button';

export { generateMetadata };

export default async function CampaignDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const campaignId = resolvedParams.id;

  // Server-side data fetching
  const campaign = await getCampaignData(campaignId);

  // Show 404 if campaign not found
  if (!campaign) {
    notFound();
  }

  // Calculate progress percentage
  const progressPercentage = campaign.targetAmount
    ? Math.round((campaign.currentAmount / campaign.targetAmount) * 100)
    : 0;

  const renderInfoStatus = (status: string) => {
    switch (status) {
      case 'fundraising':
        return (
          <>
            <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
              <div className='space-y-1'>
                <p className='text-xs text-muted-foreground'>Mục tiêu</p>
                <p className='font-medium'>
                  {formatCurrency(campaign.targetAmount)} VNĐ
                </p>
              </div>
              <div className='space-y-1'>
                <p className='text-xs text-muted-foreground'>Đã quyên góp</p>
                <p className='font-medium text-green-600'>
                  {formatCurrency(campaign.currentAmount)} VNĐ
                </p>
              </div>
              <div className='space-y-1'>
                <p className='text-xs text-muted-foreground'>Người đóng góp</p>
                <p className='font-medium'>{campaign.donorCount} người</p>
              </div>
              <div className='space-y-1'>
                <p className='text-xs text-muted-foreground'>
                  Thời gian nguyên góp còn
                </p>
                <p className='font-medium'>{campaign.fundraisingDays}</p>
              </div>
            </div>
            <Progress value={progressPercentage} className='h-3' />
            <div className='flex items-center justify-between text-sm'>
              <span className='font-medium'>
                {progressPercentage}% đạt được
              </span>
              <div className='flex items-center space-x-1'>
                <Calendar className='h-3 w-3 text-muted-foreground' />
                <span className='text-muted-foreground'>
                  Kết thúc: {formatDate(campaign.endDate)}
                </span>
              </div>
            </div>
          </>
        );
      case 'implementation':
        return (
          <>
            <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
              <div className='space-y-1'>
                <p className='text-xs text-muted-foreground'>Tổng quyên góp</p>
                <p className='font-medium text-green-600'>100.000.000 VNĐ</p>
              </div>
              <div className='space-y-1'>
                <p className='text-xs text-muted-foreground'>Đã giải ngân</p>
                <p className='font-medium text-blue-600'>70.000.000 VNĐ</p>
              </div>
              <div className='space-y-1'>
                <p className='text-xs text-muted-foreground'>Người đóng góp</p>
                <p className='font-medium'>128 người</p>
              </div>
              <div className='space-y-1'>
                <p className='text-xs text-muted-foreground'>
                  Giai đoạn doàn thành
                </p>
                <p className='font-medium'>2/3</p>
              </div>
            </div>
            <div className='bg-blue-50 border border-blue-200 rounded-lg p-3'>
              <div className='flex items-center justify-between mb-2'>
                <div className='flex items-center gap-2'>
                  <Banknote className='h-4 w-4 text-blue-600' />
                  <h4 className='font-medium'>Tình hình giải ngân</h4>
                </div>
              </div>
              <div className='space-y-2 text-sm'>
                <div className='flex justify-between items-center'>
                  <span>Giai đoạn 1 (Hoàn thành):</span>
                  <span className='font-medium text-green-600'>
                    35.000.000 VNĐ
                  </span>
                </div>
                <div className='flex justify-between items-center'>
                  <span>Giai đoạn 2 (Đang thực hiện):</span>
                  <span className='font-medium text-blue-600'>
                    35.000.000 VNĐ
                  </span>
                </div>
                <div className='flex justify-between items-center'>
                  <span>Giai đoạn 3 (Chờ mở khóa):</span>
                  <span className='font-medium text-gray-500'>
                    30.000.000 VNĐ
                  </span>
                </div>
                <Separator />
                <div className='flex justify-between items-center font-medium'>
                  <span>Còn lại trong quỹ:</span>
                  <span className='text-orange-600'>30.000.000 VNĐ</span>
                </div>
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  // Check if fundraising is active
  const isPendingReview = campaign.status === 'pending_review';
  const isFundraising = campaign.status === 'fundraising';
  // const isImplementing = campaign.status === 'implementation';

  return (
    <div className='container mx-auto px-4 py-6 max-w-8xl'>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
        {/* Main content - 2/3 width on desktop */}
        <div className='md:col-span-2 space-y-6'>
          {/* Cover image */}
          <div className='relative h-64 md:h-96 w-full overflow-hidden rounded-lg'>
            <img
              src={
                campaign.coverImage?.url ||
                '/placeholder.svg?height=400&width=800&text=Campaign'
              }
              alt={campaign.title}
              className='h-full w-full object-cover'
            />
            <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white'>
              <Badge className='mb-2 bg-green-600 hover:bg-green-700'>
                {
                  campaignCategory[
                    campaign.category as keyof typeof campaignCategory
                  ]
                }
              </Badge>
              <h1 className='text-2xl font-bold md:text-3xl'>
                {campaign.title}
              </h1>
            </div>
          </div>

          {/* Creator info & actions */}
          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
            <div className='flex items-center space-x-4'>
              <Avatar className='h-10 w-10'>
                <AvatarImage
                  src={campaign.creatorId.avatar}
                  alt={campaign.creatorId.name}
                />
                <AvatarFallback>
                  {campaign.creatorId.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className='flex items-center space-x-2'>
                  <span className='font-semibold'>
                    {campaign.creatorId.name}
                  </span>
                  {campaign.creatorId.reputation !== undefined && (
                    <Badge
                      variant='outline'
                      className='bg-blue-50 text-blue-700'
                    >
                      <TrendingUp className='mr-1 h-3 w-3' />
                      <span>Uy tín {campaign.creatorId.reputation}</span>
                    </Badge>
                  )}
                </div>
                <p className='text-xs text-muted-foreground'>
                  Người tạo chiến dịch
                </p>
              </div>
            </div>
            <CampaignActions campaign={campaign} />
          </div>

          {/* Campaign info card */}
          <Card>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <CardTitle>Thông tin chiến dịch</CardTitle>
                <Badge
                  variant='outline'
                  className={
                    campaignStatusClassName[
                      campaign.status as keyof typeof campaignStatusClassName
                    ]
                  }
                >
                  {
                    campaignStatus[
                      campaign.status as keyof typeof campaignStatus
                    ]
                  }
                </Badge>
              </div>
            </CardHeader>
            <CardContent className='space-y-6'>
              {/* render info status */}
              {renderInfoStatus(campaign.status)}
              {/* Secondary Info - Campaign details */}
              <div className={`${!isPendingReview ? 'pt-4' : ''}`}>
                <TooltipProvider>
                  <div className='grid grid-cols-1 gap-3 sm:grid-cols-4'>
                    {isPendingReview ? (
                      <div className='space-y-1 -mx-2 -my-1 px-2 py-1 '>
                        <p className='text-xs text-muted-foreground'>
                          Mục tiêu
                        </p>
                        <p className='font-medium'>
                          {formatCurrency(campaign.targetAmount)} VNĐ
                        </p>
                      </div>
                    ) : (
                      <div className='space-y-1 -mx-2 -my-1 px-2 py-1 '>
                        <p className='text-xs text-muted-foreground'>
                          Danh mục
                        </p>
                        <p className='font-medium'>
                          {
                            campaignCategory[
                              campaign.category as keyof typeof campaignCategory
                            ]
                          }
                        </p>
                      </div>
                    )}

                    {/* Loại chiến dịch với tooltip */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className='space-y-1 cursor-pointer group -mx-2 -my-1 px-2 py-1 rounded hover:bg-slate-50 transition-colors'>
                          <div className='flex items-center gap-1.5'>
                            <p className='text-xs text-muted-foreground transition-colors'>
                              Loại chiến dịch
                            </p>
                            <AlertCircle className='h-3.5 w-3.5 text-blue-500/70 group-hover:text-blue-600 transition-colors' />
                          </div>
                          <p className='font-medium'>
                            {campaign.type === 'normal'
                              ? 'Thông thường'
                              : 'Khẩn cấp'}
                          </p>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side='bottom' className='max-w-xs p-3'>
                        <div className='space-y-2'>
                          <div className='flex items-start gap-2'>
                            {campaign.type === 'emergency' ? (
                              <AlertCircle className='h-4 w-4 text-red-500 mt-0.5 flex-shrink-0' />
                            ) : (
                              <Check className='h-4 w-4 text-green-500 mt-0.5 flex-shrink-0' />
                            )}
                            <div>
                              <p className='font-medium text-sm mb-1'>
                                {campaign.type === 'normal'
                                  ? 'Chiến dịch thông thường'
                                  : 'Chiến dịch khẩn cấp'}
                              </p>
                              <p className='text-xs text-muted-foreground leading-relaxed'>
                                {campaign.type === 'normal'
                                  ? 'Chiến dịch được lên kế hoạch trước, có thời gian gây quỹ dài hạn và kế hoạch thực hiện chi tiết.'
                                  : 'Chiến dịch cần hỗ trợ gấp do tình huống khẩn cấp, thiên tai hoặc hoàn cảnh đột xuất cần giải quyết nhanh.'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </TooltipContent>
                    </Tooltip>

                    {/* Loại mục tiêu với tooltip */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className='space-y-1 cursor-pointer group -mx-2 -my-1 px-2 py-1 rounded hover:bg-slate-50 transition-colors'>
                          <div className='flex items-center gap-1.5'>
                            <p className='text-xs text-muted-foreground transition-colors'>
                              Loại mục tiêu
                            </p>
                            <AlertCircle className='h-3.5 w-3.5 text-blue-500/70 group-hover:text-blue-600 transition-colors' />
                          </div>
                          <p className='font-medium'>
                            {campaign.fundingType === 'fixed'
                              ? 'Cố định'
                              : 'Linh hoạt'}
                          </p>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side='bottom' className='max-w-sm p-3'>
                        <div className='space-y-1'>
                          <div className='flex items-start gap-2'>
                            {campaign.fundingType === 'fixed' ? (
                              <Target className='h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0' />
                            ) : (
                              <TrendingUp className='h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0' />
                            )}
                            <div>
                              <p className='font-medium text-sm mb-1'>
                                {campaign.fundingType === 'fixed'
                                  ? 'Mục tiêu cố định'
                                  : 'Mục tiêu linh hoạt'}
                              </p>
                              <p className='text-xs text-muted-foreground leading-relaxed'>
                                {campaign.fundingType === 'fixed'
                                  ? 'Chiến dịch chỉ nhận tiền nếu đạt được 100% mục tiêu. Nếu không đạt, tiền sẽ được hoàn trả cho nhà hỗ trợ.'
                                  : 'Chiến dịch nhận mọi khoản quyên góp bất kể có đạt mục tiêu hay không. Phù hợp cho các dự án có thể triển khai theo từng phần.'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </TooltipContent>
                    </Tooltip>

                    <div className='space-y-1 -mx-2 -my-1 px-2 py-1 '>
                      <p className='text-xs text-muted-foreground'>
                        Thời gian dự kiến
                      </p>
                      <p className='font-medium'>
                        {`${formatDate(campaign.startDate)} - ${formatDate(campaign.endDate)}`}
                      </p>
                    </div>
                  </div>
                </TooltipProvider>
              </div>

              <Separator />

              {/* Description */}
              <div className='space-y-4'>
                <h3 className='font-semibold'>Mô tả chiến dịch</h3>
                <p className='text-gray-700 whitespace-pre-wrap'>
                  {campaign.description}
                </p>

                {/* Gallery */}
                {campaign.gallery && campaign.gallery.length > 0 && (
                  <div className='grid grid-cols-2 gap-2 mt-4'>
                    {campaign.gallery.map((image, index) => (
                      <GalleryImage
                        key={image.id}
                        image={image}
                        index={index}
                      />
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Milestones */}
          {campaign.milestones && campaign.milestones.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Các giai đoạn chiến dịch</CardTitle>
                <CardDescription>
                  Kế hoạch thực hiện chi tiết cho chiến dịch
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                {campaign.milestones.map((milestone, index) => (
                  <div key={index} className='space-y-4'>
                    <div className='flex items-start justify-between'>
                      <div className='flex items-start space-x-3'>
                        <div className='flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700'>
                          {index + 1}
                        </div>
                        <div className='flex-1'>
                          <h3 className='font-semibold'>{milestone.title}</h3>
                          <p className='text-sm text-muted-foreground mt-1'>
                            Ngân sách: {formatCurrency(milestone.budget)} VNĐ •
                            Thời gian: {milestone.durationDays} ngày
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className='ml-11 space-y-3'>
                      <RichTextDisplay content={milestone.description} />

                      {/* Documents */}
                      {milestone.documents &&
                        milestone.documents.length > 0 && (
                          <div className='bg-slate-50 border border-slate-200 rounded-lg p-3'>
                            <div className='flex items-center justify-between mb-3'>
                              <div className='flex items-center gap-2'>
                                <FileText className='h-4 w-4 text-slate-600' />
                                <h4 className='font-medium text-slate-800'>
                                  Tài liệu ({milestone.documents.length})
                                </h4>
                              </div>
                            </div>
                            <div className='flex items-center gap-2 flex-wrap'>
                              {milestone.documents.map(doc => (
                                <DocumentButton key={doc.id} document={doc} />
                              ))}
                            </div>
                          </div>
                        )}
                    </div>

                    {index < (campaign.milestones?.length || 0) - 1 && (
                      <Separator />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Community section - Placeholder for now */}
          <Card>
            <CardHeader>
              <CardTitle>Cộng đồng</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue='updates'>
                <TabsList className='w-full'>
                  <TabsTrigger value='updates' className='flex-1'>
                    Bài đăng
                  </TabsTrigger>
                  <TabsTrigger value='donors' className='flex-1'>
                    Người đóng góp ({campaign.donorCount})
                  </TabsTrigger>
                </TabsList>
                <TabsContent value='updates' className='mt-4'>
                  <div className='text-center py-8 text-muted-foreground'>
                    <MessageCircle className='h-12 w-12 mx-auto mb-2 opacity-50' />
                    <p>Chưa có bài đăng nào</p>
                  </div>
                </TabsContent>
                <TabsContent value='donors' className='mt-4'>
                  <div className='text-center py-8 text-muted-foreground'>
                    <Users className='h-12 w-12 mx-auto mb-2 opacity-50' />
                    <p>Chưa có người đóng góp</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - 1/3 width on desktop */}
        <div className='space-y-6 sticky top-6 self-start'>
          {/* Donation card - Only show for fundraising status */}
          {isFundraising && <DonationCard campaign={campaign} />}

          <Card>
            <CardHeader>
              <CardTitle className='text-xl'>Thông tin blockchain</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <span className='text-sm'>Mạng blockchain</span>
                  <Badge variant='outline'>Polygon</Badge>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-sm'>Smart contract</span>
                  <div className='flex items-center gap-1'>
                    <span className='text-xs text-blue-600'>0x1a2...3b4c</span>
                    <Button variant='ghost' size='icon' className='h-5 w-5'>
                      <Copy className='h-3 w-3' />
                    </Button>
                  </div>
                </div>
              </div>
              <div className='space-y-2'>
                <Button variant='outline' size='sm' className='w-full'>
                  <Link
                    href='/transactions'
                    className='flex items-center justify-center gap-2'
                  >
                    <ExternalLink className='h-4 w-4' />
                    <span>Xem tất cả giao dịch</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className='text-xl'>Chiến dịch liên quan</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              {[1, 2, 3].map(i => (
                <Link
                  href={`/campaigns/${i + 10}`}
                  key={i}
                  className='flex items-start space-x-3 group'
                >
                  <img
                    src='https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80'
                    alt={`Chiến dịch ${i}`}
                    className='h-14 w-14 rounded-md object-cover'
                  />
                  <div>
                    <h4 className='text-sm font-medium group-hover:text-blue-600'>
                      {i === 1
                        ? 'Xây thư viện trường làng'
                        : i === 2
                          ? 'Học bổng cho học sinh nghèo'
                          : 'Trang bị máy tính cho trường học'}
                    </h4>
                    <Progress value={40 + i * 15} className='h-1 mt-1' />
                    <p className='text-xs text-muted-foreground mt-1'>
                      {40 + i * 15}% · {(i + 2) * 10} ngày còn lại
                    </p>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>

          {/* Tags */}
          {campaign.tags && campaign.tags.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className='text-xl'>Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='flex flex-wrap gap-2'>
                  {campaign.tags.map((tag, index) => (
                    <Badge key={index} variant='outline'>
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

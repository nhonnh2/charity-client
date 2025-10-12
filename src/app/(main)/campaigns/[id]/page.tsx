'use client';

import Link from 'next/link';
import { useState, use, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
  Clock,
  Copy,
  ExternalLink,
  FileText,
  Heart,
  MessageCircle,
  Share2,
  ThumbsUp,
  TrendingUp,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Upload,
  Plus,
  Receipt,
  AlertCircle,
  ChartBar,
  Image as ImageIcon,
  Download,
  History,
  Target,
  Banknote,
  Calendar as CalendarIcon,
  ArrowLeft,
  Eye,
  Users,
  DollarSign,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import campaignsApiRequest from '@/apiRequests/campaigns';
import { CampaignResponseType } from '@/schemaValidations/campaign.schema';
import { toast } from 'sonner';
import { getApiErrorMessage } from '@/lib/api/errors';

// Helper function to get status badge
function getStatusBadge(status: string) {
  const statusConfig = {
    pending_review: {
      label: 'Chờ duyệt',
      className: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    },
    approved: {
      label: 'Đã duyệt',
      className: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    rejected: {
      label: 'Bị từ chối',
      className: 'bg-red-50 text-red-700 border-red-200',
    },
    fundraising: {
      label: 'Đang gây quỹ',
      className: 'bg-green-50 text-green-700 border-green-200',
    },
    implementation: {
      label: 'Đang triển khai',
      className: 'bg-purple-50 text-purple-700 border-purple-200',
    },
    completed: {
      label: 'Hoàn thành',
      className: 'bg-gray-50 text-gray-700 border-gray-200',
    },
    cancelled: {
      label: 'Đã hủy',
      className: 'bg-gray-50 text-gray-700 border-gray-200',
    },
  };

  const config = statusConfig[status as keyof typeof statusConfig] || {
    label: status,
    className: 'bg-gray-50 text-gray-700 border-gray-200',
  };

  return (
    <Badge variant='outline' className={config.className}>
      {config.label}
    </Badge>
  );
}

// Helper function to get category label
function getCategoryLabel(category: string) {
  const categories: Record<string, string> = {
    education: 'Giáo dục',
    health: 'Y tế',
    environment: 'Môi trường',
    disaster: 'Thiên tai',
    other: 'Khác',
  };
  return categories[category] || category;
}

// Helper function to format currency
function formatCurrency(amount: number) {
  return new Intl.NumberFormat('vi-VN').format(amount);
}

// Helper function to format date - handle both Date and string
function formatDate(date: Date | string) {
  const dateObj = date instanceof Date ? date : new Date(date);
  return new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(dateObj);
}

// Loading skeleton component
function CampaignDetailSkeleton() {
  return (
    <div className='container mx-auto px-4 py-6 max-w-8xl'>
      <div className='mb-4'>
        <Skeleton className='h-10 w-32' />
      </div>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
        <div className='md:col-span-2 space-y-6'>
          <Skeleton className='h-96 w-full rounded-lg' />
          <Skeleton className='h-24 w-full' />
          <Skeleton className='h-64 w-full' />
        </div>
        <div className='space-y-6'>
          <Skeleton className='h-96 w-full' />
          <Skeleton className='h-48 w-full' />
        </div>
      </div>
    </div>
  );
}

// Error display component
function CampaignError({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  const router = useRouter();

  return (
    <div className='container mx-auto px-4 py-12 max-w-2xl'>
      <Card>
        <CardContent className='pt-6'>
          <div className='flex flex-col items-center text-center space-y-4'>
            <div className='rounded-full bg-red-100 p-3'>
              <AlertCircle className='h-6 w-6 text-red-600' />
            </div>
            <div>
              <h3 className='text-lg font-semibold'>
                Không thể tải thông tin chiến dịch
              </h3>
              <p className='text-muted-foreground mt-2'>{message}</p>
            </div>
            <div className='flex gap-2'>
              <Button variant='outline' onClick={() => router.back()}>
                <ArrowLeft className='mr-2 h-4 w-4' />
                Quay lại
              </Button>
              <Button onClick={onRetry}>Thử lại</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function CampaignDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const campaignId = resolvedParams.id;
  const router = useRouter();

  const [campaign, setCampaign] = useState<CampaignResponseType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch campaign data
  const fetchCampaign = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await campaignsApiRequest.getById(campaignId);
      setCampaign(response.data);
    } catch (err: any) {
      const errorMessage = getApiErrorMessage(err);
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaign();
  }, [campaignId]);

  // Show loading state
  if (isLoading) {
    return <CampaignDetailSkeleton />;
  }
  console.log('CampaignDetailPage_____render', error, campaign);
  // Show error state
  if (error || !campaign) {
    return (
      <CampaignError
        message={error || 'Không tìm thấy chiến dịch'}
        onRetry={fetchCampaign}
      />
    );
  }

  // Calculate progress percentage
  const progressPercentage = campaign.targetAmount
    ? Math.round((campaign.currentAmount / campaign.targetAmount) * 100)
    : 0;

  // Calculate days remaining - handle both Date and string
  const endDate =
    campaign.endDate instanceof Date
      ? campaign.endDate
      : new Date(campaign.endDate);
  const daysRemaining = Math.max(
    0,
    Math.ceil(
      (endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    )
  );

  // Check if fundraising is active
  const isFundraising = campaign.status === 'fundraising';
  const isImplementing = campaign.status === 'implementation';

  return (
    <div className='container mx-auto px-4 py-6 max-w-8xl'>
      {/* Back button */}
      <div className='mb-4'>
        <Button variant='ghost' size='sm' onClick={() => router.back()}>
          <ArrowLeft className='mr-2 h-4 w-4' />
          Quay lại danh sách
        </Button>
      </div>

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
                {getCategoryLabel(campaign.category)}
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
            <div className='flex flex-wrap items-center gap-2'>
              <Button
                variant='outline'
                size='sm'
                className='flex items-center gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-colors cursor-pointer'
              >
                <Heart className='h-4 w-4' />
                <span className='font-medium'>0</span>
                <span className='text-xs text-muted-foreground'>Quan tâm</span>
              </Button>
              <Button
                variant='outline'
                size='sm'
                className='flex items-center gap-2 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-colors cursor-pointer'
              >
                <Share2 className='h-4 w-4' />
                <span className='font-medium'>
                  {campaign.shareCount.toLocaleString('vi-VN')}
                </span>
                <span className='text-xs text-muted-foreground'>Chia sẻ</span>
              </Button>
              <Separator
                orientation='vertical'
                className='h-8 mx-1 hidden md:block'
              />
            </div>
          </div>

          {/* Campaign info card */}
          <Card>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <CardTitle>Thông tin chiến dịch</CardTitle>
                {getStatusBadge(campaign.status)}
              </div>
            </CardHeader>
            <CardContent className='space-y-4'>
              {/* Stats grid */}
              <TooltipProvider>
                <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
                  <div className='space-y-1'>
                    <p className='text-xs text-muted-foreground'>Mục tiêu</p>
                    <p className='font-medium'>
                      {formatCurrency(campaign.targetAmount)} VNĐ
                    </p>
                  </div>

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
                          <p className='text-xs  transition-colors'>
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
                      <div className='space-y-2'>
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

                  <div className='space-y-1'>
                    <p className='text-xs text-muted-foreground'>
                      Thời gian dự kiến
                    </p>
                    <p className='font-medium'>
                      {formatDate(campaign.startDate)} -{' '}
                      {formatDate(campaign.endDate)}
                    </p>
                  </div>
                </div>
              </TooltipProvider>

              {/* Progress bar (only show for fundraising status) */}
              {isFundraising && (
                <>
                  <Progress value={progressPercentage} className='h-2' />
                  <div className='flex items-center justify-between text-sm'>
                    <span>{progressPercentage}% đạt được</span>
                    <div className='flex items-center space-x-1'>
                      <Calendar className='h-3 w-3 text-muted-foreground' />
                      <span className='text-muted-foreground'>
                        Kết thúc: {formatDate(campaign.endDate)}
                      </span>
                    </div>
                  </div>
                </>
              )}

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
                      <img
                        key={image.id}
                        src={image.url}
                        alt={image.name || `Gallery image ${index + 1}`}
                        className='rounded-lg object-cover h-48 w-full cursor-pointer hover:opacity-90 transition-opacity'
                        onClick={() => window.open(image.url, '_blank')}
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
                      <p className='text-gray-700'>{milestone.description}</p>

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
                                <Button
                                  key={doc.id}
                                  variant='outline'
                                  size='sm'
                                  className='flex items-center gap-1'
                                  onClick={() => window.open(doc.url, '_blank')}
                                >
                                  <Download className='h-4 w-4' />
                                  <span className='max-w-[200px] truncate'>
                                    {doc.name}
                                  </span>
                                </Button>
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
          {isFundraising && (
            <Card>
              <CardHeader>
                <CardTitle>Đóng góp cho chiến dịch</CardTitle>
                <CardDescription>
                  Mọi đóng góp đều được ghi lại trên blockchain để đảm bảo tính
                  minh bạch
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-2'>
                  <label className='text-sm font-medium'>
                    Số tiền đóng góp (VNĐ)
                  </label>
                  <div className='grid grid-cols-3 gap-2'>
                    <Button variant='outline' className='w-full'>
                      100K
                    </Button>
                    <Button variant='outline' className='w-full'>
                      500K
                    </Button>
                    <Button variant='outline' className='w-full'>
                      1M
                    </Button>
                  </div>
                  <input
                    type='text'
                    placeholder='Nhập số tiền khác...'
                    className='w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
                  />
                </div>

                <div className='space-y-2'>
                  <label className='text-sm font-medium'>
                    Lời nhắn (tùy chọn)
                  </label>
                  <textarea
                    placeholder='Nhập lời nhắn của bạn...'
                    className='w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
                    rows={3}
                  />
                </div>

                <Button className='w-full bg-green-600 hover:bg-green-700'>
                  <Wallet className='mr-2 h-4 w-4' />
                  Đóng góp ngay
                </Button>

                <p className='text-xs text-center text-muted-foreground'>
                  Bằng cách đóng góp, bạn đồng ý với{' '}
                  <Link href='#' className='underline'>
                    điều khoản sử dụng
                  </Link>
                </p>
              </CardContent>
            </Card>
          )}
          {isFundraising ? (
            <Card>
              <CardHeader>
                <CardTitle className='text-lg'>Thông tin thêm</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <TooltipProvider>
                  <div className='flex items-center justify-between text-sm'>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className='flex items-center gap-1 cursor-pointer'>
                          <span className='text-muted-foreground'>
                            Loại chiến dịch
                          </span>
                          <AlertCircle className='h-3 w-3 text-muted-foreground' />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side='left' className='max-w-xs'>
                        <p className='font-semibold mb-1'>
                          {campaign.type === 'normal'
                            ? 'Chiến dịch thông thường'
                            : 'Chiến dịch khẩn cấp'}
                        </p>
                        <p className='text-xs'>
                          {campaign.type === 'normal'
                            ? 'Chiến dịch được lên kế hoạch trước, có thời gian gây quỹ dài hạn và kế hoạch thực hiện chi tiết.'
                            : 'Chiến dịch cần hỗ trợ gấp do tình huống khẩn cấp, thiên tai hoặc hoàn cảnh đột xuất cần giải quyết nhanh.'}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                    <Badge
                      variant='outline'
                      className={
                        campaign.type === 'emergency'
                          ? 'bg-red-50 text-red-700 border-red-200'
                          : ''
                      }
                    >
                      {campaign.type === 'normal' ? 'Thông thường' : 'Khẩn cấp'}
                    </Badge>
                  </div>

                  <div className='flex items-center justify-between text-sm'>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className='flex items-center gap-1 cursor-pointer'>
                          <span className='text-muted-foreground'>
                            Mục tiêu quyên góp
                          </span>
                          <AlertCircle className='h-3 w-3 text-muted-foreground' />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side='left' className='max-w-xs'>
                        <p className='font-semibold mb-1'>
                          {campaign.fundingType === 'fixed'
                            ? 'Mục tiêu cố định'
                            : 'Mục tiêu linh hoạt'}
                        </p>
                        <p className='text-xs'>
                          {campaign.fundingType === 'fixed'
                            ? 'Chiến dịch chỉ nhận tiền nếu đạt được 100% mục tiêu. Nếu không đạt, tiền sẽ được hoàn trả cho nhà hỗ trợ.'
                            : 'Chiến dịch nhận mọi khoản quyên góp bất kể có đạt mục tiêu hay không. Phù hợp cho các dự án có thể triển khai theo từng phần.'}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                    <Badge
                      variant='outline'
                      className={
                        campaign.fundingType === 'flexible'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : ''
                      }
                    >
                      {campaign.fundingType === 'fixed'
                        ? 'Cố định'
                        : 'Linh hoạt'}
                    </Badge>
                  </div>
                </TooltipProvider>

                <Separator />

                <div className='flex items-center justify-between text-sm'>
                  <span className='text-muted-foreground'>Danh mục</span>
                  <span className='font-medium'>
                    {getCategoryLabel(campaign.category)}
                  </span>
                </div>

                <Separator />

                <div className='flex items-center justify-between text-sm'>
                  <span className='text-muted-foreground'>
                    Ngày bắt đầu dự kiến
                  </span>
                  <span className='font-medium'>
                    {formatDate(campaign.startDate)}
                  </span>
                </div>

                <div className='flex items-center justify-between text-sm'>
                  <span className='text-muted-foreground'>
                    Ngày kết thúc dự kiến
                  </span>
                  <span className='font-medium'>
                    {formatDate(campaign.endDate)}
                  </span>
                </div>

                <Separator />

                <div className='flex items-center justify-between text-sm'>
                  <span className='text-muted-foreground'>Ngày tạo</span>
                  <span className='font-medium'>
                    {formatDate(campaign.createdAt)}
                  </span>
                </div>
                <div className='flex items-center justify-between text-sm'>
                  <span className='text-muted-foreground'>
                    Cập nhật lần cuối
                  </span>
                  <span className='font-medium'>
                    {formatDate(campaign.updatedAt)}
                  </span>
                </div>
              </CardContent>
            </Card>
          ) : null}

          <Card>
            <CardHeader>
              <CardTitle className='text-lg'>Thông tin blockchain</CardTitle>
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
              <CardTitle className='text-lg'>Chiến dịch liên quan</CardTitle>
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
                <CardTitle className='text-lg'>Tags</CardTitle>
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

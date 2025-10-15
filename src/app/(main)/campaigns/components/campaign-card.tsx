import Link from 'next/link';
import { Progress } from '@/components/ui/progress';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wallet, Users, TrendingUp, DollarSign, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CampaignStatusType } from '@/schemaValidations/campaign.schema';
import { campaignCategoryLabels } from '@/constants/campaign';

interface CampaignCardProps {
  id: string | number;
  title: string;
  description: string;
  imageSrc?: string;
  raised: number;
  goal: number;
  progress: number;
  status?: CampaignStatusType;
  disabledStatus?: boolean;
  // Props cho trạng thái chờ duyệt
  interestedCount?: number;
  // Props cho trạng thái đang triển khai
  phase?: string;
  totalPhases?: number;
  currentPhase?: number;
  spent?: number;
  budget?: number;
  variant?: 'default' | 'compact' | 'list';
  className?: string;
  colorScheme?: 'primary' | 'accent' | 'gradient';
  // Props cho category
  category?: string;
}

export function CampaignCard({
  id,
  title,
  description,
  imageSrc,
  raised,
  goal,
  progress,
  status,
  interestedCount = 0,
  disabledStatus = false,
  totalPhases,
  currentPhase,
  spent = 0,
  variant = 'default',
  category,
  className = '',
}: CampaignCardProps) {
  const formattedRaised = new Intl.NumberFormat('vi-VN').format(raised);
  const formattedGoal = new Intl.NumberFormat('vi-VN').format(goal);
  const formattedSpent = new Intl.NumberFormat('vi-VN').format(spent);

  // Function để render status badge
  const renderStatusBadge = () => {
    if (disabledStatus) {
      return null;
    }
    switch (status) {
      case 'pending_review':
        return (
          <Badge
            variant='outline'
            className='bg-yellow-50 text-yellow-700 border-yellow-200'
          >
            Chờ duyệt
          </Badge>
        );
      case 'fundraising':
        return (
          <Badge
            variant='outline'
            className='bg-blue-50 text-blue-700 border-blue-200'
          >
            Đang đóng góp
          </Badge>
        );
      case 'implementation':
        return (
          <Badge
            variant='outline'
            className='bg-green-50 text-green-700 border-green-200'
          >
            Đang triển khai
          </Badge>
        );
      default:
        return null;
    }
  };

  // Function để render thông tin theo trạng thái với structure cố định
  const renderMainInfo = () => {
    switch (status) {
      case 'pending_review':
        return (
          <div className='space-y-3'>
            <div className='flex items-center justify-between text-sm'>
              <div className='flex items-center space-x-1 text-muted-foreground'>
                <Users className='h-4 w-4' />
                <span>Người quan tâm</span>
              </div>
              <span className='font-medium'>{interestedCount}</span>
            </div>
            <div className='flex items-center justify-between text-sm'>
              <div className='text-muted-foreground'>Mục tiêu</div>
              <span className='font-medium'>{formattedGoal} VNĐ</span>
            </div>
          </div>
        );
      case 'fundraising':
        return (
          <div className='space-y-3'>
            <div className='flex items-center justify-between text-sm'>
              <div className='text-muted-foreground'>% hoàn thành</div>
              <span className='font-medium'>{progress}%</span>
            </div>
            <div className='flex items-center justify-between text-sm'>
              <div className='text-muted-foreground'>Đã quyên góp</div>
              <span className='font-medium'>{formattedRaised} VNĐ</span>
            </div>
          </div>
        );
      case 'implementation':
        return (
          <div className='space-y-3'>
            <div className='flex items-center justify-between text-sm'>
              <div className='text-muted-foreground'>Giai đoạn hiện tại</div>
              <span className='font-medium'>
                {currentPhase}/{totalPhases}
              </span>
            </div>
            <div className='flex items-center justify-between text-sm'>
              <div className='flex items-center space-x-1 text-muted-foreground'>
                <DollarSign className='h-4 w-4' />
                <span>Đã chi tiêu</span>
              </div>
              <span className='font-medium'>{formattedSpent} VNĐ</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Render list variant
  if (variant === 'list') {
    return (
      <Link href={`/campaigns/${id}`} className={`block ${className}`}>
        <Card className='overflow-hidden hover:shadow-xl hover:shadow-gray-100/50 transition-all duration-200 hover:border-primary/30 group bg-white border border-gray-200 shadow-sm'>
          <div className='flex flex-col md:flex-row md:h-44 pb-4'>
            <div className='md:w-60 md:h-full'>
              <img
                src={imageSrc || '/placeholder-image.jpg'}
                alt={title}
                className='w-full h-48 md:h-full object-cover'
              />
            </div>
            <div className='flex-1 p-4 pb-6 flex flex-col justify-between min-h-0'>
              <div>
                <div className='mb-2 flex flex-wrap items-start gap-2'>
                  {category && (
                    <Badge
                      variant='outline'
                      className='bg-accent/10 text-accent border-accent/20'
                    >
                      {
                        campaignCategoryLabels[
                          category as keyof typeof campaignCategoryLabels
                        ]
                      }
                    </Badge>
                  )}
                  {renderStatusBadge()}
                </div>

                <h3 className='mb-2 text-lg font-semibold group-hover:text-primary transition-colors line-clamp-1'>
                  {title}
                </h3>
                <p className='mb-3 text-sm text-muted-foreground line-clamp-1'>
                  {description}
                </p>
              </div>

              {/* Thông tin cơ bản theo trạng thái */}
              <div className='space-y-2 mt-auto'>
                {status === 'pending_review' && (
                  <>
                    {/* Chờ duyệt: Người quan tâm và Mục tiêu */}
                    <div className='flex items-center justify-between text-sm'>
                      <div className='flex items-center gap-1 text-muted-foreground'>
                        <Users className='h-4 w-4' />
                        Người quan tâm
                      </div>
                      <span className='font-medium'>{interestedCount}</span>
                    </div>
                    <div className='flex items-center justify-between text-sm'>
                      <div className='text-muted-foreground'>Mục tiêu</div>
                      <span className='font-medium'>{formattedGoal} VNĐ</span>
                    </div>
                  </>
                )}

                {status === 'fundraising' && (
                  <>
                    {/* Đang đóng góp: % hoàn thành và Đã quyên góp */}
                    <div className='flex items-center justify-between text-sm'>
                      <div className='text-muted-foreground'>% hoàn thành</div>
                      <span className='font-medium'>{progress}%</span>
                    </div>
                    <div className='flex items-center justify-between text-sm'>
                      <div className='text-muted-foreground'>Đã quyên góp</div>
                      <span className='font-medium'>{formattedRaised} VNĐ</span>
                    </div>
                  </>
                )}

                {status === 'implementation' && (
                  <>
                    {/* Đang triển khai: Giai đoạn hiện tại và Đã chi tiêu */}
                    <div className='flex items-center justify-between text-sm'>
                      <div className='text-muted-foreground'>
                        Giai đoạn hiện tại
                      </div>
                      <span className='font-medium'>
                        {currentPhase}/{totalPhases}
                      </span>
                    </div>
                    <div className='flex items-center justify-between text-sm'>
                      <div className='flex items-center gap-1 text-muted-foreground'>
                        <DollarSign className='h-4 w-4' />
                        Đã chi tiêu
                      </div>
                      <span className='font-medium'>{formattedSpent} VNĐ</span>
                    </div>
                  </>
                )}

                {/* Fallback cho các trạng thái khác */}
                {status &&
                  !['pending_review', 'fundraising', 'implementation'].includes(
                    status
                  ) && (
                    <>
                      <div className='flex items-center justify-between text-sm'>
                        <div className='text-muted-foreground'>
                          % hoàn thành
                        </div>
                        <span className='font-medium'>{progress}%</span>
                      </div>
                      <div className='flex items-center justify-between text-sm'>
                        <div className='text-muted-foreground'>
                          Đã quyên góp
                        </div>
                        <span className='font-medium'>
                          {formattedRaised} VNĐ
                        </span>
                      </div>
                    </>
                  )}
              </div>
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  // Render default grid variant
  return (
    <Link href={`/campaigns/${id}`} className={`block h-full ${className}`}>
      <Card className='h-full bg-white border border-gray-200 hover:shadow-xl hover:shadow-gray-100/50 transition-all duration-200 hover:border-primary/30 group flex flex-col shadow-sm'>
        <div className='relative'>
          <img
            src={
              imageSrc ||
              `/placeholder.svg?height=200&width=400&text=Campaign${id}`
            }
            alt={title}
            className='w-full h-40 object-cover rounded-t-lg'
          />
          <div className='absolute top-2 right-2'>{renderStatusBadge()}</div>
        </div>

        <CardHeader className='pt-4'>
          <CardTitle className='text-base text-foreground group-hover:text-primary transition-colors line-clamp-2 min-h-[3rem]'>
            {title}
          </CardTitle>
          <CardDescription className='line-clamp-2 min-h-[2.5rem]'>
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className='pb-3 pt-0 flex-1 flex flex-col justify-center'>
          {renderMainInfo()}
          {/* Loại bỏ progress bar cho funding và thêm spacer đồng đều cho tất cả */}
          <div className='h-2'></div>
        </CardContent>

        <CardFooter className='pt-0 mt-auto'>
          <Button
            size='sm'
            variant='outline'
            className='w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors'
          >
            <Eye className='mr-2 h-4 w-4' />
            Xem chi tiết
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}

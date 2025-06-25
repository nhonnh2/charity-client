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

type CampaignStatus = 'pending' | 'funding' | 'implementing';

interface CampaignCardProps {
  id: string | number;
  title: string;
  description: string;
  imageSrc?: string;
  raised: number;
  goal: number;
  progress: number;
  status: CampaignStatus;
  // Props cho trạng thái chờ duyệt
  interestedCount?: number;
  // Props cho trạng thái đang triển khai
  phase?: string;
  totalPhases?: number;
  currentPhase?: number;
  spent?: number;
  budget?: number;
  variant?: 'default' | 'compact';
  className?: string;
  colorScheme?: 'primary' | 'accent' | 'gradient';
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
  phase,
  totalPhases,
  currentPhase,
  spent = 0,
  budget = 0,
  variant = 'default',
  className = '',
  colorScheme = 'accent',
}: CampaignCardProps) {
  const formattedRaised = new Intl.NumberFormat('vi-VN').format(raised);
  const formattedGoal = new Intl.NumberFormat('vi-VN').format(goal);
  const formattedSpent = new Intl.NumberFormat('vi-VN').format(spent);

  // Function để render status badge
  const renderStatusBadge = () => {
    switch (status) {
      case 'pending':
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Chờ duyệt
          </Badge>
        );
      case 'funding':
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Đang đóng góp
          </Badge>
        );
      case 'implementing':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Đang triển khai
          </Badge>
        );
      default:
        return null;
    }
  };

  // Function để render thông tin theo trạng thái với structure cố định
  const renderMainInfo = () => {
    return (
      <div className="space-y-3">
        {/* Dòng 1: Thông tin chính */}
        <div className="flex items-center justify-between text-sm">
          {status === 'pending' && (
            <>
              <div className="flex items-center space-x-1 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>Người quan tâm</span>
              </div>
              <span className="font-medium">{interestedCount}</span>
            </>
          )}

          {status === 'funding' && (
            <>
              <div className="text-muted-foreground">% hoàn thành</div>
              <span className="font-medium">{progress}%</span>
            </>
          )}

          {status === 'implementing' && (
            <>
              <div className="text-muted-foreground">Giai đoạn hiện tại</div>
              <span className="font-medium">{currentPhase}/{totalPhases}</span>
            </>
          )}
        </div>

        {/* Dòng 2: Thông tin thứ hai */}
        <div className="flex items-center justify-between text-sm">
          {status === 'pending' && (
            <>
              <div className="text-muted-foreground">Mục tiêu</div>
              <span className="font-medium">{formattedGoal} VNĐ</span>
            </>
          )}

          {status === 'funding' && (
            <>
              <div className="text-muted-foreground">Đã quyên góp</div>
              <span className="font-medium">{formattedRaised} VNĐ</span>
            </>
          )}

          {status === 'implementing' && (
            <>
              <div className="flex items-center space-x-1 text-muted-foreground">
                <DollarSign className="h-4 w-4" />
                <span>Đã chi tiêu</span>
              </div>
              <span className="font-medium">{formattedSpent} VNĐ</span>
            </>
          )}
        </div>

        {/* Loại bỏ progress bar cho funding và thêm spacer đồng đều cho tất cả */}
        <div className="h-2"></div>
      </div>
    );
  };

  if (variant === 'compact') {
    return (
      <Link href={`/campaigns/${id}`} className={`block group ${className}`}>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <img
              src={
                imageSrc ||
                `/placeholder.svg?height=60&width=60&text=Campaign${id}`
              }
              alt={title}
              className="h-12 w-12 rounded-md object-cover group-hover:shadow-md transition-shadow"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-medium group-hover:text-primary transition-colors truncate">
                  {title}
                </h4>
                {renderStatusBadge()}
              </div>
              <p className="text-xs text-muted-foreground">
                {status === 'pending' ? `${interestedCount} người quan tâm` :
                  status === 'funding' ? `${progress}% hoàn thành` :
                    `Giai đoạn ${currentPhase}/${totalPhases}`}
              </p>
            </div>
          </div>
          {status === 'funding' && (
            <div className="relative h-1 w-full bg-muted overflow-hidden rounded-full">
              <div
                className={cn('absolute top-0 left-0 h-full rounded-full', {
                  'bg-accent': colorScheme === 'accent',
                  'bg-primary': colorScheme === 'primary',
                  'bg-gradient-to-r from-accent to-primary':
                    colorScheme === 'gradient',
                })}
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/campaigns/${id}`} className={`block h-full ${className}`}>
      <Card className="h-full bg-white border border-gray-200 hover:shadow-xl hover:shadow-gray-100/50 transition-all duration-200 hover:border-primary/30 group flex flex-col shadow-sm">
        <div className="relative">
          <img
            src={imageSrc || `/placeholder.svg?height=200&width=400&text=Campaign${id}`}
            alt={title}
            className="w-full h-40 object-cover rounded-t-lg"
          />
          <div className="absolute top-2 right-2">
            {renderStatusBadge()}
          </div>
        </div>

        <CardHeader className="pb-2 pt-4">
          <CardTitle className="text-base text-foreground group-hover:text-primary transition-colors line-clamp-2 min-h-[3rem]">
            {title}
          </CardTitle>
          <CardDescription className="line-clamp-2 min-h-[2.5rem]">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="pb-3 pt-0 flex-1 flex flex-col justify-center">
          {renderMainInfo()}
        </CardContent>

        <CardFooter className="pt-0 mt-auto">
          <Button
            size="sm"
            variant="outline"
            className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
          >
            <Eye className="mr-2 h-4 w-4" />
            Xem chi tiết
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}

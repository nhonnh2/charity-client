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
import { Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CampaignCardProps {
  id: string | number;
  title: string;
  description: string;
  imageSrc?: string;
  raised: number;
  goal: number;
  progress: number;
  phase?: string;
  totalPhases?: number;
  currentPhase?: number;
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
  phase,
  totalPhases,
  currentPhase,
  variant = 'default',
  className = '',
  colorScheme = 'accent',
}: CampaignCardProps) {
  const formattedRaised = new Intl.NumberFormat('vi-VN').format(raised);
  const formattedGoal = new Intl.NumberFormat('vi-VN').format(goal);

  // Tạo style cho thanh progress bar dựa vào colorScheme
  const progressClasses = cn('h-1', {
    'bg-accent': colorScheme === 'accent',
    'bg-primary': colorScheme === 'primary',
    'bg-gradient-to-r from-accent to-primary': colorScheme === 'gradient',
  });

  // Tùy chỉnh để thanh Progress sử dụng màu được chọn
  const progressStyles =
    colorScheme === 'gradient'
      ? ({ '--progress-background': 'transparent' } as React.CSSProperties)
      : {};

  if (variant === 'compact') {
    return (
      <div className={`space-y-2 group ${className}`}>
        <div className="flex items-center space-x-2">
          <img
            src={
              imageSrc ||
              `/placeholder.svg?height=60&width=60&text=Campaign${id}`
            }
            alt={title}
            className="h-12 w-12 rounded-md object-cover group-hover:shadow-md transition-shadow"
          />
          <div>
            <h4 className="text-sm font-medium group-hover:text-primary transition-colors">
              {title}
            </h4>
            <p className="text-xs text-muted-foreground">
              {progress}% hoàn thành
            </p>
          </div>
        </div>
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
      </div>
    );
  }

  return (
    <Card className={`bg-background border border-border/50 ${className}`}>
      {imageSrc && (
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-40 object-cover rounded-t-lg"
        />
      )}
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="text-base text-foreground">{title}</CardTitle>
        <CardDescription>
          {phase && (
            <>
              Giai đoạn {currentPhase}/{totalPhases} - {phase}
            </>
          )}
          {!phase && description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-3 pt-0">
        <div className="relative h-2 w-full bg-muted overflow-hidden rounded-full mb-2">
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
        <div className="flex justify-between text-sm">
          <span>{formattedRaised} VNĐ</span>
          <span className="text-muted-foreground">/ {formattedGoal} VNĐ</span>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button
          size="sm"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Wallet className="mr-2 h-4 w-4" />
          Đóng góp ngay
        </Button>
      </CardFooter>
    </Card>
  );
}

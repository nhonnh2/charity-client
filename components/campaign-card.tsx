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
}: CampaignCardProps) {
  const formattedRaised = new Intl.NumberFormat('vi-VN').format(raised);
  const formattedGoal = new Intl.NumberFormat('vi-VN').format(goal);

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
        <Progress value={progress} className="h-1" />
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
        <Progress value={progress} className="h-2 mb-2" />
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

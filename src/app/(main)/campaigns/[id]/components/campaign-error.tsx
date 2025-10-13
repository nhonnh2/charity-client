'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, ArrowLeft } from 'lucide-react';

interface CampaignErrorProps {
  message: string;
  onRetry?: () => void;
}

export default function CampaignError({
  message,
  onRetry,
}: CampaignErrorProps) {
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
              {onRetry && <Button onClick={onRetry}>Thử lại</Button>}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

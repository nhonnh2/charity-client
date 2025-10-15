'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface CampaignStatsProps {
  total: number;
  current: number;
  totalPages: number;
  displayedCount: number;
  loading: boolean;
}

export function CampaignStats({
  total,
  current,
  totalPages,
  displayedCount,
  loading,
}: CampaignStatsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-lg'>Thống kê</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='flex items-center justify-between'>
          <span className='text-sm'>Tổng số chiến dịch</span>
          <span className='font-medium'>{total}</span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-sm'>Trang hiện tại</span>
          <span className='font-medium'>
            {current}/{totalPages}
          </span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-sm'>Hiển thị</span>
          <span className='font-medium'>{displayedCount} chiến dịch</span>
        </div>
        {loading && (
          <div className='flex items-center justify-center py-2'>
            <Loader2 className='h-4 w-4 animate-spin' />
            <span className='ml-2 text-sm text-muted-foreground'>
              Đang tải...
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

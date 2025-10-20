'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Wallet } from 'lucide-react';
import { CampaignDataSchema } from '@/schemaValidations/campaign.schema';
import { z } from 'zod';

interface DonationCardProps {
  campaign: z.infer<typeof CampaignDataSchema>;
}

export default function DonationCard({ campaign }: DonationCardProps) {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const quickAmounts = ['100000', '500000', '1000000'];

  const handleDonate = () => {
    // TODO: Implement donation logic
    console.log('Donating:', { amount, message, campaignId: campaign.id });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-lg'>Đóng góp cho chiến dịch</CardTitle>
        <CardDescription>
          Mọi đóng góp đều được ghi lại trên blockchain để đảm bảo tính minh
          bạch
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='space-y-2'>
          <label className='text-sm font-medium'>Số tiền đóng góp (VNĐ)</label>
          <div className='grid grid-cols-3 gap-2'>
            {quickAmounts.map(quickAmount => (
              <Button
                key={quickAmount}
                variant='outline'
                className='w-full'
                onClick={() => setAmount(quickAmount)}
              >
                {parseInt(quickAmount) >= 1000000
                  ? `${parseInt(quickAmount) / 1000000}M`
                  : `${parseInt(quickAmount) / 1000}K`}
              </Button>
            ))}
          </div>
          <input
            type='text'
            placeholder='Nhập số tiền khác...'
            value={amount}
            onChange={e => setAmount(e.target.value)}
            className='w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
          />
        </div>

        <div className='space-y-2'>
          <label className='text-sm font-medium'>Lời nhắn (tùy chọn)</label>
          <textarea
            placeholder='Nhập lời nhắn của bạn...'
            value={message}
            onChange={e => setMessage(e.target.value)}
            className='w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
            rows={3}
          />
        </div>

        <Button
          className='w-full bg-green-600 hover:bg-green-700'
          onClick={handleDonate}
        >
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
  );
}

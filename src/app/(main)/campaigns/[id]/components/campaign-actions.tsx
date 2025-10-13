'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Heart, Share2 } from 'lucide-react';
import { CampaignResponseType } from '@/schemaValidations/campaign.schema';

interface CampaignActionsProps {
  campaign: CampaignResponseType;
}

export default function CampaignActions({ campaign }: CampaignActionsProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => (isLiked ? prev - 1 : prev + 1));
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: campaign.title,
          text: campaign.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className='flex flex-wrap items-center gap-2'>
      <Button
        variant='outline'
        size='sm'
        onClick={handleLike}
        className={`flex items-center gap-2 transition-colors cursor-pointer ${
          isLiked
            ? 'bg-red-50 text-red-600 border-red-300'
            : 'hover:bg-red-50 hover:text-red-600 hover:border-red-300'
        }`}
      >
        <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
        <span className='font-medium'>{likeCount}</span>
        <span className='text-xs text-muted-foreground'>Quan tâm</span>
      </Button>
      <Button
        variant='outline'
        size='sm'
        onClick={handleShare}
        className='flex items-center gap-2 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-colors cursor-pointer'
      >
        <Share2 className='h-4 w-4' />
        <span className='font-medium'>
          {campaign.shareCount.toLocaleString('vi-VN')}
        </span>
        <span className='text-xs text-muted-foreground'>Chia sẻ</span>
      </Button>
      <Separator orientation='vertical' className='h-8 mx-1 hidden md:block' />
    </div>
  );
}

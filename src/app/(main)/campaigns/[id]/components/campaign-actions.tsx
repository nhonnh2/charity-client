'use client';

import { useCallback, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Heart, Share2 } from 'lucide-react';
import { CampaignDataSchema } from '@/schemaValidations/campaign.schema';
import { z } from 'zod';
import {
  useMutationFollowCampaign,
  useMutationUnfollowCampaign,
  useQueryFollowStatus,
} from '@/hooks/campaigns';

interface CampaignActionsProps {
  campaign: z.infer<typeof CampaignDataSchema>;
}

export default function CampaignActions({ campaign }: CampaignActionsProps) {
  const { data: followStatus } = useQueryFollowStatus({
    campaignId: campaign.id,
  });

  // Local state for followers count
  const [localFollowersCount, setLocalFollowersCount] = useState(
    campaign.followersCount || 0
  );

  // Update local state when campaign prop changes
  useEffect(() => {
    setLocalFollowersCount(campaign.followersCount || 0);
  }, [campaign.followersCount]);

  const followMutation = useMutationFollowCampaign();
  const unfollowMutation = useMutationUnfollowCampaign();

  const handleToggleFollow = useCallback(async () => {
    const currentlyFollowing = Boolean(followStatus?.isFollowing);
    if (!currentlyFollowing) {
      // Optimistic update
      const previousCount = localFollowersCount;
      setLocalFollowersCount((prev: number) => prev + 1);

      followMutation.mutate(campaign.id, {
        onError: () => {
          // Rollback on error
          setLocalFollowersCount(previousCount);
        },
      });
    } else {
      // Optimistic update
      const previousCount = localFollowersCount;
      setLocalFollowersCount((prev: number) => Math.max(0, prev - 1));

      unfollowMutation.mutate(campaign.id, {
        onError: () => {
          // Rollback on error
          setLocalFollowersCount(previousCount);
        },
      });
    }
  }, [
    campaign.id,
    followStatus?.isFollowing,
    localFollowersCount,
    followMutation,
    unfollowMutation,
  ]);

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
        onClick={handleToggleFollow}
        disabled={followMutation.isPending || unfollowMutation.isPending}
        className={`flex items-center gap-2 transition-colors cursor-pointer ${
          followStatus?.isFollowing
            ? 'bg-red-50 text-red-600 border-red-300'
            : 'hover:bg-red-50 hover:text-red-600 hover:border-red-300'
        }`}
      >
        <Heart
          className={`h-4 w-4 ${followStatus?.isFollowing ? 'fill-current' : ''}`}
        />
        <span className='font-medium'>{localFollowersCount}</span>
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
          {(campaign.shareCount || 0).toLocaleString('vi-VN')}
        </span>
        <span className='text-xs text-muted-foreground'>Chia sẻ</span>
      </Button>
      <Separator orientation='vertical' className='h-8 mx-1 hidden md:block' />
    </div>
  );
}

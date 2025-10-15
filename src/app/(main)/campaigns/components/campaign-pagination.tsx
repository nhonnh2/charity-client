'use client';

import { Button } from '@/components/ui/button';

interface CampaignPaginationProps {
  current: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function CampaignPagination({
  current,
  totalPages,
  onPageChange,
}: CampaignPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className='mt-6 flex items-center justify-between'>
      <Button
        variant='outline'
        size='sm'
        disabled={current <= 1}
        onClick={() => onPageChange(current - 1)}
      >
        Trang trước
      </Button>
      <div className='flex items-center space-x-2'>
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          const pageNum = i + 1;
          return (
            <Button
              key={pageNum}
              variant={current === pageNum ? 'default' : 'outline'}
              size='sm'
              className='h-8 w-8 p-0'
              onClick={() => onPageChange(pageNum)}
            >
              {pageNum}
            </Button>
          );
        })}
        {totalPages > 5 && (
          <>
            <span>...</span>
            <Button
              variant='outline'
              size='sm'
              className='h-8 w-8 p-0'
              onClick={() => onPageChange(totalPages)}
            >
              {totalPages}
            </Button>
          </>
        )}
      </div>
      <Button
        variant='outline'
        size='sm'
        disabled={current >= totalPages}
        onClick={() => onPageChange(current + 1)}
      >
        Trang sau
      </Button>
    </div>
  );
}

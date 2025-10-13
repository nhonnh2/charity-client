'use client';

import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface DocumentButtonProps {
  document: {
    id: string;
    name: string;
    url: string;
  };
}

export default function DocumentButton({ document }: DocumentButtonProps) {
  const handleClick = () => {
    window.open(document.url, '_blank');
  };

  return (
    <Button
      variant='outline'
      size='sm'
      className='flex items-center gap-1'
      onClick={handleClick}
    >
      <Download className='h-4 w-4' />
      <span className='max-w-[200px] truncate'>{document.name}</span>
    </Button>
  );
}

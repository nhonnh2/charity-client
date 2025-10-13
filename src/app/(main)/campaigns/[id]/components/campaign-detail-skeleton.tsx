import { Skeleton } from '@/components/ui/skeleton';
type Props = {};

const CampaignDetailSkeleton = (props: Props) => {
  return (
    <div className='container mx-auto px-4 py-6 max-w-8xl'>
      <div className='mb-4'>
        <Skeleton className='h-10 w-32' />
      </div>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
        <div className='md:col-span-2 space-y-6'>
          <Skeleton className='h-96 w-full rounded-lg' />
          <Skeleton className='h-24 w-full' />
          <Skeleton className='h-64 w-full' />
        </div>
        <div className='space-y-6'>
          <Skeleton className='h-96 w-full' />
          <Skeleton className='h-48 w-full' />
        </div>
      </div>
    </div>
  );
};

export default CampaignDetailSkeleton;

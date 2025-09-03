import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function HowItWorksLoading() {
  return (
    <div className='container max-w-7xl mx-auto px-4 py-8'>
      <div className='space-y-2 mb-8'>
        <Skeleton className='h-10 w-3/4 sm:w-1/2' />
        <Skeleton className='h-6 w-full sm:w-3/4' />
      </div>

      <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12'>
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <Card key={i}>
              <CardContent className='pt-6'>
                <div className='flex gap-4'>
                  <Skeleton className='h-12 w-12 rounded-full' />
                  <div className='space-y-2 flex-1'>
                    <Skeleton className='h-6 w-3/4' />
                    <Skeleton className='h-4 w-full' />
                    <Skeleton className='h-4 w-2/3' />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      <div className='mb-16'>
        <Card>
          <CardHeader>
            <Skeleton className='h-8 w-1/3' />
            <Skeleton className='h-4 w-1/2' />
          </CardHeader>
          <CardContent>
            <div className='space-y-12'>
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className='relative grid gap-4 md:grid-cols-5 md:gap-8'
                  >
                    <div className='md:col-span-2'>
                      <Card>
                        <CardContent className='p-4'>
                          <Skeleton className='h-4 w-16 mb-2' />
                          <Skeleton className='h-5 w-3/4' />
                          <Skeleton className='h-4 w-full mt-2' />
                        </CardContent>
                      </Card>
                    </div>
                    <div className='md:col-span-1 flex justify-center'>
                      <Skeleton className='h-8 w-8 rounded-full' />
                    </div>
                    <div className='md:col-span-2'></div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className='mb-16'>
        <Card>
          <CardHeader>
            <Skeleton className='h-8 w-1/3' />
            <Skeleton className='h-4 w-1/2' />
          </CardHeader>
          <CardContent>
            <Skeleton className='h-10 w-full mb-6' />
            <div className='grid md:grid-cols-2 gap-8'>
              <div className='space-y-4'>
                <Skeleton className='h-6 w-1/2' />
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-3/4' />
                <div className='space-y-3 mt-4'>
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className='flex items-start'>
                        <Skeleton className='h-5 w-5 mr-2 mt-0.5' />
                        <Skeleton className='h-4 w-full' />
                      </div>
                    ))}
                </div>
              </div>
              <div className='flex items-center justify-center'>
                <Skeleton className='h-64 w-full rounded-lg' />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className='mb-16'>
        <Card>
          <CardHeader>
            <Skeleton className='h-8 w-1/3' />
            <Skeleton className='h-4 w-1/2' />
          </CardHeader>
          <CardContent>
            <div className='grid md:grid-cols-2 gap-8 items-center'>
              <div className='space-y-4'>
                <Skeleton className='h-6 w-1/2' />
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-full' />
                <div className='space-y-3 mt-4'>
                  {Array(3)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className='flex items-start'>
                        <Skeleton className='h-5 w-5 mr-2 mt-0.5' />
                        <Skeleton className='h-4 w-full' />
                      </div>
                    ))}
                </div>
                <Skeleton className='h-10 w-40 mt-2' />
              </div>
              <div className='flex items-center justify-center'>
                <Skeleton className='h-64 w-full rounded-lg' />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className='mb-8'>
        <Card>
          <CardHeader>
            <Skeleton className='h-8 w-1/3' />
            <Skeleton className='h-4 w-1/2' />
          </CardHeader>
          <CardContent className='flex flex-col sm:flex-row gap-4'>
            <Skeleton className='h-12 w-full sm:w-40' />
            <Skeleton className='h-12 w-full sm:w-40' />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

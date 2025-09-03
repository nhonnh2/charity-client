import { Skeleton } from '@/components/ui/skeleton';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Network, TrendingUp, Wallet } from 'lucide-react';

export default function BlockchainStatsLoading() {
  return (
    <div className='container mx-auto px-4 py-6 max-w-7xl'>
      <div className='flex flex-col space-y-6'>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
          <div>
            <Skeleton className='h-10 w-64 mb-2' />
            <Skeleton className='h-5 w-96' />
          </div>
          <div className='flex items-center gap-3 flex-wrap'>
            <Skeleton className='h-10 w-[180px]' />
            <Skeleton className='h-10 w-[180px]' />
            <Skeleton className='h-10 w-10' />
            <Skeleton className='h-10 w-10' />
          </div>
        </div>

        {/* Blockchain Metrics */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index}>
              <CardContent className='p-6'>
                <div className='flex items-center justify-between'>
                  <div>
                    <Skeleton className='h-5 w-40 mb-2' />
                    <Skeleton className='h-8 w-24' />
                  </div>
                  <Skeleton className='h-12 w-12 rounded-full' />
                </div>
                <div className='mt-4 flex items-center'>
                  <Skeleton className='h-6 w-20 mr-2' />
                  <Skeleton className='h-4 w-40' />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Biểu đồ và phân tích */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          <Card className='lg:col-span-2'>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <Skeleton className='h-7 w-48' />
                <Skeleton className='h-10 w-[80px]' />
              </div>
              <Skeleton className='h-4 w-full mt-2' />
            </CardHeader>
            <CardContent>
              <Skeleton className='h-60 w-full' />
            </CardContent>
            <CardFooter className='flex justify-between border-t pt-4'>
              <Skeleton className='h-5 w-40' />
              <Skeleton className='h-5 w-40' />
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <Skeleton className='h-7 w-48' />
              </div>
              <Skeleton className='h-4 w-full mt-2' />
            </CardHeader>
            <CardContent>
              <div className='space-y-4 mt-4'>
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className='space-y-2'>
                    <div className='flex justify-between'>
                      <Skeleton className='h-5 w-32' />
                      <Skeleton className='h-5 w-32' />
                    </div>
                    <div className='flex items-center gap-2'>
                      <Skeleton className='h-2 w-full' />
                      <Skeleton className='h-4 w-16' />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className='border-t pt-4'>
              <Skeleton className='h-10 w-full' />
            </CardFooter>
          </Card>
        </div>

        {/* Tabs cho các loại thống kê khác nhau */}
        <Tabs defaultValue='transactions' className='w-full'>
          <TabsList className='mb-6'>
            <TabsTrigger
              value='transactions'
              className='flex items-center gap-2'
            >
              <Wallet className='h-4 w-4' />
              <span>Giao dịch gần đây</span>
            </TabsTrigger>
            <TabsTrigger value='gas' className='flex items-center gap-2'>
              <TrendingUp className='h-4 w-4' />
              <span>Phí Gas</span>
            </TabsTrigger>
            <TabsTrigger value='network' className='flex items-center gap-2'>
              <Network className='h-4 w-4' />
              <span>Sức khỏe mạng</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value='transactions'>
            <Card>
              <CardHeader>
                <div className='flex items-center justify-between'>
                  <Skeleton className='h-7 w-48' />
                  <Skeleton className='h-10 w-[80px]' />
                </div>
                <Skeleton className='h-4 w-full mt-2' />
              </CardHeader>
              <CardContent>
                <Skeleton className='h-[400px] w-full' />
              </CardContent>
              <CardFooter className='border-t pt-4 flex justify-between'>
                <Skeleton className='h-5 w-60' />
                <Skeleton className='h-10 w-40' />
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

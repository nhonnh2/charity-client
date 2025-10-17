'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Wallet, Loader2 } from 'lucide-react';
import { CampaignCard } from './components/campaign-card';
import { CampaignFilters } from './components/campaign-filters';
import { CampaignStats } from './components/campaign-stats';
import { CampaignPagination } from './components/campaign-pagination';
import { GetCampaignsQueryType } from '@/schemaValidations/campaign.schema';
import { useQueryCampaigns } from '@/hooks/campaigns';

export default function CampaignsPage() {
  // Filter states
  const [filters, setFilters] = useState<GetCampaignsQueryType>({
    page: 1,
    limit: 10,
    search: '',
    category: undefined,
    status: undefined,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  // Fetch campaigns với React Query
  const { data, isLoading, error, refetch } = useQueryCampaigns({ filters });

  // Extract data từ response
  const campaigns = data?.items || [];
  const pagination = data?.pagination || {
    current: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0,
  };

  // Handle filter changes
  const handleFilterChange = (key: keyof GetCampaignsQueryType, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1, // Reset to first page when filters change
    }));
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    setFilters(prev => ({
      ...prev,
      page,
    }));
  };

  // Handle search
  const handleSearch = (searchTerm: string) => {
    setFilters(prev => ({
      ...prev,
      search: searchTerm,
      page: 1,
    }));
  };

  const renderContentList = (variantCard: 'list' | 'default') => {
    return (
      <>
        {isLoading ? (
          <div className='flex items-center justify-center py-12'>
            <Loader2 className='h-8 w-8 animate-spin' />
            <span className='ml-2'>Đang tải chiến dịch...</span>
          </div>
        ) : error ? (
          <div className='flex flex-col items-center justify-center py-12 text-center'>
            <div className='text-muted-foreground mb-4'>
              Có lỗi xảy ra khi tải dữ liệu
            </div>
            <Button variant='outline' onClick={() => refetch()}>
              Thử lại
            </Button>
          </div>
        ) : campaigns.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-12 text-center'>
            <div className='text-muted-foreground mb-4'>
              Không tìm thấy chiến dịch nào
            </div>
            <Button variant='outline' onClick={() => refetch()}>
              Thử lại
            </Button>
          </div>
        ) : (
          <div
            className={
              variantCard === 'list'
                ? 'space-y-4'
                : 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'
            }
          >
            {campaigns.map(campaign => (
              <CampaignCard
                key={campaign._id}
                id={campaign._id}
                title={campaign.title}
                description={campaign.description}
                imageSrc={campaign.coverImage?.url || '/placeholder-image.jpg'}
                status={campaign.status}
                raised={campaign.donatedAmount || 0}
                goal={campaign.targetAmount || 0}
                progress={
                  campaign.targetAmount
                    ? Math.round(
                        ((campaign.donatedAmount || 0) /
                          campaign.targetAmount) *
                          100
                      )
                    : 0
                }
                interestedCount={campaign.interestedCount || 0}
                spent={campaign.spentAmount || 0}
                budget={campaign.targetAmount || 0}
                phase={`Giai đoạn ${campaign.completedMilestones || 0}/${campaign.totalMilestones || 0}`}
                currentPhase={campaign.completedMilestones || 0}
                totalPhases={campaign.totalMilestones || 0}
                category={campaign.category}
                variant={variantCard}
                colorScheme='primary'
                className={variantCard === 'list' ? '' : 'h-full'}
              />
            ))}
          </div>
        )}
      </>
    );
  };

  return (
    <div className='container mx-auto px-4 py-6 max-w-8xl'>
      <div className='mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>
            Danh sách chiến dịch
          </h1>
          <p className='text-muted-foreground'>
            Khám phá và đóng góp cho các chiến dịch từ thiện minh bạch
          </p>
        </div>
        <Link href='/campaigns/create'>
          <Button className='bg-primary hover:bg-primary/90'>
            <Wallet className='mr-2 h-4 w-4' />
            Tạo chiến dịch mới
          </Button>
        </Link>
      </div>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-4'>
        {/* Filters - 1/4 width on desktop */}
        <div className='md:sticky md:top-6 md:h-fit space-y-6'>
          <CampaignFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onSearch={handleSearch}
            onApplyFilters={() => refetch()}
          />

          <CampaignStats
            total={pagination.total}
            current={pagination.current}
            totalPages={pagination.totalPages}
            displayedCount={campaigns.length}
            loading={isLoading}
          />
        </div>

        {/* Campaign list - 3/4 width on desktop */}
        <div className='md:col-span-3'>
          <Tabs defaultValue='grid' className='w-full'>
            <div className='flex items-center justify-between mb-4'>
              <TabsList>
                <TabsTrigger value='grid'>Lưới</TabsTrigger>
                <TabsTrigger value='list'>Danh sách</TabsTrigger>
              </TabsList>
              <span className='text-sm text-muted-foreground'>
                {isLoading
                  ? 'Đang tải...'
                  : `Hiển thị ${campaigns.length} trong số ${pagination.total} chiến dịch`}
              </span>
            </div>

            <TabsContent value='grid' className='mt-0'>
              {renderContentList('default')}
            </TabsContent>

            <TabsContent value='list' className='mt-0'>
              {renderContentList('list')}
            </TabsContent>
          </Tabs>

          <CampaignPagination
            current={pagination.current}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

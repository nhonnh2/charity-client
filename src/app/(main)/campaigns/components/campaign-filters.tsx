'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';
import { GetCampaignsQueryType } from '@/schemaValidations/campaign.schema';
import { campaignCategoryOptions } from '@/constants/campaign';

interface CampaignFiltersProps {
  filters: GetCampaignsQueryType;
  onFilterChange: (key: keyof GetCampaignsQueryType, value: any) => void;
  onSearch: (searchTerm: string) => void;
  onApplyFilters: () => void;
}

export function CampaignFilters({
  filters,
  onFilterChange,
  onSearch,
  onApplyFilters,
}: CampaignFiltersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-lg'>Bộ lọc</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='space-y-2'>
          <label className='text-sm font-medium'>Tìm kiếm</label>
          <div className='relative'>
            <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              placeholder='Tìm chiến dịch...'
              className='pl-8'
              value={filters.search || ''}
              onChange={e => onSearch(e.target.value)}
            />
          </div>
        </div>

        <div className='space-y-2'>
          <label className='text-sm font-medium'>Danh mục</label>
          <Select
            value={filters.category || 'all'}
            onValueChange={value =>
              onFilterChange('category', value === 'all' ? undefined : value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder='Tất cả danh mục' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>Tất cả danh mục</SelectItem>
              {campaignCategoryOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className='space-y-2'>
          <label className='text-sm font-medium'>Trạng thái</label>
          <Select
            value={filters.status || 'all'}
            onValueChange={value =>
              onFilterChange('status', value === 'all' ? undefined : value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder='Tất cả trạng thái' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>Tất cả trạng thái</SelectItem>
              <SelectItem value='pending_review'>Chờ duyệt</SelectItem>
              <SelectItem value='approved'>Đã duyệt</SelectItem>
              <SelectItem value='rejected'>Từ chối</SelectItem>
              <SelectItem value='fundraising'>Đang đóng góp</SelectItem>
              <SelectItem value='implementation'>Đang triển khai</SelectItem>
              <SelectItem value='completed'>Hoàn thành</SelectItem>
              <SelectItem value='cancelled'>Đã hủy</SelectItem>
              <SelectItem value='active'>Hoạt động</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='space-y-2'>
          <label className='text-sm font-medium'>Sắp xếp theo</label>
          <Select
            value={`${filters.sortBy}-${filters.sortOrder}`}
            onValueChange={value => {
              const [sortBy, sortOrder] = value.split('-');
              onFilterChange('sortBy', sortBy);
              onFilterChange('sortOrder', sortOrder);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder='Mới nhất' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='createdAt-desc'>Mới nhất</SelectItem>
              <SelectItem value='createdAt-asc'>Cũ nhất</SelectItem>
              <SelectItem value='title-asc'>Tên A-Z</SelectItem>
              <SelectItem value='title-desc'>Tên Z-A</SelectItem>
              <SelectItem value='targetAmount-desc'>
                Mục tiêu cao nhất
              </SelectItem>
              <SelectItem value='targetAmount-asc'>
                Mục tiêu thấp nhất
              </SelectItem>
              <SelectItem value='donatedAmount-desc'>
                Quyên góp nhiều nhất
              </SelectItem>
              <SelectItem value='donatedAmount-asc'>
                Quyên góp ít nhất
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant='outline' className='w-full' onClick={onApplyFilters}>
          Áp dụng bộ lọc
        </Button>
      </CardContent>
    </Card>
  );
}

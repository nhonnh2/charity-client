'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  AlertCircle,
  Clock,
  DollarSign,
  Eye,
  FileCheck,
  FilterIcon,
  Star,
  TrendingUp,
  Users,
  Wallet,
  CheckCircle,
  XCircle,
  RefreshCw,
  Calendar,
  AlertTriangle,
  Shield,
  Search,
  X,
  ChevronDown,
  Flame,
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface ReviewItem {
  id: string;
  campaignId: string;
  campaignTitle: string;
  creatorName: string;
  creatorReputation: number;
  type:
    | 'new_campaign'
    | 'campaign_edit'
    | 'campaign_addition'
    | 'campaign_restart';
  priority: 'high' | 'medium' | 'low';
  fee: number;
  totalFee: number;
  submitDate: Date;
  deadline: Date;
  status: 'pending' | 'in_review' | 'needs_more_reviewers';
  reviewersCount: number;
  requiredReviewers: number;
  category: string;
  amount: number;
  description: string;
  hasVoted: boolean;
}

export default function ReviewerDashboard() {
  const [activeTab, setActiveTab] = useState('new');
  const [isReviewer, setIsReviewer] = useState(true); // Mock data
  const [filters, setFilters] = useState({
    category: '',
    type: '',
    priority: '',
    search: '',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [reviewerStats, setReviewerStats] = useState({
    totalEarned: 2500000,
    completedReviews: 45,
    successfulReviews: 42,
    failedReviews: 3,
    totalReviewers: 1247,
  });

  // Mock data cho các review items
  const reviewItems: ReviewItem[] = [
    {
      id: '1',
      campaignId: 'camp_001',
      campaignTitle: 'Xây trường học vùng cao Sapa',
      creatorName: 'Nguyễn Văn A',
      creatorReputation: 85,
      type: 'new_campaign',
      priority: 'high',
      fee: 75000,
      totalFee: 150000,
      submitDate: new Date(2024, 0, 15, 9, 30),
      deadline: new Date(2024, 0, 22, 23, 59),
      status: 'pending',
      reviewersCount: 2,
      requiredReviewers: 5,
      category: 'Giáo dục',
      amount: 50000000,
      description: 'Chiến dịch xây dựng trường học cho trẻ em vùng cao...',
      hasVoted: false,
    },
    {
      id: '2',
      campaignId: 'camp_002',
      campaignTitle: 'Hỗ trợ khẩn cấp nạn nhân lũ lụt',
      creatorName: 'Trần Thị B',
      creatorReputation: 92,
      type: 'new_campaign',
      priority: 'high',
      fee: 60000,
      totalFee: 100000,
      submitDate: new Date(2024, 0, 14, 15, 20),
      deadline: new Date(2024, 0, 21, 23, 59),
      status: 'in_review',
      reviewersCount: 3,
      requiredReviewers: 4,
      category: 'Thiên tai',
      amount: 20000000,
      description: 'Hỗ trợ khẩn cấp cho người dân bị ảnh hưởng bởi lũ lụt...',
      hasVoted: false,
    },
    {
      id: '3',
      campaignId: 'camp_003',
      campaignTitle: 'Cập nhật tiến độ xây bệnh viện',
      creatorName: 'Lê Văn C',
      creatorReputation: 78,
      type: 'campaign_edit',
      priority: 'medium',
      fee: 45000,
      totalFee: 90000,
      submitDate: new Date(2024, 0, 13, 11, 45),
      deadline: new Date(2024, 0, 20, 23, 59),
      status: 'needs_more_reviewers',
      reviewersCount: 1,
      requiredReviewers: 3,
      category: 'Y tế',
      amount: 0, // Không áp dụng cho chỉnh sửa
      description: 'Cập nhật tiến độ giai đoạn 2 của dự án xây bệnh viện...',
      hasVoted: true,
    },
  ];

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'new_campaign':
        return 'Chiến dịch mới';
      case 'campaign_edit':
        return 'Chỉnh sửa';
      case 'campaign_addition':
        return 'Bổ sung';
      case 'campaign_restart':
        return 'Khởi động lại';
      default:
        return 'Khác';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'new_campaign':
        return 'bg-blue-100 text-blue-800';
      case 'campaign_edit':
        return 'bg-yellow-100 text-yellow-800';
      case 'campaign_addition':
        return 'bg-green-100 text-green-800';
      case 'campaign_restart':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertTriangle className='h-4 w-4 text-red-500' />;
      case 'medium':
        return <Clock className='h-4 w-4 text-yellow-500' />;
      case 'low':
        return <TrendingUp className='h-4 w-4 text-green-500' />;
      default:
        return <Clock className='h-4 w-4 text-gray-500' />;
    }
  };

  const getStatusBadge = (item: ReviewItem) => {
    if (item.hasVoted) {
      return (
        <Badge variant='secondary' className='bg-green-100 text-green-800'>
          Đã duyệt
        </Badge>
      );
    }

    switch (item.status) {
      case 'pending':
        return (
          <Badge variant='secondary' className='bg-blue-100 text-blue-800'>
            Chờ duyệt
          </Badge>
        );
      case 'in_review':
        return (
          <Badge variant='secondary' className='bg-yellow-100 text-yellow-800'>
            Đang duyệt
          </Badge>
        );
      case 'needs_more_reviewers':
        return (
          <Badge variant='secondary' className='bg-orange-100 text-orange-800'>
            Cần thêm người duyệt
          </Badge>
        );
      default:
        return <Badge variant='secondary'>Chờ duyệt</Badge>;
    }
  };

  const getDaysLeft = (deadline: Date) => {
    const now = new Date();
    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (!isReviewer) {
    return (
      <div className='container mx-auto px-4 py-6 max-w-4xl'>
        <div className='text-center space-y-6'>
          <div className='flex justify-center'>
            <Shield className='h-16 w-16 text-muted-foreground' />
          </div>
          <div>
            <h1 className='text-2xl font-bold'>Trở thành người duyệt</h1>
            <p className='text-muted-foreground mt-2'>
              Bạn chưa đăng ký làm người duyệt. Hãy đăng ký để bắt đầu kiếm thu
              nhập từ việc duyệt chiến dịch.
            </p>
          </div>
          <Card className='max-w-md mx-auto'>
            <CardHeader>
              <CardTitle>Yêu cầu để trở thành người duyệt</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center space-x-3'>
                <CheckCircle className='h-5 w-5 text-green-500' />
                <span className='text-sm'>Điểm uy tín ≥ 70</span>
              </div>
              <div className='flex items-center space-x-3'>
                <CheckCircle className='h-5 w-5 text-green-500' />
                <span className='text-sm'>Đã tham gia ít nhất 30 ngày</span>
              </div>
              <div className='flex items-center space-x-3'>
                <CheckCircle className='h-5 w-5 text-green-500' />
                <span className='text-sm'>
                  Đã đóng góp cho ít nhất 5 chiến dịch
                </span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className='w-full'>Đăng ký làm người duyệt</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-6 max-w-7xl'>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold tracking-tight'>
          Bảng điều khiển người duyệt
        </h1>
        <p className='text-muted-foreground'>
          Duyệt và đánh giá các chiến dịch từ thiện để kiếm thu nhập
        </p>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-5 gap-4 mb-6'>
        <Card>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-muted-foreground'>Tổng thu nhập</p>
                <p className='text-xl font-bold text-green-600'>
                  {new Intl.NumberFormat('vi-VN').format(
                    reviewerStats.totalEarned
                  )}{' '}
                  VNĐ
                </p>
              </div>
              <Wallet className='h-8 w-8 text-green-600' />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-muted-foreground'>Xét duyệt</p>
                <p className='text-xl font-bold'>
                  {reviewerStats.completedReviews}
                </p>
              </div>
              <FileCheck className='h-8 w-8 text-blue-600' />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-muted-foreground'>Thành công</p>
                <p className='text-xl font-bold text-green-600'>
                  {reviewerStats.successfulReviews}
                </p>
              </div>
              <CheckCircle className='h-8 w-8 text-green-600' />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-muted-foreground'>Thất bại</p>
                <p className='text-xl font-bold text-red-600'>
                  {reviewerStats.failedReviews}
                </p>
              </div>
              <XCircle className='h-8 w-8 text-red-600' />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-muted-foreground'>
                  Tổng người duyệt
                </p>
                <p className='text-xl font-bold text-blue-600'>
                  {new Intl.NumberFormat('vi-VN').format(
                    reviewerStats.totalReviewers
                  )}
                </p>
              </div>
              <Users className='h-8 w-8 text-blue-600' />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className='space-y-4'
      >
        <TabsList>
          <TabsTrigger value='new'>
            Yêu cầu mới ({reviewItems.filter(item => !item.hasVoted).length})
          </TabsTrigger>
          <TabsTrigger value='urgent'>
            Khẩn cấp (
            {
              reviewItems.filter(
                item => item.priority === 'high' && !item.hasVoted
              ).length
            }
            )
          </TabsTrigger>
          <TabsTrigger value='trending'>
            Quan tâm nhất (
            {
              reviewItems.filter(
                item => item.priority === 'high' && !item.hasVoted
              ).length
            }
            )
          </TabsTrigger>
          <TabsTrigger value='completed'>
            Đã duyệt ({reviewItems.filter(item => item.hasVoted).length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value='new' className='space-y-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold'>Yêu cầu duyệt mới</h2>
            <Button
              variant='outline'
              size='sm'
              onClick={() => setShowFilters(!showFilters)}
            >
              <FilterIcon className='h-4 w-4 mr-2' />
              Bộ lọc
              <ChevronDown
                className={`h-4 w-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`}
              />
            </Button>
          </div>

          {/* Advanced Filters */}
          <Collapsible open={showFilters} onOpenChange={setShowFilters}>
            <CollapsibleContent className='space-y-4'>
              <Card>
                <CardContent className='p-4'>
                  <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                    {/* Search */}
                    <div className='space-y-2'>
                      <label className='text-sm font-medium'>Tìm kiếm</label>
                      <div className='relative'>
                        <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                        <Input
                          placeholder='Tên chiến dịch, người tạo...'
                          value={filters.search}
                          onChange={e =>
                            setFilters(prev => ({
                              ...prev,
                              search: e.target.value,
                            }))
                          }
                          className='pl-10'
                        />
                      </div>
                    </div>

                    {/* Category Filter */}
                    <div className='space-y-2'>
                      <label className='text-sm font-medium'>Thể loại</label>
                      <Select
                        value={filters.category}
                        onValueChange={value =>
                          setFilters(prev => ({ ...prev, category: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Tất cả thể loại' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value=''>Tất cả thể loại</SelectItem>
                          <SelectItem value='education'>Giáo dục</SelectItem>
                          <SelectItem value='health'>Y tế</SelectItem>
                          <SelectItem value='environment'>
                            Môi trường
                          </SelectItem>
                          <SelectItem value='disaster'>Thiên tai</SelectItem>
                          <SelectItem value='social'>Xã hội</SelectItem>
                          <SelectItem value='children'>Trẻ em</SelectItem>
                          <SelectItem value='elderly'>
                            Người cao tuổi
                          </SelectItem>
                          <SelectItem value='animals'>Động vật</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Type Filter */}
                    <div className='space-y-2'>
                      <label className='text-sm font-medium'>
                        Loại yêu cầu
                      </label>
                      <Select
                        value={filters.type}
                        onValueChange={value =>
                          setFilters(prev => ({ ...prev, type: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Tất cả loại' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value=''>Tất cả loại</SelectItem>
                          <SelectItem value='new_campaign'>
                            Chiến dịch mới
                          </SelectItem>
                          <SelectItem value='campaign_edit'>
                            Chỉnh sửa
                          </SelectItem>
                          <SelectItem value='campaign_addition'>
                            Bổ sung
                          </SelectItem>
                          <SelectItem value='campaign_restart'>
                            Khởi động lại
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Priority Filter */}
                    <div className='space-y-2'>
                      <label className='text-sm font-medium'>Độ ưu tiên</label>
                      <Select
                        value={filters.priority}
                        onValueChange={value =>
                          setFilters(prev => ({ ...prev, priority: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Tất cả mức độ' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value=''>Tất cả mức độ</SelectItem>
                          <SelectItem value='high'>Cao</SelectItem>
                          <SelectItem value='medium'>Trung bình</SelectItem>
                          <SelectItem value='low'>Thấp</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Additional Filters Row */}
                  <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mt-4'>
                    <div className='space-y-2'>
                      <label className='text-sm font-medium'>Phí duyệt</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder='Tất cả mức phí' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value=''>Tất cả mức phí</SelectItem>
                          <SelectItem value='low'>&lt; 50,000 VNĐ</SelectItem>
                          <SelectItem value='medium'>
                            50,000 - 100,000 VNĐ
                          </SelectItem>
                          <SelectItem value='high'>&gt; 100,000 VNĐ</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className='space-y-2'>
                      <label className='text-sm font-medium'>
                        Uy tín người tạo
                      </label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder='Tất cả mức uy tín' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value=''>Tất cả mức uy tín</SelectItem>
                          <SelectItem value='high'>Cao (≥ 80)</SelectItem>
                          <SelectItem value='medium'>
                            Trung bình (60-79)
                          </SelectItem>
                          <SelectItem value='low'>Thấp (&lt; 60)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className='space-y-2'>
                      <label className='text-sm font-medium'>
                        Thời hạn còn lại
                      </label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder='Tất cả thời hạn' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value=''>Tất cả thời hạn</SelectItem>
                          <SelectItem value='urgent'>&lt; 1 ngày</SelectItem>
                          <SelectItem value='soon'>1-3 ngày</SelectItem>
                          <SelectItem value='normal'>&gt; 3 ngày</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className='flex items-end'>
                      <Button variant='outline' size='sm' className='w-full'>
                        <X className='h-4 w-4 mr-2' />
                        Xóa bộ lọc
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CollapsibleContent>
          </Collapsible>

          <div className='space-y-4'>
            {reviewItems
              .filter(item => !item.hasVoted)
              .map(item => (
                <Card
                  key={item.id}
                  className='hover:shadow-md transition-shadow'
                >
                  <CardContent className='p-6'>
                    <div className='flex items-start justify-between'>
                      <div className='flex-1 space-y-3'>
                        <div className='flex items-start justify-between'>
                          <div>
                            <h3 className='font-semibold text-lg'>
                              {item.campaignTitle}
                            </h3>
                            <div className='flex items-center space-x-4 mt-1'>
                              <div className='flex items-center space-x-2'>
                                <Avatar className='h-6 w-6'>
                                  <AvatarFallback className='text-xs'>
                                    {item.creatorName.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <span className='text-sm text-muted-foreground'>
                                  {item.creatorName}
                                </span>
                                <Badge variant='outline' className='text-xs'>
                                  Uy tín {item.creatorReputation}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className='flex items-center space-x-2'>
                            {getPriorityIcon(item.priority)}
                            {getStatusBadge(item)}
                          </div>
                        </div>

                        <div className='flex items-center space-x-4 text-sm text-muted-foreground'>
                          <Badge className={getTypeColor(item.type)}>
                            {getTypeLabel(item.type)}
                          </Badge>
                          <span className='flex items-center'>
                            <Users className='h-4 w-4 mr-1' />
                            {item.reviewersCount}/{item.requiredReviewers} người
                            duyệt
                          </span>
                          <span className='flex items-center'>
                            <Calendar className='h-4 w-4 mr-1' />
                            Còn {getDaysLeft(item.deadline)} ngày
                          </span>
                          <span className='flex items-center'>
                            <DollarSign className='h-4 w-4 mr-1' />
                            {new Intl.NumberFormat('vi-VN').format(
                              item.fee
                            )}{' '}
                            VNĐ
                          </span>
                        </div>

                        <p className='text-sm text-muted-foreground line-clamp-2'>
                          {item.description}
                        </p>

                        <div className='flex items-center justify-between'>
                          <div className='space-y-1'>
                            <div className='flex items-center space-x-2 text-xs text-muted-foreground'>
                              <span>Tiến độ duyệt:</span>
                              <span className='font-medium'>
                                {Math.round(
                                  (item.reviewersCount /
                                    item.requiredReviewers) *
                                    100
                                )}
                                %
                              </span>
                            </div>
                            <Progress
                              value={
                                (item.reviewersCount / item.requiredReviewers) *
                                100
                              }
                              className='w-32 h-2'
                            />
                          </div>
                          <div className='flex items-center space-x-2'>
                            <Link href={`/reviewer/${item.id}`}>
                              <Button variant='outline' size='sm'>
                                <Eye className='h-4 w-4 mr-2' />
                                Xem chi tiết
                              </Button>
                            </Link>
                            <Link
                              href={`/reviewer/${item.id}/review?action=approve`}
                            >
                              <Button
                                size='sm'
                                variant='outline'
                                className='border-green-300 text-green-700 hover:bg-green-50'
                              >
                                <CheckCircle className='h-4 w-4 mr-2' />
                                Chấp nhận
                              </Button>
                            </Link>
                            <Link
                              href={`/reviewer/${item.id}/review?action=reject`}
                            >
                              <Button
                                size='sm'
                                variant='outline'
                                className='border-red-300 text-red-700 hover:bg-red-50'
                              >
                                <XCircle className='h-4 w-4 mr-2' />
                                Từ chối
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value='trending' className='space-y-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold'>
              Yêu cầu được quan tâm nhất
            </h2>
            <div className='flex items-center space-x-2'>
              <Flame className='h-4 w-4 text-orange-500' />
              <span className='text-sm text-muted-foreground'>
                Sắp xếp theo lượt quan tâm
              </span>
            </div>
          </div>

          <div className='space-y-4'>
            {reviewItems
              .filter(item => !item.hasVoted)
              .sort((a, b) => (b.reviewersCount || 0) - (a.reviewersCount || 0))
              .map(item => (
                <Card
                  key={item.id}
                  className='hover:shadow-md transition-shadow border-orange-100'
                >
                  <CardContent className='p-6'>
                    <div className='flex items-start justify-between'>
                      <div className='flex-1 space-y-3'>
                        <div className='flex items-start justify-between'>
                          <div>
                            <h3 className='font-semibold text-lg'>
                              {item.campaignTitle}
                            </h3>
                            <div className='flex items-center space-x-4 mt-1'>
                              <div className='flex items-center space-x-2'>
                                <Avatar className='h-6 w-6'>
                                  <AvatarFallback className='text-xs'>
                                    {item.creatorName.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <span className='text-sm text-muted-foreground'>
                                  {item.creatorName}
                                </span>
                                <Badge variant='outline' className='text-xs'>
                                  Uy tín {item.creatorReputation}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className='flex items-center space-x-2'>
                            {getPriorityIcon(item.priority)}
                            {getStatusBadge(item)}
                            <Badge
                              variant='secondary'
                              className='bg-orange-100 text-orange-800'
                            >
                              <Flame className='h-3 w-3 mr-1' />
                              Hot
                            </Badge>
                          </div>
                        </div>

                        <div className='flex items-center space-x-4 text-sm text-muted-foreground'>
                          <Badge className={getTypeColor(item.type)}>
                            {getTypeLabel(item.type)}
                          </Badge>
                          <span className='flex items-center'>
                            <Users className='h-4 w-4 mr-1' />
                            {item.reviewersCount}/{item.requiredReviewers} người
                            duyệt
                          </span>
                          <span className='flex items-center'>
                            <Calendar className='h-4 w-4 mr-1' />
                            Còn {getDaysLeft(item.deadline)} ngày
                          </span>
                          <span className='flex items-center'>
                            <DollarSign className='h-4 w-4 mr-1' />
                            {new Intl.NumberFormat('vi-VN').format(
                              item.fee
                            )}{' '}
                            VNĐ
                          </span>
                        </div>

                        <p className='text-sm text-muted-foreground line-clamp-2'>
                          {item.description}
                        </p>

                        <div className='flex items-center justify-between'>
                          <div className='space-y-1'>
                            <div className='flex items-center space-x-2 text-xs text-muted-foreground'>
                              <span>Tiến độ duyệt:</span>
                              <span className='font-medium'>
                                {Math.round(
                                  (item.reviewersCount /
                                    item.requiredReviewers) *
                                    100
                                )}
                                %
                              </span>
                            </div>
                            <Progress
                              value={
                                (item.reviewersCount / item.requiredReviewers) *
                                100
                              }
                              className='w-32 h-2'
                            />
                          </div>
                          <div className='flex items-center space-x-2'>
                            <Link href={`/reviewer/${item.id}`}>
                              <Button variant='outline' size='sm'>
                                <Eye className='h-4 w-4 mr-2' />
                                Xem chi tiết
                              </Button>
                            </Link>
                            <Link
                              href={`/reviewer/${item.id}/review?action=approve`}
                            >
                              <Button
                                size='sm'
                                variant='outline'
                                className='border-green-300 text-green-700 hover:bg-green-50'
                              >
                                <CheckCircle className='h-4 w-4 mr-2' />
                                Chấp nhận
                              </Button>
                            </Link>
                            <Link
                              href={`/reviewer/${item.id}/review?action=reject`}
                            >
                              <Button
                                size='sm'
                                variant='outline'
                                className='border-red-300 text-red-700 hover:bg-red-50'
                              >
                                <XCircle className='h-4 w-4 mr-2' />
                                Từ chối
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value='completed' className='space-y-4'>
          <h2 className='text-lg font-semibold'>Đã hoàn thành duyệt</h2>
          <div className='space-y-4'>
            {reviewItems
              .filter(item => item.hasVoted)
              .map(item => {
                // Mock data cho kết quả vote của reviewer
                const myDecision =
                  Math.random() > 0.5 ? 'approved' : 'rejected';
                const finalResult =
                  Math.random() > 0.3 ? 'approved' : 'rejected';
                const isCorrect = myDecision === finalResult;

                return (
                  <Card
                    key={item.id}
                    className={`${isCorrect ? 'border-green-200 bg-green-50/30' : 'border-red-200 bg-red-50/30'}`}
                  >
                    <CardContent className='p-6'>
                      <div className='flex items-start justify-between'>
                        <div className='flex-1'>
                          <h3 className='font-semibold'>
                            {item.campaignTitle}
                          </h3>
                          <div className='flex items-center space-x-4 mt-1 text-sm text-muted-foreground'>
                            <Badge className={getTypeColor(item.type)}>
                              {getTypeLabel(item.type)}
                            </Badge>
                            <div className='flex items-center space-x-2'>
                              <Avatar className='h-5 w-5'>
                                <AvatarFallback className='text-xs'>
                                  {item.creatorName.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <span>{item.creatorName}</span>
                            </div>
                          </div>

                          <div className='mt-3 space-y-2'>
                            <div className='flex items-center space-x-4 text-sm'>
                              <div className='flex items-center space-x-2'>
                                <span className='text-muted-foreground'>
                                  Lựa chọn của tôi:
                                </span>
                                {myDecision === 'approved' ? (
                                  <div className='flex items-center space-x-1 text-green-600'>
                                    <CheckCircle className='h-4 w-4' />
                                    <span className='font-medium'>
                                      Chấp nhận
                                    </span>
                                  </div>
                                ) : (
                                  <div className='flex items-center space-x-1 text-red-600'>
                                    <XCircle className='h-4 w-4' />
                                    <span className='font-medium'>Từ chối</span>
                                  </div>
                                )}
                              </div>

                              <div className='flex items-center space-x-2'>
                                <span className='text-muted-foreground'>
                                  Kết quả cuối:
                                </span>
                                {finalResult === 'approved' ? (
                                  <div className='flex items-center space-x-1 text-green-600'>
                                    <CheckCircle className='h-4 w-4' />
                                    <span className='font-medium'>
                                      Chấp nhận
                                    </span>
                                  </div>
                                ) : (
                                  <div className='flex items-center space-x-1 text-red-600'>
                                    <XCircle className='h-4 w-4' />
                                    <span className='font-medium'>Từ chối</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className='flex flex-col items-end space-y-2'>
                          <div className='flex items-center space-x-2'>
                            {isCorrect ? (
                              <>
                                <CheckCircle className='h-5 w-5 text-green-500' />
                                <span className='text-sm text-green-600 font-medium'>
                                  Đúng
                                </span>
                              </>
                            ) : (
                              <>
                                <XCircle className='h-5 w-5 text-red-500' />
                                <span className='text-sm text-red-600 font-medium'>
                                  Sai
                                </span>
                              </>
                            )}
                          </div>
                          <div className='text-sm text-muted-foreground'>
                            {isCorrect ? (
                              <span className='text-green-600 font-medium'>
                                +
                                {new Intl.NumberFormat('vi-VN').format(
                                  item.fee
                                )}{' '}
                                VNĐ
                              </span>
                            ) : (
                              <span className='text-red-600'>+0 VNĐ</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        </TabsContent>

        <TabsContent value='urgent' className='space-y-4'>
          <Alert>
            <AlertTriangle className='h-4 w-4' />
            <AlertTitle>Ưu tiên cao</AlertTitle>
            <AlertDescription>
              Các chiến dịch khẩn cấp cần được duyệt trong vòng 24 giờ
            </AlertDescription>
          </Alert>

          <div className='space-y-4'>
            {reviewItems
              .filter(item => item.priority === 'high' && !item.hasVoted)
              .map(item => (
                <Card key={item.id} className='border-red-200 bg-red-50/50'>
                  <CardContent className='p-6'>
                    <div className='flex items-start justify-between'>
                      <div className='flex-1'>
                        <div className='flex items-center space-x-2 mb-2'>
                          <AlertTriangle className='h-5 w-5 text-red-500' />
                          <Badge variant='destructive'>KHẨN CẤP</Badge>
                        </div>
                        <h3 className='font-semibold text-lg'>
                          {item.campaignTitle}
                        </h3>
                        <p className='text-sm text-muted-foreground mt-1'>
                          {item.description}
                        </p>
                        <div className='flex items-center space-x-4 mt-3 text-sm'>
                          <span className='flex items-center text-red-600'>
                            <Clock className='h-4 w-4 mr-1' />
                            Còn {getDaysLeft(item.deadline)} ngày
                          </span>
                          <span className='flex items-center text-green-600'>
                            <DollarSign className='h-4 w-4 mr-1' />
                            {new Intl.NumberFormat('vi-VN').format(
                              item.fee
                            )}{' '}
                            VNĐ
                          </span>
                        </div>
                      </div>
                      <div className='flex flex-col space-y-2'>
                        <Link href={`/reviewer/${item.id}`}>
                          <Button variant='outline' size='sm'>
                            Xem chi tiết
                          </Button>
                        </Link>
                        <Link
                          href={`/reviewer/${item.id}/review?action=approve`}
                        >
                          <Button
                            size='sm'
                            variant='outline'
                            className='border-green-300 text-green-700 hover:bg-green-50'
                          >
                            <CheckCircle className='h-4 w-4 mr-2' />
                            Chấp nhận
                          </Button>
                        </Link>
                        <Link
                          href={`/reviewer/${item.id}/review?action=reject`}
                        >
                          <Button size='sm' variant='destructive'>
                            <XCircle className='h-4 w-4 mr-2' />
                            Từ chối
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

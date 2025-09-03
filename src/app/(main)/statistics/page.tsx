'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  Calendar,
  DollarSign,
  Download,
  Gift,
  Heart,
  LineChart,
  PieChart,
  RefreshCcw,
  TrendingUp,
  Users,
  Wallet,
} from 'lucide-react';

export default function StatisticsPage() {
  const [timeRange, setTimeRange] = useState('month');

  // Dữ liệu mẫu cho thống kê tổng quan
  const overviewStats = {
    totalCampaigns: 245,
    totalDonations: '5.2 tỷ VNĐ',
    totalDonors: 3245,
    successRate: 78,
    avgDonation: '1.6 triệu VNĐ',
    totalTransactions: 12458,
  };

  // Dữ liệu mẫu cho biểu đồ đóng góp theo tháng (giả lập)
  const monthlyDonations = [
    { month: 'T1', amount: 320 },
    { month: 'T2', amount: 350 },
    { month: 'T3', amount: 420 },
    { month: 'T4', amount: 480 },
    { month: 'T5', amount: 520 },
    { month: 'T6', amount: 490 },
    { month: 'T7', amount: 550 },
    { month: 'T8', amount: 620 },
    { month: 'T9', amount: 680 },
    { month: 'T10', amount: 720 },
    { month: 'T11', amount: 780 },
    { month: 'T12', amount: 850 },
  ];

  // Dữ liệu mẫu cho phân bổ theo danh mục
  const categoryDistribution = [
    {
      category: 'Giáo dục',
      percentage: 35,
      amount: '1.82 tỷ VNĐ',
      color: 'bg-blue-500',
    },
    {
      category: 'Y tế',
      percentage: 28,
      amount: '1.46 tỷ VNĐ',
      color: 'bg-green-500',
    },
    {
      category: 'Môi trường',
      percentage: 20,
      amount: '1.04 tỷ VNĐ',
      color: 'bg-amber-500',
    },
    {
      category: 'Cơ sở hạ tầng',
      percentage: 12,
      amount: '624 triệu VNĐ',
      color: 'bg-purple-500',
    },
    {
      category: 'Khác',
      percentage: 5,
      amount: '260 triệu VNĐ',
      color: 'bg-gray-500',
    },
  ];

  // Dữ liệu mẫu cho top chiến dịch
  const topCampaigns = [
    {
      id: 1,
      title: 'Xây trường học cho trẻ em vùng cao',
      raised: '850 triệu VNĐ',
      goal: '1 tỷ VNĐ',
      progress: 85,
      donors: 1245,
      category: 'Giáo dục',
      trend: 'up',
    },
    {
      id: 2,
      title: 'Hỗ trợ y tế cho người già neo đơn',
      raised: '360 triệu VNĐ',
      goal: '500 triệu VNĐ',
      progress: 72,
      donors: 876,
      category: 'Y tế',
      trend: 'up',
    },
    {
      id: 3,
      title: 'Trồng rừng phòng hộ đầu nguồn',
      raised: '204 triệu VNĐ',
      goal: '300 triệu VNĐ',
      progress: 68,
      donors: 632,
      category: 'Môi trường',
      trend: 'stable',
    },
    {
      id: 4,
      title: 'Học bổng cho học sinh nghèo vượt khó',
      raised: '195 triệu VNĐ',
      goal: '300 triệu VNĐ',
      progress: 65,
      donors: 521,
      category: 'Giáo dục',
      trend: 'down',
    },
    {
      id: 5,
      title: 'Xây dựng hệ thống nước sạch cho vùng hạn hán',
      raised: '420 triệu VNĐ',
      goal: '700 triệu VNĐ',
      progress: 60,
      donors: 489,
      category: 'Cơ sở hạ tầng',
      trend: 'up',
    },
  ];

  // Dữ liệu mẫu cho thống kê blockchain
  const blockchainStats = {
    totalTransactions: 12458,
    avgGasFee: '0.0025 ETH',
    avgConfirmationTime: '45 giây',
    successfulTransactions: 12445,
    failedTransactions: 13,
    totalGasUsed: '31.15 ETH',
  };

  // Dữ liệu mẫu cho hoạt động gần đây
  const recentActivities = [
    {
      id: 1,
      type: 'donation',
      user: 'Nguyễn Văn A',
      campaign: 'Xây trường học cho trẻ em vùng cao',
      amount: '5 triệu VNĐ',
      time: '2 giờ trước',
      txHash: '0x1a2b3c...',
    },
    {
      id: 2,
      type: 'campaign_created',
      user: 'Trần Thị B',
      campaign: 'Hỗ trợ nạn nhân lũ lụt miền Trung',
      goal: '500 triệu VNĐ',
      time: '5 giờ trước',
      txHash: '0x4d5e6f...',
    },
    {
      id: 3,
      type: 'withdrawal',
      user: 'Lê Văn C',
      campaign: 'Trồng rừng phòng hộ đầu nguồn',
      amount: '50 triệu VNĐ',
      time: '1 ngày trước',
      txHash: '0x7g8h9i...',
    },
    {
      id: 4,
      type: 'donation',
      user: 'Phạm Thị D',
      campaign: 'Học bổng cho học sinh nghèo vượt khó',
      amount: '2 triệu VNĐ',
      time: '1 ngày trước',
      txHash: '0xjk1l2m...',
    },
    {
      id: 5,
      type: 'campaign_completed',
      user: 'Hoàng Văn E',
      campaign: 'Trang bị máy tính cho trường học vùng sâu',
      raised: '300 triệu VNĐ',
      time: '2 ngày trước',
      txHash: '0xn3o4p5...',
    },
  ];

  // Hàm tạo biểu đồ cột đơn giản bằng CSS
  const renderBarChart = () => {
    const maxAmount = Math.max(...monthlyDonations.map(item => item.amount));

    return (
      <div className='flex items-end h-64 gap-2 mt-4 mb-2'>
        {monthlyDonations.map((item, index) => {
          const height = (item.amount / maxAmount) * 100;
          return (
            <div key={index} className='flex flex-col items-center flex-1'>
              <div
                className='w-full bg-blue-500 rounded-t hover:bg-blue-600 transition-all cursor-pointer relative group'
                style={{ height: `${height}%` }}
              >
                <div className='absolute bottom-full left-1/2 transform -translate-x-1/2 bg-blue-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity mb-1 whitespace-nowrap'>
                  {item.amount} triệu VNĐ
                </div>
              </div>
              <div className='text-xs mt-2 text-muted-foreground'>
                {item.month}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Hàm tạo biểu đồ tròn đơn giản bằng CSS
  const renderPieChart = () => {
    let cumulativePercentage = 0;

    return (
      <div className='relative w-48 h-48 mx-auto my-6'>
        <div className='w-full h-full rounded-full overflow-hidden'>
          {categoryDistribution.map((item, index) => {
            const startPercentage = cumulativePercentage;
            cumulativePercentage += item.percentage;

            return (
              <div
                key={index}
                className={`absolute inset-0 ${item.color}`}
                style={{
                  clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos((2 * Math.PI * startPercentage) / 100)}% ${50 + 50 * Math.sin((2 * Math.PI * startPercentage) / 100)}%, ${50 + 50 * Math.cos((2 * Math.PI * cumulativePercentage) / 100)}% ${50 + 50 * Math.sin((2 * Math.PI * cumulativePercentage) / 100)}%, 50% 50%)`,
                }}
              />
            );
          })}
        </div>
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='bg-background rounded-full w-24 h-24 flex items-center justify-center'>
            <div className='text-center'>
              <div className='text-sm font-medium'>Tổng cộng</div>
              <div className='text-lg font-bold'>5.2 tỷ</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='container mx-auto px-4 py-6 max-w-7xl'>
      <div className='flex flex-col space-y-6'>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight'>Thống Kê</h1>
            <p className='text-muted-foreground'>
              Tổng quan về hoạt động và đóng góp trên nền tảng từ thiện
              blockchain
            </p>
          </div>
          <div className='flex items-center gap-3'>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Chọn thời gian' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='week'>7 ngày qua</SelectItem>
                <SelectItem value='month'>30 ngày qua</SelectItem>
                <SelectItem value='quarter'>Quý này</SelectItem>
                <SelectItem value='year'>Năm nay</SelectItem>
                <SelectItem value='all'>Tất cả thời gian</SelectItem>
              </SelectContent>
            </Select>
            <Button variant='outline' size='icon'>
              <RefreshCcw className='h-4 w-4' />
            </Button>
            <Button variant='outline' size='icon'>
              <Download className='h-4 w-4' />
            </Button>
          </div>
        </div>

        {/* Thống kê tổng quan */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          <Card>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-muted-foreground'>
                    Tổng số chiến dịch
                  </p>
                  <h3 className='text-2xl font-bold mt-1'>
                    {overviewStats.totalCampaigns}
                  </h3>
                </div>
                <div className='h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center'>
                  <Heart className='h-6 w-6 text-blue-600' />
                </div>
              </div>
              <div className='mt-4 flex items-center text-sm'>
                <Badge
                  variant='outline'
                  className='bg-green-50 text-green-700 flex items-center gap-1'
                >
                  <ArrowUp className='h-3 w-3' />
                  <span>12%</span>
                </Badge>
                <span className='text-muted-foreground ml-2'>
                  so với tháng trước
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-muted-foreground'>
                    Tổng số đóng góp
                  </p>
                  <h3 className='text-2xl font-bold mt-1'>
                    {overviewStats.totalDonations}
                  </h3>
                </div>
                <div className='h-12 w-12 rounded-full bg-green-100 flex items-center justify-center'>
                  <DollarSign className='h-6 w-6 text-green-600' />
                </div>
              </div>
              <div className='mt-4 flex items-center text-sm'>
                <Badge
                  variant='outline'
                  className='bg-green-50 text-green-700 flex items-center gap-1'
                >
                  <ArrowUp className='h-3 w-3' />
                  <span>8.5%</span>
                </Badge>
                <span className='text-muted-foreground ml-2'>
                  so với tháng trước
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-muted-foreground'>
                    Tổng số người đóng góp
                  </p>
                  <h3 className='text-2xl font-bold mt-1'>
                    {overviewStats.totalDonors}
                  </h3>
                </div>
                <div className='h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center'>
                  <Users className='h-6 w-6 text-amber-600' />
                </div>
              </div>
              <div className='mt-4 flex items-center text-sm'>
                <Badge
                  variant='outline'
                  className='bg-green-50 text-green-700 flex items-center gap-1'
                >
                  <ArrowUp className='h-3 w-3' />
                  <span>15%</span>
                </Badge>
                <span className='text-muted-foreground ml-2'>
                  so với tháng trước
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-muted-foreground'>
                    Tỷ lệ thành công
                  </p>
                  <h3 className='text-2xl font-bold mt-1'>
                    {overviewStats.successRate}%
                  </h3>
                </div>
                <div className='h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center'>
                  <TrendingUp className='h-6 w-6 text-purple-600' />
                </div>
              </div>
              <div className='mt-4 flex items-center text-sm'>
                <Badge
                  variant='outline'
                  className='bg-green-50 text-green-700 flex items-center gap-1'
                >
                  <ArrowUp className='h-3 w-3' />
                  <span>3%</span>
                </Badge>
                <span className='text-muted-foreground ml-2'>
                  so với tháng trước
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-muted-foreground'>
                    Đóng góp trung bình
                  </p>
                  <h3 className='text-2xl font-bold mt-1'>
                    {overviewStats.avgDonation}
                  </h3>
                </div>
                <div className='h-12 w-12 rounded-full bg-red-100 flex items-center justify-center'>
                  <Gift className='h-6 w-6 text-red-600' />
                </div>
              </div>
              <div className='mt-4 flex items-center text-sm'>
                <Badge
                  variant='outline'
                  className='bg-amber-50 text-amber-700 flex items-center gap-1'
                >
                  <ArrowDown className='h-3 w-3' />
                  <span>2%</span>
                </Badge>
                <span className='text-muted-foreground ml-2'>
                  so với tháng trước
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-muted-foreground'>
                    Tổng số giao dịch
                  </p>
                  <h3 className='text-2xl font-bold mt-1'>
                    {overviewStats.totalTransactions}
                  </h3>
                </div>
                <div className='h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center'>
                  <Wallet className='h-6 w-6 text-blue-600' />
                </div>
              </div>
              <div className='mt-4 flex items-center text-sm'>
                <Badge
                  variant='outline'
                  className='bg-green-50 text-green-700 flex items-center gap-1'
                >
                  <ArrowUp className='h-3 w-3' />
                  <span>10%</span>
                </Badge>
                <span className='text-muted-foreground ml-2'>
                  so với tháng trước
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Biểu đồ và phân tích */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          <Card className='lg:col-span-2'>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-xl flex items-center gap-2'>
                  <BarChart3 className='h-5 w-5 text-blue-600' />
                  <span>Đóng góp theo tháng</span>
                </CardTitle>
                <Select defaultValue='amount'>
                  <SelectTrigger className='w-[140px]'>
                    <SelectValue placeholder='Chọn chỉ số' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='amount'>Số tiền</SelectItem>
                    <SelectItem value='donors'>Số người</SelectItem>
                    <SelectItem value='campaigns'>Số chiến dịch</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <CardDescription>
                Tổng số tiền đóng góp theo từng tháng trong năm 2025 (đơn vị:
                triệu VNĐ)
              </CardDescription>
            </CardHeader>
            <CardContent>{renderBarChart()}</CardContent>
            <CardFooter className='flex justify-between border-t pt-4'>
              <div className='text-sm text-muted-foreground'>
                <span className='font-medium text-foreground'>Tổng cộng:</span>{' '}
                5.2 tỷ VNĐ
              </div>
              <div className='text-sm text-muted-foreground'>
                <span className='font-medium text-foreground'>Trung bình:</span>{' '}
                433 triệu VNĐ/tháng
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-xl flex items-center gap-2'>
                  <PieChart className='h-5 w-5 text-green-600' />
                  <span>Phân bổ theo danh mục</span>
                </CardTitle>
              </div>
              <CardDescription>
                Phân bổ đóng góp theo từng danh mục chiến dịch
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderPieChart()}
              <div className='space-y-3 mt-4'>
                {categoryDistribution.map((category, index) => (
                  <div
                    key={index}
                    className='flex items-center justify-between'
                  >
                    <div className='flex items-center gap-2'>
                      <div
                        className={`w-3 h-3 rounded-full ${category.color}`}
                      ></div>
                      <span className='text-sm'>{category.category}</span>
                    </div>
                    <div className='text-sm font-medium'>
                      {category.percentage}%
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className='border-t pt-4'>
              <Button variant='outline' className='w-full'>
                Xem chi tiết theo danh mục
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Tabs cho các loại thống kê khác nhau */}
        <Tabs defaultValue='campaigns' className='w-full'>
          <TabsList className='mb-6'>
            <TabsTrigger value='campaigns' className='flex items-center gap-2'>
              <Heart className='h-4 w-4' />
              <span>Chiến dịch</span>
            </TabsTrigger>
            <TabsTrigger value='blockchain' className='flex items-center gap-2'>
              <LineChart className='h-4 w-4' />
              <span>Blockchain</span>
            </TabsTrigger>
            <TabsTrigger value='activities' className='flex items-center gap-2'>
              <Calendar className='h-4 w-4' />
              <span>Hoạt động gần đây</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab Chiến dịch */}
          <TabsContent value='campaigns'>
            <Card>
              <CardHeader>
                <div className='flex items-center justify-between'>
                  <CardTitle className='text-xl flex items-center gap-2'>
                    <Heart className='h-5 w-5 text-red-600' />
                    <span>Top Chiến Dịch</span>
                  </CardTitle>
                  <Select defaultValue='raised'>
                    <SelectTrigger className='w-[180px]'>
                      <SelectValue placeholder='Sắp xếp theo' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='raised'>Số tiền gây quỹ</SelectItem>
                      <SelectItem value='donors'>Số người đóng góp</SelectItem>
                      <SelectItem value='progress'>
                        Tiến độ hoàn thành
                      </SelectItem>
                      <SelectItem value='recent'>Mới nhất</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <CardDescription>
                  Những chiến dịch có số lượng đóng góp cao nhất trên nền tảng
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-6'>
                  {topCampaigns.map((campaign, index) => (
                    <div
                      key={campaign.id}
                      className='border-b pb-4 last:border-0 last:pb-0'
                    >
                      <div className='flex items-start gap-4'>
                        <div className='flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold'>
                          {index + 1}
                        </div>
                        <div className='min-w-0 flex-1'>
                          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2'>
                            <div>
                              <div className='flex items-center gap-2'>
                                <h3 className='font-semibold truncate'>
                                  {campaign.title}
                                </h3>
                                <Badge
                                  variant='outline'
                                  className='bg-blue-50 text-blue-700'
                                >
                                  {campaign.category}
                                </Badge>
                                {campaign.trend === 'up' && (
                                  <Badge className='bg-green-500'>
                                    <ArrowUp className='h-3 w-3 mr-1' />
                                    Tăng
                                  </Badge>
                                )}
                                {campaign.trend === 'down' && (
                                  <Badge className='bg-red-500'>
                                    <ArrowDown className='h-3 w-3 mr-1' />
                                    Giảm
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div className='text-right shrink-0'>
                              <div className='font-semibold text-blue-600'>
                                {campaign.raised}
                              </div>
                              <div className='text-xs text-muted-foreground'>
                                {campaign.donors} người đóng góp
                              </div>
                            </div>
                          </div>
                          <div className='mt-2 space-y-1'>
                            <Progress
                              value={campaign.progress}
                              className='h-2'
                            />
                            <div className='flex justify-between text-xs'>
                              <span>{campaign.progress}% hoàn thành</span>
                              <span className='text-muted-foreground'>
                                Mục tiêu: {campaign.goal}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant='outline' className='w-full'>
                  Xem tất cả chiến dịch
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Tab Blockchain */}
          <TabsContent value='blockchain'>
            <div className='grid gap-6'>
              <Card>
                <CardHeader>
                  <div className='flex items-center justify-between'>
                    <CardTitle className='text-xl flex items-center gap-2'>
                      <LineChart className='h-5 w-5 text-purple-600' />
                      <span>Thống Kê Blockchain</span>
                    </CardTitle>
                    <Badge className='bg-purple-600'>Ethereum</Badge>
                  </div>
                  <CardDescription>
                    Số liệu thống kê về các giao dịch blockchain trên nền tảng
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    <div className='space-y-2'>
                      <div className='text-sm text-muted-foreground'>
                        Tổng số giao dịch
                      </div>
                      <div className='text-2xl font-bold'>
                        {blockchainStats.totalTransactions}
                      </div>
                      <div className='text-xs text-muted-foreground flex items-center gap-1'>
                        <ArrowUp className='h-3 w-3 text-green-500' />
                        <span>10% so với tháng trước</span>
                      </div>
                    </div>

                    <div className='space-y-2'>
                      <div className='text-sm text-muted-foreground'>
                        Phí gas trung bình
                      </div>
                      <div className='text-2xl font-bold'>
                        {blockchainStats.avgGasFee}
                      </div>
                      <div className='text-xs text-muted-foreground flex items-center gap-1'>
                        <ArrowDown className='h-3 w-3 text-green-500' />
                        <span>5% so với tháng trước</span>
                      </div>
                    </div>

                    <div className='space-y-2'>
                      <div className='text-sm text-muted-foreground'>
                        Thời gian xác nhận trung bình
                      </div>
                      <div className='text-2xl font-bold'>
                        {blockchainStats.avgConfirmationTime}
                      </div>
                      <div className='text-xs text-muted-foreground flex items-center gap-1'>
                        <ArrowDown className='h-3 w-3 text-green-500' />
                        <span>12% so với tháng trước</span>
                      </div>
                    </div>

                    <div className='space-y-2'>
                      <div className='text-sm text-muted-foreground'>
                        Giao dịch thành công
                      </div>
                      <div className='text-2xl font-bold'>
                        {blockchainStats.successfulTransactions}
                      </div>
                      <div className='text-xs text-muted-foreground'>
                        <span className='text-green-500 font-medium'>
                          99.9%
                        </span>{' '}
                        tỷ lệ thành công
                      </div>
                    </div>

                    <div className='space-y-2'>
                      <div className='text-sm text-muted-foreground'>
                        Giao dịch thất bại
                      </div>
                      <div className='text-2xl font-bold'>
                        {blockchainStats.failedTransactions}
                      </div>
                      <div className='text-xs text-muted-foreground'>
                        <span className='text-red-500 font-medium'>0.1%</span>{' '}
                        tỷ lệ thất bại
                      </div>
                    </div>

                    <div className='space-y-2'>
                      <div className='text-sm text-muted-foreground'>
                        Tổng phí gas đã sử dụng
                      </div>
                      <div className='text-2xl font-bold'>
                        {blockchainStats.totalGasUsed}
                      </div>
                      <div className='text-xs text-muted-foreground'>
                        Tương đương{' '}
                        <span className='font-medium'>~62.3 triệu VNĐ</span>
                      </div>
                    </div>
                  </div>

                  <Separator className='my-6' />

                  <div className='space-y-4'>
                    <h4 className='text-lg font-semibold'>
                      Phân bổ giao dịch theo loại
                    </h4>
                    <div className='space-y-3'>
                      <div className='space-y-2'>
                        <div className='flex justify-between text-sm'>
                          <span>Đóng góp</span>
                          <span className='font-medium'>75%</span>
                        </div>
                        <Progress value={75} className='h-2' />
                      </div>
                      <div className='space-y-2'>
                        <div className='flex justify-between text-sm'>
                          <span>Rút tiền</span>
                          <span className='font-medium'>15%</span>
                        </div>
                        <Progress value={15} className='h-2' />
                      </div>
                      <div className='space-y-2'>
                        <div className='flex justify-between text-sm'>
                          <span>Tạo chiến dịch</span>
                          <span className='font-medium'>8%</span>
                        </div>
                        <Progress value={8} className='h-2' />
                      </div>
                      <div className='space-y-2'>
                        <div className='flex justify-between text-sm'>
                          <span>Khác</span>
                          <span className='font-medium'>2%</span>
                        </div>
                        <Progress value={2} className='h-2' />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant='outline' className='w-full'>
                    Xem chi tiết giao dịch blockchain
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          {/* Tab Hoạt động gần đây */}
          <TabsContent value='activities'>
            <Card>
              <CardHeader>
                <div className='flex items-center justify-between'>
                  <CardTitle className='text-xl flex items-center gap-2'>
                    <Calendar className='h-5 w-5 text-green-600' />
                    <span>Hoạt Động Gần Đây</span>
                  </CardTitle>
                  <Badge className='bg-green-600'>Trực tiếp</Badge>
                </div>
                <CardDescription>
                  Các hoạt động mới nhất trên nền tảng từ thiện blockchain
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-6'>
                  {recentActivities.map(activity => (
                    <div
                      key={activity.id}
                      className='flex items-start gap-4 border-b pb-4 last:border-0 last:pb-0'
                    >
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          activity.type === 'donation'
                            ? 'bg-green-100 text-green-600'
                            : activity.type === 'campaign_created'
                              ? 'bg-blue-100 text-blue-600'
                              : activity.type === 'withdrawal'
                                ? 'bg-amber-100 text-amber-600'
                                : 'bg-purple-100 text-purple-600'
                        }`}
                      >
                        {activity.type === 'donation' && (
                          <Gift className='h-5 w-5' />
                        )}
                        {activity.type === 'campaign_created' && (
                          <Heart className='h-5 w-5' />
                        )}
                        {activity.type === 'withdrawal' && (
                          <Wallet className='h-5 w-5' />
                        )}
                        {activity.type === 'campaign_completed' && (
                          <TrendingUp className='h-5 w-5' />
                        )}
                      </div>
                      <div className='flex-1 min-w-0'>
                        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1'>
                          <div>
                            <div className='font-medium'>
                              {activity.type === 'donation' &&
                                `${activity.user} đã đóng góp cho chiến dịch`}
                              {activity.type === 'campaign_created' &&
                                `${activity.user} đã tạo chiến dịch mới`}
                              {activity.type === 'withdrawal' &&
                                `${activity.user} đã rút tiền từ chiến dịch`}
                              {activity.type === 'campaign_completed' &&
                                `Chiến dịch đã hoàn thành bởi ${activity.user}`}
                            </div>
                            <div className='text-sm text-muted-foreground truncate'>
                              {activity.campaign}
                            </div>
                          </div>
                          <div className='text-sm text-right shrink-0'>
                            <div className='font-medium'>
                              {activity.amount ||
                                activity.goal ||
                                activity.raised}
                            </div>
                            <div className='text-muted-foreground'>
                              {activity.time}
                            </div>
                          </div>
                        </div>
                        <div className='mt-2'>
                          <div className='text-xs text-muted-foreground flex items-center gap-1'>
                            <span>Mã giao dịch:</span>
                            <code className='bg-muted px-1 py-0.5 rounded text-xs'>
                              {activity.txHash}
                            </code>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant='outline' className='w-full'>
                  Xem tất cả hoạt động
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

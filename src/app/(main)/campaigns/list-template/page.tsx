import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Calendar,
  Clock,
  Search,
  TrendingUp,
  Wallet,
  Users,
  DollarSign,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CampaignCard } from '@/app/(main)/campaigns/components/campaign-card';

export default async function CampaignsPage() {
  // Dữ liệu mẫu cho các chiến dịch với 3 trạng thái khác nhau
  const sampleCampaigns = [
    {
      id: 1,
      title: 'Chiến dịch hỗ trợ y tế vùng cao',
      description: 'Mang y tế đến với người dân vùng cao xa xôi',
      status: 'pending_review' as const,
      followersCount: 45,
      raised: 0,
      goal: 100000000,
      progress: 0,
      colorScheme: 'primary' as const,
      imageSrc:
        'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop&crop=center&auto=format&q=80',
    },
    {
      id: 2,
      title: 'Xây trường học cho trẻ em vùng núi',
      description: 'Xây dựng trường học đạt chuẩn cho trẻ em vùng khó khăn',
      status: 'fundraising' as const,
      raised: 60000000,
      goal: 100000000,
      progress: 60,
      colorScheme: 'accent' as const,
      imageSrc:
        'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&h=200&fit=crop&crop=center&auto=format&q=80',
    },
    {
      id: 3,
      title: 'Trồng rừng phủ xanh đồi trọc',
      description: 'Phục hồi rừng và môi trường sinh thái',
      status: 'implementation' as const,
      raised: 150000000,
      goal: 150000000,
      progress: 100,
      spent: 80000000,
      budget: 150000000,
      phase: 'Trồng cây và chăm sóc',
      currentPhase: 2,
      totalPhases: 3,
      colorScheme: 'gradient' as const,
      imageSrc:
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=200&fit=crop&crop=center&auto=format&q=80',
    },
    {
      id: 4,
      title: 'Hỗ trợ học bổng sinh viên nghèo',
      description: 'Trao học bổng cho sinh viên vượt khó học giỏi',
      status: 'pending_review' as const,
      followersCount: 28,
      raised: 0,
      goal: 50000000,
      progress: 0,
      colorScheme: 'primary' as const,
      imageSrc:
        'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=200&fit=crop&crop=center&auto=format&q=80',
    },
    {
      id: 5,
      title: 'Xây cầu qua suối cho học sinh',
      description: 'Xây cầu giúp học sinh đi học an toàn',
      status: 'fundraising' as const,
      raised: 25000000,
      goal: 80000000,
      progress: 31,
      colorScheme: 'accent' as const,
      imageSrc:
        'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=200&fit=crop&crop=center&auto=format&q=80',
    },
    {
      id: 6,
      title: 'Cung cấp nước sạch cho vùng hạn',
      description: 'Khoan giếng và lắp đặt hệ thống nước sạch',
      status: 'implementation' as const,
      raised: 200000000,
      goal: 200000000,
      progress: 100,
      spent: 120000000,
      budget: 200000000,
      phase: 'Khoan giếng và lắp đặt',
      currentPhase: 1,
      totalPhases: 2,
      colorScheme: 'gradient' as const,
      imageSrc:
        'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=200&fit=crop&crop=center&auto=format&q=80',
    },
  ];

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
          <Card>
            <CardHeader>
              <CardTitle className='text-lg'>Bộ lọc</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <label className='text-sm font-medium'>Tìm kiếm</label>
                <div className='relative'>
                  <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
                  <Input placeholder='Tìm chiến dịch...' className='pl-8' />
                </div>
              </div>

              <div className='space-y-2'>
                <label className='text-sm font-medium'>Danh mục</label>
                <Select defaultValue='all'>
                  <SelectTrigger>
                    <SelectValue placeholder='Tất cả danh mục' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>Tất cả danh mục</SelectItem>
                    <SelectItem value='education'>Giáo dục</SelectItem>
                    <SelectItem value='health'>Y tế</SelectItem>
                    <SelectItem value='environment'>Môi trường</SelectItem>
                    <SelectItem value='disaster'>Thiên tai</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='space-y-2'>
                <label className='text-sm font-medium'>Trạng thái</label>
                <Select defaultValue='all'>
                  <SelectTrigger>
                    <SelectValue placeholder='Tất cả trạng thái' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>Tất cả trạng thái</SelectItem>
                    <SelectItem value='pending_review'>Chờ duyệt</SelectItem>
                    <SelectItem value='fundraising'>Đang đóng góp</SelectItem>
                    <SelectItem value='implementation'>
                      Đang triển khai
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='space-y-2'>
                <label className='text-sm font-medium'>Sắp xếp theo</label>
                <Select defaultValue='newest'>
                  <SelectTrigger>
                    <SelectValue placeholder='Mới nhất' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='newest'>Mới nhất</SelectItem>
                    <SelectItem value='popular'>Phổ biến nhất</SelectItem>
                    <SelectItem value='ending-soon'>Sắp kết thúc</SelectItem>
                    <SelectItem value='most-funded'>
                      Quyên góp nhiều nhất
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button variant='outline' className='w-full'>
                Áp dụng bộ lọc
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className='text-lg'>Thống kê</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center justify-between'>
                <span className='text-sm'>Tổng số chiến dịch</span>
                <span className='font-medium'>124</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm'>Chờ duyệt</span>
                <span className='font-medium'>28</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm'>Đang đóng góp</span>
                <span className='font-medium'>52</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm'>Đang triển khai</span>
                <span className='font-medium'>44</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm'>Tổng quyên góp</span>
                <span className='font-medium'>2.5 tỷ VNĐ</span>
              </div>
            </CardContent>
          </Card>
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
                Hiển thị 1-6 trong số {sampleCampaigns.length} chiến dịch
              </span>
            </div>

            <TabsContent value='grid' className='mt-0'>
              <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                {sampleCampaigns.map(campaign => (
                  <CampaignCard
                    key={campaign.id}
                    id={campaign.id}
                    title={campaign.title}
                    description={campaign.description}
                    imageSrc={campaign.imageSrc}
                    status={campaign.status}
                    raised={campaign.raised}
                    goal={campaign.goal}
                    progress={campaign.progress}
                    followersCount={campaign.followersCount}
                    spent={campaign.spent}
                    budget={campaign.budget}
                    phase={campaign.phase}
                    currentPhase={campaign.currentPhase}
                    totalPhases={campaign.totalPhases}
                    colorScheme={campaign.colorScheme}
                    className='h-full'
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value='list' className='mt-0'>
              <div className='space-y-4'>
                {sampleCampaigns.map(campaign => (
                  <Link
                    key={campaign.id}
                    href={`/campaigns/${campaign.id}`}
                    className='block'
                  >
                    <Card className='overflow-hidden hover:shadow-xl hover:shadow-gray-100/50 transition-all duration-200 hover:border-primary/30 group bg-white border border-gray-200 shadow-sm'>
                      <div className='flex flex-col md:flex-row md:h-44 pb-4'>
                        <div className='md:w-60 md:h-full'>
                          <img
                            src={campaign.imageSrc}
                            alt={campaign.title}
                            className='w-full h-48 md:h-full object-cover'
                          />
                        </div>
                        <div className='flex-1 p-4 pb-6 flex flex-col justify-between min-h-0'>
                          <div>
                            <div className='mb-2 flex flex-wrap items-start gap-2'>
                              <Badge
                                variant='outline'
                                className='bg-accent/10 text-accent border-accent/20'
                              >
                                {campaign.id % 3 === 0
                                  ? 'Môi trường'
                                  : campaign.id % 3 === 1
                                    ? 'Y tế'
                                    : 'Giáo dục'}
                              </Badge>
                              {campaign.status === 'pending_review' && (
                                <Badge
                                  variant='outline'
                                  className='bg-yellow-50 text-yellow-700 border-yellow-200'
                                >
                                  Chờ duyệt
                                </Badge>
                              )}
                              {campaign.status === 'fundraising' && (
                                <Badge
                                  variant='outline'
                                  className='bg-blue-50 text-blue-700 border-blue-200'
                                >
                                  Đang đóng góp
                                </Badge>
                              )}
                              {campaign.status === 'implementation' && (
                                <Badge
                                  variant='outline'
                                  className='bg-green-50 text-green-700 border-green-200'
                                >
                                  Đang triển khai
                                </Badge>
                              )}
                            </div>

                            <h3 className='mb-2 text-lg font-semibold group-hover:text-primary transition-colors line-clamp-1'>
                              {campaign.title}
                            </h3>
                            <p className='mb-3 text-sm text-muted-foreground line-clamp-2'>
                              {campaign.description}
                            </p>
                          </div>

                          {/* Thông tin cơ bản theo trạng thái */}
                          <div className='space-y-2 mt-auto'>
                            {/* Dòng 1 */}
                            <div className='flex items-center justify-between text-sm'>
                              {campaign.status === 'pending_review' && (
                                <>
                                  <div className='flex items-center space-x-1 text-muted-foreground'>
                                    <Users className='h-4 w-4' />
                                    <span>Người quan tâm</span>
                                  </div>
                                  <span className='font-medium'>
                                    {campaign.followersCount}
                                  </span>
                                </>
                              )}

                              {campaign.status === 'fundraising' && (
                                <>
                                  <div className='text-muted-foreground'>
                                    % hoàn thành
                                  </div>
                                  <span className='font-medium'>
                                    {campaign.progress}%
                                  </span>
                                </>
                              )}

                              {campaign.status === 'implementation' && (
                                <>
                                  <div className='text-muted-foreground'>
                                    Giai đoạn hiện tại
                                  </div>
                                  <span className='font-medium'>
                                    {campaign.currentPhase}/
                                    {campaign.totalPhases}
                                  </span>
                                </>
                              )}
                            </div>

                            {/* Dòng 2 */}
                            <div className='flex items-center justify-between text-sm'>
                              {campaign.status === 'pending_review' && (
                                <>
                                  <div className='text-muted-foreground'>
                                    Mục tiêu
                                  </div>
                                  <span className='font-medium'>
                                    {new Intl.NumberFormat('vi-VN').format(
                                      campaign.goal
                                    )}{' '}
                                    VNĐ
                                  </span>
                                </>
                              )}

                              {campaign.status === 'fundraising' && (
                                <>
                                  <div className='text-muted-foreground'>
                                    Đã quyên góp
                                  </div>
                                  <span className='font-medium'>
                                    {new Intl.NumberFormat('vi-VN').format(
                                      campaign.raised
                                    )}{' '}
                                    VNĐ
                                  </span>
                                </>
                              )}

                              {campaign.status === 'implementation' && (
                                <>
                                  <div className='flex items-center space-x-1 text-muted-foreground'>
                                    <DollarSign className='h-4 w-4' />
                                    <span>Đã chi tiêu</span>
                                  </div>
                                  <span className='font-medium'>
                                    {new Intl.NumberFormat('vi-VN').format(
                                      campaign.spent || 0
                                    )}{' '}
                                    VNĐ
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className='mt-6 flex items-center justify-between'>
            <Button variant='outline' size='sm' disabled>
              Trang trước
            </Button>
            <div className='flex items-center space-x-2'>
              <Button
                variant='outline'
                size='sm'
                className='h-8 w-8 p-0 bg-primary/10 text-primary'
              >
                1
              </Button>
              <Button variant='outline' size='sm' className='h-8 w-8 p-0'>
                2
              </Button>
              <Button variant='outline' size='sm' className='h-8 w-8 p-0'>
                3
              </Button>
              <span>...</span>
              <Button variant='outline' size='sm' className='h-8 w-8 p-0'>
                8
              </Button>
            </div>
            <Button variant='outline' size='sm'>
              Trang sau
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Heart,
  MessageCircle,
  Share2,
  TrendingUp,
  Users,
  Wallet,
  Search,
  ThumbsUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  Target,
  Receipt,
  Plus,
  Gift,
  Trophy,
  Eye,
  ArrowUp,
  DollarSign,
  Calendar,
  FileText,
  Star,
  MoreHorizontal,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import CreatePost from '@/components/create-post';
import { CampaignCard } from '@/components/campaign-card';
import ClientComponentTest from '@/components/client-component-test';

import campaignsApiRequest from '@/apiRequests/campaigns';

export default async function Home() {
  const resTest = await campaignsApiRequest.overview();
  console.log('Home_____', resTest);

  return (
    <div className='container mx-auto px-4 py-6 max-w-7xl'>
      {/* <ClientComponentTest /> */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4'>
        {/* Main content - 3/4 width on desktop */}
        <div className='md:col-span-2 lg:col-span-3'>
          <Tabs defaultValue='latest' className='w-full'>
            <div className='flex items-center justify-between mb-2'>
              <TabsList className='bg-muted/50'>
                <TabsTrigger value='latest'>Mới nhất</TabsTrigger>
                <TabsTrigger value='trending'>Xu hướng</TabsTrigger>
                <TabsTrigger value='education'>Giáo dục</TabsTrigger>
                <TabsTrigger value='health'>Y tế</TabsTrigger>
                <TabsTrigger value='environment'>Môi trường</TabsTrigger>
              </TabsList>
              <Link href='/campaigns/create'>
                <Button className='bg-primary hover:bg-primary/90 text-primary-foreground'>
                  <Wallet className='mr-2 h-4 w-4' />
                  Tạo chiến dịch
                </Button>
              </Link>
            </div>

            <TabsContent value='latest' className='mt-6'>
              {/* Create Post Component */}
              <CreatePost />

              {/* 1. Bài đăng về chiến dịch mới đang chờ duyệt */}
              <Card className='mb-6 overflow-hidden shadow-sm hover:shadow-md transition-shadow'>
                <CardHeader className='pb-3'>
                  <div className='flex items-start justify-between'>
                    <div className='flex items-center space-x-3'>
                      <Avatar>
                        <AvatarImage
                          src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
                          alt='Avatar'
                        />
                        <AvatarFallback>MH</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className='flex items-center space-x-2'>
                          <span className='font-semibold'>Minh Hoàng</span>
                          <Badge
                            variant='outline'
                            className='bg-orange-50 text-orange-700 border-orange-200'
                          >
                            <Clock className='mr-1 h-3 w-3' />
                            Chờ duyệt
                          </Badge>
                        </div>
                        <p className='text-xs text-muted-foreground'>
                          1 giờ trước
                        </p>
                      </div>
                    </div>
                    <Button variant='ghost' size='sm'>
                      <MoreHorizontal className='h-4 w-4' />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    <p className='font-medium'>
                      🏥 Chiến dịch "Mổ tim miễn phí cho trẻ em nghèo" đang chờ
                      duyệt
                    </p>
                    <p>
                      Chúng tôi cần sự ủng hộ của cộng đồng để chiến dịch này
                      được ưu tiên xem xét. Mỗi vote của bạn sẽ giúp các em nhỏ
                      có cơ hội được phẫu thuật tim sớm hơn!
                    </p>
                    <img
                      src='https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop'
                      alt='Bệnh viện tim'
                      className='rounded-lg object-cover w-full h-48'
                    />
                    <div className='bg-muted/30 p-4 rounded-lg border'>
                      <div className='flex items-center justify-between mb-3'>
                        <span className='text-sm font-medium'>
                          Mức độ quan tâm
                        </span>
                        <span className='text-sm font-medium'>
                          156 người quan tâm
                        </span>
                      </div>
                      <div className='flex justify-center'>
                        <Button
                          variant='outline'
                          className='flex-1 bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100'
                        >
                          <Heart className='w-4 h-4 mr-2' />
                          Quan tâm
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className='border-t pt-3'>
                  <div className='flex items-center justify-between w-full'>
                    <div className='flex items-center space-x-4'>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='flex items-center gap-1 text-muted-foreground hover:text-primary'
                      >
                        <Heart className='h-4 w-4' />
                        <span className='text-sm'>89</span>
                      </Button>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='flex items-center gap-1 text-muted-foreground hover:text-primary'
                      >
                        <MessageCircle className='h-4 w-4' />
                        <span className='text-sm'>18</span>
                      </Button>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='flex items-center gap-1 text-muted-foreground hover:text-primary'
                      >
                        <Share2 className='h-4 w-4' />
                        <span className='text-sm'>Chia sẻ</span>
                      </Button>
                    </div>
                    <div className='px-3'>
                      <Link
                        href='/campaigns/1'
                        className='text-sm text-blue-400 hover:text-blue-500 hover:underline italic'
                      >
                        Chi tiết chiến dịch
                      </Link>
                    </div>
                  </div>
                </CardFooter>
              </Card>

              {/* 2. Bài đăng về chiến dịch được duyệt thành công */}
              <Card className='mb-6 overflow-hidden shadow-sm hover:shadow-md transition-shadow'>
                <CardHeader className='pb-3'>
                  <div className='flex items-start justify-between'>
                    <div className='flex items-center space-x-3'>
                      <Avatar>
                        <AvatarImage
                          src='https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
                          alt='Avatar'
                        />
                        <AvatarFallback>TL</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className='flex items-center space-x-2'>
                          <span className='font-semibold'>Thu Lan</span>
                          <Badge
                            variant='outline'
                            className='bg-green-50 text-green-700 border-green-200'
                          >
                            <CheckCircle className='mr-1 h-3 w-3' />
                            Đã duyệt
                          </Badge>
                        </div>
                        <p className='text-xs text-muted-foreground'>
                          3 giờ trước
                        </p>
                      </div>
                    </div>
                    <Button variant='ghost' size='sm'>
                      <MoreHorizontal className='h-4 w-4' />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    <p className='font-medium'>
                      🎉 Chiến dịch "Xây cầu dân sinh vượt suối" đã được phê
                      duyệt!
                    </p>
                    <p>
                      Cảm ơn tất cả mọi người đã vote ủng hộ! Giờ đây chúng ta
                      có thể bắt đầu quyên góp để giúp 500 hộ dân không còn phải
                      lội suối nguy hiểm mỗi ngày.
                    </p>
                    <img
                      src='https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop'
                      alt='Cầu dân sinh'
                      className='rounded-lg object-cover w-full h-48'
                    />
                    <div className='bg-muted/30 p-4 rounded-lg border'>
                      <div className='flex items-center justify-between mb-2'>
                        <span className='text-sm font-medium'>
                          Mục tiêu: 500.000.000 VNĐ
                        </span>
                        <span className='text-sm font-medium'>
                          0% hoàn thành
                        </span>
                      </div>
                      <Progress value={0} className='h-2 mb-3' />
                      <p className='text-xs text-muted-foreground mb-3'>
                        Hãy là người đầu tiên đóng góp!
                      </p>
                      <div className='flex justify-center'>
                        <Button className='flex-1'>
                          <Wallet className='h-4 w-4 mr-1' />
                          Đóng góp
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className='border-t pt-3'>
                  <div className='flex items-center justify-between w-full'>
                    <div className='flex items-center space-x-4'>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='flex items-center gap-1 text-muted-foreground hover:text-primary'
                      >
                        <Heart className='h-4 w-4' />
                        <span className='text-sm'>89</span>
                      </Button>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='flex items-center gap-1 text-muted-foreground hover:text-primary'
                      >
                        <MessageCircle className='h-4 w-4' />
                        <span className='text-sm'>32</span>
                      </Button>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='flex items-center gap-1 text-muted-foreground hover:text-primary'
                      >
                        <Share2 className='h-4 w-4' />
                        <span className='text-sm'>Chia sẻ</span>
                      </Button>
                    </div>
                    <div className='px-3'>
                      <Link
                        href='/campaigns/2'
                        className='text-sm text-blue-400 hover:text-blue-500 hover:underline italic'
                      >
                        Chi tiết chiến dịch
                      </Link>
                    </div>
                  </div>
                </CardFooter>
              </Card>

              {/* 3. Bài đăng về hoạt động từ thiện trong giai đoạn */}
              <Card className='mb-6 overflow-hidden shadow-sm hover:shadow-md transition-shadow'>
                <CardHeader className='pb-3'>
                  <div className='flex items-start justify-between'>
                    <div className='flex items-center space-x-3'>
                      <Avatar>
                        <AvatarImage
                          src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
                          alt='Avatar'
                        />
                        <AvatarFallback>VD</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className='flex items-center space-x-2'>
                          <span className='font-semibold'>Văn Đức</span>
                          <Badge
                            variant='outline'
                            className='bg-blue-50 text-blue-700 border-blue-200'
                          >
                            <Target className='mr-1 h-3 w-3' />
                            Giai đoạn 2/3
                          </Badge>
                        </div>
                        <p className='text-xs text-muted-foreground'>
                          5 giờ trước
                        </p>
                      </div>
                    </div>
                    <Button variant='ghost' size='sm'>
                      <MoreHorizontal className='h-4 w-4' />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    <p className='font-medium'>
                      📚 Cập nhật tiến độ "Xây thư viện cho trường vùng cao"
                    </p>
                    <p>
                      Giai đoạn 2 đang diễn ra tốt đẹp! Chúng tôi đã hoàn thành
                      80% việc lắp đặt kệ sách và bàn đọc. Các em học sinh rất
                      háo hức chờ đợi thư viện mới!
                    </p>
                    <div className='grid grid-cols-2 gap-2'>
                      <img
                        src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop'
                        alt='Thư viện'
                        className='rounded-lg object-cover h-40 w-full'
                      />
                      <img
                        src='https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop'
                        alt='Học sinh'
                        className='rounded-lg object-cover h-40 w-full'
                      />
                    </div>
                    <div className='bg-muted/30 p-4 rounded-lg border'>
                      <div className='flex items-center justify-between mb-2'>
                        <span className='text-sm font-medium'>
                          Tiến độ giai đoạn 2
                        </span>
                        <span className='text-sm font-medium'>80%</span>
                      </div>
                      <Progress value={80} className='h-2 mb-3' />
                      <p className='text-xs text-muted-foreground mb-3'>
                        Dự kiến hoàn thành trong 1 tuần
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className='border-t pt-3'>
                  <div className='flex items-center justify-between w-full'>
                    <div className='flex items-center space-x-4'>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='flex items-center gap-1 text-muted-foreground hover:text-primary'
                      >
                        <Heart className='h-4 w-4' />
                        <span className='text-sm'>145</span>
                      </Button>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='flex items-center gap-1 text-muted-foreground hover:text-primary'
                      >
                        <MessageCircle className='h-4 w-4' />
                        <span className='text-sm'>28</span>
                      </Button>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='flex items-center gap-1 text-muted-foreground hover:text-primary'
                      >
                        <Share2 className='h-4 w-4' />
                        <span className='text-sm'>Chia sẻ</span>
                      </Button>
                    </div>
                    <div className='px-3'>
                      <Link
                        href='/campaigns/1'
                        className='text-sm text-blue-400 hover:text-blue-500 hover:underline italic'
                      >
                        Chi tiết chiến dịch
                      </Link>
                    </div>
                  </div>
                </CardFooter>
              </Card>

              {/* 4. Bài đăng chứng minh chi tiêu chờ duyệt */}
              <Card className='mb-6 overflow-hidden shadow-sm hover:shadow-md transition-shadow'>
                <CardHeader className='pb-3'>
                  <div className='flex items-start justify-between'>
                    <div className='flex items-center space-x-3'>
                      <Avatar>
                        <AvatarImage
                          src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
                          alt='Avatar'
                        />
                        <AvatarFallback>NH</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className='flex items-center space-x-2'>
                          <span className='font-semibold'>Ngọc Hân</span>
                          <Badge
                            variant='outline'
                            className='bg-yellow-50 text-yellow-700 border-yellow-200'
                          >
                            <Receipt className='mr-1 h-3 w-3' />
                            Chờ duyệt chi tiêu
                          </Badge>
                        </div>
                        <p className='text-xs text-muted-foreground'>
                          8 giờ trước
                        </p>
                      </div>
                    </div>
                    <Button variant='ghost' size='sm'>
                      <MoreHorizontal className='h-4 w-4' />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    <p className='font-medium'>
                      📋 Đã nộp chứng minh chi tiêu giai đoạn 1 - "Mua sách cho
                      thư viện"
                    </p>
                    <p>
                      Chúng tôi đã hoàn thành việc mua 500 cuốn sách với tổng
                      chi phí 45.000.000 VNĐ. Tài liệu chứng minh chi tiêu đã
                      được nộp và đang chờ cộng đồng xem xét để mở khóa giai
                      đoạn 2.
                    </p>
                    <div className='bg-muted/30 p-4 rounded-lg border'>
                      <div className='grid grid-cols-2 gap-4 text-sm mb-3'>
                        <div>
                          <span className='font-medium'>Ngân sách:</span>
                          <p>50.000.000 VNĐ</p>
                        </div>
                        <div>
                          <span className='font-medium'>Chi thực tế:</span>
                          <p>45.000.000 VNĐ</p>
                        </div>
                        <div>
                          <span className='font-medium'>Tiết kiệm:</span>
                          <p className='text-green-600'>+5.000.000 VNĐ</p>
                        </div>
                        <div>
                          <span className='font-medium'>Trạng thái:</span>
                          <p className='text-muted-foreground'>Đang duyệt</p>
                        </div>
                      </div>
                      <div className='flex items-center justify-between pt-3 border-t'>
                        <div className='flex items-center space-x-2 text-sm'>
                          <FileText className='h-4 w-4' />
                          <span>3 tài liệu đính kèm</span>
                        </div>
                        <Button variant='outline' size='sm'>
                          <FileText className='h-4 w-4 mr-1' />
                          Xem tài liệu
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className='border-t pt-3'>
                  <div className='flex items-center justify-between w-full'>
                    <div className='flex items-center space-x-4'>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='flex items-center gap-1 text-muted-foreground hover:text-primary'
                      >
                        <Heart className='h-4 w-4' />
                        <span className='text-sm'>45</span>
                      </Button>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='flex items-center gap-1 text-muted-foreground hover:text-primary'
                      >
                        <MessageCircle className='h-4 w-4' />
                        <span className='text-sm'>12</span>
                      </Button>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='flex items-center gap-1 text-muted-foreground hover:text-primary'
                      >
                        <Share2 className='h-4 w-4' />
                        <span className='text-sm'>Chia sẻ</span>
                      </Button>
                    </div>
                    <div className='px-3'>
                      <Link
                        href='/campaigns/4'
                        className='text-sm text-blue-400 hover:text-blue-500 hover:underline italic'
                      >
                        Chi tiết chiến dịch
                      </Link>
                    </div>
                  </div>
                </CardFooter>
              </Card>

              {/* 5a. Bài đăng kêu gọi bổ sung - Chờ duyệt */}
              <Card className='mb-6 overflow-hidden shadow-sm hover:shadow-md transition-shadow'>
                <CardHeader className='pb-3'>
                  <div className='flex items-start justify-between'>
                    <div className='flex items-center space-x-3'>
                      <Avatar>
                        <AvatarImage
                          src='https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
                          alt='Avatar'
                        />
                        <AvatarFallback>QA</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className='flex items-center space-x-2'>
                          <span className='font-semibold'>Quang Anh</span>
                          <Badge
                            variant='outline'
                            className='bg-orange-50 text-orange-700 border-orange-200'
                          >
                            <Clock className='mr-1 h-3 w-3' />
                            Bổ sung chờ duyệt
                          </Badge>
                        </div>
                        <p className='text-xs text-muted-foreground'>
                          1 ngày trước
                        </p>
                      </div>
                    </div>
                    <Button variant='ghost' size='sm'>
                      <MoreHorizontal className='h-4 w-4' />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    <p className='font-medium'>
                      📋 Yêu cầu bổ sung "Máy lọc nước cho trường học vùng cao"
                      đang chờ duyệt
                    </p>
                    <p>
                      Do chi phí vận chuyển vượt dự kiến, chúng tôi cần thêm
                      20.000.000 VNĐ để hoàn thành việc lắp đặt hệ thống lọc
                      nước sạch cho 300 học sinh. Hãy vote để ủng hộ yêu cầu
                      này!
                    </p>
                    <img
                      src='https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=400&fit=crop'
                      alt='Máy lọc nước'
                      className='rounded-lg object-cover w-full h-48'
                    />

                    <div className='bg-muted/30 p-4 rounded-lg border'>
                      <h4 className='font-medium text-sm mb-3'>
                        Lý do bổ sung & Tài liệu minh chứng:
                      </h4>
                      <div className='space-y-2 text-sm mb-3'>
                        <div className='flex justify-between'>
                          <span>Chi phí vận chuyển thực tế:</span>
                          <span className='font-medium'>25.000.000 VNĐ</span>
                        </div>
                        <div className='flex justify-between'>
                          <span>Chi phí dự kiến ban đầu:</span>
                          <span className='font-medium'>5.000.000 VNĐ</span>
                        </div>
                        <div className='flex justify-between text-red-600'>
                          <span>Cần bổ sung:</span>
                          <span className='font-medium'>20.000.000 VNĐ</span>
                        </div>
                      </div>
                      <div className='flex items-center justify-between pt-3 border-t'>
                        <div className='flex items-center space-x-2 text-sm'>
                          <FileText className='h-4 w-4' />
                          <span>3 tài liệu đính kèm</span>
                        </div>
                        <Button variant='outline' size='sm'>
                          <FileText className='h-4 w-4 mr-1' />
                          Tài liệu
                        </Button>
                      </div>
                    </div>

                    <div className='bg-muted/30 p-4 rounded-lg border'>
                      <div className='flex items-center justify-between mb-3'>
                        <span className='text-sm font-medium'>
                          Mức độ quan tâm
                        </span>
                        <span className='text-sm font-medium'>
                          89 người quan tâm
                        </span>
                      </div>
                      <div className='flex justify-center'>
                        <Button
                          variant='outline'
                          className='flex-1 bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100'
                        >
                          <Heart className='w-4 h-4 mr-2' />
                          Quan tâm
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className='border-t pt-3'>
                  <div className='flex items-center justify-between w-full'>
                    <div className='flex items-center space-x-4'>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='flex items-center gap-1 text-muted-foreground hover:text-primary'
                      >
                        <Heart className='h-4 w-4' />
                        <span className='text-sm'>67</span>
                      </Button>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='flex items-center gap-1 text-muted-foreground hover:text-primary'
                      >
                        <MessageCircle className='h-4 w-4' />
                        <span className='text-sm'>15</span>
                      </Button>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='flex items-center gap-1 text-muted-foreground hover:text-primary'
                      >
                        <Share2 className='h-4 w-4' />
                        <span className='text-sm'>Chia sẻ</span>
                      </Button>
                    </div>
                    <div className='px-3'>
                      <Link
                        href='/campaigns/1'
                        className='text-sm text-blue-400 hover:text-blue-500 hover:underline italic'
                      >
                        Chi tiết chiến dịch
                      </Link>
                    </div>
                  </div>
                </CardFooter>
              </Card>

              {/* 5b. Bài đăng kêu gọi bổ sung - Đã duyệt */}
              <Card className='mb-6 overflow-hidden shadow-sm hover:shadow-md transition-shadow'>
                <CardHeader className='pb-3'>
                  <div className='flex items-start justify-between'>
                    <div className='flex items-center space-x-3'>
                      <Avatar>
                        <AvatarImage
                          src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
                          alt='Avatar'
                        />
                        <AvatarFallback>LH</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className='flex items-center space-x-2'>
                          <span className='font-semibold'>Linh Hương</span>
                          <Badge
                            variant='outline'
                            className='bg-green-50 text-green-700 border-green-200'
                          >
                            <CheckCircle className='mr-1 h-3 w-3' />
                            Bổ sung đã duyệt
                          </Badge>
                        </div>
                        <p className='text-xs text-muted-foreground'>
                          3 giờ trước
                        </p>
                      </div>
                    </div>
                    <Button variant='ghost' size='sm'>
                      <MoreHorizontal className='h-4 w-4' />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    <p className='font-medium'>
                      🎉 Yêu cầu bổ sung "Thiết bị y tế khẩn cấp" đã được phê
                      duyệt!
                    </p>
                    <p>
                      Cảm ơn cộng đồng đã vote ủng hộ! Chúng tôi cần bổ sung
                      15.000.000 VNĐ để mua thêm thiết bị y tế khẩn cấp phục vụ
                      đợt dịch bệnh. Mọi đóng góp đều được ghi nhận minh bạch.
                    </p>
                    <img
                      src='https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop'
                      alt='Thiết bị y tế'
                      className='rounded-lg object-cover w-full h-48'
                    />

                    <div className='bg-muted/30 p-4 rounded-lg border'>
                      <h4 className='font-medium text-sm mb-3'>
                        Chi tiết yêu cầu bổ sung:
                      </h4>
                      <div className='space-y-2 text-sm'>
                        <div className='flex justify-between'>
                          <span>Ngân sách gốc:</span>
                          <span className='font-medium'>50.000.000 VNĐ</span>
                        </div>
                        <div className='flex justify-between'>
                          <span>Đã quyên góp:</span>
                          <span className='font-medium'>50.000.000 VNĐ</span>
                        </div>
                        <div className='flex justify-between text-blue-600'>
                          <span>Cần bổ sung:</span>
                          <span className='font-medium'>15.000.000 VNĐ</span>
                        </div>
                      </div>
                      <div className='mt-3 pt-3 border-t'>
                        <div className='flex items-center space-x-2 text-sm'>
                          <FileText className='h-4 w-4' />
                          <span>
                            Đã xác minh: báo giá thiết bị, giấy phép nhập khẩu
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className='bg-muted/30 p-4 rounded-lg border'>
                      <div className='flex items-center justify-between mb-2'>
                        <span className='text-sm font-medium'>
                          Tiến độ quyên góp bổ sung
                        </span>
                        <span className='text-sm font-medium'>
                          60% hoàn thành
                        </span>
                      </div>
                      <Progress value={60} className='h-2 mb-3' />
                      <p className='text-xs text-muted-foreground mb-3'>
                        Đã quyên góp: 9.000.000 VNĐ từ 34 người
                      </p>
                      <div className='flex justify-center space-x-2'>
                        <Button className='flex-1'>
                          <Wallet className='h-4 w-4 mr-1' />
                          Đóng góp
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className='border-t pt-3'>
                  <div className='flex items-center justify-between w-full'>
                    <div className='flex items-center space-x-4'>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='flex items-center gap-1 text-muted-foreground hover:text-primary'
                      >
                        <Heart className='h-4 w-4' />
                        <span className='text-sm'>78</span>
                      </Button>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='flex items-center gap-1 text-muted-foreground hover:text-primary'
                      >
                        <MessageCircle className='h-4 w-4' />
                        <span className='text-sm'>23</span>
                      </Button>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='flex items-center gap-1 text-muted-foreground hover:text-primary'
                      >
                        <Share2 className='h-4 w-4' />
                        <span className='text-sm'>Chia sẻ</span>
                      </Button>
                    </div>
                    <div className='px-3'>
                      <Link
                        href='/campaigns/1'
                        className='text-sm text-blue-400 hover:text-blue-500 hover:underline italic'
                      >
                        Chi tiết chiến dịch
                      </Link>
                    </div>
                  </div>
                </CardFooter>
              </Card>

              {/* 6. Bài đăng chiến dịch hoàn thành thành công */}
              <Card className='mb-6 overflow-hidden shadow-sm hover:shadow-md transition-shadow'>
                <CardHeader className='pb-3'>
                  <div className='flex items-start justify-between'>
                    <div className='flex items-center space-x-3'>
                      <Avatar>
                        <AvatarImage
                          src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
                          alt='Avatar'
                        />
                        <AvatarFallback>TH</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className='flex items-center space-x-2'>
                          <span className='font-semibold'>Trần Hùng</span>
                          <Badge
                            variant='outline'
                            className='bg-emerald-50 text-emerald-700 border-emerald-200'
                          >
                            <Trophy className='mr-1 h-3 w-3' />
                            Hoàn thành
                          </Badge>
                        </div>
                        <p className='text-xs text-muted-foreground'>
                          2 ngày trước
                        </p>
                      </div>
                    </div>
                    <Button variant='ghost' size='sm'>
                      <MoreHorizontal className='h-4 w-4' />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    <p className='font-medium'>
                      🎉 Chiến dịch "Xây trường học cho trẻ em vùng cao" đã hoàn
                      thành!
                    </p>
                    <p>
                      Sau 6 tháng triển khai, chúng tôi đã xây dựng thành công
                      ngôi trường mới với 6 phòng học, phục vụ 200 em học sinh
                      vùng cao. Cảm ơn 456 nhà hảo tâm đã đồng hành cùng chúng
                      tôi!
                    </p>
                    <div className='grid grid-cols-2 gap-2'>
                      <img
                        src='https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop'
                        alt='Trường học mới'
                        className='rounded-lg object-cover h-40 w-full'
                      />
                      <img
                        src='https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop'
                        alt='Học sinh vui mừng'
                        className='rounded-lg object-cover h-40 w-full'
                      />
                    </div>
                    <div className='bg-muted/30 p-4 rounded-lg border'>
                      <div className='grid grid-cols-3 gap-4 text-center'>
                        <div>
                          <p className='text-2xl font-bold'>100M</p>
                          <p className='text-xs text-muted-foreground'>
                            Tổng quyên góp
                          </p>
                        </div>
                        <div>
                          <p className='text-2xl font-bold'>456</p>
                          <p className='text-xs text-muted-foreground'>
                            Nhà hảo tâm
                          </p>
                        </div>
                        <div>
                          <p className='text-2xl font-bold'>200</p>
                          <p className='text-xs text-muted-foreground'>
                            Học sinh thưởng lợi
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className='border-t pt-3'>
                  <div className='flex items-center justify-between w-full'>
                    <div className='flex items-center space-x-4'>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='flex items-center gap-1 text-muted-foreground hover:text-primary'
                      >
                        <Heart className='h-4 w-4' />
                        <span className='text-sm'>892</span>
                      </Button>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='flex items-center gap-1 text-muted-foreground hover:text-primary'
                      >
                        <MessageCircle className='h-4 w-4' />
                        <span className='text-sm'>156</span>
                      </Button>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='flex items-center gap-1 text-muted-foreground hover:text-primary'
                      >
                        <Share2 className='h-4 w-4' />
                        <span className='text-sm'>Chia sẻ</span>
                      </Button>
                    </div>
                    <div className='px-3'>
                      <Link
                        href='/campaigns/1'
                        className='text-sm text-blue-400 hover:text-blue-500 hover:underline italic'
                      >
                        Chi tiết chiến dịch
                      </Link>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value='trending'>
              <div className='py-10 text-center text-muted-foreground'>
                Nội dung xu hướng sẽ hiển thị ở đây
              </div>
            </TabsContent>

            <TabsContent value='education'>
              <div className='py-10 text-center text-muted-foreground'>
                Nội dung giáo dục sẽ hiển thị ở đây
              </div>
            </TabsContent>

            <TabsContent value='health'>
              <div className='py-10 text-center text-muted-foreground'>
                Nội dung y tế sẽ hiển thị ở đây
              </div>
            </TabsContent>

            <TabsContent value='environment'>
              <div className='py-10 text-center text-muted-foreground'>
                Nội dung môi trường sẽ hiển thị ở đây
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar - 1/4 width on desktop */}
        <div className='space-y-6 sticky top-6 h-fit max-h-[calc(100vh-3rem)] overflow-y-auto'>
          {/* Thanh tìm kiếm */}
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
            <Input
              placeholder='Tìm kiếm chiến dịch, người dùng...'
              className='pl-10 bg-background'
            />
          </div>

          <Card className='border border-border/40 shadow-sm'>
            <CardHeader className='pb-2'>
              <CardTitle className='text-lg font-semibold text-foreground'>
                Chiến dịch nổi bật
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              {[1, 2, 3].map(i => (
                <CampaignCard
                  key={i}
                  id={i}
                  title={`Chiến dịch từ thiện ${i}`}
                  description={`Mô tả chiến dịch ${i}`}
                  raised={(50 + i * 10) * 1000000}
                  goal={100000000}
                  progress={50 + i * 10}
                  disabledStatus
                  status={
                    i === 1 ? 'pending' : i === 2 ? 'funding' : 'implementing'
                  }
                  interestedCount={i === 1 ? 25 : undefined}
                  currentPhase={i === 3 ? 2 : undefined}
                  totalPhases={i === 3 ? 3 : undefined}
                  spent={i === 3 ? 40000000 : undefined}
                  budget={i === 3 ? 60000000 : undefined}
                  variant='compact'
                  colorScheme={
                    i === 1 ? 'primary' : i === 2 ? 'accent' : 'gradient'
                  }
                />
              ))}
              <Button
                variant='outline'
                className='w-full hover:bg-primary/5 hover:text-primary transition-colors'
              >
                Xem tất cả chiến dịch
              </Button>
            </CardContent>
          </Card>

          <Card className='border border-border/40 shadow-sm'>
            <CardHeader className='pb-2'>
              <CardTitle className='text-lg font-semibold text-foreground'>
                Cộng đồng hoạt động
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-2'>
                  <Users className='h-4 w-4 text-primary' />
                  <span className='text-sm'>Thành viên tích cực</span>
                </div>
                <span className='text-sm font-medium'>1,245</span>
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-2'>
                  <TrendingUp className='h-4 w-4 text-accent' />
                  <span className='text-sm'>Chiến dịch thành công</span>
                </div>
                <span className='text-sm font-medium'>87</span>
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-2'>
                  <Wallet className='h-4 w-4 text-primary' />
                  <span className='text-sm'>Tổng quyên góp</span>
                </div>
                <span className='text-sm font-medium'>2.5 tỷ VNĐ</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

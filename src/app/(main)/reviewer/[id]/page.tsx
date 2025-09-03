'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  AlertTriangle,
  ArrowLeft,
  Calendar,
  Clock,
  DollarSign,
  Download,
  Eye,
  FileText,
  MapPin,
  Target,
  Users,
  Wallet,
  ExternalLink,
  Image as ImageIcon,
  Play,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

export default function ReviewDetailPage() {
  const params = useParams();
  const reviewId = params.id as string;

  // Mock data - trong thực tế sẽ fetch từ API
  const reviewItem = {
    id: reviewId,
    campaignId: 'camp_001',
    campaignTitle: 'Xây trường học vùng cao Sapa',
    creatorName: 'Nguyễn Văn A',
    creatorReputation: 85,
    creatorJoinDate: new Date(2023, 5, 15),
    creatorCampaignsCompleted: 3,
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
    location: 'Sapa, Lào Cai',
    fundingType: 'fixed',
    campaignType: 'regular',
    description: `
Dự án xây dựng trường học cho trẻ em vùng cao tại Sapa, Lào Cai nhằm cải thiện điều kiện học tập cho các em học sinh dân tộc thiểu số.

**Mục tiêu:**
- Xây dựng 6 phòng học với diện tích 50m² mỗi phòng
- Trang bị đầy đủ bàn ghế, bảng học và thiết bị giảng dạy
- Xây dựng nhà vệ sinh và hệ thống nước sạch
- Cải tạo sân chơi và khu vực sinh hoạt

**Đối tượng hưởng lợi:**
- 180 học sinh từ lớp 1 đến lớp 5
- 12 giáo viên và nhân viên
- Toàn bộ cộng đồng dân cư xung quanh

**Lý do cần thiết:**
Trường học hiện tại đã xuống cấp nghiêm trọng, mái nhà dột, tường nứt, không đảm bảo an toàn cho học sinh trong mùa mưa bão.
    `,
    phases: [
      {
        id: 1,
        title: 'Chuẩn bị mặt bằng và móng',
        description: 'Giải phóng mặt bằng, đào móng và đổ bê tông móng',
        budget: 15000000,
        duration: '20 ngày',
        documents: ['Bản vẽ thiết kế.pdf', 'Báo giá vật liệu.xlsx'],
      },
      {
        id: 2,
        title: 'Xây dựng khung và tường',
        description: 'Xây dựng khung bê tông, tường và lắp đặt mái',
        budget: 25000000,
        duration: '30 ngày',
        documents: ['Tiến độ thi công.pdf', 'Chứng chỉ vật liệu.pdf'],
      },
      {
        id: 3,
        title: 'Hoàn thiện và trang thiết bị',
        description: 'Hoàn thiện nội thất, sơn và lắp đặt thiết bị',
        budget: 10000000,
        duration: '15 ngày',
        documents: ['Danh sách thiết bị.pdf', 'Hóa đơn mua sắm.pdf'],
      },
    ],
    documents: [
      { name: 'Giấy phép xây dựng.pdf', size: '2.1 MB', type: 'permit' },
      { name: 'Báo cáo khảo sát địa chất.pdf', size: '5.4 MB', type: 'survey' },
      {
        name: 'Bản vẽ kiến trúc tổng thể.dwg',
        size: '12.3 MB',
        type: 'design',
      },
      { name: 'Ảnh hiện trạng trường cũ.zip', size: '45.2 MB', type: 'photo' },
      { name: 'Video thực địa.mp4', size: '128.5 MB', type: 'video' },
      { name: 'Cam kết từ UBND xã.pdf', size: '1.8 MB', type: 'commitment' },
    ],
    images: [
      '/placeholder.svg?height=300&width=400&text=Trường+học+hiện+tại',
      '/placeholder.svg?height=300&width=400&text=Bản+vẽ+thiết+kế',
      '/placeholder.svg?height=300&width=400&text=Vị+trí+xây+dựng',
    ],
    timeline: {
      submitted: new Date(2024, 0, 15, 9, 30),
      reviewStarted: new Date(2024, 0, 15, 14, 20),
      deadline: new Date(2024, 0, 22, 23, 59),
    },
    riskFactors: [
      'Địa hình khó khăn, vận chuyển vật liệu có thể gặp khó khăn',
      'Thời tiết mùa mưa có thể ảnh hưởng tiến độ',
      'Cần phối hợp với nhiều cơ quan địa phương',
    ],
    hasVoted: false,
  };

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'permit':
        return <FileText className='h-5 w-5 text-blue-600' />;
      case 'photo':
        return <ImageIcon className='h-5 w-5 text-green-600' />;
      case 'video':
        return <Play className='h-5 w-5 text-red-600' />;
      default:
        return <FileText className='h-5 w-5 text-gray-600' />;
    }
  };

  const getDaysLeft = (deadline: Date) => {
    const now = new Date();
    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className='container mx-auto px-4 py-6 max-w-6xl'>
      {/* Header */}
      <div className='mb-6'>
        <div className='flex items-center space-x-4 mb-4'>
          <Link href='/reviewer'>
            <Button variant='outline' size='sm'>
              <ArrowLeft className='h-4 w-4 mr-2' />
              Quay lại
            </Button>
          </Link>
          <div className='flex items-center space-x-2'>
            <AlertTriangle className='h-5 w-5 text-red-500' />
            <Badge variant='destructive'>KHẨN CẤP</Badge>
          </div>
        </div>

        <div className='flex items-start justify-between'>
          <div>
            <h1 className='text-2xl font-bold tracking-tight'>
              {reviewItem.campaignTitle}
            </h1>
            <p className='text-muted-foreground'>
              Chi tiết chiến dịch cần duyệt
            </p>
          </div>
          <div className='flex items-center space-x-2'>
            <Link href={`/reviewer/${reviewId}/review`}>
              <Button>Duyệt ngay</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Timeline & Status */}
      <Alert className='mb-6'>
        <Clock className='h-4 w-4' />
        <AlertTitle>Thời hạn duyệt</AlertTitle>
        <AlertDescription>
          Còn <strong>{getDaysLeft(reviewItem.deadline)} ngày</strong> để hoàn
          thành duyệt. Đã có {reviewItem.reviewersCount}/
          {reviewItem.requiredReviewers} người duyệt tham gia.
        </AlertDescription>
      </Alert>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Main Content */}
        <div className='lg:col-span-2 space-y-6'>
          <Tabs defaultValue='overview' className='w-full'>
            <TabsList className='grid w-full grid-cols-4'>
              <TabsTrigger value='overview'>Tổng quan</TabsTrigger>
              <TabsTrigger value='phases'>Giai đoạn</TabsTrigger>
              <TabsTrigger value='documents'>Tài liệu</TabsTrigger>
              <TabsTrigger value='images'>Hình ảnh</TabsTrigger>
            </TabsList>

            <TabsContent value='overview' className='space-y-4'>
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin chiến dịch</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <label className='text-sm font-medium text-muted-foreground'>
                        Danh mục
                      </label>
                      <p className='font-medium'>{reviewItem.category}</p>
                    </div>
                    <div className='space-y-2'>
                      <label className='text-sm font-medium text-muted-foreground'>
                        Địa điểm
                      </label>
                      <p className='font-medium flex items-center'>
                        <MapPin className='h-4 w-4 mr-1' />
                        {reviewItem.location}
                      </p>
                    </div>
                    <div className='space-y-2'>
                      <label className='text-sm font-medium text-muted-foreground'>
                        Mục tiêu quyên góp
                      </label>
                      <p className='font-medium text-green-600'>
                        {new Intl.NumberFormat('vi-VN').format(
                          reviewItem.amount
                        )}{' '}
                        VNĐ
                      </p>
                    </div>
                    <div className='space-y-2'>
                      <label className='text-sm font-medium text-muted-foreground'>
                        Loại funding
                      </label>
                      <Badge variant='outline'>
                        {reviewItem.fundingType === 'fixed'
                          ? 'Cố định'
                          : 'Linh hoạt'}
                      </Badge>
                    </div>
                  </div>

                  <Separator />

                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-muted-foreground'>
                      Mô tả chi tiết
                    </label>
                    <div className='prose prose-sm max-w-none'>
                      <div className='whitespace-pre-line text-sm'>
                        {reviewItem.description}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-muted-foreground'>
                      Yếu tố rủi ro
                    </label>
                    <ul className='space-y-1'>
                      {reviewItem.riskFactors.map((risk, index) => (
                        <li key={index} className='flex items-start text-sm'>
                          <AlertCircle className='h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0' />
                          {risk}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='phases' className='space-y-4'>
              <div className='space-y-4'>
                {reviewItem.phases.map((phase, index) => (
                  <Card key={phase.id}>
                    <CardHeader>
                      <div className='flex items-center justify-between'>
                        <CardTitle className='text-lg'>
                          Giai đoạn {index + 1}: {phase.title}
                        </CardTitle>
                        <Badge variant='outline'>
                          {new Intl.NumberFormat('vi-VN').format(phase.budget)}{' '}
                          VNĐ
                        </Badge>
                      </div>
                      <CardDescription>{phase.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className='grid grid-cols-2 gap-4 mb-4'>
                        <div className='space-y-1'>
                          <label className='text-xs font-medium text-muted-foreground'>
                            Ngân sách
                          </label>
                          <p className='text-sm font-medium'>
                            {new Intl.NumberFormat('vi-VN').format(
                              phase.budget
                            )}{' '}
                            VNĐ
                          </p>
                        </div>
                        <div className='space-y-1'>
                          <label className='text-xs font-medium text-muted-foreground'>
                            Thời gian
                          </label>
                          <p className='text-sm font-medium'>
                            {phase.duration}
                          </p>
                        </div>
                      </div>

                      <div className='space-y-2'>
                        <label className='text-xs font-medium text-muted-foreground'>
                          Tài liệu đính kèm
                        </label>
                        <div className='space-y-1'>
                          {phase.documents.map((doc, docIndex) => (
                            <div
                              key={docIndex}
                              className='flex items-center justify-between p-2 bg-muted/50 rounded text-sm'
                            >
                              <div className='flex items-center'>
                                <FileText className='h-4 w-4 mr-2 text-blue-600' />
                                {doc}
                              </div>
                              <Button variant='ghost' size='sm'>
                                <Download className='h-4 w-4' />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value='documents' className='space-y-4'>
              <Card>
                <CardHeader>
                  <CardTitle>Tài liệu kèm theo</CardTitle>
                  <CardDescription>
                    Tài liệu chứng minh và hỗ trợ cho chiến dịch
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='space-y-3'>
                    {reviewItem.documents.map((doc, index) => (
                      <div
                        key={index}
                        className='flex items-center justify-between p-3 border rounded-lg'
                      >
                        <div className='flex items-center space-x-3'>
                          {getDocumentIcon(doc.type)}
                          <div>
                            <p className='font-medium text-sm'>{doc.name}</p>
                            <p className='text-xs text-muted-foreground'>
                              {doc.size}
                            </p>
                          </div>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <Button variant='outline' size='sm'>
                            <Eye className='h-4 w-4 mr-2' />
                            Xem
                          </Button>
                          <Button variant='outline' size='sm'>
                            <Download className='h-4 w-4' />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='images' className='space-y-4'>
              <Card>
                <CardHeader>
                  <CardTitle>Hình ảnh minh họa</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {reviewItem.images.map((image, index) => (
                      <div key={index} className='space-y-2'>
                        <img
                          src={image}
                          alt={`Hình ảnh ${index + 1}`}
                          className='w-full h-48 object-cover rounded-lg border'
                        />
                        <p className='text-sm text-muted-foreground text-center'>
                          Hình ảnh {index + 1}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className='space-y-6'>
          {/* Review Info */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin duyệt</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center justify-between'>
                <span className='text-sm'>Phí duyệt</span>
                <span className='font-bold text-green-600'>
                  {new Intl.NumberFormat('vi-VN').format(reviewItem.fee)} VNĐ
                </span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm'>Tổng phí pool</span>
                <span className='font-medium'>
                  {new Intl.NumberFormat('vi-VN').format(reviewItem.totalFee)}{' '}
                  VNĐ
                </span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm'>Người duyệt</span>
                <span className='font-medium'>
                  {reviewItem.reviewersCount}/{reviewItem.requiredReviewers}
                </span>
              </div>
              <Progress
                value={
                  (reviewItem.reviewersCount / reviewItem.requiredReviewers) *
                  100
                }
                className='h-2'
              />
              <div className='text-xs text-muted-foreground'>
                Cần thêm{' '}
                {reviewItem.requiredReviewers - reviewItem.reviewersCount} người
                duyệt
              </div>
            </CardContent>
          </Card>

          {/* Creator Info */}
          <Card>
            <CardHeader>
              <CardTitle>Người tạo chiến dịch</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center space-x-3'>
                <Avatar className='h-12 w-12'>
                  <AvatarFallback>
                    {reviewItem.creatorName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className='font-medium'>{reviewItem.creatorName}</p>
                  <p className='text-sm text-muted-foreground'>
                    Tham gia{' '}
                    {new Intl.DateTimeFormat('vi-VN').format(
                      reviewItem.creatorJoinDate
                    )}
                  </p>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4 text-center'>
                <div>
                  <p className='text-2xl font-bold text-primary'>
                    {reviewItem.creatorReputation}
                  </p>
                  <p className='text-xs text-muted-foreground'>Điểm uy tín</p>
                </div>
                <div>
                  <p className='text-2xl font-bold'>
                    {reviewItem.creatorCampaignsCompleted}
                  </p>
                  <p className='text-xs text-muted-foreground'>
                    Chiến dịch hoàn thành
                  </p>
                </div>
              </div>

              <Button variant='outline' className='w-full' size='sm'>
                <ExternalLink className='h-4 w-4 mr-2' />
                Xem hồ sơ
              </Button>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
              <div className='flex items-center space-x-3'>
                <div className='h-2 w-2 bg-green-500 rounded-full'></div>
                <div className='flex-1'>
                  <p className='text-sm font-medium'>Đã nộp</p>
                  <p className='text-xs text-muted-foreground'>
                    {new Intl.DateTimeFormat('vi-VN', {
                      day: '2-digit',
                      month: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    }).format(reviewItem.timeline.submitted)}
                  </p>
                </div>
              </div>
              <div className='flex items-center space-x-3'>
                <div className='h-2 w-2 bg-blue-500 rounded-full'></div>
                <div className='flex-1'>
                  <p className='text-sm font-medium'>Bắt đầu duyệt</p>
                  <p className='text-xs text-muted-foreground'>
                    {new Intl.DateTimeFormat('vi-VN', {
                      day: '2-digit',
                      month: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    }).format(reviewItem.timeline.reviewStarted)}
                  </p>
                </div>
              </div>
              <div className='flex items-center space-x-3'>
                <div className='h-2 w-2 bg-red-500 rounded-full'></div>
                <div className='flex-1'>
                  <p className='text-sm font-medium'>Hạn cuối</p>
                  <p className='text-xs text-muted-foreground'>
                    {new Intl.DateTimeFormat('vi-VN', {
                      day: '2-digit',
                      month: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    }).format(reviewItem.timeline.deadline)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

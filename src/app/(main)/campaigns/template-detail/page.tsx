'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Calendar,
  Check,
  Clock,
  Copy,
  ExternalLink,
  FileText,
  Heart,
  MessageCircle,
  Share2,
  ThumbsUp,
  TrendingUp,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Upload,
  Plus,
  Receipt,
  AlertCircle,
  ChartBar,
  Image as ImageIcon,
  Download,
  History,
  Target,
  Banknote,
  Calendar as CalendarIcon,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

export default function CampaignDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const campaignId = params.id;

  // Mock data - in real app, this would come from API
  const isOwner = true; // User is the campaign owner
  const currentStage = 2; // Currently on stage 2
  const needExpenseProof = true; // Current stage needs expense proof to unlock next stage

  // Campaign status - trong triển khai, chỉ hiện đóng góp nếu có kêu gọi bổ sung
  const isImplementing = true; // Đang trong quá trình triển khai
  const hasAdditionalFunding = false; // Có kêu gọi bổ sung không - thay đổi để test
  const showDonationSection = isImplementing ? hasAdditionalFunding : true; // Logic đóng góp

  // State cho việc hiển thị tài liệu
  const [showAllDocsStage1, setShowAllDocsStage1] = useState(false);
  const [showAllDocsStage2, setShowAllDocsStage2] = useState(false);
  const [showAllDocsStage3, setShowAllDocsStage3] = useState(false);

  return (
    <div className='container mx-auto px-4 py-6 max-w-8xl'>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
        {/* Main content - 2/3 width on desktop */}
        <div className='md:col-span-2 space-y-6'>
          <div className='relative h-64 md:h-96 w-full overflow-hidden rounded-lg'>
            <img
              src='https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
              alt='Campaign Cover'
              className='h-full w-full object-cover'
            />
            <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white'>
              <Badge className='mb-2 bg-green-600 hover:bg-green-700'>
                Giáo dục
              </Badge>
              <h1 className='text-2xl font-bold md:text-3xl'>
                Xây trường học cho trẻ em vùng cao
              </h1>
            </div>
          </div>

          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
            <div className='flex items-center space-x-4'>
              <Avatar className='h-10 w-10'>
                <AvatarImage
                  src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80'
                  alt='Avatar'
                />
                <AvatarFallback>TH</AvatarFallback>
              </Avatar>
              <div>
                <div className='flex items-center space-x-2'>
                  <span className='font-semibold'>Trần Hùng</span>
                  <Badge variant='outline' className='bg-blue-50 text-blue-700'>
                    <TrendingUp className='mr-1 h-3 w-3' />
                    <span>Uy tín 85</span>
                  </Badge>
                </div>
                <p className='text-xs text-muted-foreground'>
                  Đã xác minh danh tính
                </p>
              </div>
            </div>
            <div className='flex flex-wrap gap-2'>
              <Button
                variant='outline'
                size='sm'
                className='flex items-center gap-1'
              >
                <Heart className='h-4 w-4' />
                <span>Yêu thích</span>
              </Button>
              <Button
                variant='outline'
                size='sm'
                className='flex items-center gap-1'
              >
                <Share2 className='h-4 w-4' />
                <span>Chia sẻ</span>
              </Button>
              {isOwner && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant='outline'
                      size='sm'
                      className='flex items-center gap-1 bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100'
                    >
                      <Plus className='h-4 w-4' />
                      <span>Kêu gọi bổ sung</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className='sm:max-w-[500px]'>
                    <DialogHeader>
                      <DialogTitle>Kêu gọi bổ sung chiến dịch</DialogTitle>
                      <DialogDescription>
                        Tạo chiến dịch con để kêu gọi thêm kinh phí cho chiến
                        dịch hiện tại
                      </DialogDescription>
                    </DialogHeader>
                    <div className='space-y-4'>
                      <div className='space-y-2'>
                        <Label htmlFor='additional-title'>
                          Tiêu đề kêu gọi bổ sung
                        </Label>
                        <Input
                          id='additional-title'
                          placeholder='VD: Bổ sung thiết bị học tập cho trường'
                        />
                      </div>
                      <div className='space-y-2'>
                        <Label htmlFor='additional-amount'>
                          Số tiền cần kêu gọi thêm (VNĐ)
                        </Label>
                        <Input
                          id='additional-amount'
                          type='number'
                          placeholder='20000000'
                        />
                      </div>
                      <div className='space-y-2'>
                        <Label htmlFor='additional-reason'>
                          Lý do cần kêu gọi bổ sung
                        </Label>
                        <Textarea
                          id='additional-reason'
                          placeholder='Giải thích lý do tại sao cần thêm kinh phí...'
                          rows={4}
                        />
                      </div>
                      <Alert>
                        <AlertCircle className='h-4 w-4' />
                        <AlertDescription>
                          Kêu gọi bổ sung sẽ được gửi đến tất cả người đóng góp
                          và cộng đồng để xem xét.
                        </AlertDescription>
                      </Alert>
                    </div>
                    <DialogFooter>
                      <Button variant='outline'>Hủy</Button>
                      <Button>Tạo kêu gọi bổ sung</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>

          {/* Expense Proof Alert for Owner */}
          {isOwner && needExpenseProof && (
            <Alert className='border-orange-200 bg-orange-50'>
              <Receipt className='h-4 w-4' />
              <AlertDescription className='flex items-center justify-between'>
                <span>
                  Bạn cần xác nhận hoàn thành và chứng minh chi tiêu giai đoạn
                  hiện tại để mở khóa giải ngân giai đoạn tiếp theo.
                </span>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size='sm' variant='outline' className='ml-2'>
                      <Check className='h-4 w-4 mr-1' />
                      Xác nhận hoàn thành
                    </Button>
                  </DialogTrigger>
                  <DialogContent className='sm:max-w-[600px]'>
                    <DialogHeader>
                      <DialogTitle>
                        Xác nhận hoàn thành và chứng minh chi tiêu giai đoạn{' '}
                        {currentStage}
                      </DialogTitle>
                      <DialogDescription>
                        Upload tài liệu, hóa đơn và báo cáo chi tiêu để chứng
                        minh việc sử dụng kinh phí hợp lý
                      </DialogDescription>
                    </DialogHeader>
                    <div className='space-y-4'>
                      <div className='space-y-2'>
                        <Label>Tổng chi tiêu thực tế (VNĐ)</Label>
                        <Input
                          type='number'
                          placeholder='35000000'
                          defaultValue='35000000'
                        />
                        <p className='text-sm text-muted-foreground'>
                          Ngân sách dự kiến cho giai đoạn này: 35.000.000 VNĐ
                        </p>
                      </div>

                      <div className='grid grid-cols-2 gap-4'>
                        <div className='space-y-2'>
                          <Label>Số tiền thừa (nếu có)</Label>
                          <Input type='number' placeholder='0' />
                        </div>
                        <div className='space-y-2'>
                          <Label>Số tiền thiếu (nếu có)</Label>
                          <Input type='number' placeholder='0' />
                        </div>
                      </div>

                      <div className='space-y-2'>
                        <Label>Báo cáo chi tiêu chi tiết</Label>
                        <Textarea
                          placeholder='Mô tả chi tiết về các khoản chi tiêu trong giai đoạn này...'
                          rows={4}
                        />
                      </div>

                      <div className='space-y-2'>
                        <Label>Upload tài liệu chứng minh</Label>
                        <div className='border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center'>
                          <Upload className='h-8 w-8 mx-auto mb-2 text-muted-foreground' />
                          <p className='text-sm text-muted-foreground mb-2'>
                            Kéo thả file hoặc click để chọn
                          </p>
                          <p className='text-xs text-muted-foreground'>
                            Hỗ trợ: PDF, JPG, PNG (tối đa 10MB mỗi file)
                          </p>
                          <Button variant='outline' size='sm' className='mt-2'>
                            Chọn file
                          </Button>
                        </div>
                      </div>

                      <Alert>
                        <AlertCircle className='h-4 w-4' />
                        <AlertDescription>
                          Sau khi submit, tài liệu sẽ được gửi đến hệ thống
                          duyệt để xác minh. Giai đoạn tiếp theo chỉ được giải
                          ngân khi chứng minh chi tiêu được phê duyệt.
                        </AlertDescription>
                      </Alert>
                    </div>
                    <DialogFooter>
                      <Button variant='outline'>Hủy</Button>
                      <Button>
                        <Receipt className='h-4 w-4 mr-2' />
                        Submit chứng minh chi tiêu
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </AlertDescription>
            </Alert>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Thông tin chiến dịch</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              {!isImplementing ? (
                // Giai đoạn gây quỹ - hiện progress và thời gian còn lại
                <>
                  <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
                    <div className='space-y-1'>
                      <p className='text-xs text-muted-foreground'>Mục tiêu</p>
                      <p className='font-medium'>100.000.000 VNĐ</p>
                    </div>
                    <div className='space-y-1'>
                      <p className='text-xs text-muted-foreground'>
                        Đã quyên góp
                      </p>
                      <p className='font-medium'>85.000.000 VNĐ</p>
                    </div>
                    <div className='space-y-1'>
                      <p className='text-xs text-muted-foreground'>
                        Người đóng góp
                      </p>
                      <p className='font-medium'>128 người</p>
                    </div>
                    <div className='space-y-1'>
                      <p className='text-xs text-muted-foreground'>
                        Thời gian còn lại
                      </p>
                      <p className='font-medium'>15 ngày</p>
                    </div>
                  </div>

                  <Progress value={85} className='h-2' />

                  <div className='flex items-center justify-between text-sm'>
                    <span>85% đạt được</span>
                    <div className='flex items-center space-x-1'>
                      <Calendar className='h-3 w-3 text-muted-foreground' />
                      <span className='text-muted-foreground'>
                        Kết thúc: 30/06/2023
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                // Giai đoạn triển khai - hiện kết quả và số tiền đã giải ngân
                <>
                  <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
                    <div className='space-y-1'>
                      <p className='text-xs text-muted-foreground'>
                        Tổng quyên góp
                      </p>
                      <p className='font-medium text-green-600'>
                        100.000.000 VNĐ
                      </p>
                    </div>
                    <div className='space-y-1'>
                      <p className='text-xs text-muted-foreground'>
                        Đã giải ngân
                      </p>
                      <p className='font-medium text-blue-600'>
                        70.000.000 VNĐ
                      </p>
                    </div>
                    <div className='space-y-1'>
                      <p className='text-xs text-muted-foreground'>
                        Người đóng góp
                      </p>
                      <p className='font-medium'>128 người</p>
                    </div>
                    <div className='space-y-1'>
                      <p className='text-xs text-muted-foreground'>
                        Trạng thái
                      </p>
                      <Badge className='bg-blue-100 text-blue-700'>
                        Đang triển khai
                      </Badge>
                    </div>
                  </div>

                  <div className='bg-blue-50 border border-blue-200 rounded-lg p-3'>
                    <div className='flex items-center justify-between mb-2'>
                      <div className='flex items-center gap-2'>
                        <Banknote className='h-4 w-4 text-blue-600' />
                        <h4 className='font-medium'>Tình hình giải ngân</h4>
                      </div>
                    </div>
                    <div className='space-y-2 text-sm'>
                      <div className='flex justify-between items-center'>
                        <span>Giai đoạn 1 (Hoàn thành):</span>
                        <span className='font-medium text-green-600'>
                          35.000.000 VNĐ
                        </span>
                      </div>
                      <div className='flex justify-between items-center'>
                        <span>Giai đoạn 2 (Đang thực hiện):</span>
                        <span className='font-medium text-blue-600'>
                          35.000.000 VNĐ
                        </span>
                      </div>
                      <div className='flex justify-between items-center'>
                        <span>Giai đoạn 3 (Chờ mở khóa):</span>
                        <span className='font-medium text-gray-500'>
                          30.000.000 VNĐ
                        </span>
                      </div>
                      <Separator />
                      <div className='flex justify-between items-center font-medium'>
                        <span>Còn lại trong quỹ:</span>
                        <span className='text-orange-600'>30.000.000 VNĐ</span>
                      </div>
                    </div>
                  </div>

                  {hasAdditionalFunding && (
                    <Alert className='border-orange-200 bg-orange-50'>
                      <Plus className='h-4 w-4' />
                      <AlertDescription>
                        Có kêu gọi bổ sung đang diễn ra để hỗ trợ thêm cho các
                        nhu cầu phát sinh.
                      </AlertDescription>
                    </Alert>
                  )}
                </>
              )}

              <Separator />

              <div className='space-y-4'>
                <h3 className='font-semibold'>Mô tả chiến dịch</h3>
                <p>
                  Chiến dịch "Xây trường học cho trẻ em vùng cao" nhằm mục đích
                  xây dựng một trường học mới cho hơn 200 trẻ em tại xã Tả Phìn,
                  huyện Sa Pa, tỉnh Lào Cai. Hiện tại, trẻ em ở đây phải đi bộ
                  hơn 5km đường núi để đến trường, gặp nhiều khó khăn trong mùa
                  mưa.
                </p>
                <p>
                  Trường học mới sẽ có 6 phòng học, 1 thư viện nhỏ, và các thiết
                  bị cơ bản phục vụ việc học tập. Dự án được chia thành 3 giai
                  đoạn, với tổng kinh phí dự kiến là 100 triệu đồng.
                </p>
                <div className='grid grid-cols-2 gap-2'>
                  <img
                    src='https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80'
                    alt='Hình ảnh hiện trạng'
                    className='rounded-lg object-cover h-48 w-full'
                  />
                  <img
                    src='https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80'
                    alt='Hình ảnh thiết kế'
                    className='rounded-lg object-cover h-48 w-full'
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Các giai đoạn chiến dịch</CardTitle>
              <CardDescription>
                Chiến dịch được chia thành 3 giai đoạn với mục tiêu và thời gian
                cụ thể. Mỗi giai đoạn phải được chứng minh chi tiêu để mở khóa
                giai đoạn tiếp theo.
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-8'>
              {/* Giai đoạn 1 - Đã hoàn thành */}
              <div className='space-y-4'>
                <div className='flex items-start justify-between'>
                  <div className='flex items-start space-x-3'>
                    <div className='flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700'>
                      <Check className='h-4 w-4' />
                    </div>
                    <div className='flex-1'>
                      <h3 className='font-semibold'>
                        Giai đoạn 1: Hoàn thành móng và khung
                      </h3>
                      <p className='text-sm text-muted-foreground'>
                        01/04/2023 - 30/04/2023 • Ngân sách: 35.000.000 VNĐ
                      </p>
                    </div>
                  </div>
                  <div>
                    <Badge className='bg-green-100 text-green-700 hover:bg-green-200'>
                      Hoàn thành
                    </Badge>
                  </div>
                </div>

                <div className='ml-11 space-y-3'>
                  <div>
                    <p className='text-gray-700 mt-1'>
                      Đào móng, đổ bê tông và xây dựng khung chính của trường
                      học bao gồm chuẩn bị mặt bằng, đào móng theo thiết kế kỹ
                      thuật và thi công khung bê tông cốt thép.
                    </p>
                  </div>

                  {/* Tài liệu kế hoạch */}
                  <div className='bg-slate-50 border border-slate-200 rounded-lg p-3'>
                    <div className='flex items-center justify-between mb-3'>
                      <div className='flex items-center gap-2'>
                        <FileText className='h-4 w-4 text-slate-600' />
                        <h4 className='font-medium text-slate-800'>
                          Tài liệu kế hoạch
                        </h4>
                      </div>
                    </div>
                    <div className='space-y-2'>
                      <div className='flex items-center gap-2 flex-wrap'>
                        <Button
                          variant='outline'
                          size='sm'
                          className='flex items-center gap-1'
                        >
                          <Download className='h-4 w-4' />
                          <span>Kế hoạch chi tiết.pdf</span>
                        </Button>
                        <Button
                          variant='outline'
                          size='sm'
                          className='flex items-center gap-1'
                        >
                          <Download className='h-4 w-4' />
                          <span>Thiết kế kỹ thuật.pdf</span>
                        </Button>
                        {!showAllDocsStage1 && (
                          <Button
                            variant='link'
                            size='sm'
                            onClick={() => setShowAllDocsStage1(true)}
                            className='text-blue-600 hover:text-blue-800'
                          >
                            +3 tài liệu khác...
                          </Button>
                        )}
                      </div>
                      {showAllDocsStage1 && (
                        <div className='flex items-center gap-2 flex-wrap'>
                          <Button
                            variant='outline'
                            size='sm'
                            className='flex items-center gap-1'
                          >
                            <Download className='h-4 w-4' />
                            <span>Báo giá vật tư.pdf</span>
                          </Button>
                          <Button
                            variant='outline'
                            size='sm'
                            className='flex items-center gap-1'
                          >
                            <Download className='h-4 w-4' />
                            <span>Giấy phép xây dựng.pdf</span>
                          </Button>
                          <Button
                            variant='outline'
                            size='sm'
                            className='flex items-center gap-1'
                          >
                            <Download className='h-4 w-4' />
                            <span>Hồ sơ địa chất.pdf</span>
                          </Button>
                          <Button
                            variant='link'
                            size='sm'
                            onClick={() => setShowAllDocsStage1(false)}
                            className='text-blue-600 hover:text-blue-800'
                          >
                            Thu gọn
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Kết quả hoàn thành */}
                  <div className='bg-green-50 border border-green-200 rounded-lg p-3'>
                    <div className='flex items-center gap-2 mb-2'>
                      <Target className='h-4 w-4 text-green-600' />
                      <h4 className='font-medium'>Kết quả hoàn thành</h4>
                    </div>
                    {/* <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p><strong>Chi tiêu thực tế:</strong> 34.500.000 VNĐ</p>
                        <p><strong>Tiết kiệm:</strong> 500.000 VNĐ</p>
                      </div>
                      <div>
                        <p><strong>Tình nguyện viên:</strong> 15 người</p>
                        <p><strong>Tiến độ:</strong> 100% hoàn thành</p>
                      </div>
                    </div> */}

                    <p className='text-sm'>
                      Đã hoàn thành 100% công việc giai đoạn 1. Móng được đổ
                      vững chắc, khung chính đã dựng xong với sự tham gia của 15
                      tình nguyện viên địa phương. Chất lượng công trình đạt
                      tiêu chuẩn kỹ thuật.
                    </p>
                    <div className='grid grid-cols-2 gap-2'>
                      <img
                        src='https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80'
                        alt='Móng hoàn thành'
                        className='rounded-md object-cover h-24 w-full'
                      />
                      <img
                        src='https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80'
                        alt='Móng hoàn thành'
                        className='rounded-md object-cover h-24 w-full'
                      />
                    </div>
                    <div className='space-y-2 text-sm mt-3'>
                      <div className='flex justify-between items-center'>
                        <span className='font-medium text-gray-700'>
                          Chi phí thực tế:
                        </span>
                        <span className='font-semibold text-gray-900'>
                          28.500.000 VNĐ
                        </span>
                      </div>
                      <div className='flex justify-between items-center'>
                        <span className='font-medium text-gray-700'>
                          Tiền thừa:
                        </span>
                        <span className='font-semibold text-green-600'>
                          5.000.000 VNĐ
                        </span>
                      </div>
                      <div className='flex justify-between items-center'>
                        <span className='font-medium text-gray-700'>
                          Thời gian hoàn thành:
                        </span>
                        <span className='font-semibold text-gray-900'>
                          17 ngày
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className='flex items-center space-x-2'>
                    <Button
                      variant='outline'
                      size='sm'
                      className='flex items-center gap-1'
                    >
                      <History className='h-4 w-4' />
                      <span>Xem lịch sử cập nhật (4)</span>
                    </Button>
                    <Link href={`/campaigns/${campaignId}/expense-reports`}>
                      <Button
                        variant='outline'
                        size='sm'
                        className='flex items-center gap-1'
                      >
                        <Receipt className='h-4 w-4' />
                        <span>Xem chứng minh chi tiêu</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Giai đoạn 2 - Đang thực hiện */}
              <div className='space-y-4'>
                <div className='flex items-start justify-between'>
                  <div className='flex items-start space-x-3'>
                    <div className='flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-700'>
                      <Clock className='h-4 w-4' />
                    </div>
                    <div className='flex-1'>
                      <h3 className='font-semibold'>
                        Giai đoạn 2: Xây tường và mái
                      </h3>
                      <p className='text-sm text-muted-foreground'>
                        01/05/2023 - 31/05/2023 • Ngân sách: 35.000.000 VNĐ
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Badge className='bg-blue-100 text-blue-700 hover:bg-blue-200'>
                      Đang thực hiện
                    </Badge>
                  </div>
                </div>

                <div className='ml-11 space-y-3'>
                  <div>
                    <p className='text-gray-700 mt-1'>
                      Xây tường, lắp đặt cửa sổ, cửa ra vào và hoàn thiện mái
                      nhà bao gồm xây tường gạch, lắp đặt khung cửa, lợp mái tôn
                      và hệ thống thoát nước.
                    </p>
                  </div>
                  {/* Tài liệu kế hoạch */}
                  <div className='bg-slate-50 border border-slate-200 rounded-lg p-3'>
                    <div className='flex items-center justify-between mb-3'>
                      <div className='flex items-center gap-2'>
                        <FileText className='h-4 w-4 text-slate-600' />
                        <h4 className='font-medium text-slate-800'>
                          Tài liệu kế hoạch
                        </h4>
                      </div>
                    </div>
                    <div className='space-y-2'>
                      <div className='flex items-center gap-2 flex-wrap'>
                        <Button
                          variant='outline'
                          size='sm'
                          className='flex items-center gap-1'
                        >
                          <Download className='h-4 w-4' />
                          <span>Kế hoạch thi công.pdf</span>
                        </Button>
                        <Button
                          variant='outline'
                          size='sm'
                          className='flex items-center gap-1'
                        >
                          <Download className='h-4 w-4' />
                          <span>Danh sách vật tư.pdf</span>
                        </Button>
                        {!showAllDocsStage2 && (
                          <Button
                            variant='link'
                            size='sm'
                            onClick={() => setShowAllDocsStage2(true)}
                            className='text-blue-600 hover:text-blue-800'
                          >
                            +4 tài liệu khác...
                          </Button>
                        )}
                      </div>
                      {showAllDocsStage2 && (
                        <div className='flex items-center gap-2 flex-wrap'>
                          <Button
                            variant='outline'
                            size='sm'
                            className='flex items-center gap-1'
                          >
                            <Download className='h-4 w-4' />
                            <span>Quy trình an toàn.pdf</span>
                          </Button>
                          <Button
                            variant='outline'
                            size='sm'
                            className='flex items-center gap-1'
                          >
                            <Download className='h-4 w-4' />
                            <span>Bảng giá cửa sổ.pdf</span>
                          </Button>
                          <Button
                            variant='outline'
                            size='sm'
                            className='flex items-center gap-1'
                          >
                            <Download className='h-4 w-4' />
                            <span>Thiết kế mái.pdf</span>
                          </Button>
                          <Button
                            variant='outline'
                            size='sm'
                            className='flex items-center gap-1'
                          >
                            <Download className='h-4 w-4' />
                            <span>Hợp đồng nhà thầu.pdf</span>
                          </Button>
                          <Button
                            variant='link'
                            size='sm'
                            onClick={() => setShowAllDocsStage2(false)}
                            className='text-blue-600 hover:text-blue-800'
                          >
                            Thu gọn
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Tiến độ hiện tại */}
                  <div className='bg-blue-50 border border-blue-200 rounded-lg p-3'>
                    <div className='flex items-center justify-between mb-2'>
                      <div className='flex items-center gap-2'>
                        <ChartBar className='h-4 w-4 text-blue-600' />
                        <h4 className='font-medium'>Tiến độ hiện tại</h4>
                      </div>
                      <span className='text-sm font-medium'>
                        60% hoàn thành
                      </span>
                    </div>
                    <Progress value={60} className='h-2 mb-2' />
                    <div className='flex items-center justify-between text-sm'>
                      <span>Đã chi tiêu: 21.500.000 VNĐ / 35.000.000 VNĐ</span>
                      <span>Còn lại: 13.500.000 VNĐ</span>
                    </div>
                  </div>

                  {/* Cập nhật tiến độ mới nhất */}
                  <div className='border border-slate-200 rounded-lg p-3'>
                    <div className='flex items-center justify-between mb-2'>
                      <div className='flex items-center gap-2'>
                        <CalendarIcon className='h-4 w-4 text-slate-600' />
                        <h4 className='font-medium'>Cập nhật mới nhất</h4>
                      </div>
                      <span className='text-xs text-muted-foreground'>
                        2 ngày trước
                      </span>
                    </div>
                    <p className='text-sm text-gray-700 mb-2'>
                      Đã hoàn thành xây tường phía Đông và Tây của tòa nhà. Hiện
                      tại đang tiến hành lắp đặt khung cửa sổ và chuẩn bị vật
                      liệu cho việc lợp mái. Dự kiến hoàn thành 70% trong tuần
                      tới.
                    </p>
                    <div className='grid grid-cols-2 gap-2'>
                      <img
                        src='https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80'
                        alt='Tiến độ xây tường'
                        className='rounded-lg object-cover h-16 w-full'
                      />
                      <img
                        src='https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80'
                        alt='Lắp đặt cửa sổ'
                        className='rounded-lg object-cover h-16 w-full'
                      />
                    </div>
                  </div>

                  <div className='flex items-center space-x-2'>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant='outline'
                          size='sm'
                          className='flex items-center gap-1'
                        >
                          <History className='h-4 w-4' />
                          <span>Xem lịch sử cập nhật (4)</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className='sm:max-w-[600px]'>
                        <DialogHeader>
                          <DialogTitle>
                            Lịch sử cập nhật - Giai đoạn 2
                          </DialogTitle>
                          <DialogDescription>
                            Theo dõi toàn bộ quá trình cập nhật tiến độ của giai
                            đoạn này
                          </DialogDescription>
                        </DialogHeader>
                        <div className='space-y-4 max-h-96 overflow-y-auto'>
                          <div className='border border-gray-200 rounded-lg p-3'>
                            <div className='flex items-center justify-between mb-2'>
                              <span className='text-sm font-medium'>
                                15/05/2023
                              </span>
                              <span className='text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded'>
                                40%
                              </span>
                            </div>
                            <p className='text-sm text-gray-700'>
                              Bắt đầu xây tường phía Nam, hoàn thành 50% phần
                              móng cột. Thời tiết thuận lợi giúp công việc diễn
                              ra suôn sẻ.
                            </p>
                          </div>
                          <div className='border border-gray-200 rounded-lg p-3'>
                            <div className='flex items-center justify-between mb-2'>
                              <span className='text-sm font-medium'>
                                10/05/2023
                              </span>
                              <span className='text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded'>
                                20%
                              </span>
                            </div>
                            <p className='text-sm text-gray-700'>
                              Hoàn thành việc chuẩn bị vật liệu và bắt đầu xây
                              tường phía Bắc. Đã đặt hàng khung cửa sổ và cửa
                              chính.
                            </p>
                          </div>
                          <div className='border border-gray-200 rounded-lg p-3'>
                            <div className='flex items-center justify-between mb-2'>
                              <span className='text-sm font-medium'>
                                05/05/2023
                              </span>
                              <span className='text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded'>
                                10%
                              </span>
                            </div>
                            <p className='text-sm text-gray-700'>
                              Vận chuyển vật liệu xây dựng lên công trường và
                              bắt đầu chuẩn bị mặt bằng cho giai đoạn 2.
                            </p>
                          </div>
                          <div className='border border-gray-200 rounded-lg p-3'>
                            <div className='flex items-center justify-between mb-2'>
                              <span className='text-sm font-medium'>
                                01/05/2023
                              </span>
                              <span className='text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded'>
                                0%
                              </span>
                            </div>
                            <p className='text-sm text-gray-700'>
                              Khởi động giai đoạn 2 - Họp bàn với đội thi công
                              và lập kế hoạch chi tiết cho việc xây tường và
                              mái.
                            </p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    {isOwner && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size='sm'
                            className='bg-orange-600 hover:bg-orange-700 flex items-center gap-1'
                          >
                            <Check className='h-4 w-4' />
                            <span>
                              Xác nhận hoàn thành và chứng minh chi tiêu
                            </span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className='sm:max-w-[600px]'>
                          <DialogHeader>
                            <DialogTitle>
                              Xác nhận hoàn thành và chứng minh chi tiêu giai
                              đoạn 2
                            </DialogTitle>
                            <DialogDescription>
                              Upload tài liệu, hóa đơn và báo cáo chi tiêu để
                              chứng minh việc sử dụng kinh phí hợp lý
                            </DialogDescription>
                          </DialogHeader>
                          <div className='space-y-4'>
                            <div className='space-y-2'>
                              <Label>Tổng chi tiêu thực tế (VNĐ)</Label>
                              <Input
                                type='number'
                                placeholder='35000000'
                                defaultValue='36500000'
                              />
                              <p className='text-sm text-muted-foreground'>
                                Ngân sách dự kiến cho giai đoạn này: 35.000.000
                                VNĐ
                              </p>
                            </div>

                            <div className='grid grid-cols-2 gap-4'>
                              <div className='space-y-2'>
                                <Label>Số tiền thừa (nếu có)</Label>
                                <Input type='number' placeholder='0' />
                              </div>
                              <div className='space-y-2'>
                                <Label>Số tiền thiếu (nếu có)</Label>
                                <Input
                                  type='number'
                                  placeholder='1500000'
                                  defaultValue='1500000'
                                />
                              </div>
                            </div>

                            <div className='space-y-2'>
                              <Label>Báo cáo chi tiêu chi tiết</Label>
                              <Textarea
                                placeholder='Mô tả chi tiết về các khoản chi tiêu trong giai đoạn này...'
                                rows={4}
                                defaultValue='Chi tiêu vượt dự kiến 1.5M VNĐ do giá vật liệu tăng. Đã dùng 500K từ tiết kiệm giai đoạn 1, cần thêm 1M từ quỹ dự phòng.'
                              />
                            </div>

                            <div className='space-y-2'>
                              <Label>Upload tài liệu chứng minh</Label>
                              <div className='border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center'>
                                <Upload className='h-8 w-8 mx-auto mb-2 text-muted-foreground' />
                                <p className='text-sm text-muted-foreground mb-2'>
                                  Kéo thả file hoặc click để chọn
                                </p>
                                <p className='text-xs text-muted-foreground'>
                                  Hỗ trợ: PDF, JPG, PNG (tối đa 10MB mỗi file)
                                </p>
                                <Button
                                  variant='outline'
                                  size='sm'
                                  className='mt-2'
                                >
                                  Chọn file
                                </Button>
                              </div>
                            </div>

                            <Alert>
                              <AlertCircle className='h-4 w-4' />
                              <AlertDescription>
                                Sau khi submit, tài liệu sẽ được gửi đến hệ
                                thống duyệt để xác minh. Giai đoạn tiếp theo chỉ
                                được giải ngân khi chứng minh chi tiêu được phê
                                duyệt.
                              </AlertDescription>
                            </Alert>
                          </div>
                          <DialogFooter>
                            <Button variant='outline'>Hủy</Button>
                            <Button>
                              <Receipt className='h-4 w-4 mr-2' />
                              Submit chứng minh chi tiêu
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Giai đoạn 3 - Chưa bắt đầu */}
              <div className='space-y-4'>
                <div className='flex items-start justify-between'>
                  <div className='flex items-start space-x-3'>
                    <div className='flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700'>
                      <Clock className='h-4 w-4' />
                    </div>
                    <div className='flex-1'>
                      <h3 className='font-semibold'>
                        Giai đoạn 3: Hoàn thiện và trang thiết bị
                      </h3>
                      <p className='text-sm text-muted-foreground'>
                        01/06/2023 - 30/06/2023 • Ngân sách: 30.000.000 VNĐ
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Badge variant='outline' className='bg-gray-50'>
                      {needExpenseProof ? 'Bị khóa' : 'Chưa bắt đầu'}
                    </Badge>
                  </div>
                </div>

                <div className='ml-11 space-y-3'>
                  <div>
                    <p className='text-gray-700 mt-1'>
                      Hoàn thiện nội thất, lắp đặt bàn ghế, bảng, và các thiết
                      bị học tập cơ bản bao gồm sơn tường, lắp đặt hệ thống
                      điện, nước và trang bị đầy đủ đồ dùng học tập.
                    </p>
                  </div>

                  {/* Tài liệu kế hoạch */}
                  <div className='bg-slate-50 border border-slate-200 rounded-lg p-3'>
                    <div className='flex items-center justify-between mb-3'>
                      <div className='flex items-center gap-2'>
                        <FileText className='h-4 w-4 text-slate-600' />
                        <h4 className='font-medium text-slate-800'>
                          Tài liệu kế hoạch
                        </h4>
                      </div>
                    </div>
                    <div className='space-y-2'>
                      <div className='flex items-center gap-2 flex-wrap'>
                        <Button
                          variant='outline'
                          size='sm'
                          className='flex items-center gap-1'
                        >
                          <Download className='h-4 w-4' />
                          <span>Kế hoạch hoàn thiện.pdf</span>
                        </Button>
                        <Button
                          variant='outline'
                          size='sm'
                          className='flex items-center gap-1'
                        >
                          <Download className='h-4 w-4' />
                          <span>Danh sách trang thiết bị.pdf</span>
                        </Button>
                        {!showAllDocsStage3 && (
                          <Button
                            variant='link'
                            size='sm'
                            onClick={() => setShowAllDocsStage3(true)}
                            className='text-blue-600 hover:text-blue-800'
                          >
                            +2 tài liệu khác...
                          </Button>
                        )}
                      </div>
                      {showAllDocsStage3 && (
                        <div className='flex items-center gap-2 flex-wrap'>
                          <Button
                            variant='outline'
                            size='sm'
                            className='flex items-center gap-1'
                          >
                            <Download className='h-4 w-4' />
                            <span>Thiết kế nội thất.pdf</span>
                          </Button>
                          <Button
                            variant='outline'
                            size='sm'
                            className='flex items-center gap-1'
                          >
                            <Download className='h-4 w-4' />
                            <span>Báo giá điện nước.pdf</span>
                          </Button>
                          <Button
                            variant='link'
                            size='sm'
                            onClick={() => setShowAllDocsStage3(false)}
                            className='text-blue-600 hover:text-blue-800'
                          >
                            Thu gọn
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  {needExpenseProof && (
                    <Alert className='border-gray-200 bg-gray-50'>
                      <AlertCircle className='h-4 w-4' />
                      <AlertDescription>
                        Giai đoạn này sẽ được mở khóa sau khi xác nhận hoàn
                        thành và chứng minh chi tiêu giai đoạn 2 được phê duyệt.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cộng đồng</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue='updates'>
                <TabsList className='w-full'>
                  <TabsTrigger value='updates' className='flex-1'>
                    Bài đăng (8)
                  </TabsTrigger>
                  <TabsTrigger value='donors' className='flex-1'>
                    Người đóng góp (128)
                  </TabsTrigger>
                  <TabsTrigger value='transactions' className='flex-1'>
                    Giao dịch (15)
                  </TabsTrigger>
                </TabsList>
                <TabsContent value='updates' className='mt-4 space-y-4'>
                  <div className='space-y-4'>
                    <div className='flex items-start space-x-3'>
                      <Avatar>
                        <AvatarImage
                          src='/placeholder.svg?height=40&width=40'
                          alt='Avatar'
                        />
                        <AvatarFallback>TH</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className='flex items-center space-x-2'>
                          <span className='font-semibold'>Trần Hùng</span>
                          <span className='text-xs text-muted-foreground'>
                            2 ngày trước
                          </span>
                        </div>
                        <p className='mt-1'>
                          Chúng tôi vừa hoàn thành 60% giai đoạn 2! Cảm ơn tất
                          cả mọi người đã đóng góp và ủng hộ. Dưới đây là một số
                          hình ảnh cập nhật về tiến độ xây dựng.
                        </p>
                        <div className='mt-2 grid grid-cols-2 gap-2'>
                          <img
                            src='https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800&q=80'
                            alt='Cập nhật 1'
                            className='rounded-lg object-cover h-40 w-full'
                          />
                          <img
                            src='https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800&q=80'
                            alt='Cập nhật 2'
                            className='rounded-lg object-cover h-40 w-full'
                          />
                        </div>
                        <div className='mt-2 flex items-center space-x-4'>
                          <button className='flex items-center space-x-1 text-muted-foreground hover:text-foreground'>
                            <Heart className='h-4 w-4' />
                            <span className='text-xs'>32</span>
                          </button>
                          <button className='flex items-center space-x-1 text-muted-foreground hover:text-foreground'>
                            <MessageCircle className='h-4 w-4' />
                            <span className='text-xs'>8</span>
                          </button>
                          <button className='flex items-center space-x-1 text-muted-foreground hover:text-foreground'>
                            <Share2 className='h-4 w-4' />
                            <span className='text-xs'>Chia sẻ</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div className='flex items-start space-x-3'>
                      <Avatar>
                        <AvatarImage
                          src='/placeholder.svg?height=40&width=40'
                          alt='Avatar'
                        />
                        <AvatarFallback>TH</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className='flex items-center space-x-2'>
                          <span className='font-semibold'>Trần Hùng</span>
                          <span className='text-xs text-muted-foreground'>
                            1 tuần trước
                          </span>
                        </div>
                        <p className='mt-1'>
                          Chúng tôi đã bắt đầu giai đoạn 2 của dự án! Cảm ơn tất
                          cả mọi người đã đóng góp. Chúng tôi đã mua vật liệu
                          xây dựng và thuê thêm nhân công để đẩy nhanh tiến độ.
                        </p>
                        <div className='mt-2 flex items-center space-x-4'>
                          <button className='flex items-center space-x-1 text-muted-foreground hover:text-foreground'>
                            <Heart className='h-4 w-4' />
                            <span className='text-xs'>45</span>
                          </button>
                          <button className='flex items-center space-x-1 text-muted-foreground hover:text-foreground'>
                            <MessageCircle className='h-4 w-4' />
                            <span className='text-xs'>12</span>
                          </button>
                          <button className='flex items-center space-x-1 text-muted-foreground hover:text-foreground'>
                            <Share2 className='h-4 w-4' />
                            <span className='text-xs'>Chia sẻ</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button variant='outline' className='w-full'>
                    Xem tất cả cập nhật
                  </Button>
                </TabsContent>
                <TabsContent value='donors' className='mt-4 space-y-4'>
                  <div className='space-y-3'>
                    {[1, 2, 3, 4, 5].map(i => (
                      <div
                        key={i}
                        className='flex items-center justify-between'
                      >
                        <div className='flex items-center space-x-3'>
                          <Avatar className='h-8 w-8'>
                            <AvatarImage
                              src={`https://images.unsplash.com/photo-${1507003211169 + i * 10000000}?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80`}
                              alt='Donor'
                            />
                            <AvatarFallback>D{i}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className='font-medium'>
                              Người đóng góp {i}
                            </div>
                            <div className='text-xs text-muted-foreground'>
                              {i} ngày trước
                            </div>
                          </div>
                        </div>
                        <div className='text-right'>
                          <div className='font-medium'>
                            {(i * 1000000).toLocaleString()} VNĐ
                          </div>
                          {i === 2 && (
                            <div className='text-xs text-muted-foreground'>
                              Ẩn danh
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant='outline' className='w-full'>
                    Xem tất cả người đóng góp
                  </Button>
                </TabsContent>
                <TabsContent value='transactions' className='mt-4 space-y-4'>
                  <div className='space-y-3'>
                    {[1, 2, 3, 4, 5].map(i => (
                      <div
                        key={i}
                        className='flex items-center justify-between border-b pb-3'
                      >
                        <div className='flex items-center gap-3'>
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full ${
                              i % 3 === 0
                                ? 'bg-green-100 text-green-600'
                                : i % 3 === 1
                                  ? 'bg-blue-100 text-blue-600'
                                  : 'bg-purple-100 text-purple-600'
                            }`}
                          >
                            {i % 3 === 0 ? (
                              <ArrowUpRight className='h-4 w-4' />
                            ) : i % 3 === 1 ? (
                              <ArrowDownLeft className='h-4 w-4' />
                            ) : (
                              <Check className='h-4 w-4' />
                            )}
                          </div>
                          <div>
                            <h4 className='text-sm font-medium'>
                              {i % 3 === 0
                                ? 'Đóng góp'
                                : i % 3 === 1
                                  ? 'Giải ngân'
                                  : 'Xác nhận giai đoạn'}
                            </h4>
                            <p className='text-xs text-muted-foreground'>
                              {new Date(2023, 4, 15 - i).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className='text-right'>
                          {i % 3 !== 2 && (
                            <div className='font-medium'>
                              {(i * 1000000).toLocaleString()} VNĐ
                            </div>
                          )}
                          <Button
                            variant='link'
                            size='sm'
                            className='h-auto p-0'
                          >
                            <ExternalLink className='mr-1 h-3 w-3' />
                            <span className='text-xs'>Xem trên Polygon</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant='outline' className='w-full'>
                    <Link href='/transactions'>
                      Xem tất cả giao dịch onchain
                    </Link>
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - 1/3 width on desktop */}
        <div className='space-y-6 sticky top-6 self-start'>
          {/* Card đóng góp - chỉ hiện khi không trong quá trình triển khai hoặc có kêu gọi bổ sung */}
          {showDonationSection && (
            <Card>
              <CardHeader>
                <CardTitle>
                  {hasAdditionalFunding && isImplementing
                    ? 'Đóng góp bổ sung'
                    : 'Đóng góp cho chiến dịch'}
                </CardTitle>
                <CardDescription>
                  {hasAdditionalFunding && isImplementing
                    ? 'Hỗ trợ thêm cho các nhu cầu phát sinh trong quá trình triển khai'
                    : 'Mọi đóng góp đều được ghi lại trên blockchain để đảm bảo tính minh bạch'}
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-2'>
                  <label className='text-sm font-medium'>
                    Số tiền đóng góp (VNĐ)
                  </label>
                  <div className='grid grid-cols-3 gap-2'>
                    <Button variant='outline' className='w-full'>
                      100K
                    </Button>
                    <Button variant='outline' className='w-full'>
                      500K
                    </Button>
                    <Button variant='outline' className='w-full'>
                      1M
                    </Button>
                  </div>
                  <input
                    type='text'
                    placeholder='Nhập số tiền khác...'
                    className='w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
                  />
                </div>

                <div className='space-y-2'>
                  <label className='text-sm font-medium'>
                    Lời nhắn (tùy chọn)
                  </label>
                  <textarea
                    placeholder='Nhập lời nhắn của bạn...'
                    className='w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
                    rows={3}
                  />
                </div>
              </CardContent>
              <CardFooter className='flex flex-col space-y-4'>
                <Button className='w-full bg-green-600 hover:bg-green-700'>
                  <Wallet className='mr-2 h-4 w-4' />
                  {hasAdditionalFunding && isImplementing
                    ? 'Đóng góp bổ sung'
                    : 'Đóng góp ngay'}
                </Button>
                <p className='text-xs text-center text-muted-foreground'>
                  Bằng cách đóng góp, bạn đồng ý với{' '}
                  <Link href='#' className='underline'>
                    điều khoản sử dụng
                  </Link>{' '}
                  của chúng tôi
                </p>
              </CardFooter>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Thông tin blockchain</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <span className='text-sm'>Mạng blockchain</span>
                  <Badge variant='outline'>Polygon</Badge>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-sm'>Smart contract</span>
                  <div className='flex items-center gap-1'>
                    <span className='text-xs text-blue-600'>0x1a2...3b4c</span>
                    <Button variant='ghost' size='icon' className='h-5 w-5'>
                      <Copy className='h-3 w-3' />
                    </Button>
                  </div>
                </div>
              </div>
              <div className='space-y-2'>
                <Button variant='outline' size='sm' className='w-full'>
                  <Link
                    href='/transactions'
                    className='flex items-center justify-center gap-2'
                  >
                    <ExternalLink className='h-4 w-4' />
                    <span>Xem tất cả giao dịch</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Chiến dịch liên quan</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              {[1, 2, 3].map(i => (
                <Link
                  href={`/campaigns/${i + 10}`}
                  key={i}
                  className='flex items-start space-x-3 group'
                >
                  <img
                    src='https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80'
                    alt={`Chiến dịch ${i}`}
                    className='h-14 w-14 rounded-md object-cover'
                  />
                  <div>
                    <h4 className='text-sm font-medium group-hover:text-blue-600'>
                      {i === 1
                        ? 'Xây thư viện trường làng'
                        : i === 2
                          ? 'Học bổng cho học sinh nghèo'
                          : 'Trang bị máy tính cho trường học'}
                    </h4>
                    <Progress value={40 + i * 15} className='h-1 mt-1' />
                    <p className='text-xs text-muted-foreground mt-1'>
                      {40 + i * 15}% · {(i + 2) * 10} ngày còn lại
                    </p>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

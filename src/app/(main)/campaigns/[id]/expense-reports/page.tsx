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
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Calendar,
  ArrowLeft,
  Receipt,
  FileText,
  Download,
  Upload,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  DollarSign,
  Target,
  PieChart,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function ExpenseReportsPage({
  params,
}: {
  params: { id: string };
}) {
  const campaignId = params.id;

  // Mock data - in real app, this would come from API
  const stageReports = [
    {
      stage: 1,
      title: 'Hoàn thành móng và khung',
      budget: 35000000,
      actualSpent: 34500000,
      surplus: 500000,
      deficit: 0,
      status: 'approved',
      submittedAt: '2023-04-30',
      approvedAt: '2023-05-02',
      completedAt: '2023-04-28',
      documents: [
        { name: 'Hóa đơn vật liệu xây dựng.pdf', size: '2.3MB', type: 'pdf' },
        {
          name: 'Báo cáo chi tiêu giai đoạn 1.xlsx',
          size: '1.1MB',
          type: 'excel',
        },
        { name: 'Hình ảnh tiến độ thi công.zip', size: '15.2MB', type: 'zip' },
      ],
      expenseCategories: [
        { category: 'Vật liệu xây dựng', amount: 25000000, percentage: 72.5 },
        { category: 'Nhân công', amount: 8000000, percentage: 23.2 },
        { category: 'Thiết bị thuê', amount: 1500000, percentage: 4.3 },
      ],
      description:
        'Chi tiêu cho giai đoạn đào móng, đổ bê tông và xây dựng khung chính. Tiết kiệm được 500.000 VNĐ so với dự kiến nhờ thương lượng giá vật liệu tốt.',
    },
    {
      stage: 2,
      title: 'Xây tường và mái',
      budget: 35000000,
      actualSpent: 36500000,
      surplus: 0,
      deficit: 1500000,
      status: 'pending',
      submittedAt: '2023-05-30',
      approvedAt: null,
      completedAt: null,
      documents: [
        {
          name: 'Hóa đơn vật liệu giai đoạn 2.pdf',
          size: '3.1MB',
          type: 'pdf',
        },
        {
          name: 'Báo cáo chi tiêu chi tiết.xlsx',
          size: '1.5MB',
          type: 'excel',
        },
      ],
      expenseCategories: [
        { category: 'Vật liệu xây dựng', amount: 28000000, percentage: 76.7 },
        { category: 'Nhân công', amount: 7500000, percentage: 20.5 },
        { category: 'Chi phí phát sinh', amount: 1000000, percentage: 2.7 },
      ],
      description:
        'Chi tiêu vượt dự kiến 1.5M VNĐ do giá vật liệu tăng. Đã sử dụng 500K từ tiết kiệm giai đoạn 1, cần bổ sung thêm 1M từ quỹ dự phòng.',
    },
    {
      stage: 3,
      title: 'Hoàn thiện và trang thiết bị',
      budget: 30000000,
      actualSpent: 0,
      surplus: 0,
      deficit: 0,
      status: 'locked',
      submittedAt: null,
      approvedAt: null,
      completedAt: null,
      documents: [],
      expenseCategories: [],
      description:
        'Giai đoạn này sẽ được mở khóa sau khi giai đoạn 2 được phê duyệt chứng minh chi tiêu.',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <Badge className='bg-green-100 text-green-700'>Đã phê duyệt</Badge>
        );
      case 'pending':
        return (
          <Badge className='bg-orange-100 text-orange-700'>Chờ duyệt</Badge>
        );
      case 'rejected':
        return <Badge className='bg-red-100 text-red-700'>Bị từ chối</Badge>;
      case 'locked':
        return <Badge variant='outline'>Chưa mở khóa</Badge>;
      default:
        return <Badge variant='outline'>Chưa nộp</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className='h-4 w-4 text-green-600' />;
      case 'pending':
        return <Clock className='h-4 w-4 text-orange-600' />;
      case 'rejected':
        return <XCircle className='h-4 w-4 text-red-600' />;
      case 'locked':
        return <AlertCircle className='h-4 w-4 text-gray-600' />;
      default:
        return <Clock className='h-4 w-4 text-gray-600' />;
    }
  };

  const totalBudget = stageReports.reduce(
    (sum, stage) => sum + stage.budget,
    0
  );
  const totalSpent = stageReports.reduce(
    (sum, stage) => sum + stage.actualSpent,
    0
  );
  const totalSurplus = stageReports.reduce(
    (sum, stage) => sum + stage.surplus,
    0
  );
  const totalDeficit = stageReports.reduce(
    (sum, stage) => sum + stage.deficit,
    0
  );

  return (
    <div className='container mx-auto px-4 py-6 max-w-6xl'>
      <div className='mb-6'>
        <div className='flex items-center gap-2 mb-4'>
          <Link href={`/campaigns/${campaignId}`}>
            <Button variant='ghost' size='sm'>
              <ArrowLeft className='h-4 w-4 mr-2' />
              Quay lại chiến dịch
            </Button>
          </Link>
        </div>

        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
          <div>
            <h1 className='text-2xl font-bold tracking-tight'>
              Báo cáo chi tiêu
            </h1>
            <p className='text-muted-foreground'>
              Quản lý và theo dõi báo cáo chi tiêu từng giai đoạn chiến dịch
            </p>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-6'>
        <Card>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-muted-foreground'>Tổng ngân sách</p>
                <p className='text-2xl font-bold'>
                  {(totalBudget / 1000000).toFixed(1)}M
                </p>
              </div>
              <Target className='h-8 w-8 text-blue-600' />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-muted-foreground'>Đã chi tiêu</p>
                <p className='text-2xl font-bold'>
                  {(totalSpent / 1000000).toFixed(1)}M
                </p>
              </div>
              <DollarSign className='h-8 w-8 text-orange-600' />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-muted-foreground'>Tiết kiệm</p>
                <p className='text-2xl font-bold text-green-600'>
                  +{(totalSurplus / 1000).toFixed(0)}K
                </p>
              </div>
              <TrendingUp className='h-8 w-8 text-green-600' />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-muted-foreground'>Thiếu hụt</p>
                <p className='text-2xl font-bold text-red-600'>
                  -{(totalDeficit / 1000).toFixed(0)}K
                </p>
              </div>
              <AlertCircle className='h-8 w-8 text-red-600' />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stage Reports */}
      <div className='space-y-6'>
        {stageReports.map(report => (
          <Card key={report.stage} className='overflow-hidden'>
            <CardHeader>
              <div className='flex items-start justify-between'>
                <div className='space-y-1'>
                  <CardTitle className='text-lg'>
                    Giai đoạn {report.stage}: {report.title}
                  </CardTitle>
                  <CardDescription>
                    Ngân sách: {report.budget.toLocaleString()} VNĐ
                  </CardDescription>
                </div>
                <div className='flex items-center gap-2'>
                  {getStatusIcon(report.status)}
                  {getStatusBadge(report.status)}
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <Tabs defaultValue='overview' className='w-full'>
                <TabsList className='grid w-full grid-cols-3'>
                  <TabsTrigger value='overview'>Tổng quan</TabsTrigger>
                  <TabsTrigger value='breakdown'>Chi tiết</TabsTrigger>
                  <TabsTrigger value='documents'>Tài liệu</TabsTrigger>
                </TabsList>

                <TabsContent value='overview' className='space-y-4'>
                  <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                    <div className='space-y-1'>
                      <p className='text-sm text-muted-foreground'>Ngân sách</p>
                      <p className='text-lg font-semibold'>
                        {report.budget.toLocaleString()} VNĐ
                      </p>
                    </div>
                    <div className='space-y-1'>
                      <p className='text-sm text-muted-foreground'>
                        Chi tiêu thực tế
                      </p>
                      <p className='text-lg font-semibold'>
                        {report.actualSpent.toLocaleString()} VNĐ
                      </p>
                    </div>
                    <div className='space-y-1'>
                      <p className='text-sm text-muted-foreground'>
                        Chênh lệch
                      </p>
                      <p
                        className={`text-lg font-semibold ${
                          report.surplus > 0
                            ? 'text-green-600'
                            : report.deficit > 0
                              ? 'text-red-600'
                              : 'text-gray-600'
                        }`}
                      >
                        {report.surplus > 0
                          ? `+${report.surplus.toLocaleString()}`
                          : report.deficit > 0
                            ? `-${report.deficit.toLocaleString()}`
                            : '0'}{' '}
                        VNĐ
                      </p>
                    </div>
                    <div className='space-y-1'>
                      <p className='text-sm text-muted-foreground'>
                        Trạng thái
                      </p>
                      <p className='text-sm'>{getStatusBadge(report.status)}</p>
                    </div>
                  </div>

                  {report.status !== 'locked' && (
                    <div className='space-y-2'>
                      <p className='text-sm font-medium'>Mô tả chi tiêu:</p>
                      <p className='text-sm text-muted-foreground'>
                        {report.description}
                      </p>
                    </div>
                  )}

                  {report.status === 'pending' && (
                    <Alert className='border-orange-200 bg-orange-50'>
                      <Clock className='h-4 w-4' />
                      <AlertDescription>
                        Báo cáo chi tiêu đang chờ duyệt. Thời gian duyệt dự
                        kiến: 3-5 ngày làm việc.
                      </AlertDescription>
                    </Alert>
                  )}

                  {report.status === 'locked' && (
                    <Alert className='border-gray-200 bg-gray-50'>
                      <AlertCircle className='h-4 w-4' />
                      <AlertDescription>
                        Giai đoạn này chưa được mở khóa. Vui lòng hoàn thành
                        chứng minh chi tiêu giai đoạn trước.
                      </AlertDescription>
                    </Alert>
                  )}
                </TabsContent>

                <TabsContent value='breakdown' className='space-y-4'>
                  {report.expenseCategories.length > 0 ? (
                    <div className='space-y-4'>
                      <h4 className='font-medium'>
                        Phân bổ chi tiêu theo danh mục
                      </h4>
                      <div className='space-y-3'>
                        {report.expenseCategories.map((category, index) => (
                          <div key={index} className='space-y-2'>
                            <div className='flex items-center justify-between text-sm'>
                              <span className='font-medium'>
                                {category.category}
                              </span>
                              <div className='text-right'>
                                <span className='text-sm text-muted-foreground'>
                                  {category.percentage}%
                                </span>
                                <p className='font-medium'>
                                  {category.amount.toLocaleString()} VNĐ
                                </p>
                              </div>
                            </div>
                            <Progress
                              value={category.percentage}
                              className='h-2'
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className='text-center py-8 text-muted-foreground'>
                      <PieChart className='h-12 w-12 mx-auto mb-2 opacity-50' />
                      <p>Chưa có dữ liệu chi tiêu chi tiết</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value='documents' className='space-y-4'>
                  {report.documents.length > 0 ? (
                    <div className='space-y-3'>
                      <h4 className='font-medium'>Tài liệu đính kèm</h4>
                      {report.documents.map((doc, index) => (
                        <div
                          key={index}
                          className='flex items-center justify-between p-3 border rounded-lg'
                        >
                          <div className='flex items-center space-x-3'>
                            <FileText className='h-5 w-5 text-blue-600' />
                            <div>
                              <p className='text-sm font-medium'>{doc.name}</p>
                              <p className='text-xs text-muted-foreground'>
                                {doc.size}
                              </p>
                            </div>
                          </div>
                          <Button variant='outline' size='sm'>
                            <Download className='h-4 w-4 mr-2' />
                            Tải xuống
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className='text-center py-8 text-muted-foreground'>
                      <FileText className='h-12 w-12 mx-auto mb-2 opacity-50' />
                      <p>Chưa có tài liệu nào</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>

            {report.status !== 'locked' && (
              <CardFooter className='border-t'>
                <div className='flex items-center justify-between w-full'>
                  <div className='flex items-center space-x-4 text-sm text-muted-foreground'>
                    {report.submittedAt && (
                      <div className='flex items-center space-x-1'>
                        <Calendar className='h-4 w-4' />
                        <span>
                          Nộp:{' '}
                          {new Date(report.submittedAt).toLocaleDateString(
                            'vi-VN'
                          )}
                        </span>
                      </div>
                    )}
                    {report.approvedAt && (
                      <div className='flex items-center space-x-1'>
                        <CheckCircle className='h-4 w-4' />
                        <span>
                          Duyệt:{' '}
                          {new Date(report.approvedAt).toLocaleDateString(
                            'vi-VN'
                          )}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className='flex items-center space-x-2'>
                    <Button variant='outline' size='sm'>
                      <FileText className='h-4 w-4 mr-2' />
                      Xuất báo cáo
                    </Button>
                    {report.status === 'pending' && (
                      <Button size='sm'>
                        <Upload className='h-4 w-4 mr-2' />
                        Cập nhật tài liệu
                      </Button>
                    )}
                  </div>
                </div>
              </CardFooter>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

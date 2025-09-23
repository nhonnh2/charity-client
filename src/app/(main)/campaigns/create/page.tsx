'use client';

import { useState } from 'react';
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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import {
  AlertCircle,
  Calendar,
  ChevronRight,
  FileText,
  HelpCircle,
  ImageIcon,
  Info,
  Plus,
  Trash2,
  Upload,
  Wallet,
  Zap,
  Clock,
  Target,
  RefreshCw,
  Shield,
  DollarSign,
  AlertTriangle,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function CreateCampaignPage() {
  const userReputation = 60;
  const [activeStep, setActiveStep] = useState(1);
  const [campaignType, setCampaignType] = useState<'regular' | 'emergency'>(
    'regular'
  );
  const [fundingType, setFundingType] = useState<'fixed' | 'flexible'>('fixed');
  const [reviewFee, setReviewFee] = useState(50000); // Default review fee

  const [phases, setPhases] = useState([
    {
      id: 1,
      title: 'Hoàn thành móng và khung',
      description:
        'Đào móng, đổ bê tông và xây dựng khung chính của trường học.',
      budget: 30000000,
      duration: '30 ngày',
      documents: [] as File[],
    },
    {
      id: 2,
      title: 'Xây tường và mái',
      description:
        'Xây tường, lắp đặt cửa sổ, cửa ra vào và hoàn thiện mái nhà.',
      budget: 40000000,
      duration: '30 ngày',
      documents: [] as File[],
    },
    {
      id: 3,
      title: 'Hoàn thiện và trang thiết bị',
      description:
        'Hoàn thiện nội thất, lắp đặt bàn ghế, bảng, và các thiết bị học tập cơ bản.',
      budget: 30000000,
      duration: '30 ngày',
      documents: [] as File[],
    },
  ]);

  // Calculate maximum emergency campaign amount based on reputation
  const getMaxEmergencyAmount = (reputation: number) => {
    if (reputation >= 90) return 100000000; // 100M VND
    if (reputation >= 80) return 50000000; // 50M VND
    if (reputation >= 70) return 20000000; // 20M VND
    if (reputation >= 60) return 10000000; // 10M VND
    return 0; // Not eligible for emergency campaigns
  };

  const maxEmergencyAmount = getMaxEmergencyAmount(userReputation);
  const canCreateEmergency = userReputation >= 60;

  const addPhase = () => {
    const newId =
      phases.length > 0 ? Math.max(...phases.map(p => p.id)) + 1 : 1;
    setPhases([
      ...phases,
      {
        id: newId,
        title: '',
        description: '',
        budget: 0,
        duration: '',
        documents: [],
      },
    ]);
  };

  const removePhase = (id: number) => {
    setPhases(phases.filter(phase => phase.id !== id));
  };

  return (
    <div className='container mx-auto px-4 py-6 max-w-6xl'>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold tracking-tight'>
          Tạo chiến dịch mới
        </h1>
        <p className='text-muted-foreground'>
          Tạo chiến dịch quyên góp minh bạch với blockchain
        </p>
      </div>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
        {/* Main content - 2/3 width on desktop */}
        <div className='md:col-span-2 space-y-6'>
          <Card>
            <CardHeader className='border-b'>
              <div className='flex items-center justify-between'>
                <div>
                  <CardTitle>Các bước tạo chiến dịch</CardTitle>
                  <CardDescription>
                    Hoàn thành các bước sau để tạo chiến dịch
                  </CardDescription>
                </div>
                <div className='flex items-center space-x-2'>
                  <Badge variant={activeStep >= 1 ? 'default' : 'outline'}>
                    1
                  </Badge>
                  <ChevronRight className='h-4 w-4 text-muted-foreground' />
                  <Badge variant={activeStep >= 2 ? 'default' : 'outline'}>
                    2
                  </Badge>
                  <ChevronRight className='h-4 w-4 text-muted-foreground' />
                  <Badge variant={activeStep >= 3 ? 'default' : 'outline'}>
                    3
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className='p-0'>
              <Tabs value={`step-${activeStep}`} className='w-full'>
                <TabsContent value='step-1' className='m-0 p-6 space-y-6'>
                  {/* Campaign Type Selection */}
                  <div className='space-y-4'>
                    <label className='text-sm font-medium'>
                      Loại chiến dịch
                    </label>
                    <RadioGroup
                      value={campaignType}
                      onValueChange={(value: 'regular' | 'emergency') =>
                        setCampaignType(value)
                      }
                      className='space-y-3'
                    >
                      <div className='flex items-start space-x-3 p-4 border rounded-lg hover:bg-muted/50'>
                        <RadioGroupItem
                          value='regular'
                          id='regular'
                          className='mt-1'
                        />
                        <div className='space-y-1 flex-1'>
                          <Label
                            htmlFor='regular'
                            className='font-medium flex items-center'
                          >
                            <Clock className='h-4 w-4 mr-2 text-blue-600' />
                            Chiến dịch thông thường
                          </Label>
                          <p className='text-sm text-muted-foreground'>
                            Chiến dịch có thể chia nhiều giai đoạn, thời gian
                            thực hiện dài hạn
                          </p>
                        </div>
                      </div>

                      <div
                        className={`flex items-start space-x-3 p-4 border rounded-lg hover:bg-muted/50 ${!canCreateEmergency ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <RadioGroupItem
                          value='emergency'
                          id='emergency'
                          className='mt-1'
                          disabled={!canCreateEmergency}
                        />
                        <div className='space-y-1 flex-1'>
                          <Label
                            htmlFor='emergency'
                            className={`font-medium flex items-center ${!canCreateEmergency ? 'text-muted-foreground' : ''}`}
                          >
                            <Zap className='h-4 w-4 mr-2 text-orange-600' />
                            Chiến dịch khẩn cấp
                            <Badge variant='outline' className='ml-2 text-xs'>
                              Yêu cầu uy tín ≥60
                            </Badge>
                          </Label>
                          <p className='text-sm text-muted-foreground'>
                            Chỉ 1 giai đoạn, giải ngân nhanh. Giới hạn:{' '}
                            {new Intl.NumberFormat('vi-VN').format(
                              maxEmergencyAmount
                            )}{' '}
                            VNĐ
                          </p>
                          {!canCreateEmergency && (
                            <p className='text-xs text-red-600'>
                              Bạn cần ít nhất 60 điểm uy tín để tạo chiến dịch
                              khẩn cấp
                            </p>
                          )}
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Funding Type Selection */}
                  <div className='space-y-4'>
                    <label className='text-sm font-medium'>
                      Mục tiêu quyên góp
                    </label>
                    <RadioGroup
                      value={fundingType}
                      onValueChange={(value: 'fixed' | 'flexible') =>
                        setFundingType(value)
                      }
                      className='space-y-3'
                    >
                      <div className='flex items-start space-x-3 p-4 border rounded-lg hover:bg-muted/50'>
                        <RadioGroupItem
                          value='fixed'
                          id='fixed'
                          className='mt-1'
                        />
                        <div className='space-y-1 flex-1'>
                          <Label
                            htmlFor='fixed'
                            className='font-medium flex items-center'
                          >
                            <Target className='h-4 w-4 mr-2 text-green-600' />
                            Mục tiêu cố định (Fixed Funding)
                          </Label>
                          <p className='text-sm text-muted-foreground'>
                            Phải đạt đủ mục tiêu mới được giải ngân. Nếu không
                            đạt, hoàn lại toàn bộ tiền cho nhà tài trợ
                          </p>
                        </div>
                      </div>

                      <div className='flex items-start space-x-3 p-4 border rounded-lg hover:bg-muted/50'>
                        <RadioGroupItem
                          value='flexible'
                          id='flexible'
                          className='mt-1'
                        />
                        <div className='space-y-1 flex-1'>
                          <Label
                            htmlFor='flexible'
                            className='font-medium flex items-center'
                          >
                            <RefreshCw className='h-4 w-4 mr-2 text-blue-600' />
                            Mục tiêu linh hoạt (Flexible Funding)
                          </Label>
                          <p className='text-sm text-muted-foreground'>
                            Có thể sử dụng số tiền đã quyên góp dù chưa đạt mục
                            tiêu. Cần điều chỉnh kế hoạch và xét duyệt lại
                          </p>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className='space-y-2'>
                    <label className='text-sm font-medium'>
                      Tiêu đề chiến dịch
                    </label>
                    <Input placeholder='Nhập tiêu đề chiến dịch...' />
                    <p className='text-xs text-muted-foreground'>
                      Tiêu đề ngắn gọn, rõ ràng về mục đích của chiến dịch
                    </p>
                  </div>

                  <div className='space-y-2'>
                    <label className='text-sm font-medium'>Danh mục</label>
                    <Select defaultValue='education'>
                      <SelectTrigger>
                        <SelectValue placeholder='Chọn danh mục' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='education'>Giáo dục</SelectItem>
                        <SelectItem value='health'>Y tế</SelectItem>
                        <SelectItem value='environment'>Môi trường</SelectItem>
                        <SelectItem value='disaster'>Thiên tai</SelectItem>
                        <SelectItem value='other'>Khác</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className='space-y-2'>
                    <label className='text-sm font-medium'>
                      Mô tả chiến dịch
                    </label>
                    <Textarea
                      placeholder='Mô tả chi tiết về chiến dịch, mục đích, đối tượng hưởng lợi...'
                      rows={6}
                    />
                    <p className='text-xs text-muted-foreground'>
                      Mô tả càng chi tiết càng tăng độ tin cậy cho chiến dịch
                      của bạn
                    </p>
                  </div>

                  <div className='space-y-2'>
                    <label className='text-sm font-medium'>
                      Mục tiêu quyên góp (VNĐ)
                    </label>
                    <Input
                      type='number'
                      placeholder='Nhập số tiền...'
                      max={
                        campaignType === 'emergency'
                          ? maxEmergencyAmount
                          : undefined
                      }
                    />
                    {campaignType === 'emergency' && (
                      <div className='flex items-center space-x-2 p-3 bg-orange-50 border border-orange-200 rounded-lg'>
                        <AlertTriangle className='h-4 w-4 text-orange-600' />
                        <p className='text-sm text-orange-700'>
                          Chiến dịch khẩn cấp giới hạn tối đa{' '}
                          {new Intl.NumberFormat('vi-VN').format(
                            maxEmergencyAmount
                          )}{' '}
                          VNĐ dựa trên điểm uy tín của bạn ({userReputation}{' '}
                          điểm)
                        </p>
                      </div>
                    )}
                    {fundingType === 'flexible' && (
                      <div className='flex items-center space-x-2 p-3 bg-blue-50 border border-blue-200 rounded-lg'>
                        <Info className='h-4 w-4 text-blue-600' />
                        <p className='text-sm text-blue-700'>
                          Với mục tiêu linh hoạt, bạn có thể sử dụng số tiền đã
                          quyên góp ngay cả khi chưa đạt mục tiêu
                        </p>
                      </div>
                    )}
                  </div>

                  <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                    <div className='space-y-2'>
                      <label className='text-sm font-medium'>
                        Ngày bắt đầu
                      </label>
                      <div className='relative'>
                        <Calendar className='absolute left-3 top-2.5 h-4 w-4 text-muted-foreground' />
                        <Input type='date' className='pl-10' />
                      </div>
                    </div>
                    <div className='space-y-2'>
                      <label className='text-sm font-medium'>
                        Ngày kết thúc
                      </label>
                      <div className='relative'>
                        <Calendar className='absolute left-3 top-2.5 h-4 w-4 text-muted-foreground' />
                        <Input type='date' className='pl-10' />
                      </div>
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <label className='text-sm font-medium'>
                      Hình ảnh chiến dịch
                    </label>
                    <div className='border-2 border-dashed rounded-lg p-6 text-center'>
                      <ImageIcon className='h-8 w-8 mx-auto text-muted-foreground' />
                      <p className='mt-2 text-sm font-medium'>
                        Kéo thả hoặc nhấp để tải lên
                      </p>
                      <p className='mt-1 text-xs text-muted-foreground'>
                        SVG, PNG, JPG hoặc GIF (tối đa 5MB)
                      </p>
                      <Button variant='outline' size='sm' className='mt-4'>
                        <Upload className='mr-2 h-4 w-4' />
                        Chọn tệp
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value='step-2' className='m-0 p-6 space-y-6'>
                  {campaignType === 'emergency' ? (
                    <Alert>
                      <Zap className='h-4 w-4' />
                      <AlertTitle>Chiến dịch khẩn cấp - 1 giai đoạn</AlertTitle>
                      <AlertDescription>
                        Chiến dịch khẩn cấp chỉ có 1 giai đoạn duy nhất để giải
                        ngân nhanh chóng. Vui lòng cung cấp đầy đủ thông tin và
                        tài liệu chứng minh tình trạng khẩn cấp.
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <Alert>
                      <Info className='h-4 w-4' />
                      <AlertTitle>Về giai đoạn chiến dịch</AlertTitle>
                      <AlertDescription>
                        Chia chiến dịch thành các giai đoạn giúp minh bạch hóa
                        quá trình sử dụng quỹ. Mỗi giai đoạn sẽ được giải ngân
                        sau khi hoàn thành và được cộng đồng xác nhận.
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className='space-y-4'>
                    {(campaignType === 'emergency'
                      ? phases.slice(0, 1)
                      : phases
                    ).map((phase, index) => (
                      <Card key={phase.id}>
                        <CardHeader className='pb-2'>
                          <div className='flex items-center justify-between'>
                            <CardTitle className='text-base'>
                              {campaignType === 'emergency'
                                ? 'Thông tin chiến dịch khẩn cấp'
                                : `Giai đoạn ${index + 1}`}
                            </CardTitle>
                            {phases.length > 1 &&
                              campaignType !== 'emergency' && (
                                <Button
                                  variant='ghost'
                                  size='sm'
                                  onClick={() => removePhase(phase.id)}
                                  className='h-8 w-8 p-0 text-muted-foreground hover:text-destructive'
                                >
                                  <Trash2 className='h-4 w-4' />
                                </Button>
                              )}
                          </div>
                        </CardHeader>
                        <CardContent className='space-y-4 pt-0'>
                          <div className='space-y-2'>
                            <label className='text-sm font-medium'>
                              {campaignType === 'emergency'
                                ? 'Tiêu đề khẩn cấp'
                                : 'Tiêu đề giai đoạn'}
                            </label>
                            <Input
                              placeholder={
                                campaignType === 'emergency'
                                  ? 'Ví dụ: Hỗ trợ khẩn cấp cho nạn nhân lũ lụt'
                                  : 'Ví dụ: Xây dựng móng trường học'
                              }
                              value={phase.title}
                              onChange={e => {
                                const newPhases = [...phases];
                                newPhases[index].title = e.target.value;
                                setPhases(newPhases);
                              }}
                            />
                          </div>
                          <div className='space-y-2'>
                            <label className='text-sm font-medium'>
                              {campaignType === 'emergency'
                                ? 'Mô tả tình trạng khẩn cấp'
                                : 'Mô tả giai đoạn'}
                            </label>
                            <Textarea
                              placeholder={
                                campaignType === 'emergency'
                                  ? 'Mô tả chi tiết tình trạng khẩn cấp và lý do cần hỗ trợ ngay...'
                                  : 'Mô tả chi tiết công việc trong giai đoạn này...'
                              }
                              rows={campaignType === 'emergency' ? 5 : 3}
                              value={phase.description}
                              onChange={e => {
                                const newPhases = [...phases];
                                newPhases[index].description = e.target.value;
                                setPhases(newPhases);
                              }}
                            />
                          </div>

                          {/* Document Upload Section */}
                          <div className='space-y-2'>
                            <label className='text-sm font-medium'>
                              {campaignType === 'emergency'
                                ? 'Tài liệu chứng minh khẩn cấp'
                                : 'Tài liệu giai đoạn'}
                            </label>
                            <div className='space-y-3'>
                              <div className='border-2 border-dashed rounded-lg p-4 text-center'>
                                <FileText className='h-6 w-6 mx-auto text-muted-foreground mb-2' />
                                <p className='text-sm font-medium'>
                                  {campaignType === 'emergency'
                                    ? 'Tải lên giấy tờ chứng minh tình trạng khẩn cấp'
                                    : 'Tải lên tài liệu kế hoạch, báo giá, giấy phép...'}
                                </p>
                                <p className='text-xs text-muted-foreground mt-1'>
                                  PDF, JPG, PNG (tối đa 10MB mỗi file)
                                </p>
                                <Button
                                  variant='outline'
                                  size='sm'
                                  className='mt-3'
                                >
                                  <Upload className='mr-2 h-4 w-4' />
                                  Chọn tệp
                                </Button>
                              </div>
                              {campaignType === 'emergency' && (
                                <div className='text-xs text-orange-600 bg-orange-50 p-2 rounded'>
                                  <strong>Lưu ý:</strong> Chiến dịch khẩn cấp
                                  cần cung cấp tài liệu chứng minh tính khẩn cấp
                                  (báo cáo y tế, giấy xác nhận thiên tai, v.v.)
                                </div>
                              )}
                            </div>
                          </div>

                          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                            <div className='space-y-2'>
                              <label className='text-sm font-medium'>
                                Ngân sách (VNĐ)
                              </label>
                              <Input
                                type='number'
                                placeholder='Nhập số tiền...'
                                value={phase.budget}
                                max={
                                  campaignType === 'emergency'
                                    ? maxEmergencyAmount
                                    : undefined
                                }
                                onChange={e => {
                                  const newPhases = [...phases];
                                  newPhases[index].budget =
                                    Number.parseInt(e.target.value) || 0;
                                  setPhases(newPhases);
                                }}
                              />
                            </div>
                            <div className='space-y-2'>
                              <label className='text-sm font-medium'>
                                {campaignType === 'emergency'
                                  ? 'Thời gian cần hỗ trợ'
                                  : 'Thời gian dự kiến'}
                              </label>
                              <Input
                                placeholder={
                                  campaignType === 'emergency'
                                    ? 'Ví dụ: Ngay lập tức'
                                    : 'Ví dụ: 30 ngày'
                                }
                                value={phase.duration}
                                onChange={e => {
                                  const newPhases = [...phases];
                                  newPhases[index].duration = e.target.value;
                                  setPhases(newPhases);
                                }}
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    {campaignType !== 'emergency' && (
                      <Button
                        variant='outline'
                        onClick={addPhase}
                        className='w-full'
                      >
                        <Plus className='mr-2 h-4 w-4' />
                        Thêm giai đoạn
                      </Button>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value='step-3' className='m-0 p-6 space-y-6'>
                  <Alert>
                    <AlertCircle className='h-4 w-4' />
                    <AlertTitle>Xác minh và phí duyệt</AlertTitle>
                    <AlertDescription>
                      Để đảm bảo tính minh bạch, chiến dịch sẽ được đội ngũ
                      chuyên nghiệp duyệt trước khi công khai. Bạn cần xác minh
                      danh tính và đóng phí duyệt để khuyến khích người duyệt
                      làm việc chất lượng.
                    </AlertDescription>
                  </Alert>

                  {/* Review Fee Section */}
                  <Card className='border-2 border-primary/20'>
                    <CardHeader>
                      <CardTitle className='flex items-center text-lg'>
                        <DollarSign className='h-5 w-5 mr-2 text-primary' />
                        Phí duyệt chiến dịch
                      </CardTitle>
                      <CardDescription>
                        Phí duyệt sẽ được sử dụng để trả cho đội ngũ kiểm duyệt
                        chất lượng cao
                      </CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                      <div className='flex items-center justify-between p-4 bg-muted/50 rounded-lg'>
                        <div>
                          <p className='font-medium'>Phí duyệt hiện tại</p>
                          <p className='text-sm text-muted-foreground'>
                            Phí càng cao, chiến dịch được ưu tiên duyệt sớm hơn
                          </p>
                        </div>
                        <div className='text-right'>
                          <p className='text-2xl font-bold text-primary'>
                            {new Intl.NumberFormat('vi-VN').format(reviewFee)}{' '}
                            VNĐ
                          </p>
                        </div>
                      </div>

                      <div className='space-y-3'>
                        <label className='text-sm font-medium'>
                          Điều chỉnh phí duyệt
                        </label>
                        <div className='flex items-center space-x-4'>
                          <Button
                            variant='outline'
                            size='sm'
                            onClick={() =>
                              setReviewFee(Math.max(50000, reviewFee - 10000))
                            }
                          >
                            -10K
                          </Button>
                          <Input
                            type='number'
                            value={reviewFee}
                            onChange={e =>
                              setReviewFee(
                                Math.max(
                                  50000,
                                  Number.parseInt(e.target.value) || 50000
                                )
                              )
                            }
                            min={50000}
                            step={10000}
                            className='text-center'
                          />
                          <Button
                            variant='outline'
                            size='sm'
                            onClick={() => setReviewFee(reviewFee + 10000)}
                          >
                            +10K
                          </Button>
                        </div>
                        <div className='flex justify-between text-xs text-muted-foreground'>
                          <span>Phí tối thiểu: 50,000 VNĐ</span>
                          <span>
                            {reviewFee > 50000
                              ? 'Ưu tiên cao'
                              : 'Ưu tiên tiêu chuẩn'}
                          </span>
                        </div>
                      </div>

                      <Alert>
                        <Shield className='h-4 w-4' />
                        <AlertTitle>Cam kết minh bạch</AlertTitle>
                        <AlertDescription className='text-sm'>
                          Phí duyệt sẽ được hoàn lại 100% nếu chiến dịch bị từ
                          chối do lý do không hợp lệ. Nếu chiến dịch được duyệt,
                          phí sẽ được chuyển cho người duyệt.
                        </AlertDescription>
                      </Alert>
                    </CardContent>
                  </Card>

                  <div className='space-y-2'>
                    <label className='text-sm font-medium'>
                      Tải lên CMND/CCCD (mặt trước)
                    </label>
                    <div className='border-2 border-dashed rounded-lg p-6 text-center'>
                      <FileText className='h-8 w-8 mx-auto text-muted-foreground' />
                      <p className='mt-2 text-sm font-medium'>
                        Kéo thả hoặc nhấp để tải lên
                      </p>
                      <p className='mt-1 text-xs text-muted-foreground'>
                        JPG hoặc PNG (tối đa 5MB)
                      </p>
                      <Button variant='outline' size='sm' className='mt-4'>
                        <Upload className='mr-2 h-4 w-4' />
                        Chọn tệp
                      </Button>
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <label className='text-sm font-medium'>
                      Tải lên CMND/CCCD (mặt sau)
                    </label>
                    <div className='border-2 border-dashed rounded-lg p-6 text-center'>
                      <FileText className='h-8 w-8 mx-auto text-muted-foreground' />
                      <p className='mt-2 text-sm font-medium'>
                        Kéo thả hoặc nhấp để tải lên
                      </p>
                      <p className='mt-1 text-xs text-muted-foreground'>
                        JPG hoặc PNG (tối đa 5MB)
                      </p>
                      <Button variant='outline' size='sm' className='mt-4'>
                        <Upload className='mr-2 h-4 w-4' />
                        Chọn tệp
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div className='space-y-2'>
                    <label className='text-sm font-medium'>
                      Kết nối ví blockchain
                    </label>
                    <Card>
                      <CardContent className='p-4'>
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center space-x-3'>
                            <Wallet className='h-8 w-8 text-blue-600' />
                            <div>
                              <h4 className='font-medium'>MetaMask</h4>
                              <p className='text-xs text-muted-foreground'>
                                Kết nối ví MetaMask để nhận quỹ
                              </p>
                            </div>
                          </div>
                          <Button>Kết nối</Button>
                        </div>
                      </CardContent>
                    </Card>
                    <p className='text-xs text-muted-foreground'>
                      Chiến dịch sẽ sử dụng mạng Polygon để giảm phí giao dịch
                    </p>
                  </div>

                  <div className='space-y-2'>
                    <div className='flex items-center space-x-2'>
                      <input
                        type='checkbox'
                        id='terms'
                        className='rounded border-gray-300'
                      />
                      <label htmlFor='terms' className='text-sm'>
                        Tôi đồng ý với{' '}
                        <Link
                          href='#'
                          className='text-blue-600 hover:underline'
                        >
                          điều khoản sử dụng
                        </Link>{' '}
                        và
                        <Link
                          href='#'
                          className='text-blue-600 hover:underline'
                        >
                          {' '}
                          chính sách bảo mật
                        </Link>
                      </label>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className='border-t px-6 py-4 flex justify-between'>
              <Button
                variant='outline'
                onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
                disabled={activeStep === 1}
              >
                Quay lại
              </Button>
              {activeStep < 3 ? (
                <Button
                  onClick={() => setActiveStep(Math.min(3, activeStep + 1))}
                >
                  Tiếp theo
                </Button>
              ) : (
                <Button className='bg-green-600 hover:bg-green-700'>
                  Tạo chiến dịch & Đóng phí duyệt (
                  {new Intl.NumberFormat('vi-VN').format(reviewFee)} VNĐ)
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>

        {/* Sidebar - 1/3 width on desktop */}
        <div className='space-y-6'>
          <Card className='top-6'>
            <CardHeader>
              <CardTitle>Hướng dẫn</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <h3 className='font-medium flex items-center'>
                  <span className='flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-xs mr-2'>
                    1
                  </span>
                  Thông tin cơ bản
                </h3>
                <p className='text-sm text-muted-foreground pl-7'>
                  Chọn loại chiến dịch (thông thường/khẩn cấp), mục tiêu funding
                  và thông tin chi tiết.
                </p>
              </div>
              <div className='space-y-2'>
                <h3 className='font-medium flex items-center'>
                  <span className='flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-xs mr-2'>
                    2
                  </span>
                  Giai đoạn & Tài liệu
                </h3>
                <p className='text-sm text-muted-foreground pl-7'>
                  Chia giai đoạn (thông thường) hoặc cung cấp thông tin khẩn cấp
                  với tài liệu chứng minh.
                </p>
              </div>
              <div className='space-y-2'>
                <h3 className='font-medium flex items-center'>
                  <span className='flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-xs mr-2'>
                    3
                  </span>
                  Xác minh & Phí duyệt
                </h3>
                <p className='text-sm text-muted-foreground pl-7'>
                  Xác minh danh tính, đóng phí duyệt và kết nối ví blockchain.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Thông tin quan trọng</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <Alert>
                <Info className='h-4 w-4' />
                <AlertTitle>Trạng thái sau khi tạo</AlertTitle>
                <AlertDescription className='text-sm'>
                  Sau khi tạo chiến dịch, trạng thái sẽ là{' '}
                  <strong>"Đang chờ duyệt"</strong>. Đội ngũ duyệt sẽ kiểm tra
                  và phản hồi trong vòng 24-72 giờ.
                </AlertDescription>
              </Alert>

              <div className='space-y-2'>
                <h3 className='text-sm font-medium flex items-center'>
                  <HelpCircle className='h-4 w-4 mr-2 text-muted-foreground' />
                  Chiến dịch khẩn cấp vs Thông thường?
                </h3>
                <p className='text-xs text-muted-foreground pl-6'>
                  Khẩn cấp: 1 giai đoạn, cần uy tín ≥60, giới hạn tiền theo uy
                  tín. Thông thường: Nhiều giai đoạn, không giới hạn uy tín.
                </p>
              </div>

              <div className='space-y-2'>
                <h3 className='text-sm font-medium flex items-center'>
                  <HelpCircle className='h-4 w-4 mr-2 text-muted-foreground' />
                  Fixed vs Flexible Funding?
                </h3>
                <p className='text-xs text-muted-foreground pl-6'>
                  Fixed: Phải đạt 100% mục tiêu mới giải ngân. Flexible: Có thể
                  dùng tiền dù chưa đạt mục tiêu.
                </p>
              </div>

              <div className='space-y-2'>
                <h3 className='text-sm font-medium flex items-center'>
                  <HelpCircle className='h-4 w-4 mr-2 text-muted-foreground' />
                  Tại sao cần phí duyệt?
                </h3>
                <p className='text-xs text-muted-foreground pl-6'>
                  Phí duyệt đảm bảo chất lượng kiểm duyệt và khuyến khích người
                  duyệt làm việc tận tình. Phí sẽ được hoàn lại nếu chiến dịch
                  bị từ chối không hợp lý.
                </p>
              </div>

              <div className='space-y-2'>
                <h3 className='text-sm font-medium flex items-center'>
                  <HelpCircle className='h-4 w-4 mr-2 text-muted-foreground' />
                  Làm sao để tăng độ uy tín?
                </h3>
                <p className='text-xs text-muted-foreground pl-6'>
                  Hoàn thành các chiến dịch đúng tiến độ, cập nhật thường xuyên
                  và minh bạch trong chi tiêu.
                </p>
              </div>
              <div className='space-y-2'>
                <h3 className='text-sm font-medium flex items-center'>
                  <HelpCircle className='h-4 w-4 mr-2 text-muted-foreground' />
                  Quy trình giải ngân như thế nào?
                </h3>
                <p className='text-xs text-muted-foreground pl-6'>
                  Mỗi giai đoạn sẽ được giải ngân sau khi bạn cập nhật tiến độ
                  và được 51% người đóng góp xác nhận.
                </p>
              </div>
              <div className='space-y-2'>
                <h3 className='text-sm font-medium flex items-center'>
                  <HelpCircle className='h-4 w-4 mr-2 text-muted-foreground' />
                  Phí giao dịch là bao nhiêu?
                </h3>
                <p className='text-xs text-muted-foreground pl-6'>
                  Nền tảng thu 2.5% phí trên mỗi giao dịch thành công để duy trì
                  hệ thống.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant='outline' className='w-full'>
                Xem tất cả câu hỏi
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Shield,
  Star,
  Calendar,
  Heart,
  Award,
  FileText,
  AlertCircle,
  Clock,
  TrendingUp,
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useAuthState } from '@/hooks/auth/use-auth';
import { toast } from 'sonner';

export default function ReviewerApplicationPage() {
  const router = useRouter();
  const { user } = useAuthState();

  const [formData, setFormData] = useState({
    motivation: '',
    experience: '',
    availability: '',
    specialties: [] as string[],
    agreeToTerms: false,
    agreeToCommitment: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock user stats - trong thực tế sẽ fetch từ API
  const userStats = {
    reputation: 82,
    joinDate: new Date(2023, 3, 15),
    campaignsSupported: 12,
    totalDonated: 8500000,
    activeDays: 245,
    completedCampaigns: 3,
  };

  const requirements = [
    {
      label: 'Điểm uy tín ≥ 70',
      current: userStats.reputation,
      required: 70,
      met: userStats.reputation >= 70,
      icon: <Star className='h-4 w-4' />,
    },
    {
      label: 'Đã tham gia ít nhất 30 ngày',
      current: userStats.activeDays,
      required: 30,
      met: userStats.activeDays >= 30,
      icon: <Calendar className='h-4 w-4' />,
    },
    {
      label: 'Đã đóng góp cho ít nhất 5 chiến dịch',
      current: userStats.campaignsSupported,
      required: 5,
      met: userStats.campaignsSupported >= 5,
      icon: <Heart className='h-4 w-4' />,
    },
    {
      label: 'Đã hoàn thành ít nhất 1 chiến dịch (nếu là người tạo)',
      current: userStats.completedCampaigns,
      required: 1,
      met: true, // Optional requirement
      icon: <Award className='h-4 w-4' />,
      optional: true,
    },
  ];

  const specialtyOptions = [
    'Giáo dục',
    'Y tế',
    'Môi trường',
    'Xã hội',
    'Thiên tai',
    'Trẻ em',
    'Người cao tuổi',
    'Động vật',
    'Nghệ thuật',
    'Thể thao',
    'Công nghệ',
    'Khác',
  ];

  const allRequirementsMet = requirements
    .filter(req => !req.optional)
    .every(req => req.met);

  const handleSpecialtyChange = (specialty: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        specialties: [...prev.specialties, specialty],
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        specialties: prev.specialties.filter(s => s !== specialty),
      }));
    }
  };

  const handleSubmit = async () => {
    if (!allRequirementsMet) {
      toast.error('Bạn chưa đáp ứng đủ yêu cầu để trở thành người duyệt');
      return;
    }

    if (!formData.motivation.trim()) {
      toast.error('Vui lòng chia sẻ động lực của bạn');
      return;
    }

    if (!formData.agreeToTerms || !formData.agreeToCommitment) {
      toast.error('Vui lòng đồng ý với các điều khoản và cam kết');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast.success(
        'Đã gửi đơn đăng ký thành công! Chúng tôi sẽ xem xét và phản hồi trong vòng 3-5 ngày làm việc.'
      );
      router.push('/reviewer');
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getDaysFromJoin = () => {
    const now = new Date();
    const diffTime = now.getTime() - userStats.joinDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className='container mx-auto px-4 py-6 max-w-4xl'>
      {/* Header */}
      <div className='mb-6'>
        <div className='flex items-center space-x-4 mb-4'>
          <Link href='/reviewer'>
            <Button variant='outline' size='sm'>
              <ArrowLeft className='h-4 w-4 mr-2' />
              Quay lại
            </Button>
          </Link>
        </div>

        <div className='text-center space-y-2'>
          <div className='flex justify-center'>
            <Shield className='h-12 w-12 text-primary' />
          </div>
          <h1 className='text-2xl font-bold tracking-tight'>
            Đăng ký làm người duyệt
          </h1>
          <p className='text-muted-foreground'>
            Gia nhập đội ngũ người duyệt và giúp đảm bảo chất lượng các chiến
            dịch từ thiện
          </p>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Main Form */}
        <div className='lg:col-span-2 space-y-6'>
          {/* Requirements Check */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <CheckCircle className='h-5 w-5 mr-2 text-green-600' />
                Kiểm tra yêu cầu
              </CardTitle>
              <CardDescription>
                Xác minh bạn đáp ứng các yêu cầu cơ bản để trở thành người duyệt
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              {requirements.map((req, index) => (
                <div
                  key={index}
                  className='flex items-center justify-between p-3 border rounded-lg'
                >
                  <div className='flex items-center space-x-3'>
                    <div
                      className={`${req.met ? 'text-green-600' : 'text-red-600'}`}
                    >
                      {req.met ? (
                        <CheckCircle className='h-5 w-5' />
                      ) : (
                        <XCircle className='h-5 w-5' />
                      )}
                    </div>
                    <div className='flex-1'>
                      <div className='flex items-center space-x-2'>
                        {req.icon}
                        <span className='font-medium'>{req.label}</span>
                        {req.optional && (
                          <Badge variant='outline' className='text-xs'>
                            Tùy chọn
                          </Badge>
                        )}
                      </div>
                      <div className='text-sm text-muted-foreground'>
                        Hiện tại: {req.current} / Yêu cầu: {req.required}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`font-bold ${req.met ? 'text-green-600' : 'text-red-600'}`}
                  >
                    {req.met ? 'Đạt' : 'Chưa đạt'}
                  </div>
                </div>
              ))}

              {!allRequirementsMet && (
                <Alert>
                  <AlertCircle className='h-4 w-4' />
                  <AlertTitle>Chưa đủ điều kiện</AlertTitle>
                  <AlertDescription>
                    Bạn cần hoàn thành các yêu cầu còn lại trước khi có thể đăng
                    ký làm người duyệt.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Application Form */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin đăng ký</CardTitle>
              <CardDescription>
                Chia sẻ về bản thân và lý do bạn muốn trở thành người duyệt
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              {/* Motivation */}
              <div className='space-y-2'>
                <Label className='font-medium'>
                  Động lực và lý do <span className='text-red-500'>*</span>
                </Label>
                <Textarea
                  placeholder='Chia sẻ lý do bạn muốn trở thành người duyệt và đóng góp cho cộng đồng...'
                  value={formData.motivation}
                  onChange={e =>
                    setFormData(prev => ({
                      ...prev,
                      motivation: e.target.value,
                    }))
                  }
                  rows={4}
                  className='resize-none'
                />
                <p className='text-xs text-muted-foreground'>
                  Tối thiểu 100 ký tự
                </p>
              </div>

              {/* Experience */}
              <div className='space-y-2'>
                <Label className='font-medium'>Kinh nghiệm liên quan</Label>
                <Textarea
                  placeholder='Mô tả kinh nghiệm của bạn trong việc đánh giá, quản lý dự án, hoặc làm việc từ thiện...'
                  value={formData.experience}
                  onChange={e =>
                    setFormData(prev => ({
                      ...prev,
                      experience: e.target.value,
                    }))
                  }
                  rows={3}
                  className='resize-none'
                />
              </div>

              {/* Availability */}
              <div className='space-y-2'>
                <Label className='font-medium'>Thời gian có thể tham gia</Label>
                <Input
                  placeholder='VD: 2-3 giờ/ngày, cuối tuần, linh hoạt...'
                  value={formData.availability}
                  onChange={e =>
                    setFormData(prev => ({
                      ...prev,
                      availability: e.target.value,
                    }))
                  }
                />
              </div>

              {/* Specialties */}
              <div className='space-y-3'>
                <Label className='font-medium'>Lĩnh vực quan tâm</Label>
                <p className='text-sm text-muted-foreground'>
                  Chọn các lĩnh vực bạn có kinh nghiệm hoặc quan tâm (tối đa 5)
                </p>
                <div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
                  {specialtyOptions.map(specialty => (
                    <div
                      key={specialty}
                      className='flex items-center space-x-2'
                    >
                      <Checkbox
                        id={specialty}
                        checked={formData.specialties.includes(specialty)}
                        onCheckedChange={checked =>
                          handleSpecialtyChange(specialty, checked as boolean)
                        }
                        disabled={
                          !formData.specialties.includes(specialty) &&
                          formData.specialties.length >= 5
                        }
                      />
                      <Label
                        htmlFor={specialty}
                        className='text-sm cursor-pointer'
                      >
                        {specialty}
                      </Label>
                    </div>
                  ))}
                </div>
                <p className='text-xs text-muted-foreground'>
                  Đã chọn: {formData.specialties.length}/5
                </p>
              </div>

              {/* Terms and Commitments */}
              <div className='space-y-4 pt-4 border-t'>
                <div className='space-y-3'>
                  <div className='flex items-start space-x-2'>
                    <Checkbox
                      id='terms'
                      checked={formData.agreeToTerms}
                      onCheckedChange={checked =>
                        setFormData(prev => ({
                          ...prev,
                          agreeToTerms: checked as boolean,
                        }))
                      }
                    />
                    <Label
                      htmlFor='terms'
                      className='text-sm leading-relaxed cursor-pointer'
                    >
                      Tôi đồng ý với{' '}
                      <Link
                        href='/terms'
                        className='text-primary hover:underline'
                      >
                        Điều khoản dịch vụ
                      </Link>{' '}
                      và{' '}
                      <Link
                        href='/privacy'
                        className='text-primary hover:underline'
                      >
                        Chính sách bảo mật
                      </Link>
                    </Label>
                  </div>

                  <div className='flex items-start space-x-2'>
                    <Checkbox
                      id='commitment'
                      checked={formData.agreeToCommitment}
                      onCheckedChange={checked =>
                        setFormData(prev => ({
                          ...prev,
                          agreeToCommitment: checked as boolean,
                        }))
                      }
                    />
                    <Label
                      htmlFor='commitment'
                      className='text-sm leading-relaxed cursor-pointer'
                    >
                      Tôi cam kết thực hiện nghĩa vụ người duyệt một cách công
                      bằng, trung thực và có trách nhiệm. Tôi hiểu rằng quyết
                      định duyệt của tôi sẽ ảnh hưởng đến cộng đồng và các chiến
                      dịch từ thiện.
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleSubmit}
                disabled={
                  !allRequirementsMet ||
                  isSubmitting ||
                  !formData.agreeToTerms ||
                  !formData.agreeToCommitment
                }
                className='w-full'
              >
                {isSubmitting ? 'Đang gửi đơn...' : 'Gửi đơn đăng ký'}
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Sidebar */}
        <div className='space-y-6'>
          {/* User Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Thống kê của bạn</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-2 gap-4 text-center'>
                <div>
                  <p className='text-2xl font-bold text-primary'>
                    {userStats.reputation}
                  </p>
                  <p className='text-xs text-muted-foreground'>Điểm uy tín</p>
                </div>
                <div>
                  <p className='text-2xl font-bold'>{getDaysFromJoin()}</p>
                  <p className='text-xs text-muted-foreground'>Ngày tham gia</p>
                </div>
                <div>
                  <p className='text-2xl font-bold text-green-600'>
                    {userStats.campaignsSupported}
                  </p>
                  <p className='text-xs text-muted-foreground'>
                    Chiến dịch ủng hộ
                  </p>
                </div>
                <div>
                  <p className='text-2xl font-bold text-orange-600'>
                    {userStats.completedCampaigns}
                  </p>
                  <p className='text-xs text-muted-foreground'>
                    Chiến dịch hoàn thành
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card>
            <CardHeader>
              <CardTitle>Quyền lợi người duyệt</CardTitle>
            </CardHeader>
            <CardContent className='space-y-3 text-sm'>
              <div className='flex items-start space-x-2'>
                <TrendingUp className='h-4 w-4 text-green-600 mt-0.5 flex-shrink-0' />
                <span>Kiếm thu nhập từ việc duyệt chiến dịch</span>
              </div>
              <div className='flex items-start space-x-2'>
                <Award className='h-4 w-4 text-primary mt-0.5 flex-shrink-0' />
                <span>Tăng uy tín và địa vị trong cộng đồng</span>
              </div>
              <div className='flex items-start space-x-2'>
                <Shield className='h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0' />
                <span>Quyền ưu tiên trong các tính năng mới</span>
              </div>
              <div className='flex items-start space-x-2'>
                <Heart className='h-4 w-4 text-red-600 mt-0.5 flex-shrink-0' />
                <span>Đóng góp cho sự phát triển cộng đồng</span>
              </div>
            </CardContent>
          </Card>

          {/* Process */}
          <Card>
            <CardHeader>
              <CardTitle>Quy trình xét duyệt</CardTitle>
            </CardHeader>
            <CardContent className='space-y-3 text-sm'>
              <div className='flex items-center space-x-3'>
                <div className='h-2 w-2 bg-blue-500 rounded-full'></div>
                <span>Gửi đơn đăng ký</span>
              </div>
              <div className='flex items-center space-x-3'>
                <div className='h-2 w-2 bg-yellow-500 rounded-full'></div>
                <span>Xem xét đơn (3-5 ngày)</span>
              </div>
              <div className='flex items-center space-x-3'>
                <div className='h-2 w-2 bg-green-500 rounded-full'></div>
                <span>Thông báo kết quả</span>
              </div>
              <div className='flex items-center space-x-3'>
                <div className='h-2 w-2 bg-purple-500 rounded-full'></div>
                <span>Đào tạo & kích hoạt</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

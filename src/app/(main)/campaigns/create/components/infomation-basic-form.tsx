'use client';

import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
} from '@/components/ui/form';
import {
  Calendar,
  ImageIcon,
  Info,
  Upload,
  Zap,
  Clock,
  Target,
  RefreshCw,
  AlertTriangle,
} from 'lucide-react';
import { UseFormReturn, useWatch } from 'react-hook-form';
import {
  canCreateEmergency,
  maxEmergencyAmount,
  userReputation,
} from '../constant';

type InfomationBasicFormProps = {
  form: UseFormReturn<any>;
};

const InfomationBasicForm = ({ form }: InfomationBasicFormProps) => {
  const [type, fundingType] = useWatch({
    control: form.control,
    name: ['type', 'fundingType'],
  });

  return (
    <>
      {/* Campaign Type Selection */}
      <FormField
        name='type'
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <Label className='text-sm font-medium'>Loại chiến dịch</Label>
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value}
              className='space-y-3'
            >
              <div className='flex items-start space-x-3 p-4 border rounded-lg hover:bg-muted/50'>
                <RadioGroupItem value='regular' id='regular' className='mt-1' />
                <div className='space-y-1 flex-1'>
                  <Label
                    htmlFor='regular'
                    className='font-medium flex items-center cursor-pointer'
                  >
                    <Clock className='h-4 w-4 mr-2 text-blue-600' />
                    Chiến dịch thông thường
                  </Label>
                  <p className='text-sm text-muted-foreground'>
                    Chiến dịch có thể chia nhiều giai đoạn, thời gian thực hiện
                    dài hạn
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
                    className={`font-medium flex items-center cursor-pointer ${!canCreateEmergency ? 'text-muted-foreground' : ''}`}
                  >
                    <Zap className='h-4 w-4 mr-2 text-orange-600' />
                    Chiến dịch khẩn cấp
                    <Badge variant='outline' className='ml-2 text-xs'>
                      Yêu cầu uy tín ≥60
                    </Badge>
                  </Label>
                  <p className='text-sm text-muted-foreground'>
                    Chỉ 1 giai đoạn, giải ngân nhanh. Giới hạn:{' '}
                    {new Intl.NumberFormat('vi-VN').format(maxEmergencyAmount)}{' '}
                    VNĐ
                  </p>
                  {!canCreateEmergency && (
                    <p className='text-xs text-red-600'>
                      Bạn cần ít nhất 60 điểm uy tín để tạo chiến dịch khẩn cấp
                    </p>
                  )}
                </div>
              </div>
            </RadioGroup>
            {/* <FormMessage /> */}
          </FormItem>
        )}
      />
      <FormField
        name='fundingType'
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <Label className='text-sm font-medium'>Mục tiêu quyên góp</Label>
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className='space-y-3'
            >
              <div className='flex items-start space-x-3 p-4 border rounded-lg hover:bg-muted/50'>
                <RadioGroupItem value='fixed' id='fixed' className='mt-1' />
                <div className='space-y-1 flex-1'>
                  <Label
                    htmlFor='fixed'
                    className='font-medium flex items-center cursor-pointer'
                  >
                    <Target className='h-4 w-4 mr-2 text-green-600' />
                    Mục tiêu cố định (Fixed Funding)
                  </Label>
                  <p className='text-sm text-muted-foreground'>
                    Phải đạt đủ mục tiêu mới được giải ngân. Nếu không đạt, hoàn
                    lại toàn bộ tiền cho nhà tài trợ
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
                    className='font-medium flex items-center cursor-pointer'
                  >
                    <RefreshCw className='h-4 w-4 mr-2 text-blue-600' />
                    Mục tiêu linh hoạt (Flexible Funding)
                  </Label>
                  <p className='text-sm text-muted-foreground'>
                    Có thể sử dụng số tiền đã quyên góp dù chưa đạt mục tiêu.
                    Cần điều chỉnh kế hoạch và xét duyệt lại
                  </p>
                </div>
              </div>
            </RadioGroup>
          </FormItem>
        )}
      />
      <FormField
        name='title'
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel className='text-sm font-medium'>
              Tiêu đề chiến dịch
            </FormLabel>
            <FormControl>
              <Input placeholder='Nhập tiêu đề chiến dịch...' {...field} />
            </FormControl>
            <p className='text-xs text-muted-foreground'>
              Tiêu đề ngắn gọn, rõ ràng về mục đích của chiến dịch
            </p>
          </FormItem>
        )}
      />
      <FormField
        name='category'
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel className='text-sm font-medium'>Danh mục</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder='Chọn danh mục' />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value='education'>Giáo dục</SelectItem>
                <SelectItem value='health'>Y tế</SelectItem>
                <SelectItem value='environment'>Môi trường</SelectItem>
                <SelectItem value='disaster'>Thiên tai</SelectItem>
                <SelectItem value='other'>Khác</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
      <FormField
        name='description'
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel className='text-sm font-medium'>
              Mô tả chiến dịch
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder='Mô tả chi tiết về chiến dịch, mục đích, đối tượng hưởng lợi...'
                rows={6}
                {...field}
              />
            </FormControl>
            <p className='text-xs text-muted-foreground'>
              Mô tả càng chi tiết càng tăng độ tin cậy cho chiến dịch của bạn
            </p>
          </FormItem>
        )}
      />
      <FormField
        name='targetAmount'
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel className='text-sm font-medium'>
              Mục tiêu quyên góp (VNĐ)
            </FormLabel>
            <FormControl>
              <Input
                type='number'
                placeholder='Nhập số tiền...'
                {...field}
                max={type === 'emergency' ? maxEmergencyAmount : undefined}
              />
            </FormControl>
            {type === 'emergency' && (
              <div className='flex items-center space-x-2 p-3 bg-orange-50 border border-orange-200 rounded-lg'>
                <AlertTriangle className='h-4 w-4 text-orange-600' />
                <p className='text-sm text-orange-700'>
                  Chiến dịch khẩn cấp giới hạn tối đa{' '}
                  {new Intl.NumberFormat('vi-VN').format(maxEmergencyAmount)}{' '}
                  VNĐ dựa trên điểm uy tín của bạn ({userReputation} điểm)
                </p>
              </div>
            )}
            {fundingType === 'flexible' && (
              <div className='flex items-center space-x-2 p-3 bg-blue-50 border border-blue-200 rounded-lg'>
                <Info className='h-4 w-4 text-blue-600' />
                <p className='text-sm text-blue-700'>
                  Với mục tiêu linh hoạt, bạn có thể sử dụng số tiền đã quyên
                  góp ngay cả khi chưa đạt mục tiêu
                </p>
              </div>
            )}
          </FormItem>
        )}
      />
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        <FormField
          name='startDate'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm font-medium'>
                Ngày bắt đầu dự kiến
              </FormLabel>
              <div className='relative'>
                <Calendar className='absolute left-3 top-2.5 h-4 w-4 text-muted-foreground' />
                <FormControl>
                  <Input type='date' className='pl-10' {...field} />
                </FormControl>
              </div>
            </FormItem>
          )}
        />

        <FormField
          name='endDate'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm font-medium'>
                Ngày kết thúc dự kiến
              </FormLabel>
              <div className='relative'>
                <Calendar className='absolute left-3 top-2.5 h-4 w-4 text-muted-foreground' />
                <FormControl>
                  <Input type='date' className='pl-10' {...field} />
                </FormControl>
              </div>
            </FormItem>
          )}
        />
      </div>
      <FormField
        name='file[cover]'
        control={form.control}
        render={({ field }) => {
          const inputRef = useRef<HTMLInputElement | null>(null);
          const setFile = (f: File | null) => field.onChange(f ?? null);
          return (
            <FormItem>
              <FormLabel className='text-sm font-medium'>
                Hình ảnh chiến dịch
              </FormLabel>
              <div className='border-2 border-dashed rounded-lg p-6 text-center'>
                <ImageIcon className='h-8 w-8 mx-auto text-muted-foreground' />
                <p className='mt-2 text-sm font-medium'>
                  Kéo thả hoặc nhấp để tải lên
                </p>
                <p className='mt-1 text-xs text-muted-foreground'>
                  SVG, PNG, JPG hoặc GIF (tối đa 5MB)
                </p>
                <Button
                  variant='outline'
                  size='sm'
                  className='mt-4'
                  onClick={() => inputRef.current?.click()}
                >
                  <Upload className='mr-2 h-4 w-4' />
                  Chọn tệp
                </Button>

                <input
                  ref={inputRef}
                  name={field.name}
                  type='file'
                  accept='image/png,image/jpeg,image/gif,image/svg+xml'
                  className='hidden'
                  onChange={e => setFile(e.target.files?.[0] ?? null)}
                />
              </div>
            </FormItem>
          );
        }}
      />
    </>
  );
};

export default InfomationBasicForm;

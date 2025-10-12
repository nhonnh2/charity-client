'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { ImageUploadPreview } from '@/components/ui/image-upload-preview';
import { AlertCircle, Wallet, Shield, DollarSign } from 'lucide-react';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CreateCampaignFormType } from '@/schemaValidations/campaign.schema';

type VerifyFormProps = {
  form: UseFormReturn<CreateCampaignFormType>;
};

const VerifyForm = ({ form }: VerifyFormProps) => {
  const reviewFee = useWatch({
    control: form.control,
    name: 'reviewFee',
  });

  return (
    <>
      <Alert>
        <AlertCircle className='h-4 w-4' />
        <AlertTitle>Xác minh và phí duyệt</AlertTitle>
        <AlertDescription>
          Để đảm bảo tính minh bạch, chiến dịch sẽ được đội ngũ chuyên nghiệp
          duyệt trước khi công khai. Bạn cần xác minh danh tính và đóng phí
          duyệt để khuyến khích người duyệt làm việc chất lượng.
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
            Phí duyệt sẽ được sử dụng để trả cho đội ngũ kiểm duyệt chất lượng
            cao
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
                {new Intl.NumberFormat('vi-VN').format(reviewFee || 0)} VNĐ
              </p>
            </div>
          </div>
          <FormField
            control={form.control}
            name='reviewFee'
            render={({ field }) => (
              <FormItem>
                <FormLabel> Điều chỉnh phí duyệt</FormLabel>
                <div className='flex items-center space-x-4'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      field.onChange(Math.max(50000, reviewFee - 10000));
                    }}
                  >
                    -10K
                  </Button>
                  <Input
                    type='number'
                    {...field}
                    onChange={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      field.onChange(parseFloat(e.target.value) || 50000);
                    }}
                    min={50000}
                    step={10000}
                    className='text-center'
                  />
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => field.onChange(reviewFee + 10000)}
                  >
                    +10K
                  </Button>
                </div>
                <div className='flex justify-between text-xs text-muted-foreground'>
                  <span>Phí tối thiểu: 50,000 VNĐ</span>
                  <span>
                    {reviewFee > 50000 ? 'Ưu tiên cao' : 'Ưu tiên tiêu chuẩn'}
                  </span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Alert>
            <Shield className='h-4 w-4' />
            <AlertTitle>Cam kết minh bạch</AlertTitle>
            <AlertDescription className='text-sm'>
              Nếu chiến dịch được duyệt 70% phí sẽ được trả cho người xét duyệt
              và 30% phí sẽ trả cho hệ thống. Nếu chiến dịch bị từ chối 70% phí
              vẫn sẽ trả cho người duyệt và 30% sẽ được hoàn lại cho người tạo.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <FormField
        name='identityFront'
        control={form.control}
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel className='text-sm font-medium'>
              Tải lên CMND/CCCD (mặt trước)
            </FormLabel>
            <FormControl>
              <ImageUploadPreview
                value={field.value}
                onChange={field.onChange}
                onClearError={() => form.clearErrors('identityFront')}
                error={fieldState.error?.message}
                label='Kéo thả hoặc nhấp để tải lên'
                description='JPG hoặc PNG (tối đa 5MB)'
                accept='image/png,image/jpeg,image/jpg'
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name='identityBack'
        control={form.control}
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel className='text-sm font-medium'>
              Tải lên CMND/CCCD (mặt sau)
            </FormLabel>
            <FormControl>
              <ImageUploadPreview
                value={field.value}
                onChange={field.onChange}
                onClearError={() => form.clearErrors('identityBack')}
                error={fieldState.error?.message}
                label='Kéo thả hoặc nhấp để tải lên'
                description='JPG hoặc PNG (tối đa 5MB)'
                accept='image/png,image/jpeg,image/jpg'
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Separator />

      {/* <div className='space-y-2'>
        <label className='text-sm font-medium'>Kết nối ví blockchain</label>
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
              <Button type='button'>Kết nối</Button>
            </div>
          </CardContent>
        </Card>
        <p className='text-xs text-muted-foreground'>
          Chiến dịch sẽ sử dụng mạng Polygon để giảm phí giao dịch
        </p>
      </div> */}

      <FormField
        name='agreedToTerms'
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <div className='flex items-center space-x-2'>
              <FormControl>
                <input
                  type='checkbox'
                  id='terms'
                  className='rounded border-gray-300'
                  checked={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <label htmlFor='terms' className='text-sm'>
                Tôi đồng ý với{' '}
                <Link href='#' className='text-blue-600 hover:underline'>
                  điều khoản sử dụng
                </Link>{' '}
                và
                <Link href='#' className='text-blue-600 hover:underline'>
                  {' '}
                  chính sách bảo mật
                </Link>
              </label>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default VerifyForm;

'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
} from '@/components/ui/form';
import { FileText, Info, Plus, Trash2, Upload, Zap } from 'lucide-react';
import { useWatch, UseFormReturn } from 'react-hook-form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type MileStonesFormProps = {
  form: UseFormReturn<any>;
};

const MileStonesForm = ({ form }: MileStonesFormProps) => {
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

  const [type, fundingType] = useWatch({
    control: form.control,
    name: ['type', 'fundingType'],
  });

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
    <>
      {type === 'emergency' ? (
        <Alert>
          <Zap className='h-4 w-4' />
          <AlertTitle>Chiến dịch khẩn cấp - 1 giai đoạn</AlertTitle>
          <AlertDescription>
            Chiến dịch khẩn cấp chỉ có 1 giai đoạn duy nhất để giải ngân nhanh
            chóng. Vui lòng cung cấp đầy đủ thông tin và tài liệu chứng minh
            tình trạng khẩn cấp.
          </AlertDescription>
        </Alert>
      ) : (
        <Alert>
          <Info className='h-4 w-4' />
          <AlertTitle>Về giai đoạn chiến dịch</AlertTitle>
          <AlertDescription>
            Chia chiến dịch thành các giai đoạn giúp minh bạch hóa quá trình sử
            dụng quỹ. Mỗi giai đoạn sẽ được giải ngân sau khi hoàn thành và được
            cộng đồng xác nhận.
          </AlertDescription>
        </Alert>
      )}

      <div className='space-y-4'>
        {(type === 'emergency' ? phases.slice(0, 1) : phases).map(
          (phase, index) => (
            <Card key={phase.id}>
              <CardHeader className='pb-2'>
                <div className='flex items-center justify-between'>
                  <CardTitle className='text-base'>
                    {type === 'emergency'
                      ? 'Thông tin chiến dịch khẩn cấp'
                      : `Giai đoạn ${index + 1}`}
                  </CardTitle>
                  {phases.length > 1 && type !== 'emergency' && (
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
                <FormField
                  name='milestones[title]'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {type === 'emergency'
                          ? 'Tiêu đề khẩn cấp'
                          : 'Tiêu đề giai đoạn'}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={
                            type === 'emergency'
                              ? 'Ví dụ: Hỗ trợ khẩn cấp cho nạn nhân lũ lụt'
                              : 'Ví dụ: Xây dựng móng trường học'
                          }
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name='milestones[description]'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {type === 'emergency'
                          ? 'Mô tả tình trạng khẩn cấp'
                          : 'Mô tả giai đoạn'}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={
                            type === 'emergency'
                              ? 'Mô tả chi tiết tình trạng khẩn cấp và lý do cần hỗ trợ ngay...'
                              : 'Mô tả chi tiết công việc trong giai đoạn này...'
                          }
                          rows={type === 'emergency' ? 5 : 3}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name='milestones[documents]'
                  control={form.control}
                  render={({ field }) => {
                    const inputRef = useRef<HTMLInputElement | null>(null);
                    const setFile = (f: File | null) =>
                      field.onChange(f ?? null);
                    return (
                      <FormItem>
                        <FormLabel>
                          {type === 'emergency'
                            ? 'Tài liệu chứng minh khẩn cấp'
                            : 'Tài liệu giai đoạn'}
                        </FormLabel>
                        <div className='space-y-3'>
                          <div className='border-2 border-dashed rounded-lg p-4 text-center'>
                            <FileText className='h-6 w-6 mx-auto text-muted-foreground mb-2' />
                            <p className='text-sm font-medium'>
                              {type === 'emergency'
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
                            <input
                              ref={inputRef}
                              name={field.name}
                              type='file'
                              accept='image/png,image/jpeg,image/gif,image/svg+xml'
                              className='hidden'
                              onChange={e =>
                                setFile(e.target.files?.[0] ?? null)
                              }
                            />
                          </div>
                          {type === 'emergency' && (
                            <div className='text-xs text-orange-600 bg-orange-50 p-2 rounded'>
                              <strong>Lưu ý:</strong> Chiến dịch khẩn cấp cần
                              cung cấp tài liệu chứng minh tính khẩn cấp (báo
                              cáo y tế, giấy xác nhận thiên tai, v.v.)
                            </div>
                          )}
                        </div>
                      </FormItem>
                    );
                  }}
                />

                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                  <FormField
                    name='milestones[budget]'
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ngân sách (VNĐ)</FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            placeholder='Nhập số tiền...'
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    name='milestones[durationDays]'
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {type === 'emergency'
                            ? 'Thời gian cần hỗ trợ'
                            : 'Thời gian dự kiến'}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={
                              type === 'emergency'
                                ? 'Ví dụ: Ngay lập tức'
                                : 'Ví dụ: 30 ngày'
                            }
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          )
        )}
        {type !== 'emergency' && (
          <Button variant='outline' onClick={addPhase} className='w-full'>
            <Plus className='mr-2 h-4 w-4' />
            Thêm giai đoạn
          </Button>
        )}
      </div>
    </>
  );
};

export default MileStonesForm;

'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { DocumentUpload } from '@/components/ui/document-upload';
import RichTextEditor from '@/components/ui/rich-text-editor';
import { Info, Plus, Trash2, Zap } from 'lucide-react';
import { useWatch, UseFormReturn, useFieldArray } from 'react-hook-form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CreateCampaignFormType } from '@/schemaValidations/campaign.schema';

type MileStonesFormProps = {
  form: UseFormReturn<CreateCampaignFormType>;
};

const MileStonesForm = ({ form }: MileStonesFormProps) => {
  // Use useFieldArray to manage milestones - syncs with form data
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'milestones',
  });

  const type = useWatch({
    control: form.control,
    name: 'type',
  });

  // Watch milestones for debugging
  const milestones = useWatch({
    control: form.control,
    name: 'milestones',
  });

  // Log milestones changes for debugging
  console.log(
    'MileStonesForm render - milestones:',
    milestones?.map((m, index) => ({
      index,
      title: m?.title || '',
      description: m?.description || '',
      budget: m?.budget || 0,
      durationDays: m?.durationDays || 0,
      documentsCount: m?.documents?.length || 0,
    }))
  );

  const addPhase = () => {
    append({
      title: '',
      description: '',
      budget: 0,
      durationDays: 0,
      documents: [],
    });
  };

  const removePhase = (index: number) => {
    remove(index);
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

      <div className='space-y-6'>
        {(type === 'emergency' ? fields.slice(0, 1) : fields).map(
          (field, index) => (
            <Card key={field.id}>
              <CardHeader className='pb-2'>
                <div className='flex items-center justify-between'>
                  <CardTitle className='text-base'>
                    {type === 'emergency'
                      ? 'Thông tin chiến dịch khẩn cấp'
                      : `Giai đoạn ${index + 1}`}
                  </CardTitle>
                  {fields.length > 1 && type !== 'emergency' && (
                    <Button
                      type='button'
                      variant='ghost'
                      size='sm'
                      onClick={() => removePhase(index)}
                      className='h-8 w-8 p-0 text-muted-foreground hover:text-destructive'
                    >
                      <Trash2 className='h-4 w-4' />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className='space-y-6 pt-0'>
                <FormField
                  name={`milestones.${index}.title`}
                  control={form.control}
                  render={({ field, fieldState }) => {
                    // Log field state for debugging
                    if (fieldState.error) {
                      console.log(
                        `Milestone ${index + 1} title error:`,
                        fieldState.error.message
                      );
                    }

                    return (
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
                            onChange={e => {
                              console.log(
                                `Milestone ${index + 1} title changed:`,
                                e.target.value
                              );
                              field.onChange(e);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  name={`milestones.${index}.description`}
                  control={form.control}
                  render={({ field, fieldState }) => {
                    // Log field state for debugging
                    if (fieldState.error) {
                      console.log(
                        `Milestone ${index + 1} description error:`,
                        fieldState.error.message
                      );
                    }

                    return (
                      <FormItem>
                        <FormLabel>
                          {type === 'emergency'
                            ? 'Mô tả tình trạng khẩn cấp'
                            : 'Mô tả giai đoạn'}
                        </FormLabel>
                        <FormControl>
                          <RichTextEditor
                            content={field.value}
                            onChange={value => {
                              console.log(
                                `Milestone ${index + 1} description changed:`,
                                value
                              );
                              field.onChange(value);
                            }}
                            placeholder={
                              type === 'emergency'
                                ? 'Mô tả chi tiết tình trạng khẩn cấp và lý do cần hỗ trợ ngay...'
                                : 'Mô tả chi tiết công việc trong giai đoạn này...'
                            }
                            error={fieldState.error?.message}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  name={`milestones.${index}.documents`}
                  control={form.control}
                  render={({ field, fieldState }) => {
                    // Log field state for debugging
                    if (fieldState.error) {
                      console.log(
                        `Milestone ${index + 1} documents error:`,
                        fieldState.error.message
                      );
                    }

                    return (
                      <FormItem>
                        <FormLabel>
                          {type === 'emergency'
                            ? 'Tài liệu chứng minh khẩn cấp'
                            : 'Tài liệu giai đoạn'}
                        </FormLabel>
                        <FormControl>
                          <DocumentUpload
                            value={field.value || []}
                            onChange={value => {
                              console.log(
                                `Milestone ${index + 1} documents changed:`,
                                value
                              );
                              field.onChange(value);
                            }}
                            onClearError={() => {
                              console.log(
                                `Milestone ${index + 1} documents error cleared`
                              );
                              form.clearErrors(
                                `milestones.${index}.documents` as any
                              );
                            }}
                            error={fieldState.error?.message}
                            label={
                              type === 'emergency'
                                ? 'Tải lên giấy tờ chứng minh tình trạng khẩn cấp'
                                : 'Tải lên tài liệu kế hoạch, báo giá, giấy phép...'
                            }
                            description='PDF, Images, Word, Excel (tối đa 10MB mỗi file)'
                            accept='application/pdf,image/png,image/jpeg,image/jpg,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/plain'
                            multiple={true}
                          />
                        </FormControl>
                        {type === 'emergency' && (
                          <div className='text-xs text-orange-600 bg-orange-50 p-2 rounded mt-2'>
                            <strong>Lưu ý:</strong> Chiến dịch khẩn cấp cần cung
                            cấp tài liệu chứng minh tính khẩn cấp (báo cáo y tế,
                            giấy xác nhận thiên tai, v.v.)
                          </div>
                        )}
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                  <FormField
                    name={`milestones.${index}.budget`}
                    control={form.control}
                    render={({ field, fieldState }) => {
                      // Log field state for debugging
                      if (fieldState.error) {
                        console.log(
                          `Milestone ${index + 1} budget error:`,
                          fieldState.error.message
                        );
                      }

                      return (
                        <FormItem>
                          <FormLabel>Ngân sách (VNĐ)</FormLabel>
                          <FormControl>
                            <Input
                              type='number'
                              placeholder='Nhập số tiền...'
                              {...field}
                              onChange={e => {
                                const value = parseFloat(e.target.value) || 0;
                                console.log(
                                  `Milestone ${index + 1} budget changed:`,
                                  value
                                );
                                field.onChange(value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

                  <FormField
                    name={`milestones.${index}.durationDays`}
                    control={form.control}
                    render={({ field, fieldState }) => {
                      // Log field state for debugging
                      if (fieldState.error) {
                        console.log(
                          `Milestone ${index + 1} duration error:`,
                          fieldState.error.message
                        );
                      }

                      return (
                        <FormItem>
                          <FormLabel>
                            {type === 'emergency'
                              ? 'Thời gian cần hỗ trợ'
                              : 'Thời gian dự kiến'}
                          </FormLabel>
                          <FormControl>
                            <Input
                              type='number'
                              placeholder={
                                type === 'emergency' ? 'Ví dụ: 1' : 'Ví dụ: 30'
                              }
                              {...field}
                              onChange={e => {
                                const value = parseInt(e.target.value) || 0;
                                console.log(
                                  `Milestone ${index + 1} duration changed:`,
                                  value
                                );
                                field.onChange(value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          )
        )}
        {type !== 'emergency' && (
          <Button
            type='button'
            variant='outline'
            onClick={addPhase}
            className='w-full'
          >
            <Plus className='mr-2 h-4 w-4' />
            Thêm giai đoạn
          </Button>
        )}
      </div>
    </>
  );
};

export default MileStonesForm;

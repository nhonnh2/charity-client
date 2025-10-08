'use client';

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
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Form } from '@/components/ui/form';
import { ChevronRight } from 'lucide-react';
import { useForm, useWatch } from 'react-hook-form';
import InstructSide from './components/intruct-side';
import InfomationBasicForm from './components/infomation-basic-form';
import MileStonesForm from './components/milestones-form';
import VerifyForm from './components/verify-form';

export default function CreateCampaignPage() {
  const [activeStep, setActiveStep] = useState(1);
  const form = useForm<any>({
    // resolver: zodResolver(LoginBody),
    // defaultValues: { email: '', password: '' },
  });
  const reviewFee = useWatch({
    control: form.control,
    name: 'reviewFee',
  });

  const handleSubmitCampaign = (data: any) => {
    console.log('handleSubmit______', data);
  };

  console.log('re_render_form_create____');

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
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmitCampaign)}>
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
                      <InfomationBasicForm form={form} />
                    </TabsContent>

                    <TabsContent value='step-2' className='m-0 p-6 space-y-6'>
                      <MileStonesForm form={form} />
                    </TabsContent>

                    <TabsContent value='step-3' className='m-0 p-6 space-y-6'>
                      <VerifyForm form={form} />
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
                    <Button
                      className='bg-green-600 hover:bg-green-700'
                      type='submit'
                    >
                      Tạo chiến dịch & Đóng phí duyệt (
                      {new Intl.NumberFormat('vi-VN').format(reviewFee || 0)}{' '}
                      VNĐ)
                    </Button>
                  )}
                </CardFooter>
              </form>
            </Form>
          </Card>
        </div>

        {/* Sidebar - 1/3 width on desktop */}
        <InstructSide />
      </div>
    </div>
  );
}

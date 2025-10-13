'use client';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle2,
  FileCheck,
  HelpCircle,
  type LucideIcon,
  ShieldCheck,
  Wallet,
  ExternalLink,
  ArrowRight,
  Info,
} from 'lucide-react';
import Link from 'next/link';

interface StepProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconClassName?: string;
}

function Step({
  icon: Icon,
  title,
  description,
  iconClassName = 'text-primary',
}: StepProps) {
  return (
    <div className='flex gap-4'>
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 ${iconClassName}`}
      >
        <Icon className='h-6 w-6' />
      </div>
      <div className='space-y-1'>
        <h3 className='text-xl font-semibold'>{title}</h3>
        <p className='text-muted-foreground'>{description}</p>
      </div>
    </div>
  );
}

interface ProcessStepProps {
  step: number;
  title: string;
  description: string;
  isLeft?: boolean;
}

function ProcessStep({
  step,
  title,
  description,
  isLeft = true,
}: ProcessStepProps) {
  return (
    <div className='relative grid gap-4 md:grid-cols-5 md:gap-8 lg:gap-12'>
      {isLeft ? (
        <>
          <div className='flex md:justify-end md:col-span-2'>
            <Card className='w-full max-w-md'>
              <CardContent className='p-4'>
                <Badge
                  variant='outline'
                  className='bg-primary/10 text-primary border-primary/20 mb-2'
                >
                  Bước {step}
                </Badge>
                <h3 className='font-semibold'>{title}</h3>
                <p className='text-muted-foreground text-sm mt-1'>
                  {description}
                </p>
              </CardContent>
            </Card>
          </div>
          <div className='absolute left-1/2 -translate-x-1/2 md:static md:col-span-1 md:flex md:items-center md:justify-center'>
            <div className='flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md'>
              {step}
            </div>
          </div>
          <div className='md:col-span-2'>
            <div className='h-full'></div>
          </div>
        </>
      ) : (
        <>
          <div className='md:col-span-2'>
            <div className='h-full'></div>
          </div>
          <div className='absolute left-1/2 -translate-x-1/2 md:static md:col-span-1 md:flex md:items-center md:justify-center'>
            <div className='flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md'>
              {step}
            </div>
          </div>
          <div className='md:col-span-2'>
            <Card className='w-full max-w-md'>
              <CardContent className='p-4'>
                <Badge
                  variant='outline'
                  className='bg-primary/10 text-primary border-primary/20 mb-2'
                >
                  Bước {step}
                </Badge>
                <h3 className='font-semibold'>{title}</h3>
                <p className='text-muted-foreground text-sm mt-1'>
                  {description}
                </p>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}

export default function HowItWorksPage() {
  return (
    <div className='container max-w-7xl mx-auto px-4 py-8'>
      <div className='space-y-2 mb-8'>
        <h1 className='text-3xl font-bold tracking-tight sm:text-4xl'>
          Cách thức hoạt động
        </h1>
        <p className='text-xl text-muted-foreground'>
          TrustCharity sử dụng công nghệ blockchain để đảm bảo tính minh bạch và
          trách nhiệm trong mọi chiến dịch từ thiện.
        </p>
      </div>

      <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12'>
        <Card>
          <CardContent className='pt-6'>
            <Step
              icon={ShieldCheck}
              title='Xác minh danh tính'
              description='Mọi người tạo chiến dịch đều được xác minh danh tính để đảm bảo độ tin cậy và ngăn chặn lừa đảo.'
              iconClassName='text-blue-600'
            />
          </CardContent>
        </Card>
        <Card>
          <CardContent className='pt-6'>
            <Step
              icon={Wallet}
              title='Giải ngân theo giai đoạn'
              description='Tiền quyên góp được giải ngân theo từng giai đoạn của chiến dịch, đảm bảo sử dụng đúng mục đích.'
              iconClassName='text-green-600'
            />
          </CardContent>
        </Card>
        <Card>
          <CardContent className='pt-6'>
            <Step
              icon={FileCheck}
              title='Minh bạch với blockchain'
              description='Mọi giao dịch đều được ghi lại trên blockchain, không thể thay đổi và có thể kiểm tra bởi bất kỳ ai.'
              iconClassName='text-purple-600'
            />
          </CardContent>
        </Card>
        <Card>
          <CardContent className='pt-6'>
            <Step
              icon={CheckCircle2}
              title='Xác nhận cộng đồng'
              description='Cộng đồng người đóng góp bỏ phiếu xác nhận mỗi giai đoạn trước khi giải ngân tiếp.'
              iconClassName='text-amber-600'
            />
          </CardContent>
        </Card>
        <Card>
          <CardContent className='pt-6'>
            <Step
              icon={HelpCircle}
              title='Hệ thống đánh giá uy tín'
              description='Người tạo chiến dịch được đánh giá uy tín dựa trên lịch sử hoạt động và hoàn thành chiến dịch.'
              iconClassName='text-red-600'
            />
          </CardContent>
        </Card>
        <Card>
          <CardContent className='pt-6'>
            <Step
              icon={CheckCircle2}
              title='Cộng đồng tương tác'
              description='Nền tảng mạng xã hội cho phép chia sẻ tiến độ, cập nhật và tương tác với cộng đồng.'
              iconClassName='text-teal-600'
            />
          </CardContent>
        </Card>
      </div>

      <div className='mb-16'>
        <Card>
          <CardHeader>
            <CardTitle className='text-2xl'>Quy trình hoạt động</CardTitle>
            <CardDescription>
              Hiểu rõ quy trình từ khi tạo chiến dịch đến khi hoàn thành
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='relative'>
              <div className='absolute left-1/2 h-full w-0.5 -translate-x-1/2 bg-border hidden md:block'></div>
              <div className='space-y-12 relative'>
                <ProcessStep
                  step={1}
                  title='Tạo chiến dịch'
                  description='Người dùng tạo chiến dịch với thông tin chi tiết, mục tiêu, và chia thành các giai đoạn cụ thể.'
                />
                <ProcessStep
                  step={2}
                  title='Xác minh danh tính'
                  description='Hệ thống xác minh danh tính người tạo thông qua KYC (Know Your Customer) để đảm bảo độ tin cậy.'
                  isLeft={false}
                />
                <ProcessStep
                  step={3}
                  title='Quyên góp'
                  description='Cộng đồng đóng góp cho chiến dịch bằng tiền mặt hoặc tiền điện tử, được ghi lại trên blockchain.'
                />
                <ProcessStep
                  step={4}
                  title='Giải ngân giai đoạn 1'
                  description='Khi đạt đủ mục tiêu, hệ thống giải ngân cho giai đoạn đầu tiên của chiến dịch.'
                  isLeft={false}
                />
                <ProcessStep
                  step={5}
                  title='Cập nhật tiến độ'
                  description='Người tạo chiến dịch cập nhật tiến độ, đăng hình ảnh, video và bằng chứng chi tiêu.'
                />
                <ProcessStep
                  step={6}
                  title='Xác nhận cộng đồng'
                  description='Người đóng góp bỏ phiếu xác nhận giai đoạn đã hoàn thành dựa trên bằng chứng được cung cấp.'
                  isLeft={false}
                />
                <ProcessStep
                  step={7}
                  title='Giải ngân các giai đoạn tiếp theo'
                  description='Quá trình lặp lại cho các giai đoạn tiếp theo cho đến khi chiến dịch hoàn thành.'
                />
                <ProcessStep
                  step={8}
                  title='Hoàn thành chiến dịch'
                  description='Chiến dịch kết thúc, điểm uy tín của người tạo được cập nhật dựa trên kết quả.'
                  isLeft={false}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className='mb-16'>
        <Card>
          <CardHeader>
            <CardTitle className='text-2xl'>Công nghệ blockchain</CardTitle>
            <CardDescription>
              Hiểu cách chúng tôi sử dụng blockchain để đảm bảo tính minh bạch
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue='what' className='w-full'>
              <TabsList className='grid w-full grid-cols-3 mb-6'>
                <TabsTrigger value='what'>Blockchain là gì?</TabsTrigger>
                <TabsTrigger value='how'>Cách hoạt động</TabsTrigger>
                <TabsTrigger value='benefits'>Lợi ích</TabsTrigger>
              </TabsList>
              <TabsContent value='what'>
                <div className='grid md:grid-cols-2 gap-8'>
                  <div>
                    <h3 className='text-xl font-semibold mb-4'>
                      Blockchain là gì?
                    </h3>
                    <p className='text-muted-foreground mb-4'>
                      Blockchain là một công nghệ sổ cái phân tán, ghi lại các
                      giao dịch theo cách không thể thay đổi và minh bạch. Mỗi
                      "khối" chứa một số giao dịch, và một khi được thêm vào
                      "chuỗi", không thể chỉnh sửa hoặc xóa.
                    </p>
                    <p className='text-muted-foreground'>
                      Trong TrustCharity, chúng tôi sử dụng blockchain Polygon -
                      một giải pháp Layer 2 của Ethereum với phí giao dịch thấp
                      và tốc độ cao, phù hợp cho các ứng dụng từ thiện.
                    </p>
                  </div>
                  <div className='flex items-center justify-center'>
                    <div className='relative w-full h-64 bg-muted rounded-lg flex items-center justify-center'>
                      <Info className='h-8 w-8 text-muted-foreground/50' />
                      <span className='text-muted-foreground/70 absolute bottom-4 text-sm'>
                        Blockchain Diagram
                      </span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value='how'>
                <div className='grid md:grid-cols-2 gap-8'>
                  <div>
                    <h3 className='text-xl font-semibold mb-4'>
                      Cách hoạt động trong TrustCharity
                    </h3>
                    <ul className='space-y-3'>
                      <li className='flex items-start'>
                        <CheckCircle2 className='h-5 w-5 text-primary mr-2 mt-0.5 shrink-0' />
                        <span>
                          Mỗi chiến dịch được tạo như một smart contract trên
                          blockchain Polygon
                        </span>
                      </li>
                      <li className='flex items-start'>
                        <CheckCircle2 className='h-5 w-5 text-primary mr-2 mt-0.5 shrink-0' />
                        <span>
                          Mọi đóng góp được ghi lại như một giao dịch trên
                          blockchain
                        </span>
                      </li>
                      <li className='flex items-start'>
                        <CheckCircle2 className='h-5 w-5 text-primary mr-2 mt-0.5 shrink-0' />
                        <span>
                          Tiền được giữ trong smart contract và chỉ giải ngân
                          khi đạt đủ điều kiện
                        </span>
                      </li>
                      <li className='flex items-start'>
                        <CheckCircle2 className='h-5 w-5 text-primary mr-2 mt-0.5 shrink-0' />
                        <span>
                          Người đóng góp có thể bỏ phiếu xác nhận giai đoạn
                          thông qua smart contract
                        </span>
                      </li>
                      <li className='flex items-start'>
                        <CheckCircle2 className='h-5 w-5 text-primary mr-2 mt-0.5 shrink-0' />
                        <span>
                          Mọi giao dịch đều có thể kiểm tra trên Polygon
                          Explorer
                        </span>
                      </li>
                    </ul>
                    <div className='mt-6'>
                      <Button variant='outline' className='gap-2' asChild>
                        <Link href='/transactions'>
                          <ExternalLink className='h-4 w-4' />
                          Xem giao dịch onchain
                        </Link>
                      </Button>
                    </div>
                  </div>
                  <div className='flex items-center justify-center'>
                    <div className='relative w-full h-64 bg-muted rounded-lg flex items-center justify-center'>
                      <Info className='h-8 w-8 text-muted-foreground/50' />
                      <span className='text-muted-foreground/70 absolute bottom-4 text-sm'>
                        Smart Contract Flow
                      </span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value='benefits'>
                <div className='grid md:grid-cols-2 gap-8'>
                  <div>
                    <h3 className='text-xl font-semibold mb-4'>
                      Lợi ích của blockchain trong từ thiện
                    </h3>
                    <ul className='space-y-3'>
                      <li className='flex items-start'>
                        <CheckCircle2 className='h-5 w-5 text-primary mr-2 mt-0.5 shrink-0' />
                        <div>
                          <span className='font-medium'>Minh bạch:</span>
                          <span className='text-muted-foreground'>
                            {' '}
                            Mọi giao dịch đều có thể kiểm tra bởi bất kỳ ai
                          </span>
                        </div>
                      </li>
                      <li className='flex items-start'>
                        <CheckCircle2 className='h-5 w-5 text-primary mr-2 mt-0.5 shrink-0' />
                        <div>
                          <span className='font-medium'>
                            Không thể thay đổi:
                          </span>
                          <span className='text-muted-foreground'>
                            {' '}
                            Dữ liệu đã ghi không thể chỉnh sửa hoặc xóa
                          </span>
                        </div>
                      </li>
                      <li className='flex items-start'>
                        <CheckCircle2 className='h-5 w-5 text-primary mr-2 mt-0.5 shrink-0' />
                        <div>
                          <span className='font-medium'>
                            Giảm chi phí trung gian:
                          </span>
                          <span className='text-muted-foreground'>
                            {' '}
                            Loại bỏ các bên trung gian, giảm phí
                          </span>
                        </div>
                      </li>
                      <li className='flex items-start'>
                        <CheckCircle2 className='h-5 w-5 text-primary mr-2 mt-0.5 shrink-0' />
                        <div>
                          <span className='font-medium'>Tự động hóa:</span>
                          <span className='text-muted-foreground'>
                            {' '}
                            Smart contract tự động thực hiện các điều kiện đã
                            định
                          </span>
                        </div>
                      </li>
                      <li className='flex items-start'>
                        <CheckCircle2 className='h-5 w-5 text-primary mr-2 mt-0.5 shrink-0' />
                        <div>
                          <span className='font-medium'>Tăng niềm tin:</span>
                          <span className='text-muted-foreground'>
                            {' '}
                            Người đóng góp có thể theo dõi tiền của họ đi đâu
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className='flex items-center justify-center'>
                    <div className='relative w-full h-64 bg-muted rounded-lg flex items-center justify-center'>
                      <Info className='h-8 w-8 text-muted-foreground/50' />
                      <span className='text-muted-foreground/70 absolute bottom-4 text-sm'>
                        Blockchain Benefits
                      </span>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <div className='mb-16'>
        <Card className='overflow-hidden'>
          <CardHeader className='bg-primary/5'>
            <CardTitle className='text-2xl'>Minh bạch blockchain</CardTitle>
            <CardDescription>
              Xem tất cả giao dịch được ghi lại trên blockchain
            </CardDescription>
          </CardHeader>
          <CardContent className='p-6'>
            <div className='grid md:grid-cols-2 gap-8 items-center'>
              <div className='space-y-4'>
                <h3 className='text-xl font-semibold'>Giao dịch onchain</h3>
                <p className='text-muted-foreground'>
                  Tất cả giao dịch trên TrustCharity đều được ghi lại trên
                  blockchain Polygon, đảm bảo tính minh bạch và không thể chỉnh
                  sửa. Bạn có thể xem tất cả giao dịch công khai bất kỳ lúc nào.
                </p>
                <ul className='space-y-3'>
                  <li className='flex items-start'>
                    <CheckCircle2 className='h-5 w-5 text-primary mr-2 mt-0.5 shrink-0' />
                    <span>Xem tất cả giao dịch đóng góp và giải ngân</span>
                  </li>
                  <li className='flex items-start'>
                    <CheckCircle2 className='h-5 w-5 text-primary mr-2 mt-0.5 shrink-0' />
                    <span>
                      Kiểm tra chi tiết giao dịch trên Polygon Explorer
                    </span>
                  </li>
                  <li className='flex items-start'>
                    <CheckCircle2 className='h-5 w-5 text-primary mr-2 mt-0.5 shrink-0' />
                    <span>
                      Lọc giao dịch theo chiến dịch, loại, hoặc thời gian
                    </span>
                  </li>
                </ul>
                <div className='pt-2'>
                  <Button className='gap-2' asChild>
                    <Link href='/transactions'>
                      Xem giao dịch onchain
                      <ArrowRight className='h-4 w-4' />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className='flex items-center justify-center'>
                <div className='relative w-full h-64 bg-muted rounded-lg flex items-center justify-center'>
                  <Info className='h-8 w-8 text-muted-foreground/50' />
                  <span className='text-muted-foreground/70 absolute bottom-4 text-sm'>
                    Transactions Dashboard
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className='mb-8'>
        <Card>
          <CardHeader>
            <CardTitle className='text-2xl'>Bắt đầu ngay</CardTitle>
            <CardDescription>
              Tham gia cộng đồng TrustCharity và bắt đầu đóng góp hoặc tạo chiến
              dịch
            </CardDescription>
          </CardHeader>
          <CardContent className='flex flex-col sm:flex-row gap-4'>
            <Button size='lg' className='gap-2' asChild>
              <Link href='/campaigns'>
                Khám phá chiến dịch
                <ArrowRight className='h-4 w-4' />
              </Link>
            </Button>
            <Button size='lg' variant='outline' className='gap-2' asChild>
              <Link href='/campaigns/create'>
                Tạo chiến dịch mới
                <ArrowRight className='h-4 w-4' />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

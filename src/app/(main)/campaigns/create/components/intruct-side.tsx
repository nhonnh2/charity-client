'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info, HelpCircle } from 'lucide-react';

export default function InstructSide() {
  return (
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
              Chọn loại chiến dịch (thông thường/khẩn cấp), mục tiêu funding và
              thông tin chi tiết.
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
              Chia giai đoạn (thông thường) hoặc cung cấp thông tin khẩn cấp với
              tài liệu chứng minh.
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
              <strong>"Đang chờ duyệt"</strong>. Đội ngũ duyệt sẽ kiểm tra và
              phản hồi trong vòng 24-72 giờ.
            </AlertDescription>
          </Alert>

          <div className='space-y-2'>
            <h3 className='text-sm font-medium flex items-center'>
              <HelpCircle className='h-4 w-4 mr-2 text-muted-foreground' />
              Chiến dịch khẩn cấp vs Thông thường?
            </h3>
            <p className='text-xs text-muted-foreground pl-6'>
              Khẩn cấp: 1 giai đoạn, cần uy tín ≥60, giới hạn tiền theo uy tín.
              Thông thường: Nhiều giai đoạn, không giới hạn uy tín.
            </p>
          </div>

          <div className='space-y-2'>
            <h3 className='text-sm font-medium flex items-center'>
              <HelpCircle className='h-4 w-4 mr-2 text-muted-foreground' />
              Fixed vs Flexible Funding?
            </h3>
            <p className='text-xs text-muted-foreground pl-6'>
              Fixed: Phải đạt 100% mục tiêu mới giải ngân. Flexible: Có thể dùng
              tiền dù chưa đạt mục tiêu.
            </p>
          </div>

          <div className='space-y-2'>
            <h3 className='text-sm font-medium flex items-center'>
              <HelpCircle className='h-4 w-4 mr-2 text-muted-foreground' />
              Tại sao cần phí duyệt?
            </h3>
            <p className='text-xs text-muted-foreground pl-6'>
              Phí duyệt đảm bảo chất lượng kiểm duyệt và khuyến khích người
              duyệt làm việc tận tình. Phí sẽ được hoàn lại nếu chiến dịch bị từ
              chối không hợp lý.
            </p>
          </div>

          <div className='space-y-2'>
            <h3 className='text-sm font-medium flex items-center'>
              <HelpCircle className='h-4 w-4 mr-2 text-muted-foreground' />
              Làm sao để tăng độ uy tín?
            </h3>
            <p className='text-xs text-muted-foreground pl-6'>
              Hoàn thành các chiến dịch đúng tiến độ, cập nhật thường xuyên và
              minh bạch trong chi tiêu.
            </p>
          </div>
          <div className='space-y-2'>
            <h3 className='text-sm font-medium flex items-center'>
              <HelpCircle className='h-4 w-4 mr-2 text-muted-foreground' />
              Quy trình giải ngân như thế nào?
            </h3>
            <p className='text-xs text-muted-foreground pl-6'>
              Mỗi giai đoạn sẽ được giải ngân sau khi bạn cập nhật tiến độ và
              được 51% người đóng góp xác nhận.
            </p>
          </div>
          <div className='space-y-2'>
            <h3 className='text-sm font-medium flex items-center'>
              <HelpCircle className='h-4 w-4 mr-2 text-muted-foreground' />
              Phí giao dịch là bao nhiêu?
            </h3>
            <p className='text-xs text-muted-foreground pl-6'>
              Nền tảng thu 2.5% phí trên mỗi giao dịch thành công để duy trì hệ
              thống.
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
  );
}

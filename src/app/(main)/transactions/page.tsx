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
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
  ArrowDownLeft,
  ArrowUpRight,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  ExternalLink,
  Filter,
  Info,
  Search,
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('all');

  // Mẫu dữ liệu giao dịch
  const transactions = [
    {
      id: 1,
      type: 'donation',
      amount: 2000000,
      token: 'USDT',
      from: '0x1a2b3c4d5e6f7g8h9i0j...',
      fromName: 'Nguyễn Văn A',
      to: '0xabcdef1234567890abcd...',
      toName: 'Quỹ chiến dịch',
      campaign: 'Xây trường học cho trẻ em vùng cao',
      timestamp: new Date(2023, 5, 15, 10, 30),
      hash: '0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t...',
      status: 'confirmed',
      network: 'Polygon',
    },
    {
      id: 2,
      type: 'disbursement',
      amount: 30000000,
      token: 'USDT',
      from: '0xabcdef1234567890abcd...',
      fromName: 'Quỹ chiến dịch',
      to: '0x9876543210fedcba9876...',
      toName: 'Trần Hùng (Người tạo chiến dịch)',
      campaign: 'Xây trường học cho trẻ em vùng cao',
      timestamp: new Date(2023, 5, 14, 14, 45),
      hash: '0x9s8r7q6p5o4n3m2l1k0j9i8h7g6f5e4d3c2b1a...',
      status: 'confirmed',
      network: 'Polygon',
    },
    {
      id: 3,
      type: 'donation',
      amount: 5000000,
      token: 'MATIC',
      from: '0x5f4e3d2c1b0a9z8y7x...',
      fromName: 'Lê Thị B',
      to: '0xabcdef1234567890abcd...',
      toName: 'Quỹ chiến dịch',
      campaign: 'Hỗ trợ y tế vùng cao',
      timestamp: new Date(2023, 5, 13, 9, 15),
      hash: '0x2a3b4c5d6e7f8g9h0i1j2k3l4m5n6o7p8q9r0s...',
      status: 'confirmed',
      network: 'Polygon',
    },
    {
      id: 4,
      type: 'donation',
      amount: 1000000,
      token: 'USDT',
      from: '0x2b3c4d5e6f7g8h9i0j...',
      fromName: 'Phạm Văn C',
      to: '0xabcdef1234567890abcd...',
      toName: 'Quỹ chiến dịch',
      campaign: 'Trồng rừng phủ xanh đồi trọc',
      timestamp: new Date(2023, 5, 12, 16, 20),
      hash: '0x3b4c5d6e7f8g9h0i1j2k3l4m5n6o7p8q9r0s1t...',
      status: 'confirmed',
      network: 'Polygon',
    },
    {
      id: 5,
      type: 'disbursement',
      amount: 15000000,
      token: 'USDT',
      from: '0xabcdef1234567890abcd...',
      fromName: 'Quỹ chiến dịch',
      to: '0x1z2y3x4w5v6u7t8s9r...',
      toName: 'Hoàng Thị D (Người tạo chiến dịch)',
      campaign: 'Hỗ trợ y tế vùng cao',
      timestamp: new Date(2023, 5, 11, 11, 10),
      hash: '0x4c5d6e7f8g9h0i1j2k3l4m5n6o7p8q9r0s1t2u...',
      status: 'confirmed',
      network: 'Polygon',
    },
    {
      id: 6,
      type: 'donation',
      amount: 3000000,
      token: 'MATIC',
      from: '0x3c4d5e6f7g8h9i0j1k...',
      fromName: 'Trần Văn E',
      to: '0xabcdef1234567890abcd...',
      toName: 'Quỹ chiến dịch',
      campaign: 'Xây trường học cho trẻ em vùng cao',
      timestamp: new Date(2023, 5, 10, 13, 25),
      hash: '0x5d6e7f8g9h0i1j2k3l4m5n6o7p8q9r0s1t2u3v...',
      status: 'confirmed',
      network: 'Polygon',
    },
    {
      id: 7,
      type: 'phase_confirmation',
      amount: 0,
      token: '',
      from: '0x4d5e6f7g8h9i0j1k2l...',
      fromName: 'Trần Hùng (Người tạo chiến dịch)',
      to: '',
      toName: '',
      campaign: 'Xây trường học cho trẻ em vùng cao',
      timestamp: new Date(2023, 5, 9, 15, 40),
      hash: '0x6e7f8g9h0i1j2k3l4m5n6o7p8q9r0s1t2u3v4w...',
      status: 'confirmed',
      network: 'Polygon',
    },
    {
      id: 8,
      type: 'donation',
      amount: 10000000,
      token: 'USDT',
      from: '0x5e6f7g8h9i0j1k2l3m...',
      fromName: 'Nguyễn Thị F',
      to: '0xabcdef1234567890abcd...',
      toName: 'Quỹ chiến dịch',
      campaign: 'Trồng rừng phủ xanh đồi trọc',
      timestamp: new Date(2023, 5, 8, 9, 5),
      hash: '0x7f8g9h0i1j2k3l4m5n6o7p8q9r0s1t2u3v4w5x...',
      status: 'confirmed',
      network: 'Polygon',
    },
    {
      id: 9,
      type: 'disbursement',
      amount: 20000000,
      token: 'USDT',
      from: '0xabcdef1234567890abcd...',
      fromName: 'Quỹ chiến dịch',
      to: '0x2a3b4c5d6e7f8g9h0i...',
      toName: 'Lý Văn G (Người tạo chiến dịch)',
      campaign: 'Trồng rừng phủ xanh đồi trọc',
      timestamp: new Date(2023, 5, 7, 14, 15),
      hash: '0x8g9h0i1j2k3l4m5n6o7p8q9r0s1t2u3v4w5x6y...',
      status: 'confirmed',
      network: 'Polygon',
    },
    {
      id: 10,
      type: 'donation',
      amount: 500000,
      token: 'MATIC',
      from: '0x6f7g8h9i0j1k2l3m4n...',
      fromName: 'Vũ Thị H',
      to: '0xabcdef1234567890abcd...',
      toName: 'Quỹ chiến dịch',
      campaign: 'Hỗ trợ y tế vùng cao',
      timestamp: new Date(2023, 5, 6, 10, 50),
      hash: '0x9h0i1j2k3l4m5n6o7p8q9r0s1t2u3v4w5x6y7z...',
      status: 'confirmed',
      network: 'Polygon',
    },
  ];

  // Tính tổng số tiền quyên góp và giải ngân
  const totalDonations = transactions
    .filter(tx => tx.type === 'donation')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalDisbursements = transactions
    .filter(tx => tx.type === 'disbursement')
    .reduce((sum, tx) => sum + tx.amount, 0);

  // Lọc giao dịch theo tab và tìm kiếm
  const filteredTransactions = transactions.filter(
    tx =>
      (activeTab === 'all' ||
        (activeTab === 'donations' && tx.type === 'donation') ||
        (activeTab === 'disbursements' && tx.type === 'disbursement') ||
        (activeTab === 'confirmations' && tx.type === 'phase_confirmation')) &&
      (tx.hash.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.campaign.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.to.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.fromName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (tx.toName &&
          tx.toName.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  // Phân trang
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const currentTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className='container mx-auto px-4 py-6 max-w-8xl'>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold tracking-tight'>
          Giao dịch Blockchain
        </h1>
        <p className='text-muted-foreground'>
          Xem tất cả giao dịch blockchain công khai trên nền tảng TrustCharity
        </p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
        {/* Cột chính - 3/4 width on desktop */}
        <div className='lg:col-span-3 space-y-6'>
          {/* Thống kê tổng quan */}
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
            <Card>
              <CardContent className='p-4'>
                <div className='flex flex-col items-center text-center py-2'>
                  <h4 className='text-sm font-medium text-muted-foreground'>
                    Tổng giao dịch
                  </h4>
                  <p className='text-2xl font-bold'>{transactions.length}</p>
                  <p className='text-sm text-muted-foreground'>
                    Giao dịch đã xác nhận
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className='p-4'>
                <div className='flex flex-col items-center text-center py-2'>
                  <h4 className='text-sm font-medium text-muted-foreground'>
                    Tổng quyên góp
                  </h4>
                  <p className='text-2xl font-bold'>
                    {(totalDonations / 1000000).toFixed(1)} triệu
                  </p>
                  <p className='text-sm text-muted-foreground'>VNĐ</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className='p-4'>
                <div className='flex flex-col items-center text-center py-2'>
                  <h4 className='text-sm font-medium text-muted-foreground'>
                    Tổng giải ngân
                  </h4>
                  <p className='text-2xl font-bold'>
                    {(totalDisbursements / 1000000).toFixed(1)} triệu
                  </p>
                  <p className='text-sm text-muted-foreground'>VNĐ</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tìm kiếm và lọc */}
          <Card>
            <CardContent className='p-4'>
              <div className='flex flex-col md:flex-row gap-4'>
                <div className='relative flex-1'>
                  <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
                  <Input
                    placeholder='Tìm kiếm theo hash, chiến dịch, địa chỉ ví hoặc tên người dùng...'
                    className='pl-8'
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className='flex gap-2'>
                  <Select defaultValue='7days'>
                    <SelectTrigger className='w-[180px]'>
                      <SelectValue placeholder='Thời gian' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='7days'>7 ngày qua</SelectItem>
                      <SelectItem value='30days'>30 ngày qua</SelectItem>
                      <SelectItem value='all'>Tất cả</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant='outline' size='icon'>
                    <Filter className='h-4 w-4' />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs và Danh sách giao dịch */}
          <Card>
            <CardHeader className='pb-0'>
              <CardTitle>Danh sách giao dịch</CardTitle>
              <CardDescription>
                Tất cả giao dịch được ghi lại trên blockchain Polygon và có thể
                kiểm tra
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs
                defaultValue='all'
                className='mt-4'
                onValueChange={setActiveTab}
              >
                <TabsList className='w-full'>
                  <TabsTrigger value='all' className='flex-1'>
                    Tất cả ({transactions.length})
                  </TabsTrigger>
                  <TabsTrigger value='donations' className='flex-1'>
                    Đóng góp (
                    {transactions.filter(tx => tx.type === 'donation').length})
                  </TabsTrigger>
                  <TabsTrigger value='disbursements' className='flex-1'>
                    Giải ngân (
                    {
                      transactions.filter(tx => tx.type === 'disbursement')
                        .length
                    }
                    )
                  </TabsTrigger>
                  <TabsTrigger value='confirmations' className='flex-1'>
                    Xác nhận (
                    {
                      transactions.filter(
                        tx => tx.type === 'phase_confirmation'
                      ).length
                    }
                    )
                  </TabsTrigger>
                </TabsList>

                <div className='mt-4'>
                  <div className='overflow-x-auto'>
                    <table className='w-full'>
                      <thead>
                        <tr className='border-b'>
                          <th className='px-4 py-3 text-left text-sm font-medium text-muted-foreground'>
                            Loại
                          </th>
                          <th className='px-4 py-3 text-left text-sm font-medium text-muted-foreground'>
                            Từ / Đến
                          </th>
                          <th className='px-4 py-3 text-left text-sm font-medium text-muted-foreground'>
                            Số tiền
                          </th>
                          <th className='px-4 py-3 text-left text-sm font-medium text-muted-foreground'>
                            Thời gian
                          </th>
                          <th className='px-4 py-3 text-left text-sm font-medium text-muted-foreground'>
                            Chiến dịch
                          </th>
                          <th className='px-4 py-3 text-left text-sm font-medium text-muted-foreground'>
                            Mạng
                          </th>
                          <th className='px-4 py-3 text-left text-sm font-medium text-muted-foreground'>
                            Hành động
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentTransactions.map(tx => (
                          <tr
                            key={tx.id}
                            className='border-b hover:bg-muted/50 transition-colors'
                          >
                            <td className='px-4 py-3'>
                              <div className='flex items-center gap-2'>
                                <div
                                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                                    tx.type === 'donation'
                                      ? 'bg-green-100 text-green-600'
                                      : tx.type === 'disbursement'
                                        ? 'bg-blue-100 text-blue-600'
                                        : 'bg-purple-100 text-purple-600'
                                  }`}
                                >
                                  {tx.type === 'donation' ? (
                                    <ArrowUpRight className='h-4 w-4' />
                                  ) : tx.type === 'disbursement' ? (
                                    <ArrowDownLeft className='h-4 w-4' />
                                  ) : (
                                    <Check className='h-4 w-4' />
                                  )}
                                </div>
                                <span className='text-sm font-medium'>
                                  {tx.type === 'donation'
                                    ? 'Đóng góp'
                                    : tx.type === 'disbursement'
                                      ? 'Giải ngân'
                                      : 'Xác nhận giai đoạn'}
                                </span>
                              </div>
                            </td>
                            <td className='px-4 py-3'>
                              <div className='space-y-1'>
                                <div className='flex items-center gap-1'>
                                  <span className='text-xs font-medium'>
                                    Từ:
                                  </span>
                                  <span className='text-xs'>{tx.fromName}</span>
                                </div>
                                <div className='flex items-center gap-1'>
                                  <span className='text-xs text-muted-foreground'>
                                    {tx.from}
                                  </span>
                                  <Button
                                    variant='ghost'
                                    size='icon'
                                    className='h-4 w-4 p-0'
                                  >
                                    <Copy className='h-3 w-3' />
                                  </Button>
                                </div>
                                {tx.toName && (
                                  <>
                                    <div className='flex items-center gap-1'>
                                      <span className='text-xs font-medium'>
                                        Đến:
                                      </span>
                                      <span className='text-xs'>
                                        {tx.toName}
                                      </span>
                                    </div>
                                    <div className='flex items-center gap-1'>
                                      <span className='text-xs text-muted-foreground'>
                                        {tx.to}
                                      </span>
                                      <Button
                                        variant='ghost'
                                        size='icon'
                                        className='h-4 w-4 p-0'
                                      >
                                        <Copy className='h-3 w-3' />
                                      </Button>
                                    </div>
                                  </>
                                )}
                              </div>
                            </td>
                            <td className='px-4 py-3'>
                              {tx.amount > 0 ? (
                                <div className='text-sm'>
                                  <span className='font-medium'>
                                    {tx.amount.toLocaleString()} VNĐ
                                  </span>
                                  <span className='text-xs text-muted-foreground block'>
                                    {tx.token &&
                                      `(${tx.amount / 25000} ${tx.token})`}
                                  </span>
                                </div>
                              ) : (
                                <span className='text-sm text-muted-foreground'>
                                  -
                                </span>
                              )}
                            </td>
                            <td className='px-4 py-3'>
                              <div className='flex items-center gap-1'>
                                <Calendar className='h-3 w-3 text-muted-foreground' />
                                <span className='text-sm'>
                                  {tx.timestamp.toLocaleString()}
                                </span>
                              </div>
                            </td>
                            <td className='px-4 py-3'>
                              <span className='text-sm font-medium text-blue-600 hover:underline'>
                                <Link href={`/campaigns/1`}>{tx.campaign}</Link>
                              </span>
                            </td>
                            <td className='px-4 py-3'>
                              <Badge
                                variant='outline'
                                className='bg-purple-50 text-purple-700'
                              >
                                {tx.network}
                              </Badge>
                            </td>
                            <td className='px-4 py-3'>
                              <div className='flex items-center gap-2'>
                                <Button
                                  variant='outline'
                                  size='sm'
                                  className='h-8'
                                  asChild
                                >
                                  <Link
                                    href={`https://polygonscan.com/tx/${tx.hash}`}
                                    target='_blank'
                                  >
                                    <ExternalLink className='h-3 w-3 mr-1' />
                                    Xem onchain
                                  </Link>
                                </Button>
                                <Button
                                  variant='ghost'
                                  size='icon'
                                  className='h-8 w-8'
                                >
                                  <Copy className='h-4 w-4' />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Phân trang */}
                  {totalPages > 1 && (
                    <div className='flex items-center justify-between px-4 py-4 border-t mt-4'>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() =>
                          setCurrentPage(prev => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className='h-4 w-4 mr-1' />
                        Trang trước
                      </Button>
                      <div className='text-sm text-muted-foreground'>
                        Trang {currentPage} / {totalPages}
                      </div>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() =>
                          setCurrentPage(prev => Math.min(prev + 1, totalPages))
                        }
                        disabled={currentPage === totalPages}
                      >
                        Trang sau
                        <ChevronRight className='h-4 w-4 ml-1' />
                      </Button>
                    </div>
                  )}
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Cột phụ - 1/4 width on desktop */}
        <div className='space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle>Thông tin giao dịch</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <h4 className='font-medium'>Cách đọc giao dịch blockchain</h4>
                <p className='text-sm text-muted-foreground'>
                  Mỗi giao dịch có một hash duy nhất và được xác nhận bởi mạng
                  Polygon. Bạn có thể kiểm tra chi tiết giao dịch trên Polygon
                  Explorer.
                </p>
              </div>
              <div className='space-y-2'>
                <h4 className='font-medium'>Các loại giao dịch</h4>
                <ul className='text-sm text-muted-foreground space-y-1'>
                  <li className='flex items-center gap-2'>
                    <div className='flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-600'>
                      <ArrowUpRight className='h-3 w-3' />
                    </div>
                    <span>Đóng góp: Người dùng đóng góp cho chiến dịch</span>
                  </li>
                  <li className='flex items-center gap-2'>
                    <div className='flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-600'>
                      <ArrowDownLeft className='h-3 w-3' />
                    </div>
                    <span>
                      Giải ngân: Quỹ được giải ngân cho người tạo chiến dịch
                    </span>
                  </li>
                  <li className='flex items-center gap-2'>
                    <div className='flex h-5 w-5 items-center justify-center rounded-full bg-purple-100 text-purple-600'>
                      <Check className='h-3 w-3' />
                    </div>
                    <span>
                      Xác nhận giai đoạn: Giai đoạn chiến dịch được xác nhận
                    </span>
                  </li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant='outline' className='w-full' asChild>
                <Link href='https://polygonscan.com/' target='_blank'>
                  <ExternalLink className='mr-2 h-4 w-4' />
                  Mở Polygon Explorer
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Alert className='bg-blue-50 border-blue-200'>
            <Info className='h-4 w-4 text-blue-600' />
            <AlertTitle className='text-blue-800'>
              Minh bạch blockchain
            </AlertTitle>
            <AlertDescription className='text-blue-700'>
              Tất cả giao dịch trên TrustCharity đều được ghi lại trên
              blockchain Polygon, đảm bảo tính minh bạch và không thể chỉnh sửa.
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>Thống kê</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <span className='text-sm'>Tổng số chiến dịch</span>
                  <span className='font-medium'>15</span>
                </div>
                <Separator />
                <div className='flex items-center justify-between'>
                  <span className='text-sm'>Chiến dịch đã hoàn thành</span>
                  <span className='font-medium'>8</span>
                </div>
                <Separator />
                <div className='flex items-center justify-between'>
                  <span className='text-sm'>Chiến dịch đang diễn ra</span>
                  <span className='font-medium'>7</span>
                </div>
                <Separator />
                <div className='flex items-center justify-between'>
                  <span className='text-sm'>Tổng người đóng góp</span>
                  <span className='font-medium'>256</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

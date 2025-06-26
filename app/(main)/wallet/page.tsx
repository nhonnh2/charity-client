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
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Copy,
  ExternalLink,
  Info,
  Wallet,
  Plus,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Calendar,
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';

export default function WalletPage() {
  const [isWalletConnected, setIsWalletConnected] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [currentPage, setCurrentPage] = useState(1);

  // Mẫu dữ liệu ví
  const walletData = {
    address: '0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t',
    network: 'Polygon',
    balances: [
      { token: 'MATIC', amount: 10.5, value: 1050000 },
      { token: 'USDT', amount: 50.0, value: 1250000 },
    ],
    totalValue: 2300000,
  };

  // Mẫu dữ liệu giao dịch cá nhân
  const transactions = [
    {
      id: 1,
      type: 'donation',
      amount: 2000000,
      token: 'USDT',
      tokenAmount: 80,
      to: 'Xây trường học cho trẻ em vùng cao',
      timestamp: new Date(2023, 5, 15, 10, 30),
      hash: '0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t...',
      status: 'confirmed',
      network: 'Polygon',
    },
    {
      id: 2,
      type: 'received',
      amount: 5000000,
      token: 'USDT',
      tokenAmount: 200,
      from: 'Giải ngân chiến dịch Hỗ trợ y tế vùng cao',
      timestamp: new Date(2023, 5, 14, 14, 45),
      hash: '0x9s8r7q6p5o4n3m2l1k0j9i8h7g6f5e4d3c2b1a...',
      status: 'confirmed',
      network: 'Polygon',
    },
    {
      id: 3,
      type: 'donation',
      amount: 500000,
      token: 'MATIC',
      tokenAmount: 5,
      to: 'Trồng rừng phủ xanh đồi trọc',
      timestamp: new Date(2023, 5, 13, 9, 15),
      hash: '0x2a3b4c5d6e7f8g9h0i1j2k3l4m5n6o7p8q9r0s...',
      status: 'confirmed',
      network: 'Polygon',
    },
    {
      id: 4,
      type: 'received',
      amount: 3000000,
      token: 'USDT',
      tokenAmount: 120,
      from: 'Giải ngân chiến dịch Xây trường học cho trẻ em vùng cao',
      timestamp: new Date(2023, 5, 12, 16, 20),
      hash: '0x3b4c5d6e7f8g9h0i1j2k3l4m5n6o7p8q9r0s1t...',
      status: 'confirmed',
      network: 'Polygon',
    },
    {
      id: 5,
      type: 'donation',
      amount: 1000000,
      token: 'MATIC',
      tokenAmount: 10,
      to: 'Hỗ trợ y tế vùng cao',
      timestamp: new Date(2023, 5, 11, 11, 10),
      hash: '0x4c5d6e7f8g9h0i1j2k3l4m5n6o7p8q9r0s1t2u...',
      status: 'confirmed',
      network: 'Polygon',
    },
    {
      id: 6,
      type: 'received',
      amount: 2500000,
      token: 'USDT',
      tokenAmount: 100,
      from: 'Giải ngân chiến dịch Trồng rừng phủ xanh đồi trọc',
      timestamp: new Date(2023, 5, 10, 13, 25),
      hash: '0x5d6e7f8g9h0i1j2k3l4m5n6o7p8q9r0s1t2u3v...',
      status: 'confirmed',
      network: 'Polygon',
    },
  ];

  // Lọc giao dịch theo tab
  const filteredTransactions = transactions.filter(
    (tx) =>
      activeTab === 'overview' ||
      (activeTab === 'donations' && tx.type === 'donation') ||
      (activeTab === 'received' && tx.type === 'received')
  );

  // Phân trang
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const currentTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Danh sách mạng lưới blockchain hỗ trợ
  const supportedNetworks = [
    { id: 'polygon', name: 'Polygon', icon: '💜', status: 'connected' },
    { id: 'ethereum', name: 'Ethereum', icon: '💎', status: 'available' },
    {
      id: 'binance',
      name: 'Binance Smart Chain',
      icon: '🟡',
      status: 'available',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-6 max-w-8xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Ví Điện Tử</h1>
        <p className="text-muted-foreground">
          Quản lý ví blockchain và xem thông tin giao dịch cá nhân
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Cột chính - 3/4 width on desktop */}
        <div className="lg:col-span-3 space-y-6">
          {/* Thông tin ví */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Ví của bạn</CardTitle>
                  <CardDescription>
                    Quản lý ví và kết nối với các mạng lưới blockchain
                  </CardDescription>
                </div>
                {isWalletConnected ? (
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                    Đã kết nối
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="bg-gray-100 text-gray-700 hover:bg-gray-100"
                  >
                    Chưa kết nối
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {isWalletConnected ? (
                <>
                  <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        <Wallet className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">MetaMask</h3>
                          <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">
                            Polygon
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-sm text-muted-foreground">
                            {walletData.address.substring(0, 8)}...
                            {walletData.address.substring(
                              walletData.address.length - 8
                            )}
                          </p>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        <RefreshCw className="h-4 w-4" />
                        <span>Làm mới</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsWalletConnected(false)}
                      >
                        Ngắt kết nối
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {walletData.balances.map((balance, index) => (
                      <Card key={index} className="bg-muted/50">
                        <CardContent className="p-4">
                          <div className="flex flex-col items-center text-center py-2">
                            <h4 className="text-sm font-medium text-muted-foreground">
                              {balance.token}
                            </h4>
                            <p className="text-2xl font-bold">
                              {balance.amount}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              ≈ {balance.value.toLocaleString()} VNĐ
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    <Card className="bg-muted/50">
                      <CardContent className="p-4">
                        <div className="flex flex-col items-center text-center py-2">
                          <h4 className="text-sm font-medium text-muted-foreground">
                            Tổng (VNĐ)
                          </h4>
                          <p className="text-2xl font-bold">
                            {walletData.totalValue.toLocaleString()}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Tất cả token
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 space-y-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <Wallet className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-medium">Kết nối ví của bạn</h3>
                  <p className="text-center text-muted-foreground max-w-md">
                    Kết nối ví blockchain để đóng góp cho các chiến dịch và theo
                    dõi giao dịch của bạn trên nền tảng TrustCharity.
                  </p>
                  <Button
                    className="mt-2 bg-primary hover:bg-primary/90"
                    onClick={() => setIsWalletConnected(true)}
                  >
                    Kết nối ví
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tabs và Lịch sử giao dịch */}
          {isWalletConnected && (
            <Card>
              <CardHeader className="pb-0">
                <CardTitle>Lịch sử giao dịch</CardTitle>
                <CardDescription>
                  Các giao dịch blockchain của bạn trên nền tảng TrustCharity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs
                  defaultValue="overview"
                  className="mt-4"
                  onValueChange={setActiveTab}
                >
                  <TabsList className="w-full">
                    <TabsTrigger value="overview" className="flex-1">
                      Tất cả ({transactions.length})
                    </TabsTrigger>
                    <TabsTrigger value="donations" className="flex-1">
                      Đóng góp (
                      {
                        transactions.filter((tx) => tx.type === 'donation')
                          .length
                      }
                      )
                    </TabsTrigger>
                    <TabsTrigger value="received" className="flex-1">
                      Nhận quỹ (
                      {
                        transactions.filter((tx) => tx.type === 'received')
                          .length
                      }
                      )
                    </TabsTrigger>
                  </TabsList>

                  <div className="mt-4 space-y-4">
                    {currentTransactions.map((tx) => (
                      <div
                        key={tx.id}
                        className="flex items-center justify-between py-3 border-b"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full ${tx.type === 'donation'
                                ? 'bg-red-100 text-red-600'
                                : 'bg-green-100 text-green-600'
                              }`}
                          >
                            {tx.type === 'donation' ? (
                              <ArrowUpRight className="h-5 w-5" />
                            ) : (
                              <ArrowDownLeft className="h-5 w-5" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium">
                              {tx.type === 'donation'
                                ? 'Đóng góp cho chiến dịch'
                                : 'Nhận quỹ từ chiến dịch'}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {tx.type === 'donation' ? tx.to : tx.from}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">
                                  {tx.timestamp.toLocaleDateString()}{' '}
                                  {tx.timestamp.toLocaleTimeString()}
                                </span>
                              </div>
                              <Badge
                                variant="outline"
                                className="text-xs bg-purple-50 text-purple-700"
                              >
                                {tx.network}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div
                            className={`font-medium ${tx.type === 'donation'
                                ? 'text-red-600'
                                : 'text-green-600'
                              }`}
                          >
                            {tx.type === 'donation' ? '-' : '+'}
                            {tx.amount.toLocaleString()} VNĐ
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {tx.tokenAmount} {tx.token}
                          </div>
                          <Button
                            variant="link"
                            size="sm"
                            className="h-auto p-0"
                            asChild
                          >
                            <Link
                              href={`https://polygonscan.com/tx/${tx.hash}`}
                              target="_blank"
                            >
                              <ExternalLink className="mr-1 h-3 w-3" />
                              <span className="text-xs">Xem trên Polygon</span>
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}

                    {/* Phân trang */}
                    {totalPages > 1 && (
                      <div className="flex items-center justify-between pt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                          }
                          disabled={currentPage === 1}
                        >
                          <ChevronLeft className="h-4 w-4 mr-1" />
                          Trang trước
                        </Button>
                        <div className="text-sm text-muted-foreground">
                          Trang {currentPage} / {totalPages}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setCurrentPage((prev) =>
                              Math.min(prev + 1, totalPages)
                            )
                          }
                          disabled={currentPage === totalPages}
                        >
                          Trang sau
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    )}
                  </div>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Cột phụ - 1/4 width on desktop */}
        <div className="space-y-6">
          {/* Mạng lưới blockchain */}
          <Card>
            <CardHeader>
              <CardTitle>Mạng lưới blockchain</CardTitle>
              <CardDescription>
                Kết nối với các mạng lưới blockchain khác nhau
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {supportedNetworks.map((network) => (
                <div
                  key={network.id}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                      <span className="text-lg">{network.icon}</span>
                    </div>
                    <div>
                      <p className="font-medium">{network.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {network.status === 'connected'
                          ? 'Đã kết nối'
                          : 'Khả dụng'}
                      </p>
                    </div>
                  </div>
                  {network.status === 'connected' ? (
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                      Đã kết nối
                    </Badge>
                  ) : (
                    <Button variant="outline" size="sm">
                      Kết nối
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="outline" className="w-full mt-2">
                <Plus className="h-4 w-4 mr-2" />
                Thêm mạng lưới khác
              </Button>
            </CardContent>
          </Card>

          {/* Gửi token */}
          <Card>
            <CardHeader>
              <CardTitle>Gửi token</CardTitle>
              <CardDescription>Gửi token đến địa chỉ ví khác</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Địa chỉ người nhận
                </label>
                <Input placeholder="0x..." />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Token</label>
                <Select defaultValue="usdt">
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn token" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="matic">MATIC</SelectItem>
                    <SelectItem value="usdt">USDT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Số lượng</label>
                <Input type="number" placeholder="0.0" />
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90">
                Gửi token
              </Button>
            </CardContent>
          </Card>

          {/* Hướng dẫn */}
          <Alert className="bg-blue-50 border-blue-200">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertTitle className="text-blue-800">Lưu ý bảo mật</AlertTitle>
            <AlertDescription className="text-blue-700">
              Không bao giờ chia sẻ private key của bạn. TrustCharity không lưu
              trữ private key và không thể khôi phục ví của bạn nếu bạn mất
              quyền truy cập.
            </AlertDescription>
          </Alert>

          {/* Hướng dẫn sử dụng */}
          <Card>
            <CardHeader>
              <CardTitle>Hướng dẫn sử dụng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Làm sao để kết nối MetaMask?</h4>
                <p className="text-sm text-muted-foreground">
                  Cài đặt tiện ích mở rộng MetaMask, tạo ví, sau đó nhấp vào nút
                  "Kết nối ví" trên trang ví điện tử.
                </p>
              </div>
              <Separator />
              <div className="space-y-2">
                <h4 className="font-medium">Tôi cần token gì để đóng góp?</h4>
                <p className="text-sm text-muted-foreground">
                  Bạn có thể đóng góp bằng MATIC (token gốc của Polygon) hoặc
                  USDT trên mạng Polygon.
                </p>
              </div>
              <Separator />
              <div className="space-y-2">
                <h4 className="font-medium">Làm sao để mua MATIC hoặc USDT?</h4>
                <p className="text-sm text-muted-foreground">
                  Bạn có thể mua MATIC hoặc USDT từ các sàn giao dịch tiền điện
                  tử như Binance, Coinbase, hoặc FTX.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="https://metamask.io/download/" target="_blank">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Tải MetaMask
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

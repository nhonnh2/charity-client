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
    <div className="p-6 max-w-full">
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
          <Card className="border border-border/40 shadow-sm">
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
                    className="hover:bg-primary/5 hover:text-primary transition-colors"
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
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Wallet className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">MetaMask</h3>
                          <Badge className="bg-accent/10 text-accent border-accent/20">
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
                            className="h-6 w-6 hover:bg-primary/5 hover:text-primary"
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
                        className="flex items-center gap-1 hover:bg-primary/5 hover:text-primary transition-colors"
                      >
                        <RefreshCw className="h-4 w-4" />
                        <span>Làm mới</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsWalletConnected(false)}
                        className="hover:bg-primary/5 hover:text-primary transition-colors"
                      >
                        Ngắt kết nối
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {walletData.balances.map((balance) => (
                      <Card
                        key={balance.token}
                        className="border border-border/40"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium">{balance.token}</h3>
                            <Badge
                              variant="outline"
                              className="bg-primary/5 text-primary border-primary/20"
                            >
                              {balance.amount} {balance.token}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                              Giá trị quy đổi
                            </span>
                            <span className="font-medium">
                              {balance.value.toLocaleString()} VNĐ
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="rounded-lg border p-4 flex justify-between items-center border-border/40">
                    <div>
                      <h3 className="font-medium">Tổng giá trị</h3>
                      <p className="text-sm text-muted-foreground">
                        Tổng giá trị các tài sản số
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold">
                        {walletData.totalValue.toLocaleString()} VNĐ
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      className="flex items-center gap-1 hover:bg-primary/5 hover:text-primary transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Nạp tiền</span>
                    </Button>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      <ArrowUpRight className="mr-2 h-4 w-4" />
                      Đóng góp
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 space-y-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                    <Wallet className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-medium mb-1">
                      Chưa có ví được kết nối
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-md">
                      Kết nối ví MetaMask của bạn để có thể đóng góp vào các
                      chiến dịch và quản lý tài sản số.
                    </p>
                  </div>
                  <Button
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={() => setIsWalletConnected(true)}
                  >
                    Kết nối ví
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Lịch sử giao dịch */}
          {isWalletConnected && (
            <Card className="border border-border/40 shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Lịch sử giao dịch</CardTitle>
                    <CardDescription>
                      Thông tin các giao dịch liên quan đến ví của bạn
                    </CardDescription>
                  </div>
                  <div className="hidden md:block">
                    <Tabs
                      value={activeTab}
                      onValueChange={setActiveTab}
                      className="w-full"
                    >
                      <TabsList className="bg-muted/50">
                        <TabsTrigger value="overview">Tất cả</TabsTrigger>
                        <TabsTrigger value="donations">Đóng góp</TabsTrigger>
                        <TabsTrigger value="received">Nhận</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                  <div className="block md:hidden">
                    <Select value={activeTab} onValueChange={setActiveTab}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Tất cả" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="overview">Tất cả</SelectItem>
                        <SelectItem value="donations">Đóng góp</SelectItem>
                        <SelectItem value="received">Nhận</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentTransactions.length > 0 ? (
                  <>
                    <div className="space-y-4">
                      {currentTransactions.map((tx) => (
                        <div
                          key={tx.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-border/40 hover:shadow-sm transition-shadow"
                        >
                          <div className="flex items-start sm:items-center gap-3">
                            <div
                              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                                tx.type === 'donation'
                                  ? 'bg-primary/10 text-primary'
                                  : 'bg-accent/10 text-accent'
                              }`}
                            >
                              {tx.type === 'donation' ? (
                                <ArrowUpRight className="h-5 w-5" />
                              ) : (
                                <ArrowDownLeft className="h-5 w-5" />
                              )}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium">
                                  {tx.type === 'donation'
                                    ? 'Đóng góp cho'
                                    : 'Nhận từ'}
                                </h3>
                                <Badge
                                  variant="outline"
                                  className={`
                                  ${
                                    tx.type === 'donation'
                                      ? 'bg-primary/5 text-primary border-primary/20'
                                      : 'bg-accent/5 text-accent border-accent/20'
                                  }`}
                                >
                                  {tx.token}
                                </Badge>
                              </div>
                              <p className="text-sm line-clamp-1">
                                {tx.type === 'donation' ? tx.to : tx.from}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <p className="text-xs text-muted-foreground">
                                  {tx.timestamp.toLocaleDateString('vi-VN')}{' '}
                                  {tx.timestamp.toLocaleTimeString('vi-VN')}
                                </p>
                                <Badge
                                  variant="outline"
                                  className="text-xs px-1 h-4 bg-muted/50 hover:bg-muted/70 text-muted-foreground"
                                >
                                  {tx.network}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end mt-2 sm:mt-0">
                            <span
                              className={`font-medium ${
                                tx.type === 'donation'
                                  ? 'text-primary'
                                  : 'text-accent'
                              }`}
                            >
                              {tx.type === 'donation' ? '-' : '+'}
                              {tx.amount.toLocaleString()} VNĐ
                            </span>
                            <p className="text-xs text-muted-foreground">
                              {tx.tokenAmount} {tx.token}
                            </p>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 mt-1 flex items-center gap-1 hover:bg-primary/5 hover:text-primary transition-colors"
                            >
                              <ExternalLink className="h-3 w-3" />
                              <span className="text-xs">Xem giao dịch</span>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Phân trang */}
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        Hiển thị {(currentPage - 1) * itemsPerPage + 1}-
                        {Math.min(
                          currentPage * itemsPerPage,
                          filteredTransactions.length
                        )}{' '}
                        trong tổng số {filteredTransactions.length} giao dịch
                      </p>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setCurrentPage(Math.max(1, currentPage - 1))
                          }
                          disabled={currentPage === 1}
                          className="hover:bg-primary/5 hover:text-primary transition-colors"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setCurrentPage(
                              Math.min(totalPages, currentPage + 1)
                            )
                          }
                          disabled={currentPage === totalPages}
                          className="hover:bg-primary/5 hover:text-primary transition-colors"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <p className="text-muted-foreground">
                      Không có giao dịch nào
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Cột phụ - 1/4 width on desktop */}
        <div className="space-y-6">
          <Card className="border border-border/40 shadow-sm">
            <CardHeader>
              <CardTitle>Mạng lưới hỗ trợ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {supportedNetworks.map((network) => (
                <div
                  key={network.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border/40 hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{network.icon}</div>
                    <span>{network.name}</span>
                  </div>
                  {network.status === 'connected' ? (
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                      Đã kết nối
                    </Badge>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      className="hover:bg-primary/5 hover:text-primary transition-colors"
                    >
                      Kết nối
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border border-border/40 shadow-sm">
            <CardHeader>
              <CardTitle>Thông tin</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="border border-primary/20 bg-primary/5">
                <Info className="h-4 w-4 text-primary" />
                <AlertTitle>Về phí giao dịch</AlertTitle>
                <AlertDescription className="text-sm text-muted-foreground">
                  Phí giao dịch được tính dựa trên mạng lưới blockchain và mức
                  độ tắc nghẽn mạng lưới tại thời điểm giao dịch.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Phí giao dịch hiện tại</h3>
                <div className="rounded-lg border p-3 space-y-2 border-border/40">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Polygon</span>
                    <span className="text-sm font-medium">0.001 MATIC</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Ethereum</span>
                    <span className="text-sm font-medium">0.0025 ETH</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Binance Smart Chain</span>
                    <span className="text-sm font-medium">0.0003 BNB</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Lần cập nhật cuối</h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>15/06/2023 14:30</span>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full hover:bg-primary/5 hover:text-primary transition-colors"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Xem hướng dẫn
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

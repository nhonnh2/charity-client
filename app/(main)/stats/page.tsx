"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  BarChart3,
  Clock,
  Download,
  ExternalLink,
  Filter,
  HelpCircle,
  LineChart,
  Network,
  RefreshCcw,
  Shield,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react"

export default function BlockchainStatsPage() {
  const [timeRange, setTimeRange] = useState("30days")
  const [network, setNetwork] = useState("ethereum")

  // Dữ liệu mẫu cho blockchain metrics
  const blockchainMetrics = {
    totalTransactions: 15234,
    totalVolume: "12.5 ETH",
    totalValueLocked: "45.8 ETH",
    activeWallets: 3456,
    avgTransactionFee: "0.0024 ETH",
    avgConfirmationTime: "45 giây",
    successRate: 99.8,
  }

  // Dữ liệu mẫu cho các giao dịch theo ngày
  const dailyTransactions = [
    { day: "01/05", count: 125, volume: "0.8 ETH", fee: "0.0025 ETH" },
    { day: "02/05", count: 138, volume: "1.2 ETH", fee: "0.0028 ETH" },
    { day: "03/05", count: 145, volume: "1.4 ETH", fee: "0.0030 ETH" },
    { day: "04/05", count: 162, volume: "1.6 ETH", fee: "0.0035 ETH" },
    { day: "05/05", count: 178, volume: "2.1 ETH", fee: "0.0040 ETH" },
    { day: "06/05", count: 185, volume: "2.3 ETH", fee: "0.0042 ETH" },
    { day: "07/05", count: 192, volume: "2.5 ETH", fee: "0.0045 ETH" },
    { day: "08/05", count: 205, volume: "2.8 ETH", fee: "0.0048 ETH" },
    { day: "09/05", count: 218, volume: "3.0 ETH", fee: "0.0050 ETH" },
    { day: "10/05", count: 225, volume: "3.2 ETH", fee: "0.0052 ETH" },
  ]

  // Dữ liệu mẫu cho các loại giao dịch
  const transactionTypes = [
    { type: "Đóng góp", count: 8562, percentage: 56.2, volume: "7.2 ETH", color: "bg-green-500" },
    { type: "Rút tiền", count: 3245, percentage: 21.3, volume: "3.5 ETH", color: "bg-blue-500" },
    { type: "Tạo chiến dịch", count: 245, percentage: 1.6, volume: "0.4 ETH", color: "bg-amber-500" },
    { type: "Cập nhật", count: 1852, percentage: 12.2, volume: "0.8 ETH", color: "bg-purple-500" },
    { type: "Khác", count: 1330, percentage: 8.7, volume: "0.6 ETH", color: "bg-gray-500" },
  ]

  // Dữ liệu mẫu cho giao dịch gần đây
  const recentTransactions = [
    {
      hash: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
      type: "Đóng góp",
      from: "0x7a23...45de",
      to: "0x9b87...12cd",
      amount: "0.5 ETH",
      fee: "0.0025 ETH",
      time: "10 phút trước",
      status: "success",
    },
    {
      hash: "0x2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1a",
      type: "Rút tiền",
      from: "0x3c45...78ef",
      to: "0x1d23...45ab",
      amount: "1.2 ETH",
      fee: "0.0030 ETH",
      time: "25 phút trước",
      status: "success",
    },
    {
      hash: "0x3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1a2b",
      type: "Tạo chiến dịch",
      from: "0x5e67...90cd",
      to: "0x2f45...67gh",
      amount: "0.2 ETH",
      fee: "0.0020 ETH",
      time: "45 phút trước",
      status: "success",
    },
    {
      hash: "0x4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1a2b3c",
      type: "Đóng góp",
      from: "0x6f78...01ij",
      to: "0x3g56...78kl",
      amount: "0.75 ETH",
      fee: "0.0028 ETH",
      time: "1 giờ trước",
      status: "success",
    },
    {
      hash: "0x5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1a2b3c4d",
      type: "Cập nhật",
      from: "0x7g89...12mn",
      to: "0x4h67...90op",
      amount: "0.1 ETH",
      fee: "0.0015 ETH",
      time: "1.5 giờ trước",
      status: "failed",
    },
  ]

  // Dữ liệu mẫu cho gas prices
  const gasData = {
    current: "15 gwei",
    low: "12 gwei",
    medium: "15 gwei",
    high: "18 gwei",
    avgTxCost: "0.0024 ETH",
    avgConfirmation: "45 giây",
    ethPrice: "$2,850 USD",
  }

  // Dữ liệu mẫu cho blockchain health
  const blockchainHealth = {
    blockHeight: 17845632,
    lastBlock: "3 phút trước",
    difficulty: "8.56 PH",
    hashRate: "120.5 EH/s",
    pendingTx: 125,
    networkUtilization: 68.5,
  }

  // Hàm tạo biểu đồ đường đơn giản bằng CSS
  const renderLineChart = () => {
    const maxCount = Math.max(...dailyTransactions.map((item) => item.count))

    return (
      <div className="flex items-end h-60 gap-2 mt-4 mb-2">
        {dailyTransactions.map((item, index) => {
          const height = (item.count / maxCount) * 100
          const prevHeight = index > 0 ? (dailyTransactions[index - 1].count / maxCount) * 100 : 0

          return (
            <div key={index} className="relative flex flex-col items-center flex-1">
              {index > 0 && (
                <div
                  className="absolute h-[2px] bg-blue-400"
                  style={{
                    width: "100%",
                    bottom: `${prevHeight}%`,
                    left: "-50%",
                    transform: `rotate(${Math.atan2(height - prevHeight, 100) * (180 / Math.PI)}deg)`,
                    transformOrigin: "left bottom",
                  }}
                />
              )}
              <div
                className="w-3 h-3 rounded-full bg-blue-500 mb-2 z-10 hover:bg-blue-600 transition-colors cursor-pointer relative group"
                style={{ marginBottom: `${height}%` }}
              >
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-blue-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity mb-1 whitespace-nowrap">
                  {item.count} giao dịch
                  <br />
                  {item.volume}
                  <br />
                  {item.fee} phí
                </div>
              </div>
              <div className="text-xs mt-2 text-muted-foreground rotate-45 origin-left">{item.day}</div>
            </div>
          )
        })}
      </div>
    )
  }

  // Hàm tạo biểu đồ cột theo phần trăm
  const renderBarChartPercentage = () => {
    return (
      <div className="space-y-4 mt-4">
        {transactionTypes.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                <span>{item.type}</span>
              </div>
              <div className="flex gap-4">
                <span>{item.count} giao dịch</span>
                <span className="font-medium">{item.percentage}%</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Progress value={item.percentage} className="h-2" />
              <span className="text-xs text-muted-foreground w-16">{item.volume}</span>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-8xl">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Thống Kê Blockchain</h1>
            <p className="text-muted-foreground">Theo dõi số liệu và hiệu suất blockchain của nền tảng từ thiện</p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <Select value={network} onValueChange={setNetwork}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Chọn mạng" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ethereum">Ethereum</SelectItem>
                <SelectItem value="polygon">Polygon</SelectItem>
                <SelectItem value="bnb">BNB Chain</SelectItem>
                <SelectItem value="avalanche">Avalanche</SelectItem>
              </SelectContent>
            </Select>

            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Khoảng thời gian" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24hours">24 giờ qua</SelectItem>
                <SelectItem value="7days">7 ngày qua</SelectItem>
                <SelectItem value="30days">30 ngày qua</SelectItem>
                <SelectItem value="90days">90 ngày qua</SelectItem>
                <SelectItem value="1year">1 năm</SelectItem>
                <SelectItem value="all">Tất cả</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon" title="Làm mới dữ liệu">
              <RefreshCcw className="h-4 w-4" />
            </Button>

            <Button variant="outline" size="icon" title="Tải xuống báo cáo">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Blockchain Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Tổng giao dịch</p>
                  <h3 className="text-2xl font-bold mt-1">{blockchainMetrics.totalTransactions}</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <Badge variant="outline" className="bg-green-50 text-green-700 flex items-center gap-1">
                  <ArrowUp className="h-3 w-3" />
                  <span>12%</span>
                </Badge>
                <span className="text-muted-foreground ml-2">so với kỳ trước</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Tổng khối lượng</p>
                  <h3 className="text-2xl font-bold mt-1">{blockchainMetrics.totalVolume}</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <Badge variant="outline" className="bg-green-50 text-green-700 flex items-center gap-1">
                  <ArrowUp className="h-3 w-3" />
                  <span>8%</span>
                </Badge>
                <span className="text-muted-foreground ml-2">so với kỳ trước</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Ví hoạt động</p>
                  <h3 className="text-2xl font-bold mt-1">{blockchainMetrics.activeWallets}</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                  <Users className="h-6 w-6 text-amber-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <Badge variant="outline" className="bg-green-50 text-green-700 flex items-center gap-1">
                  <ArrowUp className="h-3 w-3" />
                  <span>15%</span>
                </Badge>
                <span className="text-muted-foreground ml-2">so với kỳ trước</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Phí trung bình</p>
                  <h3 className="text-2xl font-bold mt-1">{blockchainMetrics.avgTransactionFee}</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                  <Wallet className="h-6 w-6 text-red-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <Badge variant="outline" className="bg-red-50 text-red-700 flex items-center gap-1">
                  <ArrowDown className="h-3 w-3" />
                  <span>5%</span>
                </Badge>
                <span className="text-muted-foreground ml-2">so với kỳ trước</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Biểu đồ và phân tích */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-blue-600" />
                  <span>Hoạt động giao dịch</span>
                </CardTitle>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Filter className="h-4 w-4" />
                  <span>Lọc</span>
                </Button>
              </div>
              <CardDescription>Số lượng giao dịch và khối lượng theo ngày trong 10 ngày qua</CardDescription>
            </CardHeader>
            <CardContent>{renderLineChart()}</CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Tổng số:</span> 1,773 giao dịch
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Trung bình:</span> 177 giao dịch/ngày
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                  <span>Phân loại giao dịch</span>
                </CardTitle>
              </div>
              <CardDescription>Phân loại giao dịch theo chức năng</CardDescription>
            </CardHeader>
            <CardContent>{renderBarChartPercentage()}</CardContent>
            <CardFooter className="border-t pt-4">
              <Button variant="outline" className="w-full flex items-center gap-1">
                <span>Xem chi tiết</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Tabs cho các loại thống kê khác nhau */}
        <Tabs defaultValue="transactions" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="transactions" className="flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              <span>Giao dịch gần đây</span>
            </TabsTrigger>
            <TabsTrigger value="gas" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span>Phí Gas</span>
            </TabsTrigger>
            <TabsTrigger value="network" className="flex items-center gap-2">
              <Network className="h-4 w-4" />
              <span>Sức khỏe mạng</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab Giao dịch */}
          <TabsContent value="transactions">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Wallet className="h-5 w-5 text-blue-600" />
                    <span>Giao dịch gần đây</span>
                  </CardTitle>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Filter className="h-4 w-4" />
                    <span>Lọc</span>
                  </Button>
                </div>
                <CardDescription>Các giao dịch blockchain mới nhất trên nền tảng</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="whitespace-nowrap">Hash</TableHead>
                        <TableHead>Loại</TableHead>
                        <TableHead>Từ</TableHead>
                        <TableHead>Đến</TableHead>
                        <TableHead className="text-right">Giá trị</TableHead>
                        <TableHead className="text-right">Phí</TableHead>
                        <TableHead>Thời gian</TableHead>
                        <TableHead>Trạng thái</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentTransactions.map((tx, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-mono text-xs whitespace-nowrap">
                            <div className="flex items-center gap-1">
                              {tx.hash.substring(0, 8)}...{tx.hash.substring(tx.hash.length - 6)}
                              <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" asChild>
                                <a
                                  href={`https://etherscan.io/tx/${tx.hash}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="font-normal">
                              {tx.type}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-mono text-xs">{tx.from}</TableCell>
                          <TableCell className="font-mono text-xs">{tx.to}</TableCell>
                          <TableCell className="text-right">{tx.amount}</TableCell>
                          <TableCell className="text-right">{tx.fee}</TableCell>
                          <TableCell>{tx.time}</TableCell>
                          <TableCell>
                            {tx.status === "success" ? (
                              <Badge className="bg-green-500">Thành công</Badge>
                            ) : (
                              <Badge className="bg-red-500">Thất bại</Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-between">
                <div className="text-sm text-muted-foreground">Hiển thị 5 trên tổng số 1,773 giao dịch</div>
                <Button variant="outline">Xem tất cả giao dịch</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Tab Gas */}
          <TabsContent value="gas">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <span>Thống kê phí Gas</span>
                  </CardTitle>
                  <Badge className="bg-green-100 text-green-800">Cập nhật 5 phút trước</Badge>
                </div>
                <CardDescription>Số liệu thống kê về phí gas hiện tại trên mạng</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Giá Gas hiện tại</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <div className="text-xs text-muted-foreground">Thấp</div>
                        <div className="text-xl font-bold text-green-700">{gasData.low}</div>
                      </div>
                      <div className="bg-amber-50 p-4 rounded-lg text-center">
                        <div className="text-xs text-muted-foreground">Trung bình</div>
                        <div className="text-xl font-bold text-amber-700">{gasData.medium}</div>
                      </div>
                      <div className="bg-red-50 p-4 rounded-lg text-center">
                        <div className="text-xs text-muted-foreground">Cao</div>
                        <div className="text-xl font-bold text-red-700">{gasData.high}</div>
                      </div>
                    </div>
                    <div className="pt-2">
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>Giá gas được cập nhật mỗi 5 phút</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Chi phí giao dịch</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-muted-foreground">Chi phí trung bình</div>
                        <div className="text-2xl font-bold">{gasData.avgTxCost}</div>
                        <div className="text-xs text-muted-foreground">
                          Tương đương <span className="font-medium">~$6.84 USD</span>
                        </div>
                      </div>

                      <div>
                        <div className="text-sm text-muted-foreground">Thời gian xác nhận</div>
                        <div className="text-2xl font-bold">{gasData.avgConfirmation}</div>
                        <div className="text-xs text-muted-foreground">Trung bình cho các giao dịch</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Thông tin Ether</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-muted-foreground">Giá ETH hiện tại</div>
                        <div className="text-2xl font-bold">{gasData.ethPrice}</div>
                        <div className="text-xs text-green-600 flex items-center gap-1">
                          <ArrowUp className="h-3 w-3" />
                          <span>2.5% trong 24 giờ qua</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-4">
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <span>Xem chi tiết giá</span>
                          <ExternalLink className="h-3 w-3" />
                        </Button>

                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <HelpCircle className="h-4 w-4" />
                          <span>Gas là gì?</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Lịch sử phí Gas (7 ngày qua)</h3>

                  <div className="h-60 border rounded-lg flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <div className="flex items-center justify-center">
                        <LineChart className="h-12 w-12 mb-2" />
                      </div>
                      <p>Biểu đồ lịch sử phí Gas sẽ được hiển thị ở đây</p>
                      <p className="text-sm">Dữ liệu được lấy từ mạng Ethereum</p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <span>Xem lịch sử đầy đủ</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab Network */}
          <TabsContent value="network">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Network className="h-5 w-5 text-purple-600" />
                    <span>Sức khỏe mạng</span>
                  </CardTitle>
                  <Badge className="bg-green-600">Hoạt động bình thường</Badge>
                </div>
                <CardDescription>Thông tin về hiệu suất và sức khỏe của mạng Ethereum</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Chiều cao khối</div>
                    <div className="text-2xl font-bold">{blockchainHealth.blockHeight}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>Khối mới nhất: {blockchainHealth.lastBlock}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Độ khó</div>
                    <div className="text-2xl font-bold">{blockchainHealth.difficulty}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <ArrowUp className="h-3 w-3 text-green-500" />
                      <span>2.3% so với kỳ trước</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Tốc độ băm</div>
                    <div className="text-2xl font-bold">{blockchainHealth.hashRate}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <ArrowUp className="h-3 w-3 text-green-500" />
                      <span>1.8% so với kỳ trước</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Giao dịch đang chờ xử lý</div>
                    <div className="text-2xl font-bold">{blockchainHealth.pendingTx}</div>
                    <div className="text-xs text-muted-foreground">
                      <span className="text-amber-500 font-medium">Trung bình</span> trong 24 giờ qua
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Sử dụng mạng</div>
                    <div className="text-2xl font-bold">{blockchainHealth.networkUtilization}%</div>
                    <div className="text-xs text-muted-foreground">
                      <span className="text-green-500 font-medium">Bình thường</span> - không tắc nghẽn
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Trạng thái mạng</div>
                    <div className="text-2xl font-bold flex items-center gap-2">
                      <Shield className="h-5 w-5 text-green-500" />
                      <span>Đang hoạt động</span>
                    </div>
                    <div className="text-xs text-muted-foreground">Thời gian hoạt động 99.98% trong 30 ngày qua</div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Phân bổ người xác thực</h3>

                  <div className="h-60 border rounded-lg flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <div className="flex items-center justify-center">
                        <BarChart3 className="h-12 w-12 mb-2" />
                      </div>
                      <p>Biểu đồ phân bổ người xác thực sẽ được hiển thị ở đây</p>
                      <p className="text-sm">Hiển thị phân bổ của các nhóm người xác thực trên mạng</p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <span>Xem thêm thông tin mạng</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

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
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Calendar,
  Check,
  Clock,
  Copy,
  ExternalLink,
  FileText,
  Heart,
  MessageCircle,
  Share2,
  ThumbsUp,
  TrendingUp,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function CampaignDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const campaignId = params.id;

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Main content - 2/3 width on desktop */}
        <div className="md:col-span-2 space-y-6">
          <div className="relative h-64 md:h-96 w-full overflow-hidden rounded-lg">
            <img
              src="/placeholder.svg?height=400&width=800&text=Campaign+Cover"
              alt="Campaign Cover"
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
              <Badge className="mb-2 bg-green-600 hover:bg-green-700">
                Giáo dục
              </Badge>
              <h1 className="text-2xl font-bold md:text-3xl">
                Xây trường học cho trẻ em vùng cao
              </h1>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src="/placeholder.svg?height=50&width=50"
                  alt="Avatar"
                />
                <AvatarFallback>TH</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">Trần Hùng</span>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    <span>Uy tín 85</span>
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Đã xác minh danh tính
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <Heart className="h-4 w-4" />
                <span>Yêu thích</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <Share2 className="h-4 w-4" />
                <span>Chia sẻ</span>
              </Button>
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700 flex items-center gap-1"
              >
                <Wallet className="h-4 w-4" />
                <span>Đóng góp ngay</span>
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Thông tin chiến dịch</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Mục tiêu</p>
                  <p className="font-medium">100.000.000 VNĐ</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Đã quyên góp</p>
                  <p className="font-medium">35.000.000 VNĐ</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">
                    Người đóng góp
                  </p>
                  <p className="font-medium">128 người</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">
                    Thời gian còn lại
                  </p>
                  <p className="font-medium">15 ngày</p>
                </div>
              </div>

              <Progress value={35} className="h-2" />

              <div className="flex items-center justify-between text-sm">
                <span>35% đạt được</span>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    Kết thúc: 30/06/2023
                  </span>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-semibold">Mô tả chiến dịch</h3>
                <p>
                  Chiến dịch "Xây trường học cho trẻ em vùng cao" nhằm mục đích
                  xây dựng một trường học mới cho hơn 200 trẻ em tại xã Tả Phìn,
                  huyện Sa Pa, tỉnh Lào Cai. Hiện tại, trẻ em ở đây phải đi bộ
                  hơn 5km đường núi để đến trường, gặp nhiều khó khăn trong mùa
                  mưa.
                </p>
                <p>
                  Trường học mới sẽ có 6 phòng học, 1 thư viện nhỏ, và các thiết
                  bị cơ bản phục vụ việc học tập. Dự án được chia thành 3 giai
                  đoạn, với tổng kinh phí dự kiến là 100 triệu đồng.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <img
                    src="/placeholder.svg?height=200&width=300&text=Image+1"
                    alt="Hình ảnh hiện trạng"
                    className="rounded-lg object-cover h-48 w-full"
                  />
                  <img
                    src="/placeholder.svg?height=200&width=300&text=Image+2"
                    alt="Hình ảnh thiết kế"
                    className="rounded-lg object-cover h-48 w-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Các giai đoạn chiến dịch</CardTitle>
              <CardDescription>
                Chiến dịch được chia thành 3 giai đoạn với mục tiêu và thời gian
                cụ thể
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700">
                      <Check className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold">
                        Giai đoạn 1: Hoàn thành móng và khung
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        01/04/2023 - 30/04/2023
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                    Hoàn thành
                  </Badge>
                </div>
                <div className="ml-11 space-y-2">
                  <p className="text-sm">
                    Đào móng, đổ bê tông và xây dựng khung chính của trường học.
                    Giai đoạn này đã hoàn thành với sự tham gia của 15 tình
                    nguyện viên địa phương.
                  </p>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <FileText className="h-4 w-4" />
                      <span>Xem báo cáo chi tiêu</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Xem giao dịch blockchain</span>
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold">
                        Giai đoạn 2: Xây tường và mái
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        01/05/2023 - 31/05/2023
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                    Đang thực hiện
                  </Badge>
                </div>
                <div className="ml-11 space-y-2">
                  <p className="text-sm">
                    Xây tường, lắp đặt cửa sổ, cửa ra vào và hoàn thiện mái nhà.
                    Hiện tại đã hoàn thành khoảng 60% công việc của giai đoạn
                    này.
                  </p>
                  <Progress value={60} className="h-2" />
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <FileText className="h-4 w-4" />
                      <span>Xem cập nhật mới nhất</span>
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold">
                        Giai đoạn 3: Hoàn thiện và trang thiết bị
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        01/06/2023 - 30/06/2023
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline">Chưa bắt đầu</Badge>
                </div>
                <div className="ml-11 space-y-2">
                  <p className="text-sm">
                    Hoàn thiện nội thất, lắp đặt bàn ghế, bảng, và các thiết bị
                    học tập cơ bản. Dự kiến khánh thành trường vào đầu tháng
                    7/2023.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cộng đồng</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="updates">
                <TabsList className="w-full">
                  <TabsTrigger value="updates" className="flex-1">
                    Cập nhật (8)
                  </TabsTrigger>
                  <TabsTrigger value="comments" className="flex-1">
                    Bình luận (24)
                  </TabsTrigger>
                  <TabsTrigger value="donors" className="flex-1">
                    Người đóng góp (128)
                  </TabsTrigger>
                  <TabsTrigger value="transactions" className="flex-1">
                    Giao dịch (15)
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="updates" className="mt-4 space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Avatar>
                        <AvatarImage
                          src="/placeholder.svg?height=40&width=40"
                          alt="Avatar"
                        />
                        <AvatarFallback>TH</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold">Trần Hùng</span>
                          <span className="text-xs text-muted-foreground">
                            2 ngày trước
                          </span>
                        </div>
                        <p className="mt-1">
                          Chúng tôi vừa hoàn thành 60% giai đoạn 2! Cảm ơn tất
                          cả mọi người đã đóng góp và ủng hộ. Dưới đây là một số
                          hình ảnh cập nhật về tiến độ xây dựng.
                        </p>
                        <div className="mt-2 grid grid-cols-2 gap-2">
                          <img
                            src="/placeholder.svg?height=200&width=300&text=Update+1"
                            alt="Cập nhật 1"
                            className="rounded-lg object-cover h-40 w-full"
                          />
                          <img
                            src="/placeholder.svg?height=200&width=300&text=Update+2"
                            alt="Cập nhật 2"
                            className="rounded-lg object-cover h-40 w-full"
                          />
                        </div>
                        <div className="mt-2 flex items-center space-x-4">
                          <button className="flex items-center space-x-1 text-muted-foreground hover:text-foreground">
                            <Heart className="h-4 w-4" />
                            <span className="text-xs">32</span>
                          </button>
                          <button className="flex items-center space-x-1 text-muted-foreground hover:text-foreground">
                            <MessageCircle className="h-4 w-4" />
                            <span className="text-xs">8</span>
                          </button>
                          <button className="flex items-center space-x-1 text-muted-foreground hover:text-foreground">
                            <Share2 className="h-4 w-4" />
                            <span className="text-xs">Chia sẻ</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-start space-x-3">
                      <Avatar>
                        <AvatarImage
                          src="/placeholder.svg?height=40&width=40"
                          alt="Avatar"
                        />
                        <AvatarFallback>TH</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold">Trần Hùng</span>
                          <span className="text-xs text-muted-foreground">
                            1 tuần trước
                          </span>
                        </div>
                        <p className="mt-1">
                          Chúng tôi đã bắt đầu giai đoạn 2 của dự án! Cảm ơn tất
                          cả mọi người đã đóng góp. Chúng tôi đã mua vật liệu
                          xây dựng và thuê thêm nhân công để đẩy nhanh tiến độ.
                        </p>
                        <div className="mt-2 flex items-center space-x-4">
                          <button className="flex items-center space-x-1 text-muted-foreground hover:text-foreground">
                            <Heart className="h-4 w-4" />
                            <span className="text-xs">45</span>
                          </button>
                          <button className="flex items-center space-x-1 text-muted-foreground hover:text-foreground">
                            <MessageCircle className="h-4 w-4" />
                            <span className="text-xs">12</span>
                          </button>
                          <button className="flex items-center space-x-1 text-muted-foreground hover:text-foreground">
                            <Share2 className="h-4 w-4" />
                            <span className="text-xs">Chia sẻ</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Xem tất cả cập nhật
                  </Button>
                </TabsContent>
                <TabsContent value="comments" className="mt-4 space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Avatar>
                        <AvatarImage
                          src="/placeholder.svg?height=40&width=40"
                          alt="Avatar"
                        />
                        <AvatarFallback>NL</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold">Nguyễn Linh</span>
                          <span className="text-xs text-muted-foreground">
                            1 ngày trước
                          </span>
                        </div>
                        <p className="mt-1">
                          Dự án rất ý nghĩa! Tôi đã đóng góp và sẽ chia sẻ với
                          bạn bè. Chúc dự án thành công!
                        </p>
                        <div className="mt-2 flex items-center space-x-4">
                          <button className="flex items-center space-x-1 text-muted-foreground hover:text-foreground">
                            <ThumbsUp className="h-4 w-4" />
                            <span className="text-xs">8</span>
                          </button>
                          <button className="flex items-center space-x-1 text-muted-foreground hover:text-foreground">
                            <MessageCircle className="h-4 w-4" />
                            <span className="text-xs">Trả lời</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-start space-x-3">
                      <Avatar>
                        <AvatarImage
                          src="/placeholder.svg?height=40&width=40"
                          alt="Avatar"
                        />
                        <AvatarFallback>HM</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold">Hoàng Minh</span>
                          <span className="text-xs text-muted-foreground">
                            3 ngày trước
                          </span>
                        </div>
                        <p className="mt-1">
                          Tôi rất ấn tượng với sự minh bạch của dự án này. Việc
                          sử dụng blockchain để theo dõi các giao dịch là một ý
                          tưởng tuyệt vời. Tôi sẽ tiếp tục theo dõi và ủng hộ!
                        </p>
                        <div className="mt-2 flex items-center space-x-4">
                          <button className="flex items-center space-x-1 text-muted-foreground hover:text-foreground">
                            <ThumbsUp className="h-4 w-4" />
                            <span className="text-xs">12</span>
                          </button>
                          <button className="flex items-center space-x-1 text-muted-foreground hover:text-foreground">
                            <MessageCircle className="h-4 w-4" />
                            <span className="text-xs">Trả lời</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Xem tất cả bình luận
                  </Button>
                </TabsContent>
                <TabsContent value="donors" className="mt-4 space-y-4">
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={`/placeholder.svg?height=40&width=40&text=D${i}`}
                              alt="Donor"
                            />
                            <AvatarFallback>D{i}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">
                              Người đóng góp {i}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {i} ngày trước
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            {(i * 1000000).toLocaleString()} VNĐ
                          </div>
                          {i === 2 && (
                            <div className="text-xs text-muted-foreground">
                              Ẩn danh
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full">
                    Xem tất cả người đóng góp
                  </Button>
                </TabsContent>
                <TabsContent value="transactions" className="mt-4 space-y-4">
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between border-b pb-3"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full ${
                              i % 3 === 0
                                ? 'bg-green-100 text-green-600'
                                : i % 3 === 1
                                ? 'bg-blue-100 text-blue-600'
                                : 'bg-purple-100 text-purple-600'
                            }`}
                          >
                            {i % 3 === 0 ? (
                              <ArrowUpRight className="h-4 w-4" />
                            ) : i % 3 === 1 ? (
                              <ArrowDownLeft className="h-4 w-4" />
                            ) : (
                              <Check className="h-4 w-4" />
                            )}
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">
                              {i % 3 === 0
                                ? 'Đóng góp'
                                : i % 3 === 1
                                ? 'Giải ngân'
                                : 'Xác nhận giai đoạn'}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {new Date(2023, 4, 15 - i).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          {i % 3 !== 2 && (
                            <div className="font-medium">
                              {(i * 1000000).toLocaleString()} VNĐ
                            </div>
                          )}
                          <Button
                            variant="link"
                            size="sm"
                            className="h-auto p-0"
                          >
                            <ExternalLink className="mr-1 h-3 w-3" />
                            <span className="text-xs">Xem trên Polygon</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/transactions">
                      Xem tất cả giao dịch onchain
                    </Link>
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <div className="flex w-full items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="/placeholder.svg?height=40&width=40"
                    alt="Your Avatar"
                  />
                  <AvatarFallback>YA</AvatarFallback>
                </Avatar>
                <input
                  type="text"
                  placeholder="Viết bình luận..."
                  className="flex-1 rounded-full border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                />
                <Button size="sm">Gửi</Button>
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Sidebar - 1/3 width on desktop */}
        <div className="space-y-6">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Đóng góp cho chiến dịch</CardTitle>
              <CardDescription>
                Mọi đóng góp đều được ghi lại trên blockchain để đảm bảo tính
                minh bạch
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Số tiền đóng góp (VNĐ)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" className="w-full">
                    100K
                  </Button>
                  <Button variant="outline" className="w-full">
                    500K
                  </Button>
                  <Button variant="outline" className="w-full">
                    1M
                  </Button>
                </div>
                <input
                  type="text"
                  placeholder="Nhập số tiền khác..."
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Lời nhắn (tùy chọn)
                </label>
                <textarea
                  placeholder="Nhập lời nhắn của bạn..."
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="anonymous"
                  className="rounded border-gray-300"
                />
                <label htmlFor="anonymous" className="text-sm">
                  Đóng góp ẩn danh
                </label>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button className="w-full bg-green-600 hover:bg-green-700">
                <Wallet className="mr-2 h-4 w-4" />
                Đóng góp ngay
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Bằng cách đóng góp, bạn đồng ý với{' '}
                <Link href="#" className="underline">
                  điều khoản sử dụng
                </Link>{' '}
                của chúng tôi
              </p>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Thông tin blockchain</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Mạng blockchain</span>
                  <Badge variant="outline">Polygon</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Smart contract</span>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-blue-600">0x1a2...3b4c</span>
                    <Button variant="ghost" size="icon" className="h-5 w-5">
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Giao dịch gần nhất</span>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-blue-600">0xab1...2c3d</span>
                    <Button variant="ghost" size="icon" className="h-5 w-5">
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link
                  href="/transactions"
                  className="flex items-center justify-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Xem tất cả giao dịch</span>
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Chiến dịch liên quan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Link
                  href={`/campaigns/${i + 10}`}
                  key={i}
                  className="flex items-start space-x-3 group"
                >
                  <img
                    src={`/placeholder.svg?height=60&width=60&text=C${i}`}
                    alt={`Chiến dịch ${i}`}
                    className="h-14 w-14 rounded-md object-cover"
                  />
                  <div>
                    <h4 className="text-sm font-medium group-hover:text-blue-600">
                      {i === 1
                        ? 'Xây thư viện trường làng'
                        : i === 2
                        ? 'Học bổng cho học sinh nghèo'
                        : 'Trang bị máy tính cho trường học'}
                    </h4>
                    <Progress value={40 + i * 15} className="h-1 mt-1" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {40 + i * 15}% · {(i + 2) * 10} ngày còn lại
                    </p>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

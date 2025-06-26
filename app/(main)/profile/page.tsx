import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Calendar,
  Copy,
  Edit,
  ExternalLink,
  Heart,
  LinkIcon,
  MapPin,
  MessageCircle,
  Share2,
  Shield,
  TrendingUp,
  Users,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CampaignCard } from "@/components/campaign-card"

export default function ProfilePage() {
  // Dữ liệu mẫu cho các chiến dịch của user
  const getUserCampaigns = () => [
    {
      id: 1,
      title: 'Hỗ trợ y tế vùng cao Sapa',
      description: 'Mang y tế đến với người dân vùng cao xa xôi, cung cấp thiết bị y tế và thuốc men cần thiết',
      status: 'funding' as const,
      raised: 60000000,
      goal: 100000000,
      progress: 60,
      colorScheme: 'accent' as const,
      imageSrc: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop&crop=center&auto=format&q=80',
    },
    {
      id: 2,
      title: 'Xây trường học cho trẻ em vùng núi',
      description: 'Xây dựng trường học đạt chuẩn cho trẻ em vùng khó khăn, tạo môi trường học tập tốt nhất',
      status: 'implementing' as const,
      raised: 150000000,
      goal: 150000000,
      progress: 100,
      spent: 80000000,
      budget: 150000000,
      phase: 'Xây dựng phần thô',
      currentPhase: 2,
      totalPhases: 3,
      colorScheme: 'gradient' as const,
      imageSrc: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&h=200&fit=crop&crop=center&auto=format&q=80',
    },
    {
      id: 3,
      title: 'Trồng rừng phủ xanh đồi trọc',
      description: 'Phục hồi rừng và môi trường sinh thái, chống xói mòn đất và tạo không gian xanh',
      status: 'funding' as const,
      raised: 45000000,
      goal: 200000000,
      progress: 22,
      colorScheme: 'primary' as const,
      imageSrc: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=200&fit=crop&crop=center&auto=format&q=80',
    },
    {
      id: 4,
      title: 'Cung cấp nước sạch cho vùng hạn',
      description: 'Khoan giếng và lắp đặt hệ thống nước sạch cho các vùng thiếu nước sinh hoạt',
      status: 'pending' as const,
      interestedCount: 45,
      raised: 0,
      goal: 120000000,
      progress: 0,
      colorScheme: 'primary' as const,
      imageSrc: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=200&fit=crop&crop=center&auto=format&q=80',
    },
    {
      id: 5,
      title: 'Hỗ trợ học bổng sinh viên nghèo',
      description: 'Trao học bổng cho sinh viên vượt khó học giỏi, giúp các em có cơ hội phát triển tương lai',
      status: 'funding' as const,
      raised: 15000000,
      goal: 50000000,
      progress: 30,
      colorScheme: 'accent' as const,
      imageSrc: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=200&fit=crop&crop=center&auto=format&q=80',
    },
    {
      id: 6,
      title: 'Xây cầu qua suối cho học sinh',
      description: 'Xây cầu giúp học sinh đi học an toàn, không còn phải lội suối khi mùa mưa lũ',
      status: 'implementing' as const,
      raised: 80000000,
      goal: 80000000,
      progress: 100,
      spent: 50000000,
      budget: 80000000,
      phase: 'Thi công móng cầu',
      currentPhase: 1,
      totalPhases: 2,
      colorScheme: 'gradient' as const,
      imageSrc: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=200&fit=crop&crop=center&auto=format&q=80',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Profile Header */}
      <div className="relative mb-8">
        <div className="h-48 w-full rounded-lg bg-gradient-to-r from-green-400 to-blue-500 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=200&fit=crop&crop=center&auto=format&q=80"
            alt="Cover"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -bottom-16 left-4 md:left-8">
          <Avatar className="h-32 w-32 border-4 border-background">
            <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop&crop=face&auto=format&q=80" alt="Nguyễn Văn A" />
            <AvatarFallback>NVA</AvatarFallback>
          </Avatar>
        </div>
        <div className="absolute bottom-4 right-4">
          <Button variant="outline" className="bg-background">
            <Edit className="mr-2 h-4 w-4" />
            Chỉnh sửa hồ sơ
          </Button>
        </div>
      </div>

      {/* Profile Info */}
      <div className="mt-16 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">Nguyễn Văn A</h1>
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                <Shield className="mr-1 h-3 w-3" />
                <span>Đã xác minh</span>
              </Badge>
            </div>
            <p className="text-muted-foreground">@nguyenvana</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              <span>Nhắn tin</span>
            </Button>
            <Button variant="outline" className="flex items-center gap-1">
              <Share2 className="h-4 w-4" />
              <span>Chia sẻ</span>
            </Button>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-4">
          <p>
            Người sáng lập tổ chức phi lợi nhuận Ánh Sáng Hy Vọng, hoạt động trong lĩnh vực giáo dục và hỗ trợ trẻ em
            vùng cao từ năm 2018.
          </p>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center text-muted-foreground">
              <MapPin className="mr-1 h-4 w-4" />
              <span className="text-sm">Hà Nội, Việt Nam</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <LinkIcon className="mr-1 h-4 w-4" />
              <a href="#" className="text-sm text-blue-600 hover:underline">
                anhsanghyvong.org
              </a>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Calendar className="mr-1 h-4 w-4" />
              <span className="text-sm">Tham gia tháng 6, 2020</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 mt-2">
            <div className="flex items-center gap-1">
              <strong>15</strong>
              <span className="text-muted-foreground">Chiến dịch</span>
            </div>
            <div className="flex items-center gap-1">
              <strong>1.2K</strong>
              <span className="text-muted-foreground">Người theo dõi</span>
            </div>
            <div className="flex items-center gap-1">
              <strong>85</strong>
              <span className="text-muted-foreground">Đang theo dõi</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reputation Card */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                <TrendingUp className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">85</h3>
                <p className="text-muted-foreground">Điểm uy tín</p>
              </div>
            </div>

            <Separator className="hidden md:block h-16" orientation="vertical" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
              <div className="text-center">
                <h4 className="text-xl font-bold">12</h4>
                <p className="text-sm text-muted-foreground">Chiến dịch thành công</p>
              </div>
              <div className="text-center">
                <h4 className="text-xl font-bold">3</h4>
                <p className="text-sm text-muted-foreground">Đang thực hiện</p>
              </div>
              <div className="text-center">
                <h4 className="text-xl font-bold">1.5 tỷ</h4>
                <p className="text-sm text-muted-foreground">Tổng quyên góp</p>
              </div>
              <div className="text-center">
                <h4 className="text-xl font-bold">2.4K</h4>
                <p className="text-sm text-muted-foreground">Người đóng góp</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs Content */}
      <Tabs defaultValue="campaigns" className="w-full">
        <TabsList className="w-full justify-start mb-6">
          <TabsTrigger value="campaigns" className="flex gap-2">
            <Wallet className="h-4 w-4" />
            <span>Chiến dịch</span>
          </TabsTrigger>
          <TabsTrigger value="posts" className="flex gap-2">
            <MessageCircle className="h-4 w-4" />
            <span>Bài đăng</span>
          </TabsTrigger>
          <TabsTrigger value="donations" className="flex gap-2">
            <Heart className="h-4 w-4" />
            <span>Đóng góp</span>
          </TabsTrigger>
          <TabsTrigger value="wallet" className="flex gap-2">
            <Wallet className="h-4 w-4" />
            <span>Ví điện tử</span>
          </TabsTrigger>
          <TabsTrigger value="about" className="flex gap-2">
            <Users className="h-4 w-4" />
            <span>Giới thiệu</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getUserCampaigns().map((campaign) => (
              <CampaignCard
                key={campaign.id}
                id={campaign.id}
                title={campaign.title}
                description={campaign.description}
                imageSrc={campaign.imageSrc}
                status={campaign.status}
                raised={campaign.raised}
                goal={campaign.goal}
                progress={campaign.progress}
                interestedCount={campaign.interestedCount}
                spent={campaign.spent}
                budget={campaign.budget}
                phase={campaign.phase}
                currentPhase={campaign.currentPhase}
                totalPhases={campaign.totalPhases}
                colorScheme={campaign.colorScheme}
                className="h-full"
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="posts" className="space-y-6">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face&auto=format&q=80" alt="Avatar" />
                      <AvatarFallback>NVA</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">Nguyễn Văn A</span>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700">
                          <TrendingUp className="mr-1 h-3 w-3" />
                          <span>Uy tín 85</span>
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{i * 2} ngày trước</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>
                    {i === 1
                      ? "Hôm nay chúng tôi đã hoàn thành giai đoạn 1 của chiến dịch 'Xây trường học cho trẻ em vùng cao'. Cảm ơn tất cả mọi người đã đóng góp và ủng hộ!"
                      : i === 2
                        ? "Chúng tôi vừa tổ chức buổi phát quà cho 200 trẻ em có hoàn cảnh khó khăn tại Hà Giang. Niềm vui của các em là động lực lớn nhất cho chúng tôi!"
                        : "Cảm ơn tất cả mọi người đã ủng hộ chiến dịch 'Trồng rừng phủ xanh đồi trọc'. Chúng tôi đã trồng được 500 cây xanh trong tuần qua!"}
                  </p>
                  <img
                    src={
                      i === 1
                        ? "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=600&h=300&fit=crop&crop=center&auto=format&q=80"
                        : i === 2
                          ? "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=300&fit=crop&crop=center&auto=format&q=80"
                          : "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=300&fit=crop&crop=center&auto=format&q=80"
                    }
                    alt={`Bài đăng ${i}`}
                    className="rounded-lg object-cover w-full h-64"
                  />
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-3">
                <div className="flex items-center space-x-6">
                  <button className="flex items-center space-x-1 text-muted-foreground hover:text-foreground">
                    <Heart className="h-4 w-4" />
                    <span className="text-xs">{128 + i * 20}</span>
                  </button>
                  <button className="flex items-center space-x-1 text-muted-foreground hover:text-foreground">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-xs">{24 + i * 5}</span>
                  </button>
                  <button className="flex items-center space-x-1 text-muted-foreground hover:text-foreground">
                    <Share2 className="h-4 w-4" />
                    <span className="text-xs">Chia sẻ</span>
                  </button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="donations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Lịch sử đóng góp</CardTitle>
              <CardDescription>Các chiến dịch bạn đã đóng góp</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        i % 3 === 0
                          ? "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=60&h=60&fit=crop&crop=center&auto=format&q=80"
                          : i % 3 === 1
                            ? "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=60&h=60&fit=crop&crop=center&auto=format&q=80"
                            : "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=60&h=60&fit=crop&crop=center&auto=format&q=80"
                      }
                      alt={`Chiến dịch ${i}`}
                      className="h-12 w-12 rounded-md object-cover"
                    />
                    <div>
                      <h4 className="font-medium">
                        {i % 3 === 0
                          ? "Hỗ trợ y tế vùng cao"
                          : i % 3 === 1
                            ? "Xây trường học cho trẻ em"
                            : "Trồng rừng phủ xanh đồi trọc"}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Đóng góp ngày {10 + i}/05/2023 • {i % 2 === 0 ? "Đang diễn ra" : "Đã hoàn thành"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{(i * 500000).toLocaleString()} VNĐ</div>
                    <Button variant="link" size="sm" className="h-auto p-0">
                      <ExternalLink className="mr-1 h-3 w-3" />
                      <span className="text-xs">Xem giao dịch</span>
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Xem tất cả đóng góp
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="wallet" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Thông tin ví */}
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ví điện tử</CardTitle>
                  <CardDescription>Quản lý ví blockchain và xem thông tin giao dịch</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        <Wallet className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">MetaMask</h3>
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Đã kết nối</Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-sm text-muted-foreground">0x1a2b3c4d5e6f7g8h9i0j...</p>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Ngắt kết nối
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-muted/50">
                      <CardContent className="p-4">
                        <div className="flex flex-col items-center text-center py-2">
                          <h4 className="text-sm font-medium text-muted-foreground">MATIC</h4>
                          <p className="text-2xl font-bold">10.5</p>
                          <p className="text-sm text-muted-foreground">≈ 1,050,000 VNĐ</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-muted/50">
                      <CardContent className="p-4">
                        <div className="flex flex-col items-center text-center py-2">
                          <h4 className="text-sm font-medium text-muted-foreground">USDT</h4>
                          <p className="text-2xl font-bold">50.0</p>
                          <p className="text-sm text-muted-foreground">≈ 1,250,000 VNĐ</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-muted/50">
                      <CardContent className="p-4">
                        <div className="flex flex-col items-center text-center py-2">
                          <h4 className="text-sm font-medium text-muted-foreground">Tổng (VNĐ)</h4>
                          <p className="text-2xl font-bold">2,300,000</p>
                          <p className="text-sm text-muted-foreground">Tất cả token</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Separator />

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium">Lịch sử giao dịch cá nhân</h3>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="h-8">
                          Tất cả
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8">
                          Đóng góp
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8">
                          Nhận quỹ
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center justify-between py-2 border-b">
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-8 w-8 items-center justify-center rounded-full ${i % 2 === 0 ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
                                }`}
                            >
                              {i % 2 === 0 ? (
                                <ArrowUpRight className="h-4 w-4" />
                              ) : (
                                <ArrowDownLeft className="h-4 w-4" />
                              )}
                            </div>
                            <div>
                              <h4 className="text-sm font-medium">
                                {i % 2 === 0 ? "Đóng góp cho chiến dịch" : "Nhận quỹ từ chiến dịch"}
                              </h4>
                              <p className="text-xs text-muted-foreground">
                                {i % 3 === 0
                                  ? "Hỗ trợ y tế vùng cao"
                                  : i % 3 === 1
                                    ? "Xây trường học cho trẻ em"
                                    : "Trồng rừng phủ xanh đồi trọc"}{" "}
                                • {new Date(2023, 4, 10 + i).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`font-medium ${i % 2 === 0 ? "text-red-600" : "text-green-600"}`}>
                              {i % 2 === 0 ? "-" : "+"}
                              {(i * 500000).toLocaleString()} VNĐ
                            </div>
                            <Button variant="link" size="sm" className="h-auto p-0">
                              <ExternalLink className="mr-1 h-3 w-3" />
                              <span className="text-xs">Xem trên Polygon</span>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex justify-center">
                      <Button variant="outline">Xem thêm giao dịch</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Cột phụ */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Hướng dẫn sử dụng ví</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Làm sao để kết nối MetaMask?</h4>
                    <p className="text-sm text-muted-foreground">
                      Cài đặt tiện ích mở rộng MetaMask, tạo ví, sau đó nhấp vào nút "Kết nối ví" trên trang hồ sơ.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Ví của tôi có an toàn không?</h4>
                    <p className="text-sm text-muted-foreground">
                      Chúng tôi không lưu trữ private key của bạn. Tất cả giao dịch đều yêu cầu xác nhận qua MetaMask.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Tôi cần token gì để đóng góp?</h4>
                    <p className="text-sm text-muted-foreground">
                      Bạn có thể đóng góp bằng MATIC (token gốc của Polygon) hoặc USDT trên mạng Polygon.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="https://polygonscan.com/" target="_blank">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Mở Polygon Explorer
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Alert className="bg-blue-50 border-blue-200">
                <Wallet className="h-4 w-4 text-blue-600" />
                <AlertTitle className="text-blue-800">Kết nối ví mới</AlertTitle>
                <AlertDescription className="text-blue-700">
                  Bạn có thể kết nối thêm ví khác hoặc thay đổi ví hiện tại trong phần Cài đặt.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="about" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Giới thiệu</CardTitle>
              <CardDescription>Thông tin chi tiết về Nguyễn Văn A</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Tổ chức</h3>
                <p>
                  Ánh Sáng Hy Vọng là tổ chức phi lợi nhuận được thành lập vào năm 2018, với sứ mệnh mang đến cơ hội
                  giáo dục và hỗ trợ y tế cho trẻ em vùng cao Việt Nam. Chúng tôi đã thực hiện hơn 20 dự án, xây dựng 5
                  trường học và 2 trạm y tế tại các tỉnh miền núi phía Bắc.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Thành tựu</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Giải thưởng "Tổ chức phi lợi nhuận tiêu biểu" năm 2021</li>
                  <li>Hỗ trợ giáo dục cho hơn 5,000 trẻ em vùng cao</li>
                  <li>Xây dựng 5 trường học và 2 trạm y tế tại các tỉnh miền núi phía Bắc</li>
                  <li>Tổ chức 15 chương trình khám chữa bệnh miễn phí cho người dân vùng cao</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Liên hệ</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>123 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <LinkIcon className="h-4 w-4 text-muted-foreground" />
                    <a href="#" className="text-blue-600 hover:underline">
                      anhsanghyvong.org
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>info@anhsanghyvong.org</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Chứng nhận</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    <Shield className="mr-1 h-3 w-3" />
                    <span>Đã xác minh danh tính</span>
                  </Badge>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    <Check className="mr-1 h-3 w-3" />
                    <span>Tổ chức phi lợi nhuận</span>
                  </Badge>
                  <Badge variant="outline" className="bg-purple-50 text-purple-700">
                    <Award className="mr-1 h-3 w-3" />
                    <span>Giải thưởng 2021</span>
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Add missing icons
function Mail(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function Check(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function Award(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  )
}

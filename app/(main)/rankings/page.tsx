import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Award, Gift, Star, TrendingUp, Users, Wallet } from "lucide-react"

export default function RankingsPage() {
  // Dữ liệu mẫu cho top người đóng góp
  const topDonors = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      username: "@nguyenvana",
      avatar: "/placeholder.svg?height=40&width=40",
      amount: "120.000.000 VNĐ",
      campaigns: 15,
      badge: "Nhà hảo tâm Vàng",
    },
    {
      id: 2,
      name: "Trần Thị B",
      username: "@tranthib",
      avatar: "/placeholder.svg?height=40&width=40",
      amount: "95.000.000 VNĐ",
      campaigns: 12,
      badge: "Nhà hảo tâm Bạc",
    },
    {
      id: 3,
      name: "Lê Văn C",
      username: "@levanc",
      avatar: "/placeholder.svg?height=40&width=40",
      amount: "78.500.000 VNĐ",
      campaigns: 10,
      badge: "Nhà hảo tâm Bạc",
    },
    {
      id: 4,
      name: "Phạm Thị D",
      username: "@phamthid",
      avatar: "/placeholder.svg?height=40&width=40",
      amount: "65.200.000 VNĐ",
      campaigns: 8,
      badge: "Nhà hảo tâm Đồng",
    },
    {
      id: 5,
      name: "Hoàng Văn E",
      username: "@hoangvane",
      avatar: "/placeholder.svg?height=40&width=40",
      amount: "52.800.000 VNĐ",
      campaigns: 7,
      badge: "Nhà hảo tâm Đồng",
    },
  ]

  // Dữ liệu mẫu cho top người uy tín
  const topTrusted = [
    {
      id: 1,
      name: "Trần Minh Hiếu",
      username: "@tranminhhieu",
      avatar: "/placeholder.svg?height=40&width=40",
      trustScore: 98,
      completedCampaigns: 12,
      verifiedStatus: "Đã xác minh",
    },
    {
      id: 2,
      name: "Nguyễn Thị Linh",
      username: "@nguyenthilinh",
      avatar: "/placeholder.svg?height=40&width=40",
      trustScore: 95,
      completedCampaigns: 10,
      verifiedStatus: "Đã xác minh",
    },
    {
      id: 3,
      name: "Lê Hoàng Nam",
      username: "@lehoangnam",
      avatar: "/placeholder.svg?height=40&width=40",
      trustScore: 92,
      completedCampaigns: 8,
      verifiedStatus: "Đã xác minh",
    },
    {
      id: 4,
      name: "Phạm Thị Hương",
      username: "@phamthihuong",
      avatar: "/placeholder.svg?height=40&width=40",
      trustScore: 90,
      completedCampaigns: 7,
      verifiedStatus: "Đã xác minh",
    },
    {
      id: 5,
      name: "Đỗ Văn Tùng",
      username: "@dovantung",
      avatar: "/placeholder.svg?height=40&width=40",
      trustScore: 88,
      completedCampaigns: 6,
      verifiedStatus: "Đã xác minh",
    },
  ]

  // Dữ liệu mẫu cho top chiến dịch
  const topCampaigns = [
    {
      id: 1,
      title: "Xây trường học cho trẻ em vùng cao",
      description: "Xây dựng 5 phòng học mới cho trường tiểu học xã Tả Phìn, Sa Pa",
      image: "/placeholder.svg?height=100&width=200",
      progress: 85,
      raised: "850.000.000 VNĐ",
      goal: "1.000.000.000 VNĐ",
      donors: 1245,
      category: "Giáo dục",
    },
    {
      id: 2,
      title: "Hỗ trợ y tế cho người già neo đơn",
      description: "Cung cấp dịch vụ khám chữa bệnh miễn phí cho 500 người già neo đơn",
      image: "/placeholder.svg?height=100&width=200",
      progress: 72,
      raised: "360.000.000 VNĐ",
      goal: "500.000.000 VNĐ",
      donors: 876,
      category: "Y tế",
    },
    {
      id: 3,
      title: "Trồng rừng phòng hộ đầu nguồn",
      description: "Trồng 10.000 cây xanh tại khu vực đầu nguồn sông Đà",
      image: "/placeholder.svg?height=100&width=200",
      progress: 68,
      raised: "204.000.000 VNĐ",
      goal: "300.000.000 VNĐ",
      donors: 632,
      category: "Môi trường",
    },
    {
      id: 4,
      title: "Học bổng cho học sinh nghèo vượt khó",
      description: "Trao 100 suất học bổng cho học sinh nghèo vượt khó",
      image: "/placeholder.svg?height=100&width=200",
      progress: 65,
      raised: "195.000.000 VNĐ",
      goal: "300.000.000 VNĐ",
      donors: 521,
      category: "Giáo dục",
    },
    {
      id: 5,
      title: "Xây dựng hệ thống nước sạch cho vùng hạn hán",
      description: "Xây dựng hệ thống cung cấp nước sạch cho 5 thôn tại huyện Ninh Thuận",
      image: "/placeholder.svg?height=100&width=200",
      progress: 60,
      raised: "420.000.000 VNĐ",
      goal: "700.000.000 VNĐ",
      donors: 489,
      category: "Cơ sở hạ tầng",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Bảng Xếp Hạng</h1>
            <p className="text-muted-foreground">
              Khám phá những người đóng góp hàng đầu, người dùng uy tín và chiến dịch nổi bật nhất trên nền tảng.
            </p>
          </div>
        </div>

        <Tabs defaultValue="donors" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="donors" className="flex items-center gap-2">
              <Gift className="h-4 w-4" />
              <span>Top Đóng Góp</span>
            </TabsTrigger>
            <TabsTrigger value="trusted" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              <span>Top Uy Tín</span>
            </TabsTrigger>
            <TabsTrigger value="campaigns" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span>Top Chiến Dịch</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab Top Đóng Góp */}
          <TabsContent value="donors">
            <div className="grid gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Gift className="h-5 w-5 text-green-600" />
                      <span>Top Người Đóng Góp</span>
                    </CardTitle>
                    <Badge className="bg-green-600">Tháng 5/2025</Badge>
                  </div>
                  <CardDescription>
                    Những người đã đóng góp nhiều nhất cho các chiến dịch từ thiện trên nền tảng
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {topDonors.map((donor, index) => (
                      <div
                        key={donor.id}
                        className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-700 font-bold">
                            {index + 1}
                          </div>
                          <Avatar className="h-12 w-12 border-2 border-green-200">
                            <AvatarImage src={donor.avatar || "/placeholder.svg"} alt={donor.name} />
                            <AvatarFallback>{donor.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">{donor.name}</span>
                              <Badge variant="outline" className="bg-amber-50 text-amber-700">
                                {donor.badge}
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground">{donor.username}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-green-600">{donor.amount}</div>
                          <div className="text-sm text-muted-foreground">{donor.campaigns} chiến dịch</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Xem tất cả người đóng góp
                  </Button>
                </CardFooter>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Thống kê đóng góp</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Tổng số người đóng góp</span>
                      </div>
                      <span className="text-sm font-medium">3,245</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Wallet className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Tổng số tiền đóng góp</span>
                      </div>
                      <span className="text-sm font-medium">5.2 tỷ VNĐ</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Award className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Đóng góp trung bình</span>
                      </div>
                      <span className="text-sm font-medium">1.6 triệu VNĐ</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Phân bổ đóng góp</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Giáo dục</span>
                        <span className="font-medium">42%</span>
                      </div>
                      <Progress value={42} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Y tế</span>
                        <span className="font-medium">25%</span>
                      </div>
                      <Progress value={25} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Môi trường</span>
                        <span className="font-medium">18%</span>
                      </div>
                      <Progress value={18} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Khác</span>
                        <span className="font-medium">15%</span>
                      </div>
                      <Progress value={15} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Tab Top Uy Tín */}
          <TabsContent value="trusted">
            <div className="grid gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Star className="h-5 w-5 text-amber-500" />
                      <span>Top Người Dùng Uy Tín</span>
                    </CardTitle>
                    <Badge className="bg-amber-500">Được xác minh</Badge>
                  </div>
                  <CardDescription>
                    Những người dùng có điểm uy tín cao nhất dựa trên hoạt động và đánh giá từ cộng đồng
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {topTrusted.map((user, index) => (
                      <div
                        key={user.id}
                        className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-700 font-bold">
                            {index + 1}
                          </div>
                          <Avatar className="h-12 w-12 border-2 border-amber-200">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">{user.name}</span>
                              <Badge variant="outline" className="bg-green-50 text-green-700">
                                {user.verifiedStatus}
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground">{user.username}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center justify-end gap-1 font-semibold text-amber-500">
                            <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                            <span>{user.trustScore}</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {user.completedCampaigns} chiến dịch hoàn thành
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Xem tất cả người dùng uy tín
                  </Button>
                </CardFooter>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Cách tính điểm uy tín</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Chiến dịch hoàn thành</span>
                      </div>
                      <span className="text-sm font-medium">+10 điểm/chiến dịch</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Đánh giá từ cộng đồng</span>
                      </div>
                      <span className="text-sm font-medium">+2 điểm/đánh giá</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Wallet className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Minh bạch tài chính</span>
                      </div>
                      <span className="text-sm font-medium">+5 điểm/báo cáo</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Lợi ích của điểm uy tín cao</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700">
                        1
                      </div>
                      <span className="text-sm">Ưu tiên hiển thị chiến dịch</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700">
                        2
                      </div>
                      <span className="text-sm">Huy hiệu xác minh đặc biệt</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700">
                        3
                      </div>
                      <span className="text-sm">Giảm phí giao dịch blockchain</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700">
                        4
                      </div>
                      <span className="text-sm">Khả năng gây quỹ cao hơn</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Tab Top Chiến Dịch */}
          <TabsContent value="campaigns">
            <div className="grid gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                      <span>Top Chiến Dịch Nổi Bật</span>
                    </CardTitle>
                    <Badge className="bg-blue-600">Tháng 5/2025</Badge>
                  </div>
                  <CardDescription>
                    Những chiến dịch từ thiện được đóng góp nhiều nhất và có tác động tích cực lớn nhất
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {topCampaigns.map((campaign, index) => (
                      <div
                        key={campaign.id}
                        className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold">
                            {index + 1}
                          </div>
                          <div className="h-16 w-20 rounded-md overflow-hidden border-2 border-blue-200">
                            <img
                              src={campaign.image || "/placeholder.svg"}
                              alt={campaign.title}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold line-clamp-1">{campaign.title}</span>
                              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                                {campaign.category}
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground line-clamp-2 mb-2">
                              {campaign.description}
                            </div>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                <span>{campaign.donors} người đóng góp</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                <span>{campaign.donors + 150} người quan tâm</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <TrendingUp className="h-3 w-3" />
                                <span>{campaign.progress}% hoàn thành</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right min-w-0 ml-4">
                          <div className="font-semibold text-blue-600">{campaign.raised}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Xem tất cả chiến dịch
                  </Button>
                </CardFooter>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Thống kê chiến dịch</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Tổng số chiến dịch</span>
                      </div>
                      <span className="text-sm font-medium">847</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Wallet className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Tổng tiền quyên góp</span>
                      </div>
                      <span className="text-sm font-medium">8.3 tỷ VNĐ</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Award className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Chiến dịch thành công</span>
                      </div>
                      <span className="text-sm font-medium">623 (73.6%)</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Phân bổ theo lĩnh vực</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Giáo dục</span>
                        <span className="font-medium">35%</span>
                      </div>
                      <Progress value={35} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Y tế</span>
                        <span className="font-medium">28%</span>
                      </div>
                      <Progress value={28} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Môi trường</span>
                        <span className="font-medium">22%</span>
                      </div>
                      <Progress value={22} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Cơ sở hạ tầng</span>
                        <span className="font-medium">15%</span>
                      </div>
                      <Progress value={15} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

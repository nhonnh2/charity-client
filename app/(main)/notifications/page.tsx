import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Bell, Check, Heart, MessageCircle, Settings, TrendingUp, Wallet } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function NotificationsPage() {
  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Thông báo</h1>
          <p className="text-muted-foreground">Cập nhật từ chiến dịch và tương tác</p>
        </div>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="all" className="flex gap-2">
              <Bell className="h-4 w-4" />
              <span>Tất cả</span>
            </TabsTrigger>
            <TabsTrigger value="campaigns" className="flex gap-2">
              <Wallet className="h-4 w-4" />
              <span>Chiến dịch</span>
            </TabsTrigger>
            <TabsTrigger value="mentions" className="flex gap-2">
              <MessageCircle className="h-4 w-4" />
              <span>Nhắc đến</span>
            </TabsTrigger>
            <TabsTrigger value="likes" className="flex gap-2">
              <Heart className="h-4 w-4" />
              <span>Lượt thích</span>
            </TabsTrigger>
          </TabsList>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Check className="h-4 w-4" />
            <span>Đánh dấu tất cả đã đọc</span>
          </Button>
        </div>

        <TabsContent value="all" className="mt-0 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Hôm nay</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-0">
              {/* Notification 1 - Campaign Update */}
              <div className="flex items-start gap-4 p-4 hover:bg-muted/50 transition-colors relative">
                <Badge className="absolute right-4 top-4 bg-blue-500 w-2 h-2 rounded-full p-0" />
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <Wallet className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Cập nhật chiến dịch</span>
                    <span className="text-xs text-muted-foreground">2 giờ trước</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Chiến dịch "Xây trường học cho trẻ em vùng cao" đã hoàn thành giai đoạn 1 và đang chờ xác nhận để
                    giải ngân giai đoạn 2.
                  </p>
                  <Button variant="link" className="h-auto p-0 text-sm mt-1">
                    Xem chi tiết
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Notification 2 - Donation */}
              <div className="flex items-start gap-4 p-4 hover:bg-muted/50 transition-colors">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <Wallet className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Đóng góp mới</span>
                    <span className="text-xs text-muted-foreground">3 giờ trước</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    <span className="font-medium">Nguyễn Văn B</span> đã đóng góp 2.000.000 VNĐ cho chiến dịch "Xây
                    trường học cho trẻ em vùng cao".
                  </p>
                  <Button variant="link" className="h-auto p-0 text-sm mt-1">
                    Gửi lời cảm ơn
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Notification 3 - Like */}
              <div className="flex items-start gap-4 p-4 hover:bg-muted/50 transition-colors">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                  <Heart className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Lượt thích mới</span>
                    <span className="text-xs text-muted-foreground">5 giờ trước</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    <span className="font-medium">Trần Thị C</span> và <span className="font-medium">5 người khác</span>{" "}
                    đã thích bài đăng của bạn về cập nhật chiến dịch.
                  </p>
                  <Button variant="link" className="h-auto p-0 text-sm mt-1">
                    Xem bài đăng
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Tuần trước</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-0">
              {/* Notification 4 - Mention */}
              <div className="flex items-start gap-4 p-4 hover:bg-muted/50 transition-colors">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Nhắc đến bạn</span>
                    <span className="text-xs text-muted-foreground">2 ngày trước</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    <span className="font-medium">Lê Văn D</span> đã nhắc đến bạn trong một bình luận: "Cảm ơn{" "}
                    <span className="text-blue-600">@nguyenvana</span> vì chiến dịch ý nghĩa này!"
                  </p>
                  <Button variant="link" className="h-auto p-0 text-sm mt-1">
                    Xem bình luận
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Notification 5 - Reputation */}
              <div className="flex items-start gap-4 p-4 hover:bg-muted/50 transition-colors">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Điểm uy tín tăng</span>
                    <span className="text-xs text-muted-foreground">3 ngày trước</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Điểm uy tín của bạn đã tăng 5 điểm sau khi hoàn thành giai đoạn 1 của chiến dịch "Xây trường học cho
                    trẻ em vùng cao".
                  </p>
                  <Button variant="link" className="h-auto p-0 text-sm mt-1">
                    Xem hồ sơ
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Notification 6 - Campaign Verification */}
              <div className="flex items-start gap-4 p-4 hover:bg-muted/50 transition-colors">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <Check className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Chiến dịch được xác minh</span>
                    <span className="text-xs text-muted-foreground">5 ngày trước</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Chiến dịch "Xây trường học cho trẻ em vùng cao" của bạn đã được xác minh và đã xuất hiện trong mục
                    chiến dịch nổi bật.
                  </p>
                  <Button variant="link" className="h-auto p-0 text-sm mt-1">
                    Xem chiến dịch
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns" className="mt-0">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Đang lọc thông báo</h3>
                <p className="text-muted-foreground mt-1 max-w-md">
                  Đang hiển thị thông báo liên quan đến chiến dịch. Bạn có thể thay đổi bộ lọc bất kỳ lúc nào.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mentions" className="mt-0">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Đang lọc thông báo</h3>
                <p className="text-muted-foreground mt-1 max-w-md">
                  Đang hiển thị thông báo liên quan đến nhắc đến. Bạn có thể thay đổi bộ lọc bất kỳ lúc nào.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="likes" className="mt-0">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Đang lọc thông báo</h3>
                <p className="text-muted-foreground mt-1 max-w-md">
                  Đang hiển thị thông báo liên quan đến lượt thích. Bạn có thể thay đổi bộ lọc bất kỳ lúc nào.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

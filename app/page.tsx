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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Heart,
  MessageCircle,
  Share2,
  TrendingUp,
  Users,
  Wallet,
  Search,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import CreatePost from '@/components/create-post';
import { CampaignCard } from '@/components/campaign-card';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {/* Main content - 3/4 width on desktop */}
        <div className="md:col-span-2 lg:col-span-3">
          <Tabs defaultValue="latest" className="w-full">
            <div className="flex items-center justify-between mb-2">
              <TabsList className="bg-muted/50">
                <TabsTrigger value="latest">Mới nhất</TabsTrigger>
                <TabsTrigger value="trending">Xu hướng</TabsTrigger>
                <TabsTrigger value="education">Giáo dục</TabsTrigger>
                <TabsTrigger value="health">Y tế</TabsTrigger>
                <TabsTrigger value="environment">Môi trường</TabsTrigger>
              </TabsList>
              <Link href="/campaigns/create">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Wallet className="mr-2 h-4 w-4" />
                  Tạo chiến dịch
                </Button>
              </Link>
            </div>

            <TabsContent value="latest" className="mt-6">
              {/* Create Post Component */}
              <CreatePost />

              {/* Post with campaign */}
              <Card className="mb-6 overflow-hidden border border-border/40 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="border-2 border-primary/10">
                        <AvatarImage
                          src="/placeholder.svg?height=40&width=40"
                          alt="Avatar"
                        />
                        <AvatarFallback className="bg-primary/5 text-primary">
                          TH
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold">Trần Hùng</span>
                          <Badge
                            variant="outline"
                            className="bg-primary/5 text-primary border-primary/20"
                          >
                            <TrendingUp className="mr-1 h-3 w-3" />
                            <span>Uy tín 85</span>
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          2 giờ trước
                        </p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p>
                      Hôm nay chúng tôi đã hoàn thành giai đoạn 1 của chiến dịch
                      "Xây trường học cho trẻ em vùng cao". Cảm ơn tất cả mọi
                      người đã đóng góp và ủng hộ!
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <img
                        src="/placeholder.svg?height=200&width=300"
                        alt="Hình ảnh xây dựng"
                        className="rounded-lg object-cover h-48 w-full"
                      />
                      <img
                        src="/placeholder.svg?height=200&width=300"
                        alt="Hình ảnh xây dựng"
                        className="rounded-lg object-cover h-48 w-full"
                      />
                    </div>

                    <CampaignCard
                      id="1"
                      title="Xây trường học cho trẻ em vùng cao"
                      description="Giai đoạn 1/3 - Hoàn thành móng và khung"
                      phase="Hoàn thành móng và khung"
                      currentPhase={1}
                      totalPhases={3}
                      raised={35000000}
                      goal={100000000}
                      progress={35}
                      colorScheme="gradient"
                    />
                  </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-3 bg-muted/20">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-6">
                      <button className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors">
                        <Heart className="h-4 w-4" />
                        <span className="text-xs">128</span>
                      </button>
                      <button className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors">
                        <MessageCircle className="h-4 w-4" />
                        <span className="text-xs">24</span>
                      </button>
                      <button className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors">
                        <Share2 className="h-4 w-4" />
                        <span className="text-xs">Chia sẻ</span>
                      </button>
                    </div>
                    <Link
                      href="/campaigns/1"
                      className="text-xs text-primary hover:text-primary/80 hover:underline transition-colors"
                    >
                      Xem chi tiết chiến dịch
                    </Link>
                  </div>
                </CardFooter>
              </Card>

              {/* Regular post */}
              <Card className="mb-6 overflow-hidden border border-border/40 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="border-2 border-accent/10">
                        <AvatarImage
                          src="/placeholder.svg?height=40&width=40"
                          alt="Avatar"
                        />
                        <AvatarFallback className="bg-accent/5 text-accent">
                          NL
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold">Nguyễn Linh</span>
                          <Badge
                            variant="outline"
                            className="bg-accent/5 text-accent border-accent/20"
                          >
                            <TrendingUp className="mr-1 h-3 w-3" />
                            <span>Uy tín 92</span>
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          5 giờ trước
                        </p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p>
                      Chúng tôi vừa tổ chức buổi phát quà cho 200 trẻ em có hoàn
                      cảnh khó khăn tại Hà Giang. Niềm vui của các em là động
                      lực lớn nhất cho chúng tôi!
                    </p>
                    <img
                      src="/placeholder.svg?height=300&width=600"
                      alt="Hình ảnh phát quà"
                      className="rounded-lg object-cover w-full h-64"
                    />
                  </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-3 bg-muted/20">
                  <div className="flex items-center space-x-6">
                    <button className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors">
                      <Heart className="h-4 w-4" />
                      <span className="text-xs">256</span>
                    </button>
                    <button className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors">
                      <MessageCircle className="h-4 w-4" />
                      <span className="text-xs">42</span>
                    </button>
                    <button className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors">
                      <Share2 className="h-4 w-4" />
                      <span className="text-xs">Chia sẻ</span>
                    </button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="trending">
              <div className="py-10 text-center text-muted-foreground">
                Nội dung xu hướng sẽ hiển thị ở đây
              </div>
            </TabsContent>

            <TabsContent value="education">
              <div className="py-10 text-center text-muted-foreground">
                Nội dung giáo dục sẽ hiển thị ở đây
              </div>
            </TabsContent>

            <TabsContent value="health">
              <div className="py-10 text-center text-muted-foreground">
                Nội dung y tế sẽ hiển thị ở đây
              </div>
            </TabsContent>

            <TabsContent value="environment">
              <div className="py-10 text-center text-muted-foreground">
                Nội dung môi trường sẽ hiển thị ở đây
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar - 1/4 width on desktop */}
        <div className="space-y-6">
          {/* Thanh tìm kiếm */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm chiến dịch, người dùng..."
              className="pl-10 bg-background"
            />
          </div>

          <Card className="border border-border/40 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-foreground">
                Chiến dịch nổi bật
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3].map((i) => (
                <CampaignCard
                  key={i}
                  id={i}
                  title={`Chiến dịch từ thiện ${i}`}
                  description={`Mô tả chiến dịch ${i}`}
                  raised={(50 + i * 10) * 1000000}
                  goal={100000000}
                  progress={50 + i * 10}
                  variant="compact"
                  colorScheme={
                    i === 1 ? 'primary' : i === 2 ? 'accent' : 'gradient'
                  }
                />
              ))}
              <Button
                variant="outline"
                className="w-full hover:bg-primary/5 hover:text-primary transition-colors"
              >
                Xem tất cả chiến dịch
              </Button>
            </CardContent>
          </Card>

          <Card className="border border-border/40 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-foreground">
                Cộng đồng hoạt động
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-sm">Thành viên tích cực</span>
                </div>
                <span className="text-sm font-medium">1,245</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-accent" />
                  <span className="text-sm">Chiến dịch thành công</span>
                </div>
                <span className="text-sm font-medium">87</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Wallet className="h-4 w-4 text-primary" />
                  <span className="text-sm">Tổng quyên góp</span>
                </div>
                <span className="text-sm font-medium">2.5 tỷ VNĐ</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

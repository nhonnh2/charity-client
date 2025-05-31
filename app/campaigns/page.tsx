import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, Search, TrendingUp, Wallet } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CampaignsPage() {
  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Danh sách chiến dịch</h1>
          <p className="text-muted-foreground">Khám phá và đóng góp cho các chiến dịch từ thiện minh bạch</p>
        </div>
        <Link href="/campaigns/create">
          <Button className="bg-green-600 hover:bg-green-700">
            <Wallet className="mr-2 h-4 w-4" />
            Tạo chiến dịch mới
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {/* Filters - 1/4 width on desktop */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Bộ lọc</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Tìm kiếm</label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Tìm chiến dịch..." className="pl-8" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Danh mục</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Tất cả danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả danh mục</SelectItem>
                    <SelectItem value="education">Giáo dục</SelectItem>
                    <SelectItem value="health">Y tế</SelectItem>
                    <SelectItem value="environment">Môi trường</SelectItem>
                    <SelectItem value="disaster">Thiên tai</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Trạng thái</label>
                <Select defaultValue="active">
                  <SelectTrigger>
                    <SelectValue placeholder="Đang diễn ra" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Đang diễn ra</SelectItem>
                    <SelectItem value="completed">Đã hoàn thành</SelectItem>
                    <SelectItem value="all">Tất cả</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Sắp xếp theo</label>
                <Select defaultValue="newest">
                  <SelectTrigger>
                    <SelectValue placeholder="Mới nhất" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Mới nhất</SelectItem>
                    <SelectItem value="popular">Phổ biến nhất</SelectItem>
                    <SelectItem value="ending-soon">Sắp kết thúc</SelectItem>
                    <SelectItem value="most-funded">Quyên góp nhiều nhất</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button variant="outline" className="w-full">
                Áp dụng bộ lọc
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Thống kê</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Tổng số chiến dịch</span>
                <span className="font-medium">124</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Đang diễn ra</span>
                <span className="font-medium">78</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Đã hoàn thành</span>
                <span className="font-medium">46</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Tổng quyên góp</span>
                <span className="font-medium">2.5 tỷ VNĐ</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Campaign list - 3/4 width on desktop */}
        <div className="md:col-span-3">
          <Tabs defaultValue="grid" className="w-full">
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="grid">Lưới</TabsTrigger>
                <TabsTrigger value="list">Danh sách</TabsTrigger>
              </TabsList>
              <span className="text-sm text-muted-foreground">Hiển thị 1-9 trong số 78 chiến dịch</span>
            </div>

            <TabsContent value="grid" className="mt-0">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <img
                      src={`/placeholder.svg?height=200&width=400&text=Campaign${i}`}
                      alt={`Chiến dịch ${i}`}
                      className="h-48 w-full object-cover"
                    />
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700">
                          {i % 3 === 0 ? "Y tế" : i % 3 === 1 ? "Giáo dục" : "Môi trường"}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{10 + i} ngày còn lại</span>
                        </div>
                      </div>
                      <CardTitle className="line-clamp-2 text-base">
                        Chiến dịch từ thiện {i}:{" "}
                        {i % 3 === 0
                          ? "Hỗ trợ y tế vùng cao"
                          : i % 3 === 1
                            ? "Xây trường học"
                            : "Trồng rừng phủ xanh đồi trọc"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-3 pt-0">
                      <div className="mb-4 flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="/placeholder.svg?height=30&width=30" alt="Avatar" />
                          <AvatarFallback>U{i}</AvatarFallback>
                        </Avatar>
                        <div className="flex items-center space-x-1">
                          <span className="text-xs">Người tạo {i}</span>
                          <Badge variant="outline" className="h-5 px-1 text-xs">
                            <TrendingUp className="mr-1 h-3 w-3" />
                            <span>{70 + i}</span>
                          </Badge>
                        </div>
                      </div>
                      <Progress value={30 + i * 10} className="h-2 mb-2" />
                      <div className="flex justify-between text-sm">
                        <span>{(30 + i * 10) * 1000000} VNĐ</span>
                        <span className="text-muted-foreground">/ 100.000.000 VNĐ</span>
                      </div>
                    </CardContent>
                    <CardFooter className="grid grid-cols-2 gap-2 pt-0">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/campaigns/${i}`}>Chi tiết</Link>
                      </Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Đóng góp
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="list" className="mt-0">
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <img
                        src={`/placeholder.svg?height=200&width=300&text=Campaign${i}`}
                        alt={`Chiến dịch ${i}`}
                        className="h-48 md:h-auto md:w-1/4 object-cover"
                      />
                      <div className="flex-1 p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <Badge variant="outline" className="bg-blue-50 text-blue-700">
                            {i % 3 === 0 ? "Y tế" : i % 3 === 1 ? "Giáo dục" : "Môi trường"}
                          </Badge>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">Bắt đầu: 01/05/2023</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">{10 + i} ngày còn lại</span>
                            </div>
                          </div>
                        </div>
                        <h3 className="mb-2 text-lg font-semibold">
                          Chiến dịch từ thiện {i}:{" "}
                          {i % 3 === 0
                            ? "Hỗ trợ y tế vùng cao"
                            : i % 3 === 1
                              ? "Xây trường học"
                              : "Trồng rừng phủ xanh đồi trọc"}
                        </h3>
                        <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                          Mô tả ngắn về chiến dịch từ thiện {i}. Đây là một chiến dịch nhằm{" "}
                          {i % 3 === 0
                            ? "hỗ trợ y tế cho người dân vùng cao"
                            : i % 3 === 1
                              ? "xây dựng trường học cho trẻ em vùng khó khăn"
                              : "trồng rừng và phục hồi môi trường sinh thái"}
                          .
                        </p>
                        <div className="mb-2 flex items-center space-x-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="/placeholder.svg?height=30&width=30" alt="Avatar" />
                            <AvatarFallback>U{i}</AvatarFallback>
                          </Avatar>
                          <div className="flex items-center space-x-1">
                            <span className="text-xs">Người tạo {i}</span>
                            <Badge variant="outline" className="h-5 px-1 text-xs">
                              <TrendingUp className="mr-1 h-3 w-3" />
                              <span>{70 + i}</span>
                            </Badge>
                          </div>
                        </div>
                        <Progress value={30 + i * 10} className="h-2 mb-2" />
                        <div className="mb-4 flex justify-between text-sm">
                          <span>{(30 + i * 10) * 1000000} VNĐ</span>
                          <span className="text-muted-foreground">/ 100.000.000 VNĐ</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" asChild className="flex-1">
                            <Link href={`/campaigns/${i}`}>Chi tiết</Link>
                          </Button>
                          <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                            Đóng góp
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex items-center justify-between">
            <Button variant="outline" size="sm" disabled>
              Trang trước
            </Button>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-blue-50">
                1
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                2
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                3
              </Button>
              <span>...</span>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                8
              </Button>
            </div>
            <Button variant="outline" size="sm">
              Trang sau
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

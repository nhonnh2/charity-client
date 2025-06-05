"use client"

import type React from "react"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  AlertCircle,
  Bell,
  Camera,
  Check,
  CreditCard,
  ExternalLink,
  Globe,
  HelpCircle,
  Info,
  Key,
  LanguagesIcon,
  Lock,
  LogOut,
  Moon,
  Shield,
  Sun,
  Trash2,
  Upload,
  User,
  Wallet,
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function SettingsPage() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Cài đặt</h1>
        <p className="text-muted-foreground">Quản lý tài khoản và tùy chọn của bạn</p>
      </div>

      <Tabs defaultValue="account" className="w-full">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-64 flex-shrink-0">
            <TabsList className="flex flex-col h-auto p-0 bg-transparent space-y-1">
              <TabsTrigger
                value="account"
                className="w-full justify-start px-3 py-2 h-9 font-normal data-[state=active]:font-medium"
              >
                <User className="h-4 w-4 mr-2" />
                Tài khoản
              </TabsTrigger>
              <TabsTrigger
                value="profile"
                className="w-full justify-start px-3 py-2 h-9 font-normal data-[state=active]:font-medium"
              >
                <User className="h-4 w-4 mr-2" />
                Hồ sơ
              </TabsTrigger>
              <TabsTrigger
                value="appearance"
                className="w-full justify-start px-3 py-2 h-9 font-normal data-[state=active]:font-medium"
              >
                <Sun className="h-4 w-4 mr-2" />
                Giao diện
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="w-full justify-start px-3 py-2 h-9 font-normal data-[state=active]:font-medium"
              >
                <Bell className="h-4 w-4 mr-2" />
                Thông báo
              </TabsTrigger>
              <TabsTrigger
                value="privacy"
                className="w-full justify-start px-3 py-2 h-9 font-normal data-[state=active]:font-medium"
              >
                <Lock className="h-4 w-4 mr-2" />
                Quyền riêng tư
              </TabsTrigger>
              <TabsTrigger
                value="wallet"
                className="w-full justify-start px-3 py-2 h-9 font-normal data-[state=active]:font-medium"
              >
                <Wallet className="h-4 w-4 mr-2" />
                Ví blockchain
              </TabsTrigger>
              <TabsTrigger
                value="language"
                className="w-full justify-start px-3 py-2 h-9 font-normal data-[state=active]:font-medium"
              >
                <Globe className="h-4 w-4 mr-2" />
                Ngôn ngữ
              </TabsTrigger>
              <Separator className="my-2" />
              <TabsTrigger
                value="help"
                className="w-full justify-start px-3 py-2 h-9 font-normal data-[state=active]:font-medium"
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                Trợ giúp & Hỗ trợ
              </TabsTrigger>
            </TabsList>
            <div className="mt-4">
              <Button variant="destructive" className="w-full justify-start" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Đăng xuất
              </Button>
            </div>
          </div>
          <div className="flex-1">
            <TabsContent value="account" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin tài khoản</CardTitle>
                  <CardDescription>Quản lý thông tin tài khoản và thay đổi mật khẩu của bạn</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" value="nguyenvana@example.com" readOnly />
                      <p className="text-sm text-muted-foreground">
                        Email của bạn đã được xác minh <Check className="inline h-3 w-3 text-green-500" />
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username">Tên người dùng</Label>
                      <Input id="username" value="nguyenvana" />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Thay đổi mật khẩu</h3>
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Mật khẩu hiện tại</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">Mật khẩu mới</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Xác nhận mật khẩu mới</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Xác minh danh tính</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Trạng thái xác minh</p>
                        <p className="text-sm text-muted-foreground">
                          Danh tính của bạn đã được xác minh <Check className="inline h-3 w-3 text-green-500" />
                        </p>
                      </div>
                      <Button variant="outline">Xem chi tiết</Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-destructive">Xóa tài khoản</h3>
                    <p className="text-sm text-muted-foreground">
                      Khi bạn xóa tài khoản, tất cả dữ liệu của bạn sẽ bị xóa vĩnh viễn. Hành động này không thể hoàn
                      tác.
                    </p>
                    <Button variant="destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Xóa tài khoản
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t px-6 py-4">
                  <Button variant="ghost">Hủy</Button>
                  <Button>Lưu thay đổi</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="profile" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Hồ sơ công khai</CardTitle>
                  <CardDescription>Thông tin này sẽ được hiển thị công khai trên trang hồ sơ của bạn</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Avatar" />
                        <AvatarFallback>NVA</AvatarFallback>
                      </Avatar>
                      <div className="space-y-2">
                        <h3 className="font-medium">Ảnh đại diện</h3>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Upload className="mr-2 h-4 w-4" />
                            Tải lên
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Xóa
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Ảnh bìa</Label>
                      <div className="relative h-48 w-full rounded-lg border-2 border-dashed border-muted-foreground/25 p-2">
                        <img
                          src="/placeholder.svg?height=200&width=800&text=Cover+Image"
                          alt="Cover"
                          className="h-full w-full object-cover rounded-md"
                        />
                        <div className="absolute bottom-4 right-4">
                          <Button size="sm" className="bg-background/80 backdrop-blur-sm">
                            <Camera className="mr-2 h-4 w-4" />
                            Thay đổi
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="name">Tên hiển thị</Label>
                      <Input id="name" value="Nguyễn Văn A" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Tiểu sử</Label>
                      <Textarea
                        id="bio"
                        rows={4}
                        defaultValue="Người sáng lập tổ chức phi lợi nhuận Ánh Sáng Hy Vọng, hoạt động trong lĩnh vực giáo dục và hỗ trợ trẻ em vùng cao từ năm 2018."
                      />
                      <p className="text-sm text-muted-foreground">Tối đa 200 ký tự</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Vị trí</Label>
                      <Input id="location" placeholder="Thành phố, Quốc gia" defaultValue="Hà Nội, Việt Nam" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input id="website" placeholder="https://example.com" defaultValue="anhsanghyvong.org" />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Liên kết mạng xã hội</h3>
                    <div className="space-y-2">
                      <Label htmlFor="facebook">Facebook</Label>
                      <Input id="facebook" placeholder="https://facebook.com/username" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="twitter">Twitter</Label>
                      <Input id="twitter" placeholder="https://twitter.com/username" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="instagram">Instagram</Label>
                      <Input id="instagram" placeholder="https://instagram.com/username" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t px-6 py-4">
                  <Button variant="ghost">Hủy</Button>
                  <Button>Lưu thay đổi</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="appearance" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Giao diện</CardTitle>
                  <CardDescription>Tùy chỉnh giao diện và trải nghiệm người dùng</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Chế độ tối</Label>
                        <p className="text-sm text-muted-foreground">Chuyển đổi giữa chế độ sáng và tối</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Sun className="h-5 w-5 text-muted-foreground" />
                        <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} aria-label="Toggle dark mode" />
                        <Moon className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label className="text-base">Màu chủ đạo</Label>
                      <div className="grid grid-cols-5 gap-2">
                        <div className="flex flex-col items-center gap-1">
                          <div className="h-10 w-10 rounded-full bg-green-600 ring-2 ring-offset-2 ring-green-600"></div>
                          <span className="text-xs">Xanh lá</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="h-10 w-10 rounded-full bg-blue-600"></div>
                          <span className="text-xs">Xanh dương</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="h-10 w-10 rounded-full bg-purple-600"></div>
                          <span className="text-xs">Tím</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="h-10 w-10 rounded-full bg-red-600"></div>
                          <span className="text-xs">Đỏ</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="h-10 w-10 rounded-full bg-orange-600"></div>
                          <span className="text-xs">Cam</span>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label className="text-base">Cỡ chữ</Label>
                      <Select defaultValue="medium">
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn cỡ chữ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Nhỏ</SelectItem>
                          <SelectItem value="medium">Vừa</SelectItem>
                          <SelectItem value="large">Lớn</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label className="text-base">Hiệu ứng chuyển động</Label>
                      <div className="flex items-center space-x-2">
                        <Switch id="animations" defaultChecked />
                        <Label htmlFor="animations">Bật hiệu ứng chuyển động</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Hiệu ứng chuyển động có thể gây khó chịu cho một số người dùng
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t px-6 py-4">
                  <Button variant="ghost">Đặt lại mặc định</Button>
                  <Button>Lưu thay đổi</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Thông báo</CardTitle>
                  <CardDescription>Quản lý cách bạn nhận thông báo</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Thông báo qua email</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="email-campaigns" className="flex-1">
                          Cập nhật chiến dịch
                          <p className="font-normal text-sm text-muted-foreground">
                            Nhận thông báo khi có cập nhật về chiến dịch bạn đã đóng góp
                          </p>
                        </Label>
                        <Switch id="email-campaigns" defaultChecked />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="email-donations" className="flex-1">
                          Đóng góp mới
                          <p className="font-normal text-sm text-muted-foreground">
                            Nhận thông báo khi có người đóng góp cho chiến dịch của bạn
                          </p>
                        </Label>
                        <Switch id="email-donations" defaultChecked />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="email-mentions" className="flex-1">
                          Nhắc đến
                          <p className="font-normal text-sm text-muted-foreground">
                            Nhận thông báo khi có người nhắc đến bạn trong bình luận
                          </p>
                        </Label>
                        <Switch id="email-mentions" defaultChecked />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="email-marketing" className="flex-1">
                          Tin tức và cập nhật
                          <p className="font-normal text-sm text-muted-foreground">
                            Nhận thông tin về tính năng mới và cập nhật từ TrustCharity
                          </p>
                        </Label>
                        <Switch id="email-marketing" />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium">Thông báo trong ứng dụng</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="push-all" className="flex-1">
                          Tất cả thông báo
                          <p className="font-normal text-sm text-muted-foreground">
                            Bật/tắt tất cả thông báo trong ứng dụng
                          </p>
                        </Label>
                        <Switch id="push-all" defaultChecked />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="push-mentions" className="flex-1">
                          Nhắc đến và bình luận
                          <p className="font-normal text-sm text-muted-foreground">
                            Nhận thông báo khi có người nhắc đến hoặc bình luận về bài đăng của bạn
                          </p>
                        </Label>
                        <Switch id="push-mentions" defaultChecked />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="push-donations" className="flex-1">
                          Đóng góp
                          <p className="font-normal text-sm text-muted-foreground">
                            Nhận thông báo khi có người đóng góp cho chiến dịch của bạn
                          </p>
                        </Label>
                        <Switch id="push-donations" defaultChecked />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="push-messages" className="flex-1">
                          Tin nhắn
                          <p className="font-normal text-sm text-muted-foreground">
                            Nhận thông báo khi có tin nhắn mới
                          </p>
                        </Label>
                        <Switch id="push-messages" defaultChecked />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t px-6 py-4">
                  <Button variant="ghost">Đặt lại mặc định</Button>
                  <Button>Lưu thay đổi</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="privacy" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Quyền riêng tư</CardTitle>
                  <CardDescription>Quản lý cài đặt quyền riêng tư và bảo mật</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Quyền riêng tư tài khoản</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="private-profile" className="flex-1">
                          Hồ sơ riêng tư
                          <p className="font-normal text-sm text-muted-foreground">
                            Chỉ những người bạn cho phép mới có thể xem hồ sơ của bạn
                          </p>
                        </Label>
                        <Switch id="private-profile" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="show-donations" className="flex-1">
                          Hiển thị đóng góp
                          <p className="font-normal text-sm text-muted-foreground">
                            Cho phép người khác xem lịch sử đóng góp của bạn
                          </p>
                        </Label>
                        <Switch id="show-donations" defaultChecked />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="show-reputation" className="flex-1">
                          Hiển thị điểm uy tín
                          <p className="font-normal text-sm text-muted-foreground">
                            Cho phép người khác xem điểm uy tín của bạn
                          </p>
                        </Label>
                        <Switch id="show-reputation" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium">Bảo mật</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="two-factor" className="flex-1">
                          Xác thực hai yếu tố
                          <p className="font-normal text-sm text-muted-foreground">
                            Thêm một lớp bảo mật bổ sung cho tài khoản của bạn
                          </p>
                        </Label>
                        <Switch id="two-factor" />
                      </div>
                    </div>
                    <Button variant="outline" className="flex items-center gap-1">
                      <Key className="h-4 w-4" />
                      <span>Thiết lập xác thực hai yếu tố</span>
                    </Button>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium">Dữ liệu và quyền riêng tư</h3>
                    <div className="space-y-2">
                      <Button variant="outline" className="flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        <span>Tải xuống dữ liệu của bạn</span>
                      </Button>
                      <p className="text-sm text-muted-foreground">
                        Tải xuống một bản sao dữ liệu mà chúng tôi có về bạn
                      </p>
                    </div>
                  </div>

                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Cảnh báo</AlertTitle>
                    <AlertDescription>
                      Thay đổi cài đặt quyền riêng tư có thể ảnh hưởng đến cách người khác tương tác với bạn và chiến
                      dịch của bạn.
                    </AlertDescription>
                  </Alert>
                </CardContent>
                <CardFooter className="flex justify-between border-t px-6 py-4">
                  <Button variant="ghost">Đặt lại mặc định</Button>
                  <Button>Lưu thay đổi</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="wallet" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Ví blockchain</CardTitle>
                  <CardDescription>Quản lý ví blockchain và giao dịch của bạn</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Alert className="bg-blue-50 text-blue-800 border-blue-200">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Thông tin</AlertTitle>
                    <AlertDescription>
                      Kết nối ví blockchain để nhận và gửi tiền quyên góp. Chúng tôi sử dụng mạng Polygon để giảm phí
                      giao dịch.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-4">
                    <h3 className="font-medium">Ví đã kết nối</h3>
                    <Card className="bg-muted/50">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                              <Wallet className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-medium">MetaMask</h4>
                              <p className="text-xs text-muted-foreground">0x1a2...3b4c</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Đã kết nối</Badge>
                            <Button variant="ghost" size="icon">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="space-y-2">
                      <Label className="text-base">Kết nối ví khác</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="bg-muted/50">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                                  <CreditCard className="h-5 w-5" />
                                </div>
                                <div>
                                  <h4 className="font-medium">Coinbase Wallet</h4>
                                </div>
                              </div>
                              <Button size="sm">Kết nối</Button>
                            </div>
                          </CardContent>
                        </Card>
                        <Card className="bg-muted/50">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                                  <Wallet className="h-5 w-5" />
                                </div>
                                <div>
                                  <h4 className="font-medium">WalletConnect</h4>
                                </div>
                              </div>
                              <Button size="sm">Kết nối</Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium">Giao dịch gần đây</h3>
                    <div className="space-y-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between py-2">
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                                i % 2 === 0 ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
                              }`}
                            >
                              {i % 2 === 0 ? (
                                <ArrowUpRight className="h-4 w-4" />
                              ) : (
                                <ArrowDownLeft className="h-4 w-4" />
                              )}
                            </div>
                            <div>
                              <h4 className="text-sm font-medium">{i % 2 === 0 ? "Đóng góp đi" : "Đóng góp đến"}</h4>
                              <p className="text-xs text-muted-foreground">
                                {new Date(2023, 4, 10 + i).toLocaleDateString()}
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
                    </div>
                    <Button variant="outline" className="w-full">
                      Xem tất cả giao dịch
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t px-6 py-4">
                  <Button variant="ghost">Ngắt kết nối tất cả</Button>
                  <Button>Lưu thay đổi</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="language" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Ngôn ngữ và khu vực</CardTitle>
                  <CardDescription>Quản lý cài đặt ngôn ngữ và khu vực</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="language">Ngôn ngữ</Label>
                      <Select defaultValue="vi">
                        <SelectTrigger id="language">
                          <SelectValue placeholder="Chọn ngôn ngữ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vi">Tiếng Việt</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="fr">Français</SelectItem>
                          <SelectItem value="de">Deutsch</SelectItem>
                          <SelectItem value="es">Español</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="region">Khu vực</Label>
                      <Select defaultValue="vn">
                        <SelectTrigger id="region">
                          <SelectValue placeholder="Chọn khu vực" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vn">Việt Nam</SelectItem>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                          <SelectItem value="au">Australia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="currency">Đơn vị tiền tệ</Label>
                      <Select defaultValue="vnd">
                        <SelectTrigger id="currency">
                          <SelectValue placeholder="Chọn đơn vị tiền tệ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vnd">VNĐ - Việt Nam Đồng</SelectItem>
                          <SelectItem value="usd">USD - US Dollar</SelectItem>
                          <SelectItem value="eur">EUR - Euro</SelectItem>
                          <SelectItem value="gbp">GBP - British Pound</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="date-format">Định dạng ngày</Label>
                      <Select defaultValue="dd/mm/yyyy">
                        <SelectTrigger id="date-format">
                          <SelectValue placeholder="Chọn định dạng ngày" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                          <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                          <SelectItem value="yyyy/mm/dd">YYYY/MM/DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Alert>
                    <LanguagesIcon className="h-4 w-4" />
                    <AlertTitle>Dịch tự động</AlertTitle>
                    <AlertDescription>
                      Bạn có thể bật tính năng dịch tự động để xem nội dung bằng ngôn ngữ ưa thích của mình.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="auto-translate" className="flex-1">
                        Dịch tự động
                        <p className="font-normal text-sm text-muted-foreground">
                          Tự động dịch nội dung sang ngôn ngữ ưa thích của bạn
                        </p>
                      </Label>
                      <Switch id="auto-translate" defaultChecked />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t px-6 py-4">
                  <Button variant="ghost">Đặt lại mặc định</Button>
                  <Button>Lưu thay đổi</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="help" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Trợ giúp & Hỗ trợ</CardTitle>
                  <CardDescription>Tìm câu trả lời cho câu hỏi của bạn</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Tìm kiếm câu hỏi..." className="pl-8" />
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium">Câu hỏi thường gặp</h3>
                      <div className="space-y-2">
                        <div className="rounded-lg border p-4">
                          <h4 className="font-medium">Làm sao để tạo chiến dịch từ thiện?</h4>
                          <p className="mt-1 text-sm text-muted-foreground">
                            Để tạo chiến dịch, bạn cần đăng ký tài khoản, xác minh danh tính qua KYC, sau đó nhấp vào
                            nút "Tạo chiến dịch" và điền đầy đủ thông tin theo hướng dẫn.
                          </p>
                        </div>
                        <div className="rounded-lg border p-4">
                          <h4 className="font-medium">Làm sao để biết tiền quyên góp được sử dụng đúng mục đích?</h4>
                          <p className="mt-1 text-sm text-muted-foreground">
                            Mọi giao dịch đều được ghi lại trên blockchain và có thể kiểm tra. Ngoài ra, tiền quyên góp
                            được giải ngân theo từng giai đoạn, và người tạo chiến dịch phải cung cấp bằng chứng chi
                            tiêu.
                          </p>
                        </div>
                        <div className="rounded-lg border p-4">
                          <h4 className="font-medium">Nền tảng có thu phí không?</h4>
                          <p className="mt-1 text-sm text-muted-foreground">
                            TrustCharity thu 2.5% phí trên mỗi giao dịch thành công để duy trì nền tảng và phát triển
                            các tính năng mới. Phí này thấp hơn nhiều so với các nền tảng gây quỹ truyền thống.
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">
                        Xem tất cả câu hỏi
                      </Button>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="font-medium">Liên hệ hỗ trợ</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="bg-muted/50">
                          <CardContent className="p-4">
                            <div className="flex flex-col items-center text-center space-y-2 py-2">
                              <Mail className="h-8 w-8 text-blue-600" />
                              <h4 className="font-medium">Email hỗ trợ</h4>
                              <p className="text-sm text-muted-foreground">
                                Gửi email cho chúng tôi và nhận phản hồi trong vòng 24 giờ
                              </p>
                              <Button variant="outline" size="sm">
                                support@trustcharity.vn
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                        <Card className="bg-muted/50">
                          <CardContent className="p-4">
                            <div className="flex flex-col items-center text-center space-y-2 py-2">
                              <MessageCircle className="h-8 w-8 text-green-600" />
                              <h4 className="font-medium">Chat trực tuyến</h4>
                              <p className="text-sm text-muted-foreground">
                                Chat với đội ngũ hỗ trợ của chúng tôi trong giờ làm việc
                              </p>
                              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                Bắt đầu chat
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="font-medium">Tài liệu hướng dẫn</h3>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-start">
                          <FileText className="mr-2 h-4 w-4" />
                          Hướng dẫn sử dụng
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Shield className="mr-2 h-4 w-4" />
                          Chính sách bảo mật
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <FileText className="mr-2 h-4 w-4" />
                          Điều khoản sử dụng
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  )
}

// Add missing icons
function Download(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  )
}

function ArrowUpRight(props: React.SVGProps<SVGSVGElement>) {
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
      <line x1="7" x2="17" y1="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  )
}

function ArrowDownLeft(props: React.SVGProps<SVGSVGElement>) {
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
      <line x1="17" x2="7" y1="7" y2="17" />
      <polyline points="17 17 7 17 7 7" />
    </svg>
  )
}

function Search(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

function FileText(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  )
}

function MessageCircle(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  )
}

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

function LanguagesIconSvg(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="m5 8 6 6" />
      <path d="m4 14 6-6 2-3" />
      <path d="M2 5h12" />
      <path d="M7 2h1" />
      <path d="m22 22-5-10-5 10" />
      <path d="M14 18h6" />
    </svg>
  )
}

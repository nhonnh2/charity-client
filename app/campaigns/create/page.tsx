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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  AlertCircle,
  Calendar,
  ChevronRight,
  Copy,
  FileText,
  HelpCircle,
  ImageIcon,
  Info,
  Plus,
  Trash2,
  Upload,
  Wallet,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function CreateCampaignPage() {
  const [activeStep, setActiveStep] = useState(1);
  const [phases, setPhases] = useState([
    {
      id: 1,
      title: 'Hoàn thành móng và khung',
      description:
        'Đào móng, đổ bê tông và xây dựng khung chính của trường học.',
      budget: 30000000,
      duration: '30 ngày',
    },
    {
      id: 2,
      title: 'Xây tường và mái',
      description:
        'Xây tường, lắp đặt cửa sổ, cửa ra vào và hoàn thiện mái nhà.',
      budget: 40000000,
      duration: '30 ngày',
    },
    {
      id: 3,
      title: 'Hoàn thiện và trang thiết bị',
      description:
        'Hoàn thiện nội thất, lắp đặt bàn ghế, bảng, và các thiết bị học tập cơ bản.',
      budget: 30000000,
      duration: '30 ngày',
    },
  ]);

  const addPhase = () => {
    const newId =
      phases.length > 0 ? Math.max(...phases.map((p) => p.id)) + 1 : 1;
    setPhases([
      ...phases,
      { id: newId, title: '', description: '', budget: 0, duration: '' },
    ]);
  };

  const removePhase = (id: number) => {
    setPhases(phases.filter((phase) => phase.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">
          Tạo chiến dịch mới
        </h1>
        <p className="text-muted-foreground">
          Tạo chiến dịch quyên góp minh bạch với blockchain
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Main content - 2/3 width on desktop */}
        <div className="md:col-span-2 space-y-6">
          <Card className="border border-border/40 shadow-sm">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Các bước tạo chiến dịch</CardTitle>
                  <CardDescription>
                    Hoàn thành các bước sau để tạo chiến dịch
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={activeStep >= 1 ? 'default' : 'outline'}
                    className={
                      activeStep >= 1
                        ? 'bg-primary hover:bg-primary/90'
                        : 'hover:bg-primary/5 hover:text-primary transition-colors'
                    }
                  >
                    1
                  </Badge>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  <Badge
                    variant={activeStep >= 2 ? 'default' : 'outline'}
                    className={
                      activeStep >= 2
                        ? 'bg-primary hover:bg-primary/90'
                        : 'hover:bg-primary/5 hover:text-primary transition-colors'
                    }
                  >
                    2
                  </Badge>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  <Badge
                    variant={activeStep >= 3 ? 'default' : 'outline'}
                    className={
                      activeStep >= 3
                        ? 'bg-primary hover:bg-primary/90'
                        : 'hover:bg-primary/5 hover:text-primary transition-colors'
                    }
                  >
                    3
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs value={`step-${activeStep}`} className="w-full">
                <TabsContent value="step-1" className="m-0 p-6 space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Tiêu đề chiến dịch
                    </label>
                    <Input placeholder="Nhập tiêu đề chiến dịch..." />
                    <p className="text-xs text-muted-foreground">
                      Tiêu đề ngắn gọn, rõ ràng về mục đích của chiến dịch
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Danh mục</label>
                    <Select defaultValue="education">
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn danh mục" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="education">Giáo dục</SelectItem>
                        <SelectItem value="health">Y tế</SelectItem>
                        <SelectItem value="environment">Môi trường</SelectItem>
                        <SelectItem value="disaster">Thiên tai</SelectItem>
                        <SelectItem value="other">Khác</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Mô tả chiến dịch
                    </label>
                    <Textarea
                      placeholder="Mô tả chi tiết về chiến dịch, mục đích, đối tượng hưởng lợi..."
                      rows={6}
                    />
                    <p className="text-xs text-muted-foreground">
                      Mô tả càng chi tiết càng tăng độ tin cậy cho chiến dịch
                      của bạn
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Mục tiêu quyên góp (VNĐ)
                    </label>
                    <Input type="number" placeholder="Nhập số tiền..." />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Ngày bắt đầu
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="date" className="pl-10" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Ngày kết thúc
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="date" className="pl-10" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Hình ảnh chiến dịch
                    </label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center border-border/60">
                      <ImageIcon className="h-8 w-8 mx-auto text-muted-foreground" />
                      <p className="mt-2 text-sm font-medium">
                        Kéo thả hoặc nhấp để tải lên
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        SVG, PNG, JPG hoặc GIF (tối đa 5MB)
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-4 hover:bg-primary/5 hover:text-primary transition-colors"
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Chọn tệp
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      onClick={() => setActiveStep(2)}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      Bước tiếp theo
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="step-2" className="m-0 p-6 space-y-6">
                  <Alert className="border border-primary/20 bg-primary/5">
                    <Info className="h-4 w-4 text-primary" />
                    <AlertTitle>Về giai đoạn chiến dịch</AlertTitle>
                    <AlertDescription>
                      Chia chiến dịch thành các giai đoạn giúp minh bạch hóa quá
                      trình sử dụng quỹ. Mỗi giai đoạn sẽ được giải ngân sau khi
                      hoàn thành và được cộng đồng xác nhận.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-4">
                    {phases.map((phase, index) => (
                      <Card
                        key={phase.id}
                        className="border border-border/40 shadow-sm"
                      >
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base">
                              Giai đoạn {index + 1}
                            </CardTitle>
                            {phases.length > 1 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removePhase(phase.id)}
                                className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-0">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">
                              Tiêu đề giai đoạn
                            </label>
                            <Input
                              placeholder="Ví dụ: Xây dựng móng trường học"
                              value={phase.title}
                              onChange={(e) => {
                                const newPhases = [...phases];
                                newPhases[index].title = e.target.value;
                                setPhases(newPhases);
                              }}
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium">
                              Mô tả giai đoạn
                            </label>
                            <Textarea
                              placeholder="Mô tả chi tiết các hoạt động trong giai đoạn này..."
                              value={phase.description}
                              onChange={(e) => {
                                const newPhases = [...phases];
                                newPhases[index].description = e.target.value;
                                setPhases(newPhases);
                              }}
                              rows={3}
                            />
                          </div>

                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">
                                Ngân sách (VNĐ)
                              </label>
                              <Input
                                type="number"
                                placeholder="Nhập số tiền..."
                                value={phase.budget}
                                onChange={(e) => {
                                  const newPhases = [...phases];
                                  newPhases[index].budget = parseInt(
                                    e.target.value
                                  );
                                  setPhases(newPhases);
                                }}
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">
                                Thời gian dự kiến
                              </label>
                              <Input
                                placeholder="Ví dụ: 30 ngày"
                                value={phase.duration}
                                onChange={(e) => {
                                  const newPhases = [...phases];
                                  newPhases[index].duration = e.target.value;
                                  setPhases(newPhases);
                                }}
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    <Button
                      variant="outline"
                      className="w-full flex items-center hover:bg-primary/5 hover:text-primary transition-colors"
                      onClick={addPhase}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Thêm giai đoạn
                    </Button>
                  </div>

                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setActiveStep(1)}
                      className="hover:bg-primary/5 hover:text-primary transition-colors"
                    >
                      Quay lại
                    </Button>
                    <Button
                      onClick={() => setActiveStep(3)}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      Bước tiếp theo
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="step-3" className="m-0 p-6 space-y-6">
                  <Alert className="border border-primary/20 bg-primary/5">
                    <AlertCircle className="h-4 w-4 text-primary" />
                    <AlertTitle>Xác nhận thông tin</AlertTitle>
                    <AlertDescription>
                      Vui lòng kiểm tra kỹ các thông tin trước khi tạo chiến
                      dịch. Sau khi tạo, bạn sẽ cần phải xác minh danh tính
                      trước khi chiến dịch được đăng tải.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">
                        Ví blockchain của bạn
                      </h3>
                      <div className="flex">
                        <Input
                          className="flex-1 rounded-r-none font-mono text-xs"
                          value="0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s"
                          readOnly
                        />
                        <Button
                          variant="outline"
                          className="rounded-l-none border-l-0 hover:bg-primary/5 hover:text-primary transition-colors"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Ví này sẽ nhận các khoản đóng góp và chịu trách nhiệm
                        giải ngân theo các giai đoạn
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Phí giao dịch</h3>
                      <div className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Phí tạo chiến dịch</span>
                          <span className="font-medium">0.001 ETH</span>
                        </div>
                        <Separator className="my-2" />
                        <div className="flex items-center justify-between">
                          <span className="text-sm">
                            Phí giao dịch blockchain
                          </span>
                          <span className="font-medium">~0.0005 ETH</span>
                        </div>
                        <Separator className="my-2" />
                        <div className="flex items-center justify-between font-medium">
                          <span>Tổng cộng</span>
                          <span>0.0015 ETH</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-start space-x-2">
                        <input type="checkbox" id="terms" className="mt-1" />
                        <label htmlFor="terms" className="text-sm">
                          Tôi đồng ý với các{' '}
                          <Link
                            href="/terms"
                            className="text-primary hover:underline"
                          >
                            điều khoản sử dụng
                          </Link>{' '}
                          và{' '}
                          <Link
                            href="/privacy"
                            className="text-primary hover:underline"
                          >
                            chính sách bảo mật
                          </Link>
                        </label>
                      </div>
                      <div className="flex items-start space-x-2">
                        <input
                          type="checkbox"
                          id="responsibility"
                          className="mt-1"
                        />
                        <label htmlFor="responsibility" className="text-sm">
                          Tôi cam kết các thông tin đã cung cấp là chính xác và
                          chịu trách nhiệm trước pháp luật nếu có sai phạm
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setActiveStep(2)}
                      className="hover:bg-primary/5 hover:text-primary transition-colors"
                    >
                      Quay lại
                    </Button>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      <Wallet className="mr-2 h-4 w-4" />
                      Tạo chiến dịch
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - 1/3 width on desktop */}
        <div className="space-y-6">
          <Card className="border border-border/40 shadow-sm">
            <CardHeader>
              <CardTitle>Hướng dẫn</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium flex items-center">
                  <HelpCircle className="mr-2 h-4 w-4 text-primary" />
                  Chuẩn bị thông tin
                </h3>
                <p className="text-sm text-muted-foreground">
                  Chuẩn bị đầy đủ thông tin về mục đích, kế hoạch, ngân sách và
                  thời gian dự kiến của chiến dịch.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium flex items-center">
                  <HelpCircle className="mr-2 h-4 w-4 text-primary" />
                  Chia giai đoạn
                </h3>
                <p className="text-sm text-muted-foreground">
                  Chia chiến dịch thành các giai đoạn nhỏ, mỗi giai đoạn có mục
                  tiêu và ngân sách riêng.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium flex items-center">
                  <HelpCircle className="mr-2 h-4 w-4 text-primary" />
                  Xác minh danh tính
                </h3>
                <p className="text-sm text-muted-foreground">
                  Bạn sẽ cần xác minh danh tính trước khi chiến dịch được duyệt
                  và hiển thị công khai.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border/40 shadow-sm">
            <CardHeader>
              <CardTitle>Ví dụ chiến dịch thành công</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 group cursor-pointer">
                <div className="overflow-hidden rounded-md">
                  <img
                    src="/placeholder.svg?height=100&width=200&text=Example+Campaign"
                    alt="Ví dụ chiến dịch"
                    className="h-24 w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <h3 className="text-sm font-medium group-hover:text-primary transition-colors">
                  Xây dựng trường học tại Hà Giang
                </h3>
                <p className="text-xs text-muted-foreground">
                  Đạt 120% mục tiêu với 256 người đóng góp
                </p>
              </div>
              <Separator />
              <div className="space-y-2 group cursor-pointer">
                <div className="overflow-hidden rounded-md">
                  <img
                    src="/placeholder.svg?height=100&width=200&text=Example+Campaign"
                    alt="Ví dụ chiến dịch"
                    className="h-24 w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <h3 className="text-sm font-medium group-hover:text-primary transition-colors">
                  Hỗ trợ y tế cho 100 trẻ em mồ côi
                </h3>
                <p className="text-xs text-muted-foreground">
                  Đạt 100% mục tiêu với 189 người đóng góp
                </p>
              </div>
              <Button
                variant="outline"
                className="w-full hover:bg-primary/5 hover:text-primary transition-colors"
              >
                <FileText className="mr-2 h-4 w-4" />
                Xem hướng dẫn chi tiết
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

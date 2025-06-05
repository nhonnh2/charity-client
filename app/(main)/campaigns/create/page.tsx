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
          <Card>
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Các bước tạo chiến dịch</CardTitle>
                  <CardDescription>
                    Hoàn thành các bước sau để tạo chiến dịch
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={activeStep >= 1 ? 'default' : 'outline'}>
                    1
                  </Badge>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  <Badge variant={activeStep >= 2 ? 'default' : 'outline'}>
                    2
                  </Badge>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  <Badge variant={activeStep >= 3 ? 'default' : 'outline'}>
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
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <ImageIcon className="h-8 w-8 mx-auto text-muted-foreground" />
                      <p className="mt-2 text-sm font-medium">
                        Kéo thả hoặc nhấp để tải lên
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        SVG, PNG, JPG hoặc GIF (tối đa 5MB)
                      </p>
                      <Button variant="outline" size="sm" className="mt-4">
                        <Upload className="mr-2 h-4 w-4" />
                        Chọn tệp
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="step-2" className="m-0 p-6 space-y-6">
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Về giai đoạn chiến dịch</AlertTitle>
                    <AlertDescription>
                      Chia chiến dịch thành các giai đoạn giúp minh bạch hóa quá
                      trình sử dụng quỹ. Mỗi giai đoạn sẽ được giải ngân sau khi
                      hoàn thành và được cộng đồng xác nhận.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-4">
                    {phases.map((phase, index) => (
                      <Card key={phase.id}>
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
                              placeholder="Mô tả chi tiết công việc trong giai đoạn này..."
                              rows={3}
                              value={phase.description}
                              onChange={(e) => {
                                const newPhases = [...phases];
                                newPhases[index].description = e.target.value;
                                setPhases(newPhases);
                              }}
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
                                  newPhases[index].budget = Number.parseInt(
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
                      onClick={addPhase}
                      className="w-full"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Thêm giai đoạn
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="step-3" className="m-0 p-6 space-y-6">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Xác minh danh tính</AlertTitle>
                    <AlertDescription>
                      Để đảm bảo tính minh bạch, chúng tôi cần xác minh danh
                      tính của bạn trước khi tạo chiến dịch. Thông tin này sẽ
                      được bảo mật và chỉ dùng cho mục đích xác minh.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Tải lên CMND/CCCD (mặt trước)
                    </label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <FileText className="h-8 w-8 mx-auto text-muted-foreground" />
                      <p className="mt-2 text-sm font-medium">
                        Kéo thả hoặc nhấp để tải lên
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        JPG hoặc PNG (tối đa 5MB)
                      </p>
                      <Button variant="outline" size="sm" className="mt-4">
                        <Upload className="mr-2 h-4 w-4" />
                        Chọn tệp
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Tải lên CMND/CCCD (mặt sau)
                    </label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <FileText className="h-8 w-8 mx-auto text-muted-foreground" />
                      <p className="mt-2 text-sm font-medium">
                        Kéo thả hoặc nhấp để tải lên
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        JPG hoặc PNG (tối đa 5MB)
                      </p>
                      <Button variant="outline" size="sm" className="mt-4">
                        <Upload className="mr-2 h-4 w-4" />
                        Chọn tệp
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Kết nối ví blockchain
                    </label>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Wallet className="h-8 w-8 text-blue-600" />
                            <div>
                              <h4 className="font-medium">MetaMask</h4>
                              <p className="text-xs text-muted-foreground">
                                Kết nối ví MetaMask để nhận quỹ
                              </p>
                            </div>
                          </div>
                          <Button>Kết nối</Button>
                        </div>
                      </CardContent>
                    </Card>
                    <p className="text-xs text-muted-foreground">
                      Chiến dịch sẽ sử dụng mạng Polygon để giảm phí giao dịch
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="terms"
                        className="rounded border-gray-300"
                      />
                      <label htmlFor="terms" className="text-sm">
                        Tôi đồng ý với{' '}
                        <Link
                          href="#"
                          className="text-blue-600 hover:underline"
                        >
                          điều khoản sử dụng
                        </Link>{' '}
                        và
                        <Link
                          href="#"
                          className="text-blue-600 hover:underline"
                        >
                          {' '}
                          chính sách bảo mật
                        </Link>
                      </label>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="border-t px-6 py-4 flex justify-between">
              <Button
                variant="outline"
                onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
                disabled={activeStep === 1}
              >
                Quay lại
              </Button>
              {activeStep < 3 ? (
                <Button
                  onClick={() => setActiveStep(Math.min(3, activeStep + 1))}
                >
                  Tiếp theo
                </Button>
              ) : (
                <Button className="bg-green-600 hover:bg-green-700">
                  Tạo chiến dịch
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>

        {/* Sidebar - 1/3 width on desktop */}
        <div className="space-y-6">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Hướng dẫn</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium flex items-center">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-xs mr-2">
                    1
                  </span>
                  Thông tin cơ bản
                </h3>
                <p className="text-sm text-muted-foreground pl-7">
                  Nhập thông tin chi tiết về chiến dịch, mục tiêu và thời gian
                  thực hiện.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium flex items-center">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-xs mr-2">
                    2
                  </span>
                  Giai đoạn chiến dịch
                </h3>
                <p className="text-sm text-muted-foreground pl-7">
                  Chia chiến dịch thành các giai đoạn nhỏ để giải ngân theo tiến
                  độ và tăng tính minh bạch.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium flex items-center">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-xs mr-2">
                    3
                  </span>
                  Xác minh và kết nối
                </h3>
                <p className="text-sm text-muted-foreground pl-7">
                  Xác minh danh tính và kết nối ví blockchain để nhận quỹ.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Câu hỏi thường gặp</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium flex items-center">
                  <HelpCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                  Làm sao để tăng độ uy tín?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Hoàn thành các chiến dịch đúng tiến độ, cập nhật thường xuyên
                  và minh bạch trong chi tiêu.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium flex items-center">
                  <HelpCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                  Quy trình giải ngân như thế nào?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Mỗi giai đoạn sẽ được giải ngân sau khi bạn cập nhật tiến độ
                  và được 51% người đóng góp xác nhận.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium flex items-center">
                  <HelpCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                  Phí giao dịch là bao nhiêu?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Nền tảng thu 2.5% phí trên mỗi giao dịch thành công để duy trì
                  hệ thống.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Xem tất cả câu hỏi
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

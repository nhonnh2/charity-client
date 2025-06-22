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
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Calendar,
    Clock,
    ArrowLeft,
    Plus,
    TrendingUp,
    Users,
    Target,
    CheckCircle,
    XCircle,
    Clock4,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function AdditionalFundingPage({
    params,
}: {
    params: { id: string };
}) {
    const campaignId = params.id;

    // Mock data - in real app, this would come from API
    const additionalFundings = [
        {
            id: 1,
            title: 'Bổ sung thiết bị học tập cho trường',
            amount: 20000000,
            raised: 12500000,
            target: 20000000,
            backers: 45,
            status: 'active',
            createdAt: '2023-05-15',
            description: 'Cần thêm kinh phí để mua máy tính và thiết bị học tập hiện đại cho các em học sinh.',
            progress: 62.5,
        },
        {
            id: 2,
            title: 'Xây thêm phòng thư viện',
            amount: 30000000,
            raised: 30000000,
            target: 30000000,
            backers: 78,
            status: 'completed',
            createdAt: '2023-04-20',
            description: 'Xây dựng thêm một phòng thư viện nhỏ để phục vụ việc đọc sách của học sinh.',
            progress: 100,
        },
        {
            id: 3,
            title: 'Trang bị máy lọc nước',
            amount: 15000000,
            raised: 0,
            target: 15000000,
            backers: 0,
            status: 'rejected',
            createdAt: '2023-05-10',
            description: 'Lắp đặt hệ thống máy lọc nước sạch cho trường học.',
            progress: 0,
        },
    ];

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'active':
                return <Badge className="bg-blue-100 text-blue-700">Đang kêu gọi</Badge>;
            case 'completed':
                return <Badge className="bg-green-100 text-green-700">Hoàn thành</Badge>;
            case 'rejected':
                return <Badge className="bg-red-100 text-red-700">Bị từ chối</Badge>;
            default:
                return <Badge variant="outline">Chờ duyệt</Badge>;
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'active':
                return <Clock4 className="h-4 w-4" />;
            case 'completed':
                return <CheckCircle className="h-4 w-4" />;
            case 'rejected':
                return <XCircle className="h-4 w-4" />;
            default:
                return <Clock className="h-4 w-4" />;
        }
    };

    return (
        <div className="container mx-auto px-4 py-6 max-w-4xl">
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                    <Link href={`/campaigns/${campaignId}`}>
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Quay lại chiến dịch
                        </Button>
                    </Link>
                </div>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Kêu gọi bổ sung
                        </h1>
                        <p className="text-muted-foreground">
                            Quản lý các yêu cầu kêu gọi thêm kinh phí cho chiến dịch
                        </p>
                    </div>
                    <Button className="bg-primary hover:bg-primary/90">
                        <Plus className="mr-2 h-4 w-4" />
                        Tạo kêu gọi mới
                    </Button>
                </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Tổng kêu gọi</p>
                                <p className="text-2xl font-bold">3</p>
                            </div>
                            <Target className="h-8 w-8 text-blue-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Đang hoạt động</p>
                                <p className="text-2xl font-bold">1</p>
                            </div>
                            <Clock4 className="h-8 w-8 text-orange-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Hoàn thành</p>
                                <p className="text-2xl font-bold">1</p>
                            </div>
                            <CheckCircle className="h-8 w-8 text-green-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Tổng quyên góp</p>
                                <p className="text-2xl font-bold">42.5M</p>
                            </div>
                            <TrendingUp className="h-8 w-8 text-purple-600" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Additional Funding List */}
            <div className="space-y-4">
                {additionalFundings.map((funding) => (
                    <Card key={funding.id} className="overflow-hidden">
                        <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                    <CardTitle className="text-lg">{funding.title}</CardTitle>
                                    <CardDescription>{funding.description}</CardDescription>
                                </div>
                                <div className="flex items-center gap-2">
                                    {getStatusIcon(funding.status)}
                                    {getStatusBadge(funding.status)}
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div>
                                    <p className="text-muted-foreground">Mục tiêu</p>
                                    <p className="font-medium">
                                        {funding.target.toLocaleString()} VNĐ
                                    </p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Đã quyên góp</p>
                                    <p className="font-medium">
                                        {funding.raised.toLocaleString()} VNĐ
                                    </p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Người ủng hộ</p>
                                    <p className="font-medium">{funding.backers} người</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Ngày tạo</p>
                                    <p className="font-medium">
                                        {new Date(funding.createdAt).toLocaleDateString('vi-VN')}
                                    </p>
                                </div>
                            </div>

                            {funding.status === 'active' && (
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span>{funding.progress.toFixed(1)}% đạt được</span>
                                        <span className="text-muted-foreground">
                                            Còn lại: {(funding.target - funding.raised).toLocaleString()} VNĐ
                                        </span>
                                    </div>
                                    <Progress value={funding.progress} className="h-2" />
                                </div>
                            )}

                            {funding.status === 'completed' && (
                                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                                    <p className="text-sm text-green-800">
                                        ✅ Hoàn thành mục tiêu {funding.target.toLocaleString()} VNĐ với {funding.backers} người ủng hộ
                                    </p>
                                </div>
                            )}

                            {funding.status === 'rejected' && (
                                <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                                    <p className="text-sm text-red-800">
                                        ❌ Yêu cầu kêu gọi này đã bị từ chối do không đáp ứng tiêu chí cộng đồng
                                    </p>
                                </div>
                            )}
                        </CardContent>

                        <CardFooter className="flex items-center justify-between pt-3">
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-1">
                                    <Users className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm text-muted-foreground">
                                        {funding.backers} người ủng hộ
                                    </span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm text-muted-foreground">
                                        {new Date(funding.createdAt).toLocaleDateString('vi-VN')}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Button variant="outline" size="sm">
                                    Xem chi tiết
                                </Button>
                                {funding.status === 'active' && (
                                    <Button size="sm">
                                        Quản lý
                                    </Button>
                                )}
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {additionalFundings.length === 0 && (
                <Card className="text-center py-12">
                    <CardContent>
                        <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
                            <Plus className="h-12 w-12 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">
                            Chưa có kêu gọi bổ sung nào
                        </h3>
                        <p className="text-muted-foreground mb-4">
                            Tạo yêu cầu kêu gọi bổ sung đầu tiên cho chiến dịch của bạn
                        </p>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Tạo kêu gọi đầu tiên
                        </Button>
                    </CardContent>
                </Card>
            )}
        </div>
    );
} 
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
    AlertTriangle,
    ArrowLeft,
    CheckCircle,
    Clock,
    DollarSign,
    XCircle,
    AlertCircle,
    Shield,
    FileCheck,
    Eye,
    MessageSquare,
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

type ReviewDecision = 'approve' | 'reject';

export default function ReviewPage() {
    const params = useParams();
    const router = useRouter();
    const reviewId = params.id as string;

    const [decision, setDecision] = useState<ReviewDecision | null>(null);
    const [comments, setComments] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Mock data
    const reviewItem = {
        id: reviewId,
        campaignTitle: 'Xây trường học vùng cao Sapa',
        creatorName: 'Nguyễn Văn A',
        creatorReputation: 85,
        type: 'new_campaign',
        fee: 75000,
        category: 'Giáo dục',
        amount: 50000000,
        deadline: new Date(2024, 0, 22, 23, 59),
        reviewersCount: 2,
        requiredReviewers: 5,
    };

    const handleSubmitReview = async () => {
        if (!decision) {
            toast.error('Vui lòng chọn quyết định duyệt');
            return;
        }

        if (decision === 'reject' && !comments.trim()) {
            toast.error('Vui lòng cung cấp lý do từ chối');
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            toast.success('Đã gửi kết quả duyệt thành công');
            router.push('/reviewer');
        } catch (error) {
            toast.error('Có lỗi xảy ra, vui lòng thử lại');
        } finally {
            setIsSubmitting(false);
        }
    };

    const getDecisionColor = (dec: ReviewDecision) => {
        switch (dec) {
            case 'approve':
                return 'text-green-600';
            case 'reject':
                return 'text-red-600';
            default:
                return 'text-gray-600';
        }
    };

    const getDecisionIcon = (dec: ReviewDecision) => {
        switch (dec) {
            case 'approve':
                return <CheckCircle className="h-5 w-5 text-green-600" />;
            case 'reject':
                return <XCircle className="h-5 w-5 text-red-600" />;
            default:
                return null;
        }
    };

    const getDaysLeft = (deadline: Date) => {
        const now = new Date();
        const diffTime = deadline.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    return (
        <div className="container mx-auto px-4 py-6 max-w-4xl">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center space-x-4 mb-4">
                    <Link href={`/reviewer/${reviewId}`}>
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Quay lại chi tiết
                        </Button>
                    </Link>
                    <div className="flex items-center space-x-2">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                        <Badge variant="destructive">KHẨN CẤP</Badge>
                    </div>
                </div>

                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Duyệt chiến dịch</h1>
                    <p className="text-muted-foreground">{reviewItem.campaignTitle}</p>
                </div>
            </div>

            {/* Warning Alert */}
            <Alert className="mb-6 border-orange-200 bg-orange-50">
                <Shield className="h-4 w-4" />
                <AlertTitle>Lưu ý quan trọng</AlertTitle>
                <AlertDescription className="space-y-2">
                    <p>• Quyết định của bạn sẽ ảnh hưởng đến kết quả cuối cùng của chiến dịch</p>
                    <p>• Bạn chỉ nhận phí nếu quyết định của mình khớp với kết quả cuối cùng (&gt;50% votes)</p>
                    <p>• Không thể thay đổi quyết định sau khi đã gửi</p>
                    <p>• Vui lòng xem xét kỹ lưỡng trước khi quyết định</p>
                </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Review Form */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <FileCheck className="h-5 w-5 mr-2" />
                                Quyết định duyệt
                            </CardTitle>
                            <CardDescription>
                                Chọn quyết định của bạn về chiến dịch này
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <RadioGroup value={decision || ''} onValueChange={(value) => setDecision(value as ReviewDecision)}>
                                <div className="space-y-4">
                                    {/* Approve Option */}
                                    <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-green-50 transition-colors">
                                        <RadioGroupItem value="approve" id="approve" className="mt-1" />
                                        <div className="flex-1 space-y-2">
                                            <Label htmlFor="approve" className="font-medium flex items-center text-green-700">
                                                <CheckCircle className="h-4 w-4 mr-2" />
                                                Chấp nhận chiến dịch
                                            </Label>
                                            <p className="text-sm text-muted-foreground">
                                                Chiến dịch đáp ứng đầy đủ các yêu cầu và có thể được công khai để quyên góp
                                            </p>
                                            <ul className="text-xs text-muted-foreground space-y-1 ml-6">
                                                <li>• Thông tin rõ ràng, đầy đủ</li>
                                                <li>• Tài liệu hợp lệ</li>
                                                <li>• Mục tiêu hợp lý</li>
                                                <li>• Người tạo có uy tín</li>
                                            </ul>
                                        </div>
                                    </div>



                                    {/* Reject Option */}
                                    <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-red-50 transition-colors">
                                        <RadioGroupItem value="reject" id="reject" className="mt-1" />
                                        <div className="flex-1 space-y-2">
                                            <Label htmlFor="reject" className="font-medium flex items-center text-red-700">
                                                <XCircle className="h-4 w-4 mr-2" />
                                                Từ chối chiến dịch
                                            </Label>
                                            <p className="text-sm text-muted-foreground">
                                                Chiến dịch vi phạm quy định hoặc không đáp ứng yêu cầu cơ bản
                                            </p>
                                            <ul className="text-xs text-muted-foreground space-y-1 ml-6">
                                                <li>• Vi phạm chính sách</li>
                                                <li>• Thông tin sai lệch</li>
                                                <li>• Tài liệu không hợp lệ</li>
                                                <li>• Mục đích không phù hợp</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </RadioGroup>

                            <Separator />

                            {/* Comments Section */}
                            <div className="space-y-3">
                                <div className="flex items-center space-x-2">
                                    <MessageSquare className="h-4 w-4" />
                                    <Label className="font-medium">
                                        Nhận xét và lý do
                                        {decision === 'reject' && <span className="text-red-500 ml-1">*</span>}
                                    </Label>
                                </div>
                                <Textarea
                                    placeholder={
                                        decision === 'approve'
                                            ? 'Nhận xét tích cực về chiến dịch (tùy chọn)...'
                                            : decision === 'reject'
                                                ? 'Giải thích lý do từ chối (bắt buộc)...'
                                                : 'Nhận xét về chiến dịch...'
                                    }
                                    value={comments}
                                    onChange={(e) => setComments(e.target.value)}
                                    rows={5}
                                    className={`resize-none ${decision === 'reject' && !comments.trim() ? 'border-red-300' : ''}`}
                                />
                                <p className="text-xs text-muted-foreground">
                                    {decision === 'reject'
                                        ? 'Lý do từ chối sẽ được gửi cho người tạo chiến dịch'
                                        : 'Nhận xét sẽ giúp cải thiện chất lượng chiến dịch'
                                    }
                                </p>
                            </div>

                            {/* Submit Button */}
                            <div className="flex items-center justify-between pt-4">
                                <div className="text-sm text-muted-foreground">
                                    {decision && (
                                        <div className="flex items-center space-x-2">
                                            {getDecisionIcon(decision)}
                                            <span className={getDecisionColor(decision)}>
                                                {decision === 'approve' && 'Sẽ chấp nhận chiến dịch'}
                                                {decision === 'reject' && 'Sẽ từ chối chiến dịch'}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <Button
                                    onClick={handleSubmitReview}
                                    disabled={!decision || isSubmitting || (decision === 'reject' && !comments.trim())}
                                    className="min-w-32"
                                >
                                    {isSubmitting ? 'Đang gửi...' : 'Gửi kết quả duyệt'}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Quick Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Thông tin nhanh</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <Avatar className="h-10 w-10">
                                    <AvatarFallback>
                                        {reviewItem.creatorName.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-medium text-sm">{reviewItem.creatorName}</p>
                                    <p className="text-xs text-muted-foreground">
                                        Uy tín: {reviewItem.creatorReputation}
                                    </p>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Danh mục:</span>
                                    <span className="font-medium">{reviewItem.category}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Mục tiêu:</span>
                                    <span className="font-medium text-green-600">
                                        {new Intl.NumberFormat('vi-VN').format(reviewItem.amount)} VNĐ
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Phí duyệt:</span>
                                    <span className="font-medium text-primary">
                                        {new Intl.NumberFormat('vi-VN').format(reviewItem.fee)} VNĐ
                                    </span>
                                </div>
                            </div>

                            <Separator />

                            <div className="text-center">
                                <Link href={`/reviewer/${reviewId}`}>
                                    <Button variant="outline" size="sm" className="w-full">
                                        <Eye className="h-4 w-4 mr-2" />
                                        Xem lại chi tiết
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Review Progress */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Clock className="h-4 w-4 mr-2" />
                                Tiến độ duyệt
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-red-600">
                                    {getDaysLeft(reviewItem.deadline)}
                                </p>
                                <p className="text-sm text-muted-foreground">ngày còn lại</p>
                            </div>

                            <Separator />

                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Người duyệt:</span>
                                    <span className="font-medium">
                                        {reviewItem.reviewersCount}/{reviewItem.requiredReviewers}
                                    </span>
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    Cần thêm {reviewItem.requiredReviewers - reviewItem.reviewersCount} người duyệt
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Help */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Hướng dẫn duyệt</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm">
                            <div className="space-y-2">
                                <p className="font-medium">Chấp nhận khi:</p>
                                <ul className="text-xs text-muted-foreground space-y-1 ml-4">
                                    <li>• Thông tin rõ ràng, đầy đủ</li>
                                    <li>• Tài liệu hợp lệ</li>
                                    <li>• Mục tiêu khả thi</li>
                                    <li>• Tuân thủ quy định</li>
                                </ul>
                            </div>

                            <div className="space-y-2">
                                <p className="font-medium">Từ chối khi:</p>
                                <ul className="text-xs text-muted-foreground space-y-1 ml-4">
                                    <li>• Vi phạm chính sách</li>
                                    <li>• Thông tin sai lệch</li>
                                    <li>• Mục đích không phù hợp</li>
                                    <li>• Tài liệu giả mạo</li>
                                </ul>
                            </div>

                            <div className="space-y-2 bg-amber-50 p-3 rounded-lg">
                                <p className="font-medium text-amber-800">⚠️ Lưu ý quan trọng:</p>
                                <ul className="text-xs text-amber-700 space-y-1 ml-4">
                                    <li>• Chỉ nhận thưởng nếu quyết định đúng</li>
                                    <li>• Kết quả theo đa số ({'>'} 50%)</li>
                                    <li>• Cân nhắc kỹ trước khi quyết định</li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
} 
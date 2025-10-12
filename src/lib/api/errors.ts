/**
 * Error Code Mapping System
 *
 * Maps server error codes (error_code) to user-friendly Vietnamese messages.
 *
 * Server Response Format:
 * {
 *   "error_code": "CAMPAIGN_NOT_FOUND",     // For client mapping
 *   "message": "Campaign not found",         // For developer debugging
 *   "statusCode": 404
 * }
 *
 * PRINCIPLES:
 * - Server error_code (string) → Client message (Vietnamese)
 * - Server message → Developer debugging (English, logged in dev mode)
 * - Simple string mapping, no need to redefine enums on client
 */

/**
 * Centralized error messages mapping
 * Maps server error_code to user-friendly Vietnamese messages
 */
export const ERROR_MESSAGES: Record<string, string> = {
  // ========================================
  // COMMON ERRORS (COMMON_*)
  // ========================================

  // Server internal error - generic fallback
  COMMON_INTERNAL_SERVER_ERROR: 'Lỗi máy chủ nội bộ. Vui lòng thử lại sau.',

  // Validation error from server (shouldn't happen if client validation works)
  COMMON_VALIDATION_ERROR: 'Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.',

  // User not authenticated
  COMMON_UNAUTHORIZED: 'Bạn cần đăng nhập để thực hiện thao tác này.',

  // User authenticated but lacks permission
  COMMON_FORBIDDEN: 'Bạn không có quyền thực hiện thao tác này.',

  // Resource not found
  COMMON_NOT_FOUND: 'Không tìm thấy tài nguyên yêu cầu.',

  // Malformed request
  COMMON_BAD_REQUEST: 'Yêu cầu không hợp lệ.',

  // Request timeout
  COMMON_TIMEOUT: 'Yêu cầu hết thời gian chờ. Vui lòng thử lại.',

  // Client-only errors (not from server)
  COMMON_NETWORK_ERROR: 'Lỗi kết nối mạng. Vui lòng kiểm tra kết nối internet.',

  // ========================================
  // CAMPAIGN ERRORS (CAMPAIGN_*)
  // ========================================

  // Campaign with given ID not found in database
  CAMPAIGN_NOT_FOUND: 'Không tìm thấy chiến dịch.',

  // User trying to edit/delete campaign they don't own
  CAMPAIGN_NOT_OWNER: 'Bạn không phải là chủ sở hữu chiến dịch này.',

  // Campaign status doesn't allow editing (e.g., already approved, completed)
  CAMPAIGN_CANNOT_EDIT: 'Không thể chỉnh sửa chiến dịch ở trạng thái hiện tại.',

  // Campaign cannot be deleted (e.g., has donations, in progress)
  CAMPAIGN_CANNOT_DELETE:
    'Không thể xóa chiến dịch này. Chiến dịch có thể đã có quyên góp hoặc đang trong quá trình thực hiện.',

  // Invalid campaign status transition (e.g., from completed to pending)
  CAMPAIGN_INVALID_STATUS_TRANSITION:
    'Không thể thay đổi trạng thái chiến dịch theo cách này.',

  // User has reached maximum number of active campaigns
  CAMPAIGN_ACTIVE_LIMIT_EXCEEDED:
    'Bạn đã đạt giới hạn số lượng chiến dịch đang hoạt động. Vui lòng hoàn thành hoặc hủy một số chiến dịch trước khi tạo mới.',

  // Creator user not found in system
  CAMPAIGN_CREATOR_NOT_FOUND: 'Không tìm thấy thông tin người tạo chiến dịch.',

  // User's reputation score too low for emergency campaign
  CAMPAIGN_EMERGENCY_REPUTATION_TOO_LOW:
    'Uy tín của bạn chưa đủ để tạo chiến dịch khẩn cấp. Cần tối thiểu 60 điểm uy tín.',

  // Emergency campaigns can only have 1 milestone
  CAMPAIGN_EMERGENCY_MULTIPLE_MILESTONES:
    'Chiến dịch khẩn cấp chỉ được có 1 giai đoạn thực hiện.',

  // Sum of milestone budgets doesn't equal campaign target amount
  CAMPAIGN_MILESTONE_BUDGET_MISMATCH:
    'Tổng ngân sách các giai đoạn phải bằng với mục tiêu quyên góp của chiến dịch.',

  // Milestone duration days is invalid (e.g., negative, too long)
  CAMPAIGN_MILESTONE_DURATION_INVALID:
    'Thời gian thực hiện giai đoạn không hợp lệ.',

  // Campaign end date is before or equal to start date
  CAMPAIGN_END_DATE_BEFORE_START:
    'Ngày kết thúc chiến dịch phải sau ngày bắt đầu.',

  // Reviewer user not found when trying to assign review
  CAMPAIGN_REVIEWER_NOT_FOUND:
    'Không tìm thấy thông tin người duyệt chiến dịch.',

  // Cannot delete/cancel campaign because it has received donations
  CAMPAIGN_HAS_DONATIONS:
    'Không thể xóa hoặc hủy chiến dịch đã có người quyên góp.',

  // ========================================
  // MEDIA/UPLOAD ERRORS (MEDIA_*)
  // ========================================

  // Media file not found in storage
  MEDIA_NOT_FOUND: 'Không tìm thấy file.',

  // Generic upload failure (network, storage service issue)
  MEDIA_UPLOAD_FAILED:
    'Không thể tải lên file. Vui lòng kiểm tra kết nối và thử lại.',

  // File size exceeds maximum allowed (checked server-side)
  MEDIA_FILE_TOO_LARGE: 'Kích thước file vượt quá giới hạn cho phép.',

  // File type not in accepted list (mime type check)
  MEDIA_INVALID_FILE_TYPE: 'Loại file không được hỗ trợ.',

  // Cloud storage processing failed (e.g., image optimization)
  MEDIA_PROCESSING_FAILED: 'Xử lý file thất bại. Vui lòng thử lại.',

  // User exceeded file upload quota
  MEDIA_UPLOAD_LIMIT_EXCEEDED:
    'Bạn đã vượt quá số lượng file cho phép tải lên.',

  // ========================================
  // AUTH ERRORS (AUTH_*)
  // ========================================

  // Email/password combination incorrect during login
  AUTH_INVALID_CREDENTIALS: 'Email hoặc mật khẩu không đúng.',

  // Email already registered in system
  AUTH_EMAIL_ALREADY_EXISTS:
    'Email đã được đăng ký. Vui lòng sử dụng email khác hoặc đăng nhập.',

  // JWT token invalid, expired, or malformed
  AUTH_INVALID_TOKEN:
    'Phiên đăng nhập không hợp lệ hoặc đã hết hạn. Vui lòng đăng nhập lại.',

  // OAuth authentication failed (Google, Facebook, etc.)
  AUTH_OAUTH_FAILED:
    'Đăng nhập bằng tài khoản mạng xã hội thất bại. Vui lòng thử lại.',

  // ========================================
  // USER ERRORS (USER_*)
  // ========================================

  // User account not found by ID
  USER_NOT_FOUND: 'Không tìm thấy tài khoản người dùng.',

  // User account has been banned/suspended
  USER_BANNED:
    'Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản trị viên để biết thêm chi tiết.',

  // User's reputation score below required threshold
  USER_INSUFFICIENT_REPUTATION:
    'Uy tín của bạn chưa đủ để thực hiện thao tác này. Hãy tham gia nhiều hoạt động hơn để tăng uy tín.',

  // ========================================
  // PAYMENT/TRANSACTION ERRORS (PAYMENT_*)
  // ========================================

  // Generic payment processing failure
  PAYMENT_FAILED:
    'Thanh toán thất bại. Vui lòng kiểm tra thông tin thanh toán và thử lại.',

  // User wallet/account balance insufficient for transaction
  PAYMENT_INSUFFICIENT_BALANCE:
    'Số dư tài khoản không đủ để thực hiện giao dịch này.',

  // Payment amount is invalid (negative, zero, or exceeds limit)
  PAYMENT_INVALID_AMOUNT: 'Số tiền thanh toán không hợp lệ.',

  // Transaction record not found in database
  PAYMENT_TRANSACTION_NOT_FOUND: 'Không tìm thấy thông tin giao dịch.',

  // Duplicate transaction attempt (idempotency check)
  PAYMENT_ALREADY_PROCESSED: 'Giao dịch này đã được xử lý trước đó.',

  // ========================================
  // DONATION ERRORS (DONATION_*)
  // ========================================

  // Generic donation processing failure
  DONATION_FAILED: 'Không thể thực hiện quyên góp. Vui lòng thử lại sau.',

  // Donation amount below minimum threshold
  DONATION_AMOUNT_TOO_LOW:
    'Số tiền quyên góp phải lớn hơn hoặc bằng mức tối thiểu.',

  // Campaign has ended, no longer accepting donations
  DONATION_CAMPAIGN_ENDED:
    'Chiến dịch đã kết thúc và không còn nhận quyên góp.',

  // Campaign not in 'fundraising' status
  DONATION_CAMPAIGN_NOT_ACTIVE:
    'Chiến dịch chưa sẵn sàng nhận quyên góp. Vui lòng quay lại sau.',

  // ========================================
  // REVIEW/VERIFICATION ERRORS (REVIEW_*)
  // ========================================

  // Campaign already submitted for review, cannot resubmit
  REVIEW_ALREADY_SUBMITTED:
    'Chiến dịch đã được gửi duyệt. Vui lòng chờ kết quả.',

  // Required verification documents missing or incomplete
  REVIEW_DOCUMENTS_INCOMPLETE:
    'Tài liệu xác minh chưa đầy đủ. Vui lòng bổ sung đầy đủ các giấy tờ cần thiết.',

  // Identity document verification failed (OCR, validation)
  REVIEW_IDENTITY_VERIFICATION_FAILED:
    'Xác thực danh tính không thành công. Vui lòng kiểm tra lại giấy tờ tùy thân.',

  // Review fee payment failed or not received
  REVIEW_FEE_PAYMENT_FAILED:
    'Không thể thanh toán phí duyệt chiến dịch. Vui lòng thử lại.',
};

/**
 * Get user-friendly error message from error code
 * Falls back to generic message if code not found
 */
export function getErrorMessage(
  errorCode?: string,
  fallbackMessage?: string
): string {
  if (!errorCode) {
    return fallbackMessage || ERROR_MESSAGES.COMMON_INTERNAL_SERVER_ERROR;
  }

  const message = ERROR_MESSAGES[errorCode];

  if (message) {
    return message;
  }

  // Fallback to provided message or generic error
  return fallbackMessage || ERROR_MESSAGES.COMMON_INTERNAL_SERVER_ERROR;
}

/**
 * Get error message from API error response
 * Handles multiple response formats
 */
export function getApiErrorMessage(error: any): string {
  // If it's already a string, return it
  if (typeof error === 'string') {
    return error;
  }

  // Try to extract error_code from various possible locations
  const errorCode =
    error?.error_code ||
    error?.errorCode ||
    error?.payload?.error_code ||
    error?.payload?.errorCode ||
    error?.response?.data?.error_code ||
    error?.response?.data?.errorCode;

  // Try to extract message for fallback
  const fallbackMessage =
    error?.payload?.message ||
    error?.message ||
    error?.response?.data?.message ||
    error?.error;

  // Get user-friendly message
  return getErrorMessage(errorCode, fallbackMessage);
}

/**
 * Log error for debugging in development
 */
export function logErrorForDev(error: any, context?: string) {
  if (process.env.NODE_ENV === 'development') {
    console.group(`🚨 Error${context ? ` in ${context}` : ''}`);
    console.error('Full Error:', error);
    console.error(
      'Error Code:',
      error?.error_code || error?.payload?.error_code || 'N/A'
    );
    console.error(
      'Dev Message:',
      error?.message || error?.payload?.message || 'N/A'
    );
    console.error('User Message:', getApiErrorMessage(error));
    console.groupEnd();
  }
}

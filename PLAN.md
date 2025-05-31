# Kế hoạch & Đánh giá tính năng ứng dụng kêu gọi quỹ từ thiện minh bạch

## 1. Trang & Tính năng đã làm

### 1.1. Trang chính (Home, Feed cộng đồng)

- **Feed bài đăng:** Người dùng có thể đăng bài, chia sẻ hình ảnh, video, cập nhật tiến độ chiến dịch, kêu gọi ủng hộ.
- **Tạo bài đăng:** Có component riêng, hỗ trợ text, ảnh, video, liên kết, emoji.
- **Tương tác:** Like, bình luận, chia sẻ bài đăng.
- **Sidebar:** Thống kê cộng đồng, chiến dịch nổi bật, thành viên tích cực.

### 1.2. Trang chiến dịch (`/campaigns`)

- **Danh sách chiến dịch:** Lọc, tìm kiếm, phân loại, sắp xếp, xem chi tiết.
- **Tạo chiến dịch:** Hỗ trợ chia nhiều giai đoạn, mỗi giai đoạn có tên, mô tả, ngân sách, thời gian.
- **Chi tiết chiến dịch:**
  - Thông tin tổng quan, tiến độ, hình ảnh, mô tả.
  - Danh sách các giai đoạn, trạng thái từng giai đoạn (đang thực hiện, hoàn thành).
  - Xem báo cáo chi tiêu, liên kết giao dịch blockchain.
  - Bình luận, chia sẻ, like, donate trực tiếp.
- **Giải ngân theo giai đoạn:** Đã có UI chia giai đoạn, báo cáo chi tiêu từng giai đoạn, nút xác nhận hoàn thành.

### 1.3. Trang hồ sơ người dùng (`/profile`)

- **Thông tin cá nhân:** Ảnh đại diện, cover, mô tả, liên kết, vị trí, ngày tham gia.
- **Điểm uy tín:** Hiển thị điểm, số chiến dịch thành công, tổng quyên góp, số người đóng góp.
- **Tabs:** Chiến dịch đã tạo, bài đăng, đóng góp, ví điện tử, giới thiệu.
- **Tăng uy tín:** Có thông báo tăng điểm uy tín khi hoàn thành giai đoạn/chiến dịch.

### 1.4. Trang nhắn tin (`/messages`)

- **Chat 1-1:** Danh sách hội thoại, nhắn tin, trạng thái online, unread.
- **Hỗ trợ cộng đồng:** Hỏi đáp, liên hệ người kêu gọi, trao đổi về chiến dịch.

### 1.5. Trang thông báo (`/notifications`)

- **Các loại thông báo:** Cập nhật chiến dịch, đóng góp mới, like, nhắc đến, tăng uy tín, xác minh chiến dịch.
- **Tabs lọc:** Tất cả, chiến dịch, nhắc đến, lượt thích.

### 1.6. Trang thống kê (`/statistics`, `/stats`)

- **Thống kê tổng quan:** Số chiến dịch, tổng quyên góp, tỷ lệ thành công, số giao dịch, số người đóng góp.
- **Biểu đồ:** Đóng góp theo tháng, phân bổ theo danh mục, top chiến dịch, hoạt động gần đây.
- **Thống kê blockchain:** Số giao dịch, phí gas, thời gian xác nhận, tổng gas đã dùng.

### 1.7. Trang xếp hạng (`/rankings`)

- **Bảng xếp hạng:** Người dùng, chiến dịch theo uy tín, số tiền quyên góp, số người ủng hộ.

### 1.8. Trang ví & giao dịch (`/wallet`, `/transactions`)

- **Quản lý ví:** Số dư, lịch sử giao dịch, liên kết blockchain.
- **Lịch sử giao dịch:** Đóng góp, giải ngân, nhận tiền, rút tiền.

### 1.9. Trang hướng dẫn (`/how-it-works`)

- **Giới thiệu:** Cách hoạt động, minh bạch, cập nhật tiến độ, đăng hình ảnh, video, bằng chứng chi tiêu.

### 1.10. Trang cài đặt (`/settings`)

- **Cài đặt tài khoản:** Thông tin cá nhân, bảo mật, thông báo, liên kết ví.

### 1.11. Trang đăng nhập/đăng ký (`/login`, `/register`)

- **Đăng nhập/Đăng ký bằng Google:** Sử dụng OAuth2, xác thực nhanh, bảo mật.
- **Đăng nhập/Đăng ký bằng ví blockchain:** Kết nối ví (MetaMask, WalletConnect...), xác thực bằng chữ ký ví.
- **Tích hợp với hệ thống tài khoản hiện tại:** Cho phép liên kết tài khoản Google và ví blockchain với hồ sơ người dùng.

---

## 2. Tính năng cộng đồng & mạng xã hội

- **Đăng bài, ảnh, video, chia sẻ tiến độ:** Đã có.
- **Bình luận, like, chia sẻ bài đăng:** Đã có.
- **Nhắn tin, trao đổi:** Đã có.
- **Thông báo tương tác:** Đã có.
- **Feed cộng đồng:** Đã có.
- **Chia sẻ chiến dịch lên feed:** Đã có.
- **Thành viên tích cực, thống kê cộng đồng:** Đã có.

---

## 3. Tính năng minh bạch & giải ngân

- **Chia giai đoạn chiến dịch:** Đã có.
- **Báo cáo chi tiêu từng giai đoạn:** Đã có UI, cần bổ sung xác thực cộng đồng (chưa rõ đã có voting/xác nhận chưa).
- **Giải ngân từng giai đoạn:** Đã có UI, cần kiểm tra logic smart contract.
- **Xác nhận hoàn thành giai đoạn:** Đã có UI, cần bổ sung cơ chế xác thực (cộng đồng vote, upload hóa đơn, v.v.).
- **Tăng uy tín khi hoàn thành chiến dịch:** Đã có.

---

## 4. Tính năng chưa làm hoặc cần bổ sung

- **Cơ chế xác thực uy tín người tạo chiến dịch:** Chưa rõ có tích hợp xác minh giấy tờ, KYC, hoặc xác thực cộng đồng chưa.
- **Cơ chế xác nhận chi tiêu hợp lý từng giai đoạn:** Chưa rõ đã có voting cộng đồng, upload hóa đơn, kiểm duyệt chưa.
- **Cộng đồng tranh luận, phản biện về chi tiêu:** Chưa thấy có forum hoặc thread tranh luận riêng cho từng giai đoạn.
- **Tích hợp blockchain thực tế:** Cần kiểm tra backend/smart contract, hiện tại UI đã có liên kết giao dịch.
- **Quản lý khiếu nại, tố cáo:** Chưa thấy.
- **Quản lý ban quản trị, kiểm duyệt viên:** Chưa thấy.
- **Tích hợp xác thực đa yếu tố, bảo mật nâng cao:** Chưa rõ.

---

## 5. Đề xuất bổ sung

- Thêm cơ chế xác thực uy tín (KYC, xác minh giấy tờ, xác thực cộng đồng).
- Thêm voting/xác nhận cộng đồng cho từng giai đoạn giải ngân.
- Thêm upload hóa đơn, bằng chứng chi tiêu, cho phép cộng đồng phản biện.
- Thêm forum/thảo luận riêng cho từng chiến dịch/giai đoạn.
- Tích hợp smart contract thực tế, kiểm tra logic giải ngân.
- Thêm quản lý khiếu nại, tố cáo, kiểm duyệt viên.

---

**Tổng kết:**  
Ứng dụng đã có đầy đủ UI/UX cho phần chiến dịch, cộng đồng, chia sẻ, minh bạch cơ bản. Cần bổ sung các cơ chế xác thực, voting, phản biện, và tích hợp blockchain thực tế để đảm bảo minh bạch & uy tín.

# Product Backlog

## 2.2.1. Phát triển yêu cầu dựa trên câu chuyện người dùng

Sử dụng định dạng tiêu chuẩn: "As a [user], I want [goal] so that [reason]"

**Bảng 2.1. Danh sách các user story trong Product backlog**

| TT | Theme | Epic | UID | User story |
|----|-------|------|-----|------------|
| 1 | Quản lý dữ liệu học tập | Quản lý lớp, sinh viên, môn học | US-001 | As a giáo viên, I want xem danh sách lớp và sinh viên được phân công so that tôi quản lý việc nhập điểm |
| 2 | Quản lý dữ liệu học tập | Quản lý lớp, sinh viên, môn học | US-002 | As a quản trị viên, I want thêm, sửa, xóa thông tin lớp, sinh viên, môn học so that dữ liệu học tập được duy trì đầy đủ |
| 3 | Quản lý điểm | Nhập và quản lý điểm | US-003 | As a giáo viên, I want nhập điểm cho sinh viên so that kết quả học tập được lưu lại |
| 4 | Quản lý điểm | Nhập và quản lý điểm | US-004 | As a giáo viên, I want sửa điểm đã nhập so that kết quả được cập nhật chính xác |
| 5 | Quản lý điểm | Nhập và quản lý điểm | US-005 | As a giáo viên, I want hệ thống kiểm tra điểm hợp lệ và tính điểm tổng kết so that hạn chế sai sót |
| 6 | Tra cứu và báo cáo | Tra cứu và xuất báo cáo điểm | US-006 | As a giáo viên, I want tra cứu điểm theo lớp, môn học và sinh viên so that tôi theo dõi kết quả học tập |
| 7 | Tra cứu và báo cáo | Tra cứu và xuất báo cáo điểm | US-007 | As a giáo viên, I want xuất bảng điểm so that tôi sử dụng trong công tác giảng dạy và quản lý |
| 8 | Tra cứu và báo cáo | Tra cứu và xuất báo cáo điểm | US-008 | As a giáo viên, I want xem báo cáo tổng hợp kết quả học tập so that tôi đánh giá tình hình của lớp |
| 9 | Quản lý hệ thống | Quản lý tài khoản và phân quyền | US-009 | As a quản trị viên, I want quản lý tài khoản và phân quyền người dùng so that quyền truy cập hệ thống được kiểm soát |

## 2.2.2. Xác định tiêu chí chấp nhận cho các câu chuyện người dùng

**Bảng 2.2. Danh sách user story cùng tiêu chí chấp nhận**

| UID | As a... | I want to be able to... | So that... | Acceptance Criteria | Testing |
|-----|---------|------------------------|------------|--------------------|---------|
| US-001 | giáo viên | xem danh sách lớp và sinh viên được phân công | quản lý việc nhập điểm | Hiển thị danh sách lớp + sinh viên của giáo viên đăng nhập; Chỉ thấy lớp được phân công | Đăng nhập giáo viên `gv01` -> kiểm tra danh sách lớp và sinh viên |
| US-002 | quản trị viên | thêm, sửa, xóa lớp, sinh viên, môn học | duy trì dữ liệu học tập | Thêm/Sửa/Xóa thành công và phản ánh ngay trên danh sách; Xóa có xác nhận | Admin thao tác CRUD -> kiểm tra dữ liệu thay đổi |
| US-003 | giáo viên | nhập điểm cho sinh viên | lưu kết quả học tập | Nhập điểm theo lớp + môn; Lưu thành công và hiển thị trên bảng điểm | Mở form nhập điểm -> nhập -> lưu -> kiểm tra bảng điểm |
| US-004 | giáo viên | sửa điểm đã nhập | cập nhật kết quả chính xác | Sửa điểm và lưu thay đổi; Ghi nhận thời gian sửa | Sửa một điểm -> lưu -> kiểm tra giá trị mới |
| US-005 | giáo viên | hệ thống kiểm tra điểm hợp lệ và tính điểm tổng kết | hạn chế sai sót | Chặn điểm ngoài thang điểm; Tính điểm tổng kết tự động theo quy tắc | Nhập điểm 15 (ngoài 0-10) -> báo lỗi; nhập hợp lệ -> điểm tổng kết đúng |
| US-006 | giáo viên | tra cứu điểm theo lớp, môn học và sinh viên | theo dõi kết quả | Lọc theo lớp/môn/sinh viên; Kết quả đúng với dữ liệu | Nhập bộ lọc -> kiểm tra kết quả hiển thị |
| US-007 | giáo viên | xuất bảng điểm | sử dụng trong công tác giảng dạy | Xuất bảng điểm đầy đủ cột (STT, MSSV, Họ tên, Điểm, Tổng kết); Tải được file | Xuất bảng điểm lớp -> mở file -> kiểm tra nội dung |
| US-008 | giáo viên | xem báo cáo tổng hợp kết quả học tập | đánh giá tình hình của lớp | Thống kê: điểm cao/thấp/trung bình, tỉ lệ đạt/không đạt | Mở trang báo cáo lớp -> kiểm tra số liệu khớp |
| US-009 | quản trị viên | quản lý tài khoản và phân quyền | kiểm soát quyền truy cập | Tạo/sửa/xóa tài khoản; Phân vai trò giao_vien/admin; Truy cập theo đúng vai trò | Tạo tài khoản gv -> đăng nhập -> kiểm tra quyền hạn |

## 2.2.3. Ước tính độ phức tạp câu chuyện người dùng

Sử dụng kỹ thuật Planning Poker để ước tính story point và Estimation Effort.

**Bảng 2.3. Danh sách user story với các giá trị ước tính Story point và Estimation Effort**

| UID | User story | Story point | Estimation Effort |
|-----|------------|-------------|-------------------|
| US-001 | Xem danh sách lớp và sinh viên được phân công | 3 | 4 giờ |
| US-002 | Quản lý lớp, sinh viên, môn học (CRUD) | 5 | 8 giờ |
| US-003 | Nhập điểm | 3 | 5 giờ |
| US-004 | Sửa điểm | 2 | 3 giờ |
| US-005 | Kiểm tra điểm hợp lệ và tính điểm tổng kết | 5 | 8 giờ |
| US-006 | Tra cứu điểm theo lớp, môn, sinh viên | 3 | 5 giờ |
| US-007 | Xuất bảng điểm | 3 | 5 giờ |
| US-008 | Báo cáo tổng hợp kết quả học tập | 5 | 8 giờ |
| US-009 | Quản lý tài khoản và phân quyền | 5 | 8 giờ |

**Tổng story point:** 34
**Tổng estimation effort:** 54 giờ

## 2.2.4. Tạo bản đồ câu chuyện và tinh chỉnh các câu chuyện người dùng

**Bảng 2.4. Danh sách user story sau tinh chỉnh (sắp xếp theo ưu tiên)**

| UID | User story | Story point | Estimation Effort | Thứ tự ưu tiên |
|-----|------------|-------------|-------------------|----------------|
| US-001 | Xem danh sách lớp và sinh viên được phân công | 3 | 4 giờ | 1 |
| US-003 | Nhập điểm | 3 | 5 giờ | 2 |
| US-004 | Sửa điểm | 2 | 3 giờ | 3 |
| US-005 | Kiểm tra điểm hợp lệ và tính điểm tổng kết | 5 | 8 giờ | 4 |
| US-006 | Tra cứu điểm theo lớp, môn, sinh viên | 3 | 5 giờ | 5 |
| US-007 | Xuất bảng điểm | 3 | 5 giờ | 6 |
| US-008 | Báo cáo tổng hợp kết quả học tập | 5 | 8 giờ | 7 |
| US-002 | Quản lý lớp, sinh viên, môn học (CRUD) | 5 | 8 giờ | 8 |
| US-009 | Quản lý tài khoản và phân quyền | 5 | 8 giờ | 9 |

## Kết luận chương 2

Product Backlog đã được xây dựng với 9 User Story, tổng 34 story points, 54 giờ effort. Các tiêu chí chấp nhận được định nghĩa rõ ràng, có thể đo lường và kiểm thử. Ước tính bằng Planning Poker đảm bảo sự đồng thuận của team. Thứ tự ưu tiên dựa trên giá trị nghiệp vụ và phụ thuộc kỹ thuật.
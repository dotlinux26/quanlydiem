# Product Backlog

## 2.2.1. Phát triển yêu cầu dựa trên câu chuyện người dùng

Sử dụng định dạng tiêu chuẩn: "As a [user], I want [goal] so that [reason]"

**Bảng 2.1. Danh sách các user story trong Product backlog (11 US)**

| TT | Theme | Epic | UID | User story |
|----|-------|------|-----|------------|
| 1 | Quản lý dữ liệu học tập | Quản lý lớp học | US-001 | As a giáo viên, I want xem danh sách lớp và sinh viên được phân công so that tôi quản lý việc nhập điểm |
| 2 | Quản lý dữ liệu học tập | Quản lý lớp học | US-002 | As a người quản lý, I want tạo, sửa, xóa lớp học và phân công giáo viên so that duy trì dữ liệu lớp học |
| 3 | Quản lý dữ liệu học tập | Quản lý sinh viên | US-003 | As a người quản lý, I want tạo, sửa, xóa sinh viên, nhập từ Excel, chuyển lớp so that quản lý danh sách học sinh |
| 4 | Quản lý dữ liệu học tập | Quản lý môn học | US-004 | As a người quản lý, I want tạo, sửa, xóa môn học (mã, tên, tín chỉ) so that cập nhật chương trình đào tạo |
| 5 | Quản lý điểm | Nhập & kiểm tra điểm | US-005 | As a giáo viên, I want nhập điểm cho sinh viên theo lớp và môn học so that lưu kết quả học tập |
| 6 | Quản lý điểm | Nhập & kiểm tra điểm | US-006 | As a giáo viên, I want sửa điểm đã nhập so that cập nhật kết quả chính xác |
| 7 | Quản lý điểm | Nhập & kiểm tra điểm | US-007 | As a giáo viên, I want hệ thống kiểm tra điểm hợp lệ (0–10, bước 0.5) và tính điểm tổng kết (0.3/0.3/0.4) so that hạn chế sai sót |
| 8 | Tra cứu & Báo cáo | Tra cứu & xuất báo cáo | US-008 | As a giáo viên, I want tra cứu điểm theo lớp, môn học, sinh viên có phân trang so that theo dõi kết quả |
| 9 | Tra cứu & Báo cáo | Tra cứu & xuất báo cáo | US-009 | As a giáo viên, I want xuất bảng điểm ra file Excel (.xlsx) và CSV so that dùng trong công tác giảng dạy |
| 10 | Tra cứu & Báo cáo | Tra cứu & xuất báo cáo | US-010 | As a giáo viên, I want xem báo cáo tổng hợp (max/min/avg, % đạt, biểu đồ) so that đánh giá tình hình lớp |
| 11 | Quản trị hệ thống | Quản trị tài khoản | US-011 | As a người quản lý, I want tạo, sửa, xóa tài khoản giáo viên, gán vai trò, reset mật khẩu so that kiểm soát quyền truy cập |

## 2.2.2. Xác định tiêu chí chấp nhận cho các câu chuyện người dùng

**Bảng 2.2. Danh sách user story cùng tiêu chí chấp nhận**

| UID | As a... | I want to be able to... | So that... | Acceptance Criteria | Testing |
|-----|---------|------------------------|------------|--------------------|---------|
| US-001 | giáo viên | xem danh sách lớp và sinh viên được phân công | quản lý việc nhập điểm | Hiển thị danh sách lớp + SV của GV đăng nhập; Chỉ thấy lớp được phân công; Người quản lý thấy tất cả | Đăng nhập `gv01` → 3 lớp, click lớp → 5 SV |
| US-002 | người quản lý | tạo, sửa, xóa lớp học, phân công giáo viên | duy trì dữ liệu lớp học | Thêm lớp thành công; Phân công GV dropdown; Xóa có confirm, cascade điểm | Người quản lý CRUD → kiểm tra dữ liệu thay đổi |
| US-003 | người quản lý | tạo, sửa, xóa SV, import Excel, chuyển lớp | quản lý danh sách học sinh | Thêm SV; Import file .xlsx → 5 SV/lớp; Chuyển lớp cập nhật lop_id; Xóa có confirm | Người quản lý thao tác → kiểm tra thay đổi |
| US-004 | người quản lý | tạo, sửa, xóa môn học (mã, tên, tín chỉ) | cập nhật chương trình đào tạo | Mã môn unique; Sửa cập nhật ngay; Xóa xóa cả điểm môn đó | Người quản lý CRUD → kiểm tra |
| US-005 | giáo viên | nhập điểm (TK/GK/CK) theo lớp + môn | lưu kết quả học tập | Form 3 input ngang; Nhập 7,5 được; Lưu upsert, tongKet tự động | Mở form → nhập 7,5/8/9 → Lưu → tongKet 8,3 |
| US-006 | giáo viên | sửa điểm đã nhập | cập nhật kết quả chính xác | Sửa trực tiếp ô nhập; tongKet tính lại; updated_at cập nhật | Sửa 1 điểm → lưu → kiểm tra giá trị mới & tongKet |
| US-007 | giáo viên | hệ thống validate (0–10, bước 0.5) + tính tongKet (0.3/0.3/0.4) | hạn chế sai sót | Nhập 15/-1 → lỗi; Nhập "abc" → lỗi; 8/7,5/9 → tongKet 8,3; Sửa → tính lại | Nhập 15, abc, 7,5 → lỗi/đúng |
| US-008 | giáo viên | tra cứu điểm (filter lớp/môn/SV, phân trang) | theo dõi kết quả | Bộ lọc đa tiêu chí; Phân trang 20 dòng; Hiển thị đủ 8 cột | Lọc → kiểm tra kết quả |
| US-009 | giáo viên | xuất bảng điểm Excel/CSV | dùng trong giảng dạy | File .xlsx/.csv; 8 cột (STT, Mã SV, Họ tên, TK, GK, CK, Tổng kết, Trạng thái) | Xuất → mở file kiểm tra |
| US-010 | giáo viên | báo cáo tổng hợp (max/min/avg, % đạt, chart) | đánh giá tình hình lớp | Stats đúng; Chart.js bar/pie; Export PDF | Xem báo cáo → số liệu khớp |
| US-011 | người quản lý | CRUD tài khoản GV, gán vai trò, reset pwd | kiểm soát quyền truy cập | Tạo GV mới → login được; Set vai trò; Reset pwd, khóa/mở; Không xóa người quản lý cuối | Tạo GV → login → kiểm tra quyền |

## 2.2.3. Ước tính độ phức tạp câu chuyện người dùng

Sử dụng kỹ thuật Planning Poker (1 người) để ước tính story point và Estimation Effort.

**Bảng 2.3. Danh sách user story với các giá trị ước tính Story point và Estimation Effort**

| UID | User story | Story point | Estimation Effort | Sprint | Trạng thái |
|-----|------------|-------------|-------------------|--------|------------|
| US-001 | Xem danh sách lớp và sinh viên được phân công | 3 | 4 giờ | Sprint 1 (V0) | **Done** |
| US-005 | Nhập điểm | 3 | 5 giờ | Sprint 1 (V0) | **Done** |
| US-006 | Sửa điểm | 2 | 3 giờ | Sprint 1 (V0) | **Done** |
| US-007 | Kiểm tra điểm hợp lệ và tính điểm tổng kết | 5 | 8 giờ | Sprint 1 (V0) | **Done** |
| US-009 | Xuất bảng điểm (Excel/CSV) | 3 | 5 giờ | Sprint 1 (V0) | **Done** |
| US-002 | Quản lý lớp học (CRUD + phân công GV) | 5 | 8 giờ | Sprint 2 (V1.0) | To Do |
| US-003 | Quản lý sinh viên (CRUD + import Excel) | 5 | 8 giờ | Sprint 2 (V1.0) | To Do |
| US-004 | Quản lý môn học (CRUD) | 3 | 5 giờ | Sprint 2 (V1.0) | To Do |
| US-008 | Tra cứu điểm (filter, phân trang) | 3 | 5 giờ | Sprint 2 (V1.0) | To Do |
| US-010 | Báo cáo tổng hợp (stats + chart) | 5 | 8 giờ | Sprint 3 (V2.0) | To Do |
| US-011 | Quản trị tài khoản & phân quyền | 5 | 8 giờ | Sprint 3 (V2.0) | To Do |

**Tổng story point:** 44
**Tổng estimation effort:** 64 giờ

## 2.2.4. Tạo bản đồ câu chuyện và tinh chỉnh các câu chuyện người dùng

**Bảng 2.4. Danh sách user story sau tinh chỉnh (sắp xếp theo ưu tiên)**

| UID | User story | Story point | Estimation Effort | Thứ tự ưu tiên | Sprint |
|-----|------------|-------------|-------------------|----------------|--------|
| US-001 | Xem danh sách lớp và sinh viên được phân công | 3 | 4 giờ | 1 | Sprint 1 |
| US-005 | Nhập điểm | 3 | 5 giờ | 2 | Sprint 1 |
| US-006 | Sửa điểm | 2 | 3 giờ | 3 | Sprint 1 |
| US-007 | Kiểm tra điểm hợp lệ và tính điểm tổng kết | 5 | 8 giờ | 4 | Sprint 1 |
| US-009 | Xuất bảng điểm (Excel/CSV) | 3 | 5 giờ | 5 | Sprint 1 |
| US-002 | Quản lý lớp học (CRUD + phân công GV) | 5 | 8 giờ | 6 | Sprint 2 |
| US-003 | Quản lý sinh viên (CRUD + import Excel) | 5 | 8 giờ | 7 | Sprint 2 |
| US-004 | Quản lý môn học (CRUD) | 3 | 5 giờ | 8 | Sprint 2 |
| US-008 | Tra cứu điểm (filter, phân trang) | 3 | 5 giờ | 9 | Sprint 2 |
| US-010 | Báo cáo tổng hợp (stats + chart) | 5 | 8 giờ | 10 | Sprint 3 |
| US-011 | Quản trị tài khoản & phân quyền | 5 | 8 giờ | 11 | Sprint 3 |

## 2.2.5. Bug Backlog (từ Sprint 1 testing)

| Bug ID | Mô tả | Severity | Status | Fixed in Commit |
|--------|-------|----------|--------|-----------------|
| #1 | Chuyển môn học làm mất dữ liệu điểm đang nhập dở mà không cảnh báo | High | **Closed** | a0f002e |
| #2 | Ô nhập điểm type=number không nhập được dấu phẩy (kiểu VN 7,5) | High | **Closed** | a0f002e |
| #3 | Link "Nhập điểm" từng sinh viên truyền ?sv= nhưng trang đích không xử lý | Medium | **Closed** | a0f002e |

## Kết luận chương 2

Product Backlog đã được xây dựng với **11 User Story**, tổng **44 story points**, **64 giờ effort**. Sprint 1 (V0) hoàn thành **5 US** (US-001,005,006,007,009) = **19 SP**. Các tiêu chí chấp nhận được định nghĩa rõ ràng dạng Given/When/Then, có thể đo lường và kiểm thử (unit 27 testcases, e2e 14 testcases). 3 Bug phát hiện trong Sprint 1 đã fix và đóng. Thứ tự ưu tiên dựa trên giá trị nghiệp vụ và phụ thuộc kỹ thuật.
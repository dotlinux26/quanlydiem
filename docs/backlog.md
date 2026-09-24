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
| US-001 | giáo viên | xem danh sách lớp và sinh viên được phân công | quản lý việc nhập điểm | Hiển thị danh sách lớp + sinh viên của giáo viên đăng nhập; Chỉ thấy lớp được phân công; Admin thấy tất cả | Đăng nhập `gv01` → kiểm tra 3 lớp, click lớp → 5 SV |
| US-002 | quản trị viên | thêm, sửa, xóa lớp, sinh viên, môn học | duy trì dữ liệu học tập | Thêm/Sửa/Xóa thành công và phản ánh ngay; Xóa có xác nhận Modal | Admin thao tác CRUD → kiểm tra dữ liệu thay đổi |
| US-003 | giáo viên | nhập điểm cho sinh viên | lưu kết quả học tập | Nhập điểm theo lớp + môn; Lưu thành công và hiển thị trên bảng điểm; Tổng kết tự động | Mở form nhập → nhập 7,5/8/9 → lưu → tongKet 8,3 |
| US-004 | giáo viên | sửa điểm đã nhập | cập nhật kết quả chính xác | Sửa điểm và lưu thay đổi; Ghi nhận thời gian sửa; Tổng kết cập nhật lại | Sửa 1 điểm → lưu → kiểm tra giá trị mới & tongKet |
| US-005 | giáo viên | hệ thống kiểm tra điểm hợp lệ và tính điểm tổng kết | hạn chế sai sót | Chặn điểm <0 hoặc >10; Nhập chữ → báo "Điểm không hợp lệ"; Tính tongKet = TK×0.3+GK×0.3+CK×0.4 | Nhập 15 → báo lỗi; nhập "abc" → báo lỗi; nhập hợp lệ → tongKet đúng |
| US-006 | giáo viên | tra cứu điểm theo lớp, môn học và sinh viên | theo dõi kết quả | Lọc theo lớp/môn/SV; Kết quả đúng với dữ liệu; Có phân trang | Nhập bộ lọc → kiểm tra kết quả hiển thị |
| US-007 | giáo viên | xuất bảng điểm (Excel/CSV) | sử dụng trong công tác giảng dạy | Xuất đầy đủ cột (STT, MSSV, Họ tên, TK, GK, CK, Tổng kết, Trạng thái); Tải được file .xlsx/.csv | Xuất bảng điểm lớp → mở file → kiểm tra nội dung |
| US-008 | giáo viên | xem báo cáo tổng hợp kết quả học tập | đánh giá tình hình của lớp | Thống kê: điểm cao/thấp/trung bình, tỉ lệ đạt/không đạt, phân bố | Mở trang báo cáo → kiểm tra số liệu khớp |
| US-009 | quản trị viên | quản lý tài khoản và phân quyền | kiểm soát quyền truy cập | Tạo/sửa/xóa tài khoản; Phân vai trò giao_vien/admin; Truy cập theo đúng vai trò | Tạo tài khoản gv → đăng nhập → kiểm tra quyền hạn |

## 2.2.3. Ước tính độ phức tạp câu chuyện người dùng

Sử dụng kỹ thuật Planning Poker (1 người) để ước tính story point và Estimation Effort.

**Bảng 2.3. Danh sách user story với các giá trị ước tính Story point và Estimation Effort**

| UID | User story | Story point | Estimation Effort | Sprint | Trạng thái |
|-----|------------|-------------|-------------------|--------|------------|
| US-001 | Xem danh sách lớp và sinh viên được phân công | 3 | 4 giờ | Sprint 1 (V0) | **Done** |
| US-002 | Quản lý lớp, sinh viên, môn học (CRUD) | 5 | 8 giờ | Sprint 3 (V2.0) | To Do |
| US-003 | Nhập điểm | 3 | 5 giờ | Sprint 1 (V0) | **Done** |
| US-004 | Sửa điểm | 2 | 3 giờ | Sprint 1 (V0) | **Done** |
| US-005 | Kiểm tra điểm hợp lệ và tính điểm tổng kết | 5 | 8 giờ | Sprint 1 (V0) | **Done** |
| US-006 | Tra cứu điểm theo lớp, môn, sinh viên | 3 | 5 giờ | Sprint 2 (V1.0) | To Do |
| US-007 | Xuất bảng điểm (Excel/CSV) | 3 | 5 giờ | Sprint 1 (V0) | **Done** |
| US-008 | Báo cáo tổng hợp kết quả học tập | 5 | 8 giờ | Sprint 2 (V1.0) | To Do |
| US-009 | Quản lý tài khoản và phân quyền | 5 | 8 giờ | Sprint 3 (V2.0) | To Do |

**Tổng story point:** 34
**Tổng estimation effort:** 54 giờ

## 2.2.4. Tạo bản đồ câu chuyện và tinh chỉnh các câu chuyện người dùng

**Bảng 2.4. Danh sách user story sau tinh chỉnh (sắp xếp theo ưu tiên)**

| UID | User story | Story point | Estimation Effort | Thứ tự ưu tiên | Sprint |
|-----|------------|-------------|-------------------|----------------|--------|
| US-001 | Xem danh sách lớp và sinh viên được phân công | 3 | 4 giờ | 1 | Sprint 1 |
| US-003 | Nhập điểm | 3 | 5 giờ | 2 | Sprint 1 |
| US-004 | Sửa điểm | 2 | 3 giờ | 3 | Sprint 1 |
| US-005 | Kiểm tra điểm hợp lệ và tính điểm tổng kết | 5 | 8 giờ | 4 | Sprint 1 |
| US-007 | Xuất bảng điểm (Excel/CSV) | 3 | 5 giờ | 5 | Sprint 1 |
| US-006 | Tra cứu điểm theo lớp, môn, sinh viên | 3 | 5 giờ | 6 | Sprint 2 |
| US-008 | Báo cáo tổng hợp kết quả học tập | 5 | 8 giờ | 7 | Sprint 2 |
| US-002 | Quản lý lớp, sinh viên, môn học (CRUD) | 5 | 8 giờ | 8 | Sprint 3 |
| US-009 | Quản lý tài khoản và phân quyền | 5 | 8 giờ | 9 | Sprint 3 |

## 2.2.5. Bug Backlog (từ Sprint 1 testing)

| Bug ID | Mô tả | Severity | Status | Fixed in Commit |
|--------|-------|----------|--------|-----------------|
| #1 | Chuyển môn học làm mất dữ liệu điểm đang nhập dở mà không cảnh báo | High | **Closed** | a0f002e |
| #2 | Ô nhập điểm type=number không nhập được dấu phẩy (kiểu VN 7,5) | High | **Closed** | a0f002e |
| #3 | Link "Nhập điểm" từng sinh viên truyền ?sv= nhưng trang đích không xử lý | Medium | **Closed** | a0f002e |

## Kết luận chương 2

Product Backlog đã được xây dựng với 9 User Story, tổng 34 story points, 54 giờ effort. Sprint 1 (V0) hoàn thành 5 US (US-001,003,004,005,007) = 16 SP. Các tiêu chí chấp nhận được định nghĩa rõ ràng, có thể đo lường và kiểm thử (unit 27 testcases, e2e 14 testcases). 3 Bug phát hiện trong Sprint 1 đã fix và đóng. Thứ tự ưu tiên dựa trên giá trị nghiệp vụ và phụ thuộc kỹ thuật.
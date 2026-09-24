# 07. Nhật ký Sprint

## 7.1. Phân bổ câu chuyện người dùng cho các chu trình phát triển phần mềm

Mỗi Sprint thực hiện tối đa không quá 4 tuần. Điểm story point và ước tính Effort cho các Sprint phải tương đối cân bằng nhau.

**Bảng 7.1. Phân bổ User Story cho các Sprint**

| UID | User Story | Story Point | Estimation Effort | Sprint | Status |
|-----|------------|-------------|-------------------|--------|--------|
| US-001 | Xem danh sách lớp và sinh viên được phân công | 3 | 4 giờ | Sprint 1 (V0) | In Progress |
| US-003 | Nhập điểm | 3 | 5 giờ | Sprint 1 (V0) | To Do |
| US-004 | Sửa điểm | 2 | 3 giờ | Sprint 1 (V0) | To Do |
| US-005 | Kiểm tra điểm hợp lệ và tính điểm tổng kết | 5 | 8 giờ | Sprint 2 (V1.0) | To Do |
| US-006 | Tra cứu điểm theo lớp, môn, sinh viên | 3 | 5 giờ | Sprint 2 (V1.0) | To Do |
| US-007 | Xuất bảng điểm | 3 | 5 giờ | Sprint 3 (V2.0) | To Do |
| US-008 | Báo cáo tổng hợp kết quả học tập | 5 | 8 giờ | Sprint 3 (V2.0) | To Do |
| US-002 | Quản lý lớp, sinh viên, môn học (CRUD) | 5 | 8 giờ | Sprint 4 (V3.0) | To Do |
| US-009 | Quản lý tài khoản và phân quyền | 5 | 8 giờ | Sprint 4 (V3.0) | To Do |

**Tổng story point:** 34 | **Tổng estimation effort:** 54 giờ

| Sprint | Phiên bản | Story Point | Effort | Thời gian |
|--------|-----------|-------------|--------|-----------|
| Sprint 1 | V0 | 8 | 12 giờ | 24/09 - 07/10 |
| Sprint 2 | V1.0 | 8 | 13 giờ | 08/10 - 21/10 |
| Sprint 3 | V2.0 | 8 | 13 giờ | 22/10 - 04/11 |
| Sprint 4 | V3.0 | 10 | 16 giờ | 05/11 - 18/11 |

---

## 7.2. Danh sách các câu chuyện người dùng trong các chu trình phát triển phần mềm

### Sprint Backlog - Sprint 1 (V0) | 24/09/2026 - 07/10/2026

**Bảng 7.2. Sprint Backlog Sprint 1**

| UID | User Story | Story Point | Estimation Effort | Status | Acceptance Criteria | Testing | Task owner | Task | Subtask |
|-----|------------|-------------|-------------------|--------|--------------------|---------|------------|------|---------|
| US-001 | Xem danh sách lớp và sinh viên được phân công | 3 | 4 giờ | In Progress | Hiển thị danh sách lớp + sinh viên của giáo viên đăng nhập; Chỉ thấy lớp được phân công | Đăng nhập giáo viên `gv01` -> kiểm tra danh sách lớp và sinh viên | Nguyễn Đức Cảnh | Triển khai ClassListPage + StudentListPage | Dựng layout; Gọi service lấy lớp; Hiển thị sinh viên trong lớp |
| US-003 | Nhập điểm | 3 | 5 giờ | To Do | Nhập điểm theo lớp + môn; Lưu thành công và hiển thị trên bảng điểm | Mở form nhập điểm -> nhập -> lưu -> kiểm tra bảng điểm | Nguyễn Đức Cảnh | Triển khai ScoreEntryPage + ScoreForm | Xây dựng form nhập; Validate trước khi gửi; Gọi API lưu điểm |
| US-004 | Sửa điểm | 2 | 3 giờ | To Do | Sửa điểm và lưu thay đổi; Ghi nhận thời gian sửa | Sửa một điểm -> lưu -> kiểm tra giá trị mới | Nguyễn Đức Cảnh | Triển khai chức năng sửa điểm | Hiển thị form sửa; Cập nhật bản ghi điểm |

### Sprint Backlog - Sprint 2 (V1.0) | 08/10/2026 - 21/10/2026

**Bảng 7.3. Sprint Backlog Sprint 2**

| UID | User Story | Story Point | Estimation Effort | Status | Acceptance Criteria | Testing | Task owner | Task | Subtask |
|-----|------------|-------------|-------------------|--------|--------------------|---------|------------|------|---------|
| US-005 | Kiểm tra điểm hợp lệ và tính điểm tổng kết | 5 | 8 giờ | To Do | Chặn điểm ngoài thang điểm; Tính điểm tổng kết tự động theo quy tắc | Nhập điểm 15 (ngoài 0-10) -> báo lỗi; nhập hợp lệ -> điểm tổng kết đúng | Nguyễn Đức Cảnh | Triển khai utils/score.js + validation | Xây quy tắc thang điểm; Chặn giá trị lỗi; Tính điểm tổng kết |
| US-006 | Tra cứu điểm theo lớp, môn, sinh viên | 3 | 5 giờ | To Do | Lọc theo lớp/môn/sinh viên; Kết quả đúng với dữ liệu | Nhập bộ lọc -> kiểm tra kết quả hiển thị | Nguyễn Đức Cảnh | Triển khai ScoreLookupPage | Xây form lọc; Gọi API tra cứu; Hiển thị kết quả |

### Sprint Backlog - Sprint 3 (V2.0) | 22/10/2026 - 04/11/2026

**Bảng 7.4. Sprint Backlog Sprint 3**

| UID | User Story | Story Point | Estimation Effort | Status | Acceptance Criteria | Testing | Task owner | Task | Subtask |
|-----|------------|-------------|-------------------|--------|--------------------|---------|------------|------|---------|
| US-007 | Xuất bảng điểm | 3 | 5 giờ | To Do | Xuất bảng điểm đầy đủ cột; Tải được file | Xuất bảng điểm lớp -> mở file -> kiểm tra nội dung | Nguyễn Đức Cảnh | Triển khai xuất bảng điểm | Dựng dữ liệu bảng; Tạo file xuất; Tải xuống |
| US-008 | Báo cáo tổng hợp kết quả học tập | 5 | 8 giờ | To Do | Thống kê điểm cao/thấp/trung bình, tỉ lệ đạt/không đạt | Mở trang báo cáo -> kiểm tra số liệu khớp | Nguyễn Đức Cảnh | Triển khai ReportPage | Tính toán thống kê; Hiển thị biểu đồ/bảng; Kiểm tra số liệu |

### Sprint Backlog - Sprint 4 (V3.0) | 05/11/2026 - 18/11/2026

**Bảng 7.5. Sprint Backlog Sprint 4**

| UID | User Story | Story Point | Estimation Effort | Status | Acceptance Criteria | Testing | Task owner | Task | Subtask |
|-----|------------|-------------|-------------------|--------|--------------------|---------|------------|------|---------|
| US-002 | Quản lý lớp, sinh viên, môn học (CRUD) | 5 | 8 giờ | To Do | Thêm/Sửa/Xóa thành công và phản ánh trên danh sách; Xóa có xác nhận | Admin thao tác CRUD -> kiểm tra dữ liệu thay đổi | Nguyễn Đức Cảnh | Triển khai AdminClassPage | Form thêm/sửa lớp; Quản lý sinh viên, môn học; Modal xác nhận xóa |
| US-009 | Quản lý tài khoản và phân quyền | 5 | 8 giờ | To Do | Tạo/sửa/xóa tài khoản; Phân vai trò; Truy cập theo đúng vai trò | Tạo tài khoản gv -> đăng nhập -> kiểm tra quyền hạn | Nguyễn Đức Cảnh | Triển khai AdminAccountPage + LoginPage | Quản lý tài khoản; Phân vai trò; Bảo vệ route theo role |

---

## 7.3. Phát triển phiên bản sản phẩm phần mềm theo Sprint

### 7.3.1. Phiên bản phần mềm V0 (Sprint 1)

**Thời gian:** 24/09/2026 - 07/10/2026

**Mục tiêu:** Thiết lập cấu trúc dự án, triển khai chức năng cơ bản (xem danh sách lớp/sinh viên, nhập và sửa điểm)

**Kế hoạch thực hiện:**
- Ngày 1-2: Khởi tạo dự án React + Vite, cấu trúc thư mục theo chuẩn
- Ngày 3-6: Triển khai ClassListPage, StudentListPage
- Ngày 7-10: Triển khai ScoreEntryPage, ScoreForm, chức năng sửa điểm
- Ngày 11-14: Kiểm thử, fix lỗi, commit, cập nhật tài liệu

**Các tính năng hoàn thành:**
- Xem danh sách lớp và sinh viên được phân công
- Nhập điểm cho sinh viên
- Sửa điểm đã nhập

### 7.3.2. Phiên bản phần mềm V1.0 (Sprint 2)

**Thời gian:** 08/10/2026 - 21/10/2026

**Mục tiêu:** Triển khai kiểm tra điểm hợp lệ, tính điểm tổng kết và tra cứu điểm

**Các tính năng hoàn thành:**
- Kiểm tra điểm hợp lệ và tính điểm tổng kết
- Tra cứu điểm theo lớp, môn học, sinh viên

### 7.3.3. Phiên bản phần mềm V2.0 (Sprint 3)

**Thời gian:** 22/10/2026 - 04/11/2026

**Mục tiêu:** Triển khai xuất bảng điểm và báo cáo tổng hợp

**Các tính năng hoàn thành:**
- Xuất bảng điểm
- Báo cáo tổng hợp kết quả học tập

### 7.3.4. Phiên bản phần mềm V3.0 (Sprint 4)

**Thời gian:** 05/11/2026 - 18/11/2026

**Mục tiêu:** Hoàn thiện khối quản trị viên và phân quyền, phát hành sản phẩm

**Các tính năng hoàn thành:**
- Quản lý lớp, sinh viên, môn học (CRUD)
- Quản lý tài khoản và phân quyền

---

## 7.4. Kết luận chương 7

Chương 7 trình bày kế hoạch thực hiện dự án theo phương pháp Scrum với 4 Sprint. Mỗi Sprint triển khai các User Story từ Product Backlog, đáp ứng tiêu chí chấp nhận đã đề ra. Dự án phát triển từ V0 (chức năng cơ bản của giáo viên) đến V3.0 (hoàn thiện khối quản trị, sẵn sàng phát hành).
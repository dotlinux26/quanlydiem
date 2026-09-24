# 01. Tổng quan về dự án

## 1.1. Hiến chương dự án

### 1.1.1. Xác định dự án

| Thông tin | Nội dung |
|-----------|----------|
| Tên dự án | Ứng dụng quản lý nhập liệu điểm và xuất báo cáo cho giáo viên |
| Mô tả | Ứng dụng web hỗ trợ giáo viên nhập, quản lý, tra cứu và xuất báo cáo điểm; quản trị viên quản lý lớp, sinh viên, môn học, tài khoản và phân quyền |
| Nhà tài trợ | Trường Đại học Công nghiệp Hà Nội (HaUI) |
| Quản lý dự án | Nguyễn Đức Cảnh |
| Nguồn lực đội dự án | Nguyễn Đức Cảnh (PO / Scrum Master / Developer) |

### 1.1.2. Phạm vi, mục đích và mục tiêu của dự án

#### 1.1.2.1. Phạm vi

**Thuộc dự án:**
- Xem lớp và danh sách sinh viên được phân công (giáo viên)
- Nhập điểm, sửa điểm cho sinh viên (giáo viên)
- Kiểm tra điểm hợp lệ và tính điểm tổng kết
- Tra cứu điểm theo lớp, môn học và sinh viên
- Xuất bảng điểm và báo cáo tổng hợp kết quả học tập
- Quản lý lớp, sinh viên, môn học (quản trị viên)
- Quản lý tài khoản giáo viên và phân quyền (quản trị viên)

**Không thuộc dự án:**
- Ứng dụng di động (mobile)
- Actor Sinh viên (sinh viên tự xem điểm)
- Tích hợp với hệ thống quản lý đào tạo của nhà trường

#### 1.1.2.2. Mục đích

Thay thế quy trình giáo viên nhập, quản lý, tra cứu và xuất báo cáo điểm thủ công bằng hệ thống phần mềm cho phép quản lý tập trung, giảm sai sót và tiết kiệm thời gian.

#### 1.1.2.3. Mục tiêu

| Mục tiêu | Mô tả chi tiết |
|----------|----------------|
| Nhập liệu nhanh | Giáo viên nhập và sửa điểm trong vài thao tác trên web |
| Kiểm tra tự động | Hệ thống kiểm tra giá trị điểm hợp lệ và tính điểm tổng kết |
| Tra cứu linh hoạt | Tra cứu theo lớp, môn học, sinh viên |
| Báo cáo đầy đủ | Xuất bảng điểm và báo cáo tổng hợp kết quả học tập |
| Phân quyền rõ ràng | Giáo viên chỉ thao tác trên lớp được phân công; quản trị viên quản lý toàn hệ thống |

## 1.2. Các bên liên quan

| Bên liên quan | Vai trò |
|---------------|---------|
| Giáo viên | Người sử dụng chính: nhập, sửa, tra cứu điểm, xuất báo cáo |
| Quản trị viên | Quản lý lớp, sinh viên, môn học, tài khoản và phân quyền |
| Trường Đại học Công nghiệp Hà Nội | Đơn vị triển khai, đánh giá học phần |

## 1.3. Phân bổ yêu cầu theo chức năng

Xem cấu trúc tổng thể trong [`WHITEBOOK.md`](../WHITEBOOK.md):

```
Ứng dụng quản lý điểm
├── Theme 01: Quản lý dữ liệu học tập → EPIC-01 (US-001, US-002)
├── Theme 02: Quản lý điểm          → EPIC-02 (US-003, US-004, US-005)
└── Theme 03: Tra cứu và báo cáo    → EPIC-03 (US-006, US-007, US-008, US-009)
```

Tổng: **3 Theme → 3 Epic → 9 User Story → 2 Role.**
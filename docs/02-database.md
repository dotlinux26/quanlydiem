# 02. Mô hình dữ liệu & API (dự kiến)

## 2.1. Giới thiệu

Dự án phát triển ứng dụng **React + Vite (frontend)**. Mô hình dữ liệu dưới đây mô tả hợp đồng (contract) giữa frontend và backend sẽ phát triển ở giai đoạn sau. Các entity được thiết kế dựa trên nghiệp vụ trong [`WHITEBOOK.md`](../WHITEBOOK.md).

## 2.2. Các thực thể dữ liệu

### Bảng: lop

| Cột | Kiểu dữ liệu | Mô tả |
|-----|-------------|-------|
| id | INT | Mã định danh lớp |
| ten_lop | TEXT | Tên lớp |
| nam_hoc | TEXT | Năm học (ví dụ 2026-2027) |
| giao_vien_id | INT | Giáo viên phụ trách (phân công) |

### Bảng: sinh_vien

| Cột | Kiểu dữ liệu | Mô tả |
|-----|-------------|-------|
| id | INT | Mã định danh sinh viên |
| ma_sv | TEXT | Mã số sinh viên |
| ho_ten | TEXT | Họ và tên |
| lop_id | INT | Lớp của sinh viên |

### Bảng: mon_hoc

| Cột | Kiểu dữ liệu | Mô tả |
|-----|-------------|-------|
| id | INT | Mã định danh môn học |
| ma_mon | TEXT | Mã môn học |
| ten_mon | TEXT | Tên môn học |
| so_tin_chi | INT | Số tín chỉ |

### Bảng: diem

| Cột | Kiểu dữ liệu | Mô tả |
|-----|-------------|-------|
| id | INT | Mã định danh bản ghi điểm |
| sinh_vien_id | INT | Sinh viên |
| mon_hoc_id | INT | Môn học |
| lop_id | INT | Lớp học |
| diem_thanh_phan | DECIMAL | Điểm thành phần |
| diem_tong_ket | DECIMAL | Điểm tổng kết (hệ thống tính) |
| created_at | TIMESTAMP | Thời điểm nhập |
| updated_at | TIMESTAMP | Thời điểm sửa gần nhất |

### Bảng: tai_khoan

| Cột | Kiểu dữ liệu | Mô tả |
|-----|-------------|-------|
| id | INT | Mã định danh |
| username | TEXT | Tên đăng nhập |
| password_hash | TEXT | Mật khẩu (hash) |
| role | TEXT | Vai trò: `giao_vien` / `admin` |
| giao_vien_id | INT | Liên kết tài khoản - giáo viên |

## 2.3. API (dự kiến)

| Method | Endpoint | Mô tả | Liên quan |
|--------|----------|-------|-----------|
| GET | `/api/lop` | Danh sách lớp của giáo viên | US-001 |
| POST | `/api/lop` | Thêm lớp | US-002 |
| PUT | `/api/lop/:id` | Sửa lớp | US-002 |
| DELETE | `/api/lop/:id` | Xóa lớp | US-002 |
| GET | `/api/lop/:id/sinh-vien` | Danh sách sinh viên trong lớp | US-001 |
| GET | `/api/mon-hoc` | Danh sách môn học | US-002 |
| GET | `/api/diem?lop=&mon=&sv=` | Tra cứu điểm | US-006 |
| POST | `/api/diem` | Nhập điểm | US-003 |
| PUT | `/api/diem/:id` | Sửa điểm | US-004 |
| GET | `/api/diem/:id/tong-ket` | Tính điểm tổng kết | US-005 |
| GET | `/api/bang-diem/:lop/:mon` | Xuất bảng điểm | US-007 |
| GET | `/api/bao-cao/:lop` | Báo cáo tổng hợp | US-008 |
| POST | `/api/auth/tai-khoan` | Quản lý tài khoản | US-009 |
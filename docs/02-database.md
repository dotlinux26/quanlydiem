# 02. Mô hình dữ liệu & API Contract

## 2.1. Giới thiệu

Dự án phát triển ứng dụng **React + Vite (frontend-only, mock DB bằng localStorage)**. Mô hình dữ liệu dưới đây mô tả hợp đồng (contract) giữa frontend và backend sẽ phát triển ở giai đoạn sau. Các entity được thiết kế dựa trên nghiệp vụ trong [`WHITEBOOK.md`](../WHITEBOOK.md).

Hiện tại: **localStorage** đóng vai trò embedded database qua module `src/db/store.js`, seed dữ liệu qua `src/db/seed.js`.

## 2.2. Các thực thể dữ liệu

### Bảng: lop (Lớp học)

| Cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
|-----|-------------|-----------|-------|
| id | INT | PK, NOT NULL | Mã định danh lớp |
| ten | TEXT | NOT NULL | Tên lớp (ví dụ: CNTT - K18A) |
| namHoc | TEXT | NOT NULL | Năm học (ví dụ: 2026-2027) |
| giaoVienId | INT | FK → tai_khoan.id, NULLABLE | Giáo viên phụ trách (phân công) |

**Dữ liệu seed (3 bản ghi):**
| id | ten | namHoc | giaoVienId |
|----|-----|--------|------------|
| 1 | CNTT - K18A | 2026-2027 | 1 (gv01) |
| 2 | CNTT - K18B | 2026-2027 | 1 (gv01) |
| 3 | KTPM - K18A | 2026-2027 | 1 (gv01) |

### Bảng: sinh_vien (Sinh viên)

| Cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
|-----|-------------|-----------|-------|
| id | INT | PK, NOT NULL | Mã định danh sinh viên |
| ma | TEXT | NOT NULL, UNIQUE | Mã số sinh viên (SV0001–SV0015) |
| hoTen | TEXT | NOT NULL | Họ và tên |
| lopId | INT | FK → lop.id, NOT NULL | Lớp của sinh viên |

**Dữ liệu seed (15 bản ghi, 5 SV / lớp):**
- Lớp 1: SV0001–SV0005
- Lớp 2: SV0006–SV0010
- Lớp 3: SV0011–SV0015

### Bảng: mon_hoc (Môn học)

| Cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
|-----|-------------|-----------|-------|
| id | INT | PK, NOT NULL | Mã định danh môn học |
| ma | TEXT | NOT NULL, UNIQUE | Mã môn học (TIN101, TIN102, TIN103) |
| ten | TEXT | NOT NULL | Tên môn học |
| soTinChi | INT | NOT NULL | Số tín chỉ (mặc định 3) |

**Dữ liệu seed (3 bản ghi):**
| id | ma | ten | soTinChi |
|----|----|-----|----------|
| 1 | TIN101 | Lập trình C | 3 |
| 2 | TIN102 | Cấu trúc dữ liệu | 3 |
| 3 | TIN103 | Cơ sở dữ liệu | 3 |

### Bảng: diem (Điểm)

| Cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
|-----|-------------|-----------|-------|
| id | INT | PK, NOT NULL, AUTOINCREMENT | Mã định danh bản ghi điểm |
| sinhVienId | INT | FK → sinh_vien.id, NOT NULL | Sinh viên |
| monHocId | INT | FK → mon_hoc.id, NOT NULL | Môn học |
| lopId | INT | FK → lop.id, NOT NULL | Lớp học |
| thuongKy | DECIMAL(3,1) | NULLABLE | Điểm thường kỳ (0–10) |
| giuaKy | DECIMAL(3,1) | NULLABLE | Điểm giữa kỳ (0–10) |
| cuoiKy | DECIMAL(3,1) | NULLABLE | Điểm cuối kỳ (0–10) |
| tongKet | DECIMAL(3,1) | NULLABLE | Điểm tổng kết (hệ thống tính) |
| createdAt | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Thời điểm nhập |
| updatedAt | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Thời điểm sửa gần nhất |

**Ràng buộc nghiệp vụ:**
- UNIQUE(sinhVienId, monHocId, lopId) — một SV chỉ có 1 bản ghi điểm / môn / lớp
- `tongKet = ROUND(thuongKy×0.3 + giuaKy×0.3 + cuoiKy×0.4, 1)`
- Mỗi cột điểm ∈ [0, 10], cho phép 1 chữ số thập phân

**Dữ liệu seed (5 bản ghi — lớp 1, môn 1):**
| sinhVienId | thuongKy | giuaKy | cuoiKy | tongKet |
|------------|----------|--------|--------|---------|
| 1 | 8.0 | 7.5 | 9.0 | 8.3 |
| 2 | 6.0 | 6.5 | 7.0 | 6.6 |
| 3 | 9.0 | 8.0 | 8.5 | 8.5 |
| 4 | 5.0 | 5.5 | 6.0 | 5.6 |
| 5 | 7.5 | 7.0 | 8.0 | 7.6 |

### Bảng: tai_khoan (Tài khoản)

| Cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
|-----|-------------|-----------|-------|
| id | INT | PK, NOT NULL | Mã định danh |
| username | TEXT | NOT NULL, UNIQUE | Tên đăng nhập |
| password | TEXT | NOT NULL | Mật khẩu (plaintext cho demo, hash bcrypt cho production) |
| role | TEXT | NOT NULL, CHECK('GIAO_VIEN','QUAN_LY') | Vai trò |
| name | TEXT | NOT NULL | Tên hiển thị |
| giaoVienId | INT | FK → giao_vien.id (tương lai), NULLABLE | Liên kết tài khoản - giáo viên |

**Dữ liệu seed (2 bản ghi):**
| id | username | password | role | name | giaoVienId |
|----|----------|----------|------|------|------------|
| 1 | gv01 | 123456 | GIAO_VIEN | Nguyễn Văn Giáo | 1 |
| 2 | quanly01 | 123456 | QUAN_LY | Người quản lý | NULL |

## 2.3. Store API (localStorage abstraction)

File: `src/db/store.js`

```js
const DB_KEY = 'quanlydiem_db_v2'

// Load toàn bộ DB
function loadDb() { ... }

// Lưu toàn bộ DB
function saveDb(db) { ... }

// Reset về seed data
function resetDb() { ... }
```

**Cấu trúc object DB:**
```js
{
  lops: [...],
  sinhViens: [...],
  monHocs: [...],
  diems: [...],
  users: [...]
}
```

## 2.4. Service API (frontend internal)

### lopService (`src/services/lopService.js`)

| Hàm | Tham số | Trả về | Mô tả |
|-----|---------|--------|-------|
| `listLops(user)` | `{id, role, ...}` | `Promise<Lop[]>` | Danh sách lớp: người quản lý lấy tất cả, giáo viên lọc `giaoVienId === user.id` |
| `getLop(id, user)` | `id, user` | `Promise<Lop|null>` | Lấy 1 lớp, kiểm tra quyền giáo viên |
| `listSinhViens(lopId)` | `lopId` | `Promise<SinhVien[]>` | Danh sách SV trong lớp |
| `listMonHocs()` | - | `Promise<MonHoc[]>` | Danh sách tất cả môn học |

### diemService (`src/services/diemService.js`)

| Hàm | Tham số | Trả về | Mô tả |
|-----|---------|--------|-------|
| `listDiems({lopId, monHocId})` | object | `Promise<Diem[]>` | Lọc điểm theo lớp + môn |
| `saveDiem(data)` | `{id?, sinhVienId, lopId, monHocId, thuongKy, giuaKy, cuoiKy}` | `Promise<Diem>` | Upsert: tạo mới hoặc cập nhật, tự tính `tongKet`, validate 0–10 |
| `removeDiem(id)` | `id` | `Promise<void>` | Xóa bản ghi điểm |

**Validation trong saveDiem:**
```js
// Tự động tính tongKet nếu đủ 3 cột
if (thuongKy !== null && giuaKy !== null && cuoiKy !== null) {
  tongKet = roundTo(thuongKy * 0.3 + giuaKy * 0.3 + cuoiKy * 0.4, 1)
}
// Reject nếu bất kỳ cột nào < 0 hoặc > 10
```

### authService (`src/services/authService.js`)

| Hàm | Tham số | Trả về | Mô tả |
|-----|---------|--------|-------|
| `login(username, password)` | string, string | `Promise<Session|null>` | Tìm user trong DB, so sánh password, lưu session vào localStorage |
| `logout()` | - | `void` | Xóa session |
| `getCurrentUser()` | - | `Session|null` | Đọc session từ localStorage |
| `createAccount(account)` | object | `Promise<Account>` | Người quản lý tạo tài khoản mới |

## 2.5. API Contract (dự kiến cho backend)

| Method | Endpoint | Mô tả | Liên quan US |
|--------|----------|-------|--------------|
| GET | `/api/lop` | Danh sách lớp của giáo viên | US-001 |
| POST | `/api/lop` | Thêm lớp | US-002 |
| PUT | `/api/lop/:id` | Sửa lớp | US-002 |
| DELETE | `/api/lop/:id` | Xóa lớp | US-002 |
| GET | `/api/lop/:id/sinh-vien` | Danh sách sinh viên trong lớp | US-001 |
| GET | `/api/mon-hoc` | Danh sách môn học | US-002 |
| GET | `/api/diem?lop=&mon=&sv=` | Tra cứu điểm | US-008 |
| POST | `/api/diem` | Nhập điểm | US-005 |
| PUT | `/api/diem/:id` | Sửa điểm | US-006 |
| GET | `/api/diem/:id/tong-ket` | Tính điểm tổng kết | US-007 |
| GET | `/api/bang-diem/:lop/:mon` | Xuất bảng điểm (Excel/CSV) | US-009 |
| GET | `/api/bao-cao/:lop` | Báo cáo tổng hợp | US-010 |
| POST | `/api/auth/tai-khoan` | Quản trị tài khoản | US-011 |

## 2.6. Quy tắc điểm (constants/scoreRules.js)

```js
export const SCORE = { MIN: 0, MAX: 10, STEP: 0.5 }
export const SCORE_COLUMNS = [
  { key: 'thuongKy', label: 'Thường kỳ', weight: 0.3 },
  { key: 'giuaKy', label: 'Giữa kỳ', weight: 0.3 },
  { key: 'cuoiKy', label: 'Cuối kỳ', weight: 0.4 },
]
```

## Kết luận chương 2

Chương 2 trình bày mô hình dữ liệu chi tiết 5 bảng chính, dữ liệu seed 15 SV / 3 lớp / 3 môn / 2 user (GV + Người quản lý), service API nội bộ hiện tại và API contract dự kiến cho backend. Việc dùng localStorage làm mock DB cho phép phát triển song song frontend mà không phụ thuộc backend. Chương 3 sẽ trình bày thiết kế module frontend.
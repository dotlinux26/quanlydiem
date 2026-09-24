# 03. Thiết kế module

## 3.1. Tổng quan kiến trúc module

```
┌───────────────────────────────────────┐
│            quanlydiem                 │
├─────────────┬─────────────────────────┤
│  Module     │  Chức năng              │
├─────────────┼─────────────────────────┤
│  Router     │  Điều hướng trang theo chức năng │
│  Pages      │  Trang giao diện từng Use Case   │
│  Components │  Component dùng chung (bảng, form, modal) │
│  Services   │  Gọi API, xử lý dữ liệu              │
│  Utils      │  Hàm tiện ích (kiểm tra điểm, định dạng) │
│  Constants  │  Hằng số (quy tắc điểm, vai trò)       │
└─────────────┴─────────────────────────┘
```

## 3.2. Module Pages (src/pages)

Mỗi trang tương ứng một nhóm Use Case.

| Trang | Chức năng | User Story |
|-------|-----------|------------|
| LoginPage | Đăng nhập, phân quyền | US-009 |
| ClassListPage | Danh sách lớp được phân công | US-001 |
| StudentListPage | Danh sách sinh viên trong lớp | US-001 |
| ScoreEntryPage | Nhập / sửa điểm | US-003, US-004 |
| ScoreLookupPage | Tra cứu điểm theo lớp, môn, sinh viên | US-006 |
| ScoreboardPage | Xuất bảng điểm | US-007 |
| ReportPage | Báo cáo tổng hợp kết quả học tập | US-008 |
| AdminClassPage | Quản lý lớp, sinh viên, môn học | US-002 |
| AdminAccountPage | Quản lý tài khoản giáo viên | US-009 |

## 3.3. Module Components (src/components)

| Component | Chức năng |
|-----------|-----------|
| DataTable | Bảng dữ liệu dùng chung (sort, phân trang) |
| ScoreForm | Form nhập / sửa điểm |
| Modal | Hộp thoại xác nhận (xóa, cảnh báo) |
| Navbar | Thanh điều hướng theo vai trò |
| ScoreValidation | Hiển thị thông báo điểm không hợp lệ |

## 3.4. Module Services (src/services)

| Service | Chức năng | Endpoint |
|---------|-----------|----------|
| `lopService` | CRUD lớp | `/api/lop*` |
| `sinhVienService` | CRUD sinh viên | `/api/sinh-vien*` |
| `monHocService` | CRUD môn học | `/api/mon-hoc*` |
| `diemService` | CRUD + tính điểm | `/api/diem*` |
| `baoCaoService` | Bảng điểm + báo cáo | `/api/bang-diem*`, `/api/bao-cao*` |
| `authService` | Đăng nhập, phân quyền | `/api/auth*` |

## 3.5. Module Utils & Constants

| File | Chức năng |
|------|-----------|
| `utils/score.js` | Kiểm tra điểm hợp lệ (0–10), tính điểm tổng kết |
| `utils/format.js` | Định dạng ngày giờ, điểm, số liệu báo cáo |
| `constants/roles.js` | Vai trò: `GIAO_VIEN`, `ADMIN` |
| `constants/scoreRules.js` | Quy tắc thang điểm áp dụng |
# 01. Tổng quan về dự án

## 1.1. Hiến chương dự án

### 1.1.1. Xác định dự án

| Thông tin | Nội dung |
|-----------|----------|
| Tên dự án | Phát triển dự án website quản lý nhập liệu điểm và xuất báo cáo cho giáo viên |
| Mô tả | Ứng dụng web React + Vite hỗ trợ giáo viên nhập, quản lý, tra cứu và xuất báo cáo điểm; quản trị viên quản lý lớp, sinh viên, môn học, tài khoản và phân quyền |
| Nhà tài trợ | Trường Đại học Công nghiệp Hà Nội (HaUI) |
| Quản lý dự án | Nguyễn Đức Cảnh |
| Nguồn lực đội dự án | Nguyễn Đức Cảnh (PO / Scrum Master / Developer) |

### 1.1.2. Phạm vi, mục đích và mục tiêu của dự án

#### 1.1.2.1. Phạm vi

**Thuộc dự án:**
- Xem lớp và danh sách sinh viên được phân công (giáo viên)
- Nhập điểm, sửa điểm cho sinh viên (giáo viên)
- Kiểm tra điểm hợp lệ và tính điểm tổng kết tự động
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
| MT1 | Xây dựng giao diện nhập/sửa điểm theo lớp + môn học (ScoreEntryPage) |
| MT2 | Triển khai kiểm tra điểm hợp lệ (0–10) và tính điểm tổng kết (thường kỳ×0.3 + giữa kỳ×0.3 + cuối kỳ×0.4) |
| MT3 | Phân quyền route & dữ liệu: giáo viên chỉ thấy lớp được phân công (role GIAO_VIEN) |
| MT4 | Hoàn thành 4 User Story Sprint 1 (US-001, US-003, US-004, US-005) = 13 SP |
| MT5 | Đóng gói release v0.1.0 (Sprint 1) |

## 1.2. Môi trường và công cụ hỗ trợ phát triển

### 1.2.1. Môi trường phát triển

- **IDE:** VS Code
- **Quản lý mã nguồn:** Git + GitHub (dotlinux26/quanlydiem)
- **Package manager:** npm 11.x
- **Runtime:** Node.js 24.x
- **OS mục tiêu:** Web (Chrome/Edge/Firefox)

### 1.2.2. Công cụ phát triển

| Danh mục | Công cụ | Mô tả |
|----------|---------|-------|
| Framework | React 19 | UI component-based |
| Build tool | Vite 8 | Dev server HMR, production build |
| Router | React Router 7 | SPA routing, protected routes |
| Lint | Oxlint | Fast lint, React rules |
| Test (unit) | Node.js test runner | 27 test cases pass |
| Test (E2E) | Playwright + Chromium | 14 test cases pass |
| Local DB | localStorage | Mock data, SQLite-like API qua store.js |
| Deploy | GitHub Pages / Netlify | Static hosting |

## 1.3. Phân bổ yêu cầu theo chức năng

Xem cấu trúc tổng thể trong [`WHITEBOOK.md`](../WHITEBOOK.md):

```
Ứng dụng quản lý điểm
├── Theme 01: Quản lý dữ liệu học tập → EPIC-01 (US-001, US-002)
├── Theme 02: Quản lý điểm          → EPIC-02 (US-003, US-004, US-005)
└── Theme 03: Tra cứu và báo cáo    → EPIC-03 (US-006, US-007, US-008, US-009)
```

Tổng: **3 Theme → 3 Epic → 9 User Story → 2 Role.**

## Kết luận chương 1
Chương 1 đã trình bày hiến chương dự án: xác định dự án, phạm vi, mục tiêu, môi trường và công cụ phát triển. Các yêu cầu chức năng được định nghĩa rõ ràng qua 9 User Story. Chương 2 sẽ trình bày chi tiết mô hình dữ liệu và API contract.
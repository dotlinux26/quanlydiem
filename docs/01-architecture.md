# 01. Tổng quan về dự án

## 1.1. Hiến chương dự án

### 1.1.1. Xác định dự án

| Thông tin | Nội dung |
|-----------|----------|
| Tên dự án | Phát triển dự án website quản lý nhập liệu điểm và xuất báo cáo cho giáo viên |
| Mô tả | Ứng dụng web React + Vite hỗ trợ giáo viên nhập, quản lý, tra cứu và xuất báo cáo điểm; người quản lý quản lý lớp, sinh viên, môn học, tài khoản và phân quyền |
| Nhà tài trợ | Trường Đại học Công nghiệp Hà Nội (HaUI) |
| Quản lý dự án | Nguyễn Đức Cảnh |
| Nguồn lực đội dự án | Nguyễn Đức Cảnh (PO / Scrum Master / Developer) |

### 1.1.2. Phạm vi, mục đích và mục tiêu của dự án

#### 1.1.2.1. Phạm vi

**Thuộc dự án (Sprint 1 - V0 đã hoàn thành):**
- Xem danh sách lớp và sinh viên được phân công (giáo viên) — US-001
- Nhập điểm, sửa điểm cho sinh viên theo lớp + môn học (giáo viên) — US-005, US-006
- Kiểm tra điểm hợp lệ (0–10) và tính điểm tổng kết tự động (TK = 0.3×TK + 0.3×GK + 0.4×CK) — US-007
- Phân quyền route & dữ liệu: giáo viên chỉ thấy lớp được phân công, người quản lý thấy tất cả
- Xuất bảng điểm ra file Excel (.xlsx) và CSV — US-009 (nâng cao Sprint 1)

**Thuộc dự án (Sprint 2 - V1.0):**
- Quản lý lớp học (CRUD + phân công GV) — US-002
- Quản lý sinh viên (CRUD + import Excel) — US-003
- Quản lý môn học (CRUD) — US-004
- Tra cứu điểm theo lớp, môn học, sinh viên (filter, phân trang) — US-008

**Thuộc dự án (Sprint 3 - V2.0):**
- Báo cáo tổng hợp kết quả học tập (stats + chart) — US-010
- Quản trị tài khoản & phân quyền — US-011

**Không thuộc dự án:**
- Ứng dụng di động (mobile app)
- Actor Sinh viên (sinh viên tự xem điểm)
- Tích hợp với hệ thống quản lý đào tạo của nhà trường
- Giao diện đồ họa cho thao tác kéo-thả (drag-drop)

#### 1.1.2.2. Mục đích

Thay thế quy trình giáo viên nhập, quản lý, tra cứu và xuất báo cáo điểm thủ công bằng hệ thống phần mềm cho phép quản lý tập trung, giảm sai sót và tiết kiệm thời gian.

#### 1.1.2.3. Mục tiêu

| Mục tiêu | Mô tả chi tiết | Sprint |
|----------|----------------|--------|
| MT1 | Xây dựng giao diện nhập/sửa điểm theo lớp + môn học (ScoreEntryPage) | V0 |
| MT2 | Triển khai kiểm tra điểm hợp lệ (0–10) và tính điểm tổng kết (thường kỳ×0.3 + giữa kỳ×0.3 + cuối kỳ×0.4) | V0 |
| MT3 | Phân quyền route & dữ liệu: giáo viên chỉ thấy lớp được phân công (role GIAO_VIEN) | V0 |
| MT4 | Xuất bảng điểm ra Excel/CSV bằng SheetJS (xlsx) | V0 |
| MT5 | Hoàn thành 5 User Story Sprint 1 (US-001, US-005, US-006, US-007, US-009) = 19 SP | V0 |
| MT6 | Quản trị dữ liệu Lớp/SV/Môn + Tra cứu (Sprint 2) | V1.0 |
| MT7 | Báo cáo tổng hợp + Quản trị tài khoản (Sprint 3) | V2.0 |
| MT8 | Đóng gói release v0.1.0 (Sprint 1) → v1.0.0 (Sprint 2) → v2.0.0 (Sprint 3) | - |

## 1.2. Môi trường và công cụ hỗ trợ phát triển

### 1.2.1. Môi trường phát triển

- **IDE:** VS Code (khuyên dùng extensions: ES7+ React, Oxlint, Prettier)
- **Quản lý mã nguồn:** Git + GitHub (dotlinux26/quanlydiem)
- **Package manager:** npm 11.x
- **Runtime:** Node.js 24.x (LTS)
- **OS mục tiêu:** Web — Chrome 118+, Edge 118+, Firefox 119+

### 1.2.2. Công cụ phát triển

| Danh mục | Công cụ | Phiên bản | Mô tả |
|----------|---------|-----------|-------|
| Framework UI | React | 19.x | Component-based, hooks, concurrent features |
| Build tool | Vite | 8.x | Dev server HMR, optimized production build |
| Router | React Router | 7.x | SPA routing, protected routes, data loading |
| Lint | Oxlint | 1.x | Fast lint, React rules (hooks, JSX) |
| Test (unit) | Node.js test runner | built-in | 27 test cases, zero-config |
| Test (E2E) | Playwright | 1.48+ | Chromium system, 14 test cases |
| Mock DB | localStorage + store.js | custom | SQLite-like API, seed 15 SV / 3 lớp / 3 môn |
| Export file | SheetJS (xlsx) | 0.18+ | Xuất .xlsx / .csv từ JSON |
| Deploy | GitHub Pages / Netlify | - | Static hosting |

## 1.3. Phân bổ yêu cầu theo chức năng

Xem cấu trúc tổng thể trong [`WHITEBOOK.md`](../WHITEBOOK.md):

```
Ứng dụng quản lý điểm
├── Theme 01: Quản lý dữ liệu học tập → EPIC-01 (US-001)
├── Theme 02: Quản lý dữ liệu học tập (QL) → EPIC-02 (US-002, US-003, US-004)
├── Theme 03: Quản lý điểm          → EPIC-03 (US-005, US-006, US-007)
├── Theme 04: Tra cứu & Báo cáo     → EPIC-04 (US-008, US-009, US-010)
└── Theme 05: Quản trị hệ thống      → EPIC-05 (US-011)
```

Tổng: **5 Theme → 5 Epic → 11 User Story → 2 Role (GIAO_VIEN, QUAN_LY).**

## Kết luận chương 1

Chương 1 đã trình bày hiến chương dự án: xác định dự án, phạm vi, mục tiêu, môi trường và công cụ phát triển. Các yêu cầu chức năng được định nghĩa rõ ràng qua 11 User Story, phân bổ 3 Sprint. Chương 2 sẽ trình bày chi tiết mô hình dữ liệu và API contract.
# 07. Nhật ký Sprint

## 7.1. Phân bổ câu chuyện người dùng cho các chu trình phát triển phần mềm

Dự án được thực hiện trong **3 Sprint**. Mỗi Sprint tối đa không quá 4 tuần. Điểm story point và ước tính Effort giữa các Sprint được phân bổ tương đối cân bằng nhau.

**Bảng 7.1. Phân bổ User Story cho các Sprint**

| UID | User Story | Story Point | Estimation Effort | Sprint | Status |
|-----|------------|-------------|-------------------|--------|--------|
| US-001 | Xem danh sách lớp và sinh viên được phân công | 3 | 4 giờ | Sprint 1 (V0) | **Done** |
| US-003 | Nhập điểm | 3 | 5 giờ | Sprint 1 (V0) | **Done** |
| US-004 | Sửa điểm | 2 | 3 giờ | Sprint 1 (V0) | **Done** |
| US-005 | Kiểm tra điểm hợp lệ và tính điểm tổng kết | 5 | 8 giờ | Sprint 1 (V0) | **Done** |
| US-007 | Xuất bảng điểm (Excel/CSV) | 3 | 5 giờ | Sprint 1 (V0) | **Done** |
| US-006 | Tra cứu điểm theo lớp, môn, sinh viên | 3 | 5 giờ | Sprint 2 (V1.0) | To Do |
| US-008 | Báo cáo tổng hợp kết quả học tập | 5 | 8 giờ | Sprint 2 (V1.0) | To Do |
| US-002 | Quản lý lớp, sinh viên, môn học (CRUD) | 5 | 8 giờ | Sprint 3 (V2.0) | To Do |
| US-009 | Quản lý tài khoản và phân quyền | 5 | 8 giờ | Sprint 3 (V2.0) | To Do |

**Tổng story point:** 34 | **Tổng estimation effort:** 54 giờ

| Sprint | Phiên bản | Story Point | Effort | Thời gian dự kiến | Thời gian thực tế |
|--------|-----------|-------------|--------|-------------------|-------------------|
| Sprint 1 | V0 | 16 | 25 giờ | 24/09 - 07/10 | 24/09 - 24/09 (1 ngày, parallel) |
| Sprint 2 | V1.0 | 11 | 18 giờ | 08/10 - 21/10 | — |
| Sprint 3 | V2.0 | 10 | 16 giờ | 22/10 - 04/11 | — |

> **Ghi chú:** Sprint 1 hoàn thành sớm hơn dự kiến do phát triển song song (code + test + docs cùng lúc), và scope mở rộng thêm US-007 (export) vào Sprint 1 thay vì Sprint 2.

---

## 7.2. Danh sách các câu chuyện người dùng trong các chu trình phát triển phần mềm

### Sprint Backlog - Sprint 1 (V0) | 24/09/2026

**Bảng 7.2. Sprint Backlog Sprint 1 — HOÀN THÀNH**

| UID | User Story | SP | Effort | Status | Acceptance Criteria | Testing | Task owner | Task | Subtask |
|-----|------------|----|--------|--------|--------------------|---------|------------|------|---------|
| US-001 | Xem danh sách lớp và sinh viên được phân công | 3 | 4h | **Done** | Hiển thị lớp + SV của GV đăng nhập; Chỉ thấy lớp phân công; Admin thấy tất cả | Đăng nhập gv01 → 3 lớp → click → 5 SV; admin01 → 3 lớp | Nguyễn Đức Cảnh | ClassListPage + StudentListPage | Layout card/table; Service listLops (filter role); Service listSinhViens; Link "Xem sinh viên" |
| US-003 | Nhập điểm | 3 | 5h | **Done** | Nhập điểm theo lớp + môn; Lưu thành công; Hiển thị trên bảng; Tổng kết auto | Mở /lop/1/diem → nhập 7,5/8/9 → Lưu → tongKet 8,3 | Nguyễn Đức Cảnh | ScoreEntryPage + ScoreForm | ScoreForm 3 input ngang; handleChange real-time; saveRow upsert diemService |
| US-004 | Sửa điểm | 2 | 3h | **Done** | Sửa điểm đã lưu; Cập nhật tongKet; Ghi nhận updatedAt | Sửa 8→9 → Lưu → tongKet 8,5; status "Đã lưu" | Nguyễn Đức Cảnh | Chức năng sửa điểm | saveDiem upsert (id có thì update); row.status='saved' |
| US-005 | Kiểm tra điểm hợp lệ và tính điểm tổng kết | 5 | 8h | **Done** | Chặn <0, >10; Chặn chữ ("Điểm không hợp lệ"); tongKet = 0.3×TK+0.3×GK+0.4×CK; format VN dấu phẩy | Unit: 27 testcases (scoreInputError, calcSummary); E2E: 15, abc, 7,5 | Nguyễn Đức Cảnh | utils/score.js + validation | parseScore (hiểu dấu phẩy); scoreInputError; calcSummary; roundTo |
| US-007 | Xuất bảng điểm (Excel/CSV) | 3 | 5h | **Done** | Nút "Xuất Excel" + "Xuất CSV"; File đúng cột STT, Mã SV, Họ tên, TK, GK, CK, Tổng kết, Trạng thái | E2E: click Xuất Excel → file .xlsx mở được; click Xuất CSV → file .csv | Nguyễn Đức Cảnh | Export feature | SheetJS (xlsx) json_to_sheet; handleExport('xlsx'/'csv'); filename có tên lớp + mã môn |

**Bug fixes trong Sprint 1 (từ E2E testing):**

| Bug ID | Mô tả | Root Cause | Fix | Commit |
|--------|-------|------------|-----|--------|
| #1 | Chuyển môn mất dữ liệu dirty | Không có confirm khi `monId` change | `handleMonChange` check `dirtyCount>0` → `window.confirm` | a0f002e |
| #2 | Input number không nhận dấu phẩy | `type="number"` chặn ký tự `,` | Đổi `type="text" inputMode="decimal"` + `parseScore` normalize | a0f002e |
| #3 | Link `?sv=` không highlight | ScoreEntryPage bỏ qua query param | `useSearchParams` → `highlightSvId` → scrollIntoView + `.row-highlight` CSS | a0f002e |

---

### Sprint Backlog - Sprint 2 (V1.0) | 08/10/2026 - 21/10/2026

**Bảng 7.3. Sprint Backlog Sprint 2 — KẾ HOẠCH**

| UID | User Story | SP | Effort | Status | Acceptance Criteria | Testing | Task owner | Task | Subtask |
|-----|------------|----|--------|--------|--------------------|---------|------------|------|---------|
| US-006 | Tra cứu điểm theo lớp, môn, sinh viên | 3 | 5h | To Do | Form lọc (lớp, môn, SV); Kết quả table có phân trang; Tổng kết hiển thị | Unit: filter logic; E2E: lọc lớp 1 + môn 1 → 5 rows | Nguyễn Đức Cảnh | ScoreLookupPage | Form lọc (select + input); Service listDiems query; Table pagination |
| US-008 | Báo cáo tổng hợp kết quả học tập | 5 | 8h | To Do | Thống kê: max/min/avg, tỉ lệ đạt (≥5), phân bố điểm; Biểu đồ (chart.js) | Unit: stats functions; E2E: mở báo cáo lớp 1 → số liệu khớp | Nguyễn Đức Cảnh | ReportPage | Tính toán stats; Chart.js bar/pie; Export PDF (jspdf) |

---

### Sprint Backlog - Sprint 3 (V2.0) | 22/10/2026 - 04/11/2026

**Bảng 7.4. Sprint Backlog Sprint 3 — KẾ HOẠCH**

| UID | User Story | SP | Effort | Status | Acceptance Criteria | Testing | Task owner | Task | Subtask |
|-----|------------|----|--------|--------|--------------------|---------|------------|------|---------|
| US-002 | Quản lý lớp, sinh viên, môn học (CRUD) | 5 | 8h | To Do | Admin: Thêm/Sửa/Xóa lớp, SV, môn; Modal confirm xóa; Phân công GV cho lớp | Unit: CRUD service; E2E: admin tạo lớp → thấy ngay | Nguyễn Đức Cảnh | AdminClassPage | Form thêm/sửa (Modal); Table với actions; Phân công GV dropdown |
| US-009 | Quản lý tài khoản và phân quyền | 5 | 8h | To Do | Admin: Tạo/sửa/xóa tài khoản; Set role GIAO_VIEN/ADMIN; Link GV; Bảo vệ route | Unit: authService createAccount; E2E: tạo gv02 → login → thấy lớp phân công | Nguyễn Đức Cảnh | AdminAccountPage + LoginPage | Table tài khoản; Modal form; Role badge; ProtectedRoute |

---

## 7.3. Phát triển phiên bản sản phẩm phần mềm theo Sprint

### 7.3.1. Phiên bản phần mềm V0 (Sprint 1) — **ĐÃ PHÁT HÀNH**

**Thời gian:** 24/09/2026 (1 ngày phát triển tập trung)

**Mục tiêu:** Thiết lập cấu trúc dự án, triển khai chức năng cơ bản của giáo viên (xem danh sách lớp/sinh viên, nhập và sửa điểm, kiểm tra điểm hợp lệ, xuất Excel/CSV)

**Kế hoạch thực hiện (thực tế):**
- **Sáng:** Khởi tạo React + Vite, cấu trúc thư mục, Design System CSS (CSS variables, components), Auth Context + ProtectedRoute
- **Trưa:** ClassListPage, StudentListPage, LoginPage, LandingPage, Mock DB seed (15 SV, 3 lớp, 3 môn, 2 user)
- **Chiều:** ScoreEntryPage (inline editing, ScoreForm ngang), Validation real-time, TongKet auto, Export xlsx/csv (SheetJS), Bug fixes (#1, #2, #3)
- **Tối:** Unit test (27 cases), E2E test (14 cases), Lint + Build, Commit + Push, GitHub Issues tạo + đóng

**Các tính năng hoàn thành (Increment V0):**

| Tính năng | Mô tả | US liên quan |
|-----------|-------|--------------|
| Đăng nhập phân quyền | gv01/123456 (GV), admin01/admin123 (Admin); redirect `from` | US-009 |
| Danh sách lớp | Card/table responsive; GV chỉ thấy lớp phân công; Admin thấy tất cả | US-001 |
| Danh sách sinh viên | 5 SV/lớp; Link "Nhập điểm" mỗi hàng (`?sv=`); Nút "Nhập điểm cả lớp" | US-001 |
| Nhập/Sửa điểm | ScoreForm 3 input ngang (Thường/Giữa/Cuối); Validate real-time; Lưu/upsert | US-003, US-004 |
| Kiểm tra điểm hợp lệ | Chặn <0, >10; Chặn chữ; Hỗ trợ dấu phẩy VN (7,5); Tổng kết auto | US-005 |
| Confirm đổi môn | Nếu có hàng dirty → `window.confirm` trước khi switch | Bug #1 |
| Highlight `?sv=` | Link từng SV → scroll + highlight row vàng | Bug #3 |
| Xuất Excel/CSV | 2 nút toolbar; SheetJS; Filename `BangDiem_{Lop}_{Mon}.xlsx` | US-007 |
| UI/UX hiện đại | Design system CSS variables; Navbar sticky; Card + Table responsive; Modal accessible; Landing marketing page | — |

**Kết quả kiểm thử:**
- Unit test: **27/27 passed** (`node test-qd.mjs`)
- E2E test: **14/14 passed** (`node e2e-qd.js`, Playwright + Chromium)
- Lint: **0 errors** (`npm run lint` — Oxlint)
- Build: **Success** (`npm run build` — 172ms, 278KB JS gzip 88KB)

**GitHub Issues:** #1, #2, #3 tạo → fix → commit `a0f002e` (`fixes #1, #2, #3`) → tự đóng / hand-close

---

### 7.3.2. Phiên bản phần mềm V1.0 (Sprint 2)

**Thời gian dự kiến:** 08/10/2026 - 21/10/2026

**Mục tiêu:** Triển khai tra cứu điểm, xuất bảng điểm nâng cao và báo cáo tổng hợp

**Các tính năng dự kiến:**
- Tra cứu điểm theo lớp, môn, sinh viên (ScoreLookupPage)
- Báo cáo tổng hợp kết quả học tập (ReportPage + Chart.js)
- Xuất PDF báo cáo (jspdf)
- Phân trang, sắp xếp bảng dữ liệu

---

### 7.3.3. Phiên bản phần mềm V2.0 (Sprint 3)

**Thời gian dự kiến:** 22/10/2026 - 04/11/2026

**Mục tiêu:** Hoàn thiện khối quản trị viên và phân quyền, phát hành sản phẩm v2.0.0

**Các tính năng dự kiến:**
- Quản lý lớp, sinh viên, môn học CRUD (AdminClassPage + Modal)
- Quản lý tài khoản giáo viên + phân quyền (AdminAccountPage)
- Phân công giáo viên cho lớp
- Audit log (tùy chọn)
- Deploy production + tài liệu người dùng cuối

---

## 7.4. Sprint Review & Retrospective - Sprint 1

### Sprint Review (Demo V0)

| Tiêu chí | Kết quả |
|----------|---------|
| Sprint Goal | ✅ Hoàn thành: Core teacher features + export |
| Increment | ✅ Deployable build (`dist/`) |
| Acceptance Criteria | ✅ 5/5 US Sprint 1 verified (manual + auto test) |
| Bug count | 3 found → 3 fixed → 0 open |
| Performance | Build 172ms, JS 278KB (gz 88KB), LCP < 1s local |

### Sprint Retrospective

| Start (Bắt đầu làm) | Stop (Ngừng làm) | Continue (Tiếp tục) |
|---------------------|------------------|---------------------|
| Viết ADR cho quyết định kiến trúc (ScoreForm layout, auth flow) | Commit trực tiếp `main` — sau dùng feature branch + PR | Chạy full test suite (unit + e2e) trước khi push |
| Thêm screenshot/video vào PR description | Hardcode màu trong component — dùng CSS variables | Conventional commit message (`feat:`, `fix:`, `docs:`) |
| Tách component nhỏ hơn (ScoreCell, ScoreInput) | Copy-paste inline style — dùng class CSS | Cập nhật docs song song với code |

**Action items cho Sprint 2:**
1. Tạo feature branch cho mỗi US
2. Setup GitHub Actions CI (lint + test + build)
3. Thêm Chart.js cho ReportPage
4. Thiết kế API contract chi tiết cho backend phase

---

## 7.5. Kết luận chương 7

Chương 7 trình bày nhật ký 3 Sprint theo Scrum. **Sprint 1 (V0) đã hoàn thành** với 5 User Story (US-001,003,004,005,007) = 16 SP, bao gồm cả 3 bug fix từ E2E testing. Phiên bản V0 cung cấp đầy đủ tính năng cốt lõi cho giáo viên: xem lớp/SV, nhập/sửa điểm có validation real-time, tính tổng kết tự động, xuất Excel/CSV, UI/UX hiện đại responsive. Sprint 2 và 3 đang ở giai đoạn kế hoạch, sẽ triển khai tra cứu, báo cáo, và khối quản trị. Dự án tuân thủ Definition of Done: lint + build + unit test + e2e test + AC verified + docs updated.
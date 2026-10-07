# 07. Nhật ký Sprint

## 7.1. Phân bổ User Story cho các Sprint

Dự án được triển khai theo mô hình Scrum với **03 Sprint**, mỗi Sprint có thời gian dự kiến không quá 04 tuần. Các User Story được phân bổ dựa trên mức độ ưu tiên, sự phụ thuộc giữa các chức năng và khả năng triển khai của nhóm.

Trong đó:

- **Sprint 1 (V0):** Tập trung hoàn thiện các chức năng cốt lõi dành cho giáo viên, bao gồm xem lớp, xem sinh viên, nhập/sửa/kiểm tra điểm và xuất bảng điểm.
- **Sprint 2 (V1.0):** Tập trung vào quản lý dữ liệu học tập gồm lớp học, sinh viên, môn học và chức năng tra cứu điểm.
- **Sprint 3 (V2.0):** Hoàn thiện quản trị tài khoản và báo cáo tổng hợp kết quả học tập.

### Bảng 7.1. Phân bổ User Story cho các Sprint

| UID | User Story | SP | Effort | Sprint | Status |
| --- | --- | --- | --- | --- | --- |
| US5.1 | GV xem danh sách lớp được phân công | 2 | 3h | Sprint 1 (V0) | **Done** |
| US5.2 | GV xem danh sách sinh viên của lớp | 2 | 3h | Sprint 1 (V0) | **Done** |
| US6.1 | GV nhập điểm cho sinh viên | 3 | 5h | Sprint 1 (V0) | **Done** |
| US6.2 | GV sửa điểm đã nhập | 2 | 3h | Sprint 1 (V0) | **Done** |
| US6.3 | Kiểm tra điểm hợp lệ 0–10, bước 0,5 | 5 | 8h | Sprint 1 (V0) | **Done** |
| US7.2 | Xuất bảng điểm Excel/CSV | 3 | 5h | Sprint 1 (V0) | **Done** |
| US1.1 | Người quản lý tạo lớp học | 2 | 3h | Sprint 2 (V1.0) | To Do |
| US1.2 | Người quản lý sửa lớp học | 2 | 3h | Sprint 2 (V1.0) | To Do |
| US1.3 | Người quản lý xóa lớp học | 2 | 2h | Sprint 2 (V1.0) | To Do |
| US1.4 | Phân công lớp học cho giáo viên | 3 | 4h | Sprint 2 (V1.0) | To Do |
| US2.1 | Import danh sách sinh viên từ Excel (tự match lớp) | 3 | 5h | Sprint 2 (V1.0) | To Do |
| US2.2 | Sửa thông tin sinh viên (mở rộng fields) | 3 | 4h | Sprint 2 (V1.0) | To Do |
| US2.3 | Xóa sinh viên | 2 | 2h | Sprint 2 (V1.0) | To Do |
| US2.4 | Chuyển sinh viên sang lớp khác | 2 | 3h | Sprint 2 (V1.0) | To Do |
| US3.1 | Tạo môn học | 2 | 3h | Sprint 2 (V1.0) | To Do |
| US3.2 | Sửa môn học | 2 | 3h | Sprint 2 (V1.0) | To Do |
| US3.3 | Xóa môn học | 2 | 2h | Sprint 2 (V1.0) | To Do |
| US7.1 | Tra cứu điểm theo lớp/môn/SV và phân trang | 3 | 5h | Sprint 2 (V1.0) | To Do |
| US4.1 | Tạo tài khoản giáo viên (bcrypt hash) | 3 | 4h | Sprint 3 (V2.0) | To Do |
| US4.2 | Sửa tài khoản giáo viên | 2 | 3h | Sprint 3 (V2.0) | To Do |
| US4.3 | Xóa tài khoản giáo viên | 2 | 2h | Sprint 3 (V2.0) | To Do |
| US4.4 | Đặt lại mật khẩu giáo viên (bcrypt) | 2 | 3h | Sprint 3 (V2.0) | To Do |
| US7.3 | Báo cáo tổng hợp và biểu đồ (Chart.js + PDF) | 5 | 8h | Sprint 3 (V2.0) | To Do |

**Tổng số User Story:** 23

### Bảng 7.2. Tổng hợp khối lượng theo Sprint

| Sprint | Phiên bản | Số US | Story Point | Effort | Thời gian dự kiến |
| --- | --- | --- | --- | --- | --- |
| Sprint 1 | V0 | 6 | 19 | 27 giờ | 24/09 - 07/10/2026 |
| Sprint 2 | V1.0 | 11 | 25 | 38 giờ | 08/10 - 21/10/2026 |
| Sprint 3 | V2.0 | 6 | 16 | 23 giờ | 22/10 - 04/11/2026 |
| **Tổng** |  | **23** | **58** | **88 giờ** |  |

> **Ghi chú:** Sprint 1 hoàn thành sớm hơn dự kiến do phát triển song song (code + test + docs cùng lúc), và scope mở rộng thêm US-007 (export) vào Sprint 1 thay vì Sprint 2.

---

# 7.2. Danh sách các User Story trong các Sprint

## 7.2.1. Sprint Backlog — Sprint 1 (V0)

**Thời gian:** 24/09/2026 - 07/10/2026

**Mục tiêu Sprint:** Hoàn thiện các chức năng cốt lõi dành cho giáo viên, bao gồm xem lớp, xem sinh viên, nhập và sửa điểm, kiểm tra điểm hợp lệ, xuất bảng điểm.

**Bảng 7.3. Sprint Backlog Sprint 1 — HOÀN THÀNH**

| UID | User Story | SP | Effort | Status | Acceptance Criteria | Testing | Task owner | Task | Subtask |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| US5.1 | GV xem danh sách lớp được phân công | 2 | 3h | **Done** | GV chỉ thấy lớp phân công; QL thấy tất cả | Đăng nhập gv01 → 3 lớp → click → 5 SV; QL → 3 lớp | Nguyễn Đức Cảnh | ClassListPage + StudentListPage | Layout card/table; Service listLops (filter role); Service listSinhViens; Link "Xem sinh viên" |
| US5.2 | GV xem danh sách sinh viên của lớp | 2 | 3h | **Done** | Hiển thị đúng SV thuộc lớp; có mã SV, họ tên | Chọn lớp → kiểm tra danh sách SV | Nguyễn Đức Cảnh | StudentListPage | Link "Nhập điểm" mỗi hàng; Nút "Nhập điểm cả lớp" |
| US6.1 | GV nhập điểm cho sinh viên | 3 | 5h | **Done** | Nhập điểm theo lớp + môn; Lưu thành công; Hiển thị trên bảng điểm; Tổng kết auto | Mở /lop/1/diem → nhập 7,5/8/9 → Lưu → tongKet 8,3 | Nguyễn Đức Cảnh | ScoreEntryPage + ScoreForm | ScoreForm 3 input ngang; handleChange real-time; saveRow upsert diemService |
| US6.2 | GV sửa điểm đã nhập | 2 | 3h | **Done** | Sửa điểm đã lưu; Cập nhật tongKet; Ghi nhận updatedAt | Sửa 8→9 → Lưu → tongKet 8,5; status "Đã lưu" | Nguyễn Đức Cảnh | Chức năng sửa điểm | saveDiem upsert (id có thì update); row.status='saved' |
| US6.3 | Kiểm tra điểm hợp lệ và tính điểm tổng kết | 5 | 8h | **Done** | Chặn <0, >10; Chặn chữ ("Điểm không hợp lệ"); tongKet = 0.3×TK+0.3×GK+0.4×CK; format VN dấu phẩy | Unit: 27 testcases (scoreInputError, calcSummary); E2E: 15, abc, 7,5 | Nguyễn Đức Cảnh | utils/score.js + validation | parseScore (hiểu dấu phẩy); scoreInputError; calcSummary; roundTo |
| US7.2 | Xuất bảng điểm (Excel/CSV) | 3 | 5h | **Done** | Nút "Xuất Excel" + "Xuất CSV"; File đúng cột STT, Mã SV, Họ tên, TX, GK, CK, Tổng kết, Điểm chữ, Trạng thái | E2E: click Xuất Excel → file .xlsx mở được; click Xuất CSV → file .csv | Nguyễn Đức Cảnh | Export feature | SheetJS (xlsx) json_to_sheet; handleExport('xlsx'/'csv'); filename có tên lớp + mã môn |

**Bug fixes trong Sprint 1 (từ E2E testing):**

| Bug ID | Mô tả | Root Cause | Fix | Commit |
|--------|-------|------------|-----|--------|
| BUG-01 | Chuyển môn mất dữ liệu dirty | Không có confirm khi `monId` change | `handleMonChange` check `dirtyCount>0` → `window.confirm` | a0f002e |
| BUG-02 | Input number không nhận dấu phẩy | `type="number"` chặn ký tự `,` | Đổi `type="text" inputMode="decimal"` + `parseScore` normalize | a0f002e |
| BUG-03 | Link `?sv=` không highlight | ScoreEntryPage bỏ qua query param | `useSearchParams` → `highlightSvId` → scrollIntoView + `.row-highlight` CSS | a0f002e |

---

### Sprint Backlog - Sprint 2 (V1.0) | 08/10/2026 - 21/10/2026

**Bảng 7.4. Sprint Backlog Sprint 2 — KẾ HOẠCH**

| UID | User Story | SP | Effort | Status | Acceptance Criteria | Testing | Task owner | Task | Subtask |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| US1.1 | QL tạo lớp học | 2 | 3h | To Do | Người quản lý: Thêm/Sửa/Xóa lớp, phân công GV; Modal confirm xóa | Unit: CRUD service; E2E: người quản lý tạo lớp → thấy ngay | Nguyễn Đức Cảnh | AdminClassesPage | Form thêm/sửa (Modal); Table với actions; Phân công GV dropdown |
| US1.2 | QL sửa lớp học | 2 | 3h | To Do | Sửa thông tin lớp và cập nhật thành công | E2E sửa lớp | Nguyễn Đức Cảnh | AdminClassesPage | Form thêm/sửa (Modal); Table với actions; Phân công GV dropdown |
| US1.3 | QL xóa lớp học | 2 | 2h | To Do | Có confirm trước khi xóa | E2E xóa lớp | Nguyễn Đức Cảnh | AdminClassesPage | Form thêm/sửa (Modal); Table với actions; Phân công GV dropdown |
| US1.4 | QL phân công lớp cho GV | 3 | 4h | To Do | Chọn GV và gán lớp thành công | E2E phân công | Nguyễn Đức Cảnh | AdminClassesPage | Form thêm/sửa (Modal); Table với actions; Phân công GV dropdown |
| US2.1 | QL import SV từ Excel (tự match lớp theo tên/mã) | 3 | 5h | To Do | Đọc file .xlsx, parse header, map cột, insert batch | Unit: parse logic; E2E: import file .xlsx → 5 SV/lớp | Nguyễn Đức Cảnh | AdminStudentsPage | Form thêm/sửa (Modal); Import Excel; Chuyển lớp dropdown |
| US2.2 | QL sửa thông tin sinh viên (mở rộng: email, SĐT, ngày sinh, giới tính, địa chỉ, ghi chú) | 3 | 4h | To Do | Thêm/Sửa/Xóa SV; Import Excel; Chuyển lớp | E2E CRUD | Nguyễn Đức Cảnh | AdminStudentsPage | Form thêm/sửa (Modal); Import Excel; Chuyển lớp dropdown |
| US2.3 | QL xóa sinh viên | 2 | 2h | To Do | Có confirm trước khi xóa; xóa cả điểm liên quan | E2E xóa SV | Nguyễn Đức Cảnh | AdminStudentsPage | Form thêm/sửa (Modal); Import Excel; Chuyển lớp dropdown |
| US2.4 | QL chuyển SV sang lớp khác | 2 | 3h | To Do | Chọn lớp mới và cập nhật thành công | E2E transfer | Nguyễn Đức Cảnh | AdminStudentsPage | Form thêm/sửa (Modal); Import Excel; Chuyển lớp dropdown |
| US3.1 | QL tạo môn học | 2 | 3h | To Do | Nhập mã môn, tên môn, tín chỉ; mã unique | E2E create | Nguyễn Đức Cảnh | AdminSubjectsPage | Form thêm/sửa (Modal); Table actions |
| US3.2 | QL sửa môn học | 2 | 3h | To Do | Cập nhật đúng thông tin môn | E2E update | Nguyễn Đức Cảnh | AdminSubjectsPage | Form thêm/sửa (Modal); Table actions |
| US3.3 | QL xóa môn học | 2 | 2h | To Do | Có confirm trước khi xóa; xóa cả điểm môn đó | E2E delete | Nguyễn Đức Cảnh | AdminSubjectsPage | Form thêm/sửa (Modal); Table actions |
| US7.1 | GV tra cứu điểm (filter, phân trang) | 3 | 5h | To Do | Form lọc (lớp, môn, SV); Kết quả table có phân trang 20 dòng; tongKet hiển thị | Unit: filter logic; E2E: lọc lớp 1 + môn 1 → 5 rows | Nguyễn Đức Cảnh | ScoreLookupPage | Form lọc (select + input); Service listDiems query; Table pagination |

---

### Sprint Backlog - Sprint 3 (V2.0) | 22/10/2026 - 04/11/2026

**Bảng 7.5. Sprint Backlog Sprint 3 — KẾ HOẠCH**

| UID | User Story | SP | Effort | Status | Acceptance Criteria | Testing | Task owner | Task | Subtask |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| US4.1 | QL tạo tài khoản GV (bcrypt hash cost 10) | 3 | 4h | To Do | Tạo tài khoản với username, password, họ tên, role GV/QL | Unit + E2E | Nguyễn Đức Cảnh | AdminAccountsPage | Table tài khoản; Modal form; Role badge (GV/QL); ProtectedRoute |
| US4.2 | QL sửa tài khoản GV | 2 | 3h | To Do | Cập nhật thông tin tài khoản | E2E update | Nguyễn Đức Cảnh | AdminAccountsPage | Table tài khoản; Modal form; Role badge (GV/QL); ProtectedRoute |
| US4.3 | QL xóa tài khoản GV | 2 | 2h | To Do | Có xác nhận trước khi xóa; không xóa QL cuối cùng | E2E delete | Nguyễn Đức Cảnh | AdminAccountsPage | Table tài khoản; Modal form; Role badge (GV/QL); ProtectedRoute |
| US4.4 | QL đặt lại mật khẩu GV (bcrypt) | 2 | 3h | To Do | Reset mật khẩu thành công, hash bcrypt | E2E reset password | Nguyễn Đức Cảnh | AdminAccountsPage | Table tài khoản; Modal form; Role badge (GV/QL); ProtectedRoute |
| US7.3 | GV xem báo cáo tổng hợp (stats + chart + PDF) | 5 | 8h | To Do | Thống kê max/min/avg, % đạt, chart.js bar/doughnut, export PDF | Unit: stats functions; E2E: mở báo cáo → số liệu khớp | Nguyễn Đức Cảnh | ReportPage | Tính toán stats; Chart.js bar/pie; Export PDF (jspdf) |

---

# 7.3. Phát triển phiên bản sản phẩm phần mềm theo Sprint

## 7.3.1. Phiên bản phần mềm V0 (Sprint 1) — **ĐÃ PHÁT HÀNH**

**Thời gian:** 24/09/2026 - 07/10/2026

**Mục tiêu:** Thiết lập cấu trúc dự án, triển khai chức năng cơ bản của giáo viên (xem danh sách lớp/sinh viên, nhập và sửa điểm, kiểm tra điểm hợp lệ, xuất Excel/CSV)

**Kế hoạch thực hiện (thực tế):**
- **Sáng:** Khởi tạo React + Vite, cấu trúc thư mục, Design System CSS (CSS variables, components), Auth Context + ProtectedRoute
- **Trưa:** ClassListPage, StudentListPage, LoginPage, LandingPage, Mock DB seed (15 SV, 3 lớp, 3 môn, 2 user: GV + QL)
- **Chiều:** ScoreEntryPage (inline editing, ScoreForm ngang), Validation real-time, TongKet auto, Export xlsx/csv (SheetJS), Bug fixes (#1, #2, #3)
- **Tối:** Unit test (27 cases), E2E test (14 cases), Lint + Build, Commit + Push, GitHub Issues tạo + đóng

**Các tính năng hoàn thành (Increment V0):**

| Tính năng | Mô tả | US liên quan |
|-----------|-------|--------------|
| Đăng nhập phân quyền | gv01/123456 (GV), quanly01/123456 (QL); redirect `from` | US-011 |
| Danh sách lớp | Card/table responsive; GV chỉ thấy lớp phân công; QL thấy tất cả | US-001 |
| Danh sách sinh viên | 5 SV/lớp; Link "Nhập điểm" mỗi hàng (`?sv=`); Nút "Nhập điểm cả lớp" | US-001 |
| Nhập/Sửa điểm | ScoreForm 3 input ngang (TX/GK/CK); Validate real-time; Lưu/upsert | US-005, US-006 |
| Kiểm tra điểm hợp lệ | Chặn <0, >10; Chặn chữ; Hỗ trợ dấu phẩy VN (7,5); Tổng kết auto | US-007 |
| Confirm đổi môn | Nếu có hàng dirty → `window.confirm` trước khi switch | Bug #1 |
| Highlight `?sv=` | Link từng SV → scroll + highlight row vàng | Bug #3 |
| Xuất Excel/CSV | 2 nút toolbar; SheetJS; Filename `BangDiem_{Lop}_{Mon}.xlsx` | US-009 |
| UI/UX hiện đại | Design system CSS variables; Navbar sticky; Card + Table responsive; Modal accessible; Landing marketing page; FAB QL | — |

**Kết quả kiểm thử:**
- Unit test: **27/27 passed** (`node test-qd.mjs`)
- E2E test: **14/14 passed** (`node e2e-qd.mjs`, Playwright + Chromium)
- Lint: **0 errors** (`npm run lint` — Oxlint)
- Build: **Success** (`npm run build` — 327ms, 278KB JS gzip 88KB)

**GitHub Issues:** #1, #2, #3 tạo → fix → commit `a0f002e` (`fixes #1, #2, #3`) → tự đóng / hand-close

---

### 7.3.2. Phiên bản phần mềm V1.0 (Sprint 2)

**Thời gian dự kiến:** 08/10/2026 - 21/10/2026

**Mục tiêu:** Triển khai quản trị dữ liệu (Lớp/SV/Môn) và tra cứu điểm

**Các tính năng dự kiến:**
- Quản lý lớp học CRUD + phân công GV (AdminClassesPage + Modal)
- Quản lý sinh viên CRUD + import Excel + chuyển lớp (AdminStudentsPage)
- Quản lý môn học CRUD (AdminSubjectsPage)
- Tra cứu điểm filter + phân trang (ScoreLookupPage)

---

### 7.3.3. Phiên bản phần mềm V2.0 (Sprint 3)

**Thời gian dự kiến:** 22/10/2026 - 04/11/2026

**Mục tiêu:** Hoàn thiện khối quản trị tài khoản và báo cáo, phát hành sản phẩm v2.0.0

**Các tính năng dự kiến:**
- Báo cáo tổng hợp + Chart.js (ReportPage)
- Quản trị tài khoản & phân quyền (AdminAccountsPage)
- Phân công giáo viên cho lớp
- Audit log (tùy chọn)
- Deploy production + tài liệu người dùng cuối

---

# 7.4. Sprint Review & Retrospective

## 7.4.1. Sprint Review — Sprint 1

### Bảng 7.6. Kết quả Sprint Review

| Tiêu chí | Kết quả |
|----------|---------|
| Sprint Goal | ✅ Hoàn thành: Core teacher features + export |
| US hoàn thành | ✅ 6/6 User Story |
| Chức năng nhập điểm | ✅ Hoàn thành |
| Chức năng sửa điểm | ✅ Hoàn thành |
| Validation điểm | ✅ Hoàn thành |
| Tính điểm tổng kết | ✅ Hoàn thành |
| Xuất Excel/CSV | ✅ Hoàn thành |
| Kiểm thử | ✅ Hoàn thành |
| Build | ✅ Thành công |
| Increment | ✅ Có thể chạy và trình diễn |

### Sprint Retrospective

| Start (Bắt đầu làm) | Stop (Ngừng làm) | Continue (Tiếp tục) |
|---------------------|------------------|---------------------|
| Viết Acceptance Criteria trước khi code | Commit trực tiếp lên `main` | Chạy full test suite (unit + e2e) trước khi push |
| Tạo feature branch cho từng nhóm chức năng | Hardcode dữ liệu trong component | Dùng Conventional Commit message |
| Thêm screenshot/video vào PR description | Copy-paste UI giữa các màn hình | Cập nhật docs song song với code |
| Ghi nhận bug thành GitHub Issue | Bỏ qua edge case của input | Review code trước khi merge |

**Action items cho Sprint 2:**
1. Tạo feature branch cho từng US
2. Setup GitHub Actions CI (lint + test + build)
3. Thêm Chart.js cho ReportPage
4. Thiết kế API contract chi tiết cho backend phase

---

# 7.5. Kết luận chương 7

Chương 7 trình bày nhật ký 3 Sprint theo Scrum. **Sprint 1 (V0) đã hoàn thành** với 6 User Story (US5.1, US5.2, US6.1, US6.2, US6.3, US7.2) = 19 SP, bao gồm cả 3 bug fix từ E2E testing. Phiên bản V0 cung cấp đầy đủ tính năng cốt lõi cho giáo viên: xem lớp/SV, nhập/sửa điểm có validation real-time, tính tổng kết tự động, xuất Excel/CSV, UI/UX hiện đại responsive, FAB quản trị, sidebar drawer. Sprint 2 và 3 đang ở giai đoạn kế hoạch, sẽ triển khai quản trị dữ liệu (Lớp/SV/Môn), tra cứu, báo cáo tổng hợp, và quản trị tài khoản. Dự án tuân thủ Definition of Done: lint + build + unit test + e2e test + AC verified + docs updated.
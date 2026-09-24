# 05. Quy trình phát triển dự án

## 5.1. Mô hình phát triển: Agile - Scrum

Dự án sử dụng phương pháp **Agile** với khuôn khổ **Scrum** để quản lý quá trình phát triển phần mềm. Scrum là một khuôn khổ linh hoạt, dựa trên các **Sprint** lặp đi lặp lại (time-boxed), mỗi Sprint tạo ra một phần tăng trưởng có thể phát hành được (**Potentially Releasable Increment**).

### Lý do chọn Scrum

| Lý do | Giải thích |
|-------|------------|
| Quy mô nhỏ - trung bình | Team 1 người (PO/SM/Dev), Scrum giúp tự tổ chức |
| Yêu cầu thay đổi | Phân quyền, export, UI/UX được tinh chỉnh liên tục |
| Demo định kỳ | Mỗi Sprint có sản phẩm chạy được (Landing → Login → ClassList → ScoreEntry) |
| Thời gian cố định | 1 học kỳ = 3 Sprint × ~2 tuần |
| Định lượng tiến độ | Story Point + Estimation Effort + Sprint Burndown |

## 5.2. Các vai trò trong dự án

| Vai trò | Thành viên | Trách nhiệm |
|---------|-----------|-------------|
| **Product Owner** | Nguyễn Đức Cảnh | Quản lý Product Backlog, ưu tiên hóa hạng mục, xác nhận Acceptance Criteria, đảm bảo giá trị sản phẩm |
| **Scrum Master** | Nguyễn Đức Cảnh | Đảm bảo nhóm tuân thủ Scrum, loại bỏ rào cản (tooling, env, dependency), huấn luyện quy trình, tổ chức các sự kiện |
| **Developer** | Nguyễn Đức Cảnh | Thiết kế kiến trúc, triển khai mã nguồn (React + Vite), viết test (unit + e2e), CI/CD, tài liệu kỹ thuật |
| **Technical Writer** | (tự làm) | Viết tài liệu quy trình, báo cáo sprint, README, WHITEBOOK, docs/ |

> **Lưu ý:** Do dự án quy mô nhỏ (1 người), các vai trò PO/SM/Dev được gom vào 1 người. Nguyên tắc Scrum vẫn được tuân thủ: tách biệt *quản lý backlog* (PO) vs *thực hiện sprint* (Dev) qua GitHub Issues + Projects.

## 5.3. Các sự kiện Scrum

### Sprint Planning (Lập kế hoạch Sprint)

- **Thời gian:** Đầu mỗi Sprint (ngày 1)
- **Thời lượng:** 1–2 giờ
- **Mục đích:** Xác định **Sprint Goal**, lựa chọn các hạng mục từ Product Backlog (theo thứ tự ưu tiên + dependency), chia nhỏ thành **Task** (subtask ≤ 4h)
- **Tham gia:** Toàn bộ Scrum Team (1 người)
- **Đầu ra:** Sprint Backlog trên GitHub Project board (cột *To Do*)

### Daily Stand-Up (Họp hàng ngày)

- **Thời gian:** Mỗi sáng (hoặc trước khi code)
- **Thời lượng:** ≤ 15 phút
- **Mục đích:** Đồng bộ tiến độ, phát hiện blocker sớm
- **Nội dung 3 câu hỏi:**
  1. Hôm qua hoàn thành gì? (commit hash, test pass)
  2. Hôm nay làm gì? (issue #, task)
  3. Có rào cản gì không? (dependency, bug, design decision)

### Sprint Review (Đánh giá Sprint)

- **Thời gian:** Cuối Sprint (ngày cuối)
- **Thời lượng:** 30–60 phút
- **Mục đích:** Demo **Increment** cho PO (tự review), đối chiếu Acceptance Criteria, ghi nhận feedback
- **Sản phẩm:** Build production (`npm run build`), deploy preview (Netlify/GitHub Pages), chạy full test suite (unit + e2e)

### Sprint Retrospective (Tổng kết Sprint)

- **Thời gian:** Ngay sau Sprint Review
- **Thời lượng:** 30 phút
- **Mục đích:** Cải tiến quy trình cho Sprint tiếp theo
- **Cấu trúc:** **Start / Stop / Continue**
  - *Start:* Ghi chú ADR cho quyết định kiến trúc, thêm screenshot vào PR
  - *Stop:* Commit trực tiếp main không qua PR (sau này dùng branch + PR)
  - *Continue:* E2E test trước khi push, conventional commit message

## 5.4. Quy trình quản lý yêu cầu

### Product Backlog

Product Backlog là danh sách **được sắp xếp theo ưu tiên** tất cả công việc cần thực hiện. Đặc điểm (theo Scrum Guide):

| Đặc điểm | Mô tả |
|----------|-------|
| **Detailed appropriately** | Hạng mục cao ưu tiên (Sprint 1) chi tiết AC, test case; hạng mục thấp ít chi tiết hơn |
| **Estimated** | Mỗi US có Story Point (Planning Poker 1 người) + Estimation Effort (giờ) |
| **Emergent** | Liên tục cập nhật: thêm bug (#1-#3), tinh chỉnh UI, bổ sung export |
| **Prioritized** | Sắp xếp theo giá trị nghiệp vụ + dependency kỹ thuật |

**Công cụ:** GitHub Issues (label `user-story`, `bug`, `enhancement`) + GitHub Project (Sprint Board)

### User Story Format

Mỗi yêu cầu được viết dưới dạng User Story:

```
As a [tác nhân], I want [mục tiêu] so that [lý do]
```

**Mỗi User Story gồm:**

| Thuộc tính | Ví dụ |
|------------|-------|
| **UID** | US-001 |
| **Title** | Xem danh sách lớp và sinh viên được phân công |
| **Narrative** | As a giáo viên, I want xem danh sách lớp và sinh viên được phân công so that tôi quản lý việc nhập điểm |
| **Acceptance Criteria** | 1. Đăng nhập gv01 → thấy 3 lớp<br>2. Click "Xem sinh viên" → thấy 5 SV/lớp<br>3. Admin đăng nhập → thấy 3 lớp |
| **Story Point** | 3 |
| **Estimation Effort** | 4 giờ |
| **Priority** | 1 |

### Sprint Backlog

Sprint Backlog = tập hợp con của Product Backlog được chọn cho Sprint hiện tại. Mỗi hạng mục bao gồm:

| Trường | Mô tả |
|--------|-------|
| UID, User Story, SP, Effort | Từ Product Backlog |
| Status | To Do / In Progress / In Review / Done |
| Acceptance Criteria | Copy từ PB, có thể bổ sung test case cụ thể |
| Testing | Unit test file, E2E test step |
| Task owner | Nguyễn Đức Cảnh |
| Task / Subtask | Chi tiết trên GitHub Issue checklist |

## 5.5. Các công cụ quản lý dự án

| Công cụ | Mục đích | Cách dùng trong dự án |
|---------|----------|----------------------|
| **GitHub** | Source hosting, Issues, Projects, Wiki | Repo `dotlinux26/quanlydiem`, branch `main` |
| **GitHub Issues** | Theo dõi User Story, Bug, Task | Mỗi US = 1 Issue, label `user-story`, `sprint-1` |
| **GitHub Projects (Board)** | Sprint Board (Kanban) | 4 cột: *Backlog → To Do → In Progress → Done* |
| **Git** | Version control | Conventional commits (`feat:`, `fix:`, `docs:`, `refactor:`) |
| **Vite** | Dev server, build | `npm run dev`, `npm run build` |
| **Oxlint** | Code quality gate | `npm run lint` (pre-commit hook tương lai) |
| **Playwright** | E2E regression | `node e2e-qd.js` (14 test cases) |
| **Node Test Runner** | Unit test | `node test-qd.mjs` (27 test cases) |

## 5.6. Kiểm thử trong Scrum

### 5.6.1. Kiểm thử đơn vị (Unit Testing)

- **Phạm vi:** Hàm thuần túy (`utils/score.js`, `utils/format.js`), Service logic (`authService`, `lopService`, `diemService`), Reducer logic
- **Framework:** Node.js built-in `node:test` + `assert`
- **Số lượng:** 27 test cases (2024-09-24)
- **Chạy:** `node test-qd.mjs` — polyfill `localStorage` trong test
- **Coverage mục tiêu:** ≥ 80% lines cho utils & services

### 5.6.2. Kiểm thử tích hợp (Integration Testing)

- **Phạm vi:** Pages ↔ Services ↔ Store (localStorage)
- **Ví dụ:** `ScoreEntryPage` load → `lopService.getLop` → `diemService.listDiems` → render table
- **Cách:** E2E test cover integration paths

### 5.6.3. Kiểm thử hệ thống / End-to-End (System / E2E Testing)

- **Framework:** Playwright + Chromium system
- **Môi trường:** Dev server `http://localhost:5199`
- **Test suite:** 14 test cases cover:
  1. Landing page load
  2. Protected route redirect
  3. Teacher login → class list (3 classes)
  4. Bug #3: per-student link highlight row
  5. Bug #2: comma decimal input (7,5)
  6. TongKet auto compute
  7. Invalid text error
  8. Score >10 rejected
  9. Row save → status "Đã lưu"
  10. Bug #1: confirm dialog on mon switch with dirty
  11. After switch mon → row reset clean
  12. Logout → redirect login
  13. Admin login → 3 classes
  14. No console errors
- **Chạy:** `node e2e-qd.js` (headed/headless)

### 5.6.4. Kiểm thử chấp nhận (Acceptance Testing)

- **Người thực hiện:** PO (tự) / Giảng viên hướng dẫn
- **Tiêu chí:** Đối chiếu Acceptance Criteria từng US trên build production
- **Checklist US-001:** Đăng nhập gv01 → thấy 3 lớp → click lớp 1 → thấy 5 SV
- **Checklist US-003/004/005:** Mở nhập điểm → nhập 7,5/8/9 → lưu → tongKet 8,3 → sửa thành 9/8/8 → lưu → tongKet 8,5 → nhập 15 → báo lỗi
- **Checklist US-007:** Nhấn "Xuất Excel" → file .xlsx mở được, đúng cột, đúng dữ liệu

## 5.7. Definition of Done (DoD)

Một User Story coi là **Done** khi đáp ứng **TẤT CẢ**:

- [ ] Code hoàn thành, `npm run lint` pass, `npm run build` pass
- [ ] Unit test liên quan pass (27/27)
- [ ] E2E test liên quan pass (14/14)
- [ ] Acceptance Criteria trên GitHub Issue được verify (checklist tick)
- [ ] Cập nhật docs liên quan (README, docs/, sprint-log.md)
- [ ] Commit message tuân thủ conventional (`feat:`, `fix:`, `docs:`) + `fixes #issue`
- [ ] Push lên `main`, GitHub Issue tự đóng / hand-close

## 5.8. Quy trình Git & Release

### Branch Strategy

- **main** — branch bảo vệ, chỉ merge qua PR (tương lai) hoặc commit trực tiếp (hiện tại do 1 người)
- **Feature branch** — `feat/us-001`, `fix/bug-1` (khuyến nghị cho sau)

### Commit Convention

```
<type>: <mô tả ngắn> [refs #issue]

feat: thêm xuất Excel/CSV cho bảng điểm (fixes #7)
fix: score-form nhập dấu phẩy VN (fixes #2)
docs: cập nhật sprint-log Sprint 1 Done
refactor: ScoreForm layout ngang
```

### Versioning (SemVer)

| Version | Sprint | Nội dung |
|---------|--------|----------|
| v0.1.0 | Sprint 1 (V0) | Core: class list, score entry, validation, export |
| v1.0.0 | Sprint 2 (V1.0) | Lookup, report, export nâng cao |
| v2.0.0 | Sprint 3 (V2.0) | Admin CRUD, account mgmt, release |

### Release Checklist

- [ ] All tests pass (unit + e2e)
- [ ] `npm run build` success, bundle size hợp lý
- [ ] Update `package.json` version
- [ ] GitHub Release: tag `vX.Y.Z`, generate changelog từ commits
- [ ] Deploy preview (Netlify) + verify production build

## Kết luận chương 5

Chương 5 trình bày quy trình Scrum 3 Sprint cho dự án: 3 vai trò (gộp 1 người), 4 sự kiện, quản lý backlog qua GitHub Issues+Projects, 3 cấp độ testing (unit 27, e2e 14, acceptance), Definition of Done rõ ràng, Git flow + SemVer. Quy trình đảm bảo minh bạch, đo lường được, và phù hợp bối cảnh sinh viên 1 người thực hiện toàn bộ vòng đời SDLC.
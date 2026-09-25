# 03. Thiết kế module frontend

## 3.1. Tổng quan kiến trúc module

```
┌─────────────────────────────────────────────────────┐
│                   quanlydiem                        │
├─────────────┬───────────────────────────────────────┤
│  Module     │  Chức năng                            │
├─────────────┼───────────────────────────────────────┤
│  Router     │  Điều hướng SPA, protected routes     │
│  Pages      │  Trang giao diện từng Use Case        │
│  Components │  Component dùng chung (bảng, form...) │
│  Services   │  Gọi API / localStorage, xử lý dữ liệu │
│  Utils      │  Hàm tiện ích (điểm, định dạng, export)│
│  Constants  │  Hằng số (quy tắc điểm, vai trò)       │
│  Context    │  State toàn cục (auth, theme)          │
│  Hooks      │  Custom hooks tái sử dụng              │
└─────────────┴───────────────────────────────────────┘
```

**Cấu trúc thư mục `src/`:**
```
src/
├── main.jsx                 # Entry point, import CSS
├── App.jsx                  # Routes, AuthProvider wrapper
├── App.css                  # Design system (CSS variables, components)
├── index.css                # Reset & base styles
├── constants/
│   ├── roles.js             # ROLES enum, labels (GIAO_VIEN, QUAN_LY)
│   └── scoreRules.js        # SCORE config, SCORE_COLUMNS
├── utils/
│   ├── score.js             # parseScore, scoreError, scoreInputError, calcSummary, roundTo
│   └── format.js            # formatScore (dấu phẩy), formatDate
├── db/
│   ├── seed.js              # Mock data 15 SV, 3 lớp, 3 môn, 2 user (GV + QL), 5 điểm
│   └── store.js             # localStorage CRUD (loadDb, saveDb, resetDb)
├── services/
│   ├── authService.js       # login, logout, getCurrentUser, createAccount
│   ├── lopService.js        # listLops, getLop, listSinhViens, listMonHocs
│   ├── diemService.js       # listDiems, saveDiem, removeDiem
│   ├── sinhVienService.js   # CRUD sinh viên (Sprint 2)
│   ├── monHocService.js     # CRUD môn học (Sprint 2)
│   └── baoCaoService.js     # Thống kê + chart data (Sprint 3)
├── context/
│   ├── authContext.js       # createContext
│   └── AuthProvider.jsx     # Auth state, login/logout, role helpers
├── hooks/
│   └── useAuth.js           # useContext(AuthContext) wrapper
├── components/
│   ├── Layout.jsx           # Navbar + Outlet
│   ├── Navbar.jsx           # Top bar, role badge, logout
│   ├── ProtectedRoute.jsx   # Guard route theo role
│   ├── Modal.jsx            # Dialog accessible (ESC, backdrop click)
│   └── ScoreForm.jsx        # Inline 3 input điểm (thường/giữa/cuối)
├── pages/
│   ├── LandingPage.jsx      # Marketing page, CTA → login
│   ├── LoginPage.jsx        # Form đăng nhập, demo accounts hint
│   ├── ClassListPage.jsx    # Danh sách lớp (card + table)
│   ├── StudentListPage.jsx  # Danh sách SV + link nhập điểm / hàng
│   ├── ScoreEntryPage.jsx   # Nhập/sửa điểm, export xlsx/csv, highlight ?sv=
│   ├── ScoreLookupPage.jsx  # Tra cứu điểm filter + phân trang (Sprint 2)
│   ├── ReportPage.jsx       # Báo cáo tổng hợp + Chart.js (Sprint 3)
│   ├── AdminDashboardPage.jsx # Dashboard người quản lý
│   ├── AdminClassesPage.jsx # CRUD lớp + phân công GV (Sprint 2)
│   ├── AdminStudentsPage.jsx # CRUD SV + import Excel (Sprint 2)
│   ├── AdminSubjectsPage.jsx # CRUD môn học (Sprint 2)
│   └── AdminAccountsPage.jsx # CRUD tài khoản + phân quyền (Sprint 3)
└── assets/
    └── .gitkeep
```

## 3.2. Module Router & Layout (`App.jsx`, `Layout.jsx`)

**App.jsx** — định nghĩa routes (tách rõ route GV / Người quản lý):
```jsx
<BrowserRouter>
  <AuthProvider>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<Layout />}>
        <Route index element={<LandingPage />} />
        {/* Routes Giáo viên */}
        <Route path="lop" element={
          <ProtectedRoute roles={[GIAO_VIEN]}>
            <ClassListPage />
          </ProtectedRoute>
        } />
        <Route path="lop/:id" element={
          <ProtectedRoute roles={[GIAO_VIEN]}>
            <StudentListPage />
          </ProtectedRoute>
        } />
        <Route path="lop/:id/diem" element={
          <ProtectedRoute roles={[GIAO_VIEN]}>
            <ScoreEntryPage />
          </ProtectedRoute>
        } />
        {/* Routes Người quản lý */}
        <Route path="admin" element={
          <ProtectedRoute roles={[QUAN_LY]}>
            <AdminDashboardPage />
          </ProtectedRoute>
        } />
        <Route path="admin/classes" element={
          <ProtectedRoute roles={[QUAN_LY]}>
            <AdminClassesPage />
          </ProtectedRoute>
        } />
        <Route path="admin/students" element={
          <ProtectedRoute roles={[QUAN_LY]}>
            <AdminStudentsPage />
          </ProtectedRoute>
        } />
        <Route path="admin/subjects" element={
          <ProtectedRoute roles={[QUAN_LY]}>
            <AdminSubjectsPage />
          </ProtectedRoute>
        } />
        <Route path="admin/teachers" element={
          <ProtectedRoute roles={[QUAN_LY]}>
            <AdminAccountsPage />
          </ProtectedRoute>
        } />
        <Route path="lookup" element={
          <ProtectedRoute roles={[GIAO_VIEN, QUAN_LY]}>
            <ScoreLookupPage />
          </ProtectedRoute>
        } />
        <Route path="report" element={
          <ProtectedRoute roles={[GIAO_VIEN, QUAN_LY]}>
            <ReportPage />
          </ProtectedRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </AuthProvider>
</BrowserRouter>
```

**Layout.jsx** — shell chung:
```jsx
<div className="layout">
  <Navbar />
  <main className="layout-main"><Outlet /></main>
</div>
```

## 3.3. Module Auth (Context + Hooks + ProtectedRoute)

| File | Trách nhiệm |
|------|-------------|
| `authContext.js` | `createContext(null)` — context rỗng |
| `AuthProvider.jsx` | State `user`, `isAuthed`, `isQuanLy`, `isGiaoVien`; functions `login()`, `logout()`; sync với `authService` |
| `useAuth.js` | Hook `useAuth()` — `useContext(AuthContext)` + guard |
| `ProtectedRoute.jsx` | Guard: nếu `!isAuthed` → redirect `/login` (lưu `from`); nếu `roles` không khớp → redirect `/`; tách route GV / QL |

**Phân quyền 2 lớp:**
1. **Route guard** (`ProtectedRoute`) — chặn truy cập trang theo role
2. **Service filter** (`lopService.listLops`) — giáo viên chỉ thấy lớp `giaoVienId === user.id`, người quản lý thấy tất cả

## 3.4. Module Pages (src/pages)

| Trang | Component | User Story | Chức năng chính |
|-------|-----------|------------|-----------------|
| `/` | `LandingPage` | — | Trang chủ marketing, CTA "Bắt đầu ngay" → `/login` |
| `/login` | `LoginPage` | US-011 | Form đăng nhập, demo accounts (GV + QL), redirect theo role |
| `/lop` | `ClassListPage` | US-001 | Danh sách lớp (phân quyền), card/table responsive |
| `/lop/:id` | `StudentListPage` | US-001 | Danh sách SV, link "Nhập điểm" (`?sv=`), nút "Nhập điểm cả lớp" |
| `/lop/:id/diem` | `ScoreEntryPage` | US-005,006,007,009 | **Core**: nhập/sửa điểm inline, validate real-time, tính tổng kết auto, confirm khi đổi môn có dirty, export xlsx/csv, highlight `?sv=` |
| `/lookup` | `ScoreLookupPage` | US-008 | Tra cứu điểm filter (lớp/môn/SV), phân trang (Sprint 2) |
| `/report` | `ReportPage` | US-010 | Báo cáo tổng hợp (stats + Chart.js bar/pie), export PDF (Sprint 3) |
| `/admin` | `AdminDashboardPage` | — | Dashboard người quản lý: 4 stat cards link CRUD |
| `/admin/classes` | `AdminClassesPage` | US-002 | CRUD lớp + Modal + phân công GV (Sprint 2) |
| `/admin/students` | `AdminStudentsPage` | US-003 | CRUD SV + import Excel + chuyển lớp (Sprint 2) |
| `/admin/subjects` | `AdminSubjectsPage` | US-004 | CRUD môn học (Sprint 2) |
| `/admin/teachers` | `AdminAccountsPage` | US-011 | CRUD tài khoản GV + phân quyền + reset pwd (Sprint 3) |

### ScoreEntryPage — chi tiết state

```js
// State chính
const [lop, setLop] = useState(null)           // Lớp hiện tại
const [monHocs, setMonHocs] = useState([])     // Danh sách môn
const [monId, setMonId] = useState(null)       // Môn được chọn
const [sinhViens, setSinhViens] = useState([]) // Danh sách SV
const [rows, setRows] = useState({})           // Map svId → {values, errors, status, record}
const [savingId, setSavingId] = useState(null) // SV đang save
const [msg, setMsg] = useState('')             // Toast message
const [loading, setLoading] = useState(true)
const [pageError, setPageError] = useState('')
```

**Row object:**
```js
{
  values: { thuongKy: '8', giuaKy: '7,5', cuoiKy: '9' },
  errors: { thuongKy: null, giuaKy: null, cuoiKy: null },
  status: 'saved' | 'dirty' | 'new',
  record: { id, thuongKy: 8, giuaKy: 7.5, cuoiKy: 9, tongKet: 8.3 } | null
}
```

## 3.5. Module Components (src/components)

| Component | Props | Chức năng |
|-----------|-------|-----------|
| `Navbar` | — | Brand, nav links (active style theo route), user badge (role: GV/QL), logout |
| `ProtectedRoute` | `children, roles?` | Guard route, redirect login, tách route GV / QL |
| `Modal` | `title, children, onCancel, onConfirm, variant` | Accessible dialog (ESC, backdrop, focus trap) |
| `ScoreForm` | `value, onChange, errors` | **3 input ngang** (thường/giữa/cuối), label trên, error đỏ dưới, width 96px each |
| `Layout` | — | Shell: Navbar + main content |

### ScoreForm — CSS inline (đảm bảo alignment)
```jsx
<div className="score-form" style={{display:'flex',gap:'0.5rem',alignItems:'center'}}>
  {SCORE_COLUMNS.map(col => (
    <div key={col.key} style={{display:'flex',flexDirection:'column',alignItems:'center',minWidth:'96px'}}>
      <label className="form-label" style={{fontSize:'0.65rem',textTransform:'uppercase'}}>{col.label}</label>
      <input type="text" inputMode="decimal" className="form-input" style={{width:'96px',height:'36px',textAlign:'center'}} />
      {err && <span className="form-error" style={{fontSize:'0.65rem'}}>{err}</span>}
    </div>
  ))}
</div>
```

## 3.6. Module Services (src/services)

Tất cả service dùng `loadDb()` / `saveDb()` từ `db/store.js`, trả về `Promise` (mock async với `delay(300ms)`).

| Service | Hàm chính | Phân quyền |
|---------|-----------|------------|
| `authService` | `login`, `logout`, `getCurrentUser`, `createAccount` | Người quản lý tạo tài khoản |
| `lopService` | `listLops(user)`, `getLop(id,user)`, `listSinhViens(id)`, `listMonHocs()` | `listLops` filter: GV thấy lớp phân công, QL thấy tất cả |
| `diemService` | `listDiems({lopId,monHocId})`, `saveDiem(data)`, `removeDiem(id)` | `saveDiem` validate 0–10, tự tính `tongKet` |
| `sinhVienService` | CRUD sinh viên + import Excel | Chỉ người quản lý |
| `monHocService` | CRUD môn học | Chỉ người quản lý |
| `baoCaoService` | Thống kê + chart data | GV + QL |

## 3.7. Module Utils & Constants

| File | Export | Mô tả |
|------|--------|-------|
| `utils/score.js` | `parseScore`, `scoreError`, `scoreInputError`, `calcSummary`, `roundTo` | `parseScore` hiểu dấu phẩy VN (`7,5` → 7.5); `scoreInputError` bắt chuỗi không phải số |
| `utils/format.js` | `formatScore`, `formatDate` | `formatScore(8.3)` → `'8,3'` (VN) |
| `constants/roles.js` | `ROLES`, `ROLE_LABELS` | `GIAO_VIEN: 'GIAO_VIEN'`, `QUAN_LY: 'QUAN_LY'`; labels: GV → "Giáo viên", QL → "Người quản lý" |
| `constants/scoreRules.js` | `SCORE`, `SCORE_COLUMNS` | Thang điểm 0-10, trọng số 0.3/0.3/0.4 |

## 3.8. Export Excel/CSV (SheetJS)

File: `ScoreEntryPage.jsx` — function `handleExport(type)`:

```js
import * as XLSX from 'xlsx'

function exportToFile(data, fileName, fileType) {
  const ws = XLSX.utils.json_to_sheet(data)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'BangDiem')
  fileType === 'xlsx' ? XLSX.writeFile(wb, `${fileName}.xlsx`)
                      : XLSX.writeFile(wb, `${fileName}.csv`)
}
```

**Cột xuất:**
| STT | Mã SV | Họ tên | Thường kỳ | Giữa kỳ | Cuối kỳ | Tổng kết | Trạng thái |

## 3.9. Responsive Breakpoints (App.css)

| Breakpoint | Ảnh hưởng |
|------------|-----------|
| `≤768px` | Layout padding 1rem, navbar compact, toolbar stack vertical, score-form flex-wrap, card radius giảm |

## Kết luận chương 3

Chương 3 trình bày thiết kế 10+ module frontend: Router (tách route GV/QL), Auth (role QL/GV), Pages (13 trang), Components (5), Services (6), Utils (2), Constants (2), Export. Mỗi module có trách nhiệm đơn nhất (SRP), tách biệt UI – logic – data. ScoreEntryPage là trang phức tạp nhất với state management chi tiết cho inline editing, validation real-time, dirty tracking, export. Chương 4 sẽ liệt kê công nghệ nguồn mở.
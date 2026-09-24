# 04. Công nghệ nguồn mở được sử dụng

## 4.1. React

- **Phiên bản:** 19.x
- **Giấy phép:** MIT
- **Website:** https://react.dev
- **Mục đích:** Framework giao diện người dùng component-based
- **Lý do chọn:**
  - Component-based, dễ tái sử dụng (Table, Form, Modal, ScoreForm)
  - Hệ sinh thái lớn, cộng đồng sôi động, tài liệu tốt
  - Quản lý state rõ ràng qua hooks (useState, useEffect, useMemo, useRef, useCallback)
  - Concurrent features, automatic batching
  - TypeScript ready (dù dự án dùng JS thuần)

## 4.2. Vite

- **Phiên bản:** 8.x
- **Giấy phép:** MIT
- **Website:** https://vite.dev
- **Mục đích:** Build tool & dev server
- **Lý do chọn:**
  - Dev server cực nhanh (HMR < 100ms)
  - Cấu hình tối giản, plugin `@vitejs/plugin-react` chuẩn
  - Build production tối ưu: code-splitting, tree-shaking, minify (Rolldown/esbuild)
  - Hỗ trợ ESModule native, không cần bundle trong dev

## 4.3. React Router

- **Phiên bản:** 7.x
- **Giấy phép:** MIT
- **Website:** https://reactrouter.com
- **Mục đích:** SPA routing, protected routes
- **Lý do chọn:**
  - Declarative routing (`<Routes>`, `<Route>`)
  - Hỗ trợ nested routes, layout routes (`<Outlet>`)
  - Data loading API (loader/action) cho tương lai
  - Type-safe với TypeScript

## 4.4. SheetJS (xlsx)

- **Phiên bản:** 0.18+
- **Giấy phép:** Apache-2.0
- **Website:** https://sheetjs.com
- **Mục đích:** Xuất file Excel (.xlsx) và CSV từ dữ liệu JSON
- **Lý do chọn:**
  - Zero-dependency, chạy trực tiếp trong browser
  - Hỗ trợ đầy đủ .xlsx, .csv, .ods
  - API đơn giản: `json_to_sheet` → `book_append_sheet` → `writeFile`
  - Kích thước gọn (~200KB gzip)

## 4.5. Oxlint

- **Phiên bản:** 1.x
- **Giấy phép:** MIT
- **Website:** https://oxc.rs
- **Mục đích:** Lint mã nguồn JavaScript/React
- **Lý do chọn:**
  - Tốc độ cực nhanh (Rust-based), thay thế ESLint
  - Rule set tích hợp: `react`, `jsx-a11y`, `import`
  - Cấu hình tối giản (`.oxlintrc.json`)
  - Không cần plugin phức tạp, chạy `oxlint` xong

## 4.6. Playwright

- **Phiên bản:** 1.48+
- **Giấy phép:** Apache-2.0
- **Website:** https://playwright.dev
- **Mục đích:** End-to-end testing
- **Lý do chọn:**
  - Hỗ trợ multi-browser (Chromium, Firefox, WebKit)
  - Auto-wait, retry, trace viewer
  - Dùng Chromium hệ thống (`/usr/bin/chromium`) — không download binary
  - API hiện đại, TypeScript first

## 4.7. Node.js Test Runner (built-in)

- **Phiên bản:** Node 24.x (`node --test`)
- **Giấy phép:** MIT
- **Website:** https://nodejs.org/api/test.html
- **Mục đích:** Unit testing zero-config
- **Lý do chọn:**
  - Không cần cài thêm (Jest, Vitest, Mocha)
  - TTL assertion (`assert`, `assert.strictEqual`)
  - Hỗ trợ `describe`, `it`, `beforeEach`, `afterEach`
  - Chạy song song, watch mode

## 4.8. Git / GitHub

- **Phiên bản:** Git 2.53+
- **Giấy phép:** GPL-2.0
- **Website:** https://git-scm.com / https://github.com
- **Mục đích:** Version control, issue tracking, project board
- **Lý do chọn:**
  - Chuẩn công nghiệp, distributed, branching model mạnh
  - GitHub Issues + Projects hỗ trợ Scrum (Sprint Board: To Do / In Progress / Done)
  - GitHub Actions cho CI/CD (tương lai)

## 4.9. Công nghệ đã cân nhắc / loại bỏ

| Công nghệ | Lý do không dùng |
|-----------|------------------|
| **Tailwind CSS** | Muốn tự kiểm soát design system qua CSS variables, tránh utility-class bloat HTML |
| **Redux / Zustand** | React Context + hooks đủ cho state auth & UI đơn giản |
| **TypeScript** | Dự án học phần yêu cầu JS, nhưng code viết type-safe (JSDoc ready) |
| **ESLint + Prettier** | Oxlint đủ nhanh, format tự động bằng VS Code settings |
| **Vitest / Jest** | Node test runner built-in đủ dùng, zero-dep |
| **MSW (Mock Service Worker)** | localStorage mock DB đủ cho frontend-only phase |

## 4.10. Tóm tắt dependency tree

```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^7.0.0",
    "xlsx": "^0.18.5"
  },
  "devDependencies": {
    "vite": "^8.0.0",
    "@vitejs/plugin-react": "^4.3.0",
    "oxlint": "^1.0.0",
    "playwright": "^1.48.0"
  }
}
```

## 4.11. Bảng tóm tắt

| Công nghệ | Phiên bản | Giấy phép | Mục đích | Trạng thái |
|-----------|-----------|-----------|----------|------------|
| React | 19.x | MIT | UI Framework | **Sử dụng** |
| Vite | 8.x | MIT | Build tool | **Sử dụng** |
| React Router | 7.x | MIT | SPA Routing | **Sử dụng** |
| SheetJS (xlsx) | 0.18+ | Apache-2.0 | Export Excel/CSV | **Sử dụng** |
| Oxlint | 1.x | MIT | Lint | **Sử dụng** |
| Playwright | 1.48+ | Apache-2.0 | E2E Test | **Sử dụng** |
| Node Test Runner | 24.x | MIT | Unit Test | **Sử dụng** |
| Git | 2.53+ | GPL-2.0 | VCS | **Sử dụng** |
| GitHub | - | - | Hosting, Issues, Projects | **Sử dụng** |

## Kết luận chương 4

Chương 4 liệt kê 8 công nghệ nguồn mở cốt lõi. Điểm nổi bật: stack **zero-heavy-config** (Vite + Oxlint + Node test runner + Playwright) giúp tập trung vào nghiệp vụ thay vì cấu hình tooling. Việc chọn SheetJS cho export thay vì backend generation thể hiện tư duy frontend-first. Chương 5 sẽ trình bày quy trình phát triển Scrum.
# Ứng dụng quản lý nhập liệu điểm và xuất báo cáo cho giáo viên

**Phát triển ứng dụng web hỗ trợ giáo viên nhập, quản lý, tra cứu và xuất báo cáo điểm thay thế quy trình thủ công**

Ứng dụng giúp giáo viên xem lớp và danh sách sinh viên được phân công, nhập/sửa/tra cứu điểm, kiểm tra điểm hợp lệ và tính điểm tổng kết, đồng thời xuất bảng điểm và báo cáo tổng hợp. Quản trị viên quản lý lớp, sinh viên, môn học, tài khoản giáo viên và phân quyền.

**Phiên bản:** 0.1.0 (Sprint 1 — V0) | **Tác giả:** Nguyễn Đức Cảnh | **Giấy phép:** MIT

---

## Mục lục

- [Tính năng](#tính-năng)
- [Actor / Vai trò](#actor--vai-trò)
- [Cài đặt](#cài-đặt)
- [Sử dụng](#sử-dụng)
- [Cấu trúc dự án](#cấu-trúc-dự-án)
- [Công nghệ](#công-nghệ)
- [Tài liệu tham khảo](#tài-liệu-tham-khảo)
- [License](#license)

---

## Tính năng

- **Quản lý lớp, sinh viên, môn học** — Thêm, sửa, xóa thông tin để duy trì dữ liệu học tập (quản trị viên)
- **Nhập điểm** — Nhập điểm cho sinh viên trong lớp được phân công (giáo viên)
- **Sửa điểm** — Cập nhật kết quả chính xác sau khi đã nhập
- **Kiểm tra điểm hợp lệ** — Hệ thống kiểm tra giá trị điểm và tính điểm tổng kết, hạn chế sai sót
- **Tra cứu điểm** — Tra cứu theo lớp, môn học và sinh viên
- **Xuất bảng điểm** — Xuất bảng điểm phục vụ công tác giảng dạy và quản lý
- **Báo cáo tổng hợp** — Báo cáo kết quả học tập, đánh giá tình hình của lớp
- **Quản lý tài khoản & phân quyền** — Quản lý tài khoản giáo viên và phân quyền truy cập (quản trị viên)

---

## Actor / Vai trò

| Actor | Vai trò | Quyền hạn |
|-------|---------|-----------|
| Giáo viên | Nhập, sửa, tra cứu điểm | Xem lớp và sinh viên được phân công; nhập/sửa/tra cứu điểm; xuất bảng điểm/báo cáo |
| Quản trị viên | Quản lý dữ liệu và tài khoản | Quản lý lớp, sinh viên, môn học; quản lý tài khoản giáo viên; phân quyền |

> Không có actor Sinh viên — hệ thống tập trung vào nghiệp vụ của giáo viên và quản trị viên.

---

## Cài đặt

### Yêu cầu

- Node.js ≥ 20
- npm ≥ 10

### Cài đặt

```bash
git clone git@github.com:dotlinux26/quanlydiem.git
cd quanlydiem
npm install
```

### Chạy môi trường dev

```bash
npm run dev
```

Mở trình duyệt tại `http://localhost:5173`.

### Build production

```bash
npm run build
npm run preview
```

### Lint

```bash
npm run lint
```

---

## Sử dụng

App hiện ở giai đoạn khởi tạo Sprint 1 (V0). Màn hình chính hiển thị tổng quan đề tài và 2 actor chính: **Giáo viên** và **Quản trị viên**. Chi tiết đặc tả chức năng xem tại [`WHITEBOOK.md`](WHITEBOOK.md).

---

## Cấu trúc dự án

```
quanlydiem/
├── index.html               # Entry HTML
├── package.json             # Cấu hình dự án + scripts
├── vite.config.js           # Cấu hình Vite
├── .oxlintrc.json           # Cấu hình lint (Oxlint)
├── README.md                # Tài liệu này
├── WHITEBOOK.md             # Đặc tả ban đầu (whitebook)
├── LICENSE                  # Giấy phép MIT
├── TAILIEUTHAMKHAO/         # Tài liệu tham khảo (đề cương bài giảng, mẫu báo cáo)
├── public/
│   └── favicon.svg          # Favicon
├── src/
│   ├── main.jsx             # Điểm vào React
│   ├── App.jsx              # Component gốc
│   ├── App.css              # Style App
│   ├── index.css            # Style toàn cục
│   ├── assets/              # Ảnh, icon tĩnh
│   ├── components/          # Component dùng chung
│   ├── pages/               # Trang theo chức năng
│   ├── services/            # Gọi API / xử lý nghiệp vụ
│   ├── utils/               # Hàm tiện ích
│   └── constants/           # Hằng số dùng chung
└── docs/                    # Tài liệu dự án (bài tập lớn)
    ├── 01-architecture.md   # Tổng quan dự án
    ├── 02-database.md       # Mô hình dữ liệu & API
    ├── 03-modules.md        # Thiết kế module
    ├── 04-opensource.md     # Công nghệ nguồn mở
    ├── backlog.md           # Product backlog
    ├── sprint-log.md        # Nhật ký sprint
    └── process.md           # Quy trình phát triển
```

---

## Công nghệ

| Thành phần | Lựa chọn |
|------------|----------|
| Ngôn ngữ | JavaScript (ES2022+) |
| Framework | React 19 |
| Build tool | Vite 8 |
| Lint | Oxlint |
| Quản lý phiên bản | Git / GitHub |

---

## Tài liệu tham khảo

Xem thư mục [`TAILIEUTHAMKHAO/`](TAILIEUTHAMKHAO/) chứa đề cương bài giảng và mẫu báo cáo phục vụ học phần.

---

## License

[MIT](LICENSE) — Copyright (c) 2026 Nguyễn Đức Cảnh
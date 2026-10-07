# HƯỚNG DẪN VIẾT BÁO CÁO DỰ ÁN QUẢN LÝ ĐIỂM

## 1. TỔNG QUAN

File báo cáo hiện tại: `Báo cáo dự án cntt.docx` (đã có sẵn trong repo)
Cần cập nhật để khớp với trạng thái hiện tại của dự án (23 US, 3 Sprint đã hoàn thành).

---

## 2. DANH SÁCH ẢNH CẦN CHỤP (SCREENSHOTS)

### 2.1. Các màn hình bắt buộc (Wajib)

| STT | Màn hình | Đường dẫn | Mô tả | Tên file đề xuất |
|-----|----------|-----------|-------|------------------|
| 1 | Trang chủ (Landing) | `/` | Hero + nút "Bắt đầu ngay" | `01-landing.png` |
| 2 | Đăng nhập | `/login` | Form + 2 tài khoản demo | `02-login.png` |
| 3 | Danh sách lớp (GV) | `/lop` | 3 card lớp + badge "Người quản lý" | `03-class-list.png` |
| 4 | Danh sách SV | `/lop/1` | Bảng 5 SV + nút "Nhập điểm" | `04-student-list.png` |
| 5 | Nhập điểm (TX/GK/CK) | `/lop/1/diem` | 3 cột TX/GK/CK + Tổng kết + Export | `05-score-entry.png` |
| 6 | Validation lỗi | `/lop/1/diem` | Nhập 15/abc → lỗi đỏ | `06-validation-error.png` |
| 7 | Tra cứu điểm | `/lookup` | Filter + phân trang + Export | `07-lookup.png` |
| 8 | Báo cáo tổng hợp | `/report` | Stats + Chart.js + PDF | `08-report.png` |
| 9 | Dashboard Admin | `/admin` | 4 card stat + 4 card chức năng | `09-admin-dashboard.png` |
| 10 | Quản lý lớp | `/admin/classes` | CRUD + Modal + Phân công GV | `10-admin-classes.png` |
| 11 | Quản lý SV | `/admin/students` | CRUD + Import Excel + Chuyển lớp | `11-admin-students.png` |
| 12 | Quản lý môn | `/admin/subjects` | CRUD môn học | `12-admin-subjects.png` |
| 13 | Quản lý tài khoản | `/admin/accounts` | CRUD + Role + Reset pwd + Lock | `13-admin-accounts.png` |
| 14 | Sidebar Admin (FAB) | - | FAB góc trái + Sidebar drawer | `14-fab-sidebar.png` |
| 15 | Teacher Sidebar (FAB) | - | FAB góc phải + Sidebar GV | `15-teacher-fab-sidebar.png` |
| 16 | Tra cứu điểm có data | `/lookup` | Có data + phân trang + Export | `16-lookup-data.png` |
| 17 | Báo cáo có biểu đồ | `/report` | Chart.js Bar + Doughnut + PDF | `17-report-charts.png` |
| 18 | Validation error | `/lop/1/diem` | Nhập 15/-1/abc → lỗi đỏ | `18-validation-error.png` |
| 19 | Teacher Sidebar (FAB) | - | FAB góc phải + Sidebar GV | `19-teacher-sidebar.png` |
| 20 | Admin FAB + Sidebar | - | FAB góc trái + Sidebar QL | `20-fab-sidebar.png` |

### 2.2. Kỹ thuật chụp ảnh

| Yêu cầu | Chi tiết |
|---------|----------|
| **Độ phân giải** | Tối thiểu 1920x1080 (Full HD) |
| **Định dạng** | PNG (không JPEG) |
| **Zoom trình duyệt** | 100% (Ctrl+0) |
| **Thanh công cụ** | Ẩn bookmark bar (F11 hoặc View > Hide toolbar) |
| **Dữ liệu demo** | Đảm bảo có data mẫu (15 SV, 3 lớp, 3 môn) |
| **Tài khoản** | GV: `gv01/123456` \| QL: `quanly01/123456` |

---

## 3. CẬP NHẬT NỘI DUNG BÁO CÁO (CẦN SỬA TRONG .docx)

### 3.1. Các phần cần cập nhật trong file .docx

| Chương/Mục | Nội dung cần cập nhật | Trạng thái |
|------------|----------------------|------------|
| **Chương 1.1.2.1 Phạm vi** | Cập nhật: Đã có 23 US, 3 Theme, 7 Epic | ✅ Đã có |
| **Chương 1.1.2.3 Mục tiêu** | MT1-MT8 đã hoàn thành 100% | ✅ Cập nhật: "Đã hoàn thành 100%" |
| **Chương 2.2.1** | Product Backlog: 23 US (đã sync backlog.md) | ✅ Cập nhật bảng 2.1, 2.3, 2.4 |
| **Chương 2.2.3** | Sprint allocation: Sprint 1=19SP, Sprint 2=25SP, Sprint 3=14SP | ✅ Cập nhật bảng 2.3, 2.4 |
| **Chương 2.5** | Sprint 1 Done, Sprint 2 Done, Sprint 3 Done | ⚠️ Cập nhật: "Đã hoàn thành 100%" |
| **Chương 2.5.1** | Sprint 1 Done: 6 US (US5.1,5.2,6.1,6.2,6.3,7.2) | ✅ |
| **Chương 2.5.2** | Sprint 2 Done: 11 US (US1.1-1.4, 2.1-2.4, 3.1-3.3, 7.1) | ⚠️ Cập nhật: "Đã hoàn thành" |
| **Chương 2.5.3** | Sprint 3 Done: 6 US (US4.1-4.4, 7.3) | ⚠️ Cập nhật: "Đã hoàn thành" |
| **Chương 2.5.1.8** | Thêm hình: "Giao diện nhập điểm TX/GK/CK", "Luồng xử lý điểm" | ⚠️ Thêm hình 2.2, 2.3 |
| **Chương 2.5.2** | Thêm hình: "Giao diện quản trị & tra cứu", "Báo cáo & quản trị tài khoản" | ⚠️ Thêm hình 2.4, 2.5 |
| **Chương 2.5.3** | Thêm hình: "Giao diện báo cáo & quản trị tài khoản" | ⚠️ Thêm hình 2.5 |
| **Chương 3.2** | Thêm kết quả test: Unit 27/27, E2E 14/14, Lint 0 lỗi | ✅ Cập nhật bảng 3.1, 3.3 |
| **Chương 3.3** | Hướng dẫn sử dụng: Thêm FAB, Sidebar, Teacher Sidebar | ⚠️ Cập nhật 3.3.2, 3.3.3 |

### 3.2. Các hình ảnh CẦN THÊM vào .docx (thay thế "ảnh cần chèn")

| Label trong .docx | File ảnh mới | Vị trí chèn |
|-------------------|--------------|-------------|
| `<"ảnh cần chèn">` (Hình 2.2) | `05-score-entry.png` | Chương 2.5.1.4 |
| `<"ảnh cần chèn">` (Hình 2.3) | `06-validation-error.png` | Chương 2.5.1.5 |
| `<"ảnh cần chèn">` (Hình 2.4) | `09-admin-dashboard.png`, `07-lookup.png` | Chương 2.5.2.2 |
| `<"ảnh cần chèn">` (Hình 2.5) | `08-report.png`, `13-admin-accounts.png` | Chương 2.5.3.2 |
| `Hình 2.1` | `01-landing.png` hoặc `09-admin-dashboard.png` | Chương 2.5.1.1 |
| `Hình 2.2` | `05-score-entry.png` | Chương 2.5.1.7 |
| `Hình 2.3` | `06-validation-error.png` | Chương 2.5.1.8 |
| `Hình 2.4` | `09-admin-dashboard.png`, `07-lookup.png` | Chương 2.5.2.2 |
| `Hình 2.5` | `17-report-charts.png`, `13-admin-accounts.png` | Chương 2.5.3.2 |
| `Hình 2.6` | ERD từ WHITEBOOK | Chương 2.5.4 |

---

## 4. HƯỚNG DẪN CHỤP ẢNH CHUẨN (STEP-BY-STEP)

### 4.1. Chuẩn bị môi trường

```bash
# 1. Khởi động dev server
cd /home/nguyenduccanh/Documents/quanlydiem
npm run dev -- --port 5173 --host 0.0.0.0

# 2. Mở browser: http://localhost:5173
# 3. Zoom 100% (Ctrl+0)
# 4. Ẩn bookmark bar (F11 hoặc View > Hide toolbar)
```

### 4.2. Quy trình chụp từng màn hình

#### 01-landing.png
```
1. Mở http://localhost:5173
2. Chụp toàn màn hình (PrintScreen hoặc Snipping Tool)
3. Lưu: 01-landing.png
```

#### 02-login.png
```
1. Click "Bắt đầu ngay" hoặc vào /login
2. Điền gv01 / 123456 (để thấy placeholder)
3. Chụp: 02-login.png
```

#### 03-class-list.png (GV)
```
1. Login gv01/123456
2. Chụp trang /lop: 3 card lớp + avatar GV
```

#### 04-student-list.png
```
1. Click "Xem sinh viên" lớp đầu tiên
2. Chụp: 5 SV + nút "Nhập điểm" + "Nhập điểm cả lớp"
```

#### 05-score-entry.png (QUAN TRỌNG)
```
1. Click "Nhập điểm cả lớp"
2. Chọn môn "Lập trình C (TIN101)"
3. Chụp: 5 SV + 3 cột TX/GK/CK + Tổng kết + 2 nút Export
```

#### 06-validation-error.png
```
1. Tại ô TX: nhập "15" → Enter
2. Chụp khi hiện lỗi đỏ "Điểm phải <= 10"
3. Thử "abc" → lỗi "Điểm không hợp lệ"
```

#### 07-lookup.png
```
1. Vào /lookup (hoặc click Tra cứu từ sidebar)
2. Chọn lớp CNTT-K18A, môn TIN101
3. Chụp: có 5 dòng data + phân trang + 2 nút Export
```

#### 08-report.png (QUAN TRỌNG)
```
1. Vào /report
2. Chọn lớp CNTT-K18A, môn TIN101
3. Chụp: 5 stat cards + Bar chart + Doughnut + Bảng phân bố + nút Xuất PDF
```

#### 09-admin-dashboard.png
```
1. Login quanly01/123456
2. Chụp: 4 stat cards + 4 feature cards
```

#### 10-admin-classes.png
```
1. Click "Quản lý lớp" từ sidebar
2. Chụp: Table CRUD + nút "Thêm lớp" + Modal
```

#### 11-admin-students.png
```
1. Click "Quản lý sinh viên"
2. Chụp: Table + Import Excel + Chuyển lớp
3. Click "Import Excel" → chọn file mau_import_sinh_vien.xlsx → chụp preview
```

#### 12-admin-subjects.png
```
1. Click "Quản lý môn học"
2. Chụp: Table CRUD + Modal
```

#### 13-admin-accounts.png
```
1. Click "Quản lý tài khoản"
2. Chụp: Table CRUD + Role select + Reset pwd + Lock/Unlock
```

#### 14-fab-sidebar.png
```
1. Hover FAB góc trái (icon menu)
2. Click → Sidebar slide in từ trái
3. Chụp khi sidebar mở
```

#### 15-teacher-fab-sidebar.png
```
1. Login gv01/123456
2. Click FAB góc phải (icon menu)
3. Chụp: Sidebar bên phải với 3 items
```

#### 16-lookup-data.png
```
1. Login GV, vào /lookup
2. Chọn lớp + môn có data
3. Chụp: Có data + pagination + Export buttons
```

#### 17-report-charts.png
```
1. Vào /report, chọn lớp + môn
2. Chụp: Stat cards + Bar chart + Doughnut + Table
```

#### 18-validation-error.png
```
1. Tại /lop/1/diem, ô TX nhập "15" → Enter
2. Chụp lỗi đỏ "Điểm phải <= 10"
```

#### 19-teacher-sidebar.png
```
1. Login gv01
2. Click FAB góc phải → Sidebar mở
```

#### 20-fab-sidebar.png
```
1. Login quanly01
2. Click FAB góc trái → Sidebar slide in
```

---

## 5. CHECKLIST HOÀN THIỆN BÁO CÁO

### 5.1. Nội dung (Content)
- [ ] Cập nhật tất cả 23 US status = Done
- [ ] Cập nhật Sprint 1/2/3 = Done 100%
- [ ] Cập nhật Product Backlog (23 US, 58 SP, 88h)
- [ ] Cập nhật Sprint allocation: S1=19SP, S2=25SP, S3=14SP
- [ ] Thêm 20 screenshots vào .docx
- [ ] Thay thế tất cả `<"ảnh cần chèn">` bằng file ảnh thực
- [ ] Cập nhật Chương 3: Test results (27/27 unit, 14/14 e2e)
- [ ] Cập nhật Chương 3.3: Thêm FAB + Sidebar docs

### 5.2. Kỹ thuật (Technical)
- [ ] Tất cả 20 screenshots đã chụp, rename đúng tên
- [ ] Chèn ảnh vào .docx tại đúng vị trí (thay `<"ảnh cần chèn">`)
- [ ] Caption ảnh tiếng Việt có ý nghĩa
- [ ] Figure numbering liên tục (Hình 2.1 → 2.6, 3.1...)

### 5.3. Phụ lục & Tài liệu tham khảo
- [ ] Phụ lục A: Từ điển dữ liệu V0 (đã có)
- [ ] Phụ lục B: API Contract (đã có)
- [ ] Phụ lục C: Đối chiếu chuẩn hóa (đã có)
- [ ] Phụ lục D: Open source (đã có)
- [ ] TAILIEUTHAMKHAO: 9 file PDF (đã có)

---

## 6. TIPS CHỤP ẢNH CHUYÊN NGHIỆP

| Tip | Cách làm |
|-----|----------|
| **Crop thông minh** | Chỉ chụp vùng nội dung, bỏ thanh address bar |
| **Consistent size** | Mọi screenshot width ~1920px |
| **Highlight data** | Có data mẫu hiển thị (không rỗng) |
| **Hover states** | Chụp cả state hover (button, row hover) |
| **Error states** | Chụp cả success + error states |
| **Mobile responsive** | Chụp thêm ở 375px (DevTools device toolbar) |

---

## 6. FILES LIÊN QUAN (ĐỂ THAM KHẢO)

| File | Mục đích |
|------|----------|
| `Báo cáo dự án cntt.docx` | File báo cáo chính (cần cập nhật) |
| `WHITEBOOK.md` | Spec chi tiết (đã sync v2.1) |
| `docs/backlog.md` | Product Backlog 23 US |
| `docs/sprint-log.md` | Nhật ký 3 Sprint |
| `docs/01-architecture.md` đến `04-opensource.md` | Tài liệu kỹ thuật |
| `mau_import_sinh_vien.xlsx` | File mẫu import SV |
| `HUONG_DAN_VIET_BAO_CAO.md` | File này |

---

## 7. TIẾN ĐỘ HIỆN TẠI (Tóm tắt)

| hạng mục | Trạng thái |
|----------|------------|
| **Codebase** | ✅ 100% Done (23/23 US) |
| **Build/Lint/Test** | ✅ Pass |
| **Git push** | ✅ `3dcfc60` |
| **Screenshots** | ⏳ **Cần chụp 20 ảnh** |
| **Cập nhật .docx** | ⏳ **Cần cập nhật** |
| **Báo cáo hoàn thiện** | ⏳ **80%** |

---

> **Lưu ý**: Sau khi chụp xong 20 ảnh, mở `Báo cáo dự án cntt.docx` → Replace từng `<"ảnh cần chèn">` → Save → Submit.

---

*Tạo ngày: $(date +"%d/%m/%Y") | Dự án: QLD-2026-001 | Tác giả: Nguyễn Đức Cảnh*
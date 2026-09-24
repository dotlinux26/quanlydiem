1. Tên ứng dụng

Phát triển dự án website quản lý nhập liệu điểm và xuất báo cáo cho giáo viên

Mục tiêu: thay thế quy trình giáo viên nhập, quản lý, tra cứu và xuất báo cáo điểm thủ công.

2. Actor / Role

Chỉ cần 2 actor:

Giáo viên
Xem lớp và danh sách sinh viên được phân công
Nhập điểm
Sửa điểm
Tra cứu điểm
Xuất bảng điểm/báo cáo
Quản trị viên
Quản lý lớp, sinh viên, môn học
Quản lý tài khoản giáo viên
Phân quyền

Không cần Actor Sinh viên nếu hệ thống chỉ tập trung vào nghiệp vụ của giáo viên và quản trị viên.

3. Theme → Epic → User Story
Theme 01 — Quản lý dữ liệu học tập

EPIC-01 — Quản lý lớp, sinh viên và môn học

US-001: Là giáo viên, tôi muốn xem danh sách lớp và sinh viên được phân công để quản lý việc nhập điểm.
US-002: Là quản trị viên, tôi muốn thêm, sửa, xóa thông tin lớp, sinh viên và môn học để duy trì dữ liệu học tập.
Theme 02 — Quản lý điểm

EPIC-02 — Nhập và quản lý điểm

US-003: Là giáo viên, tôi muốn nhập điểm cho sinh viên để lưu kết quả học tập.
US-004: Là giáo viên, tôi muốn sửa điểm đã nhập để cập nhật kết quả chính xác.
US-005: Là giáo viên, tôi muốn hệ thống kiểm tra điểm hợp lệ và tính điểm tổng kết để hạn chế sai sót.
Theme 03 — Tra cứu và báo cáo

EPIC-03 — Tra cứu và xuất báo cáo điểm

US-006: Là giáo viên, tôi muốn tra cứu điểm theo lớp, môn học và sinh viên để theo dõi kết quả.
US-007: Là giáo viên, tôi muốn xuất bảng điểm để sử dụng trong công tác giảng dạy và quản lý.
US-008: Là giáo viên, tôi muốn xem báo cáo tổng hợp kết quả học tập để đánh giá tình hình của lớp.
US-009: Là quản trị viên, tôi muốn quản lý tài khoản và phân quyền người dùng để kiểm soát quyền truy cập hệ thống.
4. Cấu trúc tổng thể
Ứng dụng quản lý điểm
│
├── Theme 01: Quản lý dữ liệu học tập
│   └── EPIC-01: Quản lý lớp, sinh viên, môn học
│       ├── US-001
│       └── US-002
│
├── Theme 02: Quản lý điểm
│   └── EPIC-02: Nhập và quản lý điểm
│       ├── US-003
│       ├── US-004
│       └── US-005
│
└── Theme 03: Tra cứu và báo cáo
    └── EPIC-03: Tra cứu và xuất báo cáo điểm
        ├── US-006
        ├── US-007
        ├── US-008
        └── US-009

Tổng: 3 Theme → 3 Epic → 9 User Story → 2 Role.

5. Business flow
Quản trị viên
    ↓
Quản lý lớp / sinh viên / môn học
    ↓
Phân công giáo viên
    ↓
Giáo viên nhập điểm
    ↓
Hệ thống kiểm tra + tính điểm
    ↓
Giáo viên tra cứu
    ↓
Xuất bảng điểm / báo cáo

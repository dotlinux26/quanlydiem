 # 07. NHẬT KÝ SPRINT

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
| US2.1 | Import danh sách sinh viên từ Excel | 3 | 5h | Sprint 2 (V1.0) | To Do |
| US2.2 | Sửa thông tin sinh viên | 2 | 3h | Sprint 2 (V1.0) | To Do |
| US2.3 | Xóa sinh viên | 2 | 2h | Sprint 2 (V1.0) | To Do |
| US2.4 | Chuyển sinh viên sang lớp khác | 2 | 3h | Sprint 2 (V1.0) | To Do |
| US3.1 | Tạo môn học | 2 | 3h | Sprint 2 (V1.0) | To Do |
| US3.2 | Sửa môn học | 2 | 3h | Sprint 2 (V1.0) | To Do |
| US3.3 | Xóa môn học | 2 | 2h | Sprint 2 (V1.0) | To Do |
| US7.1 | Tra cứu điểm theo lớp/môn/SV và phân trang | 3 | 5h | Sprint 2 (V1.0) | To Do |
| US4.1 | Tạo tài khoản giáo viên | 3 | 4h | Sprint 3 (V2.0) | To Do |
| US4.2 | Sửa tài khoản giáo viên | 2 | 3h | Sprint 3 (V2.0) | To Do |
| US4.3 | Xóa tài khoản giáo viên | 2 | 2h | Sprint 3 (V2.0) | To Do |
| US4.4 | Đặt lại mật khẩu giáo viên | 2 | 3h | Sprint 3 (V2.0) | To Do |
| US7.3 | Báo cáo tổng hợp và biểu đồ | 5 | 8h | Sprint 3 (V2.0) | To Do |

**Tổng số User Story:** 23

 ### Bảng 7.2. Tổng hợp khối lượng theo Sprint

 | Sprint | Phiên bản | Số US | Story Point | Effort | Thời gian dự kiến |
| --- | --- | --- | --- | --- | --- |
| Sprint 1 | V0 | 6 | 17 | 27 giờ | 24/09 - 07/10/2026 |
| Sprint 2 | V1.0 | 11 | 25 | 38 giờ | 08/10 - 21/10/2026 |
| Sprint 3 | V2.0 | 6 | 16 | 23 giờ | 22/10 - 04/11/2026 |
| **Tổng** |  | **23** | **58** | **88 giờ** |  |

> **Ghi chú:** Sprint 1 được ưu tiên hoàn thiện trước nhằm tạo Increment V0 có thể sử dụng được. Các Sprint 2 và 3 tiếp tục mở rộng hệ thống dựa trên nền tảng chức năng đã hoàn thiện.

---

 # 7.2. Danh sách User Story trong các Sprint

 ## 7.2.1. Sprint Backlog — Sprint 1 (V0)

 **Thời gian:** 24/09/2026 - 07/10/2026\
 **Mục tiêu Sprint:** Hoàn thiện các chức năng cốt lõi dành cho giáo viên, cho phép giáo viên xem lớp/sinh viên, nhập và sửa điểm, kiểm tra điểm hợp lệ và xuất bảng điểm.

 ### Bảng 7.3. Sprint Backlog Sprint 1

 | UID | User Story | SP | Effort | Acceptance Criteria | Testing | Task |
| --- | --- | --- | --- | --- | --- | --- |
| US5.1 | Là GV, tôi muốn xem danh sách lớp được phân công | 2 | 3h | GV chỉ nhìn thấy các lớp được phân công; QL nhìn thấy toàn bộ lớp | Login GV → kiểm tra danh sách lớp | ClassListPage |
| US5.2 | Là GV, tôi muốn xem danh sách SV của một lớp | 2 | 3h | Hiển thị đúng SV thuộc lớp; có mã SV, họ tên | Chọn lớp → kiểm tra danh sách SV | StudentListPage |
| US6.1 | Là GV, tôi muốn nhập điểm cho SV | 3 | 5h | Nhập điểm theo lớp/môn; lưu thành công; tổng kết được cập nhật | Nhập 7,5 / 8 / 9 → lưu → kiểm tra kết quả | ScoreEntryPage |
| US6.2 | Là GV, tôi muốn sửa điểm đã nhập | 2 | 3h | Cho phép sửa điểm; lưu giá trị mới; cập nhật tổng kết | Sửa điểm 8 → 9 → lưu | ScoreForm |
| US6.3 | Là GV, tôi muốn hệ thống kiểm tra điểm hợp lệ | 5 | 8h | Điểm từ 0–10, bước 0,5; không nhận dữ liệu không hợp lệ; tính tổng kết tự động | Unit test + E2E validation | score.js + validation |
| US7.2 | Là GV, tôi muốn xuất bảng điểm Excel/CSV | 3 | 5h | Xuất được `.xlsx` và `.csv`; đúng các cột dữ liệu | E2E click Export → kiểm tra file | Export feature |

### Kết quả Sprint 1

 Increment V0 cung cấp các chức năng:

 - Đăng nhập và phân quyền cơ bản.
- Xem danh sách lớp được phân công.
- Xem danh sách sinh viên.
- Nhập điểm.
- Sửa điểm.
- Kiểm tra điểm trong khoảng 0–10.
- Hỗ trợ nhập điểm theo bước 0,5.
- Tính điểm tổng kết tự động.
- Xuất bảng điểm Excel/CSV.

 ### Bug Fix trong Sprint 1

 | Bug ID | Mô tả | Nguyên nhân | Hướng xử lý | Status |
| --- | --- | --- | --- | --- |
| BUG-01 | Chuyển môn làm mất dữ liệu chưa lưu | Không kiểm tra dữ liệu dirty trước khi chuyển môn | Hiển thị confirm trước khi chuyển | Fixed |
| BUG-02 | Không nhập được điểm dạng `7,5` | Input number không hỗ trợ dấu phẩy | Chuyển sang text \+ normalize dữ liệu | Fixed |
| BUG-03 | Link sinh viên không highlight đúng dòng | Không xử lý query parameter `sv` | Đọc `useSearchParams` và scroll đến dòng tương ứng | Fixed |

---

 # 7.2.2. Sprint Backlog — Sprint 2 (V1.0)

 **Thời gian:** 08/10/2026 - 21/10/2026

 **Mục tiêu Sprint:** Hoàn thiện các chức năng quản lý dữ liệu học tập dành cho người quản lý và bổ sung chức năng tra cứu điểm cho giáo viên.

 ### Bảng 7.4. Sprint Backlog Sprint 2

 | UID | User Story | SP | Effort | Acceptance Criteria | Testing | Task |
| --- | --- | --- | --- | --- | --- | --- |
| US1.1 | QL tạo lớp học | 2 | 3h | Nhập thông tin lớp và tạo thành công | E2E tạo lớp | AdminClassPage |
| US1.2 | QL sửa lớp học | 2 | 3h | Sửa thông tin lớp và cập nhật thành công | E2E sửa lớp | AdminClassPage |
| US1.3 | QL xóa lớp học | 2 | 2h | Có confirm trước khi xóa | E2E xóa lớp | AdminClassPage |
| US1.4 | QL phân công lớp cho GV | 3 | 4h | Chọn GV và gán lớp thành công | E2E phân công | Assignment form |
| US2.1 | QL import SV từ Excel | 3 | 5h | Đọc file Excel và tạo danh sách SV | Import `.xlsx` test | AdminStudentsPage |
| US2.2 | QL sửa thông tin SV | 2 | 3h | Cho phép sửa thông tin SV | E2E CRUD | Student modal |
| US2.3 | QL xóa SV | 2 | 2h | Xóa SV sau khi xác nhận | E2E delete | Student modal |
| US2.4 | QL chuyển SV sang lớp khác | 2 | 3h | Chọn lớp mới và cập nhật thành công | E2E transfer | Class dropdown |
| US3.1 | QL tạo môn học | 2 | 3h | Nhập mã môn, tên môn, tín chỉ | E2E create | AdminSubjectsPage |
| US3.2 | QL sửa môn học | 2 | 3h | Cập nhật đúng thông tin môn | E2E update | Subject modal |
| US3.3 | QL xóa môn học | 2 | 2h | Có confirm trước khi xóa | E2E delete | Subject modal |
| US7.1 | GV tra cứu điểm | 3 | 5h | Lọc theo lớp, môn, SV; phân trang; hiển thị tổng kết | Unit filter + E2E | ScoreLookupPage |

### Kết quả dự kiến Sprint 2

 Sau Sprint 2, hệ thống có thể:

 - Quản lý vòng đời của lớp học.
- Phân công giáo viên cho lớp.
- Import danh sách sinh viên bằng Excel.
- Thêm, sửa, xóa sinh viên.
- Chuyển sinh viên giữa các lớp.
- Thêm, sửa, xóa môn học.
- Tra cứu điểm theo nhiều điều kiện.
- Phân trang danh sách kết quả.
- Kết hợp dữ liệu điểm với lớp, môn học và sinh viên.

---

 # 7.2.3. Sprint Backlog — Sprint 3 (V2.0)

 **Thời gian:** 22/10/2026 - 04/11/2026

 **Mục tiêu Sprint:** Hoàn thiện chức năng quản trị tài khoản giáo viên và báo cáo tổng hợp kết quả học tập.

 ### Bảng 7.5. Sprint Backlog Sprint 3

 | UID | User Story | SP | Effort | Acceptance Criteria | Testing | Task |
| --- | --- | --- | --- | --- | --- | --- |
| US4.1 | QL tạo tài khoản GV | 3 | 4h | Tạo tài khoản với username, password và role GV | Unit + E2E | AdminAccountsPage |
| US4.2 | QL sửa tài khoản GV | 2 | 3h | Cập nhật thông tin tài khoản | E2E update | Account modal |
| US4.3 | QL xóa tài khoản GV | 2 | 2h | Có xác nhận trước khi xóa | E2E delete | Account modal |
| US4.4 | QL đặt lại mật khẩu GV | 2 | 3h | Reset mật khẩu thành công | E2E reset password | Auth service |
| US7.3 | GV xem báo cáo tổng hợp | 5 | 8h | Hiển thị max, min, avg, tỷ lệ đạt và biểu đồ | Unit stats + E2E | ReportPage |

### Kết quả dự kiến Sprint 3

 Phiên bản V2.0 hoàn thiện:

 - Quản trị tài khoản giáo viên.
- Quản lý vai trò người dùng.
- Reset mật khẩu giáo viên.
- Báo cáo điểm cao nhất.
- Báo cáo điểm thấp nhất.
- Điểm trung bình.
- Tỷ lệ sinh viên đạt.
- Biểu đồ phân bố kết quả.
- Tổng hợp kết quả theo lớp/môn học.

---

 # 7.3. Phát triển phiên bản sản phẩm phần mềm theo Sprint

 ## 7.3.1. Phiên bản V0 — Sprint 1

 **Thời gian:** 24/09/2026 - 07/10/2026

 **Mục tiêu:** Xây dựng phiên bản đầu tiên có khả năng hỗ trợ giáo viên thực hiện quy trình nhập và quản lý điểm cơ bản.

 ### Các chức năng hoàn thành

 | Chức năng | Mô tả | User Story |
| --- | --- | --- |
| Đăng nhập | Đăng nhập theo vai trò giáo viên/người quản lý | Nền tảng hệ thống |
| Xem lớp | GV chỉ xem các lớp được phân công | US5.1 |
| Xem sinh viên | Xem danh sách SV trong lớp | US5.2 |
| Nhập điểm | Nhập điểm thường, giữa kỳ, cuối kỳ | US6.1 |
| Sửa điểm | Chỉnh sửa điểm đã lưu | US6.2 |
| Validation | Kiểm tra 0–10, bước 0,5 | US6.3 |
| Tính tổng kết | Tự động tính điểm tổng kết | US6.3 |
| Xuất Excel | Xuất bảng điểm `.xlsx` | US7.2 |
| Xuất CSV | Xuất bảng điểm `.csv` | US7.2 |

### Kết quả kiểm thử

 - Unit test: hoàn thành các test case cho validation và tính điểm.
- E2E test: kiểm tra luồng đăng nhập → chọn lớp → nhập điểm → lưu → xuất dữ liệu.
- Lint: không có lỗi.
- Build: thành công.
- Acceptance Criteria của các User Story trong Sprint được kiểm tra trước khi đóng Sprint.

---

 ## 7.3.2. Phiên bản V1.0 — Sprint 2

 **Thời gian dự kiến:** 08/10/2026 - 21/10/2026

 **Mục tiêu:** Mở rộng hệ thống từ chức năng nhập điểm sang quản lý toàn bộ dữ liệu học tập.

 ### Các chức năng dự kiến

 - Quản lý lớp học.
- Phân công giáo viên.
- Quản lý sinh viên.
- Import sinh viên từ Excel.
- Chuyển sinh viên giữa các lớp.
- Quản lý môn học.
- Tra cứu điểm.
- Lọc và phân trang kết quả.

 Phiên bản V1.0 hướng tới việc giúp người quản lý chủ động cập nhật dữ liệu hệ thống thay vì phụ thuộc vào dữ liệu khởi tạo ban đầu.

---

 ## 7.3.3. Phiên bản V2.0 — Sprint 3

 **Thời gian dự kiến:** 22/10/2026 - 04/11/2026

 **Mục tiêu:** Hoàn thiện chức năng quản trị hệ thống và cung cấp báo cáo phục vụ đánh giá kết quả học tập.

 ### Các chức năng dự kiến

 - Tạo tài khoản giáo viên.
- Sửa tài khoản giáo viên.
- Xóa tài khoản giáo viên.
- Reset mật khẩu.
- Quản lý role và quyền truy cập.
- Báo cáo điểm cao nhất/thấp nhất/trung bình.
- Tính tỷ lệ đạt.
- Biểu đồ thống kê kết quả.
- Hoàn thiện tài liệu sử dụng và chuẩn bị phát hành V2.0.

---

 # 7.4. Sprint Review & Retrospective

 ## 7.4.1. Sprint Review — Sprint 1

 ### Bảng 7.6. Kết quả Sprint Review

 | Tiêu chí | Kết quả |
| --- | --- |
| Sprint Goal | ✅ Hoàn thành |
| US hoàn thành | ✅ 6/6 User Story |
| Chức năng nhập điểm | ✅ Hoàn thành |
| Chức năng sửa điểm | ✅ Hoàn thành |
| Validation điểm | ✅ Hoàn thành |
| Tính điểm tổng kết | ✅ Hoàn thành |
| Xuất Excel/CSV | ✅ Hoàn thành |
| Kiểm thử | ✅ Hoàn thành |
| Build | ✅ Thành công |
| Increment | ✅ Có thể chạy và trình diễn |

Sprint Review cho thấy Increment V0 đã đáp ứng được quy trình nghiệp vụ cơ bản của giáo viên: **đăng nhập → xem lớp → xem sinh viên → nhập/sửa điểm → kiểm tra điểm → xuất bảng điểm**.

---

 ## 7.4.2. Sprint Retrospective — Sprint 1

 ### Bảng 7.7. Retrospective

 | Start | Stop | Continue |
| --- | --- | --- |
| Viết Acceptance Criteria trước khi code | Commit trực tiếp lên `main` | Kiểm thử sau mỗi User Story |
| Tạo feature branch cho từng nhóm chức năng | Hardcode dữ liệu trong component | Dùng Conventional Commit |
| Viết test case song song với chức năng | Copy-paste UI giữa các màn hình | Cập nhật tài liệu song song với code |
| Ghi nhận bug thành GitHub Issue | Bỏ qua edge case của input | Review code trước khi merge |

### Action Items cho Sprint 2

 1. Tạo feature branch riêng cho từng nhóm User Story.
2. Chuẩn hóa các component CRUD dùng chung.
3. Xây dựng validation cho dữ liệu Excel import.
4. Thiết kế API/service layer cho lớp, sinh viên và môn học.
5. Bổ sung test case cho các trường hợp dữ liệu không hợp lệ.
6. Hoàn thiện chức năng filter và pagination.
7. Thiết lập CI cho lint, test và build.

---

 # 7.5. Theo dõi tiến độ Sprint

 Để theo dõi tiến độ phát triển, nhóm sử dụng Sprint Board với các trạng thái:

 **To Do → In Progress → Testing → Done**

 Mỗi User Story chỉ được chuyển sang trạng thái **Done** khi thỏa mãn Definition of Done.

 ### Definition of Done

 Một User Story được xem là hoàn thành khi:

 - Chức năng được triển khai đúng Acceptance Criteria.
- Code đã được kiểm tra và review.
- Unit test tương ứng đã được thực hiện.
- E2E test được thực hiện đối với các luồng chính.
- Không còn lỗi nghiêm trọng liên quan đến User Story.
- Lint không phát sinh lỗi.
- Build thành công.
- Tài liệu/chú thích liên quan được cập nhật.
- User Story được chuyển sang trạng thái **Done** trên Sprint Board.

---

 # 7.6. Kết luận chương 7

 Chương 7 trình bày quá trình lập kế hoạch và theo dõi phát triển phần mềm theo mô hình Scrum trong **03 Sprint**.

 **Sprint 1 (V0)** tập trung vào nhóm chức năng cốt lõi dành cho giáo viên gồm xem lớp, xem sinh viên, nhập điểm, sửa điểm, kiểm tra điểm và xuất bảng điểm. Đây là Increment đầu tiên có khả năng thực hiện quy trình nghiệp vụ nhập và quản lý điểm.

 **Sprint 2 (V1.0)** mở rộng hệ thống với các chức năng quản lý lớp học, sinh viên, môn học và tra cứu điểm. Các chức năng này giúp người quản lý chủ động quản lý dữ liệu học tập và giúp giáo viên thuận tiện hơn trong việc tìm kiếm kết quả.

 **Sprint 3 (V2.0)** hoàn thiện các chức năng quản trị tài khoản và báo cáo tổng hợp, bao gồm thống kê điểm, tỷ lệ đạt và biểu đồ kết quả học tập.

 Việc phân chia User Story theo Sprint giúp quá trình phát triển có định hướng rõ ràng, ưu tiên hoàn thiện chức năng nghiệp vụ cốt lõi trước, sau đó mở rộng sang quản trị dữ liệu và báo cáo. Mỗi User Story được kiểm soát thông qua Acceptance Criteria, Testing và Definition of Done nhằm đảm bảo Increment sau mỗi Sprint có thể kiểm thử và đánh giá được.

import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <div className="app">
      <main className="app-shell">
        <h1>Phát triển dự án website quản lý nhập liệu điểm và xuất báo cáo cho giáo viên</h1>
        <p>
          Hệ thống hỗ trợ giáo viên nhập, quản lý, tra cứu điểm và xuất báo cáo
          — thay thế quy trình nhập, quản lý, tra cứu và xuất báo cáo điểm thủ
          công.
        </p>
        <section className="roles">
          <article>
            <h2>Giáo viên</h2>
            <ul>
              <li>Xem lớp và danh sách sinh viên được phân công</li>
              <li>Nhập, sửa và tra cứu điểm</li>
              <li>Xuất bảng điểm / báo cáo (Sprint 2)</li>
            </ul>
          </article>
          <article>
            <h2>Quản trị viên</h2>
            <ul>
              <li>Quản lý lớp, sinh viên, môn học (Sprint 3)</li>
              <li>Quản lý tài khoản giáo viên (Sprint 3)</li>
              <li>Phân quyền</li>
            </ul>
          </article>
        </section>
        <p className="reference">
          <Link to="/login" className="btn btn-primary">
            Đăng nhập để bắt đầu
          </Link>
        </p>
      </main>
    </div>
  )
}
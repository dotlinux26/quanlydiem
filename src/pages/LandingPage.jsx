import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <div className="landing-page">
      <main className="landing-card">
        <div className="landing-icon" aria-hidden="true">📊</div>
        <h1>Phát triển dự án website quản lý nhập liệu điểm và xuất báo cáo cho giáo viên</h1>
        <p>
          Hệ thống hỗ trợ giáo viên nhập, quản lý, tra cứu điểm và xuất báo cáo
          — thay thế quy trình thủ công, giảm sai sót và tiết kiệm thời gian.
        </p>

        <section className="features-grid" aria-label="Tính năng chính">
          <article className="feature-card">
            <h3><span className="icon" aria-hidden="true">👨‍🏫</span>Giáo viên</h3>
            <ul>
              <li>Xem lớp & sinh viên được phân công</li>
              <li>Nhập, sửa điểm theo lớp + môn học</li>
              <li>Kiểm tra điểm hợp lệ, tự động tính tổng kết</li>
              <li>Tra cứu điểm theo lớp, môn, sinh viên</li>
              <li>Xuất bảng điểm Excel / CSV</li>
              <li>Xem báo cáo tổng hợp kết quả học tập</li>
            </ul>
          </article>
          <article className="feature-card">
            <h3><span className="icon" aria-hidden="true">⚙️</span>Quản trị viên</h3>
            <ul>
              <li>Quản lý lớp, sinh viên, môn học (CRUD)</li>
              <li>Quản lý tài khoản giáo viên & phân quyền</li>
              <li>Phân công giáo viên cho lớp học</li>
              <li>Xem tổng quan toàn hệ thống</li>
            </ul>
          </article>
          <article className="feature-card">
            <h3><span className="icon" aria-hidden="true">🔐</span>Bảo mật & Phân quyền</h3>
            <ul>
              <li>Đăng nhập phân quyền (Giáo viên / Admin)</li>
              <li>Giáo viên chỉ xem lớp được phân công</li>
              <li>Admin quản lý toàn bộ dữ liệu</li>
              <li>Bảo vệ route & API theo vai trò</li>
            </ul>
          </article>
          <article className="feature-card">
            <h3><span className="icon" aria-hidden="true">🛠️</span>Công nghệ hiện đại</h3>
            <ul>
              <li>React 19 + Vite 8 (HMR nhanh)</li>
              <li>React Router 7 (SPA routing)</li>
              <li>localStorage mock DB (chuyển API sau)</li>
              <li>Oxlint + Playwright E2E test</li>
            </ul>
          </article>
        </section>

        <div className="landing-cta">
          <Link to="/login" className="btn btn-primary btn-lg">
            Đăng nhập để bắt đầu
          </Link>
        </div>
      </main>
    </div>
  )
}
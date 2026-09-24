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

        <div className="landing-cta">
          <Link to="/login" className="btn btn-primary btn-lg">
            Bắt đầu ngay
          </Link>
        </div>
      </main>
    </div>
  )
}
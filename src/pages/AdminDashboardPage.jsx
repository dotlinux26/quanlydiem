import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'

export default function AdminDashboardPage() {
  const stats = [
    { label: 'Tổng lớp học', value: '3', icon: 'bookOpen', href: '/admin/classes' },
    { label: 'Tổng sinh viên', value: '15', icon: 'users', href: '/admin/students' },
    { label: 'Tổng môn học', value: '3', icon: 'bookOpenText', href: '/admin/subjects' },
    { label: 'Giáo viên', value: '1', icon: 'graduationCap', href: '/admin/teachers' },
  ]

  const features = [
    { icon: 'bookOpen', title: 'Quản lý lớp học', items: ['Thêm / Sửa / Xóa lớp', 'Phân công giáo viên cho lớp', 'Cập nhật năm học'] },
    { icon: 'users', title: 'Quản lý sinh viên', items: ['Thêm / Sửa / Xóa sinh viên', 'Import danh sách từ Excel', 'Chuyển lớp, nghỉ học'] },
    { icon: 'bookOpenText', title: 'Quản lý môn học', items: ['Thêm / Sửa / Xóa môn học', 'Cập nhật tín chỉ, mã môn'] },
    { icon: 'graduationCap', title: 'Quản lý tài khoản', items: ['Tạo / Sửa / Xóa tài khoản GV', 'Phân vai trò (GV / Người quản lý)', 'Reset mật khẩu, khóa tài khoản'] },
  ]

  return (
    <div className="page">
      <div className="page-header">
        <h2>Bảng điều khiển quản trị</h2>
        <p className="muted">Tổng quan hệ thống</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {stats.map((s, i) => (
          <Link key={i} to={s.href} className="card" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Icon name={s.icon} size={32} style={{ color: '#2563eb' }} />
              <div>
                <div style={{ fontSize: '0.875rem', color: '#64748b' }}>{s.label}</div>
                <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>{s.value}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Chức năng quản trị (Sprint 3 - V2.0)</h3>
        </div>
        <div className="card-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {features.map((f, i) => (
              <div key={i} className="feature-card" style={{ padding: '1rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                <h4 style={{ margin: '0 0 0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Icon name={f.icon} size={20} style={{ color: '#2563eb' }} />
                  {f.title}
                </h4>
                <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.875rem', color: '#475569' }}>
                  {f.items.map((item, j) => <li key={j}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
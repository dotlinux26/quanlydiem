import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'
import { ROLE_LABELS } from '../constants/roles.js'
import Icon from '../components/Icon.jsx'

export default function Navbar() {
  const { user, logout, isQuanLy } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  const adminLinks = [
    { path: '/admin', label: 'Tổng quan', icon: 'layoutDashboard' },
    { path: '/admin/classes', label: 'Lớp học', icon: 'building2' },
    { path: '/admin/students', label: 'Sinh viên', icon: 'users' },
    { path: '/admin/subjects', label: 'Môn học', icon: 'bookOpen' },
    { path: '/admin/teachers', label: 'Tài khoản', icon: 'userCog' },
    { path: '/lookup', label: 'Tra cứu', icon: 'search' },
    { path: '/report', label: 'Báo cáo', icon: 'barChart2' },
  ]

  return (
    <header className="navbar">
      <Link to="/" className="navbar-brand">
        <Icon name="barChart" size={20} style={{ marginRight: '0.5rem' }} />
        Quản lý điểm
      </Link>
      <nav className="navbar-links">
        <Link
          to="/lop"
          className={location.pathname.startsWith('/lop') ? 'active' : ''}
        >
          <Icon name="bookOpen" size={16} /> Lớp học
        </Link>
        {isQuanLy && (
          <div style={{ position: 'relative' }}>
            <button
              className={location.pathname.startsWith('/admin') || location.pathname.startsWith('/lookup') || location.pathname.startsWith('/report') ? 'active' : ''}
              onClick={() => navigate('/admin')}
              style={{
                background: 'none', border: 'none', color: location.pathname.startsWith('/admin') || location.pathname.startsWith('/lookup') || location.pathname.startsWith('/report') ? '#fff' : '#94a3b8',
                padding: '0.5rem 1rem', borderRadius: '6px', fontWeight: 500, fontSize: '0.875rem', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '0.35rem', fontFamily: 'inherit',
                backgroundColor: location.pathname.startsWith('/admin') || location.pathname.startsWith('/lookup') || location.pathname.startsWith('/report') ? '#2563eb' : 'transparent',
              }}
            >
              <Icon name="shield" size={16} /> Quản trị
              <Icon name="chevronDown" size={14} />
            </button>
            <div style={{
              position: 'absolute', top: '100%', left: 0, marginTop: '0.5rem',
              background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px',
              boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', zIndex: 100, minWidth: '180px',
              overflow: 'hidden',
            }}>
              {adminLinks.map((link, i) => (
                <Link
                  key={i}
                  to={link.path}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.6rem 1rem', color: '#94a3b8', fontSize: '0.875rem',
                    fontWeight: 500, textDecoration: 'none',
                    background: location.pathname === link.path ? 'rgba(37,99,235,0.2)' : 'transparent',
                    borderLeft: location.pathname === link.path ? '3px solid #2563eb' : 'none',
                  }}
                  onMouseOver={e => e.target.style.background = 'rgba(255,255,255,0.05)'}
                  onMouseOut={e => e.target.style.background = location.pathname === link.path ? 'rgba(37,99,235,0.2)' : 'transparent'}
                >
                  <Icon name={link.icon} size={16} />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
      <div className="navbar-user">
        <span className={`role-badge ${isQuanLy ? 'quan-ly' : ''}`}>
          {ROLE_LABELS[user?.role] ?? user?.role}
        </span>
        <span style={{ color: '#64748b', fontSize: '0.8rem' }}>{user?.name}</span>
        <button type="button" className="btn btn-ghost btn-sm" onClick={handleLogout}>
          <Icon name="logOut" size={14} /> Đăng xuất
        </button>
      </div>
    </header>
  )
}
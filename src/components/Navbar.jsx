import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'
import { ROLE_LABELS } from '../constants/roles.js'

export default function Navbar() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <header className="navbar">
      <Link to="/" className="navbar-brand">Quản lý điểm</Link>
      <nav className="navbar-links">
        <Link
          to="/lop"
          className={location.pathname.startsWith('/lop') ? 'active' : ''}
        >
          Lớp học
        </Link>
        {user?.role === 'ADMIN' && (
          <Link
            to="/admin"
            className={location.pathname.startsWith('/admin') ? 'active' : ''}
          >
            Quản trị
          </Link>
        )}
      </nav>
      <div className="navbar-user">
        <span className={`role-badge ${user?.role === 'ADMIN' ? 'admin' : ''}`}>
          {ROLE_LABELS[user?.role] ?? user?.role}
        </span>
        <span style={{ color: '#64748b', fontSize: '0.8rem' }}>{user?.name}</span>
        <button type="button" className="btn btn-ghost btn-sm" onClick={handleLogout}>
          Đăng xuất
        </button>
      </div>
    </header>
  )
}
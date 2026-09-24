import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'
import { ROLE_LABELS } from '../constants/roles.js'

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <header className="navbar">
      <Link to="/" className="navbar-brand">
        Quản lý điểm
      </Link>
      <nav className="navbar-links">
        <Link to="/lop">Lớp học</Link>
        {user?.role === 'ADMIN' && <Link to="/admin">Quản trị</Link>}
      </nav>
      <div className="navbar-user">
        <span title="Vai trò">
          {user?.name} ({ROLE_LABELS[user?.role] ?? user?.role})
        </span>
        <button type="button" className="btn btn-ghost" onClick={logout}>
          Đăng xuất
        </button>
      </div>
    </header>
  )
}
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'
import { ROLE_LABELS } from '../constants/roles.js'
import Icon from '../components/Icon.jsx'
import AdminSidebar from '../components/AdminSidebar.jsx'
import { useState } from 'react'

export default function Navbar() {
  const { user, logout, isQuanLy } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <header className="navbar">
      <Link to="/" className="navbar-brand">
        <Icon name="barChart" size={20} style={{ marginRight: '0.5rem' }} />
        Quản lý điểm
      </Link>
      <nav className="navbar-links">
        {!isQuanLy && (
          <Link
            to="/lop"
            className={location.pathname.startsWith('/lop') ? 'active' : ''}
          >
            <Icon name="bookOpen" size={16} /> Lớp học
          </Link>
        )}
      </nav>
      <div className="navbar-user">
        <span className={`role-badge ${isQuanLy ? 'quan-ly' : ''}`}>
          {ROLE_LABELS[user?.role] ?? user?.role}
        </span>
        <span style={{ color: '#64748b', fontSize: '0.8rem' }}>{user?.name}</span>
        {isQuanLy && (
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => setSidebarOpen(true)}
            aria-label="Mở menu quản trị"
          >
            <Icon name="menu" size={16} /> Quản trị
          </button>
        )}
        <button type="button" className="btn btn-ghost btn-sm" onClick={handleLogout}>
          <Icon name="logOut" size={14} /> Đăng xuất
        </button>
      </div>
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </header>
  )
}
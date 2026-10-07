import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'
import { ROLE_LABELS } from '../constants/roles.js'
import Icon from '../components/Icon.jsx'
import AdminSidebar from '../components/AdminSidebar.jsx'
import TeacherSidebar from '../components/TeacherSidebar.jsx'
import { useState } from 'react'

export default function Navbar() {
  const { user, logout, isQuanLy, isGiaoVien } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [teacherSidebarOpen, setTeacherSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <>
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
          <span className={`role-badge ${isQuanLy ? 'quan-ly' : ''}`} style={{ fontSize: '0.85rem', padding: '0.3rem 0.75rem' }}>
            {ROLE_LABELS[user?.role] ?? user?.role}
          </span>
          <span style={{ color: '#64748b', fontSize: '0.85rem' }}>{user?.name}</span>
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
          {isGiaoVien && (
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => setTeacherSidebarOpen(true)}
              aria-label="Mở menu giáo viên"
            >
              <Icon name="menu" size={16} /> Chức năng
            </button>
          )}
          <button type="button" className="btn btn-ghost btn-sm" onClick={handleLogout}>
            <Icon name="logOut" size={14} /> Đăng xuất
          </button>
        </div>
        <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <TeacherSidebar isOpen={teacherSidebarOpen} onClose={() => setTeacherSidebarOpen(false)} />
      </header>

      {/* FAB để mở sidebar quản trị - luôn hiển thị cho người quản lý */}
      {isQuanLy && (
        <button
          type="button"
          className="sidebar-fab"
          onClick={() => setSidebarOpen(true)}
          aria-label="Mở menu quản trị"
          title="Menu quản trị"
        >
          <Icon name="menu" size={24} />
        </button>
      )}

      {/* FAB cho giáo viên - góc dưới phải */}
      {isGiaoVien && (
        <button
          type="button"
          className="sidebar-fab teacher-fab"
          onClick={() => setTeacherSidebarOpen(true)}
          aria-label="Mở menu giáo viên"
          title="Menu chức năng"
        >
          <Icon name="menu" size={24} />
        </button>
      )}
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <TeacherSidebar isOpen={teacherSidebarOpen} onClose={() => setTeacherSidebarOpen(false)} />
    </>
  )
}

function handleLogout() {
  // This will be replaced by the actual logout function
}
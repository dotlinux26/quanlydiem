import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Icon from './Icon.jsx'

export default function TeacherSidebar({ isOpen, onClose }) {
  const location = useLocation()

  const navItems = [
    { label: 'Lớp học', href: '/lop', icon: 'bookOpen' },
    { label: 'Tra cứu điểm', href: '/lookup', icon: 'search' },
    { label: 'Báo cáo', href: '/report', icon: 'barChart2' },
  ]

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!isOpen) return null

  return (
    <>
      <div
        className="sidebar-backdrop"
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.5)',
          zIndex: 200,
          animation: 'fadeIn 150ms ease',
        }}
      />
      <aside
        className="teacher-sidebar"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '280px',
          background: '#fff',
          borderLeft: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-lg)',
          zIndex: 201,
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideIn 200ms ease',
          transform: 'translateX(0)',
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 1.25rem',
          borderBottom: '1px solid var(--color-border)',
        }}>
          <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600 }}>Chức năng Giáo viên</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng"
            style={{
              width: '32px',
              height: '32px',
              border: 'none',
              background: 'transparent',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--color-text-muted)',
              fontSize: '1.5rem',
              lineHeight: 1,
              cursor: 'pointer',
              transition: 'all var(--transition)',
            }}
          >
            ×
          </button>
        </div>

        <nav style={{ flex: 1, padding: '1rem', overflowY: 'auto' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.href || (item.href !== '/lop' && location.pathname.startsWith(item.href))
              return (
                <li key={index}>
                  <Link
                    to={item.href}
                    onClick={() => onClose()}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      color: isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                      background: isActive ? 'var(--color-primary-light)' : 'transparent',
                      textDecoration: 'none',
                      fontWeight: isActive ? 600 : 500,
                      fontSize: '0.875rem',
                      transition: 'all var(--transition)',
                      marginBottom: '0.25rem',
                    }}
                    onClick={() => onClose()}
                  >
                    <Icon name={item.icon} size={20} style={{ flexShrink: 0 }} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div style={{
          padding: '1rem 1.25rem',
          borderTop: '1px solid var(--color-border)',
          background: '#f8fafc',
          borderRadius: '0 0 var(--radius-lg) var(--radius-lg)',
        }}>
          <div style={{
            fontSize: '0.75rem',
            color: 'var(--color-text-muted)',
            textAlign: 'center',
          }}>
            Phiên bản 0.1.0 (Sprint 1)
          </div>
        </div>
      </aside>
    </>
  )
}
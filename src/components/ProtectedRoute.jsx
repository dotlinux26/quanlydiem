import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'
import { ROLES } from '../constants/roles.js'

export default function ProtectedRoute({ children, roles }) {
  const { user, isAuthed } = useAuth()
  const location = useLocation()

  if (!isAuthed) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />
  }

  // Người quản lý không truy cập trang giáo viên
  const isTeacherRoute = location.pathname.startsWith('/lop')
  if (user.role === ROLES.QUAN_LY && isTeacherRoute) {
    return <Navigate to="/admin" replace />
  }

  // Giáo viên không truy cập trang người quản lý
  const isManagerRoute = location.pathname.startsWith('/admin')
  if (user.role === ROLES.GIAO_VIEN && isManagerRoute) {
    return <Navigate to="/lop" replace />
  }

  return children
}
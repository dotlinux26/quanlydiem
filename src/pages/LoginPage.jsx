import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [username, setUsername] = useState('gv01')
  const [password, setPassword] = useState('123456')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const from = location.state?.from?.pathname || '/'

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    const uname = username.trim()
    if (!uname || !password) {
      setError('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.')
      return
    }
    setSubmitting(true)
    try {
      const session = await login(uname, password)
      if (!session) {
        setError('Sai tên đăng nhập hoặc mật khẩu.')
        return
      }
      // Redirect based on role
      const target = session.role === 'QUAN_LY' ? '/admin' : (from || '/lop')
      navigate(target, { replace: true })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <div className="logo" aria-hidden="true">📊</div>
          <h1>Quản Lý Điểm</h1>
          <p>Hệ thống nhập liệu và báo cáo điểm cho giáo viên</p>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="username">Tên đăng nhập</label>
            <input
              id="username"
              type="text"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              placeholder="Nhập tên đăng nhập"
              disabled={submitting}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">Mật khẩu</label>
            <input
              id="password"
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              placeholder="Nhập mật khẩu"
              disabled={submitting}
            />
          </div>
          {error && <div className="alert alert-error" role="alert">{error}</div>}
          <button type="submit" className="btn btn-primary btn-lg" disabled={submitting}>
            {submitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>
        <div className="login-footer">
          <p>Tài khoản demo:</p>
          <p>
            Giáo viên: <code>gv01</code> / <code>123456</code><br />
            Người quản lý: <code>quanly01</code> / <code>123456</code>
          </p>
          <Link to="/" style={{ marginTop: '1rem', display: 'inline-block' }}>← Về trang giới thiệu</Link>
        </div>
      </div>
    </div>
  )
}
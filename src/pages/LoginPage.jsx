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
      navigate(from, { replace: true })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h1>Quản lý nhập liệu điểm</h1>
        <p className="login-sub">Đăng nhập để tiếp tục</p>
        <label>
          Tên đăng nhập
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
        </label>
        <label>
          Mật khẩu
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </label>
        {error && <p className="form-error">{error}</p>}
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>
        <div className="login-hint">
          <p>
            Giáo viên: <code>gv01</code> / <code>123456</code>
          </p>
          <p>
            Quản trị viên: <code>admin01</code> / <code>admin123</code>
          </p>
          <Link to="/">← Về trang giới thiệu</Link>
        </div>
      </form>
    </div>
  )
}
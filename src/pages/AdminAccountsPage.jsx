import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth.js'
import * as taiKhoanService from '../services/taiKhoanService.js'
import Icon from '../components/Icon.jsx'
import Modal from '../components/Modal.jsx'

export default function AdminAccountsPage() {
  const { user } = useAuth()
  const [taiKhoans, setTaiKhoans] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ username: '', password: '', name: '', role: 'GIAO_VIEN', active: true })

  useEffect(() => {
    let mounted = true
    taiKhoanService.listTaiKhoans()
      .then((data) => { if (mounted) { setTaiKhoans(data); setLoading(false) } })
      .catch(() => { if (mounted) { setError('Không tải được dữ liệu.'); setLoading(false) } })
    return () => { mounted = false }
  }, [])

  const getRoleLabel = (role) => role === 'GIAO_VIEN' ? 'Giáo viên' : 'Người quản lý'
  const getRoleBadgeClass = (role) => role === 'GIAO_VIEN' ? 'badge-info' : 'badge-warning'

  const openCreate = () => {
    setEditing(null)
    setForm({ username: '', password: '', name: '', role: 'GIAO_VIEN', active: true })
    setShowModal(true)
  }

  const openEdit = (tk) => {
    setEditing(tk)
    setForm({ username: tk.username, password: '', name: tk.name, role: tk.role, active: tk.active })
    setShowModal(true)
  }

  const handleDelete = (id) => {
    if (id === user.id) return alert('Không thể xóa chính mình')
    if (window.confirm('Xóa tài khoản này?')) {
      taiKhoanService.deleteTaiKhoan(id).then(() => setTaiKhoans(taiKhoans.filter(t => t.id !== id)))
    }
  }

  const handleResetPassword = (id) => {
    const newPwd = Math.random().toString(36).slice(-8)
    if (window.confirm(`Đặt lại mật khẩu thành: ${newPwd}?`)) {
      taiKhoanService.resetPassword(id, newPwd).then(() => alert(`Mật khẩu mới: ${newPwd}`))
    }
  }

  const handleToggleActive = (id, currentActive) => {
    taiKhoanService.toggleActiveStatus(id).then((updated) => {
      setTaiKhoans(taiKhoans.map(t => t.id === id ? updated : t))
    })
  }

  const handleRoleChange = (id, newRole) => {
    taiKhoanService.setRole(id, newRole).then((updated) => {
      if (!updated.error) setTaiKhoans(taiKhoans.map(t => t.id === id ? updated : t))
      else alert(updated.error)
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editing) {
      taiKhoanService.updateTaiKhoan(editing.id, form).then((updated) => {
        if (updated.error) alert(updated.error)
        else { setTaiKhoans(taiKhoans.map(t => t.id === editing.id ? updated : t)); setShowModal(false) }
      })
    } else {
      taiKhoanService.createTaiKhoan(form).then((newTk) => {
        if (newTk.error) alert(newTk.error)
        else { setTaiKhoans([...taiKhoans, newTk]); setShowModal(false) }
      })
    }
  }

  if (loading) return <div className="loading">Đang tải...</div>
  if (error) return <div className="alert alert-error" role="alert">{error}</div>

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Quản lý tài khoản giáo viên</h2>
          <p className="muted">{taiKhoans.length} tài khoản</p>
        </div>
        <button className="btn btn-primary" onClick={openCreate}>
          <Icon name="plus" size={16} /> Thêm tài khoản
        </button>
      </div>

      <div className="card">
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên đăng nhập</th>
                <th>Họ tên</th>
                <th>Vai trò</th>
                <th>Trạng thái</th>
                <th style={{ width: '200px' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {taiKhoans.map((tk, i) => (
                <tr key={tk.id}>
                  <td>{i + 1}</td>
                  <td><code>{tk.username}</code></td>
                  <td>{tk.name}</td>
                  <td>
                    <select className="form-select form-select-sm" value={tk.role} onChange={e => handleRoleChange(tk.id, e.target.value)} style={{ width: 'auto', display: 'inline-block' }}>
                      <option value="GIAO_VIEN">Giáo viên</option>
                      <option value="QUAN_LY">Người quản lý</option>
                    </select>
                  </td>
                  <td>
                    <span className={`badge ${getRoleBadgeClass(tk.active ? 'active' : 'inactive')}`}>
                      {tk.active ? 'Hoạt động' : 'Đã khóa'}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-outline btn-sm" onClick={() => openEdit(tk)} disabled={tk.id === user.id}>
                      <Icon name="edit" size={14} /> Sửa
                    </button>
                    <button className="btn btn-outline btn-sm" onClick={() => handleResetPassword(tk.id)} disabled={tk.id === user.id}>
                      <Icon name="key" size={14} /> Reset pwd
                    </button>
                    <button className="btn btn-outline btn-sm" onClick={() => handleToggleActive(tk.id, tk.active)}>
                      <Icon name={tk.active ? 'lock' : 'unlock'} size={14} /> {tk.active ? 'Khóa' : 'Mở'}
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(tk.id)} disabled={tk.id === user.id}>
                      <Icon name="trash" size={14} /> Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <Modal
          title={editing ? 'Sửa tài khoản' : 'Thêm tài khoản giáo viên'}
          onCancel={() => setShowModal(false)}
          onConfirm={handleSubmit}
          confirmLabel="Lưu"
        >
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label className="form-label">Tên đăng nhập</label>
              <input className="form-input" value={form.username} onChange={e => setForm({...form, username: e.target.value})} required disabled={!!editing} />
            </div>
            <div>
              <label className="form-label">Mật khẩu {editing ? '(để trống nếu không đổi)' : ''}</label>
              <input type="password" className="form-input" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required={!editing} placeholder={editing ? 'Để trống để giữ nguyên' : 'Nhập mật khẩu'} />
            </div>
            <div>
              <label className="form-label">Họ tên</label>
              <input className="form-input" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
            </div>
            <div>
              <label className="form-label">Vai trò</label>
              <select className="form-select" value={form.role} onChange={e => setForm({...form, role: e.target.value})}>
                <option value="GIAO_VIEN">Giáo viên</option>
                <option value="QUAN_LY">Người quản lý</option>
              </select>
            </div>
            <div>
              <label className="form-label">Trạng thái</label>
              <select className="form-select" value={form.active ? 'true' : 'false'} onChange={e => setForm({...form, active: e.target.value === 'true'})}>
                <option value="true">Hoạt động</option>
                <option value="false">Khóa</option>
              </select>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}
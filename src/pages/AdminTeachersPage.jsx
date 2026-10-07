import { useState, useEffect } from 'react'
import * as taiKhoanService from '../services/taiKhoanService.js'
import Modal from '../components/Modal.jsx'
import { Table } from '../components/Table.jsx'
import { Input, Select } from '../components/Form.jsx'
import Icon from '../components/Icon.jsx'
import { ROLES } from '../constants/roles.js'

export default function AdminTeachersPage() {
  const [teachers, setTeachers] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ username: '', password: '', name: '', role: ROLES.GIAO_VIEN })
  const [showPwdModal, setShowPwdModal] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    taiKhoanService.listTaiKhoans().then(data => { if (mounted) setTeachers(data) }).catch(() => mounted && setError('Không tải được dữ liệu')).finally(() => mounted && setLoading(false))
    return () => { mounted = false }
  }, [])

  const openCreate = () => {
    setEditing(null)
    setForm({ username: '', password: '', name: '', role: ROLES.GIAO_VIEN })
    setShowModal(true)
  }

  const openEdit = (tk) => {
    setEditing(tk)
    setForm({ username: tk.username, password: '', name: tk.name, role: tk.role })
    setShowModal(true)
  }

  const openResetPwd = async (id) => {
    const res = await taiKhoanService.resetPassword(id)
    if (res?.error) { alert(res.error); return }
    setNewPassword(res.newPassword)
    setShowPwdModal(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Xóa tài khoản này?')) return
    const res = await taiKhoanService.deleteTaiKhoan(id)
    if (res?.error) { alert(res.error); return }
    setTeachers(teachers.filter(t => t.id !== id))
  }

  const handleToggleLock = async (id, currentLocked) => {
    const res = await taiKhoanService.toggleLock(id)
    if (res?.error) { alert(res.error); return }
    setTeachers(teachers.map(t => t.id === id ? { ...t, locked: res.locked } : t))
  }

  const handleConfirm = async () => {
    if (!form.username.trim() || !form.name.trim() || (editing ? false : !form.password.trim())) { alert('Vui lòng điền đầy đủ thông tin'); return }
    const payload = { username: form.username.trim(), name: form.name.trim(), role: form.role, ...(form.password ? { password: form.password } : {}) }
    let res
    if (editing) {
      res = await taiKhoanService.updateTaiKhoan(editing.id, payload)
    } else {
      res = await taiKhoanService.createTaiKhoan(payload)
    }
    if (res?.error) { alert(res.error); return }
    if (editing) setTeachers(teachers.map(t => t.id === editing.id ? { ...t, ...res } : t))
    else setTeachers([...teachers, res])
    setShowModal(false)
  }

  if (loading) return <div className="loading">Đang tải...</div>
  if (error) return <div className="alert alert-error" role="alert">{error}</div>

  const columns = [
    { header: 'STT', field: 'stt', width: '60px', align: 'center' },
    { header: 'Username', field: 'username', width: '150px', render: (t) => <code style={{ fontSize: '0.8125rem' }}>{t.username}</code> },
    { header: 'Họ tên', field: 'name', width: '200px' },
    { header: 'Vai trò', field: 'role', width: '130px', align: 'center', render: (t) => (
      <span className={`badge ${t.role === ROLES.QUAN_LY ? 'badge-info' : 'badge-success'}`}>
        {t.role === ROLES.QUAN_LY ? 'Quản lý' : 'Giáo viên'}
      </span>
    )},
    { header: 'Trạng thái', field: 'locked', width: '130px', align: 'center', render: (t) => (
      <span className={`badge ${t.locked ? 'badge-warning' : 'badge-success'}`}>
        {t.locked ? 'Đã khóa' : 'Hoạt động'}
      </span>
    )},
    { header: 'Thao tác', field: 'actions', width: '220px', render: (t) => (
      <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
        <button className="btn btn-outline btn-sm" onClick={() => openEdit(t)}><Icon name="edit" size={14} /> Sửa</button>
        <button className="btn btn-outline btn-sm" onClick={() => openResetPwd(t.id)}><Icon name="key" size={14} /> Reset pwd</button>
        {t.role !== ROLES.QUAN_LY && (
          <button className={`btn btn-sm ${t.locked ? 'btn-success' : 'btn-outline'}`} onClick={() => handleToggleLock(t.id, t.locked)}>
            <Icon name={t.locked ? 'unlock' : 'lock'} size={14} /> {t.locked ? 'Mở' : 'Khóa'}
          </button>
        )}
        {t.role !== ROLES.QUAN_LY && (
          <button className="btn btn-danger btn-sm" onClick={() => handleDelete(t.id)}><Icon name="trash" size={14} /> Xóa</button>
        )}
      </div>
    )},
  ]

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Quản lý tài khoản</h2>
          <p className="muted">{teachers.length} tài khoản</p>
        </div>
        <button className="btn btn-primary" onClick={openCreate}><Icon name="plus" size={16} /> Thêm tài khoản</button>
      </div>

      <div className="card">
        <Table columns={columns} data={teachers.map((t, i) => ({ ...t, stt: i + 1 }))} keyField="id" emptyMessage="Chưa có tài khoản" />
      </div>

      {showModal && (
        <Modal
          title={editing ? 'Sửa tài khoản' : 'Thêm tài khoản'}
          onCancel={() => setShowModal(false)}
          onConfirm={handleConfirm}
          confirmLabel="Lưu"
        >
          <form onSubmit={(e) => { e.preventDefault(); handleConfirm(); }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Input id="username" label="Tên đăng nhập" value={form.username} onChange={e => setForm({...form, username: e.target.value})} required placeholder="Ví dụ: gv02" disabled={editing} />
            {!editing && (
              <Input id="password" label="Mật khẩu" type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required placeholder="Tối thiểu 6 ký tự" />
            )}
            {editing && (
              <Input id="password" label="Mật khẩu mới (để trống nếu không đổi)" type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} placeholder="Tối thiểu 6 ký tự" />
            )}
            <Input id="name" label="Họ tên" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required placeholder="Ví dụ: Nguyễn Văn Giáo" />
            <Select
              id="role"
              label="Vai trò"
              value={form.role}
              onChange={e => setForm({...form, role: e.target.value})}
              options={[
                { value: ROLES.GIAO_VIEN, label: 'Giáo viên' },
                { value: ROLES.QUAN_LY, label: 'Người quản lý' },
              ]}
            />
          </form>
        </Modal>
      )}

      {showPwdModal && (
        <Modal
          title="Mật khẩu mới (tự động sinh)"
          onCancel={() => setShowPwdModal(false)}
          onConfirm={() => setShowPwdModal(false)}
          confirmLabel="Đã lưu"
        >
          <div style={{ padding: '0.5rem 0' }}>
            <p style={{ margin: '0 0 0.5rem', color: '#64748b' }}>Mật khẩu đã được reset. Hãy copy và gửi cho giáo viên:</p>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <code style={{ flex: 1, padding: '0.75rem', background: '#f1f5f9', borderRadius: '6px', fontSize: '1.125rem', letterSpacing: '0.1em', textAlign: 'center' }}>{newPassword}</code>
              <button className="btn btn-outline" onClick={() => { navigator.clipboard.writeText(newPassword); alert('Đã copy!') }}>Copy</button>
            </div>
            <p style={{ margin: '0.75rem 0 0', fontSize: '0.8125rem', color: '#dc2626' }}>⚠️ Mật khẩu chỉ hiển thị một lần. Vui lòng lưu lại ngay.</p>
          </div>
        </Modal>
      )}
    </div>
  )
}
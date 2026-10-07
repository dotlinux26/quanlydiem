import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth.js'
import * as monHocService from '../services/monHocService.js'
import Icon from '../components/Icon.jsx'
import Modal from '../components/Modal.jsx'

export default function AdminSubjectsPage() {
  const { user } = useAuth()
  const [monHocs, setMonHocs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ ma: '', ten: '', soTinChi: 3 })

  useEffect(() => {
    let mounted = true
    monHocService.listMonHocs()
      .then((data) => { if (mounted) { setMonHocs(data); setLoading(false) } })
      .catch(() => { if (mounted) { setError('Không tải được dữ liệu.'); setLoading(false) } })
    return () => { mounted = false }
  }, [])

  const openCreate = () => {
    setEditing(null)
    setForm({ ma: '', ten: '', soTinChi: 3 })
    setShowModal(true)
  }

  const openEdit = (mh) => {
    setEditing(mh)
    setForm({ ma: mh.ma, ten: mh.ten, soTinChi: mh.soTinChi })
    setShowModal(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Xóa môn học này? Điểm liên quan cũng sẽ bị xóa.')) {
      monHocService.deleteMonHoc(id).then(() => setMonHocs(monHocs.filter(m => m.id !== id)))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editing) {
      monHocService.updateMonHoc(editing.id, form).then((updated) => {
        setMonHocs(monHocs.map(m => m.id === editing.id ? updated : m))
        setShowModal(false)
      })
    } else {
      monHocService.createMonHoc(form).then((newMh) => {
        setMonHocs([...monHocs, newMh])
        setShowModal(false)
      })
    }
  }

  if (loading) return <div className="loading">Đang tải...</div>
  if (error) return <div className="alert alert-error" role="alert">{error}</div>

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Quản lý môn học</h2>
          <p className="muted">{monHocs.length} môn học</p>
        </div>
        <button className="btn btn-primary" onClick={openCreate}>
          <Icon name="plus" size={16} /> Thêm môn học
        </button>
      </div>

      <div className="card">
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Mã môn</th>
                <th>Tên môn học</th>
                <th>Số tín chỉ</th>
                <th style={{ width: '140px' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {monHocs.map((mh, i) => (
                <tr key={mh.id}>
                  <td>{i + 1}</td>
                  <td><code>{mh.ma}</code></td>
                  <td>{mh.ten}</td>
                  <td style={{ textAlign: 'center' }}>{mh.soTinChi}</td>
                  <td>
                    <button className="btn btn-outline btn-sm" onClick={() => openEdit(mh)}>
                      <Icon name="edit" size={14} /> Sửa
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(mh.id)}>
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
          title={editing ? 'Sửa môn học' : 'Thêm môn học'}
          onCancel={() => setShowModal(false)}
          onConfirm={handleSubmit}
          confirmLabel="Lưu"
        >
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label className="form-label">Mã môn</label>
              <input className="form-input" value={form.ma} onChange={e => setForm({...form, ma: e.target.value})} required disabled={!!editing} />
            </div>
            <div>
              <label className="form-label">Tên môn học</label>
              <input className="form-input" value={form.ten} onChange={e => setForm({...form, ten: e.target.value})} required />
            </div>
            <div>
              <label className="form-label">Số tín chỉ</label>
              <input type="number" className="form-input" value={form.soTinChi} onChange={e => setForm({...form, soTinChi: Number(e.target.value)})} required min="1" max="10" />
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}
import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth.js'
import * as lopService from '../services/lopService.js'
import * as taiKhoanService from '../services/taiKhoanService.js'
import Icon from '../components/Icon.jsx'
import Modal from '../components/Modal.jsx'

export default function AdminClassesPage() {
  const { user } = useAuth()
  const [lops, setLops] = useState([])
  const [giaoViens, setGiaoViens] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ ten: '', namHoc: '', giaoVienId: '' })

  useEffect(() => {
    let mounted = true
    Promise.all([lopService.listLops(user), taiKhoanService.listGiaoViens()])
      .then(([lopsData, gvData]) => {
        if (!mounted) return
        setLops(lopsData)
        setGiaoViens(gvData)
        setLoading(false)
      })
      .catch(() => {
        if (mounted) setError('Không tải được dữ liệu.')
        setLoading(false)
      })
    return () => { mounted = false }
  }, [user])

  const openCreate = () => {
    setEditing(null)
    setForm({ ten: '', namHoc: '', giaoVienId: '' })
    setShowModal(true)
  }

  const openEdit = (lop) => {
    setEditing(lop)
    setForm({ ten: lop.ten, namHoc: lop.namHoc, giaoVienId: lop.giaoVienId ?? '' })
    setShowModal(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Xóa lớp này? Điểm liên quan cũng sẽ bị xóa.')) {
      lopService.deleteLop(id).then(() => setLops(lops.filter(l => l.id !== id)))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editing) {
      lopService.updateLop(editing.id, form).then((updated) => {
        setLops(lops.map(l => l.id === editing.id ? updated : l))
        setShowModal(false)
      })
    } else {
      lopService.createLop(form).then((newLop) => {
        setLops([...lops, newLop])
        setShowModal(false)
      })
    }
  }

  const getGiaoVienName = (id) => {
    if (!id) return '—'
    const gv = giaoViens.find(g => g.id === id)
    return gv ? gv.name : '—'
  }

  if (loading) return <div className="loading">Đang tải...</div>
  if (error) return <div className="alert alert-error" role="alert">{error}</div>

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Quản lý lớp học</h2>
          <p className="muted">{lops.length} lớp học</p>
        </div>
        <button className="btn btn-primary" onClick={openCreate}>
          <Icon name="plus" size={16} /> Thêm lớp
        </button>
      </div>

      <div className="card">
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên lớp</th>
                <th>Năm học</th>
                <th>Giáo viên phụ trách</th>
                <th style={{ width: '140px' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {lops.map((lop, i) => (
                <tr key={lop.id}>
                  <td>{i + 1}</td>
                  <td><strong>{lop.ten}</strong></td>
                  <td>{lop.namHoc}</td>
                  <td>{getGiaoVienName(lop.giaoVienId)}</td>
                  <td>
                    <button className="btn btn-outline btn-sm" onClick={() => openEdit(lop)}>
                      <Icon name="edit" size={14} /> Sửa
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(lop.id)}>
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
          title={editing ? 'Sửa lớp học' : 'Thêm lớp học'}
          onCancel={() => setShowModal(false)}
          onConfirm={handleSubmit}
          confirmLabel="Lưu"
        >
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label className="form-label">Tên lớp</label>
              <input className="form-input" value={form.ten} onChange={e => setForm({...form, ten: e.target.value})} required />
            </div>
            <div>
              <label className="form-label">Năm học</label>
              <input className="form-input" value={form.namHoc} onChange={e => setForm({...form, namHoc: e.target.value})} required />
            </div>
            <div>
              <label className="form-label">Giáo viên phụ trách</label>
              <select className="form-select" value={form.giaoVienId} onChange={e => setForm({...form, giaoVienId: e.target.value})}>
                <option value="">— Không phân công —</option>
                {giaoViens.map(gv => <option key={gv.id} value={gv.id}>{gv.name}</option>)}
              </select>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}
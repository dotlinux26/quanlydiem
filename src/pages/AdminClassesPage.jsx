import { useState } from 'react'
import { useAuth } from '../hooks/useAuth.js'
import Modal from '../components/Modal.jsx'

export default function AdminClassesPage() {
  const { user } = useAuth()
  const [lops, setLops] = useState([
    { id: 1, ten: 'CNTT - K18A', namHoc: '2026-2027', giaoVien: 'Nguyễn Văn Giáo' },
    { id: 2, ten: 'CNTT - K18B', namHoc: '2026-2027', giaoVien: 'Nguyễn Văn Giáo' },
    { id: 3, ten: 'KTPM - K18A', namHoc: '2026-2027', giaoVien: 'Nguyễn Văn Giáo' },
  ])
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ ten: '', namHoc: '', giaoVienId: '' })

  const openCreate = () => { setEditing(null); setForm({ ten: '', namHoc: '', giaoVienId: '' }); setShowModal(true) }
  const openEdit = (lop) => { setEditing(lop); setForm({ ten: lop.ten, namHoc: lop.namHoc, giaoVienId: '' }); setShowModal(true) }
  const handleDelete = (id) => { if (window.confirm('Xóa lớp này?')) setLops(lops.filter(l => l.id !== id)) }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editing) {
      setLops(lops.map(l => l.id === editing.id ? { ...l, ...form } : l))
    } else {
      setLops([...lops, { id: Date.now(), ...form, giaoVien: 'Nguyễn Văn Giáo' }])
    }
    setShowModal(false)
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Quản lý lớp học</h2>
          <p className="muted">{lops.length} lớp học</p>
        </div>
        <button className="btn btn-primary" onClick={openCreate}>+ Thêm lớp</button>
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
                  <td>{lop.giaoVien}</td>
                  <td>
                    <button className="btn btn-outline btn-sm" onClick={() => openEdit(lop)}>Sửa</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(lop.id)}>Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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
              <option value="">-- Chọn giáo viên --</option>
              <option value="1">Nguyễn Văn Giáo</option>
            </select>
          </div>
        </form>
      </Modal>
    </div>
  )
}
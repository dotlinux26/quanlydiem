import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth.js'
import * as sinhVienService from '../services/sinhVienService.js'
import * as lopService from '../services/lopService.js'
import Icon from '../components/Icon.jsx'
import Modal from '../components/Modal.jsx'
import * as XLSX from 'xlsx'

export default function AdminStudentsPage() {
  const { user } = useAuth()
  const [sinhViens, setSinhViens] = useState([])
  const [lops, setLops] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ ma: '', hoTen: '', lopId: '' })
  const [importFile, setImportFile] = useState(null)
  const [importPreview, setImportPreview] = useState([])
  const [isTransfer, setIsTransfer] = useState(false)

  useEffect(() => {
    let mounted = true
    Promise.all([sinhVienService.listSinhViens(), lopService.listLops({ role: 'QUAN_LY' })])
      .then(([svData, lopsData]) => {
        if (!mounted) return
        setSinhViens(svData)
        setLops(lopsData)
        setLoading(false)
      })
      .catch(() => { if (mounted) setError('Không tải được dữ liệu.'); setLoading(false) })
    return () => { mounted = false }
  }, [])

  const getLopName = (id) => {
    const lop = lops.find(l => l.id === id)
    return lop ? lop.ten : '—'
  }

  const openCreate = () => {
    setEditing(null)
    setIsTransfer(false)
    setForm({ ma: '', hoTen: '', lopId: '' })
    setShowModal(true)
  }

  const openEdit = (sv) => {
    setEditing(sv)
    setIsTransfer(false)
    setForm({ ma: sv.ma, hoTen: sv.hoTen, lopId: sv.lopId ?? '' })
    setShowModal(true)
  }

  const openTransfer = (sv) => {
    setEditing(sv)
    setIsTransfer(true)
    setForm({ ma: sv.ma, hoTen: sv.hoTen, lopId: sv.lopId ?? '' })
    setShowModal(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Xóa sinh viên này? Điểm liên quan cũng sẽ bị xóa.')) {
      sinhVienService.deleteSinhVien(id).then(() => setSinhViens(sinhViens.filter(s => s.id !== id)))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editing) {
      sinhVienService.updateSinhVien(editing.id, form).then((updated) => {
        setSinhViens(sinhViens.map(s => s.id === editing.id ? updated : s))
        setShowModal(false)
      })
    } else {
      sinhVienService.createSinhVien(form).then((newSv) => {
        setSinhViens([...sinhViens, newSv])
        setShowModal(false)
      })
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImportFile(file)
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result)
        const workbook = XLSX.read(data, { type: 'array' })
        const sheetName = workbook.SheetNames[0]
        const sheet = workbook.Sheets[sheetName]
        const json = XLSX.utils.sheet_to_json(sheet, { header: 1 })
        if (json.length < 2) throw new Error('File rỗng')
        const headers = json[0].map(h => String(h).trim().toLowerCase())
        const maIdx = headers.indexOf('ma')
        const hoTenIdx = headers.indexOf('hoten') !== -1 ? headers.indexOf('hoten') : headers.indexOf('ho ten')
        const lopIdx = headers.indexOf('lop') !== -1 ? headers.indexOf('lop') : headers.indexOf('lopid')
        if (maIdx === -1 || hoTenIdx === -1 || lopIdx === -1) throw new Error('Cột không đúng (cần: ma, hoTen/ho ten, lop/lopId)')
        const preview = json.slice(1).map((row, idx) => ({
          stt: idx + 1,
          ma: String(row[maIdx] ?? '').trim(),
          hoTen: String(row[hoTenIdx] ?? '').trim(),
          lopId: Number(row[lopIdx] ?? 0),
        })).filter(r => r.ma && r.hoTen && r.lopId)
        setImportPreview(preview)
      } catch (err) {
        alert('Lỗi đọc file: ' + err.message)
      }
    }
    reader.readAsArrayBuffer(file)
  }

  const handleImportConfirm = () => {
    if (!importPreview.length) return
    sinhVienService.importSinhViens(importPreview).then((newSv) => {
      setSinhViens([...sinhViens, ...newSv])
      setImportFile(null)
      setImportPreview([])
      document.getElementById('import-file').value = ''
    })
  }

  const handleTransfer = (e) => {
    e.preventDefault()
    if (!editing) return
    sinhVienService.transferSinhVien(editing.id, Number(form.lopId)).then((updated) => {
      setSinhViens(sinhViens.map(s => s.id === editing.id ? updated : s))
      setShowModal(false)
    })
  }

  if (loading) return <div className="loading">Đang tải...</div>
  if (error) return <div className="alert alert-error" role="alert">{error}</div>

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Quản lý sinh viên</h2>
          <p className="muted">{sinhViens.length} sinh viên</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn btn-primary" onClick={openCreate}>
            <Icon name="plus" size={16} /> Thêm SV
          </button>
          <label className="btn btn-outline" style={{ cursor: 'pointer' }}>
            <Icon name="upload" size={16} /> Import Excel
            <input id="import-file" type="file" accept=".xlsx,.xls" onChange={handleFileChange} style={{ display: 'none' }} />
          </label>
        </div>
      </div>

      {importPreview.length > 0 && (
        <div className="alert alert-info" role="alert">
          <strong>Xem trước import:</strong> {importPreview.length} sinh viên hợp lệ.
          <button className="btn btn-primary btn-sm" style={{ marginLeft: '1rem' }} onClick={handleImportConfirm}>Xác nhận import</button>
          <button className="btn btn-outline btn-sm" style={{ marginLeft: '0.5rem' }} onClick={() => { setImportPreview([]); setImportFile(null); }}>Hủy</button>
        </div>
      )}

      <div className="card">
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Mã SV</th>
                <th>Họ tên</th>
                <th>Lớp</th>
                <th style={{ width: '160px' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {sinhViens.map((sv, i) => (
                <tr key={sv.id}>
                  <td>{i + 1}</td>
                  <td><code>{sv.ma}</code></td>
                  <td>{sv.hoTen}</td>
                  <td>{getLopName(sv.lopId)}</td>
                  <td>
                    <button className="btn btn-outline btn-sm" onClick={() => openEdit(sv)}>
                      <Icon name="edit" size={14} /> Sửa
                    </button>
                    <button className="btn btn-outline btn-sm" onClick={() => { setEditing(sv); setIsTransfer(true); setForm({...form, lopId: sv.lopId}); setShowModal(true); }}>
                      <Icon name="arrowRightLeft" size={14} /> Chuyển
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(sv.id)}>
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
          title={isTransfer ? 'Chuyển lớp sinh viên' : (editing ? 'Sửa sinh viên' : 'Thêm sinh viên')}
          onCancel={() => { setShowModal(false); setEditing(null); setIsTransfer(false); }}
          onConfirm={isTransfer ? undefined : handleSubmit}
          confirmLabel="Lưu"
        >
          <form onSubmit={isTransfer ? handleTransfer : handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {!isTransfer && (
              <>
                <div>
                  <label className="form-label">Mã SV</label>
                  <input className="form-input" value={form.ma} onChange={e => setForm({...form, ma: e.target.value})} required disabled={!!editing} />
                </div>
                <div>
                  <label className="form-label">Họ tên</label>
                  <input className="form-input" value={form.hoTen} onChange={e => setForm({...form, hoTen: e.target.value})} required />
                </div>
              </>
            )}
            <div>
              <label className="form-label">Lớp</label>
              <select className="form-select" value={form.lopId} onChange={e => setForm({...form, lopId: e.target.value})} required>
                <option value="">— Chọn lớp —</option>
                {lops.map(lop => <option key={lop.id} value={lop.id}>{lop.ten} ({lop.namHoc})</option>)}
              </select>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}
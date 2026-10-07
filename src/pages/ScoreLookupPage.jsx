import { useEffect, useState, useMemo } from 'react'
import { useAuth } from '../hooks/useAuth.js'
import * as lopService from '../services/lopService.js'
import * as monHocService from '../services/monHocService.js'
import * as diemService from '../services/diemService.js'
import * as sinhVienService from '../services/sinhVienService.js'
import { getLetterGrade } from '../constants/gradeScale.js'
import { formatScore } from '../utils/format.js'
import Icon from '../components/Icon.jsx'

const PAGE_SIZE = 20

export default function ScoreLookupPage() {
  const { user } = useAuth()
  const [lops, setLops] = useState([])
  const [monHocs, setMonHocs] = useState([])
  const [sinhViens, setSinhViens] = useState([])
  const [selectedLopId, setSelectedLopId] = useState('')
  const [selectedMonId, setSelectedMonId] = useState('')
  const [searchSv, setSearchSv] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    Promise.all([lopService.listLops(user), monHocService.listMonHocs(), sinhVienService.listSinhViens()])
      .then(([lopsData, monData, svData]) => {
        if (!mounted) return
        setLops(lopsData)
        setMonHocs(monData)
        setSinhViens(svData)
        setLoading(false)
      })
      .catch(() => { if (mounted) setError('Không tải được dữ liệu.'); setLoading(false) })
    return () => { mounted = false }
  }, [user])

  const fetchResults = async () => {
    if (!selectedLopId || !selectedMonId) {
      setResults([])
      return
    }
    try {
      const records = await diemService.listDiems({ lopId: selectedLopId, monHocId: selectedMonId })
      const svMap = new Map(sinhViens.map(sv => [sv.id, sv]))
      const data = records.map((r, idx) => {
        const sv = svMap.get(r.sinhVienId)
        return {
          stt: idx + 1,
          maSV: sv?.ma ?? '—',
          hoTen: sv?.hoTen ?? '—',
          tx: r.tx ?? '—',
          gk: r.gk ?? '—',
          ck: r.ck ?? '—',
          tongKet: r.tongKet ?? '—',
          diemChu: r.tongKet !== null && r.tongKet !== undefined ? getLetterGrade(r.tongKet) : '—',
        }
      })
      setResults(data)
      setCurrentPage(1)
    } catch (err) {
      setError('Không tải được điểm.')
    }
  }

  useEffect(() => {
    fetchResults()
  }, [selectedLopId, selectedMonId])

  const filteredResults = useMemo(() => {
    if (!searchSv.trim()) return results
    const search = searchSv.trim().toLowerCase()
    return results.filter(r => r.maSV.toLowerCase().includes(search) || r.hoTen.toLowerCase().includes(search))
  }, [results, searchSv])

  const totalPages = Math.ceil(filteredResults.length / PAGE_SIZE) || 1
  if (currentPage > totalPages) setCurrentPage(totalPages)
  const paginatedResults = filteredResults.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  const handleExport = (type) => {
    if (!paginatedResults.length) return
    const exportData = filteredResults.map((r, idx) => ({
      STT: idx + 1,
      'Mã SV': r.maSV,
      'Họ tên': r.hoTen,
      TX: r.tx,
      GK: r.gk,
      CK: r.ck,
      'Tổng kết': r.tongKet,
      'Điểm chữ': r.diemChu,
    }))
    import('xlsx').then(XLSX => {
      const ws = XLSX.utils.json_to_sheet(exportData)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'TraCuuDiem')
      const lop = lops.find(l => l.id === Number(selectedLopId))
      const mon = monHocs.find(m => m.id === Number(selectedMonId))
      const fileName = `TraCuuDiem_${lop?.ten ?? ''}_${mon?.ma ?? ''}`.replace(/\s+/g, '_')
      if (type === 'xlsx') XLSX.writeFile(wb, `${fileName}.xlsx`)
      else XLSX.writeFile(wb, `${fileName}.csv`)
    })
  }

  if (loading) return <div className="loading">Đang tải...</div>
  if (error) return <div className="alert alert-error" role="alert">{error}</div>

  return (
    <div className="page">
      <div className="page-header">
        <h2>Tra cứu điểm</h2>
        <p className="muted">Lọc theo lớp, môn học và tìm kiếm sinh viên</p>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div className="toolbar" style={{ flexWrap: 'wrap', gap: '1rem' }}>
          <div className="form-group" style={{ margin: 0, minWidth: '200px' }}>
            <label className="form-label">Lớp học</label>
            <select className="form-select" value={selectedLopId} onChange={e => setSelectedLopId(e.target.value)} style={{ width: '100%' }}>
              <option value="">— Chọn lớp —</option>
              {lops.map(lop => <option key={lop.id} value={lop.id}>{lop.ten} ({lop.namHoc})</option>)}
            </select>
          </div>
          <div className="form-group" style={{ margin: 0, minWidth: '200px' }}>
            <label className="form-label">Môn học</label>
            <select className="form-select" value={selectedMonId} onChange={e => setSelectedMonId(e.target.value)} style={{ width: '100%' }}>
              <option value="">— Chọn môn —</option>
              {monHocs.map(mon => <option key={mon.id} value={mon.id}>{mon.ten} ({mon.ma})</option>)}
            </select>
          </div>
          <div className="form-group" style={{ margin: 0, minWidth: '200px' }}>
            <label className="form-label">Tìm kiếm SV</label>
            <input className="form-input" type="text" placeholder="Mã SV hoặc Họ tên" value={searchSv} onChange={e => setSearchSv(e.target.value)} />
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem', alignItems: 'flex-end' }}>
            <button className="btn btn-outline" onClick={() => handleExport('xlsx')}>Xuất Excel</button>
            <button className="btn btn-outline" onClick={() => handleExport('csv')}>Xuất CSV</button>
          </div>
        </div>
      </div>

      {selectedLopId && selectedMonId && (
        <div className="card">
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th style={{ width: '60px' }}>STT</th>
                  <th style={{ width: '120px' }}>Mã SV</th>
                  <th>Họ tên</th>
                  <th className="th-score" style={{ width: '90px' }}>TX</th>
                  <th className="th-score" style={{ width: '90px' }}>GK</th>
                  <th className="th-score" style={{ width: '90px' }}>CK</th>
                  <th className="th-score" style={{ width: '100px' }}>Tổng kết</th>
                  <th className="th-score" style={{ width: '90px' }}>Điểm chữ</th>
                </tr>
              </thead>
              <tbody>
                {paginatedResults.length === 0 ? (
                  <tr><td colSpan={8} style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>Không có dữ liệu</td></tr>
                ) : (
                  paginatedResults.map((r, idx) => (
                    <tr key={r.maSV}>
                      <td>{(currentPage - 1) * PAGE_SIZE + idx + 1}</td>
                      <td><code>{r.maSV}</code></td>
                      <td>{r.hoTen}</td>
                      <td className="score-cell" style={{ textAlign: 'center' }}>{r.tx}</td>
                      <td className="score-cell" style={{ textAlign: 'center' }}>{r.gk}</td>
                      <td className="score-cell" style={{ textAlign: 'center' }}>{r.ck}</td>
                      <td className="tong-ket" style={{ fontWeight: 600, textAlign: 'center' }}>{r.tongKet}</td>
                      <td style={{ textAlign: 'center' }}>
                        <span className={`badge badge-info`}>{r.diemChu}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <div className="card-footer" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
              <button className="btn btn-outline btn-sm" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
                <Icon name="chevronLeft" size={16} /> Trước
              </button>
              <span>Trang {currentPage} / {totalPages}</span>
              <button className="btn btn-outline btn-sm" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
                Sau <Icon name="chevronRight" size={16} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
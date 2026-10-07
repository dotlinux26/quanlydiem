import { useState, useEffect, useMemo } from 'react'
import { useAuth } from '../hooks/useAuth.js'
import * as lopService from '../services/lopService.js'
import * as monHocService from '../services/monHocService.js'
import * as sinhVienService from '../services/sinhVienService.js'
import * as diemService from '../services/diemService.js'
import { Table, Pagination } from '../components/Table.jsx'
import { Select } from '../components/Form.jsx'
import Icon from '../components/Icon.jsx'
import { formatScore } from '../utils/format.js'
import { getLetterGrade } from '../constants/gradeScale.js'

export default function LookupPage() {
  const { user } = useAuth()
  const [lops, setLops] = useState([])
  const [monHocs, setMonHocs] = useState([])
  const [results, setResults] = useState([])
  const [lopId, setLopId] = useState('')
  const [monId, setMonId] = useState('')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 20

  useEffect(() => {
    let mounted = true
    Promise.all([lopService.listLops(user), monHocService.listMonHocs()])
      .then(([lopsData, mhsData]) => { if (mounted) { setLops(lopsData); setMonHocs(mhsData) } })
      .catch(() => mounted && setError('Không tải được dữ liệu lọc'))
    return () => { mounted = false }
  }, [user])

  const fetchResults = async () => {
    if (!lopId || !monId) return
    setLoading(true)
    setError('')
    try {
      const svs = await sinhVienService.listSinhViens({ lopId: Number(lopId), search: search || undefined })
      const diems = await diemService.listDiemByLopMon(Number(lopId), Number(monId))
      const merged = svs.map(sv => {
        const d = diems.find(d => d.sinhVienId === sv.id)
        return { ...sv, diem: d }
      })
      setResults(merged)
    } catch (err) {
      setError('Tra cứu thất bại: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchResults()
    setCurrentPage(1)
  }, [lopId, monId, search])

  const totalPages = Math.ceil(results.length / pageSize)
  const pagedResults = results.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const columns = [
    { header: 'STT', field: 'stt', width: '60px', align: 'center' },
    { header: 'Mã SV', field: 'ma', width: '130px', render: (sv) => <code style={{ fontSize: '0.8125rem' }}>{sv.ma}</code> },
    { header: 'Họ tên', field: 'hoTen', width: '220px' },
    { header: 'TX', field: 'tx', width: '80px', align: 'center', render: (sv) => sv.diem ? formatScore(sv.diem.tx) : '—' },
    { header: 'GK', field: 'gk', width: '80px', align: 'center', render: (sv) => sv.diem ? formatScore(sv.diem.gk) : '—' },
    { header: 'CK', field: 'ck', width: '80px', align: 'center', render: (sv) => sv.diem ? formatScore(sv.diem.ck) : '—' },
    { header: 'Tổng kết', field: 'tongKet', width: '100px', align: 'center', render: (sv) => sv.diem ? formatScore(sv.diem.tongKet) : '—' },
    { header: 'Điểm chữ', field: 'diemChu', width: '100px', align: 'center', render: (sv) => sv.diem ? getLetterGrade(sv.diem.tongKet) : '—' },
  ]

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Tra cứu điểm</h2>
          <p className="muted">Lọc theo lớp, môn học và tìm kiếm sinh viên</p>
        </div>
      </div>

      <div className="card">
        <div className="toolbar">
          <Select
            id="lopId"
            label="Lớp"
            value={lopId}
            onChange={e => setLopId(e.target.value)}
            options={[{ value: '', label: '-- Chọn lớp --' }, ...lops.map(l => ({ value: String(l.id), label: l.ten }))]}
            style={{ minWidth: '220px' }}
            required
          />
          <Select
            id="monId"
            label="Môn học"
            value={monId}
            onChange={e => setMonId(e.target.value)}
            options={[{ value: '', label: '-- Chọn môn --' }, ...monHocs.map(m => ({ value: String(m.id), label: `${m.ten} (${m.ma})` }))]}
            style={{ minWidth: '260px' }}
            required
          />
          <div className="form-group" style={{ margin: 0, flex: 1, minWidth: '250px' }}>
            <input
              type="text"
              className="form-input"
              placeholder="Tìm mã SV, họ tên..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>
        </div>

        {error && <div className="alert alert-error" role="alert">{error}</div>}
        {loading && <div className="loading">Đang tra cứu...</div>}

        {!loading && !error && (
          <>
            <Table columns={columns} data={pagedResults.map((sv, i) => ({ ...sv, stt: (currentPage - 1) * pageSize + i + 1 }))} keyField="id" emptyMessage="Không tìm thấy kết quả" />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              pageSize={pageSize}
              totalItems={results.length}
            />
          </>
        )}
      </div>
    </div>
  )
}
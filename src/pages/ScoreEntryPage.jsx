import { useEffect, useState, useMemo, useRef, useCallback } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'
import * as lopService from '../services/lopService.js'
import * as diemService from '../services/diemService.js'
import { parseScore, scoreInputError, calcSummary } from '../utils/score.js'
import { formatScore } from '../utils/format.js'
import * as XLSX from 'xlsx'

function toValues(record) {
  return record
    ? {
        thuongKy: formatScore(record.thuongKy),
        giuaKy: formatScore(record.giuaKy),
        cuoiKy: formatScore(record.cuoiKy),
      }
    : { thuongKy: '', giuaKy: '', cuoiKy: '' }
}

function exportToFile(data, fileName, fileType) {
  const ws = XLSX.utils.json_to_sheet(data)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'BangDiem')
  if (fileType === 'xlsx') {
    XLSX.writeFile(wb, `${fileName}.xlsx`)
  } else {
    XLSX.writeFile(wb, `${fileName}.csv`)
  }
}

export default function ScoreEntryPage() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const highlightSvId = Number(searchParams.get('sv')) || null
  const { user } = useAuth()
  const [lop, setLop] = useState(null)
  const [monHocs, setMonHocs] = useState([])
  const [monId, setMonId] = useState(null)
  const [sinhViens, setSinhViens] = useState([])
  const [rows, setRows] = useState({})
  const [savingId, setSavingId] = useState(null)
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(true)
  const [pageError, setPageError] = useState('')
  const rowsRef = useRef(null)

  const monHoc = monHocs.find((m) => m.id === monId)
  const highlightSv = highlightSvId
    ? sinhViens.find((s) => s.id === highlightSvId)
    : null

  useEffect(() => {
    let mounted = true
    Promise.all([
      lopService.getLop(id, user),
      lopService.listMonHocs(),
      lopService.listSinhViens(id),
    ])
      .then(([lopData, monData, svData]) => {
        if (!mounted) return
        if (!lopData) {
          setPageError('Không tìm thấy lớp hoặc bạn không có quyền truy cập.')
          return
        }
        setLop(lopData)
        setMonHocs(monData)
        setMonId(monData[0]?.id ?? null)
        setSinhViens(svData)
      })
      .catch(() => mounted && setPageError('Có lỗi khi tải dữ liệu.'))
      .finally(() => mounted && setLoading(false))
    return () => { mounted = false }
  }, [id, user])

  useEffect(() => {
    let mounted = true
    if (!lop || monId === null) return undefined
    diemService
      .listDiems({ lopId: lop.id, monHocId: monId })
      .then((records) => {
        if (!mounted) return
        const next = {}
        for (const sv of sinhViens) {
          const rec = records.find((r) => r.sinhVienId === sv.id)
          next[sv.id] = {
            values: toValues(rec),
            errors: {},
            status: rec ? 'saved' : 'new',
            record: rec ?? null,
          }
        }
        setRows(next)
        setMsg('')
      })
      .catch(() => mounted && setPageError('Không tải được điểm của lớp.'))
    return () => { mounted = false }
  }, [lop, monId, sinhViens])

  function handleChange(svId, field, value) {
    setRows((prev) => {
      const row = prev[svId]
      return {
        ...prev,
        [svId]: {
          ...row,
          values: { ...row.values, [field]: value },
          errors: { ...row.errors, [field]: scoreInputError(value) },
          status: 'dirty',
        },
      }
    })
  }

  function handleMonChange(nextMonId) {
    if (nextMonId === monId) return
    const hasDirty = Object.values(rows).some((r) => r.status === 'dirty')
    if (
      hasDirty &&
      !window.confirm(
        'Bạn đang có điểm chưa lưu. Đổi môn học sẽ làm mất các thay đổi. Tiếp tục?',
      )
    ) {
      return
    }
    setMonId(nextMonId)
  }

  useEffect(() => {
    if (highlightSvId === null || loading || Object.keys(rows).length === 0 || !rowsRef.current) {
      return
    }
    const el = rowsRef.current.querySelector(`tr[data-sv="${highlightSvId}"]`)
    el?.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }, [highlightSvId, rows, loading])

  const computed = useMemo(() => {
    const summary = {}
    for (const sv of sinhViens) {
      const row = rows[sv.id]
      if (!row) continue
      const thuongKy = parseScore(row.values.thuongKy)
      const giuaKy = parseScore(row.values.giuaKy)
      const cuoiKy = parseScore(row.values.cuoiKy)
      if (thuongKy === null || giuaKy === null || cuoiKy === null) {
        summary[sv.id] = null
      } else {
        summary[sv.id] = calcSummary({ thuongKy, giuaKy, cuoiKy })
      }
    }
    return summary
  }, [rows, sinhViens])

  async function saveRow(sv) {
    const row = rows[sv.id]
    const errors = {}
    for (const field of ['thuongKy', 'giuaKy', 'cuoiKy']) {
      const err = scoreInputError(row.values[field])
      if (err) errors[field] = err
    }
    if (Object.keys(errors).length > 0) {
      setRows((prev) => ({ ...prev, [sv.id]: { ...row, errors } }))
      return
    }
    setSavingId(sv.id)
    setMsg('')
    try {
      const record = await diemService.saveDiem({
        id: row.record?.id,
        sinhVienId: sv.id,
        lopId: lop.id,
        monHocId: monId,
        thuongKy: parseScore(row.values.thuongKy),
        giuaKy: parseScore(row.values.giuaKy),
        cuoiKy: parseScore(row.values.cuoiKy),
      })
      setRows((prev) => ({
        ...prev,
        [sv.id]: {
          values: toValues(record),
          errors: {},
          status: 'saved',
          record,
        },
      }))
      setMsg(`Đã lưu điểm ${sv.hoTen} (${monHoc.ten}).`)
    } catch (err) {
      setMsg(err?.message || 'Lưu điểm thất bại.')
    } finally {
      setSavingId(null)
    }
  }

  const handleExport = useCallback((type) => {
    if (!lop || !monHoc) return
    const exportData = sinhViens.map((sv, idx) => {
      const row = rows[sv.id]
      const tk = computed[sv.id] ?? row?.record?.tongKet
      return {
        STT: idx + 1,
        'Mã SV': sv.ma,
        'Họ tên': sv.hoTen,
        'Thường kỳ': row?.values?.thuongKy ?? '',
        'Giữa kỳ': row?.values?.giuaKy ?? '',
        'Cuối kỳ': row?.values?.cuoiKy ?? '',
        'Tổng kết': tk === null || tk === undefined ? '' : formatScore(tk),
        'Trạng thái': row?.status === 'saved' ? 'Đã lưu' : row?.status === 'dirty' ? 'Chưa lưu' : 'Mới',
      }
    })
    const fileName = `BangDiem_${lop.ten}_${monHoc.ma}`.replace(/\s+/g, '_')
    exportToFile(exportData, fileName, type)
    setMsg(`Đã xuất ${type.toUpperCase()}: ${fileName}.${type}`)
  }, [lop, monHoc, sinhViens, rows, computed])

  if (loading) return <div className="loading">Đang tải...</div>
  if (pageError) return <div className="alert alert-error" role="alert">{pageError}</div>

  const dirtyCount = Object.values(rows).filter((r) => r.status === 'dirty').length

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <Link to={`/lop/${lop.id}`} className="btn btn-ghost btn-sm link-back">← Danh sách sinh viên</Link>
          <h2 style={{ marginTop: '0.75rem' }}>Nhập điểm — {lop.ten}</h2>
          <p className="muted">Môn: {monHoc?.ten} ({monHoc?.ma}) · Thang điểm 0–10, bước 0,5</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-outline" onClick={() => handleExport('xlsx')}>Xuất Excel</button>
          <button className="btn btn-outline" onClick={() => handleExport('csv')}>Xuất CSV</button>
        </div>
      </div>

      <div className="card">
        <div className="toolbar">
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">Môn học</label>
            <select
              className="form-select"
              value={monId}
              onChange={(e) => handleMonChange(Number(e.target.value))}
              style={{ minWidth: '260px' }}
            >
              {monHocs.map((m) => (
                <option key={m.id} value={m.id}>{m.ten} ({m.ma})</option>
              ))}
            </select>
          </div>
          {dirtyCount > 0 && (
            <span className="badge badge-warning" style={{ marginLeft: 'auto' }}>
              {dirtyCount} hàng chưa lưu
            </span>
          )}
        </div>

        {msg && <div className={`alert ${msg.includes('thất bại') || msg.includes('lỗi') ? 'alert-error' : 'alert-success'}`} role="alert">{msg}</div>}
        {highlightSv && (
          <div className="alert alert-info" role="alert">
            Đang chấm điểm: <strong>{highlightSv.hoTen}</strong> ({highlightSv.ma})
          </div>
        )}

        <div className="table-wrapper">
          <table className="table score-table" ref={rowsRef}>
            <thead>
              <tr>
                <th style={{ width: '60px' }}>STT</th>
                <th style={{ width: '110px' }}>Mã SV</th>
                <th>Họ tên</th>
                <th className="th-score" style={{ width: '100px' }}>Thường kỳ</th>
                <th className="th-score" style={{ width: '100px' }}>Giữa kỳ</th>
                <th className="th-score" style={{ width: '100px' }}>Cuối kỳ</th>
                <th className="th-score" style={{ width: '100px' }}>Tổng kết</th>
                <th style={{ width: '120px' }}>Trạng thái</th>
                <th style={{ width: '100px' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {sinhViens.map((sv, i) => {
                const row = rows[sv.id]
                if (!row) return null
                const tongKet = computed[sv.id] ?? row.record?.tongKet
                const isSaving = savingId === sv.id
                const isHighlight = highlightSvId !== null && sv.id === highlightSvId
                const fields = ['thuongKy', 'giuaKy', 'cuoiKy']
                const labels = ['Thường kỳ', 'Giữa kỳ', 'Cuối kỳ']
                return (
                  <tr
                    key={sv.id}
                    data-sv={sv.id}
                    className={isHighlight ? 'row-highlight' : ''}
                  >
                    <td>{i + 1}</td>
                    <td><code style={{ fontSize: '0.8125rem' }}>{sv.ma}</code></td>
                    <td>{sv.hoTen}</td>
                    {fields.map((f, idx) => (
                      <td key={f} className="score-cell" style={{ padding: '0.25rem 0.5rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.1rem', minWidth: '90px' }}>
                          <label className="form-label" style={{ fontSize: '0.55rem', textTransform: 'uppercase', letterSpacing: '0.02em', color: '#94a3b8', margin: 0, lineHeight: 1, whiteSpace: 'nowrap' }}>
                            {labels[idx]}
                          </label>
                          <input
                            type="text"
                            inputMode="decimal"
                            className="form-input"
                            placeholder="0–10"
                            value={row.values?.[f] ?? ''}
                            onChange={(e) => handleChange(sv.id, f, e.target.value)}
                            style={{ width: '90px', height: '32px', padding: '0 0.35rem', fontSize: '0.8125rem', textAlign: 'center', borderRadius: '6px', boxSizing: 'border-box', borderColor: row.errors?.[f] ? '#dc2626' : '#cbd5e1' }}
                          />
                          {row.errors?.[f] && <span className="form-error" style={{ fontSize: '0.6rem', color: '#dc2626', lineHeight: 1, whiteSpace: 'nowrap', marginTop: '0.05rem' }}>{row.errors[f]}</span>}
                        </div>
                      </td>
                    ))}
                    <td className="tong-ket">
                      {tongKet === null || tongKet === undefined ? '—' : formatScore(tongKet)}
                    </td>
                    <td>
                      <span className={`badge ${row.status === 'saved' ? 'badge-success' : row.status === 'dirty' ? 'badge-warning' : 'badge-neutral'}`}>
                        {row.status === 'saved' ? 'Đã lưu' : row.status === 'dirty' ? 'Chưa lưu' : 'Mới'}
                      </span>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        disabled={isSaving}
                        onClick={() => saveRow(sv)}
                      >
                        {isSaving ? 'Đang lưu...' : 'Lưu'}
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
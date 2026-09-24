import { useEffect, useState, useMemo, useRef } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'
import * as lopService from '../services/lopService.js'
import * as diemService from '../services/diemService.js'
import ScoreForm from '../components/ScoreForm.jsx'
import { parseScore, scoreInputError, calcSummary } from '../utils/score.js'
import { formatScore } from '../utils/format.js'

function toValues(record) {
  return record
    ? {
        thuongKy: formatScore(record.thuongKy),
        giuaKy: formatScore(record.giuaKy),
        cuoiKy: formatScore(record.cuoiKy),
      }
    : { thuongKy: '', giuaKy: '', cuoiKy: '' }
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
    return () => {
      mounted = false
    }
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
    return () => {
      mounted = false
    }
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

  if (loading) return <p className="muted">Đang tải...</p>
  if (pageError) return <p className="form-error">{pageError}</p>

  const dirtyCount = Object.values(rows).filter((r) => r.status === 'dirty').length

  return (
    <section className="page">
      <Link to={`/lop/${lop.id}`} className="link-back">
        ← Về danh sách sinh viên
      </Link>
      <h2>Nhập điểm — {lop.ten}</h2>
      <div className="toolbar">
        <label>
          Môn học
          <select
            value={monId}
            onChange={(e) => handleMonChange(Number(e.target.value))}
          >
            {monHocs.map((m) => (
              <option key={m.id} value={m.id}>
                {m.ten} ({m.ma})
              </option>
            ))}
          </select>
        </label>
        {dirtyCount > 0 && (
          <span className="muted">
            Có {dirtyCount} hàng chưa lưu · tổng kết = thường kỳ×0,3 + giữa
            kỳ×0,3 + cuối kỳ×0,4
          </span>
        )}
      </div>
      {msg && <p className="form-success">{msg}</p>}
      {highlightSv && (
        <p className="muted">Đang chấm điểm: {highlightSv.hoTen} ({highlightSv.ma})</p>
      )}
      <table className="table score-table" ref={rowsRef}>
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã SV</th>
            <th>Họ tên</th>
            <th colSpan={3}>Điểm thành phần</th>
            <th>Tổng kết</th>
            <th>Trạng thái</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sinhViens.map((sv, i) => {
            const row = rows[sv.id]
            if (!row) return null
            const tongKet = computed[sv.id] ?? row.record?.tongKet
            const isSaving = savingId === sv.id
            const isHighlight =
              highlightSvId !== null && sv.id === highlightSvId
            return (
              <tr
                key={sv.id}
                data-sv={sv.id}
                className={isHighlight ? 'row-highlight' : ''}
              >
                <td>{i + 1}</td>
                <td>{sv.ma}</td>
                <td>{sv.hoTen}</td>
                <td>
                  <ScoreForm
                    value={row.values}
                    errors={row.errors}
                    onChange={(f, v) => handleChange(sv.id, f, v)}
                  />
                </td>
                <td className="tong-ket">
                  {tongKet === null || tongKet === undefined
                    ? '—'
                    : formatScore(tongKet)}
                </td>
                <td>
                  <span className={`status status-${row.status}`}>
                    {row.status === 'saved'
                      ? 'Đã lưu'
                      : row.status === 'dirty'
                        ? 'Chưa lưu'
                        : 'Mới'}
                  </span>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary"
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
      <p className="muted">
        Môn học: {monHoc?.ten} ({monHoc?.ma}) · thang điểm 0–10, mỗi ô dùng
        bước 0,5
      </p>
    </section>
  )
}
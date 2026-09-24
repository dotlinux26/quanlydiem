import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'
import * as lopService from '../services/lopService.js'

export default function StudentListPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const [lop, setLop] = useState(null)
  const [sinhViens, setSinhViens] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    Promise.all([lopService.getLop(id, user), lopService.listSinhViens(id)])
      .then(([lopData, svData]) => {
        if (!mounted) return
        if (!lopData) {
          setError('Không tìm thấy lớp hoặc bạn không có quyền truy cập lớp này.')
          return
        }
        setLop(lopData)
        setSinhViens(svData)
      })
      .catch(() => {
        if (mounted) setError('Có lỗi khi tải dữ liệu.')
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })
    return () => { mounted = false }
  }, [id, user])

  if (loading) return <div className="loading">Đang tải...</div>
  if (error) return <div className="alert alert-error" role="alert">{error}</div>

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <Link to="/lop" className="btn btn-ghost btn-sm link-back">← Về danh sách lớp</Link>
          <h2 style={{ marginTop: '0.75rem' }}>Danh sách sinh viên — {lop.ten}</h2>
          <p className="muted">Năm học {lop.namHoc} · {sinhViens.length} sinh viên</p>
        </div>
        <div className="page-actions">
          <Link to={`/lop/${lop.id}/diem`} className="btn btn-primary">
            Nhập điểm cả lớp
          </Link>
        </div>
      </div>

      {sinhViens.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <div className="icon" aria-hidden="true">👥</div>
            <h3>Chưa có sinh viên</h3>
            <p>Lớp này chưa có sinh viên nào.</p>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th style={{ width: '60px' }}>STT</th>
                  <th style={{ width: '120px' }}>Mã SV</th>
                  <th>Họ tên</th>
                  <th style={{ width: '160px' }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {sinhViens.map((sv, i) => (
                  <tr key={sv.id}>
                    <td>{i + 1}</td>
                    <td><code style={{ fontSize: '0.8125rem' }}>{sv.ma}</code></td>
                    <td>{sv.hoTen}</td>
                    <td>
                      <Link
                        to={`/lop/${lop.id}/diem?sv=${sv.id}`}
                        className="btn btn-outline btn-sm"
                      >
                        Nhập điểm
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
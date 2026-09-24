import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'
import * as lopService from '../services/lopService.js'

export default function ClassListPage() {
  const { user } = useAuth()
  const [lops, setLops] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    lopService
      .listLops(user)
      .then((data) => {
        if (mounted) setLops(data)
      })
      .catch(() => {
        if (mounted) setError('Không tải được danh sách lớp.')
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })
    return () => { mounted = false }
  }, [user])

  if (loading) return <div className="loading">Đang tải...</div>
  if (error) return <div className="alert alert-error" role="alert">{error}</div>

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Danh sách lớp được phân công</h2>
          <p className="muted">{lops.length} lớp học</p>
        </div>
      </div>

      {lops.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <div className="icon" aria-hidden="true">📚</div>
            <h3>Chưa có lớp nào</h3>
            <p>Bạn chưa được phân công lớp học nào. Vui lòng liên hệ quản trị viên.</p>
          </div>
        </div>
      ) : (
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
                    <td>{user?.name}</td>
                    <td>
                      <Link to={`/lop/${lop.id}`} className="btn btn-outline btn-sm">
                        Xem sinh viên
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
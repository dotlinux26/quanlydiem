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
    return () => {
      mounted = false
    }
  }, [user])

  if (loading) return <p className="muted">Đang tải...</p>
  if (error) return <p className="form-error">{error}</p>

  return (
    <section className="page">
      <h2>Danh sách lớp được phân công</h2>
      {lops.length === 0 ? (
        <p className="muted">Chưa có lớp nào được phân công.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên lớp</th>
              <th>Năm học</th>
              <th>Giáo viên</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {lops.map((lop, i) => (
              <tr key={lop.id}>
                <td>{i + 1}</td>
                <td>{lop.ten}</td>
                <td>{lop.namHoc}</td>
                <td>{user?.name}</td>
                <td>
                  <Link to={`/lop/${lop.id}`}>Xem sinh viên</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  )
}
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
    return () => {
      mounted = false
    }
  }, [id, user])

  if (loading) return <p className="muted">Đang tải...</p>
  if (error) return <p className="form-error">{error}</p>

  return (
    <section className="page">
      <Link to="/lop" className="link-back">
        ← Về danh sách lớp
      </Link>
      <h2>Danh sách sinh viên — {lop.ten}</h2>
      <p className="muted">
        Năm học {lop.namHoc} · {sinhViens.length} sinh viên
      </p>
      <table className="table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã SV</th>
            <th>Họ tên</th>
            <th>Nhập điểm</th>
          </tr>
        </thead>
        <tbody>
          {sinhViens.map((sv, i) => (
            <tr key={sv.id}>
              <td>{i + 1}</td>
              <td>{sv.ma}</td>
              <td>{sv.hoTen}</td>
              <td>
                <Link to={`/lop/${lop.id}/diem?sv=${sv.id}`}>Nhập điểm</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to={`/lop/${lop.id}/diem`} className="btn btn-primary">
        Nhập điểm theo lớp
      </Link>
    </section>
  )
}
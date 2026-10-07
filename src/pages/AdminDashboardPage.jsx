import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'
import * as lopService from '../services/lopService.js'
import * as sinhVienService from '../services/sinhVienService.js'
import * as monHocService from '../services/monHocService.js'
import * as taiKhoanService from '../services/taiKhoanService.js'
import Icon from '../components/Icon.jsx'
import { useEffect, useState } from 'react'

export default function AdminDashboardPage() {
  const { user } = useAuth()
  const [stats, setStats] = useState({ lops: 0, sinhViens: 0, monHocs: 0, giaoViens: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    Promise.all([
      lopService.listLops(user),
      sinhVienService.listSinhViens(),
      monHocService.listMonHocs(),
      taiKhoanService.listGiaoViens(),
    ])
      .then(([lops, svs, mhs, gvs]) => {
        if (!mounted) return
        setStats({ lops: lops.length, sinhViens: svs.length, monHocs: mhs.length, giaoViens: gvs.length })
      })
      .finally(() => mounted && setLoading(false))
    return () => { mounted = false }
  }, [user])

  const statCards = [
    { label: 'Lớp học', value: stats.lops, icon: 'building2', href: '/admin/classes', color: '#2563eb' },
    { label: 'Sinh viên', value: stats.sinhViens, icon: 'users', href: '/admin/students', color: '#16a34a' },
    { label: 'Môn học', value: stats.monHocs, icon: 'bookOpen', href: '/admin/subjects', color: '#7c3aed' },
    { label: 'Giáo viên', value: stats.giaoViens, icon: 'userCog', href: '/admin/accounts', color: '#f59e0b' },
  ]

  const features = [
    { icon: 'building2', title: 'Quản lý lớp học', desc: 'Thêm, sửa, xóa lớp học và phân công giáo viên phụ trách', href: '/admin/classes' },
    { icon: 'users', title: 'Quản lý sinh viên', desc: 'Thêm, sửa, xóa, import Excel, chuyển lớp sinh viên', href: '/admin/students' },
    { icon: 'bookOpen', title: 'Quản lý môn học', desc: 'Thêm, sửa, xóa môn học, cập nhật mã môn và tín chỉ', href: '/admin/subjects' },
    { icon: 'userCog', title: 'Quản lý tài khoản', desc: 'Tạo tài khoản GV/QL, phân vai trò, reset mật khẩu, khóa/mở', href: '/admin/accounts' },
  ]

  if (loading) {
    return <div className="loading">Đang tải bảng điều khiển...</div>
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Bảng điều khiển quản trị</h2>
          <p className="muted">Tổng quan hệ thống quản lý điểm</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {statCards.map((s, i) => (
          <Link key={i} to={s.href} className="card" style={{ textDecoration: 'none', color: 'inherit', display: 'block', transition: 'transform 0.15s, box-shadow 0.15s' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={s.icon} size={24} style={{ color: s.color }} />
              </div>
              <div>
                <div style={{ fontSize: '0.8125rem', color: '#64748b', fontWeight: 500 }}>{s.label}</div>
                <div style={{ fontSize: '1.75rem', fontWeight: '700', color: '#1e293b' }}>{s.value}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Chức năng quản trị</h3>
        </div>
        <div className="card-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {features.map((f, i) => (
              <Link key={i} to={f.href} className="feature-card" style={{ textDecoration: 'none', color: 'inherit', display: 'block', transition: 'border-color 0.15s, box-shadow 0.15s' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon name={f.icon} size={20} style={{ color: '#2563eb' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 0.35rem', fontSize: '1rem', fontWeight: 600, color: '#1e293b' }}>{f.title}</h4>
                    <p style={{ margin: 0, fontSize: '0.8125rem', color: '#64748b', lineHeight: 1.5 }}>{f.desc}</p>
                  </div>
                  <Icon name="chevronRight" size={18} style={{ color: '#94a3b8', flexShrink: 0, marginTop: '0.25rem' }} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'

export default function AdminDashboardPage() {
  const { user } = useAuth()

  const stats = [
    { label: 'Tổng lớp học', value: '3', icon: '📚', href: '/admin/classes' },
    { label: 'Tổng sinh viên', value: '15', icon: '👥', href: '/admin/students' },
    { label: 'Tổng môn học', value: '3', icon: '📖', href: '/admin/subjects' },
    { label: 'Giáo viên', value: '1', icon: '👨‍🏫', href: '/admin/teachers' },
  ]

  return (
    <div className="page">
      <div className="page-header">
        <h2>Bảng điều khiển quản trị</h2>
        <p className="muted">Tổng quan hệ thống</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {stats.map((s, i) => (
          <Link key={i} to={s.href} className="card" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ fontSize: '2rem' }}>{s.icon}</div>
              <div>
                <div style={{ fontSize: '0.875rem', color: '#64748b' }}>{s.label}</div>
                <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>{s.value}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Chức năng quản trị (Sprint 3 - V2.0)</h3>
        </div>
        <div className="card-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            <div className="feature-card" style={{ padding: '1rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>📚 Quản lý lớp học</h4>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.875rem', color: '#475569' }}>
                <li>Thêm / Sửa / Xóa lớp</li>
                <li>Phân công giáo viên cho lớp</li>
                <li>Cập nhật năm học</li>
              </ul>
            </div>
            <div className="feature-card" style={{ padding: '1rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>👥 Quản lý sinh viên</h4>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.875rem', color: '#475569' }}>
                <li>Thêm / Sửa / Xóa sinh viên</li>
                <li>Import danh sách từ Excel</li>
                <li>Chuyển lớp, nghỉ học</li>
              </ul>
            </div>
            <div className="feature-card" style={{ padding: '1rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>📖 Quản lý môn học</h4>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.875rem', color: '#475569' }}>
                <li>Thêm / Sửa / Xóa môn học</li>
                <li>Cập nhật tín chỉ, mã môn</li>
              </ul>
            </div>
            <div className="feature-card" style={{ padding: '1rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>👤 Quản lý tài khoản</h4>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.875rem', color: '#475569' }}>
                <li>Tạo / Sửa / Xóa tài khoản GV</li>
                <li>Phân vai trò (GV / Admin)</li>
                <li>Reset mật khẩu, khóa tài khoản</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
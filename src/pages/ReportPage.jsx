import { useEffect, useState, useMemo, useRef } from 'react'
import { useAuth } from '../hooks/useAuth.js'
import * as lopService from '../services/lopService.js'
import * as monHocService from '../services/monHocService.js'
import * as diemService from '../services/diemService.js'
import * as sinhVienService from '../services/sinhVienService.js'
import { getLetterGrade, isPassing } from '../constants/gradeScale.js'
import { formatScore } from '../utils/format.js'
import Icon from '../components/Icon.jsx'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar, Doughnut } from 'react-chartjs-2'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend)

export default function ReportPage() {
  const { user } = useAuth()
  const [lops, setLops] = useState([])
  const [monHocs, setMonHocs] = useState([])
  const [selectedLopId, setSelectedLopId] = useState('')
  const [selectedMonId, setSelectedMonId] = useState('')
  const [stats, setStats] = useState(null)
  const [chartData, setChartData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const chartRef = useRef(null)

  useEffect(() => {
    let mounted = true
    Promise.all([lopService.listLops(user), monHocService.listMonHocs()])
      .then(([lopsData, monData]) => {
        if (!mounted) return
        setLops(lopsData)
        setMonHocs(monData)
        setLoading(false)
      })
      .catch(() => { if (mounted) setError('Không tải được dữ liệu.'); setLoading(false) })
    return () => { mounted = false }
  }, [user])

  useEffect(() => {
    if (!selectedLopId || !selectedMonId) {
      setStats(null)
      setChartData(null)
      return
    }
    const loadData = async () => {
      try {
        const [records, svList] = await Promise.all([
          diemService.listDiems({ lopId: selectedLopId, monHocId: selectedMonId }),
          sinhVienService.listSinhViens(),
        ])
        const svMap = new Map(svList.map(sv => [sv.id, sv]))
        const validRecords = records.filter(r => r.tongKet !== null && r.tongKet !== undefined)
        const scores = validRecords.map(r => r.tongKet)

        if (validRecords.length === 0) {
          setStats({ total: 0, max: 0, min: 0, avg: 0, passRate: 0, gradeDist: { A: 0, B: 0, C: 0, D: 0, F: 0 } })
          setChartData({ bar: null, doughnut: null })
          return
        }

        const max = Math.max(...scores)
        const min = Math.min(...scores)
        const avg = scores.reduce((a, b) => a + b, 0) / scores.length
        const passCount = scores.filter(s => s >= 4.0).length
        const passRate = (passCount / scores.length * 100).toFixed(1)

        const gradeDist = { A: 0, B: 0, C: 0, D: 0, F: 0 }
        scores.forEach(s => {
          const grade = s >= 8.5 ? 'A' : s >= 7.0 ? 'B' : s >= 5.5 ? 'C' : s >= 4.0 ? 'D' : 'F'
          gradeDist[grade]++
        })

        setStats({ total: validRecords.length, max, min, avg: avg.toFixed(1), passRate, gradeDist })

        const barData = {
          labels: ['A', 'B', 'C', 'D', 'F'],
          datasets: [{
            label: 'Số lượng sinh viên',
            data: [gradeDist.A, gradeDist.B, gradeDist.C, gradeDist.D, gradeDist.F],
            backgroundColor: ['#16a34a', '#2563eb', '#f59e0b', '#f97316', '#dc2626'],
            borderRadius: 6,
          }],
        }

        const doughnutData = {
          labels: ['Đạt (≥4.0)', 'Không đạt (<4.0)'],
          datasets: [{
            data: [passCount, scores.length - passCount],
            backgroundColor: ['#16a34a', '#dc2626'],
            borderWidth: 0,
          }],
        }

        setChartData({ bar: barData, doughnut: doughnutData })
      } catch (err) {
        console.error(err)
      }
    }
    loadData()
  }, [selectedLopId, selectedMonId])

  const exportPDF = () => {
    if (!stats || !selectedLopId || !selectedMonId) return
    const doc = new jsPDF()
    const lop = lops.find(l => l.id === Number(selectedLopId))
    const mon = monHocs.find(m => m.id === Number(selectedMonId))

    doc.setFontSize(18)
    doc.text('BÁO CÁO TỔNG HỢP KẾT QUẢ HỌC TẬP', 14, 20)
    doc.setFontSize(11)
    doc.text(`Lớp: ${lop?.ten ?? ''} - Môn: ${mon?.ten ?? ''} (${mon?.ma ?? ''})`, 14, 28)
    doc.text(`Ngày xuất: ${new Date().toLocaleDateString('vi-VN')}`, 14, 35)

    doc.setFontSize(12)
    doc.text('1. Thống kê chung', 14, 45)
    autoTable(doc, {
      startY: 50,
      head: [['Chỉ tiêu', 'Giá trị']],
      body: [
        ['Tổng sinh viên có điểm', stats.total],
        ['Điểm cao nhất', stats.max],
        ['Điểm thấp nhất', stats.min],
        ['Điểm trung bình', stats.avg],
        ['Tỷ lệ đạt (≥4.0)', `${stats.passRate}%`],
      ],
    })

    doc.text('2. Phân bố điểm chữ', 14, doc.lastAutoTable.finalY + 10)
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 15,
      head: [['Điểm chữ', 'Số lượng', 'Tỷ lệ (%)']],
      body: Object.entries(stats.gradeDist).map(([grade, count]) => [
        grade, count, ((count / stats.total) * 100).toFixed(1)
      ]),
    })

    if (chartRef.current) {
      const canvas = chartRef.current
      const imgData = canvas.toDataURL('image/png')
      doc.addPage()
      doc.text('3. Biểu đồ phân bố', 14, 20)
      doc.addImage(imgData, 'PNG', 14, 25, 180, 100)
    }

    const fileName = `BaoCao_${lop?.ten ?? ''}_${mon?.ma ?? ''}`.replace(/\s+/g, '_')
    doc.save(`${fileName}.pdf`)
  }

  if (loading) return <div className="loading">Đang tải...</div>
  if (error) return <div className="alert alert-error" role="alert">{error}</div>

  const statCards = stats ? [
    { label: 'Tổng SV', value: stats.total, icon: 'users', color: '#2563eb' },
    { label: 'Điểm cao nhất', value: stats.max, icon: 'trendingUp', color: '#16a34a' },
    { label: 'Điểm thấp nhất', value: stats.min, icon: 'trendingDown', color: '#dc2626' },
    { label: 'Điểm TB', value: stats.avg, icon: 'barChart2', color: '#f59e0b' },
    { label: 'Tỷ lệ đạt', value: `${stats.passRate}%`, icon: 'checkCircle', color: '#16a34a' },
  ] : []

  return (
    <>
      <div className="page">
        <div className="page-header">
          <h2>Báo cáo tổng hợp kết quả học tập</h2>
          <p className="muted">Thống kê, biểu đồ và xuất báo cáo PDF</p>
        </div>

        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <div className="toolbar" style={{ flexWrap: 'wrap', gap: '1rem' }}>
            <div className="form-group" style={{ margin: 0, minWidth: '220px' }}>
              <label className="form-label">Lớp học</label>
              <select className="form-select" value={selectedLopId} onChange={e => setSelectedLopId(e.target.value)} style={{ width: '100%' }}>
                <option value="">— Chọn lớp —</option>
                {lops.map(lop => <option key={lop.id} value={lop.id}>{lop.ten} ({lop.namHoc})</option>)}
              </select>
            </div>
            <div className="form-group" style={{ margin: 0, minWidth: '220px' }}>
              <label className="form-label">Môn học</label>
              <select className="form-select" value={selectedMonId} onChange={e => setSelectedMonId(e.target.value)} style={{ width: '100%' }}>
                <option value="">— Chọn môn —</option>
                {monHocs.map(mon => <option key={mon.id} value={mon.id}>{mon.ten} ({mon.ma})</option>)}
              </select>
            </div>
            {stats && (
              <button className="btn btn-primary" onClick={exportPDF} style={{ marginLeft: 'auto', alignSelf: 'flex-end' }}>
                <Icon name="download" size={16} /> Xuất PDF
              </button>
            )}
          </div>
        </div>

        {stats && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            {statCards.map((c, i) => (
              <div key={i} className="card" style={{ textAlign: 'center', padding: '1.25rem' }}>
                <Icon name={c.icon} size={24} style={{ color: c.color, marginBottom: '0.5rem' }} />
                <div style={{ fontSize: '1.75rem', fontWeight: '700', color: c.color }}>{c.value}</div>
                <div style={{ fontSize: '0.875rem', color: '#64748b' }}>{c.label}</div>
              </div>
            ))}
          </div>
        )}

        {chartData && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div className="card">
              <div className="card-header"><h3>Phân bố điểm chữ</h3></div>
              <div className="card-body" style={{ height: '300px' }}>
                <Bar ref={chartRef} data={chartData.bar} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
              </div>
            </div>
            <div className="card">
              <div className="card-header"><h3>Tỷ lệ đạt / Không đạt</h3></div>
              <div className="card-body" style={{ height: '300px' }}>
                <Doughnut data={chartData.doughnut} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }} />
              </div>
            </div>
          </div>
        )}

        {stats && (
          <div className="card">
            <div className="card-header"><h3>Phân bố chi tiết</h3></div>
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Điểm chữ</th>
                    <th>Số lượng</th>
                    <th>Tỷ lệ (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(stats.gradeDist).map(([grade, count]) => (
                    <tr key={grade}>
                      <td><span className="badge badge-info">{grade}</span></td>
                      <td>{count}</td>
                      <td>{((count / stats.total) * 100).toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
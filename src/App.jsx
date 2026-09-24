import './App.css'

function App() {
  return (
    <div className="app">
      <main className="app-shell">
        <h1>Ứng dụng Quản lý điểm</h1>
        <p>
          Hệ thống quản lý nhập liệu và báo cáo điểm cho giáo viên — thay thế
          quy trình nhập, quản lý, tra cứu và xuất báo cáo điểm thủ công.
        </p>
        <section className="roles">
          <article>
            <h2>Giáo viên</h2>
            <ul>
              <li>Xem lớp và danh sách sinh viên được phân công</li>
              <li>Nhập, sửa và tra cứu điểm</li>
              <li>Xuất bảng điểm / báo cáo</li>
            </ul>
          </article>
          <article>
            <h2>Quản trị viên</h2>
            <ul>
              <li>Quản lý lớp, sinh viên, môn học</li>
              <li>Quản lý tài khoản giáo viên</li>
              <li>Phân quyền</li>
            </ul>
          </article>
        </section>
        <p className="reference">
          Xem đặc tả chi tiết tại <code>WHITEBOOK.md</code>.
        </p>
      </main>
    </div>
  )
}

export default App
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider.jsx'
import Layout from './components/Layout.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import LandingPage from './pages/LandingPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ClassListPage from './pages/ClassListPage.jsx'
import StudentListPage from './pages/StudentListPage.jsx'
import ScoreEntryPage from './pages/ScoreEntryPage.jsx'
import { ROLES } from './constants/roles.js'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route
              path="lop"
              element={
                <ProtectedRoute roles={[ROLES.GIAO_VIEN, ROLES.ADMIN]}>
                  <ClassListPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="lop/:id"
              element={
                <ProtectedRoute roles={[ROLES.GIAO_VIEN, ROLES.ADMIN]}>
                  <StudentListPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="lop/:id/diem"
              element={
                <ProtectedRoute roles={[ROLES.GIAO_VIEN, ROLES.ADMIN]}>
                  <ScoreEntryPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

function NotFound() {
  return (
    <section className="page">
      <h2>404 — Không tìm thấy trang</h2>
      <p className="muted">Trang bạn yêu cầu không tồn tại.</p>
    </section>
  )
}

export default App
import { loadDb, saveDb } from '../db/store.js'
import { ROLES } from '../constants/roles.js'

function delay(value, ms = 250) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms))
}

function now() {
  return new Date().toISOString()
}

export function listTaiKhoans() {
  const db = loadDb()
  return delay(db.users.map((u) => ({ ...u })))
}

export function listGiaoViens() {
  const db = loadDb()
  return delay(db.users.filter((u) => u.role === 'GIAO_VIEN').map((u) => ({ ...u })))
}

export function listQuanLys() {
  const db = loadDb()
  return delay(db.users.filter((u) => u.role === 'QUAN_LY').map((u) => ({ ...u })))
}

export function getTaiKhoan(id) {
  const db = loadDb()
  const user = db.users.find((u) => u.id === Number(id))
  if (!user) return delay(null)
  return delay({ ...user })
}

export function createTaiKhoan(payload) {
  const db = loadDb()
  if (db.users.some((u) => u.username === payload.username)) {
    return delay({ error: 'Tên đăng nhập đã tồn tại' })
  }
  const id = Math.max(0, ...db.users.map((u) => u.id)) + 1
  const user = {
    id,
    username: payload.username,
    password: payload.password,
    role: payload.role,
    name: payload.name,
    giaoVienId: payload.role === 'GIAO_VIEN' ? id : null,
    active: true,
    createdAt: new Date().toISOString(),
  }
  db.users.push(user)
  saveDb(db)
  return delay({ ...user })
}

export function updateTaiKhoan(id, payload) {
  const db = loadDb()
  const idx = db.users.findIndex((u) => u.id === Number(id))
  if (idx < 0) return delay(null)
  if (payload.username && db.users.some((u) => u.username === payload.username && u.id !== Number(id))) {
    return delay({ error: 'Tên đăng nhập đã tồn tại' })
  }
  const updated = { ...db.users[idx], ...payload }
  if (updated.role === 'GIAO_VIEN' && !updated.giaoVienId) {
    updated.giaoVienId = updated.id
  } else if (updated.role !== 'GIAO_VIEN') {
    updated.giaoVienId = null
  }
  db.users[idx] = updated
  saveDb(db)
  return delay({ ...updated })
}

export function deleteTaiKhoan(id) {
  const db = loadDb()
  const quanLyCount = db.users.filter((u) => u.role === 'QUAN_LY').length
  const target = db.users.find((u) => u.id === Number(id))
  if (target?.role === 'QUAN_LY' && quanLyCount <= 1) {
    return delay({ error: 'Không thể xóa người quản lý cuối cùng' })
  }
  const idx = db.users.findIndex((u) => u.id === Number(id))
  if (idx >= 0) db.users.splice(idx, 1)
  saveDb(db)
  return delay(true)
}

export function resetPassword(id, newPassword) {
  const db = loadDb()
  const idx = db.users.findIndex((u) => u.id === Number(id))
  if (idx < 0) return delay(null)
  db.users[idx].password = newPassword
  saveDb(db)
  return delay({ ...db.users[idx] })
}

export function toggleActive(id) {
  const db = loadDb()
  const idx = db.users.findIndex((u) => u.id === Number(id))
  if (idx < 0) return delay(null)
  db.users[idx].active = !db.users[idx].active
  saveDb(db)
  return delay({ ...db.users[idx] })
}

export function setRole(id, role) {
  const db = loadDb()
  const idx = db.users.findIndex((u) => u.id === Number(id))
  if (idx < 0) return delay(null)
  if (role === 'QUAN_LY') {
    const quanLyCount = db.users.filter((u) => u.role === 'QUAN_LY').length
    if (quanLyCount >= 3) return delay({ error: 'Đã đạt số lượng người quản lý tối đa' })
  }
  db.users[idx].role = role
  if (role === 'GIAO_VIEN' && !db.users[idx].giaoVienId) {
    db.users[idx].giaoVienId = db.users[idx].id
  } else if (role !== 'GIAO_VIEN') {
    db.users[idx].giaoVienId = null
  }
  saveDb(db)
  return delay({ ...db.users[idx] })
}

export function toggleActiveStatus(id) {
  const db = loadDb()
  const idx = db.users.findIndex((u) => u.id === Number(id))
  if (idx < 0) return delay(null)
  db.users[idx].active = !db.users[idx].active
  saveDb(db)
  return delay({ ...db.users[idx] })
}
import { loadDb, saveDb } from '../db/store.js'

function delay(value, ms = 250) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms))
}

function now() {
  return new Date().toISOString()
}

export function listSinhViens() {
  const db = loadDb()
  return delay(db.sinhViens.map((sv) => ({ ...sv })))
}

export function getSinhVien(id) {
  const db = loadDb()
  const sv = db.sinhViens.find((sv) => sv.id === Number(id))
  if (!sv) return delay(null)
  return delay({ ...sv })
}

export function createSinhVien(payload) {
  const db = loadDb()
  if (db.sinhViens.some((sv) => sv.ma === payload.ma)) {
    return delay({ error: 'Mã sinh viên đã tồn tại' })
  }
  const id = Math.max(0, ...db.sinhViens.map((sv) => sv.id)) + 1
  const sv = { id, ...payload, lopId: Number(payload.lopId) }
  db.sinhViens.push(sv)
  saveDb(db)
  return delay({ ...sv })
}

export function updateSinhVien(id, payload) {
  const db = loadDb()
  const idx = db.sinhViens.findIndex((sv) => sv.id === Number(id))
  if (idx < 0) return delay(null)
  if (payload.ma && db.sinhViens.some((sv) => sv.ma === payload.ma && sv.id !== Number(id))) {
    return delay({ error: 'Mã sinh viên đã tồn tại' })
  }
  db.sinhViens[idx] = { ...db.sinhViens[idx], ...payload, lopId: Number(payload.lopId) }
  saveDb(db)
  return delay({ ...db.sinhViens[idx] })
}

export function deleteSinhVien(id) {
  const db = loadDb()
  const idx = db.sinhViens.findIndex((sv) => sv.id === Number(id))
  if (idx >= 0) db.sinhViens.splice(idx, 1)
  const diemIdx = db.diems.findIndex((d) => d.sinhVienId === Number(id))
  if (diemIdx >= 0) db.diems.splice(diemIdx, 1)
  saveDb(db)
  return delay(true)
}

export function transferSinhVien(id, newLopId) {
  const db = loadDb()
  const idx = db.sinhViens.findIndex((sv) => sv.id === Number(id))
  if (idx < 0) return delay(null)
  db.sinhViens[idx].lopId = Number(newLopId)
  saveDb(db)
  return delay({ ...db.sinhViens[idx] })
}

export function importSinhViens(list) {
  const db = loadDb()
  const results = []
  for (const item of list) {
    if (db.sinhViens.some((sv) => sv.ma === item.ma)) continue
    const id = Math.max(0, ...db.sinhViens.map((sv) => sv.id)) + 1
    const sv = { id, ma: item.ma, hoTen: item.hoTen, lopId: item.lopId }
    db.sinhViens.push(sv)
    results.push(sv)
  }
  saveDb(db)
  return delay(results)
}
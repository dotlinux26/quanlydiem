import { loadDb, saveDb } from '../db/store.js'

function delay(value, ms = 250) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms))
}

function now() {
  return new Date().toISOString()
}

export function listMonHocs() {
  const db = loadDb()
  return delay(db.monHocs.map((mh) => ({ ...mh })))
}

export function getMonHoc(id) {
  const db = loadDb()
  const mh = db.monHocs.find((mh) => mh.id === Number(id))
  if (!mh) return delay(null)
  return delay({ ...mh })
}

export function createMonHoc(payload) {
  const db = loadDb()
  if (db.monHocs.some((mh) => mh.ma === payload.ma)) {
    return delay({ error: 'Mã môn học đã tồn tại' })
  }
  const id = Math.max(0, ...db.monHocs.map((mh) => mh.id)) + 1
  const mh = { id, ...payload, soTinChi: Number(payload.soTinChi) }
  db.monHocs.push(mh)
  saveDb(db)
  return delay({ ...mh })
}

export function updateMonHoc(id, payload) {
  const db = loadDb()
  const idx = db.monHocs.findIndex((mh) => mh.id === Number(id))
  if (idx < 0) return delay(null)
  if (payload.ma && db.monHocs.some((mh) => mh.ma === payload.ma && mh.id !== Number(id))) {
    return delay({ error: 'Mã môn học đã tồn tại' })
  }
  db.monHocs[idx] = { ...db.monHocs[idx], ...payload, soTinChi: Number(payload.soTinChi) }
  saveDb(db)
  return delay({ ...db.monHocs[idx] })
}

export function deleteMonHoc(id) {
  const db = loadDb()
  const idx = db.monHocs.findIndex((mh) => mh.id === Number(id))
  if (idx >= 0) db.monHocs.splice(idx, 1)
  const diemIdx = db.diems.findIndex((d) => d.monHocId === Number(id))
  if (diemIdx >= 0) db.diems.splice(diemIdx, 1)
  saveDb(db)
  return delay(true)
}

export function getMonHocById(id) {
  const db = loadDb()
  const mh = db.monHocs.find((mh) => mh.id === Number(id))
  if (!mh) return delay(null)
  return delay({ ...mh })
}
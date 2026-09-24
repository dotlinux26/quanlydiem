import { createSeed } from './seed.js'

const DB_KEY = 'quanlydiem_db_v2'

export function loadDb() {
  try {
    const raw = localStorage.getItem(DB_KEY)
    if (!raw) return createSeed()
    const db = JSON.parse(raw)
    if (!Array.isArray(db.lops) || !Array.isArray(db.sinhViens)) {
      throw new Error('dữ liệu không đúng cấu trúc')
    }
    return db
  } catch {
    const seed = createSeed()
    saveDb(seed)
    return seed
  }
}

export function saveDb(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db))
}

export function resetDb() {
  const seed = createSeed()
  saveDb(seed)
  return seed
}
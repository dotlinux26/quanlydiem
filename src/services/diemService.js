import { loadDb, saveDb } from '../db/store.js'
import { calcSummary, isValidScore } from '../utils/score.js'

function delay(value, ms = 250) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms))
}

function now() {
  return new Date().toISOString()
}

export function listDiems({ lopId, monHocId }) {
  const db = loadDb()
  return delay(
    db.diems
      .filter(
        (d) =>
          d.lopId === Number(lopId) && d.monHocId === Number(monHocId),
      )
      .map((d) => ({ ...d })),
  )
}

export function saveDiem(payload) {
  const db = loadDb()
  const id = payload.id ?? Math.max(0, ...db.diems.map((d) => d.id)) + 1
  const existing = db.diems.find((d) => d.id === id)
  const scores = {
    thuongKy: payload.thuongKy,
    giuaKy: payload.giuaKy,
    cuoiKy: payload.cuoiKy,
  }
  const tongKet = calcSummary(scores)
  if (!isValidScore(tongKet)) throw new Error('Điểm không hợp lệ')

  const record = {
    id,
    sinhVienId: payload.sinhVienId,
    monHocId: payload.monHocId,
    lopId: payload.lopId,
    ...scores,
    tongKet,
    createdAt: existing?.createdAt ?? now(),
    updatedAt: now(),
  }
  if (existing) {
    Object.assign(existing, record)
  } else {
    db.diems.push(record)
  }
  saveDb(db)
  return delay({ ...record })
}

export function removeDiem(id) {
  const db = loadDb()
  const idx = db.diems.findIndex((d) => d.id === Number(id))
  if (idx >= 0) db.diems.splice(idx, 1)
  saveDb(db)
  return delay(true)
}
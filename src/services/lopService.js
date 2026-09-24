import { loadDb } from '../db/store.js'
import { ROLES } from '../constants/roles.js'

function delay(value, ms = 250) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms))
}

export function listLops(user) {
  const db = loadDb()
  let lops = db.lops
  if (user?.role === ROLES.GIAO_VIEN) {
    lops = lops.filter((lop) => lop.giaoVienId === user.id)
  }
  return delay([...lops])
}

export function getLop(id, user) {
  const db = loadDb()
  const lop = db.lops.find((l) => l.id === Number(id))
  if (!lop) return delay(null)
  if (user?.role === ROLES.GIAO_VIEN && lop.giaoVienId !== user.id) {
    return delay(null)
  }
  return delay({ ...lop })
}

export function listSinhViens(lopId) {
  const db = loadDb()
  return delay(
    db.sinhViens
      .filter((sv) => sv.lopId === Number(lopId))
      .map((sv) => ({ ...sv })),
  )
}

export function listMonHocs() {
  const db = loadDb()
  return delay(db.monHocs.map((m) => ({ ...m })))
}
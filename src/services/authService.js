import { loadDb, saveDb } from '../db/store.js'

const USER_KEY = 'quanlydiem_current_user'

function delay(value, ms = 300) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms))
}

export function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY)) || null
  } catch {
    return null
  }
}

export function login(username, password) {
  const db = loadDb()
  const user = db.users.find(
    (u) =>
      u.username === String(username ?? '').trim() &&
      u.password === String(password ?? ''),
  )
  if (!user) {
    return delay(null)
  }
  const session = { id: user.id, username: user.username, role: user.role, name: user.name }
  localStorage.setItem(USER_KEY, JSON.stringify(session))
  return delay(session)
}

export function logout() {
  localStorage.removeItem(USER_KEY)
}

export function createAccount(account) {
  const db = loadDb()
  const id = Math.max(0, ...db.users.map((u) => u.id)) + 1
  db.users.push({ id, ...account })
  saveDb(db)
  return delay({ id, ...account })
}
import { loadDb, saveDb } from '../db/store.js'
import bcrypt from 'bcryptjs'

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

export async function login(username, password) {
  const db = loadDb()
  const user = db.users.find(
    (u) => u.username === String(username ?? '').trim()
  )
  if (!user) {
    return delay(null)
  }
  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    return delay(null)
  }
  const session = { id: user.id, username: user.username, role: user.role, name: user.name }
  localStorage.setItem(USER_KEY, JSON.stringify(session))
  return delay(session)
}

export function logout() {
  localStorage.removeItem(USER_KEY)
}

export async function createAccount(account) {
  const db = loadDb()
  if (db.users.some((u) => u.username === account.username)) {
    return delay({ error: 'Tên đăng nhập đã tồn tại' })
  }
  const id = Math.max(0, ...db.users.map((u) => u.id)) + 1
  const hashedPassword = await bcrypt.hash(account.password, 10)
  const user = { id, ...account, password: hashedPassword }
  db.users.push(user)
  saveDb(db)
  return delay({ id, username: user.username, role: user.role, name: user.name })
}
import { useState, useCallback } from 'react'
import { AuthContext } from './authContext.js'
import * as authService from '../services/authService.js'
import { ROLES } from '../constants/roles.js'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => authService.getCurrentUser())

  const login = useCallback(async (username, password) => {
    const session = await authService.login(username, password)
    setUser(session)
    return session
  }, [])

  const logout = useCallback(() => {
    authService.logout()
    setUser(null)
  }, [])

  const value = {
    user,
    isAuthed: Boolean(user),
    isQuanLy: user?.role === ROLES.QUAN_LY,
    isGiaoVien: user?.role === ROLES.GIAO_VIEN,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
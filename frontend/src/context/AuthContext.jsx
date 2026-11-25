import { createContext, useContext, useState } from 'react'
const AuthContext = createContext(null)
export function AuthProvider({ children }) {
  // Prototype: demo role selection. Replace with backend /auth/login response.
  const [user, setUser] = useState({ id: 1, name: 'Demo User', role: 'ngo', token: null })
  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
}
export const useAuth = () => useContext(AuthContext)
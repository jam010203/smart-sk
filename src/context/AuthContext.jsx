import { createContext, useContext, useState, useEffect } from 'react'
import { getAccounts } from '../lib/supabase'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('skUser')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        localStorage.removeItem('skUser')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    if (email === 'inovision@sklgu.gov.ph' && password === 'admin123') {
      const adminUser = {
        email: 'inovision@sklgu.gov.ph',
        role: 'admin',
        name: 'Admin'
      }
      setUser(adminUser)
      localStorage.setItem('skUser', JSON.stringify(adminUser))
      return { success: true }
    }

    const accounts = await getAccounts()
    const account = accounts.find(acc =>
      acc.email === email && acc.password === password
    )

    if (account) {
      const userData = {
        email: account.email,
        role: 'user',
        name: account.name || account.email.split('@')[0]
      }
      setUser(userData)
      localStorage.setItem('skUser', JSON.stringify(userData))
      return { success: true }
    }

    return { success: false, message: 'Invalid credentials' }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('skUser')
  }

  const value = {
    user,
    login,
    logout,
    loading
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

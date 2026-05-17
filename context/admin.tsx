'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

interface AdminContextType {
  isLoggedIn: boolean
  login: (password: string) => boolean
  logout: () => void
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  // Check session on mount
  useEffect(() => {
    const adminSession = localStorage.getItem('adminSession')
    if (adminSession === 'true') {
      setIsLoggedIn(true)
    }
    setIsHydrated(true)
  }, [])

  const login = (password: string) => {
    if (password === 'owner123') {
      setIsLoggedIn(true)
      localStorage.setItem('adminSession', 'true')
      return true
    }
    return false
  }

  const logout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('adminSession')
  }

  if (!isHydrated) {
    return <>{children}</>
  }

  return (
    <AdminContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error('useAdmin must be used within AdminProvider')
  }
  return context
}

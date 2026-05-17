'use client'

import React from 'react'
import { AdminProvider } from '@/context/admin'

export const dynamic = 'force-dynamic'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      {children}
    </AdminProvider>
  )
}


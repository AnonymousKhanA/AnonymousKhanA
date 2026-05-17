'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAdmin } from '@/context/admin'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { Lock } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const { login, isLoggedIn } = useAdmin()

  if (isLoggedIn) {
    router.push('/admin/dashboard')
    return null
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (login(password)) {
      router.push('/admin/dashboard')
    } else {
      setError('Invalid password')
      setPassword('')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-lg border border-border p-8 shadow-lg">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Lock className="w-10 h-10 text-secondary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
            <p className="text-sm text-muted-foreground mt-2">Khan Store Management</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <Input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError('')
                }}
                className="w-full"
              />
            </div>

            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/50 rounded text-sm text-destructive">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
              Login to Dashboard
            </Button>
          </form>

          {/* Back Link */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition"
            >
              Back to Store
            </Link>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-card rounded-lg border border-border text-center text-xs text-muted-foreground">
          Admin access only. Owner login required.
        </div>
      </div>
    </div>
  )
}

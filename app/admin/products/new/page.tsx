'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAdmin } from '@/context/admin'
import { useAdminProducts } from '@/hooks/use-admin-products'
import { ProductForm } from '@/components/product-form'
import { Product } from '@/lib/products'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function AddProductPage() {
  const router = useRouter()
  const { isLoggedIn } = useAdmin()
  const { addProduct } = useAdminProducts()

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/admin/login')
    }
  }, [isLoggedIn, router])

  const handleSubmit = (product: Product) => {
    addProduct(product)
    router.push('/admin/dashboard')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-3xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Add New Product</h1>
              <p className="text-sm text-muted-foreground">Create a new product for Khan Store</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-card rounded-lg border border-border p-6">
          <ProductForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  )
}

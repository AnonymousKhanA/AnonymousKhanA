'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAdmin } from '@/context/admin'
import { useAdminProducts } from '@/hooks/use-admin-products'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft, AlertCircle } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function DeleteProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { isLoggedIn } = useAdmin()
  const { products, deleteProduct } = useAdminProducts()
  const [product, setProduct] = useState<any>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/admin/login')
      return
    }

    const foundProduct = products.find((p) => p.id === params.id)
    if (foundProduct) {
      setProduct(foundProduct)
    } else {
      router.push('/admin/dashboard')
    }
  }, [isLoggedIn, products, params.id, router])

  const handleDelete = async () => {
    setIsDeleting(true)
    deleteProduct(params.id)
    await new Promise((resolve) => setTimeout(resolve, 500))
    router.push('/admin/dashboard')
  }

  if (!product) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-2xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Delete Product</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-card rounded-lg border border-border p-8">
          <div className="flex gap-4">
            <AlertCircle className="w-12 h-12 text-destructive flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h2 className="text-xl font-bold text-foreground mb-2">Delete &quot;{product.name}&quot;?</h2>
              <p className="text-muted-foreground mb-6">
                This action cannot be undone. The product will be permanently removed from Khan Store.
              </p>

              <div className="bg-muted rounded p-4 mb-6 text-sm">
                <p className="text-foreground">
                  <strong>Product:</strong> {product.name}
                </p>
                <p className="text-foreground">
                  <strong>Category:</strong> {product.category}
                </p>
                <p className="text-foreground">
                  <strong>Price:</strong> Rs. {product.price.toLocaleString()}
                </p>
              </div>

              <div className="flex gap-3">
                <Link href="/admin/dashboard">
                  <Button variant="outline">Cancel</Button>
                </Link>
                <Button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {isDeleting ? 'Deleting...' : 'Delete Product'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

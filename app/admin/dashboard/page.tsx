'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAdmin } from '@/context/admin'
import { useAdminProducts } from '@/hooks/use-admin-products'
import { Button } from '@/components/ui/button'
import { LogOut, Plus, Pencil, Trash2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { CATEGORIES } from '@/lib/products'

export const dynamic = 'force-dynamic'

export default function AdminDashboard() {
  const router = useRouter()
  const { isLoggedIn, logout } = useAdmin()
  const { products, isLoaded } = useAdminProducts()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  useEffect(() => {
    if (isLoaded && !isLoggedIn) {
      router.push('/admin/login')
    }
  }, [isLoggedIn, isLoaded, router])

  if (!isLoaded) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!isLoggedIn) {
    return null
  }

  const filteredProducts =
    selectedCategory === 'all' ? products : products.filter((p) => p.category === selectedCategory)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">Manage Khan Store Products</p>
            </div>
            <div className="flex gap-3">
              <Link href="/admin/products/new">
                <Button className="gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  <Plus className="w-4 h-4" />
                  Add Product
                </Button>
              </Link>
              <Button
                onClick={() => {
                  logout()
                  router.push('/')
                }}
                variant="outline"
                className="gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-foreground mb-3">Filter by Category</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded border transition ${
                selectedCategory === 'all'
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card border-border hover:border-primary text-foreground'
              }`}
            >
              All Products
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded border transition ${
                  selectedCategory === cat.id
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-card border-border hover:border-primary text-foreground'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Image</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                      No products found
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b border-border hover:bg-muted/50 transition">
                      <td className="px-6 py-4">
                        <div className="w-10 h-10 relative rounded overflow-hidden bg-muted">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-foreground text-sm">{product.name}</td>
                      <td className="px-6 py-4 text-sm text-foreground">Rs. {product.price.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm">
                        {product.stock === 0 ? (
                          <span className="inline-block px-2 py-1 bg-destructive/10 text-destructive text-xs rounded font-semibold">
                            Out of Stock
                          </span>
                        ) : product.stock <= 5 ? (
                          <span className="inline-block px-2 py-1 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 text-xs rounded font-semibold">
                            {product.stock} left
                          </span>
                        ) : (
                          <span className="inline-block px-2 py-1 bg-green-500/10 text-green-700 dark:text-green-400 text-xs rounded font-semibold">
                            {product.stock} in stock
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground">
                        {CATEGORIES.find((c) => c.id === product.category)?.name || product.category}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex gap-2">
                          <Link href={`/admin/products/${product.id}/edit`}>
                            <Button size="sm" variant="outline" className="gap-1">
                              <Pencil className="w-3 h-3" />
                              Edit
                            </Button>
                          </Link>
                          <Link href={`/admin/products/${product.id}/delete`}>
                            <Button size="sm" variant="outline" className="gap-1 text-destructive hover:text-destructive">
                              <Trash2 className="w-3 h-3" />
                              Delete
                            </Button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-card rounded-lg border border-border p-6">
            <p className="text-sm text-muted-foreground mb-1">Total Products</p>
            <p className="text-3xl font-bold text-foreground">{products.length}</p>
          </div>
          <div className="bg-card rounded-lg border border-border p-6">
            <p className="text-sm text-muted-foreground mb-1">In Stock</p>
            <p className="text-3xl font-bold text-green-600">
              {products.filter((p) => p.stock > 0).length}
            </p>
          </div>
          <div className="bg-card rounded-lg border border-border p-6">
            <p className="text-sm text-muted-foreground mb-1">Out of Stock</p>
            <p className="text-3xl font-bold text-destructive">
              {products.filter((p) => p.stock === 0).length}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

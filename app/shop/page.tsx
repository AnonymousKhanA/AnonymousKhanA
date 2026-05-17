'use client'

import { useState, useMemo } from 'react'
import { PRODUCTS, CATEGORIES } from '@/lib/products'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured')
  const [showFilters, setShowFilters] = useState(false)

  const filteredAndSortedProducts = useMemo(() => {
    let products = selectedCategory
      ? PRODUCTS.filter((p) => p.category === selectedCategory)
      : PRODUCTS

    switch (sortBy) {
      case 'price-low':
        products = [...products].sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        products = [...products].sort((a, b) => b.price - a.price)
        break
      case 'rating':
        products = [...products].sort((a, b) => b.rating - a.rating)
        break
      default:
        break
    }

    return products
  }, [selectedCategory, sortBy])

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-primary text-primary-foreground py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold">Shop</h1>
          <p className="mt-2 opacity-90">Discover our complete collection of premium products</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
            <div className="bg-card border border-border rounded-lg p-6 sticky top-20">
              <div className="flex items-center justify-between mb-4 lg:mb-0">
                <h3 className="font-bold text-lg text-foreground">Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              </div>

              {/* Categories Filter */}
              <div className="mb-6 mt-6">
                <h4 className="font-semibold text-foreground mb-3">Categories</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left px-3 py-2 rounded transition ${
                      selectedCategory === null
                        ? 'bg-accent text-accent-foreground font-semibold'
                        : 'hover:bg-muted text-foreground'
                    }`}
                  >
                    All Products
                  </button>
                  {CATEGORIES.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded transition ${
                        selectedCategory === category.id
                          ? 'bg-accent text-accent-foreground font-semibold'
                          : 'hover:bg-muted text-foreground'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div className="mt-6 pt-6 border-t border-border">
                <h4 className="font-semibold text-foreground mb-3">Sort By</h4>
                <div className="space-y-2">
                  {[
                    { value: 'featured', label: 'Featured' },
                    { value: 'price-low', label: 'Price: Low to High' },
                    { value: 'price-high', label: 'Price: High to Low' },
                    { value: 'rating', label: 'Highest Rating' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSortBy(option.value as typeof sortBy)}
                      className={`w-full text-left px-3 py-2 rounded transition ${
                        sortBy === option.value
                          ? 'bg-accent text-accent-foreground font-semibold'
                          : 'hover:bg-muted text-foreground'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={() => {
                  setSelectedCategory(null)
                  setSortBy('featured')
                }}
                variant="outline"
                className="w-full mt-6"
              >
                Reset Filters
              </Button>
            </div>
          </div>

          {/* Products Section */}
          <div className="lg:col-span-3">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-6">
              <Button
                onClick={() => setShowFilters(!showFilters)}
                className="w-full gap-2 bg-primary text-primary-foreground"
              >
                Show Filters
                <ChevronDown className="w-4 h-4" />
              </Button>
            </div>

            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Showing {filteredAndSortedProducts.length} products
              </p>
              {selectedCategory && (
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-sm text-accent hover:text-accent/80 underline"
                >
                  Clear Filter
                </button>
              )}
            </div>

            {/* Products Grid */}
            {filteredAndSortedProducts.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No products found. Try adjusting your filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

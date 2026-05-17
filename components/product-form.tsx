'use client'

import { useState } from 'react'
import { Product } from '@/lib/products'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

interface ProductFormProps {
  product?: Product
  onSubmit: (product: Product) => void
  isLoading?: boolean
}

export function ProductForm({ product, onSubmit, isLoading = false }: ProductFormProps) {
  const [formData, setFormData] = useState<Product>(
    product || {
      id: Date.now().toString(),
      name: '',
      price: 0,
      image: '',
      category: 'cosmetics',
      description: '',
      rating: 5,
      reviews: 0,
      stock: 10,
    }
  )

  const handleChange = (field: keyof Product, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const categories = [
    { id: 'cosmetics', name: 'Cosmetics & Beauty' },
    { id: 'mens-clothing', name: "Men's Clothing" },
    { id: 'womens-clothing', name: "Women's Clothing" },
    { id: 'perfumes', name: 'Perfumes' },
    { id: 'accessories', name: 'Accessories' },
    { id: 'trending', name: 'Trending Products' },
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Product Name</label>
          <Input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            required
            placeholder="e.g., Premium Lipstick"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Price (Rs.)</label>
          <Input
            type="number"
            value={formData.price}
            onChange={(e) => handleChange('price', parseInt(e.target.value))}
            required
            placeholder="1999"
            min="0"
          />
        </div>

        {/* Stock */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Stock Quantity</label>
          <Input
            type="number"
            value={formData.stock}
            onChange={(e) => handleChange('stock', parseInt(e.target.value))}
            required
            placeholder="10"
            min="0"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Category</label>
          <select
            value={formData.category}
            onChange={(e) => handleChange('category', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Rating (1-5)</label>
          <Input
            type="number"
            value={formData.rating}
            onChange={(e) => handleChange('rating', parseFloat(e.target.value))}
            min="1"
            max="5"
            step="0.1"
            placeholder="4.5"
          />
        </div>

        {/* Reviews */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Number of Reviews</label>
          <Input
            type="number"
            value={formData.reviews}
            onChange={(e) => handleChange('reviews', parseInt(e.target.value))}
            min="0"
            placeholder="100"
          />
        </div>
      </div>

      {/* Image URL */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Image URL</label>
        <Input
          type="url"
          value={formData.image}
          onChange={(e) => handleChange('image', e.target.value)}
          required
          placeholder="https://images.unsplash.com/..."
        />
        {formData.image && (
          <div className="mt-3 w-20 h-20 relative rounded overflow-hidden bg-muted">
            <img
              src={formData.image}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          </div>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          required
          placeholder="Describe the product..."
          rows={4}
          className="w-full px-3 py-2 border border-border rounded-md bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-3 justify-end">
        <Link href="/admin/dashboard">
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </Link>
        <Button type="submit" disabled={isLoading} className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
          {isLoading ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
        </Button>
      </div>
    </form>
  )
}

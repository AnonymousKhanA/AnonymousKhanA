'use client'

import Image from 'next/image'
import { Star, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/cart'
import { Product } from '@/lib/products'
import Link from 'next/link'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
  }

  return (
    <Link href={`/product/${product.id}`}>
      <div className="group bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
        {/* Image Container */}
        <div className="relative w-full aspect-square bg-muted overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2 bg-accent text-accent-foreground px-2 py-1 rounded text-xs font-semibold">
            On Sale
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">
            {product.category}
          </p>
          <h3 className="font-bold text-sm text-foreground mb-2 line-clamp-2 group-hover:text-primary transition">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating)
                      ? 'fill-accent text-accent'
                      : 'text-muted-foreground'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">({product.reviews})</span>
          </div>

          {/* Price */}
          <div className="mb-4">
            <div className="text-lg font-bold text-primary">
              Rs. {product.price.toLocaleString()}
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={(e) => {
              e.preventDefault()
              handleAddToCart()
            }}
            size="sm"
            className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <ShoppingBag className="w-4 h-4" />
            Add to Cart
          </Button>
        </div>
      </div>
    </Link>
  )
}

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/cart'
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react'

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛒</div>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-muted-foreground mb-8 text-lg">
              Start shopping to add items to your cart!
            </p>
            <Link href="/shop">
              <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                <ArrowLeft className="w-4 h-4" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-primary text-primary-foreground py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold">Shopping Cart</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-card border border-border rounded-lg p-4 flex gap-4"
                >
                  {/* Product Image */}
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <Link href={`/product/${item.id}`}>
                      <h3 className="font-semibold text-foreground hover:text-primary transition line-clamp-2">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-lg font-bold text-primary mt-2">
                      Rs. {item.price.toLocaleString()}
                    </p>
                  </div>

                  {/* Quantity & Remove */}
                  <div className="flex flex-col items-end justify-between">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 bg-muted rounded">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-accent/20 transition"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-accent/20 transition"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-destructive hover:text-destructive/80 transition mt-2"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping */}
            <Link href="/shop" className="inline-block mt-6">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Continue Shopping
              </Button>
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-20">
              <h2 className="text-xl font-bold text-foreground mb-6">
                Order Summary
              </h2>

              {/* Subtotal */}
              <div className="flex justify-between mb-3 text-muted-foreground">
                <span>Subtotal:</span>
                <span>Rs. {total.toLocaleString()}</span>
              </div>

              {/* Shipping */}
              <div className="flex justify-between mb-3 text-muted-foreground">
                <span>Shipping:</span>
                <span className="text-green-600 font-semibold">Free</span>
              </div>

              {/* Tax Notice */}
              <div className="flex justify-between mb-6 pb-6 border-b border-border text-muted-foreground">
                <span>Tax:</span>
                <span>Included</span>
              </div>

              {/* Total */}
              <div className="flex justify-between mb-6">
                <span className="text-lg font-bold text-foreground">Total:</span>
                <span className="text-2xl font-bold text-primary">
                  Rs. {total.toLocaleString()}
                </span>
              </div>

              {/* Checkout Button */}
              <Link href="/checkout" className="w-full">
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mb-3">
                  Proceed to Checkout
                </Button>
              </Link>

              {/* WhatsApp Order Button */}
              <a
                href={`https://wa.me/923156240776?text=I want to order from Khan Store. Total: Rs. ${total.toLocaleString()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button variant="outline" className="w-full">
                  Order via WhatsApp
                </Button>
              </a>

              {/* Clear Cart Button */}
              <button
                onClick={() => clearCart()}
                className="w-full mt-4 text-destructive text-sm hover:text-destructive/80 transition"
              >
                Clear Cart
              </button>

              {/* Info */}
              <p className="text-xs text-muted-foreground mt-6 text-center">
                Nationwide COD Available | Fast Delivery
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

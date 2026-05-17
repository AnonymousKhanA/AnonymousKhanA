'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/cart'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, clearCart } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    address: '',
    city: '',
    paymentMethod: 'cod',
  })

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛒</div>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-muted-foreground mb-8 text-lg">
              Add items to your cart before checking out.
            </p>
            <Link href="/shop">
              <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                <ArrowLeft className="w-4 h-4" />
                Back to Shop
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-card border border-border rounded-lg p-8 md:p-12 text-center">
            <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Order Placed Successfully!
            </h1>
            <p className="text-muted-foreground mb-8 text-lg">
              Thank you for your order. Your order has been received and will be processed shortly.
            </p>

            <div className="bg-muted/50 rounded-lg p-6 mb-8 text-left">
              <h3 className="font-bold text-foreground mb-4">Order Details:</h3>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground">Name:</span> {formData.fullName}
                </p>
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground">Phone:</span> {formData.phoneNumber}
                </p>
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground">Address:</span> {formData.address}, {formData.city}
                </p>
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground">Total Amount:</span> Rs. {total.toLocaleString()}
                </p>
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground">Payment Method:</span> Cash on Delivery
                </p>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-8 text-left">
              <p className="text-sm text-blue-900 dark:text-blue-100">
                <span className="font-semibold">Next Steps:</span> We will contact you shortly to confirm your delivery details. You can also contact us on WhatsApp for quick updates.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Continue Shopping
                </Button>
              </Link>
              <a
                href="https://wa.me/923156240776"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline">
                  Contact on WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setOrderPlaced(true)
      clearCart()
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-primary text-primary-foreground py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold">Checkout</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Delivery Information
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground"
                    placeholder="Your full name"
                    required
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-foreground mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground"
                    placeholder="+92 300 1234567"
                    required
                  />
                </div>

                {/* City */}
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-foreground mb-2">
                    City *
                  </label>
                  <select
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground"
                    required
                  >
                    <option value="">Select City</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                    <option value="Multan">Multan</option>
                    <option value="Faisalabad">Faisalabad</option>
                    <option value="Peshawar">Peshawar</option>
                    <option value="Quetta">Quetta</option>
                    <option value="Other">Other City</option>
                  </select>
                </div>

                {/* Address */}
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-foreground mb-2">
                    Delivery Address *
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground"
                    placeholder="Enter your complete delivery address"
                    required
                  ></textarea>
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Payment Method
                  </label>
                  <div className="bg-accent/10 border border-accent rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        id="cod"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleChange}
                      />
                      <label htmlFor="cod" className="flex-1 cursor-pointer">
                        <p className="font-semibold text-foreground">Cash on Delivery</p>
                        <p className="text-sm text-muted-foreground">
                          Pay when you receive your order. Available nationwide in Pakistan.
                        </p>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                >
                  {isSubmitting ? 'Processing...' : 'Place Order'}
                </Button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-20">
              <h2 className="text-xl font-bold text-foreground mb-6">
                Order Summary
              </h2>

              {/* Items */}
              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground line-clamp-1">
                      {item.name} x {item.quantity}
                    </span>
                    <span className="font-semibold text-foreground">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 pb-6 border-b border-border">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal:</span>
                  <span>Rs. {total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping:</span>
                  <span className="text-green-600 font-semibold">Free</span>
                </div>
              </div>

              {/* Grand Total */}
              <div className="flex justify-between mt-6 mb-6">
                <span className="text-lg font-bold text-foreground">Total:</span>
                <span className="text-2xl font-bold text-primary">
                  Rs. {total.toLocaleString()}
                </span>
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-xs text-blue-900 dark:text-blue-100">
                <p className="font-semibold mb-2">Cash on Delivery Available</p>
                <p>Pay when your order is delivered to your doorstep. Fast and secure delivery across Pakistan.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

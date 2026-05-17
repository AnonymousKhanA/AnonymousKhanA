import { PRODUCTS, CATEGORIES } from '@/lib/products'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import { Star, Truck, Shield, Zap } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  const featuredProducts = PRODUCTS.slice(0, 8)
  const reviews = [
    {
      name: 'Fatima Khan',
      rating: 5,
      text: 'Best quality products and amazing delivery service! Highly recommended.',
      initials: 'FK',
    },
    {
      name: 'Ahmed Hassan',
      rating: 5,
      text: 'Fast delivery, authentic products, and great customer support. Loved it!',
      initials: 'AH',
    },
    {
      name: 'Zara Ali',
      rating: 5,
      text: 'Khan Store offers incredible prices on premium products. Worth every rupee!',
      initials: 'ZA',
    },
    {
      name: 'Muhammad Khan',
      rating: 4,
      text: 'Great variety of products and smooth checkout process.',
      initials: 'MK',
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-20 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Welcome to Khan Store
              </h1>
              <p className="text-lg mb-6 opacity-90">
                Shop premium cosmetics, fashion, and accessories at unbeatable prices. 
                Nationwide delivery available with Cash on Delivery.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/shop">
                  <Button size="lg" className="w-full sm:w-auto bg-secondary text-secondary-foreground hover:bg-secondary/90">
                    Shop Now
                  </Button>
                </Link>
                <Link href="/about">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                    Learn More
                  </Button>
                </Link>
              </div>
              <p className="text-sm mt-6 opacity-75 flex items-center gap-2">
                <Truck className="w-4 h-4" />
                Free shipping on orders over Rs. 2000
              </p>
            </div>
            <div className="relative h-64 md:h-80 hidden md:block">
              <Image
                src="https://images.unsplash.com/photo-1461614849935-81cf3ee3092f?w=600&h=400&fit=crop"
                alt="Shopping"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Shop by Category
            </h2>
            <p className="text-muted-foreground text-lg">
              Explore our wide range of premium products
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((category) => (
              <Link
                key={category.id}
                href={`/shop?category=${category.id}`}
                className="group bg-card border border-border rounded-lg p-4 text-center hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-accent/30 transition">
                  <span className="text-2xl">🛍️</span>
                </div>
                <p className="text-sm font-semibold text-foreground group-hover:text-primary transition">
                  {category.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 md:py-20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Featured Products
            </h2>
            <p className="text-muted-foreground text-lg">
              Handpicked products for you
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/shop">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Why Choose Khan Store?
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Authentic Products',
                description: '100% authentic and genuine products directly from official distributors.',
              },
              {
                icon: Zap,
                title: 'Fast Delivery',
                description: 'Quick delivery across Pakistan with nationwide cash on delivery service.',
              },
              {
                icon: Star,
                title: 'Best Prices',
                description: 'Shop premium products at unbeatable prices. Best quality at affordable rates.',
              },
            ].map((item, idx) => {
              const Icon = item.icon
              return (
                <div key={idx} className="bg-card border border-border rounded-lg p-8 text-center hover:shadow-lg transition">
                  <Icon className="w-12 h-12 mx-auto mb-4 text-accent" />
                  <h3 className="text-xl font-bold mb-3 text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-16 md:py-20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              What Our Customers Say
            </h2>
            <p className="text-muted-foreground text-lg">
              Trusted by thousands of happy customers
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((review, idx) => (
              <div key={idx} className="bg-background border border-border rounded-lg p-6 hover:shadow-lg transition">
                <div className="flex gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-sm text-foreground mb-4">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm">
                    {review.initials}
                  </div>
                  <p className="font-semibold text-foreground text-sm">
                    {review.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Shop?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Discover premium products at unbeatable prices today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop">
              <Button size="lg" className="w-full sm:w-auto bg-secondary text-secondary-foreground hover:bg-secondary/90">
                Start Shopping
              </Button>
            </Link>
            <a href="https://wa.me/923156240776" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Chat on WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

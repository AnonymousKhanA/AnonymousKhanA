import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CheckCircle, Zap, Shield } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-primary text-primary-foreground py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold">About Khan Store</h1>
          <p className="mt-2 opacity-90">Your trusted partner for premium products</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Our Story */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                Our Story
              </h2>
              <p className="text-lg text-muted-foreground mb-4">
                Khan Store was founded with a simple mission: to bring premium quality products 
                at affordable prices to customers across Pakistan. We believe that everyone deserves 
                access to authentic, high-quality cosmetics, fashion, and accessories without breaking the bank.
              </p>
              <p className="text-lg text-muted-foreground">
                With years of experience in the retail industry, we&apos;ve built trusted relationships 
                with suppliers and manufacturers to ensure you get the best products at the best prices. 
                Your satisfaction is our priority.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-8 text-center">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Our Promise
              </h3>
              <p className="text-muted-foreground mb-6">
                Quality products, authentic items, and exceptional customer service at unbeatable prices.
              </p>
              <p className="text-sm text-muted-foreground">
                Shop with confidence. Every product is carefully selected and verified for authenticity.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-12 text-center text-foreground">
            Our Values
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card border border-border rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4 text-foreground flex items-center gap-2">
                <Shield className="w-6 h-6 text-accent" />
                Mission
              </h3>
              <p className="text-muted-foreground text-lg">
                To provide the best quality products at affordable prices while maintaining the highest 
                standards of authenticity, customer service, and integrity. We&apos;re committed to making 
                premium shopping accessible to everyone in Pakistan.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4 text-foreground flex items-center gap-2">
                <Zap className="w-6 h-6 text-accent" />
                Vision
              </h3>
              <p className="text-muted-foreground text-lg">
                To become Pakistan&apos;s most trusted online retailer for cosmetics, fashion, and accessories 
                by delivering exceptional products, fast shipping, and unmatched customer service across 
                the nation.
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-16 bg-card/50 rounded-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-12 text-center text-foreground">
            Why Choose Khan Store?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: '100% Authentic Products',
                description: 'We source directly from official distributors and verify every product for authenticity.',
              },
              {
                title: 'Best Prices Guaranteed',
                description: 'Get premium quality at the most competitive prices in the market.',
              },
              {
                title: 'Fast Nationwide Delivery',
                description: 'Quick delivery to every corner of Pakistan with Cash on Delivery option.',
              },
              {
                title: 'Dedicated Customer Support',
                description: 'Our team is ready to help you via phone, email, WhatsApp, and more.',
              },
              {
                title: 'Wide Product Range',
                description: 'Explore our extensive collection of cosmetics, fashion, perfumes, and accessories.',
              },
              {
                title: 'Hassle-Free Shopping',
                description: 'Easy browsing, smooth checkout, and secure payment options.',
              },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    {item.title}
                  </h4>
                  <p className="text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Products', value: '1000+' },
              { label: 'Happy Customers', value: '5000+' },
              { label: 'Orders Delivered', value: '10000+' },
              { label: 'Cities Covered', value: 'All Pakistan' },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-lg transition"
              >
                <div className="text-3xl font-bold text-accent mb-2">
                  {stat.value}
                </div>
                <p className="text-muted-foreground font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary text-primary-foreground rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Experience Khan Store?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Browse our collection and find your favorite products today!
          </p>
          <Link href="/shop">
            <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              Shop Now
            </Button>
          </Link>
        </section>
      </div>
    </div>
  )
}

import Link from 'next/link'
import { Mail, Phone, Facebook, Instagram, MessageCircle } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4">Khan Store</h3>
            <p className="text-sm opacity-80 mb-4">
              Your premium destination for quality products at affordable prices.
            </p>
            <p className="text-xs opacity-70">
              Delivery available across Pakistan with Cash on Delivery option.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shop" className="opacity-80 hover:opacity-100 transition">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="opacity-80 hover:opacity-100 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="opacity-80 hover:opacity-100 transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/" className="opacity-80 hover:opacity-100 transition">
                  Home
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+923156240776" className="opacity-80 hover:opacity-100 transition">
                  +92 315 6240776
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:khanstoreonline81@gmail.com" className="opacity-80 hover:opacity-100 transition">
                  khanstoreonline81@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <a href="https://wa.me/923156240776" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition">
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold mb-4">Follow Us</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="https://www.tiktok.com/@khan.store776"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-80 hover:opacity-100 transition flex items-center gap-2"
                >
                  <span>TikTok</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="opacity-80 hover:opacity-100 transition flex items-center gap-2"
                >
                  <Facebook className="w-4 h-4" />
                  <span>Facebook</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="opacity-80 hover:opacity-100 transition flex items-center gap-2"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Instagram</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-primary-foreground/20 pt-8 text-center text-xs opacity-70">
          <p>© 2026 Khan Store. All Rights Reserved.</p>
          <p className="mt-2">Nationwide COD Available | Fast Delivery | Premium Quality</p>
        </div>
      </div>
    </footer>
  )
}

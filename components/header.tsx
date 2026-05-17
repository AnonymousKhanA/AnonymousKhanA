'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useCart } from '@/context/cart'
import { Menu, X, ShoppingBag, Search, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { items } = useCart()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Hydration fix
  if (!mounted && typeof window !== 'undefined') {
    setMounted(true)
  }

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="sticky top-0 z-40 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <Image
              src="/khan-store-logo.png"
              alt="Khan Store"
              width={40}
              height={40}
              className="object-contain"
            />
            <div className="hidden sm:block">
              <div className="font-bold text-lg text-primary">Khan Store</div>
              <div className="text-xs text-muted-foreground">Shop More, Pay Less</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium text-foreground hover:text-primary transition"
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="text-sm font-medium text-foreground hover:text-primary transition"
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-foreground hover:text-primary transition"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-foreground hover:text-primary transition"
            >
              Contact
            </Link>
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Search */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex"
              title="Search"
            >
              <Search className="w-5 h-5" />
            </Button>

            {/* Theme Toggle */}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </Button>
            )}

            {/* Cart */}
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingBag className="w-5 h-5" />
              </Button>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 border-t border-border pt-4 space-y-2">
            <Link
              href="/"
              className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}

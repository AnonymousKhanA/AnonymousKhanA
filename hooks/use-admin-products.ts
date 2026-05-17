'use client'

import { useState, useEffect } from 'react'
import { Product, PRODUCTS } from '@/lib/products'
import { getStoredProducts, saveProducts, updateProduct, deleteProduct, addProduct } from '@/lib/admin-storage'

export function useAdminProducts() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load stored products on mount
  useEffect(() => {
    const stored = getStoredProducts()
    if (stored.length > 0) {
      setProducts(stored)
    }
    setIsLoaded(true)
  }, [])

  const updateProductData = (updatedProduct: Product) => {
    const newProducts = updateProduct(updatedProduct, products)
    setProducts(newProducts)
    saveProducts(newProducts)
  }

  const removeProduct = (id: string) => {
    const newProducts = deleteProduct(id, products)
    setProducts(newProducts)
    saveProducts(newProducts)
  }

  const createProduct = (newProduct: Product) => {
    const newProducts = addProduct(newProduct, products)
    setProducts(newProducts)
    saveProducts(newProducts)
  }

  return {
    products,
    isLoaded,
    updateProduct: updateProductData,
    deleteProduct: removeProduct,
    addProduct: createProduct,
  }
}

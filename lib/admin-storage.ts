import { Product } from '@/lib/products'

const PRODUCTS_STORAGE_KEY = 'khan_store_products'

export function getStoredProducts(): Product[] {
  if (typeof window === 'undefined') return []
  const stored = localStorage.getItem(PRODUCTS_STORAGE_KEY)
  return stored ? JSON.parse(stored) : []
}

export function saveProducts(products: Product[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products))
}

export function getProductById(id: string, allProducts: Product[]): Product | undefined {
  return allProducts.find((p) => p.id === id)
}

export function updateProduct(updatedProduct: Product, allProducts: Product[]): Product[] {
  return allProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
}

export function deleteProduct(id: string, allProducts: Product[]): Product[] {
  return allProducts.filter((p) => p.id !== id)
}

export function addProduct(newProduct: Product, allProducts: Product[]): Product[] {
  return [...allProducts, newProduct]
}

import { apiClient } from './api'
import { ApiResponse } from '@/types/auth'
import { Product, ProductSection } from '@/types/product'

const SERVER_API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080/api'

export const productService = {
  async getProducts(section: ProductSection): Promise<Product[]> {
    const res = await apiClient.get<ApiResponse<Product[]>>('/products', {
      params: { section },
    })
    return res.data.data ?? []
  },

  async getProductsServer(section: ProductSection): Promise<Product[]> {
    const res = await fetch(`${SERVER_API_URL}/products?section=${section}`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return []
    const json: ApiResponse<Product[]> = await res.json()
    return json.data ?? []
  },
}

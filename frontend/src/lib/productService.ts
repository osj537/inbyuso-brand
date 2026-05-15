import { apiClient } from './api'
import { ApiResponse } from '@/types/auth'
import { Product, ProductSection } from '@/types/product'

export const productService = {
  async getProducts(section: ProductSection): Promise<Product[]> {
    const res = await apiClient.get<ApiResponse<Product[]>>('/products', {
      params: { section },
    })
    return res.data.data ?? []
  },
}

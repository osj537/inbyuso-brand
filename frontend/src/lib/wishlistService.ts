import { apiClient } from './api'
import { ApiResponse } from '@/types/auth'
import { Product } from '@/types/product'

export const wishlistService = {
  async toggle(productId: string): Promise<boolean> {
    const res = await apiClient.post<ApiResponse<{ wished: boolean }>>(`/wishlist/${productId}/toggle`)
    return res.data.data!.wished
  },

  async getStatus(productId: string): Promise<boolean> {
    const res = await apiClient.get<ApiResponse<{ wished: boolean }>>(`/wishlist/${productId}/status`)
    return res.data.data!.wished
  },

  async getMyWishlist(): Promise<Product[]> {
    const res = await apiClient.get<ApiResponse<Product[]>>('/wishlist')
    return res.data.data ?? []
  },
}

import { apiClient } from './api'
import { ApiResponse } from '@/types/auth'

export interface Banner {
  id: string
  title: string
  imageUrl: string
  linkUrl?: string
  sortOrder: number
  active: boolean
}

export interface BannerRequest {
  title: string
  imageUrl: string
  linkUrl?: string
  sortOrder: number
}

export const bannerService = {
  async getActiveBanners(): Promise<Banner[]> {
    const res = await apiClient.get<ApiResponse<Banner[]>>('/banners')
    return res.data.data ?? []
  },

  async getAllBanners(): Promise<Banner[]> {
    const res = await apiClient.get<ApiResponse<Banner[]>>('/banners/admin')
    return res.data.data ?? []
  },

  async create(data: BannerRequest): Promise<Banner> {
    const res = await apiClient.post<ApiResponse<Banner>>('/banners/admin', data)
    return res.data.data!
  },

  async update(id: string, data: BannerRequest): Promise<Banner> {
    const res = await apiClient.put<ApiResponse<Banner>>(`/banners/admin/${id}`, data)
    return res.data.data!
  },

  async toggle(id: string): Promise<Banner> {
    const res = await apiClient.patch<ApiResponse<Banner>>(`/banners/admin/${id}/toggle`)
    return res.data.data!
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/banners/admin/${id}`)
  },
}

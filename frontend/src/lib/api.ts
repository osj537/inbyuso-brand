import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { AuthResponse, ApiResponse } from '@/types/auth'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080/api'

export const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
})

let accessToken: string | null = null
let isRefreshing = false
let failedQueue: Array<{ resolve: (token: string) => void; reject: (err: unknown) => void }> = []

export function setAccessToken(token: string | null) {
  accessToken = token
}

export function getAccessToken() {
  return accessToken
}

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    if (error.response?.status !== 401 || original._retry) {
      return Promise.reject(error)
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject })
      }).then((token) => {
        original.headers.Authorization = `Bearer ${token}`
        return apiClient(original)
      })
    }

    original._retry = true
    isRefreshing = true

    try {
      const { data } = await apiClient.post<ApiResponse<AuthResponse>>('/auth/refresh')
      const newToken = data.data!.accessToken
      setAccessToken(newToken)
      failedQueue.forEach(({ resolve }) => resolve(newToken))
      failedQueue = []
      original.headers.Authorization = `Bearer ${newToken}`
      return apiClient(original)
    } catch {
      failedQueue.forEach(({ reject }) => reject(error))
      failedQueue = []
      setAccessToken(null)
      return Promise.reject(error)
    } finally {
      isRefreshing = false
    }
  }
)

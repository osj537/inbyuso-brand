import { apiClient, setAccessToken } from './api'
import { ApiResponse, AuthResponse, LoginFormData, SignupFormData } from '@/types/auth'

export const authService = {
  async signup(data: SignupFormData): Promise<AuthResponse> {
    const res = await apiClient.post<ApiResponse<AuthResponse>>('/auth/signup', data)
    const auth = res.data.data!
    setAccessToken(auth.accessToken)
    sessionStorage.setItem('loggedIn', '1')
    sessionStorage.setItem('role', auth.user.role)
    return auth
  },

  async login(data: LoginFormData): Promise<AuthResponse> {
    const res = await apiClient.post<ApiResponse<AuthResponse>>('/auth/login', data)
    const auth = res.data.data!
    setAccessToken(auth.accessToken)
    sessionStorage.setItem('loggedIn', '1')
    sessionStorage.setItem('role', auth.user.role)
    return auth
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout')
    } catch {
      // API 실패해도 로컬 상태는 반드시 초기화
    } finally {
      setAccessToken(null)
      sessionStorage.removeItem('loggedIn')
      sessionStorage.removeItem('role')
    }
  },

  isLoggedIn(): boolean {
    if (typeof window === 'undefined') return false
    return sessionStorage.getItem('loggedIn') === '1'
  },

  isAdmin(): boolean {
    if (typeof window === 'undefined') return false
    return sessionStorage.getItem('role') === 'ADMIN'
  },

  isBrandOwner(): boolean {
    if (typeof window === 'undefined') return false
    return sessionStorage.getItem('role') === 'BRAND_OWNER'
  },

  getRole(): string | null {
    if (typeof window === 'undefined') return null
    return sessionStorage.getItem('role')
  },
}

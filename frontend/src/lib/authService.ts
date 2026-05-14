import { apiClient, setAccessToken } from './api'
import { ApiResponse, AuthResponse, LoginFormData, SignupFormData } from '@/types/auth'

export const authService = {
  async signup(data: SignupFormData): Promise<AuthResponse> {
    const res = await apiClient.post<ApiResponse<AuthResponse>>('/auth/signup', data)
    const auth = res.data.data!
    setAccessToken(auth.accessToken)
    localStorage.setItem('user', JSON.stringify(auth.user))
    return auth
  },

  async login(data: LoginFormData): Promise<AuthResponse> {
    const res = await apiClient.post<ApiResponse<AuthResponse>>('/auth/login', data)
    const auth = res.data.data!
    setAccessToken(auth.accessToken)
    localStorage.setItem('user', JSON.stringify(auth.user))
    return auth
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout')
    } catch {
      // API 실패해도 로컬 상태는 반드시 초기화
    } finally {
      setAccessToken(null)
      localStorage.removeItem('user')
    }
  },

  isLoggedIn(): boolean {
    if (typeof window === 'undefined') return false
    return !!localStorage.getItem('user')
  },
}

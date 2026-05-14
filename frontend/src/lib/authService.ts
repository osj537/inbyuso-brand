import { apiClient, setAccessToken } from './api'
import { ApiResponse, AuthResponse, LoginFormData, SignupFormData } from '@/types/auth'

export const authService = {
  async signup(data: SignupFormData): Promise<AuthResponse> {
    const res = await apiClient.post<ApiResponse<AuthResponse>>('/auth/signup', data)
    const auth = res.data.data!
    setAccessToken(auth.accessToken)
    // 민감하지 않은 식별자만 sessionStorage에 저장 (탭 닫으면 자동 삭제)
    sessionStorage.setItem('loggedIn', '1')
    return auth
  },

  async login(data: LoginFormData): Promise<AuthResponse> {
    const res = await apiClient.post<ApiResponse<AuthResponse>>('/auth/login', data)
    const auth = res.data.data!
    setAccessToken(auth.accessToken)
    sessionStorage.setItem('loggedIn', '1')
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
    }
  },

  isLoggedIn(): boolean {
    if (typeof window === 'undefined') return false
    return sessionStorage.getItem('loggedIn') === '1'
  },
}

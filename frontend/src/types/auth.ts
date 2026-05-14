export interface UserInfo {
  id: string
  email: string
  username: string
  role: string
}

export interface AuthResponse {
  accessToken: string
  tokenType: string
  expiresIn: number
  user: UserInfo
}

export interface ApiResponse<T = null> {
  success: boolean
  message: string
  data?: T
}

export interface SignupFormData {
  email: string
  password: string
  username: string
}

export interface LoginFormData {
  email: string
  password: string
}

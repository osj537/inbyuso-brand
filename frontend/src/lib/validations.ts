import { z } from 'zod'

export const signupSchema = z.object({
  email: z.string().email('올바른 이메일 형식이 아닙니다').max(255),
  password: z
    .string()
    .min(8, '비밀번호는 8자 이상이어야 합니다')
    .max(100),
  username: z
    .string()
    .min(2, '사용자명은 2자 이상이어야 합니다')
    .max(50)
    .regex(/^[a-zA-Z0-9가-힣_-]+$/, '허용되지 않는 문자가 포함되어 있습니다'),
})

export const loginSchema = z.object({
  email: z.string().email('올바른 이메일 형식이 아닙니다').max(255),
  password: z.string().min(1, '비밀번호를 입력해주세요').max(100),
})

export type SignupSchema = z.infer<typeof signupSchema>
export type LoginSchema = z.infer<typeof loginSchema>

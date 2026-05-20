'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, LoginSchema } from '@/lib/validations'
import { authService } from '@/lib/authService'
import { AxiosError } from 'axios'
import { ApiResponse } from '@/types/auth'

interface LoginFormProps {
  onSuccess: () => void
  onSwitchToSignup: () => void
}

export default function LoginForm({ onSuccess, onSwitchToSignup }: LoginFormProps) {
  const [serverError, setServerError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showPw, setShowPw] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginSchema) => {
    setIsLoading(true)
    setServerError(null)
    try {
      await authService.login(data)
      onSuccess()
    } catch (err) {
      const error = err as AxiosError<ApiResponse>
      setServerError(error.response?.data?.message ?? '로그인 중 오류가 발생했습니다')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col overflow-y-auto flex-1">
      <div className="flex-1 flex flex-col justify-center px-14 py-16">
        {/* 아이브로우 */}
        <div className="flex items-center gap-2.5 mb-3.5">
          <div className="w-6 h-px bg-[#1F3D2A]" />
          <span className="text-[9px] tracking-[0.24em] uppercase text-[#1F3D2A] font-medium">로그인</span>
        </div>

        <h1 className="text-[30px] font-bold tracking-[-0.04em] text-[#111] mb-1.5">인뷰소 시작하기</h1>
        <p className="text-[13px] text-[#888480] font-light mb-9 leading-relaxed">계정으로 로그인하거나 새로운 계정을 사용하세요</p>

        {/* 이메일 폼 */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex flex-col mb-4">
            {/* 이메일 */}
            <div className="relative border-b-[1.5px] border-[#D8D4CE] focus-within:border-[#111] transition-colors">
              <label className="block text-[9px] font-semibold tracking-[0.14em] uppercase text-[#B8B4AE] pt-4 focus-within:text-[#111] transition-colors">
                이메일
              </label>
              <input
                type="email"
                autoComplete="email"
                {...register('email')}
                className="w-full border-none bg-transparent py-2 pb-3.5 text-[15px] font-light text-[#111] outline-none placeholder-[#B8B4AE] tracking-[-0.01em]"
                placeholder="hello@email.com"
              />
              {errors.email && (
                <p className="text-xs text-[#B84A28] pb-2">{errors.email.message}</p>
              )}
            </div>

            {/* 비밀번호 */}
            <div className="relative border-b-[1.5px] border-[#D8D4CE] focus-within:border-[#111] transition-colors mt-1">
              <label className="block text-[9px] font-semibold tracking-[0.14em] uppercase text-[#B8B4AE] pt-4 transition-colors">
                비밀번호
              </label>
              <input
                type={showPw ? 'text' : 'password'}
                autoComplete="current-password"
                {...register('password')}
                className="w-full border-none bg-transparent py-2 pb-3.5 text-[15px] font-light text-[#111] outline-none placeholder-[#B8B4AE] tracking-[-0.01em] pr-12"
                placeholder="비밀번호를 입력하세요"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-0 bottom-3.5 text-[11px] text-[#B8B4AE] hover:text-[#888480] transition-colors"
              >
                {showPw ? '숨기기' : '보기'}
              </button>
              {errors.password && (
                <p className="text-xs text-[#B84A28] pb-2">{errors.password.message}</p>
              )}
            </div>
          </div>

          {serverError && (
            <p className="text-xs text-[#B84A28] mb-4">{serverError}</p>
          )}

          {/* 옵션 */}
          <div className="flex items-center justify-between mb-7 mt-3.5">
            <span className="text-xs text-[#888480] font-light">비밀번호를 잊으셨나요?</span>
            <button type="button" className="text-xs text-[#B8B4AE] border-b border-[#D8D4CE] pb-px hover:text-[#111] hover:border-[#111] transition-colors">
              비밀번호 찾기
            </button>
          </div>

          {/* 로그인 버튼 */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-[#111] text-[#F8F6F2] text-sm font-semibold tracking-[0.04em] hover:bg-[#1F3D2A] disabled:bg-[#B8B4AE] transition-colors mb-8"
          >
            {isLoading ? '로그인 중...' : '로그인'}
          </button>
        </form>

        {/* 하단 */}
        <div className="pt-6 border-t border-[#D8D4CE] flex items-center justify-between">
          <div className="flex gap-4">
            <button className="text-[11px] text-[#B8B4AE] hover:text-[#888480] transition-colors">이용약관</button>
            <button className="text-[11px] text-[#B8B4AE] hover:text-[#888480] transition-colors">개인정보처리방침</button>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#888480] font-light">아직 회원이 아니신가요?</span>
            <button
              onClick={onSwitchToSignup}
              className="text-xs font-semibold text-[#111] border-b-[1.5px] border-[#111] pb-px hover:text-[#1F3D2A] hover:border-[#1F3D2A] transition-colors"
            >
              회원가입
            </button>
          </div>
        </div>
      </div>

      {/* 푸터 */}
      <div className="px-14 py-5 border-t border-[#D8D4CE] flex justify-between items-center">
        <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#B8B4AE]">INBYUSO</span>
        <span className="text-[10px] text-[#B8B4AE]">© 2026 인뷰소</span>
      </div>
    </div>
  )
}

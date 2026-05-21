'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signupSchema, SignupSchema } from '@/lib/validations'
import { authService } from '@/lib/authService'
import { AxiosError } from 'axios'
import { ApiResponse } from '@/types/auth'

interface SignupFormProps {
  onSuccess: () => void
  onSwitchToLogin: () => void
}

export default function SignupForm({ onSuccess, onSwitchToLogin }: SignupFormProps) {
  const [serverError, setServerError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showPw, setShowPw] = useState(false)
  const [role, setRole] = useState<'CUSTOMER' | 'BRAND_OWNER'>('CUSTOMER')

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: { role: 'CUSTOMER' },
  })

  const handleRoleSelect = (r: 'CUSTOMER' | 'BRAND_OWNER') => {
    setRole(r)
    setValue('role', r)
  }

  const onSubmit = async (data: SignupSchema) => {
    setIsLoading(true)
    setServerError(null)
    try {
      await authService.signup(data)
      onSuccess()
    } catch (err) {
      const error = err as AxiosError<ApiResponse>
      setServerError(error.response?.data?.message ?? '회원가입 중 오류가 발생했습니다')
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
          <span className="text-[9px] tracking-[0.24em] uppercase text-[#1F3D2A] font-medium">회원가입</span>
        </div>

        <h1 className="text-[30px] font-bold tracking-[-0.04em] text-[#111] mb-1.5">인뷰소 함께하기</h1>
        <p className="text-[13px] text-[#888480] font-light mb-8 leading-relaxed">어떤 유형으로 함께하실지 선택해주세요</p>

        {/* 역할 선택 */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {([
            { value: 'CUSTOMER', label: '일반 회원', desc: '인디 뷰티 브랜드를\n발견하고 구매해요' },
            { value: 'BRAND_OWNER', label: '브랜드 오너', desc: '인뷰소에 브랜드를\n입점하고 관리해요' },
          ] as const).map((r) => (
            <button
              key={r.value}
              type="button"
              onClick={() => handleRoleSelect(r.value)}
              className={`p-4 text-left border-[1.5px] transition-all ${role === r.value ? 'border-[#111] bg-[#F0EDE8]' : 'border-[#D8D4CE] hover:border-[#888480]'}`}
            >
              <div className={`w-3 h-3 rounded-full border-[1.5px] mb-3 flex items-center justify-center ${role === r.value ? 'border-[#111] bg-[#111]' : 'border-[#D8D4CE]'}`}>
                {role === r.value && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
              <p className={`text-[13px] font-semibold mb-1 ${role === r.value ? 'text-[#111]' : 'text-[#888480]'}`}>{r.label}</p>
              <p className="text-[11px] text-[#B8B4AE] font-light leading-relaxed whitespace-pre-line">{r.desc}</p>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <input type="hidden" {...register('role')} />

          <div className="flex flex-col mb-4">
            {/* 사용자명 */}
            <div className="relative border-b-[1.5px] border-[#D8D4CE] focus-within:border-[#111] transition-colors">
              <label className="block text-[9px] font-semibold tracking-[0.14em] uppercase text-[#B8B4AE] pt-4">사용자명</label>
              <input
                type="text"
                autoComplete="username"
                {...register('username')}
                className="w-full border-none bg-transparent py-2 pb-3.5 text-[15px] font-light text-[#111] outline-none placeholder-[#B8B4AE]"
                placeholder="2자 이상 한글/영문/숫자"
              />
              {errors.username && <p className="text-xs text-[#B84A28] pb-2">{errors.username.message}</p>}
            </div>

            {/* 이메일 */}
            <div className="relative border-b-[1.5px] border-[#D8D4CE] focus-within:border-[#111] transition-colors mt-1">
              <label className="block text-[9px] font-semibold tracking-[0.14em] uppercase text-[#B8B4AE] pt-4">이메일</label>
              <input
                type="email"
                autoComplete="email"
                {...register('email')}
                className="w-full border-none bg-transparent py-2 pb-3.5 text-[15px] font-light text-[#111] outline-none placeholder-[#B8B4AE]"
                placeholder="hello@email.com"
              />
              {errors.email && <p className="text-xs text-[#B84A28] pb-2">{errors.email.message}</p>}
            </div>

            {/* 비밀번호 */}
            <div className="relative border-b-[1.5px] border-[#D8D4CE] focus-within:border-[#111] transition-colors mt-1">
              <label className="block text-[9px] font-semibold tracking-[0.14em] uppercase text-[#B8B4AE] pt-4">비밀번호</label>
              <input
                type={showPw ? 'text' : 'password'}
                autoComplete="new-password"
                {...register('password')}
                className="w-full border-none bg-transparent py-2 pb-3.5 text-[15px] font-light text-[#111] outline-none placeholder-[#B8B4AE] pr-12"
                placeholder="8자 이상"
              />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-0 bottom-3.5 text-[11px] text-[#B8B4AE] hover:text-[#888480] transition-colors">
                {showPw ? '숨기기' : '보기'}
              </button>
              {errors.password && <p className="text-xs text-[#B84A28] pb-2">{errors.password.message}</p>}
            </div>
          </div>

          {serverError && <p className="text-xs text-[#B84A28] mb-4">{serverError}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-[#111] text-[#F8F6F2] text-sm font-semibold tracking-[0.04em] hover:bg-[#1F3D2A] disabled:bg-[#B8B4AE] transition-colors mt-2 mb-8"
          >
            {isLoading ? '가입 중...' : '회원가입'}
          </button>
        </form>

        <div className="pt-6 border-t border-[#D8D4CE] flex items-center justify-end">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#888480] font-light">이미 계정이 있으신가요?</span>
            <button
              onClick={onSwitchToLogin}
              className="text-xs font-semibold text-[#111] border-b-[1.5px] border-[#111] pb-px hover:text-[#1F3D2A] hover:border-[#1F3D2A] transition-colors"
            >
              로그인
            </button>
          </div>
        </div>
      </div>

      <div className="px-14 py-5 border-t border-[#D8D4CE] flex justify-between items-center">
        <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#B8B4AE]">INBYUSO</span>
        <span className="text-[10px] text-[#B8B4AE]">© 2026 인뷰소</span>
      </div>
    </div>
  )
}

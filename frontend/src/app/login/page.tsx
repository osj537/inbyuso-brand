'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import LoginForm from '@/components/auth/LoginForm'
import SignupForm from '@/components/auth/SignupForm'

type View = 'login' | 'signup'

export default function HomePage() {
  const [view, setView] = useState<View>('login')
  const router = useRouter()

  const handleSuccess = () => {
    router.push('/main')
  }

  return (
    <div className="grid h-screen overflow-hidden" style={{ gridTemplateColumns: '1fr 520px' }}>
      {/* 좌측 비주얼 */}
      <div className="bg-[#111] relative flex flex-col justify-between px-16 py-13 overflow-hidden">
        {/* 좌측 초록 라인 */}
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#1F3D2A]" />

        {/* 배경 텍스트 */}
        <div
          className="absolute bottom-[-80px] right-[-40px] text-[28vw] font-black leading-none pointer-events-none select-none whitespace-nowrap tracking-[-0.06em]"
          style={{ color: 'rgba(255,255,255,0.025)', fontFamily: 'Pretendard, sans-serif' }}
        >
          INBYUSO
        </div>

        {/* 상단 */}
        <div className="relative z-10 pt-3">
          <span className="text-[14px] font-bold tracking-[0.24em] uppercase text-white/40 mb-16 block">INBYUSO</span>
          <h1 className="text-[clamp(36px,4vw,60px)] font-bold text-white tracking-[-0.04em] leading-[1.12] mb-5">
            좋은 브랜드를<br />
            더 많은<br />
            <span className="text-white/20 font-extralight">사람에게</span>
          </h1>
          <p className="text-sm text-white/35 font-light leading-[1.85] max-w-[360px]">
            국내 인디 뷰티 브랜드를 한 곳에서<br />
            발견부터 구매까지
          </p>
        </div>

        {/* 하단 */}
        <div className="relative z-10">
          <div className="flex gap-2 flex-wrap mb-8">
            {['인디 뷰티 연구소', '입점비 0원', '구매인증 리뷰', '브랜드 데이터 무료'].map((chip) => (
              <span
                key={chip}
                className="text-[10px] font-medium tracking-[0.1em] uppercase text-white/30 border border-white/10 px-3 py-[5px]"
              >
                {chip}
              </span>
            ))}
          </div>
          <div className="flex gap-10 pt-6 border-t border-white/[0.06]">
            <div>
              <div className="text-[26px] font-extralight text-white/50 tracking-[-0.02em] leading-none mb-1.5">100+</div>
              <div className="text-[9px] text-white/20 tracking-[0.14em] uppercase">입점 브랜드</div>
            </div>
            <div>
              <div className="text-[26px] font-extralight text-white/50 tracking-[-0.02em] leading-none mb-1.5">0원</div>
              <div className="text-[9px] text-white/20 tracking-[0.14em] uppercase">입점비</div>
            </div>
          </div>
        </div>
      </div>

      {/* 우측 폼 */}
      <div className="bg-[#F8F6F2] border-l border-[#D8D4CE] flex flex-col overflow-y-auto">
        {view === 'login' ? (
          <LoginForm onSuccess={handleSuccess} onSwitchToSignup={() => setView('signup')} />
        ) : (
          <SignupForm onSuccess={handleSuccess} onSwitchToLogin={() => setView('login')} />
        )}
      </div>
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { authService } from '@/lib/authService'

const NAV_ITEMS = [
  { icon: '⌂', label: '운영 홈', href: '/brand', active: true },
  { icon: '◈', label: '브랜드 관리', href: '/brand/profile' },
  { icon: '▦', label: '상품 관리', href: '/brand/products' },
  { icon: '◫', label: '재고 관리', href: '/brand/stock' },
  { icon: '◳', label: '주문 관리', href: '/brand/orders', badge: 0 },
  { icon: '↗', label: '브랜드 인사이트', href: '/brand/insight' },
  { icon: '⚙', label: '설정', href: '/brand/settings' },
]

const STATS = [
  { label: '오늘 주문', value: '0 건', sub: '전일 대비 -' },
  { label: '재고 알림', value: '0 개', sub: '확인하기 →' },
  { label: '페이지 조회수', value: '0 회', sub: '전일 대비 -' },
  { label: '이번달 매출', value: '₩ 0', sub: '전월 대비 -' },
]

const NOTICES = [
  { title: '5월 정산 예정일 안내', date: '2026.05.09' },
  { title: '브랜드 페이지 노출 정책 변경 안내', date: '2026.05.07' },
  { title: '2026 코스모뷰티 서울 참가 안내', date: '2026.05.02' },
]

const SHORTCUTS = [
  { icon: '🏷', label: '브랜드 정보 수정' },
  { icon: '📦', label: '상품 등록' },
  { icon: '🗃', label: '재고 관리' },
  { icon: '🛍', label: '주문 관리' },
]

export default function BrandDashboardPage() {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    if (!authService.isLoggedIn() || !authService.isBrandOwner()) {
      router.replace('/main')
    } else {
      setAuthorized(true)
    }
  }, [router])

  if (!authorized) return null

  return (
    <div className="flex h-screen overflow-hidden bg-[#F5F3EF]">
      {/* 사이드바 */}
      <aside className="w-[210px] bg-[#111111] flex-shrink-0 flex flex-col h-full">
        <div className="px-5 pt-6 pb-4 border-b border-white/10">
          <p className="text-white font-bold text-[14px] tracking-[0.15em] uppercase">INBYUSO</p>
          <p className="text-white/30 text-[9px] tracking-[0.2em] uppercase mt-0.5">Brand Studio</p>
        </div>

        <div className="px-4 py-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#333333] rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">B</div>
            <div>
              <p className="text-white text-[12px] font-medium">내 브랜드</p>
              <p className="text-white/40 text-[9px]">브랜드 관리중</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-2 py-3 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2 rounded text-[12px] mb-0.5 transition-colors ${
                item.active ? 'bg-white/10 text-white font-medium' : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-[13px]">{item.icon}</span>
                <span>{item.label}</span>
              </div>
              {item.badge ? <span className="bg-[#B84A28] text-white text-[9px] px-1.5 py-0.5 rounded-full">{item.badge}</span> : null}
            </Link>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-white/10">
          <p className="text-white/25 text-[9px] mb-2">궁금한 점이 있으신가요?<br/>INBYUSO 파트너팀이 도와드릴게요.</p>
          <button className="w-full border border-white/20 text-white/40 text-[10px] py-1.5 rounded hover:border-white/40 hover:text-white/60 transition-colors">
            문의하기
          </button>
          <p className="text-white/15 text-[8px] text-center mt-3">© INBYUSO. All rights reserved.</p>
        </div>
      </aside>

      {/* 메인 */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* 상단 바 */}
        <div className="bg-white border-b border-[#E8E5E0] px-6 py-3 flex items-center justify-between flex-shrink-0">
          <Link href="/main" className="text-[12px] text-[#888480] hover:text-[#111] transition-colors flex items-center gap-1.5">
            ← 메인으로
          </Link>
          <button className="text-[#888480] hover:text-[#111] transition-colors">🔔</button>
          <button className="text-[#888480] hover:text-[#111] transition-colors text-[12px]">?</button>
          <div className="flex items-center gap-2 text-[12px] text-[#111]">
            <div className="w-6 h-6 bg-[#111111] rounded-full flex items-center justify-center text-white text-[10px] font-bold">B</div>
            내 브랜드 ∨
          </div>
        </div>

        {/* 콘텐츠 */}
        <div className="flex-1 overflow-hidden px-6 py-5 flex flex-col gap-4">
          {/* 환영 + 버튼 */}
          <div className="flex items-center justify-between flex-shrink-0">
            <div>
              <h1 className="text-[20px] font-bold text-[#111] tracking-[-0.02em]">안녕하세요, 브랜드님</h1>
              <p className="text-[12px] text-[#888480] mt-0.5">브랜드 운영 현황을 한눈에 확인하세요.</p>
            </div>
            <button className="bg-[#111111] text-white text-[12px] px-4 py-2.5 hover:bg-[#333333] transition-colors">
              + 상품 등록하기
            </button>
          </div>

          {/* 통계 카드 */}
          <div className="grid grid-cols-4 gap-3 flex-shrink-0">
            {STATS.map((s) => (
              <div key={s.label} className="bg-white px-4 py-4 border border-[#E8E5E0]">
                <p className="text-[10px] text-[#888480] mb-2">{s.label}</p>
                <p className="text-[22px] font-light text-[#111] tracking-[-0.02em] leading-none mb-1">{s.value}</p>
                <p className="text-[10px] text-[#B8B4AE]">{s.sub}</p>
              </div>
            ))}
          </div>

          {/* 메인 그리드 */}
          <div className="grid grid-cols-[1fr_240px] gap-4 flex-1 overflow-hidden min-h-0">
            <div className="flex flex-col gap-4 overflow-hidden min-h-0">
              {/* 최근 주문 */}
              <div className="bg-white border border-[#E8E5E0] flex flex-col flex-1 min-h-0">
                <div className="flex items-center justify-between px-5 py-3 border-b border-[#E8E5E0] flex-shrink-0">
                  <h2 className="text-[13px] font-semibold text-[#111]">최근 주문</h2>
                  <button className="text-[10px] text-[#888480]">더보기 →</button>
                </div>
                <table className="w-full flex-1">
                  <thead>
                    <tr className="border-b border-[#E8E5E0]">
                      {['주문번호', '주문자', '주문상품', '주문상태', '주문일'].map(h => (
                        <th key={h} className="text-left text-[10px] text-[#B8B4AE] font-normal px-5 py-2">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td colSpan={5} className="text-center py-6 text-[12px] text-[#B8B4AE]">아직 주문이 없습니다</td></tr>
                  </tbody>
                </table>
              </div>

              {/* 판매 인기 상품 */}
              <div className="bg-white border border-[#E8E5E0] flex-shrink-0">
                <div className="flex items-center justify-between px-5 py-3 border-b border-[#E8E5E0]">
                  <h2 className="text-[13px] font-semibold text-[#111]">판매 인기 상품 TOP 4</h2>
                  <button className="text-[10px] text-[#888480]">더보기 →</button>
                </div>
                <div className="grid grid-cols-4 gap-px bg-[#E8E5E0] m-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="bg-white p-3">
                      <div className="aspect-square bg-[#F0EDE8] mb-2" />
                      <p className="text-[11px] text-[#111] font-medium">-</p>
                      <p className="text-[10px] text-[#B8B4AE]">판매량 -개</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 우측 */}
            <div className="flex flex-col gap-3 overflow-hidden min-h-0">
              {/* 공지사항 */}
              <div className="bg-white border border-[#E8E5E0] flex-shrink-0">
                <div className="flex items-center justify-between px-4 py-3 border-b border-[#E8E5E0]">
                  <h2 className="text-[12px] font-semibold text-[#111]">INBYUSO 공지사항</h2>
                  <button className="text-[10px] text-[#888480]">더보기 →</button>
                </div>
                <div className="px-4 py-1">
                  {NOTICES.map((n) => (
                    <div key={n.title} className="flex items-start justify-between py-2 border-b border-[#F0EDE8] last:border-none">
                      <p className="text-[11px] text-[#555] leading-snug flex-1 pr-2">{n.title}</p>
                      <p className="text-[9px] text-[#B8B4AE] flex-shrink-0">{n.date}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 바로가기 */}
              <div className="bg-white border border-[#E8E5E0] flex-shrink-0">
                <div className="px-4 py-3 border-b border-[#E8E5E0]">
                  <h2 className="text-[12px] font-semibold text-[#111]">바로가기</h2>
                </div>
                <div className="grid grid-cols-2 gap-px bg-[#E8E5E0] m-3">
                  {SHORTCUTS.map((s) => (
                    <button key={s.label} className="bg-white py-4 flex flex-col items-center gap-1.5 hover:bg-[#F5F3EF] transition-colors">
                      <span className="text-lg">{s.icon}</span>
                      <span className="text-[10px] text-[#888480]">{s.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

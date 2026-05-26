'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

const STATS = [
  { icon: '📦', label: '오늘 주문', value: '8 건', sub: '어제 대비 ↑ 2건', alert: false },
  { icon: '🔔', label: '재고 알림', value: '3 개상품', sub: '재고가 부족한 상품이 있어요', alert: true },
  { icon: '👁', label: '브랜드 조회수', value: '1,245 회', sub: '이번 달 기준', alert: false },
  { icon: '🤍', label: '찜 수', value: '82 회', sub: '이번 달 기준', alert: false },
]

const RECENT_ACTIVITIES = [
  { icon: '✏️', text: '시카 베리어 크림 상품이 수정되었습니다.', time: '2시간 전' },
  { icon: '📦', text: '비건 클렌저 재고 20개가 추가되었습니다.', time: '5시간 전' },
  { icon: '📝', text: '브랜드 소개 정보가 업데이트되었습니다.', time: '1일 전' },
  { icon: '✨', text: '비타민 세럼 상품이 등록되었습니다.', time: '2일 전' },
]

export default function BrandDashboardPage() {
  const router = useRouter()

  return (
    <div className="px-8 py-6 flex flex-col gap-5 min-h-full">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-bold text-[#111] tracking-[-0.02em] flex items-center gap-2">
            안녕하세요, Verde Lab님
            <span className="text-[18px]">✦</span>
          </h1>
          <p className="text-[12px] text-[#888480] mt-0.5">브랜드 운영 현황을 한눈에 확인하고 관리하세요.</p>
        </div>
        <button
          onClick={() => router.push('/brand/products/new')}
          className="bg-[#111] text-white text-[12px] px-5 py-2.5 hover:bg-[#333] transition-colors flex items-center gap-1.5"
        >
          + 상품 등록하기
        </button>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-4 gap-3">
        {STATS.map((s) => (
          <div key={s.label} className={`bg-white px-4 py-4 border ${s.alert ? 'border-[#B84A28]/30' : 'border-[#E8E5E0]'}`}>
            <p className="text-[10px] text-[#888480] mb-2 flex items-center gap-1">
              <span>{s.icon}</span> {s.label}
            </p>
            <p className="text-[24px] font-light text-[#111] tracking-[-0.02em] leading-none mb-1">{s.value}</p>
            <p className={`text-[10px] ${s.alert ? 'text-[#B84A28]' : 'text-[#B8B4AE]'}`}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* 메인 그리드 */}
      <div className="grid grid-cols-[1fr_300px] gap-4">
        {/* 좌측 */}
        <div className="flex flex-col gap-4">
          {/* 최근 활동 */}
          <div className="bg-white border border-[#E8E5E0]">
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#E8E5E0]">
              <h2 className="text-[13px] font-semibold text-[#111]">최근 활동</h2>
              <button className="text-[10px] text-[#888480] hover:text-[#111] transition-colors">전체 활동 보기</button>
            </div>
            <div className="px-5 py-1">
              {RECENT_ACTIVITIES.map((a, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-[#F0EDE8] last:border-none">
                  <div className="flex items-center gap-3">
                    <span className="text-[13px]">{a.icon}</span>
                    <p className="text-[12px] text-[#444]">{a.text}</p>
                  </div>
                  <p className="text-[10px] text-[#B8B4AE] flex-shrink-0 ml-4">{a.time}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 브랜드 페이지 미리보기 */}
          <div className="bg-white border border-[#E8E5E0]">
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#E8E5E0]">
              <h2 className="text-[13px] font-semibold text-[#111]">브랜드 페이지 미리보기</h2>
            </div>
            <div className="p-5">
              <div className="rounded-sm overflow-hidden bg-[#F0EDE8] aspect-[16/7] flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#D8CFC5]/80 to-[#E8DED4]/40" />
                <div className="relative z-10 text-center">
                  <p className="text-[22px] font-light text-[#2D2A26] tracking-wide">Verde Lab</p>
                  <p className="text-[12px] text-[#888480] mt-1">Clean Botanical Skincare</p>
                  <button className="mt-4 bg-[#1F3D2A] text-white text-[11px] px-4 py-1.5 hover:bg-[#2D5A3A] transition-colors">
                    브랜드 페이지 보기 →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 우측 */}
        <div className="flex flex-col gap-3">
          {/* 바로가기 */}
          <div className="bg-white border border-[#E8E5E0]">
            <div className="px-4 py-3 border-b border-[#E8E5E0]">
              <h2 className="text-[12px] font-semibold text-[#111]">빠른 메뉴</h2>
            </div>
            <div className="grid grid-cols-2 gap-px bg-[#E8E5E0]">
              {[
                { label: '브랜드 정보 수정', href: '/brand/profile', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg> },
                { label: '상품 등록', href: '/brand/products/new', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" /></svg> },
                { label: '재고 관리', href: '/brand/stock', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg> },
                { label: '주문 관리', href: '/brand/orders', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg> },
              ].map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  className="bg-white py-5 flex flex-col items-center justify-center gap-2 text-center hover:bg-[#F5F3EF] transition-colors"
                >
                  <span className="text-[#555]">{s.icon}</span>
                  <span className="text-[11px] text-[#555] text-center leading-snug px-2">{s.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* 공지사항 */}
          <div className="bg-white border border-[#E8E5E0]">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#E8E5E0]">
              <h2 className="text-[12px] font-semibold text-[#111]">INBYUSO 공지사항</h2>
              <button className="text-[10px] text-[#888480]">더보기 →</button>
            </div>
            <div className="px-4 py-1">
              {[
                { title: '5월 정산 예정일 안내', date: '2026.05.09' },
                { title: '브랜드 페이지 노출 정책 변경 안내', date: '2026.05.07' },
                { title: '2026 코스모뷰티 서울 참가 안내', date: '2026.05.02' },
              ].map((n) => (
                <div key={n.title} className="flex items-start justify-between py-2.5 border-b border-[#F0EDE8] last:border-none">
                  <p className="text-[11px] text-[#555] leading-snug flex-1 pr-2">{n.title}</p>
                  <p className="text-[9px] text-[#B8B4AE] flex-shrink-0">{n.date}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

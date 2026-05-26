'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { authService } from '@/lib/authService'

const NAV_ITEMS = [
  { label: '운영 홈', href: '/brand', exact: true },
  { label: '브랜드 관리', href: '/brand/profile' },
  { label: '상품 관리', href: '/brand/products' },
  { label: '재고 관리', href: '/brand/stock' },
  { label: '주문 관리', href: '/brand/orders', badge: 8 },
  { label: '브랜드 인사이트', href: '/brand/insight' },
  { label: '설정', href: '/brand/settings' },
]

function HomeIcon() {
  return <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
}
function BrandIcon() {
  return <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
}
function ProductIcon() {
  return <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
}
function StockIcon() {
  return <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
}
function OrderIcon() {
  return <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
}
function InsightIcon() {
  return <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
}
function SettingIcon() {
  return <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
}

const ICONS = [HomeIcon, BrandIcon, ProductIcon, StockIcon, OrderIcon, InsightIcon, SettingIcon]

export default function BrandLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [authorized, setAuthorized] = useState(false)
  const [brandName] = useState('Verde Lab')

  useEffect(() => {
    if (!authService.isLoggedIn() || !authService.isBrandOwner()) {
      router.replace('/main')
    } else {
      setAuthorized(true)
    }
  }, [router])

  if (!authorized) return null

  const isActive = (item: typeof NAV_ITEMS[0]) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href)

  return (
    <div className="flex h-screen overflow-hidden bg-[#F5F3EF]">
      {/* 사이드바 */}
      <aside className="w-[210px] bg-[#111111] flex-shrink-0 flex flex-col h-full">
        <div className="px-5 pt-6 pb-4 border-b border-white/10">
          <p className="text-white font-bold text-[13px] tracking-[0.15em] uppercase">INBYUSO</p>
          <p className="text-white/30 text-[9px] tracking-[0.2em] uppercase mt-0.5">Brand Studio</p>
        </div>

        <div className="px-4 py-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#2A3D2A] rounded-full flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0">
              {brandName.charAt(0)}
            </div>
            <div>
              <p className="text-white text-[12px] font-medium">{brandName}</p>
              <p className="text-white/40 text-[9px]">브랜드 관리중</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-2 py-3 overflow-y-auto">
          {NAV_ITEMS.map((item, i) => {
            const Icon = ICONS[i]
            const active = isActive(item)
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2 rounded text-[12px] mb-0.5 transition-colors ${
                  active ? 'bg-white/10 text-white font-medium' : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon />
                  <span>{item.label}</span>
                </div>
                {item.badge ? (
                  <span className="bg-[#B84A28] text-white text-[9px] px-1.5 py-0.5 rounded-full">{item.badge}</span>
                ) : null}
              </Link>
            )
          })}
        </nav>

        <div className="px-4 py-4 border-t border-white/10">
          <p className="text-white/25 text-[9px] mb-2">궁금한 점이 있으신가요?<br />INBYUSO 파트너팀이 도와드릴게요.</p>
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
          <Link href="/main" className="text-[12px] text-[#888480] hover:text-[#111] transition-colors">
            ← 메인으로
          </Link>
          <div className="flex items-center gap-4">
            <button className="text-[#888480] hover:text-[#111] transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            </button>
            <button className="text-[#888480] hover:text-[#111] transition-colors text-[12px]">?</button>
            <div className="flex items-center gap-2 text-[12px] text-[#111] cursor-pointer">
              <div className="w-6 h-6 bg-[#2A3D2A] rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                {brandName.charAt(0)}
              </div>
              {brandName} ∨
            </div>
          </div>
        </div>

        {/* 페이지 콘텐츠 */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
}

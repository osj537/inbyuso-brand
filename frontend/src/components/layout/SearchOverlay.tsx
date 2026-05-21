'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { CATEGORIES } from '@/lib/categoryData'

export default function SearchOverlay() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  const close = () => {
    setOpen(false)
    setQuery('')
  }

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  const handleCategoryClick = (slug: string) => {
    close()
    router.push(`/category/${encodeURIComponent(slug)}`)
  }

  return (
    <>
      {/* 검색 입력창 */}
      <div
        className="relative cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <input
          type="text"
          readOnly
          placeholder="검색어를 입력하세요"
          className="w-full h-10 px-4 pr-10 bg-white border border-gray-700 rounded text-sm text-gray-900 outline-none cursor-pointer"
        />
        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>

      {/* 오버레이 */}
      {open && (
        <>
          {/* 배경 딤 */}
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => close()}
          />

          {/* 드롭다운 패널 */}
          <div className="fixed left-0 right-0 top-0 z-50 bg-white shadow-lg">
            {/* 검색창 */}
            <div className="bg-black px-4 py-4">
              <div className="max-w-[1200px] mx-auto relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && close()}
                  placeholder="검색어를 입력하세요"
                  className="w-full h-10 px-4 pr-10 bg-white border border-gray-700 rounded text-sm text-gray-900 outline-none"
                />
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  onClick={() => close()}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* 카테고리 */}
            <div className="max-w-[1200px] mx-auto px-4 py-8">
              <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${CATEGORIES.length}, 1fr)` }}>
                {CATEGORIES.map((cat) => (
                  <div key={cat.slug}>
                    {/* 대카테고리 */}
                    <button
                      onClick={() => handleCategoryClick(cat.slug)}
                      className="text-[14px] font-bold text-[#111] mb-3 hover:text-[#1F3D2A] transition-colors text-left"
                    >
                      {cat.label}
                    </button>

                    {/* 서브 + 디테일 */}
                    <div className="flex flex-col gap-3">
                      {cat.subCategories.map((sub) => (
                        <div key={sub.label}>
                          <button
                            onClick={() => handleCategoryClick(cat.slug)}
                            className="text-[12px] text-[#555] hover:text-[#111] transition-colors block mb-1 text-left font-medium"
                          >
                            {sub.label}
                          </button>
                          {sub.details.map((detail) => (
                            <button
                              key={detail}
                              onClick={() => handleCategoryClick(cat.slug)}
                              className="text-[11px] text-[#B8B4AE] hover:text-[#888480] transition-colors block mb-0.5 text-left"
                            >
                              {detail}
                            </button>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => close()}
              className="absolute top-4 right-6 text-white/60 hover:text-white text-xl transition-colors"
            >
              ✕
            </button>
          </div>
        </>
      )}
    </>
  )
}

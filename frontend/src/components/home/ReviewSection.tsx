'use client'

import { useEffect, useState } from 'react'
import { apiClient } from '@/lib/api'
import { ApiResponse } from '@/types/auth'

interface Review {
  id: string
  productName: string
  email: string
  rating: number
  text: string
  imageUrl?: string
  createdAt: string
}

export default function ReviewSection() {
  const [reviews, setReviews] = useState<Review[]>([])

  useEffect(() => {
    apiClient.get<ApiResponse<Review[]>>('/reviews')
      .then(res => setReviews(res.data.data ?? []))
      .catch(() => setReviews([]))
  }, [])

  if (reviews.length === 0) return null

  return (
    <section className="max-w-[1200px] mx-auto px-4 py-14">
      <div className="flex items-end justify-between mb-10">
        <div className="flex items-center gap-3">
          <div className="w-6 h-px bg-[#1F3D2A]" />
          <h2 className="text-[22px] font-semibold tracking-tight uppercase text-[#1F3D2A]">실사용 후기</h2>
        </div>
        <button className="text-[11px] text-[#B8B4AE] tracking-[0.08em] border-b border-[#D8D4CE] pb-px hover:text-[#111] hover:border-[#111] transition-colors">
          더보기 →
        </button>
      </div>

      <div className="grid grid-cols-4 gap-px bg-[#D8D4CE] border border-[#D8D4CE]">
        {reviews.slice(0, 4).map((r) => (
          <div key={r.id} className="bg-[#F8F6F2] p-5 hover:bg-[#F0EDE8] transition-colors">
            <div className="bg-[#E8E5E0] aspect-square mb-4" />
            <div className="flex items-center gap-1 mb-2">
              {Array.from({ length: 5 }).map((_, s) => (
                <svg key={s} className={`w-2.5 h-2.5 ${s < Math.floor(r.rating) ? 'text-[#1F3D2A]' : 'text-[#D8D4CE]'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-[10px] text-[#888480] ml-1">{r.rating}</span>
            </div>
            <p className="text-[11px] text-[#888480] tracking-[0.05em] mb-1.5">{r.productName}</p>
            <p className="text-[12px] text-[#111] leading-relaxed line-clamp-3 font-light mb-3">{r.text}</p>
            <div className="flex items-center justify-between text-[10px] text-[#B8B4AE] pt-3 border-t border-[#D8D4CE]">
              <span>{r.email.slice(0, 4)}{'****'}</span>
              <span>{r.createdAt}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

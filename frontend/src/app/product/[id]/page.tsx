'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { apiClient } from '@/lib/api'
import { ApiResponse } from '@/types/auth'
import { Product } from '@/types/product'

const BRAND_STYLES: Record<string, { bg: string; text: string }> = {
  'Innature':    { bg: '#DDE8E0', text: '#3A6B4A' },
  'Green Lab':   { bg: '#E0E8DD', text: '#3A6B4A' },
  'Mellow Skin': { bg: '#EDE0E8', text: '#6B3A5A' },
  'Blure Sons':  { bg: '#E0E4ED', text: '#3A4A6B' },
  'Pure Lab':    { bg: '#EDE8E0', text: '#6B5A3A' },
  'Soft Core':   { bg: '#E8E0ED', text: '#5A3A6B' },
}
const DEFAULT_COLOR = { bg: '#E8E5E0', text: '#888480' }

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [qty, setQty] = useState(1)
  const [wished, setWished] = useState(false)

  useEffect(() => {
    apiClient.get<ApiResponse<Product>>(`/products/${params.id}`)
      .then(res => setProduct(res.data.data ?? null))
      .catch(() => router.push('/main'))
      .finally(() => setLoading(false))
  }, [params.id, router])

  if (loading) return (
    <div className="min-h-screen bg-[#F8F6F2]">
      <Header />
      <div className="max-w-[1200px] mx-auto px-4 py-20 grid grid-cols-2 gap-16 animate-pulse">
        <div className="aspect-square bg-[#E8E5E0]" />
        <div className="space-y-4">
          <div className="h-4 bg-[#E8E5E0] w-1/4 rounded" />
          <div className="h-8 bg-[#E8E5E0] w-3/4 rounded" />
          <div className="h-6 bg-[#E8E5E0] w-1/3 rounded" />
        </div>
      </div>
    </div>
  )

  if (!product) return null

  const color = BRAND_STYLES[product.brand] ?? DEFAULT_COLOR
  const displayPrice = product.salePrice ?? product.price
  const totalPrice = (displayPrice * qty).toLocaleString()

  const svgSrc = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
      <rect width="400" height="400" fill="${color.bg}"/>
      <text x="200" y="185" font-family="Pretendard,Arial,sans-serif" font-size="96" font-weight="200" fill="${color.text}" fill-opacity="0.3" text-anchor="middle" dominant-baseline="middle">${product.brand.charAt(0)}</text>
      <text x="200" y="255" font-family="Pretendard,Arial,sans-serif" font-size="13" font-weight="400" fill="${color.text}" fill-opacity="0.7" text-anchor="middle">${product.brand.toUpperCase()}</text>
    </svg>
  `)}`

  return (
    <div className="min-h-screen bg-[#F8F6F2]">
      <Header />
      <main className="max-w-[1200px] mx-auto px-4 py-12">
        {/* 브레드크럼 */}
        <div className="flex items-center gap-2 text-[11px] text-[#B8B4AE] mb-10">
          <Link href="/main" className="hover:text-[#111] transition-colors">홈</Link>
          <span>/</span>
          <Link href={`/category/${encodeURIComponent(product.mainCategory ?? '')}`} className="hover:text-[#111] transition-colors">{product.mainCategory}</Link>
          <span>/</span>
          <span className="text-[#111]">{product.name}</span>
        </div>

        <div className="grid grid-cols-2 gap-16">
          {/* 이미지 */}
          <div className="sticky top-24">
            <div className="aspect-square overflow-hidden">
              <img src={svgSrc} alt={product.name} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* 정보 */}
          <div>
            <p className="text-[11px] tracking-[0.12em] uppercase text-[#B8B4AE] mb-2">{product.brand}</p>
            <h1 className="text-[26px] font-light tracking-[-0.02em] text-[#111] mb-4 leading-snug">{product.name}</h1>

            {/* 평점 */}
            <div className="flex items-center gap-1.5 mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className={`w-3 h-3 ${i < Math.floor(product.rating ?? 0) ? 'text-[#1F3D2A]' : 'text-[#D8D4CE]'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-[12px] text-[#888480]">{product.rating} · {product.purchaseCount?.toLocaleString()}개 구매</span>
            </div>

            {/* 가격 */}
            <div className="pb-6 border-b border-[#D8D4CE] mb-6">
              {product.salePrice ? (
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {product.discountRate && <span className="text-[13px] text-[#B84A28] font-medium">{product.discountRate}%</span>}
                    <span className="text-[28px] font-semibold text-[#111] tracking-[-0.02em]">{product.salePrice.toLocaleString()}원</span>
                  </div>
                  <span className="text-[14px] text-[#B8B4AE] line-through">{product.price.toLocaleString()}원</span>
                </div>
              ) : (
                <span className="text-[28px] font-semibold text-[#111] tracking-[-0.02em]">{product.price.toLocaleString()}원</span>
              )}
            </div>

            {/* 카테고리 정보 */}
            <div className="flex flex-col gap-2 pb-6 border-b border-[#D8D4CE] mb-6 text-[13px]">
              <div className="flex justify-between">
                <span className="text-[#B8B4AE]">카테고리</span>
                <span className="text-[#111]">{product.mainCategory} · {product.subCategory}</span>
              </div>
              {product.detailCategory && (
                <div className="flex justify-between">
                  <span className="text-[#B8B4AE]">세부 분류</span>
                  <span className="text-[#111]">{product.detailCategory}</span>
                </div>
              )}
            </div>

            {/* 수량 */}
            <div className="flex items-center justify-between pb-6 border-b border-[#D8D4CE] mb-6">
              <span className="text-[13px] text-[#888480]">수량</span>
              <div className="flex items-center gap-4">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-7 h-7 border border-[#D8D4CE] text-[#888480] hover:border-[#111] hover:text-[#111] transition-colors text-sm">−</button>
                <span className="text-[14px] font-medium w-6 text-center">{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className="w-7 h-7 border border-[#D8D4CE] text-[#888480] hover:border-[#111] hover:text-[#111] transition-colors text-sm">+</button>
              </div>
            </div>

            {/* 총 금액 */}
            <div className="flex items-center justify-between mb-8">
              <span className="text-[13px] text-[#888480]">총 금액</span>
              <span className="text-[22px] font-semibold text-[#111] tracking-[-0.02em]">{totalPrice}원</span>
            </div>

            {/* 버튼 */}
            <div className="flex gap-3">
              <button
                onClick={() => setWished(!wished)}
                className={`w-12 h-12 border flex items-center justify-center transition-colors ${wished ? 'border-[#B84A28] text-[#B84A28]' : 'border-[#D8D4CE] text-[#B8B4AE] hover:border-[#111] hover:text-[#111]'}`}
              >
                <svg className="w-5 h-5" fill={wished ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              <button className="flex-1 h-12 border border-[#111] text-[#111] text-[13px] font-medium tracking-[0.05em] hover:bg-[#111] hover:text-white transition-colors">
                장바구니 담기
              </button>
              <button className="flex-1 h-12 bg-[#111] text-white text-[13px] font-medium tracking-[0.05em] hover:bg-[#1F3D2A] transition-colors">
                바로 구매하기
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProductCard from '@/components/product/ProductCard'
import BrandCTA from '@/components/home/BrandCTA'
import { apiClient } from '@/lib/api'
import { ApiResponse } from '@/types/auth'
import { Product } from '@/types/product'
import { CATEGORIES } from '@/lib/categoryData'

export default function CategoryPage() {
  const params = useParams()
  const router = useRouter()
  const categorySlug = decodeURIComponent(params.category as string)

  const categoryData = CATEGORIES.find(c => c.slug === categorySlug)
  const [activeSub, setActiveSub] = useState<string | null>(null)
  const [activeDetail, setActiveDetail] = useState<string | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'rating' | 'priceLow' | 'priceHigh'>('newest')
  const [page, setPage] = useState(1)
  const PAGE_SIZE = 16

  const fetchProducts = async (sub: string | null, detail: string | null, slug = categorySlug) => {
    setLoading(true)
    try {
      const queryParams: Record<string, string> = { mainCategory: slug }
      if (sub) queryParams.subCategory = sub
      if (detail) queryParams.detailCategory = detail
      const res = await apiClient.get<ApiResponse<Product[]>>('/products/category', { params: queryParams })
      setProducts(res.data.data ?? [])
    } catch {
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!categoryData) { router.push('/main'); return }
    Promise.resolve().then(() => {
      setActiveSub(null)
      setActiveDetail(null)
      fetchProducts(null, null, categorySlug)
    })
  }, [categorySlug]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubClick = (sub: string | null) => {
    setActiveSub(sub)
    setActiveDetail(null)
    setPage(1)
    fetchProducts(sub, null)
  }

  const handleDetailClick = (detail: string) => {
    setActiveDetail(detail)
    setPage(1)
    fetchProducts(activeSub, detail)
  }

  if (!categoryData) return null

  const activeSubData = categoryData.subCategories.find(s => s.label === activeSub)
  const detailList = activeSubData?.details ?? []

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* 카테고리 헤더 */}
        <div className="pt-2 pb-0">
          <div className="max-w-[1200px] mx-auto px-4">
            <h1 className="text-2xl font-bold text-gray-900 pt-14 pb-8 text-center">{categoryData.label}</h1>

            {/* 서브 카테고리 탭 */}
            <div className="flex gap-0 overflow-x-auto w-full">
              <button
                onClick={() => handleSubClick(null)}
                className={`flex-1 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeSub === null ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                전체
              </button>
              {categoryData.subCategories.map(sub => (
                <button
                  key={sub.label}
                  onClick={() => handleSubClick(sub.label)}
                  className={`flex-1 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeSub === sub.label ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 디테일 카테고리 */}
        {detailList.length > 0 && (
          <div className="mt-10">
            <div className="max-w-[1200px] mx-auto px-4">
              <div className="grid grid-cols-3 border-t border-l border-gray-200">
                <button
                  onClick={() => { setActiveDetail(null); fetchProducts(activeSub, null) }}
                  className={`py-3.5 text-sm border-b border-r border-gray-200 transition-colors ${
                    activeDetail === null ? 'text-black font-semibold bg-gray-50' : 'text-gray-400 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  전체
                </button>
                {detailList.map(detail => (
                  <button
                    key={detail}
                    onClick={() => handleDetailClick(detail)}
                    className={`py-3.5 text-sm border-b border-r border-gray-200 transition-colors ${
                      activeDetail === detail ? 'text-black font-semibold bg-gray-50' : 'text-gray-400 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {detail}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 정렬 */}
        <div className="max-w-[1200px] mx-auto px-4 pt-10 pb-3 flex items-center gap-4">
          {([
            { key: 'newest', label: '최신순' },
            { key: 'popular', label: '인기순' },
            { key: 'rating', label: '평점순' },
            { key: 'priceLow', label: '낮은가격순' },
            { key: 'priceHigh', label: '높은가격순' },
          ] as const).map((option, i) => (
            <button
              key={option.key}
              onClick={() => setSortBy(option.key)}
              className={`text-sm transition-colors ${sortBy === option.key ? 'text-black font-semibold' : 'text-gray-400 hover:text-gray-600'} ${i !== 0 ? 'border-l border-gray-200 pl-4' : ''}`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* 상품 목록 */}
        <div className="max-w-[1200px] mx-auto px-4 pb-8">
          {loading ? (
            <div className="grid grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-square bg-gray-200 rounded mb-2" />
                  <div className="h-3 bg-gray-200 rounded mb-1 w-1/2" />
                  <div className="h-3 bg-gray-200 rounded w-3/4" />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-sm">등록된 상품이 없습니다</p>
            </div>
          ) : (() => {
            const sorted = [...products].sort((a, b) => {
              if (sortBy === 'popular') return (b.purchaseCount ?? 0) - (a.purchaseCount ?? 0)
              if (sortBy === 'rating') return (b.rating ?? 0) - (a.rating ?? 0)
              if (sortBy === 'priceLow') return (a.salePrice ?? a.price) - (b.salePrice ?? b.price)
              if (sortBy === 'priceHigh') return (b.salePrice ?? b.price) - (a.salePrice ?? a.price)
              return 0
            })
            const totalPages = Math.ceil(sorted.length / PAGE_SIZE)
            const paged = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
            return (
              <>
                <div className="grid grid-cols-4 gap-4">
                  {paged.map(p => <ProductCard key={p.id} {...p} />)}
                </div>
                {totalPages >= 1 && (
                  <div className="flex items-center justify-center gap-2 mt-10">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                      <button key={n} onClick={() => setPage(n)} className={`text-sm px-2 transition-colors ${page === n ? 'text-[#111] font-semibold' : 'text-[#B8B4AE] hover:text-[#111]'}`}>{n}</button>
                    ))}
                  </div>
                )}
              </>
            )
          })()}
        </div>
        <BrandCTA />
      </main>
      <Footer />
    </div>
  )
}

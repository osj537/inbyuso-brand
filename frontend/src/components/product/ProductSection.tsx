'use client'

import { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { productService } from '@/lib/productService'
import { Product, ProductSection as Section } from '@/types/product'

interface ProductSectionProps {
  title: string
  section: Section
}

export default function ProductSection({ title, section }: ProductSectionProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    productService.getProducts(section)
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [section])

  const maxPage = Math.max(0, Math.min(products.length, 10) - 5)

  useEffect(() => {
    if (maxPage <= 0 || !hovered) return
    const timer = setInterval(() => {
      Promise.resolve().then(() => setPage(prev => prev >= maxPage ? 0 : prev + 1))
    }, 1500)
    return () => clearInterval(timer)
  }, [maxPage, hovered])

  return (
    <section className="py-14">
      <div className="flex items-center justify-between mb-10 max-w-[1200px] mx-auto px-4">
        <div className="flex items-center gap-3">
          <div className="w-6 h-px bg-[#1F3D2A]" />
          <h2 className="text-[22px] font-semibold tracking-tight uppercase text-[#1F3D2A]">{title}</h2>
        </div>
        <button className="text-[11px] text-[#B8B4AE] tracking-[0.08em] border-b border-[#D8D4CE] pb-px hover:text-[#111] hover:border-[#111] transition-colors">
          더보기 →
        </button>
      </div>

      <div className="max-w-[1200px] mx-auto px-4">
        <div
          className="overflow-hidden"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {loading ? (
            <div className="grid grid-cols-5 gap-0">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-square bg-[#E8E5E0]" />
                  <div className="px-3 pt-3">
                    <div className="h-2.5 bg-[#E8E5E0] rounded mb-2 w-1/3" />
                    <div className="h-2.5 bg-[#E8E5E0] rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${page * 20}%)` }}
            >
              {products.slice(0, 10).map((p) => (
                <div key={p.id} className="flex-shrink-0 w-1/5">
                  <ProductCard {...p} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

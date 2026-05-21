'use client'

import { useEffect, useState, useRef } from 'react'
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
  const [scrollX, setScrollX] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    productService.getProducts(section)
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [section])

  useEffect(() => {
    if (products.length <= 5) return
    const cardWidth = trackRef.current ? trackRef.current.offsetWidth / 5 : 0
    const maxScroll = (Math.min(products.length, 10) - 5) * cardWidth

    const timer = setInterval(() => {
      setScrollX(prev => {
        const next = prev + cardWidth
        return next >= maxScroll ? 0 : next
      })
    }, 5000)

    return () => clearInterval(timer)
  }, [products.length])

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

      <div className="overflow-hidden" ref={trackRef}>
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
            style={{ transform: `translateX(-${scrollX}px)` }}
          >
            {products.slice(0, 10).map((p) => (
              <div key={p.id} className="flex-shrink-0" style={{ width: '20%' }}>
                <ProductCard {...p} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

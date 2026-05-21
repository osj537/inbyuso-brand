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

  useEffect(() => {
    productService.getProducts(section)
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [section])

  return (
    <section className="max-w-[1200px] mx-auto px-4 py-14">
      {/* 섹션 헤더 */}
      <div className="flex items-end justify-between mb-10">
        <div className="flex items-center gap-3">
          <div className="w-6 h-px bg-[#1F3D2A]" />
          <h2 className="text-[22px] font-semibold tracking-tight uppercase text-[#1F3D2A]">{title}</h2>
        </div>
        <button className="text-[11px] text-[#B8B4AE] tracking-[0.08em] border-b border-[#D8D4CE] pb-px hover:text-[#111] hover:border-[#111] transition-colors">
          더보기 →
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-5 gap-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-square bg-[#E8E5E0] mb-3" />
              <div className="h-2.5 bg-[#E8E5E0] rounded mb-2 w-1/3" />
              <div className="h-2.5 bg-[#E8E5E0] rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-5">
          {products.slice(0, 5).map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      )}
    </section>
  )
}

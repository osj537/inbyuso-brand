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
    <section className="max-w-[1200px] mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-bold text-gray-900">{title}</h2>
        <button className="text-xs text-gray-400 hover:text-gray-600">더보기</button>
      </div>

      {loading ? (
        <div className="grid grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-square bg-gray-200 rounded mb-2" />
              <div className="h-3 bg-gray-200 rounded mb-1 w-1/2" />
              <div className="h-3 bg-gray-200 rounded w-3/4" />
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-5 gap-4 mb-6">
            {products.slice(0, 5).map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
          <div className="grid grid-cols-5 gap-4">
            {products.slice(5, 10).map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
        </>
      )}
    </section>
  )
}

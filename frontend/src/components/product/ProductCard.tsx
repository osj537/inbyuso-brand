'use client'

import { useState } from 'react'

import { Product } from '@/types/product'

type ProductCardProps = Pick<Product, 'brand' | 'name' | 'price' | 'salePrice' | 'rating' | 'imageUrl' | 'discountRate'>

export default function ProductCard({ brand, name, price, salePrice, rating = 4.8, discountRate }: ProductCardProps) {
  const [wished, setWished] = useState(false)

  return (
    <div className="group cursor-pointer">
      {/* 이미지 영역 */}
      <div className="relative aspect-square bg-gray-200 rounded overflow-hidden mb-2">
        <div className="absolute top-2 left-2 z-10">
          <button
            onClick={(e) => { e.stopPropagation(); setWished(!wished) }}
            className={`w-6 h-6 flex items-center justify-center ${wished ? 'text-red-500' : 'text-gray-400'}`}
          >
            <svg className="w-4 h-4" fill={wished ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
        <div className="absolute top-2 right-2 z-10">
          <button className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </button>
        </div>
        <div className="absolute bottom-2 left-2 flex items-center gap-0.5 text-xs text-gray-600">
          <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span>{rating} 점</span>
        </div>
      </div>

      {/* 정보 영역 */}
      <div>
        <p className="text-xs text-gray-400 mb-0.5">{brand}</p>
        <p className="text-xs text-gray-800 leading-4 mb-1 line-clamp-2">{name}</p>
        <div className="flex items-center gap-1.5">
          {discountRate && (
            <span className="text-xs font-bold text-red-500">{discountRate}%</span>
          )}
          {salePrice ? (
            <>
              <span className="text-xs font-bold text-red-500">{salePrice.toLocaleString()}원</span>
              <span className="text-xs text-gray-400 line-through">{price.toLocaleString()}원</span>
            </>
          ) : (
            <span className="text-xs font-bold text-gray-800">{price.toLocaleString()}원</span>
          )}
        </div>
      </div>
    </div>
  )
}

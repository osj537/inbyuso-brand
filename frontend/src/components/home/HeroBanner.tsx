'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { bannerService, Banner } from '@/lib/bannerService'

export default function HeroBanner() {
  const [banners, setBanners] = useState<Banner[]>([])
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    bannerService.getActiveBanners().then(setBanners).catch(() => setBanners([]))
  }, [])

  useEffect(() => {
    if (banners.length <= 1) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [banners.length])

  if (banners.length === 0) {
    return <div className="w-full bg-gray-200 h-[480px] flex items-center justify-center">
      <p className="text-gray-400 text-sm">등록된 배너가 없습니다</p>
    </div>
  }

  return (
    <div className="relative w-full h-[480px] overflow-hidden">
      {banners.map((banner, i) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-700 ${i === current ? 'opacity-100' : 'opacity-0'}`}
        >
          <Image
            src={banner.imageUrl}
            alt={banner.title}
            fill
            className="object-cover"
            priority={i === 0}
          />
          {banner.linkUrl && (
            <a href={banner.linkUrl} className="absolute inset-0" aria-label={banner.title} />
          )}
        </div>
      ))}

      {/* 인디케이터 */}
      {banners.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-colors ${i === current ? 'bg-white' : 'bg-white/50'}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

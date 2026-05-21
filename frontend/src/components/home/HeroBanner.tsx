"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { bannerService, Banner } from "@/lib/bannerService";

export default function HeroBanner() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    bannerService
      .getActiveBanners()
      .then(setBanners)
      .catch(() => setBanners([]));
  }, []);


  if (banners.length === 0) {
    return (
      <div className="w-full bg-gray-200 h-[480px] flex items-center justify-center">
        <p className="text-gray-400 text-sm">등록된 배너가 없습니다</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[480px] overflow-hidden">
      {banners.map((banner, i) => (
        <div
          key={banner.id}
          className={`absolute inset-0 ${i === current ? "opacity-100" : "opacity-0"}`}
        >
          <Image
            src={banner.imageUrl}
            alt={banner.title}
            fill
            className="object-cover"
            priority={i === 0}
          />
          {/* 텍스트 오버레이 */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center pb-36">
            <div className="w-full max-w-[1200px] mx-auto px-4">
              <h2 className="text-[clamp(28px,3vw,46px)] font-bold text-white leading-[1.12] tracking-[-0.04em] mb-4">
                좋은 브랜드를
                <br />
                더 많은
                <br />
                <span className="text-white/20 font-extralight">사람에게</span>
              </h2>
              <p className="text-[14px] text-white/80 font-light leading-[1.85]">
                국내 인디 뷰티 브랜드를 한 곳에서
                <br />
                발견부터 구매까지
              </p>
            </div>
          </div>
          {banner.linkUrl && (
            <a
              href={banner.linkUrl}
              className="absolute inset-0"
              aria-label={banner.title}
            />
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
              className={`w-2 h-2 rounded-full transition-colors ${i === current ? "bg-white" : "bg-white/50"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

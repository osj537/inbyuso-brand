"use client";

import { useRouter } from "next/navigation";
import { Product } from "@/types/product";
import { wishlistService } from "@/lib/wishlistService";
import { authService } from "@/lib/authService";
import { useWishlist } from "@/context/AuthContext";

type ProductCardProps = Pick<
  Product,
  | "id"
  | "slug"
  | "brand"
  | "name"
  | "price"
  | "salePrice"
  | "rating"
  | "imageUrl"
  | "discountRate"
>;

const BRAND_STYLES: Record<string, { from: string; to: string; text: string }> =
  {
    Innature: { from: "#C8DDD0", to: "#8FB5A0", text: "#2D5A45" },
    "Green Lab": { from: "#C5D5CC", to: "#8AAA9A", text: "#2A4A3A" },
    "Mellow Skin": { from: "#DDD0D8", to: "#B599AC", text: "#5A2D4A" },
    "Blure Sons": { from: "#C8CDD8", to: "#8A9AB5", text: "#2D3A5A" },
    "Pure Lab": { from: "#DDD8C8", to: "#B5A98A", text: "#5A4A2D" },
    "Soft Core": { from: "#D8C8DD", to: "#B08AB5", text: "#4A2D5A" },
  };

const DEFAULT_STYLE = { from: "#D8D5D0", to: "#AAA5A0", text: "#555250" };

function BrandImage({ brand, name }: { brand: string; name: string }) {
  const style = BRAND_STYLES[brand] ?? DEFAULT_STYLE;
  const initial = brand.charAt(0).toUpperCase();
  const id = `grad-${brand.replace(/\s/g, "")}`;

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
      <defs>
        <linearGradient id="${id}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${style.from};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${style.to};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="url(#${id})"/>
      <text x="200" y="185" font-family="Pretendard,Arial,sans-serif" font-size="96" font-weight="200" fill="${style.text}" fill-opacity="0.3" text-anchor="middle" dominant-baseline="middle">${initial}</text>
      <text x="200" y="255" font-family="Pretendard,Arial,sans-serif" font-size="13" font-weight="400" fill="${style.text}" fill-opacity="0.7" text-anchor="middle">${brand.toUpperCase()}</text>
    </svg>
  `;

  const src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

  return <img src={src} alt={name} className="w-full h-full object-cover" />;
}

export default function ProductCard({
  id,
  slug,
  brand,
  name,
  price,
  salePrice,
  rating = 4.8,
  discountRate,
}: ProductCardProps) {
  const router = useRouter();
  const { wishedIds, toggleWish } = useWishlist();
  const wished = wishedIds.has(id);

  async function handleWishToggle(e: React.MouseEvent) {
    e.stopPropagation();
    if (!authService.isLoggedIn()) {
      router.push("/login");
      return;
    }
    toggleWish(id);
    try {
      await wishlistService.toggle(id);
    } catch {
      toggleWish(id);
    }
  }

  return (
    <div
      className="group cursor-pointer"
      onClick={() => router.push(`/product/${slug}`)}
    >
      {/* 이미지 영역 */}
      <div className="relative aspect-square overflow-hidden mt-1 mb-3">
        <BrandImage brand={brand} name={name} />

        <button
          onClick={handleWishToggle}
          className={`absolute top-3 right-3 z-10 w-6 h-6 flex items-center justify-center transition-colors ${wished ? "text-[#B84A28]" : "text-white/70 hover:text-white"}`}
        >
          <svg
            className="w-4 h-4"
            fill={wished ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>

        {discountRate && (
          <div className="absolute top-3 left-3 z-10 bg-[#B84A28] text-white text-[9px] font-medium px-1.5 py-0.5 tracking-[0.05em]">
            {discountRate}%
          </div>
        )}
      </div>

      {/* 정보 영역 */}
      <div className="px-3">
        <p className="text-[10px] text-[#B8B4AE] tracking-[0.08em] uppercase mb-1">
          {brand}
        </p>
        <p className="text-[13px] text-[#111] leading-snug mb-2 line-clamp-2 font-light">
          {name}
        </p>
        <div className="flex items-center gap-1.5">
          {salePrice ? (
            <>
              <span className="text-[13px] font-semibold text-[#111]">
                {salePrice.toLocaleString()}원
              </span>
              <span className="text-[11px] text-[#B8B4AE] line-through">
                {price.toLocaleString()}원
              </span>
            </>
          ) : (
            <span className="text-[13px] font-semibold text-[#111]">
              {price.toLocaleString()}원
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 mt-1.5">
          <svg
            className="w-2.5 h-2.5 text-[#1F3D2A]"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-[10px] text-[#888480]">{rating}</span>
        </div>
      </div>
    </div>
  );
}

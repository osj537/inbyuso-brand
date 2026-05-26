"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import BrandCTA from "@/components/home/BrandCTA";
import { productService } from "@/lib/productService";
import { Product } from "@/types/product";
import { CATEGORIES } from "@/lib/categoryData";

const PAGE_SIZE = 12;

const CATEGORY_TABS = [
  { key: "전체", label: "전체" },
  ...CATEGORIES.map((c) => ({ key: c.slug, label: c.label })),
];

export default function RankingPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("전체");
  const [sortBy, setSortBy] = useState<"newest" | "priceLow" | "priceHigh">(
    "newest",
  );

  useEffect(() => {
    productService
      .getProducts("RANKING", 50)
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    category === "전체"
      ? products
      : products.filter((p) => p.mainCategory === category);

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "newest") return b.id.localeCompare(a.id);
    if (sortBy === "priceLow")
      return (a.salePrice ?? a.price) - (b.salePrice ?? b.price);
    if (sortBy === "priceHigh")
      return (b.salePrice ?? b.price) - (a.salePrice ?? a.price);
    return 0;
  });

  const top3 = sorted.slice(0, 3);
  const rest = sorted.slice(3);
  const totalPages = Math.ceil(rest.length / PAGE_SIZE);
  const pagedRest = rest.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <div className="max-w-[1200px] mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900 pt-14 pb-8 text-center">
            랭킹
          </h1>

          {/* 카테고리 테이블 */}
          <div className="grid grid-cols-4 border-t border-l border-gray-200">
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  setCategory(tab.key);
                  setPage(1);
                }}
                className={`py-3.5 text-sm border-b border-r border-gray-200 transition-colors ${
                  category === tab.key
                    ? "text-black font-semibold bg-gray-50"
                    : "text-gray-400 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 정렬 */}
          <div className="pt-4 pb-8 flex items-center gap-4">
            {(
              [
                { key: "newest", label: "신상품" },
                { key: "priceLow", label: "낮은가격순" },
                { key: "priceHigh", label: "높은가격순" },
              ] as const
            ).map((option, i) => (
              <button
                key={option.key}
                onClick={() => {
                  setSortBy(option.key);
                  setPage(1);
                }}
                className={`text-sm transition-colors ${sortBy === option.key ? "text-black font-semibold" : "text-gray-400 hover:text-gray-600"} ${i !== 0 ? "border-l border-gray-200 pl-4" : ""}`}
              >
                {option.label}
              </button>
            ))}
          </div>

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
          ) : sorted.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-sm">등록된 상품이 없습니다</p>
            </div>
          ) : (
            <>
              {/* TOP 3 */}
              <div className="grid grid-cols-3 gap-6 mb-12">
                {top3.map((p, i) => (
                  <div
                    key={p.id}
                    className="cursor-pointer group"
                    onClick={() => router.push(`/product/${p.slug}`)}
                  >
                    <ProductCard {...p} rank={i + 1} />
                  </div>
                ))}
              </div>

              {/* 4위~ */}
              {pagedRest.length > 0 && (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-6 h-px bg-[#1F3D2A]" />
                    <span className="text-[13px] text-[#1F3D2A] tracking-[0.08em] uppercase font-medium">
                      전체 순위
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-4 pb-8">
                    {pagedRest.map((p) => (
                      <div key={p.id}>
                        <ProductCard {...p} />
                      </div>
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-4 pb-8">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (n) => (
                          <button
                            key={n}
                            onClick={() => setPage(n)}
                            className={`text-sm px-2 transition-colors ${page === n ? "text-[#111] font-semibold" : "text-[#B8B4AE] hover:text-[#111]"}`}
                          >
                            {n}
                          </button>
                        ),
                      )}
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
        <BrandCTA />
      </main>
      <Footer />
    </div>
  );
}

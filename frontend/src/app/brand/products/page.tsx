'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Status = '판매중' | '품절' | '임시저장'

interface MockProduct {
  id: string
  name: string
  price: number
  stock: number
  status: Status
  category: string
}

const MOCK_PRODUCTS: MockProduct[] = [
  { id: '1', name: '시카 베리어 크림 50ml', price: 32000, stock: 58, status: '판매중', category: '스킨케어' },
  { id: '2', name: '비건 클렌저 200ml', price: 18000, stock: 12, status: '판매중', category: '스킨케어' },
  { id: '3', name: '비타민 세럼 30ml', price: 28000, stock: 5, status: '품절', category: '스킨케어' },
  { id: '4', name: '아쿠아 토너 150ml', price: 22000, stock: 0, status: '품절', category: '스킨케어' },
  { id: '5', name: '카밍 징크크림 50ml', price: 26000, stock: 0, status: '임시저장', category: '스킨케어' },
]

const STATUS_COLORS: Record<Status, string> = {
  '판매중': 'text-[#1F3D2A] bg-[#EAF2EC]',
  '품절': 'text-[#B84A28] bg-[#FDF0EC]',
  '임시저장': 'text-[#888480] bg-[#F0EDE8]',
}

const TABS = ['전체', '판매중', '품절', '임시저장'] as const
type Tab = typeof TABS[number]

export default function BrandProductsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<Tab>('전체')
  const [products, setProducts] = useState<MockProduct[]>(MOCK_PRODUCTS)

  const filtered = activeTab === '전체' ? products : products.filter(p => p.status === activeTab)

  const counts: Record<Tab, number> = {
    '전체': products.length,
    '판매중': products.filter(p => p.status === '판매중').length,
    '품절': products.filter(p => p.status === '품절').length,
    '임시저장': products.filter(p => p.status === '임시저장').length,
  }

  const handleDelete = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  return (
    <div className="px-8 py-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-[20px] font-bold text-[#111] tracking-[-0.02em]">상품 관리</h1>
          <p className="text-[12px] text-[#888480] mt-0.5">등록된 상품을 관리하세요.</p>
        </div>
        <button
          onClick={() => router.push('/brand/products/new')}
          className="bg-[#111] text-white text-[12px] px-5 py-2.5 hover:bg-[#333] transition-colors flex items-center gap-1.5"
        >
          + 상품 등록하기
        </button>
      </div>

      {/* 탭 */}
      <div className="flex gap-0 border-b border-[#E8E5E0] mb-0">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 text-[13px] border-b-2 -mb-px transition-colors flex items-center gap-1.5 ${
              activeTab === tab ? 'border-[#111] text-[#111] font-semibold' : 'border-transparent text-[#888480] hover:text-[#555]'
            }`}
          >
            {tab}
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === tab ? 'bg-[#111] text-white' : 'bg-[#F0EDE8] text-[#888480]'}`}>
              {counts[tab]}
            </span>
          </button>
        ))}
      </div>

      {/* 테이블 */}
      <div className="bg-white border border-[#E8E5E0] border-t-0">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#E8E5E0] bg-[#FAFAF9]">
              {['상품명', '카테고리', '판매가', '재고', '상태', '관리'].map(h => (
                <th key={h} className={`text-left text-[10px] text-[#B8B4AE] font-medium px-5 py-3 ${h === '관리' ? 'text-right' : ''}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-12 text-[12px] text-[#B8B4AE]">
                  등록된 상품이 없습니다
                </td>
              </tr>
            ) : (
              filtered.map((p) => (
                <tr key={p.id} className="border-b border-[#F0EDE8] last:border-none hover:bg-[#FAFAF9] transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#F0EDE8] flex-shrink-0" />
                      <p className="text-[13px] text-[#111]">{p.name}</p>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-[12px] text-[#888480]">{p.category}</td>
                  <td className="px-5 py-3.5 text-[13px] text-[#111]">{p.price.toLocaleString()}원</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-[12px] ${p.stock <= 5 ? 'text-[#B84A28] font-semibold' : 'text-[#111]'}`}>
                      {p.stock > 0 ? `재고 ${p.stock}개` : '품절'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${STATUS_COLORS[p.status]}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => router.push(`/brand/products/new?id=${p.id}`)}
                        className="text-[11px] text-[#555] border border-[#D8D4CE] px-2.5 py-1 hover:border-[#111] hover:text-[#111] transition-colors"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => router.push('/brand/stock')}
                        className="text-[11px] text-[#555] border border-[#D8D4CE] px-2.5 py-1 hover:border-[#111] hover:text-[#111] transition-colors"
                      >
                        재고관리
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="text-[11px] text-[#B84A28] border border-[#B84A28]/30 px-2.5 py-1 hover:bg-[#B84A28] hover:text-white transition-colors"
                      >
                        삭제
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

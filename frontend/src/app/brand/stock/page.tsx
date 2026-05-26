'use client'

import { useState } from 'react'

type StockStatus = '여유' | '부족' | '품절'

interface StockItem {
  id: string
  name: string
  category: string
  stock: number
  minStock: number
  editing: boolean
  editValue: string
}

const getStatus = (stock: number, minStock: number): StockStatus => {
  if (stock === 0) return '품절'
  if (stock <= minStock) return '부족'
  return '여유'
}

const STATUS_STYLE: Record<StockStatus, string> = {
  '여유': 'text-[#1F3D2A] bg-[#EAF2EC]',
  '부족': 'text-[#B84A28] bg-[#FDF0EC]',
  '품절': 'text-[#888480] bg-[#F0EDE8]',
}

const INITIAL_ITEMS: StockItem[] = [
  { id: '1', name: '시카 베리어 크림 50ml', category: '스킨케어', stock: 58, minStock: 10, editing: false, editValue: '' },
  { id: '2', name: '비건 클렌저 200ml', category: '스킨케어', stock: 12, minStock: 15, editing: false, editValue: '' },
  { id: '3', name: '비타민 세럼 30ml', category: '스킨케어', stock: 5, minStock: 10, editing: false, editValue: '' },
  { id: '4', name: '아쿠아 토너 150ml', category: '스킨케어', stock: 0, minStock: 10, editing: false, editValue: '' },
  { id: '5', name: '카밍 징크크림 50ml', category: '스킨케어', stock: 34, minStock: 10, editing: false, editValue: '' },
]

const TABS = ['전체', '부족', '품절'] as const
type Tab = typeof TABS[number]

export default function BrandStockPage() {
  const [items, setItems] = useState<StockItem[]>(INITIAL_ITEMS)
  const [activeTab, setActiveTab] = useState<Tab>('전체')

  const counts: Record<Tab, number> = {
    '전체': items.length,
    '부족': items.filter(p => getStatus(p.stock, p.minStock) === '부족').length,
    '품절': items.filter(p => getStatus(p.stock, p.minStock) === '품절').length,
  }

  const filtered = activeTab === '전체'
    ? [...items].sort((a, b) => {
        const order: Record<StockStatus, number> = { '품절': 0, '부족': 1, '여유': 2 }
        return order[getStatus(a.stock, a.minStock)] - order[getStatus(b.stock, b.minStock)]
      })
    : items.filter(p => getStatus(p.stock, p.minStock) === activeTab)

  const startEdit = (id: string) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, editing: true, editValue: String(item.stock) } : item
    ))
  }

  const confirmEdit = (id: string) => {
    setItems(prev => prev.map(item => {
      if (item.id !== id) return item
      const val = parseInt(item.editValue)
      return { ...item, stock: isNaN(val) || val < 0 ? item.stock : val, editing: false, editValue: '' }
    }))
  }

  const cancelEdit = (id: string) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, editing: false, editValue: '' } : item
    ))
  }

  const updateEditValue = (id: string, value: string) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, editValue: value } : item
    ))
  }

  const alertItems = items.filter(p => getStatus(p.stock, p.minStock) !== '여유')

  return (
    <div className="px-8 py-6">
      <div className="mb-5">
        <h1 className="text-[20px] font-bold text-[#111] tracking-[-0.02em]">재고 관리</h1>
        <p className="text-[12px] text-[#888480] mt-0.5">상품별 재고 현황을 확인하고 수정하세요.</p>
      </div>

      {/* 재고 알림 배너 */}
      {alertItems.length > 0 && (
        <div className="bg-[#FDF0EC] border border-[#B84A28]/20 px-4 py-3 mb-5 flex items-center gap-3">
          <span className="text-[#B84A28]">🔔</span>
          <p className="text-[12px] text-[#B84A28]">
            재고 확인이 필요한 상품이 <strong>{alertItems.length}개</strong> 있습니다.
          </p>
        </div>
      )}

      {/* 탭 */}
      <div className="flex gap-0 border-b border-[#E8E5E0]">
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
              {['상품명', '카테고리', '현재 재고', '최소 기준', '상태', ''].map((h, i) => (
                <th key={i} className={`text-left text-[10px] text-[#B8B4AE] font-medium px-5 py-3 ${i === 5 ? 'text-right' : ''}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => {
              const status = getStatus(item.stock, item.minStock)
              return (
                <tr
                  key={item.id}
                  className={`border-b border-[#F0EDE8] last:border-none transition-colors ${
                    status !== '여유' ? 'bg-[#FFFAF9]' : 'hover:bg-[#FAFAF9]'
                  }`}
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-[#F0EDE8] flex-shrink-0" />
                      <p className="text-[13px] text-[#111]">{item.name}</p>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-[12px] text-[#888480]">{item.category}</td>
                  <td className="px-5 py-3.5">
                    {item.editing ? (
                      <div className="flex items-center gap-2">
                        <div className="flex items-center border border-[#111] w-24">
                          <input
                            type="number"
                            value={item.editValue}
                            onChange={(e) => updateEditValue(item.id, e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') confirmEdit(item.id)
                              if (e.key === 'Escape') cancelEdit(item.id)
                            }}
                            autoFocus
                            className="w-full text-[13px] px-2 py-1 focus:outline-none"
                          />
                          <span className="text-[11px] text-[#888480] pr-2">개</span>
                        </div>
                        <button onClick={() => confirmEdit(item.id)} className="text-[11px] text-white bg-[#1F3D2A] px-2 py-1 hover:bg-[#2D5A3A] transition-colors">확인</button>
                        <button onClick={() => cancelEdit(item.id)} className="text-[11px] text-[#888480] hover:text-[#111] transition-colors">취소</button>
                      </div>
                    ) : (
                      <span className={`text-[13px] font-medium ${status !== '여유' ? 'text-[#B84A28]' : 'text-[#111]'}`}>
                        {item.stock}개
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3.5 text-[12px] text-[#888480]">{item.minStock}개 이하</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${STATUS_STYLE[status]}`}>
                      {status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    {!item.editing && (
                      <button
                        onClick={() => startEdit(item.id)}
                        className="text-[11px] text-[#555] border border-[#D8D4CE] px-2.5 py-1 hover:border-[#111] hover:text-[#111] transition-colors"
                      >
                        재고 수정
                      </button>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

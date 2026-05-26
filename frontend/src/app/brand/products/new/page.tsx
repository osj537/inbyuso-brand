'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CATEGORIES } from '@/lib/categoryData'

export default function ProductNewPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [mainCategory, setMainCategory] = useState('')
  const [subCategory, setSubCategory] = useState('')
  const [detailCategory, setDetailCategory] = useState('')
  const [price, setPrice] = useState('')
  const [salePrice, setSalePrice] = useState('')
  const [stock, setStock] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState<'판매중' | '임시저장'>('판매중')
  const [saved, setSaved] = useState(false)

  const subCategories = CATEGORIES.find(c => c.slug === mainCategory)?.subCategories ?? []
  const detailCategories = subCategories.find(s => s.label === subCategory)?.details ?? []

  const handleSubmit = (s: typeof status) => {
    setStatus(s)
    setSaved(true)
    setTimeout(() => {
      setSaved(false)
      router.push('/brand/products')
    }, 1000)
  }

  return (
    <div className="px-8 py-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[20px] font-bold text-[#111] tracking-[-0.02em]">상품 등록</h1>
          <p className="text-[12px] text-[#888480] mt-0.5">새 상품 정보를 입력하세요.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.push('/brand/products')}
            className="border border-[#D8D4CE] text-[#888480] text-[12px] px-4 py-2 hover:border-[#111] hover:text-[#111] transition-colors"
          >
            취소
          </button>
          <button
            onClick={() => handleSubmit('임시저장')}
            className="border border-[#D8D4CE] text-[#555] text-[12px] px-4 py-2 hover:border-[#111] hover:text-[#111] transition-colors"
          >
            임시저장
          </button>
          <button
            onClick={() => handleSubmit('판매중')}
            className="bg-[#111] text-white text-[12px] px-5 py-2 hover:bg-[#333] transition-colors"
          >
            {saved ? '저장됨 ✓' : '등록하기'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_260px] gap-6">
        {/* 좌측 */}
        <div className="flex flex-col gap-4">
          {/* 상품명 */}
          <div className="bg-white border border-[#E8E5E0] px-5 py-5">
            <label className="block text-[12px] font-semibold text-[#111] mb-2">
              상품명 <span className="text-[#B84A28]">*</span>
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="상품명을 입력하세요"
              className="w-full border border-[#E8E5E0] text-[13px] px-3 py-2.5 focus:outline-none focus:border-[#111] transition-colors placeholder:text-[#C8C4BE]"
            />
          </div>

          {/* 카테고리 */}
          <div className="bg-white border border-[#E8E5E0] px-5 py-5">
            <label className="block text-[12px] font-semibold text-[#111] mb-3">
              카테고리 <span className="text-[#B84A28]">*</span>
            </label>
            <div className="flex gap-2 items-center">
              <select
                value={mainCategory}
                onChange={(e) => { setMainCategory(e.target.value); setSubCategory(''); setDetailCategory('') }}
                className="flex-1 border border-[#E8E5E0] text-[13px] px-3 py-2.5 focus:outline-none focus:border-[#111] transition-colors bg-white"
              >
                <option value="">대카테고리</option>
                {CATEGORIES.map(c => <option key={c.slug} value={c.slug}>{c.label}</option>)}
              </select>
              <span className="text-[#C8C4BE]">›</span>
              <select
                value={subCategory}
                onChange={(e) => { setSubCategory(e.target.value); setDetailCategory('') }}
                disabled={!mainCategory}
                className="flex-1 border border-[#E8E5E0] text-[13px] px-3 py-2.5 focus:outline-none focus:border-[#111] transition-colors bg-white disabled:bg-[#FAFAF9] disabled:text-[#C8C4BE]"
              >
                <option value="">서브카테고리</option>
                {subCategories.map(s => <option key={s.label} value={s.label}>{s.label}</option>)}
              </select>
              <span className="text-[#C8C4BE]">›</span>
              <select
                value={detailCategory}
                onChange={(e) => setDetailCategory(e.target.value)}
                disabled={!subCategory || detailCategories.length === 0}
                className="flex-1 border border-[#E8E5E0] text-[13px] px-3 py-2.5 focus:outline-none focus:border-[#111] transition-colors bg-white disabled:bg-[#FAFAF9] disabled:text-[#C8C4BE]"
              >
                <option value="">디테일카테고리</option>
                {detailCategories.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>

          {/* 가격 */}
          <div className="bg-white border border-[#E8E5E0] px-5 py-5">
            <label className="block text-[12px] font-semibold text-[#111] mb-3">
              판매가 <span className="text-[#B84A28]">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[10px] text-[#888480] mb-1.5">정가</p>
                <div className="flex items-center border border-[#E8E5E0] focus-within:border-[#111] transition-colors">
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0"
                    className="flex-1 text-[13px] px-3 py-2.5 focus:outline-none"
                  />
                  <span className="text-[12px] text-[#888480] pr-3">원</span>
                </div>
              </div>
              <div>
                <p className="text-[10px] text-[#888480] mb-1.5">재고 수량</p>
                <div className="flex items-center border border-[#E8E5E0] focus-within:border-[#111] transition-colors">
                  <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    placeholder="0"
                    className="flex-1 text-[13px] px-3 py-2.5 focus:outline-none"
                  />
                  <span className="text-[12px] text-[#888480] pr-3">개</span>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <p className="text-[10px] text-[#888480] mb-1.5">할인가 (선택)</p>
              <div className="flex items-center border border-[#E8E5E0] focus-within:border-[#111] transition-colors">
                <input
                  type="number"
                  value={salePrice}
                  onChange={(e) => setSalePrice(e.target.value)}
                  placeholder="0"
                  className="flex-1 text-[13px] px-3 py-2.5 focus:outline-none"
                />
                <span className="text-[12px] text-[#888480] pr-3">원</span>
              </div>
            </div>
          </div>

          {/* 상품 이미지 */}
          <div className="bg-white border border-[#E8E5E0] px-5 py-5">
            <label className="block text-[12px] font-semibold text-[#111] mb-3">상품 이미지</label>
            <div className="flex gap-3">
              <button className="w-20 h-20 border-2 border-dashed border-[#D8D4CE] flex flex-col items-center justify-center hover:border-[#111] transition-colors text-[#C8C4BE] hover:text-[#888480]">
                <span className="text-xl">+</span>
                <span className="text-[9px] mt-0.5">추가</span>
              </button>
              <p className="text-[10px] text-[#B8B4AE] self-end pb-1">
                최대 5장 / JPG, PNG<br />권장 크기: 1:1 비율
              </p>
            </div>
          </div>

          {/* 상품 설명 */}
          <div className="bg-white border border-[#E8E5E0] px-5 py-5">
            <label className="block text-[12px] font-semibold text-[#111] mb-3">상품 설명</label>
            <div className="border border-[#E8E5E0] focus-within:border-[#111] transition-colors">
              <div className="flex items-center gap-1 px-3 py-2 border-b border-[#E8E5E0] bg-[#FAFAF9]">
                {['B', 'I', 'U', 'S'].map((f) => (
                  <button key={f} className="w-6 h-6 text-[11px] font-medium text-[#555] hover:bg-[#E8E5E0] rounded transition-colors">{f}</button>
                ))}
                <div className="w-px h-4 bg-[#E8E5E0] mx-1" />
                {['•', '↩', '↪'].map((f, i) => (
                  <button key={i} className="w-6 h-6 text-[11px] text-[#555] hover:bg-[#E8E5E0] rounded transition-colors">{f}</button>
                ))}
              </div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="상품 특징, 사용법, 주요 성분 등을 입력하세요."
                rows={6}
                className="w-full text-[13px] px-3 py-2.5 focus:outline-none resize-none placeholder:text-[#C8C4BE]"
              />
            </div>
          </div>
        </div>

        {/* 우측 */}
        <div className="flex flex-col gap-3">
          {/* 판매 상태 */}
          <div className="bg-white border border-[#E8E5E0] px-4 py-4">
            <p className="text-[12px] font-semibold text-[#111] mb-3">판매 상태</p>
            <div className="flex flex-col gap-2">
              {(['판매중', '임시저장'] as const).map((s) => (
                <label key={s} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value={s}
                    checked={status === s}
                    onChange={() => setStatus(s)}
                    className="accent-[#1F3D2A]"
                  />
                  <span className="text-[12px] text-[#555]">{s}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 요약 */}
          {(name || price || stock) && (
            <div className="bg-[#F0EDE8] border border-[#E0DDD8] px-4 py-4">
              <p className="text-[11px] font-semibold text-[#444] mb-2">입력 확인</p>
              {name && <p className="text-[11px] text-[#555] mb-1">상품명: {name}</p>}
              {price && <p className="text-[11px] text-[#555] mb-1">정가: {Number(price).toLocaleString()}원</p>}
              {salePrice && <p className="text-[11px] text-[#555] mb-1">할인가: {Number(salePrice).toLocaleString()}원</p>}
              {stock && <p className="text-[11px] text-[#555]">재고: {stock}개</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

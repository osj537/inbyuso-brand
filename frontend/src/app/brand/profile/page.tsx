'use client'

import { useState } from 'react'

export default function BrandProfilePage() {
  const [brandName, setBrandName] = useState('Verde Lab')
  const [tagline, setTagline] = useState('Clean Botanical Skincare')
  const [intro, setIntro] = useState('Verde Lab은 자연에서 찾은 진정한 성분으로 피부 본연의 아름다움을 지켜주는 클린 보타니컬 스킨케어 브랜드입니다.')
  const [story, setStory] = useState('')
  const [sns, setSns] = useState('@verdelab_official')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="px-8 py-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[20px] font-bold text-[#111] tracking-[-0.02em]">브랜드 관리</h1>
          <p className="text-[12px] text-[#888480] mt-0.5">브랜드 정보를 수정하고 저장하세요.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="border border-[#D8D4CE] text-[#888480] text-[12px] px-4 py-2 hover:border-[#111] hover:text-[#111] transition-colors">
            취소
          </button>
          <button
            onClick={handleSave}
            className="bg-[#111] text-white text-[12px] px-5 py-2 hover:bg-[#333] transition-colors"
          >
            {saved ? '저장됨 ✓' : '저장하기'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_280px] gap-6">
        {/* 좌측 폼 */}
        <div className="flex flex-col gap-5">
          {/* 브랜드 로고 */}
          <div className="bg-white border border-[#E8E5E0] px-5 py-5">
            <p className="text-[12px] font-semibold text-[#111] mb-3">브랜드 로고</p>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-[#2A3D2A] rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                V
              </div>
              <div>
                <button className="border border-[#D8D4CE] text-[12px] text-[#555] px-3 py-1.5 hover:border-[#111] transition-colors">
                  이미지 변경
                </button>
                <p className="text-[10px] text-[#B8B4AE] mt-1.5">권장 크기: 200×200px / JPG, PNG</p>
              </div>
            </div>
          </div>

          {/* 브랜드명 */}
          <div className="bg-white border border-[#E8E5E0] px-5 py-5">
            <label className="block text-[12px] font-semibold text-[#111] mb-2">브랜드명</label>
            <input
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              className="w-full border border-[#E8E5E0] text-[13px] px-3 py-2.5 focus:outline-none focus:border-[#111] transition-colors"
            />
          </div>

          {/* 브랜드 핵심 소개 */}
          <div className="bg-white border border-[#E8E5E0] px-5 py-5">
            <label className="block text-[12px] font-semibold text-[#111] mb-2">브랜드 핵심 소개</label>
            <p className="text-[10px] text-[#B8B4AE] mb-2">브랜드를 한 줄로 표현해보세요</p>
            <input
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full border border-[#E8E5E0] text-[13px] px-3 py-2.5 focus:outline-none focus:border-[#111] transition-colors"
            />
          </div>

          {/* 브랜드 소개 */}
          <div className="bg-white border border-[#E8E5E0] px-5 py-5">
            <label className="block text-[12px] font-semibold text-[#111] mb-2">브랜드 소개</label>
            <div className="border border-[#E8E5E0] focus-within:border-[#111] transition-colors">
              <div className="flex items-center gap-1 px-3 py-2 border-b border-[#E8E5E0] bg-[#FAFAF9]">
                {['B', 'I', 'U', 'S'].map((f) => (
                  <button key={f} className="w-6 h-6 text-[11px] font-medium text-[#555] hover:bg-[#E8E5E0] rounded transition-colors">{f}</button>
                ))}
                <div className="w-px h-4 bg-[#E8E5E0] mx-1" />
                {['≡', '•', '↩', '↪'].map((f, i) => (
                  <button key={i} className="w-6 h-6 text-[11px] text-[#555] hover:bg-[#E8E5E0] rounded transition-colors">{f}</button>
                ))}
              </div>
              <textarea
                value={intro}
                onChange={(e) => setIntro(e.target.value)}
                rows={4}
                className="w-full text-[13px] px-3 py-2.5 focus:outline-none resize-none"
              />
            </div>
          </div>

          {/* 브랜드 스토리 */}
          <div className="bg-white border border-[#E8E5E0] px-5 py-5">
            <label className="block text-[12px] font-semibold text-[#111] mb-2">브랜드 스토리</label>
            <textarea
              value={story}
              onChange={(e) => setStory(e.target.value)}
              placeholder="브랜드의 시작과 철학을 자유롭게 작성해보세요."
              rows={5}
              className="w-full border border-[#E8E5E0] text-[13px] px-3 py-2.5 focus:outline-none focus:border-[#111] transition-colors resize-none placeholder:text-[#C8C4BE]"
            />
          </div>

          {/* SNS */}
          <div className="bg-white border border-[#E8E5E0] px-5 py-5">
            <label className="block text-[12px] font-semibold text-[#111] mb-2">인스타그램</label>
            <input
              value={sns}
              onChange={(e) => setSns(e.target.value)}
              placeholder="@계정명"
              className="w-full border border-[#E8E5E0] text-[13px] px-3 py-2.5 focus:outline-none focus:border-[#111] transition-colors"
            />
          </div>
        </div>

        {/* 우측 미리보기 */}
        <div className="flex flex-col gap-3">
          <p className="text-[11px] font-semibold text-[#888480] uppercase tracking-[0.08em]">미리보기</p>
          <div className="bg-white border border-[#E8E5E0] overflow-hidden">
            <div className="bg-[#F0EDE8] aspect-[4/3] flex flex-col items-center justify-center p-6">
              <div className="w-14 h-14 bg-[#2A3D2A] rounded-full flex items-center justify-center text-white text-xl font-bold mb-3">
                {brandName.charAt(0)}
              </div>
              <p className="text-[16px] font-light text-[#2D2A26]">{brandName || 'Brand Name'}</p>
              <p className="text-[11px] text-[#888480] mt-1">{tagline || 'Tagline'}</p>
              {sns && <p className="text-[10px] text-[#B8B4AE] mt-2">{sns}</p>}
            </div>
            <div className="px-4 py-3">
              <p className="text-[11px] text-[#555] leading-relaxed line-clamp-4">{intro}</p>
            </div>
          </div>
          <p className="text-[10px] text-[#B8B4AE] leading-relaxed">
            실제 브랜드 페이지에서 보이는 모습과 다를 수 있어요.
          </p>
        </div>
      </div>
    </div>
  )
}

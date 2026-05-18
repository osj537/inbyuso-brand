const STEPS = [
  {
    num: 'STEP 01',
    title: '신청서 제출',
    desc: '브랜드 소개와 제품 정보를 작성합니다. 10분이면 충분해요.',
  },
  {
    num: 'STEP 02',
    title: '에디터 검토',
    desc: '인뷰소 에디터가 브랜드를 직접 검토합니다. 5영업일 내 결과 안내.',
  },
  {
    num: 'STEP 03',
    title: '상품 등록',
    desc: '브랜드 대시보드에서 직접 상품을 등록하고 관리하세요.',
  },
  {
    num: 'STEP 04',
    title: '판매 시작',
    desc: '에디터 픽과 함께 소비자에게 노출됩니다. 데이터는 실시간으로.',
  },
]

export default function ProcessSection() {
  return (
    <div className="border-t border-b border-[#D8D4CE]">
      <div className="max-w-[1280px] mx-auto px-14 py-24">
        <p className="text-[9px] tracking-[0.28em] uppercase text-[#1F3D2A] mb-3">입점 과정</p>
        <h2 className="text-[clamp(36px,4vw,56px)] font-bold leading-[1.1] tracking-[-0.04em]">
          4단계로<br /><span className="font-light">시작하세요</span>
        </h2>

        <div className="grid grid-cols-4 mt-14 border border-[#D8D4CE]">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className="px-8 py-10 border-r border-[#D8D4CE] last:border-r-0 hover:bg-[#F0EDE8] transition-colors relative"
            >
              <p className="text-[11px] text-[#B8B4AE] tracking-[0.15em] mb-6">{step.num}</p>
              <p className="text-[18px] font-semibold tracking-[-0.03em] mb-3">{step.title}</p>
              <p className="text-xs leading-relaxed text-[#888480] font-light">{step.desc}</p>
              {i < STEPS.length - 1 && (
                <span className="absolute top-1/2 -right-3 -translate-y-1/2 text-[11px] text-[#B8B4AE] bg-[#F8F6F2] px-0 py-1 z-10">›</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const BENEFITS = [
  {
    num: '혜택 01',
    title: '수수료 우대',
    desc: '얼리 파트너 브랜드에게 수수료 특별 우대 조건을 제공합니다',
  },
  {
    num: '혜택 02',
    title: '에디터 픽 우선 노출',
    desc: '인뷰소 메인 페이지 에디터 픽 섹션에 우선 소개됩니다',
  },
  {
    num: '혜택 03',
    title: 'SNS 브랜드 소개',
    desc: '인뷰소 공식 SNS 채널을 통해 브랜드를 직접 소개해드립니다',
  },
]

export default function EarlyBirdSection() {
  return (
    <div className="bg-[#F0EDE8] border-t border-[#D8D4CE] py-20 px-14 text-center" id="apply">
      <p className="text-[9px] tracking-[0.28em] uppercase text-[#B84A28] mb-4">얼리버드 입점 브랜드 혜택</p>
      <h2 className="text-[clamp(32px,4vw,52px)] font-light leading-[1.15] mb-5 tracking-[-0.01em]">
        먼저 함께하는 브랜드에게<br />
        <em className="not-italic text-[#B84A28]">특별한 혜택</em>을 드립니다
      </h2>
      <p className="text-sm text-[#888480] leading-loose max-w-[480px] mx-auto mb-12 font-light">
        인뷰소와 함께 시작하는 얼리 파트너 브랜드에게는<br />
        수수료 우대, 에디터 픽 우선 노출, SNS 브랜드 소개를 제공합니다.
      </p>

      <div className="flex gap-10 justify-center mb-12 flex-wrap">
        {BENEFITS.map((b, i) => (
          <div key={b.num} className="flex gap-10">
            <div className="text-left max-w-[200px]">
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#1F3D2A] mb-2 font-light">{b.num}</p>
              <p className="text-[18px] font-light mb-1.5">{b.title}</p>
              <p className="text-xs text-[#888480] leading-relaxed font-light">{b.desc}</p>
            </div>
            {i < BENEFITS.length - 1 && (
              <div className="w-px bg-[#D8D4CE] self-stretch" />
            )}
          </div>
        ))}
      </div>

      <a
        href="mailto:hello@inbyuso.com"
        className="inline-block bg-[#111] text-[#F8F6F2] px-12 py-4 text-sm tracking-[0.06em] hover:bg-[#1F3D2A] hover:-translate-y-0.5 transition-all duration-200"
      >
        입점 신청하기 →
      </a>
    </div>
  )
}

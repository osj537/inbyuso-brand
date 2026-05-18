const BARS = [
  { label: '20대 여성', value: 68, accent: true },
  { label: '30대 여성', value: 21, accent: false },
  { label: '기타',     value: 11, accent: false },
]

const KEYWORDS = ['비건 스킨케어', '클린뷰티', '민감성 추천', '무향 화장품', '인디 브랜드']

export default function DataDashboard() {
  return (
    <div className="bg-[#111]  py-24">
      <div className="max-w-[1280px] mx-auto px-14 grid grid-cols-[1fr_1.2fr] gap-20 items-center">
        {/* 텍스트 */}
        <div>
          <p className="text-[9px] tracking-[0.28em] uppercase text-white/30 mb-3">브랜드 대시보드</p>
          <h2 className="text-[clamp(36px,4vw,56px)] font-bold leading-[1.1] tracking-[-0.04em] text-[#F8F6F2] mb-4">
            내 브랜드가<br /><span className="font-light text-white/35">어떻게 보이는지</span><br />실시간으로
          </h2>
          <p className="text-sm text-white/40 leading-loose font-light mt-4 max-w-[480px]">
            쇼핑몰에선 알기 어렵던 소비자 행동 데이터를 인뷰소 대시보드에서 확인하세요. 어떤 키워드로 유입되는지, 어느 연령대가 관심 있는지까지.
          </p>
        </div>

        {/* 대시보드 목업 */}
        <div className="bg-white/[0.04] border border-white/[0.08] p-8">
          <div className="flex items-center justify-between mb-7 pb-5 border-b border-white/[0.06]">
            <span className="text-[18px] text-[#F8F6F2] font-light">Verde Lab</span>
            <span className="text-[10px] text-white/30 tracking-[0.1em] uppercase">이번 주 · 05.01 – 05.07</span>
          </div>

          <div className="grid grid-cols-3 mb-7" style={{ gap: '1px', background: 'rgba(255,255,255,0.06)' }}>
            {[
              { num: '1,240', label: '페이지 방문' },
              { num: '187',   label: '찜 횟수' },
              { num: '8.3%',  label: '구매 전환율' },
            ].map((s) => (
              <div key={s.label} className="bg-white/[0.02] px-5 py-5 text-center">
                <p className="text-[32px] font-light text-[#F8F6F2] leading-none mb-1.5">{s.num}</p>
                <p className="text-[10px] text-white/30 tracking-[0.1em] uppercase">{s.label}</p>
              </div>
            ))}
          </div>

          {BARS.map((bar) => (
            <div key={bar.label} className="mb-5">
              <div className="flex justify-between mb-1.5 text-[11px] text-white/35">
                <span>{bar.label}</span>
                <span>{bar.value}%</span>
              </div>
              <div className="h-1 bg-white/[0.06]">
                <div
                  className="h-full transition-all duration-1000"
                  style={{
                    width: `${bar.value}%`,
                    background: bar.accent ? '#6BAE82' : 'rgba(255,255,255,0.4)',
                  }}
                />
              </div>
            </div>
          ))}

          <div className="flex flex-wrap gap-1.5 mt-4">
            {KEYWORDS.map((kw) => (
              <span
                key={kw}
                className="text-[10px] px-2.5 py-1 bg-white/[0.05] border border-white/[0.08] text-white/40 tracking-[0.05em]"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

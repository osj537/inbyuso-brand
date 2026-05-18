'use client'

import Link from 'next/link'

const COMPARE_ROWS = [
  { label: '입점비',           bad: '심사 후',   good: '0원' },
  { label: '광고비',           bad: '있음',      good: '0원' },
  { label: '거래수수료',       bad: '35~45%',   good: '25%' },
  { label: '데이터 공유',      bad: '제한적',    good: '실시간' },
  { label: '데이터 이동 수수료', bad: '+3~4%',   good: '무료' },
  { label: '인디 브랜드 특화', bad: '✗',         good: '✓' },
]

export default function ApplyHero() {
  return (
    <section className="min-h-screen grid grid-cols-2 border-b border-[#D8D4CE] overflow-hidden">
      {/* 좌측 */}
      <div className="flex flex-col justify-between px-14 pt-36 pb-20 border-r border-[#D8D4CE]">
        <div>
          <div className="flex items-center gap-2.5 mb-10">
            <div className="w-7 h-px bg-[#1F3D2A]" />
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#1F3D2A]">브랜드 입점 신청 · 2026</span>
          </div>
          <h1 className="text-[clamp(52px,5.5vw,84px)] font-light leading-[1.06] tracking-[-0.03em] mb-9">
            제품의 가치로<br />
            <span className="text-[#1F3D2A] font-extralight opacity-70">인정받는</span><br />
            <strong className="font-semibold block tracking-[-0.03em]">공간</strong>
          </h1>
          <p className="text-sm leading-loose text-[#888480] max-w-[400px] mb-12">
            마케팅 비용 없이 시작하세요.<br />
            인뷰소는 자본이 아닌 제품력으로<br />
            승부하는 인디 브랜드를 환영합니다.
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="#apply"
              className="bg-[#111] text-[#F8F6F2] px-9 py-4 text-[13px] tracking-[0.06em] hover:bg-[#1F3D2A] transition-colors hover:-translate-y-0.5 duration-200"
            >
              지금 입점 신청하기
            </Link>
            <Link
              href="#why"
              className="text-xs text-[#888480] border-b border-[#D8D4CE] pb-0.5 hover:text-[#111] hover:border-[#111] transition-colors"
            >
              더 알아보기 →
            </Link>
          </div>
        </div>
      </div>

      {/* 우측 비교표 */}
      <div className="bg-[#F0EDE8] flex flex-col justify-center px-12 py-14 relative overflow-hidden">
        <div
          className="absolute bottom-[-30px] right-[-20px] text-[160px] font-semibold pointer-events-none select-none whitespace-nowrap"
          style={{ color: 'rgba(0,0,0,0.04)', fontFamily: 'Pretendard, sans-serif' }}
        >
          INBYUSO
        </div>

        <p className="text-[10px] tracking-[0.2em] uppercase text-[#B8B4AE] font-medium mb-5">인뷰소 vs 쇼핑몰 비교</p>

        {/* 헤더 */}
        <div className="flex items-center justify-between pb-4 border-b border-[#D8D4CE] mb-1">
          <span className="invisible text-sm">-</span>
          <div className="flex gap-8">
            <span className="text-[10px] tracking-[0.08em] uppercase text-[#B8B4AE] text-center w-20">쇼핑몰</span>
            <span className="text-[10px] tracking-[0.1em] uppercase font-bold text-[#111] text-center w-20">인뷰소</span>
          </div>
        </div>

        {COMPARE_ROWS.map((row) => (
          <div key={row.label} className="flex items-center justify-between py-4 border-b border-[#D8D4CE] last:border-none">
            <span className="text-[13px] text-[#111] tracking-[-0.01em]">{row.label}</span>
            <div className="flex gap-8">
              <span className="text-[13px] text-[#999490] text-center w-20">{row.bad}</span>
              <span className="text-[13px] font-bold text-[#1F3D2A] text-center w-20">{row.good}</span>
            </div>
          </div>
        ))}

        <div className="mt-4 px-3.5 py-3 bg-white border-l-2 border-[#B84A28]">
          <p className="text-[11px] text-[#888480] leading-relaxed">
            💡 <strong className="text-[#111]">실제 수수료</strong> — 쇼핑몰의 수수료와 물류비를 포함하면{' '}
            <strong className="text-[#B84A28]">50% 이상</strong>. 인뷰소는 수수료 25% + 배송비 1,000원 지원으로
            실질 약 <strong className="text-[#1F3D2A]">31% 수준</strong>으로 시작 최적 환경.
          </p>
        </div>
      </div>
    </section>
  )
}

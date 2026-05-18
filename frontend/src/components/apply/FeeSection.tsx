export default function FeeSection() {
  return (
    <div className="max-w-[1280px] mx-auto px-14 py-24">
      <p className="text-[9px] tracking-[0.28em] uppercase text-[#1F3D2A] mb-3">
        수수료 구조
      </p>
      <h2 className="text-[clamp(36px,4vw,56px)] font-bold leading-[1.1] tracking-[-0.04em] mb-6">
        판매된 만큼만
        <br />
        <span className="font-light">수수료를 낸다</span>
      </h2>
      <p className="text-sm text-[#888480] leading-loose max-w-[480px] font-light">
        고정비 0원. 쇼핑몰의 절반 수준 수수료에 배송비·쿠폰 지원까지.
      </p>

      <div
        className="grid grid-cols-3 mt-14"
        style={{
          gap: "1px",
          background: "#D8D4CE",
          border: "1px solid #D8D4CE",
        }}
      >
        {/* 입점 & 운영 */}
        <div className="bg-[#F8F6F2] px-10 py-12 hover:bg-[#F0EDE8] transition-colors">
          <p className="text-[9px] tracking-[0.25em] uppercase text-[#B8B4AE] mb-5">
            입점 & 운영
          </p>
          <p className="text-[56px] font-light leading-none tracking-[-0.02em] mb-2">
            0
          </p>
          <p className="text-xs text-[#888480] mb-7 font-light">
            원 / 월 고정비
          </p>
          <ul className="space-y-0">
            {[
              "입점비 없음",
              "광고비 없음",
              "상품 등록 무제한",
              "대시보드 무료 제공",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-[13px] text-[#888480] py-2.5 border-b border-[#D8D4CE] last:border-none font-light"
              >
                <span className="text-[#1F3D2A]">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* 거래수수료 - highlight */}
        <div className="bg-[#1F3D2A] px-10 py-12">
          <p className="text-[9px] tracking-[0.25em] uppercase text-white/40 mb-5">
            거래수수료
          </p>
          <p className="text-[56px] font-light leading-none tracking-[-0.02em] text-white mb-2">
            25%
          </p>
          <p className="text-xs text-white/50 mb-7 font-light">
            판매 발생 시에만
          </p>
          <ul className="space-y-0">
            {[
              "쇼핑몰 대비 절반 수준",
              "팔린 만큼만 수수료",
              "PG 수수료 포함",
              "매월 정산",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-[13px] text-white/70 py-2.5 border-b border-white/10 last:border-none font-light"
              >
                <span className="text-white/80">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <span className="inline-block mt-6 text-[9px] font-medium tracking-[0.12em] uppercase px-2 py-1 bg-white/15 text-white">
            가장 합리적
          </span>
        </div>

        {/* 브랜드 지원혜택 */}
        <div className="bg-[#F8F6F2] px-10 py-12 hover:bg-[#F0EDE8] transition-colors">
          <p className="text-[9px] tracking-[0.25em] uppercase text-[#B8B4AE] mb-5">
            브랜드 지원혜택
          </p>
          <p className="text-[32px] font-light leading-none tracking-[-0.02em] pt-2 mb-2">
            무료
          </p>
          <p className="text-xs text-[#888480] mb-7 font-light">
            배송비 · 쿠폰 지원
          </p>
          <ul className="space-y-0">
            {[
              "신규 입점 배송비 지원",
              "할인쿠폰 발행 지원",
              "에디터 픽 노출",
              "SNS 브랜드 소개",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-[13px] text-[#888480] py-2.5 border-b border-[#D8D4CE] last:border-none font-light"
              >
                <span className="text-[#1F3D2A]">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

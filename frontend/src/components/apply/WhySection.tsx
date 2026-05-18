const WHY_CARDS = [
  {
    num: '01',
    title: '높은 진입 장벽, 이제 없다',
    desc: '쇼핑몰 입점 수수료 35~45%, 무신사 20~30%. 막 시작한 인디 브랜드가 감당하기엔 너무 높아요. 인뷰소는 입점비 0원, 수수료도 25%로 시작 최적 환경이에요. 추가 배송비 지원과 할인쿠폰 제공해 브랜드 부담을 실질적으로 낮춥니다.',
    tag: '입점비 0원',
  },
  {
    num: '02',
    title: '흩어진 고객을 한곳에서',
    desc: 'SNS에서 발견해도 쇼핑몰로 이동, 회원가입, 결제까지 이탈이 너무 많아요. 인뷰소에서는 발견부터 구매까지 한 화면에서 끝나요.',
    tag: '원스탑 구매',
  },
  {
    num: '03',
    title: '에디터 픽으로 노출',
    desc: '마케팅 비용 없이도 인뷰소 에디터가 직접 픽업합니다. 신규 입점 브랜드는 메인 페이지에 우선 노출되고 SNS 채널을 통해 소개됩니다.',
    tag: '에디터 노출',
  },
  {
    num: '04',
    title: '데이터로 브랜드를 키워요',
    desc: '쇼핑몰의 브랜드 데이터를 보려면 추가로 3~4%의 수수료를 내야 합니다. 내 제품 데이터를 보는 데 돈을 내는 구조에요. 인뷰소는 방문자 수, 찜 수, 구매 전환율, 유입 키워드까지 실시간으로 무료 제공합니다.',
    tag: '실시간 데이터',
  },
]

export default function WhySection() {
  return (
    <section className="max-w-[1280px] mx-auto px-14 py-24" id="why">
      <div>
        <p className="text-[9px] tracking-[0.28em] uppercase text-[#1F3D2A] mb-3">왜 인뷰소인가</p>
        <h2 className="text-[clamp(36px,4vw,56px)] font-bold leading-[1.1] tracking-[-0.04em] mb-6">
          브랜드가 겪는<br /><span className="font-light">구조적 문제</span>를<br />해결합니다
        </h2>
      </div>

      <div className="grid grid-cols-2 mt-14" style={{ gap: '1px', background: '#D8D4CE', border: '1px solid #D8D4CE' }}>
        {WHY_CARDS.map((card) => (
          <div key={card.num} className="bg-[#F8F6F2] p-12 hover:bg-[#F0EDE8] transition-colors">
            <p className="text-[48px] font-bold text-[#C8C2B8] leading-none mb-5">{card.num}</p>
            <p className="text-xl font-semibold tracking-[-0.03em] mb-3">{card.title}</p>
            <p className="text-[13px] leading-relaxed text-[#888480] font-light">{card.desc}</p>
            <span className="inline-block mt-5 text-[10px] font-medium tracking-[0.12em] uppercase text-[#1F3D2A] border-b border-[#1F3D2A] pb-0.5">
              {card.tag}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

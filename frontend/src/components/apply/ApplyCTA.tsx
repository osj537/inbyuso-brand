export default function ApplyCTA() {
  return (
    <div className="bg-[#111] py-24 px-14 text-center">
      <h2 className="text-[clamp(40px,5vw,72px)] font-light text-[#F8F6F2] leading-[1.1] mb-5 tracking-[-0.02em]">
        제품의 가치로<br />
        <em className="not-italic text-white/35">말하는 브랜드라면</em>
      </h2>
      <p className="text-sm text-white/40 mb-12 font-light leading-loose">
        인뷰소는 자본이 아닌 제품력으로 승부하는<br />인디 브랜드를 위해 만들었어요.
      </p>
      <a
        href="mailto:hello@inbyuso.com"
        className="inline-block bg-[#F8F6F2] text-[#111] px-12 py-4 text-[13px] font-medium tracking-[0.08em] hover:bg-[#F0EDE8] hover:-translate-y-0.5 transition-all duration-200"
      >
        지금 시작하기
      </a>
      <p className="text-[11px] text-white/20 mt-5 tracking-[0.05em]">입점 문의 · hello@inbyuso.com</p>
    </div>
  )
}

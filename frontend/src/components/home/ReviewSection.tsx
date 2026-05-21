const REVIEWS = [
  { product: '그린 토닉 에센스 150ml', rating: 4.8, text: '피부에 잘 흡수되고 촉촉해요. 트러블도 없고 정말 만족합니다. 재구매 의사 있어요!', author: 'user****', date: '2026.05.01' },
  { product: '그린 토닉 에센스 150ml', rating: 4.8, text: '향이 은은하고 좋아요. 피부가 한결 맑아진 느낌이에요. 추천합니다!', author: 'skin****', date: '2026.05.03' },
  { product: '그린 토닉 에센스 150ml', rating: 4.6, text: '처음엔 반신반의했는데 써보니 정말 좋네요. 친구한테도 추천했어요.', author: 'beau****', date: '2026.05.05' },
  { product: '그린 토닉 에센스 150ml', rating: 4.9, text: '예민한 피부인데도 자극 없이 잘 맞아요. 보습력이 오래가요.', author: 'dry_****', date: '2026.05.07' },
]

export default function ReviewSection() {
  return (
    <section className="max-w-[1200px] mx-auto px-4 py-14">
      {/* 헤더 */}
      <div className="flex items-end justify-between mb-10">
        <div className="flex items-center gap-3">
          <div className="w-6 h-px bg-[#1F3D2A]" />
          <h2 className="text-[22px] font-semibold tracking-tight uppercase text-[#1F3D2A]">실사용 후기</h2>
        </div>
        <button className="text-[11px] text-[#B8B4AE] tracking-[0.08em] border-b border-[#D8D4CE] pb-px hover:text-[#111] hover:border-[#111] transition-colors">
          더보기 →
        </button>
      </div>

      <div className="grid grid-cols-4 gap-px bg-[#D8D4CE] border border-[#D8D4CE]">
        {REVIEWS.map((r, i) => (
          <div key={i} className="bg-[#F8F6F2] p-5 hover:bg-[#F0EDE8] transition-colors">
            <div className="bg-[#E8E5E0] aspect-square mb-4" />
            <div className="flex items-center gap-1 mb-2">
              {Array.from({ length: 5 }).map((_, s) => (
                <svg key={s} className={`w-2.5 h-2.5 ${s < Math.floor(r.rating) ? 'text-[#1F3D2A]' : 'text-[#D8D4CE]'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-[10px] text-[#888480] ml-1">{r.rating}</span>
            </div>
            <p className="text-[11px] text-[#888480] tracking-[0.05em] mb-1.5">{r.product}</p>
            <p className="text-[12px] text-[#111] leading-relaxed line-clamp-3 font-light mb-3">{r.text}</p>
            <div className="flex items-center justify-between text-[10px] text-[#B8B4AE] pt-3 border-t border-[#D8D4CE]">
              <span>{r.author}</span>
              <span>{r.date}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

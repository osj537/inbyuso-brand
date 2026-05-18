import Link from 'next/link'

const FEATURES = [
  { title: '신뢰의 제품', desc: '엄선된 인디 브랜드의\n검증된 제품만 입점합니다' },
  { title: '에디터 검증', desc: '전문 뷰티 에디터가\n직접 사용하고 검증합니다' },
  { title: '집필 & 라이선', desc: '브랜드 스토리와\n제품 정보를 정확히 전달합니다' },
  { title: '데이터 공유', desc: '실시간 판매 데이터를\n브랜드와 투명하게 공유합니다' },
]

export default function BrandCTA() {
  return (
    <section className="bg-gray-50 py-16 mt-8">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex gap-12 items-center">
          {/* 좌측 텍스트 */}
          <div className="w-60 flex-shrink-0">
            <h2 className="text-xl font-bold text-gray-900 leading-7 mb-4">
              인디 브랜드라면,<br />인뷰소와 함께하세요
            </h2>
            <p className="text-xs text-gray-500 leading-5 mb-6">
              까다로운 심사 기준으로 선별된 인디<br />
              브랜드만 입점할 수 있습니다.<br />
              당신의 브랜드를 소개해 주세요.
            </p>
            <Link href="/apply" className="inline-block px-5 py-2.5 bg-black text-white text-xs font-medium rounded hover:bg-gray-800 transition-colors">
              입점 신청하기
            </Link>
          </div>

          {/* 우측 4개 박스 */}
          <div className="flex-1 grid grid-cols-2 gap-4">
            {FEATURES.map((f, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded p-5">
                <p className="text-sm font-bold text-gray-900 mb-2">{f.title}</p>
                <p className="text-xs text-gray-500 leading-5 whitespace-pre-line">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

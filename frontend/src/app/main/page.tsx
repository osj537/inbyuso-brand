import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroBanner from '@/components/home/HeroBanner'
import ProductSection from '@/components/product/ProductSection'
import ReviewSection from '@/components/home/ReviewSection'
import BrandCTA from '@/components/home/BrandCTA'

export default function MainPage() {
  return (
    <div className="min-h-screen bg-[#F8F6F2]">
      <Header />
      <main className="pb-0">
        <HeroBanner />

        {/* 섹션 구분선 */}
        <div className="border-t border-[#D8D4CE]">
          <ProductSection title="실시간 랭킹" section="RANKING" />
        </div>
        <div className="border-t border-[#D8D4CE]">
          <ProductSection title="이번 주 신규입점" section="NEW" />
        </div>
        <div className="border-t border-[#D8D4CE]">
          <ProductSection title="이런 제품 어때요" section="RECOMMEND" />
        </div>

        <div className="border-t border-[#D8D4CE]">
          <ReviewSection />
        </div>

        <BrandCTA />
      </main>
      <Footer />
    </div>
  )
}

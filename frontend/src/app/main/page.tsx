import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroBanner from '@/components/home/HeroBanner'
import ProductSection from '@/components/product/ProductSection'
import ReviewSection from '@/components/home/ReviewSection'
import BrandCTA from '@/components/home/BrandCTA'

export default function MainPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroBanner />
        <div className="divide-y divide-gray-100">
          <ProductSection title="실시간 랭킹" />
          <ProductSection title="이번 주 신규입점" />
          <ProductSection title="이런 제품 어때요" />
        </div>
        <ReviewSection />
        <BrandCTA />
      </main>
      <Footer />
    </div>
  )
}

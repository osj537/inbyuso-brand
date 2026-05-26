import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroBanner from "@/components/home/HeroBanner";
import ProductSection from "@/components/product/ProductSection";
import ReviewSection from "@/components/home/ReviewSection";
import BrandCTA from "@/components/home/BrandCTA";
import { productService } from "@/lib/productService";

export default async function MainPage() {
  const [ranking, newest, recommend] = await Promise.all([
    productService.getProductsServer("RANKING"),
    productService.getProductsServer("NEW"),
    productService.getProductsServer("RECOMMEND"),
  ]);

  return (
    <div className="min-h-screen bg-[#F8F6F2]">
      <Header />
      <main className="pb-0">
        <HeroBanner />

        <div className="border-t border-[#D8D4CE]">
          <ProductSection title="랭킹" products={ranking} />
        </div>
        <div className="border-t border-[#D8D4CE]">
          <ProductSection title="이번 주 신규입점" products={newest} />
        </div>
        <div className="border-t border-[#D8D4CE]">
          <ProductSection title="이런 제품 어때요" products={recommend} />
        </div>

        <div className="border-t border-[#D8D4CE]">
          <ReviewSection />
        </div>

        <BrandCTA />
      </main>
      <Footer />
    </div>
  );
}

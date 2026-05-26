import Footer from "@/components/layout/Footer";
import ApplyHeader from "@/components/layout/ApplyHeader";
import ApplyHero from "@/components/apply/ApplyHero";
import WhySection from "@/components/apply/WhySection";
import DataDashboard from "@/components/apply/DataDashboard";
import ProcessSection from "@/components/apply/ProcessSection";
import FeeSection from "@/components/apply/FeeSection";
import EarlyBirdSection from "@/components/apply/EarlyBirdSection";
import ApplyCTA from "@/components/apply/ApplyCTA";

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-[#F8F6F2]">
      <ApplyHeader />
      <main>
        <ApplyHero />
        <WhySection />
        <DataDashboard />
        <ProcessSection />
        <FeeSection />
        <EarlyBirdSection />
        <ApplyCTA />
      </main>
      <Footer />
    </div>
  );
}

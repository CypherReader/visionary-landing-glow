import Hero from "@/components/Hero";
import Features from "@/components/Features";
import CTA from "@/components/CTA";
import CNYPromoModal from "@/components/CNYPromoModal";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <CNYPromoModal />
      <Hero />
      <Features />
      <CTA />
    </div>
  );
};

export default Index;

import { useState, useEffect } from "react";
import { HeroSection } from "@/components/home/hero-section";
import { ServicesPreview } from "@/components/home/services-preview";
import { StatsSection } from "@/components/home/stats-section";
import { Testimonials } from "@/components/home/testimonials";
import { CTASection } from "@/components/home/cta-section";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import Instagram from "@/components/home/Instagram";
import Newsletter from "@/components/sponser/newsletterhome";

const Home = () => {
  const [showNewsletter, setShowNewsletter] = useState(true);

  useEffect(() => {
    // Remove adminData from local storage when Home component mounts
    localStorage.removeItem('adminData');
  }, []);

  const handleCloseNewsletter = () => {
    setShowNewsletter(false);
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar />
      <main className="flex-1">
        <div style={{ zIndex: "100" }}>
          <HeroSection />
        </div>
        
        <ServicesPreview />
        <StatsSection />
        <Instagram />
        <Testimonials />
        
        <CTASection />

        {/* Newsletter Section - Integrated before Footer */}
        {showNewsletter && (
          <div className="">
            <Newsletter onClose={handleCloseNewsletter} />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Home;

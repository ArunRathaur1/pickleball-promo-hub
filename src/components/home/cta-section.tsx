
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export function CTASection() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('cta-section');
      if (section) {
        const sectionPosition = section.getBoundingClientRect();
        if (sectionPosition.top < window.innerHeight * 0.75) {
          setIsVisible(true);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Check on initial load too
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <section id="cta-section" className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-pickle-dark via-pickle to-pickle-light opacity-90"></div>
      <div className="absolute inset-0 bg-[url('/src/images/5.jpeg')] bg-center bg-cover mix-blend-overlay opacity-20"></div>
      
      <div className="container relative z-10">
        <div 
          className={`max-w-4xl mx-auto text-center text-white py-12 px-4 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Elevate Your Pickleball Presence?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Whether you're an athlete looking to build your brand, a tournament
            seeking promotion, or a company wanting to connect with the
            pickleball community, we're here to help.
          </p>
          <div 
            className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <Link to="/sponsor" target="_blank">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-pickle hover:bg-white/90 group btn-animated"
              >
                Our Sponsors
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-black hover:bg-white/10 btn-animated"
              >
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Top wave shape */}
      <div className="absolute top-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full rotate-180 text-background">
          <path
            fill="currentColor"
            fillOpacity="1"
            d="M0,64L60,53.3C120,43,240,21,360,32C480,43,600,85,720,90.7C840,96,960,64,1080,48C1200,32,1320,32,1380,32L1440,32L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}

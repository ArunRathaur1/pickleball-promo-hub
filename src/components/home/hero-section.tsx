
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Import images correctly
import hero1 from "../../images/1.jpg";
import hero2 from "../../images/2.jpg";
import hero3 from "../../images/3.jpg";
import hero4 from "../../images/10.jpg";
import hero5 from "../../images/4.jpg";
import hero6 from "../../images/5.jpg";
import hero7 from "../../images/6.jpg";
import hero8 from "../../images/7.jpg";
import hero9 from "../../images/8.jpg";
import hero10 from "../../images/8.jpg";
import hero11 from "../../images/9.jpg";

// Sample images for carousel
const HERO_IMAGES=[hero1,hero2,hero3,hero4,hero5,hero6,hero7,hero8,hero9,hero10,hero11];

export function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  // Image carousel logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <div className="relative bg-black overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-10" />
      
      {/* Background image carousel */}
      <div className="absolute inset-0">
        {HERO_IMAGES.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}
      </div>
      
      {/* Content */}
      <div className="container relative z-20 py-20 md:py-32 lg:py-40">
        <div className="max-w-3xl mx-auto text-center">
          <h1 
            className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Pickleball <span className="text-pickle">Made</span> Social
          </h1>
          
          <p 
            className={`text-lg md:text-xl text-white/90 mb-8 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            The premier digital marketing agency exclusively for pickleball athletes, tournaments, and brands.
          </p>
          
          <div 
            className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <Link to="/contact">
              <Button size="lg" className="bg-pickle hover:bg-pickle-dark group btn-animated">
                Get in Touch
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/services">
              <Button size="lg" variant="outline" className="text-black border-white hover:bg-white/10 hover:text-white btn-animated">
                Our Services
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Bottom wave shape */}
      
    </div>
  );
}

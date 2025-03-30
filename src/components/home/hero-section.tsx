
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Sample images for carousel
const HERO_IMAGES = [
  "/images/hero1.jpg",
  "/images/hero2.jpg",
  "/images/hero3.jpg",
];

export function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);
  
  // Image carousel logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    
    return () => clearInterval(interval);
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
            Pickle <span className="text-pickle">Made</span> Social
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-8 animate-fade-in" style={{ animationDelay: "200ms" }}>
            The premier digital marketing agency exclusively for pickleball athletes, tournaments, and brands.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "400ms" }}>
            <Link to="/contact">
              <Button size="lg" className="bg-pickle hover:bg-pickle-dark group">
                Get in Touch
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/services">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Our Services
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Bottom wave shape */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
          <path 
            fill="currentColor" 
            fillOpacity="1" 
            className="text-background"
            d="M0,64L60,53.3C120,43,240,21,360,32C480,43,600,85,720,90.7C840,96,960,64,1080,48C1200,32,1320,32,1380,32L1440,32L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
          ></path>
        </svg>
      </div>
    </div>
  );
}

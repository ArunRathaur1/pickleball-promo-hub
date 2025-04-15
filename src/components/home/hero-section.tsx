
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Import images correctly
import hero1 from "../../images/1.jpeg";
import hero2 from "../../images/1.png";
import hero3 from "../../images/2.jpeg";
import hero4 from "../../images/3.jpeg";
import hero5 from "../../images/4.jpeg";
import hero6 from "../../images/5.jpeg";
import hero7 from "../../images/6.jpeg";
import hero8 from "../../images/7.jpeg";
import hero9 from "../../images/7.jpg";
import hero10 from "../../images/8.jpeg";
import hero11 from "../../images/13.jpg";

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

  // Animated variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };
  
  return (
    <div className="relative bg-black overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 z-10" />
      
      {/* Background image carousel with smooth fade transitions */}
      <div className="absolute inset-0">
        {HERO_IMAGES.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1500 ${
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
      <div className="container relative z-20 py-24 md:py-36 lg:py-44">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            variants={itemVariants}
          >
            Pickleball <span className="text-[#123c2f]">Official</span> Media
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-white/90 mb-8"
            variants={itemVariants}
          >
            The premier digital marketing agency exclusively for pickleball athletes, tournaments, and brands across Asia.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={itemVariants}
          >
            <Link to="/contact">
              <Button size="lg" className="bg-[#123c2f] hover:bg-[#0b2820] group transition-all duration-300">
                Get in Touch
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/services">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 transition-colors duration-300">
                Our Services
              </Button>
            </Link>
          </motion.div>
        </motion.div>
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

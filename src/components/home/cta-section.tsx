
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
    <motion.section 
      id="cta-section" 
      className="py-20 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#123c2f] via-[#123c2f]/90 to-[#123c2f]/80 opacity-90"></div>
      <div className="absolute inset-0 bg-[url('/src/images/5.jpeg')] bg-center bg-cover mix-blend-overlay opacity-30"></div>
      
      <div className="container relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center text-white py-12 px-4"
          initial={{ y: 50, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={isVisible ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Ready to Elevate Your Pickleball Presence?
          </motion.h2>
          <motion.p 
            className="text-white/90 text-lg mb-8 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={isVisible ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Whether you're an athlete looking to build your brand, a tournament
            seeking promotion, or a company wanting to connect with the
            pickleball community, we're here to help.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ y: 20, opacity: 0 }}
            animate={isVisible ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link to="/sponsor" target="_blank">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-[#123c2f] hover:bg-white/90 group transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Our Sponsors
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
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
    </motion.section>
  );
}

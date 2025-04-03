import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function TrustedBrands() {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [isHovering, setIsHovering] = useState(false);

  // Brands array with more items for a continuous scrolling effect
  const brands = [
    { src: "/images/lifeaid.jpg", alt: "Lifeaid" },
    { src: "/images/organifi.jpg", alt: "Organifi" },
    { src: "/images/vuori.jpg", alt: "Vuori" },
    { src: "/images/franklin.png", alt: "Franklin Pickleball" },
    { src: "/images/lmnt.jpg", alt: "LMNT" },
    { src: "/images/kswiss.jpg", alt: "Kswiss" },
    { src: "/images/amazon.jpg", alt: "Amazon Pharmacy" },
    { src: "/images/nike.jpg", alt: "Nike" },
    // Duplicate the array for seamless scrolling
    { src: "/images/lifeaid.jpg", alt: "Lifeaid" },
    { src: "/images/organifi.jpg", alt: "Organifi" },
    { src: "/images/vuori.jpg", alt: "Vuori" },
    { src: "/images/franklin.png", alt: "Franklin Pickleball" },
    { src: "/images/lmnt.jpg", alt: "LMNT" },
    { src: "/images/kswiss.jpg", alt: "Kswiss" },
    { src: "/images/amazon.jpg", alt: "Amazon Pharmacy" },
    { src: "/images/nike.jpg", alt: "Nike" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current && !isHovering) {
        scrollRef.current.scrollLeft += 1; // Smoother scrolling with smaller increments

        // Reset when reaching the end of original items (halfway point)
        if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth / 2) {
          scrollRef.current.scrollLeft = 0;
        }
      }
    }, 10); // Faster interval for smoother scrolling

    return () => clearInterval(interval);
  }, [isHovering]);

  return (
    <div
      className="bg-black text-white py-16 px-4"
      ref={containerRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <motion.h2
        className="text-4xl font-bold mb-10 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
      >
        Trusted by Top Brands
      </motion.h2>

      <div className="relative max-w-7xl mx-auto">
        {/* Left gradient fade effect */}
        <div className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-black to-transparent z-10"></div>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-hide py-8 px-4"
          style={{
            scrollBehavior: "smooth",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {brands.map((brand, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                scale: 1.15,
                boxShadow: "0 0 15px rgba(72, 187, 120, 0.6)",
                borderColor: "#48bb78",
              }}
              className="flex-shrink-0 w-52 h-32 bg-black border border-gray-800 rounded-xl shadow-xl flex items-center justify-center mx-4 transition-all duration-300"
            >
              <img
                src={brand.src}
                alt={brand.alt}
                className="max-w-full max-h-20 object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            </motion.div>
          ))}
        </div>

        {/* Right gradient fade effect */}
        <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-black to-transparent z-10"></div>
      </div>
    </div>
  );
}

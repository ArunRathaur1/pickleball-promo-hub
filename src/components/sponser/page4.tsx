import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function TrustedBrands() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft += 200; // Adjust scrolling speed
        if (
          scrollRef.current.scrollLeft + scrollRef.current.clientWidth >=
          scrollRef.current.scrollWidth
        ) {
          scrollRef.current.scrollLeft = 0;
        }
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const brands = [
    { src: "/images/lifeaid.jpg", alt: "Lifeaid" },
    { src: "/images/organifi.jpg", alt: "Organifi" },
    { src: "/images/vuori.jpg", alt: "Vuori" },
    { src: "/images/franklin.png", alt: "Franklin Pickleball" },
    { src: "/images/lmnt.jpg", alt: "LMNT" },
    { src: "/images/kswiss.jpg", alt: "Kswiss" },
    { src: "/images/amazon.jpg", alt: "Amazon Pharmacy" },
    { src: "/images/nike.jpg", alt: "Nike" },
  ];

  return (
    <div className="bg-white py-10">
      <h2 className="text-black text-center text-3xl font-semibold mb-6">
        Trusted by Top Brands
      </h2>
      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-6 scrollbar-hide px-4"
      >
        {brands.map((brand, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
            className="flex-shrink-0 w-40 h-24 bg-white rounded-lg shadow-md flex items-center justify-center"
          >
            <img src={brand.src} alt={brand.alt} className="max-w-full h-16" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

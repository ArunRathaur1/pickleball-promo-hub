import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import hero1 from "../../images/sp1.svg";
import hero2 from "../../images/sp2.webp";
import hero3 from "../../images/sp3.png";
import hero4 from "../../images/sp4.png";
import hero5 from "../../images/sp5.jpg";
import hero6 from "../../images/sp6.webp";
import hero7 from "../../images/sp7.png";

export default function TrustedBrands() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const brands = [
    {
      src: hero1,
      alt: "sixzeropickleball",
      link: "https://www.sixzeropickleball.com/?srsltid=AfmBOoogHgRsZW2x0UK5dSwmVSKP-22MCYfvULNjzYpb7_YmbPr224wp",
    },
    { src: hero2, alt: "Globalsports", link: "https://globalsports.net.in/" },
    {
      src: hero3,
      alt: "Itsgoa",
      link: "https://itsgoa.com/aguada-pickleball-arena",
    },
    { src: hero4, alt: "Duper", link: "https://www.dupr.com/" },
    {
      src: hero6,
      alt: "MaxWill",
      link: "https://www.maxwillsports.com/?srsltid=AfmBOopWLBBzY2cpbqdfg5K_C264ERFHhBgAC-kkxdgn1tSpRYYMX0pf",
    },
    { src: hero7, alt: "Pickleball", link: "https://pickleball.in/" },
  ];

  return (
    <div
      className="bg-black text-white py-20 px-4 min-h-screen flex flex-col items-center"
      ref={containerRef}
    >
      <motion.h2
        className="text-5xl font-extrabold mb-12 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
        transition={{ duration: 0.8 }}
      >
        Trusted by Top Brands
      </motion.h2>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl mx-2"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.3 },
          },
        }}
      >
        {brands.map((brand, index) => (
          <motion.div
            key={index}
            className="bg-black border border-green-400 p-8 rounded-2xl shadow-2xl flex items-center justify-center hover:scale-105 transition-transform duration-300 ease-in-out hover:bg-green-100 hover:text-black"
            variants={{
              hidden: { opacity: 0, scale: 0.9, y: 20 },
              visible: {
                opacity: 1,
                scale: 1,
                y: 0,
                transition: { duration: 0.5 },
              },
            }}
          >
            <a href={brand.link} target="_blank" rel="noopener noreferrer">
              <img
                src={brand.src}
                alt={brand.alt}
                className={`w-full max-h-24 object-contain grayscale hover:grayscale-0 transition-all duration-300 ${
                  brand.alt === "MaxWill" ? "bg-white p-2 rounded" : ""
                }`}
              />
            </a>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

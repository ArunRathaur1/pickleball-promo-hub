import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function TrustedBrands() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const brands = [
    { src: "/images/6fe524de.jpg", alt: "Lifeaid" },
    { src: "/images/05fd3661.jpg", alt: "Organifi" },
    { src: "/images/3fa53155.jpg", alt: "Vuori" },
    { src: "/images/ea142f4b.png", alt: "Franklin Pickleball" },
    { src: "/images/c159c86c.jpg", alt: "LMNT" },
    { src: "/images/b7e1e45a.jpg", alt: "Kswiss" },
    { src: "/images/0932500a.jpg", alt: "Amazon Pharmacy" },
    { src: "/images/651b10a8.png", alt: "Head Pickleball" },
    { src: "/images/6fe81811.jpg", alt: "Adidas" },
    { src: "/images/1499c763.png", alt: "Selkirk" },
    { src: "/images/900a0000.png", alt: "OS1st" },
    { src: "/images/e389cc08.jpg", alt: "Nike" },
    { src: "/images/05a8a827.jpg", alt: "Brooklinen" },
    { src: "/images/09d79c7f.png", alt: "Babolat" },
    { src: "/images/b546c824.jpg", alt: "MorningBrew" },
    { src: "/images/5b3d9239.png", alt: "Vint" },
    { src: "/images/f05811f1.jpg", alt: "Manscaped" },
    { src: "/images/7adf9438.jpg", alt: "Therabody" },
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
            <img
              src={brand.src}
              alt={brand.alt}
              className="w-full max-h-24 object-contain grayscale hover:grayscale-0 transition-all duration-300"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

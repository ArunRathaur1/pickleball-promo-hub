import React from "react";
import { motion } from "framer-motion";
import logo from "./pickelballlogo.png";

export default function Page1() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white py-16 px-6">
      {/* Logo Section */}
      <motion.div
        id="image02"
        className="flex items-center justify-center mb-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <a
          href="/"
          className="p-4 bg-gray-800 shadow-lg rounded-lg hover:scale-105 transition-transform"
        >
          <img src={logo} alt="The Pickleball Logo" className="w-40 h-auto" />
        </a>
      </motion.div>

      {/* Heading */}
      <motion.h1
        id="text29"
        className="text-3xl md:text-4xl font-extrabold text-white text-center mb-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        PARTNER WITH{" "}
        <span className="text-green-400">THE PICKLEBALL OFFICIAL</span>
      </motion.h1>

      {/* Description */}
      <motion.p
        id="text30"
        className="text-lg md:text-xl text-gray-300 text-center max-w-2xl leading-relaxed mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
      >
        The Ultimate Source for Pickleball. <br />
        Your #1 Destination for News, Media, and Events.
      </motion.p>

      {/* Icon Button */}
      <motion.ul
        id="icons03"
        className="flex space-x-4 mt-4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
      >
        
      </motion.ul>
    </div>
  );
}

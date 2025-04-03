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
          href="https://thedinkpickleball.com/?ref=partnerpage"
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
        <li>
          <motion.a
            role="button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex flex-col items-center justify-center bg-green-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-green-700 transition"
          >
            <svg
              className="w-6 h-6"
              aria-labelledby="icons03-icon-1-title"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 40 40"
            >
              <title id="icons03-icon-1-title">Chevron Down</title>
              <polygon points="3.6,10.5 3.6,29.5 20,39 36.4,29.5 36.4,10.5 20,1" />
            </svg>
            <span className="text-xs font-medium mt-2">Chevron</span>
          </motion.a>
        </li>
      </motion.ul>
    </div>
  );
}

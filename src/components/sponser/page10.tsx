import React, { useState, useEffect } from "react";
import { Navbar } from "../layout/navbar";
import { Footer } from "../layout/footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Page10() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 100) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Check on initial load too
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-white to-gray-100 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Sponsors
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're proud to partner with these amazing organizations who share
              our passion for pickleball and community building.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            {/* Sponsor 1 */}
            <motion.div
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              variants={itemVariants}
            >
              <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">
                  Sponsor Logo
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Premium Sponsor
                </h3>
                <p className="text-gray-600 mb-4">
                  Leading provider of premium pickleball equipment and
                  accessories, supporting players at all levels.
                </p>
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                >
                  Visit Website <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </motion.div>

            {/* Sponsor 2 */}
            <motion.div
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              variants={itemVariants}
            >
              <div className="h-48 bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">
                  Sponsor Logo
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Event Partner
                </h3>
                <p className="text-gray-600 mb-4">
                  Dedicated to creating exceptional pickleball events and
                  tournaments across the country.
                </p>
                <a
                  href="#"
                  className="text-green-600 hover:text-green-800 font-medium inline-flex items-center"
                >
                  Visit Website <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </motion.div>

            {/* Sponsor 3 */}
            <motion.div
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              variants={itemVariants}
            >
              <div className="h-48 bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">
                  Sponsor Logo
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Community Supporter
                </h3>
                <p className="text-gray-600 mb-4">
                  Focused on growing the pickleball community through grassroots
                  initiatives and local programs.
                </p>
                <a
                  href="#"
                  className="text-amber-600 hover:text-amber-800 font-medium inline-flex items-center"
                >
                  Visit Website <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </motion.div>

            {/* Sponsor 4 */}
            <motion.div
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              variants={itemVariants}
            >
              <div className="h-48 bg-gradient-to-r from-red-500 to-pink-600 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">
                  Sponsor Logo
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Technology Partner
                </h3>
                <p className="text-gray-600 mb-4">
                  Bringing innovative technology solutions to enhance the
                  pickleball experience for players and fans.
                </p>
                <a
                  href="#"
                  className="text-red-600 hover:text-red-800 font-medium inline-flex items-center"
                >
                  Visit Website <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </motion.div>

            {/* Sponsor 5 */}
            <motion.div
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              variants={itemVariants}
            >
              <div className="h-48 bg-gradient-to-r from-indigo-500 to-violet-600 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">
                  Sponsor Logo
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Apparel Sponsor
                </h3>
                <p className="text-gray-600 mb-4">
                  Crafting high-performance pickleball apparel designed for
                  comfort, style, and peak performance.
                </p>
                <a
                  href="#"
                  className="text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center"
                >
                  Visit Website <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </motion.div>

            {/* Sponsor 6 */}
            <motion.div
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              variants={itemVariants}
            >
              <div className="h-48 bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">
                  Sponsor Logo
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Nutrition Partner
                </h3>
                <p className="text-gray-600 mb-4">
                  Providing athletes with premium nutrition products to fuel
                  their pickleball performance and recovery.
                </p>
                <a
                  href="#"
                  className="text-cyan-600 hover:text-cyan-800 font-medium inline-flex items-center"
                >
                  Visit Website <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Interested in becoming a sponsor?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Join our growing network of partners and connect with the
              pickleball community. We offer various sponsorship packages to meet
              your marketing goals.
            </p>
            <Link to="/contact">
              <Button
                size="lg"
                className="bg-[#123c2f] hover:bg-[#0b2820] text-white px-8"
              >
                Contact Us About Sponsorship
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}

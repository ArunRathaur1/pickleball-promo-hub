"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const MinorLeagueSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div id="container06" className="w-full bg-black py-12 flex justify-center">
      <div className="max-w-5xl w-full px-6">
        <div ref={ref} className="flex flex-col items-center text-center">
          {/* Image Section */}
          <motion.div
            id="image03"
            className="border border-gray-700 rounded-md shadow-lg p-4 mb-6 bg-gray-900"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
          >
            <span className="block">
              <img
                src="/Partner with The Dink_files/image03.png"
                alt="The Dink Minor League"
                title="The Dink Minor League"
                className="rounded-md"
              />
            </span>
          </motion.div>

          {/* Title */}
          <motion.h3
            id="text18"
            className="text-2xl font-bold text-green-500 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            The Largest Amateur Team Circuit
          </motion.h3>

          {/* Table Section */}
          <motion.div
            id="table02"
            className="w-full max-w-md bg-gray-900 shadow-lg rounded-md p-6 mb-6 border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <table className="w-full text-center">
              <thead>
                <tr className="text-xl font-bold text-green-500">
                  <th>20k</th>
                  <th>300</th>
                  <th>8</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr>
                  <td className="pt-2 text-sm">Players</td>
                  <td className="pt-2 text-sm">Events</td>
                  <td className="pt-2 text-sm">Countries</td>
                </tr>
              </tbody>
            </table>
          </motion.div>

          {/* Description */}
          <motion.p
            id="text23"
            className="text-lg text-gray-300 leading-relaxed max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Minor League Pickleball is the team-based amateur tour where
            everyday players battle like pros. Across the U.S. and now
            internationally, teams compete in local, state, and regional events,
            with division winners earning the coveted Dream Ticket — an
            invitation to the $100K winner-take-all National Championship.
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default MinorLeagueSection;

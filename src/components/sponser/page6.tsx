import { motion } from "framer-motion";

export default function PickleballPodcast() {
  return (
    <div className="bg-gray-900 text-white py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Heading */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-lg font-semibold text-green-400"
        >
          Expert Insights • Bold Conversations • Exclusive Interviews
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold mt-4"
        >
          The Pickleball Pulse Podcast
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 text-gray-300 leading-relaxed max-w-3xl mx-auto"
        >
          Hosted by top pro <span className="font-bold">Zane Navratil</span> and
          industry insider <span className="font-bold">Thomas Shields</span>,
          this podcast dives into the latest trends, controversies, and success
          stories shaping the pickleball world.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 flex flex-col sm:flex-row justify-center gap-8 text-lg"
        >
          <div className="bg-green-500 px-6 py-4 rounded-lg shadow-md">
            <span className="font-bold text-black">10k+ Monthly Listeners</span>
            <p className="text-sm text-gray-800">Across All Platforms</p>
          </div>
          <div className="bg-green-500 px-6 py-4 rounded-lg shadow-md">
            <span className="font-bold text-black">Award-Winning Content</span>
            <p className="text-sm text-gray-800">
              Best Pickleball Podcast 2024
            </p>
          </div>
        </motion.div>

        {/* Podcast Platforms */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 text-xl font-semibold"
        >
          {/* Where to Listen: */}
        </motion.p>

        {/* <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-6 flex justify-center gap-6"
        >
          <img
            src="/images/instagram.png"
            alt="Instagram"
            width={50}
            height={50}
          />
          <img
            src="/images/youtube.png"
            alt="YouTube"
            width={50}
            height={50}
          />
          <img
            src="/images/twitter.png"
            alt="Twitter/X"
            width={50}
            height={50}
          />
        </motion.div> */}
      </div>
    </div>
  );
}

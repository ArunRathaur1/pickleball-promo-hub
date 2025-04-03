import { motion } from "framer-motion";

export default function PickleballInsights() {
  return (
    <div className="bg-gray-900 text-white py-16">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
        {/* Left: Image Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 flex justify-center"
        >
          <img
            src="/images/image01.png"
            alt="The Dink Website"
            className="rounded-lg shadow-lg w-full max-w-sm"
          />
        </motion.div>

        {/* Right: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 text-center md:text-left"
        >
          <h1 className="text-lg font-semibold text-green-400 uppercase tracking-wider">
            Insights • Tips • Gear Reviews • Breaking News
          </h1>
          <h2 className="text-4xl font-bold mt-4">
            Your Go-To Source for Everything Pickleball
          </h2>
          <p className="mt-4 text-gray-300 leading-relaxed">
            Stay ahead with expert advice, in-depth reviews, and the latest
            updates from the fastest-growing sport in the world—designed for
            players of all levels.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

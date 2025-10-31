import { motion } from "framer-motion";

const Home = ({ onStart }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-teal-900 to-gray-900 text-white px-4 sm:px-6">
      <div className="w-full max-w-5xl mx-auto py-12 sm:py-20 flex flex-col sm:flex-row items-center gap-10">
        {/* Left / Intro (on desktop) */}
        <motion.div
          className="flex-1 text-center sm:text-left"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Project <span className="text-teal-400">Samarth</span>
          </motion.h1>

          <p className="text-base sm:text-lg text-gray-300 mb-6 max-w-xl">
            An Intelligent Q&A System that connects India's{" "}
            <span className="text-yellow-400">Agricultural Economy</span> and{" "}
            <span className="text-teal-300">Climate Data</span> — empowering
            data-driven policy and insights.
          </p>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-5 border border-gray-700 mb-6 inline-block text-left">
            <h2 className="text-lg sm:text-xl font-semibold text-teal-400 mb-3">
              How It Works
            </h2>
            <ul className="text-sm sm:text-base text-gray-300 space-y-2">
              <li className="flex items-start">
                <span className="text-teal-400 mr-2">•</span>
                <span>
                  Connects to government data sources from Ministry of
                  Agriculture & IMD
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-400 mr-2">•</span>
                <span>
                  Processes natural language queries about crops, rainfall,
                  and policy
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-400 mr-2">•</span>
                <span>
                  Synthesizes data from multiple sources for comprehensive
                  insights
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-400 mr-2">•</span>
                <span>Cites all data sources for transparency and traceability</span>
              </li>
            </ul>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="sm:mt-2"
          >
            <motion.button
              onClick={onStart}
              aria-label="Start chat"
              className="w-full sm:w-auto bg-teal-500 hover:bg-teal-600 px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-base sm:text-lg font-semibold shadow-lg transition-all flex items-center justify-center gap-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Start Chat
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right / Illustration or compact card for mobile */}
        <motion.aside
          className="flex-1 max-w-md w-full"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-gray-700 rounded-2xl p-6 sm:p-8 shadow-xl">
            <h3 className="text-lg sm:text-xl font-semibold text-white/90 mb-3">
              Ask about crops, rainfall, or policy
            </h3>
            <p className="text-sm sm:text-base text-gray-300 mb-4">
              Try questions like: "How did maize yield change in Maharashtra in
              the last 5 years?" or "Show recent IMD rainfall trends for Odisha."
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => onStart && onStart("example:crops")}
                className="w-full sm:w-auto bg-white/8 hover:bg-white/12 text-white px-4 py-2 rounded-lg text-sm sm:text-base transition"
              >
                Example: Crops
              </button>
              <button
                onClick={() => onStart && onStart("example:rainfall")}
                className="w-full sm:w-auto bg-white/8 hover:bg-white/12 text-white px-4 py-2 rounded-lg text-sm sm:text-base transition"
              >
                Example: Rainfall
              </button>
            </div>
          </div>
        </motion.aside>
      </div>

      <motion.footer
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 text-sm text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        
      </motion.footer>
    </div>
  );
};
export default Home;

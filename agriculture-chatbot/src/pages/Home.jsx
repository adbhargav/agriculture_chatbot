import { motion } from "framer-motion";

const Home = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-teal-900 to-gray-900 text-white px-6">
      <motion.h1
        className="text-5xl md:text-6xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Project <span className="text-teal-400">Samarth</span>
      </motion.h1>

      <motion.div 
        className="max-w-2xl text-center mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <p className="text-lg md:text-xl text-gray-300 mb-6">
          An Intelligent Q&A System that connects India's <span className="text-yellow-400">Agricultural Economy</span> 
          and <span className="text-teal-300">Climate Data</span> — empowering data-driven policy and insights.
        </p>
        
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 mb-8">
          <h2 className="text-xl font-semibold text-teal-400 mb-3">How It Works</h2>
          <ul className="text-left text-gray-300 space-y-2">
            <li className="flex items-start">
              <span className="text-teal-400 mr-2">•</span>
              <span>Connects to government data sources from Ministry of Agriculture & IMD</span>
            </li>
            <li className="flex items-start">
              <span className="text-teal-400 mr-2">•</span>
              <span>Processes natural language queries about crops, rainfall, and policy</span>
            </li>
            <li className="flex items-start">
              <span className="text-teal-400 mr-2">•</span>
              <span>Synthesizes data from multiple sources for comprehensive insights</span>
            </li>
            <li className="flex items-start">
              <span className="text-teal-400 mr-2">•</span>
              <span>Cites all data sources for transparency and traceability</span>
            </li>
          </ul>
        </div>
      </motion.div>

      <motion.button
        onClick={onStart}
        className="bg-teal-500 hover:bg-teal-600 px-8 py-4 rounded-xl text-lg font-semibold shadow-lg transition-all flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Start Chat 
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
        </svg>
      </motion.button>

      <motion.footer
        className="absolute bottom-6 text-sm text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        © 2025 Project Samarth | Designed and developed by Seema
      </motion.footer>
    </div>
  );
};

export default Home;

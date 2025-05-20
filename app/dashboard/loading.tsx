'use client';

// Import specific components from framer-motion instead of using the default import
import { motion } from "framer-motion";

export default function LoadingPage() {
  return (
    <div className="min-h-screen bg-[#0D1B2A] flex items-center justify-center">
      <div className="text-center">
        <div className="w-32 h-32 mx-auto mb-8 flex items-center justify-center">
          {/* Bitcoin logo instead of 3D model */}
          <div className="relative w-24 h-24 bg-[#f7931a] rounded-full rotate-12 flex items-center justify-center">
            <span className="text-white text-4xl font-bold">₿</span>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold text-white">Loading Dashboard...</h2>
          <p className="text-gray-400">Fetching latest Bitcoin network data</p>
          <div className="w-48 h-1 bg-gray-800 rounded-full mx-auto overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#B3261E] to-[#f7931a]"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

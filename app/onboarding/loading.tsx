'use client';

import { motion } from 'framer-motion';

export default function OnboardingLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0D1B2A]">
      <div className="text-center max-w-md px-4">
        <div className="w-32 h-32 mx-auto mb-8 flex items-center justify-center">
          {/* Simple Bitcoin logo animation instead of 3D model */}
          <motion.div
            className="w-24 h-24 bg-[#f7931a] rounded-full flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          >
            <span className="text-white text-4xl font-bold">₿</span>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold text-white">Loading Onboarding...</h2>
          <p className="text-gray-400">Preparing your personalized Bitcoin Network experience</p>
          <div className="w-64 h-1 bg-gray-800 rounded-full mx-auto overflow-hidden">
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

'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import Image from 'next/image';
import { Bitcoin, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const router = useRouter();
  const { isLoaded, userId } = useAuth();
  
  // Check if user is already logged in
  useEffect(() => {
    if (isLoaded && userId) {
      router.push('/dashboard');
    }
  }, [isLoaded, userId, router]);

  const handleSignIn = () => {
    router.push('/sign-in');
  };

  const handleSignUp = () => {
    router.push('/sign-up');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0D1B2A]">
      <motion.div
        className="bg-[#1A2B3B] p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-center mb-8">
          <Bitcoin className="h-10 w-10 text-[#f7931a] mr-3" />
          <h1 className="text-3xl font-bold text-white">NetInsights</h1>
        </div>
        
        <h2 className="text-2xl font-semibold mb-6 text-white text-center">Welcome Back</h2>
        
        <p className="text-gray-400 mb-8 text-center">
          Access real-time Bitcoin network data and analytics with your account
        </p>
        
        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-[#B3261E] to-[#660000] w-full py-3 px-4 rounded-lg text-white font-medium flex items-center justify-center"
            onClick={handleSignIn}
          >
            Sign In <ArrowRight className="ml-2 h-4 w-4" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gray-800 hover:bg-gray-700 w-full py-3 px-4 rounded-lg text-white font-medium border border-gray-700 flex items-center justify-center"
            onClick={handleSignUp}
          >
            Create Account <ArrowRight className="ml-2 h-4 w-4" />
          </motion.button>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </motion.div>
      
      <motion.div 
        className="mt-8 flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <button 
          onClick={() => router.push('/onboarding')}
          className="text-gray-400 hover:text-white transition-colors duration-200"
        >
          Back to home
        </button>
      </motion.div>
    </div>
  );
}

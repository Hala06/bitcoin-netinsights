'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTheme } from '@/app/contexts/ThemeContext'; // Add this import

import { Activity, ArrowRight, BarChart2, Database, Globe, Bitcoin } from 'lucide-react';
import FeatureCard from '@/app/components/FeatureCard';
import BitcoinModel from '@/components/BitcoinModel';

export default function OnboardingPage() {
  const { mode } = useTheme(); // Changed from theme to mode
  const router = useRouter();
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [showFeatures, setShowFeatures] = useState(false);
  const [anyCardExpanded, setAnyCardExpanded] = useState(false);
  
  // Map of feature titles to background color gradients
  const featureBackgroundColors = {
    "Mempool Congestion": {
      base: mode === 'dark' ? "#22c55e" : "#166534", // Green - Changed theme to mode
      backgroundFrom: "rgba(16, 185, 129, 0.15)",
      backgroundTo: "rgba(5, 150, 105, 0.05)"
    },
    "OP_Return Tracker": {
      base: mode === 'dark' ? "#f43f5e" : "#be123c", // Red - Changed theme to mode
      backgroundFrom: "rgba(244, 63, 94, 0.15)",
      backgroundTo: "rgba(190, 18, 60, 0.05)"
    },
    "Drivechain Activity": {
      base: mode === 'dark' ? "#3b82f6" : "#1d4ed8", // Blue - Changed theme to mode
      backgroundFrom: "rgba(59, 130, 246, 0.15)",
      backgroundTo: "rgba(29, 78, 216, 0.05)"
    },
    "Memecoin Tracker": {
      base: mode === 'dark' ? "#d946ef" : "#a21caf", // Purple - Changed theme to mode
      backgroundFrom: "rgba(217, 70, 239, 0.15)",
      backgroundTo: "rgba(162, 28, 175, 0.05)"
    },
    "3D Bitcoin Visualization": {
      base: mode === 'dark' ? "#f7931a" : "#b45309", // Bitcoin Orange - Changed theme to mode
      backgroundFrom: "rgba(247, 147, 26, 0.15)",
      backgroundTo: "rgba(180, 83, 9, 0.05)"
    }
  };
  
  const features = [
    {
      title: "Mempool Congestion",
      description: "Track Bitcoin network congestion and transaction fees in real-time",
      icon: <BarChart2 className="w-6 h-6" />,
      color: mode === 'dark' ? "#22c55e" : "#166534", // Changed theme to mode
      bgImage: "/Mempool Congestion.jpg",
      content: (
        <div className="space-y-8">
          <motion.p 
            className="text-lg text-gray-200 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Our mempool congestion tracker provides real-time data on Bitcoin network load, helping you time your transactions for optimal fees and confirmation times.
          </motion.p>
          
          <motion.div
            className="mt-8 rounded-xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <img 
              src="/mempool.jpg" 
              alt="Mempool Congestion Analytics" 
              className="w-full h-auto rounded-xl" 
            />
          </motion.div>
          
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-green-500/20">
              <h3 className="text-xl font-semibold mb-2 text-green-400">Real-time Fee Estimation</h3>
              <p className="text-gray-300">Know exactly what fee to pay for your desired confirmation time</p>
            </div>
            <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-green-500/20">
              <h3 className="text-xl font-semibold mb-2 text-green-400">Historical Trends</h3>
              <p className="text-gray-300">View patterns to identify optimal transaction windows</p>
            </div>
            <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-green-500/20">
              <h3 className="text-xl font-semibold mb-2 text-green-400">Block Fullness</h3>
              <p className="text-gray-300">Track how much of each block is being utilized</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="mt-10 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <button
              onClick={() => router.push('/login')}
              className="bg-gradient-to-r from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 text-white py-3 px-8 rounded-lg flex items-center font-medium transition-all duration-300"
            >
              Explore Mempool Data <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </motion.div>
        </div>
      )
    },
    {
      title: "OP_Return Tracker",
      description: "Monitor data storage trends on the Bitcoin blockchain",
      icon: <Database className="w-6 h-6" />,
      color: mode === 'dark' ? "#f43f5e" : "#be123c",
      bgImage: "/OP_Return Data Storage.jpg",
      content: (
        <div className="space-y-8">
          <motion.p 
            className="text-lg text-gray-200 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Track how OP_Return data is being used on the Bitcoin blockchain, with real-time metrics on percentage of block space, transaction counts, and content types.
          </motion.p>
          
          <motion.div
            className="mt-8 rounded-xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <img 
              src="/opreturn.jpg" 
              alt="OP_Return Data Analytics" 
              className="w-full h-auto rounded-xl" 
            />
          </motion.div>
          
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-red-500/20">
              <h3 className="text-xl font-semibold mb-2 text-red-400">Data Composition</h3>
              <p className="text-gray-300">Analyze what types of data are being stored</p>
            </div>
            <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-red-500/20">
              <h3 className="text-xl font-semibold mb-2 text-red-400">Historical Usage</h3>
              <p className="text-gray-300">Track OP_Return usage over time to spot trends</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="mt-10 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <button
              onClick={() => router.push('/login')}
              className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white py-3 px-8 rounded-lg flex items-center font-medium transition-all duration-300"
            >
              Explore OP_Return Data <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </motion.div>
        </div>
      )
    },
    {
      title: "Drivechain Activity",
      description: "Explore Layer 2 sidechain usage and performance",
      icon: <Activity className="w-6 h-6" />,
      color: mode === 'dark' ? "#3b82f6" : "#1d4ed8",
      bgImage: "/drivechain.jpg",
      content: (
        <div className="space-y-8">
          <motion.p 
            className="text-lg text-gray-200 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Monitor the activity and performance of Bitcoin Layer 2 solutions like drivechains, including transaction volumes, user counts, and network health.
          </motion.p>
          
          <motion.div
            className="mt-8 rounded-xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <img 
              src="/drivechain.jpg" 
              alt="Drivechain Activity Dashboard" 
              className="w-full h-auto rounded-xl" 
            />
          </motion.div>
          
          <motion.div
            className="mt-8 bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-blue-500/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-blue-400">Active Sidechains</h3>
                <p className="text-5xl font-bold text-white">12</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-blue-400">Total TPS</h3>
                <p className="text-5xl font-bold text-white">138</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-blue-400">Active Users</h3>
                <p className="text-5xl font-bold text-white">45K+</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="mt-10 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <button
              onClick={() => router.push('/login')}
              className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white py-3 px-8 rounded-lg flex items-center font-medium transition-all duration-300"
            >
              Explore Drivechain Data <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </motion.div>
        </div>
      )
    },
    {
      title: "Memecoin Tracker",
      description: "Follow BRC-20 token creation and trading activity",
      icon: <Bitcoin className="w-6 h-6" />,
      color: mode === 'dark' ? "#d946ef" : "#a21caf",
      bgImage: "/Memecoin Tracker.jpg",
      content: (
        <div className="space-y-8">
          <motion.p 
            className="text-lg text-gray-200 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Stay updated on the latest memecoins and BRC-20 tokens being created on Bitcoin, with metrics on trading volume, new token creation, and market activity.
          </motion.p>
          
          <motion.div
            className="mt-8 rounded-xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <img 
              src="/Memecoin Tracker.jpg" 
              alt="Memecoin Tracker" 
              className="w-full h-auto rounded-xl" 
            />
          </motion.div>
          
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20">
              <h3 className="text-xl font-semibold mb-2 text-purple-400">Creation Trends</h3>
              <p className="text-gray-300">Track new memecoin launches and their initial popularity</p>
            </div>
            <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20">
              <h3 className="text-xl font-semibold mb-2 text-purple-400">Volume Analysis</h3>
              <p className="text-gray-300">Monitor trading volumes and price movements</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="mt-10 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <button
              onClick={() => router.push('/login')}
              className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white py-3 px-8 rounded-lg flex items-center font-medium transition-all duration-300"
            >
              Explore Memecoin Data <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </motion.div>
        </div>
      )
    },
    {
      title: "3D Bitcoin Visualization",
      description: "Interactive 3D model of Bitcoin network activity",
      icon: <Globe className="w-6 h-6" />,
      color: mode === 'dark' ? "#f7931a" : "#b45309",
      bgImage: "/Bitcoin 3D Model.jpg",
      content: (
        <div className="space-y-8">
          <motion.p 
            className="text-lg text-gray-200 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Explore Bitcoin in a whole new way with our interactive 3D visualization, showing network activity, node distribution, and blockchain growth in real-time.
          </motion.p>
          
          <motion.div
            className="mt-8 h-[400px] flex items-center justify-center rounded-xl overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <BitcoinModel />
          </motion.div>
          
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-orange-500/20">
              <h3 className="text-xl font-semibold mb-2 text-orange-400">Block Explorer</h3>
              <p className="text-gray-300">Visualize blocks in 3D space as they're added to the blockchain</p>
            </div>
            <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-orange-500/20">
              <h3 className="text-xl font-semibold mb-2 text-orange-400">Network Topology</h3>
              <p className="text-gray-300">See Bitcoin's global node distribution and connection patterns</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="mt-10 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <button
              onClick={() => router.push('/login')}
              className="bg-gradient-to-r from-orange-600 to-orange-800 hover:from-orange-500 hover:to-orange-700 text-white py-3 px-8 rounded-lg flex items-center font-medium transition-all duration-300"
            >
              Explore 3D Visualization <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </motion.div>
        </div>
      )
    },
  ];

  // Show features with a delay after page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFeatures(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);
  
  // Handle card expansion
  const handleFeatureExpand = (expanded: boolean, title: string) => {
    setActiveFeature(expanded ? title : null);
    setAnyCardExpanded(expanded);
    
    // Add ESC key listener when a card is expanded
    if (expanded) {
      const handleEscKey = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          setActiveFeature(null);
          setAnyCardExpanded(false);
        }
      };
      
      window.addEventListener('keydown', handleEscKey);
      return () => window.removeEventListener('keydown', handleEscKey);
    }
  };

  // Calculate the background style based on active feature
  const getBackgroundStyle = () => {
    if (!activeFeature) {
      return {
        background: `radial-gradient(circle at top right, rgba(13, 27, 42, 0.9), rgba(18, 18, 18, 0.95))`
      };
    }
    
    const colors = featureBackgroundColors[activeFeature as keyof typeof featureBackgroundColors];
    return {
      background: `radial-gradient(circle at top right, ${colors.backgroundFrom}, ${colors.backgroundTo})`
    };
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Dynamic background that changes based on active feature */}
      <motion.div 
        className="fixed inset-0 -z-10 transition-colors duration-1000 ease-in-out"
        animate={getBackgroundStyle()}
      />
      
      {/* Animated particles in background */}
      {showFeatures && (
        <div className="fixed inset-0 -z-5 overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/5"
              style={{
                width: Math.random() * 4 + 1,
                height: Math.random() * 4 + 1,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
      )}

      {/* Hero Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6 relative z-20">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              <div className="inline-block mb-6">
                <BitcoinModel height={160} width={160} />
              </div>
            </motion.div>
            
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Bitcoin <span className="text-[#B3261E]">NetInsights</span>
            </motion.h1>
            
            <motion.p
              className="text-xl text-gray-300 max-w-2xl mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Real-time transparency on Bitcoin's network activity, from Layer 1 to emerging sidechains.
              A neutral data platform for all Bitcoin stakeholders.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <button
                onClick={() => router.push('/login')}
                className={`inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#B3261E] to-[#660000] text-white font-medium rounded-lg hover:from-[#C04A44] hover:to-[#802A2A] transition-all duration-300 ${
                  anyCardExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
              >
                Launch Dashboard <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="py-16 relative z-20">
        <div className="container mx-auto px-6">
          <motion.h2
            className={`text-3xl font-bold text-white mb-12 text-center transition-opacity duration-500 ${
              anyCardExpanded ? 'opacity-0' : 'opacity-100'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showFeatures ? 1 : 0, y: showFeatures ? 0 : 20 }}
            transition={{ duration: 0.5 }}
          >
            Explore Our Features
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: showFeatures ? 1 : 0, 
                  y: showFeatures ? 0 : 20,
                  scale: activeFeature && activeFeature !== feature.title ? 0.95 : 1,
                  filter: activeFeature && activeFeature !== feature.title ? 'blur(2px)' : 'blur(0px)'
                }}
                transition={{ 
                  duration: 0.5, 
                  delay: showFeatures ? index * 0.1 : 0,
                }}
                className={`transition-all duration-700 ${
                  activeFeature && activeFeature !== feature.title ? 'opacity-30' : 'opacity-100'
                }`}
              >
                <FeatureCard 
                  {...feature} 
                  index={index}
                  onExpand={handleFeatureExpand}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className={`py-32 bg-gradient-to-r from-[#002B5B] to-[#660000] text-white relative z-20 transition-opacity duration-500 ${
          anyCardExpanded ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: showFeatures ? 1 : 0, y: showFeatures ? 0 : 30 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Gain Bitcoin Network Insights?</h2>
            <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
              Whether you're a Bitcoin purist or building on its future, get the neutral data you need to make informed decisions.
            </p>
            <button
              onClick={() => router.push('/login')}
              className="inline-flex items-center px-8 py-4 bg-white text-[#121212] font-bold rounded-lg hover:bg-gray-100 transition-all duration-300"
            >
              Sign In Now <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

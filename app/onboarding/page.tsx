'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { useTheme } from 'next-themes';
import { ArrowRight, ChevronRight, Download, GitBranch, Globe, HardDrive, Layers, ScrollText } from 'lucide-react';

// Dynamically import the 3D model with SSR disabled
const BitcoinModel = dynamic(() => import('../../components/BitcoinModel'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  ),
});

const features = [
  {
    title: 'Mempool Analytics',
    icon: <Layers className="w-6 h-6" />,
    description: 'Real-time congestion monitoring with fee predictions',
    colorLight: '#3B82F6',
    colorDark: '#60A5FA',
    image: '/mempool.jpg'
  },
  {
    title: 'OP_Return Tracking',
    icon: <ScrollText className="w-6 h-6" />,
    description: 'Measure on-chain data storage and its impact',
    colorLight: '#EC4899',
    colorDark: '#F472B6',
    image: '/opreturn.jpg'
  },
  {
    title: 'Drivechain Metrics',
    icon: <GitBranch className="w-6 h-6" />,
    description: 'Layer 2 adoption and performance statistics',
    colorLight: '#10B981',
    colorDark: '#34D399',
    image: '/drivechain.jpg'
  }
];

const stats = [
  { value: '24/7', label: 'Real-time monitoring' },
  { value: '99.9%', label: 'Uptime reliability' },
  { value: '150+', label: 'Network metrics' },
  { value: '0', label: 'Bias or opinions' }
];

export default function Onboarding() {
  const { theme, setTheme } = useTheme();
  const containerRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 1.1]);

  if (!mounted) {
    return null;
  }

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-white dark:bg-[#0A0A0A] text-[#121212] dark:text-[#FAFAFA] transition-colors duration-300"
    >
      <Navbar />

      {/* Hero Section */}
      <section className="min-h-screen relative overflow-hidden flex items-center justify-center pt-16">
        {/* Background elements */}
        <motion.div 
          style={{ y, opacity, scale }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="absolute w-[800px] h-[800px] bg-blue-500/10 dark:bg-blue-500/20 blur-[120px] rounded-full" />
        </motion.div>

        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12 z-10">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 space-y-8"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                Bitcoin Network Intelligence
              </span>
              <br />
              <span className="text-gray-600 dark:text-gray-300">Without the noise</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
              Unbiased, real-time data about Bitcoin's base layer and emerging Layer 2 solutions.
              Built for developers, analysts, and the Bitcoin-curious.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/dashboard"
                className="px-8 py-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                Launch Dashboard
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#features"
                className="px-8 py-4 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
              >
                Learn More
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm"
                >
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stat.value}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 3D Model */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-1/2 h-[400px] lg:h-[500px] relative"
          >
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            }>
              <BitcoinModel />
            </Suspense>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Network Insights</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Everything you need to understand Bitcoin's network activity in one dashboard
            </p>
          </motion.div>

          {/* Feature Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
              {features.map((feature, index) => (
                <button
                  key={feature.title}
                  onClick={() => setActiveFeature(index)}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeFeature === index ? 'bg-white dark:bg-gray-700 shadow-sm' : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {feature.title}
                </button>
              ))}
            </div>
          </div>

          {/* Feature Content */}
          <div className="relative h-[600px] rounded-2xl overflow-hidden">
            <AnimatePresence mode="wait">
              {features.map((feature, index) => (
                activeFeature === index && (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      backgroundColor: theme === 'dark' 
                        ? `${feature.colorDark}10` 
                        : `${feature.colorLight}10`
                    }}
                  >
                    <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
                      <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="lg:w-1/2 space-y-6"
                      >
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center"
                          style={{ 
                            backgroundColor: theme === 'dark' 
                              ? `${feature.colorDark}20` 
                              : `${feature.colorLight}20`,
                            color: theme === 'dark' 
                              ? feature.colorDark 
                              : feature.colorLight
                          }}
                        >
                          {feature.icon}
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold">{feature.title}</h3>
                        <p className="text-lg text-gray-600 dark:text-gray-300">{feature.description}</p>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="lg:w-1/2 h-[400px] bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden relative"
                      >
                        <img 
                          src={feature.image}
                          alt={feature.title}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to explore Bitcoin's network?</h2>
            <p className="text-xl mb-12 max-w-3xl mx-auto">
              Get started with the most comprehensive Bitcoin network analytics platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="px-8 py-4 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                Launch Dashboard
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

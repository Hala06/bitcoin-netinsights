'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronRight, LineChart, Database, Network, Globe, Bitcoin } from 'lucide-react';
import BitcoinModel from '@/components/BitcoinModel';
import BackgroundAnimation from '@/app/components/BackgroundAnimation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Animation variants for staggered animations
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
};

export default function HomePage() {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Handle scroll events to track progress for animations
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const winHeight = window.innerHeight;
      const docHeight = document.body.offsetHeight;
      const totalScrollHeight = docHeight - winHeight;
      const progress = Math.min(scrollY / totalScrollHeight, 1);
      
      setScrollProgress(progress);
      
      // Update active section based on scroll position
      if (scrollY < winHeight * 0.5) {
        setActiveSection('hero');
      } else if (scrollY < winHeight * 1.5) {
        setActiveSection('features');
      } else {
        setActiveSection('cta');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const features = [
    { 
      title: "Mempool Congestion", 
      description: "Real-time network congestion monitoring with fee estimation",
      icon: <LineChart className="w-6 h-6" />, 
      color: "#B3261E",
      image: "/Mempool Congestion.jpg"
    },
    { 
      title: "OP_Return Tracker", 
      description: "Track blockchain data storage usage and content types",
      icon: <Database className="w-6 h-6" />, 
      color: "#995555",
      image: "/OP_Return Data Storage.jpg"
    },
    { 
      title: "Drivechain Activity", 
      description: "Monitor Layer 2 sidechain performance and adoption",
      icon: <Network className="w-6 h-6" />, 
      color: "#2A4E76",
      image: "/drivechain.jpg"
    },
    { 
      title: "Memecoin Tracker", 
      description: "Stay updated on BRC-20 token activity and trends",
      icon: <Bitcoin className="w-6 h-6" />, 
      color: "#C04A44",
      image: "/Memecoin Tracker.jpg"
    }
  ];
  
  return (
    <main className="relative">
      {/* Background animation */}
      <BackgroundAnimation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden pt-20">
        {/* Background gradient */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0D1B2A] via-[#121212]/90 to-[#121212]" />

        <div className="container mx-auto px-6 relative z-10 h-[calc(100vh-80px)] flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="flex flex-col"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="mb-4 inline-block">
                <motion.div
                  className="px-4 py-2 bg-[#B3261E]/20 rounded-full text-sm backdrop-blur-sm border border-[#B3261E]/40 inline-flex items-center"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="relative flex h-3 w-3 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B3261E] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#B3261E]"></span>
                  </span>
                  <span className="text-white">Live Network Data</span>
                </motion.div>
              </div>
              
              <motion.h1 
                className="text-5xl md:text-7xl font-bold mb-6 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Bitcoin <span className="text-[#B3261E]">NetInsights</span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-gray-300 mb-8 max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        Unlock the power of Bitcoin network data. Explore real-time insights into mempool activity, transaction flows, and emerging trends. Empowering informed decisions for developers, researchers, and enthusiasts.
      </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Link 
                  href="/dashboard"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#B3261E] to-[#660000] text-white font-medium rounded-lg hover:from-[#C04A44] hover:to-[#802A2A] transition-all duration-300"
                >
                  Explore Dashboard <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link 
                  href="/onboarding"
                  className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border border-white/20 font-medium rounded-lg transition-all duration-300"
                >
                  Learn More <ChevronRight className="ml-1 w-5 h-5" />
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div
              className="hidden lg:flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.8,
                delay: 0.6,
                type: "spring",
                stiffness: 100
              }}
            >
              <div className="relative w-[450px] h-[450px]">
                {/* Rotating glowing rings */}
                {/* Feature circles */}
                <motion.div 
                  className="w-[400px] h-[400px] absolute inset-0 flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                >
                  {/* Mempool circle */}
                  <motion.div 
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 p-4 bg-green-500/20 rounded-full border-2 border-green-500/30 backdrop-blur-sm"
                    whileHover={{ scale: 1.1 }}
                  >
                    <LineChart className="w-8 h-8 text-green-500" />
                  </motion.div>
                  
                  {/* Drivechain circle */}
                  <motion.div 
                    className="absolute -bottom-4 -left-4 p-4 bg-blue-500/20 rounded-full border-2 border-blue-500/30 backdrop-blur-sm"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Network className="w-8 h-8 text-blue-500" />
                  </motion.div>
                  
                  {/* OP_Return circle */}
                  <motion.div 
                    className="absolute -bottom-4 -right-4 p-4 bg-[#B3261E]/20 rounded-full border-2 border-[#B3261E]/30 backdrop-blur-sm"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Database className="w-8 h-8 text-[#B3261E]" />
                  </motion.div>
                </motion.div>
                
                {/* Inner rotating ring */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    className="w-[200px] h-[200px] rounded-full border-2 border-[#B3261E]/30"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                  />
                </div>
                
                {/* 3D Bitcoin model (smaller) */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <BitcoinModel height={150} width={150} modelHeight={5.0} />
                </div>
                
                {/* Data points floating around */}
                <motion.div 
                  className="absolute top-10 left-0 p-3 bg-black/30 backdrop-blur-md rounded-lg border border-white/10"
                  animate={{ 
                    y: [0, 10, 0],
                    opacity: [1, 0.8, 1],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2" />
                    <span className="text-sm text-white">Mempool: 12.4 MB</span>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="absolute bottom-20 right-0 p-3 bg-black/30 backdrop-blur-md rounded-lg border border-white/10"
                  animate={{ 
                    y: [0, -10, 0],
                    opacity: [1, 0.8, 1],
                  }}
                  transition={{ duration: 4, delay: 1, repeat: Infinity }}
                >
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-[#B3261E] rounded-full mr-2" />
                    <span className="text-sm text-white">OP_Return: 4.2%</span>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="absolute bottom-40 left-10 p-3 bg-black/30 backdrop-blur-md rounded-lg border border-white/10"
                  animate={{ 
                    y: [0, 10, 0],
                    opacity: [1, 0.8, 1],
                  }}
                  transition={{ duration: 3.5, delay: 2, repeat: Infinity }}
                >
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2" />
                    <span className="text-sm text-white">Drivechain: Active</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
          
          {/* Scroll indicator */}
          <motion.div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ 
              y: [0, 10, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="flex flex-col items-center">
              <span className="text-white/50 text-sm mb-2">Scroll to explore</span>
              <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                <motion.div 
                  className="w-1.5 h-1.5 bg-white rounded-full mt-2"
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-24 relative overflow-hidden bg-[#0D1B2A] dark:bg-[#121212]">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">Explore Our Features</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Gain unprecedented visibility into Bitcoin's network with our suite of real-time monitoring tools.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={feature.title}
                className="group relative overflow-hidden rounded-xl"
                variants={item}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 z-10" />
                <div className="relative w-full h-64" style={{ position: 'relative' }}>
                  <Image 
                    src={feature.image} 
                    alt={feature.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover object-center transform group-hover:scale-110 transition-transform duration-3000"
                    priority
                  />
                </div>
                
                <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
                  <div 
                    className="p-2 rounded-full w-12 h-12 flex items-center justify-center mb-4"
                    style={{ backgroundColor: feature.color }}
                  >
                    {feature.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-300 mb-4">{feature.description}</p>
                  
                  <Link 
                    href="/dashboard"
                    className="inline-flex items-center text-white font-medium"
                  >
                    <span className="mr-2 relative">
                      <span>View Dashboard</span>
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                    </span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Network Stats Bar */}
          <motion.div 
            className="mt-20 py-8 px-6 bg-black/30 backdrop-blur-md rounded-xl border border-gray-800"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-1">Current Mempool</p>
                <h4 className="text-3xl font-bold text-white">12.4 MB</h4>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-1">Fast Fee Rate</p>
                <h4 className="text-3xl font-bold text-white">43 sat/vB</h4>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-1">OP_Return Usage</p>
                <h4 className="text-3xl font-bold text-white">4.2%</h4>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-1">Drivechains</p>
                <h4 className="text-3xl font-bold text-white">3 Active</h4>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-r from-[#002B5B] to-[#660000] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className="text-5xl font-bold mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              Ready to Gain Bitcoin Network Insights?
            </motion.h2>
            
            <motion.p 
              className="text-xl text-gray-200 mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Whether you're a Bitcoin purist or building on its future, get the neutral data you need to make informed decisions.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <Link
                href="/dashboard"
                className="inline-flex items-center px-8 py-4 bg-white text-[#121212] font-bold rounded-lg hover:bg-gray-100 transition-all duration-300"
              >
                Launch Dashboard <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}

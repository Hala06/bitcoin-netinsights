// app/components/FeaturePanel.tsx
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Database, BarChart2, Bitcoin, Globe } from 'lucide-react';
import FeatureCard from './FeatureCard';

interface FeatureContent {
  title: string;
  description: string;
  accent: string;
}

const featureDetails: Record<string, FeatureContent> = {
  mempool: {
    title: "Mempool Analytics",
    description: "Real-time blockchain transaction analysis with advanced visualization tools.",
    accent: "var(--accent-mempool)",
  },
  opreturn: {
    title: "OP_Return Tracking",
    description: "Monitor and analyze OP_Return data with powerful flame animations.",
    accent: "var(--accent-opreturn)",
  },
  drivechain: {
    title: "Drivechain Activity",
    description: "Track sidechain operations with dynamic tech visualizations.",
    accent: "var(--accent-drivechain)",
  }
};

export default function FeaturePanel() {
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);
  const [activeBackground, setActiveBackground] = useState<string | null>(null);
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Handle feature card expansion
  const handleFeatureExpand = (expanded: boolean, title: string) => {
    if (expanded) {
      setExpandedFeature(title);
      setActiveBackground(features.find(f => f.title === title)?.colorKey || null);
    } else {
      setExpandedFeature(null);
      setActiveBackground(null);
    }
  };
  
  const handleFeatureClick = (feature: string) => {
    if (activeFeature === feature) return;
    
    setIsAnimating(true);
    document.body.className = `theme-${feature}`;
    
    // Create multiple ripples for a more dramatic effect
    const button = document.querySelector(`[data-feature="${feature}"]`);
    if (button) {
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          const ripple = document.createElement('div');
          ripple.className = 'ripple';
          ripple.style.animationDelay = `${i * 100}ms`;
          button.appendChild(ripple);
          setTimeout(() => ripple.remove(), 1000);
        }, i * 100);
      }
    }

    setTimeout(() => {
      setActiveFeature(feature);
      setIsAnimating(false);
    }, 300);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      },
      { threshold: 0.1 }
    );

    if (panelRef.current) {
      observer.observe(panelRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Background configs for each feature
  const backgroundConfigs = {
    mempool: {
      from: 'rgba(34, 211, 238, 0.15)',
      via: 'rgba(56, 189, 248, 0.05)',
      to: 'rgba(13, 27, 42, 0.98)'
    },
    opreturn: {
      from: 'rgba(244, 63, 94, 0.15)',
      via: 'rgba(225, 29, 72, 0.05)',
      to: 'rgba(13, 27, 42, 0.98)'
    },
    drivechain: {
      from: 'rgba(139, 92, 246, 0.15)',
      via: 'rgba(168, 85, 247, 0.05)',
      to: 'rgba(13, 27, 42, 0.98)'
    },
    memecoin: {
      from: 'rgba(249, 168, 212, 0.15)',
      via: 'rgba(236, 72, 153, 0.05)',
      to: 'rgba(13, 27, 42, 0.98)'
    },
    blockchain: {
      from: 'rgba(247, 147, 26, 0.15)',
      via: 'rgba(247, 147, 26, 0.08)',
      to: 'rgba(13, 27, 42, 0.98)'
    }
  };
  
  // Features array
  const features = [
    {
      title: "Mempool Status",
      description: "Track real-time congestion, fees, and transaction backlog on the Bitcoin network",
      icon: <BarChart2 size={24} />,
      color: "#22c55e",
      colorKey: "mempool",
      bgImage: "/mempool.jpg",
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-medium text-white mb-3">Real-time Network Insights</h4>
            <p className="text-gray-300 leading-relaxed">
              The Bitcoin mempool is the staging area where all unconfirmed transactions wait before being included in a block. 
              Our Mempool Status feature gives you unprecedented visibility into network congestion with real-time metrics.
            </p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4">
              <h5 className="text-sm font-medium text-gray-400 mb-1">Current Fee Rates</h5>
              <p className="text-xl font-mono text-white">20-80 sat/vB</p>
              <p className="text-xs text-gray-400 mt-1">Updated every 30 seconds</p>
            </div>
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4">
              <h5 className="text-sm font-medium text-gray-400 mb-1">Pending Transactions</h5>
              <p className="text-xl font-mono text-white">~12,500</p>
              <p className="text-xs text-gray-400 mt-1">Constantly monitored</p>
            </div>
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4">
              <h5 className="text-sm font-medium text-gray-400 mb-1">Mempool Size</h5>
              <p className="text-xl font-mono text-white">35.7 MB</p>
              <p className="text-xs text-gray-400 mt-1">With historical trends</p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-6"
          >
            <h4 className="text-lg font-medium text-white mb-3">Why Monitor the Mempool?</h4>
            <ul className="space-y-2 text-gray-300 list-disc pl-5">
              <li>Optimize transaction fees to save on costs</li>
              <li>Understand network congestion patterns</li>
              <li>Predict confirmation times accurately</li>
              <li>Visualize blockchain activity trends</li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="mt-6 flex justify-end"
          >
            <button className="px-5 py-2 bg-[#22c55e]/20 hover:bg-[#22c55e]/30 text-[#22c55e] rounded-lg transition-colors duration-300 flex items-center">
              Explore Mempool Data
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </button>
          </motion.div>
        </div>
      )
    },
    {
      title: "OP_Return Tracker",
      description: "Discover what's being stored on Bitcoin's blockchain beyond transactions",
      icon: <Database size={24} />,
      color: "#ef4444",
      colorKey: "opreturn",
      bgImage: "/opreturn.jpg",
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-medium text-white mb-3">Blockchain Data Storage</h4>
            <p className="text-gray-300 leading-relaxed">
              The OP_RETURN script opcode allows storing up to 80 bytes of data on the Bitcoin blockchain. 
              From NFT inscriptions to timestamped messages, our tracker decodes and categorizes all data 
              being stored on the blockchain in real-time.
            </p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4">
              <h5 className="text-sm font-medium text-gray-400 mb-1">Popular Data Types</h5>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-2 py-1 bg-[#ef4444]/20 text-[#ef4444] text-xs rounded">Ordinals</span>
                <span className="px-2 py-1 bg-[#ef4444]/20 text-[#ef4444] text-xs rounded">Timestamps</span>
                <span className="px-2 py-1 bg-[#ef4444]/20 text-[#ef4444] text-xs rounded">Messages</span>
                <span className="px-2 py-1 bg-[#ef4444]/20 text-[#ef4444] text-xs rounded">Inscriptions</span>
                <span className="px-2 py-1 bg-[#ef4444]/20 text-[#ef4444] text-xs rounded">Metadata</span>
              </div>
            </div>
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4">
              <h5 className="text-sm font-medium text-gray-400 mb-1">Growth Stats</h5>
              <p className="text-xl font-mono text-white">+543% YoY</p>
              <p className="text-xs text-gray-400 mt-1">Data stored on-chain via OP_RETURN</p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="bg-black/20 backdrop-blur-sm rounded-lg p-4"
          >
            <h4 className="text-sm font-medium text-gray-400 mb-3">Recent OP_RETURN Data</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-xs border-b border-gray-800 pb-2">
                <span className="text-gray-400">ord</span>
                <span className="font-mono text-white truncate max-w-[70%]">0101000200000010079...</span>
              </div>
              <div className="flex justify-between text-xs border-b border-gray-800 pb-2">
                <span className="text-gray-400">msg</span>
                <span className="font-mono text-white truncate max-w-[70%]">Hello, Bitcoin!</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">stamp</span>
                <span className="font-mono text-white truncate max-w-[70%]">ProofOfExistence1710...</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="mt-6 flex justify-end"
          >
            <button className="px-5 py-2 bg-[#ef4444]/20 hover:bg-[#ef4444]/30 text-[#ef4444] rounded-lg transition-colors duration-300 flex items-center">
              Explore OP_RETURN Data
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </button>
          </motion.div>
        </div>
      )
    },
    {
      title: "Drivechain Activity",
      description: "Monitor Bitcoin Layer 2 solutions and sidechains for enhanced scalability",
      icon: <Activity size={24} />,
      color: "#3b82f6",
      colorKey: "drivechain",
      bgImage: "/drivechain.jpg",
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-medium text-white mb-3">Bitcoin Layer 2 Ecosystem</h4>
            <p className="text-gray-300 leading-relaxed">
              Drivechains and sidechains extend Bitcoin's capabilities by enabling transactions to move to 
              separate-but-connected chains. Our dashboard monitors these Layer 2 solutions, providing 
              insights into their adoption, transaction volumes, and security.
            </p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4">
              <h5 className="text-sm font-medium text-gray-400 mb-1">Active Sidechains</h5>
              <p className="text-xl font-mono text-white">7</p>
              <p className="text-xs text-gray-400 mt-1">With 1 in development</p>
            </div>
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4">
              <h5 className="text-sm font-medium text-gray-400 mb-1">Total Transaction Rate</h5>
              <p className="text-xl font-mono text-white">~138 TPS</p>
              <p className="text-xs text-gray-400 mt-1">Across all active sidechains</p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <h4 className="text-lg font-medium text-white mb-3">Top Sidechains</h4>
            <div className="space-y-3">
              {["ZendoLedger", "BitVM", "Bitassets", "TestChain"].map((chain, i) => (
                <div key={chain} className="bg-black/20 backdrop-blur-sm rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-white">{chain}</span>
                    <span className={`text-xs px-2 py-1 rounded bg-green-500/20 text-green-500`}>
                      Active
                    </span>
                  </div>
                  <div className="mt-2 flex justify-between text-xs">
                    <span className="text-gray-400">Avg TPS:</span>
                    <span className="text-white">{45 - i * 10}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="mt-6 flex justify-end"
          >
            <button className="px-5 py-2 bg-[#3b82f6]/20 hover:bg-[#3b82f6]/30 text-[#3b82f6] rounded-lg transition-colors duration-300 flex items-center">
              Explore Sidechain Activity
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </button>
          </motion.div>
        </div>
      )
    },
    {
      title: "Memecoin Tracker",
      description: "Track BRC-20 token activity, trends and market movements",
      icon: <Bitcoin size={24} />,
      color: "#d946ef",
      colorKey: "memecoin",
      bgImage: "/Memecoin Tracker.jpg",
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-medium text-white mb-3">Bitcoin Token Economy</h4>
            <p className="text-gray-300 leading-relaxed">
              BRC-20 tokens and other Bitcoin-based fungible tokens have created a vibrant ecosystem on top of Bitcoin. 
              Our tracker monitors market activity, volume trends, and new token launches across the Bitcoin token economy.
            </p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4">
              <h5 className="text-sm font-medium text-gray-400 mb-1">Token Count</h5>
              <p className="text-xl font-mono text-white">1,250+</p>
              <p className="text-xs text-gray-400 mt-1">With 15 new in the last 24h</p>
            </div>
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4">
              <h5 className="text-sm font-medium text-gray-400 mb-1">24h Volume</h5>
              <p className="text-xl font-mono text-white">$34.2M</p>
              <p className="text-xs text-green-400 mt-1">↑ 5.3% from yesterday</p>
            </div>
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4">
              <h5 className="text-sm font-medium text-gray-400 mb-1">Most Active</h5>
              <p className="text-xl font-mono text-white">$ORDI</p>
              <p className="text-xs text-green-400 mt-1">↑ 3.2% ($425.15)</p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <h4 className="text-lg font-medium text-white mb-3">Top Tokens</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-black/30">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs text-gray-400">Token</th>
                    <th className="px-4 py-2 text-right text-xs text-gray-400">Price</th>
                    <th className="px-4 py-2 text-right text-xs text-gray-400">24h</th>
                    <th className="px-4 py-2 text-right text-xs text-gray-400">Volume</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {[
                    { name: 'ORDI', price: '$425.15', change: '+3.2%', volume: '$12.5M' },
                    { name: 'SATS', price: '$0.00052', change: '-1.5%', volume: '$8.7M' },
                    { name: 'MEME', price: '$0.075', change: '+8.3%', volume: '$6.3M' },
                    { name: 'PEPE', price: '$0.042', change: '+0.8%', volume: '$4.2M' }
                  ].map((token, i) => (
                    <tr key={token.name}>
                      <td className="px-4 py-3 text-white font-medium">{token.name}</td>
                      <td className="px-4 py-3 text-right text-white font-mono">{token.price}</td>
                      <td className={`px-4 py-3 text-right font-medium ${
                        token.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {token.change}
                      </td>
                      <td className="px-4 py-3 text-right text-gray-300 font-mono">{token.volume}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="mt-6 flex justify-end"
          >
            <button className="px-5 py-2 bg-[#d946ef]/20 hover:bg-[#d946ef]/30 text-[#d946ef] rounded-lg transition-colors duration-300 flex items-center">
              Explore Token Markets
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </button>
          </motion.div>
        </div>
      )
    },
    {
      title: "3D Blockchain Visualization",
      description: "Explore Bitcoin's blockchain through immersive 3D visualizations",
      icon: <Globe size={24} />,
      color: "#f7931a",
      colorKey: "blockchain",
      bgImage: "/Bitcoin 3D Model.jpg",
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-medium text-white mb-3">Interactive Blockchain Explorer</h4>
            <p className="text-gray-300 leading-relaxed">
              Our 3D blockchain visualization transforms abstract blockchain data into an interactive, 
              spatial experience. Navigate through blocks, visualize transaction relationships, and 
              gain insights through intuitive visual patterns.
            </p>
          </div>
          
          <motion.div 
            className="aspect-video bg-black/20 rounded-lg flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="text-center p-8">
              <Globe size={60} className="mx-auto mb-4 text-[#f7931a]" />
              <p className="text-gray-400 mb-4">3D visualization requires WebGL support</p>
              <button className="px-4 py-2 bg-[#f7931a]/20 hover:bg-[#f7931a]/30 text-[#f7931a] rounded-lg transition-colors duration-300">
                Load 3D Experience
              </button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4">
              <h5 className="text-sm font-medium text-gray-400 mb-1">Visualization Types</h5>
              <ul className="space-y-2 mt-2 text-white">
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-[#f7931a] mr-2"></span>
                  Block Explorer
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-[#f7931a] mr-2"></span>
                  Transaction Network
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-[#f7931a] mr-2"></span>
                  Fee Heatmap
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-[#f7931a] mr-2"></span>
                  UTXO Clustering
                </li>
              </ul>
            </div>
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4">
              <h5 className="text-sm font-medium text-gray-400 mb-1">Interaction Methods</h5>
              <ul className="space-y-2 mt-2 text-white">
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-[#f7931a] mr-2"></span>
                  Mouse navigation
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-[#f7931a] mr-2"></span>
                  Touch gestures
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-[#f7931a] mr-2"></span>
                  Block search
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-[#f7931a] mr-2"></span>
                  Time-based animation
                </li>
              </ul>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="mt-6 flex justify-end"
          >
            <button className="px-5 py-2 bg-[#f7931a]/20 hover:bg-[#f7931a]/30 text-[#f7931a] rounded-lg transition-colors duration-300 flex items-center">
              Launch 3D Explorer
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </button>
          </motion.div>
        </div>
      )
    }
  ];

  // Determine background style based on active feature
  const getBackgroundStyle = () => {
    if (!activeBackground) return {};

    const colors = backgroundConfigs[activeBackground as keyof typeof backgroundConfigs];
    return {
      background: `radial-gradient(circle at top right, ${colors.from}, ${colors.via}, ${colors.to})`
    };
  };

  return (
    <div className="relative min-h-screen">
      {/* Dynamic background */}
      <motion.div 
        className="fixed inset-0 -z-10 transition-colors duration-1000 ease-in-out"
        initial={false}
        animate={getBackgroundStyle()}
      />
      
      <div className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Explore Bitcoin Network Insights
          </motion.h2>
          
          <motion.p 
            className="text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Discover the various features that provide deeper visibility into
            Bitcoin&apos;s network activity, transactions, and on-chain data.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className={`${expandedFeature && expandedFeature !== feature.title ? 'opacity-40' : ''} transition-opacity duration-500`}
            >
              <FeatureCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                color={feature.color}
                bgImage={feature.bgImage}
                content={feature.content}
                index={index}
                onExpand={handleFeatureExpand}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

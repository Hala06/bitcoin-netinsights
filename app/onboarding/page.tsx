'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import BitcoinModel from '@/components/BitcoinModel'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { useTheme } from 'next-themes'
import { ArrowRight, ChevronRight, Download, GitBranch, Globe, HardDrive, Layers, ScrollText } from 'lucide-react'

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
]

const stats = [
  { value: '24/7', label: 'Real-time monitoring' },
  { value: '99.9%', label: 'Uptime reliability' },
  { value: '150+', label: 'Network metrics' },
  { value: '0', label: 'Bias or opinions' }
]

export default function Onboarding() {
  const { theme } = useTheme()
  const containerRef = useRef(null)
  const [activeFeature, setActiveFeature] = useState(0)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 1.1])

  return (
    <div 
      ref={containerRef}
      className="bg-white dark:bg-[#0A0A0A] text-[#121212] dark:text-[#FAFAFA] transition-colors duration-300"
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
            <BitcoinModel />
          </motion.div>
        </div>
      </section>

      {/* Logo Cloud */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-6">
          <p className="text-center text-gray-500 dark:text-gray-400 mb-8">Trusted by leading Bitcoin projects</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center">
            {['LayerTwo Labs', 'RebarData', 'Bitcoin Magazine', 'Drivechains', 'Mempool'].map((logo, index) => (
              <motion.div
                key={logo}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-gray-700 dark:text-gray-300 font-medium text-lg"
              >
                {logo}
              </motion.div>
            ))}
          </div>
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
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${activeFeature === index ? 'bg-white dark:bg-gray-700 shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
                >
                  {feature.title}
                </button>
              ))}
            </div>
          </div>

          {/* Feature Content */}
          <div className="relative h-[600px] rounded-2xl overflow-hidden mb-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  backgroundColor: theme === 'dark' 
                    ? `${features[activeFeature].colorDark}10` 
                    : `${features[activeFeature].colorLight}10`
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
                          ? `${features[activeFeature].colorDark}20` 
                          : `${features[activeFeature].colorLight}20`,
                        color: theme === 'dark' 
                          ? features[activeFeature].colorDark 
                          : features[activeFeature].colorLight
                      }}
                    >
                      {features[activeFeature].icon}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold">{features[activeFeature].title}</h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300">{features[activeFeature].description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {['Real-time', 'Historical', 'Comparative', 'Predictive'].map((tag) => (
                        <span 
                          key={tag}
                          className="px-3 py-1 rounded-full text-sm"
                          style={{
                            backgroundColor: theme === 'dark' 
                              ? `${features[activeFeature].colorDark}20` 
                              : `${features[activeFeature].colorLight}20`,
                            color: theme === 'dark' 
                              ? features[activeFeature].colorDark 
                              : features[activeFeature].colorLight
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      href="/dashboard"
                      className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium mt-4"
                    >
                      Explore this feature
                      <ChevronRight className="w-5 h-5" />
                    </Link>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="lg:w-1/2 h-[400px] bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden relative"
                  >
                    <img 
                      src={features[activeFeature].image}
                      alt={features[activeFeature].title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                      <p className="text-white text-sm">
                        Example visualization of {features[activeFeature].title.toLowerCase()} data
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* All Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow"
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                  style={{ 
                    backgroundColor: theme === 'dark' 
                      ? `${feature.colorDark}20` 
                      : `${feature.colorLight}20`,
                    color: theme === 'dark' ? feature.colorDark : feature.colorLight
                  }}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{feature.description}</p>
                <Link
                  href="#"
                  className="text-sm font-medium inline-flex items-center gap-1"
                  style={{ 
                    color: theme === 'dark' ? feature.colorDark : feature.colorLight
                  }}
                >
                  Learn more
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Raw Network Data, Beautifully Presented</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                We pull data directly from Bitcoin nodes and Layer 2 solutions, then present it in intuitive visualizations that help you understand network activity at a glance.
              </p>
              
              <div className="space-y-4">
                {[
                  'Direct node connections for real-time data',
                  'Historical data archive going back to genesis',
                  'Customizable dashboard views',
                  'Exportable reports and datasets'
                ].map((item, index) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <ChevronRight className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:w-1/2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">dashboard.json</p>
                <div className="w-6 h-6"></div>
              </div>
              <div className="p-6">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-4">
                  <code className="text-sm text-gray-800 dark:text-gray-200 block mb-2">
                    <span className="text-purple-600 dark:text-purple-400">npm</span> install bitcoin-netinsights-api
                  </code>
                  <code className="text-sm text-gray-800 dark:text-gray-200 block">
                    <span className="text-blue-600 dark:text-blue-400">import</span> {`{ getMempoolData }`} <span className="text-blue-600 dark:text-blue-400">from</span> <span className="text-green-600 dark:text-green-400">'bitcoin-netinsights-api'</span>
                  </code>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">API Endpoints</p>
                    <p className="font-mono text-sm">/api/v1/mempool</p>
                    <p className="font-mono text-sm">/api/v1/op_return</p>
                    <p className="font-mono text-sm">/api/v1/drivechains</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <p className="text-sm text-green-600 dark:text-green-400 mb-1">Export Formats</p>
                    <p className="font-mono text-sm">JSON</p>
                    <p className="font-mono text-sm">CSV</p>
                    <p className="font-mono text-sm">PNG/SVG</p>
                  </div>
                </div>
              </div>
            </motion.div>
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
              <Link
                href="#"
                className="px-8 py-4 bg-transparent border-2 border-white rounded-lg font-bold hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download Report
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-lg font-semibold mb-4">Bitcoin NetInsights</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Neutral data for Bitcoin's evolving ecosystem
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link href="/dashboard" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Dashboard</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">API</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Widgets</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Documentation</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Guides</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Blog</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Support</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">About</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Careers</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Privacy</Link></li>
                <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 dark:text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Bitcoin NetInsights. All data provided for informational purposes only.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <Globe className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <GitBranch className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <HardDrive className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
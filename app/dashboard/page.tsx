'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, BarChart2, Database, Activity, Bitcoin, Globe, ChevronDown, RefreshCw, Grid, LayoutGrid, Puzzle } from 'lucide-react';
import { useUser, SignInButton, SignUpButton } from "@clerk/nextjs";
import MempoolStatus from '@/components/MempoolStatus';
import OpReturnTracker from '@/components/OpReturnTracker';
import DrivechainActivity from '@/components/DrivechainActivity';
import MemecoinTracker from '@/components/MemecoinTracker';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import StarField from '../components/StarField';

// Use dynamic import with no SSR for the 3D model to prevent hydration issues
const BitcoinModel = dynamic(() => import('@/components/BitcoinModel'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="w-16 h-16 bg-[#f7931a] rounded-full flex items-center justify-center">
        <span className="text-white text-2xl font-bold">₿</span>
      </div>
    </div>
  )
});

// Dashboard panel type and view mode types
type PanelType = 'mempool' | 'opreturn' | 'drivechain' | 'memecoin' | '3dmodel';
type ViewMode = 'tabbed' | 'condensed';

export default function DashboardPage() {
  const router = useRouter();
  const [activePanel, setActivePanel] = useState<PanelType>('mempool');
  const [viewMode, setViewMode] = useState<ViewMode>('tabbed');
  const [contentLoaded, setContentLoaded] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);
  const [expandedPanel, setExpandedPanel] = useState<PanelType | null>(null);
  const { isSignedIn, user, isLoaded } = useUser();
  const [formattedTime, setFormattedTime] = useState('');
  const [modelError, setModelError] = useState(false);

  // Format the time client-side only to avoid hydration mismatch
  useEffect(() => {
    setFormattedTime(lastRefresh.toLocaleTimeString());
  }, [lastRefresh]);
  
  // Simulate initial data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setContentLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Handle refresh of all data
  const handleRefresh = async () => {
    setIsRefreshing(true);
    setRefreshCount(prev => prev + 1);
    setLastRefresh(new Date());
    
    // Auto hide refresh indicator after 1.5s
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

  // Set up auto-refresh every 30 seconds
  useEffect(() => {
    const intervalId = setInterval(handleRefresh, 30000);
    return () => clearInterval(intervalId);
  }, []);

  // Toggle between tabbed and condensed view modes
  const toggleViewMode = () => {
    setViewMode(prev => (prev === 'tabbed' ? 'condensed' : 'tabbed'));
  };

  // Panel style configuration
  const panelColors = {
    mempool: {
      primary: '#22c55e', // Green
      secondary: '#166534',
      bgFrom: 'rgba(16, 185, 129, 0.15)',
      bgTo: 'rgba(5, 150, 105, 0.05)'
    },
    opreturn: {
      primary: '#f43f5e', // Red
      secondary: '#be123c',
      bgFrom: 'rgba(244, 63, 94, 0.15)',
      bgTo: 'rgba(190, 18, 60, 0.05)'
    },
    drivechain: {
      primary: '#3b82f6', // Blue
      secondary: '#1d4ed8',
      bgFrom: 'rgba(59, 130, 246, 0.15)',
      bgTo: 'rgba(29, 78, 216, 0.05)'
    },
    memecoin: {
      primary: '#d946ef', // Purple
      secondary: '#a21caf',
      bgFrom: 'rgba(217, 70, 239, 0.15)',
      bgTo: 'rgba(162, 28, 175, 0.05)'
    },
    '3dmodel': {
      primary: '#f7931a', // Orange (Bitcoin)
      secondary: '#b45309',
      bgFrom: 'rgba(247, 147, 26, 0.15)',
      bgTo: 'rgba(180, 83, 9, 0.05)'
    }
  };

  // Navigation items
  const navItems = [
    {
      id: 'mempool',
      name: 'Mempool Status',
      icon: <BarChart2 className="w-5 h-5" />,
      color: panelColors.mempool.primary
    },
    {
      id: 'opreturn',
      name: 'OP_Return Tracker',
      icon: <Database className="w-5 h-5" />,
      color: panelColors.opreturn.primary
    },
    {
      id: 'drivechain',
      name: 'Drivechain Activity',
      icon: <Activity className="w-5 h-5" />,
      color: panelColors.drivechain.primary
    },
    {
      id: 'memecoin',
      name: 'Memecoin Tracker',
      icon: <Bitcoin className="w-5 h-5" />,
      color: panelColors.memecoin.primary
    }
  ];

  // Get background style based on active panel
  const getBackgroundStyle = () => {
    const colors = panelColors[activePanel];
    return {
      background: `radial-gradient(circle at top right, ${colors.bgFrom}, ${colors.bgTo}, rgba(13, 27, 42, 0.95))`
    };
  };

  // Panel expansion handlers
  const handlePanelExpand = (panel: PanelType) => {
    setExpandedPanel(expandedPanel === panel ? null : panel);
  };

  // Render active panel content
  const renderPanelContent = (panel: PanelType, compact: boolean = false) => {
    switch (panel) {
      case 'mempool':
        return <MempoolStatus compact={compact} key={`mempool-${refreshCount}`} />;
      case 'opreturn':
        return <OpReturnTracker compact={compact} key={`opreturn-${refreshCount}`} />;
      case 'drivechain':
        return <DrivechainActivity compact={compact} key={`drivechain-${refreshCount}`} />;
      case 'memecoin':
        return <MemecoinTracker compact={compact} key={`memecoin-${refreshCount}`} />;
      case '3dmodel':
        return (
          <div className="bg-white/80 dark:bg-[#0D1B2A]/80 backdrop-blur-md rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-lg h-full">
            <div className="p-4 border-b border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <Globe className="mr-2 text-[#f7931a]" size={18} />
                3D Bitcoin Visualization
              </h3>
            </div>
            <div className="p-4 flex items-center justify-center" style={{ height: compact ? '300px' : '500px' }}>
              {/* Error handling wrapper around BitcoinModel */}
              <ErrorBoundary fallback={
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <div className="w-16 h-16 bg-[#f7931a] rounded-full flex items-center justify-center mb-4">
                    <span className="text-white text-2xl font-bold">₿</span>
                  </div>
                  <p>3D visualization unavailable</p>
                </div>
              }>
                <BitcoinModel 
                  key={`model-${refreshCount}`}
                  height={compact ? 280 : 480}
                  width={compact ? 280 : 500}
                />
              </ErrorBoundary>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Panel animation variants
  const panelVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 }
    }
  };

  // Simple error boundary component
  function ErrorBoundary({ children, fallback }: { children: React.ReactNode, fallback: React.ReactNode }) {
    const [hasError, setHasError] = useState(false);
    
    useEffect(() => {
      const errorHandler = () => setHasError(true);
      window.addEventListener('error', errorHandler);
      return () => window.removeEventListener('error', errorHandler);
    }, []);
    
    if (hasError || modelError) {
      return <>{fallback}</>;
    }
    
    return <>{children}</>;
  }

  // Main dashboard view
  return (
    <main className="min-h-screen bg-white dark:bg-[#0D1B2A] relative overflow-hidden">
      {/* Add the StarField component for a high-tech background */}
      <StarField 
        starsCount={150}
        speed={0.3}
        starColor="#f7931a"
        backgroundColor="transparent"
      />
      
      <div className={!isSignedIn ? 'filter blur-sm' : ''}>
        {/* Dynamic background based on active panel */}
        <motion.div
          className="fixed inset-0 z-10 transition-colors duration-1000 ease-in-out"
          initial={false}
          animate={getBackgroundStyle()}
        />

        {/* Loading overlay */}
        <AnimatePresence>
          {!contentLoaded && (
            <motion.div
              className="fixed inset-0 z-50 bg-[#0D1B2A] flex items-center justify-center"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-center">
                <div className="w-24 h-24 bg-[#f7931a] rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white text-4xl font-bold">₿</span>
                </div>
                <p className="mt-4 text-white text-xl">Loading Bitcoin NetInsights...</p>
                <div className="mt-4 w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#B3261E] to-[#f7931a]"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dashboard header */}
        <header className="sticky top-16 z-20 backdrop-blur-md bg-white/70 dark:bg-[#0D1B2A]/70 border-b border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-2">
                <h1 className="text-gray-900 dark:text-white text-xl font-bold hidden md:block">Bitcoin NetInsights</h1>
                <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-2 hidden md:block" />
                <span className="text-gray-600 dark:text-gray-300 text-sm">Dashboard</span>
              </div>

              <div className="flex items-center gap-4">
                {/* Extension button */}
                <button
                  onClick={() => router.push('/extension')}
                  className="p-2 rounded-lg bg-gray-100/80 hover:bg-gray-200/80 dark:bg-gray-800/50 dark:hover:bg-gray-700/50 text-gray-600 dark:text-gray-300 transition-colors flex items-center gap-2"
                >
                  <Puzzle size={16} />
                  <span className="text-sm hidden md:inline">Extension</span>
                </button>

                {/* Last refresh indicator - Client-side only time formatting */}
                <div className="text-gray-500 dark:text-gray-400 text-xs hidden md:flex items-center">
                  {formattedTime ? (
                    <span>Last updated: {formattedTime}</span>
                  ) : (
                    <span>Last updated: --:--:--</span>
                  )}
                  <button
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                    className={`ml-2 p-1 rounded-full hover:bg-gray-700/50 transition-colors ${
                      isRefreshing ? 'text-gray-500' : 'text-gray-300'
                    }`}
                  >
                    <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />
                  </button>
                </div>

                {/* View mode toggle */}
                <button
                  onClick={toggleViewMode}
                  className="p-2 rounded-lg bg-gray-100/80 hover:bg-gray-200/80 dark:bg-gray-800/50 dark:hover:bg-gray-700/50 text-gray-600 dark:text-gray-300 transition-colors flex items-center gap-2"
                >
                  {viewMode === 'tabbed' ? (
                    <>
                      <LayoutGrid size={16} />
                      <span className="text-sm hidden md:inline">Grid View</span>
                    </>
                  ) : (
                    <>
                      <Grid size={16} />
                      <span className="text-sm hidden md:inline">Tab View</span>
                    </>
                  )}
                </button>

                {/* Refresh button (mobile) */}
                <button
                  onClick={handleRefresh}
                  className="md:hidden p-2 rounded-lg bg-gray-100/80 hover:bg-gray-200/80 dark:bg-gray-800/50 dark:hover:bg-gray-700/50 text-gray-600 dark:text-gray-300 transition-colors"
                  disabled={isRefreshing}
                >
                  <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <div className="container mx-auto px-4 py-6 mt-20">
          {/* Tab navigation (visible only in tabbed view) */}
          {viewMode === 'tabbed' && (
            <div className="mb-6 z-30 relative">
              <div className="flex overflow-x-auto scrollbar-hide gap-2 pb-2 pt-4 bg-white/5 backdrop-blur-sm rounded-lg px-4 shadow-lg">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActivePanel(item.id as PanelType)}
                    className={`flex items-center px-4 py-3 rounded-lg text-sm whitespace-nowrap transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                      activePanel === item.id
                        ? 'bg-gray-200/90 dark:bg-gray-800/90 text-gray-900 dark:text-white shadow-lg'
                        : 'bg-gray-100/80 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 hover:bg-gray-200/90 dark:hover:bg-gray-800/90'
                    }`}
                    style={{
                      boxShadow: activePanel === item.id ? `0 0 10px 1px ${item.color}33` : 'none',
                      borderLeft: activePanel === item.id ? `3px solid ${item.color}` : 'none',
                    }}
                  >
                    <span className="mr-2" style={{ color: item.color }}>
                      {item.icon}
                    </span>
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Panel content */}
          {viewMode === 'tabbed' ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={activePanel}
                variants={panelVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="min-h-[60vh]"
              >
                {renderPanelContent(activePanel)}
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {navItems.map((item) => (
                <motion.div
                  key={item.id}
                  className={`h-full relative ${
                    expandedPanel && expandedPanel !== item.id ? 'opacity-50 scale-95' : ''
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: navItems.findIndex((nav) => nav.id === item.id) * 0.1,
                  }}
                >
                  <div className="h-full">{renderPanelContent(item.id as PanelType, true)}</div>

                  {/* Expansion toggle button */}
                  <button
                    className="absolute bottom-3 right-3 p-2 rounded-full bg-gray-200/50 hover:bg-gray-300/50 dark:bg-gray-800/50 dark:hover:bg-gray-700/70 text-gray-600 dark:text-gray-300 transition-colors"
                    onClick={() => handlePanelExpand(item.id as PanelType)}
                  >
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-300 ${
                        expandedPanel === item.id ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Expanded panel overlay */}
        <AnimatePresence>
          {expandedPanel && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="w-full max-w-5xl bg-white/90 dark:bg-[#0D1B2A]/90 rounded-xl overflow-hidden shadow-2xl"
                initial={{ scale: 0.9, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 30 }}
                transition={{ type: 'spring', damping: 25 }}
              >
                <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="mr-2" style={{ color: panelColors[expandedPanel].primary }}>
                      {navItems.find((item) => item.id === expandedPanel)?.icon}
                    </span>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {navItems.find((item) => item.id === expandedPanel)?.name}
                    </h3>
                  </div>

                  <button
                    className="p-2 rounded-full bg-gray-200/50 hover:bg-gray-300/50 dark:bg-gray-800/50 dark:hover:bg-gray-700/70 text-gray-600 dark:text-gray-300 transition-colors"
                    onClick={() => setExpandedPanel(null)}
                  >
                    <ChevronDown size={16} className="rotate-180" />
                  </button>
                </div>

                <div className="p-4">{renderPanelContent(expandedPanel)}</div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!isSignedIn && isLoaded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white p-8 rounded shadow-md w-96">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Login / Signup</h2>
            <p className="text-gray-600 mb-6">Please login or sign up to access the full dashboard.</p>
            <div className="flex items-center justify-between">
              <SignInButton mode="modal">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Login
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Sign Up
                </button>
              </SignUpButton>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

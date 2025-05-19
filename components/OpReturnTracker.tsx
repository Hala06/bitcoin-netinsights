'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FileText, Database, BarChart3, RefreshCw, Cpu, ChevronRight } from 'lucide-react';
import { getOPReturnStats } from '@/app/lib/opreturn';

interface OpReturnTrackerProps {
  compact?: boolean;
}

export default function OpReturnTracker({ compact = false }: OpReturnTrackerProps) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Function to fetch OP_RETURN data
  const fetchData = async () => {
    try {
      setRefreshing(true);
      const opReturnData = await getOPReturnStats();
      setData(opReturnData);
      setError(null);
    } catch (err) {
      console.error('Error fetching OP_RETURN data:', err);
      setError('Failed to load OP_RETURN data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Initial data load
  useEffect(() => {
    fetchData();
    
    // Set up auto-refresh every 60 seconds
    const intervalId = setInterval(fetchData, 60000);
    
    return () => clearInterval(intervalId);
  }, []);

  // Loading indicator for compact view
  if (compact && loading) {
    return (
      <motion.div 
        className="bg-[#0D1B2A]/80 backdrop-blur-md rounded-xl border border-gray-800 p-4 overflow-hidden shadow-lg h-full flex items-center justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-[#3498DB]"></div>
      </motion.div>
    );
  }

  // Error message for compact view
  if (compact && error) {
    return (
      <motion.div 
        className="bg-[#0D1B2A]/80 backdrop-blur-md rounded-xl border border-gray-800 p-4 overflow-hidden shadow-lg h-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <FileText className="mr-2 text-[#3498DB]" size={18} />
            OP_RETURN Data
          </h3>
        </div>
        <div className="text-red-400 text-sm">{error}</div>
      </motion.div>
    );
  }

  // Compact view
  if (compact) {
    return (
      <motion.div 
        className="bg-[#0D1B2A]/80 backdrop-blur-md rounded-xl border border-gray-800 overflow-hidden shadow-lg h-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <FileText className="mr-2 text-[#3498DB]" size={18} />
              OP_RETURN Data
            </h3>
          </div>
          
          {data && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-400 text-xs">24h Data Volume</p>
                  <p className="text-xl font-bold text-white">
                    {(data.dailyDataVolume / 1024).toFixed(2)} <span className="text-sm">KB</span>
                  </p>
                </div>
                
                <div className="text-xs font-medium px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full">
                  {data.dailyTransactions.toLocaleString()} TXs
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Last 24h Trend</span>
                  <span>{data.changePercentage > 0 ? '+' : ''}{data.changePercentage}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div 
                    className={`h-full ${
                      data.changePercentage > 0 ? 'bg-green-500' : 'bg-red-500'
                    }`}
                    initial={{ width: '0%' }}
                    animate={{ width: `${Math.min(Math.abs(data.changePercentage), 100)}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  ></motion.div>
                </div>
              </div>
              
              <div className="flex items-center text-xs text-gray-400">
                <Database size={12} className="mr-1" />
                <span>
                  {((data.totalDataStored || 0) / (1024 * 1024)).toFixed(2)} MB stored on chain
                </span>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    );
  }

  // Full view
  return (
    <motion.div 
      className="bg-[#0D1B2A]/80 backdrop-blur-md rounded-xl border border-gray-800 overflow-hidden shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white flex items-center">
            <FileText className="mr-2 text-[#3498DB]" />
            Bitcoin OP_RETURN Data Storage
          </h3>
          
          <button 
            onClick={fetchData}
            disabled={refreshing}
            className={`p-2 rounded-full hover:bg-gray-700/50 transition-colors ${
              refreshing ? 'text-gray-500' : 'text-gray-300'
            }`}
          >
            <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
          </button>
        </div>
        
        {loading && !data ? (
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#3498DB]"></div>
          </div>
        ) : error ? (
          <div className="text-red-400 py-8 text-center">{error}</div>
        ) : data ? (
          <>
            {/* Main Status Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="md:col-span-2">
                <div className="bg-gray-800/40 rounded-lg p-5">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                    <div>
                      <h4 className="text-white text-sm mb-1">OP_RETURN Usage</h4>
                      <div className="flex items-center">
                        <Database className="text-[#3498DB] mr-2" size={20} />
                        <h3 className="text-2xl font-bold text-white">
                          {(data.dailyDataVolume / 1024).toFixed(2)} KB <span className="text-sm font-normal text-gray-400">in last 24h</span>
                        </h3>
                      </div>
                      
                      <div className="mt-2 flex items-center">
                        <span className={`text-sm ${data.changePercentage >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {data.changePercentage > 0 ? '+' : ''}{data.changePercentage}%
                        </span>
                        <span className="text-xs text-gray-400 ml-2">vs previous 24h</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 md:mt-0">
                      <div className="text-gray-400 text-xs mb-1">Total Transactions</div>
                      <div className="text-white text-2xl font-bold">
                        {data.dailyTransactions.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  
                  {/* Chart Visualization */}
                  <div className="h-40 bg-gray-700/50 rounded-lg relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BarChart3 size={40} className="text-gray-600" />
                    </div>
                    
                    {/* Mock chart visualization - In a real app, you'd use a charting library */}
                    <div className="absolute bottom-0 inset-x-0 h-full flex items-end">
                      {Array.from({ length: 24 }).map((_, i) => {
                        // Generate mock hourly data points
                        const height = 20 + Math.random() * 60;
                        
                        return (
                          <div 
                            key={i}
                            style={{ height: `${height}%` }}
                            className="w-full bg-gradient-to-t from-[#3498DB]/80 to-[#3498DB]/20 mx-px"
                          ></div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Stats */}
              <div className="bg-gray-800/40 rounded-lg p-5">
                <h4 className="text-white text-sm mb-4">Storage Statistics</h4>
                
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-400 text-sm">Total Data Stored</span>
                    </div>
                    <div className="text-xl font-bold text-white">
                      {((data.totalDataStored || 0) / (1024 * 1024)).toFixed(2)} <span className="text-sm font-normal">MB</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-400 text-sm">Average TX Size</span>
                    </div>
                    <div className="text-xl font-bold text-white">
                      {data.avgTxSize?.toFixed(1) || '0'} <span className="text-sm font-normal">bytes</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-400 text-sm">Protocol Distribution</span>
                    </div>
                    <div className="mt-2 space-y-2">
                      {(data.protocols || []).map((protocol: any, i: number) => (
                        <div key={i} className="flex items-center">
                          <div 
                            className="w-2 h-2 rounded-full mr-2"
                            style={{ backgroundColor: `hsl(${210 + i * 30}, 70%, 60%)` }}
                          ></div>
                          <div className="text-sm text-gray-300">{protocol.name}</div>
                          <div className="flex-1 mx-2">
                            <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-[#3498DB]"
                                style={{ 
                                  width: `${protocol.percentage}%`,
                                  backgroundColor: `hsl(${210 + i * 30}, 70%, 60%)` 
                                }}
                              ></div>
                            </div>
                          </div>
                          <div className="text-xs text-gray-400">{protocol.percentage}%</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Recent OP_RETURN Data */}
            <div className="bg-gray-800/40 rounded-lg p-5">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-white">Recent OP_RETURN Transactions</h4>
                <button className="text-xs text-[#3498DB] hover:text-[#5DADE2] transition-colors flex items-center">
                  View blockchain explorer 
                  <ChevronRight size={14} />
                </button>
              </div>
              
              <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar">
                {(data.recentTransactions || []).map((tx: any, i: number) => (
                  <div key={i} className="bg-gray-700/30 rounded p-3 flex items-center">
                    <div className="bg-[#3498DB]/20 text-[#3498DB] p-2 rounded mr-3">
                      <Cpu size={16} />
                    </div>
                    
                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-center">
                        <div className="text-white text-sm font-medium truncate w-24 sm:w-40">
                          {tx.txid?.slice(0, 8)}...{tx.txid?.slice(-8)}
                        </div>
                        <div className="text-xs px-2 py-0.5 bg-blue-900/30 text-blue-400 rounded ml-2">
                          {tx.protocol || 'Unknown'}
                        </div>
                      </div>
                      
                      <div className="text-gray-400 text-xs mt-1 truncate">
                        {tx.data?.length > 50 ? `${tx.data.slice(0, 50)}...` : tx.data || 'Encoded data'}
                      </div>
                    </div>
                    
                    <div className="text-right text-xs text-gray-400 whitespace-nowrap ml-2">
                      {tx.size} bytes
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </motion.div>
  );
}
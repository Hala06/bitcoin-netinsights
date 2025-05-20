'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, AlertTriangle, Check, ChevronRight, RefreshCw } from 'lucide-react';
import { getMempoolData } from '@/app/lib/mempool';

interface MempoolStatusProps {
  compact?: boolean;
}

export default function MempoolStatus({ compact = false }: MempoolStatusProps) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Function to fetch mempool data
  const fetchData = async () => {
    try {
      setRefreshing(true);
      const mempoolData = await getMempoolData();
      setData(mempoolData);
      setError(null);
    } catch (err) {
      console.error('Error fetching mempool data:', err);
      setError('Failed to load mempool data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Initial data load
  useEffect(() => {
    fetchData();
    
    // Set up auto-refresh every 15 seconds
    const intervalId = setInterval(fetchData, 15000);
    
    return () => clearInterval(intervalId);
  }, []);

  // Determine fee status
  const getFeeStatus = (fee: number): { status: 'low' | 'moderate' | 'high'; color: string } => {
    if (fee < 30) return { status: 'low', color: 'text-green-400' };
    if (fee < 80) return { status: 'moderate', color: 'text-yellow-400' };
    return { status: 'high', color: 'text-red-400' };
  };

  // Loading indicator for compact view
  if (compact && loading) {
    return (
      <motion.div 
        className="bg-[#0D1B2A]/80 backdrop-blur-md rounded-xl border border-gray-800 p-4 overflow-hidden shadow-lg h-full flex items-center justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-[#F39C12]"></div>
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
            <Flame className="mr-2 text-[#F39C12]" size={18} />
            Mempool Status
          </h3>
        </div>
        <div className="text-red-400 text-sm">{error}</div>
      </motion.div>
    );
  }

  // Compact view
  if (compact) {
    const feeStatus = data ? getFeeStatus(data.fees.fastestFee) : { status: 'loading', color: 'text-gray-400' };
    
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
              <Flame className="mr-2 text-[#F39C12]" size={18} />
              Mempool Status
            </h3>
          </div>
          
          {data && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-400 text-xs">Current Fee Rate</p>
                  <p className={`text-xl font-bold ${feeStatus.color}`}>
                    {data.fees.fastestFee} <span className="text-sm">sat/vB</span>
                  </p>
                </div>
                <div 
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    feeStatus.status === 'low' ? 'bg-green-900/30 text-green-400' :
                    feeStatus.status === 'moderate' ? 'bg-yellow-900/30 text-yellow-400' :
                    'bg-red-900/30 text-red-400'
                  }`}
                >
                  {feeStatus.status === 'low' ? 'Low Congestion' :
                   feeStatus.status === 'moderate' ? 'Moderate' :
                   'High Congestion'}
                </div>
              </div>
              
              <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                <motion.div 
                  className={`h-full ${
                    feeStatus.status === 'low' ? 'bg-green-500' :
                    feeStatus.status === 'moderate' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                  initial={{ width: '0%' }}
                  animate={{ width: `${data.loadPercentage}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                ></motion.div>
              </div>
              
              <p className="text-xs text-gray-400">
                {data.pendingTxCount.toLocaleString()} pending transactions
              </p>
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
            <Flame className="mr-2 text-[#F39C12]" />
            Bitcoin Mempool Status
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
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#F39C12]"></div>
          </div>
        ) : error ? (
          <div className="text-red-400 py-8 text-center">{error}</div>
        ) : data ? (
          <>
            {/* Main Fee Status Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="md:col-span-2">
                <div className="bg-gray-800/40 rounded-lg p-5">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                    <div>
                      <h4 className="text-white text-sm mb-1">Current Network Status</h4>
                      <div className="flex items-center">
                        {getFeeStatus(data.fees.fastestFee).status === 'low' ? (
                          <Check className="text-green-400 mr-2" size={20} />
                        ) : getFeeStatus(data.fees.fastestFee).status === 'moderate' ? (
                          <AlertTriangle className="text-yellow-400 mr-2" size={20} />
                        ) : (
                          <Flame className="text-red-400 mr-2" size={20} />
                        )}
                        
                        <h3 className={`text-2xl font-bold ${getFeeStatus(data.fees.fastestFee).color}`}>
                          {getFeeStatus(data.fees.fastestFee).status === 'low' ? 'Low Congestion' :
                           getFeeStatus(data.fees.fastestFee).status === 'moderate' ? 'Moderate Congestion' :
                           'High Congestion'}
                        </h3>
                      </div>
                    </div>
                    
                    <div className="mt-4 md:mt-0">
                      <div className="text-gray-400 text-xs mb-1">Mempool Size</div>
                      <div className="text-white text-2xl font-bold">
                        {data.mempoolSize.toLocaleString()} <span className="text-sm font-normal">MB</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mb-2">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>0%</span>
                      <span>50%</span>
                      <span>100%</span>
                    </div>
                    <div className="h-4 bg-gray-700/50 rounded-full overflow-hidden">
                      <motion.div 
                        className={`h-full ${
                          data.loadPercentage < 30 ? 'bg-gradient-to-r from-green-500 to-green-400' :
                          data.loadPercentage < 70 ? 'bg-gradient-to-r from-yellow-500 to-yellow-400' :
                          'bg-gradient-to-r from-red-500 to-red-400'
                        }`}
                        initial={{ width: '0%' }}
                        animate={{ width: `${data.loadPercentage}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      ></motion.div>
                    </div>
                  </div>
                  
                  <div className="text-center text-sm text-gray-400">
                    {data.pendingTxCount.toLocaleString()} pending transactions
                  </div>
                </div>
              </div>
              
              {/* Fee Recommendations */}
              <div className="bg-gray-800/40 rounded-lg p-5">
                <h4 className="text-white text-sm mb-4">Recommended Fees (sat/vB)</h4>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <div className="text-sm text-gray-300">Fastest (~10 min)</div>
                      <div className="text-lg font-mono font-bold text-white">{data.fees.fastestFee}</div>
                    </div>
                    <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <div className="text-sm text-gray-300">Half Hour</div>
                      <div className="text-lg font-mono font-bold text-white">{data.fees.halfHourFee}</div>
                    </div>
                    <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-yellow-500" 
                        style={{ 
                          width: `${Math.min(100, Math.round((data.fees.halfHourFee / data.fees.fastestFee) * 100))}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <div className="text-sm text-gray-300">Hour</div>
                      <div className="text-lg font-mono font-bold text-white">{data.fees.hourFee}</div>
                    </div>
                    <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500" 
                        style={{ 
                          width: `${Math.min(100, Math.round((data.fees.hourFee / data.fees.fastestFee) * 100))}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <div className="text-sm text-gray-300">Economy</div>
                      <div className="text-lg font-mono font-bold text-white">{data.fees.economyFee}</div>
                    </div>
                    <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500" 
                        style={{ 
                          width: `${Math.min(100, Math.round((data.fees.economyFee / data.fees.fastestFee) * 100))}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Fee Explanation */}
            <div className="bg-gray-800/40 rounded-lg p-5 mb-6">
              <h4 className="text-white mb-3">What do these fees mean?</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                Bitcoin transactions include a fee to incentivize miners to include them in blocks. 
                When the network is busy, fees increase as users compete for limited block space. 
                The <span className="text-red-400 font-medium">Fastest</span> fee rate typically gets 
                included in the next block (~10 minutes), while 
                <span className="text-green-400 font-medium"> Economy</span> might take several hours 
                but costs significantly less.
              </p>
            </div>
            
            {/* Current Transactions */}
            <div className="bg-gray-800/40 rounded-lg p-5">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-white">Recent Blocks</h4>
                <button className="text-xs text-[#F39C12] hover:text-[#F5AB35] transition-colors flex items-center">
                  View blockchain explorer 
                  <ChevronRight size={14} />
                </button>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {Array.from({ length: 6 }).map((_, i) => {
                  // Generate mock block data
                  const blockHeight = 800000 + i;
                  const txCount = Math.floor(Math.random() * 1000) + 1000;
                  const fullness = Math.floor(Math.random() * 40) + 60; // 60-100%
                  
                  return (
                    <div key={i} className="bg-gray-700/30 rounded p-3">
                      <div className="text-xs text-gray-400 mb-1">Block #{blockHeight}</div>
                      <div className="text-white font-medium">{txCount} txs</div>
                      <div className="mt-2 h-1 bg-gray-600 rounded-full">
                        <div 
                          className="h-full bg-[#F39C12]"
                          style={{ width: `${fullness}%` }}
                        ></div>
                      </div>
                      <div className="text-right text-xs text-gray-500 mt-1">{fullness}% full</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </motion.div>
  );
}

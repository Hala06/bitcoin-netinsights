'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bitcoin, TrendingUp, TrendingDown, Info, ChevronRight } from 'lucide-react';
import { getMemecoinsActivity, getTokenCreationHistory, TokenInfo, MemeTokenEvent } from '@/app/lib/memecoin';

interface MemecoinTrackerProps {
  compact?: boolean;
}

export default function MemecoinTracker({ compact = false }: MemecoinTrackerProps) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [historyData, setHistoryData] = useState<{date: string, count: number}[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedToken, setSelectedToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [tokenData, creationHistory] = await Promise.all([
          getMemecoinsActivity(),
          getTokenCreationHistory()
        ]);
        setData(tokenData);
        setHistoryData(creationHistory.map(day => ({ date: day.date, count: day.tokensCreated })));
        
        // Select first token by default
        if (tokenData.length > 0 && !selectedToken) {
          setSelectedToken(tokenData[0].token);
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching memecoin data:', err);
        setError('Failed to load memecoin data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
    // Set up automatic refresh interval
    const intervalId = setInterval(fetchData, 60000); // refresh every minute
    
    return () => clearInterval(intervalId);
  }, []);

  // Function to format numbers with K, M, B suffixes
  const formatNumber = (num: number): string => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B';
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };
  
  // Get the details of the selected token
  const getSelectedTokenDetails = (): TokenInfo | null => {
    if (!data || !selectedToken) return null;
    
    return data.top10Tokens.find((token: TokenInfo) => token.ticker === selectedToken) || null;
  };
  
  const selectedTokenDetails = getSelectedTokenDetails();

  if (compact) {
    return (
      <motion.div 
        className="bg-[#0D1B2A]/80 backdrop-blur-md rounded-xl border border-gray-800 overflow-hidden shadow-lg h-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <Bitcoin className="mr-2 text-[#C04A44]" size={18} />
              Memecoin Activity
            </h3>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center h-20">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-[#C04A44]"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center py-4">{error}</div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-800/40 rounded-lg p-3">
                <p className="text-gray-400 text-xs mb-1">Total Tokens</p>
                <p className="text-white text-xl font-bold">{data?.totalTokens}</p>
              </div>
              <div className="bg-gray-800/40 rounded-lg p-3">
                <p className="text-gray-400 text-xs mb-1">Daily Txs</p>
                <p className="text-white text-xl font-bold">{formatNumber(data?.dailyTransactions)}</p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="bg-[#0D1B2A]/80 backdrop-blur-md rounded-xl border border-gray-800 overflow-hidden shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white flex items-center">
            <Bitcoin className="mr-2 text-[#C04A44]" />
            BRC-20 Token Tracker
          </h3>
          {data && (
            <span className="px-3 py-1 text-sm bg-[#C04A44]/20 text-[#F18D86] rounded-full">
              {data.totalTokens} Tokens
            </span>
          )}
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#C04A44]"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center py-8">{error}</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Top Tokens Table */}
              <div className="md:col-span-2 bg-gray-800/40 rounded-lg p-4">
                <h4 className="text-white font-medium mb-3">Top Tokens by Volume</h4>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="text-gray-400 border-b border-gray-700">
                        <th className="text-left py-2">Token</th>
                        <th className="text-right py-2">Price (BTC)</th>
                        <th className="text-right py-2">24h</th>
                        <th className="text-right py-2">Volume</th>
                        <th className="text-right py-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((token: MemeTokenEvent, index: number) => (
                        <tr 
                          key={token.ticker} 
                          className={`border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors ${
                            selectedToken === token.ticker ? 'bg-[#C04A44]/10' : ''
                          }`}
                          onClick={() => setSelectedToken(token.ticker)}
                        >
                          <td className="py-3 flex items-center">
                            <div className="w-6 h-6 bg-[#C04A44]/20 rounded-full flex items-center justify-center text-xs text-[#F18D86] font-mono mr-2">
                              {token.ticker.substring(0, 1)}
                            </div>
                            <span className="font-medium text-white">{token.ticker}</span>
                          </td>
                          <td className="text-right font-mono text-white">
                            {token.priceInBTC?.toFixed(10)}
                          </td>
                          <td className={`text-right ${token.changePercent24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            <div className="flex items-center justify-end">
                              {token.changePercent24h >= 0 ? (
                                <TrendingUp size={14} className="mr-1" />
                              ) : (
                                <TrendingDown size={14} className="mr-1" />
                              )}
                              {token.changePercent24h >= 0 ? '+' : ''}{token.changePercent24h.toFixed(2)}%
                            </div>
                          </td>
                          <td className="text-right text-gray-300">
                            {token.volume24h.toFixed(2)} BTC
                          </td>
                          <td className="text-right">
                            <button 
                              className="text-gray-400 hover:text-white"
                              onClick={() => setSelectedToken(token.ticker)}
                            >
                              <ChevronRight size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Token Details */}
              <div className="bg-gray-800/40 rounded-lg p-4">
                {selectedTokenDetails ? (
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-[#C04A44]/30 rounded-full flex items-center justify-center text-lg text-[#F18D86] font-mono mr-3">
                        {selectedTokenDetails.ticker.substring(0, 1)}
                      </div>
                      <div>
                        <h3 className="text-white text-lg font-medium">{selectedTokenDetails.ticker}</h3>
                        <p className="text-gray-400 text-xs">{selectedTokenDetails.name}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-gray-400 text-xs mb-1">Price</p>
                        <div className="flex items-center justify-between">
                          <p className="text-white text-xl font-mono">{selectedTokenDetails.priceInBTC?.toFixed(10)} BTC</p>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            selectedTokenDetails.changePercent24h >= 0 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-red-500/20 text-red-400'
                          }`}>
                            {selectedTokenDetails.changePercent24h >= 0 ? '+' : ''}{selectedTokenDetails.changePercent24h.toFixed(2)}%
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <p className="text-gray-400 text-xs">Market Cap</p>
                          <p className="text-white text-sm">
                            {selectedTokenDetails.marketCapInBTC?.toFixed(2)} BTC
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-gray-400 text-xs">Holders</p>
                          <p className="text-white text-sm">
                            {selectedTokenDetails.holders.toLocaleString()}
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-gray-400 text-xs">Supply</p>
                          <p className="text-white text-sm">
                            {formatNumber(selectedTokenDetails.totalSupply)}
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-gray-400 text-xs">Deployment Block</p>
                          <p className="text-white text-sm">
                            {selectedTokenDetails.deploymentBlock.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-700">
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-gray-400 text-xs">24h Volume</p>
                          <p className="text-white text-sm font-medium">
                            {selectedTokenDetails.volume24h.toFixed(2)} BTC
                          </p>
                        </div>
                        <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-[#C04A44] to-[#F18D86]" 
                            style={{ width: `${Math.min(100, selectedTokenDetails.volume24h * 2)}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 text-right">
                          {Math.min(100, Math.round(selectedTokenDetails.volume24h * 2))}% of max volume
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-400 text-sm">Select a token to view details</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Bottom Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-800/40 rounded-lg p-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-gray-400 text-xs">Total Tokens</p>
                  <Info size={14} className="text-gray-500" />
                </div>
                <p className="text-white text-2xl font-bold">{formatNumber(data.totalTokens)}</p>
              </div>
              <div className="bg-gray-800/40 rounded-lg p-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-gray-400 text-xs">Unique Holders</p>
                  <Info size={14} className="text-gray-500" />
                </div>
                <p className="text-white text-2xl font-bold">{formatNumber(data.uniqueHolders)}</p>
              </div>
              <div className="bg-gray-800/40 rounded-lg p-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-gray-400 text-xs">Daily Transactions</p>
                  <Info size={14} className="text-gray-500" />
                </div>
                <p className="text-white text-2xl font-bold">{formatNumber(data.dailyTransactions)}</p>
              </div>
              <div className="bg-gray-800/40 rounded-lg p-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-gray-400 text-xs">Recently Created</p>
                  <Info size={14} className="text-gray-500" />
                </div>
                <p className="text-white text-2xl font-bold">
                  {historyData.length > 0 ? 
                    formatNumber(historyData.slice(-7).reduce((sum, day) => sum + day.count, 0)) : '0'}
                </p>
                <p className="text-xs text-gray-400">last 7 days</p>
              </div>
            </div>
            
            {/* Token Creation History Chart */}
            <div className="bg-gray-800/40 rounded-lg p-4">
              <h4 className="text-white font-medium mb-3">Token Creation History (90d)</h4>
              <div className="h-40 flex items-end space-x-0.5">
                {historyData.map((day, index) => (
                  <div 
                    key={index} 
                    className="flex-1 group relative"
                  >
                    <div 
                      className={`bg-[#C04A44]/50 hover:bg-[#C04A44]/80 rounded-sm transition-all ${
                        index % 7 === 0 ? 'border-l border-gray-500/30' : ''
                      }`}
                      style={{ 
                        height: `${Math.max(4, (day.count / 30) * 100)}%`,
                      }}
                    ></div>
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-900 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                      {day.date}: {day.count} new tokens
                    </div>
                    
                    {/* Date markers (only show every 15 days) */}
                    {index % 15 === 0 && (
                      <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs text-gray-500">
                        {day.date.slice(-5)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="h-6"></div> {/* Space for date markers */}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}

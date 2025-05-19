'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, Layers, ChevronRight, ArrowUpRight, Activity, Server, Users } from 'lucide-react';
import { getDrivechainStats, getDrivechainTransactionHistory } from '@/app/lib/drivechain';

interface Drivechain {
  id: string;
  name: string;
  status: 'active' | 'proposed';
  nodeCount: number;
  totalValue: number;
  blockHeight: number;
  transactionCount: number;
  hashrate?: number;
  description?: string;
}

interface DrivechainActivityProps {
  compact?: boolean;
}

export default function DrivechainActivity({ compact = false }: DrivechainActivityProps) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedDrivechain, setSelectedDrivechain] = useState<Drivechain | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [txHistory, setTxHistory] = useState<{date: string, transactions: number}[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const drivechainData = await getDrivechainStats();
        setData(drivechainData);

        const activeChains = drivechainData.drivechains.filter((dc: Drivechain) => dc.status === 'active');
        if (activeChains.length > 0 && !selectedDrivechain) {
          setSelectedDrivechain(activeChains[0]);
          const history = await getDrivechainTransactionHistory(activeChains[0].id);
          setTxHistory(history);
        }

        setError(null);
      } catch (err) {
        console.error('Error fetching drivechain data:', err);
        setError('Failed to load drivechain data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 60000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!selectedDrivechain) return;

    const fetchHistory = async () => {
      try {
        const history = await getDrivechainTransactionHistory(selectedDrivechain.id);
        setTxHistory(history);
      } catch (err) {
        console.error(`Error fetching history for ${selectedDrivechain.id}:`, err);
      }
    };

    fetchHistory();
  }, [selectedDrivechain]);

  const handleDrivechainSelect = async (drivechain: Drivechain) => {
    setSelectedDrivechain(drivechain);
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <motion.div 
      className="bg-[#0D1B2A]/80 backdrop-blur-md rounded-xl border border-gray-800 overflow-hidden shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white flex items-center">
            <Network className="mr-2 text-[#2A4E76]" />
            Drivechain Activity
          </h3>
          <span className="px-3 py-1 text-sm bg-[#2A4E76]/20 text-[#77A1D3] rounded-full">
            {data?.totalActiveDrivechains || 0} Active Chains
          </span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#2A4E76]"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center py-8">{error}</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6 relative">
              {data.drivechains.filter((dc: Drivechain) => dc.status === 'active').map((chain: Drivechain) => (
                <div 
                  key={chain.id}
                  onClick={() => handleDrivechainSelect(chain)}
                  className={`bg-gray-800/40 backdrop-blur-sm rounded-lg p-4 cursor-pointer transition-all border-2 ${
                    selectedDrivechain?.id === chain.id 
                      ? 'border-[#2A4E76]' 
                      : 'border-transparent hover:border-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-medium">{chain.name}</h4>
                    {selectedDrivechain?.id === chain.id && (
                      <div className="w-2 h-2 bg-[#2A4E76] rounded-full"></div>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{chain.nodeCount} Nodes</span>
                    <span className="text-[#77A1D3]">{chain.totalValue} BTC</span>
                  </div>
                </div>
              ))}
            </div>

            {selectedDrivechain && (
              <div className="bg-gray-800/40 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center">
                      <h3 className="text-white text-lg font-semibold mr-2">{selectedDrivechain.name}</h3>
                      <span className="text-xs px-2 py-0.5 bg-[#2A4E76]/30 text-[#77A1D3] rounded-full">
                        Active
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mt-1">{selectedDrivechain.description}</p>
                  </div>
                  <button 
                    onClick={toggleDetails}
                    className="px-3 py-1.5 text-sm bg-[#2A4E76]/30 text-[#77A1D3] rounded-lg hover:bg-[#2A4E76]/50 transition-all flex items-center"
                  >
                    {showDetails ? 'Hide Details' : 'View Details'}
                    <ChevronRight size={16} className={`ml-1 transition-transform duration-300 ${showDetails ? 'rotate-90' : ''}`} />
                  </button>
                </div>

                <AnimatePresence>
                  {showDetails && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-4">
                        <div className="text-sm text-gray-300">
                          <p>
                            {selectedDrivechain.name} is a Bitcoin sidechain that allows for 
                            additional functionality while maintaining the security of the Bitcoin network.
                            It currently has {selectedDrivechain.nodeCount} active nodes and 
                            has processed {selectedDrivechain.transactionCount.toLocaleString()} transactions.
                          </p>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                          <div className="bg-gray-800/40 p-3 rounded-lg">
                            <div className="flex items-center text-gray-400 text-xs mb-1">
                              <Server size={12} className="mr-1" />
                              Block Height
                            </div>
                            <p className="text-white font-mono">{selectedDrivechain.blockHeight.toLocaleString()}</p>
                          </div>
                          <div className="bg-gray-800/40 p-3 rounded-lg">
                            <div className="flex items-center text-gray-400 text-xs mb-1">
                              <Users size={12} className="mr-1" />
                              Nodes
                            </div>
                            <p className="text-white">{selectedDrivechain.nodeCount}</p>
                          </div>
                          <div className="bg-gray-800/40 p-3 rounded-lg">
                            <div className="flex items-center text-gray-400 text-xs mb-1">
                              <Activity size={12} className="mr-1" />
                              Hashrate
                            </div>
                            <p className="text-white">{selectedDrivechain.hashrate || 'N/A'} {selectedDrivechain.hashrate ? 'TH/s' : ''}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white text-sm font-medium">Transaction Activity (30d)</h4>
                    <div className="flex items-center text-[#77A1D3] text-xs">
                      <ArrowUpRight size={12} className="mr-1" />
                      <span>{txHistory.length > 0 ? `+${Math.round((txHistory[txHistory.length-1].transactions / txHistory[0].transactions - 1) * 100)}%` : '0%'}</span>
                    </div>
                  </div>

                  <div className="h-20 flex items-end space-x-1">
                    {txHistory.map((day, index) => (
                      <div key={index} className="flex-1 group relative">
                        <div className="bg-[#2A4E76]/50 hover:bg-[#2A4E76]/80 rounded-sm transition-all" style={{ height: `${Math.max(4, (day.transactions / 5000) * 100)}%` }}></div>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-900 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                          {day.date}: {day.transactions.toLocaleString()} txs
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}

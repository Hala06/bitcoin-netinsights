/**
 * API service for tracking Bitcoin mempool congestion and fee rates
 */

import axios from 'axios';

interface MempoolFees {
  fastestFee: number;
  halfHourFee: number;
  hourFee: number;
  economyFee: number;
  minimumFee: number;
}

interface MempoolStats {
  fees: MempoolFees;
  mempoolSize: number;  // in MB
  pendingTxCount: number;
  loadPercentage: number; // 0-100
}

// Mock data generator for mempool statistics (for development without API)
function generateMockMempoolData(): MempoolStats {
  // Randomized but realistic mock data
  const fastestFee = Math.floor(Math.random() * 40) + 80; // 80-120 sat/vB
  
  return {
    fees: {
      fastestFee,
      halfHourFee: Math.max(10, fastestFee - Math.floor(Math.random() * 30) - 10),
      hourFee: Math.max(5, fastestFee - Math.floor(Math.random() * 40) - 20),
      economyFee: Math.max(1, fastestFee - Math.floor(Math.random() * 60) - 30),
      minimumFee: 1,
    },
    mempoolSize: parseFloat((Math.random() * 150 + 10).toFixed(1)),
    pendingTxCount: Math.floor(Math.random() * 15000) + 5000,
    loadPercentage: Math.floor(Math.random() * 80) + 10, // 10-90%
  };
}

/**
 * Get current mempool statistics including fee rates
 */
export async function getMempoolData(): Promise<MempoolStats> {
  try {
    // Get fee recommendations from mempool.space API
    const res = await axios.get('https://mempool.space/api/v1/fees/recommended');
    
    // Simulate additional data that would come from a real API
    // In a production app, this would fetch from your backend API
    const mempoolSize = Math.floor(Math.random() * 80) + 40; // 40-120MB
    const pendingTxCount = Math.floor(Math.random() * 30000) + 5000; // 5k-35k
    const loadPercentage = Math.min(100, Math.floor((mempoolSize / 100) * 100)); // % of capacity
    
    return {
      fees: {
        ...res.data,
        minimumFee: 1 // Add minimum fee to API response
      },
      mempoolSize,
      pendingTxCount,
      loadPercentage
    };
  } catch (error) {
    console.error('Error fetching mempool data:', error);
    
    // Return fallback data in case of API failure
    return {
      fees: {
        fastestFee: 25,
        halfHourFee: 20,
        hourFee: 15,
        economyFee: 10,
        minimumFee: 1
      },
      mempoolSize: 60,
      pendingTxCount: 12000,
      loadPercentage: 60
    };
  }
}

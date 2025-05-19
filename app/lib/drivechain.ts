/**
 * API service for tracking Bitcoin Drivechain and Layer 2 solution activity
 */

interface SidechainStats {
  name: string;
  totalTransactions: number;
  activeUsers: number;
  tpsAverage: number;
  mainchainFootprint: number; // in bytes per 24h
  hashrate: string; // human readable
  status: 'active' | 'inactive' | 'developing';
}

interface DrivechainStats {
  totalSidechains: number;
  activeSidechains: number;
  totalTps: number;
  totalActiveUsers: number;
  sidechains: SidechainStats[];
  historicalActivity: {
    date: string;
    transactions: number;
  }[];
}

/**
 * Get current Drivechain and Layer 2 statistics
 */
export async function getDrivechainTransactionHistory(): Promise<{ date: string; transactions: number }[]> {
  // Mock implementation for transaction history
  const generateHistoricalData = (days = 30) => {
    const result = [];
    const now = new Date();
    for (let i = days; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      result.push({
        date: date.toISOString().split('T')[0],
        transactions: Math.floor(Math.random() * 100000) + 50000,
      });
    }
    return result;
  };
  return generateHistoricalData();
}

/**
 * Get current Drivechain and Layer 2 statistics
 */
export async function getDrivechainStats(): Promise<DrivechainStats> {
  // In a real app, this would fetch from a Layer 2 API
  // For now, generating realistic mock data
  
  // Generate historical data points
  const generateHistoricalData = (days = 30) => {
    const result = [];
    const now = new Date();
    
    for (let i = days; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      result.push({
        date: date.toISOString().split('T')[0],
        transactions: Math.floor(Math.random() * 100000) + 50000
      });
    }
    
    return result;
  };
  
  // Define test sidechains
  const sidechains: SidechainStats[] = [
    {
      name: "ZendoLedger",
      totalTransactions: 1245730,
      activeUsers: 18500,
      tpsAverage: 45,
      mainchainFootprint: 2048, // bytes
      hashrate: "12.5 PH/s",
      status: 'active'
    },
    {
      name: "BitVM",
      totalTransactions: 734221,
      activeUsers: 12000,
      tpsAverage: 38,
      mainchainFootprint: 1536,
      hashrate: "8.3 PH/s",
      status: 'active'
    },
    {
      name: "Bitassets",
      totalTransactions: 523887,
      activeUsers: 8750,
      tpsAverage: 25,
      mainchainFootprint: 1024,
      hashrate: "5.2 PH/s",
      status: 'active'
    },
    {
      name: "TestChain",
      totalTransactions: 324556,
      activeUsers: 5200,
      tpsAverage: 15,
      mainchainFootprint: 768,
      hashrate: "3.1 PH/s", 
      status: 'active'
    },
    {
      name: "Bitcoin DeFi",
      totalTransactions: 112233,
      activeUsers: 3100,
      tpsAverage: 8,
      mainchainFootprint: 512,
      hashrate: "2.5 PH/s",
      status: 'active'
    },
    {
      name: "Gaming Chain",
      totalTransactions: 87654,
      activeUsers: 2500,
      tpsAverage: 7,
      mainchainFootprint: 256,
      hashrate: "1.8 PH/s",
      status: 'active'
    },
    {
      name: "Identity Chain",
      totalTransactions: 5432,
      activeUsers: 1200,
      tpsAverage: 0.5,
      mainchainFootprint: 128,
      hashrate: "0.9 PH/s",
      status: 'active'
    },
    {
      name: "Smart BTC",
      totalTransactions: 0,
      activeUsers: 0,
      tpsAverage: 0,
      mainchainFootprint: 0,
      hashrate: "0 PH/s",
      status: 'developing'
    }
  ];
  
  // Calculate totals
  const activeSidechains = sidechains.filter(chain => chain.status === 'active');
  const totalTps = activeSidechains.reduce((sum, chain) => sum + chain.tpsAverage, 0);
  const totalActiveUsers = activeSidechains.reduce((sum, chain) => sum + chain.activeUsers, 0);
  
  return {
    totalSidechains: sidechains.length,
    activeSidechains: activeSidechains.length,
    totalTps,
    totalActiveUsers,
    sidechains,
    historicalActivity: generateHistoricalData()
  };
}

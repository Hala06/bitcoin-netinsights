/**
 * API service for tracking OP_Return data usage on the Bitcoin blockchain
 */

interface OPReturnStats {
  dailyCount: number;
  dailyDataVolume: number;
  changePercentage: number;
  percentageOfBlockSpace: number;
  averageSize: number;
  totalDataStored: number;
  avgTxSize: number;
  protocols: {
    name: string;
    percentage: number;
  }[];
  topProtocols: {
    name: string;
    count: number;
    percentage: number;
  }[];
  recentTransactions: {
    txid: string;
    size: number;
    protocol: string;
    timestamp: string;
    data?: string;
  }[];
  historicalUsage: {
    date: string;
    count: number;
  }[];
}

/**
 * Get current OP_Return usage statistics
 */
export async function getOPReturnStats(): Promise<OPReturnStats> {
  // In a real app, this would fetch from an API
  // For now, generating realistic mock data
  
  // Generate random tx IDs
  const generateTxId = () => {
    return Array.from({ length: 64 }, () => 
      '0123456789abcdef'[Math.floor(Math.random() * 16)]
    ).join('');
  };
  
  // Generate historical data points
  const generateHistoricalData = (days = 14) => {
    const result = [];
    const now = new Date();
    
    for (let i = days; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      result.push({
        date: date.toISOString().split('T')[0],
        count: Math.floor(Math.random() * 10000) + 5000
      });
    }
    
    return result;
  };
  
  // Generate recent transaction data
  const generateRecentTransactions = (count = 10) => {
    const protocols = ['Ordinals', 'Counterparty', 'Omni', 'Veriblock', 'Unknown'];
    const result = [];
    const now = Date.now();
    
    for (let i = 0; i < count; i++) {
      const minutesAgo = Math.floor(Math.random() * 60);
      const timestamp = new Date(now - minutesAgo * 60000).toISOString();
      
      result.push({
        txid: generateTxId(),
        size: Math.floor(Math.random() * 80) + 10, // 10-90 bytes
        protocol: protocols[Math.floor(Math.random() * protocols.length)],
        timestamp
      });
    }
    
    return result;
  };
  
  // Calculate mock daily data volume
  const dailyCount = Math.floor(Math.random() * 50000) + 10000; // 10k-60k
  const avgSize = Math.floor(Math.random() * 50) + 20; // 20-70 bytes
  const dailyVolume = dailyCount * avgSize;
  
  // Random percentage change (-20% to +20%)
  const changePercentage = parseFloat((Math.random() * 40 - 20).toFixed(1));
  
  // Mock total data stored (30-50MB range)
  const totalDataStored = (Math.random() * 20 + 30) * 1024 * 1024; // Convert MB to bytes

  const protocols = [
    { name: 'Ordinals', percentage: 45 },
    { name: 'Counterparty', percentage: 25 },
    { name: 'Omni', percentage: 15 },
    { name: 'Veriblock', percentage: 10 },
    { name: 'Other', percentage: 5 }
  ];

  return {
    dailyCount,
    dailyDataVolume: dailyVolume,
    changePercentage,
    percentageOfBlockSpace: parseFloat((Math.random() * 30 + 5).toFixed(2)), // 5-35%
    averageSize: avgSize,
    totalDataStored,
    avgTxSize: avgSize,
    protocols,
    topProtocols: [
      { name: 'Ordinals', count: Math.floor(Math.random() * 5000) + 3000, percentage: 45 },
      { name: 'Counterparty', count: Math.floor(Math.random() * 2000) + 1000, percentage: 25 },
      { name: 'Omni', count: Math.floor(Math.random() * 1000) + 500, percentage: 15 },
      { name: 'Veriblock', count: Math.floor(Math.random() * 800) + 300, percentage: 10 },
      { name: 'Other', count: Math.floor(Math.random() * 500) + 100, percentage: 5 }
    ],
    recentTransactions: generateRecentTransactions(),
    historicalUsage: generateHistoricalData()
  };
}

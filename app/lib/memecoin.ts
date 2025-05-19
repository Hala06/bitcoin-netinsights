/**
 * API service for tracking BRC-20 tokens and memecoin activity on Bitcoin
 */

export interface TokenInfo {
  ticker: string;
  name: string;
  priceInBTC: number;
  marketCapInBTC: number;
  holders: number;
  totalSupply: number;
  deploymentBlock: number;
  volume24h: number;
  changePercent24h: number;
}

interface TokenVolume {
  token: string;
  volume24h: number; // USD
  volumeChange: number; // percentage
  holders: number;
  price: number; // USD
  priceChange: number; // percentage
  marketCap: number; // USD
}

export interface MemeTokenEvent {
  token: string;
  ticker: string;
  priceInBTC: number;
  changePercent24h: number;
  volume24h: number;
  type: 'mint' | 'transfer' | 'list' | 'sale';
  amount: number;
  price?: number; // USD if applicable
  timestamp: string;
  txid: string;
}

interface MemecoinsStats {
  totalTokens: number;
  newTokens24h: number;
  totalVolume24h: number; // USD
  volumeChange24h: number; // percentage
  topTokens: TokenVolume[];
  recentActivity: MemeTokenEvent[];
  volumeHistory: {
    date: string;
    volume: number; // USD
  }[];
}

/**
 * Get current memecoin and BRC-20 token statistics
 */
export async function getMemecoinsActivity(): Promise<{
  totalTokens: number;
  uniqueHolders: number;
  dailyTransactions: number;
  top10Tokens: TokenInfo[];
}> {
  const tokens = ['ORDI', 'SATS', 'MEME', 'PEPE', 'WOJAK', 'DOGE', 'BITCOIN', 'SHIB', 'MOON', 'PUMP'];
  const result = [];

  for (let i = 0; i < 10; i++) {
    const ticker = tokens[i];
    const token: TokenInfo = {
      ticker,
      name: `${ticker} Token`,
      priceInBTC: parseFloat((Math.random() * 0.01).toFixed(8)),
      marketCapInBTC: parseFloat((Math.random() * 1000).toFixed(2)),
      holders: Math.floor(Math.random() * 50000) + 1000,
      totalSupply: Math.floor(Math.random() * 1000000000) + 1000000,
      deploymentBlock: 800000 + Math.floor(Math.random() * 50000),
      volume24h: parseFloat((Math.random() * 1000).toFixed(2)),
      changePercent24h: parseFloat((Math.random() * 20 - 10).toFixed(2))
    };
    result.push(token);
  }

  return {
    totalTokens: Math.floor(Math.random() * 500) + 1000,
    uniqueHolders: Math.floor(Math.random() * 100000) + 50000,
    dailyTransactions: Math.floor(Math.random() * 50000) + 10000,
    top10Tokens: result
  };
}

export async function getTokenCreationHistory(): Promise<{ date: string; tokensCreated: number }[]> {
  // Mock implementation for token creation history
  const generateCreationHistory = (days = 30) => {
    const result = [];
    const now = new Date();

    for (let i = days; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      result.push({
        date: date.toISOString().split('T')[0],
        tokensCreated: Math.floor(Math.random() * 20) + 1,
      });
    }

    return result;
  };

  return generateCreationHistory();
}

/**
 * Get current memecoin and BRC-20 token statistics
 */
export async function getMemecoinStats(): Promise<MemecoinsStats> {
  // In a real app, this would fetch from an API
  // For now, generating realistic mock data
  
  // Generate random transaction ID
  const generateTxId = () => {
    return Array.from({ length: 64 }, () => 
      '0123456789abcdef'[Math.floor(Math.random() * 16)]
    ).join('');
  };
  
  // Generate volume history
  const generateVolumeHistory = (days = 30) => {
    const result = [];
    const now = new Date();
    let volume = Math.random() * 5000000 + 1000000; // Initial volume
    
    for (let i = days; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      // Add some variability
      volume = volume * (0.9 + Math.random() * 0.2);
      
      result.push({
        date: date.toISOString().split('T')[0],
        volume: Math.floor(volume)
      });
    }
    
    return result;
  };
  
  // Generate recent activity
  const generateRecentActivity = (count = 15) => {
    const tokens = ['ORDI', 'SATS', 'MEME', 'PEPE', 'WOJAK', 'DOGE', 'BITCOIN', 'SHIB', 'MOON', 'PUMP'];
    const types: ('mint' | 'transfer' | 'list' | 'sale')[] = ['mint', 'transfer', 'list', 'sale'];
    const result = [];
    const now = Date.now();
    
    for (let i = 0; i < count; i++) {
      const minutesAgo = Math.floor(Math.random() * 60);
      const timestamp = new Date(now - minutesAgo * 60000).toISOString();
      const token = tokens[Math.floor(Math.random() * tokens.length)];
      const ticker = token.substring(0, 3).toUpperCase();
      const priceInBTC = parseFloat((Math.random() * 0.01).toFixed(8));
      const changePercent24h = parseFloat((Math.random() * 20 - 10).toFixed(2));
      const volume24h = parseFloat((Math.random() * 1000).toFixed(2));
      const type = types[Math.floor(Math.random() * types.length)];
      const amount = Math.floor(Math.random() * 100000) + 1000;
      let price;

      if (type === 'list' || type === 'sale') {
        price = parseFloat((Math.random() * 1000 + 10).toFixed(2));
      }

      result.push({
        token,
        ticker,
        priceInBTC,
        changePercent24h,
        volume24h,
        type,
        amount,
        price,
        timestamp,
        txid: generateTxId(),
      });
    }
    
    return result;
  };
  
  // Top tokens
  const topTokens: TokenVolume[] = [
    {
      token: 'ORDI',
      volume24h: 12500000,
      volumeChange: 5.3,
      holders: 35000,
      price: 425.15,
      priceChange: 3.2,
      marketCap: 425150000
    },
    {
      token: 'SATS',
      volume24h: 8750000,
      volumeChange: -2.1,
      holders: 28000,
      price: 0.00052,
      priceChange: -1.5,
      marketCap: 109200000
    },
    {
      token: 'MEME',
      volume24h: 6300000,
      volumeChange: 12.7,
      holders: 19500,
      price: 0.075,
      priceChange: 8.3,
      marketCap: 75000000
    },
    {
      token: 'PEPE',
      volume24h: 4250000,
      volumeChange: 1.6,
      holders: 17200,
      price: 0.042,
      priceChange: 0.8,
      marketCap: 42000000
    },
    {
      token: 'WOJAK',
      volume24h: 2100000,
      volumeChange: -8.2,
      holders: 9800,
      price: 0.0032,
      priceChange: -10.5,
      marketCap: 9600000
    }
  ];
  
  // Calculate total volume
  const totalVolume24h = topTokens.reduce((sum, token) => sum + token.volume24h, 0);
  
  return {
    totalTokens: Math.floor(Math.random() * 500) + 1000, // 1000-1500
    newTokens24h: Math.floor(Math.random() * 20) + 5, // 5-25
    totalVolume24h,
    volumeChange24h: parseFloat((Math.random() * 20 - 10).toFixed(1)), // -10% to +10%
    topTokens,
    recentActivity: generateRecentActivity(),
    volumeHistory: generateVolumeHistory()
  };
}

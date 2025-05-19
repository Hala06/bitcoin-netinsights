'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Bitcoin, Coins, TrendingUp, Zap } from 'lucide-react'

const memecoinTypes = [
  { name: 'Runes', icon: <Bitcoin className="w-5 h-5" />, activity: 45 },
  { name: 'Ordinals', icon: <Coins className="w-5 h-5" />, activity: 38 },
  { name: 'BRC-20', icon: <TrendingUp className="w-5 h-5" />, activity: 32 },
  { name: 'Others', icon: <Zap className="w-5 h-5" />, activity: 15 }
]

export default function MemecoinTracker({ compact = false }: { compact?: boolean }) {
  const [memecoinData, setMemecoinData] = useState({
    totalTransactions: 124578,
    newTokens: 245,
    volume: 124.5, // BTC
    activityChange: 12.4 // %
  })

  // Simulate data fetch
  useEffect(() => {
    const interval = setInterval(() => {
      setMemecoinData(prev => ({
        totalTransactions: prev.totalTransactions + Math.floor(Math.random() * 1000),
        newTokens: prev.newTokens + Math.floor(Math.random() * 10),
        volume: prev.volume + (Math.random() * 5 - 2.5),
        activityChange: prev.activityChange + (Math.random() * 2 - 1)
      }))
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      {compact ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bitcoin className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium">Memecoin Activity</span>
            </div>
            <span className="text-sm font-medium">
              {memecoinData.activityChange > 0 ? '+' : ''}{memecoinData.activityChange.toFixed(1)}%
            </span>
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            {memecoinTypes.map((type, index) => (
              <motion.div
                key={type.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="w-8 h-8 flex items-center justify-center bg-yellow-500/10 rounded-full text-yellow-500">
                  {type.icon}
                </div>
                <span className="text-xs mt-1">{type.name}</span>
              </motion.div>
            ))}
          </div>
          
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {memecoinData.totalTransactions.toLocaleString()} total transactions
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Total Transactions</h3>
              <div className="flex items-end gap-1">
                <span className="text-2xl font-bold">{memecoinData.totalTransactions.toLocaleString()}</span>
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Across all memecoin types
              </p>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">New Tokens</h3>
              <div className="flex items-end gap-1">
                <span className="text-2xl font-bold">+{memecoinData.newTokens}</span>
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Created in last 24 hours
              </p>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Trading Volume</h3>
              <div className="flex items-end gap-1">
                <span className="text-2xl font-bold">{memecoinData.volume.toFixed(1)}</span>
                <span className="text-gray-500 dark:text-gray-400 mb-1">BTC</span>
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Last 24 hours
              </p>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Activity Change</h3>
              <div className="flex items-end gap-1">
                <span className={`text-2xl font-bold ${
                  memecoinData.activityChange > 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {memecoinData.activityChange > 0 ? '+' : ''}{memecoinData.activityChange.toFixed(1)}%
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                From yesterday
              </p>
            </div>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Distribution by Type</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {memecoinTypes.map((type) => (
                <div key={type.name} className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 flex items-center justify-center bg-yellow-500/10 rounded-full text-yellow-500">
                      {type.icon}
                    </div>
                    <span className="font-medium">{type.name}</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-yellow-500" 
                      style={{ width: `${type.activity}%` }}
                    />
                  </div>
                  <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {type.activity}% of total activity
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Last 24 Hours Activity</h3>
            <div className="h-64">
              {/* Placeholder for chart - implement with your preferred charting library */}
              <div className="w-full h-full bg-gray-200 dark:bg-gray-600 rounded flex items-center justify-center text-gray-500 dark:text-gray-400">
                Memecoin activity history chart
              </div>
            </div>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Top Performing Memecoins</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-600">
                    <th className="pb-2">Name</th>
                    <th className="pb-2">Type</th>
                    <th className="pb-2 text-right">Transactions</th>
                    <th className="pb-2 text-right">Volume (BTC)</th>
                    <th className="pb-2 text-right">Change (24h)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'DOG•GO•TO•THE•MOON', type: 'Runes', transactions: 12457, volume: 24.5, change: 12.4 },
                    { name: 'PUPS', type: 'Ordinals', transactions: 9872, volume: 18.7, change: 8.2 },
                    { name: 'ORDI', type: 'BRC-20', transactions: 8765, volume: 15.2, change: -3.1 },
                    { name: 'RSIC', type: 'Runes', transactions: 7654, volume: 12.8, change: 5.7 },
                    { name: 'MEME', type: 'BRC-20', transactions: 6543, volume: 10.1, change: -1.2 }
                  ].map((coin, index) => (
                    <tr key={coin.name} className="border-b border-gray-200 dark:border-gray-600">
                      <td className="py-3 font-medium">{coin.name}</td>
                      <td className="py-3 text-sm text-gray-500 dark:text-gray-400">{coin.type}</td>
                      <td className="py-3 text-right">{coin.transactions.toLocaleString()}</td>
                      <td className="py-3 text-right">{coin.volume.toFixed(1)}</td>
                      <td className={`py-3 text-right ${
                        coin.change > 0 ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {coin.change > 0 ? '+' : ''}{coin.change}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
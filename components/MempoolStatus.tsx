'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Gauge, AreaChart } from 'lucide-react'

export default function MempoolStatus({ compact = false }: { compact?: boolean }) {
  const [mempoolData, setMempoolData] = useState({
    status: 'medium', // 'low', 'medium', 'high'
    currentSize: 45, // MB
    feeRates: {
      high: 45, // sat/vB
      medium: 15,
      low: 5
    },
    history: Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      size: Math.floor(Math.random() * 30) + 20
    }))
  })

  // Simulate data fetch
  useEffect(() => {
    const interval = setInterval(() => {
      setMempoolData(prev => ({
        ...prev,
        currentSize: Math.floor(Math.random() * 30) + 20,
        feeRates: {
          high: Math.floor(Math.random() * 30) + 30,
          medium: Math.floor(Math.random() * 20) + 10,
          low: Math.floor(Math.random() * 10) + 1
        }
      }))
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  const statusColor = {
    low: 'bg-green-500',
    medium: 'bg-yellow-500',
    high: 'bg-red-500'
  }

  return (
    <div>
      {compact ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${statusColor[mempoolData.status as keyof typeof statusColor]}`}></div>
              <span className="text-sm font-medium capitalize">{mempoolData.status} congestion</span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">{mempoolData.currentSize} MB</span>
          </div>
          
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400">Low fee</p>
              <p className="font-medium">{mempoolData.feeRates.low} sat/vB</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400">Medium fee</p>
              <p className="font-medium">{mempoolData.feeRates.medium} sat/vB</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400">High fee</p>
              <p className="font-medium">{mempoolData.feeRates.high} sat/vB</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Current Status</h3>
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full ${statusColor[mempoolData.status as keyof typeof statusColor]}`}></div>
                <span className="text-lg font-medium capitalize">{mempoolData.status} congestion</span>
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {mempoolData.status === 'low' 
                  ? 'Ideal time for transactions' 
                  : mempoolData.status === 'medium' 
                    ? 'Moderate wait times expected' 
                    : 'High fees and long wait times'}
              </p>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Mempool Size</h3>
              <div className="flex items-end gap-1">
                <span className="text-2xl font-bold">{mempoolData.currentSize}</span>
                <span className="text-gray-500 dark:text-gray-400 mb-1">MB</span>
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Unconfirmed transactions waiting in queue
              </p>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Recommended Fee</h3>
              <div className="flex items-end gap-1">
                <span className="text-2xl font-bold">
                  {mempoolData.status === 'low' 
                    ? mempoolData.feeRates.low 
                    : mempoolData.status === 'medium' 
                      ? mempoolData.feeRates.medium 
                      : mempoolData.feeRates.high}
                </span>
                <span className="text-gray-500 dark:text-gray-400 mb-1">sat/vB</span>
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                For {mempoolData.status === 'low' ? 'next block' : mempoolData.status === 'medium' ? '1-3 blocks' : '3-6 blocks'}
              </p>
            </div>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4 flex items-center gap-2">
              <AreaChart className="w-4 h-4" />
              Last 24 Hours
            </h3>
            <div className="h-64">
              {/* Placeholder for chart - implement with your preferred charting library */}
              <div className="w-full h-full bg-gray-200 dark:bg-gray-600 rounded flex items-center justify-center text-gray-500 dark:text-gray-400">
                Mempool size history chart
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Low Priority</h3>
              <div className="flex items-end gap-1">
                <span className="text-2xl font-bold">{mempoolData.feeRates.low}</span>
                <span className="text-gray-500 dark:text-gray-400 mb-1">sat/vB</span>
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                For transactions with no time pressure
              </p>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Medium Priority</h3>
              <div className="flex items-end gap-1">
                <span className="text-2xl font-bold">{mempoolData.feeRates.medium}</span>
                <span className="text-gray-500 dark:text-gray-400 mb-1">sat/vB</span>
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                For typical transaction speeds
              </p>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">High Priority</h3>
              <div className="flex items-end gap-1">
                <span className="text-2xl font-bold">{mempoolData.feeRates.high}</span>
                <span className="text-gray-500 dark:text-gray-400 mb-1">sat/vB</span>
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                For urgent transactions
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Database, FileText, Image, Code } from 'lucide-react'

export default function OpReturnTracker({ compact = false }: { compact?: boolean }) {
  const [opReturnData, setOpReturnData] = useState({
    blockPercentage: 12.5,
    transactions: 1245,
    types: {
      text: 45,
      images: 32,
      json: 15,
      other: 8
    },
    history: Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      percentage: Math.floor(Math.random() * 10) + 5
    }))
  })

  // Simulate data fetch
  useEffect(() => {
    const interval = setInterval(() => {
      setOpReturnData(prev => ({
        ...prev,
        blockPercentage: Math.floor(Math.random() * 10) + 5,
        transactions: Math.floor(Math.random() * 500) + 1000,
        types: {
          text: Math.floor(Math.random() * 20) + 30,
          images: Math.floor(Math.random() * 15) + 20,
          json: Math.floor(Math.random() * 10) + 10,
          other: Math.floor(Math.random() * 5) + 5
        }
      }))
    }, 15000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      {compact ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium">OP_Return Usage</span>
            </div>
            <span className="text-sm font-medium">{opReturnData.blockPercentage}%</span>
          </div>
          
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${opReturnData.blockPercentage}%` }}
              transition={{ duration: 1 }}
            />
          </div>
          
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {opReturnData.transactions.toLocaleString()} transactions using OP_Return
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Current Block Usage</h3>
              <div className="flex items-end gap-1">
                <span className="text-2xl font-bold">{opReturnData.blockPercentage}</span>
                <span className="text-gray-500 dark:text-gray-400 mb-1">%</span>
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Of block space used by OP_Return data
              </p>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Transactions</h3>
              <div className="flex items-end gap-1">
                <span className="text-2xl font-bold">{opReturnData.transactions.toLocaleString()}</span>
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Using OP_Return in last 24 hours
              </p>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Trend</h3>
              <div className="flex items-end gap-1">
                <span className="text-2xl font-bold text-green-500">+2.4%</span>
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                From yesterday's average
              </p>
            </div>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Data Types Distribution</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col items-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                <FileText className="w-6 h-6 text-blue-500 mb-2" />
                <span className="font-medium">{opReturnData.types.text}%</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Text</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                <Image className="w-6 h-6 text-purple-500 mb-2" />
                <span className="font-medium">{opReturnData.types.images}%</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Images</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                <Code className="w-6 h-6 text-green-500 mb-2" />
                <span className="font-medium">{opReturnData.types.json}%</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">JSON</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                <Database className="w-6 h-6 text-yellow-500 mb-2" />
                <span className="font-medium">{opReturnData.types.other}%</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Other</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Last 24 Hours</h3>
            <div className="h-64">
              {/* Placeholder for chart - implement with your preferred charting library */}
              <div className="w-full h-full bg-gray-200 dark:bg-gray-600 rounded flex items-center justify-center text-gray-500 dark:text-gray-400">
                OP_Return usage history chart
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}  
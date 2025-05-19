'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Cpu, Activity, Users, ArrowUpRight } from 'lucide-react'

const drivechains = [
  {
    name: 'Thunder',
    description: 'Smart contracts for Bitcoin',
    activity: 78,
    users: 12450,
    transactions: 45231
  },
  {
    name: 'BitNames',
    description: 'Decentralized naming system',
    activity: 65,
    users: 8720,
    transactions: 32145
  },
  {
    name: 'zSide',
    description: 'Privacy-focused sidechain',
    activity: 42,
    users: 5430,
    transactions: 18765
  }
]

export default function DrivechainActivity({ compact = false }: { compact?: boolean }) {
  const [activeDrivechain, setActiveDrivechain] = useState(0)

  // Rotate active drivechain
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDrivechain(prev => (prev + 1) % drivechains.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      {compact ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">Drivechain Activity</span>
            </div>
            <span className="text-sm font-medium">{drivechains[activeDrivechain].activity}%</span>
          </div>
          
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-green-500"
              initial={{ width: 0 }}
              animate={{ width: `${drivechains[activeDrivechain].activity}%` }}
              transition={{ duration: 1 }}
            />
          </div>
          
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {drivechains[activeDrivechain].name}: {drivechains[activeDrivechain].description}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">LayerTwo Labs Drivechains</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {drivechains.map((chain, index) => (
              <motion.div
                key={chain.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-gray-100 dark:bg-gray-700 p-4 rounded-lg border-2 ${
                  index === activeDrivechain ? 'border-green-500' : 'border-transparent'
                }`}
                onMouseEnter={() => setActiveDrivechain(index)}
              >
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-medium">{chain.name}</h4>
                  <div className="flex items-center gap-1 text-sm">
                    <span className="font-medium">{chain.activity}%</span>
                    <Activity className="w-4 h-4 text-green-500" />
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{chain.description}</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-white dark:bg-gray-800 p-2 rounded">
                    <Users className="w-4 h-4 text-blue-500 inline mr-1" />
                    <span>{chain.users.toLocaleString()}</span>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-2 rounded">
                    <ArrowUpRight className="w-4 h-4 text-purple-500 inline mr-1" />
                    <span>{chain.transactions.toLocaleString()}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
              {drivechains[activeDrivechain].name} Activity
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Activity Level</h4>
                <div className="flex items-end gap-1">
                  <span className="text-2xl font-bold">{drivechains[activeDrivechain].activity}</span>
                  <span className="text-gray-500 dark:text-gray-400 mb-1">%</span>
                </div>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Compared to peak usage
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Active Users</h4>
                <div className="flex items-end gap-1">
                  <span className="text-2xl font-bold">{drivechains[activeDrivechain].users.toLocaleString()}</span>
                </div>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Unique addresses in last 30 days
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Transactions</h4>
                <div className="flex items-end gap-1">
                  <span className="text-2xl font-bold">{drivechains[activeDrivechain].transactions.toLocaleString()}</span>
                </div>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  In last 30 days
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Comparison with Base Chain</h3>
            <div className="h-64">
              {/* Placeholder for chart - implement with your preferred charting library */}
              <div className="w-full h-full bg-gray-200 dark:bg-gray-600 rounded flex items-center justify-center text-gray-500 dark:text-gray-400">
                Drivechain vs Bitcoin activity chart
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
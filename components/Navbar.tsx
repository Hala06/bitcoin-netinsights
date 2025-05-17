'use client'

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-[#0A0A0A]/80 dark:bg-white/90 backdrop-blur border-b border-[#222] dark:border-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-[#B3261E] dark:text-[#002B5B]">
          Bitcoin NetInsights
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-sm hover:underline text-white dark:text-black">
            Dashboard
          </Link>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full hover:bg-gray-700 dark:hover:bg-gray-200 transition"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </nav>
  )
}

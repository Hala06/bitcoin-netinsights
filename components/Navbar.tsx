'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'About', path: '/onboarding' },
  ];
  
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    // Dispatch custom event for ThemeProviderWrapper to catch
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: newTheme } }));
  };
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/10 dark:bg-black/10 backdrop-blur-lg border-b border-gray-200/10 dark:border-gray-800/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link 
            href="/"
            className="flex items-center space-x-2"
          >
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center"
            >
              <span className="text-white font-bold text-sm">₿</span>
            </motion.div>
            <span className="font-bold text-xl text-gray-900 dark:text-white">NetInsights</span>
          </Link>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex items-center space-x-6">
              {navItems.map((item) => (
                <Link 
                  key={item.name}
                  href={item.path}
                  className={`text-sm font-medium transition-colors hover:text-[#B3261E] ${
                    pathname === item.path 
                      ? 'text-[#B3261E]' 
                      : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
              aria-label="Toggle theme"
            >
              {mounted && (theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />)}
            </motion.button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 mr-2"
              aria-label="Toggle theme"
            >
              {mounted && (theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />)}
            </motion.button>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={mobileMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        className="md:hidden overflow-hidden"
      >
        <div className="container mx-auto px-4 pb-4">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                href={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-medium py-2 transition-colors hover:text-[#B3261E] ${
                  pathname === item.path 
                    ? 'text-[#B3261E]' 
                    : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </motion.div>
    </header>
  );
}

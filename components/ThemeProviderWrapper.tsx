'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';

interface ThemeContextType {
  isChangingTheme: boolean;
}

const ThemeContext = createContext<ThemeContextType>({ isChangingTheme: false });

export const useThemeTransition = () => useContext(ThemeContext);

export function ThemeProviderWrapper({ children }: { children: React.ReactNode }) {
  const [isChangingTheme, setIsChangingTheme] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Listen for theme change events
  useEffect(() => {
    const handleThemeChange = () => {
      setIsChangingTheme(true);
      setTimeout(() => setIsChangingTheme(false), 500);
    };

    window.addEventListener('themechange', handleThemeChange);
    setMounted(true);
    
    return () => {
      window.removeEventListener('themechange', handleThemeChange);
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ isChangingTheme }}>
      <ThemeProvider 
        attribute="class" 
        defaultTheme="dark" 
        enableSystem
      >
        {mounted && (
          <AnimatePresence>
            {isChangingTheme && (
              <motion.div
                className="fixed inset-0 bg-black z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </AnimatePresence>
        )}
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

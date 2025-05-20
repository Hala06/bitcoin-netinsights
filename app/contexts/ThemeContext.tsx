'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';

type Theme = 'light' | 'dark';
type ColorScheme = 'default' | 'drivechain' | 'mempool' | 'opreturn' | 'memecoin' | 'model';

interface ThemeContextType {
  mode: Theme;
  toggleMode: () => void;
  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme) => void;
  isChangingTheme: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: 'dark',
  toggleMode: () => {},
  colorScheme: 'default',
  setColorScheme: () => {},
  isChangingTheme: false,
});

export const useTheme = () => useContext(ThemeContext);

interface CustomThemeProviderProps {
  children: React.ReactNode;
}

export function CustomThemeProvider({ children }: CustomThemeProviderProps) {
  const [mode, setMode] = useState<Theme>('dark');
  const [colorScheme, setColorScheme] = useState<ColorScheme>('default');
  const [mounted, setMounted] = useState(false);
  const [isChangingTheme, setIsChangingTheme] = useState(false);

  // Initialize theme based on system preference
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setMode(prefersDark ? 'dark' : 'light');
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const root = document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(mode);

      // Apply color scheme
      root.style.setProperty('--theme-color', getThemeColor(colorScheme));
    }
  }, [mode, colorScheme, mounted]);

  // Listen for theme change events
  useEffect(() => {
    const handleThemeChange = () => {
      setIsChangingTheme(true);
      setTimeout(() => setIsChangingTheme(false), 500);
    };

    window.addEventListener('themechange', handleThemeChange);
    
    return () => {
      window.removeEventListener('themechange', handleThemeChange);
    };
  }, []);

  const toggleMode = () => {
    setMode(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const getThemeColor = (scheme: ColorScheme): string => {
    const colors = {
      default: mode === 'dark' ? '#f7931a' : '#B3261E',
      drivechain: mode === 'dark' ? '#6366f1' : '#2A4E76',
      mempool: mode === 'dark' ? '#22c55e' : '#166534',
      opreturn: mode === 'dark' ? '#f43f5e' : '#BE123C',
      memecoin: mode === 'dark' ? '#d946ef' : '#A21CAF',
      model: mode === 'dark' ? '#3b82f6' : '#1D4ED8'
    };
    return colors[scheme];
  };

  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider 
      value={{ 
        mode, 
        toggleMode, 
        colorScheme,
        setColorScheme,
        isChangingTheme,
      }}
    >
      <NextThemesProvider 
        attribute="class" 
        defaultTheme="dark" 
        enableSystem
      >
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
        {children}
      </NextThemesProvider>
    </ThemeContext.Provider>
  );
}

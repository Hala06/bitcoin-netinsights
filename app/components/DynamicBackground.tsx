'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DynamicBackgroundProps {
  activeFeature: string;
  colorMap: {
    [key: string]: {
      from: string;
      to: string;
    };
  };
}

export default function DynamicBackground({ 
  activeFeature,
  colorMap
}: DynamicBackgroundProps) {
  const [prevFeature, setPrevFeature] = useState(activeFeature);

  useEffect(() => {
    if (prevFeature !== activeFeature) {
      setPrevFeature(activeFeature);
    }
  }, [activeFeature, prevFeature]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={activeFeature}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            background: `radial-gradient(ellipse at top right, ${colorMap[activeFeature]?.from || '#121212'}, ${colorMap[activeFeature]?.to || '#000000'})`,
          }}
        />
      </AnimatePresence>
      
      {/* Overlay noise texture */}
      <div 
        className="absolute inset-0 z-10 opacity-30 pointer-events-none"
        style={{
          backgroundImage: 'url("/noise.png")',
          backgroundBlendMode: 'overlay',
          mixBlendMode: 'overlay',
        }}
      />
    </div>
  );
}

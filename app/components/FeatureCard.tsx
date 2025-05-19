'use client';

import { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X } from 'lucide-react';
import Image from 'next/image';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  color: string;
  bgImage?: string;
  content: ReactNode;
  index: number;
  onExpand: (expanded: boolean, title: string) => void;
}

export default function FeatureCard({
  title,
  description,
  icon,
  color,
  bgImage,
  content,
  index,
  onExpand
}: FeatureCardProps) {
  const [expanded, setExpanded] = useState(false);
  
  // Toggle card expansion
  const toggleExpand = () => {
    const newExpandedState = !expanded;
    setExpanded(newExpandedState);
    onExpand(newExpandedState, title);
  };
  
  // Calculate animation delay based on card index
  const getAnimationDelay = () => {
    return index * 0.1;
  };
  
  return (
    <AnimatePresence mode="wait">
      {!expanded ? (
        <motion.div
          layoutId={`feature-card-${title}`}
          className="group relative h-full bg-[#0D1B2A]/80 backdrop-blur-md rounded-xl border border-gray-800 overflow-hidden shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: { 
              delay: getAnimationDelay(),
              duration: 0.5 
            } 
          }}
          exit={{ 
            opacity: 0,
            scale: 0.9,
            transition: { duration: 0.2 } 
          }}
          onClick={toggleExpand}
          whileHover={{ translateY: -5 }}
          transition={{ duration: 0.3 }}
        >
          {/* Background image with overlay */}
          {bgImage && (
            <div className="absolute inset-0 z-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A] via-[#0D1B2A]/80 to-transparent z-10" />
              <motion.div
                className="w-full h-full"
                initial={{ scale: 1.1 }}
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 10 }}
              >
                <Image
                  src={bgImage}
                  alt={title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="opacity-30"
                />
              </motion.div>
            </div>
          )}
          
          {/* Card content */}
          <div className="p-6 z-10 relative h-full flex flex-col">
            <div className="mb-4 p-3 bg-black/30 rounded-full w-12 h-12 flex items-center justify-center" style={{ color }}>
              {icon}
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-gray-300 flex-grow">{description}</p>
            
            <div className="mt-6 flex items-center text-sm">
              <motion.div
                initial={{ x: -5, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center"
                style={{ color }}
              >
                Explore
                <ChevronDown className="ml-1 w-4 h-4 transform -rotate-90" />
              </motion.div>
            </div>
            
            {/* Hover effect */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
              style={{ background: color, originX: 0 }}
            />
          </div>
        </motion.div>
      ) : (
        <motion.div
          layoutId={`feature-card-${title}`}
          className="bg-[#0D1B2A]/90 backdrop-blur-lg rounded-xl border border-gray-800 overflow-hidden shadow-2xl relative"
          initial={{ opacity: 0.9, scale: 0.95 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            transition: { type: "spring", damping: 30 }
          }}
          exit={{ 
            opacity: 0, 
            scale: 0.9,
            transition: { duration: 0.3 } 
          }}
        >
          {/* Close button */}
          <button
            onClick={toggleExpand}
            className="absolute top-4 right-4 z-30 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full transition-all duration-200"
          >
            <X size={18} />
          </button>
          
          <motion.div
            className="p-8"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              transition: { delay: 0.1, duration: 0.5 }
            }}
          >
            {/* Card header */}
            <div className="flex items-center mb-6">
              <div className="p-3 bg-black/30 rounded-full w-12 h-12 flex items-center justify-center mr-4" style={{ color }}>
                {icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{title}</h3>
                <p className="text-gray-400">{description}</p>
              </div>
            </div>
            
            {/* Extended content */}
            <div>{content}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

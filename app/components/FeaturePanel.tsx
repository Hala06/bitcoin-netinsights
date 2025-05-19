// app/components/FeaturePanel.tsx
"use client";

import React, { useState, useEffect, useRef } from 'react';

interface FeatureContent {
  title: string;
  description: string;
  accent: string;
}

const featureDetails: Record<string, FeatureContent> = {
  mempool: {
    title: "Mempool Analytics",
    description: "Real-time blockchain transaction analysis with advanced visualization tools.",
    accent: "var(--accent-mempool)",
  },
  opreturn: {
    title: "OP_Return Tracking",
    description: "Monitor and analyze OP_Return data with powerful flame animations.",
    accent: "var(--accent-opreturn)",
  },
  drivechain: {
    title: "Drivechain Activity",
    description: "Track sidechain operations with dynamic tech visualizations.",
    accent: "var(--accent-drivechain)",
  }
};

const FeaturePanel = () => {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleFeatureClick = (feature: string) => {
    if (activeFeature === feature) return;
    
    setIsAnimating(true);
    document.body.className = `theme-${feature}`;
    
    // Create multiple ripples for a more dramatic effect
    const button = document.querySelector(`[data-feature="${feature}"]`);
    if (button) {
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          const ripple = document.createElement('div');
          ripple.className = 'ripple';
          ripple.style.animationDelay = `${i * 100}ms`;
          button.appendChild(ripple);
          setTimeout(() => ripple.remove(), 1000);
        }, i * 100);
      }
    }

    setTimeout(() => {
      setActiveFeature(feature);
      setIsAnimating(false);
    }, 300);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      },
      { threshold: 0.1 }
    );

    if (panelRef.current) {
      observer.observe(panelRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={panelRef} className="feature-panel scroll-section glass">
      <h2 className="text-4xl font-bold mb-12 animate-float bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
        Explore Features
      </h2>
      <div className="features grid grid-cols-1 md:grid-cols-3 gap-8 perspective-1000">
        {Object.entries(featureDetails).map(([key, content]) => (
          <button
            key={key}
            data-feature={key}
            className={`feature-button relative transform transition-all duration-300 ${
              activeFeature === key ? 'active scale-110' : 'hover:scale-105'
            }`}
            onClick={() => handleFeatureClick(key)}
            style={{
              '--button-color': content.accent
            } as React.CSSProperties}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
            <span className="relative z-10 text-lg font-bold">{content.title}</span>
          </button>
        ))}
      </div>
      <div 
        className={`feature-content mt-16 transform transition-all duration-500 ${
          !isAnimating && activeFeature 
            ? 'visible scale-100 opacity-100' 
            : 'scale-95 opacity-0'
        }`}
      >
        {activeFeature && (
          <div className="glass-card p-8 rounded-2xl backdrop-blur-xl animate-float">
            <div className="flex flex-col items-center space-y-6">
              <h3 
                className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r" 
                style={{ 
                  backgroundImage: `linear-gradient(to right, ${featureDetails[activeFeature].accent}, white)` 
                }}
              >
                {featureDetails[activeFeature].title}
              </h3>
              <p className="text-xl text-gray-200 leading-relaxed max-w-2xl text-center">
                {featureDetails[activeFeature].description}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturePanel;

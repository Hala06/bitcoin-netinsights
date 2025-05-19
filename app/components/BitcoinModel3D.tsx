'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/app/contexts/ThemeContext';

interface BitcoinModel3DProps {
  className?: string;
}

const BitcoinModel3D: React.FC<BitcoinModel3DProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { mode } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size based on container
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation parameters
    let angle = 0;
    const points: Array<{ x: number; y: number; z: number; size: number }> = [];
    const numPoints = 100;

    // Generate initial points in a Bitcoin logo shape
    for (let i = 0; i < numPoints; i++) {
      const t = (i / numPoints) * Math.PI * 2;
      const radius = 100 + Math.cos(t * 8) * 20;
      points.push({
        x: Math.cos(t) * radius,
        y: Math.sin(t) * radius,
        z: Math.sin(t * 4) * 20,
        size: 2 + Math.random() * 2
      });
    }

    // Animation function
    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Set colors based on theme
      const glowColor = mode === 'dark' ? 'rgba(255, 147, 26, 0.2)' : 'rgba(255, 147, 26, 0.1)';
      const pointColor = mode === 'dark' ? '#f7931a' : '#f7931a';

      // Draw background glow
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        200
      );
      gradient.addColorStop(0, glowColor);
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Sort points by z-index for pseudo-3D effect
      const sortedPoints = [...points].sort((a, b) => b.z - a.z);

      // Draw points with connections
      ctx.strokeStyle = pointColor;
      ctx.lineWidth = 0.5;
      
      sortedPoints.forEach((point, i) => {
        // Rotate points
        const rotatedX = point.x * Math.cos(angle) - point.z * Math.sin(angle);
        const rotatedZ = point.x * Math.sin(angle) + point.z * Math.cos(angle);
        
        // Project 3D to 2D
        const scale = 1000 / (1000 + rotatedZ);
        const x2d = canvas.width / 2 + rotatedX * scale;
        const y2d = canvas.height / 2 + point.y * scale;

        // Draw connections
        sortedPoints.slice(i + 1).forEach(otherPoint => {
          const otherRotatedX = otherPoint.x * Math.cos(angle) - otherPoint.z * Math.sin(angle);
          const otherRotatedZ = otherPoint.x * Math.sin(angle) + otherPoint.z * Math.cos(angle);
          const otherScale = 1000 / (1000 + otherRotatedZ);
          const otherX2d = canvas.width / 2 + otherRotatedX * otherScale;
          const otherY2d = canvas.height / 2 + otherPoint.y * otherScale;

          const dist = Math.hypot(x2d - otherX2d, y2d - otherY2d);
          if (dist < 100) {
            ctx.globalAlpha = (100 - dist) / 100 * 0.2;
            ctx.beginPath();
            ctx.moveTo(x2d, y2d);
            ctx.lineTo(otherX2d, otherY2d);
            ctx.stroke();
          }
        });

        // Draw points
        ctx.globalAlpha = 1;
        ctx.fillStyle = pointColor;
        ctx.beginPath();
        ctx.arc(x2d, y2d, point.size * scale, 0, Math.PI * 2);
        ctx.fill();
      });

      angle += 0.005;
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [mode]);

  return (
    <motion.div 
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
    </motion.div>
  );
};

export default BitcoinModel3D;

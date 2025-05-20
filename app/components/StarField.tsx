'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface StarFieldProps {
  starsCount?: number;
  speed?: number;
  backgroundColor?: string;
  starColor?: string;
  starSize?: number;
}

const StarField: React.FC<StarFieldProps> = ({
  starsCount = 200,
  speed = 0.5,
  backgroundColor = 'transparent',
  starColor = '#ffffff',
  starSize = 1.5,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size to window size
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Create stars
    const stars: { x: number; y: number; size: number; brightness: number; velocity: number }[] = [];
    
    for (let i = 0; i < starsCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * starSize + 0.1,
        brightness: Math.random(),
        velocity: Math.random() * speed + 0.1,
      });
    }
    
    // Animation loop
    let animationFrameId: number;
    
    const render = () => {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars
      stars.forEach((star) => {
        const opacity = 0.5 + star.brightness * 0.5;
        ctx.fillStyle = `rgba(${parseInt(starColor.slice(1, 3), 16)}, ${parseInt(starColor.slice(3, 5), 16)}, ${parseInt(starColor.slice(5, 7), 16)}, ${opacity})`;
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Move stars
        star.y += star.velocity;
        
        // Reset stars that go offscreen
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });
      
      animationFrameId = requestAnimationFrame(render);
    };
    
    render();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [backgroundColor, starsCount, speed, starColor, starSize]);
  
  return (
    <motion.canvas 
      ref={canvasRef}
      className="fixed inset-0 z-[-1]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  );
};

export default StarField;
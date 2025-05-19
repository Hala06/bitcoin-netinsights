'use client';

import { useRef, useEffect } from 'react';
import { useTheme } from 'next-themes';

interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  vx: number;
  vy: number;
  opacity: number;
  type: 'dot' | 'star' | 'line';
  length?: number;
  angle?: number;
}

export default function BackgroundAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let particles: Particle[] = [];
    let mouseX = 0;
    let mouseY = 0;
    let isMouseMoving = false;
    let mouseTimeout: NodeJS.Timeout;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    const createParticles = () => {
      particles = [];
      // Increased particle count for more dense visuals
      const particleCount = Math.floor(window.innerWidth / 10); 
      
      for (let i = 0; i < particleCount; i++) {
        const radius = Math.random() * 2 + 0.5;
        const isLargeStar = Math.random() > 0.92; // 8% chance to be a larger star
        const isStar = Math.random() > 0.7; // 30% chance to be a star
        const isLine = Math.random() > 0.92; // 8% chance to be a line

        // Colors based on theme
        const darkModeColor = isLargeStar 
          ? `rgba(${220 + Math.random() * 35}, ${180 + Math.random() * 75}, ${30 + Math.random() * 40}, ${0.7 + Math.random() * 0.3})` 
          : `rgba(${180 + Math.random() * 50}, ${30 + Math.random() * 20}, ${20 + Math.random() * 20}, ${0.3 + Math.random() * 0.3})`;
          
        const lightModeColor = isLargeStar
          ? `rgba(${255 - Math.random() * 30}, ${180 + Math.random() * 75}, ${0 + Math.random() * 50}, ${0.6 + Math.random() * 0.4})` 
          : `rgba(${100 + Math.random() * 55}, ${100 + Math.random() * 55}, ${255 - Math.random() * 30}, ${0.2 + Math.random() * 0.3})`;
        
        if (isLine) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: 0.5,
            color: theme === 'dark' ? 'rgba(179, 38, 30, 0.2)' : 'rgba(0, 102, 204, 0.2)',
            vx: (Math.random() - 0.5) * 0.2,
            vy: (Math.random() - 0.5) * 0.2,
            opacity: 0.1 + Math.random() * 0.2,
            type: 'line',
            length: 50 + Math.random() * 100,
            angle: Math.random() * Math.PI * 2
          });
        } else {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: isLargeStar ? radius * 2 : radius,
            color: theme === 'dark' ? darkModeColor : lightModeColor,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            opacity: 0.1 + Math.random() * 0.4,
            type: isStar ? 'star' : 'dot'
          });
        }
      }
    };
    
    const drawStar = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string) => {
      const spikes = 5;
      const outerRadius = radius;
      const innerRadius = radius / 2;
      
      let rot = Math.PI / 2 * 3;
      let step = Math.PI / spikes;
      
      ctx.beginPath();
      ctx.moveTo(x, y - outerRadius);
      
      for (let i = 0; i < spikes; i++) {
        ctx.lineTo(x + Math.cos(rot) * outerRadius, y + Math.sin(rot) * outerRadius);
        rot += step;
        ctx.lineTo(x + Math.cos(rot) * innerRadius, y + Math.sin(rot) * innerRadius);
        rot += step;
      }
      
      ctx.lineTo(x, y - outerRadius);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();

      // Add glow effect to stars
      ctx.shadowBlur = 15;
      ctx.shadowColor = color;
      ctx.fill();
      ctx.shadowBlur = 0;
    };
    
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        // Draw particle based on type
        if (particle.type === 'star') {
          drawStar(ctx, particle.x, particle.y, particle.radius * 2, particle.color);
        } else if (particle.type === 'line') {
          // Update angle slightly for rotation effect
          if (particle.angle !== undefined) {
            particle.angle += 0.002;
            const length = particle.length || 0;
            
            const endX = particle.x + Math.cos(particle.angle) * length;
            const endY = particle.y + Math.sin(particle.angle) * length;
            
            ctx.beginPath();
            ctx.strokeStyle = particle.color;
            ctx.lineWidth = 1;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(endX, endY);
            ctx.stroke();
          }
        } else {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.fill();
        }
        
        // Connect nearby particles with lines
        connectParticles(particle, i);
      });

      // Interactive effect with mouse
      if (isMouseMoving) {
        drawMouseEffect();
      }
    };
    
    const drawMouseEffect = () => {
      // Create radial gradient around mouse
      const gradient = ctx.createRadialGradient(
        mouseX, mouseY, 5,
        mouseX, mouseY, 200
      );
      
      if (theme === 'dark') {
        gradient.addColorStop(0, 'rgba(179, 38, 30, 0.3)');
        gradient.addColorStop(1, 'rgba(179, 38, 30, 0)');
      } else {
        gradient.addColorStop(0, 'rgba(0, 102, 204, 0.2)');
        gradient.addColorStop(1, 'rgba(0, 102, 204, 0)');
      }
      
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 200, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Connect particles close to mouse
      particles.forEach(particle => {
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 200) {
          const opacity = (1 - distance / 200) * 0.5;
          ctx.beginPath();
          ctx.strokeStyle = theme === 'dark' 
            ? `rgba(179, 38, 30, ${opacity})` 
            : `rgba(0, 102, 204, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(mouseX, mouseY);
          ctx.lineTo(particle.x, particle.y);
          ctx.stroke();
        }
      });
    };
    
    const connectParticles = (particle: Particle, index: number) => {
      for (let j = index + 1; j < particles.length; j++) {
        const other = particles[j];
        const dx = particle.x - other.x;
        const dy = particle.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) { // Connection distance
          const opacity = (1 - distance / 150) * 0.2;
          
          // Different line colors based on theme
          const strokeColor = theme === 'dark' 
            ? `rgba(179, 38, 30, ${opacity})`
            : `rgba(0, 102, 204, ${opacity})`;
            
          ctx.beginPath();
          ctx.strokeStyle = strokeColor;
          ctx.lineWidth = particle.type === 'star' || other.type === 'star' ? 1 : 0.5;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(other.x, other.y);
          ctx.stroke();
        }
      }
    };
    
    const animate = () => {
      drawParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    // Track mouse movement for interactive effects
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseMoving = true;
      
      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => {
        isMouseMoving = false;
      }, 2000);
    };
    
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    resizeCanvas();
    createParticles();
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(mouseTimeout);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]); // Re-run when theme changes
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 -z-10 opacity-70"
      style={{ pointerEvents: 'none' }}
    />
  );
}
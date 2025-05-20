'use client';

import React, { useEffect, useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF, Text } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Simplified Bitcoin model as fallback when GLB loading fails
interface FallbackModelProps {
  spinning?: boolean;
}

function FallbackModel({ spinning = true }: FallbackModelProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (spinning && meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2; // Match main model rotation speed
    }
  });

  return (
    <mesh ref={meshRef}>
      <cylinderGeometry args={[1, 1, 0.2, 32]} />
      <meshStandardMaterial color="#f7931a" metalness={0.8} roughness={0.3} />
      <mesh position={[0, 0, 0.11]}>
        <Text
          color="#ffffff"
          fontSize={0.5}
          maxWidth={200}
          lineHeight={1}
          letterSpacing={0.02}
          textAlign="center"
        >
          ₿
        </Text>
      </mesh>
    </mesh>
  );
}

// Safe model loader with error handling
interface ModelProps {
  spinning?: boolean;
  modelHeight?: number;
}

const Model = React.memo(function Model({ spinning = true, modelHeight = 2.5 }: ModelProps) {
  const modelRef = useRef<THREE.Group>(null);
  const [hasError, setHasError] = useState(false);
  useGLTF.preload('/models/bitcoin.glb');
  const { scene } = useGLTF('/models/bitcoin.glb');

  useFrame((state, delta) => {
    if (spinning && modelRef.current) {
      modelRef.current.rotation.y += delta * 0.15; // Slow, elegant rotation
      // Lock the x and z rotation to prevent tilting
      modelRef.current.rotation.x = 0;
      modelRef.current.rotation.z = 0;
    }
  });

  if (hasError) {
    return <FallbackModel spinning={spinning} />;
  }

  // Position the model with improved centering and scale
  return (
    <group ref={modelRef} position={[0, 0, 0]} scale={[0.8, 0.8, 0.8]}>
      <primitive object={scene.clone()} position={[0, 0, 0]} />
    </group>
  );
});

interface BitcoinModelProps {
  height?: number;
  width?: number;
  spinning?: boolean;
  modelHeight?: number;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

// Error boundary for WebGL context issues
class WebGLErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state = { hasError: false };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <motion.div
            className="w-24 h-24 bg-[#f7931a] rounded-full flex items-center justify-center"
            animate={{ 
              rotate: 360,
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              rotate: { duration: 5, repeat: Infinity, ease: 'linear' },
              scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
            }}
          >
            <span className="text-white text-4xl font-bold">₿</span>
          </motion.div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Fallback 2D component when WebGL fails
function BitcoinFallback() {
  return (
    <div cla  ssName="w-full h-full flex items-center justify-center">
      <motion.div
        className="w-24 h-24 bg-[#f7931a] rounded-full flex items-center justify-center"
        animate={{ 
          rotate: 360,
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          rotate: { duration: 5, repeat: Infinity, ease: 'linear' },
          scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
        }}
      >
        <span className="text-white text-4xl font-bold">₿</span>
      </motion.div>
    </div>
  );
}

export default function BitcoinModel({ 
  height = 300, 
  width = 300, 
  spinning = true,
  modelHeight = 2.5
}: BitcoinModelProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [useSimpleFallback, setUseSimpleFallback] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check for WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setWebGLSupported(!!gl);
      
      // Clean up
      if (gl && 'getExtension' in gl) {
        const ext = gl.getExtension('WEBGL_lose_context');
        if (ext) ext.loseContext();
      }
    } catch (e) {
      console.error('WebGL not supported:', e);
      setWebGLSupported(false);
    }

    // Handle context lost events
    const handleContextLost = () => {
      console.log('WebGL context lost, will attempt to restore');
      setUseSimpleFallback(true);
    };
    
    window.addEventListener('webglcontextlost', handleContextLost);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('webglcontextlost', handleContextLost);
      setMounted(false);
    };
  }, []);

  if (!mounted) return null;
  
  if (!webGLSupported || useSimpleFallback) {
    return (
      <div style={{ height, width }} className="relative">
        <BitcoinFallback />
      </div>
    );
  }

  return (
    <div style={{ height, width }} className="relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            className="w-16 h-16 border-4 border-t-transparent border-[#f7931a] rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      )}
      <WebGLErrorBoundary>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 1 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full"
        >
          <Canvas 
            camera={{ position: [0, 0, 4], fov: 25 }} // Adjusted camera position for better centering
            gl={{ 
              powerPreference: "high-performance",
              alpha: true,
              antialias: true,
              stencil: false,
              depth: true,
              failIfMajorPerformanceCaveat: false,
              preserveDrawingBuffer: true
            }}
            onCreated={({ gl, camera }) => {
              camera.lookAt(0, 0, 0); // Ensure camera is looking directly at center
              const canvas = gl.domElement;
              canvas.addEventListener('webglcontextrestored', () => {
                console.log('WebGL context restored');
              });
            }}
          >
            <ambientLight intensity={0.8} />
            <directionalLight position={[2, 4, 2]} intensity={0.7} />
            <spotLight position={[0, 5, 5]} angle={0.15} penumbra={1} intensity={0.5} />
            <Suspense fallback={null}>
              <Model spinning={spinning} modelHeight={modelHeight} />
            </Suspense>
            <OrbitControls 
              enablePan={false}
              enableZoom={false}
              autoRotate={false} // Disable auto-rotation from OrbitControls to prevent interference
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2}
              target={[0, 0, 0]} // Center the orbit target
            />
          </Canvas>
        </motion.div>
      </WebGLErrorBoundary>
    </div>
  );
}

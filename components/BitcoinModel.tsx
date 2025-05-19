'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';

function Model({ spinning = true }) {
  const modelRef = useRef<THREE.Mesh>(null);
  const gltf = useLoader(GLTFLoader, '/models/bitcoin.glb');
  
  useFrame((state, delta) => {
    if (spinning && modelRef.current) {
      modelRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <primitive 
      ref={modelRef}
      object={gltf.scene} 
      scale={2.5} 
      position={[0, 0, 0]} 
    />
  );
}

interface BitcoinModelProps {
  height?: number;
  width?: number;
  spinning?: boolean;
}

export default function BitcoinModel({ 
  height = 400, 
  width = 400, 
  spinning = true 
}: BitcoinModelProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading of the model
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ height, width }} className="relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            className="w-16 h-16 border-4 border-t-transparent border-[#B3261E] rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      )}
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          <Model spinning={spinning} />
          <OrbitControls 
            enablePan={false}
            enableZoom={false}
            autoRotate={false}
          />
          <Environment preset="sunset" />
        </Canvas>
      </motion.div>
    </div>
  );
}

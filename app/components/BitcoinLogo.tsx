'use client'

import { useRef, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { useTheme } from 'next-themes'

interface BitcoinGLTF extends THREE.Object3D {
  geometry: THREE.BufferGeometry
  material: THREE.Material
}

interface GLTFResult {
  nodes: {
    bitcoin: BitcoinGLTF
  }
  materials: {
    gold: THREE.Material
  }
}

function Bitcoin3DModel() {
  const { theme } = useTheme()
  const group = useRef<THREE.Group>(null)
  const model = useGLTF('/models/bitcoin.glb')
  const { nodes, materials } = model as unknown as GLTFResult
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += 0.003
      // Subtle hover effect
      group.current.position.y = Math.sin(state.clock.getElapsedTime() * 2) * 0.1
    }
  })

  return (
    <group ref={group} dispose={null}>
      <mesh
        geometry={nodes.bitcoin.geometry}
        material={materials.gold}
        position={[0, 0.5, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshPhysicalMaterial 
          color={theme === 'dark' ? '#F7931A' : '#FF9500'}
          metalness={0.9}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
          emissive={theme === 'dark' ? '#F7931A' : '#FF9500'}
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  )
}

useGLTF.preload('/models/bitcoin.glb')

export default function BitcoinModel() {
  return (
    <div className="w-full h-full">
      <Canvas 
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          <Environment preset="city" />
          <Bitcoin3DModel />
          <OrbitControls 
            enableZoom={false} 
            autoRotate 
            autoRotateSpeed={1.5}
            enablePan={false}
            minPolarAngle={Math.PI / 2.5}
            maxPolarAngle={Math.PI / 2.5}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

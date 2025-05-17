'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, useGLTF } from '@react-three/drei'

function Model() {
  const gltf = useGLTF('/models/bitcoin.glb')
  return <primitive object={gltf.scene} scale={1.5} rotation={[0, 0, 0]} />
}

useGLTF.preload('/models/bitcoin.glb')

export default function BitcoinModel() {
  return (
    <div className="w-full h-[300px] md:h-[400px]">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} />
        <Environment preset="sunset" />
        <Model />
        <OrbitControls enableZoom={false} autoRotate />
      </Canvas>
    </div>
  )
}

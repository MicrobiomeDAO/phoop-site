'use client';

import { ReactNode } from 'react';
import { Environment, OrbitControls } from '@react-three/drei';

interface SceneProps {
  children: ReactNode;
  enableControls?: boolean;
  environment?: string;
}

export function Scene({
  children,
  enableControls = false,
  environment = 'studio'
}: SceneProps) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      {/* Environment */}
      <Environment preset={environment as any} />

      {/* Controls (optional) */}
      {enableControls && <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />}

      {/* Children */}
      {children}
    </>
  );
}
'use client';

import { Canvas, CanvasProps } from '@react-three/fiber';
import { Suspense } from 'react';

interface CanvasWrapperProps extends Omit<CanvasProps, 'children'> {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function CanvasWrapper({ children, fallback = null, camera, ...props }: CanvasWrapperProps) {
  return (
    <Canvas
      {...props}
      camera={camera || { position: [0, 0, 5], fov: 75 }}
      style={{ width: '100%', height: '100%' }}
    >
      <Suspense fallback={fallback}>
        {children}
      </Suspense>
    </Canvas>
  );
}

'use client';

import { useRef, useState, useMemo, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useAnimationFlag } from '@/config/animations';

export type MonsterType =
  | 'type1'
  | 'type2'
  | 'type3'
  | 'type4'
  | 'type5'
  | 'type6'
  | 'type7'
  | 'zombie';

interface MonsterProps {
  type?: MonsterType;
  position?: [number, number, number];
  scale?: number;
  isInteractive?: boolean;
  onClick?: () => void;
  onHover?: (hovered: boolean) => void;
}

// Monster texture paths
const MONSTER_TEXTURES: Record<MonsterType, string> = {
  type1: '/assets/monsters/Basic Monster/Type 1/PNG/01. Basic.png',
  type2: '/assets/monsters/Basic Monster/Type 2/PNG/01. Basic.png',
  type3: '/assets/monsters/Basic Monster/Type 3/PNG/01. Basic.png',
  type4: '/assets/monsters/Basic Monster/Type 4/PNG/01. Basic.png',
  type5: '/assets/monsters/Basic Monster/Type 5/PNG/01. Basic.png',
  type6: '/assets/monsters/Basic Monster/Type 6/PNG/01. Basic.png',
  type7: '/assets/monsters/Basic Monster/Type 7/PNG/01. Basic.png',
  zombie: '/assets/monsters/Zombie/Zombie 1/PNG/Zombie 1.png',
};

export function Monster({
  type = 'type1',
  position = [0, 0, 0],
  scale = 1,
  isInteractive = true,
  onClick,
  onHover,
}: MonsterProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  // Animation flags
  const enableHover = useAnimationFlag('monsterHover');
  const enableClick = useAnimationFlag('monsterClick');
  const enableFloat = useAnimationFlag('monsterFloat');

  // Load texture
  const texture = useTexture(MONSTER_TEXTURES[type]);

  // Compute scale based on animation state
  const currentScale = useMemo(() => {
    let s = scale;
    if (enableHover && hovered) {
      s *= 1.2;
    }
    if (enableClick && active) {
      s *= 0.9;
    }
    return s;
  }, [scale, enableHover, hovered, enableClick, active]);

  // Idle animation
  useFrame((state) => {
    if (meshRef.current && enableFloat) {
      meshRef.current.rotation.y += 0.005;
    }
    if (meshRef.current && enableClick && active) {
      meshRef.current.rotation.z += 0.1;
    }
  });

  // Event handlers
  const handlePointerOver = useCallback(() => {
    if (!isInteractive) return;
    setHovered(true);
    onHover?.(true);
    document.body.style.cursor = 'pointer';
  }, [isInteractive, onHover]);

  const handlePointerOut = useCallback(() => {
    if (!isInteractive) return;
    setHovered(false);
    onHover?.(false);
    document.body.style.cursor = 'default';
  }, [isInteractive, onHover]);

  const handleClick = useCallback(() => {
    if (!isInteractive) return;
    setActive(true);
    onClick?.();
    setTimeout(() => setActive(false), 300);
  }, [isInteractive, onClick]);

  const MonsterContent = (
    <mesh
      ref={meshRef}
      position={position}
      scale={currentScale}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} transparent side={THREE.DoubleSide} />
    </mesh>
  );

  // Wrap in Float if enabled
  if (enableFloat) {
    return (
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        {MonsterContent}
      </Float>
    );
  }

  return MonsterContent;
}

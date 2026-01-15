'use client';

import { useEffect, useRef, RefObject } from 'react';
import { useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';

export interface ScrollAnimationConfig {
  offsetStart?: number;
  offsetEnd?: number;
  springConfig?: {
    stiffness: number;
    damping: number;
    mass?: number;
  };
}

export function useScrollAnimation(config: ScrollAnimationConfig = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [config.offsetStart || 'start end', config.offsetEnd || 'end start'],
  });

  const springConfig = config.springConfig || {
    stiffness: 100,
    damping: 30,
    mass: 0.5,
  };

  return { ref, scrollYProgress, springConfig };
}

export function useParallax(
  scrollYProgress: MotionValue<number>,
  distance: number,
  springConfig?: any
) {
  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance]);
  return useSpring(y, springConfig);
}

export function useScrollOpacity(
  scrollYProgress: MotionValue<number>,
  fadeInStart = 0,
  fadeInEnd = 0.3,
  fadeOutStart = 0.7,
  fadeOutEnd = 1
) {
  return useTransform(
    scrollYProgress,
    [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    [0, 1, 1, 0]
  );
}

export function useScrollScale(
  scrollYProgress: MotionValue<number>,
  scaleStart = 0.8,
  scaleEnd = 1,
  springConfig?: any
) {
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [scaleStart, scaleEnd, scaleStart]);
  return useSpring(scale, springConfig);
}

export function useScrollRotate(
  scrollYProgress: MotionValue<number>,
  rotateAmount = 15,
  springConfig?: any
) {
  const rotate = useTransform(scrollYProgress, [0, 1], [-rotateAmount, rotateAmount]);
  return useSpring(rotate, springConfig);
}

// Horizontal scroll reveal
export function useScrollReveal(
  scrollYProgress: MotionValue<number>,
  direction: 'left' | 'right' = 'left',
  distance = 100
) {
  const x = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    direction === 'left' ? [distance, 0, -distance] : [-distance, 0, distance]
  );
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  return { x: useSpring(x), opacity };
}

// Scroll-driven blur effect
export function useScrollBlur(scrollYProgress: MotionValue<number>, maxBlur = 10) {
  return useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [maxBlur, 0, 0, maxBlur]);
}

// Combined scroll effects for cards
export function useCardScrollEffects(scrollYProgress: MotionValue<number>) {
  const y = useParallax(scrollYProgress, 50);
  const scale = useScrollScale(scrollYProgress, 0.95, 1);
  const opacity = useScrollOpacity(scrollYProgress, 0, 0.2, 0.8, 1);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, -10]);
  
  return { y, scale, opacity, rotateX };
}

// Stagger effect based on index
export function useStaggeredScroll(
  scrollYProgress: MotionValue<number>,
  index: number,
  totalItems: number
) {
  const delay = index / totalItems;
  const adjustedProgress = useTransform(
    scrollYProgress,
    [delay, delay + 0.5],
    [0, 1]
  );
  
  const y = useTransform(adjustedProgress, [0, 1], [100, 0]);
  const opacity = useTransform(adjustedProgress, [0, 1], [0, 1]);
  
  return { y: useSpring(y), opacity };
}

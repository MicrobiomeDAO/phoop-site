'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useAnimationFlag } from '@/config/animations';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';
import { ParticleBackground } from './ParticleBackground';

// Dynamically import MonsterField to avoid SSR issues with Three.js
const MonsterField = dynamic(
  () => import('@/components/game/MonsterField').then((mod) => mod.MonsterField),
  { ssr: false }
);

export function Hero() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [mounted, setMounted] = useState(false);
  const enableAnimations = useAnimationFlag('sectionTransitions');
  const enableButtonHover = useAnimationFlag('buttonHover');

  useEffect(() => {
    setMounted(true);
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToWaitlist = () => {
    const element = document.getElementById('waitlist');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Generate background elements based on window size
  const backgroundElements = mounted ? Array.from({ length: 5 }, (_, i) => ({
    id: i,
    x: Math.random() * windowSize.width,
    y: Math.random() * windowSize.height,
  })) : [];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background solid color */}
      <div className="absolute inset-0 bg-[#97A87A]/10" />
      
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* 3D Monster Background */}
      <div className="absolute inset-0 z-0 opacity-56 pointer-events-none">
        <Suspense fallback={null}>
          <MonsterField count={8} />
        </Suspense>
      </div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        {backgroundElements.map((element) => (
          <motion.div
            key={element.id}
            className="absolute w-64 h-64 bg-honey-bronze-500/7 rounded-full blur-3xl"
            initial={enableAnimations ? {
              x: element.x,
              y: element.y,
            } : undefined}
            animate={enableAnimations ? {
              x: [null, element.x + (Math.random() * 100 - 50)],
              y: [null, element.y + (Math.random() * 100 - 50)],
            } : undefined}
            transition={enableAnimations ? {
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              repeatType: 'reverse',
            } : undefined}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main heading */}
        <motion.h1
          initial={enableAnimations ? { opacity: 0, y: 30 } : undefined}
          animate={{ opacity: 1, y: 0 }}
          transition={enableAnimations ? { duration: 0.8 } : undefined}
          className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold mb-6"
        >
          <span className="text-[#6d3e0f] font-extrabold">Phoop</span>
          <br />
          Your Digestive Health Tracker
          <br />
          with{' '}
          <span className="text-[#ffa239] font-bold">Real World Rewards</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={enableAnimations ? { opacity: 0, y: 30 } : undefined}
          animate={{ opacity: 1, y: 0 }}
          transition={enableAnimations ? { duration: 0.8, delay: 0.2 } : undefined}
          className="font-body text-xl text-white/70 mb-8 max-w-2xl mx-auto"
        >
          Phoop is a digestive health tracker that makes wellness fun. Log your health data, 
          earn XP, collect Poop Monsters NFTs and win real rewards from your tracking journey.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={enableAnimations ? { opacity: 0, y: 30 } : undefined}
          animate={{ opacity: 1, y: 0 }}
          transition={enableAnimations ? { duration: 0.8, delay: 0.4 } : undefined}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={scrollToWaitlist}
            className={cn(
              'btn-primary text-lg',
              enableButtonHover && 'hover:scale-105'
            )}
          >
            Join the Waitlist
          </button>
          <a
            href="#how-it-works"
            className={cn(
              'btn-ghost text-lg',
              enableButtonHover && 'hover:scale-105'
            )}
          >
            Learn More →
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={enableAnimations ? { opacity: 0, y: 30 } : undefined}
          animate={{ opacity: 1, y: 0 }}
          transition={enableAnimations ? { duration: 0.8, delay: 0.6 } : undefined}
          className="mt-12 flex flex-wrap items-center justify-center gap-8"
        >
          <div className="text-center">
            <div className="font-heading text-3xl font-bold text-light-coral-400">10K+</div>
            <div className="text-white/50 text-sm">On Waitlist</div>
          </div>
          <div className="w-px h-12 bg-white/10" />
          <div className="text-center">
            <div className="font-heading text-3xl font-bold text-muted-teal-400">∞</div>
            <div className="text-white/50 text-sm">XP Levels</div>
          </div>
          <div className="w-px h-12 bg-white/10" />
          <div className="text-center">
            <div className="font-heading text-3xl font-bold text-honey-bronze-400">7</div>
            <div className="text-white/50 text-sm">Monster Types</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

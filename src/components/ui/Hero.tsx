'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useAnimationFlag } from '@/config/animations';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';
import { ParticleBackground } from './ParticleBackground';
import { siteConfig } from '@/config/siteConfig';

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 md:pt-36">
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
          Turn Healthy Habits Into
          <br />
          <span className="text-[#ffa239] font-extrabold">Rewards & Rare NFTs</span>
        </motion.h1>

        {/* Social Proof Badge */}
        {siteConfig.features.showSpotsLeft && (
          <motion.div
            initial={enableAnimations ? { opacity: 0, scale: 0.9 } : undefined}
            animate={{ opacity: 1, scale: 1 }}
            transition={enableAnimations ? { duration: 0.6, delay: 0.1 } : undefined}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <div className="px-4 py-2 bg-[#ffa239]/20 border-2 border-[#ffa239] rounded-full">
              <span className="text-[#ffa239] dark:text-black font-extrabold text-sm">🔥 {siteConfig.content.stats.waitlistCount} ON WAITLIST</span>
            </div>
            <div className="px-4 py-2 bg-purple-500/20 border-2 border-purple-500 rounded-full">
              <span className="text-purple-400 font-extrabold text-sm">⭐ {siteConfig.content.spotsLeft}</span>
            </div>
          </motion.div>
        )}

        {/* Subheading */}
        <motion.p
          initial={enableAnimations ? { opacity: 0, y: 30 } : undefined}
          animate={{ opacity: 1, y: 0 }}
          transition={enableAnimations ? { duration: 0.8, delay: 0.2 } : undefined}
          className="font-body text-xl text-white/80 mb-2 max-w-2xl mx-auto font-semibold"
        >
          Track your gut health with AI, earn XP, collect rare Poop Monster NFTs,
          and redeem real rewards like probiotics & health tests at 30% off.
        </motion.p>
        
        {/* Trust Badge */}
        <motion.p
          initial={enableAnimations ? { opacity: 0 } : undefined}
          animate={{ opacity: 1 }}
          transition={enableAnimations ? { duration: 0.8, delay: 0.3 } : undefined}
          className="font-body text-sm text-white/60 mb-8 flex items-center justify-center gap-3"
        >
          <span className="flex items-center gap-1">🔒 Bank-Level Encryption</span>
          <span className="text-white/40">•</span>
          <span className="flex items-center gap-1">📱 iOS & Android</span>
          <span className="text-white/40">•</span>
          <span className="flex items-center gap-1">🎁 Free for Beta Users</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={enableAnimations ? { opacity: 0, y: 30 } : undefined}
          animate={{ opacity: 1, y: 0 }}
          transition={enableAnimations ? { duration: 0.8, delay: 0.4 } : undefined}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
        >
          <button
            onClick={scrollToWaitlist}
            className="bg-[#ffa239] hover:bg-[#ff8c1a] text-white dark:text-black font-extrabold text-lg px-8 py-4 rounded-xl shadow-2xl shadow-[#ffa239]/50 hover:shadow-[#ffa239]/70 transition-all duration-300 hover:scale-105 relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-2 dark:text-black">
              Reserve Your Spot
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
          <a
            href="#how-it-works"
            className="bg-transparent border-2 border-white/30 hover:border-[#a56a31] text-white hover:text-[#a56a31] font-bold text-lg px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105"
          >
            See How It Works →
          </a>
        </motion.div>
        
        {/* Countdown Timer */}
        <motion.p
          initial={enableAnimations ? { opacity: 0 } : undefined}
          animate={{ opacity: 1 }}
          transition={enableAnimations ? { duration: 0.8, delay: 0.5 } : undefined}
          className="text-white/70 text-sm font-semibold"
        >
          ⏰ Early Access Closes in: <span className="text-[#ffa239] font-bold">7 Days</span>
        </motion.p>

        {/* Stats */}
        {siteConfig.features.showStats && (
          <motion.div
            initial={enableAnimations ? { opacity: 0, y: 30 } : undefined}
            animate={{ opacity: 1, y: 0 }}
            transition={enableAnimations ? { duration: 0.8, delay: 0.6 } : undefined}
            className="mt-12 flex flex-wrap items-center justify-center gap-8"
          >
            <div className="text-center">
              <div className="font-heading text-3xl font-bold text-light-coral-400">{siteConfig.content.stats.waitlistCount}</div>
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
        )}
      </div>
    </section>
  );
}

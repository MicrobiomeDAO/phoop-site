'use client';

import { useState, useEffect, Suspense, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax effects
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.3]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

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
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 md:pt-36">
      {/* Background solid color */}
      <div className="absolute inset-0 bg-[#97A87A]/10" />
      
      {/* Particle Background with parallax */}
      <motion.div style={{ y: heroY, opacity: heroOpacity }}>
        <ParticleBackground />
      </motion.div>
      
      {/* 3D Monster Background with parallax */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-56 pointer-events-none"
        style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '30%']) }}
      >
        <Suspense fallback={null}>
          <MonsterField count={8} />
        </Suspense>
      </motion.div>
      
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

      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        style={{ scale: heroScale, opacity: heroOpacity }}
      >
        {/* Main heading with advanced animations */}
        <motion.h1
          style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '-30%']) }}
          className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold mb-6"
        >
          {/* Animated "Phoop" with glow effect */}
          <motion.span 
            initial={enableAnimations ? { opacity: 0, scale: 0.5, rotateX: -90 } : undefined}
            animate={enableAnimations ? { 
              opacity: 1, 
              scale: 1, 
              rotateX: 0 
            } : { opacity: 1, scale: 1 }}
            transition={enableAnimations ? { 
              duration: 0.8, 
              type: 'spring', 
              bounce: 0.4 
            } : undefined}
            className="inline-block text-[#6d3e0f] font-extrabold relative"
          >
            <motion.span
              animate={enableAnimations ? {
                textShadow: [
                  '0 0 20px rgba(255, 162, 57, 0.5)',
                  '0 0 40px rgba(255, 162, 57, 0.8)',
                  '0 0 20px rgba(255, 162, 57, 0.5)',
                ]
              } : undefined}
              transition={enableAnimations ? {
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              } : undefined}
            >
              Phoop
            </motion.span>
          </motion.span>
          <br />
          
          {/* Staggered word animation for middle line */}
          <span className="inline-block">
            {['Turn', 'Healthy', 'Habits', 'Into'].map((word, index) => (
              <motion.span
                key={word}
                initial={enableAnimations ? { opacity: 0, y: 20, rotateY: -90 } : undefined}
                animate={enableAnimations ? { opacity: 1, y: 0, rotateY: 0 } : { opacity: 1 }}
                transition={enableAnimations ? {
                  duration: 0.6,
                  delay: 0.2 + index * 0.1,
                  type: 'spring',
                  stiffness: 100
                } : undefined}
                className="inline-block mr-3"
              >
                {word}
              </motion.span>
            ))}
          </span>
          <br />
          
          {/* Character-by-character pop-in animation for final line */}
          <span className="inline-block">
            {'Rewards & Rare NFTs'.split('').map((char, index) => (
              <motion.span
                key={index}
                initial={enableAnimations ? { opacity: 0, y: 50, scale: 0 } : undefined}
                animate={enableAnimations ? { 
                  opacity: 1, 
                  y: [0, -10, 0],
                  scale: 1,
                } : { opacity: 1 }}
                transition={enableAnimations ? {
                  opacity: { duration: 0.3, delay: 0.6 + index * 0.03 },
                  scale: { duration: 0.5, delay: 0.6 + index * 0.03, type: 'spring', bounce: 0.6 },
                  y: { 
                    duration: 1.5, 
                    delay: 0.8 + index * 0.03,
                    repeat: Infinity,
                    repeatDelay: 0.5,
                    ease: 'easeInOut'
                  }
                } : undefined}
                className="inline-block text-[#ffa239] font-extrabold"
                style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </span>
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
          <span className="flex items-center gap-1">Encrypted</span>
          <span className="text-white/40">•</span>
          <span className="flex items-center gap-1">iOS, Android & Seeker</span>
          <span className="text-white/40">•</span>
          <span className="flex items-center gap-1">Extra rewards for Beta Users</span>
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
          ⏰ Waitlist and Whitelisting live <span className="text-[#ffa239] font-bold"></span>
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
      </motion.div>
    </section>
  );
}

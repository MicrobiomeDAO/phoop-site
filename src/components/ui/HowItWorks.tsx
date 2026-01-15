'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useAnimationFlag } from '@/config/animations';
import { useScrollAnimation, useParallax, useCardScrollEffects } from '@/hooks/useScrollAnimation';
import { useRef } from 'react';

const steps = [
  {
    emoji: '📸',
    number: '1',
    title: 'Snap & Track',
    description: 'Take a quick photo or log your health entry in seconds. Our AI analyzes everything instantly.',
    color: '#ffa239',
  },
  {
    emoji: '🎮',
    number: '2',
    title: 'Earn & Discover',
    description: 'Gain XP with every entry and discover rare Poop Monster NFTs. Build your collection!',
    color: '#f19a0e',
  },
  {
    emoji: '🎁',
    number: '3',
    title: 'Redeem Rewards',
    description: 'Use your XP to get real products at 30-50% off: probiotics, health tests, and more!',
    color: '#a56a31',
  },
];

export function HowItWorks() {
  const enableAnimations = useAnimationFlag('sectionTransitions');
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Create parallax effects for different elements
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const titleScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <section ref={containerRef} id="how-it-works" className="py-20 bg-gradient-to-b from-transparent to-[#a8bba3]/10 relative overflow-hidden">
      {/* Animated background decoration */}
      <motion.div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-10 left-10 w-64 h-64 bg-[#ffa239] rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-[#a56a31] rounded-full blur-3xl" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with scroll-driven effects */}
        <motion.div
          initial={enableAnimations ? { opacity: 0, y: 30 } : undefined}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ y: titleY, scale: titleScale }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            <span className="text-[#6d3e0f] font-bold">How It Works</span>
          </h2>
          <p className="font-body text-white/70 text-xl max-w-2xl mx-auto">
            Three simple steps to transform your health tracking journey
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative">
          {/* Connection lines (desktop only) - animated on scroll */}
          <motion.div 
            className="hidden md:block absolute top-20 left-1/4 right-1/4 h-1 bg-gradient-to-r from-[#ffa239] via-[#f19a0e] to-[#a56a31] opacity-30 -z-10"
            style={{
              scaleX: useTransform(scrollYProgress, [0.2, 0.6], [0, 1]),
              originX: 0,
            }}
          />

          {steps.map((step, index) => {
            const stepRef = useRef<HTMLDivElement>(null);
            const { scrollYProgress: stepProgress } = useScroll({
              target: stepRef,
              offset: ['start end', 'end start'],
            });
            
            const stepY = useTransform(stepProgress, [0, 0.5, 1], [50, 0, -50]);
            const stepRotate = useTransform(stepProgress, [0, 0.5, 1], [-5, 0, 5]);
            const stepScale = useTransform(stepProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.9]);
            
            return (
              <motion.div
                ref={stepRef}
                key={index}
                initial={enableAnimations ? { opacity: 0, y: 50 } : undefined}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={enableAnimations ? { delay: index * 0.2 } : undefined}
                style={{ 
                  y: stepY,
                  rotate: stepRotate,
                  scale: stepScale,
                }}
                className="relative"
              >
              <div className="card hover:shadow-2xl transition-all duration-300 hover:scale-105 h-full">
                {/* Step number badge */}
                <div 
                  className="absolute -top-6 -left-6 w-16 h-16 rounded-full flex items-center justify-center font-bold text-2xl text-white shadow-xl"
                  style={{ backgroundColor: step.color }}
                >
                  {step.number}
                </div>

                {/* Content */}
                <div className="text-center">
                  <div className="text-7xl mb-4">{step.emoji}</div>
                  <h3 className="font-heading text-2xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="font-body text-white/70 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow connector (mobile only) */}
                {index < steps.length - 1 && (
                  <div className="md:hidden flex justify-center mt-8">
                    <motion.div 
                      className="text-4xl text-[#ffa239]/50"
                      animate={{ y: [0, 10, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      ↓
                    </motion.div>
                  </div>
                )}
              </div>
            </motion.div>
          )})}
        </div>

        {/* CTA */}
        <motion.div
          initial={enableAnimations ? { opacity: 0, y: 30 } : undefined}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <button
            onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-[#ffa239] hover:bg-[#ff8c1a] text-white dark:text-black font-extrabold text-lg px-10 py-5 rounded-xl shadow-2xl shadow-[#ffa239]/50 hover:shadow-[#ffa239]/70 transition-all duration-300 hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-2 dark:text-black">
              🚀 Start Your Journey Now
            </span>
          </button>
          <p className="font-body text-white/60 text-sm mt-4">
            Join a community of most aware fitness enthusiasts
          </p>
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnimationFlag } from '@/config/animations';
import { cn } from '@/lib/utils';

export interface ConceptStep {
  id: string;
  type: 'poop' | 'food' | 'lifestyle' | 'monster';
  title: string;
  description: string;
  benefits: string[];
  icon: string;
  emoji: string;
}

interface ConceptFlowProps {
  steps?: ConceptStep[];
  onComplete?: () => void;
}

const defaultSteps: ConceptStep[] = [
  {
    id: 'poop',
    type: 'poop',
    title: 'Track Your Poops',
    description: 'Simply take a photo of your poop and let our AI analyze it. We track consistency, color, and other health indicators to help you understand your digestive health.',
    benefits: [
      'Instant AI analysis of your stool',
      'Track changes over time',
      'Get personalized insights',
      'Share reports with your doctor',
    ],
    icon: '📸',
    emoji: '💩',
  },
  {
    id: 'food',
    type: 'food',
    title: 'Log Your Food',
    description: 'What you eat affects how you poop. Log your meals and snacks to see correlations between your diet and digestive health.',
    benefits: [
      'Identify trigger foods',
      'Track fiber and water intake',
      'Get meal recommendations',
      'Build healthier habits',
    ],
    icon: '🍎',
    emoji: '🍽️',
  },
  {
    id: 'lifestyle',
    type: 'lifestyle',
    title: 'Monitor Lifestyle',
    description: 'Sleep, stress, exercise, and hydration all impact digestion. Log these factors to find patterns and improve your overall wellness.',
    benefits: [
      'Track sleep quality',
      'Monitor stress levels',
      'Log water intake',
      'Correlate habits with health',
    ],
    icon: '📊',
    emoji: '✨',
  },
  {
    id: 'monster',
    type: 'monster',
    title: 'Collect Poop Monsters NFTs',
    description: 'Every health entry is a chance to discover a new Poop Monster from our exclusive NFT collection! Collect all 7 types plus rare zombies. Earn XP and level up!',
    benefits: [
      'Unique NFT monster collection',
      'Rare zombie variants',
      'XP for every log',
      'Level up rewards',
    ],
    icon: '👾',
    emoji: '🎮',
  },
];

// Color mapping for each step type
const stepColors = {
  poop: { primary: 'honey-bronze', secondary: 'linen', accent: '#f19a0e' },
  food: { primary: 'muted-teal', secondary: 'honey-bronze', accent: '#6c9389' },
  lifestyle: { primary: 'cotton-rose', secondary: 'light-coral', accent: '#da3d25' },
  monster: { primary: 'linen', secondary: 'muted-teal', accent: '#c88237' },
};

export function ConceptFlow({ steps = defaultSteps, onComplete }: ConceptFlowProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  const enableAnimations = useAnimationFlag('conceptFlowTransition');
  const enableTransition = useAnimationFlag('conceptFlowTransition');

  const handleNext = useCallback(() => {
    setDirection('next');
    setActiveIndex((prev) => {
      const next = prev + 1;
      if (next >= steps.length) {
        onComplete?.();
        return prev;
      }
      return next;
    });
  }, [steps.length, onComplete]);

  const handlePrev = useCallback(() => {
    setDirection('prev');
    setActiveIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleDotClick = (index: number) => {
    setDirection(index > activeIndex ? 'next' : 'prev');
    setActiveIndex(index);
  };

  const step = steps[activeIndex];

  return (
    <section id="how-it-works" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={enableAnimations ? { opacity: 0, y: 30 } : undefined}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-4xl font-bold mb-4">
            How <span className="text-[#6d3e0f] font-bold">Poop Tracker</span> Works
          </h2>
          <p className="font-body text-white/60 max-w-2xl mx-auto">
            Getting started is easy. Just follow these simple steps to begin your 
            digestive health journey.
          </p>
        </motion.div>

        {/* Step indicator */}
        <div className="flex justify-center gap-2 mb-8">
          {steps.map((s, index) => (
            <button
              key={s.id}
              onClick={() => handleDotClick(index)}
              className={cn(
                'w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all',
                index === activeIndex
                  ? 'bg-honey-bronze-500 text-background scale-110'
                  : 'bg-surface text-white/50 hover:text-white'
              )}
              aria-label={`Go to step ${index + 1}: ${s.title}`}
            >
              {s.icon}
            </button>
          ))}
        </div>

        {/* Step content */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeIndex}
              initial={enableTransition ? { opacity: 0, x: direction === 'next' ? 50 : -50 } : undefined}
              animate={{ opacity: 1, x: 0 }}
              exit={enableTransition ? { opacity: 0, x: direction === 'next' ? -50 : 50 } : undefined}
              transition={enableTransition ? { duration: 0.3 } : undefined}
              className="card"
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Visual side */}
                <div className="text-center">
                  <motion.div
                    initial={enableAnimations ? { scale: 0.8, opacity: 0 } : undefined}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={enableAnimations ? { delay: 0.2 } : undefined}
                    className="text-8xl mb-4"
                  >
                    {step.emoji}
                  </motion.div>
                  <div className="text-sm text-white/40 uppercase tracking-wider">
                    Step {activeIndex + 1} of {steps.length}
                  </div>
                </div>

                {/* Content side */}
                <div>
                  <h3 className="font-heading text-2xl font-bold mb-4">
                    {step.title}
                  </h3>
                  <p className="text-white/70 mb-6">
                    {step.description}
                  </p>

                  <ul className="space-y-3">
                    {step.benefits.map((benefit, index) => (
                      <motion.li
                        key={benefit}
                        initial={enableAnimations ? { opacity: 0, x: -20 } : undefined}
                        animate={{ opacity: 1, x: 0 }}
                        transition={enableAnimations ? { delay: 0.3 + index * 0.1 } : undefined}
                        className="flex items-center gap-3"
                      >
                        <span className="text-muted-teal-400">✓</span>
                        <span className="text-white/80">{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className={cn(
                'btn-ghost',
                activeIndex === 0 && 'opacity-50 cursor-not-allowed'
              )}
            >
              ← Previous
            </button>

            <span className="text-white/50">
              {activeIndex + 1} / {steps.length}
            </span>

            <button
              onClick={handleNext}
              disabled={activeIndex === steps.length - 1}
              className={cn(
                'btn-primary',
                activeIndex === steps.length - 1 && 'opacity-50 cursor-not-allowed'
              )}
            >
              {activeIndex === steps.length - 1 ? 'Complete!' : 'Next →'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import { useAnimationFlag } from '@/config/animations';

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

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-b from-transparent to-[#a8bba3]/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={enableAnimations ? { opacity: 0, y: 30 } : undefined}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
          {/* Connection lines (desktop only) */}
          <div className="hidden md:block absolute top-20 left-1/4 right-1/4 h-1 bg-gradient-to-r from-[#ffa239] via-[#f19a0e] to-[#a56a31] opacity-30 -z-10" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={enableAnimations ? { opacity: 0, y: 50 } : undefined}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={enableAnimations ? { delay: index * 0.2 } : undefined}
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
                    <div className="text-4xl text-[#ffa239]/50">↓</div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
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
            Join 10,000+ users already tracking smarter
          </p>
        </motion.div>
      </div>
    </section>
  );
}

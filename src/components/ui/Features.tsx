'use client';

import { motion } from 'framer-motion';
import { useAnimationFlag } from '@/config/animations';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: '📸',
    title: 'Poop Photo Tracking',
    description: 'Take photos of your poops and get instant AI analysis of consistency, color, and health indicators.',
    stat: 'AI-Powered',
  },
  {
    icon: '🍎',
    title: 'Food Logging',
    description: 'Track what you eat and see how your diet affects your digestive health over time.',
    stat: '10K+ Foods',
  },
  {
    icon: '📊',
    title: 'Lifestyle Habits',
    description: 'Log sleep, stress, exercise, and water intake to find patterns in your health.',
    stat: 'Smart Insights',
  },
  {
    icon: '⭐',
    title: 'XP & Levels',
    description: 'Earn XP for every log and level up your health journey with gamification.',
    stat: 'Unlimited Levels',
  },
  {
    icon: '👾',
    title: 'Poop Monsters NFTs',
    description: 'Each poop entry is a chance to discover rare and legendary Poop Monsters from our exclusive NFT collection!',
    stat: 'Unlock Premium Features',
  },
  {
    icon: '🔐',
    title: 'Private & Secure',
    description: 'Your health data stays yours. End-to-end encrypted and fully private.',
    stat: '100% Private',
  },
];

export function Features() {
  const enableAnimations = useAnimationFlag('sectionTransitions');

  return (
    <section id="features" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={enableAnimations ? { opacity: 0, y: 30 } : undefined}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl font-bold mb-4">
            Everything You Need to{' '}
            <span className="gradient-text">Track Your Health</span>
          </h2>
          <p className="font-body text-white/60 max-w-2xl mx-auto">
            Powerful features wrapped in a fun, gamified experience that makes 
            health tracking something you actually want to do.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={enableAnimations ? { opacity: 0, y: 30 } : undefined}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={enableAnimations ? { delay: index * 0.1 } : undefined}
              className={cn(
                'card group cursor-pointer',
                enableAnimations && 'hover:scale-105'
              )}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="font-heading text-xl font-bold mb-2 group-hover:text-gold transition-colors">
                {feature.title}
              </h3>
              <p className="font-body text-white/60 mb-4">
                {feature.description}
              </p>
              <div className="inline-block px-3 py-1 bg-gold/10 text-gold text-sm font-medium rounded-full">
                {feature.stat}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import { useAnimationFlag } from '@/config/animations';
import { cn } from '@/lib/utils';

const VALUE_PROPS = [
  {
    icon: '📊',
    title: 'Track Your Health',
    description: 'Understand your digestive patterns with detailed analytics and insights powered by AI.',
    stat: '10M+ logs tracked',
  },
  {
    icon: '👾',
    title: 'Collect Poop Monsters NFTs',
    description: 'Every health entry is a chance to discover rare and legendary Poop Monsters from our exclusive NFT collection.',
    stat: '7 unique types',
  },
  {
    icon: '⭐',
    title: 'Earn XP',
    description: 'Level up your health journey with gamified tracking. Earn XP for every log you submit.',
    stat: 'Unlimited levels',
  },
  {
    icon: '🍎',
    title: 'Food & Lifestyle',
    description: 'Correlate your diet and habits with digestive health. Get personalized recommendations.',
    stat: 'AI-powered insights',
  },
];

export function ValueProposition() {
  const enableAnimations = useAnimationFlag('valuePropReveal');

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={enableAnimations ? { opacity: 0, y: 20 } : undefined}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-4xl font-bold text-center mb-4"
        >
          Why Join{' '}
          <span className="gradient-text">Phoop</span>?
        </motion.h2>

        <motion.p
          initial={enableAnimations ? { opacity: 0, y: 20 } : undefined}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={enableAnimations ? { delay: 0.1 } : undefined}
          className="text-white/60 text-center max-w-2xl mx-auto mb-12"
        >
          Join thousands of health-conscious people using Phoop to take control of their 
          digestive wellness with our gamified health tracker and exclusive Poop Monsters NFT collection.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUE_PROPS.map((prop, index) => (
            <motion.div
              key={prop.title}
              initial={enableAnimations ? { opacity: 0, y: 30 } : undefined}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={enableAnimations ? { delay: index * 0.1 } : undefined}
              className={cn(
                'card text-center cursor-pointer',
                enableAnimations && 'hover:scale-105'
              )}
            >
              <div className="text-4xl mb-4">{prop.icon}</div>
              <h3 className="font-heading text-xl font-bold mb-3">
                {prop.title}
              </h3>
              <p className="text-white/60 text-sm mb-4">
                {prop.description}
              </p>
              <div className="inline-block px-3 py-1 bg-purple/10 text-purple text-sm font-medium rounded-full">
                {prop.stat}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={enableAnimations ? { opacity: 0, scale: 0.9 } : undefined}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="card inline-block">
            <p className="text-white/80 mb-4">
              Join <strong className="text-gold">10,000+</strong> health-conscious people 
              waiting for early access
            </p>
            <a
              href="#waitlist"
              className="btn-primary inline-block"
            >
              Join the Waitlist →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

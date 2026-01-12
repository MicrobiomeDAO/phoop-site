'use client';

import { motion } from 'framer-motion';
import { useAnimationFlag } from '@/config/animations';
import { MonsterField } from '@/components/game/MonsterField';
import { Suspense } from 'react';

export function MonsterShowcase() {
  const enableAnimations = useAnimationFlag('sectionTransitions');

  return (
    <section id="monsters" className="relative py-20 overflow-hidden">
      {/* Background 3D Monster Field */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Suspense fallback={<div className="w-full h-full bg-gradient-to-b from-purple/10 to-transparent" />}>
          <MonsterField count={15} />
        </Suspense>
      </div>

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background/90 via-background/70 to-background/90 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={enableAnimations ? { opacity: 0, y: 30 } : undefined}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl sm:text-5xl font-bold mb-4">
            Meet the{' '}
            <span className="gradient-text">Poop Monsters</span>
          </h2>
          <p className="font-body text-xl text-white/70 max-w-2xl mx-auto">
            Our exclusive NFT collection features 7 unique monster types plus rare zombie variants. 
            Each health entry is a chance to discover a new friend!
          </p>
        </motion.div>

        {/* Monster Types Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
          {MONSTER_TYPES.map((monster, index) => (
            <motion.div
              key={monster.id}
              initial={enableAnimations ? { opacity: 0, scale: 0.8 } : undefined}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={enableAnimations ? { delay: index * 0.1 } : undefined}
              whileHover={enableAnimations ? { scale: 1.05, y: -5 } : undefined}
              className="card backdrop-blur-md group cursor-pointer"
            >
              <div className="text-center p-2">
                <div className="text-5xl md:text-6xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {monster.emoji}
                </div>
                <h3 className="font-heading text-base md:text-lg font-bold mb-2">
                  {monster.name}
                </h3>
                <p className="text-white/60 text-xs md:text-sm mb-3 line-clamp-2">
                  {monster.description}
                </p>
                <div className={`inline-block px-2 md:px-3 py-1 rounded-full text-xs font-medium ${monster.rarityColor}`}>
                  {monster.rarity}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={enableAnimations ? { opacity: 0, y: 30 } : undefined}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-white/70 mb-4">
            Start tracking to collect them all!
          </p>
          <a
            href="#waitlist"
            className="btn-primary inline-block"
          >
            Join the Waitlist
          </a>
        </motion.div>
      </div>
    </section>
  );
}

const MONSTER_TYPES = [
  {
    id: 'type1',
    name: 'Basic Buddy',
    emoji: '💩',
    description: 'The friendly starter monster',
    rarity: 'Common',
    rarityColor: 'bg-gray-500/20 text-gray-300',
  },
  {
    id: 'type2',
    name: 'Happy Helper',
    emoji: '😊',
    description: 'Always positive and uplifting',
    rarity: 'Common',
    rarityColor: 'bg-gray-500/20 text-gray-300',
  },
  {
    id: 'type3',
    name: 'Fierce Fighter',
    emoji: '😤',
    description: 'Strong and determined',
    rarity: 'Uncommon',
    rarityColor: 'bg-green-500/20 text-green-300',
  },
  {
    id: 'type4',
    name: 'Cool Cat',
    emoji: '😎',
    description: 'The chillest of the bunch',
    rarity: 'Uncommon',
    rarityColor: 'bg-green-500/20 text-green-300',
  },
  {
    id: 'type5',
    name: 'Smart Scholar',
    emoji: '🤓',
    description: 'Wise beyond its years',
    rarity: 'Rare',
    rarityColor: 'bg-blue-500/20 text-blue-300',
  },
  {
    id: 'type6',
    name: 'Party Pooper',
    emoji: '🥳',
    description: 'Loves to celebrate wins',
    rarity: 'Rare',
    rarityColor: 'bg-blue-500/20 text-blue-300',
  },
  {
    id: 'type7',
    name: 'Royal Throne',
    emoji: '👑',
    description: 'The king of the collection',
    rarity: 'Epic',
    rarityColor: 'bg-purple-500/20 text-purple-300',
  },
  {
    id: 'zombie',
    name: 'Zombie',
    emoji: '🧟',
    description: 'Ultra rare undead variant',
    rarity: 'Legendary',
    rarityColor: 'bg-gold/20 text-gold',
  },
];

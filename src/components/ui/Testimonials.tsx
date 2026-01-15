'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useAnimationFlag } from '@/config/animations';
import { siteConfig } from '@/config/siteConfig';
import { useRef } from 'react';

const testimonials = [
  {
    name: 'Sarah Chen',
    location: 'San Francisco, CA',
    avatar: '👩‍💼',
    quote: "I've tried EVERY health tracker out there. Phoop is the first one that actually makes me WANT to track daily. The NFT monsters are addictive!",
    monsters: 12,
    days: 47,
  },
  {
    name: 'Marcus Rodriguez',
    location: 'Austin, TX',
    avatar: '👨‍🚀',
    quote: "The AI insights are incredible. It noticed patterns I never would have seen. Plus I got $150 worth of probiotics with my XP!",
    monsters: 8,
    days: 31,
  },
  {
    name: 'Emily Watson',
    location: 'Brooklyn, NY',
    avatar: '👩‍🎨',
    quote: "As someone with IBS, this app has been life-changing. The rewards system actually motivates me to stay consistent with tracking.",
    monsters: 15,
    days: 62,
  },
];

export function Testimonials() {
  if (!siteConfig.features.showTestimonials) return null;

  const enableAnimations = useAnimationFlag('sectionTransitions');
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Parallax effects for background decorations
  const decorY1 = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);
  const decorY2 = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const decorRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <section ref={containerRef} id="testimonials" className="py-20 bg-[#a8bba3]/5 relative overflow-hidden">
      {/* Background decoration with scroll effects */}
      <motion.div className="absolute inset-0 opacity-5">
        <motion.div 
          className="absolute top-10 left-10 text-8xl"
          style={{ y: decorY1, rotate: decorRotate }}
        >
          💚
        </motion.div>
        <motion.div 
          className="absolute bottom-10 right-10 text-8xl"
          style={{ y: decorY2, rotate: decorRotate }}
        >
          ⭐
        </motion.div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={enableAnimations ? { opacity: 0, y: 30 } : undefined}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            <span className="text-[#6d3e0f] font-bold">Real Users.</span> Real Results.
          </h2>
          <p className="font-body text-white/70 text-xl max-w-2xl mx-auto">
            Join thousands already transforming their health habits
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => {
            // Individual scroll tracking for each card
            const cardRef = useRef<HTMLDivElement>(null);
            const { scrollYProgress: cardProgress } = useScroll({
              target: cardRef,
              offset: ['start end', 'center center'],
            });

            const cardY = useTransform(cardProgress, [0, 1], [100, -50]);
            const cardRotate = useTransform(cardProgress, [0, 0.5, 1], [-2, 0, 2]);
            const cardScale = useTransform(cardProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

            return (
              <motion.div
                key={index}
                ref={cardRef}
                initial={enableAnimations ? { opacity: 0, y: 50 } : undefined}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={enableAnimations ? { delay: index * 0.15 } : undefined}
                style={{ 
                  y: enableAnimations ? cardY : undefined,
                  rotate: enableAnimations ? cardRotate : undefined,
                  scale: enableAnimations ? cardScale : undefined,
                }}
                className="card hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
              {/* Quote */}
              <div className="mb-6">
                <div className="text-[#ffa239] text-4xl mb-3">"</div>
                <p className="font-body text-white/80 leading-relaxed italic">
                  {testimonial.quote}
                </p>
              </div>

              {/* Stats */}
              <div className="flex gap-3 mb-6">
                <div className="px-3 py-1.5 bg-[#ffa239]/20 border-2 border-[#ffa239] rounded-full">
                  <span className="text-[#ffa239] font-bold text-xs">
                    👾 {testimonial.monsters} Monsters
                  </span>
                </div>
                <div className="px-3 py-1.5 bg-[#a8bba3]/30 border-2 border-[#a8bba3] rounded-full">
                  <span className="text-white font-bold text-xs">
                    🔥 {testimonial.days} Day Streak
                  </span>
                </div>
              </div>

              {/* User info */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="text-4xl">{testimonial.avatar}</div>
                <div>
                  <div className="font-bold text-white">{testimonial.name}</div>
                  <div className="text-sm text-white/60">{testimonial.location}</div>
                </div>
              </div>
              </motion.div>
            );
          })}
        </div>

        {/* Trust indicators */}
        {siteConfig.features.showStats && (
          <motion.div
            initial={enableAnimations ? { opacity: 0, y: 30 } : undefined}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            <div className="text-center p-4">
              <div className="text-4xl font-bold text-[#ffa239] mb-2">{siteConfig.content.stats.betaSignups}</div>
              <div className="text-sm text-white/70">Beta Signups</div>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl font-bold text-[#ffa239] mb-2">{siteConfig.content.stats.averageRating}</div>
              <div className="text-sm text-white/70">Average Rating</div>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl font-bold text-[#ffa239] mb-2">{siteConfig.content.stats.entriesLogged}</div>
              <div className="text-sm text-white/70">Entries Logged</div>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl font-bold text-[#ffa239] mb-2">{siteConfig.content.stats.rewardsRedeemed}</div>
              <div className="text-sm text-white/70">Rewards Redeemed</div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

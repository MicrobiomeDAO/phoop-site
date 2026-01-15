'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnimationFlag } from '@/config/animations';
import { cn } from '@/lib/utils';
import { joinWaitlist, type WaitlistStats } from '@/lib/supabase';
import { siteConfig } from '@/config/siteConfig';

export function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<WaitlistStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  const enableAnimations = useAnimationFlag('waitlistSuccess');
  const enableConfetti = useAnimationFlag('confettiOnSubmit');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const stats = await joinWaitlist(email, name);
      if (stats) {
        setResult(stats);
        // Trigger confetti effect if enabled
        if (enableConfetti) {
          import('canvas-confetti').then((confetti) => {
            confetti.default({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
              colors: ['#FFD700', '#8B5CF6', '#10B981'],
            });
          });
        }
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch {
      setError('Failed to join waitlist. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (result) {
    return (
      <section id="waitlist" className="py-20 relative">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.div
            initial={enableAnimations ? { scale: 0.8, opacity: 0 } : undefined}
            animate={{ scale: 1, opacity: 1 }}
            className="card text-center py-12"
          >
            <motion.div 
              className="text-6xl mb-4"
              animate={enableAnimations ? { 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0] 
              } : undefined}
              transition={enableAnimations ? { 
                duration: 0.6,
                repeat: 2,
                repeatDelay: 0.5 
              } : undefined}
            >
              🎉
            </motion.div>
            <h2 className="font-heading text-3xl font-bold mb-4">
              Welcome to the <span className="text-[#6d3e0f] font-bold">Phoop Family!</span>
            </h2>
            <p className="text-white/70 mb-8 text-lg">
              You're officially part of something special!
            </p>
            <div className="bg-[#a8bba3]/10 rounded-xl p-8 mb-8 border border-[#a56a31]/20">
              <div className="text-6xl mb-4">💩✨</div>
              <p className="text-white/80 text-base leading-relaxed mb-4">
                Get ready to transform your health journey into an exciting adventure. 
                You'll be among the first to experience Phoop when we launch!
              </p>
              <div className="flex items-center justify-center gap-6 mt-6 flex-wrap">
                <div className="text-center">
                  <div className="text-2xl mb-1">🎮</div>
                  <div className="text-sm text-white/60">Gamified Tracking</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-1">👾</div>
                  <div className="text-sm text-white/60">Collect Monsters</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-1">🏆</div>
                  <div className="text-sm text-white/60">Early Access</div>
                </div>
              </div>
            </div>
            <p className="text-white/50 text-sm mb-6">
              We'll send you exclusive updates and let you know as soon as we're ready to launch!
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="waitlist" className="py-20 relative bg-gradient-to-b from-[#a8bba3]/5 to-transparent">
      <div className="max-w-2xl mx-auto px-4">
        <motion.div
          initial={enableAnimations ? { opacity: 0, y: 30 } : undefined}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card border-2 border-[#ffa239]/30 shadow-2xl shadow-[#ffa239]/20"
        >
          <div className="text-center mb-8">
            {/* Urgency indicators */}
            {siteConfig.features.showSpotsLeft && (
              <div className="flex items-center justify-center gap-3 mb-4 flex-wrap">
                <div className="px-4 py-2 bg-[#ffa239]/20 border-2 border-[#ffa239] rounded-full animate-pulse">
                  <span className="text-[#ffa239] font-extrabold text-sm">🔥 {siteConfig.content.spotsLeft}</span>
                </div>
                <div className="px-4 py-2 bg-purple-500/20 border-2 border-purple-500 rounded-full">
                  <span className="text-purple-300 font-extrabold text-sm">⭐ 50% OFF ENDS SOON</span>
                </div>
              </div>
            )}

            <h2 className="font-heading text-4xl font-bold mb-4">
              <span className="text-[#6d3e0f] font-bold">Reserve Your Spot</span>
            </h2>
            <p className="text-white/80 text-lg mb-4">
              Join 10,000+ early adopters getting exclusive beta access
            </p>

            {/* Benefits list */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <div className="text-center p-3 bg-[#a8bba3]/10 rounded-lg">
                <div className="text-2xl mb-1">🎁</div>
                <div className="text-xs text-white/70 font-bold">3 Free Legendaries</div>
              </div>
              <div className="text-center p-3 bg-[#a8bba3]/10 rounded-lg">
                <div className="text-2xl mb-1">💰</div>
                <div className="text-xs text-white/70 font-bold">50% OFF Forever</div>
              </div>
              <div className="text-center p-3 bg-[#a8bba3]/10 rounded-lg">
                <div className="text-2xl mb-1">🔒</div>
                <div className="text-xs text-white/70 font-bold">Priority Support</div>
              </div>
              <div className="text-center p-3 bg-[#a8bba3]/10 rounded-lg">
                <div className="text-2xl mb-1">⚡</div>
                <div className="text-xs text-white/70 font-bold">Beta Access</div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name (optional)
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="input relative z-10"
                style={{ pointerEvents: 'auto' }}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email <span className="text-cotton-rose-400">*</span>
              </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="input relative z-10"
                style={{ pointerEvents: 'auto' }}
              />
            </div>

            {error && (
              <motion.p
                initial={enableAnimations ? { opacity: 0, y: -10 } : undefined}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                'btn-primary w-full text-lg',
                isLoading && 'opacity-50 cursor-not-allowed'
              )}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Joining...
                </span>
              ) : (
                'Join the Waitlist →'
              )}
            </button>
          </form>

          <p className="text-center text-white/40 text-sm mt-6">
            By joining, you agree to receive updates about Poop Tracker.
            <br />
            No spam, we promise! 💩✨
          </p>
        </motion.div>
      </div>
    </section>
  );
}

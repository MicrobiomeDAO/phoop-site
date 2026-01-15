'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/config/siteConfig';

export function UrgencyBanner() {
  if (!siteConfig.features.showUrgencyBanner) return null;
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    days: 7,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Countdown timer
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#ffa239] to-[#ff8c1a] shadow-lg"
        >
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-white font-extrabold text-sm md:text-base">
                🔥 {siteConfig.content.urgencyMessage}
              </span>
              <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
                <span className="text-white text-xs md:text-sm font-bold">
                  ⏰ {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
                </span>
              </div>
              <span className="text-white/90 text-xs md:text-sm">
                Only <span className="font-bold text-white">{siteConfig.content.spotsLeft}</span> left!
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={scrollToWaitlist}
                className="bg-white text-[#ffa239] font-extrabold px-4 md:px-6 py-2 rounded-lg hover:bg-white/90 transition-all text-sm md:text-base shadow-lg hover:scale-105"
              >
                Claim 50% OFF →
              </button>
              <button
                onClick={() => setIsVisible(false)}
                className="text-white hover:text-white/80 transition-colors p-1"
                aria-label="Close banner"
              >
                ✕
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

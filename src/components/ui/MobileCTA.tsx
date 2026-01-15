'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function MobileCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after scrolling 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-4 bg-gradient-to-t from-[#97A87A] to-transparent pointer-events-none"
        >
          <button
            onClick={scrollToWaitlist}
            className="w-full bg-[#ffa239] hover:bg-[#ff8c1a] text-white dark:text-black font-extrabold text-lg py-4 rounded-xl shadow-2xl shadow-[#ffa239]/50 hover:shadow-[#ffa239]/70 transition-all duration-300 pointer-events-auto flex items-center justify-center gap-2"
          >
            <span>🚀 Join Waitlist - 50% OFF</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

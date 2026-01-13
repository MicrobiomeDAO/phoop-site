'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling past hero section (roughly 80vh)
      setIsVisible(window.scrollY > window.innerHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToWaitlist = () => {
    const element = document.getElementById('waitlist');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToWaitlist}
          className="fixed bottom-8 right-8 z-50 bg-[#ffa239] hover:bg-[#ff8c1a] text-white font-heading font-bold py-3 px-6 rounded-lg shadow-2xl shadow-[#ffa239]/30 hover:shadow-[#ffa239]/50 transition-all duration-300"
        >
          <span className="flex items-center gap-2">
            <span>Join Waitlist</span>
            <span className="text-xl">✨</span>
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

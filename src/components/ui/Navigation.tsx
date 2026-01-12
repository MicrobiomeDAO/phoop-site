'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useAnimationFlag, useLightModeEnabled } from '@/config/animations';
import Image from 'next/image';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const enableAnimations = useAnimationFlag('sectionTransitions');
  const lightModeEnabled = useLightModeEnabled();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'How it Works', href: '#how-it-works' },
    { label: 'Features', href: '#features' },
    { label: 'Monsters', href: '#monsters' },
    { 
      label: 'Marketplace', 
      href: '#marketplace', 
      comingSoon: true,
      tooltip: 'Users will be able to buy gut health tests or probiotics that might improve their gut health at a discounted price.'
    },
  ];

  const scrollToWaitlist = () => {
    const element = document.getElementById('waitlist');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        initial={enableAnimations ? { y: -100 } : undefined}
        animate={{ y: 0 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled 
            ? 'bg-background/95 backdrop-blur-xl border-b border-gold/20 shadow-lg shadow-gold/5' 
            : 'bg-gradient-to-b from-background/90 via-background/80 to-transparent backdrop-blur-md border-b border-white/5'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2 group">
              <div className="relative w-10 h-10 transition-transform group-hover:scale-110 duration-300">
                <Image
                  src="/assets/logos/phoop-logos.jpg"
                  alt="phoop"
                  fill
                  className="object-contain drop-shadow-lg"
                />
              </div>
              <span className="font-heading font-bold text-xl hidden sm:block bg-gradient-to-r from-white via-gold/90 to-white bg-clip-text text-transparent">phoop</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <nav className="flex items-center gap-6">
                {navItems.map((item) => (
                  <div key={item.href} className="relative group">
                    <a
                      href={item.href}
                      className={cn(
                        'font-body font-medium transition-all duration-200 relative',
                        'text-white/80 hover:text-gold',
                        item.comingSoon && 'cursor-help'
                      )}
                    >
                      <span className="flex items-center gap-2">
                        {item.label}
                        {item.comingSoon && (
                          <span className="text-[10px] px-2 py-0.5 bg-gradient-to-r from-purple/30 to-pink/30 text-purple border border-purple/30 rounded-full font-bold animate-pulse">
                            SOON
                          </span>
                        )}
                      </span>
                      {/* Hover underline */}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gold to-purple transition-all duration-300 group-hover:w-full" />
                    </a>
                    {item.tooltip && (
                      <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-72 p-4 bg-gradient-to-br from-surface to-surface/95 border border-gold/20 rounded-xl shadow-2xl shadow-gold/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none z-50 backdrop-blur-xl">
                        <p className="text-sm text-white/90 leading-relaxed">{item.tooltip}</p>
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-surface border-l border-t border-gold/20 rotate-45" />
                      </div>
                    )}
                  </div>
                ))}
              </nav>
              
              {/* Separator */}
              <div className="w-px h-6 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
              
              {/* Join Waitlist Button */}
              <button
                onClick={scrollToWaitlist}
                className="btn-primary px-6 py-2.5 text-sm font-bold relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Join Waitlist
                  <span className="text-lg group-hover:rotate-12 transition-transform duration-300">✨</span>
                </span>
                {/* Animated shine effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </button>
              
              {/* Theme Toggle - Only shown when light mode is enabled */}
              {lightModeEnabled && (
                <button
                  className="p-2 rounded-full bg-surface/50 hover:bg-surface transition-all duration-300 hover:scale-110"
                  aria-label="Theme toggle placeholder"
                >
                  🌙
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 md:hidden">
              {/* Mobile Theme Toggle - Only shown when light mode is enabled */}
              {lightModeEnabled && (
                <button
                  className="p-2 rounded-full bg-surface"
                  aria-label="Theme toggle placeholder"
                >
                  🌙
                </button>
              )}
              
              <button
                className="text-white"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={enableAnimations ? { opacity: 0, height: 0 } : undefined}
            animate={{ opacity: 1, height: 'auto' }}
            exit={enableAnimations ? { opacity: 0, height: 0 } : undefined}
            className="md:hidden fixed top-16 left-0 right-0 bg-gradient-to-b from-surface to-surface/95 backdrop-blur-xl border-b border-gold/10 shadow-2xl"
          >
            <div className="px-4 py-6 space-y-4 max-h-[80vh] overflow-y-auto">
              {navItems.map((item) => (
                <div key={item.href}>
                  <a
                    href={item.href}
                    className="block font-body font-medium text-white/80 hover:text-gold transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="flex items-center justify-between">
                      {item.label}
                      {item.comingSoon && (
                        <span className="text-[10px] px-2 py-0.5 bg-gradient-to-r from-purple/30 to-pink/30 text-purple border border-purple/30 rounded-full font-bold ml-2">
                          SOON
                        </span>
                      )}
                    </span>
                  </a>
                  {item.tooltip && (
                    <p className="text-xs text-white/60 mt-2 pl-3 border-l-2 border-purple/30 leading-relaxed">
                      {item.tooltip}
                    </p>
                  )}
                </div>
              ))}
              
              {/* Mobile Join Waitlist Button */}
              <div className="pt-4 border-t border-white/10">
                <button
                  onClick={() => {
                    scrollToWaitlist();
                    setIsMobileMenuOpen(false);
                  }}
                  className="btn-primary w-full text-center py-3 text-base font-bold"
                >
                  <span className="flex items-center justify-center gap-2">
                    Join Waitlist
                    <span className="text-lg">✨</span>
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

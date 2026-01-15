'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useAnimationFlag, useLightModeEnabled } from '@/config/animations';
import { useTheme } from '@/contexts/ThemeContext';
import { siteConfig } from '@/config/siteConfig';
import Image from 'next/image';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const enableAnimations = useAnimationFlag('sectionTransitions');
  const lightModeEnabled = useLightModeEnabled();
  const { theme } = useTheme();

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
    // { label: 'Monsters', href: '#monsters' },
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

  const bannerOffset = siteConfig.features.showUrgencyBanner ? 'top-12 md:top-14' : 'top-0';

  return (
    <>
      {/* Spacer for urgency banner */}
      {siteConfig.features.showUrgencyBanner && <div className="h-12 md:h-14" />}

      <motion.header
        initial={enableAnimations ? { y: -100 } : undefined}
        animate={{ y: 0 }}
        className={cn(
          'fixed left-0 right-0 z-50 transition-all duration-300',
          bannerOffset,
          isScrolled
            ? 'bg-[#f9b3bd]/95 dark:bg-black/95 backdrop-blur-xl border-b border-[#f9b3bd] dark:border-[rgb(249,179,189)]/30 shadow-lg shadow-[#f9b3bd]/20 dark:shadow-[rgb(249,179,189)]/20'
            : 'bg-[#f9b3bd]/90 dark:bg-black/90 backdrop-blur-md border-b border-white/5 dark:border-[rgb(249,179,189)]/20'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2 group relative">
              {/* Glow effect removed for cleaner aesthetic */}
                <div className="relative w-10 h-10 transition-transform group-hover:scale-110 duration-300">
                  <Image
                    src="/assets/logos/poop-logo.png"
                    alt="Phoop"
                    fill
                    priority
                    className={cn(
                      "object-contain drop-shadow-lg",
                      theme === 'light' ? "light-mode-logo" : "dark-mode-logo"
                    )}
                    onError={(e) => {
                      console.warn('Logo image failed to load:', e);
                      // Optionally set a fallback src or hide the image
                    }}
                  />
                </div>
              <span className="font-heading font-bold text-2xl hidden sm:block text-[#6d3e0f] dark:text-[rgb(249,179,189)]">Phoop</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <nav className="flex items-center gap-6">
                {navItems.map((item) => (
                  <div key={item.href} className="relative group">
                    <a
                      href={item.href}
                      className={cn(
                        'font-body font-extrabold transition-all duration-200 relative',
                        'text-[#a56a31] hover:text-[#8a5628] dark:text-[rgb(249,179,189)] dark:hover:text-[rgb(255,199,209)]',
                        item.comingSoon && 'cursor-help'
                      )}
                    >
                      <span className="flex items-center gap-2">
                        {item.label}
                        {item.comingSoon && (
                          <span className="text-[10px] px-2 py-0.5 bg-[#ffa239]/20 dark:bg-black text-[#a56a31] dark:text-[rgb(249,179,189)] border-2 border-purple-500 dark:border-[rgb(249,179,189)] rounded-full font-bold animate-pulse">
                            soon
                          </span>
                        )}
                      </span>
                      {/* Hover underline */}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#a56a31] dark:bg-[rgb(249,179,189)] transition-all duration-300 group-hover:w-full" />
                    </a>
                    {item.tooltip && (
                      <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-72 p-4 bg-surface/95 border border-[#a56a31]/20 rounded-xl shadow-2xl shadow-[#a56a31]/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none z-50 backdrop-blur-xl">
                        <p className="text-sm text-white/90 leading-relaxed">{item.tooltip}</p>
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-surface border-l border-t border-gold/20 rotate-45" />
                      </div>
                    )}
                  </div>
                ))}
              </nav>
              
              {/* Separator */}
              <div className="w-px h-6 bg-[#a56a31]/30 dark:bg-[rgb(249,179,189)]/30" />
              
              {/* Join Waitlist Button */}
              <button
                onClick={scrollToWaitlist}
                className="bg-[#a56a31] hover:bg-[#8a5628] dark:bg-black dark:hover:bg-gray-900 px-6 py-2.5 text-sm font-bold relative overflow-hidden group rounded-lg transition-all duration-300 text-white dark:text-[rgb(249,179,189)] border-2 border-transparent dark:border-[rgb(249,179,189)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Join Waitlist
                </span>
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
                className="text-white dark:text-[rgb(249,179,189)]"
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
            className={cn(
              "md:hidden fixed left-0 right-0 bg-surface/95 dark:bg-black/95 backdrop-blur-xl border-b border-[#a56a31]/10 dark:border-[rgb(249,179,189)]/20 shadow-2xl",
              siteConfig.features.showUrgencyBanner ? "top-16" : "top-16 md:top-16"
            )}
          >
            <div className="px-4 py-6 space-y-4 max-h-[80vh] overflow-y-auto">
              {navItems.map((item) => (
                <div key={item.href}>
                  <a
                    href={item.href}
                    className="block font-body font-extrabold text-[#a56a31] hover:text-[#8a5628] dark:text-[rgb(249,179,189)] dark:hover:text-[rgb(255,199,209)] transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="flex items-center justify-between">
                      {item.label}
                      {item.comingSoon && (
                        <span className="text-[10px] px-2 py-0.5 bg-[#ffa239]/20 dark:bg-black text-[#a56a31] dark:text-[rgb(249,179,189)] border-2 border-purple-500 dark:border-[rgb(249,179,189)] rounded-full font-bold ml-2">
                          SOON
                        </span>
                      )}
                    </span>
                  </a>
                  {item.tooltip && (
                    <p className="text-xs text-white/60 mt-2 pl-3 border-l-2 border-honey-bronze-600/30 leading-relaxed">
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

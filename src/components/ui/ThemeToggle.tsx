'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useAnimationFlag } from '@/config/animations';

export function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();
  const enableAnimations = useAnimationFlag('buttonHover');

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return null;
  }

  return (
    <motion.button
      onClick={toggleTheme}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={enableAnimations ? { scale: 1.1 } : undefined}
      whileTap={enableAnimations ? { scale: 0.95 } : undefined}
      className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-gradient-to-br from-[#ffa239] to-[#ff8c0a] dark:from-yellow-400 dark:to-yellow-500 shadow-lg hover:shadow-2xl transition-all duration-300 group"
      aria-label="Toggle theme"
    >
      <div className="relative w-6 h-6">
        {/* Light mode icon (sun) */}
        <motion.svg
          className="absolute inset-0 w-6 h-6 text-white dark:text-transparent"
          initial={false}
          animate={{
            scale: theme === 'light' ? 1 : 0,
            rotate: theme === 'light' ? 0 : 180,
            opacity: theme === 'light' ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </motion.svg>

        {/* Dark mode icon (moon) */}
        <motion.svg
          className="absolute inset-0 w-6 h-6 text-transparent dark:text-black"
          initial={false}
          animate={{
            scale: theme === 'dark' ? 1 : 0,
            rotate: theme === 'dark' ? 0 : -180,
            opacity: theme === 'dark' ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </motion.svg>
      </div>

      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-black/80 dark:bg-yellow-500/90 text-white dark:text-black text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      </div>
    </motion.button>
  );
}

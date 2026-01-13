'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    // Phase 1: Logo appears with glow
    const phase1Timer = setTimeout(() => {
      setAnimationPhase(1);
    }, 100);

    // Phase 2: Full animation
    const phase2Timer = setTimeout(() => {
      setAnimationPhase(2);
    }, 800);

    // Start fade out (after 3.5 seconds of full visibility)
    const fadeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 3500);

    // Complete splash screen
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 4000);

    return () => {
      clearTimeout(phase1Timer);
      clearTimeout(phase2Timer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  if (!isVisible && animationPhase === 2) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-linen-900 via-honey-bronze-900 via-cotton-rose-950 to-black transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-float-particle"
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        ))}
      </div>

      {/* Scanning lines effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="h-full w-full animate-scan-lines bg-gradient-to-b from-transparent via-honey-bronze-400 to-transparent" />
      </div>

      {/* Main logo container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Outer rotating ring */}
        <div
          className={`absolute inset-0 transition-all duration-1000 ${
            animationPhase >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
        >
          <div className="absolute -inset-16 rounded-full border-2 border-honey-bronze-400/30 animate-spin-slow" />
          <div className="absolute -inset-20 rounded-full border border-muted-teal-500/20 animate-spin-slower-reverse" />
          <div className="absolute -inset-24 rounded-full border border-honey-bronze-600/10 animate-spin-slowest" />
        </div>

        {/* Logo with glow effect */}
        <div
          className={`relative transition-all duration-700 ${
            animationPhase >= 1
              ? 'opacity-100 scale-100 rotate-0'
              : 'opacity-0 scale-150 rotate-180'
          }`}
        >
          {/* Pulsing glow layers */}
          <div className="absolute inset-0 -m-8">
            <div className="w-full h-full rounded-full bg-honey-bronze-400/20 blur-3xl animate-pulse-glow" />
          </div>
          <div className="absolute inset-0 -m-12">
            <div className="w-full h-full rounded-full bg-muted-teal-500/10 blur-3xl animate-pulse-glow-delayed" />
          </div>

          {/* Main logo */}
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <Image
              src="/assets/logos/phoop.png"
              alt="PHOOP"
              width={320}
              height={320}
              priority
              className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(241,154,14,0.5)]"
            />
          </div>

          {/* Holographic scan effect */}
          <div
            className={`absolute inset-0 bg-gradient-to-b from-transparent via-honey-bronze-400/30 to-transparent animate-scan-vertical ${
              animationPhase >= 2 ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>

        {/* Loading text */}
        <div
          className={`mt-8 transition-all duration-500 delay-300 ${
            animationPhase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="flex items-center space-x-2">
            <div className="text-honey-bronze-400 text-xl font-heading tracking-wider animate-pulse-text">
              INITIALIZING
            </div>
            <div className="flex space-x-1">
              <span className="w-2 h-2 bg-honey-bronze-400 rounded-full animate-dot-pulse" />
              <span className="w-2 h-2 bg-honey-bronze-400 rounded-full animate-dot-pulse animation-delay-200" />
              <span className="w-2 h-2 bg-honey-bronze-400 rounded-full animate-dot-pulse animation-delay-400" />
            </div>
          </div>
        </div>

        {/* Hexagonal grid pattern overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse">
                <path
                  d="M25,0 L50,14.4 L50,28.9 L25,43.4 L0,28.9 L0,14.4 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-honey-bronze-400"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexagons)" />
          </svg>
        </div>
      </div>

      {/* Corner accent lines */}
      <div className="absolute top-8 left-8 w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-honey-bronze-400 to-transparent animate-expand-horizontal" />
        <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-honey-bronze-400 to-transparent animate-expand-vertical" />
      </div>
      <div className="absolute top-8 right-8 w-16 h-16">
        <div className="absolute top-0 right-0 w-full h-0.5 bg-gradient-to-l from-honey-bronze-400 to-transparent animate-expand-horizontal" />
        <div className="absolute top-0 right-0 w-0.5 h-full bg-gradient-to-b from-honey-bronze-400 to-transparent animate-expand-vertical" />
      </div>
      <div className="absolute bottom-8 left-8 w-16 h-16">
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-honey-bronze-400 to-transparent animate-expand-horizontal" />
        <div className="absolute bottom-0 left-0 w-0.5 h-full bg-gradient-to-t from-honey-bronze-400 to-transparent animate-expand-vertical" />
      </div>
      <div className="absolute bottom-8 right-8 w-16 h-16">
        <div className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-l from-honey-bronze-400 to-transparent animate-expand-horizontal" />
        <div className="absolute bottom-0 right-0 w-0.5 h-full bg-gradient-to-t from-honey-bronze-400 to-transparent animate-expand-vertical" />
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { Hero } from '@/components/ui/Hero';
import { Features } from '@/components/ui/Features';
import { ConceptFlow } from '@/components/concepts/ConceptFlow';
import { ValueProposition } from '@/components/concepts/ValueProposition';
import { WaitlistForm } from '@/components/ui/WaitlistForm';
import { Footer } from '@/components/ui/Footer';
import { Navigation } from '@/components/ui/Navigation';
import { SplashScreen } from '@/components/ui/SplashScreen';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [hasVisited, setHasVisited] = useState(false);

  useEffect(() => {
    // Check if user has already visited
    const visited = sessionStorage.getItem('phoop-visited');
    if (visited) {
      setShowSplash(false);
      setHasVisited(true);
    }
  }, []);

  const handleSplashComplete = () => {
    sessionStorage.setItem('phoop-visited', 'true');
    setShowSplash(false);
    setHasVisited(true);
  };

  if (showSplash && !hasVisited) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <ConceptFlow />
      <ValueProposition />
      <Features />
      <WaitlistForm />
      <Footer />
    </main>
  );
}

// Animation Flag Configuration
// All animations can be enabled/disabled via these flags

// Feature Flags - Global application features that can be toggled
export const featureConfig = {
  // Theme System
  lightModeEnabled: false, // Set to true to enable light mode toggle
  
  // 3D Animations
  monsterFloat: { enabled: true, intensity: 1.0 },
  monsterHover: { enabled: true, scale: 1.2, duration: 0.3 },
  monsterClick: { enabled: true, animation: 'spin' },
  toiletAnimation: { enabled: true, flushOnClick: true },
  emergingMonsters: { enabled: true, count: 5, interval: 2000 },
  
  // Particle Effects
  poopParticles: { enabled: true, density: 20, fallSpeed: 1.5 },
  sparkleEffects: { enabled: true, density: 15 },
  confettiOnSubmit: { enabled: true, colors: ['#FFD700', '#8B5CF6', '#10B981'] },
  xpGainParticles: { enabled: true },
  
  // Scroll Animations
  scrollParallax: { enabled: true, factor: 0.1 },
  scrollTriggerFade: { enabled: true },
  scrollProgressBar: { enabled: true },
  sectionTransitions: { enabled: true, type: 'fade-up' },
  
  // UI Animations
  buttonHover: { enabled: true, scale: 1.05 },
  buttonClick: { enabled: true, bounce: true },
  inputFocus: { enabled: true, borderColor: true },
  waitlistSuccess: { enabled: true, animation: 'celebration' },
  
  // Mouse Interactions
  mouseParallax: { enabled: true, factor: 0.02 },
  cursorFollower: { enabled: false },
  hoverGlow: { enabled: true, color: '#FFD700' },
  
  // Concept Flow
  conceptFlowTransition: { enabled: true, duration: 0.3 },
  conceptStepAnimation: { enabled: true },
  valuePropReveal: { enabled: true },
  cardFlipAnimation: { enabled: true },
} as const;

// Animation config for backward compatibility
export const animationConfig = featureConfig;

export type AnimationKey = keyof typeof animationConfig;

// Helper to check if animation is enabled
export const isEnabled = (key: AnimationKey): boolean => {
  const value = animationConfig[key];
  return (value as { enabled?: boolean }).enabled ?? true;
};

// Helper to get animation settings
export const getAnimationSettings = <K extends AnimationKey>(key: K) => {
  return animationConfig[key];
};

// Hook for using animation flags in components
export function useAnimationFlag<K extends AnimationKey>(key: K): boolean {
  if (typeof window === 'undefined') {
    const value = animationConfig[key];
    return (value as { enabled?: boolean }).enabled ?? true;
  }
  
  const value = animationConfig[key];
  return (value as { enabled?: boolean }).enabled ?? true;
}

// Hook to check if light mode is enabled
export function useLightModeEnabled(): boolean {
  return featureConfig.lightModeEnabled;
}

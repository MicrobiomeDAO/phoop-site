# Phoop Site - Web3 Landing Page Architecture Plan

## Core Principle: Modular & Reusable Components

Every component follows these principles:
- **Single Responsibility**: Each component does one thing well
- **Composition Over Inheritance**: Build complex UIs from simple parts
- **Prop-Driven Configuration**: All behavior controlled via props
- **Self-Contained**: Components include their own styles and logic
- **Export Public Interfaces**: Clear API for consumers

## Component Library Architecture

```
src/components/
├── primitives/                    # Base-level reusable primitives
│   ├── Button/
│   │   ├── Button.tsx            # Primary button with variants
│   │   ├── Button.types.ts       # TypeScript interfaces
│   │   └── index.ts              # Exports
│   ├── Input/
│   │   ├── Input.tsx             # Text input with validation
│   │   ├── Input.types.ts
│   │   └── index.ts
│   ├── Card/
│   │   ├── Card.tsx              # Content container
│   │   ├── Card.types.ts
│   │   └── index.ts
│   └── Container/
│       ├── Container.tsx         # Layout wrapper
│       └── index.ts
│
├── animation/                    # Animation primitives
│   ├── Fade/
│   │   ├── Fade.tsx              # Fade in/out
│   │   ├── Fade.types.ts
│   │   └── index.ts
│   ├── Scale/
│   │   ├── Scale.tsx             # Scale animation
│   │   ├── Scale.types.ts
│   │   └── index.ts
│   ├── Slide/
│   │   ├── Slide.tsx             # Slide from direction
│   │   ├── Slide.types.ts
│   │   └── index.ts
│   └── Spring/
│       ├── Spring.tsx            # Spring physics animation
│       ├── Spring.types.ts
│       └── index.ts
│
├── 3d/                           # 3D components (React Three Fiber)
│   ├── Canvas/
│   │   ├── CanvasWrapper.tsx     # Main 3D canvas
│   │   ├── CanvasWrapper.types.ts
│   │   └── index.ts
│   ├── Scene/
│   │   ├── Scene.tsx             # Scene container
│   │   ├── Scene.types.ts
│   │   └── index.ts
│   ├── Camera/
│   │   ├── Camera.tsx            # Configurable camera
│   │   └── index.ts
│   ├── Lights/
│   │   ├── Lights.tsx            # Light presets
│   │   ├── Lights.types.ts
│   │   └── index.ts
│   ├── Mesh/
│   │   ├── Mesh.tsx              # Base mesh wrapper
│   │   ├── Mesh.types.ts
│   │   └── index.ts
│   └── Text3D/
│       ├── Text3D.tsx            # 3D text component
│       └── index.ts
│
├── game/                         # Game-specific components
│   ├── Monster/
│   │   ├── Monster.tsx           # Poop monster with all variants
│   │   ├── Monster.types.ts      # Type definitions
│   │   ├── Monster.utils.ts      # Helper functions
│   │   ├── useMonster.ts         # Hook for monster logic
│   │   └── index.ts
│   ├── MonsterField/
│   │   ├── MonsterField.tsx      # Field of floating monsters
│   │   ├── MonsterField.types.ts
│   │   ├── useMonsterField.ts    # Hook for field management
│   │   └── index.ts
│   ├── Toilet/
│   │   ├── Toilet.tsx            # 3D toilet model
│   │   ├── Toilet.types.ts
│   │   ├── useToilet.ts          # Hook for toilet animation
│   │   └── index.ts
│   ├── ParticleSystem/
│   │   ├── ParticleSystem.tsx    # Reusable particle system
│   │   ├── ParticleSystem.types.ts
│   │   ├── emitters/             # Different particle emitters
│   │   │   ├── PoopEmitter.tsx
│   │   │   ├── SparkleEmitter.tsx
│   │   │   └── ConfettiEmitter.tsx
│   │   └── index.ts
│   └── XPBar/
│       ├── XPBar.tsx             # XP progress bar
│       ├── XPBar.types.ts
│       └── index.ts
│
├── concepts/                     # Concept explanation sections (inspired by doopapp.com)
│   ├── ConceptCard/
│   │   ├── ConceptCard.tsx       # Interactive concept explanation card
│   │   ├── ConceptCard.types.ts
│   │   └── index.ts
│   ├── ConceptFlow/
│   │   ├── ConceptFlow.tsx       # Step-by-step flow explanation
│   │   ├── ConceptFlow.types.ts
│   │   ├── steps/                # Individual step components
│   │   │   ├── PoopStep.tsx
│   │   │   ├── FoodStep.tsx
│   │   │   ├── LifestyleStep.tsx
│   │   │   └── MonsterStep.tsx
│   │   └── index.ts
│   ├── ConceptShowcase/
│   │   ├── ConceptShowcase.tsx   # Before/after or comparison showcase
│   │   └── index.ts
│   └── ValueProposition/
│       ├── ValueProposition.tsx  # Why join section
│       └── index.ts
│
├── ui/                           # UI components
│   ├── Hero/
│   │   ├── Hero.tsx              # Hero section
│   │   ├── Hero.types.ts
│   │   ├── Hero.styles.ts        # Scoped styles
│   │   └── index.ts
│   ├── Features/
│   │   ├── Features.tsx          # Features grid
│   │   ├── Features.types.ts
│   │   ├── FeatureCard.tsx       # Individual card
│   │   └── index.ts
│   ├── WaitlistForm/
│   │   ├── WaitlistForm.tsx      # Main form component
│   │   ├── WaitlistForm.types.ts
│   │   ├── EmailInput.tsx        # Email validation
│   │   ├── PositionDisplay.tsx   # Show queue position
│   │   └── index.ts
│   ├── Navigation/
│   │   ├── Navigation.tsx        # Sticky nav
│   │   └── index.ts
│   └── Footer/
│       ├── Footer.tsx
│       └── index.ts
│
├── effects/                      # Effect components
│   ├── Parallax/
│   │   ├── Parallax.tsx          # Parallax container
│   │   ├── Parallax.types.ts
│   │   ├── useParallax.ts        # Hook implementation
│   │   └── index.ts
│   ├── ScrollReveal/
│   │   ├── ScrollReveal.tsx      # Reveal on scroll
│   │   ├── ScrollReveal.types.ts
│   │   └── index.ts
│   ├── MouseFollow/
│   │   ├── MouseFollow.tsx       # Follow cursor
│   │   └── index.ts
│   └── Glow/
│       ├── Glow.tsx              # Glow effect wrapper
│       └── index.ts
│
├── providers/                    # Context providers
│   ├── AnimationProvider.tsx     # Animation flags context
│   ├── ThemeProvider.tsx         # Theme context
│   └── index.ts
│
└── index.ts                      # Main exports
```

## Concept Explanation Sections

### Design Philosophy (Inspired by doopapp.com)

The key to explaining complex concepts is:
1. **Visual First**: Use 3D animations to show, not just tell
2. **Step-by-Step Flow**: Break down the experience into digestible steps
3. **Interactive Exploration**: Let users hover/click to learn more
4. **Relatable Analogies**: Compare to familiar experiences
5. **Immediate Value**: Show benefits before asking for sign-up

### ConceptFlow Component

```typescript
// src/components/concepts/ConceptFlow/ConceptFlow.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ConceptFlowProps, ConceptStep } from './ConceptFlow.types';
import { PoopStep } from './steps/PoopStep';
import { FoodStep } from './steps/FoodStep';
import { LifestyleStep } from './steps/LifestyleStep';
import { MonsterStep } from './steps/MonsterStep';
import styles from './ConceptFlow.module.css';

const STEP_COMPONENTS: Record<ConceptStep['type'], React.ComponentType<{ step: ConceptStep }>> = {
  poop: PoopStep,
  food: FoodStep,
  lifestyle: LifestyleStep,
  monster: MonsterStep,
};

export function ConceptFlow({
  steps,
  onComplete,
  autoPlay = true,
  interval = 5000,
}: ConceptFlowProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  const handleNext = () => {
    setDirection('next');
    setActiveIndex((prev) => {
      const next = prev + 1;
      if (next >= steps.length) {
        onComplete?.();
        return prev;
      }
      return next;
    });
  };

  const handlePrev = () => {
    setDirection('prev');
    setActiveIndex((prev) => Math.max(0, prev - 1));
  };

  const handleDotClick = (index: number) => {
    setDirection(index > activeIndex ? 'next' : 'prev');
    setActiveIndex(index);
  };

  const ActiveStepComponent = STEP_COMPONENTS[steps[activeIndex].type];

  return (
    <div className={styles.container}>
      <div className={styles.stepIndicator}>
        {steps.map((step, index) => (
          <button
            key={step.id}
            className={`${styles.dot} ${index === activeIndex ? styles.activeDot : ''}`}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to step ${index + 1}`}
          >
            {step.icon}
          </button>
        ))}
      </div>

      <div className={styles.stepContent}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: direction === 'next' ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction === 'next' ? -50 : 50 }}
            transition={{ duration: 0.3 }}
            className={styles.stepWrapper}
          >
            <ActiveStepComponent step={steps[activeIndex]} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={styles.navigation}>
        <button onClick={handlePrev} disabled={activeIndex === 0} className={styles.navButton}>
          ← Previous
        </button>
        <span className={styles.stepCount}>
          {activeIndex + 1} / {steps.length}
        </span>
        <button onClick={handleNext} disabled={activeIndex === steps.length - 1} className={styles.navButton}>
          Next →
        </button>
      </div>
    </div>
  );
}
```

### Concept Step Components

```typescript
// src/components/concepts/ConceptFlow/steps/PoopStep.tsx
'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Canvas } from '@/components/3d/Canvas';
import { Monster } from '@/components/game/Monster';
import { motion } from 'framer-motion';
import styles from './PoopStep.module.css';

interface PoopStepProps {
  step: {
    id: string;
    title: string;
    description: string;
    benefits: string[];
  };
}

export function PoopStep({ step }: PoopStepProps) {
  return (
    <div className={styles.container}>
      <div className={styles.visual}>
        <Canvas>
          <Monster type="type1" position={[0, 0, 0]} isInteractive />
        </Canvas>
      </div>
      
      <div className={styles.content}>
        <h2 className={styles.title}>{step.title}</h2>
        <p className={styles.description}>{step.description}</p>
        
        <ul className={styles.benefits}>
          {step.benefits.map((benefit, index) => (
            <motion.li
              key={benefit}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={styles.benefit}
            >
              <span className={styles.checkmark}>✓</span>
              {benefit}
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

### Value Proposition Section

```typescript
// src/components/concepts/ValueProposition/ValueProposition.tsx
'use client';

import { motion } from 'framer-motion';
import styles from './ValueProposition.module.css';

const VALUE_PROPS = [
  {
    icon: '📊',
    title: 'Track Your Health',
    description: 'Understand your digestive patterns with detailed analytics and insights.',
    stat: '10M+ logs tracked',
  },
  {
    icon: '👾',
    title: 'Collect Monsters',
    description: 'Every poop entry is a chance to discover rare and legendary monsters.',
    stat: '7 unique types',
  },
  {
    icon: '⭐',
    title: 'Earn XP',
    description: 'Level up your health journey with gamified tracking and achievements.',
    stat: 'Unlimited levels',
  },
  {
    icon: '🍎',
    title: 'Food & Lifestyle',
    description: 'Correlate your diet and habits with your digestive health.',
    stat: 'AI-powered insights',
  },
];

export function ValueProposition() {
  return (
    <section className={styles.container}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={styles.heading}
      >
        Why Join the Poop Tracker Revolution?
      </motion.h2>

      <div className={styles.grid}>
        {VALUE_PROPS.map((prop, index) => (
          <motion.div
            key={prop.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={styles.card}
          >
            <div className={styles.icon}>{prop.icon}</div>
            <h3 className={styles.cardTitle}>{prop.title}</h3>
            <p className={styles.cardDescription}>{prop.description}</p>
            <div className={styles.stat}>{prop.stat}</div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className={styles.cta}
      >
        <p className={styles.ctaText}>
          Join <strong>10,000+</strong> health-conscious people waiting for early access
        </p>
        <a href="#waitlist" className={styles.ctaButton}>
          Join the Waitlist →
        </a>
      </motion.div>
    </section>
  );
}
```

### ConceptCard Component

```typescript
// src/components/concepts/ConceptCard/ConceptCard.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ConceptCardProps } from './ConceptCard.types';
import styles from './ConceptCard.module.css';

export function ConceptCard({
  title,
  subtitle,
  frontContent,
  backContent,
  icon,
  onAction,
}: ConceptCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped) {
      onAction?.();
    }
  };

  return (
    <div className={styles.cardContainer} onClick={handleClick}>
      <motion.div
        className={styles.card}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className={styles.front} style={{ backfaceVisibility: 'hidden' }}>
          <div className={styles.icon}>{icon}</div>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.subtitle}>{subtitle}</p>
          <span className={styles.hint}>Click to learn more →</span>
        </div>

        <div
          className={styles.back}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {backContent}
        </div>
      </motion.div>
    </div>
  );
}
```

## Page Sections

### 1. Hero Section
- **3D Element**: Central toilet scene with emerging monsters
- **Headline**: "Track Your Digestive Health. Collect Poop Monsters. Level Up."
- **Subhead**: "The fun way to understand your body"
- **CTA**: "Join the Waitlist" (scrolls to form)
- **Social Proof**: "X people already waiting"

### 2. Concept Flow Section (Doopapp.com Inspired)
This section explains the app's core concepts:
- **Step 1 - Poop Tracking**: "Snap a photo, get instant analysis"
- **Step 2 - Food Logging**: "Track what you eat, see patterns emerge"
- **Step 3 - Lifestyle Habits**: "Connect habits to health outcomes"
- **Step 4 - Monster Collection**: "Earn XP, unlock rare monsters"

### 3. Value Proposition Section
- Grid of 4 cards showing key benefits
- Each card has icon, title, description, and stat
- Animations on scroll

### 4. XP & Gamification Section
- Interactive XP bar showing levels
- Explains the gamification system
- Shows sample monster collection

### 5. Monster Showcase Section
- 3D carousel of all monster types
- Shows rarity levels (Common → Legendary)
- Interactive hover effects

### 6. Waitlist Section
- Email input with validation
- Shows position in queue
- Confetti celebration on submit
- "X joined today" social proof

### 7. Footer
- Links to app, privacy policy, social media
- Discord/Twitter links

## Animation Flag System

```typescript
// src/config/animations.ts
import { createFlagSystem, FlagSystem } from '@/lib/flag-system';

export type AnimationFlag = boolean;

// All animations with default enabled state
const animations = {
  // 3D Animations
  monsterFloat: true,
  monsterHover: true,
  monsterClick: true,
  toiletAnimation: true,
  emergingMonsters: true,
  
  // Particles
  poopParticles: true,
  sparkleEffects: true,
  confettiOnSubmit: true,
  xpGainParticles: true,
  
  // Scroll
  scrollParallax: true,
  scrollTriggerFade: true,
  scrollProgressBar: true,
  sectionTransitions: true,
  
  // UI
  buttonHover: true,
  buttonClick: true,
  inputFocus: true,
  waitlistSuccess: true,
  mouseParallax: true,
  hoverGlow: true,
  
  // Concept Flow
  conceptFlowTransition: true,
  conceptStepAnimation: true,
  valuePropReveal: true,
  cardFlipAnimation: true,
} as const;

export type AnimationKey = keyof typeof animations;

// Reusable hook for animation flags
export function useAnimationFlag<K extends AnimationKey>(key: K): boolean {
  const flags = useAnimationFlags();
  return flags[key];
}
```

## Database Schema (Supabase)

```sql
-- Waitlist table
CREATE TABLE waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  source TEXT DEFAULT 'website',
  referred_by TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'notified', 'invited')),
  position INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Analytics table for tracking conversions
CREATE TABLE waitlist_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for fast lookups
CREATE INDEX idx_waitlist_email ON waitlist(email);
CREATE INDEX idx_waitlist_status ON waitlist(status);
CREATE INDEX idx_waitlist_created_at ON waitlist(created_at);
```

## Project Structure

```
phoop-site/
├── src/
│   ├── components/
│   │   ├── primitives/          # Button, Input, Card, Container
│   │   ├── animation/           # Fade, Scale, Slide, Spring
│   │   ├── 3d/                  # Canvas, Scene, Camera, Lights, Mesh
│   │   ├── game/                # Monster, Toilet, ParticleSystem, XPBar
│   │   ├── concepts/            # ConceptFlow, ConceptCard, ValueProposition
│   │   ├── ui/                  # Hero, Features, WaitlistForm, Navigation
│   │   ├── effects/             # Parallax, ScrollReveal, MouseFollow, Glow
│   │   └── providers/           # AnimationProvider, ThemeProvider
│   ├── config/
│   │   ├── animations.ts        # Animation flags
│   │   └── theme.ts             # Theme configuration
│   ├── hooks/
│   │   ├── useScroll.ts
│   │   ├── useAnimationFlags.ts
│   │   └── useMonster.ts
│   ├── lib/
│   │   ├── supabase.ts
│   │   ├── flag-system.ts       # Flag system utilities
│   │   └── utils.ts
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── api/waitlist/route.ts
│   └── styles/
│       └── globals.css
├── public/assets/
│   ├── monsters/
│   └── logos/
├── supabase/schema.sql
├── package.json
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

## Key Benefits of This Architecture

1. **Modular Design**: Each component is reusable and self-contained
2. **Concept-First Approach**: Explains app value before asking for sign-up
3. **Interactive Education**: Users learn by interacting, not just reading
4. **Type Safety**: Full TypeScript support with proper interfaces
5. **Animation Control**: All animations can be toggled via flags
6. **Maintainability**: Single responsibility per component file
7. **Performance**: Memoization and lazy loading built-in

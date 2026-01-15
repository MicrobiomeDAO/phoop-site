import { Variants } from 'framer-motion';

// Creative fade-in animations
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -80 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.9,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 80 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.9,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

// Scale and rotate animations
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -5 },
  visible: { 
    opacity: 1, 
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.7,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

export const scaleRotate: Variants = {
  hidden: { opacity: 0, scale: 0.5, rotate: -15 },
  visible: { 
    opacity: 1, 
    scale: 1,
    rotate: 0,
    transition: {
      duration: 1,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

// Flip animations
export const flipIn: Variants = {
  hidden: { opacity: 0, rotateX: -90, transformPerspective: 1000 },
  visible: { 
    opacity: 1, 
    rotateX: 0,
    transition: {
      duration: 1,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

// Bounce animations
export const bounceIn: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 100,
      duration: 1.2
    }
  }
};

// Stagger container for children
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

export const staggerFastContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

// Reveal animations (curtain effect)
export const revealLeft: Variants = {
  hidden: { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
  visible: { 
    opacity: 1, 
    clipPath: 'inset(0 0% 0 0)',
    transition: {
      duration: 1.2,
      ease: [0.6, 0.01, -0.05, 0.95]
    }
  }
};

export const revealRight: Variants = {
  hidden: { opacity: 0, clipPath: 'inset(0 0 0 100%)' },
  visible: { 
    opacity: 1, 
    clipPath: 'inset(0 0 0 0%)',
    transition: {
      duration: 1.2,
      ease: [0.6, 0.01, -0.05, 0.95]
    }
  }
};

// 3D card flip
export const card3D: Variants = {
  hidden: { 
    opacity: 0, 
    rotateY: -45,
    rotateX: 10,
    scale: 0.9,
    transformPerspective: 1000 
  },
  visible: { 
    opacity: 1, 
    rotateY: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      duration: 1,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

// Elastic animations
export const elasticIn: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      damping: 8,
      stiffness: 80,
      restDelta: 0.001
    }
  }
};

// Parallax scroll effects (use with motion.div and scroll progress)
export const parallaxFast = {
  y: [0, -150],
  transition: {
    ease: "linear"
  }
};

export const parallaxSlow = {
  y: [0, -50],
  transition: {
    ease: "linear"
  }
};

// Blur in animation
export const blurIn: Variants = {
  hidden: { opacity: 0, filter: 'blur(20px)' },
  visible: { 
    opacity: 1, 
    filter: 'blur(0px)',
    transition: {
      duration: 1,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

// Wave animation for text
export const waveContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05
    }
  }
};

export const waveLetter: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 200
    }
  }
};

// Viewport options for scroll triggers
export const viewportOptions = {
  once: true,
  amount: 0.3,
  margin: "-100px"
};

export const viewportOptionsEarly = {
  once: true,
  amount: 0.1,
  margin: "-50px"
};

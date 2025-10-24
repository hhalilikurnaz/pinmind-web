// Soft-Motion System for PinMind
// Reusable animation presets for consistent, elegant transitions

export const motionTokens = {
  // Soft fade-in for content loading
  fadeInSoft: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.4, ease: "easeOut" }
  },

  // Fade up for cards and elements
  fadeUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" }
  },

  // Zoom in for page transitions
  zoomInFlow: {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 1.05, opacity: 0 },
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
  },

  // Glow pulse for trending items
  glowPulse: {
    animate: {
      boxShadow: [
        "0 0 0px rgba(56, 189, 248, 0)",
        "0 0 20px rgba(99, 102, 241, 0.6)",
        "0 0 0px rgba(56, 189, 248, 0)",
      ],
    },
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
  },

  // Subtle tilt on hover
  tiltHover: {
    whileHover: { 
      rotate: 1, 
      scale: 1.02, 
      y: -4,
      transition: { duration: 0.2, ease: "easeOut" } 
    },
    whileTap: { scale: 0.98 }
  },

  // Chalk dust exit effect
  dustExit: {
    exit: {
      opacity: 0,
      scale: 1.1,
      filter: "blur(6px)",
      transition: { duration: 0.5, ease: "easeOut" }
    }
  },

  // Stagger container for lists
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  },

  // Stagger item
  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" }
  },

  // Slide in from right (for sidebars)
  slideInRight: {
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 100, opacity: 0 },
    transition: { duration: 0.4, ease: "easeInOut" }
  },

  // Scale up for modals
  scaleUp: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.9, opacity: 0 },
    transition: { duration: 0.3, ease: "easeOut" }
  },

  // Chalk write effect (for new ideas)
  chalkWrite: {
    initial: { opacity: 0, pathLength: 0 },
    animate: { opacity: [0, 1, 0.8], pathLength: 1 },
    transition: { duration: 0.8, ease: "easeOut" }
  },

  // Chalk erase effect (for back navigation)
  chalkErase: {
    exit: {
      opacity: 0,
      filter: ["blur(0px)", "blur(8px)"],
      transition: { duration: 0.9, ease: "easeIn" }
    }
  },

  // Wave slide for typing effect
  waveSlide: {
    animate: {
      x: [-10, 0, 10, 0],
    },
    transition: { repeat: 2, duration: 0.8, ease: "easeInOut" }
  },

  // Slide up from bottom (for feed cards)
  slideUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" }
  },

  // Soft glow pulse (low opacity)
  glowPulseSoft: {
    animate: {
      boxShadow: [
        "0 0 0px rgba(255, 255, 255, 0)",
        "0 0 8px rgba(255, 255, 255, 0.22)",
        "0 0 0px rgba(255, 255, 255, 0)",
      ],
    },
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
  }
};

// Easing functions
export const easings = {
  smooth: [0.4, 0, 0.2, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
  sharp: [0.4, 0, 0.6, 1],
  soft: [0.25, 0.46, 0.45, 0.94]
};

// Duration presets
export const durations = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
  verySlow: 0.8
};

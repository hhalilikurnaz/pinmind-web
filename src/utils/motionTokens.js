// 🪶 Shared Motion Tokens for PinMind
// Used across AgentScene, FlowVisualizer, and IdeaBoard

export const motionTokens = {
  // Chalk writing animation (underlines, reveals)
  chalkWrite: {
    hidden: { 
      scaleX: 0, 
      opacity: 0,
      transformOrigin: 'left'
    },
    visible: { 
      scaleX: 1, 
      opacity: 0.85,
      transition: { 
        duration: 1.2, 
        ease: [0.43, 0.13, 0.23, 0.96] // Custom cubic-bezier
      }
    }
  },

  // Chalk erasing animation (exit, fade)
  chalkErase: {
    exit: {
      opacity: 0,
      scale: 0.9,
      filter: "blur(8px)",
      transition: { 
        duration: 0.6, 
        ease: "easeInOut" 
      }
    }
  },

  // Dust particle exit
  dustExit: {
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.8,
      transition: { 
        duration: 0.5, 
        ease: "easeOut" 
      }
    }
  },

  // SVG line drawing (arrows, connections)
  lineDraw: {
    hidden: { 
      pathLength: 0, 
      opacity: 0 
    },
    visible: { 
      pathLength: 1, 
      opacity: 0.85,
      transition: { 
        duration: 1.5, 
        ease: 'easeInOut' 
      }
    }
  },

  // Glow pulsing effect (buttons, interactive elements)
  glowPulse: {
    animate: {
      filter: [
        'drop-shadow(0 0 8px rgba(197, 228, 208, 0.4))',
        'drop-shadow(0 0 20px rgba(197, 228, 208, 0.8))',
        'drop-shadow(0 0 8px rgba(197, 228, 208, 0.4))'
      ],
      transition: { 
        duration: 2.5, 
        repeat: Infinity, 
        ease: 'easeInOut' 
      }
    }
  },

  // Zoom in flow (mindmap nodes appear)
  zoomInFlow: {
    hidden: { 
      opacity: 0, 
      scale: 0.3,
      filter: 'blur(10px)'
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      filter: 'blur(0px)',
      transition: { 
        duration: 0.8, 
        type: 'spring',
        stiffness: 200,
        damping: 20
      }
    }
  },

  // Soft fade in (general content)
  fadeInSoft: {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: 'easeOut' 
      }
    }
  },

  // Slide from right (cards, modals)
  slideFromRight: {
    hidden: { 
      opacity: 0, 
      x: 100 
    },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        duration: 0.6, 
        ease: 'easeOut' 
      }
    }
  },

  // Parallax depth layers
  parallaxSlow: {
    y: [0, -50],
    transition: { duration: 20, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }
  },

  parallaxMedium: {
    y: [0, -30],
    transition: { duration: 15, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }
  },

  parallaxFast: {
    y: [0, -20],
    transition: { duration: 10, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }
  }
};

// 🎨 Chalkboard color palette
export const chalkboardColors = {
  bg: 'linear-gradient(180deg, #0D0D0D 0%, #1C1C1C 100%)',
  text: '#EDEDED',
  textSoft: 'rgba(237, 237, 237, 0.8)',
  textFaded: 'rgba(237, 237, 237, 0.5)',
  chalkLine: '#EDEDED',
  glow: 'rgba(197, 228, 208, 0.6)',
  glowStrong: 'rgba(197, 228, 208, 0.9)',
  cardBg: 'rgba(255, 255, 255, 0.05)',
  borderColor: 'rgba(237, 237, 237, 0.2)',
  
  // Accent colors for nodes/cards
  mint: '#C5E4D0',
  pink: '#F6D7D7',
  sky: '#BEE3F8',
  beige: '#E8E2D0'
};

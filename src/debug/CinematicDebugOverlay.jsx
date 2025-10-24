import React, { useEffect, useState } from 'react';
import { motion, useTransform } from 'framer-motion';
import { useCinematic } from '../context/CinematicContext';

/**
 * 🐛 CinematicDebugOverlay - Development-Only Visual Debug Layer
 * 
 * Shows:
 * - Scroll progress bar (mint green, 2px)
 * - Current active scene label
 * - Scroll percentage (0-100%)
 * 
 * Features:
 * - GPU-accelerated transforms
 * - 60fps throttled updates
 * - Non-intrusive (z-index 9999, pointer-events none)
 * - Auto-hidden in production
 * 
 * Usage:
 * {process.env.NODE_ENV === 'development' && <CinematicDebugOverlay />}
 */

export const CinematicDebugOverlay = () => {
  const { scrollProgress, getActiveSection } = useCinematic();
  const [displayProgress, setDisplayProgress] = useState(0);
  const [currentScene, setCurrentScene] = useState('idea');
  
  // Throttle updates to 60fps (~16ms)
  useEffect(() => {
    let frameId;
    let lastUpdate = 0;
    const throttleDelay = 16; // ~60fps
    
    const updateDisplay = (timestamp) => {
      if (timestamp - lastUpdate >= throttleDelay) {
        setDisplayProgress(scrollProgress);
        setCurrentScene(getActiveSection());
        lastUpdate = timestamp;
      }
      frameId = requestAnimationFrame(updateDisplay);
    };
    
    frameId = requestAnimationFrame(updateDisplay);
    return () => cancelAnimationFrame(frameId);
  }, [scrollProgress, getActiveSection]);
  
  // Map scroll progress to bar width (0-100%)
  const progressWidth = displayProgress * 100;
  
  // Scene color mapping
  const sceneColors = {
    idea: '#A8F1BF',      // Mint
    team: '#8FE3A8',      // Lighter mint
    prototype: '#76D591', // Darker mint
    vision: '#5DC77B',    // Deep mint
    footer: '#44B566'     // Very deep mint
  };
  
  const currentColor = sceneColors[currentScene] || '#A8F1BF';
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.85 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        fontFamily: 'Inter, system-ui, sans-serif',
        userSelect: 'none'
      }}
    >
      {/* Progress Bar */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '2px',
          backgroundColor: currentColor,
          boxShadow: `0 0 8px ${currentColor}`,
          transformOrigin: 'left',
          transform: `scaleX(${progressWidth / 100})`,
          width: '100%',
          willChange: 'transform'
        }}
        transition={{
          transform: { duration: 0.1, ease: 'linear' }
        }}
      />
      
      {/* Scene Label */}
      <motion.div
        style={{
          position: 'absolute',
          top: '8px',
          right: '16px',
          fontSize: '12px',
          color: '#EAEAEA',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          padding: '4px 12px',
          borderRadius: '12px',
          backdropFilter: 'blur(8px)',
          border: `1px solid ${currentColor}`,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Scene Indicator Dot */}
        <motion.div
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: currentColor,
            boxShadow: `0 0 6px ${currentColor}`
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        
        {/* Scene Name */}
        <span style={{ fontWeight: 600, textTransform: 'capitalize' }}>
          {currentScene}
        </span>
        
        {/* Progress Percentage */}
        <span style={{ opacity: 0.6, fontVariantNumeric: 'tabular-nums' }}>
          {(displayProgress * 100).toFixed(1)}%
        </span>
      </motion.div>
      
      {/* Timeline Markers (optional - shows section boundaries) */}
      <div
        style={{
          position: 'absolute',
          top: '2px',
          left: 0,
          right: 0,
          height: '1px',
          display: 'flex'
        }}
      >
        {/* Idea → Team */}
        <div style={{ width: '22%', borderRight: '1px solid rgba(168, 241, 191, 0.2)' }} />
        {/* Team → Prototype */}
        <div style={{ width: '23%', borderRight: '1px solid rgba(168, 241, 191, 0.3)' }} />
        {/* Prototype → Vision */}
        <div style={{ width: '27%', borderRight: '1px solid rgba(168, 241, 191, 0.3)' }} />
        {/* Vision → End */}
        <div style={{ width: '28%' }} />
      </div>
    </motion.div>
  );
};

export default CinematicDebugOverlay;

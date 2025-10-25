import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

/**
 * 🎬 CinematicContext - Master Synchronization Hub
 * 
 * Manages global cinematic state and timing for all integrated systems:
 * - Auto-play intro lifecycle
 * - Scroll synchronization across all modules
 * - Audio playback coordination
 * - Camera motion state
 * - Depth/focus layer state
 * 
 * All hooks subscribe to shared scroll progress for perfect timing.
 */

const CinematicContext = createContext();

export const useCinematic = () => {
  const context = useContext(CinematicContext);
  if (!context) {
    throw new Error('useCinematic must be used within CinematicProvider');
  }
  return context;
};

// Master cinematic timeline - synchronized scroll ranges with smooth overlaps
export const cinematicTimeline = {
  heroEnd: 0.0,
  ideaStart: 0.0,
  ideaEnd: 0.22,        // Idea ends at 0.22
  teamStart: 0.22,      // Team starts at 0.22 (seamless handoff)
  teamEnd: 0.45,        // Team ends at 0.45
  prototypeStart: 0.45, // Prototype starts at 0.45 (seamless handoff)
  prototypeEnd: 0.72,   // Prototype ends at 0.72
  visionStart: 0.72,    // Vision starts at 0.72 (seamless handoff)
  visionEnd: 0.96,      // Vision ends at 0.96
  faqStart: 0.96,       // FAQ starts at 0.96
  faqEnd: 1.0,          // FAQ ends at 1.0
  
  // Transition overlap for smooth cross-fades (2-3% overlap)
  transitionOverlap: 0.02, // 2% overlap for seamless fades
  transitionDuration: 0.06 // 6% for fade transitions
};

export const CinematicProvider = ({ children }) => {
  // Intro lifecycle state
  const [introPlayed, setIntroPlayed] = useState(false);
  const [introStep, setIntroStep] = useState(0);
  const [scrollEnabled, setScrollEnabled] = useState(false);
  
  // Global scroll progress (0-1) - master sync point
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Camera motion state
  const [cameraActive, setCameraActive] = useState(true);
  
  // Audio coordination - prevents overlapping sounds
  const audioMutexRef = useRef(false);
  
  // Complete intro and unlock scroll
  const completeIntro = useCallback(() => {
    setIntroPlayed(true);
    setScrollEnabled(true);
    document.body.style.overflow = '';
  }, []);
  
  // Update intro step
  const updateIntroStep = useCallback((step) => {
    setIntroStep(step);
  }, []);
  
  // Update global scroll progress (called by LandingPage)
  const updateScrollProgress = useCallback((progress) => {
    setScrollProgress(progress);
  }, []);
  
  // Get current active section based on scroll progress
  const getActiveSection = useCallback(() => {
    const p = scrollProgress;
    if (p < cinematicTimeline.ideaEnd) return 'idea';
    if (p < cinematicTimeline.teamEnd) return 'team';
    if (p < cinematicTimeline.prototypeEnd) return 'prototype';
    if (p < cinematicTimeline.visionEnd) return 'vision';
    return 'footer';
  }, [scrollProgress]);
  
  // Check if we're in a section transition zone (buffer gap)
  const isInTransition = useCallback(() => {
    const p = scrollProgress;
    const buffer = cinematicTimeline.bufferGap;
    
    const transitionPoints = [
      { end: cinematicTimeline.ideaEnd, start: cinematicTimeline.teamStart },
      { end: cinematicTimeline.teamEnd, start: cinematicTimeline.prototypeStart },
      { end: cinematicTimeline.prototypeEnd, start: cinematicTimeline.visionStart }
    ];
    
    return transitionPoints.some(({ end, start }) => 
      p >= end && p <= start
    );
  }, [scrollProgress]);
  
  // Audio mutex for preventing overlaps
  const acquireAudioLock = useCallback(() => {
    if (audioMutexRef.current) return false;
    audioMutexRef.current = true;
    return true;
  }, []);
  
  const releaseAudioLock = useCallback(() => {
    audioMutexRef.current = false;
  }, []);
  
  // Check if reduced motion is preferred
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  const value = {
    // Intro state
    introPlayed,
    introStep,
    scrollEnabled,
    completeIntro,
    updateIntroStep,
    
    // Scroll synchronization
    scrollProgress,
    updateScrollProgress,
    getActiveSection,
    isInTransition,
    
    // Camera state
    cameraActive: cameraActive && !prefersReducedMotion,
    setCameraActive,
    
    // Audio coordination
    acquireAudioLock,
    releaseAudioLock,
    isAudioPlaying: audioMutexRef.current,
    
    // Accessibility
    prefersReducedMotion,
    
    // Timeline reference
    timeline: cinematicTimeline
  };

  return (
    <CinematicContext.Provider value={value}>
      {children}
    </CinematicContext.Provider>
  );
};

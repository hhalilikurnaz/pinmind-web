/**
 * 🎬 Landing Page Animations - Centralized animation logic
 * 
 * Handles all scroll-triggered animations for the landing page.
 * Coordinates with Framer Motion and cinematic context for smooth transitions.
 * 
 * This module separates animation logic from component rendering for better performance.
 */

/**
 * Section timing configuration based on scroll progress
 * Matches CinematicContext timeline ranges
 */
export const SECTION_RANGES = {
  idea: { start: 0.0, end: 0.22 },
  team: { start: 0.22, end: 0.45 },
  prototype: { start: 0.45, end: 0.72 },
  vision: { start: 0.72, end: 0.96 },
  faq: { start: 0.96, end: 1.0 }
};

/**
 * Determine active section based on scroll progress
 * @param {number} progress - Scroll progress (0-1)
 * @returns {string} - Active section name
 */
export const getActiveSection = (progress) => {
  if (progress < SECTION_RANGES.idea.end) return 'idea';
  if (progress < SECTION_RANGES.team.end) return 'team';
  if (progress < SECTION_RANGES.prototype.end) return 'prototype';
  if (progress < SECTION_RANGES.vision.end) return 'vision';
  return 'faq';
};

/**
 * Calculate section-specific progress (0-1 within section bounds)
 * @param {number} globalProgress - Global scroll progress (0-1)
 * @param {Object} range - Section range { start, end }
 * @returns {number} - Section progress (0-1)
 */
export const getSectionProgress = (globalProgress, range) => {
  const { start, end } = range;
  if (globalProgress <= start) return 0;
  if (globalProgress >= end) return 1;
  return (globalProgress - start) / (end - start);
};

/**
 * Easing functions for smooth animations
 */
export const easings = {
  easeInOut: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  easeOut: (t) => t * (2 - t),
  easeIn: (t) => t * t,
  linear: (t) => t
};

/**
 * Animation configurations for each section
 */
export const animationConfigs = {
  idea: {
    fadeIn: { start: 0.0, end: 0.05 },
    fadeOut: { start: 0.18, end: 0.22 },
    scale: { from: 1.05, to: 1.0 },
    blur: { from: 0, to: 2 }
  },
  team: {
    fadeIn: { start: 0.22, end: 0.27 },
    fadeOut: { start: 0.41, end: 0.45 },
    panX: { from: -20, to: 0 },
    scale: { from: 0.98, to: 1.0 }
  },
  prototype: {
    fadeIn: { start: 0.45, end: 0.50 },
    fadeOut: { start: 0.68, end: 0.72 },
    scale: { from: 0.97, to: 1.0 },
    lightBloom: { threshold: 0.65, intensity: 1.3 }
  },
  vision: {
    fadeIn: { start: 0.72, end: 0.77 },
    fadeOut: { start: 0.92, end: 0.96 },
    panY: { from: 30, to: 0 },
    lightIntensity: { from: 0.5, to: 1.0 }
  },
  faq: {
    fadeIn: { start: 0.96, end: 1.0 }
  }
};

/**
 * Calculate opacity for section fade transitions
 * @param {number} progress - Global scroll progress
 * @param {Object} config - Section animation config
 * @returns {number} - Opacity (0-1)
 */
export const calculateSectionOpacity = (progress, config) => {
  const { fadeIn, fadeOut } = config;
  
  // Fade in
  if (progress < fadeIn.end) {
    const fadeProgress = (progress - fadeIn.start) / (fadeIn.end - fadeIn.start);
    return Math.max(0, Math.min(1, easings.easeOut(fadeProgress)));
  }
  
  // Fully visible
  if (fadeOut && progress < fadeOut.start) {
    return 1;
  }
  
  // Fade out
  if (fadeOut && progress < fadeOut.end) {
    const fadeProgress = (progress - fadeOut.start) / (fadeOut.end - fadeOut.start);
    return Math.max(0, 1 - easings.easeIn(fadeProgress));
  }
  
  return fadeOut ? 0 : 1;
};

/**
 * Calculate scale transform for section
 * @param {number} progress - Section progress (0-1)
 * @param {Object} scaleConfig - { from, to }
 * @returns {number} - Scale value
 */
export const calculateScale = (progress, scaleConfig) => {
  const { from, to } = scaleConfig;
  return from + (to - from) * easings.easeOut(progress);
};

/**
 * Calculate blur amount for depth effect
 * @param {number} progress - Global scroll progress
 * @param {number} sectionStart - Section start position
 * @param {number} maxBlur - Maximum blur in pixels
 * @returns {number} - Blur amount in pixels
 */
export const calculateBlur = (progress, sectionStart, maxBlur = 6) => {
  if (progress < sectionStart) return maxBlur;
  if (progress > sectionStart + 0.1) return 0;
  const blurProgress = (progress - sectionStart) / 0.1;
  return maxBlur * (1 - easings.easeOut(blurProgress));
};

/**
 * Calculate light bloom intensity for dramatic moments
 * @param {number} progress - Section progress
 * @param {number} threshold - When bloom starts (0-1)
 * @param {number} maxIntensity - Peak intensity
 * @returns {number} - Bloom intensity
 */
export const calculateLightBloom = (progress, threshold = 0.65, maxIntensity = 1.3) => {
  if (progress < threshold) return 1.0;
  const bloomProgress = (progress - threshold) / (1 - threshold);
  return 1.0 + (maxIntensity - 1.0) * easings.easeInOut(bloomProgress);
};

/**
 * Main animation orchestrator - called on scroll progress updates
 * @param {number} scrollProgress - Global scroll progress (0-1)
 * @returns {Object} - Animation states for all sections
 */
export const playLandingAnimations = (scrollProgress) => {
  const activeSection = getActiveSection(scrollProgress);
  
  return {
    activeSection,
    
    idea: {
      opacity: calculateSectionOpacity(scrollProgress, animationConfigs.idea),
      scale: calculateScale(
        getSectionProgress(scrollProgress, SECTION_RANGES.idea),
        animationConfigs.idea.scale
      ),
      blur: calculateBlur(scrollProgress, SECTION_RANGES.idea.start)
    },
    
    team: {
      opacity: calculateSectionOpacity(scrollProgress, animationConfigs.team),
      scale: calculateScale(
        getSectionProgress(scrollProgress, SECTION_RANGES.team),
        animationConfigs.team.scale
      ),
      panX: animationConfigs.team.panX.from + 
        (animationConfigs.team.panX.to - animationConfigs.team.panX.from) * 
        getSectionProgress(scrollProgress, SECTION_RANGES.team)
    },
    
    prototype: {
      opacity: calculateSectionOpacity(scrollProgress, animationConfigs.prototype),
      scale: calculateScale(
        getSectionProgress(scrollProgress, SECTION_RANGES.prototype),
        animationConfigs.prototype.scale
      ),
      lightBloom: calculateLightBloom(
        getSectionProgress(scrollProgress, SECTION_RANGES.prototype),
        animationConfigs.prototype.lightBloom.threshold,
        animationConfigs.prototype.lightBloom.intensity
      ),
      blur: calculateBlur(scrollProgress, SECTION_RANGES.prototype.start)
    },
    
    vision: {
      opacity: calculateSectionOpacity(scrollProgress, animationConfigs.vision),
      panY: animationConfigs.vision.panY.from + 
        (animationConfigs.vision.panY.to - animationConfigs.vision.panY.from) * 
        getSectionProgress(scrollProgress, SECTION_RANGES.vision),
      lightIntensity: animationConfigs.vision.lightIntensity.from +
        (animationConfigs.vision.lightIntensity.to - animationConfigs.vision.lightIntensity.from) *
        getSectionProgress(scrollProgress, SECTION_RANGES.vision)
    },
    
    faq: {
      opacity: calculateSectionOpacity(scrollProgress, animationConfigs.faq)
    }
  };
};

/**
 * Debug helper - logs animation states (development only)
 * @param {number} progress - Scroll progress
 * @param {Object} animStates - Animation states from playLandingAnimations
 */
export const debugAnimationStates = (progress, animStates) => {
  if (process.env.NODE_ENV !== 'development') return;
  
  // Throttle to avoid console spam
  if (!window._lastAnimDebugTime || Date.now() - window._lastAnimDebugTime > 500) {
    console.group('🎬 Animation States');
    console.log('Progress:', progress.toFixed(3));
    console.log('Active Section:', animStates.activeSection);
    console.log('States:', {
      idea: `opacity: ${animStates.idea.opacity.toFixed(2)}`,
      team: `opacity: ${animStates.team.opacity.toFixed(2)}`,
      prototype: `opacity: ${animStates.prototype.opacity.toFixed(2)}, bloom: ${animStates.prototype.lightBloom.toFixed(2)}`,
      vision: `opacity: ${animStates.vision.opacity.toFixed(2)}`
    });
    console.groupEnd();
    window._lastAnimDebugTime = Date.now();
  }
};

/**
 * 🎬 Scene Registry - Centralized Scroll Range Definitions
 * 
 * Single source of truth for all cinematic scene timings.
 * Maps each scene to its scrollYProgress range [0.0 - 1.0].
 * 
 * Architecture:
 * - Small overlaps (0.01-0.03) for smooth cross-fades
 * - No gaps to prevent visual jumps
 * - Synchronized with CinematicContext timeline
 * 
 * Usage:
 * import { SCENES, getSceneAtProgress } from '@/config/SceneRegistry';
 * 
 * @see CinematicContext.jsx for master timeline
 */

export const SCENES = {
  // Hero/Intro - Auto-play sequence (not scroll-based)
  hero: {
    start: 0.0,
    end: 0.0,
    duration: 0.0,
    name: 'Hero',
    description: 'Auto-play intro with logo animation'
  },
  
  // Idea/Analysis Scene
  idea: {
    start: 0.0,
    end: 0.22,
    duration: 0.22,
    name: 'Idea',
    description: 'Sticky note + analysis cards'
  },
  
  // Team Formation Scene
  team: {
    start: 0.22,
    end: 0.42,
    duration: 0.20,
    name: 'Team',
    description: 'Character formation animation',
    overlap: 0.02 // 2% overlap with Prototype for fade
  },
  
  // Prototype Creation Scene
  prototype: {
    start: 0.42,
    end: 0.68,
    duration: 0.26,
    name: 'Prototype',
    description: 'Design sketch + light bloom',
    overlap: 0.02 // 2% overlap with Vision for fade
  },
  
  // Vision/Lightbulb Scene
  vision: {
    start: 0.68,
    end: 0.92,
    duration: 0.24,
    name: 'Vision',
    description: 'Lightbulb moment animation'
  },
  
  // FAQ/Footer Scene
  faq: {
    start: 0.92,
    end: 1.0,
    duration: 0.08,
    name: 'FAQ',
    description: 'FAQ accordion + footer'
  }
};

/**
 * Get the active scene at a given scroll progress
 * @param {number} progress - Scroll progress (0.0 - 1.0)
 * @returns {string} Scene key ('idea', 'team', 'prototype', 'vision', 'faq')
 */
export const getSceneAtProgress = (progress) => {
  if (progress < SCENES.idea.end) return 'idea';
  if (progress < SCENES.team.end) return 'team';
  if (progress < SCENES.prototype.end) return 'prototype';
  if (progress < SCENES.vision.end) return 'vision';
  return 'faq';
};

/**
 * Check if a scene is active at given progress
 * @param {string} sceneKey - Scene identifier
 * @param {number} progress - Scroll progress (0.0 - 1.0)
 * @returns {boolean} True if scene is active
 */
export const isSceneActive = (sceneKey, progress) => {
  const scene = SCENES[sceneKey];
  if (!scene) return false;
  return progress >= scene.start && progress <= scene.end;
};

/**
 * Get normalized progress within a scene (0.0 - 1.0)
 * @param {string} sceneKey - Scene identifier
 * @param {number} globalProgress - Global scroll progress (0.0 - 1.0)
 * @returns {number} Scene-local progress (0.0 - 1.0)
 */
export const getSceneProgress = (sceneKey, globalProgress) => {
  const scene = SCENES[sceneKey];
  if (!scene || !isSceneActive(sceneKey, globalProgress)) return 0;
  
  const localProgress = (globalProgress - scene.start) / scene.duration;
  return Math.max(0, Math.min(1, localProgress));
};

/**
 * Get all scene boundaries for debug visualization
 * @returns {Array<{name: string, position: number}>}
 */
export const getSceneBoundaries = () => {
  return Object.entries(SCENES)
    .filter(([key]) => key !== 'hero')
    .map(([key, scene]) => ({
      name: scene.name,
      start: scene.start,
      end: scene.end
    }));
};

/**
 * Validate scene registry (dev tool)
 * Checks for gaps, overlaps, and invalid ranges
 */
export const validateSceneRegistry = () => {
  const scenes = Object.values(SCENES).filter(s => s.start !== s.end);
  const issues = [];
  
  for (let i = 0; i < scenes.length - 1; i++) {
    const current = scenes[i];
    const next = scenes[i + 1];
    
    const gap = next.start - current.end;
    
    if (gap > 0.05) {
      issues.push(`Large gap between ${current.name} and ${next.name}: ${gap.toFixed(3)}`);
    }
    
    if (gap < -0.05) {
      issues.push(`Large overlap between ${current.name} and ${next.name}: ${Math.abs(gap).toFixed(3)}`);
    }
  }
  
  if (issues.length > 0) {
    console.warn('[SceneRegistry] Validation issues:', issues);
  } else {
    console.log('[SceneRegistry] ✅ All scenes valid');
  }
  
  return issues.length === 0;
};

// Auto-validate in development
if (process.env.NODE_ENV === 'development') {
  validateSceneRegistry();
}

export default SCENES;

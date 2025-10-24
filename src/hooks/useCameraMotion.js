import { useMemo } from 'react';
import { useCinematic } from '../context/CinematicContext';

/**
 * 📹 useCameraMotion - Cinematic camera control hook
 * 
 * Provides camera transform values for creating depth and parallax effects.
 * Respects reduced motion preferences and cinematic context state.
 * 
 * @param {Object} sync - Synchronized values from useScrollSync
 * @returns {Object} Camera transform styles for motion.div
 */

export const useCameraMotion = (sync) => {
  const { cameraActive, prefersReducedMotion } = useCinematic();
  
  const cameraTransforms = useMemo(() => {
    if (!cameraActive || prefersReducedMotion) {
      return {
        transform: 'none',
        opacity: 1
      };
    }
    
    return {
      y: sync.camera.y,
      scale: sync.camera.scale,
      rotateX: sync.camera.rotateX,
      transformStyle: 'preserve-3d',
      transformPerspective: 1000
    };
  }, [cameraActive, prefersReducedMotion, sync.camera]);
  
  // Section-specific camera styles
  const getSectionCamera = useMemo(() => ({
    idea: () => ({
      scale: sync.sections.idea.zoom,
      opacity: sync.sections.idea.opacity
    }),
    
    team: () => ({
      x: sync.sections.team.panX,
      scale: sync.sections.team.scale
    }),
    
    prototype: () => ({
      scale: sync.sections.prototype.zoom,
      filter: prefersReducedMotion ? 'none' : `blur(${sync.sections.prototype.blur}px)`
    }),
    
    vision: () => ({
      y: sync.sections.vision.panY,
      opacity: 1,
      filter: 'none'
    })
  }), [sync.sections, prefersReducedMotion]);
  
  return {
    global: cameraTransforms,
    section: getSectionCamera
  };
};

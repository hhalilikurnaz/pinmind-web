import { useMemo } from 'react';
import { useCinematic } from '../context/CinematicContext';

/**
 * 🎯 useFocusDepth - Dynamic depth of field and focus layer
 * 
 * Creates cinematic depth effects with blur, vignette, and brightness.
 * GPU-accelerated using backdrop-filter for performance.
 * 
 * @param {Object} sync - Synchronized values from useScrollSync
 * @returns {Object} Depth layer styles and values
 */

export const useFocusDepth = (sync) => {
  const { prefersReducedMotion } = useCinematic();
  
  // Depth overlay style (non-blocking overlay)
  const depthOverlayStyle = useMemo(() => {
    if (prefersReducedMotion) {
      return {
        opacity: 0,
        pointerEvents: 'none'
      };
    }
    
    return {
      position: 'fixed',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 5,
      backdropFilter: `blur(${sync.depth.blur}px) brightness(${sync.depth.brightness})`,
      WebkitBackdropFilter: `blur(${sync.depth.blur}px) brightness(${sync.depth.brightness})`,
      willChange: 'backdrop-filter',
      // GPU acceleration hints
      transform: 'translateZ(0)',
      backfaceVisibility: 'hidden'
    };
  }, [sync.depth, prefersReducedMotion]);
  
  // Vignette effect (darkens edges for focus)
  const vignetteStyle = useMemo(() => {
    if (prefersReducedMotion) {
      return { opacity: 0 };
    }
    
    return {
      position: 'fixed',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 4,
      background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.6) 100%)',
      opacity: sync.depth.vignette,
      mixBlendMode: 'multiply',
      willChange: 'opacity'
    };
  }, [sync.depth.vignette, prefersReducedMotion]);
  
  // Get depth values for manual control
  const depthValues = useMemo(() => ({
    blur: sync.depth.blur,
    vignette: sync.depth.vignette,
    brightness: sync.depth.brightness
  }), [sync.depth]);
  
  return {
    overlayStyle: depthOverlayStyle,
    vignetteStyle: vignetteStyle,
    values: depthValues,
    isActive: !prefersReducedMotion
  };
};

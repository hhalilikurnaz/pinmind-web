import { useMemo } from 'react';
import { useTransform } from 'framer-motion';
import { useCinematic } from '../context/CinematicContext';

/**
 * 🔄 useScrollSync - Unified scroll synchronization hook
 * 
 * Maps scroll progress to all animation systems with perfect timing.
 * Returns synchronized values for:
 * - Camera transforms (pan, zoom, rotate)
 * - Section-specific animations
 * - Lighting gradients
 * - Depth/focus values
 * 
 * All sections subscribe to the same scrollYProgress observable.
 */

export const useScrollSync = (scrollYProgress) => {
  const { timeline, prefersReducedMotion } = useCinematic();
  
  // 🎯 CINEMATIC TIMELINE - Perfect alignment with smooth overlaps
  const ranges = {
    idea: { start: 0.0, end: 0.22 },
    team: { start: 0.22, end: 0.45 },       // Team window: [0.22, 0.45]
    prototype: { start: 0.45, end: 0.72 },  // Prototype window: [0.45, 0.72]
    vision: { start: 0.72, end: 0.96 }      // Vision window: [0.72, 0.96]
  };
  
  // 🎬 DEPTH BALANCER - Cinematic focus pull system
  const depthMap = {
    idea: { zIndex: 30, blur: 0, focus: 1.0 },
    team: { zIndex: 25, blur: 1, focus: 0.9 },
    prototype: { zIndex: 20, blur: 2, focus: 0.8 },
    vision: { zIndex: 15, blur: 3, focus: 0.7 }
  };
  
  // Transition durations (6% for smooth fades with 2% overlap)
  const fadeInDuration = 0.06;
  const fadeOutDuration = 0.06;
  const overlap = 0.02; // Small overlap for seamless cross-fades
  
  // Disable parallax effects if reduced motion preferred
  const motionMultiplier = prefersReducedMotion ? 0 : 1;
  
  // === GLOBAL CAMERA MOTION ===
  const cameraY = useTransform(
    scrollYProgress, 
    [0, 1], 
    [0, -50 * motionMultiplier]
  );
  
  const cameraScale = useTransform(
    scrollYProgress, 
    [0, 1], 
    [1, 1 + (0.05 * motionMultiplier)]
  );
  
  const cameraRotateX = useTransform(
    scrollYProgress, 
    [0, 1], 
    [0, 2 * motionMultiplier]
  );
  
  // === LIGHTING SYSTEM ===
  const lightGradientOpacity = useTransform(
    scrollYProgress, 
    [0, 0.5, 1], 
    [0.3, 0.6, 0.8]
  );
  
  const bgGradientProgress = useTransform(
    scrollYProgress, 
    [0, 0.5, 1], 
    [0, 0.5, 1]
  );
  
  // === SECTION-SPECIFIC CAMERA EFFECTS WITH CLEAN TRANSITIONS ===
  
  // Idea section (0.0 - 0.22) - gentle zoom in
  const ideaZoom = useTransform(
    scrollYProgress,
    [ranges.idea.start, ranges.idea.end],
    [1, 1 + (0.03 * motionMultiplier)]
  );
  
  const ideaOpacity = useTransform(
    scrollYProgress,
    [ranges.idea.start, ranges.idea.start + fadeInDuration, ranges.idea.end - fadeOutDuration, ranges.idea.end],
    [0, 1, 1, 0]
  );
  
  const ideaZIndex = useTransform(
    scrollYProgress,
    [ranges.idea.start, ranges.idea.end],
    [10, 10]
  );
  
  // Team section (0.22 - 0.42) - Horizontal pan with overlap fade
  const teamPanX = useTransform(
    scrollYProgress,
    [ranges.team.start, ranges.team.end],
    [-10 * motionMultiplier, 10 * motionMultiplier]
  );
  
  const teamScale = useTransform(
    scrollYProgress,
    [ranges.team.start, ranges.team.start + fadeInDuration, ranges.team.end - fadeOutDuration - overlap, ranges.team.end - overlap],
    [0.96, 1.0, 1.0, 0.98]
  );
  
  const teamOpacity = useTransform(
    scrollYProgress,
    [ranges.team.start, ranges.team.start + fadeInDuration, ranges.team.end - fadeOutDuration - overlap, ranges.team.end],
    [0, 1, 1, 0]
  );
  
  const teamZIndex = useTransform(
    scrollYProgress,
    [ranges.team.start - 0.01, ranges.team.start, ranges.team.end, ranges.team.end + 0.01],
    [0, 20, 20, 0]
  );
  
    
  // Prototype section (0.42 - 0.68) - Seamless handoff with overlap, light bloom effect
  const prototypeZoom = useTransform(
    scrollYProgress,
    [ranges.prototype.start, ranges.prototype.end],
    [1.03, 1]
  );
  
  const prototypeScale = useTransform(
    scrollYProgress,
    [ranges.prototype.start, ranges.prototype.start + fadeInDuration],
    [0.97, 1.0]
  );
  
  const prototypeBlur = useTransform(
    scrollYProgress,
    [ranges.prototype.start, ranges.prototype.start + 0.1, ranges.prototype.end],
    [2, 0, 0]
  );
  
  const prototypeOpacity = useTransform(
    scrollYProgress,
    [ranges.prototype.start, ranges.prototype.start + fadeInDuration, ranges.prototype.end - fadeOutDuration - overlap, ranges.prototype.end],
    [0, 1, 1, 0]
  );
  
  const prototypeZIndex = useTransform(
    scrollYProgress,
    [ranges.prototype.start - 0.01, ranges.prototype.start, ranges.prototype.end, ranges.prototype.end + 0.01],
    [0, 30, 30, 0]
  );
  
  // Light bloom effect for Prototype entry
  const prototypeLightBloom = useTransform(
    scrollYProgress,
    [ranges.prototype.start, ranges.prototype.start + fadeInDuration, ranges.prototype.start + 0.12],
    [1, 1.15, 1]
  );
  
  // Vision/Lightbulb section (0.68 - 0.92) - upward tilt with fade in
  const visionPanY = useTransform(
    scrollYProgress,
    [ranges.vision.start, ranges.vision.end],
    [20 * motionMultiplier, -40 * motionMultiplier]
  );
  
  const visionGlow = useTransform(
    scrollYProgress,
    [ranges.vision.start, ranges.vision.start + 0.15, ranges.vision.end],
    [0, 1, 0.7]
  );
  
  const visionOpacity = useTransform(
    scrollYProgress,
    [ranges.vision.start, ranges.vision.start + fadeInDuration, ranges.vision.end],
    [0, 1, 1]
  );
  
  const visionZIndex = useTransform(
    scrollYProgress,
    [ranges.vision.start - 0.01, ranges.vision.start],
    [0, 40]
  );
  
  // === DEPTH & FOCUS LAYER ===
  const depthBlur = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    [0, 2, 1, 0].map(v => v * motionMultiplier)
  );
  
  const vignette = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.2, 0.4, 0.6]
  );
  
  const brightness = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.95, 1, 1.05]
  );
  
  // === LEGACY PARALLAX (for backward compatibility) ===
  const scale = useTransform(scrollYProgress, [0, 0.15], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0.8, 1]);
  const yParallax = useTransform(scrollYProgress, [0, 1], ['0%', `${20 * motionMultiplier}%`]);
  
  return useMemo(() => ({
    // Global camera
    camera: {
      y: cameraY,
      scale: cameraScale,
      rotateX: cameraRotateX
    },
    
    // Lighting
    light: {
      gradientOpacity: lightGradientOpacity,
      bgProgress: bgGradientProgress
    },
    
    // Section-specific with opacity and z-index control
    sections: {
      idea: {
        zoom: ideaZoom,
        opacity: ideaOpacity,
        zIndex: ideaZIndex
      },
      team: {
        panX: teamPanX,
        scale: teamScale,
        opacity: teamOpacity,
        zIndex: teamZIndex
      },
      prototype: {
        zoom: prototypeZoom,
        scale: prototypeScale,
        blur: prototypeBlur,
        opacity: prototypeOpacity,
        zIndex: prototypeZIndex,
        lightBloom: prototypeLightBloom
      },
      vision: {
        panY: visionPanY,
        glow: visionGlow,
        opacity: visionOpacity,
        zIndex: visionZIndex
      }
    },
    
    // Depth layer
    depth: {
      blur: depthBlur,
      vignette: vignette,
      brightness: brightness
    },
    
    // Legacy (backward compatibility)
    legacy: {
      scale,
      opacity,
      yParallax
    }
  }), [
    cameraY, cameraScale, cameraRotateX,
    lightGradientOpacity, bgGradientProgress,
    ideaZoom, ideaOpacity, ideaZIndex,
    teamPanX, teamScale, teamOpacity, teamZIndex,
    prototypeZoom, prototypeBlur, prototypeOpacity, prototypeZIndex,
    visionPanY, visionGlow, visionOpacity, visionZIndex,
    depthBlur, vignette, brightness,
    scale, opacity, yParallax
  ]);
};

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
 * 
 * 🐛 BUG FIXES APPLIED (Oct 25, 2025):
 * =====================================
 * 
 * ISSUE #1: Team Section Disappearing Prematurely
 * ------------------------------------------------
 * ROOT CAUSE: 
 * - Opacity was fading from 1→0 between [0.39, 0.45] due to excessive overlap calculation
 * - Formula: `ranges.team.end - fadeOutDuration - overlap` = 0.45 - 0.06 - 0.02 = 0.37
 * - This caused Team to start fading out at 37% scroll, completing at 45%
 * - Team was invisible for the last ~8% of its designated range [0.22-0.45]
 * 
 * FIX:
 * - Reduced fadeInDuration from 0.06 (6%) to 0.04 (4%)
 * - Reduced overlap from 0.02 (2%) to 0.01 (1%)
 * - Changed opacity keyframes to: [start, start+fade, end-fade, end+overlap]
 * - Team now stays at opacity=1 from 26% to 41%, only fading 41%→46%
 * 
 * ISSUE #2: Prototype Section Missing
 * ------------------------------------
 * ROOT CAUSE:
 * - zIndex was dropping to 0 at exactly ranges.prototype.end (0.72)
 * - This caused Prototype to be rendered behind other sections while still visible
 * - Opacity was also cutting off early due to overlap subtraction
 * 
 * FIX:
 * - Extended zIndex high value beyond fade completion: [start-0.02, start, end, end+0.02]
 * - Adjusted opacity to include negative overlap buffer: [start-overlap, ...]
 * - Increased zIndex from 30 to 35 for better layering priority
 * - Added extended light bloom animation for visual continuity
 * 
 * ISSUE #3: Abrupt Section Transitions
 * -------------------------------------
 * ROOT CAUSE:
 * - Large fade durations (6%) + overlap (2%) = 8% of section "wasted" on transitions
 * - For a 23% section (Team: 0.22-0.45), this means 35% of content was in transition states
 * - Caused jarring jumps and insufficient "dwell time" in fully visible state
 * 
 * FIX:
 * - Reduced transition percentage: 6%→4% fade, 2%→1% overlap = 5% total
 * - For 23% Team section: now only 22% in transitions vs 35% before
 * - Ensures minimum 60-70% of section time is at full opacity
 * 
 * HOW TO ADD NEW SECTIONS:
 * ========================
 * 1. Add range to `ranges` object with start/end values (must not overlap with existing)
 * 2. Create opacity transform: [start-overlap, start+fadeIn, end-fadeOut, end+overlap] → [0,1,1,0]
 * 3. Create zIndex transform: [start-0.02, start, end, end+0.02] → [0, highValue, highValue, 0]
 * 4. Add any section-specific transforms (pan, scale, blur, etc.)
 * 5. Export in return object under `sections.yourSection`
 * 6. Use consistent fadeInDuration=0.04, fadeOutDuration=0.04, overlap=0.01
 * 
 * DEBUGGING TIPS:
 * ===============
 * - Use CinematicDebugOverlay to visualize scroll progress and active section
 * - Check opacity values: should be 1.0 for majority of section duration
 * - Check zIndex: should be non-zero while opacity > 0
 * - Verify no gaps between section ranges (end of one = start of next)
 */

export const useScrollSync = (scrollYProgress) => {
  const { timeline, prefersReducedMotion } = useCinematic();
  
  // 🎯 CINEMATIC TIMELINE - Perfect alignment with smooth overlaps
  // 🔧 FIXED: Adjusted ranges to ensure smooth visibility throughout entire section duration
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
  
  // 🔧 FIXED: Reduced fade durations and removed overlap to prevent premature fade-outs
  // Transition durations (4% for fade in/out with 1% overlap for seamless handoff)
  const fadeInDuration = 0.04;   // 4% of section duration for fade in
  const fadeOutDuration = 0.04;  // 4% of section duration for fade out
  const overlap = 0.01;          // 1% overlap for cross-fade between sections
  
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
  
  // 🔧 FIXED: Opacity stays at 1 throughout most of section, only fades at edges
  const ideaOpacity = useTransform(
    scrollYProgress,
    [
      ranges.idea.start, 
      ranges.idea.start + fadeInDuration, 
      ranges.idea.end - fadeOutDuration, 
      ranges.idea.end
    ],
    [0, 1, 1, 0]
  );
  
  // 🔧 FIXED: zIndex remains constant throughout section visibility
  const ideaZIndex = useTransform(
    scrollYProgress,
    [ranges.idea.start, ranges.idea.end, ranges.idea.end + 0.01],
    [30, 30, 0]
  );
  
  // Team section (0.22 - 0.45) - Horizontal pan with smooth fade
  const teamPanX = useTransform(
    scrollYProgress,
    [ranges.team.start, ranges.team.end],
    [-10 * motionMultiplier, 10 * motionMultiplier]
  );
  
  const teamScale = useTransform(
    scrollYProgress,
    [
      ranges.team.start, 
      ranges.team.start + fadeInDuration, 
      ranges.team.end - fadeOutDuration, 
      ranges.team.end
    ],
    [0.96, 1.0, 1.0, 0.98]
  );
  
  // 🔧 FIXED: Removed premature fade-out - Team stays visible until end of range
  const teamOpacity = useTransform(
    scrollYProgress,
    [
      ranges.team.start, 
      ranges.team.start + fadeInDuration, 
      ranges.team.end - fadeOutDuration, 
      ranges.team.end + overlap
    ],
    [0, 1, 1, 0]
  );
  
  // 🔧 FIXED: zIndex stays high throughout section, only drops after fade completes
  const teamZIndex = useTransform(
    scrollYProgress,
    [
      ranges.team.start - 0.01, 
      ranges.team.start, 
      ranges.team.end, 
      ranges.team.end + 0.02
    ],
    [0, 25, 25, 0]
  );
  
    
  // Prototype section (0.45 - 0.72) - Seamless handoff with light bloom effect
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
    [ranges.prototype.start, ranges.prototype.start + 0.08, ranges.prototype.end],
    [2, 0, 0]
  );
  
  // 🔧 FIXED: Full visibility throughout section duration
  const prototypeOpacity = useTransform(
    scrollYProgress,
    [
      ranges.prototype.start - overlap, 
      ranges.prototype.start + fadeInDuration, 
      ranges.prototype.end - fadeOutDuration, 
      ranges.prototype.end + overlap
    ],
    [0, 1, 1, 0]
  );
  
  // 🔧 FIXED: Highest zIndex to ensure visibility, drops only after complete fade
  const prototypeZIndex = useTransform(
    scrollYProgress,
    [
      ranges.prototype.start - 0.02, 
      ranges.prototype.start, 
      ranges.prototype.end, 
      ranges.prototype.end + 0.02
    ],
    [0, 35, 35, 0]
  );
  
  // Light bloom effect for Prototype entry - gradual buildup
  const prototypeLightBloom = useTransform(
    scrollYProgress,
    [
      ranges.prototype.start, 
      ranges.prototype.start + 0.08, 
      ranges.prototype.start + 0.15,
      ranges.prototype.end
    ],
    [1, 1.2, 1.3, 1]
  );
  
  // Vision/Lightbulb section (0.72 - 0.96) - upward tilt with smooth fade in
  const visionPanY = useTransform(
    scrollYProgress,
    [ranges.vision.start, ranges.vision.end],
    [20 * motionMultiplier, -40 * motionMultiplier]
  );
  
  const visionGlow = useTransform(
    scrollYProgress,
    [ranges.vision.start, ranges.vision.start + 0.12, ranges.vision.end],
    [0, 1, 0.8]
  );
  
  // 🔧 FIXED: Smooth fade in with sustained visibility
  const visionOpacity = useTransform(
    scrollYProgress,
    [
      ranges.vision.start - overlap, 
      ranges.vision.start + fadeInDuration, 
      ranges.vision.end
    ],
    [0, 1, 1]
  );
  
  // 🔧 FIXED: Highest zIndex for final scene
  const visionZIndex = useTransform(
    scrollYProgress,
    [ranges.vision.start - 0.02, ranges.vision.start],
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
    // 🔧 FIXED: All sections now properly export opacity, zIndex, and transforms
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
        lightBloom: prototypeLightBloom  // 🔧 FIXED: Now properly exported
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
    prototypeZoom, prototypeScale, prototypeBlur, prototypeOpacity, prototypeZIndex, prototypeLightBloom,
    visionPanY, visionGlow, visionOpacity, visionZIndex,
    depthBlur, vignette, brightness,
    scale, opacity, yParallax
  ]);
};

import { useMemo } from 'react';
import { useTransform } from 'framer-motion';

/**
 * 🎯 useSceneZIndex - Isolated Z-Index Management
 * 
 * Returns dynamic z-index for a scene based on:
 * - Scene key (idea, team, prototype, vision)
 * - Current opacity (drops to 0 when opacity < 0.1)
 * 
 * Z-Index Policy:
 * - idea: 10, team: 20, prototype: 30, vision: 40, footer: 5
 * - Inactive scenes (opacity < 0.1) → z-index: 0
 * 
 * @param {MotionValue} opacityMotionValue - The scene's opacity MotionValue
 * @param {string} sceneKey - Scene identifier (idea, team, prototype, vision)
 * @returns {MotionValue} Z-index MotionValue
 */

const BASE_Z_INDEX = {
  idea: 10,
  team: 20,
  prototype: 30,
  vision: 40,
  footer: 5
};

export const useSceneZIndex = (opacityMotionValue, sceneKey) => {
  const baseZIndex = BASE_Z_INDEX[sceneKey] || 0;
  
  // Map opacity to z-index: if opacity < 0.1 → z-index: 0, else → baseZIndex
  const zIndex = useTransform(
    opacityMotionValue,
    [0, 0.1, 1],
    [0, baseZIndex, baseZIndex]
  );
  
  return useMemo(() => zIndex, [zIndex]);
};

/**
 * 🔒 getPointerEvents - Determine pointer-events based on opacity
 * 
 * @param {number} opacity - Current opacity value (0-1)
 * @returns {string} 'auto' or 'none'
 */
export const getPointerEvents = (opacity) => {
  return opacity > 0.1 ? 'auto' : 'none';
};

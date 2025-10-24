import { useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for managing audio effects with lazy loading and performance optimization
 * @param {string} soundPath - Path to the audio file
 * @param {number} volume - Volume level (0-1)
 * @param {boolean} shouldPlay - Boolean to trigger sound playback
 * @param {number} delay - Delay before playing (ms)
 */
export const useAudioEffect = (soundPath, volume = 0.4, shouldPlay = false, delay = 0) => {
  const audioRef = useRef(null);
  const hasPlayedRef = useRef(false);
  const isLoadingRef = useRef(false);

  // Lazy load audio file
  const loadAudio = useCallback(async () => {
    if (isLoadingRef.current || audioRef.current) return;
    
    isLoadingRef.current = true;
    try {
      const audio = new Audio(soundPath);
      audio.volume = volume;
      audio.preload = 'auto';
      
      // Wait for audio to be loadable
      await new Promise((resolve, reject) => {
        audio.addEventListener('canplaythrough', resolve, { once: true });
        audio.addEventListener('error', reject, { once: true });
      });
      
      audioRef.current = audio;
    } catch (error) {
      console.warn(`Failed to load audio: ${soundPath}`, error);
    } finally {
      isLoadingRef.current = false;
    }
  }, [soundPath, volume]);

  // Play audio effect
  const playAudio = useCallback(() => {
    if (hasPlayedRef.current || !audioRef.current) return;
    
    hasPlayedRef.current = true;
    
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(err => {
          console.warn('Audio play failed:', err);
        });
      }
    }, delay);
  }, [delay]);

  // Reset played state
  const reset = useCallback(() => {
    hasPlayedRef.current = false;
  }, []);

  // Load audio on mount
  useEffect(() => {
    loadAudio();
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [loadAudio]);

  // Trigger playback
  useEffect(() => {
    if (shouldPlay && audioRef.current && !hasPlayedRef.current) {
      playAudio();
    }
  }, [shouldPlay, playAudio]);

  return { reset, hasPlayed: hasPlayedRef.current };
};

/**
 * Hook for scroll-triggered audio effects
 * @param {number} scrollProgress - Current scroll progress (0-1)
 * @param {number} threshold - Scroll threshold to trigger sound (0-1)
 * @param {string} soundPath - Path to audio file
 * @param {number} volume - Volume level
 */
export const useScrollAudio = (scrollProgress, threshold, soundPath, volume = 0.3) => {
  const hasPlayedRef = useRef(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Lazy load
    if (!audioRef.current) {
      const audio = new Audio(soundPath);
      audio.volume = volume;
      audio.preload = 'auto';
      audioRef.current = audio;
    }

    // Trigger when threshold crossed
    if (scrollProgress >= threshold && !hasPlayedRef.current) {
      hasPlayedRef.current = true;
      audioRef.current?.play().catch(err => console.warn('Audio play failed:', err));
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [scrollProgress, threshold, soundPath, volume]);

  return hasPlayedRef.current;
};

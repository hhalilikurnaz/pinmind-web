import { useEffect, useRef, useCallback } from 'react';
import { useCinematic } from '../context/CinematicContext';
import { useAudioContext } from '../context/AudioContext';

/**
 * 🔊 useCinematicAudio - Coordinated audio playback hook
 * 
 * Extends useAudioEffect with cinematic coordination:
 * - Respects audio mutex to prevent overlaps
 * - Syncs with intro/scroll lifecycle
 * - Releases lock after playback
 * 
 * @param {string} soundPath - Path to audio file
 * @param {number} volume - Volume (0-1)
 * @param {boolean} shouldPlay - Trigger condition
 * @param {number} delay - Delay before playback (ms)
 * @param {number} duration - Expected sound duration (ms) for mutex release
 */

export const useCinematicAudio = (soundPath, volume, shouldPlay, delay = 0, duration = 1000) => {
  const { isMuted, isEnabled } = useAudioContext();
  const { acquireAudioLock, releaseAudioLock } = useCinematic();
  
  const audioRef = useRef(null);
  const hasPlayedRef = useRef(false);
  const timeoutRef = useRef(null);
  
  const playSound = useCallback(async () => {
    if (!isEnabled || isMuted || hasPlayedRef.current) return;
    
    // Try to acquire audio lock
    if (!acquireAudioLock()) {
      // Another sound is playing, skip to prevent overlap
      return;
    }
    
    try {
      // Lazy load audio
      if (!audioRef.current) {
        audioRef.current = new Audio(soundPath);
        audioRef.current.volume = volume;
      }
      
      // Play with delay
      if (delay > 0) {
        await new Promise(resolve => {
          timeoutRef.current = setTimeout(resolve, delay);
        });
      }
      
      await audioRef.current.play();
      hasPlayedRef.current = true;
      
      // Release lock after sound completes
      setTimeout(() => {
        releaseAudioLock();
      }, duration);
      
    } catch (error) {
      console.warn('Audio playback failed:', error);
      releaseAudioLock(); // Release lock on error
    }
  }, [soundPath, volume, delay, duration, isEnabled, isMuted, acquireAudioLock, releaseAudioLock]);
  
  useEffect(() => {
    if (shouldPlay && !hasPlayedRef.current) {
      playSound();
    }
  }, [shouldPlay, playSound]);
  
  // Cleanup
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (hasPlayedRef.current) {
        releaseAudioLock();
      }
    };
  }, [releaseAudioLock]);
};

/**
 * 🎵 useScrollCinematicAudio - Scroll-triggered audio with coordination
 * 
 * @param {number} scrollProgress - Current scroll progress (0-1)
 * @param {number} threshold - Trigger threshold (0-1)
 * @param {string} soundPath - Path to audio file
 * @param {number} volume - Volume (0-1)
 * @param {number} duration - Expected sound duration (ms)
 */

export const useScrollCinematicAudio = (scrollProgress, threshold, soundPath, volume, duration = 1000) => {
  const hasTriggeredRef = useRef(false);
  const shouldPlay = scrollProgress >= threshold && !hasTriggeredRef.current;
  
  useEffect(() => {
    if (shouldPlay) {
      hasTriggeredRef.current = true;
    }
  }, [shouldPlay]);
  
  useCinematicAudio(soundPath, volume, shouldPlay, 0, duration);
};

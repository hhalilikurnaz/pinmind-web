import { useState, useEffect, useCallback } from 'react';

/**
 * 🎯 useScrollEvents - Centralized scroll event management
 * 
 * Handles window scroll events with throttling for optimal performance.
 * Manages scroll-based UI states like header background and button visibility.
 * 
 * @param {boolean} scrollEnabled - Whether scroll handling is active
 * @returns {Object} - { scrolled, scrollProgress, isScrolling }
 */

export const useScrollEvents = (scrollEnabled = true) => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  // Throttle helper - max 60fps (16.67ms between calls)
  const throttle = useCallback((func, limit = 16) => {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }, []);

  useEffect(() => {
    if (!scrollEnabled) return;

    let scrollTimeout;

    // Throttled scroll handler - 60fps max
    const handleScroll = throttle(() => {
      const scrollY = window.scrollY;
      
      // Update header state (appears after 100px)
      setScrolled(scrollY > 100);
      
      // Update raw scroll position
      setScrollProgress(scrollY);
      
      // Track scrolling state
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    }, 16);

    // Attach listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [scrollEnabled, throttle]);

  return {
    scrolled,        // True when scrolled > 100px (for header background)
    scrollProgress,  // Raw scroll position in pixels
    isScrolling      // True while actively scrolling
  };
};

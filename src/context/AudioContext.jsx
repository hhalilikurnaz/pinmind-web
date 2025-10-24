import React, { createContext, useContext, useState, useCallback } from 'react';

const AudioContext = createContext();

export const useAudioContext = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudioContext must be used within AudioProvider');
  }
  return context;
};

export const AudioProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(true); // Default muted for better UX
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
    setIsEnabled(true); // Enable audio system on first user interaction
  }, []);

  const value = {
    isMuted,
    isEnabled,
    toggleMute
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
};

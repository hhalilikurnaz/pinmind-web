import React from 'react';
import { motion } from 'framer-motion';
import { useAudioContext } from '../context/AudioContext';

const AudioControl = () => {
  const { isMuted, toggleMute, isEnabled } = useAudioContext();

  return (
    <motion.button
      onClick={toggleMute}
      className="fixed bottom-6 right-6 z-50 p-4 rounded-full backdrop-blur-md border-2 transition-all"
      style={{
        backgroundColor: 'rgba(15, 15, 15, 0.8)',
        borderColor: isMuted ? 'rgba(255, 255, 255, 0.1)' : 'rgba(168, 241, 191, 0.4)',
        boxShadow: isMuted 
          ? '0 4px 12px rgba(0,0,0,0.3)' 
          : '0 4px 20px rgba(168, 241, 191, 0.3)'
      }}
      whileHover={{ 
        scale: 1.1,
        borderColor: 'rgba(168, 241, 191, 0.6)'
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
    >
      <motion.div
        animate={{ 
          scale: isMuted ? 1 : [1, 1.1, 1],
          rotate: isMuted ? 0 : [0, -5, 5, 0]
        }}
        transition={{ 
          duration: 0.5,
          repeat: isMuted ? 0 : Infinity,
          repeatDelay: 2
        }}
      >
        <span className="text-2xl">
          {isMuted ? '🔇' : '🔊'}
        </span>
      </motion.div>
      
      {/* Pulse indicator when active */}
      {!isMuted && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            border: '2px solid rgba(168, 241, 191, 0.4)',
            zIndex: -1
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.6, 0, 0.6]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      )}
    </motion.button>
  );
};

export default AudioControl;

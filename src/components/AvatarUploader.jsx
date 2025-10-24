import React, { useState } from 'react';
import { motion } from 'framer-motion';

const avatarOptions = ['👤', '👩‍💼', '👨‍💻', '👩‍🎨', '👨‍🔬', '👩‍🏫', '👨‍⚕️', '👩‍🚀', '👨‍🎤', '👩‍💻', '🧑‍🎨', '🧑‍💼'];

const AvatarUploader = ({ selectedAvatar, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <label 
        className="block text-[#EAEAEA] mb-3"
        style={{ 
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '0.85rem',
          fontWeight: '600',
          opacity: 0.8
        }}
      >
        Avatar Seç
      </label>

      {/* Selected avatar display */}
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-lg mx-auto mb-4"
        style={{
          background: 'linear-gradient(135deg, rgba(160, 232, 175, 0.2), rgba(160, 232, 175, 0.1))',
          border: '2px solid rgba(160, 232, 175, 0.4)'
        }}
      >
        {selectedAvatar}
      </motion.button>

      {/* Avatar picker dropdown */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute z-50 left-1/2 transform -translate-x-1/2 mt-2 p-4 rounded-xl shadow-xl"
          style={{
            background: 'rgba(28, 28, 28, 0.98)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            width: '280px'
          }}
        >
          <div className="grid grid-cols-6 gap-2">
            {avatarOptions.map((avatar, index) => (
              <motion.button
                key={index}
                type="button"
                onClick={() => {
                  onSelect(avatar);
                  setIsOpen(false);
                }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full flex items-center justify-center text-2xl transition-all"
                style={{
                  background: selectedAvatar === avatar 
                    ? 'rgba(160, 232, 175, 0.3)' 
                    : 'rgba(255, 255, 255, 0.05)',
                  border: selectedAvatar === avatar 
                    ? '2px solid rgba(160, 232, 175, 0.6)' 
                    : '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                {avatar}
              </motion.button>
            ))}
          </div>
          <p 
            className="text-center mt-3 text-[#EAEAEA]"
            style={{ 
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '0.75rem',
              opacity: 0.6
            }}
          >
            Avatarınızı seçin
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default AvatarUploader;

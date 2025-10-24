import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { motionTokens } from '../styles/motionTokens';

const ChalkDustParticle = ({ delay, angle }) => (
  <motion.div
    {...motionTokens.dustExit}
    initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
    animate={{
      opacity: 0,
      scale: 2,
      x: Math.cos(angle) * 80,
      y: Math.sin(angle) * 80,
      rotate: angle * 50,
    }}
    transition={{
      duration: 0.5,
      delay: delay,
      ease: "easeOut",
    }}
    className="absolute w-4 h-4 bg-gradient-to-br from-white via-gray-200 to-gray-400 rounded-full pointer-events-none"
  />
);

const BackButton = () => {
  const navigate = useNavigate();
  const [showDust, setShowDust] = useState(false);

  const handleBack = () => {
    setShowDust(true);
    
    setTimeout(() => {
      navigate('/');
    }, 700);
  };

  return (
    <>
      <motion.button
        onClick={handleBack}
        whileHover={{ scale: 1.08, x: -8 }}
        whileTap={{ scale: 0.92 }}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="fixed top-8 left-8 z-50 flex items-center gap-3 px-7 py-4 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-xl rounded-2xl border-2 border-white/20 text-white hover:border-white/40 transition-all group shadow-2xl"
      >
        <motion.span
          className="text-3xl"
          animate={{ x: [0, -6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          ←
        </motion.span>
        <span className="font-sans font-bold text-lg">Back to Board</span>
        
        {/* Chalk-to-Dust Particle Effect */}
        <AnimatePresence>
          {showDust && (
            <div className="absolute inset-0 flex items-center justify-center">
              {[...Array(16)].map((_, i) => {
                const angle = (Math.PI * 2 * i) / 16;
                return <ChalkDustParticle key={i} delay={i * 0.04} angle={angle} />;
              })}
            </div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
};

export default BackButton;

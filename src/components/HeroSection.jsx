import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = ({ lang }) => {
  const text = {
    tr: "Bir fikirle başlar her şey.",
    en: "Everything starts with an idea."
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center snap-start overflow-hidden">
      {/* Chalk dust particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#E8E2D0]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              y: [0, -30, 0],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Minimal chalkboard title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.95, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8
                       dark:text-[#E8E2D0] light:text-gray-900"
            style={{ fontFamily: 'Caveat, cursive', lineHeight: 1.2 }}
          >
            {text[lang]}
          </motion.h1>

          {/* Chalk underline animation */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 0.4 }}
            transition={{ delay: 0.8, duration: 1, ease: 'easeInOut' }}
            className="h-1 w-96 max-w-full mx-auto mb-12"
            style={{ 
              background: 'rgba(232, 226, 208, 0.6)',
              transformOrigin: 'left'
            }}
          />

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1.5 }}
            className="mt-20"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-sm dark:text-gray-400 light:text-gray-600 flex flex-col items-center gap-2"
            >
              <span className="text-xs uppercase tracking-widest">Aşağı kaydır</span>
              <div className="w-0.5 h-8 dark:bg-gray-600 light:bg-gray-400 rounded-full" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Subtle vignette */}
      <div className="absolute inset-0 pointer-events-none dark:bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.4)_100%)]
                      light:bg-[radial-gradient(circle_at_center,transparent_40%,rgba(255,255,255,0.3)_100%)]" />
    </section>
  );
};

export default HeroSection;

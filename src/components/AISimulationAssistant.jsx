import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { motionTokens } from '../styles/motionTokens';
import { aiAssistantPrompts } from '../data/mockPrototypeData';

const AISimulationAssistant = ({ currentPanelType = 'overview' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const prompts = aiAssistantPrompts[currentPanelType] || aiAssistantPrompts.overview;

  return (
    <>
      {/* Floating AI Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-2xl flex items-center justify-center text-2xl cursor-pointer"
        {...motionTokens.glowPulse}
      >
        ✨
      </motion.button>

      {/* AI Assistant Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-8 z-40 w-80 rounded-2xl backdrop-blur-xl border border-white/20 overflow-hidden shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(13, 13, 13, 0.95), rgba(28, 28, 28, 0.95))',
              boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.05), 0 8px 32px rgba(0, 0, 0, 0.4)'
            }}
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    className="text-2xl"
                  >
                    ✨
                  </motion.div>
                  <div>
                    <h3 className="font-handwriting text-lg text-white">PinMind AI</h3>
                    <p className="text-xs text-white/60">Prototype Assistant</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="w-6 h-6 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white text-sm"
                >
                  ×
                </motion.button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <p className="text-sm text-white/70 mb-4">
                {currentPanelType === 'overview' && '💡 Refine your concept'}
                {currentPanelType === 'ui' && '🎨 Design your interface'}
                {currentPanelType === 'flow' && '⚡ Build your logic'}
                {currentPanelType === 'output' && '📊 Define your metrics'}
                {currentPanelType === 'impact' && '🚀 Plan your strategy'}
              </p>

              <div className="space-y-2">
                {prompts.map((prompt, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full text-left px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all group"
                  >
                    <div className="flex items-center gap-2">
                      <motion.span 
                        className="text-sm"
                        {...motionTokens.waveSlide}
                      >
                        {prompt}
                      </motion.span>
                      <motion.span
                        initial={{ opacity: 0, x: -5 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        className="text-white/40 text-xs ml-auto"
                      >
                        →
                      </motion.span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 bg-white/5">
              <div className="flex items-center gap-2 text-xs text-white/50">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                AI Ready to assist
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AISimulationAssistant;

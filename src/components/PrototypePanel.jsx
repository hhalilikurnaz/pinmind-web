import React from 'react';
import { motion } from 'framer-motion';
import { motionTokens } from '../styles/motionTokens';

const PrototypePanel = ({ panel, index, isActive }) => {
  const typeColors = {
    overview: 'from-blue-500/20 to-blue-600/10',
    ui: 'from-purple-500/20 to-purple-600/10',
    flow: 'from-green-500/20 to-green-600/10',
    output: 'from-orange-500/20 to-orange-600/10',
    impact: 'from-pink-500/20 to-pink-600/10'
  };

  const typeIcons = {
    overview: '💡',
    ui: '🎨',
    flow: '⚡',
    output: '📊',
    impact: '🚀'
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      whileHover={{ scale: 1.02, y: -4 }}
      className={`flex-shrink-0 w-[380px] h-[600px] rounded-2xl p-6 backdrop-blur-xl border transition-all ${
        isActive ? 'border-white/30' : 'border-white/10'
      }`}
      style={{
        background: `linear-gradient(135deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02))`
      }}
    >
      {/* Stage Badge */}
      <div className="flex items-center gap-2 mb-4">
        <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${typeColors[panel.type]} border border-white/20 text-xs font-semibold text-white/90`}>
          {typeIcons[panel.type]} Stage {panel.stage}: {panel.title}
        </div>
      </div>

      {/* Content */}
      <div className="mb-6">
        <p className="text-white/80 text-sm leading-relaxed">
          {panel.content}
        </p>
      </div>

      {/* Elements Grid */}
      {panel.elements && (
        <div className="space-y-2 mb-6">
          {panel.elements.map((element, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + i * 0.05 }}
              className="flex items-center gap-2 text-sm text-white/70 bg-white/5 rounded-lg px-3 py-2 border border-white/5"
            >
              <span className="text-xs">{element}</span>
            </motion.div>
          ))}
        </div>
      )}

      {/* Flow Steps (for logic panels) */}
      {panel.flowSteps && (
        <div className="space-y-3 mb-6">
          {panel.flowSteps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + i * 0.08 }}
              className="relative"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500/30 to-green-600/20 border border-green-400/50 flex items-center justify-center text-xs font-bold text-white">
                  {i + 1}
                </div>
                <div className="flex-1 bg-white/5 rounded-lg px-3 py-2 border border-white/10 text-xs text-white/80">
                  {step}
                </div>
              </div>
              {i < panel.flowSteps.length - 1 && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 16 }}
                  transition={{ delay: index * 0.1 + i * 0.08 + 0.2 }}
                  className="w-0.5 bg-gradient-to-b from-green-400/50 to-transparent ml-4 my-1"
                />
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Mock Screens (for UI panels) */}
      {panel.mockScreens && (
        <div className="grid grid-cols-3 gap-2 mb-6">
          {panel.mockScreens.map((screen, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="aspect-[9/16] rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-400/30 flex items-center justify-center text-[10px] text-white/70 font-semibold p-2 text-center"
            >
              {screen}
            </motion.div>
          ))}
        </div>
      )}

      {/* Author Comment */}
      {panel.author && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.3 }}
          className="mt-auto pt-4 border-t border-white/10"
        >
          <div className="flex items-start gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-lg flex-shrink-0">
              {panel.author.avatar}
            </div>
            <div className="flex-1">
              <div className="text-xs font-semibold text-white/90 mb-1">
                {panel.author.name}
              </div>
              <div className="text-xs text-white/60 italic">
                "{panel.author.comment}"
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PrototypePanel;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Draggable from 'react-draggable';

// Muted chalkboard color palette
const colorMap = {
  yellow: '#E8E2D0',
  pink: '#F6D7D7',
  mint: '#C5E4D0',
  lavender: '#E8DCEC',
  teal: '#D0E8E4'
};

// Enhanced Pushpin with animation
const Pushpin = () => (
  <motion.svg 
    width="32" 
    height="32" 
    viewBox="0 0 24 24" 
    className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
    initial={{ scale: 0, y: -30, rotate: -180 }}
    animate={{ scale: 1, y: 0, rotate: 0 }}
    transition={{ 
      type: 'spring', 
      stiffness: 300, 
      damping: 15, 
      delay: 0.2 
    }}
    style={{
      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
    }}
  >
    {/* Pin head shadow */}
    <ellipse cx="12" cy="9" rx="7" ry="2" fill="rgba(0,0,0,0.2)" opacity="0.5" />
    
    {/* Pin body */}
    <circle cx="12" cy="8" r="7" fill="#DC2626" />
    <path d="M12 14 L12 28" stroke="#991B1B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    
    {/* Pin highlight */}
    <circle cx="12" cy="8" r="4" fill="#FCA5A5" opacity="0.7" />
    <circle cx="10" cy="6" r="2" fill="#FFFFFF" opacity="0.8" />
  </motion.svg>
);

const IdeaCard = ({ idea, onCardClick }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [rotation] = useState(Math.random() * 6 - 3); // Random tilt -3° to +3°
  const avgScore = Math.round((idea.feasibility + idea.innovation + idea.impact) / 3);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragStop = () => {
    setIsDragging(false);
  };

  return (
    <Draggable
      defaultPosition={{ x: 0, y: 0 }}
      bounds="parent"
      grid={[5, 5]} // 5px snap tolerance for neatness
      onStart={handleDragStart}
      onStop={handleDragStop}
      handle=".drag-handle"
    >
      <motion.div
        initial={{ 
          scale: 0, 
          rotate: rotation + 180, 
          opacity: 0 
        }}
        animate={{ 
          scale: 1, 
          rotate: rotation, 
          opacity: 1 
        }}
        whileHover={{ 
          scale: isDragging ? 1.08 : 1.05,
          rotate: 0,
          y: isDragging ? 0 : -6,
          zIndex: 50,
          boxShadow: isDragging 
            ? '0 30px 70px -15px rgba(0, 0, 0, 0.5)'
            : '0 25px 60px -15px rgba(0, 0, 0, 0.4)',
          transition: { duration: 0.3, ease: 'easeOut' }
        }}
        transition={{ 
          type: 'spring', 
          stiffness: 260, 
          damping: 20,
          delay: 0.1
        }}
        className="w-72 p-7 pt-10 rounded-2xl absolute cursor-move drag-handle border-2"
        style={{ 
          backgroundColor: colorMap[idea.color],
          borderColor: 'rgba(0, 0, 0, 0.08)',
          transformOrigin: 'center',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <Pushpin />

        {/* Card Content - Clickable */}
        <div 
          onClick={() => !isDragging && onCardClick(idea)}
          className="cursor-pointer select-none"
        >
          {/* Title with Handwritten Font */}
          <div className="flex items-start gap-2 mb-3">
            <h3 
              className="text-2xl flex-1 line-clamp-2 text-gray-800 leading-tight"
              style={{ 
                fontFamily: "'Caveat', cursive",
                fontWeight: 700
              }}
            >
              {idea.title}
            </h3>
            
            {/* Trending Badge */}
            {idea.isTrending && (
              <motion.span 
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: 'easeInOut' 
                }}
                className="text-2xl"
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(255, 100, 50, 0.6))'
                }}
              >
                🔥
              </motion.span>
            )}
          </div>

          {/* Summary Quote */}
          <p 
            className="text-xs text-gray-700 italic mb-4 line-clamp-2"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            "{idea.summary || idea.description}"
          </p>

          {/* Chalk-style divider line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="h-0.5 bg-gray-800/20 rounded-full mb-4"
            style={{ transformOrigin: 'left' }}
          />

          {/* Feasibility Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs text-gray-700 mb-1.5">
              <span className="font-semibold">Feasibility</span>
              <span className="font-bold">{idea.feasibility}%</span>
            </div>
            <div className="w-full h-2.5 bg-black/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${idea.feasibility}%` }}
                transition={{ 
                  duration: 1.2, 
                  delay: 0.5,
                  ease: 'easeOut'
                }}
                className="h-full rounded-full"
                style={{
                  background: idea.feasibility >= 70 
                    ? 'linear-gradient(90deg, #10B981, #059669)'
                    : 'linear-gradient(90deg, #F59E0B, #D97706)'
                }}
              />
            </div>
          </div>

          {/* Score Badge & Likes */}
          <div className="flex items-center justify-between">
            <span 
              className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                avgScore >= 80 ? 'bg-green-600/20 text-green-900' :
                avgScore >= 70 ? 'bg-yellow-600/20 text-yellow-900' :
                'bg-orange-600/20 text-orange-900'
              }`}
            >
              AI Score: {avgScore}
            </span>
            
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <span className="flex items-center gap-1">
                ❤️ <span className="font-semibold">{idea.likes}</span>
              </span>
              <span className="flex items-center gap-1">
                💬 <span className="font-semibold">{idea.comments || 0}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Chalk dust effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.1), transparent)',
            filter: 'blur(20px)'
          }}
        />
      </motion.div>
    </Draggable>
  );
};

export default IdeaCard;

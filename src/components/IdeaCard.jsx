import React from 'react';
import { motion } from 'framer-motion';
import Draggable from 'react-draggable';

const colorMap = {
  yellow: 'from-yellow-100 to-yellow-200',
  pink: 'from-pink-100 to-pink-200',
  mint: 'from-green-100 to-green-200',
  lavender: 'from-purple-100 to-purple-200',
  teal: 'from-blue-100 to-blue-200',
};

const Pushpin = () => (
  <motion.svg 
    width="28" 
    height="28" 
    viewBox="0 0 24 24" 
    className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 pointer-events-none drop-shadow-lg"
    initial={{ scale: 0, y: -20 }}
    animate={{ scale: 1, y: 0 }}
    transition={{ type: 'spring', stiffness: 400, damping: 10, delay: 0.1 }}
  >
    <circle cx="12" cy="8" r="7" fill="#DC2626" />
    <path d="M12 14 L12 26" stroke="#991B1B" strokeWidth="2.5" fill="none" />
    <circle cx="12" cy="8" r="3.5" fill="#FCA5A5" opacity="0.8" />
    <circle cx="10" cy="6" r="1.5" fill="#FFFFFF" opacity="0.6" />
  </motion.svg>
);

const IdeaCard = ({ idea, onCardClick }) => {
  const avgScore = Math.round((idea.feasibility + idea.innovation + idea.impact) / 3);
  const rotation = Math.random() * 6 - 3;

  return (
    <Draggable
      defaultPosition={idea.position}
      bounds="parent"
      handle=".drag-handle"
    >
      <motion.div
        initial={{ scale: 0, rotate: rotation + 180, opacity: 0 }}
        animate={{ scale: 1, rotate: rotation, opacity: 1 }}
        whileHover={{ 
          scale: 1.12, 
          rotate: 0,
          zIndex: 50,
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.4)',
        }}
        transition={{ 
          type: 'spring', 
          stiffness: 260, 
          damping: 18,
          hover: { duration: 0.3 }
        }}
        className={`bg-gradient-to-br ${colorMap[idea.color]} w-72 p-6 pt-9 rounded-2xl cursor-move absolute sticky-note drag-handle shadow-xl border border-black/10`}
        style={{ 
          transformOrigin: 'center',
        }}
      >
        <Pushpin />

        <div onClick={() => onCardClick(idea)} className="cursor-pointer">
          <h3 className="font-handwriting text-2xl mb-2 text-gray-800 line-clamp-2">
            {idea.title}
          </h3>

          <p className="font-sans text-xs text-gray-700 italic mb-3 line-clamp-2">
            "{idea.summary}"
          </p>

          {/* Feasibility Bar */}
          <div className="mb-3">
            <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
              <span>Feasibility</span>
              <span className="font-bold">{idea.feasibility}%</span>
            </div>
            <div className="w-full h-2 bg-black/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${idea.feasibility}%` }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-full bg-gradient-to-r from-green-500 to-green-600"
              />
            </div>
          </div>

          {/* Score Badge */}
          <div className="flex items-center justify-center">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              avgScore >= 80 ? 'bg-green-600/20 text-green-800' :
              avgScore >= 70 ? 'bg-yellow-600/20 text-yellow-800' :
              'bg-orange-600/20 text-orange-800'
            }`}>
              AI Score: {avgScore}
            </span>
          </div>
        </div>
      </motion.div>
    </Draggable>
  );
};

export default IdeaCard;

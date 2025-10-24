import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ideas } from '../utils/mockData';
import { motionTokens } from '../styles/motionTokens';
import ChalkParticles from '../components/ChalkParticles';

// Muted color palette - calm and organized
const colorMap = {
  yellow: '#E8E2D0',
  pink: '#F6D7D7',
  mint: '#C5E4D0',
  lavender: '#E8DCEC',
  teal: '#D0E8E4'
};

const Pushpin = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" className="absolute -top-2 left-1/2 -translate-x-1/2">
    <circle cx="12" cy="8" r="6" fill="#DC2626" />
    <path d="M12 14 L12 24" stroke="#DC2626" strokeWidth="2" fill="none" />
    <circle cx="12" cy="8" r="3" fill="#EF4444" />
  </svg>
);

const IdeaCard = ({ idea, onClick }) => {
  const [rotation] = useState(Math.random() * 2 - 1); // subtle rotation jitter

  return (
    <motion.div
      {...motionTokens.fadeInSoft}
      whileHover={{ 
        rotate: rotation + 0.5, 
        scale: 1.02, 
        y: -4,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      style={{ 
        backgroundColor: colorMap[idea.color],
        rotate: rotation 
      }}
      className={`relative cursor-pointer p-6 pt-8 rounded-2xl text-gray-800 min-h-[220px] shadow-md hover:shadow-lg transition-all ${
        idea.isTrending ? 'trending-glow' : ''
      }`}
    >
      <Pushpin />
      
      <div className="flex items-center gap-2 mb-3">
        <h3 className="font-handwriting text-2xl flex-1 line-clamp-2">
          {idea.title}
        </h3>
        {idea.isTrending && (
          <motion.span 
            {...motionTokens.glowPulse}
            className="text-xl"
          >
            🔥
          </motion.span>
        )}
      </div>
      
      <p className="font-sans text-sm opacity-70 line-clamp-3 mb-4">
        {idea.description}
      </p>

      <div className="flex items-center gap-3 text-sm">
        <span className="px-3 py-1 rounded-full bg-black/5 font-medium">
          �� {Math.round((idea.feasibility + idea.innovation + idea.impact) / 3)}%
        </span>
        <span className="text-gray-600">❤️ {idea.likes}</span>
        <span className="text-gray-600 ml-auto">�� {idea.category}</span>
      </div>
    </motion.div>
  );
};

const Board = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  const filteredIdeas = filter === 'all' ? ideas : ideas.filter(idea => 
    filter === 'trending' ? idea.isTrending : idea.category === filter
  );

  const categories = ['all', 'trending', ...Array.from(new Set(ideas.map(i => i.category)))];

  return (
    <>
      {/* Floating Chalk Particles Background */}
      <ChalkParticles count={5} />
      
      <motion.div 
        {...motionTokens.fadeInSoft}
        className="min-h-screen pt-24 pb-24 px-6 relative"
        style={{ zIndex: 1 }}
      >
        <div className="max-w-7xl mx-auto relative z-10">
        {/* Header - reduced size, increased opacity */}
        <motion.div 
          {...motionTokens.fadeUp}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-handwriting text-white mb-2" style={{ fontSize: '1.75rem' }}>
            Your Idea Wall
          </h1>
          <p className="text-white/80 font-sans text-sm">Organize and develop your creative ideas</p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div 
          {...motionTokens.fadeUp}
          className="flex items-center gap-2 mb-8 overflow-x-auto pb-2"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full font-sans text-sm whitespace-nowrap transition-all ${
                filter === cat
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {cat === 'trending' && '🔥 '}
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Ideas Grid */}
        <motion.div
          {...motionTokens.staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredIdeas.map((idea) => (
            <motion.div key={idea.id} {...motionTokens.staggerItem}>
              <IdeaCard 
                idea={idea} 
                onClick={() => navigate(`/idea/${idea.id}`)} 
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Floating Add Button */}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-28 right-8 w-16 h-16 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-white text-3xl font-bold shadow-2xl z-40"
        >
          +
        </motion.button>
      </div>
    </motion.div>
    </>
  );
};

export default Board;

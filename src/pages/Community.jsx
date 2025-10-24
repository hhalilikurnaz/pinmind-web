import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ideas } from '../utils/mockData';
import { motionTokens } from '../styles/motionTokens';

const sortOptions = [
  { id: 'popular', label: '🔥 Popular', key: 'likes' },
  { id: 'recent', label: '🕐 Recent', key: 'createdAt' },
  { id: 'top', label: '⭐ Top Rated', key: 'score' },
];

const CommunityCard = ({ idea }) => {
  const navigate = useNavigate();
  const [localLikes, setLocalLikes] = useState(idea.likes);
  const [hasLiked, setHasLiked] = useState(false);

  const handleLike = () => {
    if (!hasLiked) {
      setLocalLikes(localLikes + 1);
      setHasLiked(true);
    }
  };

  const avgScore = Math.round((idea.feasibility + idea.innovation + idea.impact) / 3);

  return (
    <motion.div
      {...motionTokens.fadeInSoft}
      whileHover={{ 
        rotate: 0.5, 
        scale: 1.02, 
        y: -4,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(`/idea/${idea.id}`)}
      style={{
        backgroundColor: idea.isTrending ? '#E8DCEC' : '#E8E2D0',
      }}
      className={`cursor-pointer rounded-2xl p-6 text-gray-800 mb-4 shadow-md hover:shadow-lg transition-all ${
        idea.isTrending ? 'trending-glow' : ''
      }`}
    >
      {/* User Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-2xl">
          {idea.author?.avatar || '👤'}
        </div>
        <div>
          <p className="font-semibold font-sans">{idea.author?.name || 'Anonymous'}</p>
          <p className="text-sm text-gray-500">{idea.createdAt || '2 days ago'}</p>
        </div>
        {idea.isTrending && (
          <motion.span 
            {...motionTokens.glowPulse}
            className="ml-auto text-2xl"
          >
            🔥
          </motion.span>
        )}
      </div>

      {/* Content */}
      <h3 className="font-handwriting text-3xl mb-2 text-gray-900">
        {idea.title}
      </h3>
      <p className="font-sans text-sm text-gray-600 mb-4 line-clamp-2">
        {idea.description}
      </p>

      {/* Score Badge */}
      <div className="inline-flex items-center gap-2 mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          avgScore >= 85 
            ? 'bg-green-100 text-green-700'
            : avgScore >= 70
            ? 'bg-yellow-100 text-yellow-700'
            : 'bg-orange-100 text-orange-700'
        }`}>
          AI Score: {avgScore}%
        </span>
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-700">
          {idea.category}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6 pt-4 border-t border-gray-200">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            handleLike();
          }}
          className={`flex items-center gap-2 font-sans text-sm font-semibold transition-colors ${
            hasLiked ? 'text-red-600' : 'text-gray-600 hover:text-red-600'
          }`}
        >
          <span className="text-xl">{hasLiked ? '❤️' : '🤍'}</span>
          {localLikes}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-2 font-sans text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors"
        >
          <span className="text-xl">💬</span>
          {idea.comments || 12}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-2 font-sans text-sm font-semibold text-gray-600 hover:text-green-600 transition-colors"
        >
          <span className="text-xl">🔗</span>
          Share
        </motion.button>
      </div>
    </motion.div>
  );
};

const Community = () => {
  const [sortBy, setSortBy] = useState('popular');

  const sortedIdeas = [...ideas].sort((a, b) => {
    if (sortBy === 'popular') return b.likes - a.likes;
    if (sortBy === 'top') {
      const avgA = (a.feasibility + a.innovation + a.impact) / 3;
      const avgB = (b.feasibility + b.innovation + b.impact) / 3;
      return avgB - avgA;
    }
    return 0;
  });

  return (
    <motion.div 
      {...motionTokens.fadeInSoft}
      className="min-h-screen pt-24 pb-24 px-6"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          {...motionTokens.fadeUp}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-handwriting text-white mb-4">
            Community Feed
          </h1>
          <p className="text-gray-400 font-sans">Discover and connect with creative minds</p>
        </motion.div>

        {/* Sort Options */}
        <motion.div 
          {...motionTokens.fadeUp}
          className="flex items-center gap-2 mb-8 overflow-x-auto pb-2"
        >
          {sortOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setSortBy(option.id)}
              className={`px-4 py-2 rounded-full font-sans text-sm whitespace-nowrap transition-all ${
                sortBy === option.id
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {option.label}
            </button>
          ))}
        </motion.div>

        {/* Ideas Feed */}
        <motion.div {...motionTokens.staggerContainer}>
          {sortedIdeas.map((idea) => (
            <motion.div key={idea.id} {...motionTokens.staggerItem}>
              <CommunityCard idea={idea} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Community;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';
import { motionTokens } from '../styles/motionTokens';

// Chalk Dust Particles Component
const ChalkDust = () => {
  const particles = [
    { id: 1, x: '20%', delay: 0 },
    { id: 2, x: '50%', delay: 1.5 },
    { id: 3, x: '75%', delay: 3 },
    { id: 4, x: '90%', delay: 4.5 }
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full bg-[#E8E2D0]"
          style={{ left: particle.x, top: '-20px' }}
          animate={{
            y: ['0vh', '110vh'],
            opacity: [0, 0.3, 0.2, 0],
            scale: [0.5, 1, 0.8, 0.3]
          }}
          transition={{
            duration: 15,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      ))}
    </div>
  );
};

// Weekly Challenge Card Component
const WeeklyChallengeCard = ({ index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.05 }}
      className="w-full max-w-[700px] mx-auto mb-8"
    >
      <div 
        className="relative rounded-2xl p-8 shadow-lg overflow-hidden"
        style={{ 
          background: 'rgba(232, 226, 208, 0.85)',
          backdropFilter: 'blur(20px)'
        }}
      >
        {/* Chalk line decoration */}
        <motion.svg
          className="absolute top-0 left-0 w-full h-1"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.6 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.path
            d="M 0 4 Q 350 2, 700 4"
            stroke="#FFFFFF"
            strokeWidth="2"
            fill="none"
          />
        </motion.svg>

        <div className="text-center">
          <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold text-[#1A1A1A] mb-3"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            💡 This Week's Question
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.8 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-lg text-[#2A2A2A] mb-6"
            style={{ 
              fontFamily: 'Caveat, cursive',
              lineHeight: '1.65em'
            }}
          >
            "How might AI enhance daily creativity?"
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 rounded-full bg-[#2A2A2A] text-[#EAEAEA] font-semibold shadow-md hover:shadow-lg transition-all"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            Share your thoughts
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// Main Feed Card Component
const CommunityCard = ({ idea, index }) => {
  const navigate = useNavigate();
  const { toggleLike } = useStore();
  const [isHovered, setIsHovered] = useState(false);

  // Muted accent colors
  const accentColors = {
    green: '#79CBA8',
    blue: '#6AAEE3',
    pink: '#D68BA0'
  };

  const getAccentColor = () => {
    const colors = Object.values(accentColors);
    return colors[idea.id % colors.length];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full max-w-[700px] mx-auto mb-8 cursor-pointer"
      onClick={() => navigate(`/idea/${idea.id}`)}
    >
      <motion.div
        animate={isHovered ? {
          scale: 1.01,
          boxShadow: `0 0 8px rgba(255, 255, 255, 0.15), 0 0 20px ${getAccentColor()}22`
        } : {
          scale: 1,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="rounded-2xl p-6 overflow-hidden"
        style={{
          background: '#2A2A2A',
          border: `1px solid ${isHovered ? getAccentColor() + '40' : 'rgba(255, 255, 255, 0.1)'}`,
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-md"
              style={{ 
                background: `linear-gradient(135deg, ${getAccentColor()}40, ${getAccentColor()}20)`,
                border: `1px solid ${getAccentColor()}60`
              }}
            >
              {idea.author[0]}
            </div>
            <div>
              <p 
                className="font-semibold text-[#EAEAEA]"
                style={{ 
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.95rem',
                  opacity: 0.9
                }}
              >
                {idea.author}
              </p>
              <p 
                className="text-[#EAEAEA]"
                style={{ 
                  fontSize: '0.75rem',
                  opacity: 0.6,
                  fontFamily: 'DM Sans, sans-serif'
                }}
              >
                {new Date(idea.createdAt).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="mb-4">
          <h3 
            className="text-[#EAEAEA] mb-2"
            style={{ 
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '1.25rem',
              fontWeight: 'bold',
              opacity: 0.9,
              lineHeight: '1.5em'
            }}
          >
            {idea.title}
          </h3>
          <p 
            className="text-[#EAEAEA] line-clamp-3"
            style={{ 
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '0.9rem',
              opacity: 0.7,
              lineHeight: '1.65em'
            }}
          >
            {idea.description}
          </p>
        </div>

        {/* Divider */}
        <div 
          className="h-px mb-4"
          style={{ 
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)'
          }}
        />

        {/* Footer */}
        <div className="flex items-center gap-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              toggleLike(idea.id);
            }}
            className="flex items-center gap-2 text-[#EAEAEA] transition-opacity hover:opacity-100"
            style={{ opacity: 0.7 }}
          >
            <span className="text-lg">❤️</span>
            <span 
              style={{ 
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.85rem',
                fontWeight: '600'
              }}
            >
              {idea.likes}
            </span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-2 text-[#EAEAEA] transition-opacity hover:opacity-100"
            style={{ opacity: 0.7 }}
          >
            <span className="text-lg">💬</span>
            <span 
              style={{ 
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.85rem',
                fontWeight: '600'
              }}
            >
              {idea.comments}
            </span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2 text-[#EAEAEA] transition-opacity hover:opacity-100"
            style={{ opacity: 0.7 }}
          >
            <span className="text-lg">🤝</span>
            <span 
              style={{ 
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.85rem',
                fontWeight: '600'
              }}
            >
              Collaborate
            </span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const CommunityFeed = () => {
  const { ideas } = useStore();
  const navigate = useNavigate();
  const [displayedIdeas, setDisplayedIdeas] = useState([]);
  const [activeFilter, setActiveFilter] = useState('🔥 TRENDING');
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Sort ideas by likes (descending)
  const sortedIdeas = [...ideas].sort((a, b) => b.likes - a.likes);

  // Initialize with first 5 ideas
  useEffect(() => {
    setDisplayedIdeas(sortedIdeas.slice(0, 5));
  }, []);

  // Mock infinite scroll - load 5 more posts
  const loadMorePosts = () => {
    if (isLoadingMore || displayedIdeas.length >= sortedIdeas.length) return;
    
    setIsLoadingMore(true);
    setTimeout(() => {
      const currentLength = displayedIdeas.length;
      const nextBatch = sortedIdeas.slice(currentLength, currentLength + 5);
      setDisplayedIdeas([...displayedIdeas, ...nextBatch]);
      setIsLoadingMore(false);
    }, 500);
  };

  // Detect scroll to bottom
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      
      if (scrollTop + windowHeight >= docHeight - 300) {
        loadMorePosts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [displayedIdeas, isLoadingMore]);

  // Inject weekly challenge every 5 posts
  const feedWithChallenges = [];
  displayedIdeas.forEach((idea, index) => {
    feedWithChallenges.push({ type: 'idea', data: idea, key: `idea-${idea.id}` });
    if ((index + 1) % 5 === 0) {
      feedWithChallenges.push({ type: 'challenge', key: `challenge-${index}` });
    }
  });

  const filters = [
    { emoji: '🔥', label: 'TRENDING' },
    { emoji: '🆕', label: 'LATEST' },
    { emoji: '⭐', label: 'TOP RATED' },
    { emoji: '💡', label: 'RANDOM' }
  ];

  return (
    <div 
      className="min-h-screen relative overflow-x-hidden"
      style={{
        background: 'linear-gradient(135deg, #121212 0%, #1C1C1C 100%)',
      }}
    >
      {/* Vignette overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)'
        }}
      />

      {/* Chalk texture overlay (parallax) */}
      <motion.div 
        className="fixed inset-0 pointer-events-none z-5 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(232, 226, 208, 0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
        animate={{
          backgroundPosition: ['0px 0px', '40px 40px']
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear'
        }}
      />

      {/* Chalk dust particles */}
      <ChalkDust />

      {/* Fixed Navbar with gradient */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: 'linear-gradient(to bottom, rgba(13, 13, 13, 0.95) 0%, rgba(28, 28, 28, 0) 100%)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }}
      >
        <div className="max-w-4xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between mb-4">
            <motion.button
              onClick={() => navigate('/')}
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.95 }}
              className="text-[#EAEAEA] hover:text-white transition-colors font-semibold"
              style={{ 
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.9rem',
                opacity: 0.8
              }}
            >
              ← Back to Board
            </motion.button>

            {/* Add Idea button with ambient glow */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  '0 0 0px rgba(121, 203, 168, 0)',
                  '0 0 20px rgba(121, 203, 168, 0.6)',
                  '0 0 0px rgba(121, 203, 168, 0)'
                ]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="px-5 py-2 rounded-full bg-[#79CBA8] text-[#1A1A1A] font-bold text-sm shadow-lg"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              + Add Idea
            </motion.button>
          </div>

          {/* Title & Subtitle */}
          <div className="text-center mb-4">
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.8, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[#EAEAEA] mb-2"
              style={{ 
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '1.5rem',
                fontWeight: 'bold'
              }}
            >
              Community Feed 🌍
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.3 }}
              className="text-[#EAEAEA]"
              style={{ 
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.9rem',
                lineHeight: '1.65em'
              }}
            >
              Discover ideas, challenges, and creative sparks.
            </motion.p>
            
            {/* Chalk line divider */}
            <motion.div 
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 0.4 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="h-px mx-auto mt-3"
              style={{ 
                width: '200px',
                background: 'rgba(232, 226, 208, 0.6)'
              }}
            />
          </div>
        </div>

        {/* Sticky Filters */}
        <div 
          className="sticky top-0 z-40 px-6 pb-4"
          style={{
            background: 'linear-gradient(to bottom, rgba(13, 13, 13, 0.98), rgba(28, 28, 28, 0.95))',
            backdropFilter: 'blur(10px)'
          }}
        >
          <div className="max-w-4xl mx-auto flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory hide-scrollbar">
            {filters.map((filter, index) => {
              const isActive = activeFilter === `${filter.emoji} ${filter.label}`;
              return (
                <motion.button
                  key={filter.label}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveFilter(`${filter.emoji} ${filter.label}`)}
                  className="snap-center px-5 py-2 rounded-full whitespace-nowrap transition-all flex-shrink-0"
                  style={{
                    background: isActive ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.08)',
                    border: `1px solid ${isActive ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.12)'}`,
                    color: '#EAEAEA',
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    letterSpacing: '0.5px',
                    opacity: isActive ? 1 : 0.8
                  }}
                >
                  <span className="mr-1.5">{filter.emoji}</span>
                  {filter.label}
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.header>

      {/* Main Feed Content */}
      <div className="pt-[240px] pb-16 px-4 relative z-10">
        <motion.div
          initial="initial"
          animate="animate"
          variants={{
            animate: {
              transition: {
                staggerChildren: 0.05,
                delayChildren: 0.1
              }
            }
          }}
          className="max-w-4xl mx-auto"
        >
          <AnimatePresence mode="wait">
            {feedWithChallenges.map((item, index) => (
              item.type === 'idea' ? (
                <CommunityCard 
                  key={item.key} 
                  idea={item.data} 
                  index={index}
                />
              ) : (
                <WeeklyChallengeCard 
                  key={item.key}
                  index={index}
                />
              )
            ))}
          </AnimatePresence>

          {/* Loading indicator */}
          {isLoadingMore && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <div 
                className="inline-block text-[#EAEAEA]"
                style={{ 
                  fontFamily: 'DM Sans, sans-serif',
                  opacity: 0.6
                }}
              >
                Loading more ideas...
              </div>
            </motion.div>
          )}

          {/* End of feed message */}
          {displayedIdeas.length >= sortedIdeas.length && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <p 
                className="text-[#EAEAEA] mb-4"
                style={{ 
                  fontFamily: 'Caveat, cursive',
                  fontSize: '1.3rem',
                  opacity: 0.6
                }}
              >
                You've reached the end! ✨
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-6 py-3 rounded-full bg-[#2A2A2A] text-[#EAEAEA] font-semibold"
                style={{ 
                  fontFamily: 'DM Sans, sans-serif',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                Back to top ↑
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CommunityFeed;

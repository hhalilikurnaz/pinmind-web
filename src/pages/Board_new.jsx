import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ideas } from '../utils/mockData';
import IdeaCard from '../components/IdeaCard';

// Chalk Motion System Tokens
const chalkMotion = {
  chalkWrite: {
    initial: { 
      pathLength: 0, 
      opacity: 0 
    },
    animate: { 
      pathLength: 1, 
      opacity: 0.85,
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      }
    }
  },

  chalkErase: {
    exit: {
      opacity: 0,
      scale: 0.9,
      filter: "blur(8px)",
      transition: { 
        duration: 0.6, 
        ease: "easeInOut" 
      }
    }
  },

  dustExit: {
    exit: {
      opacity: 0,
      y: -20,
      transition: { 
        duration: 0.5, 
        ease: "easeOut" 
      }
    }
  },

  fadeInSoft: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

// Chalk Dust Particles Component
const ChalkDustParticles = ({ count = 12, opacity = 0.8 }) => {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 5 + 2,
    delay: Math.random() * 3,
    duration: Math.random() * 15 + 10,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent)',
            filter: 'blur(1.5px)',
          }}
          animate={{
            opacity: [0.2 * opacity, 0.6 * opacity, 0.2 * opacity],
            y: [0, -40, 0],
            x: [0, Math.random() * 20 - 10, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

const Board = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [isErasing, setIsErasing] = useState(false);

  const filteredIdeas = filter === 'all' ? ideas : ideas.filter(idea => 
    filter === 'trending' ? idea.isTrending : idea.category === filter
  );

  const categories = ['all', 'trending', ...Array.from(new Set(ideas.map(i => i.category)))];

  const handleCardClick = (ideaId) => {
    // Chalk write animation before navigation
    setTimeout(() => {
      navigate(`/idea/${ideaId}`);
    }, 300);
  };

  const handleBackToBoard = () => {
    setIsErasing(true);
    setTimeout(() => {
      setIsErasing(false);
    }, 600);
  };

  return (
    <>
      {/* Chalkboard Base Layer - z-index: 0 */}
      <div 
        className="fixed inset-0 overflow-hidden"
        style={{ 
          zIndex: 0,
          background: 'linear-gradient(180deg, #0D0D0D 0%, #1C1C1C 100%)',
        }}
      >
        {/* Chalkboard texture overlay */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px'
          }}
        />

        {/* Vignette overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.5) 100%)'
          }}
        />
      </div>

      {/* Floating Chalk Dust Particles - z-index: 0 */}
      <ChalkDustParticles count={12} opacity={isErasing ? 0.2 : 0.8} />

      {/* Content Layer - z-index: 1 */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={filter}
          {...chalkMotion.fadeInSoft}
          exit={isErasing ? chalkMotion.chalkErase : {}}
          className="min-h-screen pt-24 pb-24 px-6 relative"
          style={{ zIndex: 1 }}
        >
          <div className="max-w-7xl mx-auto relative">
            {/* Header */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h1 
                className="text-5xl font-bold mb-3"
                style={{ 
                  fontFamily: "'Caveat', cursive",
                  color: 'rgba(255, 255, 255, 0.9)',
                  textShadow: '0 0 20px rgba(197, 228, 208, 0.4)'
                }}
              >
                Your Idea Wall
              </h1>
              
              {/* Chalk underline */}
              <svg width="200" height="10" className="mx-auto">
                <motion.path
                  d="M10 5 L190 5"
                  stroke="rgba(255, 255, 255, 0.85)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                  {...chalkMotion.chalkWrite}
                />
              </svg>

              <p 
                className="text-white/70 font-sans text-sm mt-4"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Pin, organize, and evolve your creative ideas
              </p>
            </motion.div>

            {/* Filter Tabs with Chalk Style */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex items-center justify-center gap-3 mb-12 flex-wrap"
            >
              {categories.map((cat, idx) => (
                <motion.button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -2,
                    boxShadow: filter === cat 
                      ? '0 0 30px rgba(197, 228, 208, 0.6)'
                      : '0 0 15px rgba(255, 255, 255, 0.2)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-5 py-2.5 rounded-full font-sans text-sm whitespace-nowrap transition-all border-2 ${
                    filter === cat
                      ? 'bg-[#C5E4D0]/20 text-white border-[#C5E4D0] shadow-lg'
                      : 'bg-white/5 text-gray-400 border-white/20 hover:bg-white/10 hover:border-white/30'
                  }`}
                  style={{
                    backdropFilter: 'blur(10px)',
                    boxShadow: filter === cat ? '0 0 20px rgba(197, 228, 208, 0.4)' : 'none'
                  }}
                >
                  {cat === 'trending' && '🔥 '}
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </motion.button>
              ))}
            </motion.div>

            {/* Ideas Grid - Draggable Cards */}
            <div className="relative min-h-[600px]">
              <AnimatePresence mode="popLayout">
                {filteredIdeas.map((idea, idx) => (
                  <motion.div
                    key={idea.id}
                    initial={{ opacity: 0, scale: 0.8, rotate: Math.random() * 20 - 10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ 
                      ...chalkMotion.dustExit.exit,
                      transition: { delay: idx * 0.05, ...chalkMotion.dustExit.exit.transition }
                    }}
                    transition={{ 
                      delay: idx * 0.08,
                      duration: 0.5,
                      type: 'spring',
                      stiffness: 200,
                      damping: 20
                    }}
                    className="inline-block"
                  >
                    <IdeaCard 
                      idea={idea} 
                      onCardClick={() => handleCardClick(idea.id)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Floating Add Button with Chalk Glow */}
            <motion.button
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              whileHover={{ 
                scale: 1.15,
                rotate: 90,
                boxShadow: '0 0 40px rgba(197, 228, 208, 0.6)'
              }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="fixed bottom-28 right-8 w-16 h-16 rounded-full bg-[#C5E4D0] text-black text-4xl font-bold shadow-2xl z-40 flex items-center justify-center"
              style={{
                boxShadow: '0 0 30px rgba(197, 228, 208, 0.5), 0 8px 24px rgba(0,0,0,0.3)'
              }}
            >
              +
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default Board;

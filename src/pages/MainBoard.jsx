import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';
import IdeaCard from '../components/IdeaCard';
import { mockIdeas } from '../utils/mockGeminiAPI';

const MainBoard = () => {
  const navigate = useNavigate();
  const [ideas, setIdeas] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    // Load mock ideas on mount
    setIdeas(mockIdeas);
  }, []);

  const handleCardClick = (idea) => {
    // Set selected idea in store
    useStore.setState({ 
      selectedIdea: idea,
      chatMessages: idea.chatHistory || [],
    });
    
    // Zoom-in transition to idea space
    navigate(`/idea/${idea.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-chalkboard to-gray-800 relative overflow-hidden">
      {/* Chalkboard Texture Overlay */}
      <div className="absolute inset-0 vignette pointer-events-none" />

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-40 bg-chalkboard/90 backdrop-blur-md border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.h1 
            className="text-4xl font-handwriting text-white chalk-text"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            PinMind
          </motion.h1>
          <motion.nav 
            className="flex gap-6 font-sans text-sm font-semibold"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <a href="#" className="text-white hover:text-blue-400 transition-colors">Board</a>
            <a href="/community" className="text-white/70 hover:text-white transition-colors">Community</a>
            <span className="text-white/50">|</span>
            <span className="text-white/50 text-xs bg-white/10 px-2 py-1 rounded">
              {ideas.length} Ideas
            </span>
          </motion.nav>
        </div>
      </motion.header>

      {/* Board Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="pt-32 pb-8 text-center"
      >
        <h2 className="text-5xl font-handwriting text-white/90 chalk-text mb-3">
          Your Idea Wall
        </h2>
        <p className="text-white/60 font-sans text-lg">
          Click any card to open creative workspace
        </p>
      </motion.div>

      {/* Board Area */}
      <div className="pb-32 min-h-screen px-6">
        <motion.div 
          className="relative w-full min-h-[600px] max-w-[1400px] mx-auto"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.12,
                delayChildren: 0.6
              }
            }
          }}
        >
          {ideas.map((idea, index) => (
            <motion.div
              key={idea.id}
              variants={{
                hidden: { opacity: 0, y: 50, scale: 0.8 },
                visible: { opacity: 1, y: 0, scale: 1 }
              }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <IdeaCard
                idea={idea}
                onCardClick={handleCardClick}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Floating "+ Add Idea" Button */}
      <motion.button
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 200, damping: 15 }}
        whileHover={{ scale: 1.15, rotate: 90 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-10 right-10 w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white text-5xl font-bold shadow-2xl hover:shadow-blue-500/60 transition-all z-50 flex items-center justify-center group"
      >
        <span className="group-hover:rotate-90 transition-transform duration-300">+</span>
      </motion.button>

      {/* Add Idea Modal (Mock Placeholder) */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setShowAddModal(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.8, y: 100, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 100, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-gradient-to-br from-yellow-50 to-yellow-100 p-10 rounded-3xl shadow-2xl border-4 border-yellow-200/50"
            >
              {/* Pushpin Effect */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-red-500 shadow-lg" />
              
              <motion.button
                whileHover={{ scale: 1.15, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowAddModal(false)}
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-red-400/30 hover:bg-red-400/50 font-bold text-3xl text-gray-700 transition-colors"
              >
                ×
              </motion.button>

              <motion.h2 
                className="font-handwriting text-5xl mb-2 text-gray-800"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                + Add New Idea
              </motion.h2>

              <p className="text-gray-600 font-sans mb-6 text-sm">
                (Mock interface - no backend logic)
              </p>

              <motion.input
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                type="text"
                placeholder="Your brilliant idea title..."
                className="w-full px-5 py-4 mb-4 rounded-2xl border-3 border-gray-300 bg-white/80 text-gray-800 font-sans text-lg placeholder:text-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all"
              />

              <motion.textarea
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                placeholder="Describe your idea here..."
                rows="4"
                className="w-full px-5 py-4 mb-6 rounded-2xl border-3 border-gray-300 bg-white/80 text-gray-800 font-sans placeholder:text-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 resize-none transition-all"
              />

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(59, 130, 246, 0.4)' }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-sans font-bold text-lg shadow-xl transition-all"
              >
                📌 Pin It to Board (Mock)
              </motion.button>

              <motion.p 
                className="text-center text-gray-500 text-xs mt-5 italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                ✨ In the full version, this will trigger AI analysis
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MainBoard;

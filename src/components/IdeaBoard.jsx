import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Draggable from 'react-draggable';
import { motionTokens, chalkboardColors } from '../utils/motionTokens';

// 🎨 IdeaBoard: Interactive workspace with draggable cards
// Final destination after cinematic journey

const IdeaBoard = () => {
  const [filter, setFilter] = useState('hepsi');
  const [ideas, setIdeas] = useState([
    { id: 1, title: 'Yapay Zeka Asistanı', category: 'teknoloji', likes: 24, icon: '🤖', x: 50, y: 100 },
    { id: 2, title: 'Sürdürülebilir Enerji', category: 'cevre', likes: 18, icon: '🌱', x: 300, y: 150 },
    { id: 3, title: 'Eğitim Platformu', category: 'egitim', likes: 32, icon: '📚', x: 550, y: 100 },
    { id: 4, title: 'Sağlık İzleme', category: 'saglik', likes: 15, icon: '❤️', x: 150, y: 350 },
    { id: 5, title: 'Topluluk Uygulaması', category: 'sosyal', likes: 28, icon: '👥', x: 400, y: 300 },
    { id: 6, title: 'Yerel Üretim', category: 'cevre', likes: 21, icon: '🌾', x: 650, y: 350 },
  ]);

  const categories = [
    { id: 'hepsi', label: 'Hepsi', icon: '✨' },
    { id: 'teknoloji', label: 'Teknoloji', icon: '💻' },
    { id: 'cevre', label: 'Çevre', icon: '🌍' },
    { id: 'egitim', label: 'Eğitim', icon: '📖' },
    { id: 'saglik', label: 'Sağlık', icon: '🏥' },
    { id: 'sosyal', label: 'Sosyal', icon: '🤝' },
  ];

  const filteredIdeas = filter === 'hepsi' 
    ? ideas 
    : ideas.filter(idea => idea.category === filter);

  const handleLike = (id) => {
    setIdeas(prev => prev.map(idea => 
      idea.id === id ? { ...idea, likes: idea.likes + 1 } : idea
    ));
  };

  return (
    <section className="relative min-h-screen px-6 py-20">
      {/* Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={motionTokens.fadeInSoft}
        className="text-center mb-12 z-20 relative"
      >
        <h2 
          className="text-5xl md:text-7xl font-bold mb-4"
          style={{ 
            fontFamily: "'Caveat', cursive",
            color: chalkboardColors.text,
            textShadow: `0 0 30px ${chalkboardColors.glow}`
          }}
        >
          İnteraktif Fikir Tahtası
        </h2>
        <p 
          className="text-xl md:text-2xl"
          style={{ color: chalkboardColors.textSoft }}
        >
          Fikirleri sürükle, beğen, keşfet
        </p>

        {/* Chalk underline */}
        <motion.div
          className="w-64 h-1 mx-auto mt-6 rounded-full"
          style={{ 
            backgroundColor: chalkboardColors.mint,
            transformOrigin: 'center'
          }}
          variants={motionTokens.chalkWrite}
        />
      </motion.div>

      {/* Filter tabs */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={motionTokens.fadeInSoft}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap justify-center gap-3 mb-12 z-20 relative"
      >
        {categories.map((cat, idx) => (
          <motion.button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className="px-6 py-3 rounded-xl border-2 transition-all duration-300"
            style={{
              backgroundColor: filter === cat.id ? chalkboardColors.cardBg : 'transparent',
              borderColor: filter === cat.id ? chalkboardColors.mint : chalkboardColors.borderColor,
              color: chalkboardColors.text,
              fontFamily: "'Caveat', cursive",
              fontSize: '1.25rem',
              boxShadow: filter === cat.id ? `0 0 20px ${chalkboardColors.mint}40` : 'none'
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: `0 0 25px ${chalkboardColors.mint}60`
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <span className="mr-2">{cat.icon}</span>
            {cat.label}
          </motion.button>
        ))}
      </motion.div>

      {/* Draggable canvas */}
      <div className="relative w-full max-w-7xl mx-auto h-[600px] rounded-3xl border-2 overflow-hidden z-20"
        style={{
          backgroundColor: `${chalkboardColors.bg}40`,
          borderColor: chalkboardColors.borderColor,
          backdropFilter: 'blur(10px)'
        }}
      >
        {/* Canvas background texture */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M10 10h80v80H10z" fill="none" stroke="%23fff" stroke-width="2"/%3E%3C/svg%3E")',
            backgroundSize: '50px 50px'
          }}
        />

        {/* Helper text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute top-6 left-6 z-10"
        >
          <p 
            className="text-lg"
            style={{ 
              color: chalkboardColors.textFaded,
              fontFamily: "'Caveat', cursive"
            }}
          >
            ✋ Kartları sürükleyebilirsin!
          </p>
        </motion.div>

        {/* Draggable idea cards */}
        <AnimatePresence>
          {filteredIdeas.map((idea, idx) => (
            <Draggable
              key={idea.id}
              defaultPosition={{ x: idea.x, y: idea.y }}
              bounds="parent"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.5,
                  transition: { duration: 0.3 }
                }}
                transition={{ 
                  delay: idx * 0.1,
                  type: 'spring',
                  stiffness: 200,
                  damping: 20
                }}
                className="absolute cursor-grab active:cursor-grabbing"
                whileHover={{ 
                  scale: 1.05,
                  zIndex: 50,
                  boxShadow: `0 0 30px ${chalkboardColors.mint}60`
                }}
              >
                <div
                  className="rounded-2xl p-6 border-2 select-none"
                  style={{
                    backgroundColor: chalkboardColors.cardBg,
                    borderColor: chalkboardColors.mint,
                    backdropFilter: 'blur(10px)',
                    width: '200px',
                    boxShadow: `0 8px 24px rgba(0,0,0,0.3), 0 0 15px ${chalkboardColors.mint}30`
                  }}
                >
                  {/* Icon */}
                  <div className="text-5xl mb-3 text-center">{idea.icon}</div>

                  {/* Title */}
                  <h3 
                    className="text-xl font-bold text-center mb-4"
                    style={{ 
                      fontFamily: "'Caveat', cursive",
                      color: chalkboardColors.text
                    }}
                  >
                    {idea.title}
                  </h3>

                  {/* Chalk divider */}
                  <div 
                    className="h-0.5 w-full mb-4 rounded-full"
                    style={{ backgroundColor: chalkboardColors.chalkLine }}
                  />

                  {/* Like button */}
                  <motion.button
                    onClick={() => handleLike(idea.id)}
                    className="w-full py-2 rounded-lg border-2 flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: 'transparent',
                      borderColor: chalkboardColors.pink,
                      color: chalkboardColors.text,
                      fontFamily: "'Caveat', cursive",
                      fontSize: '1.1rem'
                    }}
                    whileHover={{ 
                      backgroundColor: `${chalkboardColors.pink}20`,
                      scale: 1.05
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>❤️</span>
                    <span>{idea.likes}</span>
                  </motion.button>

                  {/* Chalk dust on hover */}
                  <motion.div
                    className="absolute -top-2 -right-2 w-3 h-3 rounded-full"
                    style={{ backgroundColor: chalkboardColors.mint }}
                    animate={{
                      opacity: [0, 0.8, 0],
                      scale: [0, 1.5, 0],
                      y: [0, -10, -20]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: 2
                    }}
                  />
                </div>
              </motion.div>
            </Draggable>
          ))}
        </AnimatePresence>

        {/* Floating Add button */}
        <motion.button
          className="absolute bottom-8 right-8 w-16 h-16 rounded-full flex items-center justify-center text-3xl border-2"
          style={{
            backgroundColor: chalkboardColors.cardBg,
            borderColor: chalkboardColors.sky,
            boxShadow: `0 8px 24px rgba(0,0,0,0.3), 0 0 20px ${chalkboardColors.sky}40`
          }}
          whileHover={{ 
            scale: 1.1,
            rotate: 90,
            boxShadow: `0 12px 32px rgba(0,0,0,0.4), 0 0 30px ${chalkboardColors.sky}60`
          }}
          whileTap={{ scale: 0.9 }}
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            y: {
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }
          }}
        >
          +
        </motion.button>
      </div>

      {/* Stats footer */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={motionTokens.fadeInSoft}
        transition={{ delay: 0.8 }}
        className="flex flex-wrap justify-center gap-8 mt-12 z-20 relative"
      >
        {[
          { label: 'Toplam Fikir', value: ideas.length, icon: '💡' },
          { label: 'Aktif Kullanıcı', value: '1.2K', icon: '👤' },
          { label: 'Toplam Beğeni', value: ideas.reduce((acc, i) => acc + i.likes, 0), icon: '❤️' }
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            className="text-center p-6 rounded-2xl border-2"
            style={{
              backgroundColor: chalkboardColors.cardBg,
              borderColor: chalkboardColors.borderColor,
              minWidth: '150px'
            }}
            whileHover={{ 
              scale: 1.05,
              borderColor: chalkboardColors.mint
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
          >
            <div className="text-4xl mb-2">{stat.icon}</div>
            <div 
              className="text-3xl font-bold mb-1"
              style={{ 
                fontFamily: "'Caveat', cursive",
                color: chalkboardColors.text
              }}
            >
              {stat.value}
            </div>
            <div 
              className="text-sm"
              style={{ color: chalkboardColors.textSoft }}
            >
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default IdeaBoard;

import React from 'react';
import { motion } from 'framer-motion';
import { motionTokens, chalkboardColors } from '../utils/motionTokens';
import { ChalkUnderline, ChalkArrow, ChalkCard } from './ChalkboardComponents';

// 🎬 AgentScene: Vertical cinematic storytelling
// Hero → IdeaFlow → Prototype → Community → CTA

const AgentScene = ({ onComplete }) => {
  const [showCursor, setShowCursor] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => setShowCursor(false), 3000);
  }, []);

  return (
    <div className="relative w-full">
      {/* SECTION 1: HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={motionTokens.fadeInSoft}
          className="text-center z-20 relative"
        >
          {/* Main handwritten title */}
          <motion.h1 
            className="text-7xl md:text-9xl font-bold mb-6"
            style={{ 
              fontFamily: "'Caveat', cursive",
              color: chalkboardColors.text,
              textShadow: `0 0 30px ${chalkboardColors.glow}`
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Bir fikirle başlar her şey.
          </motion.h1>
          
          {/* Chalk underline with cursor */}
          <div className="relative mx-auto mb-8" style={{ width: '70%', maxWidth: '500px' }}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={motionTokens.chalkWrite}
              className="h-3 rounded-full"
              style={{ 
                backgroundColor: chalkboardColors.chalkLine,
                boxShadow: `0 0 20px ${chalkboardColors.glow}`
              }}
            />
            
            {/* Animated chalk cursor */}
            {showCursor && (
              <motion.div
                className="absolute -right-2 -top-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0], x: [0, 10, 0] }}
                transition={{ duration: 2, delay: 0.8 }}
                style={{ 
                  width: '8px', 
                  height: '20px', 
                  backgroundColor: chalkboardColors.text,
                  transform: 'rotate(20deg)',
                  boxShadow: `0 0 10px ${chalkboardColors.glow}`
                }}
              />
            )}
          </div>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-2xl md:text-3xl font-light"
            style={{ color: chalkboardColors.textSoft }}
          >
            AI, fikirlerini çizime dönüştürür.
          </motion.p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="absolute bottom-12 z-20 flex flex-col items-center"
        >
          <motion.svg
            width="40"
            height="60"
            viewBox="0 0 40 60"
            className="mb-2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.path
              d="M20 5 L20 45 M20 45 L12 37 M20 45 L28 37"
              stroke={chalkboardColors.chalkLine}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial="hidden"
              animate="visible"
              variants={motionTokens.lineDraw}
            />
          </motion.svg>
          <span style={{ color: chalkboardColors.textFaded, fontSize: '14px' }}>
            Keşfet
          </span>
        </motion.div>
      </section>

      {/* SECTION 2: IDEA FLOW (Vertical chain) */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={motionTokens.fadeInSoft}
          className="text-center mb-12 z-20"
        >
          <p 
            className="text-2xl md:text-3xl font-light mb-4"
            style={{ color: chalkboardColors.textSoft }}
          >
            AI, fikirlerin gelişimini adım adım görselleştirir.
          </p>
        </motion.div>

        {/* Vertical flow chain */}
        <div className="relative max-w-6xl w-full z-20">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0">
            {[
              { icon: '💡', title: 'Fikir', color: chalkboardColors.mint, delay: 0 },
              { icon: '🔍', title: 'Analiz', color: chalkboardColors.pink, delay: 0.3 },
              { icon: '🎨', title: 'Prototip', color: chalkboardColors.sky, delay: 0.6 },
              { icon: '🚀', title: 'Paylaş', color: chalkboardColors.beige, delay: 0.9 }
            ].map((node, idx) => (
              <React.Fragment key={node.title}>
                <ChalkCard
                  icon={node.icon}
                  title={node.title}
                  color={node.color}
                  delay={node.delay}
                  className="w-48"
                />

                {idx < 3 && (
                  <div className="hidden md:block">
                    <ChalkArrow direction="right" delay={node.delay + 0.2} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: PROTOTYPE SHOWCASE */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={motionTokens.fadeInSoft}
          className="text-center mb-16 z-20"
        >
          <h2 
            className="text-6xl md:text-7xl font-bold"
            style={{ 
              fontFamily: "'Caveat', cursive",
              color: chalkboardColors.text,
              textShadow: `0 0 20px ${chalkboardColors.glow}`
            }}
          >
            Çizimden Proje Mockup'ına
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full z-20">
          {[
            { icon: '📱', title: 'Mobil Uygulama', color: chalkboardColors.mint, sketch: 'M60 20 L60 100 L100 100 L100 20 Z M65 30 L95 30 M70 50 L90 50 M70 60 L90 60 M70 70 L90 70' },
            { icon: '💻', title: 'Web Platformu', color: chalkboardColors.pink, sketch: 'M30 30 L130 30 L130 90 L30 90 Z M30 30 L130 30 L130 40 L30 40 M50 60 L110 60 M50 70 L110 70' },
            { icon: '📊', title: 'Dashboard', color: chalkboardColors.sky, sketch: 'M40 40 L60 70 L80 50 L100 80 M40 80 L120 80 M40 40 L40 80' }
          ].map((mockup, idx) => (
            <motion.div
              key={mockup.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.8 }}
              className="relative group cursor-pointer"
            >
              {/* Glow on hover */}
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-2xl"
                style={{ backgroundColor: mockup.color }}
                whileHover={{ scale: 1.1 }}
              />

              <div 
                className="relative rounded-3xl p-8 border-2 h-full flex flex-col"
                style={{ 
                  backgroundColor: chalkboardColors.cardBg,
                  borderColor: chalkboardColors.borderColor,
                  backdropFilter: 'blur(10px)',
                  boxShadow: `0 8px 24px rgba(0,0,0,0.2)`
                }}
              >
                {/* Sketch drawing */}
                <div className="mb-6 flex justify-center">
                  <svg width="150" height="120" viewBox="0 0 150 120">
                    <motion.path
                      d={mockup.sketch}
                      stroke={chalkboardColors.chalkLine}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={motionTokens.lineDraw}
                      transition={{ delay: idx * 0.2 + 0.4, duration: 2 }}
                    />
                  </svg>
                </div>

                <div className="text-5xl mb-4 text-center">{mockup.icon}</div>
                <h3 
                  className="text-2xl font-bold text-center mb-4"
                  style={{ 
                    fontFamily: "'Caveat', cursive",
                    color: chalkboardColors.text
                  }}
                >
                  {mockup.title}
                </h3>

                <motion.div
                  className="h-2 rounded-full mt-auto"
                  style={{ 
                    backgroundColor: mockup.color,
                    transformOrigin: 'left'
                  }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 + 0.8, duration: 0.8 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 4: COMMUNITY SPARKS */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={motionTokens.fadeInSoft}
          className="text-center max-w-4xl z-20"
        >
          <h2 
            className="text-6xl md:text-8xl font-bold mb-8"
            style={{ 
              fontFamily: "'Caveat', cursive",
              color: chalkboardColors.text,
              textShadow: `0 0 30px ${chalkboardColors.glow}`
            }}
          >
            Gerçek sorunlara fikir üret.
          </h2>
          
          {/* Challenge card with pin drop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative rounded-3xl p-10 md:p-14 border-2 mb-10"
            style={{ 
              backgroundColor: chalkboardColors.cardBg,
              borderColor: chalkboardColors.borderColor,
              backdropFilter: 'blur(10px)',
              boxShadow: `0 8px 32px rgba(0,0,0,0.3)`
            }}
          >
            {/* Pin drops */}
            <motion.div
              className="absolute -top-6 left-1/2 text-5xl"
              initial={{ y: -100, rotate: 0, opacity: 0 }}
              whileInView={{ y: 0, rotate: 20, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ 
                delay: 0.6, 
                duration: 0.8, 
                type: 'spring', 
                stiffness: 200 
              }}
              style={{ 
                transform: 'translateX(-50%)',
                filter: `drop-shadow(0 0 10px ${chalkboardColors.glow})`
              }}
            >
              📌
            </motion.div>

            <p 
              className="text-3xl md:text-4xl mb-8"
              style={{ 
                color: chalkboardColors.textSoft,
                fontFamily: "'Caveat', cursive"
              }}
            >
              Haftanın Sorunu: Dijital Bağımlılık
            </p>
            
            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              variants={motionTokens.glowPulse}
              animate="animate"
              className="relative px-10 py-4 rounded-full text-2xl font-bold border-2 overflow-hidden group"
              style={{ 
                color: chalkboardColors.text,
                borderColor: chalkboardColors.chalkLine,
                backgroundColor: 'transparent'
              }}
            >
              <span className="relative z-10">Fikrini Üret 💡</span>
              
              <motion.div
                className="absolute bottom-2 left-1/2 h-1 rounded-full"
                style={{ 
                  backgroundColor: chalkboardColors.glowStrong,
                  width: '80%',
                  transform: 'translateX(-50%)'
                }}
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4 }}
              />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Floating lightbulbs */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 20}%`,
              filter: `drop-shadow(0 0 8px ${chalkboardColors.glow})`
            }}
            animate={{
              y: [0, -25, 0],
              rotate: [0, 15, -15, 0],
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3.5 + i * 0.4,
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeInOut'
            }}
          >
            💡
          </motion.div>
        ))}
      </section>

      {/* SECTION 5: FINAL CTA (triggers transition) */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={motionTokens.fadeInSoft}
          className="text-center max-w-5xl z-20"
        >
          <motion.h2 
            className="text-7xl md:text-9xl font-bold mb-12"
            style={{ 
              fontFamily: "'Caveat', cursive",
              color: chalkboardColors.text,
              textShadow: `0 0 40px ${chalkboardColors.glow}`
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            Fikrini sabitle, toplulukla paylaş.
          </motion.h2>

          {/* Main CTA - triggers next scene */}
          <motion.button
            whileHover={{ 
              scale: 1.1, 
              y: -10,
              rotate: [0, -2, 2, 0]
            }}
            whileTap={{ scale: 0.95 }}
            onClick={onComplete}
            variants={motionTokens.glowPulse}
            animate="animate"
            className="px-14 py-6 rounded-full text-3xl font-bold mb-16 border-3"
            style={{ 
              backgroundColor: chalkboardColors.glowStrong,
              color: '#000',
              border: `3px solid ${chalkboardColors.chalkLine}`,
              boxShadow: `0 10px 40px ${chalkboardColors.glow}`
            }}
          >
            Şimdi Başla 🚀
          </motion.button>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              { stat: '10K+ Kullanıcı', icon: '👥' },
              { stat: '50K+ Fikir', icon: '💡' },
              { stat: '1M+ Etkileşim', icon: '✨' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: idx * 0.15, 
                  duration: 0.8, 
                  type: 'spring',
                  stiffness: 150
                }}
                className="relative rounded-2xl p-6 border-2"
                style={{ 
                  backgroundColor: chalkboardColors.cardBg,
                  borderColor: chalkboardColors.borderColor,
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <p 
                  className="text-2xl md:text-3xl font-bold"
                  style={{ 
                    fontFamily: "'Caveat', cursive",
                    color: chalkboardColors.text
                  }}
                >
                  {item.stat}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default AgentScene;

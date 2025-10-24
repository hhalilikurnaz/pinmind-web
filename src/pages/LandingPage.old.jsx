import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import AgentScene from '../components/AgentScene';
import FlowVisualizer from '../components/FlowVisualizer';
import IdeaBoard from '../components/IdeaBoard';
import { ChalkboardBase } from '../components/ChalkboardComponents';
import { chalkboardColors } from '../utils/motionTokens';

const LandingPage = () => {
  const { lang, changeLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { scrollYProgress } = useScroll();
  
  const [currentScene, setCurrentScene] = useState('agent'); // agent, flow, board
  const [agentComplete, setAgentComplete] = useState(false);
  const [flowComplete, setFlowComplete] = useState(false);

  const flowRef = useRef(null);
  const boardRef = useRef(null);

  // Handle scene completion callbacks
  const handleAgentComplete = () => {
    setAgentComplete(true);
    // Auto-scroll to flow scene
    setTimeout(() => {
      setCurrentScene('flow');
      flowRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 500);
  };

  const handleFlowComplete = () => {
    setFlowComplete(true);
    // Auto-scroll to board scene
    setTimeout(() => {
      setCurrentScene('board');
      boardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 500);
  };

  // Color scheme based on theme
  const colors = theme === 'dark' ? {
    bg: 'linear-gradient(180deg, #0D0D0D 0%, #1C1C1C 100%)',
    text: '#EDEDED',
    textSoft: 'rgba(237, 237, 237, 0.8)',
    textFaded: 'rgba(237, 237, 237, 0.5)',
    chalkLine: '#EDEDED',
    glow: 'rgba(197, 228, 208, 0.6)',
    glowStrong: 'rgba(197, 228, 208, 0.9)',
    cardBg: 'rgba(255, 255, 255, 0.05)',
    borderColor: 'rgba(237, 237, 237, 0.2)'
  } : {
    bg: 'linear-gradient(180deg, #E8E2D0 0%, #D4CEB8 100%)',
    text: '#2D2D2D',
    textSoft: 'rgba(45, 45, 45, 0.8)',
    textFaded: 'rgba(45, 45, 45, 0.5)',
    chalkLine: '#2D2D2D',
    glow: 'rgba(100, 150, 120, 0.6)',
    glowStrong: 'rgba(100, 150, 120, 0.9)',
    cardBg: 'rgba(0, 0, 0, 0.03)',
    borderColor: 'rgba(45, 45, 45, 0.2)'
  };

  // Animation variants
  const fadeInSoft = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  };

  const chalkWrite = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: { 
      scaleX: 1, 
      opacity: 1, 
      transition: { duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] } 
    }
  };

  const lineDraw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1, 
      transition: { duration: 1.5, ease: 'easeInOut' } 
    }
  };

  const glowPulse = {
    animate: {
      filter: [
        'drop-shadow(0 0 8px rgba(197, 228, 208, 0.4))',
        'drop-shadow(0 0 20px rgba(197, 228, 208, 0.8))',
        'drop-shadow(0 0 8px rgba(197, 228, 208, 0.4))'
      ],
      transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
    }
  };

  const chalkErase = {
    initial: { opacity: 1 },
    exit: { 
      opacity: 0, 
      filter: 'blur(20px)', 
      transition: { duration: 1.5, ease: 'easeOut' } 
    }
  };

  return (
    <ChalkboardBase>
      {/* Theme & Language Controls */}
      <div className="fixed top-6 right-6 z-50 flex items-center gap-3">
        {/* Language Toggle */}
        <div 
          className="flex gap-1 rounded-full p-1.5 border-2"
          style={{ 
            backgroundColor: chalkboardColors.cardBg,
            borderColor: chalkboardColors.borderColor,
            backdropFilter: 'blur(10px)'
          }}
        >
          <button
            onClick={() => changeLang('tr')}
            className="px-4 py-2 rounded-full text-sm font-semibold transition-all"
            style={{
              backgroundColor: lang === 'tr' ? chalkboardColors.mint : 'transparent',
              color: lang === 'tr' ? '#000' : chalkboardColors.textSoft
            }}
          >
            TR
          </button>
          <button
            onClick={() => changeLang('en')}
            className="px-4 py-2 rounded-full text-sm font-semibold transition-all"
            style={{
              backgroundColor: lang === 'en' ? chalkboardColors.mint : 'transparent',
              color: lang === 'en' ? '#000' : chalkboardColors.textSoft
            }}
          >
            EN
          </button>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-3 rounded-full transition-all border-2"
          style={{
            backgroundColor: chalkboardColors.cardBg,
            borderColor: chalkboardColors.borderColor,
            backdropFilter: 'blur(10px)',
            color: chalkboardColors.text
          }}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>

      {/* Scene 1: Agent - Vertical Cinematic Storytelling */}
      <AgentScene onComplete={handleAgentComplete} />

      {/* Scene 2: Flow - Horizontal AI Mindmap */}
      <div ref={flowRef} className="scroll-mt-20">
        <FlowVisualizer onComplete={handleFlowComplete} />
      </div>

      {/* Scene 3: Board - Interactive Workspace */}
      <div ref={boardRef} className="scroll-mt-20">
        <IdeaBoard />
      </div>

      {/* Footer CTA */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative py-16 border-t-2"
        style={{ borderColor: chalkboardColors.borderColor }}
      >
        <div className="max-w-4xl mx-auto text-center px-6">
          <motion.h3
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ 
              fontFamily: "'Caveat', cursive",
              color: chalkboardColors.text
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Fikrini gerçeğe dönüştür 🚀
          </motion.h3>
          
          <motion.button
            className="px-12 py-4 rounded-2xl border-2 text-xl font-bold transition-all"
            style={{
              backgroundColor: chalkboardColors.mint,
              borderColor: chalkboardColors.mint,
              color: '#000',
              fontFamily: "'Caveat', cursive",
              boxShadow: `0 8px 24px ${chalkboardColors.mint}40`
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: `0 12px 32px ${chalkboardColors.mint}60`
            }}
            whileTap={{ scale: 0.95 }}
          >
            Hemen Başla
          </motion.button>

          <div className="mt-12 flex justify-center gap-8 text-sm"
            style={{ color: chalkboardColors.textFaded }}
          >
            <a href="#" className="hover:underline">Hakkında</a>
            <a href="#" className="hover:underline">İletişim</a>
            <a href="#" className="hover:underline">Gizlilik</a>
          </div>
        </div>
      </motion.footer>
    </ChalkboardBase>
  );
};

export default LandingPage;
          {/* Main handwritten title */}
          <motion.h1 
            className="text-7xl md:text-9xl font-bold mb-6"
            style={{ 
              fontFamily: "'Caveat', cursive",
              color: colors.text,
              textShadow: `0 0 30px ${colors.glow}`
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {t.landingHero}
          </motion.h1>
          
          {/* Chalk underline with cursor */}
          <div className="relative mx-auto mb-8" style={{ width: '70%', maxWidth: '500px' }}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={chalkWrite}
              className="h-3 rounded-full"
              style={{ 
                backgroundColor: colors.chalkLine,
                transformOrigin: 'left',
                boxShadow: `0 0 20px ${colors.glow}`
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
                  backgroundColor: colors.text,
                  transform: 'rotate(20deg)',
                  boxShadow: `0 0 10px ${colors.glow}`
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
            style={{ color: colors.textSoft }}
          >
            {t.landingSubtext}
          </motion.p>
        </motion.div>

        {/* Chalk arrow scroll indicator */}
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
              stroke={colors.chalkLine}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial="hidden"
              animate="visible"
              variants={lineDraw}
            />
          </motion.svg>
          <span style={{ color: colors.textFaded, fontSize: '14px' }}>
            {t.landingScrollHint}
          </span>
        </motion.div>
      </section>

      {/* 2. IDEA EVOLUTION SEQUENCE (Interactive Flow) */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInSoft}
          className="text-center mb-12 z-20"
        >
          <p 
            className="text-2xl md:text-3xl font-light mb-4"
            style={{ color: colors.textSoft }}
          >
            AI, fikirlerin gelişimini adım adım görselleştirir.
          </p>
        </motion.div>

        {/* Interactive Flow Chart with drawn connections */}
        <div className="relative max-w-6xl w-full z-20">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0">
            {[
              { key: 'landingFlowIdea', icon: '💡', color: '#C5E4D0', delay: 0 },
              { key: 'landingFlowAnalysis', icon: '🔍', color: '#F6D7D7', delay: 0.3 },
              { key: 'landingFlowPrototype', icon: '🎨', color: '#BEE3F8', delay: 0.6 },
              { key: 'landingFlowShare', icon: '🚀', color: '#E8E2D0', delay: 0.9 }
            ].map((node, idx) => (
              <React.Fragment key={node.key}>
                {/* Node Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.7, y: 40 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: node.delay, 
                    duration: 0.8, 
                    type: 'spring', 
                    stiffness: 150 
                  }}
                  whileHover={{ 
                    scale: 1.08, 
                    rotate: [0, -2, 2, 0],
                    transition: { duration: 0.3 }
                  }}
                  className="relative group cursor-pointer"
                  style={{ width: '200px' }}
                >
                  {/* Chalk dust burst on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity"
                    style={{ backgroundColor: node.color }}
                  />
                  
                  {/* Card */}
                  <div 
                    className="relative rounded-3xl p-6 border-2"
                    style={{ 
                      backgroundColor: colors.cardBg,
                      borderColor: colors.borderColor,
                      backdropFilter: 'blur(10px)',
                      boxShadow: `0 8px 24px rgba(0,0,0,0.2)`
                    }}
                  >
                    <div className="text-5xl mb-3">{node.icon}</div>
                    <h3 
                      className="text-xl font-bold"
                      style={{ 
                        fontFamily: "'Caveat', cursive",
                        color: colors.text 
                      }}
                    >
                      {t[node.key]}
                    </h3>
                    
                    {/* Chalk underline */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: node.delay + 0.4, duration: 0.6 }}
                      className="h-1 rounded-full mt-3"
                      style={{ 
                        backgroundColor: node.color,
                        transformOrigin: 'left'
                      }}
                    />
                  </div>
                </motion.div>

                {/* Drawn Arrow Connection */}
                {idx < 3 && (
                  <div className="hidden md:block relative" style={{ width: '100px' }}>
                    <svg 
                      width="100" 
                      height="60" 
                      className="overflow-visible"
                      style={{ margin: '0 -20px' }}
                    >
                      <motion.path
                        d="M10 30 L70 30 M70 30 L60 20 M70 30 L60 40"
                        stroke={colors.chalkLine}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        strokeDasharray="5,5"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={lineDraw}
                        transition={{ delay: node.delay + 0.2, duration: 0.8 }}
                      />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PROTOTYPE SHOWCASE */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInSoft}
          className="text-center mb-16 z-20"
        >
          <h2 
            className="text-6xl md:text-7xl font-bold"
            style={{ 
              fontFamily: "'Caveat', cursive",
              color: colors.text,
              textShadow: `0 0 20px ${colors.glow}`
            }}
          >
            {t.landingMockupTitle}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full z-20">
          {[
            { key: 'landingMockupMobile', icon: '📱', color: '#C5E4D0', sketch: 'M60 20 L60 100 L100 100 L100 20 Z M65 30 L95 30 M70 50 L90 50 M70 60 L90 60 M70 70 L90 70' },
            { key: 'landingMockupWeb', icon: '💻', color: '#F6D7D7', sketch: 'M30 30 L130 30 L130 90 L30 90 Z M30 30 L130 30 L130 40 L30 40 M50 60 L110 60 M50 70 L110 70' },
            { key: 'landingMockupDashboard', icon: '📊', color: '#BEE3F8', sketch: 'M40 40 L60 70 L80 50 L100 80 M40 80 L120 80 M40 40 L40 80' }
          ].map((mockup, idx) => (
            <motion.div
              key={mockup.key}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.8 }}
              className="relative group cursor-pointer"
            >
              {/* Glow on hover with chalk dust */}
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-2xl"
                style={{ backgroundColor: mockup.color }}
                whileHover={{ scale: 1.1 }}
              />

              <div 
                className="relative rounded-3xl p-8 border-2 h-full flex flex-col"
                style={{ 
                  backgroundColor: colors.cardBg,
                  borderColor: colors.borderColor,
                  backdropFilter: 'blur(10px)',
                  boxShadow: `0 8px 24px rgba(0,0,0,0.2)`
                }}
              >
                {/* Sketch drawing animation */}
                <div className="mb-6 flex justify-center">
                  <svg width="150" height="120" viewBox="0 0 150 120">
                    <motion.path
                      d={mockup.sketch}
                      stroke={colors.chalkLine}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={lineDraw}
                      transition={{ delay: idx * 0.2 + 0.4, duration: 2 }}
                    />
                  </svg>
                </div>

                <div className="text-5xl mb-4 text-center">{mockup.icon}</div>
                <h3 
                  className="text-2xl font-bold text-center mb-4"
                  style={{ 
                    fontFamily: "'Caveat', cursive",
                    color: colors.text
                  }}
                >
                  {t[mockup.key]}
                </h3>

                {/* Chalk underline on hover */}
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

      {/* 4. COMMUNITY SPARKS */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInSoft}
          className="text-center max-w-4xl z-20"
        >
          <h2 
            className="text-6xl md:text-8xl font-bold mb-8"
            style={{ 
              fontFamily: "'Caveat', cursive",
              color: colors.text,
              textShadow: `0 0 30px ${colors.glow}`
            }}
          >
            {t.landingCommunityTitle}
          </h2>
          
          {/* Challenge card with pin drop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative rounded-3xl p-10 md:p-14 border-2 mb-10"
            style={{ 
              backgroundColor: colors.cardBg,
              borderColor: colors.borderColor,
              backdropFilter: 'blur(10px)',
              boxShadow: `0 8px 32px rgba(0,0,0,0.3)`
            }}
          >
            {/* Chalk pin drops and marks the spot */}
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
                filter: `drop-shadow(0 0 10px ${colors.glow})`
              }}
            >
              📌
            </motion.div>

            <p 
              className="text-3xl md:text-4xl mb-8"
              style={{ 
                color: colors.textSoft,
                fontFamily: "'Caveat', cursive"
              }}
            >
              {t.landingCommunitySubtitle}
            </p>
            
            {/* CTA Button with chalk underline on hover */}
            <motion.button
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              variants={glowPulse}
              animate="animate"
              className="relative px-10 py-4 rounded-full text-2xl font-bold border-2 overflow-hidden group"
              style={{ 
                color: colors.text,
                borderColor: colors.chalkLine,
                backgroundColor: 'transparent'
              }}
            >
              <span className="relative z-10">{t.landingCommunityButton} 💡</span>
              
              {/* Chalk underline appears on hover */}
              <motion.div
                className="absolute bottom-2 left-1/2 h-1 rounded-full"
                style={{ 
                  backgroundColor: colors.glowStrong,
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

        {/* Floating idea sparks - more animated */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 20}%`,
              filter: `drop-shadow(0 0 8px ${colors.glow})`
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
            �
          </motion.div>
        ))}
      </section>

      {/* 5. FINAL CTA */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInSoft}
          className="text-center max-w-5xl z-20"
        >
          {/* Large handwritten CTA */}
          <motion.h2 
            className="text-7xl md:text-9xl font-bold mb-12"
            style={{ 
              fontFamily: "'Caveat', cursive",
              color: colors.text,
              textShadow: `0 0 40px ${colors.glow}`
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            {t.landingCtaTitle}
          </motion.h2>

          {/* Main CTA button with chalk glow + bounce */}
          <motion.button
            whileHover={{ 
              scale: 1.1, 
              y: -10,
              rotate: [0, -2, 2, 0]
            }}
            whileTap={{ scale: 0.95 }}
            variants={glowPulse}
            animate="animate"
            className="px-14 py-6 rounded-full text-3xl font-bold mb-16 border-3"
            style={{ 
              backgroundColor: colors.glowStrong,
              color: '#000',
              border: `3px solid ${colors.chalkLine}`,
              boxShadow: `0 10px 40px ${colors.glow}`
            }}
          >
            Şimdi Dene 🚀
          </motion.button>

          {/* Stats with chalk sketches */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              { stat: t.landingStatsUsers, icon: '👥' },
              { stat: t.landingStatsIdeas, icon: '💡' },
              { stat: t.landingStatsInteractions, icon: '✨' }
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
                  backgroundColor: colors.cardBg,
                  borderColor: colors.borderColor,
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <p 
                  className="text-2xl md:text-3xl font-bold"
                  style={{ 
                    fontFamily: "'Caveat', cursive",
                    color: colors.text
                  }}
                >
                  {item.stat}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Footer with chalk erase effect */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-20 pt-8"
            style={{ borderTop: `1px solid ${colors.borderColor}` }}
          >
            <motion.p
              className="text-lg"
              style={{ color: colors.textFaded }}
              whileInView={{ 
                opacity: [1, 0.5, 1],
                filter: ['blur(0px)', 'blur(2px)', 'blur(0px)']
              }}
              viewport={{ once: false }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              Made with ✨ by PinMind © 2025
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Background gently erases as scroll completes */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-30"
          style={{
            background: 'radial-gradient(circle at center, transparent 0%, rgba(255,255,255,0.05) 100%)',
            mixBlendMode: theme === 'dark' ? 'lighten' : 'darken'
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: [0, 0.3, 0] }}
          viewport={{ once: false }}
          transition={{ duration: 3, ease: 'easeInOut' }}
        />
      </section>
    </div>
  );
};

export default LandingPage;

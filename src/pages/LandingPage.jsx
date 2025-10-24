import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useCinematic } from '../context/CinematicContext';
import { useAudioContext } from '../context/AudioContext';
import { useScrollSync } from '../hooks/useScrollSync';
import { useCameraMotion } from '../hooks/useCameraMotion';
import { useFocusDepth } from '../hooks/useFocusDepth';
import { useCinematicAudio, useScrollCinematicAudio } from '../hooks/useCinematicAudio';
import { ChalkboardBase } from '../components/ChalkboardComponents';
import { motionTokens, chalkboardColors } from '../utils/motionTokens';
import LightBulbScene from '../components/LightBulbScene';
import AudioControl from '../components/AudioControl';
import { audioConfig, scrollAudioThresholds } from '../utils/audioConfig';
import CinematicDebugOverlay from '../debug/CinematicDebugOverlay';

const LandingPage = () => {
  const navigate = useNavigate();
  const { lang, changeLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { isMuted, isEnabled } = useAudioContext();
  
  // 🎬 Cinematic Context - Master synchronization hub
  const { 
    introPlayed, 
    introStep, 
    scrollEnabled,
    completeIntro,
    updateIntroStep,
    updateScrollProgress,
    getActiveSection,
    timeline
  } = useCinematic();
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // 🔄 Unified Scroll Synchronization - all motion systems subscribe here
  const sync = useScrollSync(scrollYProgress);
  
  // 📹 Camera Motion Layer
  const camera = useCameraMotion(sync);
  
  // 🎯 Depth & Focus Layer
  const depth = useFocusDepth(sync);

  // Update global scroll progress for cinematic coordination
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      updateScrollProgress(latest);
      
      // 🐛 DEBUG: Log scroll ranges and active scene (throttled for performance)
      if (process.env.NODE_ENV === 'development') {
        const section = latest < 0.22 ? 'Idea' :
                       latest < 0.42 ? 'Team' :
                       latest < 0.68 ? 'Prototype' : 
                       latest < 0.92 ? 'Vision' : 'Footer';
        
        // Throttle logs to every 250ms
        if (!window._lastLogTime || Date.now() - window._lastLogTime > 250) {
          console.log(`[Cinematic] Scene: ${section}, Scroll: ${latest.toFixed(3)}`);
          window._lastLogTime = Date.now();
        }
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, updateScrollProgress]);

  // Section refs for inView detection
  const ideaPinRef = useRef(null);
  const analysisRef = useRef(null);
  const prototypeRef = useRef(null);
  const teamRef = useRef(null);
  
  const ideaPinInView = useInView(ideaPinRef, { once: true, margin: '-100px' });
  const analysisInView = useInView(analysisRef, { once: true, margin: '-100px' });
  const prototypeInView = useInView(prototypeRef, { once: true, margin: '-150px' });
  const teamInView = useInView(teamRef, { once: true, margin: '-100px' });

  const [activeAnalysisCard, setActiveAnalysisCard] = useState(0);
  const [activeTeamMember, setActiveTeamMember] = useState(0);
  const [prototypeDrawing, setPrototypeDrawing] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // 🎬 Auto-play intro sequence - managed by CinematicContext
  useEffect(() => {
    // Disable scroll during intro
    document.body.style.overflow = 'hidden';
    
    const introSequence = [
      { step: 1, delay: 0 },      // Background fade-in
      { step: 2, delay: 500 },    // PinMind logo draw
      { step: 3, delay: 3000 },   // Tagline fade-in
      { step: 4, delay: 4500 },   // Sticky note bounce
      { step: 5, delay: 6000 },   // Subtext fade
      { step: 6, delay: 7000 }    // Ambient glow
    ];

    introSequence.forEach(({ step, delay }) => {
      setTimeout(() => updateIntroStep(step), delay);
    });

    // Complete intro and enable scroll
    const completeTimer = setTimeout(() => {
      completeIntro();
    }, 8000);

    return () => {
      clearTimeout(completeTimer);
      document.body.style.overflow = '';
    };
  }, [updateIntroStep, completeIntro]);

  // Track scroll for header and button fade
  useEffect(() => {
    if (!scrollEnabled) return;
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 100);
      setScrollProgress(scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollEnabled]);

  // Sequential analysis cards
  useEffect(() => {
    if (analysisInView && activeAnalysisCard < 3) {
      const timer = setTimeout(() => {
        setActiveAnalysisCard(prev => prev + 1);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [analysisInView, activeAnalysisCard]);

  // Start prototype drawing
  useEffect(() => {
    if (prototypeInView) {
      setPrototypeDrawing(true);
    }
  }, [prototypeInView]);

  // Sequential team members
  useEffect(() => {
    if (teamInView && activeTeamMember < 3) {
      const timer = setTimeout(() => {
        setActiveTeamMember(prev => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [teamInView, activeTeamMember]);

  const analysisCards = [
    { icon: '🧩', title: 'Problem', desc: 'Yemek yapma zorluğu', color: '#FF6F61' },
    { icon: '👥', title: 'Hedef Kitle', desc: 'Evdeki malzemelerle çözüm arayanlar', color: '#7FB3D5' },
    { icon: '💡', title: 'Çözüm', desc: 'AI destekli tarif önerme sistemi', color: '#C2FFD9' }
  ];

  const teamMembers = [
    { role: 'Developer', icon: '👨‍💻' },
    { role: 'Designer', icon: '👩‍🎨' },
    { role: 'Manager', icon: '👨‍💼' }
  ];

  // 🎵 CINEMATIC AUDIO INTEGRATION - Coordinated with mutex to prevent overlaps
  
  // Post-it attach sound (triggered when sticky note appears in intro)
  useCinematicAudio(
    audioConfig.postItAttach.path,
    isMuted ? 0 : audioConfig.postItAttach.volume,
    isEnabled && introStep >= 4, // Trigger at step 4 (sticky note bounce)
    audioConfig.postItAttach.delay,
    audioConfig.postItAttach.duration
  );

  // Chalk writing sound (triggered during logo drawing)
  useCinematicAudio(
    audioConfig.chalkWriting.path,
    isMuted ? 0 : audioConfig.chalkWriting.volume,
    isEnabled && introStep >= 2, // Trigger at step 2 (logo draw)
    audioConfig.chalkWriting.delay,
    audioConfig.chalkWriting.duration
  );

  // Prototype completion sound (scroll-triggered at 65%)
  useScrollCinematicAudio(
    scrollYProgress.get(),
    scrollAudioThresholds.prototypeComplete,
    audioConfig.prototypeComplete.path,
    isMuted ? 0 : audioConfig.prototypeComplete.volume,
    audioConfig.prototypeComplete.duration
  );

  // Lightbulb bloom sound (scroll-triggered at 90%)
  useScrollCinematicAudio(
    scrollYProgress.get(),
    scrollAudioThresholds.lightbulbBloom,
    audioConfig.lightbulbBloom.path,
    isMuted ? 0 : audioConfig.lightbulbBloom.volume,
    audioConfig.lightbulbBloom.duration
  );

  return (
    <div ref={containerRef} className="relative bg-gradient-to-b from-[#0D0D0D] to-[#171717]">
      {/* 🐛 Debug Overlay - Development Only */}
      {process.env.NODE_ENV === 'development' && <CinematicDebugOverlay />}
      
      {/* 🎯 Depth & Focus Layer - GPU-accelerated backdrop filter */}
      {depth.isActive && (
        <>
          <motion.div style={depth.vignetteStyle} />
          <motion.div style={depth.overlayStyle} />
        </>
      )}
      
      {/* Dynamic evolving background gradient */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, #171717, #0D0D0D)',
          opacity: sync.light.bgProgress
        }}
      />
      
      {/* Radial light source - moves with scroll */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at 50% 40%, rgba(168, 241, 191, 0.25), transparent 60%)',
          opacity: sync.light.gradientOpacity,
          mixBlendMode: 'screen'
        }}
      />
      
      {/* Chalk texture overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noise)\' opacity=\'0.03\' /%3E%3C/svg%3E")',
          opacity: 0.1
        }}
      />

      {/* Sticky Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
        initial={{ backgroundColor: 'rgba(15, 15, 15, 0)' }}
        animate={{ 
          backgroundColor: scrolled ? 'rgba(15, 15, 15, 0.85)' : 'rgba(15, 15, 15, 0)',
          borderBottom: scrolled ? '1px solid rgba(168, 241, 191, 0.1)' : '1px solid transparent'
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            className="text-2xl font-bold cursor-pointer"
            style={{ 
              fontFamily: "'Caveat', cursive",
              color: '#EAEAEA'
            }}
            whileHover={{ scale: 1.05 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            PinMind
          </motion.div>
          
          <motion.button
            onClick={() => navigate('/login')}
            className="px-6 py-2 rounded-full text-sm font-medium transition-all"
            style={{
              color: '#EAEAEA',
              border: '1px solid rgba(168, 241, 191, 0.3)',
              fontFamily: "'Inter', sans-serif",
              pointerEvents: scrollProgress > 300 ? 'none' : 'auto'
            }}
            animate={{
              opacity: scrollProgress > 300 ? 0 : 1
            }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            whileHover={{ 
              backgroundColor: 'rgba(168, 241, 191, 0.1)',
              borderColor: '#A8F1BF',
              scale: 1.05
            }}
            whileTap={{ scale: 0.95 }}
          >
            Giriş Yap
          </motion.button>
        </div>
      </motion.header>

      {/* Controls */}
      <div className="fixed top-20 right-6 z-50 flex items-center gap-3">
        <div 
          className="flex gap-1 rounded-full p-1.5 border-2 backdrop-blur-md"
          style={{ 
            backgroundColor: 'rgba(255,255,255,0.05)',
            borderColor: 'rgba(255,255,255,0.1)'
          }}
        >
          <button
            onClick={() => changeLang('tr')}
            className="px-4 py-2 rounded-full text-sm font-semibold transition-all"
            style={{
              backgroundColor: lang === 'tr' ? '#C2FFD9' : 'transparent',
              color: lang === 'tr' ? '#000' : '#F5F5F5'
            }}
          >
            TR
          </button>
          <button
            onClick={() => changeLang('en')}
            className="px-4 py-2 rounded-full text-sm font-semibold transition-all"
            style={{
              backgroundColor: lang === 'en' ? '#C2FFD9' : 'transparent',
              color: lang === 'en' ? '#000' : '#F5F5F5'
            }}
          >
            EN
          </button>
        </div>
        <button
          onClick={toggleTheme}
          className="p-3 rounded-full transition-all border-2 backdrop-blur-md"
          style={{
            backgroundColor: 'rgba(255,255,255,0.05)',
            borderColor: 'rgba(255,255,255,0.1)',
            color: '#F5F5F5'
          }}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>

      {/* 1️⃣ INTRO HERO - AUTO-PLAY SEQUENCE */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Background fade-in */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: introStep >= 1 ? 1 : 0 }}
          transition={{ duration: 1 }}
          style={{
            background: 'linear-gradient(to bottom, #0D0D0D, #171717)'
          }}
        />

        {/* Ambient chalk dust particles - Global */}
        {introStep >= 1 && [...Array(30)].map((_, i) => (
          <motion.div
            key={`global-dust-${i}`}
            className="absolute rounded-full"
            style={{
              backgroundColor: '#A8F1BF',
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${100 + Math.random() * 100}%`,
              filter: `blur(${Math.random() * 1.5}px)`,
              opacity: Math.random() * 0.2 + 0.1,
              zIndex: 5
            }}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.1, Math.random() * 0.3 + 0.1, 0],
              y: [0, -800, -1600],
              x: [(Math.random() - 0.5) * 100]
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              delay: Math.random() * 2,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        ))}
        
        {/* Enhanced ambient chalk dust */}
        {introStep >= 1 && [...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              backgroundColor: '#EAEAEA',
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: `blur(${Math.random() * 2}px)`,
              opacity: Math.random() * 0.3
            }}
            initial={{ opacity: 0 }}
            animate={{
              y: [0, -150, -300],
              opacity: [0, Math.random() * 0.4 + 0.1, 0],
              x: [0, (Math.random() - 0.5) * 60]
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              delay: Math.random() * 3,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        ))}

        {/* Camera pan-out wrapper */}
        <motion.div
          className="text-center relative z-20"
          initial={{ scale: 1.05 }}
          animate={{ 
            scale: introPlayed ? 1 : 1.05
          }}
          transition={{ 
            duration: 1.5,
            delay: 7.5,
            ease: [0.25, 1, 0.5, 1]
          }}
        >
          {/* Logo/Title with chalk drawing - AUTO-PLAY */}
          <motion.h1
            className="text-8xl md:text-9xl font-bold mb-6 relative"
            style={{ 
              fontFamily: "'Caveat', cursive",
              color: '#EAEAEA',
              textShadow: '0 0 40px rgba(168, 241, 191, 0.4), inset 0 0 20px rgba(168, 241, 191, 0.2)'
            }}
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ 
              opacity: introStep >= 2 ? 1 : 0,
              scale: introStep >= 2 ? 1 : 0.9
            }}
            transition={{ 
              duration: 1.5,
              ease: [0.25, 1, 0.5, 1]
            }}
          >
            PinMind
            
            {/* Chalk burst on title complete */}
            {introStep >= 2 && (
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: '#A8F1BF',
                      filter: 'blur(1px)'
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: [0, 1.5, 0],
                      opacity: [0, 0.8, 0],
                      x: [0, Math.cos(i * 30 * Math.PI / 180) * 80],
                      y: [0, Math.sin(i * 30 * Math.PI / 180) * 80]
                    }}
                    transition={{
                      delay: 1 + i * 0.03,
                      duration: 1.5
                    }}
                  />
                ))}
              </motion.div>
            )}
          </motion.h1>

          {/* Chalk underline - AUTO-PLAY */}
          <motion.div
            className="h-2 rounded-full mx-auto mb-12 relative"
            style={{ 
              background: 'linear-gradient(90deg, transparent, #A8F1BF, transparent)',
              width: '300px',
              boxShadow: '0 0 25px rgba(168, 241, 191, 0.6), inset 0 2px 4px rgba(168, 241, 191, 0.3)',
              filter: 'drop-shadow(0 0 10px rgba(168, 241, 191, 0.4))'
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ 
              scaleX: introStep >= 2 ? 1 : 0,
              opacity: introStep >= 2 ? 1 : 0
            }}
            transition={{ 
              delay: 1.5,
              duration: 1.5,
              ease: [0.25, 1, 0.5, 1]
            }}
          >
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: 'repeating-linear-gradient(90deg, transparent, rgba(255,255,255,0.1) 2px, transparent 4px)',
                mixBlendMode: 'overlay'
              }}
            />
          </motion.div>

          {/* Tagline - AUTO-PLAY */}
          <motion.p
            className="text-3xl md:text-4xl mb-8"
            style={{ 
              fontFamily: "'Caveat', cursive",
              color: '#EAEAEA',
              opacity: 0.9
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: introStep >= 3 ? 0.9 : 0,
              y: introStep >= 3 ? 0 : 20
            }}
            transition={{ duration: 1.5 }}
          >
            Fikirler kara tahtada doğar.
          </motion.p>

          {/* Sticky Note - AUTO-PLAY with bounce */}
          {introStep >= 4 && (
            <motion.div
              className="max-w-md mx-auto mb-6"
              initial={{ scale: 0, rotate: -10, y: -100 }}
              animate={{ scale: 1, rotate: 2, y: 0 }}
              transition={{ 
                type: 'spring',
                stiffness: 200,
                damping: 12
              }}
            >
              <motion.div
                className="relative rounded-lg p-6 border-2"
                style={{
                  background: 'linear-gradient(135deg, rgba(234, 234, 234, 0.08), rgba(234, 234, 234, 0.03))',
                  borderColor: 'rgba(168, 241, 191, 0.35)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.5), 0 0 30px rgba(168, 241, 191, 0.15)'
                }}
              >
                {/* Pushpin */}
                <motion.div
                  className="absolute -top-6 left-1/2 text-5xl"
                  style={{ transform: 'translateX(-50%)' }}
                  initial={{ y: -60, rotate: 0, opacity: 0 }}
                  animate={{ y: 0, rotate: 15, opacity: 1 }}
                  transition={{ 
                    delay: 0.2,
                    type: 'spring',
                    stiffness: 300,
                    damping: 10
                  }}
                >
                  📌
                </motion.div>

                {/* Chalk dust burst */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full"
                    style={{
                      backgroundColor: '#FF6F61',
                      top: '-20px',
                      left: '50%',
                      filter: 'blur(1px)'
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0],
                      x: [(Math.random() - 0.5) * 60],
                      y: [0, -40]
                    }}
                    transition={{
                      delay: 0.3 + i * 0.05,
                      duration: 1
                    }}
                  />
                ))}

                <p
                  className="text-lg md:text-xl text-center"
                  style={{ 
                    fontFamily: "'Caveat', cursive",
                    color: '#EAEAEA'
                  }}
                >
                  "Evdeki yiyeceklerden yemek öneren bir yapay zeka asistanı"
                </p>
              </motion.div>
            </motion.div>
          )}

          {/* Subtext - AUTO-PLAY */}
          <motion.p
            className="text-xl md:text-2xl"
            style={{ 
              fontFamily: "'Inter', sans-serif",
              color: 'rgba(234, 234, 234, 0.7)'
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: introStep >= 5 ? 1 : 0,
              y: introStep >= 5 ? 0 : 10
            }}
            transition={{ duration: 1.2 }}
          >
            Yapay zeka ile fikirlerini planla, analiz et, hayata geçir.
          </motion.p>

          {/* Ambient mint glow - AUTO-PLAY */}
          {introStep >= 6 && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              transition={{ duration: 2 }}
              style={{
                background: 'radial-gradient(circle at center, rgba(168, 241, 191, 0.15), transparent 70%)',
                zIndex: -1
              }}
            />
          )}
        </motion.div>

        {/* Scroll hint - appears when intro completes */}
        {introPlayed && (
          <motion.div
            className="absolute bottom-16 flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1,
              y: 0
            }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <motion.div
              className="text-4xl mb-2"
              animate={{ 
                y: [0, 12, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              ↓
            </motion.div>
            <p 
              className="text-sm tracking-wider font-light"
              style={{ 
                color: 'rgba(234, 234, 234, 0.5)',
                fontFamily: "'Inter', sans-serif"
              }}
            >
              Kaydır ve ilhamı keşfet
            </p>
          </motion.div>
        )}
      </section>

      {/* 2️⃣ AI ANALYSIS - SCROLL-DRIVEN */}
      <motion.section 
        ref={analysisRef} 
        className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden"
        style={{
          ...camera.global,
          scale: sync.sections.idea.zoom,
          opacity: sync.sections.idea.opacity,
          zIndex: sync.sections.idea.zIndex,
          pointerEvents: 'auto'
        }}
        transition={{ ease: 'easeOut', stiffness: 40 }}
      >
        {/* Vignette shadow at edges - focus on center */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0, 0, 0, 0.4) 100%)',
            opacity: analysisInView ? 0.6 : 0
          }}
          transition={{ duration: 1.5 }}
        />
        
        {/* Curved transition overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ clipPath: 'ellipse(0% 0% at 50% 100%)' }}
          animate={analysisInView ? { clipPath: 'ellipse(100% 100% at 50% 100%)' } : {}}
          transition={{ duration: 1.8, ease: [0.25, 1, 0.5, 1] }}
          style={{
            background: 'radial-gradient(ellipse at 50% 100%, rgba(168, 241, 191, 0.03), transparent 60%)',
            zIndex: 1
          }}
        />
        
        {/* Depth shadow layering */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            boxShadow: '0 0 40px rgba(0,0,0,0.3)',
            opacity: analysisInView ? 1 : 0
          }}
          transition={{ duration: 1 }}
        />
        
        <motion.h2
          className="text-6xl md:text-7xl font-bold text-center mb-20 relative z-10"
          style={{ 
            fontFamily: "'Caveat', cursive",
            color: '#EAEAEA',
            textShadow: '0 0 35px rgba(168, 241, 191, 0.4), inset 0 0 15px rgba(168, 241, 191, 0.2)'
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={analysisInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2 }}
        >
          Analiz Sonuçları
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl w-full relative z-10">
          {analysisCards.map((card, idx) => (
            <motion.div
              key={card.title}
              className="relative"
              initial={{ opacity: 0, y: 100, rotateX: -25 }}
              animate={activeAnalysisCard > idx ? { 
                opacity: 1, 
                y: 0, 
                rotateX: 0 
              } : {}}
              transition={{ 
                duration: 1,
                ease: [0.25, 1, 0.5, 1]
              }}
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px'
              }}
            >
              {/* Card glow */}
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-20 blur-3xl"
                style={{ backgroundColor: card.color }}
                animate={{
                  opacity: activeAnalysisCard > idx ? [0.2, 0.4, 0.2] : 0
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              <div
                className="relative rounded-3xl p-10 border-2"
                style={{
                  background: 'linear-gradient(135deg, rgba(234, 234, 234, 0.06), rgba(234, 234, 234, 0.02))',
                  borderColor: card.color,
                  backdropFilter: 'blur(20px)',
                  boxShadow: `0 20px 60px rgba(0,0,0,0.5), inset 0 0 30px ${card.color}15, 0 0 35px ${card.color}50`
                }}
              >
                <div className="text-7xl mb-5 text-center">{card.icon}</div>
                <h3 
                  className="text-4xl font-bold mb-4 text-center"
                  style={{ 
                    fontFamily: "'Caveat', cursive",
                    color: '#EAEAEA'
                  }}
                >
                  {card.title}
                </h3>
                <p 
                  className="text-lg text-center leading-relaxed font-light"
                  style={{ 
                    color: 'rgba(234, 234, 234, 0.8)',
                    fontFamily: "'Inter', sans-serif"
                  }}
                >
                  {card.desc}
                </p>

                {/* Electric chalk underline */}
                <motion.div
                  className="h-1 rounded-full mt-6"
                  style={{ 
                    backgroundColor: card.color,
                    boxShadow: `0 0 15px ${card.color}`
                  }}
                  initial={{ scaleX: 0 }}
                  animate={activeAnalysisCard > idx ? { scaleX: 1 } : {}}
                  transition={{ delay: 0.5, duration: 1 }}
                />
              </div>

              {/* Connection lines */}
              {idx < 2 && (
                <svg 
                  className="hidden md:block absolute top-1/2 -right-12 z-30" 
                  width="90" 
                  height="80"
                >
                  <motion.path
                    d="M 10 40 Q 45 20, 80 40"
                    stroke="#A8F1BF"
                    strokeWidth="2"
                    strokeDasharray="8,5"
                    fill="none"
                    strokeLinecap="round"
                    filter="url(#glow)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={activeAnalysisCard > idx + 1 ? { 
                      pathLength: 1, 
                      opacity: 0.7 
                    } : {}}
                    transition={{ duration: 1.8, ease: [0.25, 1, 0.5, 1] }}
                  />
                  <defs>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                </svg>
              )}
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 3️⃣ PROTOTYPE CREATION - HANDOFF [0.48 - 0.72] */}
      <motion.section 
        ref={prototypeRef} 
        className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden"
        initial={{ opacity: 0, scale: 0.97 }}
        style={{
          ...camera.global,
          scale: sync.sections.prototype.scale,
          opacity: sync.sections.prototype.opacity,
          zIndex: sync.sections.prototype.zIndex,
          filter: sync.sections.prototype.blur > 0 ? `blur(${Math.min(sync.sections.prototype.blur, 6)}px)` : 'none',
          willChange: 'transform, opacity',
          pointerEvents: sync.sections.prototype.opacity > 0.1 ? 'auto' : 'none'
        }}
        transition={{ 
          opacity: { duration: 0.8, ease: 'easeInOut' },
          scale: { duration: 0.8, ease: 'easeInOut' }
        }}
      >
        {/* Light bloom effect on Prototype entry - only when opacity ≥ 0.6 */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(168, 241, 191, 0.2), transparent 70%)',
            filter: `blur(8px) brightness(${sync.sections.prototype.lightBloom || 1})`,
            mixBlendMode: 'screen',
            opacity: sync.sections.prototype.opacity > 0.6 ? 1 : 0,
            zIndex: 0
          }}
        />
        
        {/* Increasing light intensity as prototype completes */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(168, 241, 191, 0.15), transparent 70%)',
            opacity: prototypeDrawing ? 1 : 0,
            mixBlendMode: 'screen'
          }}
          transition={{ duration: 2, delay: 3 }}
        />
        
        {/* Curved clip-path transition */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
          animate={prototypeInView ? { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' } : {}}
          transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
          style={{
            background: 'linear-gradient(180deg, rgba(168, 241, 191, 0.02), transparent)',
            zIndex: 1
          }}
        />
        
        {/* Background blur transition */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ filter: 'blur(2px)', opacity: 1 }}
          animate={prototypeInView ? { filter: 'blur(0px)', opacity: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ backgroundColor: 'rgba(13, 13, 13, 0.3)' }}
        />
        
        <motion.h2
          className="text-6xl md:text-7xl font-bold text-center mb-16 relative z-10"
          style={{ 
            fontFamily: "'Caveat', cursive",
            color: '#EAEAEA',
            textShadow: '0 0 35px rgba(168, 241, 191, 0.4), inset 0 0 15px rgba(168, 241, 191, 0.2)'
          }}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={prototypeInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1.2 }}
        >
          Fikir Hayata Geçiyor
        </motion.h2>

        <motion.div
          className="relative z-10"
          style={{ 
            transformStyle: 'preserve-3d'
          }}
          initial={{ opacity: 0, rotateY: 10 }}
          animate={prototypeInView ? { opacity: 1, rotateY: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
        >
          {/* Wireframe drawing */}
          <svg width="400" height="700" viewBox="0 0 400 700" className="relative z-10">
            <defs>
              <filter id="mintGlow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <filter id="strongMintGlow">
                <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Device outline - sequential drawing */}
            <motion.rect
              x="50" y="50" width="300" height="600" rx="30"
              stroke="#A8F1BF"
              strokeWidth="3"
              fill="none"
              filter="url(#mintGlow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={prototypeDrawing ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 2.2, ease: 'easeInOut', delay: 0 }}
            />

            {/* Header bar - draws after device */}
            <motion.rect
              x="70" y="100" width="260" height="60" rx="10"
              stroke="#A8F1BF"
              strokeWidth="2"
              fill="rgba(168, 241, 191, 0.05)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={prototypeDrawing ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ delay: 2.3, duration: 1.2, ease: 'easeInOut' }}
            />

            {/* Button elements - sequential reveal */}
            {[0, 1, 2].map(i => (
              <motion.rect
                key={i}
                x="70"
                y={200 + i * 120}
                width="260"
                height="80"
                rx="15"
                stroke="#7FB3D5"
                strokeWidth="2"
                fill="rgba(127, 179, 213, 0.05)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={prototypeDrawing ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ delay: 3.5 + i * 0.4, duration: 0.8, ease: 'easeInOut' }}
              />
            ))}

            {/* Text lines - sequential drawing */}
            {[0, 1, 2, 3, 4].map(i => (
              <motion.line
                key={i}
                x1="90"
                y1={220 + i * 25}
                x2="280"
                y2={220 + i * 25}
                stroke="rgba(245, 245, 245, 0.3)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={prototypeDrawing ? { pathLength: 1, opacity: 0.5 } : {}}
                transition={{ delay: 3.7 + i * 0.15, duration: 0.5, ease: 'easeOut' }}
              />
            ))}

            {/* Checkmark - final element with strong glow */}
            <motion.path
              d="M 200 550 L 230 580 L 280 520"
              stroke="#A8F1BF"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#strongMintGlow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={prototypeDrawing ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ delay: 5.5, duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
            />
          </svg>

          {/* Enhanced pulsing mint glow on completion */}
          {prototypeDrawing && (
            <motion.div
              className="absolute inset-0 rounded-3xl blur-3xl"
              style={{ backgroundColor: '#A8F1BF' }}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.15, 0.35, 0.15],
                scale: [0.95, 1, 1.08, 1]
              }}
              transition={{ 
                delay: 6.4,
                duration: 2.5,
                repeat: Infinity 
              }}
            />
          )}
        </motion.div>

        <motion.p
          className="text-2xl mt-10 text-center font-light relative z-10"
          style={{ 
            fontFamily: "'Caveat', cursive",
            color: 'rgba(234, 234, 234, 0.75)'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={prototypeDrawing ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 4, duration: 1.2 }}
        >
          İlk arayüz tasarımı oluşturuluyor...
        </motion.p>

        {/* "Prototip Tamamlandı" with enhanced glow */}
        {prototypeDrawing && (
          <motion.p
            className="text-3xl mt-6 text-center font-bold relative z-10"
            style={{ 
              fontFamily: "'Caveat', cursive",
              color: '#A8F1BF',
              textShadow: '0 0 25px rgba(168, 241, 191, 0.6)'
            }}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              textShadow: [
                '0 0 25px rgba(168, 241, 191, 0.6)',
                '0 0 40px rgba(168, 241, 191, 0.9)',
                '0 0 25px rgba(168, 241, 191, 0.6)'
              ]
            }}
            transition={{ 
              delay: 6.5, 
              duration: 0.8, 
              type: 'spring',
              textShadow: {
                duration: 2,
                repeat: Infinity
              }
            }}
          >
            ✅ Prototip Tamamlandı
          </motion.p>
        )}
      </motion.section>

      {/* 4️⃣ TEAM FORMATION - ISOLATED SCENE [0.22 - 0.44] */}
      <motion.div
        className="relative"
        style={{
          height: '110vh',
          overflow: 'hidden',
          willChange: 'transform, opacity'
        }}
      >
        <motion.section 
          ref={teamRef} 
          className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20" 
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          style={{ 
            ...camera.global,
            x: sync.sections.team.panX,
            scale: sync.sections.team.scale,
            opacity: sync.sections.team.opacity,
            zIndex: sync.sections.team.zIndex,
            willChange: 'transform, opacity',
            pointerEvents: sync.sections.team.opacity > 0.1 ? 'auto' : 'none'
          }}
          transition={{ 
            opacity: { duration: 0.6, ease: 'easeInOut' },
            scale: { duration: 0.6, ease: 'easeInOut' },
            y: { duration: 0.6, ease: 'easeInOut' }
          }}
        >
        {/* Soft rim light - mint tint highlighting characters */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 30% 30%, rgba(168, 241, 191, 0.2), transparent 50%)',
            opacity: teamInView ? 1 : 0,
            mixBlendMode: 'soft-light'
          }}
          transition={{ duration: 2 }}
        />
        
        {/* Curved transition overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ clipPath: 'circle(0% at 50% 50%)' }}
          animate={teamInView ? { clipPath: 'circle(150% at 50% 50%)' } : {}}
          transition={{ duration: 1.8, ease: [0.25, 1, 0.5, 1] }}
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(168, 241, 191, 0.03), transparent 60%)',
            zIndex: 1
          }}
        />
        
        {/* Depth shadow */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            boxShadow: '0 0 50px rgba(0,0,0,0.4)',
            opacity: teamInView ? 1 : 0
          }}
          transition={{ duration: 1.2 }}
        />
        
        <motion.h2
          className="text-6xl md:text-7xl font-bold text-center mb-20 relative z-10"
          style={{ 
            fontFamily: "'Caveat', cursive",
            color: '#EAEAEA',
            textShadow: '0 0 35px rgba(168, 241, 191, 0.4), inset 0 0 15px rgba(168, 241, 191, 0.2)'
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={teamInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2 }}
        >
          Takım Oluşuyor
        </motion.h2>

        <div className="relative w-full max-w-2xl h-96 z-10">
          {/* Central node */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0, opacity: 0 }}
            animate={teamInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
          >
            <div
              className="w-32 h-32 rounded-full flex items-center justify-center border-2"
              style={{
                background: 'linear-gradient(135deg, rgba(168, 241, 191, 0.25), rgba(168, 241, 191, 0.08))',
                borderColor: '#A8F1BF',
                boxShadow: '0 0 50px rgba(168, 241, 191, 0.6), inset 0 0 20px rgba(168, 241, 191, 0.2)'
              }}
            >
              <p 
                className="text-lg text-center px-2 font-semibold"
                style={{ 
                  fontFamily: "'Caveat', cursive",
                  color: '#EAEAEA'
                }}
              >
                İş birliği başlıyor
              </p>
            </div>

            {/* Enhanced pulsing glow */}
            <motion.div
              className="absolute inset-0 rounded-full blur-2xl"
              style={{ backgroundColor: '#A8F1BF' }}
              animate={{
                opacity: [0.25, 0.55, 0.25],
                scale: [1, 1.4, 1]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>

          {/* Team members in circle */}
          {teamMembers.map((member, idx) => {
            const angle = (idx * 120 - 90) * (Math.PI / 180);
            const radius = 200;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <motion.div
                key={idx}
                className="absolute left-1/2 top-1/2"
                style={{
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={activeTeamMember > idx ? { scale: 1, opacity: 1 } : {}}
                transition={{ 
                  delay: 1 + idx * 0.4,
                  type: 'spring',
                  stiffness: 200
                }}
              >
                <div
                  className="w-28 h-28 rounded-full flex flex-col items-center justify-center border-2"
                  style={{
                    background: 'linear-gradient(135deg, rgba(234, 234, 234, 0.08), rgba(234, 234, 234, 0.02))',
                    borderColor: '#7FB3D5',
                    backdropFilter: 'blur(12px)',
                    boxShadow: '0 10px 35px rgba(0,0,0,0.4), inset 0 0 15px rgba(127, 179, 213, 0.1)'
                  }}
                >
                  <div className="text-4xl mb-1">{member.icon}</div>
                  <p 
                    className="text-xs font-light"
                    style={{ 
                      color: 'rgba(234, 234, 234, 0.75)',
                      fontFamily: "'Inter', sans-serif"
                    }}
                  >
                    {member.role}
                  </p>
                </div>

                {/* Connection line to center */}
                {activeTeamMember > idx && (
                  <svg 
                    className="absolute top-1/2 left-1/2 pointer-events-none"
                    style={{
                      width: `${Math.abs(x) + 100}px`,
                      height: `${Math.abs(y) + 100}px`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <motion.line
                      x1={x > 0 ? 0 : Math.abs(x)}
                      y1={y > 0 ? 0 : Math.abs(y)}
                      x2={x > 0 ? x : 0}
                      y2={y > 0 ? y : 0}
                      stroke="#A8F1BF"
                      strokeWidth="2"
                      strokeDasharray="6,4"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.6 }}
                      transition={{ duration: 1.2 }}
                    />
                  </svg>
                )}

                {/* Chalk sparkle burst */}
                {activeTeamMember > idx && [...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: '#A8F1BF',
                      top: '50%',
                      left: '50%',
                      filter: 'blur(1px)'
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1.8, 0],
                      x: [(Math.random() - 0.5) * 70],
                      y: [(Math.random() - 0.5) * 70]
                    }}
                    transition={{
                      delay: i * 0.04,
                      duration: 1.2
                    }}
                  />
                ))}
              </motion.div>
            );
          })}
        </div>
      </motion.section>
      </motion.div>

      {/* 5️⃣ VISION SCENE - Light Bulb Animation */}
      <motion.div
        style={{
          ...camera.global,
          y: sync.sections.vision.panY,
          opacity: sync.sections.vision.opacity,
          zIndex: sync.sections.vision.zIndex,
          willChange: 'transform, opacity',
          position: 'relative',
          pointerEvents: 'auto'
        }}
        transition={{ ease: 'easeOut', duration: 0.7 }}
      >
        {/* Full illumination moment - radial gradient expands */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(168, 241, 191, 0.35), transparent 70%)',
            opacity: 0,
            mixBlendMode: 'screen',
            zIndex: 5
          }}
          animate={{
            opacity: [0, 0.8, 0.5],
            scale: [0.8, 1.5, 1.2]
          }}
          transition={{
            duration: 3,
            delay: 1,
            repeat: Infinity,
            repeatDelay: 2
          }}
        />
        
        {/* Ambient chalk dust glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 60%, rgba(168, 241, 191, 0.15), transparent 60%)',
            filter: 'blur(40px)',
            zIndex: 4
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity
          }}
        />
        
        <LightBulbScene />
      </motion.div>

      {/* 6️⃣ FINAL CTA */}
      <motion.section 
        className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden" 
        style={{ 
          zIndex: 50,
          ...camera.global,
          pointerEvents: 'auto'
        }}
        transition={{ ease: 'easeOut', duration: 0.7 }}
      >
        {/* Enhanced depth shadow */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            boxShadow: '0 0 80px rgba(0,0,0,0.5)',
          }}
          transition={{ duration: 1.5 }}
        />
        
        {/* Curved clip-path transition from bottom */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' }}
          whileInView={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
          style={{
            background: 'linear-gradient(to top, rgba(168, 241, 191, 0.02), transparent 70%)',
            zIndex: 1
          }}
        />
        
        {/* Background blur transition */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ filter: 'blur(2px)', opacity: 0.3 }}
          whileInView={{ filter: 'blur(0px)', opacity: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        />
        
        <motion.div
          className="text-center relative z-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        >
          <motion.h2
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-16 leading-tight"
            style={{ 
              fontFamily: "'Caveat', cursive",
              color: '#EAEAEA',
              textShadow: '0 0 50px rgba(168, 241, 191, 0.6), inset 0 0 20px rgba(168, 241, 191, 0.2)'
            }}
          >
            Senin fikirlerin de<br />bu kadar canlı olabilir.
          </motion.h2>

          {/* CTA Button with vibration */}
          <motion.button
            onClick={() => navigate('/register')}
            className="px-20 py-7 rounded-3xl text-3xl md:text-4xl font-bold relative overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, #A8F1BF, #8FD9A8)',
              color: '#0D0D0D',
              fontFamily: "'Caveat', cursive",
              border: 'none',
              boxShadow: '0 20px 60px rgba(168, 241, 191, 0.5), inset 0 2px 10px rgba(255, 255, 255, 0.3)'
            }}
            whileHover={{ 
              scale: 1.06,
              boxShadow: '0 25px 70px rgba(168, 241, 191, 0.75)',
              rotate: [0, -1, 1, -1, 0]
            }}
            whileTap={{ scale: 0.96 }}
            animate={{
              boxShadow: [
                '0 20px 60px rgba(168, 241, 191, 0.5)',
                '0 24px 65px rgba(168, 241, 191, 0.7)',
                '0 20px 60px rgba(168, 241, 191, 0.5)'
              ]
            }}
            transition={{
              boxShadow: {
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut'
              },
              rotate: {
                duration: 0.3
              }
            }}
          >
            <motion.span
              className="relative z-10"
              animate={{
                textShadow: [
                  '0 0 15px rgba(0,0,0,0.4)',
                  '0 0 25px rgba(0,0,0,0.6)',
                  '0 0 15px rgba(0,0,0,0.4)'
                ]
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              Fikrini Yarat 🚀
            </motion.span>

            {/* Enhanced hover flicker */}
            <motion.div
              className="absolute inset-0 rounded-3xl"
              style={{ background: 'rgba(255,255,255,0.4)' }}
              initial={{ opacity: 0 }}
              whileHover={{ 
                opacity: [0, 0.4, 0, 0.3, 0],
                transition: { duration: 0.6, repeat: Infinity }
              }}
            />
          </motion.button>

          {/* Enhanced ambient chalk dust drifting upward */}
          {[...Array(35)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                backgroundColor: '#A8F1BF',
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                left: `${Math.random() * 100}%`,
                bottom: '0%',
                filter: `blur(${Math.random() * 2.5}px)`
              }}
              animate={{
                opacity: [0, 0.9, 0],
                y: [0, -250, -500],
                x: [(Math.random() - 0.5) * 120],
                scale: [0, 1.8, 0]
              }}
              transition={{
                duration: 7 + Math.random() * 4,
                delay: Math.random() * 5,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          ))}
        </motion.div>
      </motion.section>

      {/* 7️⃣ FAQ FOOTER */}
      <motion.section 
        className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden" 
        style={{ 
          zIndex: 60,
          ...camera.global,
          pointerEvents: 'auto'
        }}
        transition={{ ease: 'easeOut', duration: 0.7 }}
      >
        {/* Brightest lighting - finale */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            background: 'radial-gradient(ellipse at 50% 30%, rgba(168, 241, 191, 0.25), rgba(202, 255, 217, 0.1) 50%, transparent 80%)',
            mixBlendMode: 'screen',
            zIndex: 2
          }}
          transition={{ duration: 2 }}
        />
        
        {/* Smooth fade-in transition */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.5 }}
          style={{
            background: 'radial-gradient(ellipse at top, rgba(168, 241, 191, 0.02), transparent 70%)',
            zIndex: 1
          }}
        />
        
        <motion.div
          className="max-w-4xl w-full relative z-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Title */}
          <motion.h2
            className="text-5xl md:text-6xl font-bold text-center mb-16"
            style={{ 
              fontFamily: "'Caveat', cursive",
              color: '#EAEAEA',
              textShadow: '0 0 30px rgba(168, 241, 191, 0.3)'
            }}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Sıkça Sorulan Sorular
          </motion.h2>

          {/* FAQ Items */}
          <div className="space-y-6">
            {[
              {
                question: "Fikirlerim güvende mi?",
                answer: "Evet! Tüm verileriniz şifrelenmiş olarak saklanır ve sadece siz erişebilirsiniz. Gizliliğiniz bizim önceliğimizdir."
              },
              {
                question: "PinMind ücretsiz mi?",
                answer: "Temel özellikler tamamen ücretsizdir. Premium özellikler için makul fiyatlarla aylık ve yıllık planlarımız mevcuttur."
              },
              {
                question: "AI analizi ne kadar doğru?",
                answer: "AI sistemimiz sürekli geliştirilmektedir ve %85+ doğruluk oranı ile fikirlerinizi analiz eder, öneriler sunar ve ekip önerileri yapar."
              },
              {
                question: "Takım işbirliği nasıl çalışır?",
                answer: "Projelerinizi takım üyeleriyle gerçek zamanlı olarak paylaşabilir, görevler atayabilir ve ilerlemeyi birlikte takip edebilirsiniz."
              }
            ].map((faq, idx) => (
              <motion.div
                key={idx}
                className="relative rounded-2xl p-6 md:p-8 border-2"
                style={{
                  background: 'linear-gradient(135deg, rgba(234, 234, 234, 0.04), rgba(234, 234, 234, 0.01))',
                  borderColor: 'rgba(168, 241, 191, 0.2)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 0 20px rgba(168, 241, 191, 0.05)'
                }}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ 
                  delay: 0.3 + idx * 0.15, 
                  duration: 0.6,
                  ease: 'easeInOut'
                }}
                whileHover={{
                  borderColor: 'rgba(168, 241, 191, 0.4)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.4), inset 0 0 30px rgba(168, 241, 191, 0.08)'
                }}
              >
                {/* Chalk accent line */}
                <motion.div
                  className="absolute top-0 left-8 w-12 h-1 rounded-full"
                  style={{ 
                    backgroundColor: '#A8F1BF',
                    boxShadow: '0 0 10px rgba(168, 241, 191, 0.5)'
                  }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + idx * 0.15, duration: 0.4 }}
                />

                <h3 
                  className="text-2xl md:text-3xl font-bold mb-3"
                  style={{ 
                    fontFamily: "'Caveat', cursive",
                    color: '#EAEAEA'
                  }}
                >
                  {faq.question}
                </h3>
                <p 
                  className="text-base md:text-lg leading-relaxed font-light"
                  style={{ 
                    color: 'rgba(234, 234, 234, 0.75)',
                    fontFamily: "'Inter', sans-serif"
                  }}
                >
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Footer Bottom */}
          <motion.div
            className="mt-16 pt-8 border-t text-center"
            style={{ 
              borderColor: 'rgba(168, 241, 191, 0.15)'
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <p 
              className="text-sm font-light mb-4"
              style={{ 
                color: 'rgba(234, 234, 234, 0.5)',
                fontFamily: "'Inter', sans-serif"
              }}
            >
              © 2025 PinMind. Fikirlerinizin dijital evi.
            </p>
            
            {/* Social/Contact Links */}
            <div className="flex items-center justify-center gap-6 flex-wrap">
              {['Gizlilik', 'Kullanım Şartları', 'İletişim', 'Blog'].map((link) => (
                <motion.a
                  key={link}
                  href="#"
                  className="text-sm font-light transition-colors"
                  style={{ 
                    color: 'rgba(234, 234, 234, 0.6)',
                    fontFamily: "'Inter', sans-serif"
                  }}
                  whileHover={{ 
                    color: '#A8F1BF',
                    textShadow: '0 0 10px rgba(168, 241, 191, 0.6)'
                  }}
                >
                  {link}
                </motion.a>
              ))}
            </div>

            {/* Chalk dust particles */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  backgroundColor: '#A8F1BF',
                  left: `${Math.random() * 100}%`,
                  bottom: '10%',
                  filter: 'blur(1px)',
                  opacity: 0.3
                }}
                animate={{
                  y: [0, -100, -200],
                  opacity: [0.3, 0.6, 0],
                  x: [(Math.random() - 0.5) * 50]
                }}
                transition={{
                  duration: 6 + Math.random() * 3,
                  delay: Math.random() * 4,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      {/* 🎵 Audio Control Button */}
      <AudioControl />
    </div>
  );
};

export default LandingPage;

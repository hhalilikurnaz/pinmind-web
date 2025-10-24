import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { ChalkboardBase } from '../components/ChalkboardComponents';
import { motionTokens, chalkboardColors } from '../utils/motionTokens';

const LandingPage = () => {
  const navigate = useNavigate();
  const { lang, changeLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { scrollYProgress } = useScroll();
  
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const [showFlow, setShowFlow] = useState(false);
  const [activeFlowNode, setActiveFlowNode] = useState(0);
  
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const [showFlow, setShowFlow] = useState(false);
  const [activeFlowNode, setActiveFlowNode] = useState(0);

  // Trigger analysis scene after intro handwriting completes
  useEffect(() => {
    const timer1 = setTimeout(() => setShowAnalysis(true), 4000);
    return () => clearTimeout(timer1);
  }, []);

  // Sequentially show analysis cards
  useEffect(() => {
    if (showAnalysis && activeCard < 3) {
      const timer = setTimeout(() => setActiveCard(prev => prev + 1), 800);
      return () => clearTimeout(timer);
    }
  }, [showAnalysis, activeCard]);

  // Trigger flow visualization on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (latest > 0.4 && !showFlow) {
        setShowFlow(true);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, showFlow]);

  // Sequential flow nodes
  useEffect(() => {
    if (showFlow && activeFlowNode < 3) {
      const timer = setTimeout(() => setActiveFlowNode(prev => prev + 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [showFlow, activeFlowNode]);

  const analysisCards = [
    { title: 'Problem', desc: 'Yemek yapma zorluğu', icon: '🤔', color: chalkboardColors.pink },
    { title: 'Hedef Kitle', desc: 'Evdeki malzemelerle pratik çözüm arayanlar', icon: '👥', color: chalkboardColors.sky },
    { title: 'Çözüm', desc: 'AI destekli tarif önerme sistemi', icon: '💡', color: chalkboardColors.mint }
  ];

  const flowNodes = [
    { label: 'Prototype', icon: '🎨', x: 30, y: 50 },
    { label: 'Team', icon: '👨‍💻', x: 50, y: 30 },
    { label: 'Resources', icon: '📦', x: 70, y: 50 }
  ];

  return (
    <ChalkboardBase>
      <div className="fixed top-6 right-6 z-50 flex items-center gap-3">
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

      <AgentScene onComplete={handleAgentComplete} />

      <div ref={flowRef} className="scroll-mt-20">
        <FlowVisualizer onComplete={handleFlowComplete} />
      </div>

      <div ref={boardRef} className="scroll-mt-20">
        <IdeaBoard />
      </div>

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

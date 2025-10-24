import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'react-router-dom';
import useStore from '../store/useStore';
import ChatBar from '../components/ChatBar';
import BackButton from '../components/BackButton';
import PrototypeSimulationGrid from '../components/PrototypeSimulationGrid';
import AISimulationAssistant from '../components/AISimulationAssistant';
import { ideas, getChatHistory } from '../utils/mockData';
import { getPrototypeData, getDefaultPrototype } from '../data/mockPrototypeData';
import { motionTokens } from '../styles/motionTokens';

const AnalysisCard = ({ label, value, color, delay, icon }) => {
  // Muted accent colors (desaturated 20%)
  const colorMap = {
    green: { 
      text: '#79CBA8',
      gradient: 'linear-gradient(135deg, rgba(121, 203, 168, 0.25), rgba(121, 203, 168, 0.1))',
      border: 'rgba(121, 203, 168, 0.3)',
      glow: 'rgba(121, 203, 168, 0.15)'
    },
    blue: { 
      text: '#6AAEE3',
      gradient: 'linear-gradient(135deg, rgba(106, 174, 227, 0.25), rgba(106, 174, 227, 0.1))',
      border: 'rgba(106, 174, 227, 0.3)',
      glow: 'rgba(106, 174, 227, 0.15)'
    },
    purple: { 
      text: '#D68BA0',
      gradient: 'linear-gradient(135deg, rgba(214, 139, 160, 0.25), rgba(214, 139, 160, 0.1))',
      border: 'rgba(214, 139, 160, 0.3)',
      glow: 'rgba(214, 139, 160, 0.15)'
    },
  };

  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={{ 
        scale: 1.01, 
        y: -4,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="rounded-2xl p-6 shadow-lg"
      style={{
        background: colorMap[color].gradient,
        backdropFilter: 'blur(20px)',
        border: `1px solid ${colorMap[color].border}`,
        boxShadow: isHovered 
          ? `0 0 20px ${colorMap[color].glow}, 0 4px 6px rgba(0, 0, 0, 0.3)`
          : '0 4px 6px rgba(0, 0, 0, 0.3)'
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <motion.span 
          className="text-2xl"
          animate={isHovered ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.4 }}
        >
          {icon}
        </motion.span>
        <h4 
          className="text-[#EAEAEA] text-xs font-semibold uppercase tracking-wider"
          style={{ 
            fontFamily: 'DM Sans, sans-serif',
            opacity: 0.7,
            letterSpacing: '0.08em'
          }}
        >
          {label}
        </h4>
      </div>
      <div className="flex items-end gap-2 mb-4">
        <motion.span 
          className="text-5xl font-bold"
          style={{ 
            color: colorMap[color].text,
            fontFamily: 'DM Sans, sans-serif',
            lineHeight: '1'
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.95, scale: 1 }}
          transition={{ delay: delay + 0.2, duration: 0.4 }}
        >
          {value}
        </motion.span>
        <span 
          className="text-[#EAEAEA] text-xl mb-1"
          style={{ 
            fontFamily: 'DM Sans, sans-serif',
            opacity: 0.5
          }}
        >
          %
        </span>
      </div>
      <div 
        className="w-full h-2.5 rounded-full overflow-hidden"
        style={{ background: 'rgba(255, 255, 255, 0.08)' }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, delay: delay + 0.3, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ 
            background: `linear-gradient(90deg, ${colorMap[color].text}, ${colorMap[color].text}dd)`
          }}
        />
      </div>
    </motion.div>
  );
};

const IdeaSpace = () => {
  const { id } = useParams();
  const [idea, setIdea] = useState(null);
  const [prototypePanels, setPrototypePanels] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentPanelType, setCurrentPanelType] = useState('overview');

  useEffect(() => {
    const foundIdea = ideas.find(i => i.id === id);
    if (foundIdea) {
      setIdea(foundIdea);
      
      // Get prototype data (specific or default)
      const prototypeData = getPrototypeData(id) || getDefaultPrototype(foundIdea);
      setPrototypePanels(prototypeData);
      
      // Set chat history
      const chatHistory = getChatHistory(id);
      useStore.setState({ 
        selectedIdea: foundIdea,
        chatMessages: chatHistory,
      });
    }
  }, [id]);

  // Update AI mode based on active panel
  useEffect(() => {
    if (prototypePanels.length > 0) {
      const activePanelType = prototypePanels[0]?.type || 'overview';
      setCurrentPanelType(activePanelType);
      
      // Update AI mode contextually
      const modeMap = {
        overview: 'mentor',
        ui: 'developer',
        flow: 'developer',
        output: 'mentor',
        impact: 'investor'
      };
      useStore.setState({ aiMode: modeMap[activePanelType] || 'mentor' });
    }
  }, [prototypePanels]);

  if (!idea) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.p
          {...motionTokens.fadeInSoft}
          className="text-white text-2xl font-handwriting"
        >
          Loading prototype space...
        </motion.p>
      </div>
    );
  }

  return (
    <motion.div
      {...motionTokens.zoomInFlow}
      className="min-h-screen relative overflow-hidden flex"
      style={{
        background: 'linear-gradient(135deg, #0E0E0E 0%, #1A1A1A 100%)'
      }}
    >
      {/* Vignette overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.3) 100%)'
        }}
      />

      {/* Parallax Chalk Texture */}
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

      {/* Floating chalk dust particles */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {[
          { id: 1, x: '15%', delay: 0 },
          { id: 2, x: '85%', delay: 2 }
        ].map(particle => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 rounded-full bg-[#E8E2D0]"
            style={{ left: particle.x, top: '-20px' }}
            animate={{
              y: ['0vh', '110vh'],
              opacity: [0, 0.25, 0.15, 0],
              scale: [0.5, 1, 0.8, 0.3]
            }}
            transition={{
              duration: 18,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        ))}
      </div>

      {/* Back Button */}
      <div className="absolute top-8 left-8 z-50">
        <BackButton />
      </div>

      {/* Main Content - Prototype Workspace */}
      <div className={`${isChatOpen ? 'w-[60%]' : 'w-full'} min-h-screen transition-all duration-400 overflow-hidden relative z-10`}>
        <div className="max-w-full mx-auto px-8 py-16">
          {/* Header */}
          <motion.div 
            {...motionTokens.fadeUp}
            className="text-center mb-10"
          >
            <motion.h1 
              className="text-5xl text-[#EAEAEA] mb-4"
              style={{ 
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 'bold',
                opacity: 0.9,
                lineHeight: '1.3em'
              }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 0.9, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {idea.title}
            </motion.h1>
            <motion.p 
              className="text-lg text-[#EAEAEA] max-w-3xl mx-auto"
              style={{ 
                fontFamily: 'DM Sans, sans-serif',
                opacity: 0.7,
                lineHeight: '1.65em'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {idea.description}
            </motion.p>
            
            {/* Chalk line divider */}
            <motion.div 
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 0.3 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="h-px mx-auto mt-6"
              style={{ 
                width: '300px',
                background: 'rgba(232, 226, 208, 0.5)'
              }}
            />
          </motion.div>

          {/* Analysis Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-6xl mx-auto">
            <AnalysisCard 
              label="Feasibility" 
              value={idea.feasibility} 
              color="green" 
              delay={0.3}
              icon="✅"
            />
            <AnalysisCard 
              label="Innovation" 
              value={idea.innovation} 
              color="purple" 
              delay={0.4}
              icon="💡"
            />
            <AnalysisCard 
              label="Impact" 
              value={idea.impact} 
              color="blue" 
              delay={0.5}
              icon="��"
            />
          </div>

          {/* Prototype Simulation Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <PrototypeSimulationGrid panels={prototypePanels} />
          </motion.div>
        </div>
      </div>

      {/* AI Simulation Assistant (Bottom-Right) */}
      {!isChatOpen && <AISimulationAssistant currentPanelType={currentPanelType} />}

      {/* ChatBar - Side by Side (40%) */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-[40%] h-screen flex-shrink-0 backdrop-blur-xl border-l border-white/10"
            style={{ backgroundColor: 'rgba(13, 13, 13, 0.8)' }}
          >
            <ChatBar onClose={() => setIsChatOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Toggle Button */}
      {!isChatOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            boxShadow: [
              '0 0 0px rgba(106, 174, 227, 0)',
              '0 0 20px rgba(106, 174, 227, 0.4)',
              '0 0 0px rgba(106, 174, 227, 0)'
            ]
          }}
          transition={{ 
            delay: 0.8,
            boxShadow: {
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }
          }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsChatOpen(true)}
          className="fixed top-8 right-8 z-40 px-5 py-3 rounded-full shadow-lg flex items-center gap-2"
          style={{
            background: 'linear-gradient(135deg, rgba(106, 174, 227, 0.9), rgba(106, 174, 227, 0.7))',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '0.9rem',
            fontWeight: '600',
            color: '#EAEAEA'
          }}
        >
          <span className="text-lg">💬</span>
          AI Chat
        </motion.button>
      )}
    </motion.div>
  );
};

export default IdeaSpace;

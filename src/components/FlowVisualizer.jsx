import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { motionTokens, chalkboardColors } from '../utils/motionTokens';

// 🧠 FlowVisualizer: Horizontal AI-drawn mindmap
// Chalk node connections with sequential drawing

const FlowVisualizer = ({ onComplete }) => {
  const [activeNode, setActiveNode] = useState(0);
  const [allNodesDrawn, setAllNodesDrawn] = useState(false);

  const nodes = [
    { id: 1, label: 'Fikir', icon: '💡', x: 20, y: 50, color: chalkboardColors.mint },
    { id: 2, label: 'Analiz', icon: '🔍', x: 40, y: 30, color: chalkboardColors.pink },
    { id: 3, label: 'Prototip', icon: '🎨', x: 60, y: 50, color: chalkboardColors.sky },
    { id: 4, label: 'Paylaş', icon: '🚀', x: 80, y: 35, color: chalkboardColors.beige },
    { id: 5, label: 'Topluluk', icon: '👥', x: 70, y: 70, color: chalkboardColors.mint },
  ];

  const connections = [
    { from: 1, to: 2, delay: 0.5 },
    { from: 2, to: 3, delay: 1.0 },
    { from: 3, to: 4, delay: 1.5 },
    { from: 3, to: 5, delay: 2.0 },
  ];

  // Auto-progress node drawing
  useEffect(() => {
    if (activeNode < nodes.length) {
      const timer = setTimeout(() => {
        setActiveNode(prev => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    } else if (!allNodesDrawn) {
      setAllNodesDrawn(true);
      // Trigger completion after all nodes drawn
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 2000);
    }
  }, [activeNode, allNodesDrawn, nodes.length, onComplete]);

  // Calculate connection path between two nodes
  const getConnectionPath = (fromNode, toNode) => {
    const from = nodes.find(n => n.id === fromNode);
    const to = nodes.find(n => n.id === toNode);
    
    const x1 = from.x;
    const y1 = from.y;
    const x2 = to.x;
    const y2 = to.y;
    
    // Curved path for organic feel
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    const offset = Math.random() * 10 - 5; // Random curve
    
    return `M ${x1} ${y1} Q ${midX + offset} ${midY + offset}, ${x2} ${y2}`;
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
      {/* Title */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={motionTokens.fadeInSoft}
        className="text-center mb-12 z-20"
      >
        <h2 
          className="text-5xl md:text-7xl font-bold mb-4"
          style={{ 
            fontFamily: "'Caveat', cursive",
            color: chalkboardColors.text,
            textShadow: `0 0 30px ${chalkboardColors.glow}`
          }}
        >
          AI, fikir ağını çiziyor...
        </h2>
        <p 
          className="text-xl md:text-2xl"
          style={{ color: chalkboardColors.textSoft }}
        >
          Fikirler arasındaki bağlantılar otomatik keşfediliyor
        </p>
      </motion.div>

      {/* Horizontal Mindmap Canvas */}
      <div className="relative w-full max-w-6xl h-[600px] z-20">
        {/* SVG for connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            {/* Glow filter for lines */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Draw connections as nodes appear */}
          {connections.map((conn, idx) => {
            const fromNode = nodes.find(n => n.id === conn.from);
            const toNode = nodes.find(n => n.id === conn.to);
            
            if (activeNode > nodes.findIndex(n => n.id === conn.from)) {
              return (
                <motion.path
                  key={`${conn.from}-${conn.to}`}
                  d={getConnectionPath(conn.from, conn.to)}
                  stroke={chalkboardColors.chalkLine}
                  strokeWidth="2"
                  strokeDasharray="8,4"
                  strokeLinecap="round"
                  fill="none"
                  filter="url(#glow)"
                  initial="hidden"
                  animate="visible"
                  variants={motionTokens.lineDraw}
                  transition={{ delay: conn.delay, duration: 1.2 }}
                />
              );
            }
            return null;
          })}
        </svg>

        {/* Nodes */}
        <AnimatePresence>
          {nodes.map((node, idx) => (
            idx < activeNode && (
              <motion.div
                key={node.id}
                className="absolute"
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                initial="hidden"
                animate="visible"
                variants={motionTokens.zoomInFlow}
                transition={{ delay: idx * 0.4 }}
              >
                {/* Node glow */}
                <motion.div
                  className="absolute inset-0 rounded-full blur-2xl"
                  style={{ 
                    backgroundColor: node.color,
                    width: '120px',
                    height: '120px',
                    transform: 'translate(-50%, -50%)',
                    top: '50%',
                    left: '50%'
                  }}
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />

                {/* Node card */}
                <motion.div
                  className="relative rounded-2xl p-5 border-2 cursor-pointer"
                  style={{
                    backgroundColor: chalkboardColors.cardBg,
                    borderColor: node.color,
                    backdropFilter: 'blur(10px)',
                    minWidth: '140px',
                    boxShadow: `0 8px 24px rgba(0,0,0,0.3), 0 0 20px ${node.color}40`
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: [0, -3, 3, 0],
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="text-4xl mb-2 text-center">{node.icon}</div>
                  <h3 
                    className="text-lg font-bold text-center"
                    style={{ 
                      fontFamily: "'Caveat', cursive",
                      color: chalkboardColors.text
                    }}
                  >
                    {node.label}
                  </h3>

                  {/* Chalk underline */}
                  <motion.div
                    className="h-1 rounded-full mt-2"
                    style={{ 
                      backgroundColor: node.color,
                      transformOrigin: 'center'
                    }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: idx * 0.4 + 0.3, duration: 0.5 }}
                  />
                </motion.div>

                {/* Chalk dust particles around node */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: node.color,
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`
                    }}
                    animate={{
                      opacity: [0, 0.6, 0],
                      scale: [0, 1.5, 0],
                      y: [0, -20, -40]
                    }}
                    transition={{
                      duration: 2,
                      delay: idx * 0.4 + i * 0.2,
                      repeat: Infinity,
                      repeatDelay: 1
                    }}
                  />
                ))}
              </motion.div>
            )
          ))}
        </AnimatePresence>

        {/* Progress indicator */}
        <motion.div
          className="absolute bottom-0 left-1/2"
          style={{ transform: 'translateX(-50%)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="flex gap-2">
            {nodes.map((_, idx) => (
              <motion.div
                key={idx}
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: idx < activeNode ? chalkboardColors.glowStrong : chalkboardColors.borderColor
                }}
                animate={{
                  scale: idx < activeNode ? [1, 1.3, 1] : 1
                }}
                transition={{
                  duration: 0.3
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Completion message */}
      {allNodesDrawn && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mt-12 z-20"
        >
          <p 
            className="text-2xl md:text-3xl mb-6"
            style={{ 
              fontFamily: "'Caveat', cursive",
              color: chalkboardColors.text
            }}
          >
            Fikir ağı tamamlandı! ✨
          </p>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-4xl"
          >
            ↓
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default FlowVisualizer;

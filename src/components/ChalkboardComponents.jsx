import React from 'react';
import { motion } from 'framer-motion';
import { motionTokens, chalkboardColors } from '../utils/motionTokens';

// Reusable Chalk Dust Particles Component
const ChalkDustParticles = ({ count = 15, opacity = 0.8, speed = 'medium' }) => {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 5 + 2,
    delay: Math.random() * 3,
    duration: speed === 'slow' ? Math.random() * 20 + 15 :
              speed === 'fast' ? Math.random() * 10 + 5 :
              Math.random() * 15 + 10,
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

// Chalkboard Base Layer Component
export const ChalkboardBase = ({ children, className = '' }) => {
  return (
    <div className={`relative w-full ${className}`}>
      {/* Base gradient background */}
      <div 
        className="fixed inset-0 overflow-hidden"
        style={{ 
          zIndex: 0,
          background: chalkboardColors.bg,
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

      {/* Floating chalk dust particles */}
      <ChalkDustParticles count={15} opacity={0.8} speed="medium" />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

// Chalk Underline Component
export const ChalkUnderline = ({ width = '200px', delay = 0, className = '' }) => {
  return (
    <svg width={width} height="10" className={`mx-auto ${className}`}>
      <motion.path
        d={`M10 5 L${parseInt(width) - 10} 5`}
        stroke={chalkboardColors.chalkLine}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={motionTokens.chalkWrite}
        transition={{ delay, duration: 1.2 }}
      />
    </svg>
  );
};

// Chalk Arrow Component (for connections)
export const ChalkArrow = ({ direction = 'right', delay = 0 }) => {
  const paths = {
    right: "M10 30 L70 30 M70 30 L60 20 M70 30 L60 40",
    down: "M30 10 L30 70 M30 70 L20 60 M30 70 L40 60",
    left: "M70 30 L10 30 M10 30 L20 20 M10 30 L20 40",
    up: "M30 70 L30 10 M30 10 L20 20 M30 10 L40 20"
  };

  return (
    <svg 
      width={direction === 'left' || direction === 'right' ? '100' : '60'} 
      height={direction === 'up' || direction === 'down' ? '100' : '60'} 
      className="overflow-visible"
    >
      <motion.path
        d={paths[direction]}
        stroke={chalkboardColors.chalkLine}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        strokeDasharray="5,5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={motionTokens.lineDraw}
        transition={{ delay, duration: 0.8 }}
      />
    </svg>
  );
};

// Chalk Card Component (reusable for ideas/nodes)
export const ChalkCard = ({ 
  icon, 
  title, 
  color = chalkboardColors.mint, 
  delay = 0,
  onClick,
  className = ''
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={motionTokens.zoomInFlow}
      transition={{ delay }}
      whileHover={{ 
        scale: 1.08, 
        rotate: [0, -2, 2, 0],
        transition: { duration: 0.3 }
      }}
      onClick={onClick}
      className={`relative group cursor-pointer ${className}`}
    >
      {/* Chalk dust burst on hover */}
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity"
        style={{ backgroundColor: color }}
      />
      
      {/* Card */}
      <div 
        className="relative rounded-3xl p-6 border-2"
        style={{ 
          backgroundColor: chalkboardColors.cardBg,
          borderColor: chalkboardColors.borderColor,
          backdropFilter: 'blur(10px)',
          boxShadow: `0 8px 24px rgba(0,0,0,0.2)`
        }}
      >
        {icon && <div className="text-5xl mb-3">{icon}</div>}
        <h3 
          className="text-xl font-bold"
          style={{ 
            fontFamily: "'Caveat', cursive",
            color: chalkboardColors.text 
          }}
        >
          {title}
        </h3>
        
        {/* Chalk underline */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.4, duration: 0.6 }}
          className="h-1 rounded-full mt-3"
          style={{ 
            backgroundColor: color,
            transformOrigin: 'left'
          }}
        />
      </div>
    </motion.div>
  );
};

export default ChalkDustParticles;

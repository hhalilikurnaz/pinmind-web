import React from 'react';
import { motion } from 'framer-motion';

const ChalkParticles = ({ count = 5 }) => {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 15,
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
            width: particle.size,
            height: particle.size,
            background: 'radial-gradient(circle, rgba(232, 226, 208, 0.3), rgba(232, 226, 208, 0))',
            filter: 'blur(1px)',
          }}
          animate={{
            opacity: [0.1, 0.4, 0.1],
            y: [-20, 20, -20],
            x: [-10, 10, -10],
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

export default ChalkParticles;

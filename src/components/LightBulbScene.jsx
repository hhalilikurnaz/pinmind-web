import React from 'react';
import { motion, useInView } from 'framer-motion';

const LightBulbScene = () => {
  const sectionRef = React.useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-150px' });

  return (
    <section 
      id="lightbulb-scene"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20" 
      style={{ zIndex: 12 }}
    >
      {/* Background lightening transition */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 2 }}
        style={{
          background: 'radial-gradient(circle at center, rgba(40, 40, 40, 0.4), transparent 70%)',
          zIndex: -1
        }}
      />

      <motion.div
        className="text-center relative z-20"
        initial={{ opacity: 0, y: 60 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.8, ease: [0.25, 1, 0.5, 1] }}
      >
        {/* Title */}
        <motion.h2
          className="text-6xl md:text-8xl font-bold mb-16"
          style={{ 
            fontFamily: "'Caveat', cursive",
            color: '#EAEAEA',
            textShadow: '0 0 40px rgba(168, 241, 191, 0.5), inset 0 0 20px rgba(168, 241, 191, 0.2)'
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 1.5 }}
        >
          Fikir Hayata Geçtiğinde...
        </motion.h2>

        {/* Bulb Animation Container */}
        <motion.div
          className="relative w-64 h-64 mx-auto mb-12"
          initial={{ scale: 0.95, rotate: -20 }}
          animate={inView ? { scale: 1.05, rotate: 0 } : {}}
          transition={{ delay: 0.8, type: 'spring', stiffness: 150 }}
        >
          {/* Rotating container for orbit rings */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              rotate: inView ? [0, 360] : 0
            }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          >
            {/* Progressive Radial Glow Layers */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1, duration: 2 }}
            >
              {/* Inner glow - starts dim, then illuminates */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  width: '100px',
                  height: '100px',
                  background: 'radial-gradient(circle, rgba(168, 241, 191, 0.6) 0%, transparent 70%)',
                  filter: 'blur(20px)'
                }}
                initial={{ opacity: 0.2, scale: 0.8 }}
                animate={inView ? {
                  scale: [0.8, 1.3, 1],
                  opacity: [0.2, 0.8, 0.4]
                } : { opacity: 0.2, scale: 0.8 }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              />
              
              {/* Mid glow - warm radial spread */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  width: '160px',
                  height: '160px',
                  background: 'radial-gradient(circle, rgba(168, 241, 191, 0.3) 0%, transparent 70%)',
                  filter: 'blur(30px)'
                }}
                initial={{ opacity: 0.2, scale: 0.85 }}
                animate={inView ? {
                  scale: [0.85, 1.2, 1],
                  opacity: [0.2, 0.6, 0.3]
                } : { opacity: 0.2, scale: 0.85 }}
                transition={{ duration: 5, repeat: Infinity, delay: 1.5 }}
              />
              
              {/* Outer glow - subtle ambient lighting */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  width: '220px',
                  height: '220px',
                  background: 'radial-gradient(circle, rgba(168, 241, 191, 0.15) 0%, transparent 70%)',
                  filter: 'blur(40px)'
                }}
                initial={{ opacity: 0.2, scale: 0.9 }}
                animate={inView ? {
                  scale: [0.9, 1.15, 1],
                  opacity: [0.2, 0.4, 0.2]
                } : { opacity: 0.2, scale: 0.9 }}
                transition={{ duration: 6, repeat: Infinity, delay: 2 }}
              />
            </motion.div>

            {/* Bulb Emoji - starts dim, then lights up */}
            <motion.div
              className="text-9xl relative z-10"
              initial={{ opacity: 0.2, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0.2, scale: 0.9 }}
              transition={{ delay: 1.5, duration: 2, type: 'spring' }}
            >
              <motion.div
                animate={inView ? {
                  scale: [1, 1.08, 1],
                  filter: [
                    'drop-shadow(0 0 15px rgba(168, 241, 191, 0.4))',
                    'drop-shadow(0 0 35px rgba(168, 241, 191, 0.8))',
                    'drop-shadow(0 0 15px rgba(168, 241, 191, 0.4))'
                  ]
                } : {}}
                transition={{ 
                  duration: 3,
                  repeat: Infinity
                }}
              >
                💡
              </motion.div>
            </motion.div>

            {/* Chalk dust light particles - floating around bulb */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  backgroundColor: '#A8F1BF',
                  boxShadow: '0 0 6px rgba(168, 241, 191, 0.8)',
                  left: '50%',
                  top: '50%',
                  filter: 'blur(1px)'
                }}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 2 + i * 0.1, duration: 0.5 }}
              >
                <motion.div
                  animate={inView ? {
                    x: [0, Math.cos(i * 30 * Math.PI / 180) * 50],
                    y: [0, Math.sin(i * 30 * Math.PI / 180) * 50],
                    opacity: [0, 0.8, 0],
                    scale: [0, 1.5, 0]
                  } : {}}
                  transition={{
                    duration: 3,
                    delay: 2 + i * 0.1,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Orbit rings - dashed circular borders */}
          {[0, 1, 2].map((idx) => (
            <motion.div
              key={idx}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
              style={{
                width: `${120 + idx * 40}px`,
                height: `${120 + idx * 40}px`,
                borderColor: 'rgba(168, 241, 191, 0.2)',
                borderStyle: 'dashed'
              }}
              initial={{ scale: 0, opacity: 0, rotate: 0 }}
              animate={inView ? { 
                scale: 1, 
                opacity: 0.4,
                rotate: 360 
              } : {}}
              transition={{
                delay: 1.2 + idx * 0.2,
                duration: 2,
                rotate: {
                  duration: 20 + idx * 5,
                  repeat: Infinity,
                  ease: 'linear'
                }
              }}
            />
          ))}

          {/* Orbiting particles - small glowing dots */}
          {[...Array(6)].map((_, i) => {
            const angle = (i * 60) * (Math.PI / 180);
            const radius = 100;
            return (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  backgroundColor: '#A8F1BF',
                  boxShadow: '0 0 10px rgba(168, 241, 191, 0.8)',
                  left: '50%',
                  top: '50%',
                  filter: 'blur(0.5px)'
                }}
                initial={{ opacity: 0 }}
                animate={inView ? {
                  opacity: [0, 1, 1],
                  x: [
                    0,
                    Math.cos(angle) * radius,
                    Math.cos(angle + Math.PI) * radius,
                    Math.cos(angle + Math.PI * 2) * radius
                  ],
                  y: [
                    0,
                    Math.sin(angle) * radius,
                    Math.sin(angle + Math.PI) * radius,
                    Math.sin(angle + Math.PI * 2) * radius
                  ]
                } : {}}
                transition={{
                  opacity: { duration: 0.5, delay: 1.5 + i * 0.1 },
                  x: {
                    duration: 8,
                    delay: 2 + i * 0.3,
                    repeat: Infinity,
                    ease: 'linear'
                  },
                  y: {
                    duration: 8,
                    delay: 2 + i * 0.3,
                    repeat: Infinity,
                    ease: 'linear'
                  }
                }}
              />
            );
          })}
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-3xl md:text-4xl max-w-3xl mx-auto leading-relaxed"
          style={{ 
            fontFamily: "'Caveat', cursive",
            color: 'rgba(234, 234, 234, 0.85)'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 1.5 }}
        >
          Her büyük yenilik, küçük bir çizgiyle başlar.
        </motion.p>

        {/* Ambient drifting particles - slow upward movement */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              backgroundColor: '#EAEAEA',
              left: `${Math.random() * 100}%`,
              bottom: '0%',
              filter: 'blur(1.5px)',
              opacity: Math.random() * 0.4
            }}
            initial={{ opacity: 0, y: 0 }}
            animate={inView ? {
              opacity: [0, Math.random() * 0.6, 0],
              y: [0, -250, -500],
              x: [(Math.random() - 0.5) * 80],
              scale: [0, 1.5, 0]
            } : {}}
            transition={{
              duration: 8 + Math.random() * 4,
              delay: Math.random() * 3,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        ))}
      </motion.div>
    </section>
  );
};

export default LightBulbScene;

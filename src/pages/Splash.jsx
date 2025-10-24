import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import tr from '../i18n/tr.json';
import en from '../i18n/en.json';
import { motionTokens } from '../styles/motionTokens';

const Splash = () => {
  const navigate = useNavigate();
  const { lang, changeLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const t = lang === 'tr' ? tr : en;

  return (
    <div 
      className="min-h-screen relative overflow-hidden flex items-center justify-center
                 dark:bg-gradient-to-br dark:from-[#0D0D0D] dark:to-[#1C1C1C]
                 light:bg-gradient-to-br light:from-[#FAFAFA] light:to-[#EAEAEA]"
    >
      {/* Top-right controls */}
      <div className="fixed top-6 right-6 z-50 flex gap-3 items-center">
        <select
          onChange={(e) => changeLang(e.target.value)}
          value={lang}
          className="bg-white/10 dark:bg-white/10 light:bg-black/10 border border-gray-600 dark:border-gray-600 
                     light:border-gray-400 rounded-lg text-sm px-3 py-2 cursor-pointer transition-all duration-200
                     dark:text-gray-300 light:text-gray-700 hover:border-green-400 focus:outline-none 
                     focus:ring-2 focus:ring-green-400/50 backdrop-blur-md"
        >
          <option value="tr">🇹🇷 TR</option>
          <option value="en">🇬🇧 EN</option>
        </select>
        
        <button
          onClick={toggleTheme}
          className="text-2xl hover:scale-110 transition-transform duration-200 
                     hover:rotate-12 focus:outline-none"
        >
          {theme === 'dark' ? '🌙' : '☀️'}
        </button>
      </div>

      {/* Vignette overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-0
                   dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]
                   light:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.3)_100%)]"
      />

      {/* Chalk texture background */}
      <motion.div 
        className="fixed inset-0 pointer-events-none z-5 opacity-[0.02]"
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

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-2xl">
        {/* Logo with chalk write animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-8"
        >
          <motion.h1 
            className="text-7xl font-bold dark:text-[#EAEAEA] light:text-gray-900 mb-4"
            style={{ 
              fontFamily: 'DM Sans, sans-serif',
              letterSpacing: '-0.02em'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.95, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            PinMind
          </motion.h1>

          {/* Chalk underline */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 0.4 }}
            transition={{ delay: 0.6, duration: 0.8, ease: 'easeInOut' }}
            className="h-1 mx-auto mb-6"
            style={{ 
              width: '200px',
              background: theme === 'dark' ? 'rgba(232, 226, 208, 0.6)' : 'rgba(160, 232, 175, 0.6)'
            }}
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-3xl mb-12 dark:text-gray-300 light:text-gray-700"
          style={{ fontFamily: 'Caveat, cursive' }}
        >
          {t.tagline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/login')}
            className="px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300
                       bg-gradient-to-r from-green-500 to-emerald-600 text-white
                       hover:from-green-400 hover:to-emerald-500 hover:shadow-[0_0_30px_rgba(160,232,175,0.5)]
                       min-w-[200px]"
          >
            {t.login}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/register')}
            className="px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300
                       backdrop-blur-xl border-2 min-w-[200px]
                       dark:bg-white/10 dark:border-white/30 dark:text-white dark:hover:bg-white/20
                       light:bg-black/5 light:border-gray-400 light:text-gray-900 light:hover:bg-black/10"
          >
            {t.register}
          </motion.button>
        </motion.div>

        {/* Floating elements */}
        <div className="absolute top-1/4 left-10 text-4xl opacity-30">
          <motion.span
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            💡
          </motion.span>
        </div>

        <div className="absolute top-1/3 right-10 text-4xl opacity-30">
          <motion.span
            animate={{ 
              y: [0, 10, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1
            }}
          >
            🎨
          </motion.span>
        </div>

        <div className="absolute bottom-1/4 left-1/4 text-3xl opacity-30">
          <motion.span
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 10, 0]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2
            }}
          >
            🧠
          </motion.span>
        </div>
      </div>

      {/* Chalk dust particles */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {[
          { id: 1, x: '20%', delay: 0 },
          { id: 2, x: '80%', delay: 3 }
        ].map(particle => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 rounded-full bg-[#E8E2D0]"
            style={{ left: particle.x, top: '-20px' }}
            animate={{
              y: ['0vh', '110vh'],
              opacity: [0, 0.2, 0.1, 0],
              scale: [0.5, 1, 0.8, 0.3]
            }}
            transition={{
              duration: 20,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Splash;

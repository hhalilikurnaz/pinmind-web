import React from 'react';
import { motion } from 'framer-motion';

const FooterSection = ({ lang, onLangChange, theme, onThemeToggle }) => {
  const content = {
    tr: {
      made: "Made with ✨ by PinMind",
      langLabel: "Dil",
      themeLabel: "Tema"
    },
    en: {
      made: "Made with ✨ by PinMind",
      langLabel: "Language",
      themeLabel: "Theme"
    }
  };

  const t = content[lang];

  return (
    <footer className="relative py-12 snap-start border-t dark:border-white/10 light:border-gray-300">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Made with love */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 0.8, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left"
          >
            <p className="dark:text-gray-400 light:text-gray-600"
               style={{ fontFamily: 'Caveat, cursive', fontSize: '1.2rem' }}>
              {t.made}
            </p>
          </motion.div>

          {/* Right: Controls */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-6"
          >
            {/* Language Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-sm dark:text-gray-400 light:text-gray-600">
                {t.langLabel}:
              </span>
              <div className="flex gap-1 p-1 rounded-lg dark:bg-white/5 light:bg-gray-200">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onLangChange('tr')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200
                             ${lang === 'tr' 
                               ? 'dark:bg-green-500/20 dark:text-green-400 light:bg-green-500 light:text-white' 
                               : 'dark:text-gray-400 light:text-gray-600 hover:dark:bg-white/5 hover:light:bg-gray-300'
                             }`}
                >
                  🇹🇷 TR
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onLangChange('en')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200
                             ${lang === 'en' 
                               ? 'dark:bg-green-500/20 dark:text-green-400 light:bg-green-500 light:text-white' 
                               : 'dark:text-gray-400 light:text-gray-600 hover:dark:bg-white/5 hover:light:bg-gray-300'
                             }`}
                >
                  🇬🇧 EN
                </motion.button>
              </div>
            </div>

            {/* Theme Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-sm dark:text-gray-400 light:text-gray-600">
                {t.themeLabel}:
              </span>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.95 }}
                onClick={onThemeToggle}
                className="w-10 h-10 rounded-lg flex items-center justify-center text-xl
                          dark:bg-white/5 light:bg-gray-200
                          dark:hover:bg-white/10 light:hover:bg-gray-300
                          transition-colors duration-200"
              >
                {theme === 'dark' ? '🌙' : '☀️'}
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Subtle divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="h-px mt-8 dark:bg-white/10 light:bg-gray-300"
          style={{ transformOrigin: 'left' }}
        />

        {/* Copyright */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs dark:text-gray-500 light:text-gray-500 mt-6"
        >
          © 2025 PinMind. All rights reserved.
        </motion.p>
      </div>
    </footer>
  );
};

export default FooterSection;

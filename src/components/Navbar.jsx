import React from 'react';
import { motion } from 'framer-motion';

const Navbar = ({ currentPage, setCurrentPage }) => {
  const navItems = ['Board', 'Community', 'Leaderboard', 'Profile'];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-white/5 shadow-sm"
      style={{ backgroundColor: 'rgba(13, 13, 13, 0.7)' }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div 
          className="text-2xl font-handwriting cursor-pointer"
          style={{ color: 'rgba(255, 255, 255, 0.9)' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrentPage('Board')}
        >
          PinMind �
        </motion.div>

        {/* Navigation Links */}
        <div className="flex gap-8">
          {navItems.map((item) => (
            <motion.button
              key={item}
              onClick={() => setCurrentPage(item)}
              className={`font-body text-sm font-semibold tracking-wide transition-all relative ${
                currentPage === item 
                  ? 'text-white' 
                  : 'text-white/60 hover:text-white/90'
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              {item}
              {currentPage === item && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white chalk-dust"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;

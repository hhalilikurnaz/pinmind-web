import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-40 bg-chalkboard/80 backdrop-blur-md border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 text-center">
        <p className="text-white/60 text-sm font-body italic">
          © 2025 PinMind — Think it. Pin it. Share it.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;

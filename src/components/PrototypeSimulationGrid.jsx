import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import PrototypePanel from './PrototypePanel';
import { motionTokens } from '../styles/motionTokens';

const PrototypeSimulationGrid = ({ panels }) => {
  const [activePanel, setActivePanel] = useState(0);
  const scrollContainerRef = useRef(null);

  // Snap scroll to active panel
  const scrollToPanel = (index) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const panelWidth = 380 + 24; // panel width + gap
      container.scrollTo({
        left: index * panelWidth,
        behavior: 'smooth'
      });
      setActivePanel(index);
    }
  };

  // Handle scroll snap detection
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const panelWidth = 380 + 24;
      const scrollLeft = container.scrollLeft;
      const newActivePanel = Math.round(scrollLeft / panelWidth);
      setActivePanel(newActivePanel);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full">
      {/* Parallax Background Dots (Chalk Grid) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(232, 226, 208, 0.3) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          backgroundPosition: '0 0'
        }}
      />

      {/* Horizontal Scroll Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto pb-8 px-8 snap-x snap-mandatory scroll-smooth hide-scrollbar"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {panels.map((panel, index) => (
          <div key={panel.id} className="snap-center">
            <PrototypePanel
              panel={panel}
              index={index}
              isActive={activePanel === index}
            />
          </div>
        ))}

        {/* Add Panel Placeholder */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: panels.length * 0.1 + 0.2 }}
          whileHover={{ scale: 1.02 }}
          className="flex-shrink-0 w-[380px] h-[600px] rounded-2xl border-2 border-dashed border-white/20 hover:border-white/40 transition-all cursor-pointer flex items-center justify-center group snap-center"
        >
          <div className="text-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl mb-4 opacity-40 group-hover:opacity-70 transition-opacity"
            >
              +
            </motion.div>
            <p className="text-white/40 group-hover:text-white/60 transition-colors text-sm font-semibold">
              Add New Stage
            </p>
          </div>
        </motion.div>
      </div>

      {/* Stage Navigator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex items-center justify-center gap-2 mt-6"
      >
        {panels.map((panel, index) => (
          <motion.button
            key={panel.id}
            onClick={() => scrollToPanel(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={`w-2 h-2 rounded-full transition-all ${
              activePanel === index
                ? 'bg-white w-8'
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </motion.div>

      {/* Connection Lines (SVG Path Animation) */}
      <svg
        className="absolute top-48 left-0 w-full h-32 pointer-events-none"
        style={{ zIndex: -1 }}
      >
        {panels.slice(0, -1).map((_, index) => (
          <motion.path
            key={index}
            d={`M ${index * 404 + 380} 60 Q ${index * 404 + 580} 60, ${index * 404 + 780} 60`}
            stroke="rgba(232, 226, 208, 0.2)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="5,5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          />
        ))}
      </svg>

      {/* Stage Labels (Top) */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute top-4 left-8 flex gap-6"
      >
        {panels.map((panel, index) => (
          <div
            key={panel.id}
            className={`w-[380px] text-center transition-opacity ${
              activePanel === index ? 'opacity-100' : 'opacity-40'
            }`}
          >
            <div className="text-xs font-semibold text-white/60 uppercase tracking-wider">
              {panel.type}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default PrototypeSimulationGrid;

import React from 'react';
import { motion } from 'framer-motion';

const CommunityCTA = ({ lang }) => {
  const content = {
    tr: {
      title: "Fikrini sabitle,",
      subtitle: "toplulukla paylaş",
      cta: "Hemen Başla",
      stats: [
        { value: "10K+", label: "Kullanıcı" },
        { value: "50K+", label: "Fikir" },
        { value: "1M+", label: "Etkileşim" }
      ]
    },
    en: {
      title: "Pin your idea,",
      subtitle: "share with community",
      cta: "Get Started",
      stats: [
        { value: "10K+", label: "Users" },
        { value: "50K+", label: "Ideas" },
        { value: "1M+", label: "Interactions" }
      ]
    }
  };

  const t = content[lang];

  return (
    <section className="relative min-h-screen flex items-center justify-center snap-start py-20
                        dark:bg-[#E8E2D0]/5 light:bg-[#E8E2D0]/20">
      {/* Beige texture overlay */}
      <div className="absolute inset-0 opacity-30"
           style={{
             backgroundImage: 'radial-gradient(circle, rgba(232, 226, 208, 0.3) 1px, transparent 1px)',
             backgroundSize: '30px 30px'
           }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Main CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-4 dark:text-white light:text-gray-900"
                style={{ fontFamily: 'Caveat, cursive', lineHeight: 1.2 }}>
              {t.title}
              <br />
              {t.subtitle}
            </h2>

            {/* Animated chalk underline */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 0.5 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 1, ease: 'easeInOut' }}
              className="h-1 w-80 max-w-full mx-auto my-8 dark:bg-[#C5E4D0] light:bg-green-600"
              style={{ transformOrigin: 'left' }}
            />

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.4 }}
              whileHover={{ 
                scale: 1.05, 
                y: -4,
                boxShadow: '0 20px 40px rgba(197, 228, 208, 0.4)'
              }}
              whileTap={{ scale: 0.98 }}
              className="px-12 py-5 rounded-2xl font-bold text-xl text-gray-900
                        bg-gradient-to-r from-[#C5E4D0] to-[#A0E8AF]
                        hover:from-[#A0E8AF] hover:to-[#C5E4D0]
                        shadow-2xl transition-all duration-300"
            >
              {t.cta} 📌
            </motion.button>
          </motion.div>

          {/* Community stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="grid grid-cols-3 gap-8 max-w-3xl mx-auto"
          >
            {t.stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: 1 + index * 0.1, 
                  duration: 0.4,
                  type: 'spring',
                  stiffness: 200
                }}
                className="text-center p-6 rounded-2xl backdrop-blur-lg
                           dark:bg-white/5 light:bg-white/60"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-[#C5E4D0] to-[#A0E8AF]
                               bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm dark:text-gray-400 light:text-gray-600 uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Decorative push pins */}
          <div className="absolute top-20 left-10 w-8 h-8">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-4xl opacity-60"
            >
              📌
            </motion.div>
          </div>
          <div className="absolute top-40 right-20 w-8 h-8">
            <motion.div
              animate={{ rotate: [0, -15, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="text-3xl opacity-60"
            >
              📌
            </motion.div>
          </div>
          <div className="absolute bottom-32 left-1/4 w-8 h-8">
            <motion.div
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity }}
              className="text-3xl opacity-60"
            >
              📌
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityCTA;

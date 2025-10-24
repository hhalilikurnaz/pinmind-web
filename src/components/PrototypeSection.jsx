import React from 'react';
import { motion } from 'framer-motion';

const PrototypeSection = ({ lang }) => {
  const content = {
    tr: {
      title: "Çizimden proje mockup'ına",
      subtitle: "Fikirleriniz gerçek ürünlere dönüşür"
    },
    en: {
      title: "From sketch to project mockup",
      subtitle: "Your ideas transform into real products"
    }
  };

  const t = content[lang];

  // Mock project cards
  const projects = [
    { title: "Mobil Uygulama", icon: "📱", color: "#C5E4D0" },
    { title: "Web Platformu", icon: "💻", color: "#F6D7D7" },
    { title: "Dashboard", icon: "📊", color: "#BEE3F8" }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center snap-start py-20">
      <div className="container mx-auto px-6">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 dark:text-white light:text-gray-900"
              style={{ fontFamily: 'Caveat, cursive' }}>
            {t.title}
          </h2>
          <p className="text-xl dark:text-gray-400 light:text-gray-600">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Split view: Sketches left, Mockups right */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Chalk sketches */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl backdrop-blur-lg border-2
                           dark:bg-white/5 dark:border-white/10
                           light:bg-white/60 light:border-gray-300
                           shadow-2xl p-8 flex items-center justify-center">
              {/* Sketch SVG placeholder */}
              <svg className="w-full h-full opacity-40" viewBox="0 0 400 400">
                {/* Phone frame sketch */}
                <motion.rect
                  x="120" y="40" width="160" height="320" rx="20"
                  className="dark:stroke-[#E8E2D0] light:stroke-gray-700"
                  fill="none"
                  strokeWidth="3"
                  strokeDasharray="5,5"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: 'easeInOut' }}
                />
                
                {/* Screen elements */}
                <motion.circle
                  cx="200" cy="120" r="30"
                  className="dark:stroke-[#C5E4D0] light:stroke-green-600"
                  fill="none"
                  strokeWidth="2"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 0.6 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                />
                
                <motion.line
                  x1="140" y1="180" x2="260" y2="180"
                  className="dark:stroke-[#F6D7D7] light:stroke-pink-500"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                />
                
                <motion.line
                  x1="140" y1="210" x2="240" y2="210"
                  className="dark:stroke-[#BEE3F8] light:stroke-blue-500"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                />
              </svg>

              {/* Chalk dust overlay */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full dark:bg-[#E8E2D0] light:bg-gray-400"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                    }}
                    animate={{
                      opacity: [0.2, 0.5, 0.2],
                      scale: [1, 1.5, 1]
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random()
                    }}
                  />
                ))}
              </div>
            </div>

            {/* "Sketch" label */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 0.6, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full
                         dark:bg-white/10 light:bg-gray-200 backdrop-blur-sm"
            >
              <span className="text-sm dark:text-gray-400 light:text-gray-600"
                    style={{ fontFamily: 'Caveat, cursive' }}>
                ✏️ Sketch
              </span>
            </motion.div>
          </motion.div>

          {/* Right: Project mockup cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.15, duration: 0.5 }}
                whileHover={{ 
                  x: 10, 
                  scale: 1.02,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
                }}
                className="p-6 rounded-2xl backdrop-blur-lg border-2 shadow-xl
                           dark:bg-white/5 dark:border-white/10
                           light:bg-white/80 light:border-gray-300
                           cursor-pointer transition-all duration-300"
                style={{
                  transform: `rotate(${(Math.random() - 0.5) * 2}deg)`
                }}
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl
                               shadow-lg"
                    style={{ backgroundColor: `${project.color}90` }}
                  >
                    {project.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold dark:text-white light:text-gray-900 mb-1">
                      {project.title}
                    </h3>
                    <div className="flex gap-1">
                      {[...Array(3)].map((_, i) => (
                        <div 
                          key={i}
                          className="w-12 h-1 rounded-full dark:bg-white/20 light:bg-gray-300"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PrototypeSection;

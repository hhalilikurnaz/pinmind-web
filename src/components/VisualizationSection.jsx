import React from 'react';
import { motion } from 'framer-motion';

const VisualizationSection = ({ lang }) => {
  const content = {
    tr: {
      title: "AI, fikrinizi görselleştirir",
      subtitle: "Karmaşık süreçler, basit akış şemalarına dönüşür"
    },
    en: {
      title: "AI visualizes your idea",
      subtitle: "Complex processes transform into simple flowcharts"
    }
  };

  const t = content[lang];

  // Flowchart nodes data
  const flowNodes = [
    { id: 1, label: "Fikir", x: 50, y: 20, color: "#C5E4D0" },
    { id: 2, label: "Analiz", x: 30, y: 50, color: "#F6D7D7" },
    { id: 3, label: "Prototip", x: 70, y: 50, color: "#BEE3F8" },
    { id: 4, label: "Paylaş", x: 50, y: 80, color: "#E8E2D0" }
  ];

  // Connection lines
  const connections = [
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 4 },
    { from: 3, to: 4 }
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

        {/* Flowchart visualization */}
        <div className="max-w-4xl mx-auto relative h-[600px]">
          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
            {connections.map((conn, index) => {
              const fromNode = flowNodes.find(n => n.id === conn.from);
              const toNode = flowNodes.find(n => n.id === conn.to);
              
              return (
                <motion.line
                  key={index}
                  x1={`${fromNode.x}%`}
                  y1={`${fromNode.y}%`}
                  x2={`${toNode.x}%`}
                  y2={`${toNode.y}%`}
                  className="dark:stroke-white/20 light:stroke-gray-400/40"
                  strokeWidth="2"
                  strokeDasharray="8 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.2 + index * 0.1,
                    ease: 'easeInOut'
                  }}
                />
              );
            })}
          </svg>

          {/* Flow nodes */}
          {flowNodes.map((node, index) => (
            <motion.div
              key={node.id}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.4, 
                delay: 0.4 + index * 0.15,
                type: 'spring',
                stiffness: 200
              }}
              whileHover={{ scale: 1.1, rotate: 3 }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{ 
                left: `${node.x}%`, 
                top: `${node.y}%`,
                zIndex: 10
              }}
            >
              <div 
                className="w-32 h-32 rounded-2xl shadow-lg flex items-center justify-center
                           backdrop-blur-sm border-2 dark:border-white/20 light:border-gray-300"
                style={{ 
                  backgroundColor: `${node.color}85`,
                  transform: `rotate(${(Math.random() - 0.5) * 6}deg)`
                }}
              >
                <span className="text-xl font-bold dark:text-gray-900 light:text-gray-800"
                      style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  {node.label}
                </span>
              </div>
            </motion.div>
          ))}

          {/* Sticky note decorations */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 0.6, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute top-10 left-10 w-24 h-24 rounded-lg shadow-md
                       dark:bg-[#F6D7D7]/40 light:bg-[#F6D7D7]/60 backdrop-blur-sm
                       transform rotate-[-8deg] border dark:border-white/10 light:border-gray-300"
            style={{ zIndex: 2 }}
          >
            <div className="p-3 text-xs dark:text-gray-900 light:text-gray-800 font-handwriting">
              💡 İlham
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 0.6, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="absolute bottom-16 right-10 w-28 h-28 rounded-lg shadow-md
                       dark:bg-[#BEE3F8]/40 light:bg-[#BEE3F8]/60 backdrop-blur-sm
                       transform rotate-[5deg] border dark:border-white/10 light:border-gray-300"
            style={{ zIndex: 2 }}
          >
            <div className="p-3 text-xs dark:text-gray-900 light:text-gray-800 font-handwriting">
              🎨 Tasarım
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VisualizationSection;

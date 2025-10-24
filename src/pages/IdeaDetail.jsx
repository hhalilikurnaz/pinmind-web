import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';
import ChatBar from '../components/ChatBar';

const FlowChartPanel = ({ flowchart }) => (
  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 chalk-border">
    <h3 className="font-handwriting text-2xl text-white mb-4 chalk-text">
      Development Flow
    </h3>
    <div className="flex items-center justify-between gap-4">
      {flowchart.nodes.map((node, index) => (
        <React.Fragment key={index}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.2 }}
            className="flex-1 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg p-4 text-center chalk-border"
          >
            <p className="font-sans text-white font-semibold">{node}</p>
          </motion.div>
          {index < flowchart.nodes.length - 1 && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: index * 0.2 + 0.1 }}
              className="text-white text-2xl"
            >
              →
            </motion.div>
          )}
        </React.Fragment>
      ))}
    </div>
  </div>
);

const AnalysisPanel = ({ analysis }) => {
  const metrics = [
    { label: 'Feasibility', value: analysis.feasibility, color: 'bg-green-600' },
    { label: 'Innovation', value: analysis.innovation, color: 'bg-blue-600' },
    { label: 'Impact', value: analysis.impact, color: 'bg-purple-600' },
  ];

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 chalk-border">
      <h3 className="font-handwriting text-2xl text-white mb-6 chalk-text">
        AI Analysis
      </h3>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="text-center"
          >
            <div className="relative w-20 h-20 mx-auto mb-2">
              <svg className="transform -rotate-90 w-20 h-20">
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="8"
                  fill="none"
                />
                <motion.circle
                  cx="40"
                  cy="40"
                  r="32"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: '0 200' }}
                  animate={{ 
                    strokeDasharray: `${metric.value * 2} 200` 
                  }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#60A5FA" />
                    <stop offset="100%" stopColor="#A78BFA" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-bold text-lg">{metric.value}%</span>
              </div>
            </div>
            <p className="text-white/80 font-sans text-sm">{metric.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="font-sans text-white font-semibold mb-2">Tech Stack</h4>
          <div className="flex flex-wrap gap-2">
            {analysis.techStack.map((tech, index) => (
              <motion.span
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.05 + 0.5 }}
                className="px-3 py-1 bg-white/20 rounded-full text-white text-sm font-sans"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        {analysis.prototype && (
          <div>
            <h4 className="font-sans text-white font-semibold mb-2">Prototype Steps</h4>
            <ul className="space-y-2">
              {analysis.prototype.map((step, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.7 }}
                  className="flex items-start gap-2 text-white/80 text-sm font-sans"
                >
                  <span className="text-blue-400 font-bold">{index + 1}.</span>
                  {step}
                </motion.li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const IdeaDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { ideas, selectIdea, selectedIdea } = useStore();

  useEffect(() => {
    const idea = ideas.find(i => i.id === id);
    if (idea) {
      selectIdea(idea);
    }
  }, [id, ideas, selectIdea]);

  if (!selectedIdea) {
    return (
      <div className="min-h-screen bg-chalkboard flex items-center justify-center">
        <p className="text-white text-2xl font-handwriting">Idea not found...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-chalkboard"
    >
      {/* Header with Back Button */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-40 bg-chalkboard/80 backdrop-blur-md border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.button
            onClick={() => {
              selectIdea(null);
              navigate('/');
            }}
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors font-sans font-semibold"
          >
            <span className="text-2xl">←</span>
            Back to Board
          </motion.button>
          
          <h1 className="text-2xl font-handwriting text-white chalk-text">
            {selectedIdea.title}
          </h1>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="pt-24 pb-8 px-6 grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {/* Left: Analysis & Flow */}
        <div className="lg:col-span-2 space-y-6">
          <AnalysisPanel analysis={selectedIdea.analysis} />
          {selectedIdea.analysis.flowchart && (
            <FlowChartPanel flowchart={selectedIdea.analysis.flowchart} />
          )}
        </div>

        {/* Right: AI Chat */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-chalkboard/60 backdrop-blur-md rounded-xl chalk-border h-[calc(100vh-8rem)] overflow-hidden">
            <ChatBar />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default IdeaDetail;

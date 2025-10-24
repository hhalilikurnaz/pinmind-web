import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../store/useStore';
import { generateMockResponse } from '../utils/mockData';
import { motionTokens } from '../styles/motionTokens';

const AIWaveform = ({ isThinking }) => (
  <div className="flex items-center justify-center gap-1.5 h-12 px-4">
    {[...Array(7)].map((_, i) => (
      <motion.div
        key={i}
        className="w-2 rounded-full shadow-lg"
        style={{
          background: 'linear-gradient(180deg, #60A5FA, #A78BFA, #EC4899)',
        }}
        animate={isThinking ? {
          height: ['12px', '40px', '12px'],
          opacity: [0.6, 1, 0.6],
          scaleY: [1, 1.2, 1],
        } : {
          height: '12px',
          opacity: 0.3,
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          delay: i * 0.15,
          ease: 'easeInOut',
        }}
      />
    ))}
  </div>
);

const ChatMessage = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <motion.div
      {...motionTokens.fadeInSoft}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-5`}
    >
      {!isUser && (
        <motion.div 
          {...motionTokens.glowPulse}
          className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center mr-3 shadow-lg"
        >
          <span className="text-white text-xl">✨</span>
        </motion.div>
      )}
      
      <div className={`max-w-[75%] ${
        isUser 
          ? 'bg-gradient-to-br from-purple-600/90 to-pink-600/90 text-white' 
          : 'bg-white/95 text-gray-800'
      } px-5 py-3 rounded-2xl shadow-xl border ${isUser ? 'border-purple-400/30' : 'border-gray-200'}`}>
        <p className={`leading-relaxed ${isUser ? 'font-sans text-sm' : 'font-handwriting text-xl'}`}>
          {message.content}
        </p>
      </div>

      {isUser && (
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center ml-3 shadow-lg">
          <span className="text-white text-xl">👤</span>
        </div>
      )}
    </motion.div>
  );
};

const ChatBar = ({ onClose }) => {
  const { chatMessages, isAIThinking, aiMode, setAIMode, addChatMessage, selectedIdea } = useStore();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const aiModes = [
    { id: 'mentor', label: '👨‍🏫 Mentor', color: 'from-blue-500 to-cyan-500' },
    { id: 'developer', label: '💻 Developer', color: 'from-green-500 to-emerald-500' },
    { id: 'investor', label: '💰 Investor', color: 'from-purple-500 to-pink-500' },
  ];

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      role: 'user',
      content: input.trim(),
    };

    addChatMessage(userMessage);
    setInput('');
    useStore.setState({ isAIThinking: true });

    // Simulate AI response with mock data
    setTimeout(() => {
      const response = generateMockResponse(aiMode, input);
      
      addChatMessage({
        role: 'assistant',
        content: response,
      });
      
      useStore.setState({ isAIThinking: false });
    }, 1200 + Math.random() * 800);
  };

  if (!selectedIdea) {
    return (
      <div className="flex items-center justify-center h-full text-white/60">
        <p className="font-handwriting text-2xl">Select an idea to start chatting! 💡</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-900/95 backdrop-blur-xl border-l border-white/10">
      {/* AI Companion Header */}
      <motion.div 
        className="p-6 border-b border-white/10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <motion.div
            {...motionTokens.glowPulse}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-xl"
          >
            <span className="text-2xl">✨</span>
          </motion.div>
          <div className="flex-1">
            <h3 className="font-handwriting text-2xl text-white">AI Companion</h3>
            <p className="text-white/60 text-xs font-sans">Choose your guide</p>
          </div>
          {onClose && (
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-xl"
            >
              ×
            </motion.button>
          )}
        </div>

        {/* AI Mode Toggle */}
        <div className="flex gap-2">
          {aiModes.map((mode) => (
            <motion.button
              key={mode.id}
              onClick={() => setAIMode(mode.id)}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`flex-1 py-3 px-2 rounded-xl text-xs font-bold transition-all ${
                aiMode === mode.id
                  ? `bg-gradient-to-r ${mode.color} text-white shadow-xl`
                  : 'bg-white/5 text-white/60 hover:bg-white/10 border border-white/10'
              }`}
            >
              {mode.label}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-3 scroll-smooth">
        <AnimatePresence mode="popLayout">
          {chatMessages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </AnimatePresence>

        {/* AI Thinking Indicator */}
        {isAIThinking && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3"
          >
            <motion.div 
              className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg"
              animate={{
                rotate: [0, 360],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <span className="text-white text-xl">✨</span>
            </motion.div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-2">
              <AIWaveform isThinking={true} />
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <motion.div 
        className="p-5 border-t border-white/10 bg-gradient-to-t from-gray-900/90 to-transparent backdrop-blur-md"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex gap-3">
          <motion.input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder="Ask me anything... ✨"
            whileFocus={{ scale: 1.02 }}
            className="flex-1 px-5 py-4 bg-white/10 border-2 border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:border-purple-400/60 focus:ring-2 focus:ring-purple-400/30 font-sans text-sm transition-all"
          />
          <motion.button
            onClick={handleSend}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            disabled={!input.trim()}
            className="px-7 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl text-white font-bold text-sm disabled:opacity-30 disabled:cursor-not-allowed shadow-xl disabled:shadow-none transition-all"
          >
            Send 🚀
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ChatBar;

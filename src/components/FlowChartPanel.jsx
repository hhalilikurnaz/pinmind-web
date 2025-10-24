import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { motionTokens } from '../styles/motionTokens';

const FlowChartPanel = ({ data }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(data?.nodes || []);
  const [edges, setEdges, onEdgesChange] = useEdgesState(data?.edges || []);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="h-[600px] rounded-2xl overflow-hidden shadow-lg"
      style={{
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: isHovered 
          ? '0 0 20px rgba(214, 139, 160, 0.15), 0 8px 12px rgba(0, 0, 0, 0.3)'
          : '0 4px 6px rgba(0, 0, 0, 0.3)',
        transition: 'box-shadow 0.3s ease-out'
      }}
    >
      {/* Header */}
      <motion.div 
        className="p-5 border-b backdrop-blur-md"
        style={{
          background: 'linear-gradient(135deg, rgba(214, 139, 160, 0.2), rgba(214, 139, 160, 0.08))',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <motion.h3 
              className="text-[#EAEAEA] mb-1"
              style={{ 
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                opacity: 0.9
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ delay: 0.4 }}
            >
              Development Roadmap
            </motion.h3>
            <motion.p 
              className="text-[#EAEAEA]"
              style={{ 
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.75rem',
                opacity: 0.6
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.5 }}
            >
              Interactive flowchart visualization
            </motion.p>
          </div>
          <motion.div
            animate={{ 
              rotate: 360,
              scale: isHovered ? [1, 1.15, 1] : 1
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
              scale: { duration: 0.4 }
            }}
            className="text-2xl"
            style={{ opacity: 0.8 }}
          >
            🔄
          </motion.div>
        </div>
      </motion.div>
      
      {/* React Flow Canvas */}
      <div style={{ 
        height: 'calc(100% - 80px)',
        background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.6), rgba(20, 20, 20, 0.8))'
      }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          attributionPosition="bottom-right"
        >
          {/* Chalk-style dot grid background */}
          <Background 
            color="rgba(232, 226, 208, 0.25)" 
            gap={30} 
            size={1.2} 
            opacity={0.2}
            variant="dots"
          />
          
          {/* Zoom Controls - Muted style */}
          <Controls 
            className="rounded-xl shadow-lg"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.15)'
            }}
          />
          
          {/* Mini Map - Muted style */}
          <MiniMap 
            className="rounded-xl shadow-lg"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.15)'
            }}
            maskColor="rgba(0, 0, 0, 0.7)"
            nodeColor="#D68BA0"
          />
        </ReactFlow>
      </div>
    </motion.div>
  );
};

export default FlowChartPanel;

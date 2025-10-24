import { create } from 'zustand';

const useStore = create((set, get) => ({
  // Ideas
  ideas: [
    {
      id: '1',
      title: 'AI Fitness Coach',
      description: 'Personalized workout plans powered by machine learning',
      position: { x: 50, y: 50 },
      color: 'yellow',
      analysis: {
        feasibility: 85,
        innovation: 78,
        impact: 82,
        techStack: ['React Native', 'TensorFlow', 'Node.js', 'MongoDB'],
        summary: 'Highly feasible with existing ML frameworks',
      },
      createdAt: new Date('2025-01-15'),
      author: 'Sarah Chen',
      likes: 234,
      comments: 45,
    },
    {
      id: '2',
      title: 'Recipe Generator',
      description: 'Turn leftover ingredients into delicious meals',
      position: { x: 400, y: 100 },
      color: 'pink',
      analysis: {
        feasibility: 72,
        innovation: 80,
        impact: 78,
        techStack: ['React', 'OpenAI API', 'Firebase', 'Spoonacular API'],
        summary: 'Good market fit, needs recipe database',
      },
      createdAt: new Date('2025-01-18'),
      author: 'Mike Johnson',
      likes: 189,
      comments: 32,
    },
    {
      id: '3',
      title: 'Smart Plant Care',
      description: 'IoT sensors that tell you when to water your plants',
      position: { x: 800, y: 150 },
      color: 'mint',
      analysis: {
        feasibility: 90,
        innovation: 70,
        impact: 65,
        techStack: ['Arduino', 'React', 'MQTT', 'AWS IoT'],
        summary: 'Hardware + software combo, proven concept',
      },
      createdAt: new Date('2025-01-20'),
      author: 'Lisa Park',
      likes: 156,
      comments: 28,
    },
  ],

  selectedIdea: null,
  aiMode: 'mentor', // 'mentor', 'developer', 'investor'
  chatMessages: [],
  isAIThinking: false,

  // Actions
  addIdea: (idea) => set((state) => ({
    ideas: [...state.ideas, {
      ...idea,
      id: Date.now().toString(),
      position: { x: Math.random() * 500, y: Math.random() * 300 },
      createdAt: new Date(),
      likes: 0,
      comments: 0,
    }]
  })),

  updateIdeaPosition: (id, position) => set((state) => ({
    ideas: state.ideas.map(idea =>
      idea.id === id ? { ...idea, position } : idea
    )
  })),

  selectIdea: (idea) => set({ 
    selectedIdea: idea,
    chatMessages: idea ? [
      {
        role: 'assistant',
        content: `Hey! I'm excited to help you develop "${idea.title}". Let's make this happen! 🚀`,
        timestamp: new Date(),
      }
    ] : []
  }),

  setAIMode: (mode) => set({ aiMode: mode }),

  addChatMessage: (message) => set((state) => ({
    chatMessages: [...state.chatMessages, {
      ...message,
      timestamp: new Date(),
    }]
  })),

  setAIThinking: (thinking) => set({ isAIThinking: thinking }),

  toggleLike: (ideaId) => set((state) => ({
    ideas: state.ideas.map(idea =>
      idea.id === ideaId ? { ...idea, likes: idea.likes + 1 } : idea
    )
  })),

  // Mock Gemini API call
  analyzeIdea: async (ideaText) => {
    set({ isAIThinking: true });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock response (replace with real Gemini API)
    const analysis = {
      feasibility: Math.floor(Math.random() * 30) + 70,
      innovation: Math.floor(Math.random() * 30) + 70,
      impact: Math.floor(Math.random() * 30) + 70,
      techStack: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
      summary: 'This idea shows great potential with proper execution.',
      prototype: [
        'Design user interface mockups',
        'Build MVP with core features',
        'Test with beta users',
        'Iterate based on feedback',
      ],
      flowchart: {
        nodes: ['User Input', 'Processing', 'AI Analysis', 'Output'],
        connections: ['1->2', '2->3', '3->4'],
      },
    };

    set({ isAIThinking: false });
    return analysis;
  },
}));

export default useStore;

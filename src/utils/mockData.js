// Mock data for PinMind - Enhanced professional version

export const ideas = [
  {
    id: '1',
    title: 'AI Fitness Coach',
    description: 'Personalized workout plans powered by machine learning and real-time form correction.',
    feasibility: 85,
    innovation: 78,
    impact: 82,
    likes: 234,
    comments: 45,
    isTrending: true,
    category: 'Health & Fitness',
    author: 'Sarah Chen',
    color: '#fef9ef',
    position: { x: 0, y: 0 }
  },
  {
    id: '2',
    title: 'Recipe Generator',
    description: 'Turn leftover ingredients into delicious meals with AI-powered recipe suggestions.',
    feasibility: 72,
    innovation: 88,
    impact: 77,
    likes: 189,
    comments: 32,
    isTrending: false,
    category: 'Food & Lifestyle',
    author: 'Marcus Rodriguez',
    color: '#fef2f2',
    position: { x: 0, y: 0 }
  },
  {
    id: '3',
    title: 'Smart Plant Care',
    description: 'IoT sensors and AI to monitor soil moisture, light, and provide care reminders.',
    feasibility: 90,
    innovation: 68,
    impact: 75,
    likes: 156,
    comments: 28,
    isTrending: true,
    category: 'IoT & Smart Home',
    author: 'Emma Thompson',
    color: '#ecfeff',
    position: { x: 0, y: 0 }
  },
  {
    id: '4',
    title: 'Code Review Assistant',
    description: 'AI-powered code analysis tool that suggests improvements and catches bugs early.',
    feasibility: 88,
    innovation: 72,
    impact: 86,
    likes: 312,
    comments: 67,
    isTrending: true,
    category: 'Developer Tools',
    author: 'Alex Kumar',
    color: '#f5f3ff',
    position: { x: 0, y: 0 }
  },
  {
    id: '5',
    title: 'Mood Music Generator',
    description: 'Generate personalized playlists based on your current mood and activity.',
    feasibility: 74,
    innovation: 94,
    impact: 68,
    likes: 201,
    comments: 41,
    isTrending: false,
    category: 'Entertainment',
    author: 'Jordan Lee',
    color: '#fef9ef',
    position: { x: 0, y: 0 }
  },
  {
    id: '6',
    title: 'Virtual Study Rooms',
    description: 'Collaborative online spaces with Pomodoro timers and ambient sounds.',
    feasibility: 82,
    innovation: 65,
    impact: 79,
    likes: 178,
    comments: 35,
    isTrending: false,
    category: 'Education',
    author: 'Sofia Martinez',
    color: '#fef2f2',
    position: { x: 0, y: 0 }
  }
];

// Flowchart data for idea detail view
export const getFlowchartData = (ideaId) => {
  const flowcharts = {
    '1': {
      nodes: [
        { id: '1', type: 'input', data: { label: 'User Profile' }, position: { x: 250, y: 0 } },
        { id: '2', data: { label: 'AI Analysis Engine' }, position: { x: 250, y: 100 } },
        { id: '3', data: { label: 'Form Detection' }, position: { x: 100, y: 200 } },
        { id: '4', data: { label: 'Workout Generator' }, position: { x: 400, y: 200 } },
        { id: '5', type: 'output', data: { label: 'Personalized Plan' }, position: { x: 250, y: 300 } },
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2', animated: true },
        { id: 'e2-3', source: '2', target: '3' },
        { id: 'e2-4', source: '2', target: '4' },
        { id: 'e3-5', source: '3', target: '5' },
        { id: 'e4-5', source: '4', target: '5' },
      ],
    },
    '2': {
      nodes: [
        { id: '1', type: 'input', data: { label: 'Photo Upload' }, position: { x: 250, y: 0 } },
        { id: '2', data: { label: 'Ingredient Recognition' }, position: { x: 250, y: 100 } },
        { id: '3', data: { label: 'Recipe Database' }, position: { x: 100, y: 200 } },
        { id: '4', data: { label: 'Nutrition Analysis' }, position: { x: 400, y: 200 } },
        { id: '5', type: 'output', data: { label: 'Recipe Suggestions' }, position: { x: 250, y: 300 } },
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2', animated: true },
        { id: 'e2-3', source: '2', target: '3' },
        { id: 'e2-4', source: '2', target: '4' },
        { id: 'e3-5', source: '3', target: '5' },
        { id: 'e4-5', source: '4', target: '5' },
      ],
    },
    '3': {
      nodes: [
        { id: '1', type: 'input', data: { label: 'IoT Sensors' }, position: { x: 250, y: 0 } },
        { id: '2', data: { label: 'Data Collection' }, position: { x: 250, y: 100 } },
        { id: '3', data: { label: 'ML Analysis' }, position: { x: 250, y: 200 } },
        { id: '4', data: { label: 'Care Recommendations' }, position: { x: 250, y: 300 } },
        { id: '5', type: 'output', data: { label: 'User Notifications' }, position: { x: 250, y: 400 } },
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2', animated: true },
        { id: 'e2-3', source: '2', target: '3' },
        { id: 'e3-4', source: '3', target: '4' },
        { id: 'e4-5', source: '4', target: '5' },
      ],
    },
  };

  return flowcharts[ideaId] || flowcharts['1'];
};

// Mock chat messages for AI companion
export const getChatHistory = (ideaId) => {
  const chats = {
    '1': [
      { role: 'assistant', content: "Hey! Your AI Fitness Coach idea is really promising. Let's explore it together. 💪", timestamp: new Date() },
      { role: 'assistant', content: "What's your target market? Are you thinking fitness enthusiasts or complete beginners?", timestamp: new Date() },
    ],
    '2': [
      { role: 'assistant', content: "Love the Recipe Generator concept! Food waste is a huge problem. 🍽️", timestamp: new Date() },
      { role: 'assistant', content: "Have you thought about partnering with grocery stores for inventory data?", timestamp: new Date() },
    ],
    '3': [
      { role: 'assistant', content: "Smart Plant Care is super practical! I can see this in every home. 🌱", timestamp: new Date() },
      { role: 'assistant', content: "The hardware cost might be a challenge. What's your manufacturing plan?", timestamp: new Date() },
    ],
  };

  return chats[ideaId] || chats['1'];
};

// AI mode configurations
export const aiModes = [
  { 
    id: 'mentor', 
    label: '🎓 Mentor', 
    color: 'from-blue-500 to-cyan-500',
    description: 'Guides you through validation and refinement'
  },
  { 
    id: 'developer', 
    label: '💻 Developer', 
    color: 'from-green-500 to-emerald-500',
    description: 'Focuses on technical implementation'
  },
  { 
    id: 'investor', 
    label: '💰 Investor', 
    color: 'from-purple-500 to-pink-500',
    description: 'Evaluates market potential and ROI'
  },
];

// Mock AI responses
export const generateMockResponse = (mode, userMessage) => {
  const responses = {
    mentor: [
      "That's an interesting perspective! Have you validated this with potential users?",
      "Let's break this down into smaller, actionable steps.",
      "What metrics would you use to measure success here?",
      "Great question! Let me share some best practices...",
    ],
    developer: [
      "From a technical standpoint, you'll need to consider scalability here.",
      "I'd recommend using a microservices architecture for this.",
      "Have you thought about the API design and data flow?",
      "The tech stack for this would likely include React, Node.js, and PostgreSQL.",
    ],
    investor: [
      "What's the total addressable market for this solution?",
      "Can you walk me through the unit economics?",
      "Who are your main competitors, and what's your differentiation?",
      "What's your customer acquisition strategy and projected CAC?",
    ],
  };

  const modeResponses = responses[mode] || responses.mentor;
  return modeResponses[Math.floor(Math.random() * modeResponses.length)];
};

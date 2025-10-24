// Mock Gemini API - Simulates AI analysis responses

export const mockIdeas = [
  {
    id: '1',
    title: 'Smart Bus Network',
    description: 'AI system to optimize urban transport schedules based on real-time traffic and passenger demand.',
    summary: 'AI system to optimize urban transport schedules.',
    feasibility: 84,
    innovation: 78,
    impact: 92,
    color: 'yellow',
    position: { x: 100, y: 80 },
    flowchart: {
      nodes: [
        { id: '1', data: { label: 'User Input (Routes & Time)' }, position: { x: 250, y: 50 }, type: 'input' },
        { id: '2', data: { label: 'AI Processing Engine' }, position: { x: 250, y: 150 } },
        { id: '3', data: { label: 'Traffic Analysis' }, position: { x: 100, y: 250 } },
        { id: '4', data: { label: 'Passenger Demand' }, position: { x: 400, y: 250 } },
        { id: '5', data: { label: 'Optimized Schedule' }, position: { x: 250, y: 350 }, type: 'output' },
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2', animated: true },
        { id: 'e2-3', source: '2', target: '3' },
        { id: 'e2-4', source: '2', target: '4' },
        { id: 'e3-5', source: '3', target: '5' },
        { id: 'e4-5', source: '4', target: '5' },
      ],
    },
    chatHistory: [
      { role: 'assistant', content: "Hey! Your Smart Bus Network idea is really promising! Let's dive into it. 🚀" },
      { role: 'assistant', content: "I see you're tackling urban transport efficiency. What's your primary target city?" },
    ],
  },
  {
    id: '2',
    title: 'Recipe Remix AI',
    description: 'Turn leftover ingredients into creative meals using computer vision and recipe databases.',
    summary: 'AI that creates recipes from leftover ingredients.',
    feasibility: 76,
    innovation: 88,
    impact: 72,
    color: 'pink',
    position: { x: 450, y: 120 },
    flowchart: {
      nodes: [
        { id: '1', data: { label: 'Photo Upload' }, position: { x: 250, y: 50 }, type: 'input' },
        { id: '2', data: { label: 'Image Recognition' }, position: { x: 250, y: 150 } },
        { id: '3', data: { label: 'Ingredient Database' }, position: { x: 100, y: 250 } },
        { id: '4', data: { label: 'Recipe Generator' }, position: { x: 400, y: 250 } },
        { id: '5', data: { label: 'Meal Suggestions' }, position: { x: 250, y: 350 }, type: 'output' },
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2', animated: true },
        { id: 'e2-3', source: '2', target: '3' },
        { id: 'e2-4', source: '2', target: '4' },
        { id: 'e3-5', source: '3', target: '5' },
        { id: 'e4-5', source: '4', target: '5' },
      ],
    },
    chatHistory: [
      { role: 'assistant', content: "This Recipe Remix concept is delicious! 🍳" },
      { role: 'assistant', content: "Have you thought about dietary restrictions and allergies?" },
    ],
  },
  {
    id: '3',
    title: 'Plant Care IoT',
    description: 'Smart sensors that monitor soil moisture, light, and temperature to keep plants healthy.',
    summary: 'IoT sensors for automated plant care.',
    feasibility: 92,
    innovation: 68,
    impact: 65,
    color: 'mint',
    position: { x: 800, y: 90 },
    flowchart: {
      nodes: [
        { id: '1', data: { label: 'Sensor Data' }, position: { x: 250, y: 50 }, type: 'input' },
        { id: '2', data: { label: 'Data Processing' }, position: { x: 250, y: 150 } },
        { id: '3', data: { label: 'ML Model Analysis' }, position: { x: 250, y: 250 } },
        { id: '4', data: { label: 'Alert & Recommendation' }, position: { x: 250, y: 350 }, type: 'output' },
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2', animated: true },
        { id: 'e2-3', source: '2', target: '3' },
        { id: 'e3-4', source: '3', target: '4' },
      ],
    },
    chatHistory: [
      { role: 'assistant', content: "Plant Care IoT! Very practical and marketable. 🌱" },
      { role: 'assistant', content: "What hardware platform are you considering? Arduino or Raspberry Pi?" },
    ],
  },
  {
    id: '4',
    title: 'Code Review Assistant',
    description: 'AI-powered tool that reviews code quality, suggests improvements, and catches bugs before deployment.',
    summary: 'AI code reviewer for quality and bugs.',
    feasibility: 88,
    innovation: 82,
    impact: 86,
    color: 'lavender',
    position: { x: 200, y: 350 },
    flowchart: {
      nodes: [
        { id: '1', data: { label: 'Code Input' }, position: { x: 250, y: 50 }, type: 'input' },
        { id: '2', data: { label: 'Syntax Parser' }, position: { x: 150, y: 150 } },
        { id: '3', data: { label: 'AI Analysis' }, position: { x: 350, y: 150 } },
        { id: '4', data: { label: 'Quality Report' }, position: { x: 250, y: 250 }, type: 'output' },
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2', animated: true },
        { id: 'e1-3', source: '1', target: '3', animated: true },
        { id: 'e2-4', source: '2', target: '4' },
        { id: 'e3-4', source: '3', target: '4' },
      ],
    },
    chatHistory: [
      { role: 'assistant', content: "Code Review Assistant is a solid SaaS opportunity! 💻" },
      { role: 'assistant', content: "Which programming languages will you support first?" },
    ],
  },
  {
    id: '5',
    title: 'Mood Music Generator',
    description: 'AI that detects your mood through camera and generates personalized music playlists.',
    summary: 'AI DJ that reads emotions and plays mood-based music.',
    feasibility: 70,
    innovation: 94,
    impact: 78,
    color: 'teal',
    position: { x: 600, y: 380 },
    flowchart: {
      nodes: [
        { id: '1', data: { label: 'Camera Input' }, position: { x: 250, y: 50 }, type: 'input' },
        { id: '2', data: { label: 'Facial Recognition' }, position: { x: 250, y: 150 } },
        { id: '3', data: { label: 'Mood Detection AI' }, position: { x: 250, y: 250 } },
        { id: '4', data: { label: 'Music Selection' }, position: { x: 250, y: 350 } },
        { id: '5', data: { label: 'Playlist Output' }, position: { x: 250, y: 450 }, type: 'output' },
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2', animated: true },
        { id: 'e2-3', source: '2', target: '3' },
        { id: 'e3-4', source: '3', target: '4' },
        { id: 'e4-5', source: '4', target: '5' },
      ],
    },
    chatHistory: [
      { role: 'assistant', content: "Mood Music Generator is super innovative! 🎵" },
      { role: 'assistant', content: "Privacy is crucial here. How will you handle camera data?" },
    ],
  },
];

export const mockAIModes = {
  mentor: {
    name: '🎓 Mentor',
    responses: [
      "That's a great point! Let's think about your target users.",
      "Have you validated this with potential customers?",
      "Consider starting with an MVP to test the concept.",
      "What's the biggest challenge you foresee?",
    ],
  },
  developer: {
    name: '💻 Developer',
    responses: [
      "From a technical standpoint, you could use React + Node.js.",
      "I'd suggest using PostgreSQL for data persistence.",
      "Have you thought about API rate limiting?",
      "Docker would help with deployment consistency.",
    ],
  },
  investor: {
    name: '💰 Investor',
    responses: [
      "What's your monetization strategy?",
      "How big is the total addressable market?",
      "What's your customer acquisition cost?",
      "Tell me about your competitive advantage.",
    ],
  },
};

export const generateMockResponse = (mode, userMessage) => {
  const modeResponses = mockAIModes[mode].responses;
  return modeResponses[Math.floor(Math.random() * modeResponses.length)];
};

// Mock Prototype Data for IdeaSpace Simulation Grid
// Each idea expands into a series of prototype panels

export const mockPrototypes = {
  '1': [ // AI Fitness Coach
    {
      id: 'p1-1',
      stage: 1,
      title: 'Concept',
      type: 'overview',
      content: 'AI Fitness Coach uses computer vision to analyze workout form in real-time, providing instant feedback and personalized training plans.',
      elements: ['💡 Real-time pose detection', '🎯 Personalized routines', '📊 Progress tracking'],
      author: { name: 'Jess', avatar: '👩‍💻', comment: 'Love the AI integration!' }
    },
    {
      id: 'p1-2',
      stage: 2,
      title: 'UX Mock',
      type: 'ui',
      content: 'Mobile-first interface with camera view and live skeleton overlay',
      elements: ['📱 Camera Feed', '🦴 Pose Skeleton', '✅ Form Feedback', '📈 Rep Counter'],
      mockScreens: ['Home Dashboard', 'Live Workout', 'Progress Charts'],
      author: { name: 'Rad', avatar: '🎨', comment: 'Clean and intuitive!' }
    },
    {
      id: 'p1-3',
      stage: 3,
      title: 'AI Logic',
      type: 'flow',
      content: 'Computer Vision → Pose Estimation → Form Analysis → Feedback Generation',
      flowSteps: [
        'Camera Input',
        'MediaPipe Pose Detection',
        'Angle Calculation',
        'Form Validation',
        'Audio/Visual Feedback'
      ],
      author: { name: 'Alex', avatar: '🤖', comment: 'TensorFlow.js would work great here' }
    },
    {
      id: 'p1-4',
      stage: 4,
      title: 'Output',
      type: 'output',
      content: 'Real-time metrics and historical performance data',
      elements: ['✅ 95% form accuracy', '💪 250 reps today', '🔥 7-day streak', '📊 3% improvement'],
      author: { name: 'Sam', avatar: '📊', comment: 'Data visualization looks solid' }
    },
    {
      id: 'p1-5',
      stage: 5,
      title: 'Market Impact',
      type: 'impact',
      content: 'Target market: Fitness enthusiasts, home workout users, personal trainers',
      elements: ['🎯 10M+ potential users', '💰 Freemium model', '🤝 Gym partnerships', '📱 iOS + Android'],
      author: { name: 'Maya', avatar: '💼', comment: 'Strong product-market fit' }
    }
  ],
  '2': [ // Recipe Generator
    {
      id: 'p2-1',
      stage: 1,
      title: 'Concept',
      type: 'overview',
      content: 'AI-powered recipe generator that creates personalized meals based on available ingredients and dietary preferences.',
      elements: ['🥗 Ingredient recognition', '🧠 Smart recipe matching', '🍽️ Step-by-step cooking'],
      author: { name: 'Jess', avatar: '👩‍💻', comment: 'Perfect for reducing food waste!' }
    },
    {
      id: 'p2-2',
      stage: 2,
      title: 'UX Mock',
      type: 'ui',
      content: 'Camera-based ingredient scanner with recipe suggestions',
      elements: ['📸 Scan Ingredients', '🔍 Recipe Search', '📝 Shopping List', '⏱️ Cook Timer'],
      mockScreens: ['Ingredient Scan', 'Recipe Cards', 'Cooking Mode'],
      author: { name: 'Rad', avatar: '🎨', comment: 'Love the swipe-to-save feature' }
    },
    {
      id: 'p2-3',
      stage: 3,
      title: 'AI Logic',
      type: 'flow',
      content: 'Image Recognition → Ingredient DB → Recipe Algorithm → Nutritional Analysis',
      flowSteps: [
        'Camera Input',
        'Computer Vision (YOLO)',
        'Ingredient Matching',
        'Recipe Generation',
        'Nutrition Calculation'
      ],
      author: { name: 'Alex', avatar: '🤖', comment: 'Spoonacular API integration?' }
    },
    {
      id: 'p2-4',
      stage: 4,
      title: 'Output',
      type: 'output',
      content: 'Personalized recipe with nutrition facts and cooking instructions',
      elements: ['✅ 5 recipes found', '⏱️ 25-30 min prep', '🔥 420 calories', '⭐ 4.8 rating'],
      author: { name: 'Sam', avatar: '📊', comment: 'Nutritional insights are key' }
    },
    {
      id: 'p2-5',
      stage: 5,
      title: 'Market Impact',
      type: 'impact',
      content: 'Target: Home cooks, meal planners, sustainability-focused users',
      elements: ['🎯 50M+ potential users', '💰 Ad-supported + Premium', '🛒 Grocery integrations', '🌍 Reduce food waste'],
      author: { name: 'Maya', avatar: '💼', comment: 'Huge sustainability angle' }
    }
  ],
  '3': [ // Smart Plant Care
    {
      id: 'p3-1',
      stage: 1,
      title: 'Concept',
      type: 'overview',
      content: 'IoT-powered plant monitoring system that tracks soil moisture, light levels, and provides care reminders.',
      elements: ['🌱 Soil sensors', '💡 Light tracking', '💧 Auto-watering alerts'],
      author: { name: 'Jess', avatar: '👩‍💻', comment: 'My plants need this!' }
    },
    {
      id: 'p3-2',
      stage: 2,
      title: 'UX Mock',
      type: 'ui',
      content: 'Dashboard with plant health status and care schedule',
      elements: ['🌿 Plant Gallery', '📊 Health Dashboard', '⏰ Care Reminders', '📚 Plant Wiki'],
      mockScreens: ['My Plants', 'Plant Detail', 'Care Calendar'],
      author: { name: 'Rad', avatar: '🎨', comment: 'Beautiful plant cards!' }
    },
    {
      id: 'p3-3',
      stage: 3,
      title: 'AI Logic',
      type: 'flow',
      content: 'Sensor Data → ML Analysis → Care Recommendations → Push Notifications',
      flowSteps: [
        'IoT Sensors (ESP32)',
        'Data Collection',
        'ML Pattern Recognition',
        'Care Algorithm',
        'Notification Service'
      ],
      author: { name: 'Alex', avatar: '🤖', comment: 'Arduino-based sensors?' }
    },
    {
      id: 'p3-4',
      stage: 4,
      title: 'Output',
      type: 'output',
      content: 'Real-time plant health metrics and actionable insights',
      elements: ['✅ Soil: Perfect', '☀️ Light: Low (move to window)', '💧 Water in 2 days', '🌡️ Temp: 22°C'],
      author: { name: 'Sam', avatar: '📊', comment: 'Historical trends would be great' }
    },
    {
      id: 'p3-5',
      stage: 5,
      title: 'Market Impact',
      type: 'impact',
      content: 'Target: Urban gardeners, plant enthusiasts, smart home users',
      elements: ['🎯 20M+ potential users', '💰 Hardware + App bundle', '🏠 Smart home integration', '🌱 Sustainability focus'],
      author: { name: 'Maya', avatar: '💼', comment: 'Hardware play is interesting' }
    }
  ]
};

// Default prototype for ideas without specific data
export const getDefaultPrototype = (idea) => [
  {
    id: `p${idea.id}-1`,
    stage: 1,
    title: 'Concept',
    type: 'overview',
    content: idea.description,
    elements: ['💡 Core idea', '🎯 Target users', '📊 Key features'],
    author: { name: 'Jess', avatar: '👩‍💻', comment: 'Interesting concept!' }
  },
  {
    id: `p${idea.id}-2`,
    stage: 2,
    title: 'UX Mock',
    type: 'ui',
    content: 'User interface and interaction design',
    elements: ['📱 Main Screen', '🎨 Design System', '🔄 User Flow', '✨ Interactions'],
    mockScreens: ['Home', 'Details', 'Settings'],
    author: { name: 'Rad', avatar: '🎨', comment: 'Clean design direction' }
  },
  {
    id: `p${idea.id}-3`,
    stage: 3,
    title: 'AI Logic',
    type: 'flow',
    content: 'Technical architecture and data flow',
    flowSteps: ['Input', 'Processing', 'AI Analysis', 'Output', 'Feedback'],
    author: { name: 'Alex', avatar: '🤖', comment: 'Solid architecture' }
  },
  {
    id: `p${idea.id}-4`,
    stage: 4,
    title: 'Output',
    type: 'output',
    content: 'Expected results and metrics',
    elements: ['✅ Success metrics', '📊 KPIs', '🔥 Performance', '⭐ User satisfaction'],
    author: { name: 'Sam', avatar: '📊', comment: 'Measurable outcomes' }
  },
  {
    id: `p${idea.id}-5`,
    stage: 5,
    title: 'Market Impact',
    type: 'impact',
    content: 'Business model and market opportunity',
    elements: ['🎯 Target market', '💰 Revenue model', '🤝 Partnerships', '📈 Growth potential'],
    author: { name: 'Maya', avatar: '💼', comment: 'Strong market potential' }
  }
];

// AI Assistant contextual prompts based on panel type
export const aiAssistantPrompts = {
  overview: [
    '💡 Define problem statement',
    '🎯 Identify target users',
    '✨ Add unique value proposition',
    '📊 Include market research'
  ],
  ui: [
    '📱 Generate wireframe layout',
    '🎨 Create design system',
    '🔄 Map user journey',
    '✅ Add interaction states'
  ],
  flow: [
    '🧠 Design data pipeline',
    '⚡ Optimize algorithm',
    '🔗 Add API integrations',
    '🔒 Include security layer'
  ],
  output: [
    '📊 Define success metrics',
    '📈 Add analytics dashboard',
    '🎯 Set performance goals',
    '📉 Include edge cases'
  ],
  impact: [
    '💰 Define revenue model',
    '🎯 Analyze competition',
    '📊 Estimate market size',
    '🚀 Plan go-to-market strategy'
  ]
};

// Get prototype data for a specific idea
export const getPrototypeData = (ideaId) => {
  return mockPrototypes[ideaId] || null;
};

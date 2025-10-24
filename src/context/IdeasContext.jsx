import React, { createContext, useContext, useState } from 'react';

const IdeasContext = createContext();

export const useIdeas = () => {
  const context = useContext(IdeasContext);
  if (!context) {
    throw new Error('useIdeas must be used within an IdeasProvider');
  }
  return context;
};

export const IdeasProvider = ({ children }) => {
  const [ideas, setIdeas] = useState([
    {
      id: 1,
      title: 'AI Fitness Coach',
      description: 'Personalized workout plans powered by machine learning',
      color: 'yellow',
      feasibility: 85,
      impact: 78,
      originality: 82,
      likes: 234,
      comments: 45,
      author: 'Sarah Chen',
      avatar: '👩‍💻',
      createdAt: '2 days ago'
    },
    {
      id: 2,
      title: 'Recipe Generator',
      description: 'Turn leftover ingredients into delicious meals',
      color: 'pink',
      feasibility: 72,
      impact: 80,
      originality: 78,
      likes: 189,
      comments: 32,
      author: 'Mike Johnson',
      avatar: '👨‍🍳',
      createdAt: '5 days ago'
    },
    {
      id: 3,
      title: 'Skill Exchange Platform',
      description: 'Learn new skills by teaching what you know',
      color: 'mint',
      feasibility: 68,
      impact: 75,
      originality: 80,
      likes: 312,
      comments: 67,
      author: 'Lisa Park',
      avatar: '👩‍🎨',
      createdAt: '1 week ago'
    },
    {
      id: 4,
      title: 'Smart Plant Care',
      description: 'IoT sensors that tell you when to water your plants',
      color: 'lavender',
      feasibility: 90,
      impact: 65,
      originality: 70,
      likes: 156,
      comments: 28,
      author: 'Alex Rivera',
      avatar: '🌱',
      createdAt: '3 days ago'
    },
    {
      id: 5,
      title: 'Local Time Capsule',
      description: 'Bury digital memories in AR locations',
      color: 'teal',
      feasibility: 60,
      impact: 88,
      originality: 95,
      likes: 421,
      comments: 89,
      author: 'Jordan Lee',
      avatar: '🗺️',
      createdAt: '4 days ago'
    },
    {
      id: 6,
      title: 'Mood-Based Music',
      description: 'AI DJ that reads your emotions through camera',
      color: 'pink',
      feasibility: 75,
      impact: 82,
      originality: 88,
      likes: 267,
      comments: 54,
      author: 'Emma Davis',
      avatar: '🎵',
      createdAt: '6 days ago'
    }
  ]);

  const [selectedIdea, setSelectedIdea] = useState(null);

  const addIdea = (idea) => {
    const colors = ['yellow', 'pink', 'mint', 'lavender', 'teal'];
    const newIdea = {
      id: Date.now(),
      ...idea,
      color: colors[Math.floor(Math.random() * colors.length)],
      feasibility: Math.floor(Math.random() * 30) + 70,
      impact: Math.floor(Math.random() * 30) + 70,
      originality: Math.floor(Math.random() * 30) + 70,
      likes: 0,
      comments: 0,
      author: 'You',
      avatar: '✨',
      createdAt: 'Just now'
    };
    setIdeas([...ideas, newIdea]);
  };

  const deleteIdea = (id) => {
    setIdeas(ideas.filter(idea => idea.id !== id));
  };

  const updateIdea = (id, updates) => {
    setIdeas(ideas.map(idea => idea.id === id ? { ...idea, ...updates } : idea));
  };

  const toggleLike = (id) => {
    setIdeas(ideas.map(idea => 
      idea.id === id ? { ...idea, likes: idea.likes + 1 } : idea
    ));
  };

  return (
    <IdeasContext.Provider value={{
      ideas,
      setIdeas,
      selectedIdea,
      setSelectedIdea,
      addIdea,
      deleteIdea,
      updateIdea,
      toggleLike
    }}>
      {children}
    </IdeasContext.Provider>
  );
};

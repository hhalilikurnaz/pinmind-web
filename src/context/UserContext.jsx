import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [language, setLanguage] = useState('tr');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('pinmind_user');
    const storedLang = localStorage.getItem('pinmind_language');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    
    if (storedLang) {
      setLanguage(storedLang);
    }
  }, []);

  const login = (userData) => {
    const mockUser = {
      id: Date.now(),
      name: userData.name || userData.email.split('@')[0],
      email: userData.email,
      avatar: userData.avatar || '👤',
      badges: [],
      stats: {
        totalIdeas: 0,
        totalLikes: 0,
        aiInteractions: 0
      },
      joinedDate: new Date().toISOString()
    };
    
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('pinmind_user', JSON.stringify(mockUser));
  };

  const register = (userData) => {
    const newUser = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      avatar: userData.avatar || '👤',
      badges: ['Yeni Üye 🌱'],
      stats: {
        totalIdeas: 0,
        totalLikes: 0,
        aiInteractions: 0
      },
      joinedDate: new Date().toISOString()
    };
    
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('pinmind_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('pinmind_user');
  };

  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('pinmind_user', JSON.stringify(updatedUser));
  };

  const toggleLanguage = () => {
    const newLang = language === 'tr' ? 'en' : 'tr';
    setLanguage(newLang);
    localStorage.setItem('pinmind_language', newLang);
  };

  const addBadge = (badgeName) => {
    if (user && !user.badges.includes(badgeName)) {
      const updatedUser = {
        ...user,
        badges: [...user.badges, badgeName]
      };
      setUser(updatedUser);
      localStorage.setItem('pinmind_user', JSON.stringify(updatedUser));
    }
  };

  const incrementStat = (statName) => {
    if (user) {
      const updatedUser = {
        ...user,
        stats: {
          ...user.stats,
          [statName]: user.stats[statName] + 1
        }
      };
      setUser(updatedUser);
      localStorage.setItem('pinmind_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        language,
        isAuthenticated,
        login,
        register,
        logout,
        updateProfile,
        toggleLanguage,
        addBadge,
        incrementStat
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};

export default UserContext;

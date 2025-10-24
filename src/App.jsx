import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { UserProvider } from './context/UserContext';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { AudioProvider } from './context/AudioContext';
import { CinematicProvider } from './context/CinematicContext';
import Header from './components/Header';

// Pages
import TestPage from './pages/TestPage';
import Splash from './pages/Splash';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import MainBoard from './pages/MainBoard';
import IdeaSpace from './pages/IdeaSpace';
import CommunityFeed from './pages/CommunityFeed';

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <CinematicProvider>
          <AudioProvider>
            <UserProvider>
              <Router>
              {/* <Header /> */}
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/test" element={<TestPage />} />
                  <Route path="/splash" element={<Splash />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/board" element={<MainBoard />} />
                  <Route path="/idea/:id" element={<IdeaSpace />} />
                  <Route path="/community" element={<CommunityFeed />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </AnimatePresence>
              </Router>
            </UserProvider>
          </AudioProvider>
        </CinematicProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;

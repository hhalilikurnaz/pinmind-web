import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import AvatarUploader from '../components/AvatarUploader';
import tr from '../i18n/tr.json';
import en from '../i18n/en.json';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useUser();
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const t = lang === 'tr' ? tr : en;
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    avatar: '👤'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    register(formData);
    navigate('/board');
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden flex items-center justify-center px-6 py-12
                 dark:bg-gradient-to-br dark:from-[#0D0D0D] dark:to-[#1C1C1C]
                 light:bg-gradient-to-br light:from-[#FAFAFA] light:to-[#EAEAEA]"
    >
      {/* Vignette */}
      <div 
        className="fixed inset-0 pointer-events-none
                   dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]
                   light:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.2)_100%)]"
      />

      {/* Back button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 0.8, x: 0 }}
        transition={{ delay: 0.2 }}
        whileHover={{ opacity: 1, x: -5 }}
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 dark:text-[#EAEAEA] light:text-gray-700"
        style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem' }}
      >
        ← {t.back}
      </motion.button>

      {/* Register form */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md"
      >
        <div 
          className="rounded-2xl p-8 shadow-lg border
                     dark:bg-white/5 dark:border-white/10
                     light:bg-white/80 light:border-gray-300"
          style={{ backdropFilter: 'blur(20px)' }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-8"
          >
            <h1 
              className="text-4xl font-bold mb-2 dark:text-[#EAEAEA] light:text-gray-900"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              {lang === 'tr' ? 'PinMind\'e Katıl' : 'Join PinMind'}
            </h1>
            <p className="text-lg dark:text-gray-400 light:text-gray-600"
               style={{ fontFamily: 'Caveat, cursive' }}>
              {t.joinMessage}
            </p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Avatar Selection */}
            <div className="flex justify-center mb-6">
              <AvatarUploader
                selectedAvatar={formData.avatar}
                onSelect={(avatar) => setFormData({...formData, avatar})}
              />
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-300 light:text-gray-700">
                {t.name}
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border transition-all duration-200
                          dark:bg-white/5 dark:border-white/10 dark:text-white
                          light:bg-white light:border-gray-300 light:text-gray-900
                          focus:outline-none focus:ring-2 focus:ring-green-400/50 
                          focus:border-green-400"
                placeholder={lang === 'tr' ? 'Adınız' : 'Your Name'}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-300 light:text-gray-700">
                {t.email}
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border transition-all duration-200
                          dark:bg-white/5 dark:border-white/10 dark:text-white
                          light:bg-white light:border-gray-300 light:text-gray-900
                          focus:outline-none focus:ring-2 focus:ring-green-400/50 
                          focus:border-green-400"
                placeholder={lang === 'tr' ? 'ornek@email.com' : 'example@email.com'}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-300 light:text-gray-700">
                {t.password}
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border transition-all duration-200
                          dark:bg-white/5 dark:border-white/10 dark:text-white
                          light:bg-white light:border-gray-300 light:text-gray-900
                          focus:outline-none focus:ring-2 focus:ring-green-400/50 
                          focus:border-green-400"
                placeholder="••••••••"
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-xl font-semibold text-white transition-all duration-300
                        bg-gradient-to-r from-green-500 to-emerald-600
                        hover:from-green-400 hover:to-emerald-500 
                        hover:shadow-[0_0_30px_rgba(160,232,175,0.4)]"
            >
              {t.registerButton}
            </motion.button>
          </form>

          {/* Login link */}
          <p className="text-center mt-6 text-sm dark:text-gray-400 light:text-gray-600">
            {t.alreadyHaveAccount}{' '}
            <Link 
              to="/login" 
              className="text-green-400 hover:text-green-300 transition-colors duration-200 font-medium"
            >
              {t.login}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;

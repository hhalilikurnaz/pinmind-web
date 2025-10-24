import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import tr from '../i18n/tr.json';
import en from '../i18n/en.json';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const t = lang === 'tr' ? tr : en;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen pt-24 px-6 pb-12">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl p-8 mb-6 border backdrop-blur-lg
                     dark:bg-white/5 dark:border-white/10
                     light:bg-white/80 light:border-gray-300 shadow-xl"
        >
          <div className="flex items-center gap-6 mb-6">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 
                         flex items-center justify-center text-5xl border-4 border-green-400/50 shadow-lg"
            >
              {user.avatar}
            </motion.div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2 dark:text-white light:text-gray-900">
                {user.name}
              </h1>
              <p className="dark:text-gray-400 light:text-gray-600 text-lg">
                {user.email}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="px-6 py-3 rounded-xl font-semibold transition-all duration-300
                         dark:bg-red-500/20 dark:text-red-400 dark:border-red-500/50
                         light:bg-red-50 light:text-red-600 light:border-red-300
                         border-2 hover:shadow-lg"
            >
              {t.logout}
            </motion.button>
          </div>
          {user.badges && user.badges.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3 dark:text-gray-300 light:text-gray-700">
                {t.badges}
              </h3>
              <div className="flex flex-wrap gap-3">
                {user.badges.map((badge, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    className="px-4 py-2 rounded-full text-sm font-medium
                               dark:bg-green-500/20 dark:text-green-400 dark:border-green-500/50
                               light:bg-green-50 light:text-green-700 light:border-green-300 border-2"
                  >
                    {badge}
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="rounded-2xl p-6 border backdrop-blur-lg
                         dark:bg-white/5 dark:border-white/10
                         light:bg-white/80 light:border-gray-300 shadow-lg">
            <div className="text-4xl mb-2">💡</div>
            <h3 className="text-3xl font-bold mb-1 dark:text-white light:text-gray-900">
              {user.stats?.totalIdeas || 0}
            </h3>
            <p className="dark:text-gray-400 light:text-gray-600">{t.totalIdeas}</p>
          </div>
          <div className="rounded-2xl p-6 border backdrop-blur-lg
                         dark:bg-white/5 dark:border-white/10
                         light:bg-white/80 light:border-gray-300 shadow-lg">
            <div className="text-4xl mb-2">❤️</div>
            <h3 className="text-3xl font-bold mb-1 dark:text-white light:text-gray-900">
              {user.stats?.totalLikes || 0}
            </h3>
            <p className="dark:text-gray-400 light:text-gray-600">{t.totalLikes}</p>
          </div>
          <div className="rounded-2xl p-6 border backdrop-blur-lg
                         dark:bg-white/5 dark:border-white/10
                         light:bg-white/80 light:border-gray-300 shadow-lg">
            <div className="text-4xl mb-2">🤖</div>
            <h3 className="text-3xl font-bold mb-1 dark:text-white light:text-gray-900">
              {user.stats?.aiInteractions || 0}
            </h3>
            <p className="dark:text-gray-400 light:text-gray-600">{t.aiInteractions}</p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-8 rounded-2xl p-8 border backdrop-blur-lg text-center
                     dark:bg-white/5 dark:border-white/10
                     light:bg-white/80 light:border-gray-300 shadow-lg"
        >
          <div className="text-6xl mb-4">🚀</div>
          <p className="text-xl dark:text-gray-300 light:text-gray-700" 
             style={{ fontFamily: 'Caveat, cursive' }}>
            {t.profileDetails}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;

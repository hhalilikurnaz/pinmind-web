import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { useUser } from "../context/UserContext";
import tr from "../i18n/tr.json";
import en from "../i18n/en.json";

export default function Header() {
  const { lang, changeLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated } = useUser();
  const location = useLocation();
  const t = lang === "tr" ? tr : en;

  // Don't show header on splash, login, register pages
  const hideHeader = ["/", "/login", "/register"].includes(location.pathname);
  if (hideHeader) return null;

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4 
                 bg-opacity-80 backdrop-blur-lg border-b border-gray-700 dark:border-gray-700 
                 light:border-gray-300 dark:bg-gray-900/80 light:bg-white/80"
    >
      {/* Logo */}
      <Link to="/board">
        <h1 className="font-caveat text-3xl text-green-400 dark:text-green-400 light:text-green-600 
                       hover:scale-105 transition-transform duration-200">
          PinMind
        </h1>
      </Link>

      {/* Navigation */}
      {isAuthenticated && (
        <nav className="flex gap-6 text-base font-medium">
          <Link
            to="/board"
            className={`transition-all duration-200 hover:text-green-400 dark:hover:text-green-400 
                       light:hover:text-green-600 ${
              location.pathname === "/board"
                ? "text-green-400 dark:text-green-400 light:text-green-600 border-b-2 border-green-400"
                : "text-gray-300 dark:text-gray-300 light:text-gray-700"
            }`}
          >
            {t.boardTitle}
          </Link>
          <Link
            to="/community"
            className={`transition-all duration-200 hover:text-green-400 dark:hover:text-green-400 
                       light:hover:text-green-600 ${
              location.pathname === "/community"
                ? "text-green-400 dark:text-green-400 light:text-green-600 border-b-2 border-green-400"
                : "text-gray-300 dark:text-gray-300 light:text-gray-700"
            }`}
          >
            {t.community}
          </Link>
          <Link
            to="/profile"
            className={`transition-all duration-200 hover:text-green-400 dark:hover:text-green-400 
                       light:hover:text-green-600 ${
              location.pathname === "/profile"
                ? "text-green-400 dark:text-green-400 light:text-green-600 border-b-2 border-green-400"
                : "text-gray-300 dark:text-gray-300 light:text-gray-700"
            }`}
          >
            {t.profile}
          </Link>
        </nav>
      )}

      {/* Right Side: Language + Theme Toggle + Avatar */}
      <div className="flex gap-4 items-center">
        {/* Language Selector */}
        <select
          onChange={(e) => changeLang(e.target.value)}
          value={lang}
          className="bg-transparent border border-gray-600 dark:border-gray-600 light:border-gray-400 
                     rounded-lg text-sm px-3 py-2 cursor-pointer transition-all duration-200
                     dark:text-gray-300 light:text-gray-700 hover:border-green-400 focus:outline-none 
                     focus:ring-2 focus:ring-green-400/50"
        >
          <option value="tr">🇹🇷 TR</option>
          <option value="en">🇬🇧 EN</option>
        </select>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="text-2xl hover:scale-110 transition-transform duration-200 
                     hover:rotate-12 focus:outline-none"
          title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {theme === "dark" ? "🌙" : "☀️"}
        </button>

        {/* User Avatar (if authenticated) */}
        {isAuthenticated && user && (
          <Link to="/profile">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 
                         flex items-center justify-center text-2xl border-2 border-green-400/50 
                         shadow-lg cursor-pointer"
            >
              {user.avatar || "👤"}
            </motion.div>
          </Link>
        )}
      </div>
    </motion.header>
  );
}

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const leaderboardData = {
  weekly: [
    { rank: 1, name: 'Emma Watson', avatar: '👩‍💻', score: 2847, ideas: 23, badge: '🥇' },
    { rank: 2, name: 'James Lee', avatar: '👨‍🎨', score: 2691, ideas: 19, badge: '🥈' },
    { rank: 3, name: 'Sofia Garcia', avatar: '👩‍🔬', score: 2534, ideas: 21, badge: '🥉' },
    { rank: 4, name: 'Alex Chen', avatar: '👨‍💼', score: 2398, ideas: 18, badge: '' },
    { rank: 5, name: 'Maria Rodriguez', avatar: '👩‍🎨', score: 2287, ideas: 16, badge: '' },
    { rank: 6, name: 'David Kim', avatar: '👨‍💻', score: 2156, ideas: 15, badge: '' },
    { rank: 7, name: 'Lisa Park', avatar: '👩‍🚀', score: 2043, ideas: 14, badge: '' },
    { rank: 8, name: 'Tom Wilson', avatar: '👨‍🔧', score: 1987, ideas: 13, badge: '' },
  ],
  allTime: [
    { rank: 1, name: 'Sarah Chen', avatar: '🧙‍♀️', score: 15847, ideas: 156, badge: '🥇' },
    { rank: 2, name: 'Mike Johnson', avatar: '🦸‍♂️', score: 14291, ideas: 142, badge: '🥈' },
    { rank: 3, name: 'Emma Davis', avatar: '👸', score: 13734, ideas: 138, badge: '🥉' },
    { rank: 4, name: 'Alex Rivera', avatar: '🧑‍🚀', score: 12998, ideas: 129, badge: '' },
    { rank: 5, name: 'Jordan Lee', avatar: '👨‍🎤', score: 12287, ideas: 121, badge: '' },
    { rank: 6, name: 'Taylor Swift', avatar: '🎵', score: 11856, ideas: 115, badge: '' },
    { rank: 7, name: 'Chris Evans', avatar: '🛡️', score: 11243, ideas: 108, badge: '' },
    { rank: 8, name: 'Zoe Martinez', avatar: '🌟', score: 10987, ideas: 102, badge: '' },
  ]
};

const TopThree = ({ leaders }) => {
  const podiumHeights = ['h-32', 'h-40', 'h-28'];
  const podiumColors = ['bg-gradient-to-t from-gray-400 to-gray-300', 'bg-gradient-to-t from-yellow-500 to-yellow-400', 'bg-gradient-to-t from-orange-600 to-orange-500'];
  const order = [leaders[1], leaders[0], leaders[2]]; // 2nd, 1st, 3rd

  return (
    <div className="flex items-end justify-center gap-6 mb-12">
      {order.map((leader, index) => {
        const actualIndex = index === 0 ? 1 : index === 1 ? 0 : 2;
        return (
          <motion.div
            key={leader.rank}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: actualIndex * 0.2 }}
            className="flex flex-col items-center"
          >
            {/* Avatar */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className={`w-24 h-24 rounded-full ${
                leader.rank === 1 ? 'bg-yellow-400' : 
                leader.rank === 2 ? 'bg-gray-300' : 
                'bg-orange-500'
              } chalk-border flex items-center justify-center text-4xl mb-4 relative`}
            >
              {leader.avatar}
              <span className="absolute -top-2 -right-2 text-3xl">
                {leader.badge}
              </span>
            </motion.div>

            {/* Name and Score */}
            <p className="font-title text-lg chalk-text mb-2 text-center">{leader.name}</p>
            <p className="font-body font-bold text-2xl text-white mb-3">{leader.score}</p>

            {/* Podium */}
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              transition={{ delay: actualIndex * 0.2 + 0.3 }}
              className={`w-32 ${podiumHeights[actualIndex]} ${podiumColors[actualIndex]} rounded-t-xl chalk-border flex items-center justify-center`}
            >
              <span className="text-white font-bold text-3xl">#{leader.rank}</span>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

const LeaderRow = ({ leader, index }) => {
  const isTopThree = leader.rank <= 3;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ x: 10, scale: 1.02 }}
      className={`flex items-center gap-4 p-4 rounded-xl mb-3 transition-all ${
        isTopThree 
          ? 'bg-gradient-to-r from-yellow-500/20 to-transparent chalk-border' 
          : 'bg-white/5 hover:bg-white/10'
      }`}
    >
      {/* Rank */}
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 font-bold text-xl chalk-text">
        {leader.badge || `#${leader.rank}`}
      </div>

      {/* Avatar */}
      <div className="w-12 h-12 rounded-full bg-white/10 chalk-border flex items-center justify-center text-2xl">
        {leader.avatar}
      </div>

      {/* Info */}
      <div className="flex-1">
        <p className="font-body font-semibold text-white">{leader.name}</p>
        <p className="text-sm text-white/60">{leader.ideas} ideas pinned</p>
      </div>

      {/* Score */}
      <div className="text-right">
        <p className="font-bold text-2xl text-white chalk-text">{leader.score}</p>
        <p className="text-xs text-white/60">points</p>
      </div>
    </motion.div>
  );
};

const Leaderboard = () => {
  const [timeframe, setTimeframe] = useState('weekly');
  const currentData = leaderboardData[timeframe];

  return (
    <div className="min-h-screen pt-24 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-title text-center mb-8 chalk-text"
        >
          Leaderboard
        </motion.h1>

        {/* Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-xl chalk-border bg-white/5 p-1">
            <motion.button
              onClick={() => setTimeframe('weekly')}
              className={`px-8 py-3 rounded-lg font-body font-semibold transition-all ${
                timeframe === 'weekly'
                  ? 'bg-white text-chalkboard'
                  : 'text-white/70 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              📅 Weekly
            </motion.button>
            <motion.button
              onClick={() => setTimeframe('allTime')}
              className={`px-8 py-3 rounded-lg font-body font-semibold transition-all ${
                timeframe === 'allTime'
                  ? 'bg-white text-chalkboard'
                  : 'text-white/70 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ♾️ All Time
            </motion.button>
          </div>
        </div>

        {/* Top 3 Podium */}
        <TopThree leaders={currentData.slice(0, 3)} />

        {/* Rest of Rankings */}
        <div className="mt-12">
          {currentData.slice(3).map((leader, index) => (
            <LeaderRow key={leader.rank} leader={leader} index={index} />
          ))}
        </div>

        {/* Your Rank Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-6 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 chalk-border"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/10 chalk-border flex items-center justify-center text-3xl">
                ✨
              </div>
              <div>
                <p className="font-body font-semibold text-white text-lg">You</p>
                <p className="text-sm text-white/60">Keep creating!</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-3xl text-white chalk-text">#42</p>
              <p className="text-sm text-white/60">1,234 points</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Leaderboard;

'use client';

import { useState } from 'react';

export default function Leaderboard() {
  const [timeframe, setTimeframe] = useState('weekly');
  const [category, setCategory] = useState('overall');

  const timeframes = [
    { id: 'daily', name: 'Daily' },
    { id: 'weekly', name: 'Weekly' },
    { id: 'monthly', name: 'Monthly' },
    { id: 'all-time', name: 'All Time' }
  ];

  const categories = [
    { id: 'overall', name: 'Overall' },
    { id: 'strength', name: 'Strength' },
    { id: 'cardio', name: 'Cardio' },
    { id: 'consistency', name: 'Consistency' }
  ];

  const leaderboardData = {
    daily: [
      { rank: 1, name: "Sarah M.", score: 450, avatar: "SM", change: "+2", category: "strength" },
      { rank: 2, name: "Mike Chen", score: 420, avatar: "MC", change: "+1", category: "cardio" },
      { rank: 3, name: "Emma L.", score: 380, avatar: "EL", change: "-1", category: "consistency" },
      { rank: 4, name: "David K.", score: 350, avatar: "DK", change: "+3", category: "strength" },
      { rank: 5, name: "Lisa Park", score: 320, avatar: "LP", change: "-2", category: "cardio" },
      { rank: 6, name: "Alex R.", score: 300, avatar: "AR", change: "+1", category: "consistency" },
      { rank: 7, name: "Maria S.", score: 280, avatar: "MS", change: "-1", category: "strength" },
      { rank: 8, name: "John D.", score: 260, avatar: "JD", change: "+2", category: "cardio" },
      { rank: 9, name: "Anna K.", score: 240, avatar: "AK", change: "new", category: "consistency" },
      { rank: 10, name: "Tom W.", score: 220, avatar: "TW", change: "-3", category: "strength" }
    ],
    weekly: [
      { rank: 1, name: "Sarah M.", score: 2850, avatar: "SM", change: "+2", category: "strength" },
      { rank: 2, name: "Mike Chen", score: 2720, avatar: "MC", change: "+1", category: "cardio" },
      { rank: 3, name: "Emma L.", score: 2650, avatar: "EL", change: "-1", category: "consistency" },
      { rank: 4, name: "David K.", score: 2480, avatar: "DK", change: "+3", category: "strength" },
      { rank: 5, name: "Lisa Park", score: 2320, avatar: "LP", change: "-2", category: "cardio" },
      { rank: 6, name: "Alex R.", score: 2100, avatar: "AR", change: "+1", category: "consistency" },
      { rank: 7, name: "Maria S.", score: 1950, avatar: "MS", change: "-1", category: "strength" },
      { rank: 8, name: "John D.", score: 1800, avatar: "JD", change: "+2", category: "cardio" },
      { rank: 9, name: "Anna K.", score: 1650, avatar: "AK", change: "new", category: "consistency" },
      { rank: 10, name: "Tom W.", score: 1500, avatar: "TW", change: "-3", category: "strength" }
    ],
    monthly: [
      { rank: 1, name: "Sarah M.", score: 11200, avatar: "SM", change: "+1", category: "strength" },
      { rank: 2, name: "Mike Chen", score: 10800, avatar: "MC", change: "-1", category: "cardio" },
      { rank: 3, name: "Emma L.", score: 10200, avatar: "EL", change: "+2", category: "consistency" },
      { rank: 4, name: "David K.", score: 9500, avatar: "DK", change: "+1", category: "strength" },
      { rank: 5, name: "Lisa Park", score: 8900, avatar: "LP", change: "-2", category: "cardio" },
      { rank: 6, name: "Alex R.", score: 8200, avatar: "AR", change: "+3", category: "consistency" },
      { rank: 7, name: "Maria S.", score: 7800, avatar: "MS", change: "-1", category: "strength" },
      { rank: 8, name: "John D.", score: 7200, avatar: "JD", change: "+1", category: "cardio" },
      { rank: 9, name: "Anna K.", score: 6800, avatar: "AK", change: "new", category: "consistency" },
      { rank: 10, name: "Tom W.", score: 6400, avatar: "TW", change: "-2", category: "strength" }
    ],
    'all-time': [
      { rank: 1, name: "Sarah M.", score: 45000, avatar: "SM", change: "+1", category: "strength" },
      { rank: 2, name: "Mike Chen", score: 42000, avatar: "MC", change: "-1", category: "cardio" },
      { rank: 3, name: "Emma L.", score: 38000, avatar: "EL", change: "+1", category: "consistency" },
      { rank: 4, name: "David K.", score: 35000, avatar: "DK", change: "+2", category: "strength" },
      { rank: 5, name: "Lisa Park", score: 32000, avatar: "LP", change: "-1", category: "cardio" },
      { rank: 6, name: "Alex R.", score: 29000, avatar: "AR", change: "+1", category: "consistency" },
      { rank: 7, name: "Maria S.", score: 26000, avatar: "MS", change: "-2", category: "strength" },
      { rank: 8, name: "John D.", score: 23000, avatar: "JD", change: "+1", category: "cardio" },
      { rank: 9, name: "Anna K.", score: 20000, avatar: "AK", change: "new", category: "consistency" },
      { rank: 10, name: "Tom W.", score: 18000, avatar: "TW", change: "-1", category: "strength" }
    ]
  };

  const currentData = leaderboardData[timeframe];
  const filteredData = category === 'overall' 
    ? currentData 
    : currentData.filter(user => user.category === category);

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  const getChangeColor = (change) => {
    if (change === 'new') return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200';
    if (change.startsWith('+')) return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200';
    if (change.startsWith('-')) return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200';
    return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-poppins">
            Leaderboard
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            See how you stack up against the community and track your progress
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Timeframe Filter */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">Timeframe:</span>
              {timeframes.map((tf) => (
                <button
                  key={tf.id}
                  onClick={() => setTimeframe(tf.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    timeframe === tf.id
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-gray-600'
                  }`}
                >
                  {tf.name}
                </button>
              ))}
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">Category:</span>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    category === cat.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-600'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-green-500 to-blue-500 text-white">
            <h3 className="text-2xl font-bold text-center">
              {timeframes.find(tf => tf.id === timeframe)?.name} Leaderboard
              {category !== 'overall' && ` - ${categories.find(cat => cat.id === category)?.name}`}
            </h3>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredData.map((user, index) => (
              <div key={index} className={`p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                user.rank <= 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900 dark:to-orange-900' : ''
              }`}>
                <div className="flex items-center space-x-4">
                  {/* Rank */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                    user.rank === 1 ? 'bg-yellow-500' :
                    user.rank === 2 ? 'bg-gray-400' :
                    user.rank === 3 ? 'bg-orange-500' :
                    'bg-blue-500'
                  }`}>
                    {getRankIcon(user.rank)}
                  </div>

                  {/* Avatar */}
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    {user.avatar}
                  </div>

                  {/* User Info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{user.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getChangeColor(user.change)}`}>
                        {user.change}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 capitalize">{user.category}</p>
                  </div>

                  {/* Score */}
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {user.score.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">points</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Your Position */}
        <div className="mt-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-white">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Your Position</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">#12</div>
                <div className="text-lg opacity-90">Current Rank</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">1,250</div>
                <div className="text-lg opacity-90">Your Points</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">+3</div>
                <div className="text-lg opacity-90">Rank Change</div>
              </div>
            </div>
            <div className="mt-6">
              <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                View Full Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


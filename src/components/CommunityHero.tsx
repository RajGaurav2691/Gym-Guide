'use client';

import { useState } from 'react';

export default function CommunityHero() {
  const [activeTab, setActiveTab] = useState('forum');

  const tabs = [
    { id: 'forum', name: 'Forum', icon: '💬', description: 'Discuss fitness topics', count: 1250 },
    { id: 'challenges', name: 'Challenges', icon: '🏆', description: 'Join fitness challenges', count: 15 },
    { id: 'leaderboard', name: 'Leaderboard', icon: '🥇', description: 'See top performers', count: 500 }
  ];

  const stats = [
    { number: '5,000+', label: 'Active Members', color: 'text-blue-600' },
    { number: '12,500+', label: 'Posts & Comments', color: 'text-green-600' },
    { number: '150+', label: 'Challenges Completed', color: 'text-purple-600' },
    { number: '24/7', label: 'Community Support', color: 'text-orange-600' }
  ];

  const recentActivity = [
    { user: 'Sarah M.', action: 'completed the 30-day push-up challenge', time: '2 hours ago', type: 'challenge' },
    { user: 'Mike Chen', action: 'shared a new workout routine', time: '4 hours ago', type: 'post' },
    { user: 'Emma L.', action: 'reached 1000 posts milestone', time: '6 hours ago', type: 'milestone' },
    { user: 'David K.', action: 'won the weekly squat challenge', time: '1 day ago', type: 'achievement' }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-black text-gray-900 dark:text-white mb-6 font-poppins">
            Community Hub
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Connect with fellow fitness enthusiasts, share your journey, and achieve your goals together
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-3 px-8 py-6 rounded-2xl font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-xl transform scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-lg'
              }`}
            >
              <span className="text-3xl">{tab.icon}</span>
              <div className="text-left">
                <div className="text-lg">{tab.name}</div>
                <div className="text-sm opacity-90">{tab.description}</div>
                <div className="text-xs opacity-75">{tab.count} items</div>
              </div>
            </button>
          ))}
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-lg">
              <div className={`text-4xl font-bold mb-2 ${stat.color}`}>{stat.number}</div>
              <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-12">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Recent Community Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  {activity.user.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 dark:text-white">
                    <span className="font-semibold">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  activity.type === 'challenge' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                  activity.type === 'post' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                  activity.type === 'milestone' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                  'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                }`}>
                  {activity.type}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-lg">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Start Discussion</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Ask questions or share your fitness journey</p>
            <button className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors">
              Create Post
            </button>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-lg">
            <div className="text-4xl mb-4">🏆</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Join Challenge</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Participate in community fitness challenges</p>
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
              Browse Challenges
            </button>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-lg">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Find Workout Buddy</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Connect with members in your area</p>
            <button className="bg-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-600 transition-colors">
              Find Buddy
            </button>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-full text-lg font-bold hover:from-green-600 hover:to-blue-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
            Join Community
          </button>
          <button className="border-2 border-green-500 text-green-600 dark:text-green-400 px-8 py-4 rounded-full text-lg font-bold hover:bg-green-500 hover:text-white transition-all duration-300">
            View Guidelines
          </button>
        </div>
      </div>
    </section>
  );
}


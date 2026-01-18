'use client';

import { useState } from 'react';

export default function DashboardHero() {
  const [user] = useState({
    name: "John Doe",
    avatar: "JD",
    joinDate: "2024-01-15",
    currentStreak: 12,
    totalWorkouts: 156,
    level: 8,
    xp: 2450,
    nextLevelXp: 3000
  });

  const stats = [
    { label: "Current Streak", value: "12 days", icon: "🔥", color: "text-orange-600" },
    { label: "Total Workouts", value: "156", icon: "💪", color: "text-blue-600" },
    { label: "Level", value: "8", icon: "⭐", color: "text-purple-600" },
    { label: "XP", value: "2,450", icon: "⚡", color: "text-green-600" }
  ];

  const recentAchievements = [
    { name: "First Month Complete", icon: "🏆", date: "2 days ago", xp: 100 },
    { name: "100 Push-ups", icon: "💪", date: "1 week ago", xp: 50 },
    { name: "Perfect Week", icon: "⭐", date: "2 weeks ago", xp: 75 }
  ];

  const upcomingGoals = [
    { name: "Complete 200 workouts", progress: 78, target: 200, current: 156 },
    { name: "Reach Level 10", progress: 82, target: 100, current: 82 },
    { name: "30-day streak", progress: 40, target: 30, current: 12 }
  ];

  const xpProgress = (user.xp / user.nextLevelXp) * 100;

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                {user.avatar}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Welcome back, {user.name}!
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Member since {new Date(user.joinDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-purple-600">Level {user.level}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {user.xp.toLocaleString()} / {user.nextLevelXp.toLocaleString()} XP
              </div>
              <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                <div
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${xpProgress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className={`text-2xl font-bold mb-1 ${stat.color}`}>{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Achievements */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="text-2xl mr-2">🏆</span>
              Recent Achievements
            </h3>
            <div className="space-y-4">
              {recentAchievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-2xl">{achievement.icon}</span>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 dark:text-white">{achievement.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">{achievement.date}</div>
                  </div>
                  <div className="text-sm font-semibold text-green-600">+{achievement.xp} XP</div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              View All Achievements
            </button>
          </div>

          {/* Goals Progress */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="text-2xl mr-2">🎯</span>
              Goals Progress
            </h3>
            <div className="space-y-4">
              {upcomingGoals.map((goal, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900 dark:text-white text-sm">{goal.name}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {goal.current}/{goal.target}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
              Set New Goal
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="text-2xl mr-2">⚡</span>
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button className="w-full bg-green-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center space-x-2">
                <span>🏋️</span>
                <span>Start Workout</span>
              </button>
              <button className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2">
                <span>📊</span>
                <span>Log Progress</span>
              </button>
              <button className="w-full bg-purple-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-purple-600 transition-colors flex items-center justify-center space-x-2">
                <span>🍽️</span>
                <span>Log Meal</span>
              </button>
              <button className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2">
                <span>💧</span>
                <span>Log Water</span>
              </button>
            </div>
          </div>
        </div>

        {/* Motivation Quote */}
        <div className="mt-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl p-8 text-white text-center">
          <div className="text-4xl mb-4">💪</div>
          <h3 className="text-2xl font-bold mb-2">Today&apos;s Motivation</h3>
          <p className="text-xl opacity-90 mb-4">
            &quot;The only bad workout is the one that didn&apos;t happen.&quot;
          </p>
          <p className="text-sm opacity-75">- Anonymous</p>
        </div>
      </div>
    </section>
  );
}


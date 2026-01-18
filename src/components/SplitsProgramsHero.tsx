'use client';

import { useState } from 'react';

export default function SplitsProgramsHero() {
  const [activeTab, setActiveTab] = useState('splits');

  const tabs = [
    { id: 'splits', name: 'Training Splits', icon: '💪', description: 'Organize your workouts by muscle groups' },
    { id: 'programs', name: 'Complete Programs', icon: '📋', description: 'Structured programs for specific goals' },
    { id: 'custom', name: 'Custom Builder', icon: '🔧', description: 'Build your own personalized routine' }
  ];

  const quickStats = [
    { number: '15+', label: 'Pre-built Programs', color: 'text-red-600' },
    { number: '8', label: 'Training Splits', color: 'text-orange-600' },
    { number: '500+', label: 'Exercises Available', color: 'text-yellow-600' },
    { number: '95%', label: 'Success Rate', color: 'text-green-600' }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-black text-gray-900 dark:text-white mb-6 font-poppins">
            Splits & Programs
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Choose from proven training splits or build your own custom program tailored to your goals
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-3 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-xl transform scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-lg'
              }`}
            >
              <span className="text-2xl">{tab.icon}</span>
              <div className="text-left">
                <div className="text-lg">{tab.name}</div>
                <div className="text-sm opacity-90">{tab.description}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-lg">
              <div className={`text-4xl font-bold mb-2 ${stat.color}`}>{stat.number}</div>
              <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-full text-lg font-bold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
            Browse Programs
          </button>
          <button className="border-2 border-purple-500 text-purple-600 dark:text-purple-400 px-8 py-4 rounded-full text-lg font-bold hover:bg-purple-500 hover:text-white transition-all duration-300">
            Build Custom Split
          </button>
        </div>
      </div>
    </section>
  );
}


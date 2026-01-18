'use client';

import { useState } from 'react';

export default function InteractiveToolsHero() {
  const [activeTool, setActiveTool] = useState('calculators');

  const toolCategories = [
    { id: 'calculators', name: 'Calculators', icon: '🧮', description: 'BMI, BMR, TDEE, and more', count: 8 },
    { id: 'trackers', name: 'Trackers', icon: '📊', description: 'Water, sleep, and progress tracking', count: 5 },
    { id: 'progress', name: 'Progress Tools', icon: '📈', description: 'Photo comparison and analysis', count: 3 }
  ];

  const quickStats = [
    { number: '15+', label: 'Interactive Tools', color: 'text-blue-600', icon: '🛠️' },
    { number: '50K+', label: 'Calculations Made', color: 'text-green-600', icon: '🧮' },
    { number: '95%', label: 'Accuracy Rate', color: 'text-purple-600', icon: '🎯' },
    { number: '24/7', label: 'Available', color: 'text-orange-600', icon: '⏰' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 dark:text-white mb-4 sm:mb-6 font-poppins">
            Interactive Tools
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6 sm:mb-8">
            Access powerful calculators, trackers, and progress tools to optimize your fitness journey
          </p>
          
          {/* Featured Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-semibold mb-8">
            <span className="mr-2">✨</span>
            <span>AI-Powered Analysis Available</span>
          </div>
        </div>

        {/* Tool Categories */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 mb-12 lg:mb-16">
          {toolCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setActiveTool(category.id);
                scrollToSection(category.id === 'calculators' ? 'calculators' : category.id === 'trackers' ? 'trackers' : 'progress');
              }}
              className={`flex items-center space-x-3 sm:space-x-4 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeTool === category.id
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-xl scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-lg hover:bg-blue-50 dark:hover:bg-gray-700'
              }`}
            >
              <span className="text-2xl sm:text-3xl">{category.icon}</span>
              <div className="text-left">
                <div className="text-sm sm:text-base lg:text-lg">{category.name}</div>
                <div className="text-xs sm:text-sm opacity-90 hidden sm:block">{category.description}</div>
                <div className="text-xs opacity-75">{category.count} tools</div>
              </div>
            </button>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12 lg:mb-16">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="text-2xl sm:text-3xl mb-2">{stat.icon}</div>
              <div className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 ${stat.color}`}>{stat.number}</div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Popular Tools */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg mb-8 sm:mb-12">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center">Most Popular Tools</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="text-center p-4 sm:p-6 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                 onClick={() => scrollToSection('calculators')}>
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">⚖️</div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">BMI Calculator</h4>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Calculate your body mass index instantly</p>
            </div>
            <div className="text-center p-4 sm:p-6 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                 onClick={() => scrollToSection('calculators')}>
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🔥</div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">Calorie Calculator</h4>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Determine your daily calorie needs</p>
            </div>
            <div className="text-center p-4 sm:p-6 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                 onClick={() => scrollToSection('trackers')}>
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">💧</div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">Water Tracker</h4>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Track your daily hydration goals</p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => scrollToSection('calculators')}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-bold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
            Explore All Tools
          </button>
          <button className="border-2 border-blue-500 text-blue-600 dark:text-blue-400 dark:border-blue-400 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-bold hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white transition-all duration-300">
            View Guide
          </button>
        </div>
      </div>
    </section>
  );
}
'use client';

import { useState } from 'react';

export default function KnowledgeHubHero() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Topics', icon: '📚', count: 150 },
    { id: 'nutrition', name: 'Nutrition', icon: '🥗', count: 45 },
    { id: 'training', name: 'Training', icon: '💪', count: 60 },
    { id: 'recovery', name: 'Recovery', icon: '😴', count: 25 },
    { id: 'mindset', name: 'Mindset', icon: '🧠', count: 20 }
  ];

  const quickFacts = [
    { fact: "Muscle protein synthesis peaks 24-48 hours after resistance training", category: "Training" },
    { fact: "Sleep quality affects muscle recovery more than sleep duration", category: "Recovery" },
    { fact: "Protein timing is less important than total daily protein intake", category: "Nutrition" },
    { fact: "Consistency beats perfection in fitness", category: "Mindset" }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-black text-gray-900 dark:text-white mb-6 font-poppins">
            Knowledge Hub
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Expand your fitness knowledge with evidence-based articles, daily quizzes, and myth-busting content
          </p>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-xl transform scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-lg'
              }`}
            >
              <span className="text-2xl">{category.icon}</span>
              <div className="text-left">
                <div className="text-lg">{category.name}</div>
                <div className="text-sm opacity-90">{category.count} articles</div>
              </div>
            </button>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-lg">
            <div className="text-4xl font-bold text-indigo-600 mb-2">150+</div>
            <div className="text-gray-600 dark:text-gray-300">Articles</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-lg">
            <div className="text-4xl font-bold text-purple-600 mb-2">50+</div>
            <div className="text-gray-600 dark:text-gray-300">Myths Busted</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-lg">
            <div className="text-4xl font-bold text-pink-600 mb-2">365</div>
            <div className="text-gray-600 dark:text-gray-300">Daily Quizzes</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-lg">
            <div className="text-4xl font-bold text-green-600 mb-2">95%</div>
            <div className="text-gray-600 dark:text-gray-300">Accuracy Rate</div>
          </div>
        </div>

        {/* Daily Fact */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-8 text-white mb-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">💡 Daily Fitness Fact</h3>
            <p className="text-xl mb-2">{quickFacts[0].fact}</p>
            <span className="text-sm opacity-90">Category: {quickFacts[0].category}</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-4 rounded-full text-lg font-bold hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
            Browse Articles
          </button>
          <button className="border-2 border-indigo-500 text-indigo-600 dark:text-indigo-400 px-8 py-4 rounded-full text-lg font-bold hover:bg-indigo-500 hover:text-white transition-all duration-300">
            Take Daily Quiz
          </button>
        </div>
      </div>
    </section>
  );
}
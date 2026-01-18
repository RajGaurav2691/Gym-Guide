'use client';

import { useState, useEffect } from 'react';

export default function DailyTips() {
  const [currentTip, setCurrentTip] = useState(0);
  const [favoriteTips, setFavoriteTips] = useState(new Set());

  const tips = [
    {
      id: 1,
      title: "Hydration is Key",
      content: "Drink water throughout your workout, not just when you're thirsty. Aim for 7-10 ounces every 10-20 minutes during exercise.",
      category: "Hydration",
      icon: "💧",
      difficulty: "beginner",
      readTime: "1 min"
    },
    {
      id: 2,
      title: "Progressive Overload",
      content: "Gradually increase the weight, reps, or sets in your workouts. This is the key principle for continuous muscle growth and strength gains.",
      category: "Training",
      icon: "💪",
      difficulty: "intermediate",
      readTime: "2 min"
    },
    {
      id: 3,
      title: "Sleep for Recovery",
      content: "Aim for 7-9 hours of quality sleep. This is when your body repairs muscle tissue and releases growth hormone.",
      category: "Recovery",
      icon: "😴",
      difficulty: "beginner",
      readTime: "1 min"
    },
    {
      id: 4,
      title: "Protein Timing",
      content: "Consume 20-30g of protein within 2 hours after your workout to maximize muscle protein synthesis.",
      category: "Nutrition",
      icon: "🥩",
      difficulty: "intermediate",
      readTime: "2 min"
    },
    {
      id: 5,
      title: "Mind-Muscle Connection",
      content: "Focus on the muscle you're working during each rep. This mental focus can increase muscle activation by up to 20%.",
      category: "Training",
      icon: "🧠",
      difficulty: "advanced",
      readTime: "3 min"
    },
    {
      id: 6,
      title: "Warm-up Importance",
      content: "A proper warm-up increases blood flow, improves flexibility, and reduces injury risk. Spend 5-10 minutes warming up before each workout.",
      category: "Safety",
      icon: "🔥",
      difficulty: "beginner",
      readTime: "1 min"
    },
    {
      id: 7,
      title: "Consistency Over Perfection",
      content: "It's better to workout 3 times per week consistently than to have perfect workouts sporadically. Consistency builds habits.",
      category: "Mindset",
      icon: "🎯",
      difficulty: "beginner",
      readTime: "2 min"
    },
    {
      id: 8,
      title: "Breathing Technique",
      content: "Exhale during the exertion phase (lifting) and inhale during the relaxation phase (lowering). This helps maintain proper form.",
      category: "Technique",
      icon: "🫁",
      difficulty: "intermediate",
      readTime: "2 min"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 10000); // Change tip every 10 seconds

    return () => clearInterval(timer);
  }, [tips.length]);

  const toggleFavorite = (tipId) => {
    setFavoriteTips(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(tipId)) {
        newFavorites.delete(tipId);
      } else {
        newFavorites.add(tipId);
      }
      return newFavorites;
    });
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % tips.length);
  };

  const prevTip = () => {
    setCurrentTip((prev) => (prev - 1 + tips.length) % tips.length);
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-poppins">
            Daily Fitness Tips
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Get expert tips and insights to optimize your fitness journey every day
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Tip Display */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <span className="text-4xl">{tips[currentTip].icon}</span>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {tips[currentTip].title}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">
                        {tips[currentTip].category}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(tips[currentTip].difficulty)}`}>
                        {tips[currentTip].difficulty}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {tips[currentTip].readTime} read
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => toggleFavorite(tips[currentTip].id)}
                  className={`p-2 rounded-full transition-colors ${
                    favoriteTips.has(tips[currentTip].id)
                      ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400'
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-red-100 hover:text-red-600'
                  }`}
                >
                  <svg className="w-5 h-5" fill={favoriteTips.has(tips[currentTip].id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>

              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                {tips[currentTip].content}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <button
                    onClick={prevTip}
                    className="p-2 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextTip}
                    className="p-2 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                <div className="flex space-x-1">
                  {tips.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTip(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentTip ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tips List */}
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">All Tips</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {tips.map((tip, index) => (
                  <button
                    key={tip.id}
                    onClick={() => setCurrentTip(index)}
                    className={`w-full p-3 text-left rounded-lg transition-all ${
                      index === currentTip
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                        : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{tip.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm truncate">{tip.title}</div>
                        <div className="text-xs opacity-75">{tip.category} • {tip.readTime}</div>
                      </div>
                      {favoriteTips.has(tip.id) && (
                        <span className="text-red-500">❤️</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Favorites */}
            {favoriteTips.size > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Favorites</h3>
                <div className="space-y-2">
                  {Array.from(favoriteTips).map((tipId) => {
                    const tip = tips.find(t => t.id === tipId);
                    return (
                      <div key={tipId} className="flex items-center space-x-3 p-2 bg-red-50 dark:bg-red-900 rounded-lg">
                        <span className="text-lg">{tip.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm truncate">{tip.title}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-300">{tip.category}</div>
                        </div>
                        <button
                          onClick={() => toggleFavorite(tipId)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                          </svg>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tip Categories */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Browse by Category</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Training', 'Nutrition', 'Recovery', 'Mindset'].map((category) => (
              <button
                key={category}
                className="p-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-2xl mb-2">
                  {category === 'Training' && '💪'}
                  {category === 'Nutrition' && '🥗'}
                  {category === 'Recovery' && '😴'}
                  {category === 'Mindset' && '🧠'}
                </div>
                <div className="font-semibold">{category}</div>
                <div className="text-sm opacity-90">
                  {tips.filter(tip => tip.category === category).length} tips
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


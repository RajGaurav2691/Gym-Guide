'use client';

import { useState } from 'react';

export default function Articles() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Articles' },
    { id: 'nutrition', name: 'Nutrition' },
    { id: 'training', name: 'Training' },
    { id: 'recovery', name: 'Recovery' },
    { id: 'motivation', name: 'Motivation' },
    { id: 'science', name: 'Science' }
  ];

  const articles = [
    {
      id: 1,
      title: "The Complete Guide to Protein Timing",
      category: "nutrition",
      author: "Dr. Sarah Johnson",
      readTime: "8 min read",
      publishDate: "2024-01-15",
      image: "🥩",
      excerpt: "Learn when and how much protein to consume for optimal muscle growth and recovery.",
      content: "Protein timing has been a hot topic in fitness for years. This comprehensive guide covers everything you need to know about when to consume protein for maximum benefits...",
      tags: ["Protein", "Muscle Building", "Nutrition"],
      views: 12500,
      likes: 890
    },
    {
      id: 2,
      title: "Progressive Overload: The Key to Continuous Gains",
      category: "training",
      author: "Mike Chen",
      readTime: "6 min read",
      publishDate: "2024-01-12",
      image: "💪",
      excerpt: "Understanding progressive overload and how to implement it effectively in your training routine.",
      content: "Progressive overload is the fundamental principle behind all strength and muscle gains. Without it, your body has no reason to adapt and grow stronger...",
      tags: ["Strength Training", "Progressive Overload", "Muscle Growth"],
      views: 9800,
      likes: 650
    },
    {
      id: 3,
      title: "Sleep: The Missing Piece of Your Fitness Puzzle",
      category: "recovery",
      author: "Dr. Lisa Park",
      readTime: "10 min read",
      publishDate: "2024-01-10",
      image: "😴",
      excerpt: "How sleep quality and quantity directly impact your fitness progress and overall health.",
      content: "Sleep is often overlooked in fitness discussions, but it's arguably the most important factor for recovery and progress. This article explores...",
      tags: ["Sleep", "Recovery", "Health"],
      views: 15200,
      likes: 1200
    },
    {
      id: 4,
      title: "Building Mental Resilience in Fitness",
      category: "motivation",
      author: "Coach David Thompson",
      readTime: "7 min read",
      publishDate: "2024-01-08",
      image: "🧠",
      excerpt: "Develop the mental toughness needed to overcome plateaus and stay consistent with your fitness goals.",
      content: "Physical fitness is only half the battle. Mental resilience plays a crucial role in long-term success. Learn how to build unbreakable mental strength...",
      tags: ["Mindset", "Motivation", "Consistency"],
      views: 8700,
      likes: 540
    },
    {
      id: 5,
      title: "The Science of Muscle Hypertrophy",
      category: "science",
      author: "Dr. Emily Rodriguez",
      readTime: "12 min read",
      publishDate: "2024-01-05",
      image: "🔬",
      excerpt: "A deep dive into the cellular mechanisms behind muscle growth and how to optimize them.",
      content: "Understanding the science behind muscle hypertrophy can help you make more informed decisions about your training and nutrition...",
      tags: ["Science", "Muscle Growth", "Research"],
      views: 18900,
      likes: 1450
    },
    {
      id: 6,
      title: "Carb Cycling for Fat Loss",
      category: "nutrition",
      author: "Nutritionist Alex Kim",
      readTime: "9 min read",
      publishDate: "2024-01-03",
      image: "🍞",
      excerpt: "How to strategically manipulate carbohydrate intake to maximize fat loss while preserving muscle mass.",
      content: "Carb cycling is a powerful tool for fat loss that allows you to enjoy the benefits of both low-carb and high-carb days...",
      tags: ["Carb Cycling", "Fat Loss", "Nutrition"],
      views: 11200,
      likes: 780
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-poppins">
            Fitness Articles
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Expert-written articles covering nutrition, training, recovery, and the latest fitness science
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="w-full lg:w-1/3">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-indigo-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-gray-600'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <div key={article.id} className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">{article.image}</div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500 dark:text-gray-400">{article.readTime}</div>
                    <div className="text-xs text-gray-400">{article.publishDate}</div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span>By {article.author}</span>
                  <div className="flex items-center space-x-4">
                    <span>👁️ {article.views.toLocaleString()}</span>
                    <span>❤️ {article.likes}</span>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all duration-200">
                  Read Article
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-500 dark:text-gray-400">No articles found matching your criteria</p>
          </div>
        )}

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            Load More Articles
          </button>
        </div>
      </div>
    </section>
  );
}


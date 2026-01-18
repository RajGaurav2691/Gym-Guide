'use client';

import { useState } from 'react';

export default function ArticlesSection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Articles' },
    { id: 'nutrition', name: 'Nutrition' },
    { id: 'training', name: 'Training' },
    { id: 'recovery', name: 'Recovery' },
    { id: 'mindset', name: 'Mindset' }
  ];

  const articles = [
    {
      id: 1,
      title: "The Complete Guide to Protein Timing",
      category: "nutrition",
      author: "Dr. Sarah Johnson",
      readTime: "8 min read",
      publishedDate: "2024-09-10",
      image: "🥩",
      excerpt: "Learn when and how much protein to consume for optimal muscle growth and recovery.",
      tags: ["Protein", "Muscle Growth", "Nutrition"],
      views: 12500,
      likes: 890
    },
    {
      id: 2,
      title: "Progressive Overload: The Key to Continuous Gains",
      category: "training",
      author: "Mike Chen",
      readTime: "6 min read",
      publishedDate: "2024-09-08",
      image: "💪",
      excerpt: "Master the principle that drives all strength and muscle gains in your training.",
      tags: ["Strength Training", "Progression", "Muscle Building"],
      views: 9800,
      likes: 650
    },
    {
      id: 3,
      title: "Sleep Optimization for Athletes",
      category: "recovery",
      author: "Dr. Lisa Park",
      readTime: "10 min read",
      publishedDate: "2024-09-05",
      image: "😴",
      excerpt: "How quality sleep impacts your performance, recovery, and muscle growth.",
      tags: ["Sleep", "Recovery", "Performance"],
      views: 15200,
      likes: 1200
    },
    {
      id: 4,
      title: "Building Mental Resilience in Fitness",
      category: "mindset",
      author: "Coach David Thompson",
      readTime: "7 min read",
      publishedDate: "2024-09-03",
      image: "🧠",
      excerpt: "Develop the mental toughness needed to achieve your long-term fitness goals.",
      tags: ["Mindset", "Motivation", "Mental Health"],
      views: 7600,
      likes: 520
    },
    {
      id: 5,
      title: "Carb Cycling for Fat Loss",
      category: "nutrition",
      author: "Dr. Emily Rodriguez",
      readTime: "9 min read",
      publishedDate: "2024-09-01",
      image: "🍞",
      excerpt: "Strategic carbohydrate manipulation to maximize fat loss while preserving muscle.",
      tags: ["Fat Loss", "Carbohydrates", "Diet"],
      views: 18900,
      likes: 1450
    },
    {
      id: 6,
      title: "The Science of Muscle Hypertrophy",
      category: "training",
      author: "Dr. James Wilson",
      readTime: "12 min read",
      publishedDate: "2024-08-28",
      image: "🔬",
      excerpt: "Understanding the biological mechanisms behind muscle growth and how to optimize them.",
      tags: ["Muscle Growth", "Science", "Hypertrophy"],
      views: 22100,
      likes: 1800
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
            Expert Articles
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Evidence-based content written by certified professionals and fitness experts
          </p>
        </div>

        {/* Filters */}
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
                    <div className="text-xs text-gray-400">{article.publishedDate}</div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {article.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span>By {article.author}</span>
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {article.views.toLocaleString()}
                    </span>
                    <span className="flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      {article.likes}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all duration-200">
                    Read Article
                  </button>
                  <button className="px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    Save
                  </button>
                </div>
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


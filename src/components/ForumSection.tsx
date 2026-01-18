'use client';

import { useState } from 'react';

export default function ForumSection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Topics' },
    { id: 'nutrition', name: 'Nutrition' },
    { id: 'training', name: 'Training' },
    { id: 'motivation', name: 'Motivation' },
    { id: 'equipment', name: 'Equipment' },
    { id: 'recovery', name: 'Recovery' }
  ];

  const posts = [
    {
      id: 1,
      title: "Best protein powder for beginners?",
      category: "nutrition",
      author: "Sarah M.",
      authorAvatar: "SM",
      replies: 24,
      views: 156,
      lastActivity: "2 hours ago",
      tags: ["protein", "beginner", "supplements"],
      isPinned: false,
      isLocked: false
    },
    {
      id: 2,
      title: "Push/Pull/Legs vs Upper/Lower - Which is better?",
      category: "training",
      author: "Mike Chen",
      authorAvatar: "MC",
      replies: 18,
      views: 203,
      lastActivity: "4 hours ago",
      tags: ["training", "split", "routine"],
      isPinned: true,
      isLocked: false
    },
    {
      id: 3,
      title: "How to stay motivated during plateaus?",
      category: "motivation",
      author: "Emma L.",
      authorAvatar: "EL",
      replies: 31,
      views: 287,
      lastActivity: "6 hours ago",
      tags: ["motivation", "plateau", "mindset"],
      isPinned: false,
      isLocked: false
    },
    {
      id: 4,
      title: "Home gym setup recommendations",
      category: "equipment",
      author: "David K.",
      authorAvatar: "DK",
      replies: 15,
      views: 134,
      lastActivity: "8 hours ago",
      tags: ["home gym", "equipment", "setup"],
      isPinned: false,
      isLocked: false
    },
    {
      id: 5,
      title: "Sleep optimization for muscle recovery",
      category: "recovery",
      author: "Lisa Park",
      authorAvatar: "LP",
      replies: 12,
      views: 98,
      lastActivity: "1 day ago",
      tags: ["sleep", "recovery", "optimization"],
      isPinned: false,
      isLocked: false
    }
  ];

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-poppins">
            Community Forum
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Connect with fellow fitness enthusiasts and get expert advice
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="w-full lg:w-1/3">
              <input
                type="text"
                placeholder="Search discussions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-gray-600'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Forum Posts */}
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start space-x-4">
                {/* Author Avatar */}
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  {post.authorAvatar}
                </div>

                {/* Post Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {post.isPinned && (
                        <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded text-xs font-semibold">
                          📌 Pinned
                        </span>
                      )}
                      <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs font-semibold capitalize">
                        {post.category}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {post.lastActivity}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 hover:text-green-600 dark:hover:text-green-400 cursor-pointer">
                    {post.title}
                  </h3>

                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300 mb-3">
                    <span>By {post.author}</span>
                    <span>•</span>
                    <span>{post.replies} replies</span>
                    <span>•</span>
                    <span>{post.views} views</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Post Stats */}
                <div className="flex flex-col items-center space-y-2 text-center">
                  <div className="bg-green-100 dark:bg-green-900 rounded-lg p-3">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">{post.replies}</div>
                    <div className="text-xs text-green-600 dark:text-green-400">replies</div>
                  </div>
                  <div className="bg-blue-100 dark:bg-blue-900 rounded-lg p-3">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{post.views}</div>
                    <div className="text-xs text-blue-600 dark:text-blue-400">views</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-500 dark:text-gray-400">No discussions found matching your criteria</p>
          </div>
        )}

        {/* Create New Post */}
        <div className="mt-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Start a New Discussion</h3>
          <p className="text-lg mb-6 opacity-90">
            Have a question or want to share your fitness journey? Start a new discussion!
          </p>
          <button className="bg-white text-green-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors">
            Create New Post
          </button>
        </div>
      </div>
    </section>
  );
}


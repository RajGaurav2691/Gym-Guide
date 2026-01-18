'use client';

import { useState } from 'react';

interface Filter {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export default function WorkoutLibraryHero() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedEquipment, setSelectedEquipment] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filters: Filter[] = [
    { id: 'all', name: 'All Exercises', icon: '💪', description: 'Complete exercise library' },
    { id: 'strength', name: 'Strength', icon: '🏋️', description: 'Build muscle and power' },
    { id: 'cardio', name: 'Cardio', icon: '🏃', description: 'Improve cardiovascular health' },
    { id: 'flexibility', name: 'Flexibility & Mobility', icon: '🧘', description: 'Enhance range of motion' },
    { id: 'bodyweight', name: 'Bodyweight', icon: '🤸', description: 'No equipment needed' },
    { id: 'functional', name: 'Functional', icon: '🤾', description: 'Real-world movement patterns' }
  ];

  const equipmentOptions = [
    { id: 'all', name: 'All Equipment', icon: '🏋️' },
    { id: 'gym', name: 'Gym Equipment', icon: '🏋️‍♂️' },
    { id: 'home', name: 'Home Workout', icon: '🏠' },
    { id: 'no-equipment', name: 'No Equipment', icon: '🤸‍♂️' },
    { id: 'resistance-bands', name: 'Resistance Bands', icon: '🤿' },
    { id: 'dumbbells', name: 'Dumbbells', icon: '🏋️' }
  ];

  const difficultyLevels = [
    { id: 'all', name: 'All Levels', icon: '🌟', color: 'from-gray-500 to-gray-600' },
    { id: 'beginner', name: 'Beginner', icon: '😊', color: 'from-green-500 to-green-600' },
    { id: 'intermediate', name: 'Intermediate', icon: '😐', color: 'from-yellow-500 to-orange-500' },
    { id: 'advanced', name: 'Advanced', icon: '😅', color: 'from-red-500 to-red-600' }
  ];

  const scrollToExerciseLibrary = () => {
    const exerciseLibrarySection = document.querySelector('#exercise-library');
    if (exerciseLibrarySection) {
      exerciseLibrarySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToWorkoutBuilder = () => {
    const workoutBuilderSection = document.querySelector('#workout-builder');
    if (workoutBuilderSection) {
      workoutBuilderSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-4 lg:mb-6 font-poppins">
            Workout Library
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6 lg:mb-8">
            Access hundreds of exercises with video tutorials, form guides, and personalized recommendations
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 lg:mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-2xl sm:text-3xl font-bold text-red-600 mb-2">500+</div>
            <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Exercises</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-2">50+</div>
            <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Body Parts</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-2xl sm:text-3xl font-bold text-yellow-600 mb-2">100+</div>
            <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Video Guides</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-2">24/7</div>
            <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Access</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-8 lg:mb-12">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
            Choose Your Focus
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`p-3 sm:p-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  activeFilter === filter.id
                    ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg scale-105'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md'
                }`}
              >
                <div className="text-2xl sm:text-3xl mb-2">{filter.icon}</div>
                <div className="text-xs sm:text-sm font-bold leading-tight">{filter.name}</div>
                <div className="text-xs opacity-75 mt-1 hidden sm:block">{filter.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Advanced Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg mb-8 lg:mb-12">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Smart Filters
          </h3>
          <div className="space-y-6">
            {/* Search Bar */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Search Exercises
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="e.g., push-ups, squats, bicep curls..."
                  className="w-full px-4 py-3 pl-12 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔍
                </div>
              </div>
            </div>

            {/* Equipment Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Equipment Available
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
                {equipmentOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedEquipment(option.id)}
                    className={`p-3 rounded-lg text-center transition-all transform hover:scale-105 ${
                      selectedEquipment === option.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    <div className="text-lg mb-1">{option.icon}</div>
                    <div className="text-xs font-medium">{option.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Difficulty Level
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {difficultyLevels.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => setSelectedDifficulty(level.id)}
                    className={`p-4 rounded-xl text-center transition-all transform hover:scale-105 ${
                      selectedDifficulty === level.id
                        ? `bg-gradient-to-r ${level.color} text-white shadow-lg scale-105`
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:shadow-md'
                    }`}
                  >
                    <div className="text-2xl mb-2">{level.icon}</div>
                    <div className="text-sm font-bold">{level.name}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={scrollToExerciseLibrary}
              className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-bold hover:from-red-600 hover:to-orange-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              🔍 Browse All Exercises
            </button>
            <button 
              onClick={scrollToWorkoutBuilder}
              className="border-2 border-red-500 text-red-600 dark:text-red-400 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-bold hover:bg-red-500 hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              🏋️ Build Custom Workout
            </button>
          </div>
          
          {/* Feature Highlights */}
          <div className="mt-8 lg:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-gradient-to-br from-red-100 to-red-200 dark:from-red-800 dark:to-red-700 p-4 sm:p-6 rounded-xl text-center">
              <div className="text-2xl sm:text-3xl mb-2">🎯</div>
              <h4 className="font-bold text-red-800 dark:text-red-200 text-sm sm:text-base mb-1">Targeted Training</h4>
              <p className="text-xs sm:text-sm text-red-600 dark:text-red-300">Focus on specific muscle groups</p>
            </div>
            
            <div className="bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-800 dark:to-orange-700 p-4 sm:p-6 rounded-xl text-center">
              <div className="text-2xl sm:text-3xl mb-2">📹</div>
              <h4 className="font-bold text-orange-800 dark:text-orange-200 text-sm sm:text-base mb-1">Video Guides</h4>
              <p className="text-xs sm:text-sm text-orange-600 dark:text-orange-300">HD tutorials with proper form</p>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-800 dark:to-yellow-700 p-4 sm:p-6 rounded-xl text-center">
              <div className="text-2xl sm:text-3xl mb-2">📈</div>
              <h4 className="font-bold text-yellow-800 dark:text-yellow-200 text-sm sm:text-base mb-1">Progress Tracking</h4>
              <p className="text-xs sm:text-sm text-yellow-600 dark:text-yellow-300">Monitor your improvements</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800 dark:to-green-700 p-4 sm:p-6 rounded-xl text-center">
              <div className="text-2xl sm:text-3xl mb-2">🤖</div>
              <h4 className="font-bold text-green-800 dark:text-green-200 text-sm sm:text-base mb-1">AI Recommendations</h4>
              <p className="text-xs sm:text-sm text-green-600 dark:text-green-300">Personalized exercise suggestions</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


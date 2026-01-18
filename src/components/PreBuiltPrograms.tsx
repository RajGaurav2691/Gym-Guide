'use client';

import { useState } from 'react';

export default function PreBuiltPrograms() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProgram, setSelectedProgram] = useState(null);

  const categories = [
    { id: 'all', name: 'All Programs' },
    { id: 'strength', name: 'Strength' },
    { id: 'muscle', name: 'Muscle Building' },
    { id: 'fat-loss', name: 'Fat Loss' },
    { id: 'endurance', name: 'Endurance' },
    { id: 'beginner', name: 'Beginner' }
  ];

  const programs = [
    {
      id: 1,
      name: "Push/Pull/Legs",
      category: "muscle",
      difficulty: "Intermediate",
      duration: "6 weeks",
      daysPerWeek: 6,
      timePerSession: "60-90 min",
      description: "Classic 6-day split focusing on movement patterns",
      image: "💪",
      features: ["Balanced muscle development", "High frequency training", "Flexible scheduling"],
      exercises: [
        { day: "Push Day", muscles: ["Chest", "Shoulders", "Triceps"], exercises: 6 },
        { day: "Pull Day", muscles: ["Back", "Biceps"], exercises: 5 },
        { day: "Legs Day", muscles: ["Quads", "Hamstrings", "Glutes"], exercises: 7 }
      ],
      goals: ["Muscle Building", "Strength", "Size"],
      equipment: ["Gym", "Home"],
      rating: 4.8,
      reviews: 1250
    },
    {
      id: 2,
      name: "Upper/Lower Split",
      category: "strength",
      difficulty: "Beginner",
      duration: "8 weeks",
      daysPerWeek: 4,
      timePerSession: "45-75 min",
      description: "Perfect for beginners with 4 training days per week",
      image: "🏋️",
      features: ["Beginner friendly", "Balanced approach", "Recovery focused"],
      exercises: [
        { day: "Upper Body", muscles: ["Chest", "Back", "Shoulders", "Arms"], exercises: 8 },
        { day: "Lower Body", muscles: ["Quads", "Hamstrings", "Glutes", "Calves"], exercises: 6 }
      ],
      goals: ["Strength", "Muscle Building", "General Fitness"],
      equipment: ["Gym", "Home"],
      rating: 4.6,
      reviews: 980
    },
    {
      id: 3,
      name: "5/3/1 Strength",
      category: "strength",
      difficulty: "Advanced",
      duration: "12 weeks",
      daysPerWeek: 4,
      timePerSession: "60-90 min",
      description: "Proven strength program for powerlifters and strength athletes",
      image: "🏆",
      features: ["Progressive overload", "Strength focused", "Long-term progression"],
      exercises: [
        { day: "Squat Day", muscles: ["Quads", "Glutes", "Core"], exercises: 4 },
        { day: "Bench Day", muscles: ["Chest", "Triceps", "Shoulders"], exercises: 4 },
        { day: "Deadlift Day", muscles: ["Back", "Hamstrings", "Glutes"], exercises: 4 },
        { day: "Press Day", muscles: ["Shoulders", "Triceps", "Core"], exercises: 4 }
      ],
      goals: ["Strength", "Power", "Performance"],
      equipment: ["Gym"],
      rating: 4.9,
      reviews: 2100
    },
    {
      id: 4,
      name: "HIIT Fat Burner",
      category: "fat-loss",
      difficulty: "Intermediate",
      duration: "4 weeks",
      daysPerWeek: 5,
      timePerSession: "20-30 min",
      description: "High-intensity interval training for maximum fat burning",
      image: "🔥",
      features: ["Time efficient", "High calorie burn", "Metabolic boost"],
      exercises: [
        { day: "HIIT Cardio", muscles: ["Full Body"], exercises: 8 },
        { day: "Strength HIIT", muscles: ["Full Body"], exercises: 6 },
        { day: "Core HIIT", muscles: ["Core", "Full Body"], exercises: 7 }
      ],
      goals: ["Fat Loss", "Endurance", "Conditioning"],
      equipment: ["Home", "Gym"],
      rating: 4.7,
      reviews: 1580
    },
    {
      id: 5,
      name: "Bodyweight Mastery",
      category: "beginner",
      difficulty: "Beginner",
      duration: "6 weeks",
      daysPerWeek: 3,
      timePerSession: "30-45 min",
      description: "Complete bodyweight program for home training",
      image: "🤸",
      features: ["No equipment needed", "Beginner friendly", "Progressive difficulty"],
      exercises: [
        { day: "Upper Body", muscles: ["Chest", "Back", "Arms"], exercises: 6 },
        { day: "Lower Body", muscles: ["Legs", "Glutes"], exercises: 5 },
        { day: "Full Body", muscles: ["Full Body"], exercises: 8 }
      ],
      goals: ["General Fitness", "Muscle Building", "Home Training"],
      equipment: ["No Equipment"],
      rating: 4.5,
      reviews: 890
    },
    {
      id: 6,
      name: "Bro Split",
      category: "muscle",
      difficulty: "Advanced",
      duration: "8 weeks",
      daysPerWeek: 6,
      timePerSession: "75-120 min",
      description: "One muscle group per day for maximum focus and volume",
      image: "💀",
      features: ["High volume", "Muscle specialization", "Advanced training"],
      exercises: [
        { day: "Chest", muscles: ["Chest", "Triceps"], exercises: 8 },
        { day: "Back", muscles: ["Back", "Biceps"], exercises: 8 },
        { day: "Shoulders", muscles: ["Shoulders", "Traps"], exercises: 6 },
        { day: "Arms", muscles: ["Biceps", "Triceps"], exercises: 10 },
        { day: "Legs", muscles: ["Quads", "Hamstrings", "Glutes"], exercises: 10 },
        { day: "Core", muscles: ["Core", "Abs"], exercises: 8 }
      ],
      goals: ["Muscle Building", "Size", "Aesthetics"],
      equipment: ["Gym"],
      rating: 4.6,
      reviews: 1750
    }
  ];

  const filteredPrograms = programs.filter(program => 
    selectedCategory === 'all' || program.category === selectedCategory
  );

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-poppins">
            Pre-built Programs
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Choose from our collection of proven training programs designed by fitness experts
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                selectedCategory === category.id
                  ? 'bg-purple-500 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-gray-600'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrograms.map((program) => (
            <div key={program.id} className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">{program.image}</div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-400">⭐</span>
                      <span className="font-semibold">{program.rating}</span>
                      <span className="text-gray-500 text-sm">({program.reviews})</span>
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {program.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {program.description}
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Difficulty:</span>
                    <span className={`font-semibold ${
                      program.difficulty === 'Beginner' ? 'text-green-600' :
                      program.difficulty === 'Intermediate' ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {program.difficulty}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Duration:</span>
                    <span className="font-semibold">{program.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Days/Week:</span>
                    <span className="font-semibold">{program.daysPerWeek}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Time/Session:</span>
                    <span className="font-semibold">{program.timePerSession}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Goals:</h4>
                  <div className="flex flex-wrap gap-2">
                    {program.goals.map((goal, index) => (
                      <span key={index} className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs rounded-full">
                        {goal}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedProgram(program)}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-200"
                  >
                    View Details
                  </button>
                  <button className="px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    Start
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPrograms.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-500 dark:text-gray-400">No programs found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Program Detail Modal */}
      {selectedProgram && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {selectedProgram.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">{selectedProgram.description}</p>
                </div>
                <button
                  onClick={() => setSelectedProgram(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Program Details</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Difficulty:</span>
                      <span className="font-semibold">{selectedProgram.difficulty}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Duration:</span>
                      <span className="font-semibold">{selectedProgram.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Days per Week:</span>
                      <span className="font-semibold">{selectedProgram.daysPerWeek}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Time per Session:</span>
                      <span className="font-semibold">{selectedProgram.timePerSession}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Equipment:</span>
                      <span className="font-semibold">{selectedProgram.equipment.join(', ')}</span>
                    </div>
                  </div>

                  <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 mt-6">Features</h4>
                  <ul className="space-y-2">
                    {selectedProgram.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <span className="text-green-500">✓</span>
                        <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Weekly Schedule</h4>
                  <div className="space-y-3">
                    {selectedProgram.exercises.map((day, index) => (
                      <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <h5 className="font-semibold text-gray-900 dark:text-white mb-2">{day.day}</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                          {day.muscles.join(', ')} • {day.exercises} exercises
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-4 px-6 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-200">
                  Start This Program
                </button>
                <button className="px-6 py-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  Save for Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}


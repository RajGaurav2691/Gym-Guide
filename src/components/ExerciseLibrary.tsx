'use client';

import { useState } from 'react';

interface Exercise {
  id: number;
  name: string;
  bodyPart: string;
  equipment: string;
  difficulty: string;
  muscleGroups: string[];
  description: string;
  videoUrl: string;
  instructions: string[];
  tips: string;
  variations: string[];
  sets: number;
  reps: string;
  restTime: string;
  caloriesBurned: number;
  duration: number;
}

export default function ExerciseLibrary() {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBodyPart, setSelectedBodyPart] = useState('all');
  const [selectedEquipment, setSelectedEquipment] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [savedExercises, setSavedExercises] = useState<number[]>([]);
  const [currentWorkout, setCurrentWorkout] = useState<Exercise[]>([]);

  const bodyParts = [
    { id: 'all', name: 'All Body Parts', icon: '💪' },
    { id: 'chest', name: 'Chest', icon: '💪' },
    { id: 'back', name: 'Back', icon: '🔙' },
    { id: 'shoulders', name: 'Shoulders', icon: '🤷' },
    { id: 'arms', name: 'Arms', icon: '💪' },
    { id: 'legs', name: 'Legs', icon: '🖵' },
    { id: 'core', name: 'Core', icon: '🧿' },
    { id: 'glutes', name: 'Glutes', icon: '🍑' },
    { id: 'cardio', name: 'Cardio', icon: '❤️' }
  ];

  const difficultyLevels = [
    { id: 'all', name: 'All Levels', color: 'bg-gray-500' },
    { id: 'beginner', name: 'Beginner', color: 'bg-green-500' },
    { id: 'intermediate', name: 'Intermediate', color: 'bg-yellow-500' },
    { id: 'advanced', name: 'Advanced', color: 'bg-red-500' }
  ];

  const exercises: Exercise[] = [
    {
      id: 1,
      name: "Push-ups",
      bodyPart: "chest",
      equipment: "no-equipment",
      difficulty: "beginner",
      muscleGroups: ["Chest", "Triceps", "Shoulders"],
      description: "Classic bodyweight exercise for upper body strength and endurance",
      videoUrl: "#",
      instructions: [
        "Start in a plank position with hands slightly wider than shoulders",
        "Keep your body in a straight line from head to heels",
        "Lower your body until chest nearly touches the floor",
        "Push back up to starting position with control",
        "Maintain core engagement throughout the movement"
      ],
      tips: "Keep your body in a straight line and don't let hips sag or pike up",
      variations: ["Incline Push-ups", "Decline Push-ups", "Diamond Push-ups", "Wide-Grip Push-ups"],
      sets: 3,
      reps: "8-15",
      restTime: "60-90 sec",
      caloriesBurned: 50,
      duration: 10
    },
    {
      id: 2,
      name: "Squats",
      bodyPart: "legs",
      equipment: "no-equipment",
      difficulty: "beginner",
      muscleGroups: ["Quads", "Glutes", "Hamstrings", "Calves"],
      description: "Fundamental lower body exercise for strength and mobility",
      videoUrl: "#",
      instructions: [
        "Stand with feet shoulder-width apart, toes slightly outward",
        "Keep chest up and core engaged",
        "Lower your body as if sitting back into a chair",
        "Keep knees behind toes and weight on heels",
        "Return to starting position by driving through heels"
      ],
      tips: "Keep weight on heels and don't let knees cave inward",
      variations: ["Jump Squats", "Pistol Squats", "Sumo Squats", "Bulgarian Split Squats"],
      sets: 3,
      reps: "12-20",
      restTime: "60 sec",
      caloriesBurned: 60,
      duration: 8
    },
    {
      id: 3,
      name: "Bench Press",
      bodyPart: "chest",
      equipment: "gym",
      difficulty: "intermediate",
      muscleGroups: ["Chest", "Triceps", "Shoulders"],
      description: "Compound exercise for chest development and upper body strength",
      videoUrl: "#",
      instructions: [
        "Lie on bench with feet flat on floor",
        "Grip bar slightly wider than shoulders with wrists straight",
        "Lower bar to chest with control, touching lightly",
        "Press bar up explosively while maintaining shoulder blade contact",
        "Keep core tight and maintain natural arch in back"
      ],
      tips: "Keep shoulder blades retracted and maintain slight arch in back for stability",
      variations: ["Incline Bench Press", "Dumbbell Press", "Close-Grip Press", "Pause Bench Press"],
      sets: 4,
      reps: "6-10",
      restTime: "2-3 min",
      caloriesBurned: 80,
      duration: 15
    },
    {
      id: 4,
      name: "Deadlifts",
      bodyPart: "back",
      equipment: "gym",
      difficulty: "advanced",
      muscleGroups: ["Back", "Glutes", "Hamstrings", "Traps", "Core"],
      description: "King of all exercises for posterior chain development",
      videoUrl: "#",
      instructions: [
        "Stand with feet hip-width apart, bar over mid-foot",
        "Bend at hips and knees to grip bar with mixed or double overhand grip",
        "Keep back straight, chest up, and shoulders over the bar",
        "Drive through heels and extend hips and knees simultaneously",
        "Stand tall with shoulders back, then lower with control"
      ],
      tips: "Keep bar close to body throughout movement and don't round your back",
      variations: ["Romanian Deadlifts", "Sumo Deadlifts", "Trap Bar Deadlifts", "Single-Leg Deadlifts"],
      sets: 4,
      reps: "3-6",
      restTime: "3-4 min",
      caloriesBurned: 120,
      duration: 20
    },
    {
      id: 5,
      name: "Plank",
      bodyPart: "core",
      equipment: "no-equipment",
      difficulty: "beginner",
      muscleGroups: ["Core", "Shoulders", "Glutes"],
      description: "Isometric exercise for core stability and strength",
      videoUrl: "#",
      instructions: [
        "Start in push-up position on forearms",
        "Keep body in straight line from head to heels",
        "Engage core and glutes to maintain position",
        "Breathe normally while holding position",
        "Focus on quality over duration"
      ],
      tips: "Don't let hips sag or pike up - maintain neutral spine",
      variations: ["Side Plank", "Plank Up-Downs", "Mountain Climbers", "Plank with Leg Lifts"],
      sets: 3,
      reps: "30-60 sec",
      restTime: "30 sec",
      caloriesBurned: 30,
      duration: 5
    },
    {
      id: 6,
      name: "Pull-ups",
      bodyPart: "back",
      equipment: "gym",
      difficulty: "intermediate",
      muscleGroups: ["Back", "Biceps", "Rear Delts"],
      description: "Upper body pulling exercise for back strength",
      videoUrl: "#",
      instructions: [
        "Hang from bar with overhand grip, hands shoulder-width apart",
        "Engage lats and pull body up until chin clears bar",
        "Lower with control to full extension",
        "Keep core tight throughout movement",
        "Avoid swinging or using momentum"
      ],
      tips: "Start with assisted variations if needed, focus on full range of motion",
      variations: ["Chin-ups", "Wide-Grip Pull-ups", "L-Sit Pull-ups", "Assisted Pull-ups"],
      sets: 3,
      reps: "5-12",
      restTime: "2 min",
      caloriesBurned: 70,
      duration: 12
    },
    {
      id: 7,
      name: "Burpees",
      bodyPart: "cardio",
      equipment: "no-equipment",
      difficulty: "intermediate",
      muscleGroups: ["Full Body", "Cardio"],
      description: "High-intensity full-body exercise for cardio and strength",
      videoUrl: "#",
      instructions: [
        "Start standing, then squat down and place hands on floor",
        "Jump feet back into plank position",
        "Perform a push-up (optional)",
        "Jump feet back to squat position",
        "Explosively jump up with arms overhead"
      ],
      tips: "Maintain good form even when fatigued - modify as needed",
      variations: ["Half Burpees", "Burpee Box Jumps", "Burpee Pull-ups", "Single-Arm Burpees"],
      sets: 3,
      reps: "8-15",
      restTime: "60-90 sec",
      caloriesBurned: 100,
      duration: 10
    },
    {
      id: 8,
      name: "Lunges",
      bodyPart: "legs",
      equipment: "no-equipment",
      difficulty: "beginner",
      muscleGroups: ["Quads", "Glutes", "Hamstrings", "Calves"],
      description: "Unilateral leg exercise for strength and balance",
      videoUrl: "#",
      instructions: [
        "Stand with feet hip-width apart",
        "Step forward with one leg, lowering hips",
        "Lower until both knees are at 90-degree angles",
        "Push back to starting position",
        "Alternate legs or complete all reps on one side"
      ],
      tips: "Keep front knee over ankle and don't let it cave inward",
      variations: ["Reverse Lunges", "Walking Lunges", "Lateral Lunges", "Jumping Lunges"],
      sets: 3,
      reps: "10-15 each leg",
      restTime: "60 sec",
      caloriesBurned: 55,
      duration: 8
    }
  ];

  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.muscleGroups.some(muscle => muscle.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesBodyPart = selectedBodyPart === 'all' || exercise.bodyPart === selectedBodyPart;
    const matchesEquipment = selectedEquipment === 'all' || exercise.equipment === selectedEquipment;
    const matchesDifficulty = selectedDifficulty === 'all' || exercise.difficulty === selectedDifficulty;
    return matchesSearch && matchesBodyPart && matchesEquipment && matchesDifficulty;
  });

  const toggleSaveExercise = (exerciseId: number) => {
    setSavedExercises(prev => 
      prev.includes(exerciseId) 
        ? prev.filter(id => id !== exerciseId)
        : [...prev, exerciseId]
    );
  };

  const addToWorkout = (exercise: Exercise) => {
    if (!currentWorkout.find(ex => ex.id === exercise.id)) {
      setCurrentWorkout(prev => [...prev, exercise]);
    }
  };

  const openExerciseModal = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    document.body.style.overflow = 'hidden';
  };

  const closeExerciseModal = () => {
    setSelectedExercise(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-poppins">
            Exercise Library
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Master proper form with detailed instructions and HD video demonstrations
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 lg:mb-12">
          <div className="space-y-6">
            {/* Search */}
            <div className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search exercises, muscles, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-12 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-base"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔍
                </div>
              </div>
            </div>

            {/* Body Part Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Target Muscle Groups</h3>
              <div className="flex flex-wrap gap-2">
                {bodyParts.map((part) => (
                  <button
                    key={part.id}
                    onClick={() => setSelectedBodyPart(part.id)}
                    className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105 ${
                      selectedBodyPart === part.id
                        ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    <span>{part.icon}</span>
                    <span className="hidden sm:inline">{part.name}</span>
                    <span className="sm:hidden">{part.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Difficulty Level</h3>
              <div className="flex flex-wrap gap-2">
                {difficultyLevels.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => setSelectedDifficulty(level.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105 ${
                      selectedDifficulty === level.id
                        ? `${level.color} text-white shadow-lg`
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {level.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4 sm:mb-0">
            Showing <span className="font-bold text-red-600 dark:text-red-400">{filteredExercises.length}</span> exercises
            {searchTerm && (
              <span> for "{searchTerm}"</span>
            )}
          </p>
          
          {currentWorkout.length > 0 && (
            <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
              🏋️ {currentWorkout.length} exercises in workout
            </div>
          )}
        </div>

        {/* Exercise Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {filteredExercises.map((exercise) => (
            <div key={exercise.id} className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white leading-tight">
                    {exercise.name}
                  </h3>
                  <div className="flex space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      exercise.difficulty === 'beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      exercise.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {exercise.difficulty}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                  {exercise.description}
                </p>

                {/* Exercise Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-white dark:bg-gray-700 rounded-lg">
                  <div className="text-center">
                    <div className="text-lg font-bold text-red-600 dark:text-red-400">{exercise.sets}</div>
                    <div className="text-xs text-gray-500">Sets</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-600 dark:text-orange-400">{exercise.reps}</div>
                    <div className="text-xs text-gray-500">Reps</div>
                  </div>
                </div>

                {/* Equipment & Calories */}
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                  <span>🏋️ {exercise.equipment === 'no-equipment' ? 'No Equipment' : 'Gym Equipment'}</span>
                  <span>🔥 {exercise.caloriesBurned} cal</span>
                  <span>⏱️ {exercise.duration} min</span>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Target Muscles:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {exercise.muscleGroups.slice(0, 3).map((muscle, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">
                        {muscle}
                      </span>
                    ))}
                    {exercise.muscleGroups.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                        +{exercise.muscleGroups.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => openExerciseModal(exercise)}
                    className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 text-white py-2 px-3 sm:px-4 rounded-lg font-semibold hover:from-red-600 hover:to-orange-600 transition-all duration-200 text-sm"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => addToWorkout(exercise)}
                    className="px-3 sm:px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-semibold"
                  >
                    + Add
                  </button>
                  <button
                    onClick={() => toggleSaveExercise(exercise.id)}
                    className={`px-3 sm:px-4 py-2 border rounded-lg transition-colors text-sm ${
                      savedExercises.includes(exercise.id)
                        ? 'bg-red-500 text-white border-red-500 hover:bg-red-600'
                        : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    {savedExercises.includes(exercise.id) ? '❤️' : '🔖'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredExercises.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-500 dark:text-gray-400">No exercises found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Exercise Detail Modal */}
      {selectedExercise && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {selectedExercise.name}
                </h3>
                <button
                  onClick={() => setSelectedExercise(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    Instructions
                  </h4>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300">
                    {selectedExercise.instructions.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ol>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    Pro Tip
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 italic">
                    {selectedExercise.tips}
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    Variations
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedExercise.variations.map((variation, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-sm rounded-full">
                        {variation}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-red-600 hover:to-orange-600 transition-all duration-200">
                    Watch Video
                  </button>
                  <button className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    Add to Workout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}


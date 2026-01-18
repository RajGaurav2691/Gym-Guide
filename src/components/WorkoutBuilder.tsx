'use client';

import { useState } from 'react';

// Interfaces remain the same
interface Exercise {
  id: number;
  name: string;
  category: string;
  difficulty: string;
  equipment: string;
  description: string;
  muscleGroups: string[];
  caloriesBurned: number;
  duration: number;
}

interface WorkoutExercise extends Exercise {
  sets: number;
  reps: number | string;
  rest: number;
  weight?: number;
  notes?: string;
}

interface SavedWorkout {
  id: string;
  name: string;
  exercises: WorkoutExercise[];
  totalDuration: number;
  totalCalories: number;
  createdAt: Date;
  difficulty: string;
}

export default function WorkoutBuilder() {
  const [workoutName, setWorkoutName] = useState('');
  const [selectedExercises, setSelectedExercises] = useState<WorkoutExercise[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [savedWorkouts, setSavedWorkouts] = useState<SavedWorkout[]>([]);
  const [isBuilding, setIsBuilding] = useState(true); // Simplified state for view toggling

  const availableExercises: Exercise[] = [
    // Your availableExercises array remains here...
    {
      id: 1,
      name: 'Push-ups',
      category: 'Chest',
      difficulty: 'Beginner',
      equipment: 'Bodyweight',
      description: 'Classic bodyweight exercise for upper body strength',
      muscleGroups: ['Chest', 'Triceps', 'Shoulders'],
      caloriesBurned: 50,
      duration: 10
    },
    {
      id: 2,
      name: 'Squats',
      category: 'Legs',
      difficulty: 'Beginner',
      equipment: 'Bodyweight',
      description: 'Fundamental lower body exercise for strength and mobility',
      muscleGroups: ['Quads', 'Glutes', 'Hamstrings'],
      caloriesBurned: 60,
      duration: 8
    },
    {
      id: 3,
      name: 'Plank',
      category: 'Core',
      difficulty: 'Beginner',
      equipment: 'Bodyweight',
      description: 'Isometric exercise for core stability and strength',
      muscleGroups: ['Core', 'Shoulders', 'Glutes'],
      caloriesBurned: 30,
      duration: 5
    },
    {
      id: 4,
      name: 'Bench Press',
      category: 'Chest',
      difficulty: 'Intermediate',
      equipment: 'Barbell',
      description: 'Compound exercise for chest development',
      muscleGroups: ['Chest', 'Triceps', 'Shoulders'],
      caloriesBurned: 80,
      duration: 15
    },
    {
      id: 5,
      name: 'Deadlifts',
      category: 'Back',
      difficulty: 'Advanced',
      equipment: 'Barbell',
      description: 'King of all exercises for posterior chain development',
      muscleGroups: ['Back', 'Glutes', 'Hamstrings', 'Traps'],
      caloriesBurned: 120,
      duration: 20
    },
    {
      id: 6,
      name: 'Pull-ups',
      category: 'Back',
      difficulty: 'Intermediate',
      equipment: 'Pull-up Bar',
      description: 'Upper body pulling exercise for back strength',
      muscleGroups: ['Back', 'Biceps', 'Rear Delts'],
      caloriesBurned: 70,
      duration: 12
    },
    {
      id: 7,
      name: 'Lunges',
      category: 'Legs',
      difficulty: 'Beginner',
      equipment: 'Bodyweight',
      description: 'Unilateral leg exercise for strength and balance',
      muscleGroups: ['Quads', 'Glutes', 'Hamstrings'],
      caloriesBurned: 55,
      duration: 8
    },
    {
      id: 8,
      name: 'Shoulder Press',
      category: 'Shoulders',
      difficulty: 'Intermediate',
      equipment: 'Dumbbells',
      description: 'Overhead pressing movement for shoulder development',
      muscleGroups: ['Shoulders', 'Triceps', 'Core'],
      caloriesBurned: 65,
      duration: 12
    },
    {
      id: 9,
      name: 'Burpees',
      category: 'Cardio',
      difficulty: 'Intermediate',
      equipment: 'Bodyweight',
      description: 'High-intensity full-body exercise',
      muscleGroups: ['Full Body', 'Cardio'],
      caloriesBurned: 100,
      duration: 10
    },
    {
      id: 10,
      name: 'Mountain Climbers',
      category: 'Cardio',
      difficulty: 'Beginner',
      equipment: 'Bodyweight',
      description: 'Dynamic cardio exercise targeting core and legs',
      muscleGroups: ['Core', 'Cardio', 'Shoulders'],
      caloriesBurned: 85,
      duration: 8
    }
  ];

  // Functions remain the same until deleteWorkout
  const categories = ['all', 'Chest', 'Back', 'Legs', 'Shoulders', 'Core', 'Cardio'];
  const difficulties = ['all', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredExercises = availableExercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.muscleGroups.some(muscle => muscle.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || exercise.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || exercise.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const addExercise = (exercise: Exercise) => {
    const newExercise: WorkoutExercise = {
      ...exercise,
      sets: 3,
      reps: exercise.category === 'Cardio' ? '30 sec' : 10,
      rest: 60,
      weight: exercise.equipment !== 'Bodyweight' ? 0 : undefined,
      notes: ''
    };
    setSelectedExercises([...selectedExercises, newExercise]);
  };

  const removeExercise = (index: number) => {
    setSelectedExercises(selectedExercises.filter((_, i) => i !== index));
  };

  const updateExercise = (index: number, field: keyof WorkoutExercise, value: any) => {
    const updated = [...selectedExercises];
    updated[index] = { ...updated[index], [field]: value };
    setSelectedExercises(updated);
  };

  const calculateWorkoutStats = () => {
    const totalDuration = selectedExercises.reduce((total, ex) => total + (ex.duration || 0), 0);
    const totalCalories = selectedExercises.reduce((total, ex) => total + (ex.caloriesBurned || 0), 0);
    const totalSets = selectedExercises.reduce((total, ex) => total + ex.sets, 0);
    const avgDifficulty = selectedExercises.length > 0 ?
      selectedExercises.reduce((total, ex) => {
        const difficultyScore = ex.difficulty === 'Beginner' ? 1 : ex.difficulty === 'Intermediate' ? 2 : 3;
        return total + difficultyScore;
      }, 0) / selectedExercises.length : 0;

    const overallDifficulty = avgDifficulty <= 1.3 ? 'Beginner' : avgDifficulty <= 2.3 ? 'Intermediate' : 'Advanced';

    return { totalDuration, totalCalories, totalSets, overallDifficulty };
  };

  const saveWorkout = () => {
    if (!workoutName.trim()) {
      alert('Please enter a workout name');
      return;
    }
    if (selectedExercises.length === 0) {
      alert('Please add at least one exercise');
      return;
    }

    const stats = calculateWorkoutStats();
    const newWorkout: SavedWorkout = {
      id: Date.now().toString(),
      name: workoutName,
      exercises: selectedExercises,
      totalDuration: stats.totalDuration,
      totalCalories: stats.totalCalories,
      createdAt: new Date(),
      difficulty: stats.overallDifficulty
    };

    setSavedWorkouts([newWorkout, ...savedWorkouts]);
    alert(`Workout "${workoutName}" saved successfully!`);
    setWorkoutName('');
    setSelectedExercises([]);
  };

  const loadWorkout = (workout: SavedWorkout) => {
    setWorkoutName(workout.name + ' (Copy)');
    setSelectedExercises([...workout.exercises]);
    setIsBuilding(true); // Switch back to the builder view
  };

  const clearWorkout = () => {
    if (selectedExercises.length > 0 && confirm('Clear all exercises?')) {
      setSelectedExercises([]);
    }
  };

  // CORRECTED: Added the missing deleteWorkout function
  const deleteWorkout = (id: string) => {
    if (confirm('Are you sure you want to delete this workout?')) {
      setSavedWorkouts(savedWorkouts.filter(workout => workout.id !== id));
    }
  };

  // Helper function to handle reps that might be a string (e.g., '30 sec')
  const getRepsAsNumber = (reps: number | string): number => {
    if (typeof reps === 'number') {
      return reps;
    }
    return parseInt(reps) || 0;
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800" id="workout-builder">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-poppins">
            Workout Builder
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Create your custom workout by selecting exercises and customizing parameters
          </p>
        </div>

        {/* Toggle buttons */}
        <div className="flex gap-4 mb-8 justify-center">
          <button
            onClick={() => setIsBuilding(true)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              isBuilding ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg' : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            🏗️ Build Workout
          </button>
          <button
            onClick={() => setIsBuilding(false)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              !isBuilding ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg' : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            💾 Saved Workouts ({savedWorkouts.length})
          </button>
        </div>

        {/* CORRECTED: Replaced showSavedWorkouts with isBuilding for clarity */}
        {isBuilding ? (
          // This fragment wraps the entire "Build Workout" view
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column: Available Exercises */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Available Exercises</h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {filteredExercises.map((exercise) => (
                    <div
                      key={exercise.id}
                      className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                      onClick={() => addExercise(exercise)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">{exercise.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{exercise.category}</p>
                        </div>
                        <div className="text-right">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            exercise.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                            exercise.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {exercise.difficulty}
                          </span>
                          <p className="text-xs text-gray-500 mt-1">{exercise.equipment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Workout Builder */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Workout Name
                  </label>
                  <input
                    type="text"
                    value={workoutName}
                    onChange={(e) => setWorkoutName(e.target.value)}
                    placeholder="Enter workout name..."
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Your Workout</h3>
                {selectedExercises.length === 0 ? (
                  <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                    <div className="text-4xl mb-4">🏋️</div>
                    <p>Click on exercises to add them to your workout</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {selectedExercises.map((exercise, index) => (
                      <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">{exercise.name}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{exercise.category}</p>
                          </div>
                          <button onClick={() => removeExercise(index)} className="text-red-500 hover:text-red-700">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Sets</label>
                            <input
                              type="number"
                              value={exercise.sets}
                              onChange={(e) => updateExercise(index, 'sets', parseInt(e.target.value))}
                              className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm"
                              min="1"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Reps</label>
                            <input
                              type="text" // Use text to allow for strings like "30 sec"
                              value={exercise.reps}
                              onChange={(e) => updateExercise(index, 'reps', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Rest (sec)</label>
                            <input
                              type="number"
                              value={exercise.rest}
                              onChange={(e) => updateExercise(index, 'rest', parseInt(e.target.value))}
                              className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm"
                              min="0"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="mt-6 flex gap-4">
                  <button onClick={saveWorkout} className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-red-600 hover:to-orange-600 transition-all duration-200">
                    Save Workout
                  </button>
                  <button onClick={clearWorkout} className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    Clear All
                  </button>
                </div>
              </div>
            </div>

            {/* Workout Summary */}
            {selectedExercises.length > 0 && (
              <div className="mt-12 bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Workout Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600">{selectedExercises.length}</div>
                    <div className="text-gray-600 dark:text-gray-400">Exercises</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600">{selectedExercises.reduce((total, ex) => total + ex.sets, 0)}</div>
                    <div className="text-gray-600 dark:text-gray-400">Total Sets</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-600">
                      {Math.round(selectedExercises.reduce((total, ex) => total + ex.sets * getRepsAsNumber(ex.reps), 0) / 60)}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">Est. Minutes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{Math.round(selectedExercises.reduce((total, ex) => total + ex.rest, 0) / 60)}</div>
                    <div className="text-gray-600 dark:text-gray-400">Rest Time (min)</div>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          /* Saved Workouts View */
          <div className="space-y-6">
            {savedWorkouts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <p className="text-gray-500 dark:text-gray-400 text-lg">No saved workouts yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedWorkouts.map((workout) => (
                  <div key={workout.id} className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{workout.name}</h3>
                      <button onClick={() => deleteWorkout(workout.id)} className="text-red-500 hover:text-red-700">🗑️</button>
                    </div>
                    <div className="space-y-2 mb-4 text-sm flex-grow">
                      <div className="flex justify-between"><span>Exercises:</span><span>{workout.exercises.length}</span></div>
                      <div className="flex justify-between"><span>Duration:</span><span>{workout.totalDuration} min</span></div>
                      <div className="flex justify-between"><span>Calories:</span><span>~{workout.totalCalories} kcal</span></div>
                      <div className="flex justify-between"><span>Difficulty:</span><span>{workout.difficulty}</span></div>
                    </div>
                    <button
                      onClick={() => loadWorkout(workout)}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-lg font-semibold"
                    >
                      Load Workout
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

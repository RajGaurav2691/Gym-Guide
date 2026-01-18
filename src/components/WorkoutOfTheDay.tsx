'use client';

import { useState, useEffect } from 'react';

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  duration?: number;
  caloriesBurned?: number;
  instructions?: string[];
  tips?: string;
}

interface Workout {
  id: number;
  name: string;
  difficulty: string;
  duration: string;
  calories: string;
  type: string;
  exercises: Exercise[];
  description: string;
  warmup?: Exercise[];
  cooldown?: Exercise[];
}

export default function WorkoutOfTheDay() {
  const [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [isResting, setIsResting] = useState(false);
  const [restTimeLeft, setRestTimeLeft] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<boolean[]>([]);
  const [workoutPhase, setWorkoutPhase] = useState<'warmup' | 'main' | 'cooldown'>('main');
  const [showInstructions, setShowInstructions] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const workouts: Workout[] = [
    {
      id: 1,
      name: "HIIT Power Blast",
      difficulty: "Intermediate",
      duration: "25 minutes",
      calories: "300-400",
      type: "HIIT",
      description: "High-intensity interval training to boost metabolism and burn calories",
      warmup: [
        { name: "Jumping Jacks", sets: 1, reps: "30 sec", rest: "15 sec", duration: 1, caloriesBurned: 10 },
        { name: "Arm Circles", sets: 1, reps: "20 each direction", rest: "15 sec", duration: 1, caloriesBurned: 5 }
      ],
      exercises: [
        { 
          name: "Burpees", 
          sets: 4, 
          reps: "30 sec", 
          rest: "30 sec", 
          duration: 2, 
          caloriesBurned: 50,
          instructions: ["Start standing", "Squat down, hands on floor", "Jump feet back to plank", "Do push-up (optional)", "Jump feet forward", "Jump up with arms overhead"],
          tips: "Keep core tight throughout the movement. Modify by stepping back instead of jumping."
        },
        { 
          name: "Mountain Climbers", 
          sets: 4, 
          reps: "30 sec", 
          rest: "30 sec", 
          duration: 2, 
          caloriesBurned: 45,
          instructions: ["Start in plank position", "Drive right knee to chest", "Quickly switch legs", "Keep hips level", "Maintain steady rhythm"],
          tips: "Focus on keeping your core engaged and avoiding bouncing your hips up and down."
        },
        { 
          name: "Jump Squats", 
          sets: 4, 
          reps: "30 sec", 
          rest: "30 sec", 
          duration: 2, 
          caloriesBurned: 40,
          instructions: ["Stand with feet shoulder-width apart", "Squat down keeping chest up", "Explode up into a jump", "Land softly with bent knees", "Immediately go into next squat"],
          tips: "Land softly to protect your knees. Focus on proper squat form even when tired."
        },
        { 
          name: "High Knees", 
          sets: 4, 
          reps: "30 sec", 
          rest: "30 sec", 
          duration: 2, 
          caloriesBurned: 35,
          instructions: ["Stand tall with arms at sides", "Drive right knee up to chest", "Quickly switch to left knee", "Pump arms for momentum", "Stay on balls of feet"],
          tips: "Keep your torso upright and drive knees as high as possible for maximum benefit."
        },
        { 
          name: "Push-ups", 
          sets: 4, 
          reps: "30 sec", 
          rest: "30 sec", 
          duration: 2, 
          caloriesBurned: 30,
          instructions: ["Start in plank position", "Lower body as one unit", "Keep elbows at 45-degree angle", "Push back to start", "Maintain straight line from head to heels"],
          tips: "Modify on knees if needed. Focus on quality over quantity."
        },
        { 
          name: "Plank", 
          sets: 4, 
          reps: "30 sec", 
          rest: "30 sec", 
          duration: 2, 
          caloriesBurned: 25,
          instructions: ["Start in forearm plank", "Keep body in straight line", "Engage core and glutes", "Breathe normally", "Hold position"],
          tips: "Don't let hips sag or pike up. Quality over duration - maintain perfect form."
        }
      ],
      cooldown: [
        { name: "Deep Breathing", sets: 1, reps: "10 breaths", rest: "0 sec", duration: 2, caloriesBurned: 5 },
        { name: "Quad Stretch", sets: 1, reps: "30 sec each leg", rest: "0 sec", duration: 1, caloriesBurned: 5 }
      ]
    },
    {
      id: 2,
      name: "Strength & Power",
      difficulty: "Advanced",
      duration: "45 minutes",
      calories: "400-500",
      type: "Strength",
      description: "Build strength and muscle with compound movements",
      exercises: [
        { name: "Squats", sets: 4, reps: "8-10", rest: "2 min", duration: 3, caloriesBurned: 60 },
        { name: "Deadlifts", sets: 4, reps: "6-8", rest: "3 min", duration: 4, caloriesBurned: 80 },
        { name: "Bench Press", sets: 4, reps: "8-10", rest: "2 min", duration: 3, caloriesBurned: 70 },
        { name: "Pull-ups", sets: 3, reps: "6-10", rest: "2 min", duration: 3, caloriesBurned: 50 },
        { name: "Overhead Press", sets: 3, reps: "8-10", rest: "2 min", duration: 3, caloriesBurned: 45 },
        { name: "Plank", sets: 3, reps: "60 sec", rest: "1 min", duration: 2, caloriesBurned: 30 }
      ]
    },
    {
      id: 3,
      name: "Core Crusher",
      difficulty: "Beginner",
      duration: "20 minutes",
      calories: "200-250",
      type: "Core",
      description: "Target your core with this focused ab workout",
      exercises: [
        { name: "Plank", sets: 3, reps: "30-60 sec", rest: "30 sec", duration: 2, caloriesBurned: 25 },
        { name: "Russian Twists", sets: 3, reps: "20 each side", rest: "30 sec", duration: 2, caloriesBurned: 30 },
        { name: "Mountain Climbers", sets: 3, reps: "20 each leg", rest: "30 sec", duration: 2, caloriesBurned: 35 },
        { name: "Bicycle Crunches", sets: 3, reps: "20 each side", rest: "30 sec", duration: 2, caloriesBurned: 25 },
        { name: "Dead Bug", sets: 3, reps: "10 each side", rest: "30 sec", duration: 2, caloriesBurned: 20 },
        { name: "Hollow Hold", sets: 3, reps: "20-30 sec", rest: "30 sec", duration: 1, caloriesBurned: 15 }
      ]
    }
  ];

  useEffect(() => {
    // Get today's workout (rotate based on day of week)
    const today = new Date().getDay();
    const workoutIndex = today % workouts.length;
    const selectedWorkout = workouts[workoutIndex];
    setCurrentWorkout(selectedWorkout);
    setCompletedExercises(new Array(selectedWorkout.exercises.length).fill(false));
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && !isResting) {
      interval = setInterval(() => {
        setTimeElapsed(timeElapsed => timeElapsed + 1);
      }, 1000);
    } else if (isActive && isResting && restTimeLeft > 0) {
      interval = setInterval(() => {
        setRestTimeLeft(time => {
          if (time <= 1) {
            setIsResting(false);
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isResting, restTimeLeft, timeElapsed]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startWorkout = () => {
    setIsActive(true);
    setTimeElapsed(0);
    setCurrentExerciseIndex(0);
    setCurrentSet(1);
    setIsCompleted(false);
  };

  const pauseWorkout = () => {
    setIsActive(false);
  };

  const resumeWorkout = () => {
    setIsActive(true);
  };

  const completeExercise = (index: number) => {
    const newCompleted = [...completedExercises];
    newCompleted[index] = true;
    setCompletedExercises(newCompleted);
    
    // Check if all exercises are completed
    if (newCompleted.every(completed => completed)) {
      completeWorkout();
    }
  };

  const completeWorkout = () => {
    setIsActive(false);
    setIsCompleted(true);
  };

  const resetWorkout = () => {
    setTimeElapsed(0);
    setIsActive(false);
    setIsCompleted(false);
    setCurrentExerciseIndex(0);
    setCurrentSet(1);
    setIsResting(false);
    setRestTimeLeft(0);
    if (currentWorkout) {
      setCompletedExercises(new Array(currentWorkout.exercises.length).fill(false));
    }
  };

  const startRest = (restDuration: string) => {
    const seconds = parseInt(restDuration.split(' ')[0]) || 30;
    setRestTimeLeft(seconds);
    setIsResting(true);
  };

  const skipRest = () => {
    setIsResting(false);
    setRestTimeLeft(0);
  };

  const nextExercise = () => {
    if (currentWorkout && currentExerciseIndex < currentWorkout.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setCurrentSet(1);
    }
  };

  const previousExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
      setCurrentSet(1);
    }
  };

  const openExerciseInstructions = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setShowInstructions(true);
  };

  const closeInstructions = () => {
    setShowInstructions(false);
    setSelectedExercise(null);
  };

  if (!currentWorkout) {
    return (
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading today's workout...</p>
          </div>
        </div>
      </section>
    );
  }

  const currentExercise = currentWorkout.exercises[currentExerciseIndex];
  const progressPercentage = ((currentExerciseIndex + 1) / currentWorkout.exercises.length) * 100;

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900" id="workout-of-day">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-poppins">
            Workout of the Day
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Ready for today's challenge? Let's get moving!
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Workout Header */}
          <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-6 sm:p-8 text-white mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex-1">
                <h3 className="text-2xl sm:text-3xl font-bold mb-2">{currentWorkout.name}</h3>
                <p className="text-base sm:text-lg opacity-90 mb-4">{currentWorkout.description}</p>
                <div className="flex flex-wrap gap-3 sm:gap-4 text-sm">
                  <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full flex items-center">
                    ⏱️ {currentWorkout.duration}
                  </span>
                  <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full flex items-center">
                    🔥 {currentWorkout.calories} cal
                  </span>
                  <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full flex items-center">
                    💪 {currentWorkout.difficulty}
                  </span>
                  <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full flex items-center">
                    🏷️ {currentWorkout.type}
                  </span>
                </div>
              </div>
              <div className="mt-6 md:mt-0 text-center">
                <div className="text-3xl sm:text-4xl font-bold mb-2">{formatTime(timeElapsed)}</div>
                <div className="text-sm opacity-90">Time Elapsed</div>
                {isResting && (
                  <div className="mt-2">
                    <div className="text-2xl font-bold text-yellow-300">{formatTime(restTimeLeft)}</div>
                    <div className="text-xs opacity-75">Rest Time</div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Progress</span>
                <span>{currentExerciseIndex + 1} / {currentWorkout.exercises.length} exercises</span>
              </div>
              <div className="bg-white bg-opacity-20 rounded-full h-2">
                <div 
                  className="bg-white rounded-full h-2 transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Timer and Controls */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 sm:p-8 mb-8">
            {isResting ? (
              <div className="text-center">
                <h4 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  💤 Rest Time
                </h4>
                <div className="text-4xl sm:text-5xl font-bold text-yellow-600 mb-4">{formatTime(restTimeLeft)}</div>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={skipRest}
                    className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                  >
                    ⏭️ Skip Rest
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center justify-between">
                <div className="text-center sm:text-left mb-4 sm:mb-0">
                  <h4 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {isCompleted ? '🎉 Workout Complete!' : isActive ? '💪 Working Out' : '⏱️ Ready to Start'}
                  </h4>
                  <div className="text-2xl sm:text-3xl font-bold text-red-600">{formatTime(timeElapsed)}</div>
                </div>
                
                <div className="flex gap-3 sm:gap-4">
                  {!isCompleted ? (
                    <>
                      {!isActive ? (
                        <button
                          onClick={startWorkout}
                          className="bg-green-500 text-white px-4 sm:px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center gap-2"
                        >
                          ▶️ Start Workout
                        </button>
                      ) : (
                        <button
                          onClick={pauseWorkout}
                          className="bg-yellow-500 text-white px-4 sm:px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors flex items-center gap-2"
                        >
                          ⏸️ Pause
                        </button>
                      )}
                      {timeElapsed > 0 && (
                        <button
                          onClick={completeWorkout}
                          className="bg-red-500 text-white px-4 sm:px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors flex items-center gap-2"
                        >
                          ✅ Complete
                        </button>
                      )}
                    </>
                  ) : (
                    <button
                      onClick={resetWorkout}
                      className="bg-blue-500 text-white px-4 sm:px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center gap-2"
                    >
                      🔄 Start Over
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Exercise List */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg mb-8">
            <h4 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              🏋️ Exercises
              <span className="text-sm font-normal text-gray-500">({completedExercises.filter(Boolean).length}/{currentWorkout.exercises.length})</span>
            </h4>
            <div className="space-y-4">
              {currentWorkout.exercises.map((exercise, index) => (
                <div 
                  key={index} 
                  className={`flex items-center justify-between p-4 border rounded-lg transition-all ${
                    completedExercises[index] 
                      ? 'border-green-300 bg-green-50 dark:bg-green-900/20 dark:border-green-600' 
                      : currentExerciseIndex === index && isActive
                      ? 'border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-600 ring-2 ring-red-200 dark:ring-red-800'
                      : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      completedExercises[index] 
                        ? 'bg-green-500 text-white' 
                        : currentExerciseIndex === index && isActive
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                    }`}>
                      {completedExercises[index] ? '✓' : index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h5 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">{exercise.name}</h5>
                        {currentExerciseIndex === index && isActive && (
                          <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-xs rounded-full animate-pulse">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        {exercise.sets} sets × {exercise.reps}
                        {exercise.rest && exercise.rest !== '0 sec' && ` • ${exercise.rest} rest`}
                        {exercise.caloriesBurned && ` • ${exercise.caloriesBurned} cal`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    {exercise.instructions && (
                      <button 
                        onClick={() => openExerciseInstructions(exercise)}
                        className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                        title="View Instructions"
                      >
                        📝
                      </button>
                    )}
                    <button 
                      onClick={() => completeExercise(index)}
                      disabled={completedExercises[index]}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        completedExercises[index]
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 cursor-not-allowed'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900 hover:text-green-800 dark:hover:text-green-200'
                      }`}
                    >
                      {completedExercises[index] ? '✓ Done' : 'Mark Done'}
                    </button>
                    {exercise.rest && exercise.rest !== '0 sec' && !completedExercises[index] && (
                      <button
                        onClick={() => startRest(exercise.rest!)}
                        className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-lg text-sm font-medium hover:bg-yellow-200 dark:hover:bg-yellow-800 transition-colors"
                      >
                        💤 Rest
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Exercise Navigation */}
            {isActive && (
              <div className="mt-6 flex justify-center gap-4">
                <button
                  onClick={previousExercise}
                  disabled={currentExerciseIndex === 0}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ← Previous
                </button>
                <button
                  onClick={nextExercise}
                  disabled={currentExerciseIndex === currentWorkout.exercises.length - 1}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next →
                </button>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 sm:p-6 text-center">
              <div className="text-xl sm:text-2xl font-bold text-red-600">{currentWorkout.exercises.length}</div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Exercises</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 sm:p-6 text-center">
              <div className="text-xl sm:text-2xl font-bold text-orange-600">
                {currentWorkout.exercises.reduce((total, ex) => total + ex.sets, 0)}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Total Sets</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 sm:p-6 text-center">
              <div className="text-xl sm:text-2xl font-bold text-yellow-600">{currentWorkout.duration}</div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Duration</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 sm:p-6 text-center">
              <div className="text-xl sm:text-2xl font-bold text-green-600">{currentWorkout.calories}</div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Calories</div>
            </div>
          </div>
        </div>
      </div>

      {/* Exercise Instructions Modal */}
      {showInstructions && selectedExercise && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 sm:p-8">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  {selectedExercise.name}
                </h3>
                <button
                  onClick={closeInstructions}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-center">
                    <div className="text-lg font-bold text-red-600">{selectedExercise.sets}</div>
                    <div className="text-xs text-gray-500">Sets</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-600">{selectedExercise.reps}</div>
                    <div className="text-xs text-gray-500">Reps</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-yellow-600">{selectedExercise.rest}</div>
                    <div className="text-xs text-gray-500">Rest</div>
                  </div>
                </div>

                {selectedExercise.instructions && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                      📝 Instructions
                    </h4>
                    <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300">
                      {selectedExercise.instructions.map((instruction, index) => (
                        <li key={index} className="leading-relaxed">{instruction}</li>
                      ))}
                    </ol>
                  </div>
                )}

                {selectedExercise.tips && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                      💡 Pro Tip
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 italic bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
                      {selectedExercise.tips}
                    </p>
                  </div>
                )}

                <div className="flex gap-4">
                  <button 
                    onClick={closeInstructions}
                    className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-red-600 hover:to-orange-600 transition-all duration-200"
                  >
                    Got it!
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


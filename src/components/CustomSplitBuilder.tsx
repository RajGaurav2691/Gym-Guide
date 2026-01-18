'use client';

import { useState } from 'react';

export default function CustomSplitBuilder() {
  const [splitName, setSplitName] = useState('');
  const [daysPerWeek, setDaysPerWeek] = useState(3);
  const [selectedDays, setSelectedDays] = useState([]);
  const [workoutDays, setWorkoutDays] = useState({});
  const [dragOver, setDragOver] = useState(false);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  const availableExercises = [
    { id: 1, name: 'Push-ups', category: 'Chest', equipment: 'Bodyweight' },
    { id: 2, name: 'Squats', category: 'Legs', equipment: 'Bodyweight' },
    { id: 3, name: 'Plank', category: 'Core', equipment: 'Bodyweight' },
    { id: 4, name: 'Bench Press', category: 'Chest', equipment: 'Barbell' },
    { id: 5, name: 'Deadlifts', category: 'Back', equipment: 'Barbell' },
    { id: 6, name: 'Pull-ups', category: 'Back', equipment: 'Pull-up Bar' },
    { id: 7, name: 'Lunges', category: 'Legs', equipment: 'Bodyweight' },
    { id: 8, name: 'Shoulder Press', category: 'Shoulders', equipment: 'Dumbbells' },
    { id: 9, name: 'Bicep Curls', category: 'Arms', equipment: 'Dumbbells' },
    { id: 10, name: 'Tricep Dips', category: 'Arms', equipment: 'Bodyweight' }
  ];

  const handleDaySelect = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
      const newWorkoutDays = { ...workoutDays };
      delete newWorkoutDays[day];
      setWorkoutDays(newWorkoutDays);
    } else if (selectedDays.length < daysPerWeek) {
      setSelectedDays([...selectedDays, day]);
      setWorkoutDays({ ...workoutDays, [day]: [] });
    }
  };

  const addExerciseToDay = (day, exercise) => {
    const newExercise = { ...exercise, sets: 3, reps: 10, rest: 60 };
    setWorkoutDays({
      ...workoutDays,
      [day]: [...(workoutDays[day] || []), newExercise]
    });
  };

  const removeExerciseFromDay = (day, exerciseIndex) => {
    const newWorkoutDays = { ...workoutDays };
    newWorkoutDays[day] = newWorkoutDays[day].filter((_, index) => index !== exerciseIndex);
    setWorkoutDays(newWorkoutDays);
  };

  const updateExercise = (day, exerciseIndex, field, value) => {
    const newWorkoutDays = { ...workoutDays };
    newWorkoutDays[day][exerciseIndex][field] = value;
    setWorkoutDays(newWorkoutDays);
  };

  const saveSplit = () => {
    if (!splitName.trim()) {
      alert('Please enter a split name');
      return;
    }
    if (selectedDays.length === 0) {
      alert('Please select at least one training day');
      return;
    }
    alert(`Custom split "${splitName}" saved successfully!`);
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-poppins">
            Custom Split Builder
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Design your own training split with drag-and-drop functionality
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Split Configuration */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg sticky top-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Split Configuration</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Split Name
                  </label>
                  <input
                    type="text"
                    value={splitName}
                    onChange={(e) => setSplitName(e.target.value)}
                    placeholder="e.g., My Custom Split"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Days per Week: {daysPerWeek}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="7"
                    value={daysPerWeek}
                    onChange={(e) => setDaysPerWeek(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1</span>
                    <span>7</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Select Training Days
                  </label>
                  <div className="space-y-2">
                    {daysOfWeek.map((day) => (
                      <button
                        key={day}
                        onClick={() => handleDaySelect(day)}
                        disabled={!selectedDays.includes(day) && selectedDays.length >= daysPerWeek}
                        className={`w-full p-3 rounded-lg text-left transition-all ${
                          selectedDays.includes(day)
                            ? 'bg-purple-500 text-white'
                            : selectedDays.length >= daysPerWeek
                            ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-gray-600'
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={saveSplit}
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-200"
                >
                  Save Split
                </button>
              </div>
            </div>
          </div>

          {/* Workout Days */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {selectedDays.map((day) => (
                <div key={day} className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{day}</h3>
                  
                  {workoutDays[day] && workoutDays[day].length > 0 ? (
                    <div className="space-y-4">
                      {workoutDays[day].map((exercise, index) => (
                        <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">{exercise.name}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{exercise.category} • {exercise.equipment}</p>
                            </div>
                            <button
                              onClick={() => removeExerciseFromDay(day, index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Sets
                              </label>
                              <input
                                type="number"
                                value={exercise.sets}
                                onChange={(e) => updateExercise(day, index, 'sets', parseInt(e.target.value))}
                                className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm"
                                min="1"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Reps
                              </label>
                              <input
                                type="number"
                                value={exercise.reps}
                                onChange={(e) => updateExercise(day, index, 'reps', parseInt(e.target.value))}
                                className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm"
                                min="1"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Rest (sec)
                              </label>
                              <input
                                type="number"
                                value={exercise.rest}
                                onChange={(e) => updateExercise(day, index, 'rest', parseInt(e.target.value))}
                                className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm"
                                min="0"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      <div className="text-4xl mb-4">🏋️</div>
                      <p>Add exercises to this day</p>
                    </div>
                  )}

                  {/* Exercise Library for this day */}
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Add Exercises</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-48 overflow-y-auto">
                      {availableExercises.map((exercise) => (
                        <button
                          key={exercise.id}
                          onClick={() => addExerciseToDay(day, exercise)}
                          className="p-3 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <div className="font-medium text-gray-900 dark:text-white">{exercise.name}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">{exercise.category}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {selectedDays.length === 0 && (
                <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
                  <div className="text-6xl mb-4">📅</div>
                  <p className="text-gray-500 dark:text-gray-400">Select training days to start building your split</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Split Summary */}
        {selectedDays.length > 0 && (
          <div className="mt-12 bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Split Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{selectedDays.length}</div>
                <div className="text-gray-600 dark:text-gray-400">Training Days</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {Object.values(workoutDays).flat().length}
                </div>
                <div className="text-gray-600 dark:text-gray-400">Total Exercises</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {Object.values(workoutDays).reduce((total, day) => total + day.reduce((dayTotal, ex) => dayTotal + ex.sets, 0), 0)}
                </div>
                <div className="text-gray-600 dark:text-gray-400">Total Sets</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">
                  {Math.round(Object.values(workoutDays).reduce((total, day) => total + day.reduce((dayTotal, ex) => dayTotal + (ex.sets * ex.reps), 0), 0) / 60)}
                </div>
                <div className="text-gray-600 dark:text-gray-400">Est. Minutes</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
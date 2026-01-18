'use client';

import { useState } from 'react';

export default function ProgramCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [completedWorkouts, setCompletedWorkouts] = useState(new Set());

  const programs = [
    { id: 1, name: 'Push/Pull/Legs', color: 'bg-red-500' },
    { id: 2, name: 'Upper/Lower', color: 'bg-blue-500' },
    { id: 3, name: '5/3/1 Strength', color: 'bg-green-500' },
    { id: 4, name: 'HIIT Fat Burner', color: 'bg-orange-500' }
  ];

  const workoutSchedule = {
    '2024-09-15': { program: 'Push/Pull/Legs', workout: 'Push Day', exercises: 6 },
    '2024-09-16': { program: 'Push/Pull/Legs', workout: 'Pull Day', exercises: 5 },
    '2024-09-17': { program: 'Push/Pull/Legs', workout: 'Legs Day', exercises: 7 },
    '2024-09-18': { program: 'Push/Pull/Legs', workout: 'Push Day', exercises: 6 },
    '2024-09-19': { program: 'Push/Pull/Legs', workout: 'Pull Day', exercises: 5 },
    '2024-09-20': { program: 'Push/Pull/Legs', workout: 'Legs Day', exercises: 7 },
    '2024-09-21': { program: 'Rest Day', workout: 'Rest', exercises: 0 }
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const isToday = (date) => {
    const today = new Date();
    return date && date.toDateString() === today.toDateString();
  };

  const isWorkoutDay = (date) => {
    if (!date) return false;
    const dateStr = formatDate(date);
    return workoutSchedule[dateStr];
  };

  const toggleWorkoutCompletion = (date) => {
    const dateStr = formatDate(date);
    const newCompleted = new Set(completedWorkouts);
    if (newCompleted.has(dateStr)) {
      newCompleted.delete(dateStr);
    } else {
      newCompleted.add(dateStr);
    }
    setCompletedWorkouts(newCompleted);
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + direction, 1));
  };

  const days = getDaysInMonth(currentMonth);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-poppins">
            Program Calendar
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Track your workout schedule and progress with our interactive calendar
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
              {/* Calendar Header */}
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-6 text-white">
                <div className="flex items-center justify-between">
                    <button
                      onClick={() => navigateMonth(-1)}
                      className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                    >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                  <h3 className="text-2xl font-bold">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </h3>
                    <button
                      onClick={() => navigateMonth(1)}
                      className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                    >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="p-6">
                {/* Day Headers */}
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="text-center text-sm font-semibold text-gray-600 dark:text-gray-400 py-2">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-1">
                  {days.map((day, index) => {
                    if (!day) {
                      return <div key={index} className="h-20"></div>;
                    }

                    const dateStr = formatDate(day);
                    const workout = workoutSchedule[dateStr];
                    const isCompleted = completedWorkouts.has(dateStr);
                    const isWorkout = isWorkoutDay(day);
                    const isCurrentDay = isToday(day);

                    return (
                      <div
                        key={index}
                        className={`h-20 p-2 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                          isCurrentDay ? 'bg-blue-100 dark:bg-blue-900 border-blue-300' : ''
                        } ${isWorkout ? 'bg-green-50 dark:bg-green-900' : ''} ${
                          isCompleted ? 'bg-green-200 dark:bg-green-800' : ''
                        }`}
                        onClick={() => isWorkout && toggleWorkoutCompletion(day)}
                      >
                        <div className="flex flex-col h-full">
                          <div className={`text-sm font-semibold ${
                            isCurrentDay ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'
                          }`}>
                            {day.getDate()}
                            </div>
                            {workout && (
                            <div className="flex-1 flex flex-col justify-center">
                              <div className={`text-xs px-2 py-1 rounded ${
                                workout.program === 'Rest Day' 
                                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                                  : 'bg-green-500 text-white'
                              }`}>
                                {workout.workout}
                              </div>
                              {workout.exercises > 0 && (
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  {workout.exercises} exercises
                                </div>
                              )}
                              </div>
                            )}
                          {isCompleted && (
                            <div className="text-green-600 text-lg">✓</div>
                        )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Program Selector */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Active Program</h4>
              <div className="space-y-3">
                {programs.map((program) => (
                  <button
                    key={program.id}
                    onClick={() => setSelectedProgram(program)}
                    className={`w-full p-3 rounded-lg text-left transition-all ${
                      selectedProgram?.id === program.id
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${program.color}`}></div>
                      <span className="font-medium">{program.name}</span>
                  </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Progress Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">This Month</h4>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Workouts Completed</span>
                  <span className="font-semibold text-green-600">{completedWorkouts.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total Workouts</span>
                  <span className="font-semibold">{Object.keys(workoutSchedule).length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Completion Rate</span>
                  <span className="font-semibold">
                    {Math.round((completedWorkouts.size / Object.keys(workoutSchedule).length) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(completedWorkouts.size / Object.keys(workoutSchedule).length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Legend</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-green-200 dark:bg-green-800 rounded"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Workout Day</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Completed</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-blue-100 dark:bg-blue-900 rounded"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Today</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Rest Day</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
'use client';

import { useState } from 'react';

export default function TrackersSection() {
  const [waterIntake, setWaterIntake] = useState(0);
  const [sleepHours, setSleepHours] = useState(0);
  const [sleepQuality, setSleepQuality] = useState(5);
  const [mood, setMood] = useState(5);
  const [energy, setEnergy] = useState(5);

  const waterGoal = 8; // 8 glasses per day
  const sleepGoal = 8; // 8 hours per night

  const waterGlasses = Array.from({ length: 12 }, (_, i) => i + 1);
  const moodLevels = [
    { value: 1, label: 'Very Low', emoji: '😞', color: 'bg-red-500' },
    { value: 2, label: 'Low', emoji: '😔', color: 'bg-orange-500' },
    { value: 3, label: 'Below Average', emoji: '😐', color: 'bg-yellow-500' },
    { value: 4, label: 'Average', emoji: '🙂', color: 'bg-yellow-400' },
    { value: 5, label: 'Good', emoji: '😊', color: 'bg-green-400' },
    { value: 6, label: 'Very Good', emoji: '😄', color: 'bg-green-500' },
    { value: 7, label: 'Excellent', emoji: '🤩', color: 'bg-blue-500' }
  ];

  const addWater = (glasses) => {
    setWaterIntake(prev => Math.min(prev + glasses, 12));
  };

  const resetWater = () => {
    setWaterIntake(0);
  };

  const saveSleep = () => {
    // In a real app, this would save to a database
    alert(`Sleep logged: ${sleepHours} hours, Quality: ${sleepQuality}/10`);
  };

  const saveMood = () => {
    // In a real app, this would save to a database
    alert(`Mood logged: ${moodLevels.find(m => m.value === mood)?.label}`);
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-poppins">
            Daily Trackers
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Track your daily habits and wellness metrics to optimize your fitness journey
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Water Tracker */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-4xl">💧</span>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Water Tracker</h3>
                <p className="text-gray-600 dark:text-gray-300">Track your daily hydration</p>
              </div>
            </div>

            <div className="text-center mb-8">
              <div className="text-6xl font-bold text-blue-600 mb-2">{waterIntake}</div>
              <div className="text-xl text-gray-600 dark:text-gray-300">Glasses Today</div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mt-4">
                <div
                  className="bg-blue-500 h-4 rounded-full transition-all duration-300"
                  style={{ width: `${(waterIntake / waterGoal) * 100}%` }}
                ></div>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                {waterIntake}/{waterGoal} glasses
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3 mb-6">
              {waterGlasses.slice(0, 8).map((glass) => (
                <button
                  key={glass}
                  onClick={() => addWater(1)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    waterIntake >= glass
                      ? 'bg-blue-500 border-blue-500 text-white'
                      : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-500'
                  }`}
                >
                  <div className="text-2xl">🥤</div>
                  <div className="text-xs mt-1">{glass}</div>
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => addWater(1)}
                className="flex-1 bg-blue-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
              >
                +1 Glass
              </button>
              <button
                onClick={resetWater}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Sleep Tracker */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-4xl">😴</span>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Sleep Tracker</h3>
                <p className="text-gray-600 dark:text-gray-300">Log your sleep quality</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Hours Slept
                </label>
                <input
                  type="number"
                  value={sleepHours}
                  onChange={(e) => setSleepHours(parseFloat(e.target.value))}
                  min="0"
                  max="12"
                  step="0.5"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="8"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Sleep Quality (1-10)
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={sleepQuality}
                  onChange={(e) => setSleepQuality(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Poor (1)</span>
                  <span className="font-semibold">{sleepQuality}/10</span>
                  <span>Excellent (10)</span>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Sleep Analysis</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Hours:</span>
                    <span className="font-semibold">{sleepHours}h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Quality:</span>
                    <span className="font-semibold">{sleepQuality}/10</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Goal:</span>
                    <span className={`font-semibold ${sleepHours >= sleepGoal ? 'text-green-600' : 'text-red-600'}`}>
                      {sleepHours >= sleepGoal ? 'Met' : 'Not Met'}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={saveSleep}
                className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
              >
                Log Sleep
              </button>
            </div>
          </div>

          {/* Mood & Energy Tracker */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-4xl">😊</span>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Mood Tracker</h3>
                <p className="text-gray-600 dark:text-gray-300">Track your daily mood</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                  How are you feeling today?
                </label>
                <div className="grid grid-cols-7 gap-2">
                  {moodLevels.map((level) => (
                    <button
                      key={level.value}
                      onClick={() => setMood(level.value)}
                      className={`p-3 rounded-lg text-center transition-all ${
                        mood === level.value
                          ? `${level.color} text-white shadow-lg`
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      <div className="text-2xl mb-1">{level.emoji}</div>
                      <div className="text-xs">{level.value}</div>
                    </button>
                  ))}
                </div>
                <div className="text-center mt-2">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {moodLevels.find(m => m.value === mood)?.label}
                  </span>
                </div>
              </div>

              <button
                onClick={saveMood}
                className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
              >
                Log Mood
              </button>
            </div>
          </div>

          {/* Energy Tracker */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-4xl">⚡</span>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Energy Tracker</h3>
                <p className="text-gray-600 dark:text-gray-300">Track your energy levels</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Energy Level (1-10)
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={energy}
                  onChange={(e) => setEnergy(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Low (1)</span>
                  <span className="font-semibold">{energy}/10</span>
                  <span>High (10)</span>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Energy Analysis</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Current Level:</span>
                    <span className="font-semibold">{energy}/10</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Status:</span>
                    <span className={`font-semibold ${
                      energy >= 7 ? 'text-green-600' : energy >= 4 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {energy >= 7 ? 'High' : energy >= 4 ? 'Moderate' : 'Low'}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => alert(`Energy logged: ${energy}/10`)}
                className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
              >
                Log Energy
              </button>
            </div>
          </div>
        </div>

        {/* Weekly Summary */}
        <div className="mt-12 bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Weekly Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">56</div>
              <div className="text-gray-600 dark:text-gray-300">Glasses of Water</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">7.2h</div>
              <div className="text-gray-600 dark:text-gray-300">Avg Sleep</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">6.8</div>
              <div className="text-gray-600 dark:text-gray-300">Avg Mood</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">7.1</div>
              <div className="text-gray-600 dark:text-gray-300">Avg Energy</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


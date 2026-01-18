'use client';

import { useState } from 'react';

interface MacroData {
  current: number;
  target: number;
  unit: string;
}

interface DayData {
  day: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface Micronutrient {
  name: string;
  current: number;
  target: number;
  unit: string;
  color: string;
  benefits: string;
}

export default function NutritionCharts() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [waterIntake, setWaterIntake] = useState(6);
  const [selectedMacro, setSelectedMacro] = useState<string | null>(null);

  const periods = [
    { id: 'day', name: 'Today', icon: '🌅' },
    { id: 'week', name: 'This Week', icon: '📅' },
    { id: 'month', name: 'This Month', icon: '📆' }
  ];

  const macroData: { [key: string]: MacroData } = {
    protein: { current: 120, target: 150, unit: 'g' },
    carbs: { current: 200, target: 250, unit: 'g' },
    fat: { current: 80, target: 90, unit: 'g' },
    calories: { current: 1800, target: 2200, unit: 'cal' }
  };

  const weeklyData: DayData[] = [
    { day: 'Mon', calories: 2100, protein: 140, carbs: 220, fat: 85 },
    { day: 'Tue', calories: 1950, protein: 130, carbs: 200, fat: 75 },
    { day: 'Wed', calories: 2300, protein: 160, carbs: 250, fat: 95 },
    { day: 'Thu', calories: 1800, protein: 120, carbs: 180, fat: 70 },
    { day: 'Fri', calories: 2200, protein: 150, carbs: 240, fat: 90 },
    { day: 'Sat', calories: 2500, protein: 170, carbs: 280, fat: 110 },
    { day: 'Sun', calories: 1900, protein: 125, carbs: 190, fat: 80 }
  ];

  const micronutrients: Micronutrient[] = [
    { name: 'Vitamin C', current: 85, target: 100, unit: 'mg', color: 'bg-orange-500', benefits: 'Immune system support' },
    { name: 'Iron', current: 12, target: 18, unit: 'mg', color: 'bg-red-500', benefits: 'Oxygen transport' },
    { name: 'Calcium', current: 800, target: 1000, unit: 'mg', color: 'bg-blue-500', benefits: 'Bone health' },
    { name: 'Zinc', current: 8, target: 11, unit: 'mg', color: 'bg-yellow-500', benefits: 'Wound healing' },
    { name: 'Magnesium', current: 280, target: 400, unit: 'mg', color: 'bg-green-500', benefits: 'Muscle function' },
    { name: 'Vitamin D', current: 15, target: 20, unit: 'mcg', color: 'bg-purple-500', benefits: 'Bone & immune health' }
  ];

  const addWater = () => {
    if (waterIntake < 12) {
      setWaterIntake(prev => prev + 1);
    }
  };

  const removeWater = () => {
    if (waterIntake > 0) {
      setWaterIntake(prev => prev - 1);
    }
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-poppins">
            Nutrition Analytics Dashboard
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Track your nutritional intake with detailed charts and actionable insights
          </p>
        </div>

        {/* Period Selector */}
        <div className="flex justify-center mb-8 lg:mb-12">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
            {periods.map((period) => (
              <button
                key={period.id}
                onClick={() => setSelectedPeriod(period.id)}
                className={`flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all ${
                  selectedPeriod === period.id
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm transform scale-105'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <span className="text-lg">{period.icon}</span>
                <span className="text-sm sm:text-base">{period.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Macronutrients Overview */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Macronutrients</h3>
            <div className="space-y-6">
              {Object.entries(macroData).map(([macro, data]) => (
                <div key={macro}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                      {macro}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {data.current} / {data.target} {data.unit}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-500 ${
                        macro === 'protein' ? 'bg-red-500' :
                        macro === 'carbs' ? 'bg-blue-500' :
                        macro === 'fat' ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}
                      style={{ width: `${Math.min((data.current / data.target) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {Math.round((data.current / data.target) * 100)}% of target
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Trend Chart */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Weekly Trend</h3>
            <div className="space-y-4">
              {weeklyData.map((day, index) => (
                <div key={day.day} className="flex items-center space-x-4">
                  <div className="w-12 text-sm font-medium text-gray-600 dark:text-gray-400">
                    {day.day}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                      <span>Calories</span>
                      <span>{day.calories}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(day.calories / 2500) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                      <span>P: {day.protein}g</span>
                      <span>C: {day.carbs}g</span>
                      <span>F: {day.fat}g</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Micronutrients */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Micronutrients</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {micronutrients.map((nutrient) => (
              <div key={nutrient.name} className="bg-white dark:bg-gray-900 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {nutrient.name}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {nutrient.current} / {nutrient.target} {nutrient.unit}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${nutrient.color}`}
                    style={{ width: `${Math.min((nutrient.current / nutrient.target) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {Math.round((nutrient.current / nutrient.target) * 100)}% of daily requirement
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Water Intake */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900 dark:to-cyan-900 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Hydration Tracker</h3>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Water Intake Today
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">6 / 8 glasses</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                <div
                  className="bg-gradient-to-r from-blue-400 to-cyan-500 h-4 rounded-full transition-all duration-500"
                  style={{ width: '75%' }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                1.5L / 2L target
              </div>
            </div>
            <div className="ml-8">
              <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                + Add Water
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


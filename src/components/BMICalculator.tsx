'use client';

import { useState } from 'react';

export default function BMICalculator() {
  const [activeTab, setActiveTab] = useState('bmi');
  const [bmiData, setBmiData] = useState({
    height: '',
    weight: '',
    age: '',
    gender: 'male',
    activity: 'moderate'
  });
  const [bmiResult, setBmiResult] = useState<number | null>(null);
  const [calorieResult, setCalorieResult] = useState<number | null>(null);

  const activityLevels = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9
  };

  const calculateBMI = () => {
    const height = parseFloat(bmiData.height) / 100; // Convert cm to meters
    const weight = parseFloat(bmiData.weight);
    
    if (height && weight) {
      const bmi = weight / (height * height);
      setBmiResult(bmi);
    }
  };

  const calculateCalories = () => {
    const weight = parseFloat(bmiData.weight);
    const height = parseFloat(bmiData.height);
    const age = parseFloat(bmiData.age);
    
    if (weight && height && age) {
      // Harris-Benedict Equation
      let bmr;
      if (bmiData.gender === 'male') {
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
      } else {
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
      }
      
      const tdee = bmr * activityLevels[bmiData.activity as keyof typeof activityLevels];
      setCalorieResult(Math.round(tdee));
    }
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-600' };
    if (bmi < 25) return { category: 'Normal weight', color: 'text-green-600' };
    if (bmi < 30) return { category: 'Overweight', color: 'text-yellow-600' };
    return { category: 'Obese', color: 'text-red-600' };
  };

  const handleInputChange = (field: string, value: string) => {
    setBmiData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 font-poppins">
            Fitness Calculator
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Calculate your BMI and daily calorie needs to optimize your fitness journey
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('bmi')}
              className={`flex-1 py-4 px-6 text-lg font-semibold transition-colors ${
                activeTab === 'bmi'
                  ? 'bg-red-500 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              BMI Calculator
            </button>
            <button
              onClick={() => setActiveTab('calories')}
              className={`flex-1 py-4 px-6 text-lg font-semibold transition-colors ${
                activeTab === 'calories'
                  ? 'bg-red-500 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Calorie Calculator
            </button>
          </div>

          <div className="p-8">
            {activeTab === 'bmi' ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Calculate Your BMI</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Height (cm)
                      </label>
                      <input
                        type="number"
                        value={bmiData.height}
                        onChange={(e) => handleInputChange('height', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="170"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Weight (kg)
                      </label>
                      <input
                        type="number"
                        value={bmiData.weight}
                        onChange={(e) => handleInputChange('weight', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="70"
                      />
                    </div>
                    <button
                      onClick={calculateBMI}
                      className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-red-600 hover:to-orange-600 transition-all duration-200"
                    >
                      Calculate BMI
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Your BMI Result</h4>
                  {bmiResult ? (
                    <div className="text-center">
                      <div className="text-6xl font-bold text-red-600 mb-2">
                        {bmiResult.toFixed(1)}
                      </div>
                      <div className={`text-2xl font-semibold mb-4 ${getBMICategory(bmiResult).color}`}>
                        {getBMICategory(bmiResult).category}
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>• Underweight: BMI &lt 18.5</p>
                        <p>• Normal weight: BMI 18.5-24.9</p>
                        <p>• Overweight: BMI 25-29.9</p>
                        <p>• Obese: BMI ≥ 30</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-gray-500">
                      <div className="text-4xl mb-4">📊</div>
                      <p>Enter your height and weight to calculate your BMI</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Calculate Daily Calories</h3>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Height (cm)
                        </label>
                        <input
                          type="number"
                          value={bmiData.height}
                          onChange={(e) => handleInputChange('height', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="170"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Weight (kg)
                        </label>
                        <input
                          type="number"
                          value={bmiData.weight}
                          onChange={(e) => handleInputChange('weight', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="70"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Age
                        </label>
                        <input
                          type="number"
                          value={bmiData.age}
                          onChange={(e) => handleInputChange('age', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="25"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Gender
                        </label>
                        <select
                          value={bmiData.gender}
                          onChange={(e) => handleInputChange('gender', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Activity Level
                      </label>
                      <select
                        value={bmiData.activity}
                        onChange={(e) => handleInputChange('activity', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      >
                        <option value="sedentary">Sedentary (little/no exercise)</option>
                        <option value="light">Light (light exercise 1-3 days/week)</option>
                        <option value="moderate">Moderate (moderate exercise 3-5 days/week)</option>
                        <option value="active">Active (hard exercise 6-7 days/week)</option>
                        <option value="veryActive">Very Active (very hard exercise, physical job)</option>
                      </select>
                    </div>
                    <button
                      onClick={calculateCalories}
                      className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-red-600 hover:to-orange-600 transition-all duration-200"
                    >
                      Calculate Calories
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Daily Calorie Needs</h4>
                  {calorieResult ? (
                    <div className="text-center">
                      <div className="text-6xl font-bold text-red-600 mb-2">
                        {calorieResult.toLocaleString()}
                      </div>
                      <div className="text-2xl font-semibold text-gray-700 mb-4">
                        Calories/Day
                      </div>
                      <div className="text-sm text-gray-600 space-y-2">
                        <p className="font-semibold">For weight maintenance</p>
                        <p>• Weight loss: -500 calories</p>
                        <p>• Weight gain: +500 calories</p>
                        <p className="text-xs mt-4 text-gray-500">
                          Based on Harris-Benedict equation
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-gray-500">
                      <div className="text-4xl mb-4">🔥</div>
                      <p>Enter your details to calculate your daily calorie needs</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}


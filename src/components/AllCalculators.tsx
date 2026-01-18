'use client';

import { useState } from 'react';

interface Calculator {
  id: string;
  name: string;
  icon: string;
  description: string;
  category: string;
}

interface FormData {
  height: string;
  weight: string;
  age: string;
  gender: 'male' | 'female';
  activity: 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive';
  bodyFat: string;
  waist: string;
  neck: string;
  hip: string;
  reps: string;
  weightLifted: string;
  restingHeartRate: string;
  maxHeartRate: string;
  goal: 'loss' | 'maintenance' | 'gain';
}

interface Results {
  bmi?: number;
  bmr?: number;
  tdee?: number;
  protein?: number;
  oneRepMax?: number;
  bodyFat?: number;
  heartRateZones?: {
    zone1: { min: number; max: number };
    zone2: { min: number; max: number };
    zone3: { min: number; max: number };
    zone4: { min: number; max: number };
    zone5: { min: number; max: number };
  };
  macros?: {
    protein: number;
    carbs: number;
    fat: number;
    calories: number;
  };
}

export default function AllCalculators() {
  const [activeCalculator, setActiveCalculator] = useState('bmi');

  const calculators = [
    { id: 'bmi', name: 'BMI Calculator', icon: '⚖️', description: 'Body Mass Index calculation', category: 'Health' },
    { id: 'bmr', name: 'BMR Calculator', icon: '🔥', description: 'Basal Metabolic Rate', category: 'Calories' },
    { id: 'tdee', name: 'TDEE Calculator', icon: '📊', description: 'Total Daily Energy Expenditure', category: 'Calories' },
    { id: 'protein', name: 'Protein Calculator', icon: '🥩', description: 'Daily protein requirements', category: 'Nutrition' },
    { id: 'bodyfat', name: 'Body Fat Calculator', icon: '📏', description: 'Body fat percentage estimate', category: 'Health' },
    { id: 'one-rep-max', name: '1RM Calculator', icon: '💪', description: 'One-rep max estimation', category: 'Strength' },
    { id: 'heart-rate', name: 'Heart Rate Zones', icon: '❤️', description: 'Training heart rate zones', category: 'Cardio' },
    { id: 'macros', name: 'Macro Calculator', icon: '🍽️', description: 'Macronutrient distribution', category: 'Nutrition' }
  ];

  const [formData, setFormData] = useState<FormData>({
    height: '',
    weight: '',
    age: '',
    gender: 'male',
    activity: 'moderate',
    bodyFat: '',
    waist: '',
    neck: '',
    hip: '',
    reps: '',
    weightLifted: '',
    restingHeartRate: '',
    maxHeartRate: '',
    goal: 'maintenance'
  });

  const [results, setResults] = useState<Results>({});
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateBMI = () => {
    setIsCalculating(true);
    setTimeout(() => {
      const height = parseFloat(formData.height) / 100;
      const weight = parseFloat(formData.weight);
      if (height && weight) {
        const bmi = weight / (height * height);
        setResults({ ...results, bmi: parseFloat(bmi.toFixed(1)) });
      }
      setIsCalculating(false);
    }, 500);
  };

  const calculateBMR = () => {
    const weight = parseFloat(formData.weight);
    const height = parseFloat(formData.height);
    const age = parseFloat(formData.age);
    
    if (weight && height && age) {
      let bmr;
      if (formData.gender === 'male') {
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
      } else {
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
      }
      const roundedBmr = Math.round(bmr);
      setResults({ ...results, bmr: roundedBmr });
      return roundedBmr;
    }
    return 0;
  };

  const calculateTDEE = () => {
    setIsCalculating(true);
    setTimeout(() => {
      const bmr = results.bmr || calculateBMR();
      const activityMultipliers: Record<string, number> = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        veryActive: 1.9
      };
      const tdee = bmr * activityMultipliers[formData.activity];
      setResults({ ...results, tdee: Math.round(tdee) });
      setIsCalculating(false);
    }, 500);
  };

  const calculateProtein = () => {
    setIsCalculating(true);
    setTimeout(() => {
      const weight = parseFloat(formData.weight);
      if (weight) {
        const protein = weight * 1.6; // 1.6g per kg bodyweight
        setResults({ ...results, protein: Math.round(protein) });
      }
      setIsCalculating(false);
    }, 500);
  };

  const calculateOneRepMax = () => {
    setIsCalculating(true);
    setTimeout(() => {
      const reps = parseFloat(formData.reps);
      const weight = parseFloat(formData.weightLifted);
      if (reps && weight) {
        const oneRepMax = weight * (1 + (reps / 30));
        setResults({ ...results, oneRepMax: Math.round(oneRepMax) });
      }
      setIsCalculating(false);
    }, 500);
  };

  const calculateBodyFat = () => {
    setIsCalculating(true);
    setTimeout(() => {
      const waist = parseFloat(formData.waist);
      const neck = parseFloat(formData.neck);
      const hip = parseFloat(formData.hip);
      const height = parseFloat(formData.height);
      
      if (waist && neck && height) {
        let bodyFat;
        if (formData.gender === 'male') {
          bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
        } else {
          if (hip) {
            bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
          }
        }
        if (bodyFat) {
          setResults({ ...results, bodyFat: Math.round(bodyFat * 10) / 10 });
        }
      }
      setIsCalculating(false);
    }, 500);
  };

  const calculateMacros = () => {
    setIsCalculating(true);
    setTimeout(() => {
      const tdee = results.tdee || (calculateBMR() * {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        veryActive: 1.9
      }[formData.activity]);
      
      let calories = tdee;
      if (formData.goal === 'loss') calories *= 0.8;
      if (formData.goal === 'gain') calories *= 1.15;
      
      const protein = Math.round(calories * 0.3 / 4);
      const fat = Math.round(calories * 0.25 / 9);
      const carbs = Math.round((calories - (protein * 4) - (fat * 9)) / 4);
      
      setResults({ 
        ...results, 
        macros: {
          protein,
          carbs,
          fat,
          calories: Math.round(calories)
        }
      });
      setIsCalculating(false);
    }, 500);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-600' };
    if (bmi < 25) return { category: 'Normal weight', color: 'text-green-600' };
    if (bmi < 30) return { category: 'Overweight', color: 'text-yellow-600' };
    return { category: 'Obese', color: 'text-red-600' };
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-poppins">
            Fitness Calculators
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Calculate everything you need to optimize your fitness journey
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Calculator Selector */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Select Calculator</h3>
              <div className="space-y-3">
                {calculators.map((calc) => (
                  <button
                    key={calc.id}
                    onClick={() => setActiveCalculator(calc.id)}
                    className={`w-full p-4 rounded-lg text-left transition-all ${
                      activeCalculator === calc.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{calc.icon}</span>
                      <div>
                        <div className="font-semibold">{calc.name}</div>
                        <div className="text-sm opacity-90">{calc.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Calculator Interface */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <div className="flex items-center space-x-3 mb-8">
                <span className="text-4xl">{calculators.find(c => c.id === activeCalculator)?.icon}</span>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {calculators.find(c => c.id === activeCalculator)?.name}
                </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {calculators.find(c => c.id === activeCalculator)?.description}
                </p>
                </div>
              </div>

              {/* BMI Calculator */}
                {activeCalculator === 'bmi' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Input Your Data</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Height (cm)
                          </label>
                          <input
                            type="number"
                          value={formData.height}
                          onChange={(e) => handleInputChange('height', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="170"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Weight (kg)
                          </label>
                          <input
                            type="number"
                          value={formData.weight}
                          onChange={(e) => handleInputChange('weight', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="70"
                          />
                      </div>
                      <button
                        onClick={calculateBMI}
                        className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                      >
                        Calculate BMI
                      </button>
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Your Result</h4>
                    {results.bmi ? (
                        <div className="text-center">
                        <div className="text-6xl font-bold text-blue-600 mb-2">{results.bmi}</div>
                        <div className={`text-2xl font-semibold mb-4 ${getBMICategory(results.bmi).color}`}>
                          {getBMICategory(results.bmi).category}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          <p>• Underweight: BMI less than 18.5</p>
                          <p>• Normal weight: BMI 18.5-24.9</p>
                          <p>• Overweight: BMI 25-29.9</p>
                          <p>• Obese: BMI ≥ 30</p>
                          </div>
                        </div>
                      ) : (
                      <div className="text-center text-gray-500 dark:text-gray-400">
                          <div className="text-4xl mb-4">⚖️</div>
                          <p>Enter your height and weight to calculate BMI</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

              {/* BMR Calculator */}
                {activeCalculator === 'bmr' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Input Your Data</h4>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Height (cm)
                            </label>
                            <input
                              type="number"
                            value={formData.height}
                            onChange={(e) => handleInputChange('height', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="170"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Weight (kg)
                            </label>
                            <input
                              type="number"
                            value={formData.weight}
                            onChange={(e) => handleInputChange('weight', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="70"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Age
                            </label>
                            <input
                              type="number"
                            value={formData.age}
                            onChange={(e) => handleInputChange('age', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="25"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Gender
                            </label>
                            <select
                            value={formData.gender}
                            onChange={(e) => handleInputChange('gender', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                            </select>
                          </div>
                        </div>
                      <button
                        onClick={calculateBMR}
                        className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                      >
                        Calculate BMR
                      </button>
                    </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Your BMR</h4>
                    {results.bmr ? (
                        <div className="text-center">
                        <div className="text-6xl font-bold text-blue-600 mb-2">{results.bmr.toLocaleString()}</div>
                        <div className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Calories/Day</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          <p>This is your baseline calorie needs at rest</p>
                        </div>
                        </div>
                      ) : (
                      <div className="text-center text-gray-500 dark:text-gray-400">
                          <div className="text-4xl mb-4">🔥</div>
                          <p>Enter your details to calculate BMR</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

              {/* Protein Calculator */}
                {activeCalculator === 'protein' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Input Your Data</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Weight (kg)
                          </label>
                          <input
                            type="number"
                          value={formData.weight}
                          onChange={(e) => handleInputChange('weight', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="70"
                          />
                        </div>
                      <button
                        onClick={calculateProtein}
                        className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                      >
                        Calculate Protein Needs
                      </button>
                    </div>
                        </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Daily Protein</h4>
                    {results.protein ? (
                      <div className="text-center">
                        <div className="text-6xl font-bold text-blue-600 mb-2">{results.protein}g</div>
                        <div className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Per Day</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          <p>Recommended for muscle building</p>
                          <p>1.6g per kg bodyweight</p>
                        </div>
                        </div>
                      ) : (
                      <div className="text-center text-gray-500 dark:text-gray-400">
                          <div className="text-4xl mb-4">🥩</div>
                        <p>Enter your weight to calculate protein needs</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

              {/* TDEE Calculator */}
              {activeCalculator === 'tdee' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Input Your Data</h4>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Height (cm)</label>
                          <input
                            type="number"
                            value={formData.height}
                            onChange={(e) => handleInputChange('height', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="170"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Weight (kg)</label>
                          <input
                            type="number"
                            value={formData.weight}
                            onChange={(e) => handleInputChange('weight', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="70"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Age</label>
                          <input
                            type="number"
                            value={formData.age}
                            onChange={(e) => handleInputChange('age', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="25"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Gender</label>
                          <select
                            value={formData.gender}
                            onChange={(e) => handleInputChange('gender', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Activity Level</label>
                        <select
                          value={formData.activity}
                          onChange={(e) => handleInputChange('activity', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="sedentary">Sedentary (desk job)</option>
                          <option value="light">Light exercise (1-3 days/week)</option>
                          <option value="moderate">Moderate (3-5 days/week)</option>
                          <option value="active">Active (6-7 days/week)</option>
                          <option value="veryActive">Very Active (2x/day)</option>
                        </select>
                      </div>
                      <button
                        onClick={calculateTDEE}
                        disabled={isCalculating}
                        className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50"
                      >
                        {isCalculating ? 'Calculating...' : 'Calculate TDEE'}
                      </button>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Your TDEE</h4>
                    {results.tdee ? (
                      <div className="text-center">
                        <div className="text-6xl font-bold text-blue-600 mb-2">{results.tdee.toLocaleString()}</div>
                        <div className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Calories/Day</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          <p>Total Daily Energy Expenditure</p>
                          <p>Includes all daily activities</p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-gray-500 dark:text-gray-400">
                        <div className="text-4xl mb-4">📊</div>
                        <p>Enter your details to calculate TDEE</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* One Rep Max Calculator */}
                {activeCalculator === 'one-rep-max' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Input Your Data</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Weight Lifted (kg)
                          </label>
                          <input
                            type="number"
                          value={formData.weightLifted}
                          onChange={(e) => handleInputChange('weightLifted', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="100"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Reps Completed
                          </label>
                          <input
                            type="number"
                          value={formData.reps}
                          onChange={(e) => handleInputChange('reps', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="5"
                          />
                      </div>
                      <button
                        onClick={calculateOneRepMax}
                        disabled={isCalculating}
                        className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50"
                      >
                        {isCalculating ? 'Calculating...' : 'Calculate 1RM'}
                      </button>
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Estimated 1RM</h4>
                    {results.oneRepMax ? (
                        <div className="text-center">
                        <div className="text-6xl font-bold text-blue-600 mb-2">{results.oneRepMax}kg</div>
                        <div className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">One Rep Max</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          <p>Based on Epley formula</p>
                          <p>Weight × (1 + reps/30)</p>
                        </div>
                        </div>
                      ) : (
                      <div className="text-center text-gray-500 dark:text-gray-400">
                          <div className="text-4xl mb-4">💪</div>
                          <p>Enter weight and reps to calculate 1RM</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

              {/* Body Fat Calculator */}
              {activeCalculator === 'bodyfat' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Input Your Data</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Height (cm)</label>
                        <input
                          type="number"
                          value={formData.height}
                          onChange={(e) => handleInputChange('height', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="170"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Gender</label>
                        <select
                          value={formData.gender}
                          onChange={(e) => handleInputChange('gender', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Waist (cm)</label>
                          <input
                            type="number"
                            value={formData.waist}
                            onChange={(e) => handleInputChange('waist', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="80"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Neck (cm)</label>
                          <input
                            type="number"
                            value={formData.neck}
                            onChange={(e) => handleInputChange('neck', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="38"
                          />
                        </div>
                      </div>
                      {formData.gender === 'female' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Hip (cm)</label>
                          <input
                            type="number"
                            value={formData.hip}
                            onChange={(e) => handleInputChange('hip', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="90"
                          />
                        </div>
                      )}
                      <button
                        onClick={calculateBodyFat}
                        disabled={isCalculating}
                        className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50"
                      >
                        {isCalculating ? 'Calculating...' : 'Calculate Body Fat'}
                      </button>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Body Fat Percentage</h4>
                    {results.bodyFat ? (
                      <div className="text-center">
                        <div className="text-6xl font-bold text-blue-600 mb-2">{results.bodyFat}%</div>
                        <div className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Body Fat</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          <p>US Navy Method</p>
                          <p>Based on circumference measurements</p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-gray-500 dark:text-gray-400">
                        <div className="text-4xl mb-4">📏</div>
                        <p>Enter measurements to calculate body fat</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Heart Rate Zones Calculator */}
              {activeCalculator === 'heart-rate' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Input Your Data</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Age</label>
                        <input
                          type="number"
                          value={formData.age}
                          onChange={(e) => handleInputChange('age', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="25"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Resting Heart Rate (optional)</label>
                        <input
                          type="number"
                          value={formData.restingHeartRate}
                          onChange={(e) => handleInputChange('restingHeartRate', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="60"
                        />
                      </div>
                      <button
                        onClick={() => {
                          const age = parseFloat(formData.age);
                          const rhr = parseFloat(formData.restingHeartRate) || 60;
                          const maxHR = 220 - age;
                          const hrReserve = maxHR - rhr;
                          
                          const zones = {
                            zone1: { min: Math.round(rhr + hrReserve * 0.5), max: Math.round(rhr + hrReserve * 0.6) },
                            zone2: { min: Math.round(rhr + hrReserve * 0.6), max: Math.round(rhr + hrReserve * 0.7) },
                            zone3: { min: Math.round(rhr + hrReserve * 0.7), max: Math.round(rhr + hrReserve * 0.8) },
                            zone4: { min: Math.round(rhr + hrReserve * 0.8), max: Math.round(rhr + hrReserve * 0.9) },
                            zone5: { min: Math.round(rhr + hrReserve * 0.9), max: maxHR }
                          };
                          
                          setResults({ ...results, heartRateZones: zones });
                        }}
                        className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                      >
                        Calculate Heart Rate Zones
                      </button>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Training Zones</h4>
                    {results.heartRateZones ? (
                      <div className="space-y-3">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                          <div className="font-semibold text-blue-800 dark:text-blue-200">Zone 1 - Recovery</div>
                          <div className="text-sm text-blue-600 dark:text-blue-300">
                            {results.heartRateZones.zone1.min} - {results.heartRateZones.zone1.max} bpm
                          </div>
                        </div>
                        <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                          <div className="font-semibold text-green-800 dark:text-green-200">Zone 2 - Base</div>
                          <div className="text-sm text-green-600 dark:text-green-300">
                            {results.heartRateZones.zone2.min} - {results.heartRateZones.zone2.max} bpm
                          </div>
                        </div>
                        <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                          <div className="font-semibold text-yellow-800 dark:text-yellow-200">Zone 3 - Aerobic</div>
                          <div className="text-sm text-yellow-600 dark:text-yellow-300">
                            {results.heartRateZones.zone3.min} - {results.heartRateZones.zone3.max} bpm
                          </div>
                        </div>
                        <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
                          <div className="font-semibold text-orange-800 dark:text-orange-200">Zone 4 - Threshold</div>
                          <div className="text-sm text-orange-600 dark:text-orange-300">
                            {results.heartRateZones.zone4.min} - {results.heartRateZones.zone4.max} bpm
                          </div>
                        </div>
                        <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
                          <div className="font-semibold text-red-800 dark:text-red-200">Zone 5 - Anaerobic</div>
                          <div className="text-sm text-red-600 dark:text-red-300">
                            {results.heartRateZones.zone5.min} - {results.heartRateZones.zone5.max} bpm
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-gray-500 dark:text-gray-400">
                        <div className="text-4xl mb-4">❤️</div>
                        <p>Enter your age to calculate heart rate zones</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Macros Calculator */}
              {activeCalculator === 'macros' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Input Your Data</h4>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Height (cm)</label>
                          <input
                            type="number"
                            value={formData.height}
                            onChange={(e) => handleInputChange('height', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="170"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Weight (kg)</label>
                          <input
                            type="number"
                            value={formData.weight}
                            onChange={(e) => handleInputChange('weight', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="70"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Age</label>
                          <input
                            type="number"
                            value={formData.age}
                            onChange={(e) => handleInputChange('age', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="25"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Gender</label>
                          <select
                            value={formData.gender}
                            onChange={(e) => handleInputChange('gender', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Activity Level</label>
                        <select
                          value={formData.activity}
                          onChange={(e) => handleInputChange('activity', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="sedentary">Sedentary (desk job)</option>
                          <option value="light">Light exercise (1-3 days/week)</option>
                          <option value="moderate">Moderate (3-5 days/week)</option>
                          <option value="active">Active (6-7 days/week)</option>
                          <option value="veryActive">Very Active (2x/day)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Goal</label>
                        <select
                          value={formData.goal}
                          onChange={(e) => handleInputChange('goal', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="loss">Weight Loss</option>
                          <option value="maintenance">Maintenance</option>
                          <option value="gain">Weight Gain</option>
                        </select>
                      </div>
                      <button
                        onClick={calculateMacros}
                        disabled={isCalculating}
                        className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50"
                      >
                        {isCalculating ? 'Calculating...' : 'Calculate Macros'}
                      </button>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Daily Macros</h4>
                    {results.macros ? (
                      <div>
                        <div className="text-center mb-6">
                          <div className="text-4xl font-bold text-blue-600 mb-2">{results.macros.calories}</div>
                          <div className="text-xl font-semibold text-gray-700 dark:text-gray-300">Total Calories</div>
                        </div>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                            <span className="font-semibold text-blue-800 dark:text-blue-200">Protein</span>
                            <span className="text-blue-600 dark:text-blue-300">{results.macros.protein}g</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                            <span className="font-semibold text-green-800 dark:text-green-200">Carbs</span>
                            <span className="text-green-600 dark:text-green-300">{results.macros.carbs}g</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                            <span className="font-semibold text-yellow-800 dark:text-yellow-200">Fat</span>
                            <span className="text-yellow-600 dark:text-yellow-300">{results.macros.fat}g</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-gray-500 dark:text-gray-400">
                        <div className="text-4xl mb-4">🍽️</div>
                        <p>Enter your details to calculate macros</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
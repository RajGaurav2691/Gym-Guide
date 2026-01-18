'use client';

import { useState } from 'react';

interface Goal {
  id: string;
  name: string;
  icon: string;
  description: string;
  calorieAdjustment: number;
  macroSplit: { protein: number; carbs: number; fat: number };
}

export default function DietNutritionHero() {
  const [activeGoal, setActiveGoal] = useState('weight-loss');
  const [,] = useState(false);

  const goals: Goal[] = [
    { 
      id: 'weight-loss', 
      name: 'Weight Loss', 
      icon: '🔥', 
      description: 'Calorie deficit for sustainable fat loss',
      calorieAdjustment: -500,
      macroSplit: { protein: 40, carbs: 30, fat: 30 }
    },
    { 
      id: 'muscle-gain', 
      name: 'Muscle Gain', 
      icon: '💪', 
      description: 'Calorie surplus with high protein',
      calorieAdjustment: +300,
      macroSplit: { protein: 35, carbs: 45, fat: 20 }
    },
    { 
      id: 'maintenance', 
      name: 'Maintenance', 
      icon: '⚖️', 
      description: 'Balance calories for current weight',
      calorieAdjustment: 0,
      macroSplit: { protein: 30, carbs: 40, fat: 30 }
    },
    { 
      id: 'performance', 
      name: 'Performance', 
      icon: '🏃', 
      description: 'Optimize nutrition for athletic performance',
      calorieAdjustment: +200,
      macroSplit: { protein: 25, carbs: 55, fat: 20 }
    }
  ];

  const selectedGoal = goals.find(goal => goal.id === activeGoal)!;

  const scrollToMealPlan = () => {
    const mealPlanSection = document.querySelector('#meal-plan-generator');
    if (mealPlanSection) {
      mealPlanSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToRecipes = () => {
    const recipeSection = document.querySelector('#recipe-library');
    if (recipeSection) {
      recipeSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-4 lg:mb-6 font-poppins">
            Diet & Nutrition
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6 lg:mb-8">
            Transform your body with science-backed nutrition plans, personalized meal plans, and expert guidance
          </p>
        </div>

        {/* Goal Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8 lg:mb-12">
          {goals.map((goal) => (
            <button
              key={goal.id}
              onClick={() => setActiveGoal(goal.id)}
              className={`p-4 sm:p-6 rounded-2xl text-center transition-all duration-300 transform hover:scale-105 ${
                activeGoal === goal.id
                  ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-xl scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-lg'
              }`}
            >
              <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">{goal.icon}</div>
              <h3 className="text-base sm:text-lg font-bold mb-1 sm:mb-2">{goal.name}</h3>
              <p className="text-xs sm:text-sm opacity-90 leading-tight">{goal.description}</p>
            </button>
          ))}
        </div>

        {/* Selected Goal Details */}
        {activeGoal && (
          <div className="mb-8 lg:mb-12 bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg">
            <div className="text-center mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {selectedGoal.icon} {selectedGoal.name} Plan Details
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{selectedGoal.description}</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-green-50 dark:bg-green-900 p-4 rounded-xl text-center">
                <div className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
                  {selectedGoal.calorieAdjustment > 0 ? '+' : ''}{selectedGoal.calorieAdjustment}
                </div>
                <div className="text-sm text-green-700 dark:text-green-300">Calorie Adjustment</div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-xl text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  {selectedGoal.macroSplit.protein}%
                </div>
                <div className="text-sm text-blue-700 dark:text-blue-300">Protein</div>
              </div>
              
              <div className="bg-orange-50 dark:bg-orange-900 p-4 rounded-xl text-center">
                <div className="text-2xl sm:text-3xl font-bold text-orange-600 dark:text-orange-400 mb-1">
                  {selectedGoal.macroSplit.carbs}%
                </div>
                <div className="text-sm text-orange-700 dark:text-orange-300">Carbs</div>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900 p-4 rounded-xl text-center">
                <div className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                  {selectedGoal.macroSplit.fat}%
                </div>
                <div className="text-sm text-purple-700 dark:text-purple-300">Fat</div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 mb-8 lg:mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 text-center shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-3xl sm:text-4xl font-bold text-green-600 mb-2">500+</div>
            <div className="text-gray-600 dark:text-gray-300">Healthy Recipes</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 text-center shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">15+</div>
            <div className="text-gray-600 dark:text-gray-300">Diet Plans</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 text-center shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-3xl sm:text-4xl font-bold text-purple-600 mb-2">95%</div>
            <div className="text-gray-600 dark:text-gray-300">Success Rate</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={scrollToMealPlan}
            className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-bold hover:from-green-600 hover:to-blue-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            Generate My Meal Plan 🍽️
          </button>
          <button 
            onClick={scrollToRecipes}
            className="border-2 border-green-500 text-green-600 dark:text-green-400 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-bold hover:bg-green-500 hover:text-white transition-all duration-300 transform hover:scale-105"
          >
            Browse Recipes 📚
          </button>
        </div>
        
        {/* Features Preview */}
        <div className="mt-12 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800 dark:to-green-700 p-4 sm:p-6 rounded-xl text-center">
            <div className="text-2xl sm:text-3xl mb-2">🎯</div>
            <h4 className="font-bold text-green-800 dark:text-green-200 text-sm sm:text-base mb-1">Personalized Plans</h4>
            <p className="text-xs sm:text-sm text-green-600 dark:text-green-300">Tailored to your goals</p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-700 p-4 sm:p-6 rounded-xl text-center">
            <div className="text-2xl sm:text-3xl mb-2">📊</div>
            <h4 className="font-bold text-blue-800 dark:text-blue-200 text-sm sm:text-base mb-1">Nutrition Tracking</h4>
            <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-300">Monitor your progress</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-800 dark:to-purple-700 p-4 sm:p-6 rounded-xl text-center">
            <div className="text-2xl sm:text-3xl mb-2">🛒</div>
            <h4 className="font-bold text-purple-800 dark:text-purple-200 text-sm sm:text-base mb-1">Smart Shopping</h4>
            <p className="text-xs sm:text-sm text-purple-600 dark:text-purple-300">Auto grocery lists</p>
          </div>
          
          <div className="bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-800 dark:to-orange-700 p-4 sm:p-6 rounded-xl text-center">
            <div className="text-2xl sm:text-3xl mb-2">👨‍🍳</div>
            <h4 className="font-bold text-orange-800 dark:text-orange-200 text-sm sm:text-base mb-1">Recipe Library</h4>
            <p className="text-xs sm:text-sm text-orange-600 dark:text-orange-300">500+ healthy recipes</p>
          </div>
        </div>
      </div>
    </section>
  );
}


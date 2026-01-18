'use client';

import { useState } from 'react';

interface MealDetails {
  name: string;
  calories: number;
  macros: { protein: number; carbs: number; fat: number };
  ingredients: string[];
  instructions?: string[];
  prepTime?: number;
}

interface DayPlan {
  [mealName: string]: MealDetails;
}

interface MealPlan {
  [dayKey: string]: DayPlan;
}

export default function MealPlanGenerator() {
  const [preferences, setPreferences] = useState({
    goal: 'weight-loss',
    dietary: 'omnivore',
    calories: 2000,
    meals: 3,
    allergies: [] as string[],
    dislikes: [] as string[],
    activityLevel: 'moderate'
  });

  const [generatedPlan, setGeneratedPlan] = useState<MealPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const goalOptions = [
    { id: 'weight-loss', name: 'Weight Loss', description: 'Caloric deficit for fat loss', icon: '📉' },
    { id: 'muscle-gain', name: 'Muscle Gain', description: 'High protein for building muscle', icon: '💪' },
    { id: 'maintenance', name: 'Maintenance', description: 'Balanced nutrition', icon: '⚖️' },
    { id: 'performance', name: 'Performance', description: 'Optimized for athletic performance', icon: '🏃' }
  ];

  const dietaryOptions = [
    { id: 'omnivore', name: 'Omnivore', description: 'All foods included', icon: '🍖' },
    { id: 'vegetarian', name: 'Vegetarian', description: 'No meat or fish', icon: '🥗' },
    { id: 'vegan', name: 'Vegan', description: 'Plant-based only', icon: '🌱' },
    { id: 'keto', name: 'Keto', description: 'Low carb, high fat', icon: '🥑' },
    { id: 'paleo', name: 'Paleo', description: 'Whole foods only', icon: '🦴' },
    { id: 'mediterranean', name: 'Mediterranean', description: 'Heart-healthy fats & fish', icon: '🫒' }
  ];

  const activityLevels = [
    { id: 'sedentary', name: 'Sedentary', description: 'Little to no exercise', multiplier: 1.2 },
    { id: 'light', name: 'Light Activity', description: '1-3 days/week', multiplier: 1.375 },
    { id: 'moderate', name: 'Moderate', description: '3-5 days/week', multiplier: 1.55 },
    { id: 'very-active', name: 'Very Active', description: '6-7 days/week', multiplier: 1.725 },
    { id: 'extreme', name: 'Extremely Active', description: '2x/day or intense training', multiplier: 1.9 }
  ];

  const allergyOptions = [
    'Dairy', 'Nuts', 'Gluten', 'Eggs', 'Soy', 'Shellfish', 'Fish', 'Tree Nuts', 'Sesame'
  ];

  const mealDatabase = {
    omnivore: {
      breakfast: [
        {
          name: "Protein Oatmeal Bowl",
          calories: 450,
          macros: { protein: 25, carbs: 45, fat: 12 },
          ingredients: ["Oats", "Protein powder", "Banana", "Almond butter", "Berries"],
          instructions: ["Cook oats with water", "Mix in protein powder", "Top with banana and berries"],
          prepTime: 10
        },
        {
          name: "Greek Yogurt Parfait",
          calories: 380,
          macros: { protein: 30, carbs: 35, fat: 10 },
          ingredients: ["Greek yogurt", "Granola", "Mixed berries", "Honey"],
          instructions: ["Layer yogurt and granola", "Top with berries and honey"],
          prepTime: 5
        },
        {
          name: "Scrambled Eggs with Toast",
          calories: 420,
          macros: { protein: 28, carbs: 25, fat: 22 },
          ingredients: ["Eggs", "Whole grain bread", "Avocado", "Spinach"],
          instructions: ["Scramble eggs with spinach", "Toast bread", "Top with avocado"],
          prepTime: 8
        }
      ],
      lunch: [
        {
          name: "Grilled Chicken Salad",
          calories: 380,
          macros: { protein: 35, carbs: 20, fat: 18 },
          ingredients: ["Chicken breast", "Mixed greens", "Avocado", "Cherry tomatoes", "Olive oil"],
          instructions: ["Grill chicken", "Toss salad with olive oil", "Add sliced avocado"],
          prepTime: 15
        },
        {
          name: "Turkey Wrap",
          calories: 450,
          macros: { protein: 32, carbs: 35, fat: 20 },
          ingredients: ["Turkey breast", "Whole wheat tortilla", "Hummus", "Vegetables"],
          instructions: ["Spread hummus on tortilla", "Add turkey and vegetables", "Roll tightly"],
          prepTime: 10
        }
      ],
      dinner: [
        {
          name: "Salmon with Sweet Potato",
          calories: 520,
          macros: { protein: 40, carbs: 35, fat: 22 },
          ingredients: ["Salmon fillet", "Sweet potato", "Broccoli", "Lemon", "Herbs"],
          instructions: ["Bake salmon with herbs", "Roast sweet potato", "Steam broccoli"],
          prepTime: 25
        },
        {
          name: "Lean Beef Stir-fry",
          calories: 480,
          macros: { protein: 38, carbs: 30, fat: 20 },
          ingredients: ["Lean beef", "Mixed vegetables", "Brown rice", "Soy sauce"],
          instructions: ["Stir-fry beef and vegetables", "Serve over brown rice"],
          prepTime: 20
        }
      ]
    },
    vegetarian: {
      breakfast: [
        {
          name: "Veggie Scramble",
          calories: 420,
          macros: { protein: 22, carbs: 25, fat: 24 },
          ingredients: ["Eggs", "Bell peppers", "Spinach", "Cheese", "Mushrooms"],
          instructions: ["Sauté vegetables", "Scramble eggs with veggies", "Add cheese"],
          prepTime: 12
        }
      ],
      lunch: [
        {
          name: "Quinoa Buddha Bowl",
          calories: 450,
          macros: { protein: 18, carbs: 55, fat: 16 },
          ingredients: ["Quinoa", "Chickpeas", "Avocado", "Vegetables", "Tahini"],
          instructions: ["Cook quinoa", "Roast chickpeas", "Arrange in bowl with tahini"],
          prepTime: 20
        }
      ],
      dinner: [
        {
          name: "Lentil Curry",
          calories: 480,
          macros: { protein: 24, carbs: 60, fat: 12 },
          ingredients: ["Red lentils", "Coconut milk", "Curry spices", "Vegetables"],
          instructions: ["Simmer lentils with spices", "Add coconut milk", "Serve with vegetables"],
          prepTime: 30
        }
      ]
    },
    vegan: {
      breakfast: [
        {
          name: "Chia Pudding Bowl",
          calories: 380,
          macros: { protein: 15, carbs: 35, fat: 20 },
          ingredients: ["Chia seeds", "Almond milk", "Berries", "Nuts", "Maple syrup"],
          instructions: ["Mix chia with almond milk overnight", "Top with berries and nuts"],
          prepTime: 5
        }
      ],
      lunch: [
        {
          name: "Tofu Buddha Bowl",
          calories: 420,
          macros: { protein: 20, carbs: 45, fat: 18 },
          ingredients: ["Tofu", "Brown rice", "Edamame", "Vegetables", "Sesame dressing"],
          instructions: ["Pan-fry tofu", "Steam edamame", "Arrange with rice and dressing"],
          prepTime: 18
        }
      ],
      dinner: [
        {
          name: "Black Bean Tacos",
          calories: 450,
          macros: { protein: 18, carbs: 65, fat: 12 },
          ingredients: ["Black beans", "Corn tortillas", "Avocado", "Salsa", "Cilantro"],
          instructions: ["Heat black beans", "Warm tortillas", "Assemble with toppings"],
          prepTime: 15
        }
      ]
    },
    keto: {
      breakfast: [
        {
          name: "Keto Omelet",
          calories: 520,
          macros: { protein: 25, carbs: 5, fat: 45 },
          ingredients: ["Eggs", "Cheese", "Avocado", "Bacon", "Spinach"],
          instructions: ["Cook bacon", "Make omelet with cheese and spinach", "Serve with avocado"],
          prepTime: 12
        }
      ],
      lunch: [
        {
          name: "Keto Salad Bowl",
          calories: 480,
          macros: { protein: 30, carbs: 8, fat: 38 },
          ingredients: ["Mixed greens", "Grilled chicken", "Avocado", "Cheese", "Olive oil"],
          instructions: ["Grill chicken", "Toss greens with olive oil", "Add toppings"],
          prepTime: 15
        }
      ],
      dinner: [
        {
          name: "Zucchini Lasagna",
          calories: 450,
          macros: { protein: 35, carbs: 12, fat: 30 },
          ingredients: ["Zucchini", "Ground beef", "Ricotta", "Mozzarella", "Marinara"],
          instructions: ["Slice zucchini thin", "Layer with meat and cheese", "Bake until bubbly"],
          prepTime: 45
        }
      ]
    }
  };

  const calculateCaloriesPerMeal = () => {
    const caloriesPerMeal = Math.floor(preferences.calories / preferences.meals);
    return caloriesPerMeal;
  };

  const adjustMealForCalories = (meal: MealDetails, targetCalories: number) => {
    const ratio = targetCalories / meal.calories;
    return {
      ...meal,
      calories: Math.round(meal.calories * ratio),
      macros: {
        protein: Math.round(meal.macros.protein * ratio),
        carbs: Math.round(meal.macros.carbs * ratio),
        fat: Math.round(meal.macros.fat * ratio)
      }
    };
  };

  const filterMealsByAllergies = (meals: MealDetails[]) => {
    return meals.filter(meal => {
      return !preferences.allergies.some(allergy => 
        meal.ingredients.some(ingredient => 
          ingredient.toLowerCase().includes(allergy.toLowerCase())
        )
      );
    });
  };

  const generateMealPlan = async () => {
    setIsGenerating(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack1', 'snack2', 'snack3'];
    const selectedMealTypes = mealTypes.slice(0, preferences.meals);
    
    const dietaryMeals = mealDatabase[preferences.dietary as keyof typeof mealDatabase] || mealDatabase.omnivore;
    
    const caloriesPerMeal = calculateCaloriesPerMeal();
    
    const dayPlan: DayPlan = {};
    
    selectedMealTypes.forEach((mealType, index) => {
      let availableMeals: MealDetails[] = [];
      
      if (mealType === 'breakfast' && dietaryMeals.breakfast) {
        availableMeals = dietaryMeals.breakfast;
      } else if (mealType === 'lunch' && dietaryMeals.lunch) {
        availableMeals = dietaryMeals.lunch;
      } else if (mealType === 'dinner' && dietaryMeals.dinner) {
        availableMeals = dietaryMeals.dinner;
      } else {
        // For snacks, use breakfast items but adjust portions
        availableMeals = dietaryMeals.breakfast || [];
      }
      
      // Filter out meals with allergies
      availableMeals = filterMealsByAllergies(availableMeals);
      
      if (availableMeals.length > 0) {
        const randomMeal = availableMeals[Math.floor(Math.random() * availableMeals.length)];
        const adjustedMeal = adjustMealForCalories(randomMeal, 
          mealType.includes('snack') ? Math.floor(caloriesPerMeal * 0.6) : caloriesPerMeal
        );
        
        dayPlan[mealType] = adjustedMeal;
      }
    });
    
    setGeneratedPlan({ day1: dayPlan });
    setIsGenerating(false);
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-poppins">
            Personalized Meal Plan Generator
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Get a customized meal plan based on your goals, dietary preferences, and nutritional needs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Preferences Form */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Your Preferences</h3>
            
            {/* Dietary Preference */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Dietary Preference
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {dietaryOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setPreferences(prev => ({ ...prev, dietary: option.id }))}
                    className={`p-4 rounded-lg text-left transition-all ${
                      preferences.dietary === option.id
                        ? 'bg-green-500 text-white'
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    <div className="font-semibold">{option.name}</div>
                    <div className="text-sm opacity-90">{option.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Calorie Target */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Daily Calorie Target: {preferences.calories}
              </label>
              <input
                type="range"
                min="1200"
                max="4000"
                value={preferences.calories}
                onChange={(e) => setPreferences(prev => ({ ...prev, calories: parseInt(e.target.value) }))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1200</span>
                <span>4000</span>
              </div>
            </div>

            {/* Number of Meals */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Meals per Day
              </label>
              <div className="flex space-x-2">
                {[3, 4, 5, 6].map((num) => (
                  <button
                    key={num}
                    onClick={() => setPreferences(prev => ({ ...prev, meals: num }))}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      preferences.meals === num
                        ? 'bg-green-500 text-white'
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Allergies */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Allergies & Intolerances
              </label>
              <div className="flex flex-wrap gap-2">
                {allergyOptions.map((allergy) => (
                  <button
                    key={allergy}
                    onClick={() => {
                      const newAllergies = preferences.allergies.includes(allergy)
                        ? preferences.allergies.filter(a => a !== allergy)
                        : [...preferences.allergies, allergy];
                      setPreferences(prev => ({ ...prev, allergies: newAllergies }));
                    }}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                      preferences.allergies.includes(allergy)
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    {allergy}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={generateMealPlan}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 px-6 rounded-lg font-bold text-lg hover:from-green-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Generate My Meal Plan
            </button>
          </div>

          {/* Generated Meal Plan */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Your Personalized Meal Plan
            </h3>
            
            {generatedPlan ? (
              <div className="space-y-6">
                {Object.entries(generatedPlan.day1).map(([meal, details]: [string, any]) => (
                  <div key={meal} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 sm:p-6 hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white capitalize mb-2 sm:mb-0">
                        {meal.includes('snack') ? `Snack ${meal.slice(-1)}` : meal} 🍽️
                      </h4>
                      <div className="flex flex-col sm:items-end">
                        <span className="text-lg font-bold text-green-600 dark:text-green-400">
                          {details.calories} cal
                        </span>
                        {details.prepTime && (
                          <span className="text-xs text-gray-500 mt-1">
                            ⏱️ {details.prepTime} min prep
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <h5 className="text-base sm:text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
                      {details.name}
                    </h5>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="text-center">
                        <div className="font-bold text-blue-600 dark:text-blue-400">{details.macros.protein}g</div>
                        <div className="text-xs">Protein</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-orange-600 dark:text-orange-400">{details.macros.carbs}g</div>
                        <div className="text-xs">Carbs</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-purple-600 dark:text-purple-400">{details.macros.fat}g</div>
                        <div className="text-xs">Fat</div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <h6 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Ingredients:
                        </h6>
                        <div className="flex flex-wrap gap-2">
                          {details.ingredients.map((ingredient: string, index: number) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">
                              {ingredient}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {details.instructions && (
                        <div>
                          <h6 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Instructions:
                          </h6>
                          <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                            {details.instructions.map((instruction: string, index: number) => (
                              <li key={index}>{instruction}</li>
                            ))}
                          </ol>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {/* Daily Summary */}
                <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900 dark:to-blue-900 rounded-xl">
                  <h4 className="font-bold text-lg text-green-800 dark:text-green-200 mb-4 text-center">
                    📊 Daily Nutrition Summary
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {Object.values(generatedPlan.day1).reduce((sum: number, meal: any) => sum + meal.calories, 0)}
                      </div>
                      <div className="text-sm text-green-700 dark:text-green-300">Calories</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {Object.values(generatedPlan.day1).reduce((sum: number, meal: any) => sum + meal.macros.protein, 0)}g
                      </div>
                      <div className="text-sm text-blue-700 dark:text-blue-300">Protein</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                      <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                        {Object.values(generatedPlan.day1).reduce((sum: number, meal: any) => sum + meal.macros.carbs, 0)}g
                      </div>
                      <div className="text-sm text-orange-700 dark:text-orange-300">Carbs</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {Object.values(generatedPlan.day1).reduce((sum: number, meal: any) => sum + meal.macros.fat, 0)}g
                      </div>
                      <div className="text-sm text-purple-700 dark:text-purple-300">Fat</div>
                    </div>
                  </div>
                  
                  <div className="mt-6 text-center">
                    <button 
                      onClick={generateMealPlan}
                      className="bg-white dark:bg-gray-800 text-green-600 dark:text-green-400 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-sm"
                    >
                      🔄 Generate New Plan
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400 py-12">
                <div className="text-6xl mb-4">🍽️</div>
                <h4 className="text-lg font-semibold mb-2">Ready to Create Your Plan?</h4>
                <p className="text-sm">Fill in your preferences and generate your personalized meal plan</p>
                <div className="mt-6 space-y-2 text-xs text-gray-400">
                  <p>✨ Customized to your dietary needs</p>
                  <p>🎯 Aligned with your fitness goals</p>
                  <p>📊 Complete nutritional breakdown</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}


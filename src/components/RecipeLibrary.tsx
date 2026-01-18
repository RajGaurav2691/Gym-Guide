'use client';

import { useState } from 'react';

interface Recipe {
  id: number;
  name: string;
  category: string;
  difficulty: string;
  time: string;
  calories: number;
  protein: number;
  image: string;
  ingredients: string[];
  description: string;
  instructions: string[];
  servings: number;
  macros: { carbs: number; fat: number; fiber: number };
  tags: string[];
}

export default function RecipeLibrary() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [savedRecipes, setSavedRecipes] = useState<number[]>([]);

  const categories = [
    { id: 'all', name: 'All Recipes', icon: '🍽️' },
    { id: 'breakfast', name: 'Breakfast', icon: '🍳' },
    { id: 'lunch', name: 'Lunch', icon: '🥗' },
    { id: 'dinner', name: 'Dinner', icon: '🍽️' },
    { id: 'snacks', name: 'Snacks', icon: '🍎' },
    { id: 'smoothies', name: 'Smoothies', icon: '🥤' },
    { id: 'desserts', name: 'Healthy Desserts', icon: '🍰' }
  ];

  const difficulties = [
    { id: 'all', name: 'All Levels', icon: '🌟' },
    { id: 'easy', name: 'Easy', icon: '😊' },
    { id: 'medium', name: 'Medium', icon: '😐' },
    { id: 'hard', name: 'Hard', icon: '😅' }
  ];

  const recipes: Recipe[] = [
    {
      id: 1,
      name: "Protein Power Pancakes",
      category: "breakfast",
      difficulty: "easy",
      time: "15 min",
      calories: 320,
      protein: 25,
      image: "🥞",
      ingredients: ["1 cup oats", "1 scoop protein powder", "2 eggs", "1 banana", "1 tsp baking powder", "1/2 cup almond milk", "1 tbsp honey"],
      description: "Fluffy, protein-rich pancakes perfect for muscle building and morning energy",
      instructions: [
        "Blend oats into flour consistency",
        "Mix dry ingredients in a bowl",
        "Mash banana and mix with wet ingredients",
        "Combine wet and dry ingredients",
        "Cook on medium heat for 2-3 minutes each side",
        "Serve with fresh berries and syrup"
      ],
      servings: 2,
      macros: { carbs: 35, fat: 8, fiber: 6 },
      tags: ["high-protein", "gluten-free", "muscle-building"]
    },
    {
      id: 2,
      name: "Mediterranean Grilled Chicken Salad",
      category: "lunch",
      difficulty: "easy",
      time: "20 min",
      calories: 380,
      protein: 35,
      image: "🥗",
      ingredients: ["6 oz chicken breast", "4 cups romaine lettuce", "1/4 cup feta cheese", "10 cherry tomatoes", "1/4 cucumber", "2 tbsp olive oil", "1 tbsp lemon juice", "1 tsp oregano"],
      description: "Fresh Mediterranean salad packed with lean protein and healthy fats",
      instructions: [
        "Season and grill chicken breast for 6-7 minutes each side",
        "Chop lettuce, tomatoes, and cucumber",
        "Mix olive oil, lemon juice, and oregano for dressing",
        "Slice grilled chicken",
        "Combine all ingredients",
        "Top with feta cheese and serve"
      ],
      servings: 1,
      macros: { carbs: 12, fat: 18, fiber: 8 },
      tags: ["mediterranean", "low-carb", "heart-healthy"]
    },
    {
      id: 3,
      name: "Asian Salmon Teriyaki Bowl",
      category: "dinner",
      difficulty: "medium",
      time: "30 min",
      calories: 520,
      protein: 40,
      image: "🍱",
      ingredients: ["6 oz salmon fillet", "1 cup brown rice", "1 cup broccoli", "1/2 cup carrots", "2 tbsp teriyaki sauce", "1 tbsp sesame oil", "1 tsp sesame seeds", "2 green onions"],
      description: "Asian-inspired healthy dinner bowl with omega-3 rich salmon",
      instructions: [
        "Cook brown rice according to package instructions",
        "Steam broccoli and carrots until tender",
        "Season salmon with salt and pepper",
        "Pan-sear salmon for 4-5 minutes each side",
        "Brush with teriyaki sauce in last minute",
        "Assemble bowl with rice, vegetables, and salmon",
        "Garnish with sesame seeds and green onions"
      ],
      servings: 1,
      macros: { carbs: 45, fat: 16, fiber: 6 },
      tags: ["omega-3", "asian-inspired", "balanced-meal"]
    },
    {
      id: 4,
      name: "Green Goddess Protein Smoothie",
      category: "smoothies",
      difficulty: "easy",
      time: "5 min",
      calories: 280,
      protein: 25,
      image: "🥤",
      ingredients: ["2 cups spinach", "1 scoop vanilla protein powder", "1 banana", "1 cup almond milk", "1 tbsp chia seeds", "1 tbsp almond butter", "1/2 avocado", "Ice cubes"],
      description: "Nutrient-dense green smoothie perfect for post-workout recovery",
      instructions: [
        "Add liquid ingredients to blender first",
        "Add spinach and blend until smooth",
        "Add remaining ingredients",
        "Blend until creamy consistency",
        "Add ice if desired thickness",
        "Pour and serve immediately"
      ],
      servings: 1,
      macros: { carbs: 28, fat: 12, fiber: 12 },
      tags: ["post-workout", "vegan-option", "superfood"]
    },
    {
      id: 5,
      name: "Quinoa Buddha Power Bowl",
      category: "lunch",
      difficulty: "medium",
      time: "25 min",
      calories: 450,
      protein: 18,
      image: "🥙",
      ingredients: ["1 cup quinoa", "1/2 cup chickpeas", "1/2 avocado", "1 cup roasted sweet potato", "2 tbsp tahini", "1 tbsp lemon juice", "1 cup kale", "1 tbsp pumpkin seeds"],
      description: "Plant-based power bowl packed with complete proteins and nutrients",
      instructions: [
        "Cook quinoa according to package instructions",
        "Roast sweet potato cubes at 400°F for 20 minutes",
        "Massage kale with lemon juice",
        "Rinse and season chickpeas",
        "Mix tahini with lemon juice for dressing",
        "Assemble bowl with all ingredients",
        "Drizzle with tahini dressing and top with seeds"
      ],
      servings: 1,
      macros: { carbs: 58, fat: 16, fiber: 14 },
      tags: ["plant-based", "complete-protein", "nutrient-dense"]
    },
    {
      id: 6,
      name: "Greek Yogurt Berry Parfait",
      category: "snacks",
      difficulty: "easy",
      time: "10 min",
      calories: 220,
      protein: 20,
      image: "🍓",
      ingredients: ["1 cup Greek yogurt", "1/2 cup mixed berries", "2 tbsp granola", "1 tbsp honey", "1 tbsp chopped almonds", "1 tsp chia seeds"],
      description: "Protein-rich snack perfect for any time of day",
      instructions: [
        "Layer half the yogurt in a glass or bowl",
        "Add half the berries and granola",
        "Repeat layers",
        "Drizzle with honey",
        "Top with almonds and chia seeds",
        "Serve immediately or chill"
      ],
      servings: 1,
      macros: { carbs: 25, fat: 6, fiber: 5 },
      tags: ["high-protein", "probiotic", "antioxidant-rich"]
    },
    {
      id: 7,
      name: "Chocolate Avocado Mousse",
      category: "desserts",
      difficulty: "easy",
      time: "10 min",
      calories: 180,
      protein: 8,
      image: "🍫",
      ingredients: ["2 ripe avocados", "3 tbsp cocoa powder", "2 tbsp protein powder", "2 tbsp maple syrup", "1 tsp vanilla extract", "Pinch of salt", "Dark chocolate shavings"],
      description: "Guilt-free chocolate dessert that's actually good for you",
      instructions: [
        "Blend all ingredients except chocolate shavings",
        "Blend until smooth and creamy",
        "Taste and adjust sweetness",
        "Chill for 30 minutes",
        "Serve in small bowls",
        "Top with chocolate shavings"
      ],
      servings: 4,
      macros: { carbs: 18, fat: 12, fiber: 10 },
      tags: ["healthy-dessert", "antioxidant-rich", "no-bake"]
    },
    {
      id: 8,
      name: "Spicy Thai Beef Lettuce Wraps",
      category: "dinner",
      difficulty: "medium",
      time: "25 min",
      calories: 320,
      protein: 28,
      image: "🥥",
      ingredients: ["6 oz lean ground beef", "1 head butter lettuce", "1 bell pepper", "1/4 cup cilantro", "2 tbsp lime juice", "1 tbsp fish sauce", "1 tsp chili flakes", "1 clove garlic"],
      description: "Low-carb, high-protein wraps with bold Thai flavors",
      instructions: [
        "Brown ground beef in a large pan",
        "Add minced garlic and bell pepper",
        "Season with fish sauce and chili flakes",
        "Cook until peppers are tender",
        "Separate lettuce leaves for cups",
        "Fill lettuce cups with beef mixture",
        "Garnish with cilantro and lime juice"
      ],
      servings: 2,
      macros: { carbs: 8, fat: 14, fiber: 3 },
      tags: ["low-carb", "keto-friendly", "thai-inspired"]
    }
  ];

  const filteredRecipes = recipes.filter(recipe => {
    const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || recipe.difficulty === selectedDifficulty;
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  const toggleSaveRecipe = (recipeId: number) => {
    setSavedRecipes(prev => 
      prev.includes(recipeId) 
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  const openRecipeModal = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    document.body.style.overflow = 'hidden';
  };

  const closeRecipeModal = () => {
    setSelectedRecipe(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-poppins">
            Recipe Library
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover delicious, healthy recipes tailored to your fitness goals
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 lg:mb-12">
          <div className="flex flex-col gap-6">
            {/* Search */}
            <div className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search recipes, ingredients, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-12 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-base"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔍
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105 ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg'
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-gray-600 shadow-sm'
                    }`}
                  >
                    <span className="mr-1">{category.icon}</span>
                    <span className="hidden sm:inline">{category.name}</span>
                    <span className="sm:hidden">{category.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Difficulty Level</h3>
              <div className="flex flex-wrap gap-2">
                {difficulties.map((difficulty) => (
                  <button
                    key={difficulty.id}
                    onClick={() => setSelectedDifficulty(difficulty.id)}
                    className={`px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105 ${
                      selectedDifficulty === difficulty.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-600 shadow-sm'
                    }`}
                  >
                    <span className="mr-1">{difficulty.icon}</span>
                    {difficulty.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Showing <span className="font-bold text-green-600 dark:text-green-400">{filteredRecipes.length}</span> recipes
            {searchTerm && (
              <span> for &quot;{searchTerm}&quot;</span>
            )}
          </p>
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl sm:text-4xl">{recipe.image}</div>
                  <div className="text-right">
                    <div className="text-xl sm:text-2xl font-bold text-green-600">{recipe.calories}</div>
                    <div className="text-xs text-gray-500">calories</div>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                  {recipe.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                  {recipe.description}
                </p>

                <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span>⏱️ {recipe.time}</span>
                  <span>💪 {recipe.protein}g protein</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    recipe.difficulty === 'easy' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    recipe.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {recipe.difficulty}
                  </span>
                </div>

                {/* Tags */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {recipe.tags.slice(0, 2).map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">
                        #{tag}
                      </span>
                    ))}
                    {recipe.tags.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                        +{recipe.tags.length - 2}
                      </span>
                    )}
                  </div>
                </div>

                {/* Macros */}
                <div className="grid grid-cols-4 gap-2 mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-center">
                    <div className="text-sm font-bold text-blue-600 dark:text-blue-400">{recipe.protein}g</div>
                    <div className="text-xs text-gray-500">Protein</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-orange-600 dark:text-orange-400">{recipe.macros.carbs}g</div>
                    <div className="text-xs text-gray-500">Carbs</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-purple-600 dark:text-purple-400">{recipe.macros.fat}g</div>
                    <div className="text-xs text-gray-500">Fat</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-green-600 dark:text-green-400">{recipe.macros.fiber}g</div>
                    <div className="text-xs text-gray-500">Fiber</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => openRecipeModal(recipe)}
                    className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white py-2 px-3 sm:px-4 rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-200 text-sm"
                  >
                    View Recipe
                  </button>
                  <button 
                    onClick={() => toggleSaveRecipe(recipe.id)}
                    className={`px-3 sm:px-4 py-2 border rounded-lg transition-colors text-sm ${
                      savedRecipes.includes(recipe.id)
                        ? 'bg-red-500 text-white border-red-500 hover:bg-red-600'
                        : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    {savedRecipes.includes(recipe.id) ? '❤️' : '🔖'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <div className="text-center py-12 lg:py-16">
            <div className="text-6xl lg:text-8xl mb-4">🔍</div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">No recipes found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Try adjusting your search terms or filters</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedDifficulty('all');
              }}
              className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Recipe Modal */}
        {selectedRecipe && (
          <div className="fixed inset-0 z-50 overflow-y-auto" onClick={closeRecipeModal}>
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
              <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" aria-hidden="true"></div>
              
              <div 
                className="relative inline-block w-full max-w-4xl p-6 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">{selectedRecipe.image}</div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {selectedRecipe.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">{selectedRecipe.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={closeRecipeModal}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl font-bold"
                  >
                    ×
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Recipe Info */}
                  <div className="lg:col-span-1 space-y-6">
                    {/* Quick Stats */}
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                      <h4 className="font-bold text-gray-900 dark:text-white mb-3">Recipe Info</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">⏱️ Prep Time:</span>
                          <span className="font-semibold">{selectedRecipe.time}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">🍽️ Servings:</span>
                          <span className="font-semibold">{selectedRecipe.servings}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">📊 Difficulty:</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            selectedRecipe.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                            selectedRecipe.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {selectedRecipe.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Nutrition */}
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                      <h4 className="font-bold text-gray-900 dark:text-white mb-3">Nutrition (per serving)</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">{selectedRecipe.calories}</div>
                          <div className="text-xs text-gray-500">Calories</div>
                        </div>
                        <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">{selectedRecipe.protein}g</div>
                          <div className="text-xs text-gray-500">Protein</div>
                        </div>
                        <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                          <div className="text-2xl font-bold text-orange-600">{selectedRecipe.macros.carbs}g</div>
                          <div className="text-xs text-gray-500">Carbs</div>
                        </div>
                        <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">{selectedRecipe.macros.fat}g</div>
                          <div className="text-xs text-gray-500">Fat</div>
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-3">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedRecipe.tags.map((tag, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Recipe Details */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Ingredients */}
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Ingredients</h4>
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                        <ul className="space-y-2">
                          {selectedRecipe.ingredients.map((ingredient, index) => (
                            <li key={index} className="flex items-center space-x-3">
                              <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                {index + 1}
                              </span>
                              <span className="text-gray-700 dark:text-gray-300">{ingredient}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Instructions */}
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Instructions</h4>
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                        <ol className="space-y-4">
                          {selectedRecipe.instructions.map((instruction, index) => (
                            <li key={index} className="flex space-x-4">
                              <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                                {index + 1}
                              </span>
                              <span className="text-gray-700 dark:text-gray-300 leading-relaxed">{instruction}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
                  <button
                    onClick={() => toggleSaveRecipe(selectedRecipe.id)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                      savedRecipes.includes(selectedRecipe.id)
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    <span>{savedRecipes.includes(selectedRecipe.id) ? '❤️' : '🔖'}</span>
                    <span>{savedRecipes.includes(selectedRecipe.id) ? 'Saved!' : 'Save Recipe'}</span>
                  </button>
                  
                  <div className="flex space-x-3">
                    <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                      📝 Add to Meal Plan
                    </button>
                    <button className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors">
                      🛒 Add to Grocery List
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}


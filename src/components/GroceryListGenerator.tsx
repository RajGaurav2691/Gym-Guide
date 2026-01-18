'use client';

import { useState } from 'react';

interface GroceryItem {
  name: string;
  quantity: string;
  category: string;
  checked: boolean;
  price?: number;
}

interface GroceryList {
  [category: string]: GroceryItem[];
}

export default function GroceryListGenerator() {
  const [selectedMealPlan, setSelectedMealPlan] = useState('weight-loss');
  const [generatedList, setGeneratedList] = useState<GroceryList | null>(null);
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [customItem, setCustomItem] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const mealPlans = [
    { id: 'weight-loss', name: 'Weight Loss Plan', duration: '7 days', icon: '🔥', color: 'from-red-500 to-orange-500' },
    { id: 'muscle-gain', name: 'Muscle Gain Plan', duration: '7 days', icon: '💪', color: 'from-blue-500 to-purple-500' },
    { id: 'keto', name: 'Keto Plan', duration: '7 days', icon: '🥑', color: 'from-green-500 to-teal-500' },
    { id: 'vegan', name: 'Vegan Plan', duration: '7 days', icon: '🌱', color: 'from-emerald-500 to-lime-500' },
    { id: 'mediterranean', name: 'Mediterranean Plan', duration: '7 days', icon: '🫒', color: 'from-cyan-500 to-blue-500' },
    { id: 'paleo', name: 'Paleo Plan', duration: '7 days', icon: '🦴', color: 'from-amber-500 to-orange-500' }
  ];

  const sampleGroceryLists = {
    'weight-loss': {
      proteins: [
        { name: 'Chicken Breast (Lean)', quantity: '2 lbs', category: 'Lean Meat', checked: false, price: 12.99 },
        { name: 'Salmon Fillet', quantity: '1.5 lbs', category: 'Fish', checked: false, price: 18.99 },
        { name: 'Greek Yogurt (0% Fat)', quantity: '32 oz', category: 'Dairy', checked: false, price: 5.99 },
        { name: 'Egg Whites', quantity: '1 carton', category: 'Dairy', checked: false, price: 4.49 },
        { name: 'Protein Powder (Whey)', quantity: '1 container', category: 'Supplements', checked: false, price: 29.99 }
      ],
      vegetables: [
        { name: 'Spinach (Baby)', quantity: '3 bags', category: 'Leafy Greens', checked: false, price: 8.97 },
        { name: 'Broccoli', quantity: '3 heads', category: 'Cruciferous', checked: false, price: 5.97 },
        { name: 'Zucchini', quantity: '4 pieces', category: 'Low-Carb Veggies', checked: false, price: 3.96 },
        { name: 'Bell Peppers (Mixed)', quantity: '6 pieces', category: 'Colorful Veggies', checked: false, price: 7.94 },
        { name: 'Cucumber', quantity: '3 pieces', category: 'Hydrating Veggies', checked: false, price: 2.97 }
      ],
      fruits: [
        { name: 'Berries (Mixed)', quantity: '3 containers', category: 'Low-Sugar Fruits', checked: false, price: 11.97 },
        { name: 'Green Apples', quantity: '6 pieces', category: 'Fiber-Rich Fruits', checked: false, price: 4.99 },
        { name: 'Avocado', quantity: '4 pieces', category: 'Healthy Fats', checked: false, price: 7.96 }
      ],
      pantry: [
        { name: 'Olive Oil (Extra Virgin)', quantity: '1 bottle', category: 'Cooking Oil', checked: false, price: 8.99 },
        { name: 'Quinoa', quantity: '1 lb', category: 'Whole Grains', checked: false, price: 4.99 },
        { name: 'Almonds (Raw)', quantity: '1 bag', category: 'Nuts', checked: false, price: 6.99 }
      ]
    },
    'muscle-gain': {
      proteins: [
        { name: 'Chicken Thighs', quantity: '3 lbs', category: 'Protein', checked: false, price: 9.99 },
        { name: 'Ground Beef (85/15)', quantity: '2 lbs', category: 'Protein', checked: false, price: 14.99 },
        { name: 'Whole Milk', quantity: '1 gallon', category: 'Dairy', checked: false, price: 3.99 },
        { name: 'Cottage Cheese', quantity: '24 oz', category: 'Dairy', checked: false, price: 4.99 },
        { name: 'Mass Gainer Protein', quantity: '1 container', category: 'Supplements', checked: false, price: 39.99 }
      ],
      carbs: [
        { name: 'Brown Rice', quantity: '5 lbs', category: 'Grains', checked: false, price: 7.99 },
        { name: 'Sweet Potatoes', quantity: '5 lbs', category: 'Starchy Carbs', checked: false, price: 6.99 },
        { name: 'Oats (Steel Cut)', quantity: '2 containers', category: 'Breakfast', checked: false, price: 9.98 },
        { name: 'Whole Wheat Pasta', quantity: '3 boxes', category: 'Pasta', checked: false, price: 8.97 }
      ],
      fats: [
        { name: 'Peanut Butter (Natural)', quantity: '2 jars', category: 'Nut Butters', checked: false, price: 11.98 },
        { name: 'Coconut Oil', quantity: '1 jar', category: 'Cooking Oil', checked: false, price: 9.99 },
        { name: 'Mixed Nuts', quantity: '2 bags', category: 'Snacks', checked: false, price: 13.98 }
      ]
    },
    'keto': {
      fats: [
        { name: 'Avocados', quantity: '8 pieces', category: 'Healthy Fats', checked: false, price: 15.92 },
        { name: 'MCT Oil', quantity: '1 bottle', category: 'Supplements', checked: false, price: 19.99 },
        { name: 'Grass-Fed Butter', quantity: '2 sticks', category: 'Dairy', checked: false, price: 8.98 },
        { name: 'Macadamia Nuts', quantity: '1 bag', category: 'Nuts', checked: false, price: 12.99 }
      ],
      proteins: [
        { name: 'Ribeye Steak', quantity: '2 lbs', category: 'High-Fat Meat', checked: false, price: 28.99 },
        { name: 'Bacon (Sugar-Free)', quantity: '2 packs', category: 'Processed Meat', checked: false, price: 11.98 },
        { name: 'Full-Fat Cheese', quantity: '1 lb', category: 'Dairy', checked: false, price: 8.99 }
      ],
      vegetables: [
        { name: 'Cauliflower', quantity: '2 heads', category: 'Low-Carb Veggies', checked: false, price: 7.98 },
        { name: 'Kale', quantity: '2 bunches', category: 'Leafy Greens', checked: false, price: 5.98 },
        { name: 'Asparagus', quantity: '2 bunches', category: 'Low-Carb Veggies', checked: false, price: 7.98 }
      ]
    }
  };

  const generateGroceryList = async () => {
    setIsGenerating(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const selectedList = sampleGroceryLists[selectedMealPlan as keyof typeof sampleGroceryLists] || sampleGroceryLists['weight-loss'];
    setGeneratedList(selectedList);
    setCheckedItems(new Set());
    setIsGenerating(false);
  };

  const toggleItemCheck = (itemKey: string) => {
    setCheckedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemKey)) {
        newSet.delete(itemKey);
      } else {
        newSet.add(itemKey);
      }
      return newSet;
    });
  };

  const addCustomItem = () => {
    if (customItem.trim() && generatedList) {
      const updatedList = { ...generatedList };
      if (!updatedList.custom) {
        updatedList.custom = [];
      }
      updatedList.custom.push({
        name: customItem.trim(),
        quantity: '1',
        category: 'Custom',
        checked: false
      });
      setGeneratedList(updatedList);
      setCustomItem('');
    }
  };

  const exportList = () => {
    if (!generatedList) return;
    
    // Create downloadable content
    const totalItems = Object.values(generatedList).flat().length;
    const checkedCount = checkedItems.size;
    const totalPrice = Object.values(generatedList).flat().reduce((sum, item) => sum + (item.price || 0), 0);
    
    let content = `GROCERY LIST - ${mealPlans.find(p => p.id === selectedMealPlan)?.name}\n`;
    content += `Generated: ${new Date().toLocaleDateString()}\n`;
    content += `Total Items: ${totalItems} | Completed: ${checkedCount}\n`;
    content += `Estimated Total: $${totalPrice.toFixed(2)}\n\n`;
    
    Object.entries(generatedList).forEach(([category, items]) => {
      content += `\n${category.toUpperCase()}:\n`;
      items.forEach(item => {
        const status = checkedItems.has(`${category}-${item.name}`) ? '✓' : '☐';
        content += `${status} ${item.name} - ${item.quantity}${item.price ? ` ($${item.price})` : ''}\n`;
      });
    });
    
    // Create and download file
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `grocery-list-${selectedMealPlan}-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-poppins">
            Smart Grocery List Generator
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Automatically generate your shopping list based on your meal plan with price estimates
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12">
          {/* Meal Plan Selection */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Select Your Meal Plan
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {mealPlans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => setSelectedMealPlan(plan.id)}
                  className={`p-4 sm:p-6 rounded-xl text-left transition-all duration-300 transform hover:scale-105 ${
                    selectedMealPlan === plan.id
                      ? `bg-gradient-to-r ${plan.color} text-white shadow-xl scale-105`
                      : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-2xl sm:text-3xl">{plan.icon}</div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500 dark:text-gray-400">{plan.duration}</div>
                    </div>
                  </div>
                  <div className="font-semibold text-sm sm:text-base">{plan.name}</div>
                </button>
              ))}
            </div>

            <button
              onClick={generateGroceryList}
              disabled={isGenerating}
              className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                isGenerating
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl'
              }`}
            >
              {isGenerating ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Generating List...</span>
                </div>
              ) : (
                'Generate Smart Grocery List 🛒'
              )}
            </button>
            
            {/* Plan Preview */}
            {selectedMealPlan && (
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Plan Features:
                </h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  {selectedMealPlan === 'weight-loss' && (
                    <>
                      <li>• Low-calorie, high-protein foods</li>
                      <li>• Lean meats and vegetables</li>
                      <li>• Portion-controlled ingredients</li>
                    </>
                  )}
                  {selectedMealPlan === 'muscle-gain' && (
                    <>
                      <li>• High-protein, calorie-dense foods</li>
                      <li>• Complex carbohydrates</li>
                      <li>• Healthy fats for energy</li>
                    </>
                  )}
                  {selectedMealPlan === 'keto' && (
                    <>
                      <li>• High-fat, low-carb foods</li>
                      <li>• Keto-friendly vegetables</li>
                      <li>• Quality fats and oils</li>
                    </>
                  )}
                </ul>
              </div>
            )}
          </div>

          {/* Generated Grocery List */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0">
                Your Smart Shopping List
              </h3>
              {generatedList && (
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={exportList}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors text-sm"
                  >
                    💾 Export List
                  </button>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors text-sm"
                  >
                    📱 Send to Phone
                  </button>
                </div>
              )}
            </div>

            {generatedList ? (
              <div className="space-y-6">
                {/* Add Custom Item */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">
                    Add Custom Item
                  </h4>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customItem}
                      onChange={(e) => setCustomItem(e.target.value)}
                      placeholder="Enter item name..."
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                      onKeyPress={(e) => e.key === 'Enter' && addCustomItem()}
                    />
                    <button
                      onClick={addCustomItem}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors text-sm"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Shopping List Categories */}
                {Object.entries(generatedList).map(([category, items]) => (
                  <div key={category} className="border border-gray-200 dark:border-gray-600 rounded-xl overflow-hidden">
                    <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3">
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 capitalize flex items-center justify-between">
                        <span>{category} ({items.length} items)</span>
                        <span className="text-sm text-gray-500">
                          ${items.reduce((sum, item) => sum + (item.price || 0), 0).toFixed(2)}
                        </span>
                      </h4>
                    </div>
                    <div className="divide-y divide-gray-200 dark:divide-gray-600">
                      {items.map((item, index) => {
                        const itemKey = `${category}-${item.name}`;
                        const isChecked = checkedItems.has(itemKey);
                        return (
                          <div 
                            key={index} 
                            className={`flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                              isChecked ? 'opacity-50' : ''
                            }`}
                          >
                            <div className="flex items-center space-x-3 flex-1">
                              <input 
                                type="checkbox" 
                                checked={isChecked}
                                onChange={() => toggleItemCheck(itemKey)}
                                className="w-5 h-5 text-green-500 border-gray-300 rounded focus:ring-green-500"
                              />
                              <div className="flex-1">
                                <span className={`text-gray-700 dark:text-gray-300 font-medium ${
                                  isChecked ? 'line-through' : ''
                                }`}>
                                  {item.name}
                                </span>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  {item.category}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold text-gray-700 dark:text-gray-300">
                                {item.quantity}
                              </div>
                              {item.price && (
                                <div className="text-sm text-green-600 dark:text-green-400">
                                  ${item.price.toFixed(2)}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {/* Summary */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900 dark:to-blue-900 rounded-xl p-6">
                  <h4 className="font-bold text-lg text-green-800 dark:text-green-200 mb-4 text-center">
                    📊 Shopping Summary
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center shadow-sm">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {Object.values(generatedList).flat().length}
                      </div>
                      <div className="text-sm text-green-700 dark:text-green-300">Total Items</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center shadow-sm">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {checkedItems.size}
                      </div>
                      <div className="text-sm text-blue-700 dark:text-blue-300">Completed</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center shadow-sm">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        ${Object.values(generatedList).flat().reduce((sum, item) => sum + (item.price || 0), 0).toFixed(2)}
                      </div>
                      <div className="text-sm text-purple-700 dark:text-purple-300">Est. Total</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center shadow-sm">
                      <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                        {Math.round((checkedItems.size / Object.values(generatedList).flat().length) * 100)}%
                      </div>
                      <div className="text-sm text-orange-700 dark:text-orange-300">Progress</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(checkedItems.size / Object.values(generatedList).flat().length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400 py-12">
                <div className="text-6xl mb-4">🛒</div>
                <h4 className="text-lg font-semibold mb-2">Ready to Shop Smart?</h4>
                <p className="text-sm mb-6">Select a meal plan to generate your optimized grocery list</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-gray-400 max-w-md mx-auto">
                  <p>✨ Price estimates included</p>
                  <p>🎨 Organized by category</p>
                  <p>📱 Export to your phone</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Smart Shopping Tips */}
        <div className="mt-12 lg:mt-16 bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            🧠 Smart Shopping Tips
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900 rounded-xl">
              <div className="text-3xl sm:text-4xl mb-3">🕰️</div>
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2 text-sm sm:text-base">Best Times</h4>
              <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-300">
                Shop early morning (7-9 AM) or late evening (8-10 PM) for freshest produce and fewer crowds
              </p>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-900 rounded-xl">
              <div className="text-3xl sm:text-4xl mb-3">💰</div>
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2 text-sm sm:text-base">Save Money</h4>
              <p className="text-xs sm:text-sm text-green-600 dark:text-green-300">
                Buy seasonal produce, use store apps for digital coupons, and consider frozen options for better value
              </p>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900 rounded-xl">
              <div className="text-3xl sm:text-4xl mb-3">📱</div>
              <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2 text-sm sm:text-base">Stay Organized</h4>
              <p className="text-xs sm:text-sm text-purple-600 dark:text-purple-300">
                Group items by store sections and follow your list order to make shopping more efficient
              </p>
            </div>
            <div className="text-center p-4 bg-orange-50 dark:bg-orange-900 rounded-xl">
              <div className="text-3xl sm:text-4xl mb-3">🥬</div>
              <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2 text-sm sm:text-base">Fresh Choice</h4>
              <p className="text-xs sm:text-sm text-orange-600 dark:text-orange-300">
                Check expiration dates, feel fruits for ripeness, and shop the perimeter first for fresh items
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


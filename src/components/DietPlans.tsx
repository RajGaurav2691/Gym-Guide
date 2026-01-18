'use client';

import { useState } from 'react';

export default function DietPlans() {
  const [activePlan, setActivePlan] = useState(0);

  const dietPlans = [
    {
      name: "Weight Loss",
      description: "Calorie-controlled plan for sustainable weight loss",
      duration: "12 weeks",
      difficulty: "Beginner",
      color: "from-red-500 to-pink-500",
      meals: [
        { name: "Breakfast", items: ["Oatmeal with berries", "Greek yogurt", "Green tea"] },
        { name: "Snack", items: ["Apple with almond butter", "Mixed nuts"] },
        { name: "Lunch", items: ["Grilled chicken salad", "Quinoa", "Vegetables"] },
        { name: "Snack", items: ["Protein shake", "Banana"] },
        { name: "Dinner", items: ["Baked salmon", "Sweet potato", "Broccoli"] }
      ],
      calories: "1200-1500",
      macros: { protein: "30%", carbs: "40%", fat: "30%" }
    },
    {
      name: "Muscle Gain",
      description: "High-protein plan for muscle building and strength",
      duration: "16 weeks",
      difficulty: "Intermediate",
      color: "from-blue-500 to-purple-500",
      meals: [
        { name: "Breakfast", items: ["Protein pancakes", "Eggs", "Avocado toast"] },
        { name: "Snack", items: ["Protein shake", "Banana", "Peanut butter"] },
        { name: "Lunch", items: ["Grilled chicken breast", "Brown rice", "Mixed vegetables"] },
        { name: "Pre-workout", items: ["Greek yogurt", "Berries", "Honey"] },
        { name: "Post-workout", items: ["Whey protein", "Banana", "Oats"] },
        { name: "Dinner", items: ["Lean beef", "Sweet potato", "Asparagus"] }
      ],
      calories: "2500-3000",
      macros: { protein: "35%", carbs: "45%", fat: "20%" }
    },
    {
      name: "Keto",
      description: "Low-carb, high-fat diet for rapid fat burning",
      duration: "8 weeks",
      difficulty: "Advanced",
      color: "from-green-500 to-teal-500",
      meals: [
        { name: "Breakfast", items: ["Bacon and eggs", "Avocado", "Bulletproof coffee"] },
        { name: "Snack", items: ["Cheese cubes", "Nuts", "Olives"] },
        { name: "Lunch", items: ["Caesar salad", "Grilled chicken", "Parmesan cheese"] },
        { name: "Snack", items: ["Keto fat bombs", "Coconut oil"] },
        { name: "Dinner", items: ["Salmon", "Zucchini noodles", "Butter sauce"] }
      ],
      calories: "1500-1800",
      macros: { protein: "25%", carbs: "5%", fat: "70%" }
    },
    {
      name: "Intermittent Fasting",
      description: "Time-restricted eating for metabolic health",
      duration: "Ongoing",
      difficulty: "Intermediate",
      color: "from-orange-500 to-red-500",
      meals: [
        { name: "Fasting Window", items: ["Water", "Black coffee", "Green tea"] },
        { name: "Eating Window", items: ["Balanced meals", "Nutrient-dense foods", "Adequate protein"] },
        { name: "Sample Meal", items: ["Grilled chicken", "Quinoa", "Vegetables", "Healthy fats"] }
      ],
      calories: "1600-2000",
      macros: { protein: "30%", carbs: "35%", fat: "35%" }
    }
  ];

  return (
    <section id="diet-plans" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 font-poppins">
            Diet Plans
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our scientifically-backed nutrition plans designed to help you achieve your specific fitness goals
          </p>
        </div>

        {/* Plan Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {dietPlans.map((plan, index) => (
            <button
              key={index}
              onClick={() => setActivePlan(index)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                activePlan === index
                  ? `bg-gradient-to-r ${plan.color} text-white shadow-lg`
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {plan.name}
            </button>
          ))}
        </div>

        {/* Active Plan Details */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className={`bg-gradient-to-r ${dietPlans[activePlan].color} p-8 text-white`}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-3xl font-bold mb-2">{dietPlans[activePlan].name}</h3>
                <p className="text-xl mb-4">{dietPlans[activePlan].description}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
                    Duration: {dietPlans[activePlan].duration}
                  </span>
                  <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
                    Level: {dietPlans[activePlan].difficulty}
                  </span>
                  <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
                    Calories: {dietPlans[activePlan].calories}
                  </span>
                </div>
              </div>
              <div className="mt-6 md:mt-0">
                <div className="text-right">
                  <h4 className="text-lg font-semibold mb-2">Macro Split</h4>
                  <div className="space-y-1">
                    <div>Protein: {dietPlans[activePlan].macros.protein}</div>
                    <div>Carbs: {dietPlans[activePlan].macros.carbs}</div>
                    <div>Fat: {dietPlans[activePlan].macros.fat}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <h4 className="text-2xl font-bold text-gray-900 mb-6">Daily Meal Plan</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dietPlans[activePlan].meals.map((meal, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <h5 className="text-lg font-semibold text-gray-900 mb-3">{meal.name}</h5>
                  <ul className="space-y-2">
                    {meal.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-gray-700 flex items-center">
                        <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-red-600 hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl">
            Get Your Custom Diet Plan
          </button>
        </div>
      </div>
    </section>
  );
}

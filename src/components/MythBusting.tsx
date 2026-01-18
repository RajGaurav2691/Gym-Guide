'use client';

import { useState } from 'react';

export default function MythBusting() {
  const [selectedMyth, setSelectedMyth] = useState(0);

  const myths = [
    {
      myth: "Carbs make you fat",
      truth: "FALSE",
      explanation: "Excess calories from any macronutrient can lead to weight gain. Carbs are essential for energy and muscle glycogen replenishment.",
      evidence: "Studies show that total caloric intake, not carb intake, determines weight gain or loss.",
      category: "Nutrition"
    },
    {
      myth: "You need to work out every day",
      truth: "FALSE",
      explanation: "Rest days are crucial for muscle recovery and growth. Overtraining can lead to injury and decreased performance.",
      evidence: "Muscle protein synthesis peaks 24-48 hours after training, requiring adequate rest.",
      category: "Training"
    },
    {
      myth: "Spot reduction is possible",
      truth: "FALSE",
      explanation: "You cannot target fat loss in specific body areas through exercise. Fat loss occurs throughout the body based on genetics and hormones.",
      evidence: "Research consistently shows that targeted exercises don't reduce fat in those specific areas.",
      category: "Training"
    },
    {
      myth: "Protein shakes are necessary",
      truth: "FALSE",
      explanation: "Whole foods can provide all necessary protein. Supplements are convenient but not essential for muscle building.",
      evidence: "Studies show no difference in muscle growth between whole food protein and protein supplements when total protein intake is adequate.",
      category: "Nutrition"
    },
    {
      myth: "More protein = more muscle",
      truth: "PARTIALLY TRUE",
      explanation: "While protein is essential for muscle building, there's an upper limit. Excess protein doesn't create more muscle and can strain kidneys.",
      evidence: "Research suggests 1.6-2.2g protein per kg bodyweight is optimal for muscle building.",
      category: "Nutrition"
    },
    {
      myth: "Cardio kills gains",
      truth: "FALSE",
      explanation: "Moderate cardio can actually improve recovery and muscle growth by enhancing blood flow and nutrient delivery.",
      evidence: "Studies show that moderate cardio doesn't interfere with strength gains and may enhance them.",
      category: "Training"
    }
  ];

  const nextMyth = () => {
    setSelectedMyth((prev) => (prev + 1) % myths.length);
  };

  const prevMyth = () => {
    setSelectedMyth((prev) => (prev - 1 + myths.length) % myths.length);
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-poppins">
            Myth Busting
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Separate fitness facts from fiction with evidence-based myth busting
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Myth Card */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <span className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-full text-sm font-semibold">
                    {myths[selectedMyth].category}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    Myth {selectedMyth + 1} of {myths.length}
                  </span>
                </div>
                <div className={`px-4 py-2 rounded-full font-bold text-lg ${
                  myths[selectedMyth].truth === 'FALSE' 
                    ? 'bg-red-500 text-white' 
                    : myths[selectedMyth].truth === 'TRUE'
                    ? 'bg-green-500 text-white'
                    : 'bg-yellow-500 text-white'
                }`}>
                  {myths[selectedMyth].truth}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  "{myths[selectedMyth].myth}"
                </h3>
                <div className="text-2xl text-gray-600 dark:text-gray-300 mb-6">
                  {myths[selectedMyth].explanation}
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-8">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Scientific Evidence
                </h4>
                <p className="text-gray-700 dark:text-gray-300">
                  {myths[selectedMyth].evidence}
                </p>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <button
                  onClick={prevMyth}
                  className="flex items-center space-x-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>Previous</span>
                </button>

                <div className="flex space-x-2">
                  {myths.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedMyth(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === selectedMyth ? 'bg-indigo-500' : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextMyth}
                  className="flex items-center space-x-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <span>Next</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 text-center shadow-lg">
              <div className="text-3xl font-bold text-red-600 mb-2">85%</div>
              <div className="text-gray-600 dark:text-gray-400">Myths are False</div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 text-center shadow-lg">
              <div className="text-3xl font-bold text-yellow-600 mb-2">10%</div>
              <div className="text-gray-600 dark:text-gray-400">Partially True</div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 text-center shadow-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">5%</div>
              <div className="text-gray-600 dark:text-gray-400">Actually True</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
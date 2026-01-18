'use client';

import { useState } from 'react';

export default function FitnessGlossary() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTerm, setSelectedTerm] = useState(null);

  const categories = [
    { id: 'all', name: 'All Terms' },
    { id: 'training', name: 'Training' },
    { id: 'nutrition', name: 'Nutrition' },
    { id: 'anatomy', name: 'Anatomy' },
    { id: 'physiology', name: 'Physiology' }
  ];

  const terms = [
    {
      id: 1,
      term: "Hypertrophy",
      category: "training",
      definition: "The increase in muscle fiber size through resistance training.",
      example: "Progressive overload training leads to muscle hypertrophy.",
      related: ["Muscle Growth", "Resistance Training", "Protein Synthesis"]
    },
    {
      id: 2,
      term: "Progressive Overload",
      category: "training",
      definition: "Gradually increasing the stress placed on the body during exercise.",
      example: "Adding 5 pounds to your bench press each week is progressive overload.",
      related: ["Strength Training", "Adaptation", "Periodization"]
    },
    {
      id: 3,
      term: "BMR (Basal Metabolic Rate)",
      category: "physiology",
      definition: "The number of calories your body burns at rest to maintain basic functions.",
      example: "A person with higher muscle mass typically has a higher BMR.",
      related: ["Metabolism", "TDEE", "Calories"]
    },
    {
      id: 4,
      term: "Macronutrients",
      category: "nutrition",
      definition: "The three main nutrients needed in large amounts: protein, carbohydrates, and fats.",
      example: "A balanced diet includes all three macronutrients in appropriate ratios.",
      related: ["Protein", "Carbohydrates", "Fats", "Micronutrients"]
    },
    {
      id: 5,
      term: "EPOC (Excess Post-Exercise Oxygen Consumption)",
      category: "physiology",
      definition: "The increased rate of oxygen intake following strenuous activity.",
      example: "HIIT workouts create a significant EPOC effect, burning calories after exercise.",
      related: ["Metabolism", "HIIT", "Calorie Burn"]
    },
    {
      id: 6,
      term: "DOMS (Delayed Onset Muscle Soreness)",
      category: "training",
      definition: "Muscle pain and stiffness that occurs 24-72 hours after exercise.",
      example: "New exercisers often experience DOMS after their first few workouts.",
      related: ["Recovery", "Muscle Damage", "Adaptation"]
    },
    {
      id: 7,
      term: "Glycogen",
      category: "nutrition",
      definition: "The stored form of glucose in muscles and liver.",
      example: "Carbohydrate loading before endurance events maximizes glycogen stores.",
      related: ["Carbohydrates", "Energy", "Glucose"]
    },
    {
      id: 8,
      term: "Periodization",
      category: "training",
      definition: "The systematic planning of training phases to optimize performance.",
      example: "A 12-week program might include 4 weeks of strength, 4 weeks of power, and 4 weeks of peaking.",
      related: ["Programming", "Adaptation", "Recovery"]
    },
    {
      id: 9,
      term: "Myofibrillar Hypertrophy",
      category: "anatomy",
      definition: "Growth of muscle fiber contractile proteins (myofibrils).",
      example: "Heavy strength training primarily stimulates myofibrillar hypertrophy.",
      related: ["Muscle Growth", "Strength", "Sarcoplasmic Hypertrophy"]
    },
    {
      id: 10,
      term: "Insulin Sensitivity",
      category: "physiology",
      definition: "How effectively cells respond to insulin to take up glucose.",
      example: "Regular exercise improves insulin sensitivity, reducing diabetes risk.",
      related: ["Glucose", "Diabetes", "Metabolism"]
    },
    {
      id: 11,
      term: "RPE (Rate of Perceived Exertion)",
      category: "training",
      definition: "A subjective scale (1-10) to measure exercise intensity.",
      example: "A jog might be RPE 4, while sprinting could be RPE 9.",
      related: ["Intensity", "Heart Rate", "Training Zones"]
    },
    {
      id: 12,
      term: "Anabolic",
      category: "physiology",
      definition: "Processes that build up molecules and tissues in the body.",
      example: "Protein synthesis is an anabolic process that builds muscle tissue.",
      related: ["Catabolic", "Muscle Growth", "Protein Synthesis"]
    }
  ];

  const filteredTerms = terms.filter(term => {
    const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         term.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         term.related.some(related => related.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-poppins">
            Fitness Glossary
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Master fitness terminology with our comprehensive glossary of key terms and concepts
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
        {/* Search */}
            <div className="w-full lg:w-1/3">
          <input
            type="text"
            placeholder="Search terms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
            <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-indigo-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-gray-600'
                  }`}
                >
                  {category.name}
            </button>
          ))}
            </div>
          </div>
        </div>

        {/* Terms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTerms.map((term) => (
            <div
              key={term.id}
              onClick={() => setSelectedTerm(term)}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{term.term}</h3>
                <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs rounded-full capitalize">
                  {term.category}
                        </span>
                      </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                {term.definition}
              </p>
              <div className="flex flex-wrap gap-1">
                {term.related.slice(0, 2).map((related, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-xs rounded">
                    {related}
                  </span>
                ))}
                {term.related.length > 2 && (
                  <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-xs rounded">
                    +{term.related.length - 2}
                  </span>
                )}
              </div>
                  </div>
                ))}
              </div>

        {filteredTerms.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-500 dark:text-gray-400">No terms found matching your criteria</p>
              </div>
            )}
          </div>

      {/* Term Detail Modal */}
      {selectedTerm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {selectedTerm.term}
                  </h3>
                  <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-sm rounded-full capitalize">
                    {selectedTerm.category}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedTerm(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Definition</h4>
                  <p className="text-gray-700 dark:text-gray-300">{selectedTerm.definition}</p>
        </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Example</h4>
                  <p className="text-gray-700 dark:text-gray-300 italic">&quot;{selectedTerm.example}&quot;</p>
            </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Related Terms</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTerm.related.map((related, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                        {related}
                      </span>
                    ))}
          </div>
          </div>
          </div>
          </div>
        </div>
      </div>
      )}
    </section>
  );
}
'use client';

import { useState, useRef } from 'react';

export default function ProgressTools() {
  const [beforeImage, setBeforeImage] = useState(null);
  const [afterImage, setAfterImage] = useState(null);
  const [showComparison, setShowComparison] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);
  const fileInputRef = useRef(null);

  const handleImageUpload = (setImage) => (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleFileSelect = (setImage) => {
    fileInputRef.current.onchange = handleImageUpload(setImage);
    fileInputRef.current.click();
  };

  const generateProgressReport = () => {
    if (!beforeImage || !afterImage) {
      alert('Please upload both before and after images');
      return;
    }
    alert('Progress report generated! Check your dashboard for detailed analysis.');
  };

  const measurements = [
    { name: 'Weight', before: '85kg', after: '78kg', change: '-7kg', positive: true },
    { name: 'Body Fat %', before: '22%', after: '18%', change: '-4%', positive: true },
    { name: 'Muscle Mass', before: '65kg', after: '68kg', change: '+3kg', positive: true },
    { name: 'Waist', before: '92cm', after: '86cm', change: '-6cm', positive: true },
    { name: 'Chest', before: '98cm', after: '102cm', change: '+4cm', positive: true },
    { name: 'Arms', before: '32cm', after: '35cm', change: '+3cm', positive: true }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-poppins">
            Progress Tools
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Track your transformation with photo comparison and detailed progress analysis
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Photo Comparison Tool */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-4xl">📸</span>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Photo Comparison</h3>
                <p className="text-gray-600 dark:text-gray-300">Upload before and after photos</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Before Photo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Before Photo
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                  {beforeImage ? (
                    <div className="relative">
                      <img src={beforeImage} alt="Before" className="w-full h-48 object-cover rounded-lg" />
                      <button
                        onClick={() => setBeforeImage(null)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="text-4xl mb-4">📷</div>
                      <p className="text-gray-500 dark:text-gray-400 mb-2">No image selected</p>
                      <button
                        onClick={() => handleFileSelect(setBeforeImage)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Upload Before Photo
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* After Photo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  After Photo
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                  {afterImage ? (
                    <div className="relative">
                      <img src={afterImage} alt="After" className="w-full h-48 object-cover rounded-lg" />
                      <button
                        onClick={() => setAfterImage(null)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="text-4xl mb-4">📷</div>
                      <p className="text-gray-500 dark:text-gray-400 mb-2">No image selected</p>
                      <button
                        onClick={() => handleFileSelect(setAfterImage)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Upload After Photo
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Comparison Controls */}
              {beforeImage && afterImage && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setShowComparison(!showComparison)}
                      className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                    >
                      {showComparison ? 'Hide' : 'Show'} Comparison
                    </button>
                    <button
                      onClick={generateProgressReport}
                      className="bg-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-600 transition-colors"
                    >
                      Generate Report
                    </button>
                  </div>

                  {showComparison && (
                    <div className="relative bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                      <div className="relative h-64">
                        <img
                          src={beforeImage}
                          alt="Before"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <img
                          src={afterImage}
                          alt="After"
                          className="absolute inset-0 w-full h-full object-cover"
                          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                        />
                        <div
                          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize"
                          style={{ left: `${sliderPosition}%` }}
                          onMouseDown={(e) => {
                            const startX = e.clientX;
                            const startPosition = sliderPosition;
                            
                            const handleMouseMove = (e) => {
                              const deltaX = e.clientX - startX;
                              const containerWidth = e.target.closest('.relative').offsetWidth;
                              const newPosition = Math.max(0, Math.min(100, startPosition + (deltaX / containerWidth) * 100));
                              setSliderPosition(newPosition);
                            };
                            
                            const handleMouseUp = () => {
                              document.removeEventListener('mousemove', handleMouseMove);
                              document.removeEventListener('mouseup', handleMouseUp);
                            };
                            
                            document.addEventListener('mousemove', handleMouseMove);
                            document.addEventListener('mouseup', handleMouseUp);
                          }}
                        />
                        <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                          Before
                        </div>
                        <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                          After
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
            />
          </div>

          {/* Progress Measurements */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-4xl">📏</span>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Progress Measurements</h3>
                <p className="text-gray-600 dark:text-gray-300">Track your body measurements</p>
              </div>
            </div>

            <div className="space-y-4">
              {measurements.map((measurement, index) => (
                <div key={index} className="bg-white dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{measurement.name}</h4>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {measurement.before} → {measurement.after}
                      </div>
                    </div>
                    <div className={`text-lg font-bold ${
                      measurement.positive ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {measurement.change}
                    </div>
                  </div>
                  <div className="mt-2 w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        measurement.positive ? 'bg-green-500' : 'bg-red-500'
                      }`}
                      style={{ width: '75%' }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-white dark:bg-gray-700 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Progress Summary</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">-7kg</div>
                  <div className="text-gray-600 dark:text-gray-300">Weight Loss</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">+3kg</div>
                  <div className="text-gray-600 dark:text-gray-300">Muscle Gain</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Progress Analysis */}
        <div className="mt-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl p-8 text-white">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4">🤖 AI Progress Analysis</h3>
            <p className="text-xl mb-6 opacity-90">
              Get personalized insights and recommendations based on your progress
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <div className="text-2xl mb-2">📊</div>
                <h4 className="font-semibold mb-2">Trend Analysis</h4>
                <p className="text-sm opacity-90">Identify patterns in your progress</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <div className="text-2xl mb-2">🎯</div>
                <h4 className="font-semibold mb-2">Goal Adjustment</h4>
                <p className="text-sm opacity-90">Optimize your targets based on results</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <div className="text-2xl mb-2">💡</div>
                <h4 className="font-semibold mb-2">Smart Recommendations</h4>
                <p className="text-sm opacity-90">Get personalized advice for improvement</p>
              </div>
            </div>
            <button className="bg-white text-purple-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors">
              Generate AI Analysis
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}


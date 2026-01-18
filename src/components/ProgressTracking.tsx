'use client';

import { useState } from 'react';

export default function ProgressTracking() {
  const [selectedMetric, setSelectedMetric] = useState('weight');
  const [timeRange, setTimeRange] = useState('30d');

  const metrics = [
    { id: 'weight', name: 'Weight', unit: 'kg', color: 'text-blue-600', bgColor: 'bg-blue-100 dark:bg-blue-900' },
    { id: 'bodyfat', name: 'Body Fat %', unit: '%', color: 'text-red-600', bgColor: 'bg-red-100 dark:bg-red-900' },
    { id: 'muscle', name: 'Muscle Mass', unit: 'kg', color: 'text-green-600', bgColor: 'bg-green-100 dark:bg-green-900' },
    { id: 'strength', name: 'Strength Score', unit: 'pts', color: 'text-purple-600', bgColor: 'bg-purple-100 dark:bg-purple-900' }
  ];

  const timeRanges = [
    { id: '7d', name: '7 Days' },
    { id: '30d', name: '30 Days' },
    { id: '90d', name: '90 Days' },
    { id: '1y', name: '1 Year' }
  ];

  // Mock data for different metrics
  const progressData = {
    weight: {
      current: 78.5,
      previous: 82.3,
      change: -3.8,
      trend: 'down',
      data: [
        { date: '2024-08-01', value: 82.3 },
        { date: '2024-08-08', value: 81.8 },
        { date: '2024-08-15', value: 81.2 },
        { date: '2024-08-22', value: 80.5 },
        { date: '2024-08-29', value: 79.8 },
        { date: '2024-09-05', value: 79.2 },
        { date: '2024-09-12', value: 78.5 }
      ]
    },
    bodyfat: {
      current: 18.2,
      previous: 22.1,
      change: -3.9,
      trend: 'down',
      data: [
        { date: '2024-08-01', value: 22.1 },
        { date: '2024-08-08', value: 21.5 },
        { date: '2024-08-15', value: 20.8 },
        { date: '2024-08-22', value: 20.2 },
        { date: '2024-08-29', value: 19.5 },
        { date: '2024-09-05', value: 18.8 },
        { date: '2024-09-12', value: 18.2 }
      ]
    },
    muscle: {
      current: 68.2,
      previous: 65.8,
      change: 2.4,
      trend: 'up',
      data: [
        { date: '2024-08-01', value: 65.8 },
        { date: '2024-08-08', value: 66.1 },
        { date: '2024-08-15', value: 66.5 },
        { date: '2024-08-22', value: 67.0 },
        { date: '2024-08-29', value: 67.4 },
        { date: '2024-09-05', value: 67.8 },
        { date: '2024-09-12', value: 68.2 }
      ]
    },
    strength: {
      current: 2450,
      previous: 2100,
      change: 350,
      trend: 'up',
      data: [
        { date: '2024-08-01', value: 2100 },
        { date: '2024-08-08', value: 2150 },
        { date: '2024-08-15', value: 2200 },
        { date: '2024-08-22', value: 2250 },
        { date: '2024-08-29', value: 2300 },
        { date: '2024-09-05', value: 2375 },
        { date: '2024-09-12', value: 2450 }
      ]
    }
  };

  const currentData = progressData[selectedMetric];
  const isPositive = currentData.trend === 'up';

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-poppins">
            Progress Tracking
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Monitor your fitness journey with detailed progress charts and analytics
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Metric Selector */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Select Metric</h3>
              <div className="space-y-3">
                {metrics.map((metric) => (
                  <button
                    key={metric.id}
                    onClick={() => setSelectedMetric(metric.id)}
                    className={`w-full p-4 rounded-lg text-left transition-all ${
                      selectedMetric === metric.id
                        ? `${metric.bgColor} ${metric.color}`
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    <div className="font-semibold">{metric.name}</div>
                    <div className="text-sm opacity-90">{metric.unit}</div>
                  </button>
                ))}
              </div>

              <div className="mt-6">
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Time Range</h4>
                <div className="space-y-2">
                  {timeRanges.map((range) => (
                    <button
                      key={range.id}
                      onClick={() => setTimeRange(range.id)}
                      className={`w-full p-2 rounded text-sm transition-all ${
                        timeRange === range.id
                          ? 'bg-blue-500 text-white'
                          : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-600'
                      }`}
                    >
                      {range.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Progress Chart */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {metrics.find(m => m.id === selectedMetric)?.name} Progress
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {timeRanges.find(tr => tr.id === timeRange)?.name} view
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {currentData.current}{metrics.find(m => m.id === selectedMetric)?.unit}
                  </div>
                  <div className={`text-sm font-semibold ${
                    isPositive ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {isPositive ? '+' : ''}{currentData.change}{metrics.find(m => m.id === selectedMetric)?.unit}
                  </div>
                </div>
              </div>

              {/* Simple Chart Representation */}
              <div className="h-64 bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                <div className="h-full flex items-end space-x-2">
                  {currentData.data.map((point, index) => {
                    const maxValue = Math.max(...currentData.data.map(d => d.value));
                    const height = (point.value / maxValue) * 100;
                    return (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div
                          className={`w-full rounded-t ${
                            isPositive ? 'bg-green-500' : 'bg-red-500'
                          }`}
                          style={{ height: `${height}%` }}
                        ></div>
                        <div className="text-xs text-gray-600 dark:text-gray-300 mt-2">
                          {new Date(point.date).getDate()}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Data Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 text-gray-600 dark:text-gray-300">Date</th>
                      <th className="text-left py-3 text-gray-600 dark:text-gray-300">Value</th>
                      <th className="text-left py-3 text-gray-600 dark:text-gray-300">Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.data.slice(-5).map((point, index) => {
                      const prevValue = index > 0 ? currentData.data[currentData.data.indexOf(point) - 1].value : null;
                      const change = prevValue ? point.value - prevValue : 0;
                      return (
                        <tr key={index} className="border-b border-gray-100 dark:border-gray-700">
                          <td className="py-3 text-gray-900 dark:text-white">
                            {new Date(point.date).toLocaleDateString()}
                          </td>
                          <td className="py-3 text-gray-900 dark:text-white">
                            {point.value}{metrics.find(m => m.id === selectedMetric)?.unit}
                          </td>
                          <td className={`py-3 ${
                            change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-gray-500'
                          }`}>
                            {change > 0 ? '+' : ''}{change.toFixed(1)}{metrics.find(m => m.id === selectedMetric)?.unit}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">-3.8kg</div>
            <div className="text-gray-600 dark:text-gray-300">Weight Loss</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">+2.4kg</div>
            <div className="text-gray-600 dark:text-gray-300">Muscle Gain</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">-3.9%</div>
            <div className="text-gray-600 dark:text-gray-300">Body Fat</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">+350</div>
            <div className="text-gray-600 dark:text-gray-300">Strength Points</div>
          </div>
        </div>
      </div>
    </section>
  );
}


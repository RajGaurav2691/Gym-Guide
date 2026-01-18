'use client';

import { useState } from 'react';

export default function TrainingSplits() {
  const [activeSplit, setActiveSplit] = useState(0);

  const trainingSplits = [
    {
      name: "Push/Pull/Legs",
      description: "3-day split focusing on movement patterns",
      duration: "6 days/week",
      difficulty: "Intermediate",
      color: "from-purple-500 to-pink-500",
      days: [
        {
          day: "Monday - Push",
          focus: "Chest, Shoulders, Triceps",
          exercises: [
            "Bench Press 4x6-8",
            "Overhead Press 4x6-8",
            "Incline Dumbbell Press 3x8-10",
            "Lateral Raises 3x12-15",
            "Tricep Dips 3x8-10",
            "Tricep Pushdowns 3x12-15"
          ]
        },
        {
          day: "Tuesday - Pull",
          focus: "Back, Biceps",
          exercises: [
            "Deadlifts 4x5-6",
            "Pull-ups 4x6-10",
            "Barbell Rows 4x6-8",
            "Lat Pulldowns 3x8-10",
            "Bicep Curls 3x10-12",
            "Hammer Curls 3x10-12"
          ]
        },
        {
          day: "Wednesday - Legs",
          focus: "Quads, Hamstrings, Glutes, Calves",
          exercises: [
            "Squats 4x6-8",
            "Romanian Deadlifts 4x8-10",
            "Leg Press 3x10-12",
            "Walking Lunges 3x12 each leg",
            "Calf Raises 4x15-20",
            "Leg Curls 3x10-12"
          ]
        },
        {
          day: "Thursday - Push",
          focus: "Chest, Shoulders, Triceps",
          exercises: [
            "Incline Bench Press 4x6-8",
            "Dumbbell Press 4x8-10",
            "Cable Flyes 3x12-15",
            "Rear Delt Flyes 3x12-15",
            "Close-Grip Bench Press 3x8-10",
            "Overhead Tricep Extension 3x10-12"
          ]
        },
        {
          day: "Friday - Pull",
          focus: "Back, Biceps",
          exercises: [
            "Bent-Over Rows 4x6-8",
            "T-Bar Rows 4x8-10",
            "Face Pulls 3x12-15",
            "Cable Rows 3x10-12",
            "Preacher Curls 3x10-12",
            "Cable Curls 3x12-15"
          ]
        },
        {
          day: "Saturday - Legs",
          focus: "Quads, Hamstrings, Glutes, Calves",
          exercises: [
            "Front Squats 4x6-8",
            "Bulgarian Split Squats 3x10 each leg",
            "Hip Thrusts 4x10-12",
            "Leg Extensions 3x12-15",
            "Stiff Leg Deadlifts 3x8-10",
            "Seated Calf Raises 4x15-20"
          ]
        }
      ]
    },
    {
      name: "Upper/Lower",
      description: "2-day split for balanced development",
      duration: "4 days/week",
      difficulty: "Beginner",
      color: "from-blue-500 to-cyan-500",
      days: [
        {
          day: "Monday - Upper",
          focus: "Chest, Back, Shoulders, Arms",
          exercises: [
            "Bench Press 4x6-8",
            "Pull-ups 4x6-10",
            "Overhead Press 4x6-8",
            "Barbell Rows 4x6-8",
            "Dips 3x8-10",
            "Bicep Curls 3x10-12",
            "Tricep Pushdowns 3x10-12"
          ]
        },
        {
          day: "Tuesday - Lower",
          focus: "Quads, Hamstrings, Glutes, Calves",
          exercises: [
            "Squats 4x6-8",
            "Romanian Deadlifts 4x8-10",
            "Walking Lunges 3x12 each leg",
            "Leg Press 3x10-12",
            "Calf Raises 4x15-20",
            "Leg Curls 3x10-12"
          ]
        },
        {
          day: "Thursday - Upper",
          focus: "Chest, Back, Shoulders, Arms",
          exercises: [
            "Incline Bench Press 4x6-8",
            "Bent-Over Rows 4x6-8",
            "Dumbbell Press 4x8-10",
            "Lat Pulldowns 4x8-10",
            "Close-Grip Bench Press 3x8-10",
            "Hammer Curls 3x10-12",
            "Lateral Raises 3x12-15"
          ]
        },
        {
          day: "Friday - Lower",
          focus: "Quads, Hamstrings, Glutes, Calves",
          exercises: [
            "Front Squats 4x6-8",
            "Hip Thrusts 4x10-12",
            "Bulgarian Split Squats 3x10 each leg",
            "Leg Extensions 3x12-15",
            "Stiff Leg Deadlifts 3x8-10",
            "Seated Calf Raises 4x15-20"
          ]
        }
      ]
    },
    {
      name: "Full Body",
      description: "Complete body workout in each session",
      duration: "3 days/week",
      difficulty: "Beginner",
      color: "from-green-500 to-emerald-500",
      days: [
        {
          day: "Monday - Full Body A",
          focus: "Complete body workout",
          exercises: [
            "Squats 4x8-10",
            "Bench Press 4x6-8",
            "Bent-Over Rows 4x6-8",
            "Overhead Press 3x8-10",
            "Pull-ups 3x6-10",
            "Plank 3x30-60 sec"
          ]
        },
        {
          day: "Wednesday - Full Body B",
          focus: "Complete body workout",
          exercises: [
            "Deadlifts 4x5-6",
            "Incline Dumbbell Press 4x8-10",
            "Lat Pulldowns 4x8-10",
            "Lunges 3x10 each leg",
            "Dips 3x8-10",
            "Russian Twists 3x20 each side"
          ]
        },
        {
          day: "Friday - Full Body C",
          focus: "Complete body workout",
          exercises: [
            "Front Squats 4x6-8",
            "Dumbbell Press 4x8-10",
            "Cable Rows 4x8-10",
            "Bulgarian Split Squats 3x10 each leg",
            "Bicep Curls 3x10-12",
            "Tricep Pushdowns 3x10-12"
          ]
        }
      ]
    },
    {
      name: "Bro Split",
      description: "One muscle group per day",
      duration: "6 days/week",
      difficulty: "Advanced",
      color: "from-orange-500 to-red-500",
      days: [
        {
          day: "Monday - Chest",
          focus: "Chest and Triceps",
          exercises: [
            "Bench Press 4x6-8",
            "Incline Dumbbell Press 4x8-10",
            "Cable Flyes 3x12-15",
            "Dips 3x8-10",
            "Tricep Pushdowns 3x10-12",
            "Overhead Tricep Extension 3x10-12"
          ]
        },
        {
          day: "Tuesday - Back",
          focus: "Back and Biceps",
          exercises: [
            "Deadlifts 4x5-6",
            "Pull-ups 4x6-10",
            "Barbell Rows 4x6-8",
            "Lat Pulldowns 3x8-10",
            "Bicep Curls 3x10-12",
            "Hammer Curls 3x10-12"
          ]
        },
        {
          day: "Wednesday - Shoulders",
          focus: "Shoulders and Traps",
          exercises: [
            "Overhead Press 4x6-8",
            "Lateral Raises 4x12-15",
            "Rear Delt Flyes 3x12-15",
            "Face Pulls 3x12-15",
            "Shrugs 4x10-12",
            "Upright Rows 3x10-12"
          ]
        },
        {
          day: "Thursday - Arms",
          focus: "Biceps and Triceps",
          exercises: [
            "Barbell Curls 4x8-10",
            "Close-Grip Bench Press 4x6-8",
            "Preacher Curls 3x10-12",
            "Tricep Dips 3x8-10",
            "Cable Curls 3x12-15",
            "Overhead Tricep Extension 3x10-12"
          ]
        },
        {
          day: "Friday - Legs",
          focus: "Quads, Hamstrings, Glutes",
          exercises: [
            "Squats 4x6-8",
            "Romanian Deadlifts 4x8-10",
            "Leg Press 4x10-12",
            "Walking Lunges 3x12 each leg",
            "Leg Curls 3x10-12",
            "Calf Raises 4x15-20"
          ]
        },
        {
          day: "Saturday - Core",
          focus: "Abs and Core",
          exercises: [
            "Plank 4x30-60 sec",
            "Russian Twists 4x20 each side",
            "Mountain Climbers 3x30 sec",
            "Bicycle Crunches 3x20 each side",
            "Hanging Leg Raises 3x10-15",
            "Dead Bug 3x10 each side"
          ]
        }
      ]
    }
  ];

  return (
    <section id="training-splits" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 font-poppins">
            Training Splits
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect training split that fits your schedule and fitness goals
          </p>
        </div>

        {/* Split Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {trainingSplits.map((split, index) => (
            <button
              key={index}
              onClick={() => setActiveSplit(index)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                activeSplit === index
                  ? `bg-gradient-to-r ${split.color} text-white shadow-lg`
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {split.name}
            </button>
          ))}
        </div>

        {/* Active Split Details */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className={`bg-gradient-to-r ${trainingSplits[activeSplit].color} p-8 text-white`}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-3xl font-bold mb-2">{trainingSplits[activeSplit].name}</h3>
                <p className="text-xl mb-4">{trainingSplits[activeSplit].description}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
                    Duration: {trainingSplits[activeSplit].duration}
                  </span>
                  <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
                    Level: {trainingSplits[activeSplit].difficulty}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <h4 className="text-2xl font-bold text-gray-900 mb-6">Weekly Schedule</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trainingSplits[activeSplit].days.map((day, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <h5 className="text-lg font-semibold text-gray-900 mb-2">{day.day}</h5>
                  <p className="text-sm text-gray-600 mb-4">{day.focus}</p>
                  <ul className="space-y-2">
                    {day.exercises.map((exercise, exerciseIndex) => (
                      <li key={exerciseIndex} className="text-gray-700 text-sm flex items-start">
                        <span className="w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                        {exercise}
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
            Start Your Training Plan
          </button>
        </div>
      </div>
    </section>
  );
}

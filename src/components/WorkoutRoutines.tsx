'use client';

import { useState } from 'react';

export default function WorkoutRoutines() {
  const [activeRoutine, setActiveRoutine] = useState(0);

  const workoutRoutines = [
    {
      name: "Strength Training",
      description: "Build maximum strength and muscle mass",
      duration: "60-90 minutes",
      difficulty: "Intermediate",
      color: "from-gray-700 to-gray-900",
      exercises: [
        {
          name: "Squats",
          sets: "4",
          reps: "6-8",
          rest: "3-4 min",
          tips: "Keep your chest up and drive through your heels"
        },
        {
          name: "Deadlifts",
          sets: "4",
          reps: "5-6",
          rest: "3-4 min",
          tips: "Maintain a straight back and engage your core"
        },
        {
          name: "Bench Press",
          sets: "4",
          reps: "6-8",
          rest: "3-4 min",
          tips: "Keep your shoulder blades retracted"
        },
        {
          name: "Overhead Press",
          sets: "3",
          reps: "8-10",
          rest: "2-3 min",
          tips: "Press straight up, not forward"
        },
        {
          name: "Pull-ups",
          sets: "3",
          reps: "6-10",
          rest: "2-3 min",
          tips: "Full range of motion, controlled descent"
        }
      ]
    },
    {
      name: "HIIT Cardio",
      description: "High-intensity interval training for fat burning",
      duration: "20-30 minutes",
      difficulty: "Advanced",
      color: "from-red-500 to-pink-500",
      exercises: [
        {
          name: "Burpees",
          sets: "4",
          reps: "30 sec",
          rest: "30 sec",
          tips: "Full body movement, maintain intensity"
        },
        {
          name: "Mountain Climbers",
          sets: "4",
          reps: "30 sec",
          rest: "30 sec",
          tips: "Keep your core tight and maintain plank position"
        },
        {
          name: "Jump Squats",
          sets: "4",
          reps: "30 sec",
          rest: "30 sec",
          tips: "Land softly and immediately explode up"
        },
        {
          name: "High Knees",
          sets: "4",
          reps: "30 sec",
          rest: "30 sec",
          tips: "Bring knees to chest level, maintain pace"
        },
        {
          name: "Push-ups",
          sets: "4",
          reps: "30 sec",
          rest: "30 sec",
          tips: "Maintain proper form throughout"
        }
      ]
    },
    {
      name: "Bodyweight",
      description: "No equipment needed, perfect for home workouts",
      duration: "45-60 minutes",
      difficulty: "Beginner",
      color: "from-blue-500 to-purple-500",
      exercises: [
        {
          name: "Push-ups",
          sets: "3",
          reps: "10-15",
          rest: "60 sec",
          tips: "Keep your body straight, modify on knees if needed"
        },
        {
          name: "Bodyweight Squats",
          sets: "3",
          reps: "15-20",
          rest: "60 sec",
          tips: "Sit back as if sitting in a chair"
        },
        {
          name: "Plank",
          sets: "3",
          reps: "30-60 sec",
          rest: "60 sec",
          tips: "Keep your body in a straight line"
        },
        {
          name: "Lunges",
          sets: "3",
          reps: "10-12 each leg",
          rest: "60 sec",
          tips: "Step forward and lower until both knees are 90 degrees"
        },
        {
          name: "Glute Bridges",
          sets: "3",
          reps: "15-20",
          rest: "60 sec",
          tips: "Squeeze your glutes at the top"
        }
      ]
    },
    {
      name: "Yoga Flow",
      description: "Improve flexibility, balance, and mental wellness",
      duration: "45-75 minutes",
      difficulty: "All Levels",
      color: "from-green-500 to-teal-500",
      exercises: [
        {
          name: "Sun Salutation A",
          sets: "3",
          reps: "1 flow",
          rest: "30 sec",
          tips: "Move with your breath, smooth transitions"
        },
        {
          name: "Warrior Poses",
          sets: "2",
          reps: "5 breaths each",
          rest: "30 sec",
          tips: "Strong foundation, open chest"
        },
        {
          name: "Tree Pose",
          sets: "2",
          reps: "5 breaths each leg",
          rest: "30 sec",
          tips: "Focus on a fixed point, engage core"
        },
        {
          name: "Downward Dog",
          sets: "3",
          reps: "5 breaths",
          rest: "30 sec",
          tips: "Press through hands, lengthen spine"
        },
        {
          name: "Savasana",
          sets: "1",
          reps: "5-10 min",
          rest: "None",
          tips: "Complete relaxation, let go of tension"
        }
      ]
    }
  ];

  return (
    <section id="workouts" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 font-poppins">
            Workout Routines
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover effective workout routines designed for every fitness level and goal
          </p>
        </div>

        {/* Routine Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {workoutRoutines.map((routine, index) => (
            <button
              key={index}
              onClick={() => setActiveRoutine(index)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                activeRoutine === index
                  ? `bg-gradient-to-r ${routine.color} text-white shadow-lg`
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
              }`}
            >
              {routine.name}
            </button>
          ))}
        </div>

        {/* Active Routine Details */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className={`bg-gradient-to-r ${workoutRoutines[activeRoutine].color} p-8 text-white`}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-3xl font-bold mb-2">{workoutRoutines[activeRoutine].name}</h3>
                <p className="text-xl mb-4">{workoutRoutines[activeRoutine].description}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
                    Duration: {workoutRoutines[activeRoutine].duration}
                  </span>
                  <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
                    Level: {workoutRoutines[activeRoutine].difficulty}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <h4 className="text-2xl font-bold text-gray-900 mb-6">Exercise Breakdown</h4>
            <div className="space-y-6">
              {workoutRoutines[activeRoutine].exercises.map((exercise, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h5 className="text-xl font-semibold text-gray-900">{exercise.name}</h5>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2 md:mt-0">
                      <span>Sets: {exercise.sets}</span>
                      <span>Reps: {exercise.reps}</span>
                      <span>Rest: {exercise.rest}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">{exercise.tips}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-red-600 hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl">
            Start Your Workout
          </button>
        </div>
      </div>
    </section>
  );
}

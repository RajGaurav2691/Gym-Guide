'use client';

import { useState } from 'react';

type ChallengeProgress = {
  joined: boolean;
  progress: number;
  completed: boolean;
};

type UserProgressMap = Record<number, ChallengeProgress>;

type Challenge = {
  id: number;
  title: string;
  description: string;
  type: string;
  duration: string;
  participants: number;
  difficulty: string;
  rewards: string[];
  requirements: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  isJoined: boolean;
};

export default function ChallengesSection() {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgressMap>({});

  const challenges = [
    {
      id: 1,
      title: "30-Day Push-Up Challenge",
      description: "Complete 100 push-ups daily for 30 days",
      type: "strength",
      duration: "30 days",
      participants: 1250,
      difficulty: "intermediate",
      rewards: ["Badge", "Certificate", "Points"],
      requirements: "Complete 100 push-ups daily",
      startDate: "2024-09-01",
      endDate: "2024-09-30",
      isActive: true,
      isJoined: false
    },
    {
      id: 2,
      title: "Plank Challenge",
      description: "Hold a plank for 5 minutes straight",
      type: "endurance",
      duration: "1 day",
      participants: 890,
      difficulty: "advanced",
      rewards: ["Badge", "Points"],
      requirements: "Hold plank for 5 minutes without rest",
      startDate: "2024-09-15",
      endDate: "2024-09-15",
      isActive: true,
      isJoined: true
    },
    {
      id: 3,
      title: "Squat Challenge",
      description: "Complete 1000 squats in one week",
      type: "strength",
      duration: "7 days",
      participants: 2100,
      difficulty: "beginner",
      rewards: ["Badge", "Certificate", "Points", "Trophy"],
      requirements: "Complete 1000 squats over 7 days",
      startDate: "2024-09-10",
      endDate: "2024-09-16",
      isActive: true,
      isJoined: false
    },
    {
      id: 4,
      title: "Burpee Challenge",
      description: "Complete 50 burpees in 10 minutes",
      type: "cardio",
      duration: "10 minutes",
      participants: 650,
      difficulty: "intermediate",
      rewards: ["Badge", "Points"],
      requirements: "Complete 50 burpees within 10 minutes",
      startDate: "2024-09-20",
      endDate: "2024-09-20",
      isActive: true,
      isJoined: false
    },
    {
      id: 5,
      title: "Mile Run Challenge",
      description: "Run 1 mile under 8 minutes",
      type: "cardio",
      duration: "1 day",
      participants: 1800,
      difficulty: "intermediate",
      rewards: ["Badge", "Certificate", "Points"],
      requirements: "Run 1 mile in under 8 minutes",
      startDate: "2024-09-25",
      endDate: "2024-09-25",
      isActive: true,
      isJoined: true
    }
  ];

  const leaderboard = [
    { rank: 1, name: "Sarah M.", score: 2850, avatar: "SM" },
    { rank: 2, name: "Mike Chen", score: 2720, avatar: "MC" },
    { rank: 3, name: "Emma L.", score: 2650, avatar: "EL" },
    { rank: 4, name: "David K.", score: 2480, avatar: "DK" },
    { rank: 5, name: "Lisa Park", score: 2320, avatar: "LP" }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'strength': return '💪';
      case 'cardio': return '❤️';
      case 'endurance': return '⏱️';
      default: return '🏃';
    }
  };

  const joinChallenge = (challengeId: number) => {
    setUserProgress(prev => ({
      ...prev,
      [challengeId]: { joined: true, progress: 0, completed: false }
    }));
    alert('Successfully joined the challenge!');
  };

  const leaveChallenge = (challengeId: number) => {
    setUserProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[challengeId];
      return newProgress;
    });
    alert('Left the challenge');
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-poppins">
            Fitness Challenges
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Join community challenges and push your limits with fellow fitness enthusiasts
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Challenges List */}
          <div className="lg:col-span-2 space-y-6">
            {challenges.map((challenge) => (
              <div key={challenge.id} className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{getTypeIcon(challenge.type)}</span>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{challenge.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{challenge.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(challenge.difficulty)}`}>
                      {challenge.difficulty}
                    </span>
                    {challenge.isActive && (
                      <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs font-semibold">
                        Active
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{challenge.participants.toLocaleString()}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Participants</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{challenge.duration}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Duration</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{challenge.rewards.length}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Rewards</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{challenge.type}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Type</div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Rewards:</h4>
                  <div className="flex flex-wrap gap-2">
                    {challenge.rewards.map((reward, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded">
                        {reward}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    <p>Starts: {challenge.startDate}</p>
                    <p>Ends: {challenge.endDate}</p>
                  </div>
                  <div className="flex space-x-2">
                    {userProgress[challenge.id]?.joined ? (
                      <button
                        onClick={() => leaveChallenge(challenge.id)}
                        className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                      >
                        Leave Challenge
                      </button>
                    ) : (
                      <button
                        onClick={() => joinChallenge(challenge.id)}
                        className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                      >
                        Join Challenge
                      </button>
                    )}
                    <button
                      onClick={() => setSelectedChallenge(challenge)}
                      className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Leaderboard */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 sticky top-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Weekly Leaderboard</h3>
            <div className="space-y-4">
              {leaderboard.map((user) => (
                <div key={user.rank} className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                    user.rank === 1 ? 'bg-yellow-500' :
                    user.rank === 2 ? 'bg-gray-400' :
                    user.rank === 3 ? 'bg-orange-500' :
                    'bg-blue-500'
                  }`}>
                    {user.rank}
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    {user.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 dark:text-white">{user.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">{user.score} points</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg text-white text-center">
              <h4 className="font-bold mb-2">Your Rank</h4>
              <div className="text-3xl font-bold">#12</div>
              <div className="text-sm opacity-90">1,250 points</div>
            </div>
          </div>
        </div>

        {/* Challenge Detail Modal */}
        {selectedChallenge && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {selectedChallenge.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">{selectedChallenge.description}</p>
                  </div>
                  <button
                    onClick={() => setSelectedChallenge(null)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Requirements</h4>
                    <p className="text-gray-700 dark:text-gray-300">{selectedChallenge.requirements}</p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Duration</h4>
                    <p className="text-gray-700 dark:text-gray-300">{selectedChallenge.duration}</p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Rewards</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedChallenge.rewards.map((reward, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
                          {reward}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    {userProgress[selectedChallenge.id]?.joined ? (
                      <button
                        onClick={() => {
                          leaveChallenge(selectedChallenge.id);
                          setSelectedChallenge(null);
                        }}
                        className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                      >
                        Leave Challenge
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          joinChallenge(selectedChallenge.id);
                          setSelectedChallenge(null);
                        }}
                        className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                      >
                        Join Challenge
                      </button>
                    )}
                    <button
                      onClick={() => setSelectedChallenge(null)}
                      className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Close
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


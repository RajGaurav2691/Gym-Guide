'use client';

import { useState, useEffect } from 'react';

export default function DailyQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const quiz = {
    id: 1,
    title: "Daily Fitness Quiz",
    date: "2024-09-13",
    questions: [
      {
        id: 1,
        question: "What is the primary fuel source during high-intensity exercise?",
        options: [
          "Fat",
          "Carbohydrates",
          "Protein",
          "Creatine"
        ],
        correct: 1,
        explanation: "Carbohydrates are the primary fuel source during high-intensity exercise, while fat is used during low-intensity activities."
      },
      {
        id: 2,
        question: "How long does muscle protein synthesis typically last after resistance training?",
        options: [
          "2-4 hours",
          "12-24 hours",
          "24-48 hours",
          "72+ hours"
        ],
        correct: 2,
        explanation: "Muscle protein synthesis is elevated for 24-48 hours after resistance training, making this the optimal window for protein consumption."
      },
      {
        id: 3,
        question: "What is the recommended protein intake per meal for muscle building?",
        options: [
          "10-15g",
          "20-25g",
          "30-40g",
          "50g+"
        ],
        correct: 2,
        explanation: "Research suggests 20-25g of high-quality protein per meal is optimal for stimulating muscle protein synthesis."
      },
      {
        id: 4,
        question: "Which sleep stage is most important for muscle recovery?",
        options: [
          "Light Sleep",
          "Deep Sleep (N3)",
          "REM Sleep",
          "All stages equally"
        ],
        correct: 1,
        explanation: "Deep sleep (N3) is when growth hormone is released and muscle tissue repair occurs most effectively."
      },
      {
        id: 5,
        question: "What is the minimum effective dose of resistance training per week?",
        options: [
          "1 session",
          "2 sessions",
          "3 sessions",
          "5+ sessions"
        ],
        correct: 1,
        explanation: "Research shows that 2 resistance training sessions per week is the minimum effective dose for muscle and strength gains."
      }
    ]
  };

  const handleAnswerSelect = (answerIndex) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    setShowResult(true);
    if (selectedAnswer === quiz.questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizCompleted(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / quiz.questions.length) * 100;
    if (percentage >= 80) return { message: "Excellent! You're a fitness expert!", color: "text-green-600" };
    if (percentage >= 60) return { message: "Good job! Keep learning!", color: "text-yellow-600" };
    return { message: "Keep studying! Knowledge is power!", color: "text-red-600" };
  };

  if (quizCompleted) {
    const scoreMessage = getScoreMessage();
    return (
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-12 text-center">
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Quiz Complete!</h2>
            <div className="text-6xl font-bold text-indigo-600 mb-4">{score}/{quiz.questions.length}</div>
            <p className={`text-2xl font-semibold mb-8 ${scoreMessage.color}`}>
              {scoreMessage.message}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={resetQuiz}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all duration-200"
              >
                Take Quiz Again
              </button>
              <button className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                Share Score
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const currentQ = quiz.questions[currentQuestion];

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-poppins">
            Daily Fitness Quiz
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Test your knowledge with today's quiz
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
          {/* Progress Bar */}
          <div className="bg-gray-200 dark:bg-gray-700 h-2">
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
            ></div>
          </div>

          <div className="p-8">
            {/* Question Header */}
            <div className="flex justify-between items-center mb-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Question {currentQuestion + 1} of {quiz.questions.length}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Score: {score}/{currentQuestion}
              </span>
            </div>

            {/* Question */}
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              {currentQ.question}
            </h3>

            {/* Answer Options */}
            <div className="space-y-4 mb-8">
              {currentQ.options.map((option, index) => {
                let buttonClass = "w-full p-4 text-left border rounded-lg transition-all duration-200 ";
                
                if (showResult) {
                  if (index === currentQ.correct) {
                    buttonClass += "bg-green-100 dark:bg-green-900 border-green-500 text-green-800 dark:text-green-200";
                  } else if (index === selectedAnswer && index !== currentQ.correct) {
                    buttonClass += "bg-red-100 dark:bg-red-900 border-red-500 text-red-800 dark:text-red-200";
                  } else {
                    buttonClass += "bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300";
                  }
                } else {
                  if (selectedAnswer === index) {
                    buttonClass += "bg-indigo-100 dark:bg-indigo-900 border-indigo-500 text-indigo-800 dark:text-indigo-200";
                  } else {
                    buttonClass += "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700";
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showResult}
                    className={buttonClass}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        showResult && index === currentQ.correct
                          ? 'bg-green-500 border-green-500 text-white'
                          : showResult && index === selectedAnswer && index !== currentQ.correct
                          ? 'bg-red-500 border-red-500 text-white'
                          : selectedAnswer === index
                          ? 'bg-indigo-500 border-indigo-500 text-white'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}>
                        {showResult && index === currentQ.correct && '✓'}
                        {showResult && index === selectedAnswer && index !== currentQ.correct && '✗'}
                        {!showResult && selectedAnswer === index && '●'}
                      </div>
                      <span className="font-medium">{option}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {showResult && (
              <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-6 mb-8">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Explanation:</h4>
                <p className="text-blue-700 dark:text-blue-300">{currentQ.explanation}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between">
              {!showResult ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all duration-200"
                >
                  {currentQuestion < quiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
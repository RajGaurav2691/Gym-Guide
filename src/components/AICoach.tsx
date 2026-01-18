'use client';

import { useState, useRef, useEffect } from 'react';

export default function AICoach() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hi! I'm your AI fitness coach. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickQuestions = [
    "What should I eat before a workout?",
    "How many rest days should I take?",
    "What's the best time to workout?",
    "How can I break through a plateau?",
    "What supplements should I take?"
  ];

  const aiResponses = {
    "workout": "For optimal performance, I recommend a balanced meal 2-3 hours before your workout. Include complex carbs for energy and some protein for muscle support. A banana with peanut butter or oatmeal with berries are great options!",
    "rest": "Rest days are crucial for muscle recovery and growth. I recommend taking 1-2 rest days per week, or 2-3 days if you're doing intense training. Listen to your body - if you feel fatigued, take an extra rest day.",
    "time": "The best time to workout is when you can be consistent! However, many people find morning workouts help with energy and consistency. Evening workouts can help with strength and performance. Choose what works for your schedule.",
    "plateau": "Plateaus are normal! Try changing your routine: increase intensity, vary exercises, adjust rep ranges, or take a deload week. Sometimes a short break can help you come back stronger. What specific area are you plateauing in?",
    "supplements": "Focus on whole foods first! The basics I recommend: protein powder (if needed), creatine (3-5g daily), and a multivitamin. Always consult with a healthcare provider before starting new supplements."
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const lowerMessage = inputMessage.toLowerCase();
      let aiResponse = "I understand you're asking about fitness. Could you be more specific? I can help with nutrition, training, recovery, or general fitness advice.";

      if (lowerMessage.includes('eat') || lowerMessage.includes('food') || lowerMessage.includes('nutrition')) {
        aiResponse = aiResponses.workout;
      } else if (lowerMessage.includes('rest') || lowerMessage.includes('recovery')) {
        aiResponse = aiResponses.rest;
      } else if (lowerMessage.includes('time') || lowerMessage.includes('when')) {
        aiResponse = aiResponses.time;
      } else if (lowerMessage.includes('plateau') || lowerMessage.includes('stuck')) {
        aiResponse = aiResponses.plateau;
      } else if (lowerMessage.includes('supplement') || lowerMessage.includes('vitamin')) {
        aiResponse = aiResponses.supplements;
      }

      const aiMessage = {
        id: messages.length + 2,
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-poppins">
            AI Fitness Coach
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Get personalized fitness advice and guidance from your AI coach
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Quick Questions */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Questions</h3>
              <div className="space-y-3">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="w-full p-3 text-left bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-sm"
                  >
                    {question}
                  </button>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Coach Tips</h4>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• Ask specific questions</li>
                  <li>• Mention your goals</li>
                  <li>• Include your experience level</li>
                  <li>• Be specific about challenges</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-6 text-white">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">AI Fitness Coach</h3>
                    <p className="text-sm opacity-90">Always here to help with your fitness journey</p>
                  </div>
                  <div className="ml-auto">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="h-96 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.type === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex space-x-4">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask your AI coach anything..."
                    className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isTyping}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Coach Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg text-center">
            <div className="text-4xl mb-4">💡</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Personalized Advice</h3>
            <p className="text-gray-600 dark:text-gray-300">Get customized recommendations based on your goals and progress</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Progress Analysis</h3>
            <p className="text-gray-600 dark:text-gray-300">AI analyzes your data to provide insights and recommendations</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Goal Tracking</h3>
            <p className="text-gray-600 dark:text-gray-300">Stay on track with your fitness goals with AI-powered guidance</p>
          </div>
        </div>
      </div>
    </section>
  );
}


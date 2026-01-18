'use client';

import { useState, useEffect } from 'react';

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Sarah Johnson",
      age: 28,
      occupation: "Marketing Manager",
      beforeWeight: "85kg",
      afterWeight: "65kg",
      duration: "6 months",
      image: "👩‍💼",
      quote: "FitLife transformed not just my body, but my entire lifestyle. The personalized diet plan and workout routine made all the difference. I've never felt more confident!",
      results: ["Lost 20kg", "Gained muscle", "Improved energy"],
      rating: 5
    },
    {
      name: "Mike Chen",
      age: 35,
      occupation: "Software Engineer",
      beforeWeight: "95kg",
      afterWeight: "80kg",
      duration: "8 months",
      image: "👨‍💻",
      quote: "As a busy professional, I needed a program that worked with my schedule. The flexible training splits and nutrition guidance were perfect for my lifestyle.",
      results: ["Lost 15kg", "Built strength", "Better sleep"],
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      age: 24,
      occupation: "Student",
      beforeWeight: "70kg",
      afterWeight: "58kg",
      duration: "4 months",
      image: "👩‍🎓",
      quote: "The HIIT workouts and keto diet plan helped me achieve my goals faster than I ever imagined. The community support was incredible!",
      results: ["Lost 12kg", "Improved endurance", "Better focus"],
      rating: 5
    },
    {
      name: "David Thompson",
      age: 42,
      occupation: "Business Owner",
      beforeWeight: "110kg",
      afterWeight: "85kg",
      duration: "12 months",
      image: "👨‍💼",
      quote: "At 42, I thought it was too late to get in shape. FitLife proved me wrong. The strength training program and nutrition coaching changed my life completely.",
      results: ["Lost 25kg", "Gained muscle", "More energy"],
      rating: 5
    },
    {
      name: "Lisa Park",
      age: 31,
      occupation: "Teacher",
      beforeWeight: "78kg",
      afterWeight: "62kg",
      duration: "7 months",
      image: "👩‍🏫",
      quote: "The yoga flow classes and intermittent fasting plan were exactly what I needed. I feel stronger, more flexible, and more balanced than ever before.",
      results: ["Lost 16kg", "Improved flexibility", "Better mental health"],
      rating: 5
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 font-poppins">
            Success Stories
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real transformations from real people who achieved their fitness goals with FitLife
          </p>
        </div>

        <div className="relative">
          {/* Main Testimonial Card */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden text-gray-900">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Before/After Section */}
              <div className="bg-gradient-to-br from-red-500 to-orange-500 p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Transformation Results</h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-center bg-white bg-opacity-20 rounded-lg p-4">
                    <span className="text-lg font-semibold">Starting Weight:</span>
                    <span className="text-2xl font-bold">{testimonials[currentTestimonial].beforeWeight}</span>
                  </div>
                  <div className="flex justify-between items-center bg-white bg-opacity-20 rounded-lg p-4">
                    <span className="text-lg font-semibold">Current Weight:</span>
                    <span className="text-2xl font-bold">{testimonials[currentTestimonial].afterWeight}</span>
                  </div>
                  <div className="flex justify-between items-center bg-white bg-opacity-20 rounded-lg p-4">
                    <span className="text-lg font-semibold">Duration:</span>
                    <span className="text-2xl font-bold">{testimonials[currentTestimonial].duration}</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-lg font-semibold mb-3">Key Achievements:</h4>
                  <div className="flex flex-wrap gap-2">
                    {testimonials[currentTestimonial].results.map((result, index) => (
                      <span key={index} className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
                        {result}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Testimonial Content */}
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="text-6xl mr-4">{testimonials[currentTestimonial].image}</div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900">
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <p className="text-gray-600">
                      {testimonials[currentTestimonial].age} years old • {testimonials[currentTestimonial].occupation}
                    </p>
                    <div className="flex items-center mt-2">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-xl">⭐</span>
                      ))}
                    </div>
                  </div>
                </div>

                <blockquote className="text-lg text-gray-700 italic leading-relaxed mb-6">
                  &quot;{testimonials[currentTestimonial].quote}&quot;
                </blockquote>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Verified Member
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={prevTestimonial}
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={nextTestimonial}
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentTestimonial ? 'bg-white' : 'bg-white bg-opacity-50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-white mb-2">5000+</div>
            <div className="text-gray-300">Success Stories</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-white mb-2">95%</div>
            <div className="text-gray-300">Goal Achievement</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-white mb-2">4.9/5</div>
            <div className="text-gray-300">Average Rating</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-white mb-2">15+</div>
            <div className="text-gray-300">Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  );
}


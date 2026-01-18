'use client';

import { useState, useEffect } from 'react';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "BUILD YOUR DREAM BODY",
      subtitle: "Transform your life with personalized fitness plans, expert nutrition guidance, and proven workout routines",
      bgImage: "bg-gradient-to-r from-red-500 to-orange-500",
      cta: "Build Your Plan Now",
      secondaryCta: "Free Consultation"
    },
    {
      title: "FUEL YOUR SUCCESS",
      subtitle: "Science-backed nutrition plans designed by certified dietitians to maximize your results",
      bgImage: "bg-gradient-to-r from-blue-500 to-purple-600",
      cta: "Get Your Diet Plan",
      secondaryCta: "Calculate BMI"
    },
    {
      title: "TRAIN LIKE A CHAMPION",
      subtitle: "Professional workout routines and training splits crafted by certified personal trainers",
      bgImage: "bg-gradient-to-r from-green-500 to-teal-600",
      cta: "Start Training",
      secondaryCta: "View Programs"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 ${slide.bgImage} transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="mb-4">
          <span className="inline-block bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            🏆 #1 FITNESS DESTINATION
          </span>
        </div>
        <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black mb-6 font-poppins leading-tight">
          {slides[currentSlide].title}
        </h1>
        <p className="text-xl sm:text-2xl lg:text-3xl mb-10 font-light max-w-4xl mx-auto leading-relaxed">
          {slides[currentSlide].subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button className="bg-white text-gray-900 px-10 py-5 rounded-full text-xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105">
            {slides[currentSlide].cta}
          </button>
          <button className="border-2 border-white text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-white hover:text-gray-900 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
            {slides[currentSlide].secondaryCta}
          </button>
        </div>
        
        {/* Trust Indicators */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-sm opacity-90">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⭐</span>
            <span>4.9/5 Rating</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">👥</span>
            <span>5000+ Members</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏅</span>
            <span>Certified Trainers</span>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-200 ${
              index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}

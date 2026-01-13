import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Quote, Sparkles } from "lucide-react";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef(null);

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Graphic Designer",
      image: "https://i.pravatar.cc/150?img=5",
      text: "SkillHer gave me the confidence to charge what I'm worth. Within two months, I doubled my freelance income and found clients who truly value my work.",
      rating: 5,
    },
    {
      name: "Aisha Rahman",
      role: "Content Writer",
      image: "https://i.pravatar.cc/150?img=9",
      text: "No more gatekeeping or endless certifications. I listed my writing services and got my first client within a week. The payment system made me feel secure.",
      rating: 5,
    },
    {
      name: "Lakshmi Iyer",
      role: "Digital Marketer",
      image: "https://i.pravatar.cc/150?img=10",
      text: "The women-only environment is a game-changer. I feel safe, respected, and empowered. I've built a thriving consulting practice here.",
      rating: 5,
    },
    {
      name: "Neha Kapoor",
      role: "UI/UX Designer",
      image: "https://i.pravatar.cc/150?img=16",
      text: "I was tired of proving myself in male-dominated spaces. SkillHer let me showcase my portfolio and land remote projects with amazing companies.",
      rating: 5,
    },
    {
      name: "Fatima Ali",
      role: "Web Developer",
      image: "https://i.pravatar.cc/150?img=20",
      text: "As a mom returning to tech, SkillHer was perfect. Flexible jobs, understanding clients, and a supportive community. I'm back in my career!",
      rating: 5,
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(nextSlide, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, currentIndex]);

  const handleManualNav = (direction) => {
    setIsAutoPlaying(false);
    direction === 'next' ? nextSlide() : prevSlide();
  };

  return (
    <section className="relative w-full py-16 md:py-24 overflow-hidden bg-gradient-to-b from-white via-purple-50/20 to-white">
      
      {/* Subtle floating orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-pink-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-float-slow"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full text-sm mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="font-semibold text-purple-700">Success Stories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
            Women Winning with SkillHer
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Real stories from real women building careers on their terms
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Main Testimonial Card */}
          <div className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 sm:p-8 md:p-12 relative overflow-hidden border-2 border-purple-200/50 hover:border-purple-300 transition-all duration-300">
            
            {/* Decorative Quote */}
            <div className="absolute top-4 right-4 sm:top-8 sm:right-8 opacity-5">
              <Quote size={80} className="sm:w-[120px] sm:h-[120px] text-purple-600" />
            </div>

            {/* Shimmer effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-purple-100/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>

            {/* Content with Fade Animation */}
            <div 
              key={currentIndex} 
              className="relative z-10 animate-fade-in"
            >
              
              {/* Author Info */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-30"></div>
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full border-4 border-white shadow-lg"
                  />
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl font-bold text-gray-900">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-purple-600 font-medium text-sm sm:text-base">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>

              {/* Stars Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl sm:text-2xl">★</span>
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed">
                "{testimonials[currentIndex].text}"
              </p>
            </div>        
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => handleManualNav('prev')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 bg-white/90 backdrop-blur-sm rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 border-2 border-purple-200 hover:border-purple-400"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="text-purple-600" size={20} />
          </button>

          <button
            onClick={() => handleManualNav('next')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 bg-white/90 backdrop-blur-sm rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 border-2 border-purple-200 hover:border-purple-400"
            aria-label="Next testimonial"
          >
            <ChevronRight className="text-purple-600" size={20} />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 sm:gap-3 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'w-8 h-3 bg-purple-600 shadow-md'
                  : 'w-3 h-3 bg-purple-200 hover:bg-purple-400'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 mt-12 md:mt-16 max-w-3xl mx-auto">
          <div className="text-center">
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-600 mb-1">1,247</p>
            <p className="text-xs sm:text-sm text-gray-600">Success Stories</p>
          </div>
          <div className="text-center">
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-600 mb-1">4.8/5</p>
            <p className="text-xs sm:text-sm text-gray-600">Average Rating</p>
          </div>
          <div className="text-center">
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-600 mb-1">94%</p>
            <p className="text-xs sm:text-sm text-gray-600">Satisfaction</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(20px, -20px); }
          66% { transform: translate(-15px, 15px); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(-25px, 20px); }
          66% { transform: translate(20px, -15px); }
        }
        
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 25s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
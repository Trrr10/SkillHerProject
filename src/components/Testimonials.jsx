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
      text:
        "SkillHer gave me the confidence to charge what I'm worth. Within two months, I doubled my freelance income and found clients who truly value my work.",
      rating: 5,
    },
    {
      name: "Aisha Rahman",
      role: "Content Writer",
      image: "https://i.pravatar.cc/150?img=9",
      text:
        "No more gatekeeping or endless certifications. I listed my writing services and got my first client within a week.",
      rating: 5,
    },
    {
      name: "Lakshmi Iyer",
      role: "Digital Marketer",
      image: "https://i.pravatar.cc/150?img=10",
      text:
        "The women-only environment is a game-changer. I feel safe, respected, and empowered.",
      rating: 5,
    },
    {
      name: "Neha Kapoor",
      role: "UI/UX Designer",
      image: "https://i.pravatar.cc/150?img=16",
      text:
        "SkillHer let me showcase my portfolio and land remote projects with amazing companies.",
      rating: 5,
    },
    {
      name: "Fatima Ali",
      role: "Web Developer",
      image: "https://i.pravatar.cc/150?img=20",
      text:
        "As a mom returning to tech, SkillHer gave me flexible jobs and a supportive community.",
      rating: 5,
    },
  ];

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);

  const prevSlide = () =>
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(nextSlide, 5000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isAutoPlaying, currentIndex]);

  const handleManualNav = (dir) => {
    setIsAutoPlaying(false);
    dir === "next" ? nextSlide() : prevSlide();
  };

  return (
    <section
      className="relative w-full py-16 md:py-24 overflow-hidden
      bg-gradient-to-b from-white via-purple-50/30 to-white
      dark:from-gray-950 dark:via-gray-900 dark:to-gray-950"
    >
      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300/30 dark:bg-purple-600/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-pink-300/30 dark:bg-pink-600/20 rounded-full blur-3xl animate-float-slow"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/40 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="font-semibold text-purple-700 dark:text-purple-300">
              Success Stories
            </span>
          </div>

          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Women Winning with SkillHer
          </h2>

          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Real stories from real women building careers on their terms
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div
            className="group relative rounded-3xl p-8 md:p-12
            bg-white/80 dark:bg-gray-900/70 backdrop-blur
            shadow-xl dark:shadow-black/40
            border border-purple-200 dark:border-purple-700/40"
          >
            {/* Quote */}
            <Quote
              className="absolute top-6 right-6 text-purple-500 dark:text-purple-400 opacity-10"
              size={120}
            />

            {/* Shimmer */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-purple-200/20 dark:via-purple-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            <div key={currentIndex} className="relative z-10 animate-fade-in">
              {/* Author */}
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-16 h-16 rounded-full border-4 border-white dark:border-gray-800 shadow-lg"
                />
                <div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-purple-600 dark:text-purple-400 font-medium">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-2xl">
                    ★
                  </span>
                ))}
              </div>

              {/* Text */}
              <p className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300">
                “{testimonials[currentIndex].text}”
              </p>
            </div>
          </div>

          {/* Arrows */}
          <button
            onClick={() => handleManualNav("prev")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6
            bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg border
            border-purple-200 dark:border-purple-700 hover:scale-110 transition"
          >
            <ChevronLeft className="text-purple-600 dark:text-purple-400" />
          </button>

          <button
            onClick={() => handleManualNav("next")}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6
            bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg border
            border-purple-200 dark:border-purple-700 hover:scale-110 transition"
          >
            <ChevronRight className="text-purple-600 dark:text-purple-400" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`rounded-full transition-all ${
                i === currentIndex
                  ? "w-8 h-3 bg-purple-600"
                  : "w-3 h-3 bg-purple-300 dark:bg-purple-700"
              }`}
            />
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-3 gap-6 mt-16 max-w-3xl mx-auto text-center">
          <div>
            <p className="text-4xl font-bold text-purple-600">1,247</p>
            <p className="text-gray-600 dark:text-gray-400">Success Stories</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-pink-600">4.8/5</p>
            <p className="text-gray-600 dark:text-gray-400">Average Rating</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-emerald-600">94%</p>
            <p className="text-gray-600 dark:text-gray-400">Satisfaction</p>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(12px);
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

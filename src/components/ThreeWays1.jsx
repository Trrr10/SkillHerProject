import React from "react";
import { FileText, ShoppingBag, Briefcase, ArrowRight, Sparkles, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ThreeWays1 = ({ onLogin }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAction = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      onLogin(); // open login modal
    }
  }
  const handleListService = () => {
  if (user) {
    navigate("/start-selling");
  } else {
    onLogin();
  }
}
    const handleSeeCourses = () => {
  if (user) {
    navigate("/See-Courses");
  } else {
    onLogin();
  }
};

  return (
    <section
  className="
    relative overflow-hidden py-24
    bg-gradient-to-b
    from-white via-purple-50 to-white
    dark:from-gray-950 dark:via-purple-950/40 dark:to-gray-950
  "
>
  {/* Floating Background Glows */}
  <div className="absolute top-32 left-10 w-96 h-96 rounded-full 
    bg-purple-300/30 dark:bg-purple-700/20 
    blur-3xl animate-float" />

  <div className="absolute bottom-32 right-10 w-96 h-96 rounded-full 
    bg-pink-300/30 dark:bg-pink-700/20 
    blur-3xl animate-float-slow" />

  {/* Content Wrapper */}
  <div className="relative z-10 max-w-7xl mx-auto px-6">

    {/* Section Header */}
    <div className="text-center mb-16">
      <span className="inline-block px-4 py-1 rounded-full text-sm font-medium
        bg-purple-100 text-purple-700
        dark:bg-purple-900/40 dark:text-purple-300 mb-4">
        Choose Your Path
      </span>

      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
        Three Ways to Start Earning
      </h2>

      <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        No learning required. No waiting. Choose your path and begin immediately.
      </p>
    </div>

    {/* Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">

      {/* CARD 1 */}
      <div className="group relative rounded-3xl p-8
        bg-white/80 dark:bg-gray-900/70 backdrop-blur-sm
        transition-transform duration-300 hover:-translate-y-2
        shadow-lg dark:shadow-black/40
        border-2 border-purple-200/50 dark:border-purple-700/30
        hover:border-purple-300 dark:hover:border-purple-500 hover:shadow-2xl
        dark:ring-1 dark:ring-white/10">

        <div className="absolute inset-0 rounded-3xl
          bg-gradient-to-r from-transparent via-purple-100/40 dark:via-purple-500/10 to-transparent
          -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

        <div className="relative z-10">
          <div className="w-16 h-16 flex items-center justify-center rounded-2xl
            bg-purple-100 dark:bg-purple-900/40 mb-6 shadow-md">
            <FileText className="text-purple-600 dark:text-purple-400 w-8 h-8" />
          </div>

          <span className="inline-flex items-center gap-1 px-3 py-1
            bg-purple-50 dark:bg-purple-900/30 rounded-full mb-3 text-xs font-semibold
            text-purple-700 dark:text-purple-300">
            <Star className="w-3 h-3 fill-current" />
            Most Popular
          </span>

          <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
            Show Your Skills
          </h3>

          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Upload your resume, add skill tags, build your portfolio.
            No tests, no certifications—just you.
          </p>

          <button
            onClick={handleSeeCourses}
            className="w-full py-3 rounded-full font-medium
              bg-purple-600 hover:bg-purple-700
              dark:bg-purple-500 dark:hover:bg-purple-600
              text-white transition-all">
            Check Courses
          </button>
        </div>

      </div>

      {/* CARD 2 */}
      <div className="group relative rounded-3xl p-8
        bg-white/80 dark:bg-gray-900/70 backdrop-blur-sm
        transition-transform duration-300 hover:-translate-y-2
        shadow-lg dark:shadow-black/40
        border-2 border-pink-200/50 dark:border-pink-700/30
        hover:border-pink-300 dark:hover:border-pink-500 hover:shadow-2xl
        dark:ring-1 dark:ring-white/10">

        <div className="absolute inset-0 rounded-3xl
          bg-gradient-to-r from-transparent via-pink-100/40 dark:via-pink-500/10 to-transparent
          -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

        <div className="relative z-10">
          <div className="w-16 h-16 flex items-center justify-center rounded-2xl
            bg-pink-100 dark:bg-pink-900/40 mb-6 shadow-md">
            <ShoppingBag className="text-pink-600 dark:text-pink-400 w-8 h-8" />
          </div>

          <span className="inline-flex items-center gap-1 px-3 py-1
            bg-pink-50 dark:bg-pink-900/30 rounded-full mb-3 text-xs font-semibold
            text-pink-700 dark:text-pink-300">
            <Sparkles className="w-3 h-3" />
            Quick Start
          </span>

          <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
            Start Selling
          </h3>

          <p className="text-gray-600 dark:text-gray-300 mb-6">
            List your services or digital products.
            Set your own price. Suggestions help—never block.
          </p>

          <button
            onClick={handleListService}
            className="w-full py-3 rounded-full font-medium
              bg-pink-600 hover:bg-pink-700
              dark:bg-pink-500 dark:hover:bg-pink-600
              text-white transition-all">
            List a Service
          </button>
        </div>
      </div>

      {/* CARD 3 */}
      <div className="group relative rounded-3xl p-8
        bg-white/80 dark:bg-gray-900/70 backdrop-blur-sm
        transition-transform duration-300 hover:-translate-y-2
        shadow-lg dark:shadow-black/40
        border-2 border-emerald-200/50 dark:border-emerald-700/30
        hover:border-emerald-300 dark:hover:border-emerald-500 hover:shadow-2xl
        dark:ring-1 dark:ring-white/10">

        <div className="absolute inset-0 rounded-3xl
          bg-gradient-to-r from-transparent via-emerald-100/40 dark:via-emerald-500/10 to-transparent
          -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

        <div className="relative z-10">
          <div className="w-16 h-16 flex items-center justify-center rounded-2xl
            bg-emerald-100 dark:bg-emerald-900/40 mb-6 shadow-md">
            <Briefcase className="text-emerald-600 dark:text-emerald-400 w-8 h-8" />
          </div>

          <span className="inline-flex items-center gap-1 px-3 py-1
            bg-emerald-50 dark:bg-emerald-900/30 rounded-full mb-3 text-xs font-semibold
            text-emerald-700 dark:text-emerald-300">
            <Star className="w-3 h-3 fill-current" />
            Verified
          </span>

          <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
            Find Jobs
          </h3>

          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Browse verified opportunities.
            Remote, part-time, flexible. Apply with your profile.
          </p>

          <button
            onClick={handleAction}
            className="w-full py-3 rounded-full font-medium
              bg-emerald-600 hover:bg-emerald-700
              dark:bg-emerald-500 dark:hover:bg-emerald-600
              text-white transition-all">
            Browse Jobs
          </button>
        </div>
      </div>

    </div>

    {/* Bottom CTA */}
    <div className="mt-16 text-center">
      <div className="inline-block relative group">
        <div className="absolute -inset-1 bg-purple-300 dark:bg-purple-700 rounded-full blur opacity-30 group-hover:opacity-50"></div>

        <div className="relative bg-white dark:bg-gray-900 px-8 py-6 rounded-3xl
          border-2 border-purple-100 dark:border-purple-700/40 shadow-lg">

          <p className="text-gray-700 dark:text-gray-300 mb-3 font-medium">
            <span className="font-bold text-purple-700 dark:text-purple-400">
              Not sure where to start?
            </span>{" "}
            We'll guide you through each step.
          </p>

          <button className="inline-flex items-center gap-2 px-8 py-3
            bg-purple-600 hover:bg-purple-700
            dark:bg-purple-500 dark:hover:bg-purple-600
            text-white font-bold rounded-full transition-all">
            Get Personalized Help
            <Sparkles className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

  </div>



      <style jsx>{`
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

export default ThreeWays1;
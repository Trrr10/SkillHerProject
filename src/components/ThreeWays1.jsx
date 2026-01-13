import React from "react";
import { FileText, ShoppingBag, Briefcase, ArrowRight, Sparkles, Star } from "lucide-react";

const ThreeWays1 = () => {
  return (
    <section className="relative w-full py-16 md:py-4 overflow-hidden bg-gradient-to-b from-white via-purple-50/20 to-white">
      
      {/* Subtle floating orbs matching hero section */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300/30 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-pink-300/30 rounded-full mix-blend-multiply filter blur-3xl animate-float-slow"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-200/20 rounded-full mix-blend-multiply filter blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full text-sm mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="font-semibold text-purple-700">Choose Your Path</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
            Three Ways to Start Earning
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            No learning required. No waiting. Choose your path and begin immediately.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">

          {/* Card 1 - Show Your Skills */}
          <div className="group relative rounded-3xl p-8 bg-white/80 backdrop-blur-sm text-left transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl shadow-lg border-2 border-purple-200/50 hover:border-purple-300">
            
            {/* Shimmer effect only */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-purple-100/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>

            <div className="relative z-10">
              {/* Icon */}
              <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-purple-100 mb-6 group-hover:bg-purple-200 group-hover:scale-105 transition-all duration-300 shadow-md group-hover:shadow-lg">
                <FileText className="text-purple-600 w-8 h-8" />
              </div>

              {/* Badge */}
              <div className="inline-flex items-center gap-1 px-3 py-1 bg-purple-50 rounded-full mb-3">
                <Star className="w-3 h-3 text-purple-600 fill-purple-600" />
                <span className="text-xs font-semibold text-purple-700">Most Popular</span>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-purple-700 transition-colors">
                Show Your Skills
              </h3>

              {/* Description */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                Upload your resume, add skill tags, build your portfolio.
                No tests, no certifications—just you.
              </p>

              {/* Button */}
              <button className="w-full py-3.5 rounded-full bg-purple-600 text-white font-bold hover:bg-purple-700 transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-md hover:shadow-xl hover:scale-[1.02]">
                Create Profile 
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Card 2 - Start Selling */}
          <div className="group relative rounded-3xl p-8 bg-white/80 backdrop-blur-sm text-left transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl shadow-lg border-2 border-pink-200/50 hover:border-pink-300">
            
            {/* Shimmer effect only */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-pink-100/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>

            <div className="relative z-10">
              {/* Icon */}
              <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-pink-100 mb-6 group-hover:bg-pink-200 group-hover:scale-105 transition-all duration-300 shadow-md group-hover:shadow-lg">
                <ShoppingBag className="text-pink-600 w-8 h-8" />
              </div>

              {/* Badge */}
              <div className="inline-flex items-center gap-1 px-3 py-1 bg-pink-50 rounded-full mb-3">
                <Sparkles className="w-3 h-3 text-pink-600" />
                <span className="text-xs font-semibold text-pink-700">Quick Start</span>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-pink-700 transition-colors">
                Start Selling
              </h3>

              {/* Description */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                List your services or digital products.
                Set your own price. Suggestions help—never block.
              </p>

              {/* Button */}
              <button className="w-full py-3.5 rounded-full bg-pink-600 text-white font-bold hover:bg-pink-700 transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-md hover:shadow-xl hover:scale-[1.02]">
                List a Service 
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Card 3 - Find Jobs */}
          <div className="group relative rounded-3xl p-8 bg-white/80 backdrop-blur-sm text-left transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl shadow-lg border-2 border-emerald-200/50 hover:border-emerald-300 md:col-span-2 lg:col-span-1">
            
            {/* Shimmer effect only */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-emerald-100/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>

            <div className="relative z-10">
              {/* Icon */}
              <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-emerald-100 mb-6 group-hover:bg-emerald-200 group-hover:scale-105 transition-all duration-300 shadow-md group-hover:shadow-lg">
                <Briefcase className="text-emerald-600 w-8 h-8" />
              </div>

              {/* Badge */}
              <div className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 rounded-full mb-3">
                <Star className="w-3 h-3 text-emerald-600 fill-emerald-600" />
                <span className="text-xs font-semibold text-emerald-700">Verified</span>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-emerald-700 transition-colors">
                Find Jobs
              </h3>

              {/* Description */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                Browse verified opportunities.
                Remote, part-time, flexible. Apply with your profile.
              </p>

              {/* Button */}
              <button className="w-full py-3.5 rounded-full bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-md hover:shadow-xl hover:scale-[1.02]">
                Browse Jobs 
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block relative group">
            <div className="absolute -inset-1 bg-purple-200 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
            <div className="relative bg-white px-8 py-6 rounded-3xl shadow-lg border-2 border-purple-100 group-hover:border-purple-300 transition-all duration-300">
              <p className="text-gray-700 mb-3 font-medium">
                <span className="font-bold text-purple-700">Not sure where to start?</span> We'll guide you through each step.
              </p>
              <button className="inline-flex items-center gap-2 px-8 py-3 bg-purple-600 text-white font-bold rounded-full hover:bg-purple-700 transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105">
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
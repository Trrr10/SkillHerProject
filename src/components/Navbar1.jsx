import { Link } from "react-router-dom";
import { Sparkles, ChevronRight } from "lucide-react";

export default function Navbar({ onLogin, onSignup }) {
  return (
    <nav className="sticky top-0 z-50 bg-white/30 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
        
        {/* Logo Section with Glow Effect */}
        <Link to="/" className="flex items-center gap-3 group relative">
          {/* Glow effect behind logo */}
          <div className="absolute -inset-2 bg-gradient-to-r from-purple-400 to-pink-400  opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500"></div>
          
          <div className="relative">
            <img 
              src="/logo.png" 
              alt="Herizen Logo" 
              className="h-14 w-14 transition-all duration-500 rounded- full group-hover:scale-110 group-hover:rotate-6 drop-shadow-lg"
            />
            {/* Sparkle effect */}
            <Sparkles className="absolute -top-1 -right-1 text-yellow-400 w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse" />
          </div>
          
          <div className="relative">
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
              SkillHer
            </h1>
            <p className="text-2xl font-semibold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              Empower. Earn. Thrive.
            </p>
          </div>
        </Link>

        {/* Navigation Links - Enhanced */}
        <div className="flex gap-10 items-center">
          <Link 
            to="/" 
            className="relative text-gray-700 font-semibold text-2xl tracking-wide hover:text-transparent hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:bg-clip-text transition-all duration-300 group"
          >
            Home
            {/* Animated dot indicator */}
            <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
            {/* Underline effect */}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300 rounded-full"></span>
          </Link>
          
          <Link 
            to="/about" 
            className="relative text-gray-700 font-semibold text-2xl tracking-wide hover:text-transparent hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:bg-clip-text transition-all duration-300 group"
          >
            About
            <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300 rounded-full"></span>
          </Link>

          <Link 
            to="/about" 
            className="relative text-gray-700 font-semibold text-2xl tracking-wide hover:text-transparent hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:bg-clip-text transition-all duration-300 group"
          >
            Learnings
            <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300 rounded-full"></span>
          </Link>
          
          <Link 
            to="/contact" 
            className="relative text-gray-700 font-semibold text-2xl tracking-wide hover:text-transparent hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:bg-clip-text transition-all duration-300 group"
          >
            Contact
            <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300 rounded-full"></span>
          </Link>

          {/* Buttons with Complementary Colors */}
          
          {/* Log In Button - Mint/Teal (complementary to lavender) */}
          <button
            onClick={onLogin}
            className="group relative px-8 py-3 bg-gradient-to-r from-teal-400 to-cyan-400 text-white font-bold rounded-full overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-teal-300/50 transition-all duration-300 hover:scale-105"
          >
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <span className="relative flex items-center gap-2">
              Log In
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </button>

          {/* Join Free Button - Coral/Peach (complementary to lavender) */}
          <button
            onClick={onSignup}
           className="group relative bg-gradient-to-r from-purple-700 to-pink-700 text-white px-8 py-4 rounded-xl flex items-center gap-2 shadow-2xl hover:shadow-purple-600/60 hover:scale-105 transition-all duration-300 overflow-hidden ring-4 ring-white/80"
            style={{ 
              background: 'linear-gradient(135deg, #FF6B9D 0%, #FFA06B 100%)'
            }}
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Sparkle particles */}
            <div className="absolute top-0 left-0 w-full h-full">
              <span className="absolute top-2 right-4 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping"></span>
              <span className="absolute bottom-2 left-4 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping animation-delay-200"></span>
            </div>
            
            <span className="relative flex items-center gap-2 font-extrabold">
              <Sparkles className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
              Sign Up
              <Sparkles className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}
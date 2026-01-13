import { Link } from "react-router-dom";
import { Sparkles, ChevronRight, LogOut } from "lucide-react";

export default function Navbar({ user, onLogin, onSignup, onLogout }) {
  return (
    <nav className="sticky top-0 z-50 bg-white/30 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500"></div>

          <div className="relative">
            <img
              src="/logo.png"
              alt="SkillHer Logo"
              className="h-14 w-14 rounded-full drop-shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
            />
            <Sparkles className="absolute -top-1 -right-1 text-yellow-400 w-4 h-4 opacity-0 group-hover:opacity-100 animate-pulse" />
          </div>

          <div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              SkillHer
            </h1>
            <p className="text-sm font-semibold text-orange-500">
              Empower. Earn. Thrive.
            </p>
          </div>
        </Link>

        {/* Nav Links */}
        <div className="flex gap-8 items-center">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/about">About</Link>
          <Link className="nav-link" to="/contact">Contact</Link>

          {/* 🔐 AUTH SECTION */}
          {!user ? (
            <>
              {/* Login */}
              <button
                onClick={onLogin}
                className="group px-6 py-3 bg-gradient-to-r from-teal-400 to-cyan-400 text-white font-bold rounded-full shadow-lg hover:scale-105 transition"
              >
                <span className="flex items-center gap-2">
                  Log In
                  <ChevronRight size={16} />
                </span>
              </button>

              {/* Signup */}
              <button
                onClick={onSignup}
                className="group px-6 py-3 rounded-xl font-bold text-white shadow-xl hover:scale-105 transition"
                style={{
                  background: "linear-gradient(135deg, #FF6B9D, #FFA06B)",
                }}
              >
                <span className="flex items-center gap-2">
                  <Sparkles size={16} />
                  Sign Up
                  <Sparkles size={16} />
                </span>
              </button>
            </>
          ) : (
            <>
              {/* Logged-in View */}
              <span className="text-lg font-semibold text-purple-700">
                Hi, {user.name} 👋
              </span>

              <button
                onClick={onLogout}
                className="flex items-center gap-2 text-red-500 font-semibold hover:text-red-700 transition"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
